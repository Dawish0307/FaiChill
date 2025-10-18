const sideLinks = document.querySelectorAll('.sidebar .side-menu li ');

sideLinks.forEach(item => {
    const li = item.parentElement;
    item.addEventListener('click', () => {
        sideLinks.forEach(i => {
            i.parentElement.classList.remove('active');
        })
        li.classList.add('active');
    })
});

const menuBar = document.querySelector('.content nav .bx.bx-menu');
const sideBar = document.querySelector('.sidebar');

menuBar.addEventListener('click', () => {
    sideBar.classList.toggle('close');
});

const searchBtn = document.querySelector('.content nav form .form-input button');
const searchBtnIcon = document.querySelector('.content nav form .form-input button .bx');
const searchForm = document.querySelector('.content nav form');

searchBtn.addEventListener('click', function (e) {
    if (window.innerWidth < 576) {
        e.preventDefault;
        searchForm.classList.toggle('show');
        if (searchForm.classList.contains('show')) {
            searchBtnIcon.classList.replace('bx-search', 'bx-x');
        } else {
            searchBtnIcon.classList.replace('bx-x', 'bx-search');
        }
    }
});

window.addEventListener('resize', () => {
    if (window.innerWidth < 768) {
        sideBar.classList.add('close');
    } else {
        sideBar.classList.remove('close');
    }
    if (window.innerWidth > 576) {
        searchBtnIcon.classList.replace('bx-x', 'bx-search');
        searchForm.classList.remove('show');
    }
});

const toggler = document.getElementById('theme-toggle');

toggler.addEventListener('change', function () {
    if (this.checked) {
        document.body.classList.add('dark');
    } else {
        document.body.classList.remove('dark');
    }
});

const menuLinks = document.querySelectorAll('.side-menu a');
const pages = document.querySelectorAll('.page');

menuLinks.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();

        // Bỏ active ở tất cả các menu
        menuLinks.forEach(l => l.parentElement.classList.remove('active'));

        // Bỏ active ở tất cả các trang
        pages.forEach(p => p.classList.remove('active'));

        // Thêm active cho menu được chọn
        link.parentElement.classList.add('active');

        // Hiển thị phần tương ứng
        const pageId = link.getAttribute('data-page');
        document.getElementById(pageId).classList.add('active');
    });
});
