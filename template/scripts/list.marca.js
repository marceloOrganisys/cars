$(document).ready(() => {
	routie({
		'': () => routie('list'),
		'list': () => {
			getComponents();
			$('#marcaForm').fadeIn();
		}
	});

	$('#newMarcaForm').submit(e => {
		e.preventDefault();
		searchEdit();
	});
});

function getComponents() {
	$.ajax({
		method: 'POST',
		url: '../services/marca.services.php',
		data: { operation: 'getMarcas' },
		success: data => {
			data = data != '' ? JSON.parse(data) : '';
			mountTable(data[0]);
		},
		error: e => alert('Ops, algo deu errado')
	});
}

function mountTable(data) {
	$('#tableMarca').empty();
	const positions = ['id', 'name'];
	if (data.length == 0) {
		let linha = document.createElement('tr');
		let cell = document.createElement('td');
		cell.setAttribute('colspan', '3')
		cell.innerHTML = 'Nenhum registro enconstrado!'
		cell.setAttribute('style', 'text-align:center; padding:25px;')
		linha.appendChild(cell);
		let table = document.getElementById('tableMarca');
		table.appendChild(linha);
		data = null;
	} else {
		$(data).each((key, value) => {
			let linha = document.createElement('tr');
			linha.setAttribute('data-id', value['id']);
			let cell = document.createElement('td');
			cellText = document.createTextNode(value['name']);
			cell.appendChild(cellText);
			linha.appendChild(cell);
			const buttons = ['edit', 'remove', ['btn-outline-info', 'btn-outline-danger']];
			for (i = 0; i < 2; i++) {
				cell = document.createElement('td');
				cell.setAttribute('style', 'width:70px;');
				let button = document.createElement('button');
				let buttonImage = document.createElement('img');
				buttonImage.setAttribute('src', '../icons/' + buttons[i] + '.png');
				button.appendChild(buttonImage);
				button.setAttribute('onclick', buttons[i] + '(' + value['id'] + ')');
				button.setAttribute('class', 'btn1 btn ' + buttons[2][i]);
				cell.appendChild(button);
				linha.appendChild(cell);
			}
			let table = document.getElementById('tableMarca');
			table.appendChild(linha);
		});
	}
}

function searchEdit() {
	name = $('#marcaName').val();
	if (name != '' && name.length > 3) {
		if ($('#marcaName').attr('alter') == 'true') {
			editMarca(name, $('#marcaName').attr('marcaId'));
		} else {
			addMarca(name);
		}
	} else {
		alert('O nome deve possuir mais de 3 caracteres');
	}
}

function checkDelete(marca) {
	const promise = $.Deferred();
	$.ajax({
		method: 'POST',
		url: '../services/marca.services.php',
		data: { operation: 'checkDelete', marca },
		success: response => promise.resolve(JSON.parse(response).status),
		error: e => promise.reject(e)
	});
	return promise;
}

function remove(id) {
	checkDelete(id)
		.done(response => {
			if (response) {
				if (confirm('Deseja excluir essa marca?')) {
					removeMarca(id).done(() => getComponents());
				}
			} else {
				alert('Marca não pode ser removido');
			}
		})
		.fail(e => alert('Ops, algo deu errado'));
}

function removeMarca(marca) {
	const promise = $.Deferred();
	$.ajax({
		method: 'POST',
		url: '../services/marca.services.php',
		data: { operation: 'removeMarca', marca },
		success: () => promise.resolve(),
		error: e => promise.reject(e)
	});
	return promise;
}

function addMarca(name) {
	$.ajax({
		method: 'POST',
		url: '../services/marca.services.php',
		data: { operation: 'addMarca', name },
		success: response => {
			routie('list');
			if (response == 1) {
				getComponents();
				$('#marcaName').attr('alter', 'false');
				$('#marcaName').attr('marcaId', '');
				$('#marcaName').val('');
				$('#addButton').text('Cadastrar');
				$('label[for=inputText]').text('Novo Acessório');
			}
		},
		error: e => alert('Ops, algo deu errado!')
	});
}

function edit(id) {
	routie('edit');
	if ($('#marcaName').attr('alter') == 'true') {
		alert('Uma edição já está em andamento');
	} else {
		let name = $('tr[data-id = ' + id + ']:first').text();
		$('#marcaName').attr('alter', 'true');
		$('#marcaName').attr('marcaId', id);
		$('#marcaName').val(name);
		$('#addButton').text('Salvar');
		$('#backButton').text('Cancelar');
		$('#backButton').attr('onclick', 'cancelEdit()');
		$('tr[data-id=' + id + ']').empty();
		$('tr[data-id=' + id + ']').append("<td colspan='3' style='text-align:center'>Editando</td>");
		$('label[for=inputPassword2]').text('Alterar Marca');
	}
}

function editMarca(name, id) {
	$.ajax({
		method: 'POST',
		url: '../services/marca.services.php',
		data: { operation: 'updateMarca', name, id },
		success: response => {
			if (response == 1) {
				routie('list');
				getComponents();
				$('#marcaName').attr('alter', 'false');
				$('#marcaName').attr('marcaId', '');
				$('#marcaName').val('');
				$('#addButton').text('Cadastrar');
				$('label[for=inputPassword2]').text('Nova Marca');
			}
		},
		error: e => alert('Ops, algo deu errado!')
	});
	cancelEdit();
}

function cancelEdit() {
	getComponents();
	routie('list');
	$('#marcaName').val('');
	$('#marcaName').attr('alter', 'false');
	$('#marcaName').attr('marcaId', '');
	$('#addButton').text('Cadastrar');
	$('#backButton').text('Voltar');
	$('#backButton').attr('onclick', 'window.location.href="home.php"');
}