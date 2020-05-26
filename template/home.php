<html>

<head>
	<meta charset="utf-8">
	<link rel="stylesheet" type="text/css" href="style.css">
	<script src="https://code.jquery.com/jquery-3.4.1.js" integrity="sha256-WpOohJOqMqqyKL9FccASB9O0KwACQJpFTUBLTYOVvVU=" crossorigin="anonymous"></script>
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
	<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
	<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
	<script src="//code.jquery.com/jquery-1.12.4.min.js"></script>
	<script src="//rawgithub.com/indrimuska/jquery-editable-select/master/dist/jquery-editable-select.min.js"></script>
	<link href="//rawgithub.com/indrimuska/jquery-editable-select/master/dist/jquery-editable-select.min.css" rel="stylesheet">
	<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.maskedinput/1.4.1/jquery.maskedinput.js"></script>
	<script src="scripts/routieSource.js"></script>
	<script src="scripts/list.cars.js"></script>
	<script src="scripts/jquery.mask.min.js"></script>
	<script src="scripts/masks.js"></script>
	<title id="title"></title>
</head>

<body>
	<?php include_once("form.car.php"); ?>
	<div class="list" id="listCars" style="display: none">
		<section class="cabecalho">
			<section style="display:flex; align-items:center;">
				<h1 class="title"> Automóveis </h1>
				<img id="addCarIcon" src="../icons/add.png">
			</section>
			<?php include('menu.php') ?>
		</section>
		<section class="pesquisa">
			<form class="form-inline" id="search" onsubmit="event.preventDefault()">
				<label for="pesquisaCarro" class="formLabel">Pesquisar</label>
				<input type="text" class="form-control" id="searchInput" placeholder="Pesquisa...">
				<div class="form-group">
					<button id="searchButton" class="btn btn-outline-success formButton">Pesquisar</button>
				</div>
			</form>
		</section>
		<section class="tabela">
			<table class="table table-striped" id="tableCars">
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