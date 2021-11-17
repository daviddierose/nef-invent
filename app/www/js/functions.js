const hosting = "http://localhost/nefnodel/inventario/connection/connection.php";
//const hosting = "https://www.nefnodel.com/inventario/connection/connection.php";

const get = url => new Promise((resolve, reject)=>{
  $.get(url,function(response){})
  .done(function(response){
    let res = JSON.parse(response);
    if(res['reqStatus']==true){resolve();}
  }).fail(function(){
     reject();});
})

const post = (url, info)=> new Promise((resolve, reject)=>{
  $.post(url, info, function(response){})
  .done(function(response){
    console.log(response);
    let res = JSON.parse(response);
    resolve(res);
  }).fail(function(){
     reject();
  });
})

const reqAlerts = (res,fun)=>new Promise((resolve, reject)=>{
  let color;
  let resp = false;
  let message;
    if(fun == 'reviewStatus'){
       if(res['reqStatus']==true){
          if(page == 'in-code'){
            const alert = new alerts('alert-success' , res['message'], res['messDelayTime']);
            alert.showAlerts();
          }
          resp = true;
       }else if(res['reqStatus']==false){
         const alert = new alerts('alert-danger' , `<center>
                                                    <p class='font-weight-bold'>!Alerta!</p>
                                                    ${res['message']}
                                                    </center>`, res['messDelayTime']);
         alert.showAlerts();
       }
       alerts.hideLoadingScreen();
    }else if(fun == ''){
      if(res['reqStatus']==true){
           color = 'alert-success';
           resp = true;
           message = `<center>
                        <p class='font-weight-bold'>¡En hora buena!</p>
                        ${res['message']}
                      </center>`;
      }else if(res['reqStatus']==false){
        color = 'alert-danger';
        message = `<center>
                     <p class='font-weight-bold'>¡Alerta!</p>
                     ${res['message']}
                   </center>`;
      }
      const alert = new alerts(color , message, res['messDelayTime']);
      alert.showAlerts();
      alerts.hideLoadingScreen();
    }
   resolve(resp);
})

class alerts{
  constructor(color, text, delayTime){
    this.color = color;
    this.text = text;
    this.delayTime = delayTime;
  }
  showAlerts(){
    $(`#Alert-text`).html(this.text);
    $('#medio').addClass(this.color);
    $('#row-alert').fadeIn(200);
    //navigator.vibrate(500);
    setTimeout(()=>{
      $(`#row-alert`).fadeOut(200);
      $('#medio').removeClass(this.color);
    }, parseInt(this.delayTime));
}

  showAlertsBotton(){
    $(`#Alert-text`).html(this.text);
    $('#medio').addClass(this.color);
    $('#alert-boton').toggleClass('d-none');
    $('#code_product').blur();
    $('#row-alert').fadeIn(200);
    //navigator.vibrate(5000);
    music.play();
    music.loop =true;
    alarmaCodeWrong = setInterval(()=>{
      $('#medio').toggleClass('alert-danger');
      $('#medio').toggleClass('alert-success');
      var sta = $('#row-alert').css('display');
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
        return colectConfigFun;
      }else{
        let colectConfigCreate = {'colect':{
                                    'codeReg':'',
                                    'colectName':'',
                                    'colectStatus':0,
                                    'input': 0},
                                  'inventory':{
                                    'inventStatus':0,
                                    'inventBranchOffice':'',
                                    'inventId': 0}
                                  };
        localStorage.setItem("config", JSON.stringify(colectConfigCreate));
        return colectConfigCreate;
      }
   }

  static saveInputConfig(conIn){
    let codes = codesC.getCodes();
    let config = configColectorC.getConfig();
    if(codes.length == 0 ){
      config['colect']['input'] = conIn;
      localStorage.setItem("config", JSON.stringify(config));
    }else{
      const alert = new alerts('alert-danger', `<center>
                                                  <p class='font-weight-bold'>¡Alerta!</p>
                                                    Tienes un listado iniciado.
                                                    Es necesario que el listado esté vacío para
                                                    cambiar la configuración.
                                                </center>`, 3000);
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
      if(page == 'config-colect'){
        $("#colect-name").val(config['colect']['colectName']);
        $("#colect-code").val(config['colect']['codeReg']);
      }
    }

  static reviewStatus(){
    return new Promise((resolve, reject)=>{
        let config = configColectorC.getConfig();
        if(config["colect"]["codeReg"].length == 44){
          let codeReg = config["colect"]["codeReg"];
          let info = {
            codeReg: codeReg,
            codeDevice: 777,//device.uuid,
            reqAct: 'checkStatus',
          }
          alerts.showLoadingScreen();
          post(hosting, info)
            .then(res =>{reqAlerts(res, 'reviewStatus').then(resp=>{
                                                              if(resp==true){
                                                              if(page == 'review-list'){
                                                              reviewCodeList.correlativeList()}
                                                                    }})
                          return res})
            .then(res=>{checkResponse(res, config, "");
                        configColectorC.showConfig();
                        })
            .catch(err =>{alert(err);
                          alerts.hideLoadingScreen();});
        }else{
            if(page != 'login' && page != 'config-colect'){
              setTimeout(()=>{
                location.replace('login.html');
              },100);
            }else{
              let mess;
              if(page == 'login'){
                mess = `<center>
                          <p class='font-weight-bold'>¡Alerta!</p>
                          Colector no configurado.<br>
                          Comunícate con el área técnica.
                        </center>`;
              }else if(page == 'config-colect'){
                mess = `<center>
                          <p class='font-weight-bold'>¡Alerta!</p>
                          Colector no configurado.<br>
                          Debes ingresar un código de registro.
                        </center>`;
              }
              const alert = new alerts('alert-danger', mess, 5000);
              alert.showAlerts();
            }
        }
      resolve(true);
    })
  }

  static saveCodeReg(codeReg){
      let config = configColectorC.getConfig();
      let info = {
        codeReg: codeReg,
        codeDevice: 777,//device.uuid,
        reqAct: 'saveCodeReg',
      };
      alerts.showLoadingScreen();
      post(hosting, info)
        .then(res => {checkResponse(res, config, ""); return res;})
        .then(res=> reqAlerts(res,'').then(res=>{
              if(res==true){
                  configColectorC.showConfig();
               }
              })
            )
         .catch(err =>{alert(err);
                    alerts.hideLoadingScreen();})
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
      const alertEmptyCode = new alerts("alert-danger",`<center>
                                                          <p class='font-weight-bold'>¡Alerta!</p>
                                                          No puedes guardar un código vacío.
                                                        </center>` , 3000);

      alertEmptyCode.showAlerts();
    }else{
      let codes = codesC.getCodes();
      if(codes.length<300){
        switch (input) {
          case 0:
          const alertNoConfig = new alerts("alert-danger", `<center>
                                                              <p class='font-weight-bold'>¡Alerta!</p>
                                                              Tipo de ingreso no seleccionado.<br>
                                                              Abre el menú y selecciona una de las opciones.
                                                            </center>`, 3000);

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
            page = 'introduceAmount';
            let reviewCode2 = codesC.reviewStructureCode(this.code, input);
            if(reviewCode2==true){
                let num = codesC.getAmount();
                if(num >0 && num <501){
                  amount = num;
                }else{
                  $("#code_product").val("");
                  return;
                }
            }else{
              $("#code_product").val("");
              return;
            }
          break;
        }
        codeI = {'code': this.code,
                 'amount': amount,
                 'color': 'text-default',
                };
        codes.push(codeI);
        localStorage.setItem("codesList", JSON.stringify(codes));
        codes = codesC.getCodes();
        table(codes,"reverse");
      }else{
        const alertSpacesLimit = new alerts("alert-danger", `<center>
                                                                <p class='font-weight-bold'>¡Alerta!</p>
                                                                Alcanzaste el límite de códigos.
                                                              </center>`, 3000);
        alertSpacesLimit.showAlerts();
      }
    }
    $("#code_product").val("");
    page = 'in-code';
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
            const alertErrorStCode1 = new alerts("alert-danger", `<center>
                                                                    <p class='font-weight-bold'>¡Alerta!</p>
                                                                    El código no cumple con los parámetros necesarios.
                                                                  </center>`, 0);
            alertErrorStCode1.showAlertsBotton();
            return false;
          }
        break;
      case 2:
        const regCode4 = new RegExp(/[0-9]{13}/);
        if(regCode4.test(code)){
          return true
        }else{
          const alertErrorStCode2 = new alerts("alert-danger", `<center>
                                                                  <p class='font-weight-bold'>¡Alerta!</p>
                                                                  El código no cumple con los parámetros necesarios.
                                                                </center>`, 0);

          alertErrorStCode2.showAlertsBotton();
          return false;
        }
        break;
    }
  }

  static getAmount(){
    const amountReg = new RegExp(/[0-9]/);
    let amount = prompt("ingrese la cantidad de pares");
    if(amountReg.test(amount)){
        if(amount == 0){
          const alert = new alerts("alert-danger", `<center>
                                                      <p class='font-weight-bold'>¡Alerta!</p>
                                                      La cantidad no puede ser 0.
                                                    </center>`, 2000);
          alert.showAlerts();
          return amount;
        }else if(amount > 500){
          const alert = new alerts("alert-danger", `<center>
                                                      <p class='font-weight-bold'>¡Alerta!</p>
                                                      No puedes ingresar más de 500 pares a la vez.
                                                    </center>`, 3000);
          alert.showAlerts();
          return amount;
        }else{
          return amount;
        }
    }else{
      const alert = new alerts("alert-danger", `<center>
                                                 <p class='font-weight-bold'>¡Alerta!</p>
                                                 El dato ingresado no es un número.
                                                </center>`, 2000);
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
      let option = confirm(`¿Estás seguro de eliminar el listado de códigos?`);
      if(option == true){
          codesC.deleteCodeList();
          const alertDeleteList = new alerts("alert-success", `<center>
                                                                <p class='font-weight-bold'>¡En hora buena!</p>
                                                                Se ha eliminado el listado con éxito.
                                                               </center>`, 2000);
          alertDeleteList.showAlerts();
        }
    }else {
      const alertDeleteEmptyList = new alerts("alert-danger", `<center>
                                                                 <p class='font-weight-bold'>¡Alerta!</p>
                                                                 No pudes eliminar un listado vacío.
                                                               </center>`, 2000);


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
                              Correlativo eliminado: ${this.code}<br>
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
            let option = confirm(`¿Estás seguro de guardar este listado de códigos?`);
            if(option == true){
                alerts.showLoadingScreen();
                let codesAbst = codesC.codeAbstract(codes, config['colect']['input']);
                info = {
                  codes: codes,
                  codesAbst: codesAbst,
                  codeReg: config['colect']['codeReg'],
                  codeDevice: 777,//device.uuid,
                  reqAct: 'saveCodesList',
                };
                post(hosting, info)
                  .then(res=>{checkResponse(res, config, codes); return res})
                  .then(res=> reqAlerts(res,'').then(res=>{
                          if(res==true){
                              codesC.deleteCodeList();
                           }
                          })
                        )
                  .catch(err=>{alert(err);
                                alerts.hideLoadingScreen();});

            }
          }else{
            const alert = new alerts("alert-danger", `<center>
                                                         <p class='font-weight-bold'>¡Alerta!</p>
                                                         No puedes guardar este listado.<br>
                                                         Tu colector está deshabilitado.
                                                       </center>`, 4000);

            alert.showAlerts();
          }
        }else{
          const alert = new alerts("alert-danger", `<center>
                                                     <p class='font-weight-bold'>¡Alerta!</p>
                                                     No puedes guardar este listado.<br>
                                                     No existe un inventario activo.
                                                   </center>`, 4000);

          alert.showAlerts();
        }
      }else{
        const alert = new alerts("alert-danger", `<center>
                                                   <p class='font-weight-bold'>¡Alerta!</p>
                                                   Hay códigos que necesitan ser revisados.<br>
                                                   No puedes guardar el listado hasta haber corregido
                                                   el problema.
                                                 </center>` , 5000);

        alert.showAlerts();
      }
    }else {
      const alert = new alerts("alert-danger", `<center>
                                                   <p class='font-weight-bold'>¡Alerta!</p>
                                                   No puedes guardar un listado vacío.
                                                 </center>`, 4000);
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
            element['color'] = 'table-danger';
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
    totalAmount += parseInt(codes[i]['amount']);
    elementTable += `
                    <tr class="${codes[i]['color']}">
                      <td scope="col" class="px-4 py-3">${length}</td>
                      <td scope="col" class="px-4 py-3 ">${codes[i]['code']}</td>
                      <td scope="col" class="px-4 py-3">${codes[i]['amount']}</td>
                      <td scope="col" class="px-4 boton-delete py-3 text-center text-danger"><span class="icon-backspace mr-2 delete" code="${length}"></span></td>
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
          let info = {codeReg: config['colect']['codeReg'],
                      codeDevice: 777,//device.uuid,
                      reqAct: 'getCorrelativeList',};
          post(hosting, info)
            .then(res=>{checkResponse(res, config, ''); return res})
            .then(res=> reqAlerts(res,'').then(resp=>{
                      if(page == 'review-list'){
                        let options = `<option value="0">Seleccionar</option>`;
                        if(resp==true){
                            if(res['corrByColID'] != null){
                                res['corrByColID'].forEach((option) => {
                                options += `<option value="${option["id"]}">${option["id"]}</option>`
                                });
                            $("#select-correlative-No").html(options);
                          }
                        }else if(resp==false){
                          $("#select-correlative-No").html(options);
                        }
                      }
                    })
                 )
            .catch(err =>{alert(err);
                          alerts.hideLoadingScreen();});
  }

  static callCodeList(correlative){
    if(correlative>0){
        let codes = [];
        let code = [];
        let config = configColectorC.getConfig();
        let info = {codeReg: config['colect']['codeReg'],
                    codeDevice: 777,//device.uuid,
                    correlative: correlative,
                    reqAct: 'getCodeList',
                  };
          post(hosting, info)
            .then(res=>{checkResponse(res, config, ''); return res})
            .then(res=>{
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
                } return res})
            .then(res=>reqAlerts(res,''))
            .catch(err=>{ alert(err);
                          alerts.hideLoadingScreen();})
      }else{
        const alert = new alerts('alert-danger', `<center>
                                                   <p class='font-weight-bold'>¡Alerta!</p>
                                                   Debes seleccionar un correlativo.
                                                 </center>`, 2000);

        alert.showAlerts();
      }
    }

    static deleteCodesRev(correlative){
      if(correlative>0){
        let config = configColectorC.getConfig();
        let info = {codeReg: config['colect']['codeReg'],
                    codeDevice: 777,//device.uuid,
                    correlative: correlative,
                    reqAct: 'deleteCodeList',
                  };
        let option = confirm(`¿Estás seguro de borrar el correlativo ${correlative}, con ${amountRev} pares, de la base de datos.`);
        if(option == true){
          alerts.showLoadingScreen();
          post(hosting, info)
            .then(res=> reqAlerts(res,'').then(res=>{
                    if(res==true){
                        reviewCodeList.correlativeList();
                        let codes = [];
                        table(codes, 'reverse');
                     }
                    })
                  )
            .catch(err=>{ alert(err);
                          alerts.hideLoadingScreen();})
        }else{
          return
        }
      }else{
        const alert = new alerts('alert-danger', `<center>
                                                    <p class='font-weight-bold'>¡Alerta!</p>
                                                    Debe seleccionar un correlativo.
                                                  </center>`, 3000);
        alert.showAlerts();
      }
    }
}

class style{
  static ajustarTamaño() {
      /*General*/
      $('#sidebarCollapseM').removeClass('d-none');
      //Formularios
      $('.col-sm-6').addClass('col-sm-12').removeClass('col-sm-6');
      $('.btn-azulSec').addClass('btn-lg').css('text-transform','uppercase');
      $('.alertsRow').css('font-size','1.2rem');
      $("#Alert-text").removeClass('pt-5, px-5')
      $("#colectId, #inventId, #sucursal").removeClass('col-sm-12').addClass('col-sm-4');

    if($("#form-row-ajust").length > 0){
      let heightR = $(window).height();
      let heightD = $("#login-form-div").height() || $("#alertBad").height() || $("#alertOk").height() ;
      let heightF = heightR - heightD;
      $("#form-row-ajust").css("height", heightF);
    }
  }
}



function checkResponse(res, config, codes){
  config['colect']['colectStatus'] = res['colStatus'];
  config['inventory']['inventId'] = res['invId'];
  config['inventory']['inventStatus'] = res['invStatus'];
  config['inventory']['inventBranchOffice'] = res['invBranch'];

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

  if(page == 'config-colect' && res['colReg']==true && res['codeRegDev'] !=null){
    config['colect']['codeReg'] = res['codeRegDev'];
    config['colect']['colectName'] = `colector ${res['colId']}`;
  }else if(res['colReg']==false){
    if(config['colect']['codeReg'].length !=44
    && config['colect']['codeReg'].length !=0
    && page != 'config-colect'){
      config['colect']['codeReg'] = '';
      config['colect']['colectName'] = '';
      setTimeout(()=>{
        location.replace('login.html');
      },res['messDelayTime']);
    }
  }

  if(res['reqStatus'] == false && res['codeErr'] != null){
    codesC.showCodesError(res['codeErr'], codes, config['colect']['input']);
  }

  localStorage.setItem("config", JSON.stringify(config));

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
    post(hosting, info)
    .then(res=> reqAlerts(res,'').then(resp=>{
                if(resp==true){
                    location.replace(res['route']);
                }})
         )
    .catch(err =>{alert(err);
                  alerts.hideLoadingScreen();});
  }
}
