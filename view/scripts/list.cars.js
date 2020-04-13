$(document).ready(function () {
	routie({
		'': function () {
			routie('list');
		},
		'edit/:id': function (id) {
			edit(id);
		},
		'list': function () {
			makeTable().done(function () {
				$('#listCars').fadeIn();
				$('#title').html('Home');
			})
		},
		'new': function () {
			changeScreen(0);
		}
	})

	$('#addImage').mouseenter(function () {
		document.getElementById("addImage").src = "../icons/add_hovered.png";
		document.getElementById("addImage").style.cursor = "pointer";
	});
	$('#addImage').mouseleave(function () {
		document.getElementById("addImage").src = "../icons/add.png";
	});
	$('#addImage').click(function () {
		changeScreen(0);
	});

	$('#submitButton').on('click', function (e) {
		e.preventDefault();
		carId = $('#carId').val();
		descricao = $('#descricao').val();
		placa = $('#placa').val();
		codRenavam = $('#codRenavam').val();
		anoModelo = $('#anoModelo').val();
		anoFabricacao = $('#anoFabricacao').val();
		cor = $('#cor').val();
		km = $('#km').val();
		marca = $('#marca').val();
		preco = formatAdd($('#preco').val());
		precoFipe = formatAdd($('#precoFipe').val());

		dados = {
			carId: carId,
			descricao: descricao,
			placa: placa,
			codRenavam: codRenavam,
			anoModelo: anoModelo,
			anoFabricacao: anoFabricacao,
			cor: cor,
			km: km,
			marca: marca,
			preco: preco,
			precoFipe: precoFipe
		};

		if (validate(dados)) {
			cad(dados);
		}
	});

	$('#searchButton').click(function () {
		search = $('#searchInput').val();
		if (search == '') {
			makeTable();
		} else {
			pesquisaCar(search, 0);
		}
	});
});

function pesquisaCar (search, page) {
	page = page || 0;
	$.ajax({
		type: 'GET',
		url: '../services/car.services.php',
		data: { operation: 'searchCar', search: search, page: page },
		success: function (response) {
			console.log(response);
			var carsData = JSON.parse(response);
			mountTable(carsData.dados);
			mountButtons(page, carsData.cars, search);
		},
		error: function (error) {
			alert('Ocorreu um erro');
			console.log(error);
		}
	});
}

function changeScreen (op) {
	if (op == 0) {
		routie('new');
		cleanForm();
		getComponents();
		$('#listCars').hide();
		$('#formCadastro').fadeIn();
	} else {
		routie('list');
		makeTable().done(function () {
			$('qwerty').html('');
			$('#formCadastro').hide();
			$('#listCars').fadeIn();
			$('#title').html('Home');
			$('searchInput').val('');
		});
	}
}

function cleanForm () {
	$('#title').html('Adicionar registro');
	$('#pageTitle').html('Adicionar automóvel');
	$('#submitButton').html('Cadastrar');
	$('#subPlaca').hide();
	$('#carId, #descricao, #placa, #codRenavam, #anoModelo, #anoFabricacao, #cor, #km, #marca, #preco, #precoFipe').val('');
}

function mountButtons (page, number, search) {
	number = number || null;
	search = search || null;
	$('#paginationButtons').empty();
	for (i = 0; i < number[0].cars / 10; i++) {
		$('#paginationButtons').append($('<li>', { class: 'page-item' }).append(
			$('<li>', { class: 'page-item' }).append(
				$('<button>', { class: 'page-link navItem', id: 'btn' + i, onclick: search == null ? "makeTable(" + i + ")" : "pesquisaCar('" + search + "', " + i + ")" }).append(i + 1)
			)
		))
	}
	$('#btn' + (page)).css({ 'background-color': 'grey', 'color': 'white' });
}

function makeTable (page) {
	var promise = $.Deferred();
	page = page || 0;
	$.ajax({
		type: 'GET',
		url: '../services/car.services.php',
		data: {operation: 'getCars', page: page},
		success: function (response) {
			// console.log(response);
			var carsData = JSON.parse(response);
			mountTable(carsData.dados).done(function () {
				mountButtons(page, carsData.cars);
				promise.resolve();
			});
		},
		error: function (error) {
			alert('Ocorreu um erro');
			console.log(error);
		}
	});
	return promise;
}

function mountTable (data) {
	var promise = $.Deferred();
	$('#table').empty();
	table = document.getElementById('table');
	var positions = ['descricao', 'placa', 'marca'];
	if (data.length == 0) {
		linha = document.createElement('tr');
		cell = document.createElement('td');
		cell.setAttribute('colspan', '5')
		cellText = document.createTextNode('Nenhum registro encontrado!');
		cell.setAttribute('style', 'text-align:center; padding:25px;')
		cell.appendChild(cellText);
		linha.appendChild(cell);
		table.appendChild(linha);
		data = null;
	}

	$(data).each(function (key, value) {
		linha = document.createElement('tr');
		linha.setAttribute('data-id', value['id']);
		for (i = 0; i < 3; i++) {
			cell = document.createElement('td');
			cellText = document.createTextNode(value[positions[i]]);
			cell.appendChild(cellText);
			linha.appendChild(cell);

			if (i == 2) {
				buttons = ['edit', 'remove', ['btn-outline-info', 'btn-outline-danger']];
				for (i = 0; i < 2; i++) {
					cell = document.createElement('td');
					cell.setAttribute('style', 'width:70px;');
					button = document.createElement('button');
					buttonImage = document.createElement('img');
					buttonImage.setAttribute('src', '../icons/' + buttons[i] + '.png');
					button.appendChild(buttonImage);
					button.setAttribute('onclick', buttons[i] + '(' + value['id'] + ')');
					button.setAttribute('class', 'btn1 btn ' + buttons[2][i]);
					cell.appendChild(button);
					linha.appendChild(cell);
				}
			}
		}
		table.appendChild(linha);
	});
	promise.resolve();
	return promise;
}

function mountCheckboxes (data) {
	$('#components').empty();
	data = JSON.parse(data) || '';
	div = document.getElementById('components');
	for (i = 0; i < parseInt(data[1]); i++) {
		unic = document.createElement('div');
		unic.setAttribute('class', 'component');
		input = document.createElement('input');
		input.setAttribute('type', 'checkbox');
		input.id = 'cb' + data[0][i].id;
		input.setAttribute('class', 'accessorie form-check-input');
		input.class = 'accessorie';
		label = document.createElement('label');
		labelTxt = document.createTextNode(data[0][i]['name']);
		label.appendChild(labelTxt);
		unic.appendChild(input);
		unic.appendChild(label);
		div.appendChild(unic);
	}
}

function getComponents (op) {
	var promise = op == 1 ? $.Deferred() : null;
	$.ajax({
		method: 'POST',
		url: '../services/accessorie.services.php',
		data: { operation: 'getAcessories' },
		success: function (data) {
			if (op == 1) {
				promise.resolve(data)
			} else {
				console.log(data);
				mountCheckboxes(data);
			}
		},
		error: function (error) {
			console.log(error);
		}
	});
	return op == 1 ? promise : '';
}

function cad(dados) {
	accessories = [];
	size = 0;
	getComponents(1).done(function (response) {
		data = response;
		data = JSON.parse(data) || '';

		for (x = 0; x < data[1]; x++) {
			accessories.push({ id: data[0][x].id, checked: $('#cb' + data[0][x].id).prop('checked') ? 1 : 0 });
		}

		data = {operation: 'cadastro', carData: dados, accessories: accessories}
		$.ajax({
			type: 'POST',
			url: '../services/car.services.php',
			data: data,
			error: function (error) {
				alert('Ocorreu um erro');
				console.log(error);
			}
		});
		changeScreen(1);
		cleanForm();
	});
}

function edit(id) {
	routie('edit/' + id);
	getComponents();
	$('#listCars').hide();
	$('#formCadastro').fadeIn();
	$('#subPlaca').show();
	$('#title').html('Alterar Registro');
	$('#pageTitle').html('Alterar registro de automóvel');

	$.ajax({
		method: 'GET',
		dataType: 'json',
		url: '../services/car.services.php',
		data: { operation: 'getCar', id: id },
		success: function (data) {
			$('#carId').val(data.id);
			$('#descricao').val(data.descricao);
			$('#placa').val(data.placa);
			$('#codRenavam').val(data.codRenavam);
			$('#anoModelo').val(data.anoModelo);
			$('#anoFabricacao').val(data.anoFabricacao);
			$('#cor').val(data.cor);
			$('#km').val(data.km);
			$('option[value=' + data.marca + ']').prop('selected', true);
			$('#preco').val(formatGet(data.preco));
			$('#precoFipe').val(formatGet(data.precoFipe));
			$('#submitButton').html('Salvar');
			$('#subPlaca').html('Placa: ' + data.placa);
			$('#subPlaca').attr('style', 'display: inline; color: red;');

			if (data.accessories[0] != null && data.accessories.length > 0) {
				for (i = 0; i < data.accessories.length; i++) {
					$('#cb' + data.accessories[i].accessorieId).prop('checked', true);
				}
			}
		},
		error: function (error) {
			window.location.href = 'home.php';
		}
	});
}

function remove(id) {
	data = { operation: 'remove', id: id }
	if (confirm('Deseja mesmo apagar este registro?')) {
		$.ajax({
			type: 'POST',
			url: '../services/car.services.php',
			data: data,
			success: function (response) {
				pesquisaCar($('#searchInput').val(), 0);
			},
			error: function (error) {
				alert('Ocorreu um erro');
				console.log(error);
			}
		});
	}
}

function formatAdd(input) {
	input = input.toString();
	for (i = 0; i < input.length / 3; i++) {
		input = input.replace('.', '');
	}
	input = input.replace(',', '.');
	return input;
}

function formatGet(input) {
	input = input.toString();
	for (i = 0; i < input.length / 3; i++) {
		input = input.replace(',', '.');
	}
	finalStr = '';
	for (i = 0; i < input.length; i++) {
		char = input.length - 3 == i ? ',' : input[i];
		finalStr += (finalStr, char);
	}
	return finalStr;
}

function validate(dados) {
	error = [];
	if (dados.descricao == '') {
		$('label[for=descricaoError]').html('<qwerty> O campo não pode ser nulo</qwerty>');
		error[1] = true;
	} else {
		if (dados.descricao.length > 60) {
			$('label[for=descricaoError]').html('<qwerty> A descrição deve ter no máximo 60 caracteres</qwerty>');
			error[1] = true;
		} else {
			$('label[for=descricaoError]').html('');
			error[1] = false;
		}
	}

	if (dados.placa == '') {
		$('label[for=placaError]').html('<qwerty> O campo não pode ser nulo</qwerty>');
		error[2] = true;
	} else {
		var regex = /^[a-z]{3}\-[0-9]{4}$/i;
		if (!regex.test(dados.placa)) {
			$('label[for=placaError]').html('<qwerty> Placa inválida</qwerty>');
			error[2] = true;
		} else {
			$('label[for=placaError]').html('');
			error[2] = false;
		}
	}

	if (dados.codRenavam == '') {
		$('label[for=codRenavamError]').html('<qwerty> O campo não pode ser nulo</qwerty>');
		error[3] = true;
	} else {
		var regex = /^[0-9]{11}$/;
		if (!regex.test(dados.codRenavam)) {
			$('label[for=codRenavamError]').html('<qwerty> Código inválido</qwerty>');
			error[3] = true;
		} else {
			$('label[for=codRenavamError]').html('');
			error[3] = false;
		}
	}

	if (dados.anoModelo == '') {
		$('label[for=anoModeloError]').html('<qwerty> O campo não pode ser nulo</qwerty>');
		error[4] = true;
	} else {
		if (dados.anoModelo.length != 4) {
			$('label[for=anoModeloError]').html('<qwerty> Ano inválido</qwerty>');
			error[4] = true;
		} else {
			$('label[for=anoModeloError]').html('');
			error[4] = false;
		}
	}

	if (dados.anoFabricacao == '') {
		$('label[for=anoFabricacaoError]').html('<qwerty> O campo não pode ser nulo</qwerty>');
		error[5] = true;
	} else {
		if (dados.anoModelo < dados.anoFabricacao) {
			$('label[for=anoFabricacaoError]').html('<qwerty> Ano inválido</qwerty>');
			error[5] = true;
		} else {
			$('label[for=anoFabricacaoError]').html('');
			error[5] = false;
		}
	}

	if (dados.cor == '') {
		$('label[for=corError]').html('<qwerty> O campo não pode ser nulo</qwerty>');
		error[6] = true;
	} else {
		if (dados.cor.length > 20) {
			$('label[for=corError]').html('<qwerty> O campo deve possuir menos de 20 caracteres</qwerty>');
			error[6] = true;
		} else {
			$('label[for=corError]').html('');
			error[6] = false;
		}
	}

	if (dados.km == '') {
		$('label[for=kmError]').html('<qwerty> O campo não pode ser nulo</qwerty>');
		error[7] = true;
	} else {
		$('label[for=kmError]').html('');
		error[7] = false;
	}

	if (dados.marca == '' || dados.marca == null) {
		$('label[for=marcaError]').html('<qwerty> O campo não pode ser nulo</qwerty>');
		error[8] = true;
	} else {
		if (dados.marca.length > 20) {
			$('label[for=marcaError]').html('<qwerty> O campo deve possuir menos de 20 caracteres</qwerty>');
			error[8] = true;
		} else {
			$('label[for=marcaError]').html('');
			error[8] = false;
		}
	}

	if (dados.preco == '') {
		$('label[for=precoError]').html('<qwerty> O campo não pode ser nulo</qwerty>');
		error[9] = true;
	} else {
		$('label[for=precoError]').html('');
		error[9] = false;
	}

	if (dados.precoFipe == '') {
		$('label[for=precoFipeError]').html('<qwerty> O campo não pode ser nulo</qwerty>');
		error[10] = true;
	} else {
		$('label[for=precoFipeError]').html('');
		error[10] = false;
	}

	send = true;
	$.each(error, function (key, value) {
		if (value === true) {
			send = false;
		}
	});

	if (send) {
		return true;
	}
}