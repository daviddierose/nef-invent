<div class="vertical-nav active pb-2" id="sidebar">
  <div class="py-4 px-3 mb-1">
      <div class="media d-flex align-items-center">
        <img src="vistas/img/logo-horizontal.png" alt="..."
        class="mr-3 logo">
        <button id="sidebarCollapseM" type="button" class="btn bg-gray
          rounded-pill shadow-sm px-4 mb-4 sidebarCollapse text-light text-center
          ml-auto mr-2 d-none"><i class="fas fa-bars mr-2"></i>
        </button>
      </div>
  </div>
  <div class="">
    <ul class="nav flex-column mb-0">
      <li id="">
        <a class="nav-link text-uppercase text-gray" href="#">
          <i class="fas fa-home mr-2"></i></i>Inicio
        </a>
      </li>
      <li id="">
        <a class="nav-link text-uppercase text-gray" href="#">
          <i class="fas fa-plus mr-2"></i>Crear Colector
        </a>
      </li>
      <li id="">
        <a class="nav-link text-uppercase text-gray" href="#">
          <i class="fas fa-history mr-2"></i>Reiniciar Inventario
        </a>
      </li>
      <li id="">
        <a class="nav-link text-uppercase text-gray" href="#">
          <i class="fas fa-lock mr-2"></i></i>Cerrar Inventario
        </a>
      </li>
    </ul>
  </div>
  <div class="d-flex collapsebotton menu-admin-padding text-gray" data-toggle="collapse" href="#collapseColectors" role="button" aria-expanded="false" aria-controls="collapseColectors">
    <p class="ml-3 my-auto text-uppercase">Colectores</p>
    <i class="ml-auto mr-3 my-auto fas fa-chevron-down"></i>
    <i class="ml-auto mr-3 my-auto d-none fas fa-chevron-up"></i>
  </div>
  <div class="separator-tittle d-none" id="collapseColectorsLine"></div>
  <div class="collapse" id="collapseColectors">
    <ul class="nav flex-column mb-0">
      <?php
        $colector = new loadC();
        $colector->loadColectoresC();
       ?>
    </ul>
  </div>

</div>
