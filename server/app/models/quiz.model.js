module.exports = mongoose => {
    const Quiz = mongoose.model('quiz',
        mongoose.Schema({
            title: String,
            questions: Array,
            author: String,
            summary: String,
        }, {timeStamp: true}))
    return Quiz;
}