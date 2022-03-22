import { Autenticacion } from "./autenticacion.js";
$(() => {    

    

    $("#btnRegistroEmail").click(() => {
        const nombres = $('#nombreContactoReg').val();
        const email = $('#emailContactoReg').val();
        const password = $('#passwordReg').val();
        const auth = new Autenticacion();
        auth.crearCuentaEmailPass(email, password, nombres)
    });

    $("#btnInicioEmail").click(() => {
        const email = $('#emailSesion').val();
        const password = $('#passwordSesion').val();
        // TODO : LLamar auth cuenta con email
        const auth = new Autenticacion();
        auth.autEmailPass(email, password);
    });

    $("#authGoogle").click(() => {
        const auth = new Autenticacion();
        auth.authCuentaGoogle ();
    });

    $("#authFB").click(() => {
        const auth = new Autenticacion();
        auth.authCuentaFacebook ();  
    });

    $("#authTwitter").click(() => {
        
    });

    $('#btnRegistrarse').click(() => {
        $('#modalSesion').modal('close');
        $('#modalRegistro').modal('open');        
    });

    $('#btnIniciarSesion').click(() => {
        $('#modalRegistro').modal('close');
        $('#modalSesion').modal('open');
    });

    $('#btnRecordarPass').click(() => {
        const user = firebase.auth().currentUser
        if(user){
            const auth = new Autenticacion();
            auth.recordarContrasena (user.email);  
        }else{
            $('#modalSesion').modal('close');
            $('#modalRecordarPass').modal('open');
        }
    })
      
    $('#btnRecordarPass1').click(() => {
        const correo = $('#emailRecordarPass').val();
        const auth = new Autenticacion();
        auth.recordarContrasena (correo);  
    })
});