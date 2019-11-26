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

$('#get-all-surveys').click(() => {
    table.setData("/surveys");
})

$('#add-new-survey').click(() => {
    $.get('admin/test', (data) => {
        $('#new-survey form').remove()  
        $('#new-survey').append(data)
    })
})

$('#log-out-from-all').click(() => {
    $.get('admin/log-out-from-all', (data) => {
        $('#log-out-message').append(data)
    })
})

//Build Tabulator
var table = new Tabulator("#survey-table", {
    height:"311px",
    layout:"fitColumns",
    placeholder:"No Data Set",
    columns:[
        {title:"_id", field:"_id", sorter:"string", width:200},
        {title:"Title", field:"title", sorter:"string"},
        {title:"isActive", field:"isActive", sorter:"string"},
        {title:"CreatedA At", field:"createdAt", sorter:"string"},
        {title:"Updated At", field:"updatedAt", sorter:"string"}
    ],
});