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



class configColectorC{
  constructor(colect, config){
    this.colect = colect;
    this.config = config;
  }

  static getConfig(){
      let colectConfigFun;
      if(localStorage.getItem('config')){
        colectConfigFun = JSON.parse(localStorage.getItem('config'));
      }else{
        let colectConfigCreate = {'colect':{
                                    'codeReg':'',
                                    'codeDevice':'',
                                    'colectName':'',
                                    'colectStatus':0,
                                    'input': 0},
                                  'inventory':{
                                    'inventStatus':0,
                                    'inventBranchOffice':'',
                                    'inventId': 0}
                                  };
        localStorage.setItem("config", JSON.stringify(colectConfigCreate));
      }
        return colectConfigFun;
   }

  static saveInputConfig(conIn){
    let codes = codesC.getCodes();
    let config = configColectorC.getConfig();
    if(codes.length == 0 ){
      config['colect']['input'] = conIn;
      localStorage.setItem("config", JSON.stringify(config));
    }else{
      const alert = new alerts('alert-danger', `tienes un listado iniciado.
                                Debes Guardar antes de cambiar la configuración.`, 3000);
      alert.showAlerts();
    }
      configColectorC.showConfig();
  }

  static showConfig(){
      let config = configColectorC.getConfig();
      $("#select-config-In").val(config['colect']['input']);
      $("#colectId").html(`<p>ID: <span class="ml-2 text-capitalize">
                          ${config['colect']['colectName']}</span></p>`);
      $("#inventId").html(`<p>Inventario: <span class="ml-2 text-capitalize">
                          ${config['inventory']['inventId']}</span></p>`);
      $("#sucursal").html(`<p>Tienda: <span class=" ml-2 text-capitalize">
                          ${config['inventory']['inventBranchOffice']}</span></p>`);
    }

  static reviewStatus(){
    alerts.showLoadingScreen();
    let config = configColectorC.getConfig();
    if(config["colect"]["codeReg"].length == 44
    && config["colect"]["codeDevice"].length == 44){
      let codeReg = config["colect"]["codeReg"];
      let codeDevice = config["colect"]["codeDevice"];
      let info = {
        codeReg: codeReg,
        codeDevice: codeDevice,
        reqAct: 'checkStatus',
      }
      const reviewIdPromise = new Promise((resolve, reject)=>{
        $.post("connection/connection.php", info, function(response){})
        .done(function(response){
          console.log(response);
          let res = JSON.parse(response);
          checkResponse(res, config, "");
          if(res['reqStatus'] == false){
            reject(res);
          }
          else if(res['reqStatus'] == true){
            resolve(res);
          }
        }).fail(function(){
            reject();
        });
      });

      reviewIdPromise.then(res =>{
        const alertPromise = new Promise((resolve, reject)=>{
          const alertReqStatus = new alerts('alert-success', res['message'], res['messDelayTime']);
          alertReqStatus.showAlerts();
          resolve();
        }).then(res=>{
          if(!!document.getElementById("select-correlative-No")){
            reviewCodeList.correlativeList();
          }
          alerts.hideLoadingScreen();
        });
      }).catch(err =>{
        const alertReqStatus = new alerts('alert-danger', err['message'], err['messDelayTime']);
        alertReqStatus.showAlerts();
        alerts.hideLoadingScreen();
      });
    }else{
      const alertPreReq = new alerts('alert-danger', `Colector no configurado,
                                  Comunicate con el administrador.`, 5000);
      alertPreRe.showAlerts();
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
    let amount;
    let config = configColectorC.getConfig('config');
    let input = parseInt(config['colect']['input']);
    if(this.code.length == 0){
      const alertEmptyCode = new alerts("alert-danger", `No puedes
                            guardar un código vacio.`, 3000);
      alertEmptyCode.showAlerts();
    }else{
      let codes = codesC.getCodes();
      if(codes.length<500){
        switch (input) {
          case 0:
          const alertNoConfig = new alerts("alert-danger", `Tipo de ingreso no seleccionado.
                                      Abre el menú y selecciona una de las opciones.`, 5000);
          alertNoConfig.showAlerts();
          return;
          break;
          case 1:
            let reviewCode1 = codesC.reviewStructureCode(this.code, input);
            if(reviewCode1 == true){
              amount = parseInt(1);
            }else{
              $("#code_product").val("");
              return;
            }
          break;
          case 2:
            let reviewCode2 = codesC.reviewStructureCode(this.code, input);
            let num = codesC.getAmount();
            if(reviewCode2 == true && num >0 && num <101){
              amount = num;
            }else{
              $("#code_product").val("");
              return;
            }
          break;
        }
        codeI = {'code': this.code,
                 'amount': amount,
                 'color': 'text-dark',
                };
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
    $("#code_product").val("");
  }

  static reviewStructureCode(code, config){
    switch (config) {
      case 1:
        const regCode1 = new RegExp(/[0-9]{11}-{1}[0-9]{1}[A-Za-z]{1}[0-9]{5}\s{2}/);
        const regCode2 = new RegExp(/[0-9]{11}-{1}[0-9]{1}[A-Za-z]{1}[0-9]{5}[.]{1}5{1}/);
        const regCode3 = new RegExp(/[0-9]{11}-{1}[0-9]{1}[A-Za-z]{1}[0-9]{3}[A-za-z]+\s+/);
        let length = code.length;
        if(length == 21 && regCode1.test(code)){
            return true;
        }else if(length == 21 && regCode2.test(code)){
            return true;
        }else if(length == 21 && regCode3.test(code)){
            return true;
        }
        else{
            const alertErrorStCode1 = new alerts("alert-danger", `El código no comple
                                        con los parametros necesarios`, 0);
            alertErrorStCode1.showAlertsBotton();
            return false;
          }
        break;
      case 2:
        const regCode4 = new RegExp(/[0-9]{13}/);
        if(regCode4.test(code)){
          return true
        }else{
          const alertErrorStCode2 = new alerts("alert-danger", `El código no comple
                                      con los parametros necesarios`, 0);
          alertErrorStCode2.showAlertsBotton();
          return false;
        }
        break;
    }
  }

  static getAmount(){
    const amountReg = new RegExp(/[0-9]/);
    let amount = prompt("ingrese la cantidad de pares","0");
    if(amountReg.test(amount)){
        if(amount == 0){
          const alert = new alerts("alert-danger", `La cantidad no puede ser 0.`, 2000);
          alert.showAlerts();
          return amount;
        }else if(amount > 100){
          const alert = new alerts("alert-danger", `No puedes ingresar más de 100 pares a la vez.`, 2000);
          alert.showAlerts();
          return amount;
        }else{
          return amount;
        }
    }else{
      const alert = new alerts("alert-danger", `El dato ingresado no es un número`, 2000);
      alert.showAlerts();
      return amount;
    }
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
    table(codes, "reverse");
  }

  static deleteCodeListAsk(){
    let codesRev = codesC.getCodes();
    if(codesRev.length > 0){
      let option = confirm(`¿Estás seguro de eliminar el listadod de códigos?`);
      if(option == true){
          codesC.deleteCodeList();
          const alertDeleteList = new alerts("alert-success", `Se ha eliminado
                                  el listado con éxito.`, 2000);
          alertDeleteList.showAlerts();
        }
    }else {
      const alertDeleteEmptyList = new alerts("alert-danger", `No pudes
                                    eliminar un listado vacio.`, 2000);
      alertDeleteEmptyList.showAlerts();
    }
  }

  deleteCode(){
    let codes = codesC.getCodes();
    let indice = this.code - 1;
    let code = codes[indice]['code'];
    let amount = codes[indice]['amount'];
    let option = confirm(`¿Estás seguro de eliminar el código ${code} con ${amount} pares ?`);
    if (option == true){
      codes.splice(indice,1)
      const alarmCodeDelete = new alerts('alert-danger', `
                              correlativo eliminado: ${this.code}<br>
                              Código eliminado: ${code}<br>
                              Cantidad de Pares: ${amount}<br>`, 2000);
      alarmCodeDelete.showAlerts();
      localStorage.setItem("codesList", JSON.stringify(codes));
    }
      codes = codesC.getCodes();
      table(codes, "reverse");
  }

static saveCodesList(){
    let codes = codesC.getCodes();
    let wrongCodes = codesC.checkWrongCodes(codes);
    let config = configColectorC.getConfig("config");
    if (codes.length >= 1) {
      if(wrongCodes == true){
      if(config['inventory']['inventStatus'] == 1){
          if(config['colect']['colectStatus'] == 1){
            let option = confirm(`¿Estás seguro de guardar el listado de códigos?`);
            if(option == true){
                alerts.showLoadingScreen();
                let codesAbst = codesC.codeAbstract(codes, config['colect']['input']);
                info = {
                  codes: codes,
                  codesAbst: codesAbst,
                  codeReg: config['colect']['codeReg'],
                  codeDevice: config['colect']['codeDevice'],
                  reqAct: 'saveCodesList',
                };
                console.log(info);
                const promiseSaveCodes = new Promise((resolve, reject)=>{
                  $.post("connection/connection.php", info, function(response){})
                   .done(function(response){
                      console.log(response);
                      let res = JSON.parse(response);
                      console.log(res);
                      checkResponse(res, config, codes);
                      if(res['reqStatus'] == true){
                        resolve(res);
                      }else if(res['reqStatus'] == false){
                        reject(res);
                      }
                    }).fail(function(){
                          reject();
                      });
                });

                promiseSaveCodes.then(res =>{
                    const alert = new alerts("alert-success", res['message'], res['messDelayTime']);
                    alert.showAlerts();
                    alerts.hideLoadingScreen();
                    codesC.deleteCodeList();
                }).catch(err =>{
                    const alert = new alerts("alert-danger", `<p class="text-center font-weight-bold">No se puede Guardar El listado</p>${err['message']}`, err['messDelayTime']);
                    alert.showAlerts();
                    alerts.hideLoadingScreen();
                });
            }
          }else{
            const alert = new alerts("alert-danger", `No puedes guardar este listado.
                                      Tu colector está deshabilitado.`, 4000);
            alert.showAlerts();
          }
        }else{
          const alert = new alerts("alert-danger", `No puedes guardar este listado.
                                    No existe un inventario activo.`, 4000);
          alert.showAlerts();
        }
      }else{
        const alert = new alerts("alert-danger", `Hay códigos que necesitan ser revisados.
                                  No puedes guardar el listado hasta haber sido corregido
                                  el problema.`, 5000);
        alert.showAlerts();
      }
    }else {
      const alert = new alerts("alert-danger", `No puedes guardar
                                  un listado vacio.`, 4000);
      alert.showAlerts();
    }
  }


  static codeAbstract(codes, input){
    let codesAbst = [];
    let code;
    codes.forEach((element) => {
      if(input == 1){
        code = element['code'].substring(0,17);
      }
      else if(input == 2){
        code = element['code'];
      }

      if(codesAbst.includes(code) == false){
          codesAbst.push(code);
      }
    });
    return codesAbst;
  }

  static checkWrongCodes(codes){
    let check = true;
    let color = [];
    codes.forEach((element) => {
      color.push(element['color']);
    });
    if(color.includes('text-danger')){
      check = false;
    }
    return check;
  }

  static showCodesError(codesAbst, codes, input){
    let code;
    codesAbst.forEach((codeAbs) => {
      codes.forEach((element) => {
        if(input == 1){
          code = element['code'].substring(0,17);
        }
        else if(input == 2){
          code = element['code'];
        }

        if(code == codeAbs){
            element['color'] = 'text-danger';
        }
      });
    });
    localStorage.setItem("codesList", JSON.stringify(codes));
    table(codes, 'reverse');
  }
}

function table(codes, sequence){
  let length;
  switch (sequence) {
    case "reverse":
      codes = codes.reverse();
      length = codes.length;
      break;
    case "direct":
      length = 1;
      codes = codes;
      break;
  }
  let elementTable = "";
  let numeroCode = 1;
  let totalAmount = 0;

  for(i = 0; i<codes.length; i++){
    totalAmount += codes[i]['amount'];
    elementTable += `
                    <tr>
                      <td scope="col" class="px-4 py-2">${length}</td>
                      <td scope="col" class="px-4 py-2 ${codes[i]['color']}">${codes[i]['code']}</td>
                      <td scope="col" class="px-4 py-2">${codes[i]['amount']}</td>
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
    $("#lastcode").html(codes[0]['code']);
    $("#amountlastcode").html(codes[0]['amount']);
    $("#lengthCodes").html(codes.length);
    $("#totalAmount").html(totalAmount);
    amountRev = totalAmount;
  }else{
    $("#lastcode").html(0);
    $("#amountlastcode").html(0);
    $("#lengthCodes").html(0);
    $("#totalAmount").html(0);
  }

}

class reviewCodeList{

  static correlativeList(){
      let config = configColectorC.getConfig();
          if(config['inventory']['inventStatus']==1){
          let info = {codeReg: config['colect']['codeReg'],
                      codeDevice: config['colect']['codeDevice'],
                      reqAct: 'getCorrelativeList',};
          const corrLisPromise = new Promise((resolve, reject)=>{
            $.post("connection/connection.php", info, function(response){})
            .done(function(response){
                console.log(response);
                let res = JSON.parse(response);
                checkResponse(res, config, '');
                if(res['reqStatus'] == true){
                  resolve(res);
                }else if(res['reqStatus'] == false){
                  reject(res);
                }
            }).fail(function(){
                reject();
            });
          }).then(res=>{
            if(res['corrByColID'] != null && res['corrByColID'] != 0){
              let options = `<option value="0">Seleccionar</option>`;
              res['corrByColID'].forEach((option) => {
                options += `<option value="${option["id"]}">${option["id"]}</option>`
              });
              $("#select-correlative-No").html(options);
            }
          }).catch(err=>{
              const alert = new alerts('alert-danger', err['message'], err['messDelayTime']);
              alert.showAlerts();
          });
      }else{
        const alert = new alerts('alert-danger', `No puede revisar los listados.
                                  No exíste un inventario activo.`, 2000);
        alert.showAlerts();
      }
  }

  static callCodeList(correlative){
    if(correlative>0){
        let codes = [];
        let code = [];
        let config = configColectorC.getConfig();
        let info = {codeReg: config['colect']['codeReg'],
                    codeDevice: config['colect']['codeDevice'],
                    correlative: correlative,
                    reqAct: 'getCodeList',
                  };
        const collCodeListPromise = new Promise((resolve, reject)=>{
          $.post("connection/connection.php", info, function(response){})
          .done(function(response){
            console.log(response);
            let res = JSON.parse(response);
            checkResponse(res, config, '');
            if(res['reqStatus'] == true){
              resolve(res);
            }else if(res['reqStatus'] == false){
              reject(res);
            }
          }).fail(function(){
              reject();
          });
        }).then(res=>{
          if(res['codeList']!=null){
              res['codeList'].forEach((element) => {
                code  = {'code': element['codigo'],
                         'amount': parseInt(element['cantidad']),
                         'color': 'text-dark',
                        };
                codes.push(code);
                code = [];
              });
              table(codes, "direct");
              $('.boton-delete').remove();
          }
        }).catch(err =>{
            const alert = new alerts('alert-danger', err['message'], err['messDelayTime']);
            alert.showAlerts();
        });
      }else{
        const alert = new alerts('alert-danger', `Debes seleccionar un correlativo`, 2000);
        alert.showAlerts();
      }
    }

    static deleteCodesRev(correlative){
      if(correlative>0){
        let config = configColectorC.getConfig();
        let info = {codeReg: config['colect']['codeReg'],
                    codeDevice: config['colect']['codeDevice'],
                    correlative: correlative,
                    reqAct: 'deleteCodeList',
                  };
        let option = confirm(`¿Estás seguro de borrar el correlativo ${correlative}, con ${amountRev} pares, de la base de datos.`);
        if(option == true){
          alerts.showLoadingScreen();
          const promiseDeleteCodesRev = new Promise((resolve, reject)=>{
            $.post("connection/connection.php", info, function(response){
            }).done(function(response){
                    let res = JSON.parse(response);
                    if(res['reqStatus']==true){
                      resolve(res);
                    }else if(res['reqStatus']==false){
                      reject(res);
                    }
                    console.log(response);
                }).fail(function(){
                    reject();
                });
          }).then(res =>{
              const alert = new alerts('alert-success', res['message'], res['messDelayTime']);
              alert.showAlerts();
              alerts.hideLoadingScreen();
              reviewCodeList.correlativeList();
          }).catch(err =>{
              const alert = new alerts('alert-danger', err['message'], err['messDelayTime']);
              alert.showAlerts();
              alerts.hideLoadingScreen();
          });
        }else{
          return
        }
      }else{
        const alert = new alerts('alert-danger', `Debe seleccionar un
                                    correlativo.`, 3000);
        alert.showAlerts();
      }
    }
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



function checkResponse(res, config, codes){
  config['colect']['colectStatus'] = res['colStatus'];
  config['inventory']['inventId'] = res['invId'];
  config['inventory']['inventStatus'] = res['invStatus'];
  config['inventory']['inventBranchOffice'] = res['invBranch'];
  if(res['coleReg'] == false){
    config['colect']['codeReg'] = '';
    config['colect']['codeDevice'] = '';
    setTimeout(()=>{
      location.replace('?ruta=login');
    },res['messageTime']);
  }

  if(res['invStatus'] == 1 && res['colStatus'] == 1){
    $('#code_product').removeAttr('readonly').focus();
  }else{
    $('#code_product').attr('readonly', true);
    if(res['invStatus'] == 0){
      let codes = [];
      localStorage.setItem("codesList", JSON.stringify(codes));
      codes = codesC.getCodes();
      table(codes, 'reverse');
    }
  }

  localStorage.setItem("config", JSON.stringify(config));

  if(res['reqStatus'] == false && res['codeErr'] != null){
    codesC.showCodesError(res['codeErr'], codes, config['colect']['input']);
  }

}
