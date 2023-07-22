module.exports = mongoose => {
    return mongoose.model('question',
        mongoose.Schema({
            text: String,
            answer: String,
            choices: String,
            quiz: String,
        })
    );
}