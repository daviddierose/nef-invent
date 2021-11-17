<!DOCTYPE html>
<html lang="es" dir="ltr">
  <?php
    include "vistas/modulos/head.php";
   ?>
  <body>
  <?php
    include "vistas/modulos/menu-admin.php";
    include "vistas/modulos/alerts.php";
   ?>
   <!--Información por página-->
   <div class="page-content p-3 active" id="content">
     <?php
       include "vistas/modulos/boton-menu.php";
      ?>
      <div class="container">
        <div class="row colum" id="infoInve">
          <div class="col-sm-6 border border-gray rounded overflow-auto p-0" id="colTable">
            <table id="codTable" class="table table-striped mt-1 tablesorte table-responsive-sm">
              <thead class="table-borderless">
                <tr>
                  <th class="w-10">Correlativo</th>
                  <th class="w-40">Colector</th>
                  <th class="w-40">Pares</th>
                  <th class="w-10">Estado</th>
                  <th class="w-10"></th>
                </tr>
              </thead>
              <tbody id="codesList"></tbody>
           </table>
          </div>
          <div class="col-sm-6">
            <div class="col-canvas border border-gray rounded p-3 mb-2" id="colCanvas">
              <canvas id="chartColectoresBar" class="chartsBar"></canvas>
              <canvas id="chartColectoresPie" class="chartsPie" style="display:none"></canvas>
            </div>
            <div class="col-canvas border border-gray rounded p-3">
              <canvas id="chartProveedoresBar" class="chartsBar"></canvas>
              <canvas id="chartProveedoresPie" class="chartsPie" style="display:none"></canvas>
            </div>
          </div>
        </div>
      </div>
   </div>
   <?php
      include "vistas/modulos/script-chart.php";
    ?>
  </body>
</html>
