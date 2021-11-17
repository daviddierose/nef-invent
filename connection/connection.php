<?php
  require_once '../co/codigosc.php';
  require_once '../co/colectorc.php';
  require_once '../co/inventoryc.php';
  require_once "../co/encryptc.php";
  require_once "../co/responsec.php";
  require_once "../co/adminc.php";
  require_once "../mo/adminm.php";

  if(isset($_POST['codeReg'])
     && isset($_POST['codeDevice'])){
    $codeReg = $_POST['codeReg'];
    $codeDevice = $_POST['codeDevice'];
    $codesRD = new encryptC($codeReg, $codeDevice);
    $response = new responseC();

    if(isset($_POST['reqAct'])
    && $_POST['reqAct'] == 'checkStatus'
    || $_POST['reqAct'] == 'saveCodesList'
    || $_POST['reqAct'] == 'getCorrelativeList'
    || $_POST['reqAct'] == 'getCodeList'
    || $_POST['reqAct'] == 'deleteCodeList'){
      $colectorVerifIdV = new colectorC();
      $colectorVerifIdV -> verificarStatusCodRegC($codesRD, $response);

        if(isset($_POST['codesAbst'])
        && isset($_POST['codes'])
        && $_POST['reqAct'] == 'saveCodesList'){
          $codes = $_POST['codes'];
          $codesAbst = $_POST['codesAbst'];
          $codesV = new codigosC();
          $codesV -> writeCodeC($codes, $codesAbst, $response);
        }
        else if(isset($_POST['reqAct'])
        && $_POST['reqAct'] == 'getCorrelativeList'){
          $correlativeV = new codigosC();
          $correlativeV -> readCorrelativeC($response);
        }
        else if(isset($_POST['correlative'])
        &&isset($_POST['reqAct'])
        && $_POST['reqAct'] == 'getCodeList'){
          $correlative = $_POST['correlative'];
          $codesV = new codigosC();
          $codesV -> readCodesC($correlative, $response);
        }
        else if(isset($_POST['correlative'])
        && isset($_POST['reqAct'])
        && $_POST['reqAct'] == 'deleteCodeList'){
          $correlative = $_POST['correlative'];
          $correlativeDel = new codigosC();
          $correlativeDel -> deletecCodesListC($correlative, $response);
        }
    }else if(isset($_POST['reqAct'])
     && $_POST['reqAct'] == 'saveCodeReg'){
       $colectorRV = new colectorC();
       $colectorRV -> registerColectorC($codesRD, $response);
     }
    $response->getResponseColect();
  }
  else if(isset($_POST['user'])
  && isset($_POST['pass'])
  && isset($_POST['reqAct'])
  && $_POST['reqAct']=='login'){
    $user = $_POST['user'];
    $pass = $_POST['pass'];
    $response = new responseC();
    $login = new adminC();
    $login-> ingresoC($user, $pass, $response);
    $response->getResponseColect();
  }


  else if(isset($_POST['corDel'])){
    $correlativeDel = new codigoC();
    $correlativeDel -> deletecCodesCorrelative();
  }
  else if(isset($_POST['col'])){
    $colectorsV = new colectorC();
    $colectorsV -> readColectorsLenghtC();
  }
  /*else if(isset($_POST['colToggle']) && isset($_POST['staToggle'])){
    $colector = $_POST['colToggle'];
    $status = $_POST['staToggle'];
    $colectorTV = new colectorC();
    $colectorTV -> changeColectorStatusC($colector, $status);
  }*/

 ?>
