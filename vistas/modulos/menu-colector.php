<div class="vertical-nav bg-white active" id="sidebar">
  <div class="d-flex row px-3 py-0 bg-gray">
    <div class="px-1" id="colectInfo">
    </div>
    <div class="px-1" id="configInfo">
    </div>
  </div>
  <div class="py-4 px-3 mb-1 bg-light">
      <div class="media d-flex align-items-center">
        <img src="vistas/img/logo-horizontal.png" alt="..."
        class="mr-3 logo">
        <button id="sidebarCollapseM" type="button" class="btn btn-light bg-white
        rounded-pill shadow-sm px-2 ml-auto sidebarCollapse d-none"><i class="fas fa-bars mr-2"></i>
        </button>
      </div>
  </div>
  <ul class="nav flex-column bg-white mb-0">
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
