<?php
    require_once "conexionbd.php";
    class codigosM{
      public function writeCodeM($table, $codes, $info){
          $pdo = new ConexionBD();
        try{
          $pdo->bd->beginTransaction();
          $pst= $pdo->bd->prepare("INSERT INTO $table[0] (inventario, colector, fecha_ingreso, status)
          values (:inventario, :colector, :fecha, :status)");
          $pst->bindParam(":inventario", $info['inventory'], PDO::PARAM_INT);
          $pst->bindParam(":colector", $info['colector'], PDO::PARAM_INT);
          $pst->bindParam(":fecha", $info['currentDate'], PDO::PARAM_STR);
          $pst->bindParam(":status", $info['status'], PDO::PARAM_INT);
          $pst->execute();

          $id_contact = $pdo->bd-> lastInsertId();

          $pst = $pdo->bd-> prepare("INSERT INTO $table[1] (correlativo, codigo, cantidad)
          values (:correlativo, :codigo, :cantidad)");
          $pst->bindParam(":correlativo", $id_contact, PDO::PARAM_INT);
          $pst->bindParam(":codigo", $codigo, PDO::PARAM_STR);
          $pst->bindParam(":cantidad", $amount, PDO::PARAM_INT);
          foreach ($codes as $code) {
            $codigo = $code['code'];
            $amount = $code['amount'];
            $pst->execute();
          }
          $pdo->bd->commit();

          $response = array(true, $id_contact);
        }
        catch(PDOException $ex){
          $pdo->bd->rollback();
          $response = array(false, $ex);
        }
        return $response;
      }

      static public function readCorrelativeM($table, $colector, $inventory){
        $pdo = new ConexionBD();
        $pst = $pdo->bd->prepare("SELECT id FROM $table WHERE colector = :colector
        AND inventario = :inventario AND status='1'");
        $pst->bindParam(":colector", $colector, PDO::PARAM_INT);
        $pst->bindParam(":inventario", $inventory, PDO::PARAM_INT);
        $pst->execute();
        return $pst->fetchAll();
        unset($pdo);
      }

      static public function readCodesM($table, $correlative){
        $pdo = new ConexionBD();
        $pst = $pdo->bd->prepare("SELECT codigo, cantidad FROM $table WHERE correlativo = :correlativo");
        $pst->bindParam(":correlativo", $correlative, PDO::PARAM_INT);
        $pst->execute();
        return $pst->fetchAll();
        unset($pdo);
      }

      static public function veferifThereIsCodesM($table, $codeAbst){
        $codesWrong = [];
        $pdo = new ConexionBD();
        $pst = $pdo->bd->prepare("SELECT codigo FROM $table WHERE codigo = :codigo");
        $pst->bindParam(":codigo", $codeAbs, PDO::PARAM_STR);
        foreach ($codeAbst as $code) {
          $codeAbs = $code;
          $pst->execute();
          $verif = $pst->fetch();
          if($verif == null){
            $codesWrong[] = $code;
          }
        }
        return $codesWrong;
        unset($pdo);
      }

      static public function deleteCodesListM($tables, $info){
        $pdo = new ConexionBD();
      try{
        $pdo->bd->beginTransaction();
        $pst= $pdo->bd->prepare("DELETE FROM $tables[0] WHERE correlativo = :correlativo");
        $pst->bindParam(":correlativo", $info['correlative'], PDO::PARAM_INT);
        $pst->execute();

        $pst = $pdo->bd-> prepare("UPDATE $tables[1] SET status=0, fecha_eliminado=:fecha_eliminado WHERE id=:id");
        $pst->bindParam(":fecha_eliminado", $info['currentDate'], PDO::PARAM_STR);
        $pst->bindParam(":id", $info['correlative'], PDO::PARAM_INT);
        $pst->execute();

        $pdo->bd->commit();

        $response = array(true);
      }
      catch(PDOException $ex){
        $pdo->bd->rollback();
        $response = array(false, $ex);
      }
      return $response;
      }
    }

 ?>
