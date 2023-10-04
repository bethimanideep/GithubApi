const express = require('express')
const router = express.Router()
const axios = require('axios');
const { GitHubRepo } = require('../Model/data.model');

router.post('/github', async (req, res) => {
    try {
        const { url } = req.body;
        const response = await axios.get(url);
        const githubData = response.data;
        if (!Array.isArray(githubData) && githubData.length == 0) return res.status(400).json({ error: 'Invalid or empty GitHub data provided.' });
        for (const githubRepo of githubData) {
            const transformedRepo = {
                id: githubRepo.id,
                name: githubRepo.name,
                html_url: githubRepo.html_url,
                description: githubRepo.description,
                created_at: githubRepo.created_at,
                open_issues: githubRepo.open_issues,
                watchers: githubRepo.watchers,
                owner: {
                    id: githubRepo.owner.id,
                    avatar_url: githubRepo.owner.avatar_url,
                    html_url: githubRepo.owner.html_url,
                    type: githubRepo.owner.type,
                    site_admin: githubRepo.owner.site_admin
                }
            };
            // Use findOneAndUpdate to create or update the repository
            await GitHubRepo.findOneAndUpdate({ id: githubRepo.id }, transformedRepo, {
                upsert: true,
                new: true
            });
        }
        res.status(201).json({ message: 'GitHub data saved successfully.' });
    } catch (error) {
        console.error('Error saving GitHub data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

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


module.exports = router