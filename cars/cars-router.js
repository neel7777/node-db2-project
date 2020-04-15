const express = require("express");
const knex = require("knex");

const knexfile = require("../knexfile.js"); // --- this

// configures de connection to the database.
const db = knex(knexfile.development); // -------- and this

const router = express.Router();

router.get("/", (req, res) => {
    db("cars")
      .then(cars => {
        res.json(cars);
      })
      .catch(err => {
        res.status(500).json({ message: "Failed to retrieve cars" });
      });
});

router.get("/:id", (req, res) => {
    const { id } = req.params;
  
    db("cars")
      .where({ id })
      .first()
      .then(car => {
        res.json(car);
      })
      .catch(err => {
        res.status(500).json({ message: "Failed to retrieve car" });
      });
  });
  
  router.post("/", (req, res) => {
    const carData = req.body;
    db("cars")
      .insert(carData)
      .then(ids => {
        db("cars")
          .where({ id: ids[0] })
          .then(newcarEntry => {
            res.status(201).json(newcarEntry);
          });
      })
      .catch(err => {
        console.log("POST error", err);
        res.status(500).json({ message: "Failed to store data" });
      });
  });

  router.patch("/:id", (req, res) => {
    const changes = req.body;
    const { id } = req.params;
    
    db("cars")
      .where({ id }) 
      .update(changes)
      .then(count => {
        if (count > 0) {
          res.status(200).json({ message: "update successful" });
        } else {
          res.status(404).json({ message: "no cars by that id found" });
        }
      })
      .catch(error=>{
          res.status(400).json({ message: 'error updating'})
      })
  });
  
  router.delete("/:id", (req, res) => {
    // find the documentation for deleting records in http://knexjs.org
    // and use the information to implement the delete endpoint
    const { id } = req.params;
    // update posts set title = 'new title' where id = 5;
    db("cars")
      .where({ id }) // remember to filter
      .del()
      .then(count => {
        if (count > 0) {
          res.status(200).json({ message: "deletion successful" });
        } else {
          res.status(404).json({ message: "no cars by that id found" });
        }
      })
      .catch(error=>{
        res.status(400).json({ message: 'error deleting'})
    })
  });

module.exports = router;