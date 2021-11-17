<?php
  require_once "conexionbd.php";
  require_once "../co/encryptc.php";

  class colectorM extends ConexionBD{
    public $table;
    public $info;

    public function changeColectorStatusM(){
      $pdo = new ConexionBD();
      try{
        $status;
        $pdo ->bd->beginTransaction();
        $pst = $pdo->bd->prepare("SELECT status FROM $this->table WHERE id=:id");
        $pst->bindParam(':id',$this->info, PDO::PARAM_INT);
        $pst->execute();
        $sta = $pst->fetch();
        if($sta['status'] == 0){
          $status = 1;
        }else if($sta['status'] == 1){
          $status = 0;
        }

        $pst = $pdo->bd->prepare("UPDATE $this->table SET status=:status WHERE id=:id");
        $pst->bindParam(':status', $status, PDO::PARAM_INT);
        $pst->bindParam(':id',$this->info, PDO::PARAM_INT);
        $pst->execute();
        $pdo->bd->commit();

        $response = array('reqStatus'=>true,
                          'colStatus'=>$status,
                          'message'=>"Estatus del colector <span>$this->info</span> cambiado con éxito");
      }
      catch(PDOException $ex){
        $pdo->bd->rollback();
        $response = array('reqStatus'=>false,
                          'message'=>'Hay un problema con la base de datos, contacto con tu tecnico.');
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

    public function verificarStatusCodRegM(){
      $pdo = new ConexionBD();
      $pst = $pdo->bd->prepare("SELECT * FROM $this->table WHERE codigo=:codigo");
      $pst->bindParam(':codigo',$this->info, PDO::PARAM_STR);
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
