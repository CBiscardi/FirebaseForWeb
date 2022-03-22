import { Comments } from "./comments.js";
$(() => {
  $('#nombreContacto').val('')
  $('#emailContacto').val('')
  $('#comentarioTipo').checked = true
  $('#reclamoTipo').checked = false
  $('#mejoraTipo').checked = false
  $('#otroTipo').checked = false
  $('#btnUploadFileComment').val('')
  $('.determinate1').attr('style', `width: 0%`)
  sessionStorage.setItem('imgNewComment', null)

  $('#comentariosContacto').val('')
  


  $('#btnRegistroComentario').click(() => {
        // TODO: Validar que el usuario esta autenticado
    const comments = new Comments()
    // Materialize.toast(`Para crear el post debes estar autenticado`, 4000)
    const emailUser = $('#emailContacto').val()
    const nombre = $('#nombreContacto').val()
    const comentarios = $('#comentariosContacto').val()
    var clasificacion = [];
    $('.tipos-comentarios input:checked').each(function() {
      clasificacion.push($(this).attr('name'));
    });
    const user = firebase.auth().currentUser
    const uId = user == null? null: user.uid
    const imagenLink = sessionStorage.getItem('imgNewComment') == null
      ? null
      : sessionStorage.getItem('imgNewComment')

    comments
      .crearComentario(
        uId, 
        emailUser, 
        clasificacion, 
        nombre, 
        imagenLink, 
        comentarios
      )
      .then(resp => {
        Materialize.toast('Comentario creado correctamente', 4000)
        $('#nombreContacto').val('')
        $('#emailContacto').val('')
        $('#comentarioTipo').checked = true
        $('#reclamoTipo').checked = false
        $('#mejoraTipo').checked = false
        $('#otroTipo').checked = false
        $('#btnUploadFileComment').val('')
        $('.determinate1').attr('style', `width: 0%`)
        sessionStorage.setItem('imgNewComment', null)
        $('#comentariosContacto').val('')
      })
      .catch(err => {
        Materialize.toast(`Error => ${err}`, 4000)
      })
  })

  $('#btnUploadFileComment').on('change', e => {
    // TODO: Validar que el usuario esta autenticado
    const user = firebase.auth().currentUser
    if (user == null){
      Materialize.toast(`Para subir la imagen debes estar autenticado`, 4000)
      return
    }
    // Materialize.toast(`Para crear el post debes estar autenticado`, 4000)

    const file = e.target.files[0]
    const comments = new Comments()

    comments.subirImagenComment(file, user.uid)
    // TODO: Referencia al storage
    
  })
})
