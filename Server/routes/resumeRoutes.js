const express = require("express");

const router = express.Router();

const {

  createResume,

  getResumes,

} = require("../controllers/resumeController");

const Resume = require("../models/Resume");


// 🔥 CREATE RESUME

router.post("/create", createResume);


// 🔥 GET ALL RESUMES

router.get("/all", getResumes);


// 🔥 DELETE RESUME

router.delete("/delete/:id", async (req, res) => {

  try {

    await Resume.findByIdAndDelete(req.params.id);

    res.json({

      message: "Resume deleted successfully",

    });

  } catch (error) {

    res.status(500).json({

      error: error.message,

    });

  }

});


// 🔥 UPDATE RESUME

router.put("/update/:id", async (req, res) => {

  try {

    const updatedResume = await Resume.findByIdAndUpdate(

      req.params.id,

      req.body,

      {
        new: true,
      }

    );

    res.json({

      message: "Resume updated successfully",

      updatedResume,

    });

  } catch (error) {

    res.status(500).json({

      error: error.message,

    });

  }

});


module.exports = router;