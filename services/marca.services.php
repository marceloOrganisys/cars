<?php

require_once('../classes/marca.class.php');
require_once('../classes/car.class.php');
require_once('../models/listModels/marca.model.php');

$marcasModel = new marcasModel();
$marca = new Marca();
$car = new Car();

switch ($_SERVER['REQUEST_METHOD']) {
	case 'POST':
	switch ($_POST['operation']) {
		case 'getMarcas':
			$data = $marcasModel->listMarcas();
			echo json_encode($data);
			break;

		case 'checkDelete':
			$params = array(
				'rows' => ' id ',
				'complement' => ' WHERE marca = ' .$_POST['marca']
			);
			if (empty($car->select($params))) {
				echo json_encode(['status' => true]);
			} else {
				echo json_encode(['status' => false]);
			}
			break;	

		case 'addMarca':
			$params['dados']['name'] = $_POST['name'];
			echo $marca->add($params);
			break;

		case 'updateMarca':
			$params = array(
				'id' => $_POST['id'],
				'dados' => array('name' => $_POST['name'])
			);
			echo $marca->update($params);
			break;

		case 'removeMarca':
			$params = array(
				'row' => 'id',
				'id' => $_POST['marca']
			);
			if ($ans = $marca->remove($params)) {
				echo 'Acessório excluído com sucesso';
			} else {
				echo $ans;
			}
			break;
	}

	break;		
}