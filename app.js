const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Vercel & Local support for views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const jackalData = {
    name: "Jackal",
    motto: "The open source programming language for all open source scientists",
    description: "Jackal is a dynamic, object-oriented interpreted programming language built from scratch in C. Designed for agility and cleverness, it explores the depths of language implementation.",
    vision: "Built by and for open source scientists and developers who want to learn, contribute, and shape the future of a language collaboratively.",
    features: [
        { title: "Dynamic Typing", desc: "No complex type declarations required." },
        { title: "Fully Object-Oriented", desc: "Classes, 'this', methods, and constructors." },
        { title: "First-Class Functions", desc: "Closures and functions as values." },
        { title: "Modern Data Structures", desc: "Array literals and manipulation." },
        { title: "Pattern Matching", desc: "Elegant conditional branching." },
        { title: "C-Based Interpreter", desc: "Built from scratch in C for performance." }
    ],
    releases: [
        {
            version: "0.1.0-beta",
            date: "November 5, 2025",
            label: "Current Release",
            highlights: "Initial public beta release of the Jackal interpreter.",
            changes: [
                { type: "New", text: "Core interpreter implemented in C." },
                { type: "New", text: "Basic dynamic typing system." },
                { type: "New", text: "Object-Oriented support (class, init, this)." },
                { type: "New", text: "Control structures (if, while, for)." },
                { type: "New", text: "Pattern matching with 'match'." },
                { type: "New", text: "Standard I/O: print() and read()." }
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
        console.log(`Jackal running locally at http://localhost:${port}`);
    });
}

module.exports = app;