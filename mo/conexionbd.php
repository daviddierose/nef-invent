<?php
class ConexionBD{
  private $server = "localhost";
  private $dbName = "colector";
  private $user = "root";
  private $pass = "";
  private $options = [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                      PDO::ATTR_ORACLE_NULLS => PDO::NULL_EMPTY_STRING,
                      PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC];
  public $bd;
  function __construct(){
    $this->bd = new PDO("mysql:host={$this->server};dbname={$this->dbName}",
                          $this->user, $this->pass, $this->options);
   }
}

 ?>
