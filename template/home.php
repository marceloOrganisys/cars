<html>

<head>
	<?php require_once('head.php') ?>
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