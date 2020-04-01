$(document).ready(function() {
	 $('#placa').mask('AAA-0000');
	 $('#codRenavam').mask('00000000000');
	 $('.ano').mask('0000');
	 $('#km').mask('#.##0', {reverse:true});
	 $('.preco').mask('00.000.000,00', {reverse: true, placeholder: '00.000,00'});
});