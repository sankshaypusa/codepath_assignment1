import { pool } from '../config/database.js';

// Get all companies from the database
export const getCompanies = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM companies');
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

// Get a company by ID
export const getCompanyById = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await pool.query('SELECT * FROM companies WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Company not found' });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

// Create a new company
export const createCompany = async (req, res) => {
  const { name, industry, location, revenue, employeeCount, foundedOn } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO companies (name, industry, location, revenue, employeeCount, foundedOn) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [name, industry, location, revenue, employeeCount, foundedOn]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

// Update a company by ID
export const updateCompany = async (req, res) => {
  const id = req.params.id;
  const { name, industry, location, revenue, employeeCount, foundedOn } = req.body;
  try {
    const result = await pool.query(
      'UPDATE companies SET name = $1, industry = $2, location = $3, revenue = $4, employeeCount = $5, foundedOn = $6 WHERE id = $7 RETURNING *',
      [name, industry, location, revenue, employeeCount, foundedOn, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Company not found' });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

// Delete a company by ID
export const deleteCompany = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await pool.query('DELETE FROM companies WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Company not found' });
    }
    res.status(200).json({ message: `Company ${result.rows[0].name} deleted successfully` });
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};
