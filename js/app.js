var codeKeyComplete = [];
//var codes = [];
var numberColectorInfo;
//let colectConfig;
var md;
let info, date, ok, bad;
const alertNoConfig = new alerts("alert-danger", `El colector no esta
                      Configurado. Pidele a tu administrador que seleccione
                      una configuración para el equipo.`, 5000);

 $(document).ready(function () {
    const pDocumentReady = new Promise((resolve, reject)=>{
        configColectorC.numberColector();
        resolve();
    });
    pDocumentReady.then(res =>{
      let codes;
      ajustarTamaño();
      configColectorC.showColectorConfig();
      if(!!document.getElementById("select-correlative-No")){
        let colectorRequest = configColectorC.getColectorConfig();
        correlativeList(colectorRequest[0]);
        codes = [];
      }else{
        codes = codesC.getCodes();
      }
        table(codes, "reverse");
        md = new MobileDetect(window.navigator.userAgent);
        if(md.os() == "AndroidOS"){
          $('#sidebar').css('width', $(window).width()).css('height', $(window).height());
          $('#sidebarCollapseM').toggleClass('d-none');
        }
    }).catch(err =>{
      console.log("no");
    });

    if(!!document.getElementById("row-in-code")){
      $(document).keyup(function(e){
          let codeKey = e.which || event.keyCode;
          if(codeKey >= 48 && codeKey <= 57){
            codeKeyComplete.push(String.fromCharCode(codeKey));
          }else if(codeKey >= 65 && codeKey <= 90){
            codeKeyComplete.push(String.fromCharCode(codeKey));
          }else if (codeKey == 109 || codeKey == 189){
            codeKeyComplete.push("-");
          }else if(codeKey == 13){
            const introduceCodeCo = new codesC(codeKeyComplete);
            introduceCodeCo.introduceCode();
          }
      });
    }

      $(document).on("click", ".delete", function(){
          let correlative = $(this).attr("code");
          const deleteCodeCo = new codesC(correlative);
          deleteCodeCo.deleteCode();
      });

      $(document).on("click", "#saveCodes", function(event){
        event.preventDefault();
        codesC.saveCodesList();
        $('.navbar-toggler').trigger('click');
      });

      $(document).on("click", "#deleteCodes", function(event){
        event.preventDefault();
          codesC.deleteCodeListAsk();
          $('.navbar-toggler').trigger('click');
      });

      /*$("#code_correlative").keyup(function () {
            let corLenght = $("#code_correlative").val().length;
            if(corLenght > 0){
              window.setTimeout(function(){
                let cor = $("#code_correlative").val();
                callList(cor);
              }, 1000);
            }
      });*/

      $(document).on("click", "#btn-save-config", function(event){
        let colect = $("#select-colectName").val();
        let config = $("#select-config").val();
        const saveConfig = new configColectorC(colect, config);
        saveConfig.saveColectorConfig();
      });

      $("#select-correlative-No").change(function(){
        let cor = $(this).val();
          callList(cor);
        });

      $(document).on("click", "#deleteCodesRev", function(){
        let cor = $("#select-correlative-No").val();
        codesC.deleteCodesRev(cor);
        $('.navbar-toggler').trigger('click');
      });

      $(document).on('click', '.sidebarCollapse', function(){
        $('#sidebar, #content').toggleClass('active');
        if(md.os() == "AndroidOS"){
          $('page-content').toggleClass('d-none');
          }
        });
});
