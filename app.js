const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');

const jackalData = {
    name: "Jackal",
    motto: "The open source programming language for all open source scientists",
    description: "Jackal is a dynamic, object-oriented interpreted programming language built from scratch in C. Designed for agility and cleverness, it explores the depths of language implementation with its own lexer, parser, and tree-walking evaluator.",
    vision: "Built by and for open source scientists and developers who want to learn, contribute, and shape the future of a language collaboratively.",
    features: [
        { title: "Dynamic Typing", desc: "No complex type declarations required. Just write and run." },
        { title: "Fully Object-Oriented", desc: "Support for classes, 'this', methods, and constructors." },
        { title: "First-Class Functions", desc: "Functions can be stored in variables, passed as arguments, and support closures." },
        { title: "Modern Data Structures", desc: "Easy to use array literals and manipulation." },
        { title: "Pattern Matching", desc: "Elegant conditional branching for complex logic." },
        { title: "C-Based Interpreter", desc: "Built from scratch in C for performance and educational depth." }
    ],
    releases: [
        {
            version: "0.1.0-beta",
            date: "November 5, 2025",
            label: "Current Release",
            highlights: "Initial public beta release of the Jackal interpreter.",
            changes: [
                { type: "New", text: "Core interpreter implemented in C (Lexer, Parser, Evaluator)." },
                { type: "New", text: "Basic dynamic typing system (Number, String, Boolean, Nil)." },
                { type: "New", text: "Object-Oriented support: class definitions, 'init' constructor, method calls." },
                { type: "New", text: "Control structures: if/else, while loops, C-style for loops." },
                { type: "New", text: "Pattern matching with 'match' expression." },
                { type: "New", text: "Standard I/O functions: print() and read()." }
            ]
        }
    ],
    repoLink: "https://github.com/alegarsio/Jackal-Projects"
};

app.get('/', (req, res) => {
    res.render('index', { data: jackalData });
});

if (require.main === module) {
    app.listen(port, () => {
        console.log(`Jackal landing page running locally at http://localhost:${port}`);
    });
}

module.exports = app;