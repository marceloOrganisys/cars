<html>

<head>
	<meta charset="utf-8">
	<link rel="stylesheet" type="text/css" href="style.css">
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
	<script src="https://code.jquery.com/jquery-3.4.1.js" integrity="sha256-WpOohJOqMqqyKL9FccASB9O0KwACQJpFTUBLTYOVvVU=" crossorigin="anonymous"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.maskedinput/1.4.1/jquery.maskedinput.js"></script>
	<script src="scripts/routieSource.js"></script>
	<script src="scripts/list.cars.js"></script>
	<script src="scripts/jquery.mask.min.js"></script>
	<script src="scripts/masks.js"></script>
	<title id="title"></title>
</head>

<body>
	<?php
	include_once("form.car.php");
	?>
	<div align="center" id="listCars" style="display: none">
		<h1> Automóveis </h1>
		<div id="homeButtons">
			<button class="btn btn-outline-primary align" id="addCarBtn" onclick="changeScreen(0)">New car</button>
			<button class="btn btn-outline-primary align" id="addAccBtn" onclick="window.location.href = 'form.acc.php'">Accesories</button>
		</div>
		<div class="d-flex justify-content-center" style="margin-top:20px;">
			<form class="form-inline" id="search" onsubmit="event.preventDefault()">
				<div class="form-group">
					<label for="inputPassword2" class="margin_">Pesquisar</label>
					<input type="text" class="form-control margin_" id="searchInput" placeholder="Pesquisa...">
					<button id="searchButton" class="btn btn-outline-success margin_">Pesquisar</button>
				</div>
			</form>
		</div>
		<table class="table table-striped" id="tableb">
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
		<div>
		</div>
		<div id="containerFooter">
			<nav class="navbar fixed-bottom navbar-light bg-light d-flex justify-content-center" id="navBar">
				<ul class="pagination" id="paginationButtons">
				</ul>
			</nav>
		</div>
	</div>
</body>

</html>