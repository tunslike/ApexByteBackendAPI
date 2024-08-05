<?php

class Cards extends Controller {

    public function __construct(){

        error_reporting(E_ALL);
        ini_set('display_errors', 'On');

        $this->userModel = $this->model('CardAccount');
    }

    public function designCollection() {

        $data = [
            'title' => 'Card Page'
        ];

        $this->view('cards/designCollection', $data);

    }

    public function designCustomCard() {

        $data = [
            'title' => 'Card Page'
        ];

        $this->view('cards/OrderCard', $data);
    }

}
