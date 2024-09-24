const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Static assets like CSS and images
app.use(express.static(path.join(__dirname, 'public')));

// Sample company data
const companies = [
    { id: 1, name: 'Facebook', logo: 'facebook.png', mission: 'To bring the world closer together.', lobbying: '$20M', diversityScore: 65, environmentalResponsibility: 45, politicalIntrigue: 70 },
    { id: 2, name: 'Apple', logo: 'apple.png', mission: 'To create the best products.', lobbying: '$10M', diversityScore: 80, environmentalResponsibility: 90, politicalIntrigue: 50 },
    { id: 3, name: 'Amazon', logo: 'amazon.png', mission: 'To be Earth’s most customer-centric company.', lobbying: '$18M', diversityScore: 70, environmentalResponsibility: 55, politicalIntrigue: 80 },
    { id: 4, name: 'Netflix', logo: 'netflix.png', mission: 'To entertain the world.', lobbying: '$5M', diversityScore: 75, environmentalResponsibility: 60, politicalIntrigue: 30 },
    { id: 5, name: 'Google', logo: 'google.png', mission: 'To organize the world’s information.', lobbying: '$12M', diversityScore: 85, environmentalResponsibility: 95, politicalIntrigue: 65 }
];

// Helper function to filter companies based on scores
function filterCompanies(query) {
    return companies.filter(company => {
        return (!query.diversityScore || company.diversityScore >= query.diversityScore) &&
               (!query.environmentalResponsibility || company.environmentalResponsibility >= query.environmentalResponsibility) &&
               (!query.politicalIntrigue || company.politicalIntrigue <= query.politicalIntrigue);
    });
}

// Home route - Displays company list with filters
app.get('/', (req, res) => {
    const { diversityScore, environmentalResponsibility, politicalIntrigue } = req.query;
    const filteredCompanies = filterCompanies({
        diversityScore: diversityScore ? parseInt(diversityScore) : null,
        environmentalResponsibility: environmentalResponsibility ? parseInt(environmentalResponsibility) : null,
        politicalIntrigue: politicalIntrigue ? parseInt(politicalIntrigue) : null
    });

    const companyListHtml = filteredCompanies.map(company => `
        <li class="card">
            <img src="/images/${company.logo}" alt="${company.name} logo">
            <h2>${company.name}</h2>
            <p>${company.mission}</p>
            <a href="/company/${company.id}">View Details</a>
        </li>
    `).join('');

    res.send(`
        <html>
        <head>
            <title>Social Responsibility Index</title>
            <link rel="stylesheet" href="https://unpkg.com/picocss">
            <link rel="stylesheet" href="/styles.css">
        </head>
        <body>
            <header>
                <h1>Social Responsibility Index</h1>
                <p>Find out which companies lead the way in social responsibility.</p>
            </header>
            <main>
                <form>
                    <label for="diversityScore">Min Diversity Score:</label>
                    <input type="number" id="diversityScore" name="diversityScore" value="${diversityScore || ''}" placeholder="e.g., 70">
                    
                    <label for="environmentalResponsibility">Min Environmental Responsibility:</label>
                    <input type="number" id="environmentalResponsibility" name="environmentalResponsibility" value="${environmentalResponsibility || ''}" placeholder="e.g., 50">
                    
                    <label for="politicalIntrigue">Max Political Intrigue:</label>
                    <input type="number" id="politicalIntrigue" name="politicalIntrigue" value="${politicalIntrigue || ''}" placeholder="e.g., 70">
                    
                    <button type="submit">Filter</button>
                </form>
                
                <ul>
                    ${companyListHtml}
                </ul>
            </main>
            <footer>
                <p>&copy; 2024 Social Responsibility Index</p>
            </footer>
        </body>
        </html>
    `);
});

// Company details route
app.get('/company/:id', (req, res) => {
    const company = companies.find(c => c.id == req.params.id);
    if (company) {
        res.send(`
            <html>
            <head>
                <title>${company.name}</title>
                <link rel="stylesheet" href="https://unpkg.com/picocss">
                <link rel="stylesheet" href="/styles.css">
            </head>
            <body>
                <header>
                    <h1>${company.name}</h1>
                </header>
                <main class="detail">
                    <img src="/images/${company.logo}" alt="${company.name}">
                    <p><strong>Mission:</strong> ${company.mission}</p>
                    <p><strong>Lobbying Spend in 2021:</strong> ${company.lobbying}</p>
                    <p><strong>Diversity Score:</strong> ${company.diversityScore}%</p>
                    <p><strong>Environmental Responsibility:</strong> ${company.environmentalResponsibility}%</p>
                    <p><strong>Political Intrigue:</strong> ${company.politicalIntrigue}%</p>
                </main>
                <footer>
                    <a href="/">Go Back to Home</a>
                </footer>
            </body>
            </html>
        `);
    } else {
        res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
    }
});

// 404 route
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
