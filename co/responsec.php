<?php
  class responseC{
    public $reqStatus = false;
    public $colReg = false;
    public $codeReg = false;
    public $codeRegDev = null;
    public $codeDevice = false;
    public $colId = 0;
    public $colStatus = 0;
    public $invStatus = 0;
    public $invId = '';
    public $invBranch = '';
    public $corrByColID = null;
    public $codeList = null;
    public $codeErr = null;
    public $message = '';
    public $messDelayTime = '';
    public $route='';
    public $providerList = null;
    private $response;

    function __construct(){

     }
     public function getResponseColect(){
       $this->createResponseColect();
       $jsonString = json_encode($this->response);
       echo $jsonString;
     }

     public function getResponseAdmin(){
       $this->createResponseAdmin();
       $jsonString = json_encode($this->response);
       echo $jsonString;
     }

    private function createResponseColect(){
      if($this->codeReg == true && $this->codeDevice == true){
          $this->colReg = true;
      }
      $this->response = array('reqStatus'=> $this->reqStatus,
                        'colReg'=> $this->colReg,
                        'codeReg'=> $this->codeReg,
                        'codeRegDev'=>$this->codeRegDev,
                        'codeDevice'=> $this->codeDevice,
                        'colId'=>$this->colId,
                        'colStatus'=> $this->colStatus,
                        'invStatus'=> $this->invStatus,
                        'invId'=> $this->invId,
                        'invBranch'=>$this->invBranch,
                        'corrByColID'=>$this->corrByColID,
                        'codeList'=>$this->codeList,
                        'codeErr'=> $this->codeErr,
                        'message'=>$this->message,
                        'messDelayTime'=>$this->messDelayTime,
                        'route'=>$this->route,
                          );
    }

    private function createResponseAdmin(){
      if($this->codeReg == true && $this->codeDevice == true){
          $this->colReg = true;
      }
      $this->response = array(
                        'reqStatus'=> $this->reqStatus,
                        'colStatus'=> $this->colStatus,
                        'colId'=>$this->colId,
                        'message'=>$this->message,
                        'messDelayTime'=>$this->messDelayTime,
                        'corrByColID'=>$this->corrByColID,
                        'codeList'=>$this->codeList,
                        'providerList'=>$this->providerList,
                          );
    }
  }
 ?>
