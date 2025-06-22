document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    try {
        const result = await DB.login(username, password);
        
        if (result.rows.length > 0) {
            // Store user info in session storage
            const user = result.rows[0];
            sessionStorage.setItem('user', JSON.stringify({
                id: user.id,
                username: user.username,
                email: user.email
            }));
            
            // Redirect to home page
            window.location.href = 'index.html';
        } else {
            showError('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
        }
    } catch (error) {
        console.error('Login error:', error);
        showError('เกิดข้อผิดพลาดในการเข้าสู่ระบบ กรุณาลองใหม่อีกครั้ง');
    }
});

function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message show';
    errorDiv.textContent = message;
    
    // Remove any existing error messages
    const existingError = document.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Add new error message after the form
    document.getElementById('loginForm').appendChild(errorDiv);
    
    // Clear error after 3 seconds
    setTimeout(() => {
        errorDiv.remove();
    }, 3000);
}

// Check if user is already logged in
window.addEventListener('load', function() {
    const user = sessionStorage.getItem('user');
    if (user) {
        window.location.href = 'index.html';
    }
}); 