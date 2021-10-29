<?php
  require_once "../mo/colectorm.php";
  require_once "../mo/mcript.php";

  class colectorC{
    public function readColectorsLenghtC(){
      $table = "colectores";
      $response = colectorM::readColectorsLenghtM($table);
      $jsonString = json_encode(intval($response));
      echo $jsonString;
    }

    public function changeColectorStatusC($colector, $status){
      if($status == 0 || $status == 1){
        $table = "colectores";
        $colLength = colectorM::readColectorsLenghtM($table);
        if($colector > 0 && $colector <= $colLength){
          if($status == 0){
            $staToggle = 1;
          }else if($status == 1){
            $staToggle = 0;
          }
          $response = colectorM::changeColectorStatusM($colector, $staToggle);
          $jsonString = json_encode($response);
          echo $jsonString;
        }else{
          echo "El colector no existe en el listado. Refresca la página e intenta de nuevo";
        }
      }else{
        echo "Status no reconocido. Refresaca la página e intenta de nuevo.";
      }
    }

    public function registerColectorC($codeReg, $codeDevice){
      $table = 'codigos_registro';
      $verif = colectorM::verificarStatusCodRegM($table, $codeReg);
      $length = count($verif);
      if($length == 0){
        $respuesta = array("El código de registro no es valido.");
      }else{
        if($verif[0]['status'] == 1){
          $respuesta = array("El código de registro ya está en uso.");
        }else{
          $tables = array('codigos_registro', 'colectores');
          $respuesta = colectorM::registerColectorM($tables, $codeReg, $verif, $codeDevice);
        }
      }

      $jsonString = json_encode($respuesta);
      echo $jsonString;
    }

    public function verificarStatusCodRegC($codeRegIn, $codeDeviceIn){
      $respuesta = array(true);
      $codeReg = desencriptar($codeRegIn);
      $codeDevice = desencriptar($codeDeviceIn);
      $table = 'codigos_registro';
      $verif = colectorM::verificarStatusCodRegM($table, $codeReg);
      $length = count($verif);
      if($length == 0){
        $respuesta = array('resCodeReg'=> false,
                           'resCol'=> 0,
                           'resInv'=> 0,
                           'resInvId'=>0,
                           'resInvBranch'=> '',
                           'message'=>'El colector está mal configurado,
                                      habla con tu departamente ténico.',
                            );
      }else{
        if($verif[0]['status'] == 1 && $verif[0]['code_device'] == $codeDevice){
          $colectStatus = colectorM::reviewStatusColectIdM('colectores', $verif[0]['id']);
          $inventStatus = colectorM::reviewStatusInventM();
          if($colectStatus[0]['status'] == 0 || $inventStatus['status'] == 0){
              $respuesta = array('resCodeReg'=> true,
                                 'resCol'=> $colectStatus[0]['status'],
                                 'resInv'=> $inventStatus['status'],
                                 'resInvId'=> $inventStatus['id'],
                                 'resInvBranch'=> $inventStatus['sucursal'],
                                 'message'=>'No puedes ingresar códigos. Es posible que no exista un
                                            inventario activo o el colector está deshabilitado.',
                                  );
          }else if(($colectStatus[0]['status'] == 1 && $inventStatus['status'] == 1)){
            $respuesta = array('resCodeReg'=> true,
                               'resCol'=> $colectStatus[0]['status'],
                               'resInv'=> $inventStatus['status'],
                               'resInvId'=> $inventStatus['id'],
                               'resInvBranch'=> $inventStatus['sucursal'],
                               'message'=>'',
                              );
          }
        }
      }
        $jsonString = json_encode($respuesta);
        echo $jsonString;
    }
  }

 ?>
