// Default minimum number of operators
const defaultMinOperators = 2;

// Default number by which the minimum number of operators is to be incremented by to generate the default maximum
// number of operators
const defaultMaxOperatorsIncrement = 1;

// The range limits for the number of math problems that can be generated
const minNumOfProblems = 1;
const maxNumOfProblems = 250;

// The range limits for the number of operators included in the math problems
const minNumOperators = 1;
const maxNumOperators = 20;

// The range limits for the numbers included in the math problems
const minNumber = 1;
const maxNumber = 12;

// The types of operators that can be included in the math problems
const operators = ["-", "+", "/", "*"];

// Returns random integer between min (inclusive) and max (inclusive)
function generateRandomInteger(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Returns a random basic math problem based on the input parameters specifying the minimum and maximum number of
// operators
function generateBasicMathProblem(minOperators, maxOperators){
    let numOperators = generateRandomInteger(minOperators, maxOperators);
    let mathProblem = "" + generateRandomInteger(minNumber, maxNumber);
    for(; numOperators > 0; numOperators--) {
        mathProblem += (" " + operators[generateRandomInteger(0, operators.length - 1)] + " " +
            generateRandomInteger(minNumber, maxNumber));
    }
    return mathProblem;
}

module.exports = {
    // Returns an array of basic math problems based on the input parameter specifying the number of problems to generate
    // and the optional parameters specifying the minimum and maximum number of operators
    generateBasicMathProblems: function(numberOfProblems, minOperators, maxOperators){

        // Check input parameter: Number of problems to generate
        let numProblems = Number(numberOfProblems);
        if(isNaN(numProblems) || !Number.isInteger(numProblems) || (numProblems < minNumOfProblems) ||
            (numProblems > maxNumOfProblems)){
            throw new Error(" The specified number of problems to generate has to be an integer >= " +
                minNumOfProblems + " and <= " + maxNumOfProblems);
        }

        // Check optional input parameters: Minimum and maximum number of operators
        let minOp;
        if(minOperators === undefined){
            minOp = defaultMinOperators;
        }
        else{
            minOp = Number(minOperators);
            if(isNaN(minOp) || !Number.isInteger(minOp) || (minOp < minNumOperators)){
                throw new Error("The specified minimum number of operators has to be an integer >= " + minNumOperators);
            }
        }
        let maxOp;
        if(maxOperators === undefined){
            maxOp = minOp + defaultMaxOperatorsIncrement;
            if(maxOp > maxNumOperators){
                maxOp = minOp;
            }
        }
        else{
            maxOp = Number(maxOperators);
            if(isNaN(maxOp) || !Number.isInteger(maxOp) || (maxOp < minNumOperators)){
                throw new Error("The specified maximum number of operators has to be an integer >= " + minNumOperators);
            }
        }
        if(minOp > maxOp){
            throw new Error("The specified maximum number of operators has to be >= to the specified " +
                "minimum number of operators");
        }

        if((minOp > maxNumOperators) || (maxOp > maxNumOperators)){
            throw new Error("The specified minimum and/or maximum number of operators has to be <= " +
                maxNumOperators);
        }

        // Generate an array of basic math problems
        let mathProblems = [];
        for(; numProblems > 0; numProblems--){
            mathProblems.push(generateBasicMathProblem(minOp, maxOp));
        }
        return mathProblems;
    }
};