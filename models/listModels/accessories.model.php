<?php

require_once('../classes/db.class.php');

class accessoriesModel extends Db {

    public $tabela = 'accessorie';

    public function __construct() {
        parent::__construct();
    }

    public function listAccessories() {

        $query = "SELECT * FROM " . $this->tabela;
        return $this->getData($query);
        
    }
    
}