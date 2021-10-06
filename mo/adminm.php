<?php

  require_once "conexionbd.php";

  class AdminM extends ConexionBD{
    static public function IngresoM($datosC, $tableBD){
      $pdo = new ConexionBD();
      $pst = $pdo->bd->prepare("SELECT usuario, clave, codigo_usuario FROM $tableBD WHERE usuario = :usuario");
      $pst->bindParam(":usuario", $datosC["usuario"], PDO::PARAM_STR);
      $pst->execute();
      return $pst->fetch();
      unset($pdo);
    }

    static public function readColectoresM($tableBD){
      $pdo = new ConexionBD();
      $pst = $pdo->bd->prepare("SELECT nombre FROM $tableBD");
      $pst->execute();
      return $pst->fetchAll();
      unset($pdo);
    }

    static public function readConfigOptionM($tableBD){
      $pdo = new ConexionBD();
      $pst = $pdo->bd->prepare("SELECT configuración FROM $tableBD");
      $pst->execute();
      return $pst->fetchAll();
      unset($pdo);
    }

  }

 ?>
