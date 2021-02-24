const _ = require("lodash");
exports.buildInsertKeys = (registerID, parentPositions, tree) => {
	//1.Necesito el tipo para saber como construir el insert
	const nodeType = getNodeType(registerID, tree);

	let insert = [];

	// console.log("buildInsertKeys", nodeType);

	//3. Si es la raiz 000, su padre es null. Validar
	switch (nodeType) {
		case "root":
			insert = rootInsertKeys(tree.root);
			break;
		case "array":
			insert = arrayInsertKeys(parentPositions, registerID, tree);
			break;
		case "object":
			insert = objectInsertKeys(parentPositions, registerID, tree);
			break;
		default:
			break;
	}

	//2. Obtener las posiciones actuales de los padres de registerID
	// switch()
	//[root].fields = {}--INSERT 000(ROOT)
	//[root][310][0].fields = {} --INSERT 310=>(ARRAY)
	//[root][310][0][311][0].fields = {}--INSERT 311=>(ARRAY)
	//[root][310][0][311][0].312[0].fields = {}--INSERT 312=>(ARRAY)
	//[root][310][0][311][0][312][0].313[0].fields = {} --INSERT 313=>(ARRAY)
	//[root][310][0][311][0][312][0][313][0].333.fields = {} -- INSERT 333=>(OBJECT)

	return insert;
};

exports.setBuildInsertKeys = (registerID, parentPositions, tree) => {
	const nodeType = getNodeType(registerID, tree);
	switch (nodeType) {
		case "root":
			insert = rootInsertKeys(root);
			break;
		case "array":
			insert = arrayInsertKeys(parentPositions, registerID, tree);
			break;
		case "object":
			insert = objectInsertKeys(parentPositions, registerID, tree);
			break;
		default:
			break;
	}

	//Si es la raiz inserto primero
	// if(registerId === root){
	// 	_.set(registers,[root,"fields"],parsedLine)
	// 	break;
	// }

	// _.set(registers,[root,])
	// if (ocurrences[registerId].count > 1) {
	// 	_.set(registers, [...anthecesors, positionIdx, "fields"], parsedLine);
	// } else {
	// 	//es root
	// 	//buscar mis padres y
	// 	_.set(registers, [registerId, "fields"], parsedLine);
	// }
};

exports.resetRegisterPositions = (registerID, positions, tree) => {
	const newRegisterPositions = _.cloneDeep(positions);
	const anthecesors = _.cloneDeep(tree.nodes[registerID].anthecesors);

	anthecesors.push(registerID);

	_.each(newRegisterPositions, (child, key) => {
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
	// let registerOcurrences = 0;
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

const arrayInsertKeys = (currentParentPositions, registerID, tree) => {
	//2. Obtengo mis antecesores
	const anthecesors = _.cloneDeep(tree.nodes[registerID].anthecesors).reverse();
	// let reverseAnthecesors = anthecesors.reverse()
	let newKeySequence = [];
	const registerPosition = currentParentPositions[registerID];
	//anthecesors = [ '000', '310', '311', '312', '313', '20' ]
	//1.Recorro los antecesores y leo el antecesor actual
	//2. Busco en el objeto currentParentPositions su posición actual
	//3. En un nuevo array hago push del antecesor,currentAnthecesorPosition
	//4. Aumento la clave "fields" al final del nuevo array
	// console.log('currentParentPositions ',currentParentPositions)
	anthecesors.forEach((anthecesor) => {
		let currentAnthecesorPosition = currentParentPositions[anthecesor];
		// console.log('arrayInsertKeys: ',`${registerID}|${anthecesor}|${currentAnthecesorPosition}`)
		if (anthecesor === tree.root) {
			newKeySequence.push(anthecesor);
		} else {
			newKeySequence.push(anthecesor, currentAnthecesorPosition);
		}
	});

	newKeySequence.push(registerID, registerPosition, "fields");

	return newKeySequence;
};

const objectInsertKeys = (currentParentPositions, registerID, tree) => {
	//2. Obtengo mis antecesores
	const anthecesors = _.cloneDeep(tree.nodes[registerID].anthecesors).reverse();
	let newKeySequence = [];
	//[root][310][0][311][0][312][0][313][0].333.fields = {} -- INSERT 333=>(OBJECT)
	anthecesors.forEach((anthecesor) => {
		let currentAnthecesorPosition = currentParentPositions[anthecesor];
		if (anthecesor === tree.root) {
			newKeySequence.push(anthecesor);
		} else {
			newKeySequence.push(anthecesor, currentAnthecesorPosition);
		}
	});

	newKeySequence.push(registerID, "fields");

	return newKeySequence;
};
