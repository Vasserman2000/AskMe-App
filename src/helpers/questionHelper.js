const extendQuestionsForTabulator = (questions) => {
    let surveysNames = ''
    let extendedQuestions = []
    questions.forEach((question) => {
        question.surveys.forEach((survey, index) => {

            surveysNames += survey.title

            if (index < (Object.keys(question.surveys).length - 1)) {
                surveysNames += ', '
            }

        })
        extendedQuestions.push(Object.assign({}, question.toObject(), {surveysNames}))
        //console.log(extendedQuestions)
    })
    //console.log(extendedQuestions[0])
    return extendedQuestions
}

module.exports = {extendQuestionsForTabulator}