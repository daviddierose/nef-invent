<?php
  require_once "../mo/codigosm.php";

  class codigosC{
    public function writeCodeC($colector, $codes){
        date_default_timezone_set('America/Guatemala');
        $currentDate = date('Y-m-d H:i:s');
        $table = array("correlativo", "codigos");
        $response = codigosM::writeCodeM($table, $colector, $codes, $currentDate);
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
