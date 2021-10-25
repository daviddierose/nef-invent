<?php
function encriptar($valor){
  $clave = "Quiero a la sombra de un ala contar este cuento en flor la nina de Guatemalala que se murio de amor Eran de lirios los ramos y las orlas de reseda y de jazmin la enterramos en una caja de seda Ella dio al desmemoriado una almohadilla de olor el volvio volvio casado ella se murio de amor";
  $method = "aes-256-cbc";
  $iv = base64_decode("C9fBxl1EWtYTL1/M8jfstw==");
    return openssl_encrypt ($valor, $method, $clave, false, $iv);
};

 function desencriptar ($valor){
  $clave = "Quiero a la sombra de un ala contar este cuento en flor la nina de Guatemalala que se murio de amor Eran de lirios los ramos y las orlas de reseda y de jazmin la enterramos en una caja de seda Ella dio al desmemoriado una almohadilla de olor el volvio volvio casado ella se murio de amor";
  $method = "aes-256-cbc";
  $iv = base64_decode("C9fBxl1EWtYTL1/M8jfstw==");
     $encrypted_data = base64_decode($valor);
     return openssl_decrypt($valor, $method, $clave, false, $iv);
 };
 ?>
