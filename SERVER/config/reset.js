import { pool } from './database.js';
import './dotenv.js';
import companyData from '../data/companies.js';  // Ensure you have company data available

const createCompaniesTable = async () => {
    const createTableQuery = `
        DROP TABLE IF EXISTS companies;

        CREATE TABLE IF NOT EXISTS companies (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            industry VARCHAR(100),
            description TEXT,
            location VARCHAR(255),
            founded DATE,
            revenue NUMERIC,
            employees INTEGER
        )
    `;

    try {
        const res = await pool.query(createTableQuery);
        console.log('🎉 Companies table created successfully');
    } catch (err) {
        console.error('⚠️ Error creating companies table', err);
    }
};

const seedCompaniesTable = async () => {
    await createCompaniesTable();

    companyData.forEach((company) => {
        const insertQuery = {
            text: 'INSERT INTO companies (name, industry, description, location, founded, revenue, employees) VALUES ($1, $2, $3, $4, $5, $6, $7)',
        };

        const values = [
            company.name,
            company.industry,
            company.description,
            company.location,
            company.founded,
            company.revenue,
            company.employees
        ];

        pool.query(insertQuery, values, (err, res) => {
            if (err) {
                console.error('⚠️ Error inserting company', err);
                return;
            }

            console.log(`✅ ${company.name} added successfully`);
        });
    });
};

seedCompaniesTable();
