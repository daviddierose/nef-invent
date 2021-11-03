<?php
class inventoryM{
  static public function reviewStatusInventM(){
    $pdo = new ConexionBD();
    $pst = $pdo->bd->query("SELECT MAX(id) AS id FROM inventarios WHERE status='1'");
    $pst->execute();
    $id = $pst->fetch();
    if($id['id'] != null && $id > 0 ){
      $pst = $pdo->bd->prepare("SELECT * FROM inventarios WHERE id=:id");
      $pst->bindParam(':id', $id['id'], PDO::PARAM_INT);
      $pst->execute();
      $invent = $pst->fetch();

      $pst = $pdo->bd->prepare("SELECT nombre FROM sucursales WHERE id=:id");
      $pst->bindParam(':id', $invent['sucursal'], PDO::PARAM_INT);
      $pst->execute();
      $sucursal = $pst->fetch();

      $res = array('id'=> $id['id'],
                   'status'=> $invent['status'],
                   'sucursal'=> $sucursal['nombre']
                 );
    }else{
      $res = array('id'=> 0,
                   'status'=> 0,
                   'sucursal'=> '',
                  );
    }
    unset($pdo);
    return $res;
  }
}

 ?>
