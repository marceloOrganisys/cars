<?php 

require_once('config.php');
require_once('../classes/car.class.php');
require_once('../classes/accessorie.class.php');
require_once('../models/listModels/cars.model.php');

switch ($_SERVER['REQUEST_METHOD']) {
	case 'POST':
	switch ($_POST['operation']) {
		case 'remove':
			$params['carId'] = $_POST['id'];
			$car = new Car($params);
			$car->removeCar();
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
			if (isset($data[0]['id'])) {
				http_response_code(200);
			} else {
				http_response_code(404);
			}
			$data[0]['preco'] = number_format($data[0]['preco'], 2);
			$data[0]['precoFipe'] = number_format($data[0]['precoFipe'], 2);
			$data[0]['accessories'] = $car->accessories;
			echo json_encode($data[0]);
			break;

		case 'getCars':
			$carsModel = new carsModel();
			$params = array(
				'page' => $_GET['page']
			);
			$data = $carsModel->listCars($params);
			echo json_encode($data);
			http_response_code(200);
			break;

		case 'getLastId':
			$car = new Car();
			$params = array(
				'rows' => 'id',
				'complement' => " ORDER BY id DESC LIMIT 1;"
			);
			$data = $car->select($params);
			echo json_encode($data);
			http_response_code(200);
			break;

		case 'searchCar':
			$search = isset($_GET['search']) ? trim($_GET['search']) : '';
			$carsModel = new carsModel();
			$params = array(
				'search' => $search,
				'page' => $_GET['page']
			);
			$data = $carsModel->listCars($params);
			echo json_encode($data);
			http_response_code(200);
			break;
	}
}