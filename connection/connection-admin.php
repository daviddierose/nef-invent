
<?php
require_once '../co/codigosc.php';
require_once '../co/colectorc.php';
require_once '../co/inventoryc.php';
require_once "../co/encryptc.php";
require_once "../co/responsec.php";

  if(isset($_POST['codeReg'])
  && $_POST['reqAct']=='changeColStatus'){
    $codeReg = $_POST['codeReg'];
    $encrypt = new encryptC($codeReg,'');
    $response = new responseC();
    $changeColectS = new colectorC();
    $changeColectS -> changeColectorStatusC($encrypt, $response);
    $response -> getResponseAdmin();
  }
  else if(isset($_POST['inventId'])
  && isset($_POST['corrId'])
  && $_POST['reqAct'] == 'getInfoInvent'){
    $info = array('inventId'=>$_POST['inventId'],'corrId'=>$_POST['corrId']);
    $response = new responseC();
    $infoInv = new codigosC();
    $infoInv->getInfoInvenC($info, $response);
    $response->getResponseAdmin();
  }

 ?>
