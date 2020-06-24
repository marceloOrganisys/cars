$(document).ready(() => {
	routie({
		'': () => {
			routie('list');
		},
		'edit/:id': id => {
			edit(id);
		},
		'list': () => {
			makeTable().done(() => {
				$('qwerty').html('');
				$('#formCadastro').hide();
				$('#listCars').fadeIn();
				$('#title').html('Home');
				$('searchInput').val('');
			})
		},
		'new': () => changeScreen(0)
	})

	$('#addCarIcon').mouseenter(() => {
		document.getElementById("addCarIcon").src = "../icons/add_hovered.png";
		document.getElementById("addCarIcon").style.cursor = "pointer";
	});
	
	$('#addCarIcon').mouseleave(() => document.getElementById("addCarIcon").src = "../icons/add.png");
	$('#addCarIcon').click(() => changeScreen(0));

	$('#submitButton').on('click', e => {
		e.preventDefault();
		carId = $('#carId').val();
		descricao = $('#descricao').val();
		placa = $('#placa').val();
		codRenavam = $('#codRenavam').val();
		anoModelo = $('#anoModelo').val();
		anoFabricacao = $('#anoFabricacao').val();
		cor = $('#cor').val();
		km = $('#km').val();
		preco = formatAdd($('#preco').val());
		precoFipe = formatAdd($('#precoFipe').val());

		getMarcas().done(marcas => {
			$(marcas[0]).each((key, value) => {
				if ($('#marca').val() == value.name) {
					marca = value.id;
				}
			})

			dados = {
				carId,
				descricao,
				placa,
				codRenavam,
				anoModelo,
				anoFabricacao,
				cor,
				km,
				marca,
				preco,
				precoFipe
			};

			dados = {
				nome: 'marcelo',
				idade: 17
			}

			console.log(dados);
			console.log(xajax_validate(dados));
			// if (xajax_validate(xmlDados)) {
			// 	cad(dados);
			// }
		});
	});

	$('#searchButton').click(() => {
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
		data: { operation: 'searchCar', search, page },
		success:  response => {
			let carsData = JSON.parse(response);
			mountTable(carsData.dados);
			mountButtons(page, carsData.cars, search);
		},
		error: e => {
			alert('Ops, algo deu errado');
			promise.reject(e);
		}
	});
}

function changeScreen (op) {
	if (op == 0) {
		routie('new');
		cleanForm();
		getMarcas(1);
		getComponents();
		$('#listCars').hide();
		$('#formCadastro').fadeIn();
	} else {
		$('#table').empty();
		routie('list');
	}
}

function cleanForm () {
	$('#title').html('Adicionar registro');
	$('#pageTitle').html('Adicionar automóvel');
	$('#submitButton').html('Cadastrar');
	$('#subPlaca').hide();
	$('#carId, #descricao, #placa, #codRenavam, #anoModelo, #anoFabricacao, #cor, #km, #preco, #precoFipe').val('');
	$('#marca').val('');
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
	page = page || 0;
	const promise = $.Deferred();
	const info = {
		operation: 'getCars',
		page
	};
	const url = '../services/car.services.php';
	// a
	const options = {
		method: 'POST',
		headers: {
			"Accept": "application/json",
			"Content-type": "application/json"
		},
		body: JSON.stringify(info)
	};

	fetch(url, options)
		.then(response => response.json())
		.then(response => {
			mountTable(response.dados).done(() => {
				mountButtons(page, response.cars);
				promise.resolve();
			});
		})
		.catch(e => {
			alert(e);
			promise.reject(e);
		});
	return promise;
}

function mountTable (data) {
	$('#table').html('');
	const promise = $.Deferred();
	const table = document.getElementById('table');
	const positions = ['descricao', 'placa', 'marca'];
	if (data.length == 0) {
		let linha = document.createElement('tr');
		let cell = document.createElement('td');
		cell.setAttribute('colspan', '5');
		cell.innerHTML = 'Nenhum registro encontrado!';
		cell.setAttribute('style', 'text-align:center; padding:25px;');
		cell.appendChild(cellText);
		linha.appendChild(cell);
		table.appendChild(linha);
		data = null;
	}

	getMarcas().done(response => {
		let marcas = response[0];
		$(data).each((key, value) => {
			let linha = document.createElement('tr');
			linha.setAttribute('data-id', value['id']);
			for (i = 0; i < 3; i++) {
				let cell = document.createElement('td');
				if (positions[i] == 'marca') {
					$(marcas).each((secondKey, secondValue) => {
						if (secondValue.id == value[positions[i]]) {
							cellText = document.createTextNode(secondValue.name);		
						}
					});
				} else {
					cellText = document.createTextNode(value[positions[i]]);
				}
				cell.appendChild(cellText);
				linha.appendChild(cell);

				if (i == 2) {
					buttons = ['edit', 'remove', ['btn-outline-info', 'btn-outline-danger']];
					for (i = 0; i < 2; i++) {
						cell = document.createElement('td');
						cell.setAttribute('style', 'width:70px;');
						let button = document.createElement('button');
						let buttonImage = document.createElement('img');
						buttonImage.classList.add('imgSize');
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
	});
	return promise;
}

function mountCheckboxes (data) {
	$('#components').empty();
	data = JSON.parse(data) || '';
	const div = document.getElementById('components');
	for (i = 0; i < parseInt(data[1]); i++) {
		let unic = document.createElement('div');
		unic.setAttribute('class', 'component');
		let input = document.createElement('input');
		input.setAttribute('type', 'checkbox');
		input.id = 'cb' + data[0][i].id;
		input.setAttribute('class', 'accessorie form-check-input');
		input.class = 'accessorie';
		let label = document.createElement('label');
		let labelTxt = document.createTextNode(data[0][i]['name']);
		label.appendChild(labelTxt);
		unic.appendChild(input);
		unic.appendChild(label);
		div.appendChild(unic);
	}
}

function getComponents (op) {
	const promise = op == 1 ? $.Deferred() : null;
	$.ajax({
		method: 'POST',
		url: '../services/accessorie.services.php',
		data: { operation: 'getAcessories' },
		success: data => {
			if (op == 1) {
				promise.resolve(data)
			} else {
				mountCheckboxes(data);
			}
		},
		error: e => {
			alert('Ops, algo deu errado');
			promise.reject(e);
		}
	});
	return op == 1 ? promise : '';
}

function cad(carData) {
	let accessories = [];
	let size = 0;
	getComponents(1).done(response => {
		let data = JSON.parse(response) || '';

		for (x = 0; x < data[1]; x++) {
			accessories.push({ id: data[0][x].id, checked: $('#cb' + data[0][x].id).prop('checked') ? 1 : 0 });
		}

		data = { operation: 'cadastro', carData, accessories}
		$.ajax({
			type: 'POST',
			url: '../services/car.services.php',
			data: data,
			error: e => {
				alert('Ops, algo deu errado');
				promise.reject(e);
			}
		});
		changeScreen(1);
		cleanForm();
	});
}

function getMarcas(op) {
	if (typeof(op) == 'undefined') {
		op = 0;
	}
	const promise = $.Deferred();
	$.ajax({
		type: 'POST',
		url: '../services/marca.services.php',
		data: {operation: 'getMarcas'},
		success: response => {
			data = JSON.parse(response);
			if (op == 1) {
				$('#marca').empty();
				for (i = 0; i < data[1]; i++) {
					$('#marca').append("<option value='" + parseInt(data[0][i].id) + "'>" + data[0][i].name);
				}
				$('#marca').editableSelect({ effects: 'slide' });
				promise.resolve();
			} else {
				promise.resolve(data);
			}
		},
		error: e => {
			console.log(e);
			promise.reject(e)
		}
	});
	return promise;
}

function edit(id) {
	$('#listCars').hide();
	$('#formCadastro').fadeIn();
	$('#subPlaca').show();
	$('#title').html('Alterar Registro');
	$('#pageTitle').html('Alterar registro de automóvel');

	routie('edit/' + id);
	getComponents();
	getMarcas().done(response => {
		const marcas = response;
		getMarcas(1).done(() => {
			$.ajax({
				method: 'GET',
				dataType: 'json',
				url: '../services/car.services.php',
				data: { operation: 'getCar', id },
				success: data => {
					$('#carId').val(data.id);
					$('#descricao').val(data.descricao);
					$('#placa').val(data.placa);
					$('#codRenavam').val(data.codRenavam);
					$('#anoModelo').val(data.anoModelo);
					$('#anoFabricacao').val(data.anoFabricacao);
					$('#cor').val(data.cor);
					$('#km').val(data.km);
					$(marcas[0]).each((key, value) => {
						if (data.marca == value.id) {
							$('#marca').val(value.name);
						}
					});
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
				error: e => {
					console.log(e);
					// window.location.href = 'home.php'
				}
			});
		});
	});
}

function remove(id) {
	const data = { operation: 'remove', id }
	if (confirm('Deseja mesmo apagar este registro?')) {
		$.ajax({
			type: 'POST',
			url: '../services/car.services.php',
			data,
			success: () => {
				pesquisaCar($('#searchInput').val(), 0);
			},
			error: e => alert('Ops, algo deu errado')
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
	let finalStr = '';
	for (i = 0; i < input.length; i++) {
		let char = input.length - 3 == i ? ',' : input[i];
		finalStr += (finalStr, char);
	}
	return finalStr;
}

// function validate(dados) {
// 	let error = [];
// 	if (dados.descricao == '') {
// 		$('label[for=descricaoError]').html('<qwerty> O campo não pode ser nulo</qwerty>');
// 		error[1] = true;
// 	} else {
// 		if (dados.descricao.length > 60) {
// 			$('label[for=descricaoError]').html('<qwerty> A descrição deve ter no máximo 60 caracteres</qwerty>');
// 			error[1] = true;
// 		} else {
// 			$('label[for=descricaoError]').html('');
// 			error[1] = false;
// 		}
// 	}

// 	if (dados.placa == '') {
// 		$('label[for=placaError]').html('<qwerty> O campo não pode ser nulo</qwerty>');
// 		error[2] = true;
// 	} else {
// 		var regex = /^[a-z]{3}\-[0-9]{4}$/i;
// 		if (!regex.test(dados.placa)) {
// 			$('label[for=placaError]').html('<qwerty> Placa inválida</qwerty>');
// 			error[2] = true;
// 		} else {
// 			$('label[for=placaError]').html('');
// 			error[2] = false;
// 		}
// 	}

// 	if (dados.codRenavam == '') {
// 		$('label[for=codRenavamError]').html('<qwerty> O campo não pode ser nulo</qwerty>');
// 		error[3] = true;
// 	} else {
// 		var regex = /^[0-9]{11}$/;
// 		if (!regex.test(dados.codRenavam)) {
// 			$('label[for=codRenavamError]').html('<qwerty> Código inválido</qwerty>');
// 			error[3] = true;
// 		} else {
// 			$('label[for=codRenavamError]').html('');
// 			error[3] = false;
// 		}
// 	}

// 	if (dados.anoModelo == '') {
// 		$('label[for=anoModeloError]').html('<qwerty> O campo não pode ser nulo</qwerty>');
// 		error[4] = true;
// 	} else {
// 		if (dados.anoModelo.length != 4) {
// 			$('label[for=anoModeloError]').html('<qwerty> Ano inválido</qwerty>');
// 			error[4] = true;
// 		} else {
// 			$('label[for=anoModeloError]').html('');
// 			error[4] = false;
// 		}
// 	}

// 	if (dados.anoFabricacao == '') {
// 		$('label[for=anoFabricacaoError]').html('<qwerty> O campo não pode ser nulo</qwerty>');
// 		error[5] = true;
// 	} else {
// 		if (dados.anoModelo < dados.anoFabricacao) {
// 			$('label[for=anoFabricacaoError]').html('<qwerty> Ano inválido</qwerty>');
// 			error[5] = true;
// 		} else {
// 			$('label[for=anoFabricacaoError]').html('');
// 			error[5] = false;
// 		}
// 	}

// 	if (dados.cor == '') {
// 		$('label[for=corError]').html('<qwerty> O campo não pode ser nulo</qwerty>');
// 		error[6] = true;
// 	} else {
// 		if (dados.cor.length > 20) {
// 			$('label[for=corError]').html('<qwerty> O campo deve possuir menos de 20 caracteres</qwerty>');
// 			error[6] = true;
// 		} else {
// 			$('label[for=corError]').html('');
// 			error[6] = false;
// 		}
// 	}

// 	if (dados.km == '') {
// 		$('label[for=kmError]').html('<qwerty> O campo não pode ser nulo</qwerty>');
// 		error[7] = true;
// 	} else {
// 		$('label[for=kmError]').html('');
// 		error[7] = false;
// 	}

// 	if (dados.marca == '' || dados.marca == null) {
// 		$('label[for=marcaError]').html('<qwerty> O campo não pode ser nulo </qwerty>');
// 		error[8] = true;
// 	} else {
// 		getMarcas().done(function (response) {
// 			var marcaError = true;
// 			$(response[0]).each(function (key, value) {
// 				if (dados.marca == value.name) {
// 					marcaError = false;
// 				}
// 			});
// 			if (marcaError) {
// 				error[8] = true;
// 				$('label[for=marcaError]').html('<qwerty> Marca inválida </qwerty>');
// 			} else {
// 				error[8] = false;
// 				$('label[for=marcaError]').html('');
// 			}
// 		});
// 	}

// 	if (dados.preco == '') {
// 		$('label[for=precoError]').html('<qwerty> O campo não pode ser nulo</qwerty>');
// 		error[9] = true;
// 	} else {
// 		$('label[for=precoError]').html('');
// 		error[9] = false;
// 	}

// 	if (dados.precoFipe == '') {
// 		$('label[for=precoFipeError]').html('<qwerty> O campo não pode ser nulo</qwerty>');
// 		error[10] = true;
// 	} else {
// 		$('label[for=precoFipeError]').html('');
// 		error[10] = false;
// 	}

// 	send = true;
// 	$.each(error, function (key, value) {
// 		if (value === true) send = false
// 	});

// 	if (send) return true;
// }