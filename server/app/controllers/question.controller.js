const db = require('../models');
const Question = db.question;

exports.create = (req, res) => {
    if(!req.body) {
        res.status(400).send({message: 'content cannot be empty'});
        return;
    }
    const question = new Question({
        text: req.body.text,
        answers: req.body.answers,
        quiz: req.body.quiz
    })
    question.save(question).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || 'Some error has occurred while creating the question'
        })
    })
}

exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? {title: {$regex: new RegExp(title), $options: 'i'}} : {};
    Question.find(condition).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || 'Some error has occurred while retrieving the question'
        })
    })
}

exports.findOne = (req, res) => {
    const id = req.params.id
    Question.findById(id).then(data => {
        if(!data) {
            res.status(400).send({message: `could not find item with id ${id}`});
        } else {
            res.send(data);
        }
    }).catch(err => {
        res.status(500).send({message: `error retrieving data with id=${id}`})
    })
}

exports.update = (req, res) => {
    if(!req.update) {
        res.status(400).send({
            message: 'Data to update cannot be empty'
        })
    }
    const id = req.params.id;
    Question.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(
        data => {
            if(!data) {
                res.status(404).send({
                    message: `Cannot Update Item with id=${id}`
                })
            } else res.send({ message: 'Question updated successfully' }).catch(
                err => {
                    res.status(500).send({
                        message: `Error updating question with id=${id}`
                    })
                }
            )
        }
    )
}

exports.delete = (req, res) => {
    const id = req.params.id;

    Question.findByIdAndRemove(id).then(
        data => {
            if(!data) {
                res.status(404).send({
                    message: `Cannot Delete Item With id=${id}`
                })
            } else {
                res.send({
                    message: 'Question was successfully deleted'
                })
            }
        }
    ).catch(err => {
        res.status(500).send({
            message: `Could not delete tutorial with id=${id}`
        })
    })
}