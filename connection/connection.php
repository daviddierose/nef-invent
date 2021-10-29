<?php
  require_once '../co/codigosc.php';
  require_once '../co/colectorc.php';
  require_once '../co/inventoryc.php';

  if(isset($_POST['codeReg'])
  && isset($_POST['codes'])
  && isset($_POST['codeDevice'])
  ){
    $codes = $_POST['codes'];
    $codeReg = $_POST['codeReg'];
    $codeDevice = $_POST['codeDevice'];
    $codesV = new codigosC();
    $codesV -> writeCodeC($codes, $codeReg, $codeDevice);
  }
  else if(isset($_POST['colectorRequest'])){
    $colector = $_POST['colectorRequest'];
    $correlativeV = new codigosC();
    $correlativeV -> readCorrelativeC($colector);
  }
  else if(isset($_POST['correlative'])){
    $correlative = $_POST['correlative'];
    $codesV = new codigosC();
    $codesV -> readCodesC($correlative);
  }
  else if(isset($_POST['corDel'])){
    $correlativeDel = new codigoC();
    $correlativeDel -> deletecCodesCorrelative();
  }
  else if(isset($_POST['col'])){
    $colectorsV = new colectorC();
    $colectorsV -> readColectorsLenghtC();
  }
  else if(isset($_POST['colToggle']) && isset($_POST['staToggle'])){
    $colector = $_POST['colToggle'];
    $status = $_POST['staToggle'];
    $colectorTV = new colectorC();
    $colectorTV -> changeColectorStatusC($colector, $status);
  }
  else if(isset($_POST['codeReg']) && isset($_POST['codeDevice'])){
    $codeReg = $_POST['codeReg'];
    $codeDevice = $_POST['codeDevice'];
    $colectorRV = new colectorC();
    $colectorRV -> registerColectorC($codeReg, $codeDevice);
  }
  else if(isset($_POST['codeRegIn'])
       && isset($_POST['codeDeviceIn'])){
    $codeRegIn = $_POST['codeRegIn'];
    $codeDeviceIn = $_POST['codeDeviceIn'];
    $colectorVerifIdV = new colectorC();
    $colectorVerifIdV -> verificarStatusCodRegC($codeRegIn, $codeDeviceIn);
  }

 ?>
