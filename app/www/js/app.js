const music = new Audio('../sound/alarm2.mp3');
var alarmaCodeWrong;
var md;
let info, date, ok, bad;
var amount;
var amountRev;
var page;
const error = 'Algo ocurrio un mal, intenta de nuevo.';

  //document.addEventListener("deviceready", int);

  //function int(){
    setTimeout(()=>{
      configColectorC.reviewStatus()
      .then(res=>{
        if(res==true){
          let codes;
          style.ajustarTamaño();
          if(page == 'review-list'){
            codes = [];
          }else{
            codes = codesC.getCodes();
          }
            table(codes, "reverse");
            setTimeout(()=>{
              $('#whiteBackground').css('display', 'none');
            },500);
        }
      });
    }, 100);
  //}

  // window.addEventListener('keyboardDidShow', (event) => {
  //     if(page == 'in-code'){
  //       setTimeout(()=>{
  //         Keyboard.hide()
  //       },10)
  //     }
  // });
  //
  // window.addEventListener('keyboardWillShow', (event) => {
  //     if(page == 'in-code'){
  //       setTimeout(()=>{
  //         Keyboard.hide()
  //       },10)
  //     }
  // });

$(document).ready(function(){
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
          $('#sidebarCollapseM').trigger('click');
          let configIn = $('#select-config-In').val();
              configColectorC.saveInputConfig(configIn);
        });

        $(document).on('click', '#alert-boton', function(){
          music.pause();
          navigator.vibrate(0)
          $('#row-alert').fadeOut(200);
          $('#alert-boton').toggleClass('d-none');
          $('#medio').removeClass('alert-danger, alerta-primary');
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

        $(document).on("click", "#logOut", function(event){
          event.preventDefault();
            get('http://localhost/nefnodel/inventario/connection/logout.php')
              .then(res => {location.replace('in-code.html');})
              .catch(err =>{alert(err);});
        });

});
