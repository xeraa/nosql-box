<?php
	$dbhost = 'localhost';
	$dbport = 27017;
	$dbname = 'php';

	$m = new MongoClient("mongodb://$dbhost:$dbport");
	$db = $m->$dbname;

	$user = array(
		'first_name' => 'Philipp',
		'last_name' => 'Krenn',
		'tags' => array('developer', 'user')
	);

	$c_users = $db->users;
	$c_users->remove();

	var_dump($c_users->findOne());
	print('<br>');
	$c_users->save($user);
	var_dump($c_users->findOne(array('first_name' => 'Philipp')));
	print('<br>');

	// This will only dump the cursor
	var_dump($c_users->find()->limit(1));
	print('<br>');

	$users = $c_users->find(array(), array('first_name' => 'Philipp'))->limit(1);
	foreach ($users as $user) {
		var_dump($user);
		print('<br>');
	}

	print($c_users->count());
