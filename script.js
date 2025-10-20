document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const showRegisterLink = document.getElementById('showRegister');
    const showLoginLink = document.getElementById('showLogin');
    const loginError = document.getElementById('loginError');
    const registerError = document.getElementById('registerError');

    // --- Chuyển đổi giữa Đăng nhập và Đăng ký ---
    const switchForm = (showForm, hideForm) => {
        // Tắt transition cho form cũ để đặt nó về vị trí chờ ngay lập tức
        hideForm.style.transition = 'none';
        hideForm.classList.remove('active');
        hideForm.style.transform = 'translateX(100%)'; // Đẩy form cũ sang phải

        localStorage.setItem('activeForm', showForm.id); 

        // Đảm bảo form mới sẵn sàng cho transition
        showForm.style.transition = 'all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)'; // Kích hoạt transition
        showForm.classList.add('active'); // Kích hoạt form mới
        showForm.style.transform = 'translateX(0)'; // Trượt form mới vào giữa

        // Ẩn lỗi của form không hoạt động
        if (showForm.id === 'loginForm') {
            registerError.style.display = 'none';
        } else {
            loginError.style.display = 'none';
        }
    };

    showRegisterLink.addEventListener('click', (e) => {
        e.preventDefault();
        switchForm(registerForm, loginForm);
    });

    showLoginLink.addEventListener('click', (e) => {
        e.preventDefault();
        switchForm(loginForm, registerForm);
    });

    // Khởi tạo trạng thái form dựa trên Local Storage hoặc mặc định
    const activeFormId = localStorage.getItem('activeForm') || 'loginForm';
    if (activeFormId === 'registerForm') {
        loginForm.classList.remove('active');
        loginForm.style.transform = 'translateX(-100%)'; 
        registerForm.classList.add('active');
        registerForm.style.transform = 'translateX(0)'; 
    } else {
        loginForm.classList.add('active');
        loginForm.style.transform = 'translateX(0)';
        registerForm.classList.remove('active');
        registerForm.style.transform = 'translateX(100%)';
    }


    // --- Hàm tiện ích ---
    const displayError = (element, message) => {
        element.textContent = message;
        element.style.display = 'block';
        setTimeout(() => element.style.display = 'none', 5000);
    };

    const getAccounts = () => {
        return JSON.parse(localStorage.getItem('userAccounts')) || [];
    };

    const saveAccounts = (accounts) => {
        localStorage.setItem('userAccounts', JSON.stringify(accounts));
    };

    // --- Xử lý ĐĂNG KÝ ---
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        registerError.style.display = 'none';

        const name = document.getElementById('registerName').value.trim();
        const email = document.getElementById('registerEmail').value.trim();
        const password = document.getElementById('registerPassword').value;

        if (password.length < 6) {
            return displayError(registerError, 'Mật khẩu phải có ít nhất 6 ký tự.');
        }

        let accounts = getAccounts();
        if (accounts.some(acc => acc.email === email)) {
            return displayError(registerError, 'Email đã được đăng ký.');
        }

        const newAccount = {
            name: name,
            email: email,
            password: password, 
            points: 100, 
            docShared: 0,
            docDownloaded: 0,
        };

        accounts.push(newAccount);
        saveAccounts(accounts);
        
        // Đăng ký thành công, chuyển sang Đăng nhập
        alert('Đăng ký thành công. Vui lòng Đăng nhập.');
        registerForm.reset();
        switchForm(loginForm, registerForm);
    });

    // --- Xử lý ĐĂNG NHẬP ---
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        loginError.style.display = 'none';

        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value;

        const accounts = getAccounts();
        const user = accounts.find(acc => acc.email === email && acc.password === password);

        if (user) {
            // Đăng nhập thành công
            localStorage.setItem('loggedInUser', JSON.stringify(user));
            // Chuyển hướng đến trang dashboard
            window.location.href = 'i2.html'; 
        } else {
            displayError(loginError, 'Email hoặc Mật khẩu không đúng.');
        }
    });
});