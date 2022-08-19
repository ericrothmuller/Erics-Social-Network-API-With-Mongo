const router = require("express").Router();
const { User, Thought } = require("../../models");

// Get All Users
router.get("/", async (req, res) => {
    try {
      const users = await User.find({}, ["_id", "username", "email", "thoughts", "friends",]);
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  });

// Get Single User By ID
router.get("/:id", async (req, res) => {
try {
  const usersInfo = await User.findById(req.params.id, ["username", "email", "thoughts", "friends",]);

  if (!usersInfo) {
    res.status(500).json("No user exists by that ID");
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

// Create a new user
router.post("/", async (req, res) => {
    try {

      if (!req.body.username || !req.body.email) {
        res.status(500).json("Username and Email are required");
        return;
      }

      const createUser = {username: req.body.username, email: req.body.email};

      const createUserData = await User.create({
        ...createUser,
        friends: [],
        thoughts: [],
      });
      res.status(200).json(createUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

// Update a user by ID
router.put("/:id", async (req, res) => {
    try {

      const user = await User.findById(req.params.id);

      if (!user) {
        res.status(500).json("No user exists by that ID");
        return;
      }
  
      if (req.body.username) {
        user.username = req.body.username;
      }

      if (req.body.email) {
        user.email = req.body.email;
      }

      await user.save();
      res.sendStatus(200);
    } catch (err) {
      res.status(500).json(err);
    }
  });

// Delete user by ID
router.delete("/:id", async (req, res) => {
    try {

      const deleteArray = [];

      const user = await User.findById(req.params.id);

      if (!user) {
        res.status(500).json("No user exists by that ID");
        return;
      }

    deleteArray.push(Thought.deleteMany({ _id: user.thoughts }));

    deleteArray.push(user.delete());

    await Promise.all(deleteArray);

      res.status(200).json("User deleted successfully");
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;