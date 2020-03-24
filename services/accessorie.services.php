<?php 

	require_once("../classes/accessorie.class.php");
	require_once("../classes/car.acc.class.php");
	require_once("../classes/car.class.php");

	$acc = new Accessorie();

	function execute($carId, $accessorie){
		$carAcc = new CarAcc();
		$params['tabela'] = $carAcc->tabela;
		$params['dados']['carId'] = $carId;
		$params['dados']['accessorieId'] = $accessorie;
		$carAcc->add($params);
	}

	function deleteCarAcc($carId){
		$carAcc = new CarAcc();
		$params = array(
			'tabela' => $carAcc->tabela,
			'row' => 'carId',
			'id' => intval($carId)
		);
		return $carAcc->remove($params);
	}

	function cadCarAcc($carId, $accessories){
		for ($i = 0; $a = count($accessories), $i < $a; $i++) {
			if ( $accessories[$i]['checked'] == 1 ){
				execute($carId, $accessories[$i]['id']);	
			}	
		}
	}


	switch ($_SERVER["REQUEST_METHOD"]) {
		case 'POST':
			switch ($_POST['operation']) {
				// ACCESÓRIOS E CARROS
				case 'newAccCar':
					$params['tabela'] = 'carAccessorie';
					// Checa os accessórios
					$carId = $_POST['carId'];
					$accessories = $_POST['accessories'];
					$carData['carId'] = $carId;
					$car = new Car($carData);
					$carAcc = $car->accessories;

					$accCheck = [];
					for ( $i = 0; $a = count($accessories), $i < $a; $i++ ) {
						if ( $accessories[$i]['checked'] == 1 ) {
							$accCheck[] = intval($accessories[$i]['id']);
						} 
					}

					$accCompare = [];
					for ( $i = 0; $a = count($carAcc), $i < $a; $i++ ) {
						$accCompare[] = intval($carAcc[$i]['accessorieId']);
					}

					if ( $accCompare  != $accCheck ) {

						// deleta os acessórios atuais do carro
						deleteCarAcc($carId);

						// cadastra os novos acessórios
						cadCarAcc($carId, $accessories);

					}

					break;

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
						'table' => 'carAccessorie',
						'rows' => 'accessorieId',
						'complement' => "WHERE carId = " . $id
					);
					$data = $acc->select($params);
					echo json_encode($data);
					break;

				// ACESSÓRIOS
				case 'selectAcessories':
					$params = array(
						'table' => $acc->tabela,
						'rows' => '*',
						'complement' => ""
					);
					$data = $acc->select($params);
					echo json_encode($data);
					break;

				case 'checkDelete':
					$params = array(
						'table' => 'carAccessorie',
						'rows' => 'carId',
						'complement' => "WHERE accessorieId = ".$_POST['acc']
					);
					if (empty($acc->select($params))) {
						echo json_encode(['status' => true]);
					} else {
						echo json_encode(['status' => false]);
					}
					break;	

				case 'deleteAcc':
					$params = array(
						'tabela' => $acc->tabela,
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
					$params['tabela'] = 'accessorie';
					$params['dados']['name'] = $_POST['name'];
					echo $acc->add($params);
					break;

				case 'alterAcc':
					$params['tabela'] = 'accessorie';
					$params['carId'] = $_POST['id'];
					$params['dados']['name'] = $_POST['name'];
					echo $acc->update($params);
					break;
			}

		break;		
	}