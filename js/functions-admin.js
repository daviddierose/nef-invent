const hosting = "http://localhost/nefnodel/inventario/connection/connection-admin.php";

const post = (url, info)=> new Promise((resolve, reject)=>{
  $.post(url, info, function(response){})
  .done(function(response){
    try{
      let res = JSON.parse(response);
      resolve(res);
    }catch(e){
      console.log(response);
      alerts.hideLoadingScreen();
      const alert = new alerts(response, 3000, false);
      alert.showAlertsTop()
    }
  }).fail(function(jqXHR, textStatus, errorThrown){
    let err;
    if (jqXHR.status === 0) {
      err ='No hay conexión: Verifica tu conexión a internet.';
    } else if (jqXHR.status == 404) {
      err = 'Error 404: Recurso no encontrado.';
    } else if (jqXHR.status == 500) {
      err = 'Error 500: Error interno del servidor.';
    } else if (textStatus === 'parsererror') {
      err = 'Requested JSON parse failed.';
    } else if (textStatus === 'timeout') {
      err = 'Tiempo de espera excedido para está petición.';
    } else if (textStatus === 'abort') {
      err = 'Solicitud ajax abortada.';
    } else {
      err = 'Error Desconocido: ' + jqXHR.responseText;
    }
    reject(err);
  });
})

class style{
//   static ajustarTamaño() {
//     md = new MobileDetect(window.navigator.userAgent);
//     if(md.os() == "AndroidOS"){
//       /*General*/
//       $('h1').css('font-size','3.5rem');
//       $(document.body).css('font-size', '2.2rem');
//       /*sidebar*/
//       $('#sidebar').css('width', $(window).width()).css('height', $(window).height());
//       $('#sidebarCollapseM').removeClass('d-none');
//       $('.logo').css('width', '25%');
//       /*Formularios*/
//       $('.col-sm-6').addClass('col-sm-12').removeClass('col-sm-6');
//       $('.form-control').addClass('form-control-lg').removeClass('form-control');
//       $('.form-control-lg, .custom-select').css('font-size','2.8rem')
//       .css('height', '6rem');
//       $('.btn-azulSec').addClass('btn-lg').css('text-transform','uppercase');
//       $('.btn-lg').removeClass('py-2').addClass('py-3').css('font-size', '2.8rem');
//       /*Alerts*/
//       $('.alertsRow').css('font-size','3.5rem').css('text-transform','uppercase');
//     }
//   }

  static changeBotonsSwitchStyle(col, sta){
    console.log(sta);
    let id = $(`#btn-switch${col}`);
    let check = $(`#checkgood${col}`);
    if(sta == 0){
        id.html('OFF');
    }else if(sta == 1){
        id.html('ON');
    }
    id.toggleClass('bg-primary').toggleClass('bg-danger');
    id.attr('status', sta);
    check.toggleClass('d-none');
    setTimeout(()=>{
      check.toggleClass('d-none');
    }, 1000);
  }
}

class alerts{
  constructor(mess, delayTime, status){
    this.mess = mess;
    this.delayTime = delayTime;
    this.status = status;
    this.tittleAlert;
    this.textAlert;
    this.colorAlert;

    if(this.status == false){
        this.colorAlert = 'alert-danger';
        this.tittleAlert = '¡Alerta!';
    }else if(this.status == true){
      this.colorAlert = 'alert-success';
      this.tittleAlert = '¡En hora buena!';
    }
    this.textAlert = `<span>${this.tittleAlert}</span> ${this.mess}`;
  }

  showAlertsTop(){
    $(`#alertTop`).html(this.textAlert)
    .removeClass('alert-danger, alert-success')
    .addClass(this.colorAlert)
    .slideDown(300);
    setTimeout(()=>{
      $(`#alertTop`).slideUp(300, function(){
      });
    }, parseInt(this.delayTime));
}

  // showAlertsCountdown() {
  //   let newText = this.text + `<br>Si intentara de nuevo en: <br><span
  //                               id="spanAlert">10</span>`;
  //   $(`#Alert`).html(newText);
  //   $('#Alert').addClass(this.color);
  //   $('#row-alert').fadeIn(200);
  //   let time = 10;
  //   setInterval(()=>{
  //     if (time > 0){
  //       time --;
  //       $(`#spanAlert`).html(time);
  //     }else{
  //         clearInterval();
  //     }}, 1000);
  //     setTimeout(()=>{
  //       $(`#row-alert`).fadeOut(200);
  //       $('#Alert').removeClass(this.color);
  //     },this.delayTime);
  // }

  static showLoadingScreen(){
    $('#loading-screen').show();
  }

  static hideLoadingScreen(){
    $('#loading-screen').hide();
  }

}

class colectores{
    constructor(col){
      this.col = col;
    }

    static toggleStatusColect(codeReg){
      let info = {
        codeReg: codeReg,
        reqAct: 'changeColStatus',
      }
      alerts.showLoadingScreen();
      post(hosting, info)
        .then(res=>{
          alerts.hideLoadingScreen();
          style.changeBotonsSwitchStyle(res['colId'], res["colStatus"]);
          const alert = new alerts(res['message'], res['messDelayTime'], res['reqStatus']);
          alert.showAlertsTop()})
        .catch(err=>{
          alerts.hideLoadingScreen();
          const alert = new alerts(err, 2000, false);
          alert.showAlertsTop()
        });
    }


}

//Obtener Info de Inventario
const getInfoInvent = (invent, lastCorr)=>{
  let info = {
    inventId: invent,
    corrId: lastCorr,
    reqAct: 'getInfoInvent'
  }
  alerts.showLoadingScreen();
  post(hosting,info)
    .then(res=>{console.log(res);
          saveInfoVar(res.codeList, 'code');
          saveInfoVar(res.corrByColID, 'corre');
          saveInfoVar(res.providerList, 'provider');
          alerts.hideLoadingScreen();
          const chart = new showCharts(infoInventario);
          chart.showChartColect();
          chart.showChartProviders();
          const codes = new showCodesList(infoInventario);
          codes.getTopInfo();
          codes.showTableInfo('');
          return res})
    .then(res=>{
          const alert = new alerts(res.message, res.messDelayTime, res.reqStatus);
          alert.showAlertsTop()
         })
    .catch(err=>{console.log(err);
           alerts.hideLoadingScreen();
           const alert = new alerts(err, 2000, false);
           alert.showAlertsTop()});
}

//Guardar informacion recibada en variables
const saveInfoVar = (list, type)=>{
  let category;
  switch (type) {
    case 'code':
      category = infoInventario.codes;
      break;
    case 'corre':
      category = infoInventario.correlatives;
      break;
    case 'provider':
      category = infoInventario.providers;
      break;
  }
    list.forEach((element) => {
    category.push(element);
  });
}

class showCharts{
  constructor(info){
    this.codes=info.codes;
    this.corr=info.correlatives;
    this.pro=info.providers;
    this.colectors = {id:[],correlatives:[], amount:[]}
    this.providers = [];
  }

  getColectorsId(){
    this.corr.forEach((element, i) => {
      let corr = []
      if(this.colectors.id.includes(element.colector)!=true){
        this.colectors.id.push(element.colector);
        const correlatives = this.corr.filter(x => x.colector == element.colector);
        correlatives.forEach((item) => {
          corr.push(item.id);
        });
      }
      if(corr.length>0){
        this.colectors.correlatives.push(corr);
      }
    });
  }

  getPairsByColect(){
    this.colectors.id.forEach((colect, i) => {
      let amount = 0;
      this.colectors.correlatives[i].forEach((corr) => {
        this.codes.forEach((codesList) => {
          codesList.forEach((code) => {
            if(code.correlativo == corr){
              amount = amount + parseInt(code.cantidad);
            }
          });
        });
      });
      this.colectors.amount.push(amount);
    });
  }

  getProviders(){
    let providers = {id:[],nombre:[],pairs:[]};
    this.pro.forEach((provider) => {
      let amount = 0;
      providers.id.push(provider.id);
      providers.nombre.push(provider.nombre);
      this.codes.forEach((codeList) => {
        codeList.forEach((code) => {
          if(code.proveedor == provider.id){
            amount = amount + parseInt(code.cantidad);
          }
        });
      });
      providers.pairs.push(amount);
    });
    providers.id.forEach((id, i) => {
      let provider ={id: id,
                            name: providers.nombre[i],
                            pairs: providers.pairs[i]
                           }
      this.providers.push(provider);
    });
  }

  showChartColect(){
    this.getColectorsId();
    this.getPairsByColect();
    let labels = [];
    let data = [];
    this.colectors.id.forEach((colect, i) => {
      labels.push(`Colector ${colect}`);
      data.push(this.colectors.amount[i]);
    });

    chartColBar.data.labels = labels;
    chartColPie.data.labels = labels;
    chartColBar.data.datasets[0].data = data;
    chartColPie.data.datasets[0].data = data;
    chartColBar.update();
    chartColPie.update();
  }

  showChartProviders(){
    this.getProviders();
    let labels = [];
    let data = [];
    let providers = this.providers;
    providers.sort((a,b)=>{
      if(a.pairs < b.pairs){return 1;}
      if(a.pairs > b.pairs){return -1}
      if(a.name < b.name){return 1}
      if(a.name > b.name){return -1}
      return 0
    })
    providers.forEach((provider, i) => {
      if(i <9){
        labels.push(provider.name);
        data.push(provider.pairs);
      }
    });
    chartProveBar.data.labels = labels;
    chartProvePie.data.labels = labels;
    chartProveBar.data.datasets[0].data = data;
    chartProvePie.data.datasets[0].data = data;
    chartProveBar.update();
    chartProvePie.update();
  }
}

class showCodesList{
  constructor(info){
    this.codes = info.codes;
    this.corr = info.correlatives;
    this.pro = info.providers;
  }

  getTopInfo(){
    let totalPairs = 0;
    this.codes.forEach((codes) => {
      codes.forEach((code, i) => {
        totalPairs = totalPairs + parseInt(code.cantidad);
      });
    });
    $('#totalCorr').html(this.corr.length);
    $('#totalPairs').html(totalPairs);
  }

  showTableInfo(colect){
    const contenedor = document.getElementById('codesList');
    const fragment = document.createDocumentFragment();
    let corrs;
    if(colect == ''){
      corrs = this.corr;
    }else{
      corrs = this.corr.filter(x => x.colector == colect);
    }
    corrs.forEach((corr) => {
      const row = document.createElement("TR");
      for(var item in corr){
        if(item == 'id'){
          const td = document.createElement("TD");
          td.innerHTML = corr[item];
          row.appendChild(td);
        }else if(item == 'colector'){
          const td = document.createElement("TD");
          td.innerHTML = 'Colector ' + corr[item];
          row.appendChild(td);

          let pair = 0;
          this.codes.forEach((codesList) => {
            codesList.forEach((code) => {
              if(code.correlativo==corr.id){
                  pair = pair + parseInt(code.cantidad);
              }
            });
          });
          const td2 = document.createElement("TD");
          td2.innerHTML = pair;
          row.appendChild(td2);
        }
        else if(item == 'status'){
          let status;
          if(corr[item]==1){
            status = 'Activo';
          }else if(corr[item]==1){
            status = 'Eliminado';
          }
          const td = document.createElement("TD");
          td.innerHTML = status;
          row.appendChild(td);
        }
      }
      if(corr.status == 1){
        const td = document.createElement("TD");
        const bt = document.createElement("BUTTON");
        bt.innerHTML = 'VER';
        bt.setAttribute('class', 'btn bg-primary text-light btn-table');
        bt.setAttribute('value', corr.id);
        td.appendChild(bt);
        row.appendChild(td);
        fragment.appendChild(row);
      }
    });
    $('td').remove();
    contenedor.appendChild(fragment);
  }
}
