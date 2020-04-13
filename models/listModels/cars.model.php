<?php

require_once('../classes/db.class.php');

class carsModel extends Db {

    public $tabela = 'car';

    public function __construct() {
        parent::__construct();
    }

    public function listCars($params) {

        $queryWhere = isset($params['search']) ? " WHERE descricao LIKE '%" . $params['search'] . "%' OR placa LIKE '%" . $params['search'] . "%' " : '';

        $rows = array(
            'dados' => '*',
            'cars' => 'count(id) AS cars'
        );

        foreach ($rows as $key => $value) {
            $query = 'SELECT ' . $value . ' FROM ' . $this->tabela . ' ' . $queryWhere;
            $query .= $key == 'dados' ? ' ORDER BY id DESC LIMIT ' . $params['page'] * 10 . ', 10' : '';
            $dados[$key] = $this->getData($query);
        }

        return $dados;  

    }
    
}