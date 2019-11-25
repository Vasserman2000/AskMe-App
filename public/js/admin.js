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
        document.querySelector('.active').classList.remove('active');
        document.getElementById(hash).classList.add('active');
    }
}

document.addEventListener('DOMContentLoaded', admin.init)