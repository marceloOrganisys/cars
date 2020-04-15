<?php

require_once('db.class.php');

class Marca extends Db {

	protected $marcaId;
	private $name;

	public function __set($name, $value) {
		$this->$name .= $value;
	}

	public function __get($name) {
		return $this->$name;
	}

	public function __construct() {
		$this->tabela = 'marca';
		parent::__construct();
	}
}