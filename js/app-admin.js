var md;
var switchSelected;
var infoInventario = {id:'',
                      providers: [],
                      correlatives:[],
                      codes:[],
                     }

$(document).ready(function(){
  //style.ajustarTamaño();
  $('#colTable').css('max-height', $('#colTable').css('height'))

  $(document).on('click', '.sidebarCollapse', function(){
    $('#sidebar, #content').toggleClass('active');
    // if(md.os() == "AndroidOS"){
    //   $('page-content').toggleClass('d-none');
    //   }
    });

  $(document).on('click', '.collapsebotton', function(){
    let ariaControl = $(this).attr('aria-controls');
    $(`#${ariaControl}Line`).toggleClass('d-none');
    $('.fa-chevron-down').toggleClass('d-none');
    $('.fa-chevron-up').toggleClass('d-none');
  })

  $(document).on('click', '.btn-switch', function(event){
    event.preventDefault();
    event.stopPropagation();
    colectores.toggleStatusColect($(this).val());
  });

  $(document).on('click', '.changeChart', function(event){
    event.preventDefault();
    let val = $(this).val();

    if($('.chartsBar').css('display')=='block'){
      $(`.chartsBar`).fadeOut(300)
      setTimeout(()=>{
        $('.chartsPie').fadeIn(300);
        $(this).html('<i class="fas fa-chart-bar"></i>');
      },300)
    }else if($('.chartsBar').css('display')=='none'){
      $('.chartsPie').fadeOut(300);
      setTimeout(()=>{
        $('.chartsBar').fadeIn(300);
        $(this).html('<i class="fas fa-chart-pie"></i>');
      },300)
    }
  });

  $(document).on('click', '.getColectList', function(){
    let codes = new showCodesList(infoInventario);
    codes.showTableInfo($(this).val());
  });

  $(document).on('click', '#getAllList', function(){
    let codes = new showCodesList(infoInventario);
    codes.showTableInfo('');
  });
});
