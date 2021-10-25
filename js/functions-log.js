class style{
  static ajustarTamaño() {
    md = new MobileDetect(window.navigator.userAgent);
    if(md.os() == "AndroidOS"){
      /*General*/
      $('h1').css('font-size','3.5rem');
      $(document.body).css('font-size', '2.2rem');
      /*sidebar*/
      $('#sidebar').css('width', $(window).width()).css('height', $(window).height());
      $('#sidebarCollapseM').removeClass('d-none');
      $('.logo').css('width', '25%');
      /*Formularios*/
      $('.col-sm-6').addClass('col-sm-12').removeClass('col-sm-6');
      $('.form-control').addClass('form-control-lg').removeClass('form-control');
      $('.form-control-lg, .custom-select').css('font-size','2.8rem')
      .css('height', '6rem');
      $('.btn-azulSec').addClass('btn-lg').css('text-transform','uppercase');
      $('.btn-lg').removeClass('py-2').addClass('py-3').css('font-size', '2.8rem');
      /*Alerts*/
      $('.alertsRow').css('font-size','3.5rem').css('text-transform','uppercase');
    }

    if($("#form-row-ajust").length > 0){
      let heightR = $(window).height();
      let heightD = $("#login-form-div").height() || $("#alertBad").height() || $("#alertOk").height() ;
      let heightF = heightR - heightD;
      $("#form-row-ajust").css("height", heightF);
    }
  }
}
