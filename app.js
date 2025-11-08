const express = require('express');
const path = require('path');
const axios = require('axios');
const app = express();
const port = 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(express.static(path.join(__dirname, 'public')));
// --- DEFAULT DATA (SAFE FALLBACK) ---
// Data ini WAJIB lengkap strukturnya agar tidak error di EJS
const defaultData = {
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
    repoLink: "https://github.com/alegarsio/Jackal-Projects",
    latestRelease: {
        version: "0.1.0-beta",
        date: "November 2025",
        label: "Beta Release",
        highlights: "Initial public release.",
        changes: [{ type: "NEW", text: "Core interpreter in C" }]
    },
    repoStats: {
        stars: 0,
        forks: 0,
        license: "MIT"
    },
    lastCommit: {
        message: "Loading...",
        date: "Recently",
        author: "Jackal Team",
        url: "https://github.com/alegarsio/Jackal-Projects/commits"
    }
};

// --- FETCH GITHUB DATA (ROBUST MODE) ---
async function fetchData() {
    // 1. Mulai dengan clone data default yang pasti aman
    let data = JSON.parse(JSON.stringify(defaultData));

    try {
        const headers = { 'User-Agent': 'Jackal-Landing-Page' };
        
        // 2. Gunakan allSettled agar satu error tidak mematikan semua request
        const results = await Promise.allSettled([
            axios.get('https://api.github.com/repos/alegarsio/Jackal-Projects', { headers, timeout: 3000 }),
            axios.get('https://api.github.com/repos/alegarsio/Jackal-Projects/releases/latest', { headers, timeout: 3000 }),
            axios.get('https://api.github.com/repos/alegarsio/Jackal-Projects/commits?per_page=1', { headers, timeout: 3000 })
        ]);

        const [repoRes, releaseRes, commitRes] = results;

        // 3. Update data HANYA jika request sukses (status === 'fulfilled')
        
        // --- Repo Stats ---
        if (repoRes.status === 'fulfilled') {
            data.repoStats = {
                stars: repoRes.value.data.stargazers_count,
                forks: repoRes.value.data.forks_count,
                license: repoRes.value.data.license ? repoRes.value.data.license.spdx_id : 'No License'
            };
        }

        // --- Latest Release ---
        if (releaseRes.status === 'fulfilled') {
            const release = releaseRes.value.data;
            let changes = defaultData.latestRelease.changes;
            let highlights = release.body ? release.body.split('\n')[0] : "Check GitHub for details.";

            if (release.body && release.body.includes('*')) {
                 changes = release.body.split('\n')
                    .filter(line => line.trim().startsWith('*') || line.trim().startsWith('-'))
                    .map(line => {
                        let text = line.replace(/^[*-]\s+/, '');
                        let type = "UPDATE";
                        const typeMatch = text.match(/^\[(.*?)\]\s*(.*)/);
                        if (typeMatch) { type = typeMatch[1]; text = typeMatch[2]; }
                        return { type, text };
                    });
            }

            data.latestRelease = {
                version: release.tag_name.replace('v', ''),
                date: new Date(release.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
                label: "Latest Release",
                highlights: highlights,
                changes: changes.length > 0 ? changes : defaultData.latestRelease.changes
            };
        }

        // --- Last Commit ---
        if (commitRes.status === 'fulfilled' && commitRes.value.data.length > 0) {
            const commit = commitRes.value.data[0];
            data.lastCommit = {
                message: commit.commit.message.split('\n')[0],
                date: new Date(commit.commit.author.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                author: commit.commit.author.name,
                url: commit.html_url
            };
        }

    } catch (error) {
        console.error("Critical Error in fetchData:", error.message);
        // Jika terjadi error fatal, 'data' masih berisi 'defaultData' yang aman.
    }

    // FINAL SAFETY CHECK: Pastikan lastCommit tidak null/undefined sebelum return
    if (!data.lastCommit) {
        data.lastCommit = defaultData.lastCommit;
    }

    return data;
}

app.get('/', async (req, res) => {
    const currentData = await fetchData();
    res.render('index', { data: currentData });
});
app.get('/docs', (req, res) => {
    res.render('docs', { data: defaultData }); // Menggunakan defaultData sementara
});

if (require.main === module) {
    app.listen(port, () => {
        console.log(`Jackal running locally at http://localhost:${port}`);
    });
}

module.exports = app;