<?php 


	require_once('db.class.php');
	require_once('car.acc.class.php');
	require_once('accessorie.class.php');

	final class Car extends Db {
		protected $carId;
		private $descricao;
		private $placa;
		private $codRenavam;
		private $anoModelo;
		private	$anoFabricacao;
		private $cor;
		private $km;
		private $marca;
		private $preco;
		private $precoFipe;
		public $tabela = 'car';
		private $accessories;
		private $accessorieClass;

		public function __set($name, $value) {
			$this->$name .= $value;
		}

		public function __get($name) {
			return $this->$name;
		}

		public function __construct($carData = null) {
			parent::__construct();
			if (!empty($carData)) {
				if (isset($carData['dados']['descricao'])) {
					$this->descricao = $carData['dados']['descricao'];
					$this->placa = $carData['dados']['placa'];
					$this->codRenavam = $carData['dados']['codRenavam'];
					$this->anoModelo = $carData['dados']['anoModelo'];
					$this->anoFabricacao = $carData['dados']['anoFabricacao'];
					$this->cor = $carData['dados']['cor'];
					$this->km = $carData['dados']['km'];
					$this->marca = $carData['dados']['marca'];
					$this->preco = $carData['dados']['preco'];
					$this->precoFipe = $carData['dados']['precoFipe'];
				} else {
					if (isset($carData['carId'])) {
						$this->accessorieClass = new Accessorie();
						$params = array(
							'table' => 'carAccessorie',
							'rows' => 'accessorieId',
							'complement' => 'WHERE carId = ' . $carData['carId']
						);
						$this->accessories = $this->accessorieClass->select($params);
					}
				}
			}
		}

		public function remove(array $params) {
			parent::remove(array('tabela' => 'carAccessorie', 'row' => 'carId', 'id' => $params['id']));
			parent::remove(array('tabela' => 'car', 'row' => 'id', 'id' => $params['id']));
		}

		public function validate(array $data) {
			$error = [];
			if (empty($data['descricao']) || strlen($data['descricao']) > 60) {
				$error['descricao'] = true;
			}
			
			if (empty($data['placa']) || strlen($data['placa']) != 8) {
				$error['placa'] = true;
			}

			if (empty($data['codRenavam']) || strlen($data['codRenavam']) != 11) {
				$error['codRenavam'] = true;
			}

			if (empty($data['anoModelo']) || strlen($data['anoModelo']) != 4) {
				$error['anoModelo'] = true;
			}

			if (empty($data['anoFabricacao']) || strlen($data['anoFabricacao']) != 4) {
				$error['anoFabricacao'] = true;
			}

			if (empty($data['cor']) || strlen($data['cor']) > 20) {
				$error['cor'] = true;
			}

			if (empty($data['km'])) {
				$error['km'] = true;	
			}

			if (empty($data['marca'])) {
				$error['marca'] = true;	
			} 

			if (empty($data['preco'])) {
				$error['preco'] = true;	
			}
		
			if (empty($data['precoFipe'])) {
				$error['precoFipe'] = true;	
			}
			
			return $error;
		}
	}
?>