//var codeKeyComplete = [];
//var codes = [];
var numberColectorInfo;
const music = new Audio('../inventario/vistas/sound/alarm.mp3');
var alarmaCodeWrong;
var md;
let info, date, ok, bad;


 $(document).ready(function () {
    configColectorC.reviewId();
    configColectorC.reviewInventStatus();
    configColectorC.reviewColectIdStatus();
    const pDocumentReady = new Promise((resolve, reject)=>{
        configColectorC.numberColector();
        resolve();
    });
    pDocumentReady.then(res =>{
      let codes;
      ajustarTamaño();
      configColectorC.showColector();

      if(!!document.getElementById("select-correlative-No")){
        let colectorRequest = configColectorC.getColectorConfig();
        correlativeList(colectorRequest[0]);
        codes = [];
      }else{
        codes = codesC.getCodes();
      }

        table(codes, "reverse");

    }).catch(err =>{
      console.log("no");
    });

    $("form").keypress(function(key) {
      if (key.which == 13) {
          return false;
      }
    });

      $("#code_product").keyup(function(e){
          let codeKey = $(this).val();
          if(e.which == 13){
            const introduceCodeCo = new codesC(codeKey);
            introduceCodeCo.introduceCode();
          }
      });

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

      $("#select-correlative-No").change(function(){
        let cor = $(this).val();
          callList(cor);
        });

      $(document).on("click", "#deleteCodesRev", function(){
        event.preventDefault();
        let cor = $("#select-correlative-No").val();
        codesC.deleteCodesRev(cor);
        $('.navbar-toggler').trigger('click');
      });

      $(document).on('click', '.sidebarCollapse', function(){
        event.preventDefault();
        $('#sidebar, #content').toggleClass('active');
        if(md.os() == "AndroidOS"){
          $('page-content').toggleClass('d-none');
          }
        });

        $("#select-config-In, #select-config-label").change(function(){
          let configIn = $('#select-config-In').val();
          let label = $('#select-config-label').val();
              configColectorC.saveColectorConfig(configIn, label);
          });

        $(document).on('click', '#alert-boton', function(){
          music.pause();
          $('#row-alert').fadeOut(200);
          $('#alert-boton').toggleClass('d-none');
          $('#code_product').focus();
          clearInterval(alarmaCodeWrong);
        });
});
