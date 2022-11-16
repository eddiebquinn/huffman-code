function Node(prob, symbol, left = null, right = null) {
    this.prob = prob;
    this.symbol = symbol;
    this.left = left;
    this.right = right;

    this.code = '';
}

function Tree(data) {
    this.data = data;
    this.probs = calc_prob(this.data);
    this.root = build_tree(this.probs);
    this.codes = calc_codes(this.root);

    this.encode = function encode() {
        let output_array = []
        for (let i of data)
            output_array.push(this.codes[i])
        return output_array.join("");
    }
}

function calc_prob(str) {
    let symbols = {};

    for (let i of str) {
        if (!(i in symbols))
            symbols[i] = 1;
        else
            symbols[i] += 1;
    }

    return symbols;
}

let codes = {}
function calc_codes(node, val = '') {
    let nVal = val + node.code;

    if (node.left !== null)
        calc_codes(node.left, nVal);
    if (node.right !== null)
        calc_codes(node.right, nVal)
    if (node.left === null && node.right === null)
        codes[node.symbol] = nVal
    return codes
}

function build_tree(symbol_probs) {
    let nodes = []

    for (let s of Object.keys(symbol_probs))
        nodes.push(new Node(symbol_probs[s], s));

    while (nodes.length > 1) {
        // This sorts all the nodes with smallest prob first, may need to switch up however
        nodes.sort((a, b) => (a.prob > b.prob ? 1 : -1));

        // Pick two smallest nodes
        let tright = nodes[0];
        let tleft = nodes[1];

        // Add relevant code
        tleft.code = 1;
        tright.code = 0;

        // Create new node that combines previous two
        let NewNode = new Node(tleft.prob + tright.prob, tleft.symbol + tright.symbol, tleft, tright);

        // Remove first two elements from array
        nodes.splice(0, 2);

        // Add new node to list
        nodes.push(NewNode);
    }
    return nodes[0];
}

let data = "AAAAAAAAAAABBBBBCCC";
let HuffTree = new Tree(data);
console.log("Symbol Probs: " + JSON.stringify(HuffTree.probs, null))
console.log("Symbol Codes: " + JSON.stringify(HuffTree.codes, null));
console.log("Encoded output: " + HuffTree.encode());