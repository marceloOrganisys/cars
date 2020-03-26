<?php

	include_once('db.class.php');
	final class CarAcc extends Db {
		
		protected $carId;
		protected $accessorieId;
		public $tabela = 'carAccessorie';

		public function __set($name, $value) {
			$this->$name .= $value;
		}

		public function __get($name) {
			return $this->$name;
		}

		public function __construct() {
			parent::__construct();
		}
	}