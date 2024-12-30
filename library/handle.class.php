<?php
mysqli_report(MYSQLI_REPORT_STRICT);

/**
* Global Function : các hàm sử dụng chung cho việc handle
*/
class GlobalFunction
{
	private $servername = "localhost"; // host
	private $username = "root"; // user
	private $password = ""; // pass
	private $database = "gunny"; // database
	protected static $conn; // connect database

	function __construct()
	{
		try{
			$this->conn = new mysqli($this->servername, $this->username, $this->password, $this->database);
			// if($this->conn === false || $this->conn->error) throw new Exception("test");
			$this->conn->set_charset("utf8");
		} catch (Exception $e) {
			throw new Exception($e->getMessage(), $e->getCode());
		}
	}

	final protected function query($SQL) {
	    try {
	        $result = $this->conn->query($SQL);
	        return $result;
	    } catch (Exception $e) {
	    	throw new Exception($e->getMessage(), $e->getCode());
	    	die();
	    }   
	}

	final protected function getInfoByKey($key = '', $value = '', $table = 'qa_gunny_items')
	{
		if($key == '') return false;
		$array = $this->query("SELECT * FROM $table WHERE $key='$value'");
		if($array->num_rows > 0) return $array->fetch_assoc();
		return false;
	}
}