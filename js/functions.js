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



class configColectorC{
  constructor(colect, config){
    this.colect = colect;
    this.config = config;
  }

  static getColector(type){
      let colectConfigFun;
      if(localStorage.getItem(type)){
        colectConfigFun = JSON.parse(localStorage.getItem(type));
      }else{
        colectConfigFun = [];
      }
        return colectConfigFun;
  }

  static saveColectorConfig(conIn, conLabel){
    let colectConfigSave = [];
    colectConfigSave.push(parseInt(conIn));
    colectConfigSave.push(parseInt(conLabel));
    localStorage.setItem("colectConfig", JSON.stringify(colectConfigSave));
  }

  saveColectorId(){
      let type = 'colectConfig';
      let colectConfigSave = [];
      colectConfigSave.push(parseInt(this.colect));
      colectConfigSave.push(parseInt(this.config));
      localStorage.setItem(type, JSON.stringify(colectConfigSave));
      let colectConfig = configColectorC.getColector(type);
      if(colectConfig[0] == this.colect && colectConfig[1] == this.config){
        const alertSaveConfi = new alerts("alert-success", `La configuración ha
                                sido guardada con exito.`, 3000);
        alertSaveConfi.showAlerts();
      }else{
        const alertDontSaveConfi = new alerts("alert-danger", `No se pudo guardar
                                    la configuración. Intenta de Nuevo.`, 3000);
        alertDontSaveConfi.showAlerts();
      }
  }

  static showColector(){
      let config;
      let colectConfig = configColectorC.getColector("colectConfig");
      let colectId = configColectorC.getColector("aBc");
        console.log(colectConfig);
      $("#select-config-In").val(colectConfig[0]);
      $("#select-config-label").val(colectConfig[1]);

      $("#colectId").html(`<p>ID: <span class="text-capitalize">${colectId[1]}</span></p>`);
    }

  static numberColector(){
      let col = "colector";

      const promiseNC = new Promise((resolve, reject)=>{
        alerts.showLoadingScreen();
        $.post("connection/connection.php", {col}, function(response){
          let resp = JSON.parse(response);
          resp = parseInt(resp);
        }).done(function (resp){
            resolve(resp);
        }).fail(function (xhr, textStatus, errorThrown){
            reject();
          });
      });

      promiseNC.then(res =>{
        numberColectorInfo = res;
        alerts.hideLoadingScreen();
      }).catch(err =>{
        alerts.hideLoadingScreen();
        const promiseErrAlert = new Promise((resolve, reject)=>{
          const alertErrorConection = new alerts('alert-danger', `No fue posible
                                        realizar conexión con el servidor.`, 10000);
          alertErrorConection.showAlertsCountdown();
          setTimeout(()=>{
            resolve();
          },9000);
        });
        promiseErrAlert.then(res =>{
        configColectorC.numberColector();
          const alertSuccConection = new alerts('alert-success', `Conexión realizada
                                        con éxito.`, 3000);
          alertSuccConection.showAlerts();
        })

      });
  }

  static reviewId(){
    let error;
    alerts.showLoadingScreen();
    if(localStorage.getItem('aBc')){
      let id = configColectorC.getColector('aBc');
      let codeRegIn = id[0];
      const reviewIdPromise = new Promise((resolve, reject)=>{
        $.post("connection/connection.php", {codeRegIn}, function(response){})
        .done(function(response){
          let res = JSON.parse(response);
          if(res == true){
            resolve();
          }else{
            reject(res);
          }
        }).fail(function(response){
            reject();
        });
      });

      reviewIdPromise.then(res =>{
        alerts.hideLoadingScreen();
      }).catch(err =>{
        alerts.hideLoadingScreen();
        const alertReviewID = new alerts('alert-danger', err, 5000);
        alertReviewID.showAlerts();
        setTimeout(()=>{
          location.replace('?ruta=login');
        },5000);
      });
    }else{
      console.log('no está');
      const alertReviewIDNo = new alerts('alert-danger', `Colector no configurado,
                                  Comunicate con el administrador.`, 5000);
      alertReviewIDNo.showAlerts();
      setTimeout(()=>{
        location.replace('?ruta=login');
      },5000);
    }
  }

}

class codesC{
  constructor(code){
    this.code = code;
  }

  introduceCode(){
    let codeI = [];
    let codeJoin, amount;
    let colectConfig = configColectorC.getColector('colectConfig');
    console.log(colectConfig);
    codeJoin = codeKeyComplete.join("");
    if(codeJoin.length == 0){
      const alertEmptyCode = new alerts("alert-danger", `No puedes
                            guardar un código vacio.`, 3000);
      alertEmptyCode.showAlerts();
    }else{
      let codes = codesC.getCodes();
      if(codes.length<500){
        if(colectConfig[0] == 1){
          amount = parseInt(1);
        }else if(colectConfig[0] == 2){
          amount = parseInt(prompt("Ingrese la cantidad de pares", "0"));
        }else{
          alertNoConfig.showAlerts();
        }
        let codeClean = cleanCode(codeJoin);
        codeI.push(codeClean, amount);
        codes.push(codeI);
        localStorage.setItem("codesList", JSON.stringify(codes));
        codes = codesC.getCodes();
        table(codes,"reverse");
      }else{
        const alertSpacesLimit = new alerts("alert-danger", `Alcanzaste
                                  el limite de códigos.`, 3000);
        alertSpacesLimit.showAlerts();
      }
    }
    codeKeyComplete = [];
  }

  static getCodes(){
    let codesListRec;
    if(localStorage.getItem("codesList")){
      codesListRec = JSON.parse(localStorage.getItem("codesList"));
    }else{
      codesListRec = [];
      localStorage.setItem("codesList", JSON.stringify(codesListRec));
    }
      return codesListRec;
  }

  static deleteCodeList(){
    let codes = [];
    localStorage.setItem("codesList", JSON.stringify(codes));
    const alertDeleteList = new alerts("alert-success", `Se ha eliminado
                            el listado con éxito.`, 3000);
    alertDeleteList.showAlerts();
    table(codes, "reverse");
  }
  static deleteCodeListAsk(){
    let codesRev = codesC.getCodes();
    if(codesRev.length > 0){
      let option = confirm(`¿Estás seguro de eliminar el listadod de códigos?`);
      if(option == true){
          codesC.deleteCodeList();
        }
    }else {
      const alertDeleteEmptyList = new alerts("alert-danger", `No pudes
                                    eliminar un listado vacio.`, 3000);
      alertDeleteEmptyList.showAlerts();
    }
  }

  deleteCode(){
    let codes = codesC.getCodes();
    let indice = this.code - 1;
    let code = codes[indice][0];
    let amount = codes[indice][1];
    let option = confirm(`¿Estás seguro de eliminar el código ${code} con ${amount} pares ?`);
    if (option == true){
      codes.splice(indice,1)
      const alarmCodeDelete = new alerts('alert-danger', `
                              correlativo eliminado: ${this.code}<br>
                              Código eliminado: ${code}<br>
                              Cantidad de Pares: ${amount}<br>`, 5000);
      alarmCodeDelete.showAlerts();
      localStorage.setItem("codesList", JSON.stringify(codes));
    }
      codes = codesC.getCodes();
      table(codes, "reverse");
  }

static saveCodesList(){
    let codes = codesC.getCodes();
    let colectConfig = configColectorC.getColector("colectConfig");
    if (codes.length >= 1) {
      let option = confirm(`¿Estás seguro de guardar el listado de códigos?`);
      if(option == true){
        if(colectConfig[0] > 0 && colectConfig[0] <= numberColectorInfo){
          info = {
            codes: codes,
            colector: colectConfig[0],
          }
          const promiseSaveCodes = new Promise((resolve, reject)=>{
            alerts.showLoadingScreen();
            $.post("connection/connection.php", info, function(response){
            }).done(function(response){
                    resolve(response);
                }).fail(function(xhr, textStatus, errorThrown){
                    reject();
                });
          });

          promiseSaveCodes.then(res =>{
            res = JSON.parse(res);
            if(res[0] == true){
              codesC.deleteCodeList();
              const alertSaveList = new alerts("alert-success", `Se ha guardado
                                    el listado con éxito en el correlativo
                                    ${res[1]}.`, 3000);
              alertSaveList.showAlerts();
              alerts.hideLoadingScreen();
            }else{
              const alertSaveSerPro = new alerts("alert-danger", `Se had detectado un
                                      problema. Contacto con tu administrador`,3000);
              alertSaveSerPro.showAlerts();
              alerts.hideLoadingScreen();
            }
          }).catch(err =>{
            console.log(err);
            const alertDontSaveList = new alerts("alert-danger", `No se pudo
                                      guardar el listado debido a un problema de
                                      conexión. Intenta de nuevo.`, 3000);
            alertDontSaveList.showAlerts();
            alerts.hideLoadingScreen();
          });
        }
        else{
          alertNoConfig.showAlerts();
        }
      }
    }else {
      const alertSaveEmptyList = new alerts("alert-danger", `No puedes guardar
                                  un listado vacio.`, 3000);
      alertSaveEmptyList.showAlerts();
    }
  }

  static deleteCodesRev(corDel){
    if(cor>0){
      let option = confirm('¿Estás seguro de borrar este listado de código de la base de dato');
      if(option = true){
        const promiseDeleteCodesRev = new Promise((resolve, reject)=>{
          alerts.showLoadingScreen();
          $.post("connection/connection.php", {corDel}, function(response){
          }).done(function(response){
                  resolve(response);
              }).fail(function(xhr, textStatus, errorThrown){
                  reject();
              });
        });

        promiseDeleteCodesRev.then(res =>{
          console.log('bien');
        }).catch(err =>{
          console.log(err);
        });
      }
    }else{
      const alertNoCorSelected = new alerts('alert-danger', `Debe seleccionar un
                                  correlativo.`, 3000);
      alertNoCorSelected.showAlerts();
    }
  }

}

function table(codes, sequence){
  let length;
  if(sequence == "reverse"){
    codes = codes.reverse();
    length = codes.length;
  }else if(sequence == "direct"){
    length = 1;
    codes = codes;
  }
  console.log(codes);
  let elementTable = "";
  let numeroCode = 1;

  for(i = 0; i<codes.length; i++){
    elementTable += `
                    <tr>
                      <td scope="col" class="px-4 py-2">${length}</td>
                      <td scope="col" class="px-4 py-2">${codes[i][0]}</td>
                      <td scope="col" class="px-4 py-2">${codes[i][1]}</td>
                      <td scope="col" class="px-4 boton-delete p-2 text-center text-danger"><i class="fas fa-trash-alt delete" code="${length}"></i></td>
                    </tr>`;
    if(sequence == "reverse"){
      length--;
    }else if (sequence == "direct"){
      length++;
    }
  }
  $("#codesInfoBody").html(elementTable);
  if(codes.length > 0){
    $("#lastcode").html(codes[0][0]);
    $("#amountlastcode").html(codes[0][1]);
    $("#lengthCodes").html(codes.length);
  }else{
    $("#lastcode").html(0);
    $("#amountlastcode").html(0);
    $("#lengthCodes").html(0);
  }

}


function callList(correlative){
  let codes = [];
  let code = [];
  $.post("connection/connection.php", {correlative}, function(response){
          res = JSON.parse(response);
          console.log(res);
          res.forEach((element) => {
            code.push(element["codigo"]);
            code.push(element["cantidad"]);
            codes.push(code);
            code = [];
          });
          table(codes, "direct");
          $('.boton-delete').remove();
      });
  }

function cleanCode(code){
  const regEx = new RegExp(/STK|stk|sTk|DCN|dcn|dCn,/, 'g');
    code = code.replace(regEx, '');
  return code;
}

function ajustarTamaño() {
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

function correlativeList(colectorRequest){
    $.post("connection/connection.php", {colectorRequest}, function(response){
        let res = JSON.parse(response);
        let options = `<option value="0">Seleccionar</option>`;
        res.forEach((option) => {
          options += `<option value="${option["id"]}">${option["id"]}</option>`
        });
        $("#select-correlative-No").html(options);
      });
}
