<?php
    require_once "conexionbd.php";
    class codigosM{
      public function writeCodeM($table, $colector, $codes, $currentDate){
          $pdo = new ConexionBD();
        try{
          $pdo->bd->beginTransaction();
          $pst= $pdo->bd->prepare("INSERT INTO $table[0] (colector, fecha)
          values (:colector, :fecha)");
          $pst->bindParam(":colector", $colector, PDO::PARAM_INT);
          $pst->bindParam(":fecha", $currentDate, PDO::PARAM_STR);
          $pst->execute();

          $id_contact = $pdo->bd-> lastInsertId();

          $pst = $pdo->bd-> prepare("INSERT INTO $table[1] (correlativo, codigo, cantidad)
          values (:correlativo, :codigo, :cantidad)");
          $pst->bindParam(":correlativo", $id_contact, PDO::PARAM_INT);
          $pst->bindParam(":codigo", $codigo, PDO::PARAM_STR);
          $pst->bindParam(":cantidad", $amount, PDO::PARAM_INT);
          foreach ($codes as $code) {
            $codigo = $code[0];
            $amount = $code[1];
            $pst->execute();
          }
          $pdo->bd->commit();

          $response = array(true, $id_contact);
        }
        catch(PDOException $ex){
          $pdo->bd->rollback();
          $response =  false;
        }
        return $response;
      }

      static public function readCorrelativeM($table, $colector){
        $pdo = new ConexionBD();
        $pst = $pdo->bd->prepare("SELECT id FROM $table WHERE colector = :colector");
        $pst->bindParam(":colector", $colector, PDO::PARAM_INT);
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
    }

 ?>
