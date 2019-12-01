var surveysTable

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
        let hash = location.hash.replace('#', '');
        document.querySelector('.page.active').classList.remove('active');
        document.getElementById(hash).classList.add('active');
    }
}

document.addEventListener('DOMContentLoaded', admin.init)


$('#add-new-survey').click(() => {
    $.get('admin/testNewSurvey', (data) => {
        $('#new-survey form').remove()
        $('#new-survey').append(data)
    })
})

$('#add-new-question').click(() => {
    $.get('admin/testNewQuestion', (data) => {
        $('#new-question form').remove()
        $('#new-question').append(data)
    })
})

$(document).on('submit', '#new-survey-form', function (e) {

    $.ajax({
        url: $(this).attr('action'),
        type: $(this).attr('method'),
        data: $(this).serialize(),
        success: (res) => {
            alert(res)
            hideNewSurveyForm()
        }
    })

    e.preventDefault()
})



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
surveysTable = new Tabulator("#survey-table", {
    height: "311px",
    layout: "fitColumns",
    placeholder: "No Data Set",
    columns: [
        { title: "_id", field: "_id", sorter: "string", width: 200 },
        { title: "Title", field: "title", sorter: "string" },
        { title: "isActive", field: "isActive", sorter: "string" },
        { title: "Created At", field: "createdAt", sorter: "string" },
        { title: "Updated At", field: "updatedAt", sorter: "string" },
        { title: "delete", formatter: "buttonCross", style: "cursor: none", align: "center", cellClick: (e, cell) => {
            const id = cell.getRow().getData()._id
            const title = cell.getRow().getData().title
            $.ajax({
                url: `/surveys/${id}`,
                type: 'DELETE',
                success: function(result) {
                    alert(`Survey [${title}] has been deleted`)
                }
            });
        }}
    ],
})
surveysTable.setData(surveys)

$(document).on('click', '#refresh-survey-table', function (e) {
    surveysTable.setData('/surveys')
})

//Build Question Tabulator
var questionsTable = new Tabulator('#question-table', {
    height: "311px",
    layout: "fitColumns",
    placeholder: "No Data Set",
    columns: [
        { title: "_id", field: "_id", sorter: "string" },
        { title: "Text", field: "body", sorter: "string" },
        { title: "Type", field: "questionType", sorter: "string" },
        { title: "Surveys", field: "surveysNames", tooltip: true },
        { title: "Options", field: "optionsNames", tooltip: true },
        { title: "Created At", field: "createdAt", sorter: "string" },
        { title: "Updated At", field: "updatedAt", sorter: "string" }
    ],
}).setData(JSON.parse(questions))

console.log(questions)

