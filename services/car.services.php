<?php 

	require_once('config.php');
	require_once('../classes/car.class.php');
	require_once('../classes/accessorie.class.php');

	switch ($_SERVER["REQUEST_METHOD"]) {
		case 'POST':
			switch ($_POST['operation']) {
				case 'remove':
					$car = new Car();
					$id = $_POST['id'];
					$params['id'] = $id;
					echo $car->remove($params) == '' ? "Registro removido" : "erro";
					break;

				case 'cadastro':
					insert();
					break;

			}	
			break;
		
		case 'GET':
			switch ($_GET['operation']) {
				case 'getCar':
					$id = $_GET['id'];
					$carData['carId'] = $id;
					$cars = new Car($carData);
					$params = array(
						'table' => $cars->tabela, 
						'rows' => '*', 
						'complement' => " WHERE id = $id "
					);
					$data = $cars->select($params);
					$data[0]['accessories'] = $cars->accessories;
					echo json_encode($data[0]);
					http_response_code(200);
					break;

				case 'listCars':
					$cars = new Car();
					$params = array(
						'table' => $cars->tabela,
						'rows' => '*',
						'complement' => "ORDER BY id desc LIMIT " . $_GET['page']*10 . ", 10;"
					);
					$data = $cars->select($params);
					echo json_encode($data);
					http_response_code(200);
					break;

				case 'cars':
					$cars = new Car();
					$params = array(
						'table' => $cars->tabela,
						'rows' => 'count(id) AS cars',
						'complement' => null
					);
					$data = $cars->select($params);
					echo json_encode($data[0]);
					http_response_code(200);
					break;

				case 'getLastId':
					$cars = new Car();
					$params = array(
						'table' => $cars->tabela,
						'rows' => 'id',
						'complement' => " ORDER BY id desc LIMIT 1;"
					);
					$data = $cars->select($params);
					echo json_encode($data[0]);
					http_response_code(200);
					break;

				case 'searchCar':
					$search = trim($_GET['search']);
					$cars = new Car();
					$params = array(
						'table' => $cars->tabela, 
						'rows' => '*', 
						'complement' => " WHERE descricao like '%" . $search . "%' or placa like '%" . $search . "%' ORDER BY id desc LIMIT ". ($_GET['page']*10) . ", 10"
					);
					$data = $cars->select($params);
					echo json_encode($data);
					http_response_code(200);
					break;

				case 'searchNumber':
					$search = trim($_GET['search']);
					$cars = new Car();
					$params = array(
						'table' => $cars->tabela, 
						'rows' => 'count(id) as numb', 
						'complement' => " WHERE descricao like '%" . $search . "%' or placa like '%" . $search . "%'"
					);
					$data = $cars->select($params);
					echo json_encode($data[0]);
					http_response_code(200);
					break;
			}
	}

	
	function insert() {

		$car = new Car();
		$carData = array(
				'tabela' => $car->tabela, 
				'carId' => $_POST['carData']['carId'], 
				'dados' => array(
					'descricao' => $_POST['carData']['descricao'], 
					'placa' => $_POST['carData']['placa'], 
					'codRenavam' => $_POST['carData']['codRenavam'], 
					'anoModelo' => $_POST['carData']['anoModelo'], 
					'anoFabricacao' => $_POST['carData']['anoFabricacao'], 
					'cor' => $_POST['carData']['cor'], 
					'km' => $_POST['carData']['km'], 
					'marca' => $_POST['carData']['marca'], 
					'preco' => $_POST['carData']['preco'], 
					'precoFipe' => $_POST['carData']['precoFipe']
				)
			);

		$car = new Car($carData);
		if (empty($car->validate($carData['dados']))) {

			if ($car->save($carData)) {
				echo empty($carData['carId']) ? 'Veículo inserido com sucesso' : 'Veículo alterado com sucesso'; 
			}

		} else {

			$response = [];
			$errors = $car->validate($carData['dados']);
			foreach ($errors as $key => $value) {
				$response[] = ("Erro no campo ". $key);	
			}
			echo json_encode($response);

		}
	}
?>