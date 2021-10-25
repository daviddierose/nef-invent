let md;
$(document).ready(function(){
  style.ajustarTamaño();

  $(document).on('click', '.sidebarCollapse', function(){
    event.preventDefault();
    $('#sidebar, #content').toggleClass('active');
    if(md.os() == "AndroidOS"){
      $('page-content').toggleClass('d-none');
      }
    });
});
