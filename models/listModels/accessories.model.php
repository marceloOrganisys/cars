<?php

require_once('../classes/accessorie.class.php');

class accessoriesModel extends Accessorie {
    
    public function __construct() {
        parent::__construct();
    }

    public function listAccessories() {

        $query = "SELECT * FROM " . $this->tabela;
        return array($this->getData($query), $this->getNumRows());
        
    }
    
}