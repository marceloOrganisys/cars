<?php 

require_once('../classes/accessorie.class.php');
require_once('../classes/car.acc.class.php');
require_once('../classes/car.class.php');
require_once('../models/listModels/accessories.model.php');

$accessoriesModel = new accessoriesModel();
$acc = new Accessorie();
$carAcc = new CarAcc();

switch ($_SERVER['REQUEST_METHOD']) {
	case 'POST':
	switch ($_POST['operation']) {
		case 'getAcessories':
			$data = $accessoriesModel->listAccessories();
			echo json_encode($data);
			break;

		case 'checkDelete':
			$params = array(
				'rows' => 'carId',
				'complement' => 'WHERE accessorieId = ' .$_POST['acc']
			);
			if (empty($carAcc->select($params))) {
				echo json_encode(['status' => true]);
			} else {
				echo json_encode(['status' => false]);
			}
			break;	

		case 'addAcc':
			$params['dados']['name'] = $_POST['name'];
			echo $acc->add($params);
			break;

		case 'updateAcc':
			$params = array(
				'id' => $_POST['id'],
				'dados' => array('name' => $_POST['name'])
			);
			echo $acc->update($params);
			break;

		case 'removeAcc':
			$params = array(
				'row' => 'id',
				'id' => $_POST['acc']
			);
			if ($ans = $acc->remove($params)) {
				echo 'Acessório excluído com sucesso';
			} else {
				echo $ans;
			}
			break;
	}

	break;		
}