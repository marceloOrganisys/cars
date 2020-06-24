<?php
	require_once('xajax/xajax_core/xajax.inc.php');
	$xajax = new xajax();
	$xajax->registerFunction("validate");

	function validate($dados, $acc) {
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
			$resp->assign('anoModeloError', 'innerHTML', 'O campo não pode ser nulo');
		} elseif (strlen($dados['anoModelo']) != 4) {
			$error['anoModelo'] = true;
			$resp->assign('anoModeloError', 'innerHTML', 'Ano inválido');
		} else {
			$error['anoModelo'] = false;
			$resp->assign('anoModeloError', 'innerHTML', '');
		}

		if (empty($dados['anoFabricacao'])) {
			$error['anoFabricacao'] = true;
			$resp->assign('anoFabricacaoError', 'innerHTML', 'O campo não pode ser nulo');
		} elseif (strlen($dados['anoFabricacao']) != 4) {
			$error['anoFabricacao'] = true;
			$resp->assign('anoFabricacaoError', 'innerHTML', 'Ano inválido');
		} else if ($dados['anoModelo'] < $dados['anoFabricacao']) {
			$error['anoFabricacao'] = true;
			$resp->assign('anoFabricacaoError', 'innerHTML', 'Ano inválido');
		} else {
			$error['anoFabricacao'] = true;
			$resp->assign('anoFabricacaoError', 'innerHTML', '');
		}

		if (empty($dados['cor'])) {
			$error['cor'] = true;
			$resp->assign('corError', 'innerHTML', 'O campo não pode ser nulo');
		} elseif (strlen($dados['cor']) > 20) {
			$error['cor'] = true;
			$resp->assign('corError', 'innerHTML', 'O campo deve possuir menos de 20 caracteres');
		} else {
			$resp->assign('corError', 'innerHTML', '');
			$error['cor'] = false;
		}

		if (empty($dados['km'])) {
			$error['km'] = true;
			$resp->assign('kmError', 'innerHTML', 'O campo não pode ser nulo');
		} else {
			$error['km'] = false;
			$resp->assign('kmError', 'innerHTML', '');
		}

		if (empty($dados['marca'])) {
			$error['marca'] = true;
			$resp->assign('marcaError', 'innerHTML', 'O campo não pode ser nulo');
		} elseif ($dados['marca'] == 'error') {
			$error['marca'] = true;
			$resp->assign('marcaError', 'innerHTML', 'Marca inválida');
		} else {
			$error['marca'] = false;
			$resp->assign('marcaError', 'innerHTML', '');
		}

		if (empty($dados['preco'])) {
			$error['preco'] = true;
			$resp->assign('precoError', 'innerHTML', 'O campo não pode ser nulo');
		} else {
			$error['preco'] = false;
			$resp->assign('precoError', 'innerHTML', '');
		}

		if (empty($dados['precoFipe'])) {
			$error['precoFipe'] = true;
			$resp->assign('precoFipeError', 'innerHTML', 'O campo não pode ser nulo');
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

		// redireciona o usuário à pagina inicial, mas ainda nao realiza o cadastro
		if (!$approved) {
			$resp = new xajaxResponse();
			$resp->call('changeScreen', 1);
			$resp->call('cleanForm');
			return $resp;
		}

		return $resp;
	}

    $xajax->processRequest();
	$xajax->printJavascript('xajax_services/xajax/');
