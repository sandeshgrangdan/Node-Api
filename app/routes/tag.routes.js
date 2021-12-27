module.exports = app => {
    const tags = require("../controllers/tag.controller.js");

    var router = require("express").Router();

    // Create a new Tag
    router.post("/", tags.create);

    // Retrieve all tags
    router.get("/", tags.findAll);

    // Retrieve all published tags
    router.get("/published", tags.findAllPublished);

    // Retrieve a single Tutorial with id
    router.get("/:id", tags.findOne);

    // Update a Tag with id
    router.put("/:id", tags.update);

    // Delete a Tag with id
    router.delete("/:id", tags.delete);

    // Delete all tags
    router.delete("/", tags.deleteAll);

    app.use('/api/tags', router);
};