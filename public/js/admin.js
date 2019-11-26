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
    $.get('/surveys', (data) => {
        $('#surveys').append(data[0].title)
    })
})

$('#log-out-from-all').click(() => {
    $.get('admin/log-out-from-all', (data) => {
        $('#log-out-message').append(data)
    })
})