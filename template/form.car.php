<div id="formCadastro" class="formularioCarros" style="display:none;">
	<div id="formulario">
		<section class="formContainer">
			<section class="cabecalhoForm">
				<h1 id="pageTitle"></h1>
				<h5 id="subPlaca" display: none;></h5>
				<hr width="50%" style="border-color: #007ef9; height:1px;">
			</section>
			<section class="linha">
				<input id="carId" type="hidden" name="carId">
				<div class="form-row">
					<div class="form-group col-md-6">
						<label for="descricao">Descrição</label><br>
						<input id="descricao" type="text" class="form-control" name="descricao"><br>
						<div class="errorBox">
							<label class="errorMessage" for="descricaoError"></label>
						</div>
					</div>
					<div class="form-group col-md-3">
						<label for="placa">Placa</label><br>
						<input id="placa" type="text" class="form-control" name="placa"><br>
						<div class="errorBox">
							<label class="errorMessage" for="placaError"></label>
						</div>
					</div>
					<div class="form-group col-md-3">
						<label for="codRenavam">Código Renavam</label><br>
						<input id="codRenavam" type="text" class="form-control" name="codRenavam"><br>
						<div class="errorBox">
							<label class="errorMessage" for="codRenavamError"></label>
						</div>
					</div>
				</div>
			</section>
			<section class="linha">
				<div class="form-row">
					<div class="form-group col-md-2">
						<label for="anoModelo">Ano do Modelo</label><br>
						<input id="anoModelo" type="text" class="form-control ano" name="anoModelo"><br>
						<div class="errorBox">
							<label class="errorMessage" for="anoModeloError"></label>
						</div>
					</div>
					<div class="form-group col-md-2">
						<label for="anoFabricacao">Ano de fabricação</label><br>
						<input id="anoFabricacao" type="text" class="form-control ano" name="anoFabricacao"><br>
						<div class="errorBox">
							<label class="errorMessage" for="anoFabricacaoError"></label>
						</div>
					</div>
					<div class="form-group col-md-3">
						<label for="cor">Cor do carro</label><br>
						<input id="cor" type="text" class="form-control" name="cor"><br>
						<div class="errorBox">
							<label class="errorMessage" for="corError"></label>
						</div>
					</div>
					<div class="form-group col-md-2">
						<label for="km">Quilometragem</label><br>
						<input id="km" type="text" class="form-control" name="km"><br>
						<div class="errorBox">
							<label class="errorMessage" for="kmError"></label>
						</div>
					</div>
					<div class="form-group col-md-2">
						<label for="marca">Marca</label><br>
						<select id="marca" name="marca" class="custom-select custom-select-lg mb-3">
						</select><br>
						<div class="errorBox" style="margin-top:7px;">
							<label class="errorMessage" for="marcaError"></label>
						</div>
					</div>
				</div>
			</section>
			<section class="linha">
				<div class="form-row">
					<div class="form-group col-md-3">
						<label for="preco">Preço</label><br>
						<input id="preco" type="text" class="form-control preco" name="preco"><br>
						<div class="errorBox">
							<label class="errorMessage" for="precoError"></label>
						</div>
					</div>
					<div class="form-group col-md-3">
						<label for="precoFipe">Preço Fipe</label><br>
						<input id="precoFipe" type="text" class="form-control preco" name="precoFipe"><br><br>
						<div class="errorBox" style="margin-top:-20px;">
							<label class="errorMessage" for="precoFipeError"></label>
						</div>
					</div>
				</div>
			</section>
			<section class="componentes">
				<div align="center">
					<h4> Componentes do veículo</h4>
				</div>
				<div class="form-row">
					<div id="components" class="form-group"></div>
				</div>
			</section>
			<section class="botoes">
				<button id="submitButton" class="btn btn-outline-success">Cadastrar</button>
				<button class="btn btn-outline-secondary" class="backButton" onclick="changeScreen(1);">Voltar</button>
			</section>
		</section>
	</div>
</div>