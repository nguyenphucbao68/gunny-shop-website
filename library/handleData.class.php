<?php
/**
 * Handle Create Data
 */
trait HandleData
{
	public static $object;
	public static $element;
	public $count = 0;
	public function init($type = "array")
	{
		if($type == "array"){
			$this->object = (object) array("data" => []);
			$this->count = 0;
		}else if($type == "object"){
			$this->object = (object) array();
		}
	}

	// public function createObj($nameObj='')
	// {
	// 	$this->object->data->{$nameObj} = (object) array();
	// }

	public function createObj($nameObj, $key='', $value='')
	{
		$this->object->data->{$nameObj}->{$key} = $value;
	}

	public function createElement()
	{
		$this->increaseCount();
		$this->element = (object) array();
	}

	public function addElement($key, $value)
	{
		$this->element->{$key} = $value;
	}

	public function doneElement()
	{
		$this->object->data[] = $this->element;
	}

	public function increaseCount()
	{
		$this->count++;
	}

	public function addAnotherProperty($key, $value)
	{
		$this->object->{$key} = $value;
	}

	public function exportDataJson()
	{
		$this->object->limit = $this->count;
		$json = json_encode($this->object);
		$this->object = (object) array();
		$this->count = 0;
		return $json;
	}
}
