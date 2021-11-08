const music = new Audio('../sound/alarm2.mp3');
var alarmaCodeWrong;
var md;
let info, date, ok, bad;
var amount;
var amountRev;
var page;

  alerts.showLoadingScreen();
 $(document).ready(function () {
    const pDocumentReady = new Promise((resolve, reject)=>{
      console.log('Estos');
      setTimeout(()=>{
        console.log('Esto');
        configColectorC.reviewStatus();
      }, 100);
      resolve();
    });
    pDocumentReady.then(res =>{
      let codes;
      style.ajustarTamaño();
      configColectorC.showConfig();

      if(!!document.getElementById("select-correlative-No")){
        codes = [];
      }else{
        codes = codesC.getCodes();
      }

        table(codes, "reverse");
        alerts.hideLoadingScreen();
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
        $('#sidebarCollapseM').trigger('click');
        event.preventDefault();
        codesC.saveCodesList();
      });

      $(document).on("click", "#deleteCodes", function(event){
        $('#sidebarCollapseM').trigger('click');
        event.preventDefault();
          codesC.deleteCodeListAsk();
      });

      $("#select-correlative-No").change(function(){
        let cor = $(this).val();
          reviewCodeList.callCodeList(cor);
        });

      $(document).on("click", "#deleteListCodes", function(){
        $('#sidebarCollapseM').trigger('click');
        event.preventDefault();
        let cor = $("#select-correlative-No").val();
        reviewCodeList.deleteCodesRev(cor);
      });

      $(document).on('click', '.sidebarCollapse', function(){
        event.preventDefault();
        $('#sidebar, #content').toggleClass('active');
          $('#content').toggleClass('d-none');
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

        $(document).on('click', '#btn-login', function(event){
          event.preventDefault();
          let hash = CryptoJS.MD5($('#passsword').val());
          let user = $('#user').val();
          const sLogin = new login(user, hash.toString());
          sLogin.sendLogin();

        });

        $(document).on("click", "#btn-save-id", function(event){
          event.preventDefault();
          let codeReg = $("#colect-code").val();
          configColectorC.saveCodeReg(codeReg);
        });

        $(document).on("click", "#inCodesLink", function(event){
          event.preventDefault();
          location.replace('in-code.html')
        });

        $(document).on("click", "#ConfigLink", function(event){
          event.preventDefault();
          location.replace('login.html')
        });

        $(document).on("click", "#RevListLink", function(event){
          event.preventDefault();
          location.replace('review-list.html')
        });

        $(document).on("click", "#logOut", function(event){
          event.preventDefault();
          location.replace('in-code.html')
        });
});
