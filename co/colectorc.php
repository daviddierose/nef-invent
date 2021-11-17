<?php
  require_once "responsec.php";
  require_once "encryptc.php";
  require_once "../mo/colectorm.php";
  require_once "../mo/inventorym.php";

  class colectorC{
    public function changeColectorStatusC($encrypt, $response){
        $colectInfo = new colectorM();
        $colectInfo->table = 'codigos_registro';
        $colectInfo->info = $encrypt->getCodeRegOut();
        $verif = $colectInfo ->verificarStatusCodRegM();
        if($verif != null){
          $colectInfo->table = 'colectores';
          $colectInfo->info = $verif['id']-100;
          $res = $colectInfo->changeColectorStatusM();
          if($res['reqStatus']==false){
            $response->message = $res['message'];
            $response->messDelayTime = 3000;
          }else if($res['reqStatus']==true){
            $response->reqStatus = $res['reqStatus'];
            $response->colStatus = $res['colStatus'];
            $response->colId = $verif['id']-100;
            $response->message = $res['message'];
            $response->messDelayTime = 3000;
          }
        }
        /*$table = "colectores";
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
        }*/
    }

    public function registerColectorC($codesRD, $response){

          $codeReg = $codesRD->getCodeRegIn();
          $codeDevice = $codesRD->getCodeDeviceIn();
          $colectInfo = new colectorM();
          $colectInfo->table = 'codigos_registro';
          $colectInfo->info = $codeReg;
          $verif = $colectInfo ->verificarStatusCodRegM();
          if($verif==null){
            $response->message = "El código de registro no es valido.";
            $response->messDelayTime = 2000;
          }else{
            if($verif['status'] == 1){
              $response->message = "El código de registro ya está en uso.";
              $response->messDelayTime = 2000;
            }else{
              $tables = array('codigos_registro', 'colectores');
              $info = array('codeReg'=>$codeReg,
                            'codeDevice'=>$codeDevice,
                            'id'=>$verif['id'],
                          );
              $respuesta = colectorM::registerColectorM($tables, $info);
              if($respuesta == true){
                  $response->message = "Registro completado con éxito.";
                  $response->messDelayTime = 2000;
                  $response->codeReg = true;
                  $response->codeRegDev = $codesRD->getCodeRegOut();
                  $response->codeDevice = true;
                  $response->colId = $verif['id']-100;
                  $response->reqStatus = true;
              }
              else if($respuesta == false){
                  $response->message = "No se pudo realizar el registro.";
                  $response->messDelayTime = 2000;
              }
            }
          }
    }

    public function verificarStatusCodRegC($codesRD, $response){
      $codeReg = $codesRD->getCodeRegOut();
      $codeDevice = $codesRD->getCodeDeviceIn();
      if($codeReg == null || $codeDevice == null){
        $response -> message = 'Colector mal configurado.<br>
                                Comunícate con el área técnica.';
        $response -> messDelayTime = 1500;
      }else{
          $colectInfo = new colectorM();
          $colectInfo->table = 'codigos_registro';
          $colectInfo->info = $codeReg;
          $verCodRegStatus = $colectInfo ->verificarStatusCodRegM();
          if($verCodRegStatus == null){
            $response -> message = 'Colector mal configurado.<br>
                                    Comunícate con el área técnica.';
            $response -> messDelayTime = 1500;
          }else{
            if($verCodRegStatus['status'] == 1 && $verCodRegStatus['code_device'] == $codeDevice){
              $colectStatus = colectorM::reviewStatusColectIdM('colectores', $verCodRegStatus['id']);
              $inventStatus = inventoryM::reviewStatusInventM();
              $response->codeReg = true;
              $response->codeDevice = true;
              $response->colStatus = $colectStatus['status'];
              $response->invStatus = $inventStatus['status'];
              $response->invId = $inventStatus['id'];
              $response->invBranch = $inventStatus['sucursal'];
              $id = $verCodRegStatus['id'] - 100;
              $response ->colId = $id;

              if($colectStatus['status'] == 0 || $inventStatus['status'] == 0){

                $colect = (string)$colectStatus['status'];
                $inventory = (string)$inventStatus['status'];

                $response->messDelayTime = 5000;

                $case = "$colect $inventory";
                switch ($case){
                  case "0 0":
                     $response->message = 'El colector '.$id.' Está
                               deshabilitado y no existe un inventario activo.';
                  break;
                  case "0 1":
                     $response->message = 'El colector '.$id.' Está deshabilitado.';
                  break;
                  case "1 0":
                     $response->message = 'No existe un inventario activo.';
                  break;
                }

              }else if(($colectStatus['status'] == 1 && $inventStatus['status'] == 1)){
                $response->reqStatus = true;
                $response->message = 'Actualmente se está trabajado
                                      <br><span class="font-weight-bold">Inventario:</span> '.$inventStatus['id'].'
                                      <br><span class="font-weight-bold">Tienda:</span> '.$inventStatus['sucursal'].'
                                      <br>Usted está trabajando con el <span class="font-weight-bold">colector:</span> '.$id;
                $response->messDelayTime = 8000;
              }
            }else{
              $response -> message = 'Colector mal configurado.<br>
                                      Comunícate con el área técnica.';
              $response -> messDelayTime = 2000;
            }
          }
      }
    }
  }

 ?>
