module.exports = app => {
    const quizzes = require('../controllers/quiz.controller');

    var router = require('express').Router();

    router.post('/', quizzes.create);
    router.get('/', quizzes.findAll);
    router.get('/:id',quizzes.findOne);
    router.put('/:id', quizzes.update);
    router.delete('/:id', quizzes.delete)

    app.use('/api/quizzes', router)
}