<?php

function createFile($codes, $cor){
  $corre = str_pad($cor, 4, "0", STR_PAD_LEFT);
  $dir_root = $_SERVER['DOCUMENT_ROOT']."/nefnodel/colect14/archivos/";
  $file = fopen($dir_root.$corre.".txt", "w+")
  or die("No se puede crear el archivo ".$cor);

  for ($i=0; $i<count($codes); $i++) {
    fputs($file, $codes[$i] . PHP_EOL);
  }

  fclose($file);
  $res = true;
  return $res;
}



 ?>
