<?php
class randomAvatar extends Utilities
{
	private $conn;
    private $table_name = "qa_gunny_items";
    private $table_shop = "qa_gunny_shop";

    public $gt = 1;
    public $fields;
    public $addProperty = array("img", "cat");
    public $catRan = array("cloth", "head", "hair", "wing", "eff", "glass", "face");
    public $addPlugin;

    public $runtime;
	public function __construct($db)
	{
		$this->conn = $db;
		$this->core();
	}

	private function run()
	{
		if($this->catRan){
			$catId = array();
			$catIdSuitWing = array();
			for ($i=0; $i < count($this->catRan); $i++) { 
				$catIdConfig = $this->getCatIdByPrefix($this->catRan[$i]);
				if($catIdConfig == 13 || $catIdConfig == 15)
					$catIdSuitWing[] = $catIdConfig;
				else
					$catId[] = $catIdConfig;
			}
			$listcatId = implode(",", $catId);
			$listcatIdSuitWing = implode(",", $catIdSuitWing);
		}

		$query = "SELECT * FROM  ( SELECT * FROM `$this->table_name` ORDER BY RAND()) rs  WHERE (rs.NeedSex=:gt AND rs.category_id IN ($listcatId)) ".(count($catIdSuitWing) > 0 ? "OR (rs.NeedSex=0 AND rs.category_id IN ($listcatIdSuitWing))" : "")." AND rs.template_id IN (SELECT template_id FROM `$this->table_shop`) GROUP BY rs.category_id;";
		$stmt = $this->conn->prepare($query);
		$stmt->bindParam(":gt", $this->gt);

		$stmt->execute();
		return $stmt;
	}

	public function load()
	{
		 $this->startRuntime();
		$stmt = $this->run();
		$totalItem = $stmt->rowCount();
        if($totalItem <= 0) throw new Exception("No Item Found.", 101);

        $listItem = array();
        $listItem["data"] = array();
        while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        	if($this->fields){
        		$item = $this->getFields($this->fields, (object) $row);
        	}else{
        		extract($row);
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
        	}
        	if($this->addProperty) {
        		$propCompul = array_merge(array("img", "cat"), $this->addProperty);
        		$item = array_merge($item, $this->getProperty($propCompul, $item));
        	}

        	$listItem["data"][] = $item;
        }
        if($this->addPlugin){
            $listItem = array_merge($this->getPlugin($this->addPlugin, array(
                "time" => $this->runtime,
                "countRecord" => $totalItem
            )), $listItem);
        }
        return $listItem;
	}
}