const _ = require("lodash");
exports.buildInsertKeys = (registerID, positions, tree) => {
	//1.root, array [],object {}
	const nodeType = getNodeType(registerID, tree);

	let insert = [];

	switch (nodeType) {
		case "root":
			insert = rootInsertKeys(tree.root);
			break;
		case "array":
			insert = arrayInsertKeys(positions, registerID, tree);
			break;
		case "object":
			insert = objectInsertKeys(positions, registerID, tree);
			break;
		default:
			break;
	}
	return insert;
};

exports.setBuildInsertKeys = (registerID, positions, tree) => {
	const nodeType = getNodeType(registerID, tree);
	switch (nodeType) {
		case "root":
			insert = rootInsertKeys(root);
			break;
		case "array":
			insert = arrayInsertKeys(positions, registerID, tree);
			break;
		case "object":
			insert = objectInsertKeys(positions, registerID, tree);
			break;
		default:
			break;
	}
};

exports.resetRegisterPositions = (registerID, positions, tree) => {
	
	const newRegisterPositions = _.cloneDeep(positions);
	const anthecesors = _.cloneDeep(tree.nodes[registerID].anthecesors);

	anthecesors.push(registerID);

	_.each(newRegisterPositions, (position, key) => {
		if (!anthecesors.includes(key)) delete newRegisterPositions[key];
	});

	return newRegisterPositions;
};

exports.updateRegisterPosition = (registerID, positions) => {
	const newRegisterPositions = _.cloneDeep(positions);
	if (newRegisterPositions.hasOwnProperty(registerID)) {
		newRegisterPositions[registerID] += 1;
	} else {
		newRegisterPositions[registerID] = 0;
	}

	return newRegisterPositions;
};

exports.getFileLineEnding = (fileContent) => {
	var temp = fileContent.indexOf("\n");
	if (fileContent[temp - 1] === "\r") return "\r\n";
	return "\n";
};

const getNodeType = (registerID, tree) => {
	let nodeType = "";
	const registerOcurrences = parseInt(tree.nodes[registerID].ocurrences);

	const root = parseInt(tree.root);
	if (registerOcurrences > 1) {
		nodeType = "array";
	}
	if (registerOcurrences === 1) {
		nodeType = "object";
	}
	if (parseInt(registerID) === root) {
		nodeType = "root";
	}
	return nodeType;
};

const rootInsertKeys = (root) => {
	return [root, "fields"];
};

const arrayInsertKeys = (currentPositions, registerID, tree) => {
	const anthecesors = _.cloneDeep(tree.nodes[registerID].anthecesors).reverse();
	let newKeySequence = [];
	const registerPosition = currentPositions[registerID];

	anthecesors.forEach((anthecesor) => {
		let currentAnthecesorPosition = currentPositions[anthecesor];
		if (anthecesor === tree.root) {
			newKeySequence.push(anthecesor);
		} else {
			newKeySequence.push(anthecesor, currentAnthecesorPosition);
		}
	});

	newKeySequence.push(registerID, registerPosition, "fields");

	return newKeySequence;
};

const objectInsertKeys = (currentPositions, registerID, tree) => {
	const anthecesors = _.cloneDeep(tree.nodes[registerID].anthecesors).reverse();
	let newKeySequence = [];
	anthecesors.forEach((anthecesor) => {
		let currentAnthecesorPosition = currentPositions[anthecesor];
		if (anthecesor === tree.root) {
			newKeySequence.push(anthecesor);
		} else {
			newKeySequence.push(anthecesor, currentAnthecesorPosition);
		}
	});

	newKeySequence.push(registerID, "fields");

	return newKeySequence;
};
