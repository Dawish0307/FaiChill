// --- LOGIC KIỂM TRA ĐĂNG NHẬP VÀ ĐĂNG XUẤT (MỚI) ---
const checkLoginAndLoadUser = () => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (!loggedInUser) {
        // Nếu chưa đăng nhập, chuyển hướng về trang đăng nhập
        window.location.href = 'index.html'; 
        return null;
    }
    return loggedInUser;
};

let currentUser = checkLoginAndLoadUser();

const logout = () => {
    localStorage.removeItem('loggedInUser');
    window.location.href = 'index.html';
};

// Đảm bảo nút Đăng Xuất được thêm vào đâu đó, ví dụ, trang Settings
// Tạm thời, ta có thể thêm một nút Đăng Xuất trong trang 'user' hoặc 'settings'

document.addEventListener('DOMContentLoaded', () => {
    // Nếu có user, cập nhật thông tin trên giao diện
    if (currentUser) {
        // Cập nhật Điểm Tích Lũy trên Navbar
        const pointsSpan = document.querySelector('nav .points span');
        if (pointsSpan) pointsSpan.textContent = `${currentUser.points} Điểm`;

        // Cập nhật Hồ Sơ Người Dùng (trang #user)
        const userPage = document.getElementById('user');
        if (userPage) {
            userPage.querySelector('.user-profile-card h2').textContent = currentUser.name;
            userPage.querySelector('.user-profile-card p:nth-child(3)').textContent = `Email: ${currentUser.email}`;
            userPage.querySelector('.user-profile-card p:nth-child(4)').textContent = `Mã số sinh viên: ${currentUser.studentId || 'Chưa cập nhật'}`;
            // Mã sinh viên và Cấp độ có thể giữ mặc định hoặc thêm vào user object
            userPage.querySelector('.user-profile-card .stats span:nth-child(1)').textContent = `Tài liệu đã đăng: ${currentUser.docShared || 0}`;
            userPage.querySelector('.user-profile-card .stats span:nth-child(2)').textContent = `Tài liệu đã tải: ${currentUser.docDownloaded || 0}`;
            userPage.querySelector('.user-profile-card').innerHTML += '<button class="setting-btn danger-btn" id="logoutBtn" style="margin-top: 20px;">Đăng Xuất</button>';
        }

        // Xử lý sự kiện Đăng Xuất
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', logout);
        }

        // Cập nhật điểm hiện tại ở mục Tích Lũy
        const tichLuyPage = document.getElementById('tich-luy');
        if (tichLuyPage) {
            tichLuyPage.querySelector('.info-card h3').textContent = `Điểm Hiện Tại: ${currentUser.points} Points`;
        }
    }
});


// ... Các logic JavaScript đã có (sideLinks, menuBar, searchBtn, toggler, menuLinks) ...
// Cần đảm bảo các logic đã có được giữ nguyên.
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

// Lấy tất cả các liên kết trong sidebar, trên navbar, và các liên kết tương tác trong trang settings mới
// Lấy tất cả các liên kết trong sidebar, trên navbar, logo và các liên kết tương tác trong trang settings mới
const menuLinks = document.querySelectorAll('.logo[data-page], .side-menu a, nav a[data-page], .settings-link-item, .back-link, .setting-btn[data-page]');
const pages = document.querySelectorAll('.page');
// ...

menuLinks.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();

        const pageId = link.getAttribute('data-page');
        if (!pageId) return; // Bỏ qua nếu không có data-page (ví dụ: các nút không chuyển trang)

        // Xử lý active cho sidebar (chỉ áp dụng cho các link trong sidebar)
        if (link.closest('.side-menu')) {
            document.querySelectorAll('.side-menu li').forEach(l => l.classList.remove('active'));
            link.parentElement.classList.add('active');
        } else {
            // Khi nhấp vào các nút trên Navbar/Settings, loại bỏ active của Sidebar
            document.querySelectorAll('.side-menu li').forEach(l => l.classList.remove('active'));
        }
        
        // Bỏ active ở tất cả các trang
        pages.forEach(p => p.classList.remove('active'));

        // Hiển thị phần tương ứng
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.add('active');
        }

        // Đồng bộ hóa theme-toggle (Nếu có 2 nút toggle)
        if (pageId === 'general-settings') {
            const mainToggle = document.getElementById('theme-toggle');
            const subToggle = document.getElementById('theme-toggle-sub');
            if (subToggle) subToggle.checked = mainToggle.checked;

            // Đảm bảo sub-toggle cũng hoạt động (Nếu người dùng nhấp vào link này)
            subToggle.onchange = function() {
                mainToggle.checked = subToggle.checked;
                mainToggle.dispatchEvent(new Event('change'));
            }
        }
    });
});

// Xử lý đồng bộ cho nút Dark Mode chính nếu chưa có
const subToggler = document.getElementById('theme-toggle-sub');
if (subToggler) {
    subToggler.addEventListener('change', function () {
        const mainToggle = document.getElementById('theme-toggle');
        mainToggle.checked = subToggler.checked;
        mainToggle.dispatchEvent(new Event('change'));
    });
}
