function cargar_documento()
  {
    let td=$('input[name="opt_documento"]:checked').val().trim();
    let mot=$('input[name="opt_motivo"]:checked').val();

    let num=document.getElementById("num_documento").value.trim();
    document.getElementById("num_documento_h").value=num;
    let doc="";
    if(td=='factura')
    {
      doc="fa-"+num;
    }
    if(td=='boleta')
    {
      doc="bo-"+num;
    }

    $('#mostrar_documento').removeClass('d-none');
    $('#mostrar_documento').addClass('d-block');

    if(num == ""){
        $('#mostrar_documento').removeClass('d-block');
        $('#mostrar_documento').addClass('d-none');
        return swal({
            title: 'ATENCION!!!',
            text: 'Debe ingresar un numero de documento',
            position: 'top-end',
            icon: 'warning',
            toast: true,
            showConfirmButton: false,
            timer: 3000,
        });
    }

    return;

    let url='{{url("notacredito")}}'+'/cargar_documento/'+doc+"-"+mot;

    $.ajax({
      type:'GET',
      beforeSend: function () {
          $("#mensajes").html("Buscando...");
      },
      url:url,
      success:function(resp){
        $("#mensajes").html("Buscando...<b>Listo...</b>");
        if(resp.substr(0,1)=='r')
        {
            Vue.swal({
                    title: 'ATENCION!!!',
                    text: resp.substr(1),
                    //position: 'top-end',
                    icon: 'warning',
                    //toast: true,
                    //showConfirmButton: false,
                    //timer: 3000,
                    });
            return;
        }

        $("#mostrar_documento").html(resp);
        if(mot==1) devolver_todo();
      },
      error: function(error){
        $('#mensajes').html(error.responseText);
      }
    });

  }

  function generar_xml(){
    swal({
        title: 'Generar XML',
        text: "Esta seguro de generar el XML?",
        icon: 'warning',
        buttons: {
            cancel: "Cancelar",
            confirm: "Aceptar"
        },
        dangerMode: true,

    }).then((willDelete) => {
        if(willDelete){
            // recargar la pagina
            let url = '/notas_credito';
            // redireccionar con javascript a url
            window.location.href = url;
        }
    });
  }