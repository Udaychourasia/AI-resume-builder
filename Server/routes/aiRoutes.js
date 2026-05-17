const express = require("express");

const router = express.Router();


// 🔥 FAKE AI SUMMARY

router.post("/generate-summary", async (req, res) => {

  try {

    const { skills, role } = req.body;

    const fakeSummary = `
Highly motivated ${role} with strong skills in ${skills}.

Passionate about problem solving, teamwork, and building scalable applications.

Quick learner with excellent communication and technical abilities.
    `;

    res.json({
      summary: fakeSummary,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: error.message,
    });

  }

});


// 🔥 FAKE ATS SCORE

router.post("/check-ats", async (req, res) => {

  try {

    const fakeATS = `
ATS Score: 84/100

Suggestions:

1. Add more industry-specific keywords.

2. Improve project descriptions with measurable achievements.

3. Include certifications and internship experience.
    `;

    res.json({
      ats: fakeATS,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: error.message,
    });

  }

});

module.exports = router;