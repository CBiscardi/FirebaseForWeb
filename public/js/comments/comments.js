import { Utilidad } from "../util/util.js";
class Comments {
  constructor () {
      // TODO inicializar firestore y settings
    this.db = firebase.firestore();
    //const settigns = { timestampsInSnapshots : true};
    //this.db.settings(settigns);
  }

  crearComentario (uid, emailUser, clasificacion, nombre, imagenLink, comentarios) {
    
    return this.db.collection('comment').add({

        uid : uid,
        nombre : nombre,
        autor : emailUser,
        clasificacion : clasificacion,
        imagenLink : imagenLink,
        comentarios : comentarios,
        fecha : firebase.firestore.FieldValue.serverTimestamp()
    }).then(refId => {
        console.log(`Id del post => ${refId.id}`)
    }).catch(error =>{
        console.log(`Error Creando Post => ${error}`)
    })

  }

  subirImagenComment(file, uid){
      const refStorage = firebase.storage().ref(`imgsComments/${uid}/${file.name}`)
      const task = refStorage.put(file)

      task.on('state_changed',
        snapshot => {
            const porcentaje = (snapshot.bytesTransferred / snapshot.totalBytes) *100
            $('.determinate1').attr('style', `width: ${porcentaje}%`) 
        },
        err => {
            Materialize.toast(`Error subiendo archivo => ${err.message}`, 4000)
        },
        () => {
            task.snapshot.ref.getDownloadURL()
                .then(url =>{
                    console.log(url)
                    sessionStorage.setItem('imgNewComment', url)
                }).catch(err => {
                    Materialize.toast(`Error obteniendo URL => ${err.message}`, 4000)
                })
        })
  }
}
export { Comments }
