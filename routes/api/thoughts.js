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
    Thought.create(req.body)

    const createThought = await User.findOneAndUpdate({ username: req.body.username }, { $addToSet: { thoughts: Thought._id } }, { new: true });

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
router.post("/:id/reactions", async (req, res) => {
  try {

    if (!req.body.username || !req.body.reactionBody) {
      res.status(500).json("Username and Reaction text are required.");
      return;
    }
    const reactionId = new ObjectId();

    const newReaction = {username: req.body.username, reactionBody: req.body.reactionBody, reactionId};

    await Thought.findOneAndUpdate({_id: req.params.id}, {$push: { reactions: newReaction }}, {new: true});

    res.status(200).json("Reaction created successfully");
  } catch (err) {
    res.status(500).json(err);
  }
});

// Pull and remove a reaction by a reaction's reactionId
router.delete("/:id/reactions", async (req, res) => {
  try {

    const reactionById = await req.body.reactionId;

    if (!reactionById) {
      res.status(500).json("No reaction exists by that ID");
      return;
    }

   Thought.deleteOne({reactionId: reactionById});

    res.status(200).json("Reaction deleted successfully");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;