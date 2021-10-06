<div class="container-fluid mt-5">
 <div class="row" id="form-row-ajust">
   <div class="col-sm-12 m-auto" id="login-form-div">
     <form class="w-100 mt-3 p-3">
       <div class="form px-2">
         <h1 class="text-center mb-5 text-uppercase">Configurar Colector</h1>
         <div class="form-group">
           <label for="colect_name">Nombre del Colector</label>
           <select class="custom-select custom-select-lg text-capitalize" id="select-colectName">
                <option value="0">Seleccionar</option>
             <?php
                $rutas = new AdminC();
                $rutas -> readColectoresC();
              ?>
           </select>
         </div>
         <div class="form-group mt-5">
           <label for="colect_name">Tipo de Configuración</label>
           <select class="custom-select custom-select-lg text-capitalize" id="select-config">
                <option value="0">Seleccionar</option>
             <?php
                $rutas = new AdminC();
                $rutas -> readConfigOptionC();
              ?>
           </select>
         </div>
         <div class="form-group mt-5">
           <button type="button" class="btn btn-lg btn-block btn-azulSec py-2" id="btn-save-config">Guardar</button>
         </div>
       </div>
     </form>
   </div>
 </div>
</div>
