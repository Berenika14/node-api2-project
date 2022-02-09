// implement your posts router here
const Post = require("./posts-model");

const router = require("express").Router();
router.get("", (req, res) => {
  Post.find().then((posts) => {
    res.json(posts);
  });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  Post.findById(id)
    .then((post) => {
      if (post.id != id) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist" });
      } else {
        res.status(200).json(post);
      }
    })
    .catch(() => {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist" });
    });
});

router.post("", (req, res) => {
  const body = req.body;
  Post.insert(req.body)
    .then((post) => {
      if (body.title || body.contents) {
        Post.findById(post.id).then((postId) => {
          res.status(201).json(postId);
        });
      } else {
        res
          .status(400)
          .json({ message: "Please provide title and contents for the post" });
      }
    })
    .catch(() => {
      res.status(500).json({
        message: "There was an error while saving the post to the database",
      });
    });
});

module.exports = router;
