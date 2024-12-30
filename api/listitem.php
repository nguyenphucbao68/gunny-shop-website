<?php
// include_once 'item.php';

class ListItem Extends Utilities
{
    public $ultimate = false;
    public $page = 1;
    public $filter;
    public $nofilter;
    public $keyword;
    public $addProperty;
    public $stateEquipSort; 
    public $random;
    public $group;
    public $addPlugin;
    public $start = 0;
    public $limit = 8;
    public $search;
    public $jointable = true;
    public $filterShop;
    public $nofilterShop;
    public $clause;

    private $item;
    private $params = array();
    public $runtime;

    function __construct($db)
    {
        $this->item = new Product($db);
        $this->core();
    }

    private function searchListItem()
    {
        $stmt = $this->item->search(
            $this->search,
            $this->ultimate, 
            $this->start, 
            $this->limit, 
            $this->filter ? $this->getFilter($this->filter) : ($this->nofilter ? $this->getFilter($this->nofilter, false) : ""), 
            $this->stateEquipSort, 
            $this->random, 
            $this->group,
            $this->getClause($this->clause),
            $this->filterShop ? $this->getFilter($this->filterShop) : ($this->nofilterShop ? $this->getFilter($this->nofilterShop, false) : "")
        );
        $num = $stmt->rowCount();
        // if($num <= 0) throw new Exception("No Item Found.", 101);
        return (object) array(
            "num" => $num,
            "stmt" => $stmt
        );
    }

    private function getListItem()
    {
        // echo $this->getClause($this->clause);
        // exit;
        $stmt = $this->item->read(
            $this->ultimate, 
            $this->start, 
            $this->limit, 
            $this->filter ? $this->getFilter($this->filter) : ($this->nofilter ? $this->getFilter($this->nofilter, false) : ""), 
            $this->stateEquipSort, 
            $this->random, 
            $this->group,
            $this->filterShop ? $this->getFilter($this->filterShop) : ($this->nofilterShop ? $this->getFilter($this->nofilterShop, false) : ""),
            $this->getClause($this->clause)
            // $this->jointable ? $this->getJoinTables($this->jointable) : ""
        );
        $num = $stmt->rowCount();
        if($num <= 0) throw new Exception("No Item Found.", 101);
        
        return (object) array(
            "num" => $num,
            "stmt" => $stmt
        );
    }

    public function load()
    {
        $this->startRuntime();

        if($this->search){
            $stmtRun = $this->searchListItem();
        }else{
            $stmtRun = $this->getListItem();
        }

        $listItem = array();
        $listItem["data"] = array();

        while($row = $stmtRun->stmt->fetch(PDO::FETCH_ASSOC)){
            if(isset($_GET['fields'])){
                $item = $this->getFields($_GET['fields'], (object) $row);
            }else{
                // extract($row);
                $item = array(
                    "id" => $row["id"],
                    "name" => $row["name"],
                    "category_id" => $row["category_id"],
                    "template_id" => $row["template_id"],
                    "description" => html_entity_decode($row["description"]),
                    "pic" => $row["pic"],
                    "quality" => $row["quality"],
                    "clever" => $row["clever"],
                    "style" => $row["style"],
                    "agility" => $row["agility"],
                    "luck" => $row["luck"],
                    "NeedSex" => $row["NeedSex"]
                );
                if($this->jointable){
                    $item2 = $this->item->infoShop($row["template_id"])->fetch(PDO::FETCH_ASSOC);
                    // print_r($item2);
                    $item = array_merge($item, array(
                        "label" => $item2["label"],
                        "AValue1" => $item2["AValue1"]
                    ));
                }
            }

            if($this->stateEquipSort){
                $item = array_merge($item, array(
                    "state" => (int) $state
                ));
            }
            if($this->addProperty){
                $item = array_merge($item, $this->getProperty($this->addProperty, $item));
            }
            array_push($listItem["data"], $item);
        }

        $totalItem = $this->item->count(
            $this->ultimate, 
            $this->filter ? $this->getFilter($this->filter) : ($this->nofilter ? $this->getFilter($this->nofilter, false) : array()), 
            $this->random, 
            $this->group,
            $this->search,
            $this->getClause($this->clause),
            $this->filterShop ? $this->getFilter($this->filterShop) : ($this->nofilterShop ? $this->getFilter($this->nofilterShop, false) : "")
        );
        $listItem = array_merge($listItem, array("paging"=> $this->pagination($totalItem, $stmtRun->num)));
        if($this->addPlugin){
            $listItem = array_merge($this->getPlugin($this->addPlugin, array(
                "time" => $this->runtime,
                "countRecord" => $totalItem
            )), $listItem);
        }
        return $listItem;
    }

    private function pagination($totalItem, $num)
    {
        
        $pagination = array();
        // if($num >= $this->limit){
        // echo $totalItem."\n";
            $home_url = "http://localhost/gunny/api/";
            $page_url = "{$home_url}item/read_paging.php?";
            $pagination = $this->getPaging($this->page, $totalItem, $this->limit, $page_url);
        // };
        return $pagination;
    }
}