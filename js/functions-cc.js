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

static getConfig(){
    let colectConfigFun;
    if(localStorage.getItem('config')){
      colectConfigFun = JSON.parse(localStorage.getItem('config'));
    }else{
      let colectConfigCreate = [{'colect':{
                            'codeReg':'',
                            'codeDevice':'',
                            'colectName':'',
                            'colectStatus':0,
                            'input': 0},
                          'inventory':{
                            'inventStatus':0,
                            'inventBranchOffice':'',
                            'inventId': 0}}];
      localStorage.setItem("config", JSON.stringify(colectConfigCreate));
    }
      return colectConfigFun;
 }

  static saveCodeReg(codeReg){
      let car = "abcdefghijkmnpqrtuvwxyzABCDEFGHJKMNPQRTUVWXYZ2346789";
      let codeDevice = "";
      for (let i=0; i<16; i++) codeDevice +=car.charAt(Math.floor(Math.random()*car.length));
      let info = {
        codeReg: codeReg,
        codeDevice: codeDevice,
      };
      alerts.showLoadingScreen();
      const saveColIdPromise = new Promise((resolve, reject)=>{
        $.post("connection/connection.php", info, function(response){})
        .done(function(response){
          let res = JSON.parse(response);
          if(res[0] == true || res[0] == "true"){
            resolve(res)
          }else{
            reject(res);
          }
        })
        .fail(function(){
          reject(err);
        });
      });

      saveColIdPromise.then(res =>{
        alerts.hideLoadingScreen();
        let config = configColectorC.getConfig();
        config[0]['colect']['codeReg'] = res[1];
        config[0]['colect']['colectName'] = res[2];
        config[0]['colect']['codeDevice'] = res[3];
        localStorage.setItem("config", JSON.stringify(config))
        const alertSaveConfi = new alerts("alert-success", `Configuración
                                    guardada con éxito.`, 3000);
        alertSaveConfi.showAlerts();
        configColectorC.showColector();

      }).catch(err =>{
        console.log(err);
        alerts.hideLoadingScreen();
        const alertErrorStatusVal = new alerts("alert-danger", err, 3000);
        alertErrorStatusVal.showAlerts();
      });
  }

  static showColector(){
      let config = configColectorC.getConfig();
      $("#colect-name").val(config[0]['colect']['colectName']);
      $("#colect-code").val(config[0]['colect']['codeReg']);
    }

  }
