<?php

require_once('../classes/db.class.php');

class carAccsModel extends Db {

    public $tabela = 'carAccessorie';

    public function __construct() {
        parent::__construct();
    }

    public function listCarAccs($params) {

        $query = 'SELECT accessorieId FROM ' . $this->tabela . ' WHERE carId = ' . $params['id'];
        return $this->getData($query);

    }
    
}