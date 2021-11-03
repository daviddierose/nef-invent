<?php
  require_once "responsec.php";
  require_once "../mo/codigosm.php";
  require_once "../mo/colectorm.php";
  require_once "../mo/inventorym.php";
  require_once "encryptc.php";

  class codigosC{
    public function writeCodeC($codes, $codesAbst, $response){
       if($response->reqStatus == true){
         $response->reqStatus = false;
         $table = 'codigos_productos';
         $codesError = codigosM::veferifThereIsCodesM($table, $codesAbst);
         $length = count($codesError);
         if($length > 0){
           $response->codeErr = $codesError;
           $response->message = 'Hay varios códigos que no se
                      encontraron en la base de datos.
                      <br>Estos se marcarán con rojo.
                      <br>Antes de guardar es necesario corregir
                      los códigos.';
           $response->messDelayTime = 7000;
         }else{
           date_default_timezone_set('America/Guatemala');
           $currentDate = date('Y-m-d H:i:s');
           $info = array('inventory'=> $response->invId,
                         'colector' => $response->colId,
                         'currentDate'=> $currentDate,
                         'status'=>1,
                         );
           $table = array("correlativo", "codigos");
           $writeCode = codigosM::writeCodeM($table, $codes, $info);
             if($writeCode[0]== true){
               $response->reqStatus = true;
               $response->message = 'El listado se ha guardado con éxito en el correlativo '.$writeCode[1].'.';
               $response->messDelayTime = 3000;
             }else{
               $response->message = $writeCode[1];
               $response->messDelayTime = 3000;
             }
         }
       }
    }

    public function readCorrelativeC($response){
        if($response->reqStatus == true){
            $response->reqStatus = false;
            $table = "correlativo";
            $correlative = codigosM::readCorrelativeM($table, $response->colId, $response->invId);
            $length = count($correlative);
            if($length > 0){
              $response->reqStatus = true;
              $response->corrByColID = $correlative;
              $response->message = '';
            }else{
              $response-> message = 'No hay correlativos guardados desde este colector.';
              $response->messDelayTime= 2000;
            }
        }

    }

    public function readCodesC($correlative, $response){
        if($response->reqStatus == true && $response->invStatus == 1){
          $response->reqStatus = false;
          $table = "codigos";
          $codeList = codigosM::readCodesM($table, $correlative);
          $length = count($codeList);
          if($length > 0){
            $response->reqStatus = true;
            $response->codeList = $codeList;
            $response->message = '';
          }else{
            $response-> message = 'No hay codigos guardados en este correlativo.';
            $response->messDelayTime= 2000;
          }
        }
    }

    public function deletecCodesListC($correlative, $response){
      if($response->reqStatus == true && $response->invStatus == 1){
          $response->reqStatus = false;
          date_default_timezone_set('America/Guatemala');
          $currentDate = date('Y-m-d H:i:s');
          $tables = array('codigos', 'correlativo');
          $info = array('correlative'=>$correlative,
                        'currentDate'=>$currentDate,
                        );
          $delete = codigosM::deleteCodesListM($tables, $info);
          if($delete[0]==true){
            $response->reqStatus = true;
            $response->message = 'Se eliminó el listado con éxito.';
            $response->messDelayTime = 2000;
          }else if($delete[0]==false){
            $response->message = 'No se pudo eliminar el listado.';
            $response->messDelayTime = 2000;
          }

      }
    }
  }

 ?>
