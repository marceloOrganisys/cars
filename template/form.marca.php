<html>

<head>
    <?php require_once('head.php') ?>
    <script src="scripts/list.marca.js"></script>
    <title id="title"></title>
</head>

<body>
    <div class="list" id="marcaForm" style="display: none; width:1000px;">
        <section class="cabecalho">
            <h1 id="pageTitle"> Marcas </h1>
            <?php include('menu.php') ?>
        </section>
        <section class="inputText">
            <form class="form-inline" id="newMarcaForm">
                <div class="form-group">
                    <label for="imputText" class="formLabel">Nova marca</label>
                    <input type="text" class="form-control" id="marcaName" placeholder="Nome">
                </div>
                <div class="form-group">
                    <button class="btn btn-outline-success formButton" type="submit" id="addButton">Cadastrar</button>
                    <button class="btn btn-outline-secondary backButton" id="backButton" type="button" onclick="window.location.href='home.php'">Voltar</button>
                </div>
            </form>
        </section>
        <section class="tabela">
            <table class="table table-striped" id="tableAcess">
                <thead class="thead-dark">
                    <tr>
                        <th width="80%">NOME</th>
                        <th width="10%"></th>
                        <th width="10%"></th>
                    </tr>
                </thead>
                <tbody id="tableMarca"></tbody>
            </table>
        </section>
    </div>
</body>

</html>