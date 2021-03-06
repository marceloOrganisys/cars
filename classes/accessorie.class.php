<?php

require_once('db.class.php');

class Accessorie extends Db {

	protected $accessorieId;
	private $name;

	public function __set($name, $value) {
		$this->$name .= $value;
	}

	public function __get($name) {
		return $this->$name;
	}

	public function __construct() {
		$this->tabela = 'accessorie';
		parent::__construct();
	}
}