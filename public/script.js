document.addEventListener('DOMContentLoaded', () => {
    fetchCompanies();
});

async function fetchCompanies() {
    try {
        const response = await fetch('/companies');
        const companies = await response.json();
        displayCompanies(companies);
    } catch (error) {
        console.error('Error fetching companies:', error);
    }
}

function displayCompanies(companies) {
    const companyList = document.getElementById('companyList');
    companyList.innerHTML = ''; // Clear previous entries

    companies.forEach(company => {
        const li = document.createElement('li');
        li.textContent = `${company.name} - ${company.industry} (${company.attribute})`;
        companyList.appendChild(li);
    });
}

function searchCompanies() {
    const searchValue = document.getElementById('companySearch').value.toLowerCase();
    const companies = document.querySelectorAll('#companyList li');

    companies.forEach(company => {
        if (!company.textContent.toLowerCase().includes(searchValue)) {
            company.style.display = 'none';
        } else {
            company.style.display = 'block';
        }
    });
}
