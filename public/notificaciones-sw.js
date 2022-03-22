importScripts('https://www.gstatic.com/firebasejs/5.5.8/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/5.5.8/firebase-messaging.js')

firebase.initializeApp({
    projectId: "blogeekplatzi-e48f1",
    messagingSenderId: "331273176127"
})

const messaging = firebase.messaging()

messaging.setBackgroundMessageHandler(payload =>{
    const tituloNotificacion = 'Ya tenemos un nuevo Post'
    const opcionesNotificacion = {
        body: payload.data.titulo,
        icon: 'icons/icon_new_post.png',
        click_action: "https://blogeekplatzi-e48f1.web.app"
    }
    return self.ServiceWorkerRegistration.showNotificacion(tituloNotificacion, opcionesNotificacion)
})


