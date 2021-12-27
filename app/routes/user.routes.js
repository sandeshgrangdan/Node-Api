module.exports = app => {
    const user = require("../controllers/user.controller.js");

    var router = require("express").Router();

    // Create a new Tag
    router.post("/", user.create);

    // Retrieve all user
    router.get("/", user.findAll);

    // Retrieve all published user
    router.get("/published", user.findAllPublished);

    // Retrieve a single Tutorial with id
    router.get("/:id", user.findOne);

    // Update a Tag with id
    router.put("/:id", user.update);

    // Delete a Tag with id
    router.delete("/:id", user.delete);

    // Verify user from email & password
    router.post("/verify", user.verifyUser);

    // Delete all user
    router.delete("/", user.deleteAll);

    app.use('/api/user', router);
};