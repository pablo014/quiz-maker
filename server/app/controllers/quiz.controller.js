const db = require('../models');
const Quiz = db.quiz;

exports.create = (req, res) => {
    if(!req.body.title) {
        res.status(400).send({message: 'content cannot be empty'});
        return;
    }
    const quiz = new Quiz({
        title: req.body.title,
        questions: req.body.questions,
        author: req.body.author,
        summary: req.body.summary
    })
    quiz.save(quiz).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || 'Some error has occurred while creating the quiz'
        })
    })
}

exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? {title: {$regex: new RegExp(title), $options: 'i'}} : {};
    Quiz.find(condition).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || 'Some error has occurred while retrieving the quiz'
        })
    })
}

exports.findOne = (req, res) => {
    const id = req.params.id
    Quiz.findById(id).then(data => {
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
    Quiz.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(
        data => {
            if(!data) {
                res.status(404).send({
                    message: `Cannot Update Item with id=${id}`
                })
            } else res.send({ message: 'Quiz updated successfully' }).catch(
                err => {
                    res.status(500).send({
                        message: `Error updating quiz with id=${id}`
                    })
                }
            )
        }
    )
}

exports.delete = (req, res) => {
    const id = req.params.id;

    Quiz.findByIdAndRemove(id).then(
        data => {
            if(!data) {
                res.status(404).send({
                    message: `Cannot Delete Item With id=${id}`
                })
            } else {
                res.send({
                    message: 'Quiz was successfully deleted'
                })
            }
        }
    ).catch(err => {
        res.status(500).send({
            message: `Could not delete tutorial with id=${id}`
        })
    })
}