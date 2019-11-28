const admin = {
    pages: [],
    init: () => {
        admin.pages = document.querySelectorAll('.page')

        document.querySelectorAll('.nav-link').forEach((link) => {
            link.addEventListener('click', admin.nav)
        })

        history.replaceState({}, 'Home', '#home')
        window.addEventListener('popstate', admin.poppin)
    },

    nav: (ev) => {
        ev.preventDefault()
        let currentPage = ev.target.getAttribute('data-target')
        let element = document.getElementById(currentPage)
        document.querySelector('.page.active').classList.remove('active')
        element.classList.add('active')
        history.pushState({}, currentPage, `#${currentPage}`)
    },
    poppin: () => {
        let hash = location.hash.replace('#' ,'');
        document.querySelector('.page.active').classList.remove('active');
        document.getElementById(hash).classList.add('active');
    }
}

document.addEventListener('DOMContentLoaded', admin.init)


$('#add-new-survey').click(() => {
    $.get('admin/test', (data) => {
        $('#new-survey form').remove()  
        $('#new-survey').append(data)
    })
})

onNewSurveySubmit = function (e) {
    console.log('hi')
    return false
}

hideNewSurveyForm = function () {
    $('#new-survey-form').hide()
}

$('#log-out-from-all').click(() => {
    $.get('admin/log-out-from-all', (data) => {
        $('#log-out-message').append(data)
    }).fail((error) => {
        $('#log-out-message').text('')
        $('#log-out-message').append(error.statusText)
    })
})

//Build Survey Tabulator
var surveysTable = new Tabulator("#survey-table", {
    height:"311px",
    layout:"fitColumns",
    placeholder:"No Data Set",
    columns:[
        {title:"_id", field:"_id", sorter:"string", width:200},
        {title:"Title", field:"title", sorter:"string"},
        {title:"isActive", field:"isActive", sorter:"string"},
        {title:"Created At", field:"createdAt", sorter:"string"},
        {title:"Updated At", field:"updatedAt", sorter:"string"}
    ],
}).setData(surveys)

//Build Question Tabulator
var questionsTable = new Tabulator('#question-table', {
    height:"311px",
    layout:"fitColumns",
    placeholder:"No Data Set",
    columns:[
        {title:"_id", field:"_id", sorter:"string", width:200},
        {title:"Title", field:"title", sorter:"string"},
        {title:"isActive", field:"isActive", sorter:"string"},
        {title:"Created At", field:"createdAt", sorter:"string"},
        {title:"Updated At", field:"updatedAt", sorter:"string"}
    ],
}).setData(questions)
