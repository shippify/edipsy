Edipsy
===========

Decent EDI file parsing in Node.js.

## Defining file schema

File schemas are defined by each type of register existing in the file to be parsed.

In this example, there are three type of registers: `0`, `1` and `2`.

You should also set a type for the field data. The available types are `string`, `number` and `date`. If you use the `date` field type, please note you can define the date format using the `dateFormat` option.

```javascript
var EdiFile = require('../index').EdiFile;

var ediFile = new EdiFile({
	"0": [{
		name: 'user_name',
		start: 2,
		end: 17,
		type: 'string',
	}, {
		name: 'user_gender',
		start: 18,
		end: 18,
		type: 'string',
	}, {
		name: 'user_ssn',
		start: 19,
		end: 29,
		type: 'number',
	}, {
		name: 'user_born_at',
		start: 30,
		end: 38,
		type: 'date'
	}],
	"1": [{
		name: 'product_amount',
		start: 2,
		end: 7,
		type: 'number',
	}, {
		name: 'product_name',
		start: 8,
		end: 19,
		type: 'string',
	}, {
		name: 'product_bought_at',
		start: 20,
		end: 27,
		type: 'date'
	}],
	"2": [{
		name: 'products_amount',
		start: 2,
		end: 7,
		type: 'number',
	}, {
		name: 'products_count',
		start: 8,
		end: 10,
		type: 'number',
	}]
}, {
	dateFormat: "DDMMYYYY",
});
```

## Parsing a file

```javascript
var fileContent = '\
0JOHN APPLESEED  M1192171329619071996\n\
1300000MACBOOK AIR 11062015\n\
1150000IPHONE 6S   01082014\n\
2450000002';

var parsedFile = ediFile.parse(fileContent);
```

`parsedFile` will contain the parsed file separated by each type of register:

```javascript
{ '0': 
   [ { user_name: 'JOHN APPLESEED',
       user_gender: 'M',
       user_ssn: 11921713296,
       user_born_at: Fri Jul 19 1996 00:00:00 GMT-0700 (PDT) } ],
  '1': 
   [ { product_amount: 300000,
       product_name: 'MACBOOK AIR',
       product_bought_at: Thu Jun 11 2015 00:00:00 GMT-0700 (PDT) },
     { product_amount: 150000,
       product_name: 'IPHONE 6S',
       product_bought_at: Fri Aug 01 2014 00:00:00 GMT-0700 (PDT) } ],
  '2': [ { products_amount: 450000, products_count: 2 } ] }
```
