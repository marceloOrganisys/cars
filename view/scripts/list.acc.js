$(document).ready(function () {
	routie({
		'': function () {
			routie('list');
		},
		'list': function () {
			getComponents();
			$('#accForm').fadeIn();
		}
	});
	$('title').html('Accessórios');
	$('#accFormName').submit(function (e) {
		e.preventDefault();
		searchEdit();
	});

	function searchEdit() {
		name = $('#accName').val();
		if (name != '' && name.length > 3) {
			if ($('#accName').attr('alter') == 'true') {
				editAcc(name, $('#accName').attr('accid'));
			} else {
				addAcc(name);
			}
		} else {
			alert('O nome deve possuir mais de 3 caracteres');
		}
	}

	$('#addButton').click(function () {
		searchEdit();
	});
})

function getComponents() {
	$.ajax({
		method: 'POST',
		url: '../services/accessorie.services.php',
		data: { operation: 'getAcessories' },
		success: function (data) {
			console.log(data)
			data = data != '' ? JSON.parse(data) : '';
			mountTable(data);
		},
		error: function (error) {
			console.log(error);
		}
	});
}

function mountTable(data) {
	$('#tableAcc').empty();
	var positions = ['id', 'name'];
	if (data.length == 0) {
		linha = document.createElement('tr');
		cell = document.createElement('td');
		cell.setAttribute('colspan', '3')
		cellText = document.createTextNode('Nenhum registro encontrado!');
		cell.setAttribute('style', 'text-align:center; padding:25px;')
		cell.appendChild(cellText);
		linha.appendChild(cell);
		table = document.getElementById('tableAcc');
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
			table = document.getElementById('tableAcc');
			table.appendChild(linha);
		});
	}
}

function checkDelete(id) {
	var promise = $.Deferred();
	$.ajax({
		method: 'POST',
		url: '../services/accessorie.services.php',
		data: { operation: 'checkDelete', acc: id },
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
					removeAcc(id).done(function () {
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

function removeAcc(id) {
	var promise = $.Deferred();
	$.ajax({
		method: 'POST',
		url: '../services/accessorie.services.php',
		data: { operation: 'removeAcc', acc: id },
		success: function () {
			promise.resolve();
		},
		error: function (error) {
			console.log(error);
		}
	});
	return promise;
}

function addAcc(name) {
	$.ajax({
		method: 'POST',
		url: '../services/accessorie.services.php',
		data: { operation: 'addAcc', name: name },
		success: function (response) {
			routie('list');
			if (response == 1) {
				getComponents();
				$('#accName').attr('alter', 'false');
				$('#accName').attr('accId', '');
				$('#accName').val('');
				$('#addButton').text('Cadastrar');
				$('label[for=inputPassword2]').text('Novo Acessório');
			}
		},
		error: function (error) {
			console.log(error);
		}
	});
}

function edit(id) {
	routie('edit/' + id);
	if ($('#accName').attr('alter') == 'true') {
		alert('Uma edição já está em andamento');
	} else {
		name = $('tr[data-id = ' + id + ']:first').text();
		$('#accName').attr('alter', 'true');
		$('#accName').attr('accId', id);
		$('#accName').val(name);
		$('#addButton').text('Salvar');
		$('tr[data-id=' + id + ']').empty();
		$('tr[data-id=' + id + ']').append("<td colspan='3' style='text-align:center'>Editando</td>");
		$('label[for=inputPassword2]').text('Alterar Acessório');
	}
}

function editAcc(name, id) {
	$.ajax({
		method: 'POST',
		url: '../services/accessorie.services.php',
		data: { operation: 'updateAcc', name: name, id: id },
		success: function (response) {
			if (response == 1) {
				routie('list');
				getComponents();
				$('#accName').attr('alter', 'false');
				$('#accName').attr('accId', '');
				$('#accName').val('');
				$('#addButton').text('Cadastrar');
				$('label[for=inputPassword2]').text('Novo Acessório');
			}
		},
		error: function (error) {
			console.log(error);
		}
	});
}