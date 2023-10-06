const express = require('express');
const router = express.Router();
const axios = require('axios');
const { GitHubRepo } = require('../Model/data.model');

/**
 * @swagger
 * /github:
 *   post:
 *     summary: Save GitHub data
 *     description: Fetches and saves GitHub repository data.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               url:
 *                 type: string
 *                 description: The GitHub API URL to fetch data.
 *             example:
 *               url: https://api.github.com/users/mralexgray/repos
 *     responses:
 *       201:
 *         description: GitHub data saved successfully.
 *       400:
 *         description: Invalid or empty GitHub data provided.
 *       500:
 *         description: Internal server error.
 */
router.post('/github', async (req, res) => {
  try {
    const { url } = req.body;
    const response = await axios.get(url);
    const githubData = response.data;
    if (!Array.isArray(githubData) || githubData.length === 0)
      return res.status(400).json({ error: 'Invalid or empty GitHub data provided.' });
    for (const githubRepo of githubData) {
      // Your existing code for saving GitHub data
    }
    res.status(201).json({ message: 'GitHub data saved successfully.' });
  } catch (error) {
    console.error('Error saving GitHub data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * @swagger
 * /github/{id}:
 *   get:
 *     summary: Get GitHub repository by ID
 *     description: Retrieve GitHub repository data by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the GitHub repository.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: GitHub repository data retrieved successfully.
 *       404:
 *         description: GitHub repository not found.
 *       500:
 *         description: Internal server error.
 */
router.get('/github/:id', async (req, res) => {
  try {
    const repoId = req.params.id;
    const githubRepo = await GitHubRepo.findOne({ id: repoId });

    if (!githubRepo) {
      res.status(404).json({ error: 'GitHub repository not found.' });
    } else {
      res.json(githubRepo);
    }
  } catch (error) {
    console.error('Error retrieving GitHub data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
