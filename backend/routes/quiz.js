const express = require('express');
const Question = require('../models/Question');

const router = express.Router();

// Get all questions
router.get('/questions', async (req, res) => {
  const questions = await Question.find();
  res.json(questions);
});

// Add question (admin)
router.post('/add', async (req, res) => {
  const { question, options, correctAnswer, category } = req.body;
  const newQ = new Question({ question, options, correctAnswer, category });
  await newQ.save();
  res.json({ message: 'Question added' });
});

module.exports = router;
