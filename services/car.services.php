<?php 

require_once('config.php');
require_once('../classes/car.class.php');
require_once('../classes/accessorie.class.php');

function execute($carId, $accessorie){
	$carAcc = new CarAcc();
	$params = array(
		'dados' => array(
			'carId' => $carId,
			'accessorieId' => $accessorie
		)
	);
	$carAcc->add($params);
}

function removeCarAcc($carId){
	$carAcc = new CarAcc();
	$params = array(
		'row' => 'carId',
		'id' => intval($carId)
	);
	return $carAcc->remove($params);
}

function addCarAcc($carId, $accessories){
	for ($i = 0; $a = count($accessories), $i < $a; $i++) {
		if ($accessories[$i]['checked'] == 1) {
			execute($carId, $accessories[$i]['id']);	
		}	
	}
}

switch ($_SERVER["REQUEST_METHOD"]) {
	case 'POST':
	switch ($_POST['operation']) {
		case 'remove':
			$params['carId'] = $_POST['id'];
			$car = new Car($params);
			$car->removeCar();
			break;

		case 'cadastro':

			insert();

			if (empty($_POST['carData']['carId'])) {
				$car = new Car();
				$params = array(
					'rows' => 'id',
					'complement' => 'ORDER BY id DESC LIMIT 1'
				);
				$carId = $car->select($params);
				$carId = $carId[0]['id'];
			} else {
				$carId = $_POST['carData']['carId'];
			}

			$accessories = $_POST['accessories'];
			$carData['carId'] = $carId;
			$car = new Car($carData);
			$carAcc = $car->accessories;

			$accCheck = [];
			for ($i = 0; $a = count($accessories), $i < $a; $i++) {
				if ($accessories[$i]['checked'] == 1) {
					$accCheck[] = intval($accessories[$i]['id']);
				} 
			}

			$accCompare = [];
			for ($i = 0; $a = count($carAcc), $i < $a; $i++) {
				$accCompare[] = intval($carAcc[$i]['accessorieId']);
			}

			if ($accCompare  != $accCheck) {

				// deleta os acessórios atuais do carro
				removeCarAcc($carId);

				// cadastra os novos acessórios
				addCarAcc($carId, $accessories);

			}
			break;

	}	
	break;

	case 'GET':
	switch ($_GET['operation']) {
		case 'getCar':
			$carData['carId'] = $_GET['id'];;
			$car = new Car($carData);
			$params = array(
				'rows' => '*', 
				'complement' => " WHERE id = " . $_GET['id']
			);
			$data = $car->select($params);
			$data[0]['preco'] = number_format($data[0]['preco'], 2);
			$data[0]['precoFipe'] = number_format($data[0]['precoFipe'], 2);
			$data[0]['accessories'] = $car->accessories;
			echo json_encode($data[0]);
			http_response_code(200);
			break;

		case 'getCars':
			$car = new Car();
			$params = array(
				'rows' => '*',
				'complement' => "ORDER BY id desc LIMIT " . $_GET['page']*10 . ", 10;"
			);
			$data['dados'] = $car->select($params);
			$params = array(
				'rows' => 'count(id) AS cars',
				'complement' => ''
			);
			$data['cars'] = $car->select($params);
			$data['cars'] = $data['cars'][0]['cars'];
			echo json_encode($data);
			http_response_code(200);
			break;

		case 'getLastId':
			$car = new Car();
			$params = array(
				'rows' => 'id',
				'complement' => " ORDER BY id desc LIMIT 1;"
			);
			$data = $car->select($params);
			echo json_encode($data);
			http_response_code(200);
			break;

		case 'searchCar':
			$search = isset($_GET['search']) ? trim($_GET['search']) : '';
			$car = new Car();
			$params = array(
				'rows' => '*', 
				'complement' => " WHERE descricao like '%" . $search . "%' or placa like '%" . $search . "%' ORDER BY id desc LIMIT ". ($_GET['page']*10) . ", 10"
			);
			$data['dados'] = $car->select($params);
			$params = array(
				'rows' => 'count(id) AS cars', 
				'complement' => " WHERE descricao like '%" . $search . "%' or placa like '%" . $search . "%'"
			);
			$data['cars'] = $car->select($params);
			$data['cars'] = $data['cars'][0]['cars'];
			echo json_encode($data);
			http_response_code(200);
			break;
	}
}

function insert() {
	$car = new Car();
	$carData = array(
		'carId' => intval($_POST['carData']['carId']), 
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
	if (empty($car->validate())) {
		if ($car->save()) {
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