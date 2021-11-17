<?php
    require_once "conexionbd.php";
    class codigosM extends ConexionBD{
      public $table;
      public $info;

      static public function writeCodeM($table, $codes, $info){
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

          $pst = $pdo->bd-> prepare("INSERT INTO $table[1] (correlativo, codigo, cantidad, proveedor)
          values (:correlativo, :codigo, :cantidad, :proveedor)");
          $pst->bindParam(":correlativo", $id_contact, PDO::PARAM_INT);
          $pst->bindParam(":codigo", $codigo, PDO::PARAM_STR);
          $pst->bindParam(":cantidad", $amount, PDO::PARAM_INT);
          $pst->bindParam(":proveedor", $provider, PDO::PARAM_INT);
          foreach ($codes as $code) {
            $codigo = $code['code'];
            $amount = $code['amount'];
            if(strlen($code['code'])>13){
              $provider = substr($code['code'],0,3);
            }else{
              $res = codigosM::getProvidersId($code['code']);
              $provider = $res[0]['proveedor'];
            }
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

      public function getAllCorrM(){
        $pdo = new ConexionBD();
        $pst = $pdo->bd->prepare("SELECT * FROM $this->table WHERE inventario=:inventario AND status='1'");
        $pst->bindParam(":inventario", $this->info, PDO::PARAM_INT);
        $pst->execute();
        return $pst->fetchAll();
        unset($pdo);
      }

      public function getAllCodesM(){
        $codes = array();
        $pdo = new ConexionBD();
        $pst = $pdo->bd->prepare("SELECT * FROM $this->table WHERE correlativo=:correlativo");
        $pst->bindParam(":correlativo", $id, PDO::PARAM_INT);
        foreach ($this->info as $cor) {
          $id = $cor['id'];
          $pst->execute();
          $codes[] = $pst->fetchAll();
        }
        return $codes;
        unset($pdo);
      }

      //Obtener proveedor para guardalo en el listado de codigos
      static public function getProvidersId($code){
        $pdo = new ConexionBD();
        $pst = $pdo->bd->prepare("SELECT proveedor FROM codigos_productos WHERE codigo=:codigo");
        $pst->bindParam(":codigo", $code, PDO::PARAM_STR);
        $pst->execute();
        $proveedor = $pst->fetchAll();
        return $proveedor;
        unset($pdo);
      }

      //Obtener información de proveedores
      public function getProvidesrInfo(){
        $providers = array();
        $pdo = new ConexionBD();
        $pst = $pdo->bd->prepare("SELECT * FROM $this->table WHERE id=:id");
        $pst->bindParam(":id", $id, PDO::PARAM_INT);
        foreach ($this->info as $codeList) {
          foreach ($codeList as $code) {
            $id = $code['proveedor'];
            $pst->execute();
            $provider = $pst->fetch();
            if(in_array($provider, $providers)!=true){
              $providers[] = $provider;
            }
          }
        }
        return $providers;
        unset($pdo);
      }
    }

 ?>
