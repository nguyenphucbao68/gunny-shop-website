<?php
class Error extends Exception{
    public function setMessage($message){
        $this->message = $message;
    }
}