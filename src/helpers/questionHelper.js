const extendQuestionsForTabulator = (questions) => {
    let extendedQuestions = []
    questions.forEach(function (question)  {
        let surveysNames = ''

        question.surveys.forEach(function(survey, index) {

            surveysNames += survey.title

            if (index < (Object.keys(question.surveys).length - 1)) {
                surveysNames += ', '
            }

        })
        extendedQuestions.push(Object.assign({}, question.toObject(), {surveysNames}))
    })

    return extendedQuestions
}

module.exports = {extendQuestionsForTabulator}