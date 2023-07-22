module.exports = mongoose => {
    return mongoose.model('question',
        mongoose.Schema({
            text: String,
            answer: String,
            quiz: String,
        })
    );
}