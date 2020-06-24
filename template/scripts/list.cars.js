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
		if ($('#marca').val() == '') {
			marca = '';
		}
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
				} else {
					marca = marca == '' ? '' : 'error';
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


			let accessories = [];
			getComponents(1).done(response => {
				let data = JSON.parse(response) || '';

				for (x = 0; x < data[1]; x++) {
					accessories.push({ id: data[0][x].id, checked: $('#cb' + data[0][x].id).prop('checked') ? 1 : 0 });
				}

				xajax_validate(dados, accessories);
			});
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

function pesquisaCar(search, page) {
	page = page || 0;
	$.ajax({
		type: 'GET',
		url: '../services/car.services.php',
		data: { operation: 'searchCar', search, page },
		success: response => {
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

function changeScreen(op) {
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

function cleanForm() {
	$('#title').html('Adicionar registro');
	$('#pageTitle').html('Adicionar automóvel');
	$('#submitButton').html('Cadastrar');
	$('#subPlaca').hide();
	$('#carId, #descricao, #placa, #codRenavam, #anoModelo, #anoFabricacao, #cor, #km, #preco, #precoFipe').val('');
	$('#marca').val('');
}

function mountButtons(page, number, search) {
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

function makeTable(page) {
	const promise = $.Deferred();
	page = page || 0;
	$.ajax({
		type: 'GET',
		url: '../services/car.services.php',
		data: { operation: 'getCars', page: page },
		success: response => {
			let carsData = JSON.parse(response);
			mountTable(carsData.dados).done(() => {
				mountButtons(page, carsData.cars);
				promise.resolve();
			});
		},
		error: e => {
			alert('Ops, algo deu errado');
			promise.reject(e);
		}
	});
	return promise;
}

function mountTable(data) {
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

function mountCheckboxes(data) {
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

function getComponents(op) {
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

function getMarcas(op) {
	if (typeof (op) == 'undefined') {
		op = 0;
	}
	const promise = $.Deferred();
	$.ajax({
		type: 'POST',
		url: '../services/marca.services.php',
		data: { operation: 'getMarcas' },
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