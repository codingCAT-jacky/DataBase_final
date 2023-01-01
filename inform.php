<?php    
	include "db_conn.php";
	
	$customer_city = "Taipei";
	$query = ("select * from customer where customer_city = ?");
	$stmt =  $db->prepare($query);
	$error= $stmt->execute(array($customer_city));
	$result = $stmt->fetchAll();
	//以上寫法是為了防止「sql injection」
	
	for($i=0; $i<count($result); $i++){
		echo "ID:".$result[$i]['ID'].' '.
			 "customer_name:". $result[$i]['customer_name'].' '.
			 "customer_street:".$result[$i]['customer_street'].' '.
			 "customer_city:". $result[$i]['customer_city'].' '.
			 '<br>'; 
	}
	?>