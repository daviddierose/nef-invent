class alerts{
  constructor(color, text, delayTime){
    this.color = color;
    this.text = text;
    this.delayTime = delayTime;
  }
  showAlerts(){
    $(`#Alert-text`).html(this.text);
    $('#Alert').addClass(this.color);
    $('#row-alert').fadeIn(200);
    setTimeout(()=>{
      $(`#row-alert`).fadeOut(200);
      $('#Alert').removeClass(this.color);
    }, parseInt(this.delayTime));
}

  showAlertsCountdown() {
    let newText = this.text + `<br>Si intentara de nuevo en: <br><span
                                id="spanAlert">10</span>`;
    $(`#Alert-text`).html(newText);
    $('#Alert').addClass(this.color);
    $('#row-alert').fadeIn(200);
    let time = 10;
    setInterval(()=>{
      if (time > 0){
        time --;
        $(`#spanAlert`).html(time);
      }else{
          clearInterval();
      }}, 1000);
      setTimeout(()=>{
        $(`#row-alert`).fadeOut(200);
        $('#Alert').removeClass(this.color);
      },this.delayTime);
  }

  showAlertsBotton(){
    $(`#Alert-text`).html(this.text);
    $('#Alert').addClass(this.color);
    $('#alert-boton').toggleClass('d-none');
    $('#code_product').blur();
    $('#row-alert').fadeIn(200);
    music.play();
    music.loop =true;
    alarmaCodeWrong = setInterval(()=>{
      $('#Alert').toggleClass('alert-danger');
      $('#Alert').toggleClass('alert-primary');
      var sta = $('#row-alert').css('display');
      console.log("1");
    }, 100);
}

  static showLoadingScreen(){
    $('#loading-screen').show();
  }

  static hideLoadingScreen(){
    $('#loading-screen').hide();
  }
}

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

class login{
  constructor(user, pass){
    this.user = user;
    this.pass = pass;
  }

  sendLogin(){
    let info = {
      user: this.user,
      pass: this.pass,
      reqAct: 'login',
    }
    console.log(this.pass);
    const loginProm = new Promise((resolve, reject)=>{
      $.post("connection/connection.php", info, function(response){})
      .done(function(response){
        console.log(response);
        let res = JSON.parse(response);
        if(res['reqStatus'] == false){
          reject(res);
        }
        else if(res['reqStatus'] == true){
          resolve(res);
        }
      }).fail(function(){
          reject();
        });
    }).then(res=>{
          location.replace(res['route']);
    }).catch(err=>{
        const alert = new alerts('alert-danger', err['message'], err['messDelayTime']);
        alert.showAlerts();
    });
  }
}
