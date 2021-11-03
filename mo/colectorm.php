<?php
  require_once "conexionbd.php";
  require_once "../co/encryptc.php";

  class colectorM{

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

    static public function registerColectorM($tables, $info){
      $pdo = new ConexionBD();
      try{
        $pdo ->bd->beginTransaction();
            $id = $info['id'] - 100;
            $pst = $pdo->bd->prepare("UPDATE $tables[1] SET codigo_registro=:codigo_registro WHERE id=:id");
            $pst->bindParam(':id',$id, PDO::PARAM_INT);
            $pst->bindParam(':codigo_registro',$info['id'], PDO::PARAM_STR);
            $pst->execute();

            $pst = $pdo->bd->prepare("UPDATE $tables[0] SET status='1', code_device=:codeDevice WHERE id=:id");
            $pst->bindParam(':id', $info['id'], PDO::PARAM_INT);
            $pst->bindParam(':codeDevice', $info['codeDevice'], PDO::PARAM_STR);
            $pst->execute();

            $pdo->bd->commit();

            $response = true;
        }
        catch(PDOException $ex){
          $pdo->bd->rollback();
          $response = false;
      }
      unset($pdo);
      return $response;
    }

    static public function verificarStatusCodRegM($table, $codeReg){
      $pdo = new ConexionBD();
      $pst = $pdo->bd->prepare("SELECT * FROM $table WHERE codigo=:codigo");
      $pst->bindParam(':codigo',$codeReg, PDO::PARAM_STR);
      $pst->execute();
      $verif = $pst->fetch();
      if($verif != null){
        $response = $verif;
      }else{
        $response = null;
      }
      unset($pdo);
      return ($response);
    }

    static public function reviewStatusColectIdM($table, $codeReg){
      $pdo = new ConexionBD();
      $pst = $pdo->bd->prepare("SELECT status FROM $table WHERE codigo_registro=:codigo");
      $pst->bindParam(':codigo',$codeReg, PDO::PARAM_STR);
      $pst->execute();
      $verif = $pst->fetch();
      if($verif != null){
        $response = $verif;
      }else{
        $response = null;
      }
      unset($pdo);
      return ($response);
    }
  }
 ?>
