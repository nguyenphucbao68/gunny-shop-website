<?php
include_once '../shopconfig.php';

class Utilities{
    public function getClause($clause, $keyClause = "")
    {
        if(!$clause) return "";
        $data = "";
        foreach ($clause as $key => $value) {
            if($key == "and" || $key == "or") 
                $data .= ($data ? " ".strtoupper($keyClause)." " : "")."({$this->getClause($value, $key)})";
            else{
                if(strpos($key, "#") === 0){
                    $key = substr($key, 1);
                    $condition = "<>";
                    $conditionArray = "NOT IN";
                }else{
                    $condition = "=";
                    $conditionArray = "IN";
                }
                if(is_array($value)){
                    $value = "(\"".implode($value, '","')."\")";
                    if($keyClause != ""){
                        $data .= ($data ? " ".strtoupper($keyClause)." " : "")."`{$key}` {$conditionArray} {$value}";
                    }else{
                        $data .= "`{$key}` {$conditionArray} {$value}";
                    } 
                }else{
                    if($keyClause != ""){
                        $data .= ($data ? " ".strtoupper($keyClause)." " : "")."`{$key}` {$condition} '{$value}'";
                    }else{
                        $data .= "`{$key}` {$condition} '{$value}'";
                    }   
                }
                
            }
        }
        return $data;
    }

    public function startRuntime()
    {
        $this->runtime = microtime(true);
    }
    
    public function core()
    {
        foreach ($_GET as $key => $value) {
            if($key !== "call" && !property_exists($this, $key)) throw new Exception("Param not exist.", 1);
            
            if($value === "true" || $value === "false")
                $this->$key = filter_var($value, FILTER_VALIDATE_BOOLEAN);
            elseif(filter_var($value, FILTER_VALIDATE_INT))
                $this->$key = filter_var($value, FILTER_VALIDATE_INT);
            else
                $this->$key = $value;
        }
        if(property_exists($this, "start") && !isset($_GET["start"]))
            $this->start = $this->limit * $this->page - $this->limit;
    }

    public function getJoinTables($listColumn)
    {
        $data = "";
        for ($i=0; $i < count($listColumn); $i++) { 
           if($data != "") $data .= " AND ";
           $column = $listColumn[$i];
           $data .= "a.{$column} = b.{$column}";
        };
        return $data;
    }
    private function getIcon($item)
    {
        $pathChar = ($item["NeedSex"] == 1) ? "m" : "f";
        $pic = $item["pic"];
        $prefix = array(
            "1"=> "equip/$pathChar/head/$pic/icon_1.png",
            "3"=> "equip/$pathChar/hair/$pic/icon_1.png",
            "5"=> "equip/$pathChar/cloth/$pic/icon_1.png",
            "2"=> "equip/$pathChar/glass/$pic/icon_1.png",
            "4"=> "equip/$pathChar/eff/$pic/icon_1.png",
            "6"=> "equip/$pathChar/face/$pic/icon_1.png",
            "13"=> "equip/$pathChar/suits/$pic/icon_1.png",
            "15"=> "equip/wing/$pic/icon.png"
        );
        return resource_url.$prefix[$item["category_id"]];
    }

    public function getNameQuality($id)
    {
        return array("Thô", "Thường", "Ưu tú", "Hoàn mỹ", "Siêu việt")[$id];
    }

    public function getType($catid)
    {
        return unserialize(gnShop_config)["catIdPrefix"][$catid]["name"];
    }

    public function getCat($catid)
    {
        return unserialize(gnShop_config)["catIdPrefix"][$catid]["prefix"];
    }

    public function getCatIdByPrefix($prefix)
    {
        $arrayPrefix = array_column(unserialize(gnShop_config)["catIdPrefix"], "prefix");
        $arrayKeys = array_keys(unserialize(gnShop_config)["catIdPrefix"]);
        return array_combine($arrayPrefix, $arrayKeys)[$prefix];
    }

    public function getNameLabel($label)
    {
        return array(
            "0" => "Normal",
            "1" => "Hot",
            "2" => "New"
        )[$label];
        // return $labelConfig[ || "Normal";
    }

    public function getProperty($listProperty, $item)
    {
        $object = array();
        for ($i=0; $i < count($listProperty); $i++) { 
            $property = $listProperty[$i];
            switch (strtolower($property)) {
                case 'img':
                    $object[$property] = $this->getIcon($item);
                    break;
                case 'prefixsex':
                    $object[$property] = $item["NeedSex"] == 1 ? "m" : "f";
                    break;
                case 'namesex':
                    $gt = array(
                        "1" => "Nam",
                        "2" => "Nữ",
                        "0" => "Không giới tính"
                    );
                    $object[$property] = $gt[$item["NeedSex"]];
                    break;
                case 'namequality': 
                    $object[$property] = $this->getNameQuality($item["quality"]);
                    break;
                case 'type':
                    $object[$property] = $this->getType($item["category_id"]);
                    break;
                case 'cat':
                    $object[$property] = $this->getCat($item["category_id"]);
                    break;
                case 'namelabel':
                    // if(!$item["label"]) throw new Exception("De su dung ban phai them jointable", 100);
                    $object[$property] = $this->getNameLabel($item["label"]);
                    break;
                default:
                    throw new Exception("ssd", 1);
                    
                    break;
            }
        }
        return $object;
    }

    public function getPlugin($listPlugin, $info)
    {
        $object = array();
        for ($i=0; $i < count($listPlugin); $i++) { 
            $plugin = $listPlugin[$i];
            switch ($plugin) {
                case 'runtime':
                    $object[$plugin] = microtime(true) - $info["time"];
                    break;
                case 'countRecord': 
                    $object[$plugin] = $info['countRecord'];
                    break;
            }
        }
        return $object;
    }

    public function getFilter($string, $state = true, $jointable = "")
    {
        $data = "";
        foreach ($string as $key => $value) {
            if($data != "") $data .= " AND ";
            if(is_array($value)){
                $listValue = implode("','", $value);
                $data .= $jointable."$key ".(!$state ? "NOT" : "")." IN ('$listValue')";
            }else{
                $value = htmlspecialchars(strip_tags($value));
                $data .= $jointable."$key ".($state ? "=" : "<>")." '$value'";
            }
        }
        return $data;
    }

    public function getFields($string, $product)
    {
        $product_arr = (object) array();
        $fields = explode(",", $string);
        for ($i=0; $i < count($fields); $i++) { 
            $field = $fields[$i];
            if(!isset($product->$field)) continue;
            $product_arr->$field = $product->$field;
        }
        return $product_arr;
    }

    public function getPaging($page, $total_rows, $records_per_page, $page_url){
    
        // paging array
        $paging_arr=array();
 
        // button for first page
        $paging_arr["first"] = array(
            "page" => 1,
            "link" => $page>1 ? "{$page_url}page=1" : "{$page_url}"
        );

        $previous_page = $page - 1 == 0 ? 1 : $page - 1;
        $paging_arr["previous"] = array(
            "page" => $previous_page,
            "link" => "{$page_url}page={$previous_page}"
        );
        $total_pages = ceil($total_rows / $records_per_page);
        $next_page = $page + 1 >  $total_pages ? $total_pages : $page + 1;
        $paging_arr["next"] = array(
            "page" => $next_page,
            "link" => "{$page_url}page={$next_page}"
        );
       
        $paging_arr["last"] = array(
            "page" => $total_pages,
            "link" => $page < $total_pages ? "{$page_url}page={$total_pages}" : ""
        );


        return $paging_arr;

        // // count all products in the database to calculate total pages
        // 
 
        // // range of links to show
        // $range = 2;
 
        // // display links to 'range of pages' around 'current page'
        // $initial_num = $page - $range;
        // $condition_limit_num = ($page + $range)  + 1;
 
        // $paging_arr['pages']=array();
        // $page_count=0;
         
        // for($x=$initial_num; $x<$condition_limit_num; $x++){
        //     // be sure '$x is greater than 0' AND 'less than or equal to the $total_pages'
        //     if(($x > 0) && ($x <= $total_pages)){
        //         $paging_arr['pages'][$page_count]["page"]=$x;
        //         $paging_arr['pages'][$page_count]["url"]="{$page_url}page={$x}";
        //         $paging_arr['pages'][$page_count]["current_page"] = $x==$page ? "yes" : "no";
 
        //         $page_count++;
        //     }
        // }
 
        // // button for last page
        // $paging_arr["last"] = $page<$total_pages ? "{$page_url}page={$total_pages}" : "";
 
        // // json format
        // return $paging_arr;
    }
 
}