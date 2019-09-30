const express = require('express');
const app = express();
const cors = require('cors');
const mathProblemGenerator = require('./math-problem-generator');

// Remove cors errors
app.use(cors());

// Handle GET requests to /api
app.get('/api/:numberOfProblems', function(req, res, next) {
    let generatedProblems;
    try{
        generatedProblems = mathProblemGenerator.generateBasicMathProblems(req.params.numberOfProblems, req.query.min, req.query.max);
        res.status(200).json({
            problems: generatedProblems
        });
    } catch (err) {
        next(err);
    }
});

// Handle errors
app.use((req, res, next) => {
    const err = new Error("Not found. Requests to the api should be framed as https://generate-math-problems.herokuapp.com/api/" +
        "{Number of problems to generate}?min=[Minimum number of operators]&max=[Maximum number of operators]");
    err.status = 404;
    next(err);
});
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message
        }
    });
});

module.exports = app;