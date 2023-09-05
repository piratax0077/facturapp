function seleccionarUsuario(index,usuarios){
    const usuario = usuarios[index];
    document.getElementById('nombre').innerHTML = usuario.nombre;
    document.getElementById('email').innerHTML = usuario.email;

    // la imagen con id image_user hay que cambiarle el src por el de la imagen del usuario
    document.getElementById('image_user').src = usuario.urlimage;
}