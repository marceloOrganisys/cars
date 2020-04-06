<?php

require_once('../classes/db.class.php');

class accessoriesModel extends Db {

    public $tabela = 'accessorie';

    public function __construct() {
        parent::__construct();
    }

    public function listAccessories() {

        $query = "SELECT * FROM " . $this->tabela;
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