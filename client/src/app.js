// Fetch and display companies from the PostgreSQL database
async function fetchCompanies() {
    const response = await fetch('/api/companies');
    const companies = await response.json();
    const companyList = document.getElementById('companyList');
    companyList.innerHTML = companies.map(company => `
        <li class="card">
            <img src="assets/${company.logo}" alt="${company.name} logo">
            <h2>${company.name}</h2>
            <p>${company.mission}</p>
            <p><strong>Lobbying Spend:</strong> ${company.lobbying}M USD</p>
            <a href="/company/${company.id}">View Details</a>
        </li>
    `).join('');
}

// Initial fetch on page load
fetchCompanies();
