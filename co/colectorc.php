<?php
  require_once "../mo/colectorm.php";

  class colectorC{
    public function readColectorsLenghtC(){
      $table = "colectores";
      $response = colectorM::readColectorsLenghtC($table);
      $jsonString = json_encode(intval($response));
      echo $jsonString;
    }
  }

 ?>
