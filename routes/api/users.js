const router = require("express").Router();
const { User, Thought } = require("../../models");

router.get("/api/users", async (req, res) => {
    try {
      const users = await User.find({}, ["_id", "username", "email", "thoughts", "friends",]);
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  
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


router.post("/api/users", async (req, res) => {});

router.put("/api/users/:id", async (req, res) => {});

router.delete("/api/users/:id", async (req, res) => {});