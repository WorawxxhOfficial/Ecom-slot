document.getElementById('registerForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    // Validate password match
    if (password !== confirmPassword) {
        showError('รหัสผ่านไม่ตรงกัน');
        return;
    }
    
    // Validate password strength
    if (password.length < 6) {
        showError('รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร');
        return;
    }
    
    try {
        const result = await DB.createUser(username, password, email);
        
        if (result.rowsAffected > 0) {
            // Show success message
            showSuccess('สมัครสมาชิกสำเร็จ กำลังนำคุณไปยังหน้าเข้าสู่ระบบ...');
            
            // Redirect to login page after 2 seconds
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);
        } else {
            showError('ไม่สามารถสมัครสมาชิกได้ กรุณาลองใหม่อีกครั้ง');
        }
    } catch (error) {
        console.error('Registration error:', error);
        if (error.message.includes('UNIQUE constraint failed')) {
            if (error.message.includes('username')) {
                showError('ชื่อผู้ใช้นี้ถูกใช้งานแล้ว');
            } else if (error.message.includes('email')) {
                showError('อีเมลนี้ถูกใช้งานแล้ว');
            }
        } else {
            showError('เกิดข้อผิดพลาดในการสมัครสมาชิก กรุณาลองใหม่อีกครั้ง');
        }
    }
});

function showError(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'error-message show';
    messageDiv.textContent = message;
    
    // Remove any existing messages
    removeExistingMessages();
    
    // Add new message after the form
    document.getElementById('registerForm').appendChild(messageDiv);
    
    // Clear message after 3 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}

function showSuccess(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'success-message show';
    messageDiv.style.color = '#4CAF50';
    messageDiv.textContent = message;
    
    // Remove any existing messages
    removeExistingMessages();
    
    // Add new message after the form
    document.getElementById('registerForm').appendChild(messageDiv);
}

function removeExistingMessages() {
    const existingMessages = document.querySelectorAll('.error-message, .success-message');
    existingMessages.forEach(msg => msg.remove());
}

// Check if user is already logged in
window.addEventListener('load', function() {
    const user = sessionStorage.getItem('user');
    if (user) {
        window.location.href = 'index.html';
    }
}); 