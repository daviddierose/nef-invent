const music = new Audio('../inventario/vistas/sound/alarm.mp3');
var alarmaCodeWrong;
var md;
let info, date, ok, bad;
var amount;
var amountRev;


 $(document).ready(function () {
    const pDocumentReady = new Promise((resolve, reject)=>{
      configColectorC.reviewStatus();
      resolve();
    });
    pDocumentReady.then(res =>{
      let codes;
      ajustarTamaño();
      configColectorC.showConfig();

      if(!!document.getElementById("select-correlative-No")){
        codes = [];
      }else{
        codes = codesC.getCodes();
      }

        table(codes, "reverse");

    }).catch(err =>{

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
      });

      $(document).on("click", "#deleteCodes", function(event){
        event.preventDefault();
          codesC.deleteCodeListAsk();
          $('.navbar-toggler').trigger('click');
      });

      $("#select-correlative-No").change(function(){
        let cor = $(this).val();
          reviewCodeList.callCodeList(cor);
        });

      $(document).on("click", "#deleteListCodes", function(){
        event.preventDefault();
        let cor = $("#select-correlative-No").val();
        reviewCodeList.deleteCodesRev(cor);
        $('.navbar-toggler').trigger('click');
      });

      $(document).on('click', '.sidebarCollapse', function(){
        event.preventDefault();
        $('#sidebar, #content').toggleClass('active');
        if(md.os() == "AndroidOS"){
          $('page-content').toggleClass('d-none');
          }
        });

        $("#select-config-In").change(function(){
          let configIn = $('#select-config-In').val();
              configColectorC.saveInputConfig(configIn);
        });

        $(document).on('click', '#alert-boton', function(){
          music.pause();
          $('#row-alert').fadeOut(200);
          $('#alert-boton').toggleClass('d-none');
          $('#code_product').focus();
          clearInterval(alarmaCodeWrong);
        });

});
