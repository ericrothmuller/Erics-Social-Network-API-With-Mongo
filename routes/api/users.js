const router = require("express").Router();
const { User, Thought } = require("../../models");

// Get All Users
router.get("/api/users", async (req, res) => {
    try {
      const users = await User.find({}, ["_id", "username", "email", "thoughts", "friends",]);
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  });

// Get Single User By ID
router.get("/api/users/:id", async (req, res) => {
try {
  const usersInfo = await User.findById(req.params.id, ["username", "email", "thoughts", "friends",]);

  if (!usersInfo) {
    res.sendStatus(404);
    return;
  }

  const userThoughts = await Thought.find({ _id: usersInfo.thoughts });
  const usersFriends = await User.find({ _id: usersInfo.friends });

  const user = {
    username: usersInfo.username,
    email: usersInfo.email,
    thoughts: userThoughts.map((thought) => {return {thoughtText: thought.thoughtText, createdAt: thought.createdAt}}),
    friends: usersFriends.map((friend) => {return {username: friend.username}})
};
  res.status(200).json(user);
} catch (err) {
  res.status(500).json(err);
}
});

// Post a new user
router.post("/api/users", async (req, res) => {
    try {

      if (!req.body.username || !req.body.email) {
        res.status(500).json("Username and Email are required");
        return;
      }

      const createUser = {username: req.body.username, email: req.body.email};
  
      const newUser = await User.create({createUser, thoughts: [], friends: []});

      res.status(200).json(newUser);
    } catch (err) {
      res.status(500).json(err);
    }
  });

// Update a user by ID
router.put("/api/users/:id", async (req, res) => {});

// Delete user by ID
router.delete("/api/users/:id", async (req, res) => {});