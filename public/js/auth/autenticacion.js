class Autenticacion {
  autEmailPass (email, password) {

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(result =>{
        if(result.user.emailVerified){
          Materialize.toast(`Bienvenido ${result.user.displayName}`, 5000);
          $('#avatar').attr('src', 'imagenes/usuario_auth.png');
        }else{
          firebase.auth().signOut();
          Materialize.toast(`Por favor realiza la verificacion de la cuenta ${result.user.displayName}`, 5000);
        }
      })
      $('.modal').modal('close');
    // $('#avatar').attr('src', 'imagenes/usuario_auth.png')
    // Materialize.toast(`Bienvenido ${result.user.displayName}`, 5000)
    // $('.modal').modal('close')
  }

  crearCuentaEmailPass (email, password, nombres) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(result => {
        result.user.updateProfile({
          displayName: nombres
        })

        const configuracion = {
          url: 'http://localhost:5500/public/index.html'
        }

        result.user.sendEmailVerification(configuracion).catch(error => {
          console.log(error)
          Materialize.toast(error.message, 4000)
        })

        firebase.auth().signOut()

        Materialize.toast(
          `Bienvenido ${nombres}, debes realizar el proceso de verificación`,
          4000
        )

        $('.modal').modal('close')
      })
      .catch(error => {
        console.error(error)
        Materialize.toast(error.message, 4000)
      })
  }

  authCuentaGoogle () {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
      .then(result =>{
        $('#avatar').attr('src', result.user.photoURL);
        $('.modal').modal('close');
        Materialize.toast(`Bienvenido ${result.user.displayName} !! `, 4000);
      })
    // $('#avatar').attr('src', result.user.photoURL)
    // $('.modal').modal('close')
    // Materialize.toast(`Bienvenido ${result.user.displayName} !! `, 4000)
  }

  authCuentaFacebook () {
    const provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider)
      .then(result =>{
        $('#avatar').attr('src', result.user.photoURL);
        $('.modal').modal('close');
        Materialize.toast(`Bienvenido ${result.user.displayName} !! `, 4000);
      })
    // $('#avatar').attr('src', result.user.photoURL)
    // $('.modal').modal('close')
    // Materialize.toast(`Bienvenido ${result.user.displayName} !! `, 4000)
  }

  authTwitter () {
    // TODO: Crear auth con twitter
  }

  recordarContrasena (correo) {
    const configuracion = {
      url: "http://localhost:5500/public/index.html"
    };

    firebase.auth()
      .sendPasswordResetEmail(correo, configuracion)
      .then(result => {
        console.log(result);
        firebase.auth().signOut();
        Materialize.toast(
          `Se ha enviado un correo para reestablecer la contraseña`,
          4000
        );
        
        $(".modal").modal("close");
      })
      .catch(error => {
        console.log(error);
        Materialize.toast(error.message, 4000);
      });
  }  
}
export{ Autenticacion }