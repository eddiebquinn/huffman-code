function Node(prob, symbol, left = null, right = null) {
    this.prob = prob;
    this.symbol = symbol;
    this.left = left;
    this.right = right;

    this.code = null;
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
}

function encode(input, coding) {
    let output_array = []

    for (let i = 0; i < input.length; i++) {
        console.log(coding[input[i]])
        output_array.push(input[i])
    }
    return_str = output_array.join("");
    return return_str
}

function META_ENCODE(data) {
    symbol_probs = calc_prob(data);
    symbols = Object.keys(symbol_probs);
    probs = Object.values(symbol_probs)
    console.log("symbols:" + symbols)
    console.log("probabilities:" + [probs])

    nodes = []

    for (let s of symbols) {
        nodes.push(Node(symbol_probs[s], s))
    }


}