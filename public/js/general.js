import { Post } from "./post/post.js"

$(() => {
  $('.tooltipped').tooltip({ delay: 50 })
  $('.modal').modal()

  // TODO: Adicionar el service worker
  navigator.serviceWorker.register('notificaciones-sw.js')
    .then(registro => {
      console.log('Service Worker Registrado')
      firebase.messaging().useServiceWorker(registro)
    }).catch(error =>{
      console.error(`Error al registrar el service worker => ${error}`)      
    })

  const messaging = firebase.messaging()
  // TODO: Registrar LLave publica de messaging
  messaging.usePublicVapidKey(
    'BI5e0b_4LfTt5Tbl3ZDSXyQGvrm1Oe7y4IxE2hp7jpinJVbH2UQWDVWDJ62B7oUw4A-SN9KDGcACHGjYUeTFqSM'
  )
  // TODO: Solicitar permisos para las notificaciones
  messaging.requestPermission()
    .then(() =>{
      console.log('Permiso otorgado')
      return messaging.getToken()
    }).then(token =>{
      const db = firebase.firestore()
      db.collection('tokens').doc(token).set({token : token})
        .catch(error =>{ console.log(`Error al insertar el token en la BD => ${error}`) })
    })
  
    messaging.onTokenRefresh(() => {
      messaging.getToken()
        .then(token =>{
          console.log('El token se ha renovado')
          const db = firebase.firestore()
          db.collection('tokens').doc(token).set({token : token})
            .catch(error =>{ console.log(`Error al insertar el token en la BD => ${error}`) })
        })
    })
  // TODO: Recibir las notificaciones cuando el usuario esta foreground
  messaging.onMessage(payload => {
    Materialize.toast(`Ya tenemos un nuevo post. Revisalo, se llama ${payload.data.titulo}`,6000)
  })
  // TODO: Recibir las notificaciones cuando el usuario esta background

  // TODO: Listening real time
  const post = new Post()
  post.consultarTodosPost();

  // TODO: Firebase observador del cambio de estado
  firebase.auth().onAuthStateChanged(user =>{
    if(user){
      $('#btnInicioSesion').text('Salir');
      if(user.photoURL){
        $('#avatar').attr('src', user.photoURL);
      }else{
        $('#avatar').attr('src', 'imagenes/usuario_auth.png');
      }
    }else{
      $('#btnInicioSesion').text('Iniciar Sesión');
      $('#avatar').attr('src', 'imagenes/usuario.png');
      $('#tituloPost').text('Posts de la Comunidad')
      post.consultarTodosPost();
    }
  })
  //$('#btnInicioSesion').text('Salir')
  //$('#avatar').attr('src', user.photoURL)
  //$('#avatar').attr('src', 'imagenes/usuario_auth.png')
  //$('#btnInicioSesion').text('Iniciar Sesión')
  //$('#avatar').attr('src', 'imagenes/usuario.png')

  // TODO: Evento boton inicio sesion
  $('#btnInicioSesion').click(() => {

    const user = firebase.auth().currentUser
    if(user){
      return firebase.auth().signOut()
        .then(() => {
          $('#btnInicioSesion').text('Iniciar Sesión');
        })
        .catch(error =>{
          Materialize.toast(`Error al realizar SignOut => ${error}`, 4000)
        });
    }
    //$('#avatar').attr('src', 'imagenes/usuario.png')
    // Materialize.toast(`Error al realizar SignOut => ${error}`, 4000)
    $('#emailSesion').val('')
    $('#passwordSesion').val('')
    $('#modalSesion').modal('open')

  })

  $('#avatar').click(() => {
    const user = firebase.auth().currentUser
    if(user){
      firebase.auth().signOut()
      .then(() =>{
        $('#avatar').attr('src', 'imagenes/usuario.png')
        Materialize.toast('SignOut correcto', 4000)
      })
      .catch(error =>{
        Materialize.toast('Error al realizar SignOut ${error}', 4000)
      })
    }
    //$('#avatar').attr('src', 'imagenes/usuario.png')
    //Materialize.toast(`SignOut correcto`, 4000)
  })

  $('#btnTodoPost').click(() => {
    $('#tituloPost').text('Posts de la Comunidad')
    post.consultarTodosPost();   
  })

  $('#btnMisPost').click(() => {
    const user = firebase.auth().currentUser
    if (user == null){
      Materialize.toast(`Debes estar autenticado para consultar tus Posts`, 4000)
      return
    }
    $('#tituloPost').text('Mis Posts')
    post.consultarPostxUsuario(user.email);   
    //Materialize.toast(`Debes estar autenticado para ver tus posts`, 4000)    
  })
})
