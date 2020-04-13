<html>

<head>
    <meta charset="utf-8">
    <link rel="stylesheet" type="text/css" href="style.css">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <script src="https://code.jquery.com/jquery-3.4.1.js" integrity="sha256-WpOohJOqMqqyKL9FccASB9O0KwACQJpFTUBLTYOVvVU=" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@9"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
    <script src="scripts/routieSource.js"></script>
    <script src="scripts/list.marca.js"></script>
    <title id="title"></title>
</head>

<body  class="pagePadding">
    <div id="marcaForm" style="display: none">
        <div class="d-flex justify-content-center">
            <div>
                <h1 id="pageTitle"> Marcas </h1>
                <div id="menu">
                    <?php include('menu.php') ?>
                </div>
            </div><br>
        </div>
        <div class="d-flex justify-content-center" style="margin-top:20px;">
            <form class="form-inline" id="accFormName">
                <div class="form-group">
                    <label class=" margin_">Nova marca</label>
                    <input type="text" class="form-control margin_" id="accName" placeholder="Nome">
                </div>
                <div class="form-group">
                    <button class="btn btn-outline-success margin_" type="button" id="addButton">Cadastrar</button>
                    <button class="btn btn-outline-secondary" id="backButton" type="button" style="margin-left:-20px;" class="backButton" onclick="window.location.href='home.php'">Voltar</button>
                </div>
            </form>
        </div>
        <div class="d-flex justify-content-center" style="margin-top:20px;">
            <table class="table table-striped" id="tablec">
                <thead class="thead-dark">
                    <tr>
                        <th width="80%">NOME</th>
                        <th width="10%"></th>
                        <th width="10%"></th>
                    </tr>
                </thead>
                <tbody id="tableAcc"></tbody>
            </table>
        </div>
    </div>
</body>

</html>