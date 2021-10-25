<?php
  require_once "../co/codigosc.php";
  require_once "../co/colectorc.php";

  if(isset($_POST["colector"]) && isset($_POST["codes"])){
    $codes = $_POST["codes"];
    $colector = $_POST["colector"];
    $codesV = new codigosC();
    $codesV -> writeCodeC($colector, $codes);
  }
  else if(isset($_POST["colectorRequest"])){
    $colector = $_POST["colectorRequest"];
    $correlativeV = new codigosC();
    $correlativeV -> readCorrelativeC($colector);
  }
  else if(isset($_POST["correlative"])){
    $correlative = $_POST["correlative"];
    $codesV = new codigosC();
    $codesV -> readCodesC($correlative);
  }
  else if(isset($_POST['corDel'])){
    $correlativeDel = new codigoC();
    $correlativeDel -> deletecCodesCorrelative();
  }
  else if(isset($_POST["col"])){
    $colectorsV = new colectorC();
    $colectorsV -> readColectorsLenghtC();
  }
  else if(isset($_POST['colToggle']) && isset($_POST['staToggle'])){
    $colector = $_POST['colToggle'];
    $status = $_POST['staToggle'];
    $colectorTV = new colectorC();
    $colectorTV -> changeColectorStatusC($colector, $status);
  }
  else if(isset($_POST['codeReg'])){
    $codeReg = $_POST['codeReg'];
    $colectorRV = new colectorC();
    $colectorRV -> registerColectorC($codeReg);
  }
  else if(isset($_POST['codeRegIn'])){
    $codeRegIn = $_POST['codeRegIn'];
    $colectorVerifIdV = new colectorC();
    $colectorVerifIdV -> verificarStatusCodRegC($codeRegIn);
  }

 ?>
