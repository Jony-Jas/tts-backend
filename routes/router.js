const express = require("express");
const router = express.Router();
const { spawn } = require("child_process");
const fs = require("fs");

router.post("/convert", (req, res) => {
  const { id, data, sample } = req.body;
  var obj = { id, data, sample };
  var json = JSON.stringify(obj);
  console.log(json);
  fs.writeFile("../Real-Time-Voice-Cloning/data.json", json, "utf8", (err) => {
    if (err) throw err;
    console.log("Data inserted successfully");
  });
  const command = [
    // `conda init`, use for first time
    `conda activate voice`,
    `cd ../Real-Time-Voice-Cloning/`,
    `python demo_toolbox.py`,
  ]
    .map((v) => `(${v})`)
    .join(" && ");
  const python = spawn(command, { shell: true });
  python.stderr.on("data", (data) => console.error(data.toString()));
  python.on("close", (code) => {
    console.log(`child process close all stdio with code ${code}`);
    var obj = {};
    var json = JSON.stringify(obj);
    fs.writeFile(
      "../Real-Time-Voice-Cloning/data.json",
      json,
      "utf8",
      (err) => {
        if (err) throw err;
        console.log("Data Deleted successfully");
      }
    );
    res.send(`${id}`);
  });
});

module.exports = router;
