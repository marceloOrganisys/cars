<?php

require_once('../classes/db.class.php');

class carAccsModel extends Db {

    public $tabela = 'carAccessorie';

    public function __construct() {
        parent::__construct();
    }

    public function listCarAccs($params) {

        $query = 'SELECT accessorieId FROM ' . $this->tabela . ' WHERE carId = ' . $params['id'];

        $dados = [];
        if ($result = $this->execute($query, 1)) {
            for ($i = 0; $i < $result['linhas']; $i++) {
                $dados[] = $result['dados']->fetch_assoc(); 
            }
            return $dados;
        } else {
            return $this->mysqli->error;
        }  
    }
    
}