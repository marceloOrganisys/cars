<?php 

	require_once("../classes/accessorie.class.php");
	require_once("../classes/car.acc.class.php");
	require_once("../classes/car.class.php");

	$acc = new Accessorie();
	$carAcc = new CarAcc();

	switch ($_SERVER["REQUEST_METHOD"]) {
		case 'POST':
			switch ($_POST['operation']) {
				// ACCESÓRIOS E CARRO
				case 'addCarAccessories':
					if (isset($_POST['accessories'])) {
						cadCarAcc($_POST['carId'], $_POST['accessories']);
					}
					break;

				case 'deleteAccCar':
					echo deleteCarAcc($_POST['carId']);
					break;

				case 'getCarAccessories':
					$id = $_POST['id'];
					$params = array(
						'rows' => 'accessorieId',
						'complement' => "WHERE carId = " . $id
					);
					$data = $carAcc->select($params);
					echo json_encode($data);
					break;

				// ACESSÓRIOS
				case 'selectAcessories':
					$params = array(
						'rows' => '*',
						'complement' => ""
					);
					$data = $acc->select($params);
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

				case 'deleteAcc':
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

				case 'addAcc':
					$params['dados']['name'] = $_POST['name'];
					echo $acc->add($params);
					break;

				case 'alterAcc':
					$params['carId'] = $_POST['id'];
					$params['dados']['name'] = $_POST['name'];
					echo $acc->update($params);
					break;
			}

		break;		
	}