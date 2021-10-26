<div class="vertical-nav active" id="sidebar">
  <div class="text-gray d-flex row px-3 py-0">
    <div class="ml-1 mt-1 px-1" id="colectId">
    </div>
  </div>
  <div class="py-4 px-3 mb-0">
      <div class="media d-flex align-items-center">
        <img src="vistas/img/logo-horizontal.png" alt="..."
        class="mr-3 logo">
        <button id="sidebarCollapseM" type="button" class="btn bg-gray
          rounded-pill shadow-sm px-4 mb-4 sidebarCollapse text-light text-center
          ml-auto mr-2 d-none"><i class="fas fa-bars mr-2"></i>
        </button>
      </div>
  </div>
  <div class="form-group mx-2">
    <label for="colect_name">Tipo de Ingreso</label>
    <select class="custom-select custom-select text-capitalize" id="select-config-In">
         <option value="0">Seleccionar</option>
         <option value="1">Etiquetas Nefnodel</option>
         <option value="2">Plastico</option>
    </select>
  </div>
  <div class="">
    <ul class="nav flex-column mb-0">
      <li id="inCodesLink">
        <a class="nav-link text-uppercase text-gray active" href="?ruta=in-code">
          <i class="fas fa-pen mr-2"></i>Ingresar códigos
        </a>
      </li>
      <li id="ConfigLink">
        <a class="nav-link text-uppercase text-gray" href="?ruta=login">
          <i class="fas fa-cog mr-2"></i>Configuración
        </a>
      </li>
      <li id="RevListLink">
        <a class="nav-link text-uppercase text-gray" href="?ruta=review-list">
          <i class="fas fa-list mr-3"></i>Revisar Listados
        </a>
      </li>
    </ul>
    <?php
      $extraMenu = new rutasControlador();
      $extraMenu -> menusColect2R();
    ?>
  </div>
</div>
