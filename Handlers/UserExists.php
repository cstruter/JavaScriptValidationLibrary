<?php header('Content-Type: application/json');

sleep(2);

$result = array('isValid' => false); // simulate load

if ((isset($_GET['value']))) {
	if (strtolower($_GET["value"]) == 'christoff@cstruter.com') // simulate existing user
		$result['message'] = 'User already exists';
	else
		$result['isValid'] = true;
}

echo json_encode($result);

?>