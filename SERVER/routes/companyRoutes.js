const express = require('express');

module.exports = (pool) => {
    const router = express.Router();

    // Get all companies
    router.get('/', async (req, res) => {
        try {
            const result = await pool.query('SELECT * FROM companies');
            res.json(result.rows);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    // Get company by ID
    router.get('/:id', async (req, res) => {
        const id = req.params.id;
        try {
            const result = await pool.query('SELECT * FROM companies WHERE id = $1', [id]);
            if (result.rows.length) {
                res.json(result.rows[0]);
            } else {
                res.status(404).json({ error: 'Company not found' });
            }
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });
    // Route to update a company by ID
router.put('/:id', CompaniesController.updateCompany);

// Route to delete a company by ID
router.delete('/:id', CompaniesController.deleteCompany);

    return router;
};
