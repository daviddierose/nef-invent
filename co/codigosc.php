<?php
  require_once "../mo/codigosm.php";
  require_once "../mo/colectorm.php";
  require_once "../mo/mcript.php";

  class codigosC{
    public function writeCodeC($codes, $codeReg, $codeDevice){
        $codeRegDec = desencriptar($codeReg);
        $codeDeviceDec = desencriptar($codeDevice);
        $table = 'codigos_registro';
        $verifCRSta = colectorM::verificarStatusCodRegM($table, $codeRegDec);
        $length = count($verifCRSta);
        if($length == 0){
           $response = array('status' => false,
                             'message'=>'El colector está mal configurado,
                                         habla con tu departamente ténico.',
                            );
        }else{
          if($verifCRSta[0]['status'] == 1 && $verifCRSta[0]['code_device'] == $codeDeviceDec){
             $colectStatus = colectorM::reviewStatusColectIdM('colectores', $verifCRSta[0]['id']);
             $inventStatus = colectorM::reviewStatusInventM();
             if($colectStatus[0]['status'] == 0 || $inventStatus['status'] == 0){

               $id = $verifCRSta[0]['id'] - 100;
               $colect = (string)$colectStatus[0]['status'];
               $inventory = (string)$inventStatus['status'];

               $case = "$colect $inventory";
               $response = array('status' => false,
                                 'message'=>'',
                                );
               switch ($case){
                 case "0 0":
                    $response['message'] = 'No puedes guardar este listado.
                              El colector '.$id.' Está
                              deshabilitado y no existe un inventario activo.';
                 break;
                 case "0 1":
                    $response['message'] = 'No puedes guardar este listado.
                              El colector '.$id.' Está
                              deshabilitado.';
                 break;
                 case "1 0":
                    $response['message'] = 'No puedes guardar este listado.
                              No existe un inventario activo.';
                 break;
               }
             }else if($colectStatus[0]['status'] == 1 || $inventStatus['status'] == 1){
                $response = 'bien';
             }
          }
        }

        /*date_default_timezone_set('America/Guatemala');
        $currentDate = date('Y-m-d H:i:s');
        $table = array("correlativo", "codigos");
        $response = codigosM::writeCodeM($table, $codeReg, $codes, $currentDate);*/
        $jsonstring = json_encode($response);
        echo ($jsonstring);
    }

    public function readCorrelativeC($colector){
        $table = "correlativo";
        $response = codigosM::readCorrelativeM($table, $colector);
        $jsonstring = json_encode($response);
        echo ($jsonstring);
    }

    public function readCodesC($correlative){
        $table = "codigos";
        $response = codigosM::readCodesM($table, $correlative);
        $jsonstring = json_encode($response);
        echo ($jsonstring);
    }
  }

 ?>
