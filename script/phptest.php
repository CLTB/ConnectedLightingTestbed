<?php
	phpinfo();
	$connectionInfo = array("UID" => "ConnLghtTb@xs7joiu9pz", "pwd" => "SSLighting!", "Database" => "records", "LoginTimeout" => 30, "Encrypt" => 1);
	$serverName = "tcp:xs7joiu9pz.database.windows.net,1433";
	$conn = sqlsrv_connect($serverName, $connectionInfo);
?>