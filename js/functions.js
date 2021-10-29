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

  static saveInputConfig(conIn){
    let config = configColectorC.getConfig();
    config[0]['colect']['input'] = conIn;
    localStorage.setItem("config", JSON.stringify(config));
  }

  static showConfig(){
      let config = configColectorC.getConfig("config");
      $("#select-config-In").val(config[0]['colect']['input']);

      $("#colectId").html(`<p>ID: <span class="text-capitalize">${config[0]['colect']['colectName']}</span></p>`);
    }

  static reviewStatus(){
    alerts.showLoadingScreen();
    let config = configColectorC.getConfig();
    if(config[0]["colect"]["codeReg"].length == 44
    && config[0]["colect"]["codeDevice"].length == 44){
      let codeReg = config[0]["colect"]["codeReg"];
      let codeDevice = config[0]["colect"]["codeDevice"];
      let info = {
        codeRegIn: codeReg,
        codeDeviceIn: codeDevice,
      }
      const reviewIdPromise = new Promise((resolve, reject)=>{
        $.post("connection/connection.php", info, function(response){})
        .done(function(response){
          console.log(response);
          let res = JSON.parse(response);

          config[0]['colect']['colectStatus'] = res['resCol'];
          config[0]['inventory']['inventId'] = res['resInvId'];
          config[0]['inventory']['inventStatus'] = res['resInv'];
          config[0]['inventory']['inventBranchOffice'] = res['resInvBranch'];
          localStorage.setItem("config", JSON.stringify(config));

          if(res['resCodeReg'] == false
          || res['resCol'] == 0
          || res['resInv'] == 0){
            reject(res);
          }
          else if(res['resCodeReg'] == true
          && res['resCol'] == 1
          && res['resInv'] == 1){
            resolve(res);
          }
          else{
            reject(res);
          }
        }).fail(function(response){
            reject();
        });
      });

      reviewIdPromise.then(res =>{
        alerts.hideLoadingScreen();
        $('#code_product').removeAttr('readonly').focus();
      }).catch(err =>{
        console.log(err);
        alerts.hideLoadingScreen();
        if(err['resInv'] == 0){
          let codes = [];
          localStorage.setItem("codesList", JSON.stringify(codes));
        }
        const alertReviewID = new alerts('alert-danger', err['message'], 5000);
        alertReviewID.showAlerts();

        if(err['resCodeReg']== false){
          setTimeout(()=>{
            location.replace('?ruta=login');
          },5000);
        }
      });
    }else{
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
    let amount;
    let config = configColectorC.getConfig('config');
    let input = parseInt(config[0]['colect']['input']);
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
            console.log('caso1')
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
            if(reviewCode2 == true){
              amount = parseInt(prompt("Ingrese la cantidad de pares", "0"));
            }else{
              $("#code_product").val("");
              return;
            }
          break;
        }
        codeI.push(this.code, amount, 'text-dark');
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
            console.log(length);
            console.log('1');
            return true;
        }else if(length == 21 && regCode2.test(code)){
            console.log('2');
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
    const regCode1 = new RegExp(/[0-9]{11}-{1}[0-9]{1}[A-Za-z]{1}[0-9]{5}\s{2}/);
    const regCode2 = new RegExp(/[0-9]{11}-{1}[0-9]{1}[A-Za-z]{1}[0-9]{5}[.]{1}5{1}/);
    const regCode3 = new RegExp(/[0-9]{11}-{1}[0-9]{1}[A-Za-z]{1}[0-9]{3}[A-za-z]+\s+/);
    let length = code.length;
    if(length == 21 && regCode1.test(code)){
        console.log(length);
        console.log('1');
        return true;
    }else if(length == 21 && regCode2.test(code)){
        console.log('2');
        return true;
    }else if(length == 21 && regCode3.test(code)){
        return true;
    }
    else{
        const alertErrorStCode = new alerts("alert-danger", `El código no comple
                                    con los parametros necesarios`, 0);
        alertErrorStCode.showAlertsBotton();
        return false;
      }
  }

  static getCodes(){
    let codesListRec;
    if(localStorage.getItem("codesList")){
      codesListRec = JSON.parse(localStorage.getItem("codesList"));
    }else{
      codesListRec = [0];
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
    let config = configColectorC.getConfig("config");
    if (codes.length >= 1) {
      if(config[0]['colect']['colectStatus'] == 1){
        let option = confirm(`¿Estás seguro de guardar el listado de códigos?`);
        if(option == true){
            info = {
              codes: codes,
              codeReg: config[0]['colect']['codeReg'],
              codeDevice: config[0]['colect']['codeDevice'],
            }
            const promiseSaveCodes = new Promise((resolve, reject)=>{
              alerts.showLoadingScreen();
              $.post("connection/connection.php", info, function(response){
              }).done(function(response){
                  console.log(response);
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
              const alertDontSaveList = new alerts("alert-danger", `No se pudo
                                        guardar el listado debido a un problema de
                                        conexión. Intenta de nuevo.`, 3000);
              alertDontSaveList.showAlerts();
              alerts.hideLoadingScreen();
            });
        }
      }else{
        const alert = new alerts("alert-danger", `No puedes guardar este listado.
                                  Tu colector está deshabilitado.`, 3000);
        alert.showAlerts();
      }
    }else {
      const alert = new alerts("alert-danger", `No puedes guardar
                                  un listado vacio.`, 3000);
      alert.showAlerts();
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

        }).catch(err =>{

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

  for(i = 0; i<codes.length; i++){
    elementTable += `
                    <tr>
                      <td scope="col" class="px-4 py-2">${length}</td>
                      <td scope="col" class="px-4 py-2 ${codes[i][2]}">${codes[i][0]}</td>
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

/*function cleanCode(code){
  const regEx = new RegExp(/STK|stk|sTk|DCN|dcn|dCn,/, 'g');
    code = code.replace(regEx, '');
  return code;
}*/

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
