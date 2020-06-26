<?php
// require_once('../../services/config.php');
require_once('../classes/car.class.php');
require_once('../classes/accessorie.class.php');
require_once('../classes/car.acc.class.php');
require_once('../models/listModels/cars.model.php');
require_once('xajax/xajax_core/xajax.inc.php');

$xajax = new xajax();
$xajax->registerFunction("validate");

function validate($dados, $acc)
{
	$resp = new xajaxResponse();
	$error = array(
		'descricao' => false,
		'placa' => false,
		'codRenavam' => false,
		'anoModelo' => false,
		'anoFabricacao' => false,
		'cor' => false,
		'km' => false,
		'marca' => false,
		'preco' => false,
		'precoFipe' => false
	);

	if (empty($dados['descricao'])) {
		$error['placa'] = true;
		$resp->assign('descricaoError', 'innerHTML', '<qwerty>O campo não pode ser nulo</qwerty>');
	} elseif (strlen($dados['descricao']) > 60) {
		$error['placa'] = true;
		$resp->assign('descricaoError', 'innerHTML', '<qwerty> A descrição deve ter no máximo 60 caracteres</qwerty>');
	} else {
		$error['placa'] = false;
		$resp->assign('descricaoError', 'innerHTML', '');
	}

	if (empty($dados['placa'])) {
		$error['placa'] = true;
		$resp->assign('placaError', 'innerHTML', '<qwerty>O campo não pode ser nulo</qwerty>');
	} elseif (strlen($dados['placa']) != 8) {
		$error['placa'] = true;
		$resp->assign('placaError', 'innerHTML', '<qwerty>Placa inválida</qwerty>');
	} else {
		$resp->assign('placaError', 'innerHTML', '');
		$error['placa'] = false;
	}

	if (empty($dados['codRenavam'])) {
		$error['codRenavam'] = true;
		$resp->assign('codRenavamError', 'innerHTML', '<qwerty>O campo não pode ser nulo</qwerty>');
	} elseif (strlen($dados['codRenavam']) != 11) {
		$error['codRenavam'] = true;
		$resp->assign('codRenavamError', 'innerHTML', '<qwerty>Código inválido</qwerty>');
	} else {
		$error['codRenavam'] = false;
		$resp->assign('codRenavamError', 'innerHTML', '');
	}

	if (empty($dados['anoModelo'])) {
		$error['anoModelo'] = true;
		$resp->assign('anoModeloError', 'innerHTML', '<qwerty>O campo não pode ser nulo</qwerty>');
	} elseif (strlen($dados['anoModelo']) != 4) {
		$error['anoModelo'] = true;
		$resp->assign('anoModeloError', 'innerHTML', '<qwerty>Ano inválido</qwerty>');
	} else {
		$error['anoModelo'] = false;
		$resp->assign('anoModeloError', 'innerHTML', '');
	}

	if (empty($dados['anoFabricacao'])) {
		$error['anoFabricacao'] = true;
		$resp->assign('anoFabricacaoError', 'innerHTML', '<qwerty>O campo não pode ser nulo</qwerty>');
	} elseif (strlen($dados['anoFabricacao']) != 4) {
		$error['anoFabricacao'] = true;
		$resp->assign('anoFabricacaoError', 'innerHTML', '<qwerty>Ano inválido</qwerty>');
	} else if ($dados['anoModelo'] < $dados['anoFabricacao']) {
		$error['anoFabricacao'] = true;
		$resp->assign('anoFabricacaoError', 'innerHTML', '<qwerty>Ano inválido</qwerty>');
	} else {
		$error['anoFabricacao'] = false;
		$resp->assign('anoFabricacaoError', 'innerHTML', '');
	}

	if (empty($dados['cor'])) {
		$error['cor'] = true;
		$resp->assign('corError', 'innerHTML', '<qwerty>O campo não pode ser nulo</qwerty>');
	} elseif (strlen($dados['cor']) > 20) {
		$error['cor'] = true;
		$resp->assign('corError', 'innerHTML', '<qwerty>O campo deve possuir menos de 20 caracteres</qwerty>');
	} else {
		$resp->assign('corError', 'innerHTML', '');
		$error['cor'] = false;
	}

	if (empty($dados['km'])) {
		$error['km'] = true;
		$resp->assign('kmError', 'innerHTML', '<qwerty>O campo não pode ser nulo</qwerty>');
	} else {
		$error['km'] = false;
		$resp->assign('kmError', 'innerHTML', '');
	}

	if (empty($dados['marca'])) {
		$error['marca'] = true;
		$resp->assign('marcaError', 'innerHTML', '<qwerty>O campo não pode ser nulo</qwerty>');
	} elseif ($dados['marca'] == 'error') {
		$error['marca'] = true;
		$resp->assign('marcaError', 'innerHTML', '<qwerty>Marca inválida</qwerty>');
	} else {
		$error['marca'] = false;
		$resp->assign('marcaError', 'innerHTML', '');
	}

	if (empty($dados['preco'])) {
		$error['preco'] = true;
		$resp->assign('precoError', 'innerHTML', '<qwerty>O campo não pode ser nulo</qwerty>');
	} else {
		$error['preco'] = false;
		$resp->assign('precoError', 'innerHTML', '');
	}

	if (empty($dados['precoFipe'])) {
		$error['precoFipe'] = true;
		$resp->assign('precoFipeError', 'innerHTML', '<qwerty>O campo não pode ser nulo</qwerty>');
	} else {
		$error['precoFipe'] = false;
		$resp->assign('precoFipeError', 'innerHTML', '');
	}

	$approved = true;
	foreach ($error as $value) {
		if ($value) {
			$approved = false;
		}
	}
	
	if ($approved) {
		saveCarData($dados);
		saveCarAccessories($dados, $acc);
		// fazer função para voltar para página inicial
	}
	return $resp;
}

function saveCarData($dados) {
	$car = new Car();

	$carData['carId'] = intval($dados['carId']);
	unset($dados['carId']);
	$carData['dados'] = $dados;

	$car = new Car($carData);
	return $car->save();
}

function saveCarAccessories($dados, $accessories) {
	if (empty($dados['carId'])) {
		$car = new Car();
		$params = array(
			'rows' => 'id',
			'complement' => 'ORDER BY id DESC LIMIT 1'
		);
		$carId = $car->select($params);
		$carId = $carId[0]['id'];
	} else {
		$carId = $dados['carId'];
	}

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

	if ($accCompare != $accCheck) {

		// deleta os acessórios atuais do carro
		removeCarAcc($carId);

		// cadastra os novos acessórios
		addCarAcc($carId, $accessories);
	}
}

function removeCarAcc($carId) {
	$carAcc = new CarAcc();
	$params = array(
		'row' => 'carId',
		'id' => intval($carId)
	);
	return $carAcc->remove($params);
}

function addCarAcc($carId, $accessories) {
	for ($i = 0; $a = count($accessories), $i < $a; $i++) {
		if ($accessories[$i]['checked'] == 1) {
			execute($carId, $accessories[$i]['id']);	
		}	
	}
}

function execute($carId, $accessorieId) {
	$carAcc = new CarAcc();
	$params = array(
		'dados' => array(
			'carId' => $carId,
			'accessorieId' => $accessorieId
		)
	);
	$carAcc->add($params);
}

$xajax->registerFunction("remove");
function remove($carId) {
	$resp = new xajaxResponse();
	$car = new Car(['carId' => $carId]);
	$car->removeCar();
	$resp->call('pesquisaCar', '$("#searchInput").val()', 0); // não executa
	return $resp;
}

$xajax->processRequest();
$xajax->printJavascript('xajax_services/xajax/');
