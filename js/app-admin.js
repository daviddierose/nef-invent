var md;
var switchSelected;
$(document).ready(function(){
  style.ajustarTamaño();

  $(document).on('click', '.sidebarCollapse', function(){
    $('#sidebar, #content').toggleClass('active');
    if(md.os() == "AndroidOS"){
      $('page-content').toggleClass('d-none');
      }
    });

  $(document).on('click', '.collapsebotton', function(){
    let ariaControl = $(this).attr('aria-controls');
    $(`#${ariaControl}Line`).toggleClass('d-none');
    $('.fa-chevron-down').toggleClass('d-none');
    $('.fa-chevron-up').toggleClass('d-none');
  })

  $(document).on('click', '.btn-switch', function(){
    colectores.toggleStatusColect($(this).val(), $(this).attr('status'));
  });
});
