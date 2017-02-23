var _ = require('lodash'),
	moment = require('moment');

var EdiFile = function(registers, options) {
	if(!registers) {
		throw new Error("Missing registers.");
	}

	if(!options) {
		options = {};
	}

	// Set default date format
	if(!options.dateFormat) {
		options.dateFormat = "YYYYMMDD";
	}

	// Set default registerId length
	if (!options.registerIdLen) {
		options.registerIdLen = 1;
	}

	// Sort registers by start position
	_.forIn(registers, function(registerArr, registerId, obj){
		obj[registerId] = _.sortBy(registerArr, 'start');
	});

	// Validate registers definition
	_.each(registers, function(fields){
		var previousFieldEnd = 0;

		_.each(fields, function(field, i){
			if (!field.end && !field.len) {
				throw new Error("All fields should have either end or len");
			}

			// First field shouldn't be the register ID.
			if(i == 0 && field.start != options.registerIdLen + 1) {
				throw new Error("First fields should start at " + (options.registerIdLen + 1));
			} else if(i != 0 && field.start != previousFieldEnd + 1) {
				throw new Error("Invalid start of field '" + field.name + "'.");
			}

			if (field.end) {
				previousFieldEnd = field.end;	
			} else {
				previousFieldEnd = field.start + field.len - 1;
			}
			
		});
	});

	this.registers = registers;
	this.options = options;
};

EdiFile.prototype.parse = function(fileContent) {
	var lines = fileContent.split("\n");

	var registers = {};

	_.each(lines, function(line){
		var registerId = line.substring(0, this.options.registerIdLen);
		var parsedLine = this.parseLineWithRegister(line, this.registers[registerId]);

		if(!registers[registerId]){
			registers[registerId] = [];
		}

		registers[registerId].push(parsedLine);
	}.bind(this));

	return registers;
};

EdiFile.prototype.parseLineWithRegister = function(line, fields) {
	var parsedLine = {};

	_.each(fields, function(field){
		var fieldContent = "";
		if (field.end) {
			fieldContent = line.substring(field.start - 1, field.end);
		} else {
			fieldContent = line.substring(field.start - 1, field.start + field.len - 1);
		}

		if(field.type == 'number') {
			fieldContent = parseInt(fieldContent);
		} else if(field.type == 'string') {
			fieldContent = ('' + fieldContent).trim();
		} else if(field.type == 'date') {
			fieldContent = moment(fieldContent, this.options.dateFormat).toDate();
		}

		parsedLine[field.name] = fieldContent;
	}.bind(this));

	return parsedLine;
};

module.exports = EdiFile;
