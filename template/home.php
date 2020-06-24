<html>

<head>

	<?php
	require_once('../xajax/xajax_core/xajax.inc.php');
	$xajax = new xajax();
	$xajax->registerFunction("validate");

	function validate($dados) {
		$resp = new xajaxResponse();
		$resultado = 'default';

		if ($dados['nome'] == "") {
			$resultado = 'Novo Cadastro';
		} else {
			$resultado = 'Edição';
		}
		$resp->assign('subPlaca', 'innerHTML', $resultado);
		return $resp;

		// $error = [];
		// if (empty($dados->descricao) || strlen($dados->descricao) > 60) {
		// 	$error['descricao'] = true;
		// }

		// if (empty($dados->placa) || strlen($dados->placa) != 8) {
		// 	$error['placa'] = true;
		// }

		// if (empty($dados->codRenavam) || strlen($dados->codRenavam) != 11) {
		// 	$error['codRenavam'] = true;
		// }

		// if (empty($dados->anoModelo) || strlen($dados->anoModelo) != 4) {
		// 	$error['anoModelo'] = true;
		// }

		// if (empty($dados->anoFabricacao) || strlen($dados->anoFabricacao) != 4) {
		// 	$error['anoFabricacao'] = true;
		// }

		// if (empty($dados->cor) || strlen($dados->cor) > 20) {
		// 	$error['cor'] = true;
		// }

		// if (empty($dados->km)) {
		// 	$error['km'] = true;
		// }

		// if (empty($dados->marca)) {
		// 	$error['marca'] = true;
		// }

		// if (empty($dados->preco)) {
		// 	$error['preco'] = true;
		// }

		// if (empty($dados->precoFipe)) {
		// 	$error['precoFipe'] = true;
		// }

		// return $error;
	}

	$xajax->processRequest();

	$xajax->printJavascript('../xajax/');
	require_once('head.php');
	?>
	<script src="scripts/list.cars.js"></script>
	<title id="title"></title>
</head>

<body>
	<?php include_once("form.car.php"); ?>
	<div class="list" id="listCars" style="display:none; width: 1000px;">
		<section class="cabecalho">
			<section style="display:flex; align-items:center;">
				<h1 class="title"> Automóveis </h1>
				<img class="imgSize addCarIcon" id="addCarIcon" src="../icons/add.png">
			</section>
			<?php include('menu.php') ?>
		</section>
		<section class="inputText">
			<form class="form-inline" id="search" onsubmit="event.preventDefault()">
				<label for="pesquisaCarro" class="formLabel">Pesquisar</label>
				<input type="text" class="form-control pageInput" id="searchInput" placeholder="Pesquisa...">
				<div class="form-group">
					<button id="searchButton" class="btn btn-outline-success formButton">Pesquisar</button>
				</div>
			</form>
		</section>
		<section class="tabela">
			<table class="table table-striped tables" id="tableCars">
				<thead class="thead-dark">
					<tr>
						<th width="60%">DESCRIÇÃO</th>
						<th width="15%">PLACA</th>
						<th width="15%">MARCA</th>
						<th width="5%"></th>
						<th width="5%"></th>
					</tr>
				</thead>
				<tbody id="table"></tbody>
			</table>
		</section>
		<section class="footer">
			<nav class="navbar navbar-light bg-light d-flex justify-content-center" id="navBar">
				<ul class="pagination" id="paginationButtons">
				</ul>
			</nav>
		</section>
	</div>
</body>

</html>