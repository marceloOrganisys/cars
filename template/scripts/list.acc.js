$(document).ready(() => {
	routie({
		'': () => {
			routie('list');
		},
		'list': () => {
			getComponents();
			$('#accForm').fadeIn();
		}
	});

	$('title').html('Accessórios');
	$('#accFormName').submit(e => {
		e.preventDefault();
		searchEdit();
	});
})

function getComponents() {
	$.ajax({
		method: 'POST',
		url: '../services/accessorie.services.php',
		data: { operation: 'getAcessories' },
		success: data => {
			data = data != '' ? JSON.parse(data) : '';
			mountTable(data[0]);
		},
		error: e => console.log(e)
	});
}

function mountTable(data) {
	$('#tableAcc').empty();
	const positions = ['id', 'name'];
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
		$(data).each((key, value) => {
			linha = document.createElement('tr');
			linha.setAttribute('data-id', value['id']);
			cell = document.createElement('td');
			cell.innerHTML = value['name'];
			linha.appendChild(cell);
			buttons = ['edit', 'remove', ['btn-outline-info', 'btn-outline-danger']];
			for (let i = 0; i < 2; i++) {
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

function checkDelete(acc) {
	var promise = $.Deferred();
	$.ajax({
		method: 'POST',
		url: '../services/accessorie.services.php',
		data: { operation: 'checkDelete', acc },
		success: response => {
			promise.resolve(JSON.parse(response).status);
		},
		error: e => {
			promise.reject(e);
		}
	});
	return promise;
}

function remove(id) {
	data = null;
	checkDelete(id)
		.done(response => {
			if (response) {
				if (confirm('Deseja excluir esse acessório?')) {
					removeAcc(id).done(() => {
						getComponents();
					});
				}
			} else {
				alert('Acessório não pode ser removido');
			}
		})
		.fail(e => {
			alert(e);
		});
}

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

function removeAcc(acc) {
	var promise = $.Deferred();
	$.ajax({
		method: 'POST',
		url: '../services/accessorie.services.php',
		data: { operation: 'removeAcc', acc },
		success: () => {
			promise.resolve();
		},
		error: e => {
			console.log(e);
		}
	});
	return promise;
}

function addAcc(name) {
	$.ajax({
		method: 'POST',
		url: '../services/accessorie.services.php',
		data: { operation: 'addAcc', name },
		success: response => {
			routie('list');
			if (response == 1) {
				getComponents();
				$('#accName').attr('alter', 'false');
				$('#accName').attr('accId', '');
				$('#accName').val('');
				$('#addButton').text('Cadastrar');
				$('label[for=inputText]').text('Novo Acessório');
			}
		},
		error: e => {
			console.log(e);
		}
	});
}

function editAcc(name, id) {
	$.ajax({
		method: 'POST',
		url: '../services/accessorie.services.php',
		data: { operation: 'updateAcc', name, id },
		success: response => {
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
		error: e => {
			console.log(e);
		}
	});
	cancelEdit();
}

function edit(id) {
	routie('edit');
	if ($('#accName').attr('alter') == 'true') {
		alert('Uma edição já está em andamento');
	} else {
		name = $('tr[data-id = ' + id + ']:first').text();
		$('#accName').attr('alter', 'true');
		$('#accName').attr('accId', id);
		$('#accName').val(name);
		$('#addButton').text('Salvar');
		$('#backButton').text('Cancelar');
		$('#backButton').attr('onclick', 'cancelEdit()');
		$('tr[data-id=' + id + ']').empty();
		$('tr[data-id=' + id + ']').append("<td colspan='3' style='text-align:center'>Editando</td>");
		$('label[for=inputPassword2]').text('Alterar Acessório');
	}
}

function cancelEdit() {
	getComponents();
	routie('list');
	$('#accName').val('');
	$('#accName').attr('alter', 'false');
	$('#accName').attr('accId', '');
	$('#addButton').text('Cadastrar');
	$('#backButton').text('Voltar');
	$('#backButton').attr('onclick', 'window.location.href="home.php"');
}