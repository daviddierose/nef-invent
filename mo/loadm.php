<?php
require_once "conexionbd.php";
class loadM extends ConexionBD{
  public $table;
  public $info;

  public function loadColectoresM(){
    $pdo = new ConexionBD();
    $pst = $pdo->bd->prepare("SELECT id, nombre, status FROM $this->table WHERE id=$this->info");
    $pst->execute();
    return $pst->fetch();
    unset($pdo);
  }

  public function loadCodeRegM(){
    $pdo = new ConexionBD();
    $pst = $pdo->bd->prepare("SELECT id, codigo FROM $this->table WHERE status='1'");
    $pst->execute();
    return $pst->fetchAll();
    unset($pdo);
  }
}
 ?>
