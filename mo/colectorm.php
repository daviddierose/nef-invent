<?php
  require_once "conexionbd.php";

  class colectorM{
    static public function readColectorsLenghtC($table){
      $pdo = new ConexionBD();
      $pst = $pdo->bd->query("SELECT count(1) FROM $table");
      return $pst -> fetchColumn();
      unset($pdo);
    }
  }
 ?>
