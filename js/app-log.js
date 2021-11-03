let md;
$(document).ready(function(){
  style.ajustarTamaño();

  $(document).on('click', '.sidebarCollapse', function(){
    event.preventDefault();
    $('#sidebar, #content').toggleClass('active');
    if(md.os() == "AndroidOS"){
      $('page-content').toggleClass('d-none');
      }
    });

    $(document).on('click', '#btn-login', function(event){
      event.preventDefault();
      let hash = CryptoJS.MD5($('#passsword').val());
      let user = $('#user').val();
      const sLogin = new login(user, hash.toString());
      sLogin.sendLogin();

    });
});
