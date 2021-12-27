const sql = require("../utils/db.js");

// constructor
const Tag = function (tag) {
    this.title = tag.title;
    this.description = tag.description;
    this.published = tag.published;
};

Tag.create = (tag, result) => {
    sql.query("INSERT INTO tags SET ?", tag, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created Tag: ", { id: res.insertId, ...tag });
        result(null, { id: res.insertId, ...tag });
    });
};

Tag.findById = (id, result) => {
    sql.query(`SELECT * FROM tags WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found Tag: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Tag with the id
        result({ kind: "not_found" }, null);
    });
};

Tag.getAll = (title, result) => {
    let query = "SELECT * FROM tags";

    if (title) {
        query += ` WHERE title LIKE '%${title}%'`;
    }

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("tags: ", res);
        result(null, res);
    });
};

Tag.getAllPublished = result => {
    sql.query("SELECT * FROM tags WHERE published=true", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("tags: ", res);
        result(null, res);
    });
};

Tag.updateById = (id, Tag, result) => {
    sql.query(
        "UPDATE tags SET title = ?, description = ?, published = ? WHERE id = ?",
        [Tag.title, Tag.description, Tag.published, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Tag with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated Tag: ", { id: id, ...Tag });
            result(null, { id: id, ...Tag });
        }
    );
};

Tag.remove = (id, result) => {
    sql.query("DELETE FROM tags WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Tag with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted Tag with id: ", id);
        result(null, res);
    });
};

Tag.removeAll = result => {
    sql.query("DELETE FROM tags", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} tags`);
        result(null, res);
    });
};

module.exports = Tag;


