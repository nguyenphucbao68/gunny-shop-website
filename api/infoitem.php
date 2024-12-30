<?php
class InfoItem Extends Utilities
{
    public $find;
    public $list;
    public $jointable;
    public $fields;
    public $addPlugin;
    public $addProperty;
        
    public $runtime;

    function __construct($db)
    {
        $this->item = new Product($db);
        $this->core();
    }

    private function getItem()
    {
    	$filter = false;
    	$jointable = "";
    	if($this->find){
    		if($this->jointable){
    			$filter = $this->getFilter($this->find, true, "a.");
    			$jointable = $this->getJoinTables($this->jointable);
    		}else{
    			$filter = $this->getFilter($this->find);
    		}
    		
    	}
        $stmt = $this->item->find(
            $filter, 
            $jointable
        );
        if(!$stmt) throw new Exception("No Item Found.", 101);
        
        return $stmt;
    }

    public function load()
    {
        $this->startRuntime();

        $stmtRun = $this->getItem();

        if($this->fields){
        	 $item = $this->getFields($this->fields, (object) $stmtRun);
        }else{
        	extract($stmtRun);
        	$item = array(
        		"id" => $id,
                "name" => $name,
                "category_id" => $category_id,
                "template_id" => $template_id,
                "description" => html_entity_decode($description),
                "pic" => $pic,
                "quality" => $quality,
                "clever" => $clever,
                "style" => $style,
                "agility" => $agility,
                "luck" => $luck,
                "NeedSex" => $NeedSex
        	);
        	if($this->jointable){
                $item = array_merge($item, array(
                    "label" => $label,
                    "AValue1" => $AValue1
                ));
            }
        	if($this->addProperty){
                $item = array_merge($item, $this->getProperty($this->addProperty, $item));
            }
        }
        if($this->addPlugin){
            $item = array_merge($this->getPlugin($this->addPlugin, array(
                "time" => $this->runtime
            )), $item);
        }
        return $item;
    }
}