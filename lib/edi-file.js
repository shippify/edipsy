var _ = require("lodash"),
	moment = require("moment");
const {
	buildInsertKeys,
	updateRegisterPosition,
	resetRegisterPositions,
	getFileLineEnding,
} = require("../helpers/complex-file");

var EdiFile = function (registers, options) {
	if (!registers) {
		throw new Error("Missing registers.");
	}

	if (!options) {
		options = {};
	}

	// Set default date format
	if (!options.dateFormat) {
		options.dateFormat = "YYYYMMDD";
	}

	// Set default registerId length
	if (!options.registerIdLen) {
		options.registerIdLen = 1;
	}
	// Set default tree structure

	if (!options.tree) {
		options.tree = {};
	}
	// Sort registers by start position
	_.forIn(registers, function (registerArr, registerId, obj) {
		// Add default start if it doesn't exist
		const startExists = registerArr.every((props) => !!props.start);

		if (startExists) {
			obj[registerId] = _.sortBy(registerArr, "start");
			return;
		}

		obj[registerId] = registerArr.reduce((prevProps, props) => {
			const newprops = Object.assign({}, props);

			if (prevProps.length == 0) {
				newprops.start = parseInt(options.registerIdLen) + 1;
			} else {
				newprops.start =
					prevProps[prevProps.length - 1].start +
					prevProps[prevProps.length - 1].len;
			}

			prevProps.push(newprops);
			return prevProps;
		}, []);
	});

	// Validate registers definition
	_.each(registers, function (fields) {
		var previousFieldEnd = 0;
		_.each(fields, function (field, i) {
			if (!field.end && !field.len) {
				throw new Error("All fields should have either end or len");
			}

			// First field shouldn't be the register ID.
			if (i == 0 && field.start != parseInt(options.registerIdLen) + 1) {
				throw new Error(
					"First fields should start at " +
						(parseInt(options.registerIdLen) + 1)
				);
			} else if (i != 0 && field.start != previousFieldEnd + 1) {
				console.log(`START: ${field.start}`);
				throw new Error(
					"Invalid start of field '" + JSON.stringify(field) + "'."
				);
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

EdiFile.prototype.parse = function (fileContent) {
	const lineEnding = ((fileContent) => {
		var temp = fileContent.indexOf("\n");
		if (fileContent[temp - 1] === "\r") return "\r\n";
		return "\n";
	})(fileContent);

	var lines = fileContent.split(lineEnding);

	var registers = {};
	_.each(
		lines,
		function (line) {
			var registerId = line.substring(0, this.options.registerIdLen);
			var parsedLine = this.parseLineWithRegister(
				line,
				this.registers[registerId]
			);

			if (!registers[registerId]) {
				registers[registerId] = [];
			}

			registers[registerId].push(parsedLine);
		}.bind(this)
	);

	return registers;
};

EdiFile.prototype.parseComplexFile = function (fileContent) {
	const lineEnding = getFileLineEnding(fileContent);

	const lines = fileContent.split(lineEnding);

	const tree = this.options.tree;

	let registers = {};

	let registerPositions = {};

	_.each(
		lines,
		function (line) {
			var registerId = line.substring(0, this.options.registerIdLen).trim();
			let currentRegister = this.registers[registerId];
			var parsedLine = this.parseLineWithRegister(line, currentRegister);

			if (registerId !== "") {
				registerPositions = updateRegisterPosition(
					registerId,
					registerPositions
				);

				registerPositions = resetRegisterPositions(
					registerId,
					registerPositions,
					tree
				);

				let insertSequence = buildInsertKeys(
					registerId,
					registerPositions,
					tree
				);

				_.set(registers, insertSequence, parsedLine);
			}
		}.bind(this)
	);

	return registers;
};

EdiFile.prototype.parseLineWithRegister = function (line, fields) {
	var parsedLine = {};

	_.each(
		fields,
		function (field) {
			var fieldContent = "";
			if (field.end) {
				fieldContent = line.substring(field.start - 1, field.end);
			} else {
				fieldContent = line.substring(
					field.start - 1,
					field.start + field.len - 1
				);
			}

			if (field.type == "number") {
				if (field.decimals) {
					var idxDec = field.decimals * -1;
					fieldContent = parseFloat(
						fieldContent.slice(0, idxDec) + "." + fieldContent.slice(idxDec)
					);
				} else {
					fieldContent = parseInt(fieldContent);
				}
			} else if (field.type == "string") {
				fieldContent = ("" + fieldContent).trim();
			} else if (field.type == "date") {
				fieldContent = moment(fieldContent, this.options.dateFormat).toDate();
			}
			parsedLine[field.name] = fieldContent;
		}.bind(this)
	);

	return parsedLine;
};

/*
[
	{id: '000', properties: {} },
]
*/

EdiFile.prototype.edify = function (customRegisters) {
	var registers = this.registers;
	var fieldsToString = this.fieldsToString;
	var lines = [];

	_.each(customRegisters, function (cRegister) {
		var registerId = cRegister.id;
		var parsedLine = fieldsToString(
			cRegister.properties,
			registers[registerId]
		);
		lines.push(registerId + parsedLine);
	});

	return lines.join("\n");
};

EdiFile.prototype.fieldsToString = function (properties, fields) {
	var line = "";

	_.each(
		fields,
		function (field) {
			var fieldContent = "";
			var numberOfCharacters = 0;
			if (field.end) {
				numberOfCharacters = field.end - field.start + 1;
			} else {
				numberOfCharacters = field.len;
			}

			if (!_.has(properties, field.name)) {
				throw new Error(
					"Field is not present. Field:" +
						field.name +
						" Properties:" +
						JSON.stringify(properties)
				);
			}

			if (field.type == "string") {
				if (properties[field.name].length > numberOfCharacters) {
					throw new Error(
						"Content has more characters than the limit. Field: " +
							field.name +
							" Content: " +
							properties[field.name]
					);
				}

				fieldContent =
					properties[field.name] +
					new Array(
						numberOfCharacters - properties[field.name].length + 1
					).join(" ");
			} else if (field.type == "number") {
				var numberOfDecimals = 0;
				if (field.decimals) {
					numberOfDecimals = field.decimals;
				}

				var strNumber = properties[field.name]
					.toFixed(numberOfDecimals)
					.replace(".", "");

				if (strNumber.length > numberOfCharacters) {
					throw new Error(
						"Content has more numbers than the limit. Field: " +
							field.name +
							" Content: " +
							properties[field.name]
					);
				}

				fieldContent =
					new Array(numberOfCharacters - strNumber.length + 1).join("0") +
					strNumber;
			} else if (field.type == "date") {
				fieldContent = moment(properties[field.name]).format(
					this.options.dateFormat
				);

				if (fieldContent.length != numberOfCharacters) {
					throw new Error(
						"Content has more characters than the limit. Field: " +
							field.name +
							" Content: " +
							properties[field.name]
					);
				}
			}

			line += fieldContent;
		}.bind(this)
	);

	return line;
	/*

	*/
};

module.exports = EdiFile;
