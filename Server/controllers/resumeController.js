const Resume = require("../models/Resume");


// 🔥 CREATE RESUME

const createResume = async (req, res) => {

  try {

    const {

      fullName,
      skills,
      education,
      experience,
      summary,
      userId,

    } = req.body;

    const resume = await Resume.create({

      fullName,
      skills,
      education,
      experience,
      summary,
      userId,

    });

    res.status(201).json({

      message: "Resume saved successfully",

      resume,

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      message: "Server Error",

    });

  }

};


// 🔥 GET ALL RESUMES

const getResumes = async (req, res) => {

  try {

    const resumes = await Resume.find();

    res.status(200).json(resumes);

  } catch (error) {

    console.log(error);

    res.status(500).json({

      message: "Server Error",

    });

  }

};


module.exports = {

  createResume,

  getResumes,

};