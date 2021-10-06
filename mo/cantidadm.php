<?php
function obtenerMenu ($directorio){

    // Array en el que obtendremos los resultados
    $res = array();
    // Agregamos la barra invertida al final en caso de que no exista
    if(substr($directorio, -1) != "/") $directorio .= "/";

    // Creamos un puntero al directorio y obtenemos el listado de archivos
    $dir = @dir($directorio) or die("getFileList: Error abriendo el directorio $directorio para leerlo");
    while(($archivo = $dir->read()) !== false) {

      // Obviamos los archivos ocultos
      if($archivo[0] == ".") continue;
      if(is_dir($directorio . $archivo)) {
        $count_dir = @scandir($directorio . $archivo);
        $directorioInterior= $directorio . $archivo . "/";
        if(count($count_dir) > 0){
          $res[] = array(
            "Codigo" => $archivo,
            "Nombre" => $categoria["nombre"],
            "Icono" => $categoria["icono"],
            "Directorio" => obtenerMenu($directorioInterior),
          );

        }

    /*Crea un array con el nombre del directorio y el array de la carpeta
    interior. Si el directorio tiene otras carpetas dentro las examina y crea otro array
    con los archivos dentro*/

      } else if (is_readable($directorio . $archivo)) {
          $res[] = $archivo;
      }
    }
    $dir->close();
    return $res;
  }
 ?>
