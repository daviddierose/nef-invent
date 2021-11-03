<?php
  class encryptC{
    private $clave = "Quiero a la sombra de un ala contar este cuento en flor la nina de Guatemalala que se murio de amor Eran de lirios los ramos y las orlas de reseda y de jazmin la enterramos en una caja de seda Ella dio al desmemoriado una almohadilla de olor el volvio volvio casado ella se murio de amor";
    private $method = "aes-256-cbc";
    private $iv = "";
    private $codeReg = null;
    private $codeDevice = null;
    private $codeRegIn = null;
    private $codeDeviceIn = null;

      function __construct($codeRegIn, $codeDeviceIn){
        $this->iv = base64_decode("C9fBxl1EWtYTL1/M8jfstw==");
        $lengthReg = strlen($codeRegIn);
        $lengthDevice = strlen($codeDeviceIn);
        if($lengthReg + $lengthDevice == 32 ){
          $this->codeReg = $this->encrypt($codeRegIn);
          $this->codeDevice = $this->encrypt($codeDeviceIn);
        }else if($lengthReg + $lengthDevice == 88){
          $this->codeReg = $this->decrypt($codeRegIn);
          $this->codeDevice = $this->decrypt($codeDeviceIn);
        }
          $this->codeRegIn = $codeRegIn;
          $this->codeDeviceIn = $codeDeviceIn;
      }

      public function getCodeRegIn(){
        return $this->codeRegIn;
      }

      public function getCodeDeviceIn(){
        return $this->codeDeviceIn;
      }

      public function getCodeReg(){
        return $this->codeReg;
      }

      public function getCodeDevice(){
        return $this->codeDevice;
      }

      private function encrypt($codeIn){
        return openssl_encrypt ($codeIn, $this->method, $this->clave, false, $this->iv);
      }

      private function decrypt($codeIn){
          $encrypted_data = base64_decode($codeIn);
          return openssl_decrypt($codeIn, $this->method, $this->clave, false, $this->iv);
       }

  }

 ?>