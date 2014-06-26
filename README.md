nodejs-mysql-fixtures
=====================

node.js mysql-fixtures module.

## Install

	npm install mysql-fixtures

## Example(Fixtures)

### sample_fixtures.js

	var MySQLFixtures = require('mysql-fixtures');
	
	var config = {
        "host": "localhost",
        "user": "root",
        "password": "root",
        "database": "sample"
    };
	var fixtures = MySQLFixtures.createFixtures(config);
	
	fixtures.create('fixtures/data.yaml', function() {}
		console.log('finish.');
	));

### fixtures/data.yaml
	user:
		u1:
			user_id : 1,
			name : 'Taro',
			age : 25
		
		u2:
			user_id : 2,
			name : 'Jiro',
			age : 19
	
	item:
		i1:
			item_id : 10,
			name : 'abcdef'	

## Example(Helper)

### sample_helper.js

	var MySQLFixtures = require('mysql-fixtures');
	
	var config = {
        "host": "localhost",
        "user": "root",
        "password": "root",
        "database": "sample"
    };
	var helper = MySQLFixtures.createHelper(config);
	
	helper.assert('select * from user order user_id', 'result/data.yaml', function() {}
		console.log('finish.');
	));

### result/data.yaml

	u1:
		user_id : 1,
		name : 'Taro',
		age : 25
	
	u2:
		user_id : 2,
		name : 'Jiro',
		age : 19



## History

* ver.0.1.1 Init.
* ver.0.1.2 Add Helper.