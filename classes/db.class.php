<?php 
	
	abstract class Db {

		protected $mysqli;
		public $result;

		function __construct() {
			$this->connect();
		}

		private function connect() {
			$data = array(
				'server' => 'localhost',
				'user' => 'root',
				'password' => '',
				'dbase' => 'cars'
			);
			$this->mysqli = new mysqli($data['server'], $data['user'], $data['password'], $data['dbase']);
			$this->mysqli->set_charset("utf8");

			if ($this->mysqli->connect_errno) {
				echo 'Failed to connect to MySQL: ' . $this->mysqli->connect_error;
			 	die();
			} else {
				return $this->mysqli;
			}
		}

		public function save(array $params) {
			if (!empty($params['carId'])) {
				return $this->update($params);
			} else {
				return $this->add($params);
			}
		}

		public function add(array $params) {
			$query = 'INSERT INTO '. $params['tabela'].' '.$this->prepareInsert($params['dados']).';';
			echo $this->execute($query);
		}

		public function update(array $params) {
			$query = 'UPDATE '.$params['tabela'].' SET '.$this->prepareUpdate($params['dados']).' WHERE id = '.$params['carId'].';';
			echo $this->execute($query);
		}

		public function remove(array $params) {
			$query = "DELETE FROM " . $params['tabela'] . " WHERE " . $params['row'] . " = " . $params['id'];
			$this->execute($query);
		}

		public function select(array $params) {
			$dados = [];
			$query = "SELECT ". $params['rows'] . " FROM " . $params['table'] . " " . $params['complement'];
			if ($result = $this->execute($query, 1)) {
				for ($i = 0; $i < $result['linhas']; $i++) {
					$dados[] = $result['dados']->fetch_assoc(); 
				}
				return $dados;
			}else{
				return $this->mysqli->error;
			}
		}

		private function prepareInsert(array $params): string {
			$values = null;
			$i = 0;
			foreach ($params as $key => $value) {
				$values .= "'".$value."'";
				$i++;
				$values .= $i == count($params) ? '' : ", ";
			}
			$columns = array_keys($params);
			$str = '('. implode(',', $columns) .') VALUES ('.  $values .')';
			//id, nome
			return $str;
		}

		private function prepareUpdate(array $params): string {
			$columns = array_keys($params);
			$values = array_values($params);
			$str = null;
			$i = 1;
			for($i = 1; $i <= count($values); $i++){
				$value = $this->mysqli->real_escape_string($values[$i-1]);
				$str .= $columns[$i-1].'='. "'$value'";
				$str .= $i < count($values) ?  ',' : null; 
			}
			return $str;
		}

		public function execute(string $stmt, int $op = 0) {
			if ( $result = $this->mysqli->query($stmt) ) {
				return empty($op) || !isset($op) ?  true : array('dados' => $result, 'linhas' => $result->num_rows); 
			} else {
				return $this->mysqli->error;
			}
		}
	}
?>