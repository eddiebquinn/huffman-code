function Node(prob, symbol, left = null, right = null) {
    this.prob = prob;
    this.symbol = symbol;
    this.left = left;
    this.right = right;

    this.code = '';
}

function calc_prob(str) {
    let symbols = {};

    for (let i = 0; i < str.length; i++) {
        if (!(str[i] in symbols)) {
            symbols[str[i]] = 1;
        }
        else {
            symbols[str[i]] += 1;
        }
    }

    return symbols;
}

let codes = {}
function calc_codes(node, val = '') {
    let nVal = val + node.code;

    if (node.left !== null) {
        calc_codes(node.left, nVal);
    }
    if (node.right !== null) {
        calc_codes(node.right, nVal)
    }

    if (node.left === null && node.right === null) {
        codes[node.symbol] = nVal
    }
    return codes
}

function encode(input, coding) {
    let output_array = []

    for (let i = 0; i < input.length; i++) {
        console.log(coding[input[i]])
        output_array.push(coding[input[i]])
    }
    let return_str = output_array.join("");
    return return_str;
}

function META_ENCODE(data) {
    symbol_probs = calc_prob(data);
    symbols = Object.keys(symbol_probs);
    probs = Object.values(symbol_probs);
    console.log("symbols:" + symbols);
    console.log("probabilities:" + [probs]);

    let nodes = []

    for (let s of symbols) {
        nodes.push(new Node(symbol_probs[s], s));
    }

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

    let huffman_encoding = calc_codes(nodes[0]);
    console.log(huffman_encoding);
    let encoded_output = encode(data, huffman_encoding);
    console.log("Encoded output: " + encoded_output);
    return encoded_output, nodes[0];
}

if (require.main === module) {
    META_ENCODE("AAAAAAAAAAABBBBBCCC");
}