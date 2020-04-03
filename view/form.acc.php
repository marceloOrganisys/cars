<html>

<head>
    <meta charset="utf-8">
    <link rel="stylesheet" type="text/css" href="style.css">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <script src="https://code.jquery.com/jquery-3.4.1.js" integrity="sha256-WpOohJOqMqqyKL9FccASB9O0KwACQJpFTUBLTYOVvVU=" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@9"></script>
    <script src="scripts/routieSource.js"></script>
    <script src="scripts/jquery.mask.min.js"></script>
    <script src="scripts/list.acc.js"></script>
    <title id="title"></title>
</head>

<body>
    <div id="accForm" style="display: none">
        <div class="d-flex justify-content-center">
            <div id="titlePage">
                <h1 id="accTitle"> Acessórios </h1>
            </div><br>
        </div>
        <div class="d-flex justify-content-center" style="margin-top:20px;">
            <form class="form-inline" id="accFormName">
                <div class="form-group">
                    <label for="inputPassword2" class=" margin_">Novo Acessório</label>
                    <input type="text" class="form-control margin_" id="accName" placeholder="Nome">
                </div>
                <button class="btn btn-outline-success margin_" type="button" id="addButton">Cadastrar</button>
                <button class="btn btn-outline-secondary" id="backButton" type="button" style="margin-left:-20px;" class="backButton" onclick="window.location.href='home.php'">Voltar</button>
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