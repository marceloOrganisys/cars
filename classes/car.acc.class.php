<?php

include_once('db.class.php');

class CarAcc extends Db {
	
	protected $carId;
	protected $accessorieId;

	public function __set($name, $value) {
		$this->$name .= $value;
	}

	public function __get($name) {
		return $this->$name;
	}

	public function __construct() {
		$this->tabela = 'carAccessorie';
		parent::__construct();
	}
}