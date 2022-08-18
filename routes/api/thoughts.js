const router = require("express").Router();
const { User, Thought } = require("../../models");

// Get all thoughts
router.get("/api/thoughts", async (req, res) => {});

// Get single thought by ID
router.get("/api/thoughts/:id", async (req, res) => {});

// Post new thought (and push to ID associated to user's thoughts array field)
router.post("/api/thoughts", async (req, res) => {});

// Update a thought by ID
router.put("/api/thoughts/:id", async (req, res) => {});

// Delete a thought by ID
router.delete("/api/thoughts/:id", async (req, res) => {});

// Create a reaction stored in a single thought's reactions array field
router.post("/api/thoughts/:thoughtId/reactions", async (req, res) => {});

// Pull and remove a reaction by a reaction's reactionId
router.delete("/api/thoughts/:thoughtId/reactions", async (req, res) => {});

module.exports = router;