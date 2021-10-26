<?php
class inventoryM{
  static public function reviewStatusInventoryM($table){
    $pdo = new ConexionBD();
    $pst = $pdo->bd->query("SELECT status FROM $table");
    $inventarios = $pst -> fetchAll();
    return $inventarios;
    unset($pdo);
  }
}

 ?>
