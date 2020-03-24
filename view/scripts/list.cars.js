$(document).ready(function() {

	$("#listCars").fadeIn();

	makeTable();

	$("#title").html("Home");

	$("#submitButton").on('click', function(e) {
		e.preventDefault();
		carId = $("#carId").val();
		descricao = $("#descricao").val();
		placa = $("#placa").val();
		codRenavam = $("#codRenavam").val();
		anoModelo = $("#anoModelo").val();
		anoFabricacao = $("#anoFabricacao").val();
		cor = $("#cor").val();
		km = $("#km").val();
		marca = $("#marca").val();
		preco = $("#preco").val();
		precoFipe = $("#precoFipe").val();

		dados = {
			carId : carId, 
			descricao : descricao, 
			placa : placa, 
			codRenavam : codRenavam, 
			anoModelo : anoModelo, 
			anoFabricacao : anoFabricacao, 
			cor : cor, 
			km : km, 
			marca : marca, 
			preco : preco, 
			precoFipe : precoFipe
		};

		if (validate(dados)) {
			cad(dados);
		}


	});	
	$("#formCadastro").hide();

	$("#accNameBtn").click(function(){ 
		search = $("#accName").val();
		if(search == ""){
			makeTable();
		} else {
			pesquisaCar(search, 0);
		}
	});
});

function pesquisaCar(pesquisa, page = 0){
	$.ajax({
		type: "GET",
		url: "../services/car.services.php",
		data: {'operation' : 'searchCar', search : search, page: page},
		success: function(response) {
			var carsData = JSON.parse(response);
			mountTable(carsData);
			$.ajax({
				type: "GET",
				url: "../services/car.services.php",
				data: {'operation' : 'searchNumber', search : search},
				success: function(response) {
					var number = JSON.parse(response);
					if(page == 0){
						cars(0, number.numb, search);
					}
				},
				error: function(){
				}
			});
		},
		error: function(error) {
			alert("Ocorreu um erro");
			console.log(error);
		}
	});
}

function changeScreen(op) {
	if (op == 0) {
		cleanForm();
		getComponents();
		$("#listCars").hide();
		$("#formCadastro").fadeIn();
	} else if ( op == 1) {
		$("#formCadastro").hide();
		$("#listCars").fadeIn();
		makeTable();
		$("#title").html('Home');
	}
}

function cleanForm() {
	$("#title").html("Adicionar registro");
	$("#pageTitle").html("Incluir automóvel");
	$("#submitButton").html("Cadastrar");
	$("#subPlaca").hide();

	$("#carId, #descricao, #placa").val('');
	$("#codRenavam").val('');
	$("#anoModelo").val('');
	$("#anoFabricacao").val('');
	$("#cor").val('');
	$("#km").val('');
	$("#marca").val('');
	$("#preco").val('');
	$("#precoFipe").val('');
}

function cars(page, number, search) {
	number = number || null;
	search = search || null;
	if (number != null) {
		$("#paginationButtons").empty();
		for (i = 0; i < number/10; i++) {
			$("#paginationButtons").append(
				$('<li>', {class: 'page-item'}).append(
					$('<button>', {class: 'page-link navItem', id: 'btn'+i, onclick: "pesquisaCar('"+search+"',"+i+")"}).append(i+1)
					)
				)
		}
		$("#btn"+(page-1)).css({'background-color': 'grey', 'color': 'white'});
	} else {
		$.ajax({
			type: "GET",
			url: "../services/car.services.php",
			data: {'operation' : 'cars'},
			success: function(response) {
				data = JSON.parse(response);
				// console.log(data);
				numPages = data.cars;			
				$("#paginationButtons").empty();
				for (i = 0; i < numPages/10; i++) {
					$("#paginationButtons").append("<li class='page-item'><button class='page-link navItem'id='btn"+i+"' onclick='makeTable("+i+")'>"+(i+1)+"</button></li>");
				}
				$("#btn"+page).css({'background-color': 'grey', 'color': 'white'});
			},
			error: function(error){
				alert("Ocorreu um erro");
				console.log(error);
			}
		});
	}
}

function makeTable(page) {
	page = typeof(page) == 'undefined' || page == null ? 0 : page;
	$.ajax({
		type: "GET",
		url: "../services/car.services.php",
		data: {'operation' : 'listCars', 'page' : page},
		success: function(response) {
			// console.log(response);
			var carsData = JSON.parse(response);
			mountTable(carsData);
		},
		error: function(error) {
			alert("Ocorreu um erro");
			console.log(error);
		}
	});
	cars(page);
}

function mountTable(data) {
	$("#table").empty();
	table = document.getElementById("table");
	var positions = ['descricao', 'placa', 'marca'];
	if(data.length == 0 || data[0] == null){
		linha = document.createElement('tr');
		cell = document.createElement('td');
		cell.setAttribute('colspan', '5')
		cellText = document.createTextNode("Nenhum registro encontrado!");
		cell.setAttribute('style', 'text-align:center; padding:25px;')
		cell.appendChild(cellText);
		linha.appendChild(cell);
		table.appendChild(linha);
		data = null;
	}

	$(data).each(function(key, value){
		linha = document.createElement('tr');
		linha.setAttribute('data-id', value['id']);
		for(i = 0; i < 3; i++) {
			cell = document.createElement('td');
			cellText = document.createTextNode(value[positions[i]]);
			cell.appendChild(cellText);
			linha.appendChild(cell);
			// create buttons
			if(i == 2) {
				buttons = ['edit', 'remove',['btn-outline-info', 'btn-outline-danger']];
				for(i = 0; i < 2 ; i++){
					cell = document.createElement('td');
					cell.setAttribute('style', 'width:70px;');
					button = document.createElement('button');
					buttonImage = document.createElement('img');
					buttonImage.setAttribute('src', '../icons/'+buttons[i]+'.png');
					button.appendChild(buttonImage);
					button.setAttribute('onclick', buttons[i]+'('+value['id']+')');
					button.setAttribute('class', 'btn1 btn '+buttons[2][i]);
					cell.appendChild(button);
					linha.appendChild(cell);
				}
			}
		}
		table.appendChild(linha);
	});
}

function mountCheckboxes(data) {
	$("#components").empty();
	data = data != '' ? JSON.parse(data) : '';
	div = document.getElementById('components');
	for (i = 0 ;i < data.length ;i++) {
		unic = document.createElement('div');
		unic.setAttribute('class', "component");
		input = document.createElement('input');
		input.setAttribute('type', 'checkbox');
		input.id = "cb"+data[i].id;
		input.setAttribute('class', 'accessorie form-check-input');
		input.class = "accessorie";
		label = document.createElement('label');
		labelTxt = document.createTextNode(data[i]['name']);
		label.appendChild(labelTxt);
		unic.appendChild(input);
		unic.appendChild(label);
		div.appendChild(unic);
	}
}

function getComponents(op) {
	var promise = op == 1 ? $.Deferred() : null;
	op = typeof(op) == 'undefined' || op == null ? 0 : 1;
	$.ajax({
		method: 'POST',
		url: '../services/accessorie.services.php',
		data: { 'operation' : 'selectAcessories' },
		success: function(data) {
			if ( op == 1 ) {
				promise.resolve(data)
			} else {
				mountCheckboxes(data);
			}
		},
		error: function(error) {
			console.log(error);
		}
	});	
	return op == 1 ?  promise : '';
}

function getLastId() {
	var promise = $.Deferred();
	$.ajax({
		type: 'GET',
		url: '../services/car.services.php',
		data: {operation: 'getLastId'},
		success: function(response) {
			data = JSON.parse(response);
			promise.resolve(parseInt(JSON.parse(data.id)));
		},
		error: function(error){
			alert('Ocorreu um erro');
			promise.reject(error);
		}
	});
	return promise;
}

function cad(dados) {

	data = {
		operation : 'cadastro', 
		carData: dados
	}

	// Ajax cadastro de carro
	$.ajax({
		type: 'POST',
		url: '../services/car.services.php',
		data: data,
		success: function(response) {

			if ( dados.carId != "" && dados.carId != null ) {
				carId = dados['carId'];
			} else {
				getLastId().done(function(response){
					carId = response;
				});
			}

			accessories = [];
			size = 0;
			
			// Pega os acessórios e checa quais estão checados
			getComponents(1).done(function(response){
				data = response;
				data = data != '' ? JSON.parse(data) : '';
				// monta array dos acessórios checados
				for (x = 0, size = data.length; x < size; x++) {
					accessories.push({id : data[x].id, checked : $("#cb"+data[x].id).prop('checked') ? 1 : 0});
				}

				data = {
					operation: 'newAccCar',
					carId: carId,
					accessories: accessories
				}

				$.ajax({
					type: 'POST',
					url: '../services/accessorie.services.php',
					data: data,
					success: function(response) {
					},
					error: function(error){
						alert('Ocorreu um erro');
						console.log(error);
					}
				});

			});
			changeScreen(1);
			makeTable();

		},
		error: function(error){
			alert('Ocorreu um erro');
			console.log(error);
		}
	});
}

function edit(id) {
	getComponents();
	$("#listCars").hide();
	$("#formCadastro").fadeIn();
	$("#subPlaca").show();
	
	$("#title").html("Alterar Registro");
	$("#pageTitle").html("Alterar registro de automóvel");

	$.ajax({
		method: 'GET',
		dataType: 'json',
		url: '../services/car.services.php',
		data: { operation : 'getCar', id : id },
		success: function(data) {
			$("#carId").val(data.id);
			$("#descricao").val(data.descricao);
			$("#placa").val(data.placa);
			$("#codRenavam").val(data.codRenavam);
			$("#anoModelo").val(data.anoModelo);
			$("#anoFabricacao").val(data.anoFabricacao);
			$("#cor").val(data.cor);
			$("#km").val(data.km);
			$("option[value='"+data.marca+"']").prop('selected', true);
			$("#preco").val(data.preco);
			$("#precoFipe").val(data.precoFipe);
			$("#submitButton").html("Salvar");
			$("#subPlaca").html("Placa: "+data.placa);
			$("#subPlaca").attr('style', 'display:inline; color:red;');

			if (data.accessories[0] != null && data.accessories.length > 0) {
				for (i = 0; i < data.accessories.length; i++) {
					$("#cb"+data.accessories[i].accessorieId).prop('checked', true);
				}
			}		
		},
		error: function(error) {
			console.log(error);
		}
	});
}

function remove(id) {
	data = {
		'operation' : 'remove',
		'id' : id
	}
	if(confirm("Deseja mesmo apagar este registro?")){
		$.ajax({
			type: "POST",
			url: "../services/car.services.php",
			data: data,
			success: function(response){
				makeTable();
			},
			error: function(error){
				alert("Ocorreu um erro");
				console.log(error);
			}
		});
	}
}

function validate(dados) {
	error = [];
	if(dados.descricao == ""){
		$("label[for='descricaoError']").html("<qwerty class='MsgColor'> O campo não pode ser nulo</qwerty>");
		error[1] = true;
	}else{
		if(dados.descricao.length > 60){
			$("label[for='descricaoError']").html("<qwerty class='MsgColor'> A descrição deve ter no máximo 60 caracteres</qwerty>");
			error[1] = true;
		}else{
			$("label[for='descricaoError']").html("");
			error[1] = false;
		}
	}

	if(dados.placa == ""){
		$("label[for='placaError']").html("<qwerty class='MsgColor'> O campo não pode ser nulo</qwerty>");
		error[2] = true;
	}else{
		var regex = /^[a-z]{3}\-[0-9]{4}$/i;
		if(!regex.test(dados.placa)){
			$("label[for='placaError']").html("<qwerty class='MsgColor'> Placa inválida</qwerty>");
			error[2] = true;
		}else{
			$("label[for='placaError']").html("");
			error[2] = false;
		}
	}

	if(dados.codRenavam == ""){
		$("label[for='codRenavamError']").html("<qwerty class='MsgColor'> O campo não pode ser nulo</qwerty>");
		error[3] = true;
	}else{
		var regex = /^[0-9]{11}$/;
		if(!regex.test(dados.codRenavam)){
			$("label[for='codRenavamError']").html("<qwerty class='MsgColor'> Código inválido</qwerty>");
			error[3] = true;
		}else{
			$("label[for='codRenavamError']").html("");
			error[3] = false;
		}
	}

	if(dados.anoModelo == ""){
		$("label[for='anoModeloError']").html("<qwerty class='MsgColor'> O campo não pode ser nulo</qwerty>");
		error[4] = true;
	}else{
		if(dados.anoModelo.length != 4){
			$("label[for='anoModeloError']").html("<qwerty class='MsgColor'> Ano inválido</qwerty>");
			error[4] = true;
		}else{
			$("label[for='anoModeloError']").html("");
			error[4] = false;
		}
	}

	if(dados.anoFabricacao == ""){
		$("label[for='anoFabricacaoError']").html("<qwerty class='MsgColor'> O campo não pode ser nulo</qwerty>");
		error[5] = true;
	}else{
		if(dados.anoModelo < dados.anoFabricacao){
			$("label[for='anoFabricacaoError']").html("<qwerty class='MsgColor'> Ano inválido</qwerty>");
			error[5] = true;
		}else{
			$("label[for='anoFabricacaoError']").html("");
			error[5] = false;
		}
	}

	if(dados.cor == ""){
		$("label[for='corError']").html("<qwerty class='MsgColor'> O campo não pode ser nulo</qwerty>");
		error[6] = true;
	}else{
		if(dados.cor.length > 20){
			$("label[for='corError']").html("<qwerty class='MsgColor'> O campo deve possuir menos de 20 caracteres</qwerty>");
			error[6] = true;
		}else{
			$("label[for='corError']").html("");
			error[6] = false;
		}
	}
	
	if(dados.km == ""){
		$("label[for='kmError']").html("<qwerty class='MsgColor'> O campo não pode ser nulo</qwerty>");
		error[7] = true;
	}else{
		$("label[for='kmError']").html("");
		error[7] = false;
	}

	if(dados.marca == "" || dados.marca == null){
		$("label[for='marcaError']").html("<qwerty class='MsgColor'> O campo não pode ser nulo</qwerty>");
		error[8] = true;
	}else{
		if(dados.marca.length > 20){
			$("label[for='marcaError']").html("<qwerty class='MsgColor'> O campo deve possuir menos de 20 caracteres</qwerty>");
			error[8] = true;
		}else{
			$("label[for='marcaError']").html("");
			error[8] = false;
		}
	}

	if(dados.preco == ""){
		$("label[for='precoError']").html("<qwerty class='MsgColor'> O campo não pode ser nulo</qwerty>");
		error[9] = true;
	}else{
		$("label[for='precoError']").html("");
		error[9] = false;
	}

	if(dados.precoFipe == ""){
		$("label[for='precoFipeError']").html("<qwerty class='MsgColor'> O campo não pode ser nulo</qwerty>");
		error[10] = true;
	}else{
		$("label[for='precoFipeError']").html("");
		error[10] = false;
	}

	send = true;
	$.each(error, function(key, value){
		if(value === true){
			send = false;
		}
	});

	if(send){
		return true;
	}
}