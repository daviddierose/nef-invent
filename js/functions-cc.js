class alerts{
  constructor(color, text, delayTime){
    this.color = color;
    this.text = text;
    this.delayTime = delayTime;
  }
  showAlerts(){
    $(`#Alert`).html(this.text);
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
    $(`#Alert`).html(newText);
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
  }
}

class configColectorC{
  static getColector(type){
      let colectConfigFun;
      if(localStorage.getItem(type)){
        colectConfigFun = JSON.parse(localStorage.getItem(type));
      }else{
        colectConfigFun = ["", "Colector"];
      }
        return colectConfigFun;
  }

  static saveColectorId(codeReg){
      alerts.showLoadingScreen();
      const saveColIdPromise = new Promise((resolve, reject)=>{
        $.post("connection/connection.php", {codeReg}, function(response){})
        .done(function(response){
          let res = JSON.parse(response);
          if(res[0] == true || res[0]== "true"){
            resolve(res)
          }else{
            reject(response);
          }
        })
        .fail(function(){
          reject(err);
        });
      });

      saveColIdPromise.then(res =>{
        console.log(res[1]);
        alerts.hideLoadingScreen();
        let colectIdSave = [];
        colectIdSave.push(res[1]);
        colectIdSave.push(res[2]);
        localStorage.setItem("aBc", JSON.stringify(colectIdSave));
        const alertSaveConfi = new alerts("alert-success", `La configuración ha
                                sido guardada con exito.`, 3000);
        alertSaveConfi.showAlerts();
        configColectorC.showColector();

      }).catch(err =>{
        err = JSON.parse(err);
        alerts.hideLoadingScreen();
        const alertErrorStatusVal = new alerts("alert-danger", err, 3000);
        alertErrorStatusVal.showAlerts();
      });
  }

  static showColector(){
      let config;
      let colectConfig = configColectorC.getColector("aBc");
      $("#colect-name").val(colectConfig[1]);
      $("#colect-code").val(colectConfig[0]);
    }

  }
