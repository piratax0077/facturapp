function seleccionarUsuario(index,usuarios){
    const usuario = usuarios[index];
    document.getElementById('nombre').innerHTML = usuario.nombre;
    document.getElementById('email').innerHTML = usuario.email;
    document.getElementById('rol_usuario').innerHTML = usuario.rol;
    // la imagen con id image_user hay que cambiarle el src por el de la imagen del usuario
    document.getElementById('image_user').src = usuario.urlimage;
}

function dameroles(){
    let url = "https://panchoserver.ddns.net/api/dameroles_demo";
    fetch(url)
    .then(response => response.json())
    .then(data => {
       
        let html = '';
        data.forEach(rol => {
            html += `<option value="${rol.id}">${rol.nombrerol}</option>`;
        });
        document.getElementById('rol').innerHTML = html;
    });
}