<?php

require_once('../classes/marca.class.php');

class marcasModel extends Marca {

    public function __construct() {
        parent::__construct();
    }

    public function listMarcas() {

        $query = "SELECT * FROM " . $this->tabela;
        return array($this->getData($query), $this->getNumRows());
        
    }
    
}