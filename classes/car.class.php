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
		private $accessories;
		private $accessorieClass;

		public function __set($name, $value) {
			$this->$name .= $value;
		}

		public function __get($name) {
			return $this->$name;
		}

		public function __construct($carData = null) {
			$this->accessorieClass = new CarAcc();
			$this->tabela = 'car';
			parent::__construct();
			if (!empty($carData)) {
				$this->carId = !empty($carData['carId']) ? $carData['carId'] : null; 
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
						$params = array(
							'rows' => 'accessorieId',
							'complement' => 'WHERE carId = ' . $carData['carId']
						);
						$this->accessories = $this->accessorieClass->select($params);
					}
				}
			}
		}

		public function removeCar() {
			$this->accessorieClass->remove(array('row' => 'carId', 'id' => $this->carId));
			$this->remove(array('row' => 'id', 'id' => $this->carId));
		}

		public function save() {
			$params = array(
				'carId' => $this->carId,
				'dados' => array(
					'descricao' => $this->descricao,
					'placa' => $this->placa,
					'codRenavam' => $this->codRenavam,
					'anoModelo' => $this->anoFabricacao,
					'anoFabricacao' => $this->anoFabricacao,
					'cor' => $this->cor,
					'km' => $this->km,
					'marca' => $this->marca,
					'preco' => $this->preco,
					'precoFipe' => $this->precoFipe
				) 
			);
			if (!empty($this->carId)) {
				return $this->update($params);
			} else {
				return $this->add($params);
			}
		}

		public function validate() {
			$error = [];
			if (empty($this->descricao) || strlen($this->descricao) > 60) {
				$error['descricao'] = true;
			}
			
			if (empty($this->placa) || strlen($this->placa) != 8) {
				$error['placa'] = true;
			}

			if (empty($this->codRenavam) || strlen($this->codRenavam) != 11) {
				$error['codRenavam'] = true;
			}

			if (empty($this->anoModelo) || strlen($this->anoModelo) != 4) {
				$error['anoModelo'] = true;
			}

			if (empty($this->anoFabricacao) || strlen($this->anoFabricacao) != 4) {
				$error['anoFabricacao'] = true;
			}

			if (empty($this->cor) || strlen($this->cor) > 20) {
				$error['cor'] = true;
			}

			if (empty($this->km)) {
				$error['km'] = true;	
			}

			if (empty($this->marca)) {
				$error['marca'] = true;	
			} 

			if (empty($this->preco)) {
				$error['preco'] = true;	
			}
		
			if (empty($this->precoFipe)) {
				$error['precoFipe'] = true;	
			}
			
			return $error;
		}
	}
?>