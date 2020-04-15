$(document).ready(function () {
	routie({
		'': function() {
			routie('list');
		},
		'list': function() {
			getComponents();
			$('#marcaForm').fadeIn();
		}
	});

	$('#marcaFormName').submit(function (e) {
		e.preventDefault();
		searchEdit();
	});
});

function getComponents() {
	$.ajax({
		method: 'POST',
		url: '../services/marca.services.php',
		data: { operation: 'getMarcas' },
		success: function (data) {
			console.log(data);
			data = data != '' ? JSON.parse(data) : '';
			mountTable(data[0]);
		},
		error: function (error) {
			console.log(error);
		}
	});
}

function mountTable(data) {
	$('#tableMarca').empty();
	var positions = ['id', 'name'];
	if (data.length == 0) {
		linha = document.createElement('tr');
		cell = document.createElement('td');
		cell.setAttribute('colspan', '3')
		cellText = document.createTextNode('Nenhum registro encontrado!');
		cell.setAttribute('style', 'text-align:center; padding:25px;')
		cell.appendChild(cellText);
		linha.appendChild(cell);
		table = document.getElementById('tableMarca');
		table.appendChild(linha);
		data = null;
	} else {
		$(data).each(function (key, value) {
			linha = document.createElement('tr');
			linha.setAttribute('data-id', value['id']);
			cell = document.createElement('td');
			cellText = document.createTextNode(value['name']);
			cell.appendChild(cellText);
			linha.appendChild(cell);
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
			table = document.getElementById('tableMarca');
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

function checkDelete(id) {
	var promise = $.Deferred();
	$.ajax({
		method: 'POST',
		url: '../services/marca.services.php',
		data: { operation: 'checkDelete', marca: id },
		success: function (response) {
			promise.resolve(JSON.parse(response).status);
		},
		error: function (error) {
			promise.reject(error);
		}
	});
	return promise;
}

function remove(id) {
	data = null;
	checkDelete(id)
	.done(function (response) {
		if (response) {
			if (confirm('Deseja excluir esse acessório?')) {
				removeMarca(id).done(function () {
					getComponents();
				});
			}
		} else {
			alert('Acessório não pode ser removido');
		}
	})
	.fail(function (response) {
		alert(response);
	});
}

function removeMarca(id) {
	var promise = $.Deferred();
	$.ajax({
		method: 'POST',
		url: '../services/marca.services.php',
		data: { operation: 'removeMarca', marca: id },
		success: function () {
			promise.resolve();
		},
		error: function (error) {
			console.log(error);
		}
	});
	return promise;
}

function addMarca(name) {
	$.ajax({
		method: 'POST',
		url: '../services/marca.services.php',
		data: { operation: 'addMarca', name: name },
		success: function (response) {
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
		error: function (error) {
			console.log(error);
		}
	});
}

function edit(id) {
	routie('edit');
	if ($('#marcaName').attr('alter') == 'true') {
		alert('Uma edição já está em andamento');
	} else {
		name = $('tr[data-id = ' + id + ']:first').text();
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
		data: { operation: 'updateMarca', name: name, id: id },
		success: function (response) {
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
		error: function (error) {
			console.log(error);
		}
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