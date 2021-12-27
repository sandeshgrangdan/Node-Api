const Tag = require("../models/tag.model.js");

// Create and Save a new Tag
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Tag
    const tag = new Tag({
        title: req.body.title,
        description: req.body.description,
        published: req.body.published || false
    });

    // Save Tag in the database
    Tag.create(tag, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Tag."
            });
        else res.send(data);
    });
};

// Retrieve all Tags from the database (with condition).
exports.findAll = (req, res) => {
    const title = req.query.title;

    Tag.getAll(title, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Tags."
            });
        else res.send(data);
    });
};

exports.findAllPublished = (req, res) => {
    Tag.getAllPublished((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Tags."
            });
        else res.send(data);
    });
};


// Find a single Tag with a id
exports.findOne = (req, res) => {
    Tag.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Tag with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Tag with id " + req.params.id
                });
            }
        } else res.send(data);
    });
};

// find all published Tags
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    console.log(req.body);

    Tag.updateById(
        req.params.id,
        new Tag(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Tag with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Tag with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};


// Delete a Tag with the specified id in the request
exports.delete = (req, res) => {
    Tag.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Tag with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Tag with id " + req.params.id
                });
            }
        } else res.send({ message: `Tag was deleted successfully!` });
    });
};

// Delete all Tags from the database.
exports.deleteAll = (req, res) => {
    Tag.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Tags."
            });
        else res.send({ message: `All Tags were deleted successfully!` });
    });
};

