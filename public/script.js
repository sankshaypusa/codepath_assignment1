document.addEventListener('DOMContentLoaded', () => {
    fetchCompanies();

    // Event listener for form submission to add a new company
    const addCompanyForm = document.getElementById('addCompanyForm');
    addCompanyForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('companyName').value;
        const industry = document.getElementById('industry').value;
        const attribute = document.getElementById('attribute').value;
        const description = document.getElementById('description').value;

        try {
            await fetch('/add-company', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, industry, attribute, description }),
            });

            // Clear the form
            addCompanyForm.reset();

            // Refresh the companies list
            fetchCompanies();
        } catch (error) {
            console.error('Error adding company:', error);
        }
    });
});

// Function to fetch and display companies
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
    companyList.innerHTML = ''; // Clear the current list

    companies.forEach(company => {
        const li = document.createElement('li');
        li.textContent = `${company.name} - ${company.industry} (${company.attribute}): ${company.description}`;
        companyList.appendChild(li);
    });
}

// Function to search through companies
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
