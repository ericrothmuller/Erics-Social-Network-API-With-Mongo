const router = require("express").Router();
const { User, Thought } = require("../../models");

// Get all thoughts
router.get("/", async (req, res) => {
    try {
      const thoughts = await Thought.find({});

      res.status(200).json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
});

// Get single thought by ID
router.get("/:id", async (req, res) => {
  try {
    const thoughtbyId = await Thought.findById(req.params.id);

    if (!thoughtbyId) {
      res.sendStatus(500).json("No thought exists by that ID");
      return;
    }
    
    res.status(200).json(thoughtbyId);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Post new thought (and push to ID associated to user's thoughts array field)
router.post("/", async (req, res) => {
  try {
    const newThought = {
      _id: new ObjectId(),
      thoughtText: req.body.thoughtText,
      username: req.body.username,
    };

    const thoughtUsername = await User.findOne({ username: newThought.username });
    
    if (!newThought.thoughtText || !newThought.username) {
      res.status(500).json("A thought requires a text entry and a username.");
      return;
    }

    if (newThought.thoughtText.length > 280) {
      res.status(500).json("Text can't exceed 280 characters");
      return;
    }

    if (!thoughtUsername) {
      res.status(500).json("No username found for that ID");
      return;
    }

    if (!thoughtUsername.thoughts) {
      thoughtUsername.thoughts = [];
    }

    thoughtUsername.thoughts.push(newThought._id);
    const promises = [thoughtUsername.save(), Thought.create({ newThought })];

    await Promise.all(promises);

    res.sendStatus(200);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update a thought by ID
router.put("/:id", async (req, res) => {
  try {
    const thoughtById = await Thought.findById(req.params.id);

    if (!thoughtById) {
      res.status(500).json("No thought found by that ID");
      return;
    }

    thoughtById.thoughtText = req.body.thoughtText;
    await thoughtById.save();

    res.sendStatus(200);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a thought by ID
router.delete("/:id", async (req, res) => {
  try {
    const deleteThought = await Thought.findById(req.params.id);

    if (!deleteThought) {
      res.sendStatus(500).json("No thought found by that ID");
      return;
    }

    await deleteThought.delete();
    res.sendStatus(200);
  } catch (err) {
    res.status(500).json(err);
  }
});


// Create a reaction stored in a single thought's reactions array field
router.post("/:thoughtId/reactions", async (req, res) => {});

// Pull and remove a reaction by a reaction's reactionId
router.delete("/:thoughtId/reactions", async (req, res) => {});

module.exports = router;