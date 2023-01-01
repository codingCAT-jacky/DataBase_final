<?php    
	include "db_conn.php";
	
	$Account = $_GET['account'];
	$query = ("select * from account where Account = ?");
	$stmt =  $db->prepare($query);
	$error= $stmt->execute(array($Account));
	$result = $stmt->fetchAll();
	//以上寫法是為了防止「sql injection」

    $AccountArray = array();
	if(count($result)==0){   
        echo"error";   
    }
    else{
        for($i=0; $i<count($result); $i++){
            $sigleAccount  = array( 'Account'  =>  $result[$i]['Account'] );
            $AccountObject json_encode ( $sigleAccount ,  JSON_FORCE_OBJECT );
            $AccountArray[] = $AccountObject;
        }
    }
    echo json_encode($AccountArray);
	?>