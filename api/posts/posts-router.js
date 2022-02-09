// implement your posts router here
const Post = require("./posts-model");
// const express = require("express");

const router = require("express").Router();

// router.use(express.json());

router.get("/", (req, res) => {
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

router.post("/", (req, res) => {
  const { title, contents } = req.body;
  if (!title || !contents) {
    res
      .status(400)
      .json({ message: "Please provide title and contents for the post" });
  } else {
    Post.insert({ title, contents })
      .then(({ id }) => {
        return Post.findById(id);
      })
      .then((post) => {
        res.status(201).json(post);
      })
      .catch(() => {
        res.status(500).json({
          message: "There was an error while saving the post to the database",
        });
      });
  }
});

router.put("/:id", (req, res) => {
  const { title, contents } = req.body;
  if (!title || !contents) {
    res
      .status(400)
      .json({ message: "Please provide title and contents for the post" });
  } else {
    Post.findById(req.params.id)
      .then((post) => {
        if (!post) {
          res
            .status(404)
            .json({ message: "The post with the specified ID does not exist" });
        } else {
          return Post.update(req.params.id, req.body);
        }
      })
      .then((data) => {
        if (data) {
          return Post.findById(req.params.id);
        }
      })
      .then((post) => {
        res.json(post);
      })
      .catch(() => {
        res
          .status(500)
          .json({ message: "The post information could not be modified" });
      });
  }
});

module.exports = router;
