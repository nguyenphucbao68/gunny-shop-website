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

    // search products
    public function search($keywords, $ultimate = false, $from_record_num, $records_per_page, $filter = false, $stateEquipSort = false, $random = false, $group = false, $clause = false, $clauseShop = false){
        // $filter = $filter ? "AND ".$filter : '';
        $group = $group ? " GROUP BY `".$group."`" : '';
        $random = $random ? "ORDER BY RAND()" : '';
        // if($ultimate){
        //     $query = "SELECT * FROM `".$this->table_name."` WHERE name LIKE :keyword $filter $group $random  LIMIT :from, :limit";
        // }else{
        //     $query = "SELECT * FROM `".$this->table_name."` WHERE template_id IN (SELECT template_id FROM `$this->table_shop` ".($filterShop ? "WHERE ".$filterShop : "").") AND name LIKE :keyword $filter $group $random  LIMIT :from, :limit";
        // }
        
        if($ultimate){
            $query = "SELECT * FROM `$this->table_name` WHERE name LIKE :keyword ".($filter ? "AND $clause" : "")." $group $random LIMIT :from, :limit";
        }else{
            $query = "SELECT * FROM `$this->table_name` WHERE name LIKE :keyword AND template_id IN (SELECT template_id FROM `$this->table_shop` ".($clauseShop ? "WHERE ".$clauseShop : "").") ".($clause ? "AND ".$clause : "")." $group $random LIMIT :from, :limit";
            echo $query;
        };

        $stmt = $this->conn->prepare($query);

        
        // sanitize
        $keywords = htmlspecialchars(strip_tags($keywords));
        $keywords = "%{$keywords}%";
     
        // bind
        $stmt->bindParam(":keyword", $keywords);
        $stmt->bindValue(":from", $from_record_num, PDO::PARAM_INT);
        $stmt->bindValue(":limit", $records_per_page, PDO::PARAM_INT);

        // execute query
        $stmt->execute();
     
        return $stmt;
    }

    // read products
    public function read($ultimate = false, $from_record_num, $records_per_page, $filter = false, $stateEquipSort = false, $random = false, $group = false, $filterShop = false, $clause){
        // $filter = $filter ? "AND ".$filter : '';
       
        if($ultimate){
            $group = $group ? " GROUP BY `".$group."`" : '';
            $random = $random ? "ORDER BY RAND()" : '';
            if($stateEquipSort){
                if($random) throw new Exception("Do not randomly turn it on with `stateEquipSort` mode", 100);
                $query = "
                SELECT
                    CASE
                        WHEN template_id IN (SELECT template_id FROM `".$this->table_shop."`) THEN 0 ELSE 1
                    END AS state, ".$this->table_name.".*
                FROM `".$this->table_name."` 
                WHERE $filter
                ORDER BY state ASC 
                $group
                LIMIT :from, :limit
                ";
            }else{
                // echo $filter;
                $query = "SELECT * FROM `".$this->table_name."` WHERE ".($filter ? "WHERE $filter" : "")." $group $random  LIMIT :from, :limit";
            }
        }else{
            $group = $group ? " GROUP BY `".$group."`" : '';
            $random = $random ? "ORDER BY RAND()" : '';
            $query = "SELECT * FROM `$this->table_name` WHERE template_id IN (SELECT template_id FROM `$this->table_shop` ".($filterShop ? "WHERE ".$filterShop : "").") ".($clause ? "AND ".$clause : "")." $group $random LIMIT :from, :limit";
        };
        $stmt = $this->conn->prepare( $query );
        $stmt->bindValue(":from", $from_record_num, PDO::PARAM_INT);
        $stmt->bindValue(":limit", $records_per_page, PDO::PARAM_INT);

        $stmt->execute();
        return $stmt;
    }

    public function infoShop($tid){
        $query = "SELECT * FROM $this->table_shop WHERE template_id = :tid";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":tid", $tid);
        $stmt->execute();
        return $stmt;
    }

    public function find($find, $jointable)
    {   
        if(!$find) throw new Exception("Ban chua truyen vao thong tin cua vat pham de find.", 104);
        
        if($jointable){
           
            $query = "SELECT * FROM `".$this->table_name."` a, `".$this->table_shop."` b WHERE $find AND $jointable";
        }else{
            $query = "SELECT * FROM `".$this->table_name."` WHERE $find";
        }
        
        // prepare query statement
        $stmt = $this->conn->prepare( $query );
       
        // execute query
        $stmt->execute();
     
        // get retrieved row
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        return $row;
    }

    // used for paging products
    public function count($ultimate = false, $filter = null, $random = false, $group = false, $keywords = false, $clause = false, $clauseShop = false){
        
        $group = $group ? " GROUP BY `".$group."`" : '';
        $random = $random ? "ORDER BY RAND()" : '';
        // die('1');
        if($keywords){
            // $filter = $filter ? "WHERE ".$filter : '';
            // $query = "SELECT COUNT(*) AS total_rows FROM `".$this->table_name."` WHERE name LIKE :keyword $filter $group $random";
            

            if($ultimate){
                $query = "SELECT COUNT(*) as total_rows FROM `$this->table_name` WHERE name LIKE :keyword ".($filter ? "AND $clause" : "")." $group $random";

            }else{
                $query = "SELECT COUNT(*) as total_rows FROM `$this->table_name` WHERE name LIKE :keyword AND template_id IN (SELECT template_id FROM `$this->table_shop` ".($clauseShop ? "WHERE ".$clauseShop : "").") ".($clause ? "AND ".$clause : "")." $group $random";

                // echo "\n".$query;
                // exit;
            };
            $stmt = $this->conn->prepare( $query );
            $keywords = htmlspecialchars(strip_tags($keywords));
            $keywords = "%{$keywords}%";
            $stmt->bindParam(":keyword", $keywords);
        }else{
            if($ultimate){
                $query = "SELECT COUNT(*) as total_rows FROM `$this->table_name` ".($filter ? "WHERE $clause" : "")." $group $random";
            }else{
                $query = "SELECT COUNT(*) as total_rows FROM `$this->table_name` WHERE template_id IN (SELECT template_id FROM `$this->table_shop` ".($clauseShop ? "WHERE ".$clauseShop : "").") ".($clause ? "AND ".$clause : "")." $group $random";
            };
            // if($ultimate){
            //     $filter = $filter ? "WHERE ".$filter : '';
            //     $query = "SELECT COUNT(*) as total_rows FROM `".$this->table_name."` $filter $group $random";
            // }else{
            //     $filter = $filter ? "AND ".$filter : '';
            //     $query = "SELECT COUNT(*) as total_rows FROM `".$this->table_name."` WHERE template_id IN (SELECT template_id FROM `".$this->table_shop."`) $filter $group $random";
            // }
            $stmt = $this->conn->prepare( $query );
        };
        
        
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        return $row['total_rows'];
    }
}