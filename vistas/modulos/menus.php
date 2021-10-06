<div class="container-fluid ">
  <div class="row px-4 py-0 bg-danger">
    <div class="col-sm-4 py-0" id="colectInfo">
    </div>
    <div class="col-sm-8 py-0" id="configInfo">
    </div>
  </div>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <img class="navbar-brand logo" src="vistas/img/logo-horizontal.png">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse mt-0" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <?php
        $rutas = new rutasControlador();
        $rutas -> menusR();
         ?>
      </ul>
    </div>
  </nav>
</div>
