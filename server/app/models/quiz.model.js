module.exports = mongoose => {
    const Quiz = mongoose.model('quiz',
        mongoose.Schema({
            title: String,
            questions: Array,
            answers: Array,
        }, {timeStamp: true}))
    return Quiz;
}