const { Question } = require('../models');
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/questions');
  },
  filename: function (req, file, cb) {
    const uniqueFilename = uuidv4() + path.extname(file.originalname);
    cb(null, uniqueFilename);
  },
});

const upload = multer({ storage });

const createQuestion = async (req, res) => {
  const { testId } = req.params;
  let { path } = req.body;

  if (!testId) {
    return res.status(400)
  }

  try {
    const question = req.file

    if (question) {
      path = question.path;
    }

    const newQuestion = await Question.create({
      path,
      testId
    });

    return res.send(newQuestion);
  } catch (err) {
    return res.status(500)
  }
}

const getQuestion = async (req, res) => {
  const { testId } = req.params;

  const questions = await Question.findAll({
    where: { testId }
  });

  if (!questions) {
    return res.status(400)
  }

  return res.send(questions);
}

module.exports = {
    createQuestion,
    getQuestion,
    upload
}