<?php
class Product{
 
    // database connection and table name
    private $conn;
    private $table_name = "qa_gunny_items";
    private $table_shop = "qa_gunny_shop";

    // object properties
    public $id;
    public $name;
    public $category_id;
    public $template_id;
    public $description;
    public $pic;
    public $quality;
    public $clever;
    public $style;
    public $agility;
    public $luck;
    public $NeedSex;

    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }

    // read products
    public function read($ultimate = false, $from_record_num, $records_per_page, $filter = null, $stateEquipSort = false, $random = false, $group = false){
        if($ultimate){
            if($stateEquipSort){
                if($random) throw new Exception("Do not randomly turn it on with `stateEquipSort` mode", 100);
                
                $query = "
                SELECT
                    CASE
                        WHEN template_id IN (SELECT template_id FROM `".$this->table_shop."`) THEN 0 ELSE 1
                    END AS state, ".$this->table_name.".*
                FROM `".$this->table_name."` 
                ".($filter ? "WHERE ".$filter : "")."
                ORDER BY state ASC 
                ".($group ? " GROUP BY ".$group : "")." 
                LIMIT ?, ?
                ";
            }else{
                $query = "SELECT * FROM `".$this->table_name."` ".($filter ? "WHERE ".$filter : "")." ".($random ? "ORDER BY RAND()" : "")." ".($group ? "GROUP BY ".$group : "")."  LIMIT ?, ?";
            }
            
        }else{
            $query = "SELECT * FROM `".$this->table_name."` WHERE template_id IN (SELECT template_id FROM `".$this->table_shop."`) ".($filter ? "AND ".$filter : "").($group ? " GROUP BY `".$group."`" : "")
                .($random ? " ORDER BY RAND()" : "")." LIMIT ?, ?";
        }
        
        // prepare query statement
        $stmt = $this->conn->prepare( $query );
     
        // bind variable values
        $stmt->bindParam(1, $from_record_num, PDO::PARAM_INT);
        $stmt->bindParam(2, $records_per_page, PDO::PARAM_INT);
     
        // execute query
        $stmt->execute();
        
        // return values from database
        return $stmt;
    }

    public function readOne()
    {

        $query = "SELECT * FROM `".$this->table_name."` WHERE id = ?";
     
        // prepare query statement
        $stmt = $this->conn->prepare( $query );
     
        // bind id of product to be updated
        $stmt->bindParam(1, $this->id);
     
        // execute query
        $stmt->execute();
     
        // get retrieved row
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        // set values to object properties
        $this->name = $row['name'];
        $this->category_id = $row['category_id'];
        $this->template_id = $row['template_id'];
        $this->description = $row['description'];
        $this->pic = $row['pic'];
        $this->quality = $row['quality'];
        $this->clever = $row['clever'];
        $this->style = $row['style'];
        $this->agility = $row['agility'];
        $this->luck = $row['luck'];
        $this->NeedSex = $row['NeedSex'];
    }

    // search products
    public function search($keywords){
        $query = "SELECT * FROM `".$this->table_name."` WHERE name LIKE ?";
        $stmt = $this->conn->prepare($query);
     
        // sanitize
        $keywords=htmlspecialchars(strip_tags($keywords));
        $keywords = "%{$keywords}%";
     
        // bind
        $stmt->bindParam(1, $keywords);
     
        // execute query
        $stmt->execute();
     
        return $stmt;
    }

    public function readPaging($from_record_num, $records_per_page){
        $query = "SELECT * FROM `".$this->table_name."` LIMIT ?, ?";

        // prepare query statement
        $stmt = $this->conn->prepare( $query );
     
        // bind variable values
        $stmt->bindParam(1, $from_record_num, PDO::PARAM_INT);
        $stmt->bindParam(2, $records_per_page, PDO::PARAM_INT);
     
        // execute query
        $stmt->execute();
     
        // return values from database
        return $stmt;
    }

    // used for paging products
    public function count($ultimate = false, $filter = null, $random = false, $group = false){
        if($ultimate){
            $query = "SELECT COUNT(*) as total_rows FROM `".$this->table_name."` ".($filter ? "WHERE ".$filter : "").($group ? " GROUP BY ".$group : "").($random ? " ORDER BY RAND()" : "");
        }else{
            $query = "SELECT COUNT(*) as total_rows FROM `".$this->table_name."` WHERE template_id IN (SELECT template_id FROM `".$this->table_shop."`) ".($filter ? "AND ".$filter : "").($group ? " GROUP BY ".$group : "").($random ? " ORDER BY RAND()" : "");
        }
        
        $stmt = $this->conn->prepare( $query );
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
     
        return $row['total_rows'];
    }
}