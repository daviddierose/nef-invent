<?php
require_once "encryptc.php";

class loadC{
  public function loadColectoresC(){
      $colect = new loadM();
      $colect->table = "codigos_registro";
      $res = $colect->loadCodeRegM();
      if(count($res)>0){
        $colect->table = "colectores";
        foreach ($res as $key => $value) {
          $colect->info = $value['id']-100;
          $encrypt = new encryptC($value['codigo'],'');
          $colectInfo = $colect->loadColectoresM();
            if($colectInfo["status"] == 1){
              $status = "on";
              $color = "primary";
            }else{
              $status = "off";
              $color = "danger";
            }
            echo '<li id="" class="getColectList" value="'.$colectInfo['id'].'">
                    <a class="nav-link text-uppercase text-decoration-none d-flex text-gray pl-5" href="#">
                      <div class="">
                        <button type="button" class="btn btn-sm bg-'.$color.'
                          rounded-pill shadow-sm py-auto text-light text-uppercase btn-switch"
                          id="btn-switch'.$colectInfo['id'].'" value="'.$encrypt->getCodeRegOut().'" status="'.$colectInfo["status"].'">
                          '.$status.'
                        </button>
                      </div>
                      <span class="ml-3">'.$colectInfo["nombre"].'</span>
                      <i class="text-success fas fa-check-circle d-none" id="checkgood'.$colectInfo['id'].'"></i>
                    </a>
                  </li>';
        }
      }
  }
}

 ?>
