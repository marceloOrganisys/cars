<?php

	require_once('db.class.php');

	final class Accessorie extends Db {

		protected $cadId;
		private $acessories;
		public $tabela = 'accessorie';

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

?>