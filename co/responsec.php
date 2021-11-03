<?php
  class responseC{
    public $reqStatus = false;
    public $colReg = false;
    public $codeReg = false;
    public $codeRegDev = null;
    public $codeDevice = false;
    public $codeDeviceDev = null;
    public $colId = 0;
    public $colStatus = 0;
    public $invStatus = 0;
    public $invId = 0;
    public $invBranch = null;
    public $corrByColID = null;
    public $codeList = null;
    public $codeErr = null;
    public $message = '';
    public $messDelayTime = '';
    public $route='';
    private $response;

    function __construct(){

     }
     public function getResponse(){
       $this->createResponse();
       $jsonString = json_encode($this->response);
       echo $jsonString;
     }

    private function createResponse(){
      if($this->codeReg == true && $this->codeDevice == true){
          $this->colReg = true;
      }
      $this->response = array('reqStatus'=> $this->reqStatus,
                        'colReg'=> $this->colReg,
                        'codeReg'=> $this->codeReg,
                        'codeRegDev'=>$this->codeRegDev,
                        'codeDevice'=> $this->codeDevice,
                        'codeDeviceDev'=>$this->codeDeviceDev,
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
  }
 ?>
