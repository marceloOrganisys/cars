<?php

require_once('../classes/car.acc.class.php');

class carAccsModel extends CarAcc {

    public function __construct() {
        parent::__construct();
    }

    public function listCarAccs($params) {

        $query = 'SELECT accessorieId FROM ' . $this->tabela . ' WHERE carId = ' . $params['id'];
        return $this->getData($query);

    }
    
}