import { Post } from "./post/post.js"

$(() => {
  $('.tooltipped').tooltip({ delay: 50 })
  $('.modal').modal()

  // TODO: Adicionar el service worker
  
  // Init Firebase nuevamente

  // TODO: Registrar LLave publica de messaging

  // TODO: Solicitar permisos para las notificaciones

  // TODO: Recibir las notificaciones cuando el usuario esta foreground

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
