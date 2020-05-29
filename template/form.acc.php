<html>

<head>
    <?php require_once('head.php') ?>
    <script src="scripts/list.acc.js"></script>
    <title id="title"></title>
</head>

<body class="pagePadding">
    <div class="list" id="accForm" style="display: none">
        <section class="cabecalho">
            <h1 id="pageTitle">Acessórios</h1>
            <?php include('menu.php') ?>
        </section>
        <section class="inputText">
            <form class="form-inline" id="accFormName">
                <div class="form-group">
                    <label for="inputText" class="formLabel">Novo Acessório</label>
                    <input type="text" class="form-control" id="accName" placeholder="Nome">
                </div>
                <div class="form-group">
                    <button class="btn btn-outline-success formButton" type="submit" id="addButton">Cadastrar</button>
                    <button class="btn btn-outline-secondary backButton" id="backButton" type="button" onclick="window.location.href='home.php'">Voltar</button>
                </div>
            </form>
        </section>
        <section class="tabela">
            <table class="table table-striped tabelMarcasAcess" id="tableMarcas">
                <thead class="thead-dark">
                    <tr>
                        <th width="80%">NOME</th>
                        <th width="10%"></th>
                        <th width="10%"></th>
                    </tr>
                </thead>
                <tbody id="tableAcc"></tbody>
            </table>
        </section>
    </div>
</body>

</html>