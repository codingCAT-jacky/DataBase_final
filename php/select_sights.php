<?php    
	include "db_conn.php";
	
	$SightName = "海大";
	$query = ("select * from sights where SightName = ?");
	$stmt =  $db->prepare($query);
	$error= $stmt->execute(array($SightName));
	$result = $stmt->fetchAll();
	//以上寫法是為了防止「sql injection」
	
	for($i=0; $i<count($result); $i++){
		echo "SightName:".$result[$i]['SightName'].' '.
			 "Description:". $result[$i]['Description'].' '.
			 "Address:".$result[$i]['Address'].' '.
			 "Zone:". $result[$i]['Zone'].' '.
			 "Category:". $result[$i]['Category'].' '.
			 "PhotoURL:". $result[$i]['PhotoURL'].' '.
			 '<br>'; 
	}
	?>