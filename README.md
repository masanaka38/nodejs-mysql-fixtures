nodejs-mysql-fixtures
=====================

node.js mysql-fixtures module.

## Install

	npm install mysql-fixtures

## Example

### sample.js

	var MySQLFixtures = require('mysql-fixtures');
	
	var config = {
        "host": "localhost",
        "user": "root",
        "password": "root",
        "database": "sample"
    };
	var fixtures = new MySQLFixtures(config);
	
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

