<?php

require_once('../classes/db.class.php');

class carsModel extends Db {

    public $tabela = 'car';

    public function __construct() {
        parent::__construct();
    }

    public function listCars($params) {

        $query = "SELECT * FROM " . $this->tabela;
        $countQuery = "SELECT count(id) AS cars FROM " . $this->tabela;

        if (isset($params['search'])) {
            $query .= " WHERE descricao LIKE '%" . $params['search'] . "%' OR placa LIKE '%" . $params['search'] . "%' ";
            $countQuery .= " WHERE descricao LIKE '%" . $params['search'] . "%' OR placa LIKE '%" . $params['search'] . "%' "; 
        }

        $query .= " ORDER BY id DESC LIMIT " . $params['page'] * 10 . ", 10"; 

        if ($result = $this->execute($query, 1)) {
            for ($i = 0; $i < $result['linhas']; $i++) {
                $dados[] = $result['dados']->fetch_assoc(); 
            }
            $dados['dados'] = empty($dados) ? '': $dados;
            $result = $this->execute($countQuery, 1);
            for ($i = 0; $i < $result['linhas']; $i++) {
                $dados['cars'] = $result['dados']->fetch_assoc(); 
            }
            $dados['cars'] = $dados['cars']['cars'];
            return $dados;
        } else {
            return $this->mysqli->error;
        }  
    }
    
}