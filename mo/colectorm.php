<?php
  require_once "conexionbd.php";
  require_once "mcript.php";

  class colectorM{
    static public function readColectorsLenghtM($table){
      $pdo = new ConexionBD();
      $pst = $pdo->bd->query("SELECT count(1) FROM $table");
      return $pst -> fetchColumn();
      unset($pdo);
    }

    static public function changeColectorStatusM($colector, $status){
      $pdo = new ConexionBD();
      try{
        $pdo ->bd->beginTransaction();
        $pst = $pdo->bd->prepare('UPDATE colectores SET status=:status WHERE id=:id');
        $pst->bindParam(':status', $status, PDO::PARAM_INT);
        $pst->bindParam(':id',$colector, PDO::PARAM_INT);
        $pst->execute();
        $pdo->bd->commit();

        $pst = $pdo->bd->prepare('SELECT status FROM colectores WHERE id=:id');
        $pst->bindParam(':id',$colector, PDO::PARAM_INT);
        $pst->execute();
        $sta = $pst->fetch();
        $response = array(true, $colector, $sta);
      }
      catch(PDOException $ex){
        $pdo->bd->rollback();
        $response = "Hay un problema con la base de datos, contacto con tu tecnico.";
      }
      unset($pdo);
      return $response;
    }

    static public function registerColectorM($tables, $codeReg, $verif){
      $pdo = new ConexionBD();
      try{
        $pdo ->bd->beginTransaction();
            $id = $verif[0]['id'] - 100;
            $pst = $pdo->bd->prepare("UPDATE $tables[1] SET codigo_registro=:codigo_registro WHERE id=:id");
            $pst->bindParam(':id',$id, PDO::PARAM_INT);
            $pst->bindParam(':codigo_registro',$verif[0]['id'], PDO::PARAM_STR);
            $pst->execute();

            $pst = $pdo->bd->prepare("UPDATE $tables[0] SET status='1' WHERE id=:id");
            $pst->bindParam(':id', $verif[0]['id'], PDO::PARAM_INT);
            $pst->execute();
            $pdo->bd->commit();

            $nombre = "colector $id";
            $encript = encriptar($codeReg);

            $response = array(true, $encript, $nombre);
        }
        catch(PDOException $ex){
          $pdo->bd->rollback();
          $response = $ex;
      }
      unset($pdo);
      return $response;
    }

    static public function verificarStatusCodRegM($tables, $codeReg){
      $pdo = new ConexionBD();
      $pst = $pdo->bd->prepare("SELECT id, status FROM $tables[0] WHERE codigo=:codigo");
      $pst->bindParam(':codigo',$codeReg, PDO::PARAM_STR);
      $pst->execute();
      $verif = $pst->fetchAll();
      unset($pdo);
      return($verif);
    }
  }
 ?>
