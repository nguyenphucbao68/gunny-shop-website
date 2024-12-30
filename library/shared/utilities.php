<?php
class Utilities{
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

    public function getType($cat)
    {
        return array(
            "1" => "Nón",
            "2" => "Kính",
            "3" => "Tóc",
            "4" => "Mắt",
            "5" => "Áo",
            "6" => "Mặt",
            "13" => "Bộ",
            "15" => "Cánh"
        )[$cat];
    }

    public function getCat($cat)
    {
        return array(
            "1" => "head",
            "2" => "glass",
            "3" => "hair",
            "4" => "eff",
            "5" => "cloth",
            "6" => "face",
            "13" => "suits",
            "15" => "wing"
        )[$cat];
    }

    public function getProperty($string, $item)
    {
        $listProperty = $string;
        $object = array();
        for ($i=0; $i < count($listProperty); $i++) { 
            $property = $listProperty[$i];
            switch ($property) {
                case 'img':
                    $object[$property] = $this->getIcon($item);
                    break;
                case 'prefixSex':
                    $object[$property] = $item["NeedSex"] == 1 ? "m" : "f";
                    break;
                case 'nameSex':
                    $gt = array(
                        "1" => "Nam",
                        "2" => "Nữ",
                        "0" => "Không giới tính"
                    );
                    $object[$property] = $gt[$item["NeedSex"]];
                    break;
                case 'nameQuality': 
                    $object[$property] = $this->getNameQuality($item["quality"]);
                    break;
                case 'type':
                    $object[$property] = $this->getType($item["category_id"]);
                    break;
                case 'cat':
                    $object[$property] = $this->getCat($item["category_id"]);
                    break;
            }
        }
        return $object;
    }

    public function getPlugin($string, $info)
    {
        $listPlugin = json_decode($string);
        $object = array();
        for ($i=0; $i < count($listPlugin); $i++) { 
            $plugin = $listPlugin[$i];
            switch ($plugin) {
                case 'runtime':
                    $object[$plugin] = microtime(true) - $info["time"];
                    break;
            }
        }
        return $object;
    }

    public function getFilter($string, $state = true)
    {
        // $string = json_decode($string);
        $data = "";
        if(is_object($string)){
            foreach ($string as $key => $value) {
                if($data != "") $data .= " AND ";
                if(is_array($value)){
                    $listValue = implode("','", $value);
                    $data .= "$key ".(!$state ? "NOT" : "")." IN ('$listValue')";
                }else{
                    $value = htmlspecialchars(strip_tags($value));
                    $data .= "$key ".($state ? "=" : "<>")." '$value'";
                }
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
        $paging_arr["first"] = $page>1 ? "{$page_url}page=1" : "";
 
        // count all products in the database to calculate total pages
        $total_pages = ceil($total_rows / $records_per_page);
 
        // range of links to show
        $range = 2;
 
        // display links to 'range of pages' around 'current page'
        $initial_num = $page - $range;
        $condition_limit_num = ($page + $range)  + 1;
 
        $paging_arr['pages']=array();
        $page_count=0;
         
        for($x=$initial_num; $x<$condition_limit_num; $x++){
            // be sure '$x is greater than 0' AND 'less than or equal to the $total_pages'
            if(($x > 0) && ($x <= $total_pages)){
                $paging_arr['pages'][$page_count]["page"]=$x;
                $paging_arr['pages'][$page_count]["url"]="{$page_url}page={$x}";
                $paging_arr['pages'][$page_count]["current_page"] = $x==$page ? "yes" : "no";
 
                $page_count++;
            }
        }
 
        // button for last page
        $paging_arr["last"] = $page<$total_pages ? "{$page_url}page={$total_pages}" : "";
 
        // json format
        return $paging_arr;
    }
 
}