var md;
$(document).ready(function(){
  style.ajustarTamaño();
  configColectorC.showColector();

  $(document).on('click', '.sidebarCollapse', function(){
    $('#sidebar, #content').toggleClass('active');
    if(md.os() == "AndroidOS"){
      $('page-content').toggleClass('d-none');
      }
    });

    $(document).on("click", "#btn-save-id", function(event){
      event.preventDefault();
      let codeReg = $("#colect-code").val();
      configColectorC.saveColectorId(codeReg);
    });
})
