extractSurveyTitles = (surveys) => {
    let titles = []
    surveys.forEach((s)=>{ titles.push(s.title) })
    return titles
}

module.exports = { extractSurveyTitles }