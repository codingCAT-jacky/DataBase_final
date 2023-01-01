<?php    
	include "db_conn.php";
	
	
	$query = ("select * from sights");
	$stmt =  $db->prepare($query);
	$error= $stmt->execute(array());
	$result = $stmt->fetchAll();
	//以上寫法是為了防止「sql injection」

    $SightArray = array();
	if(count($result)==0){   
        echo "no sights";   
    }
    else{
        for($i=0; $i<count($result); $i++){
           
            $SightObject =  array( 'SightName'  =>  $result[$i]['SightName'], 'Description'  =>  $result[$i]['Description'],
                                     'Address'  =>  $result[$i]['Address'], 'Zone'  =>  $result[$i]['Zone'], 'Count'  =>  $result[$i]['Count'],
                                     'Category'  =>  $result[$i]['Category'], 'PhotoURL'  =>  $result[$i]['PhotoURL']);
            $SightArray[] = $SightObject;
        }
    }
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($SightArray, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
?>
