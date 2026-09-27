import { qs, toggleClass } from './dom.js';

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = qs('#loginForm');
  const sidebarToggler = qs('#sidebarToggler');
  const sidebar = qs('#sidebar');

  if (sidebarToggler && sidebar) {
    sidebarToggler.addEventListener('click', () => {
      toggleClass(sidebar, 'open');
    });
  }
  
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const emailInput = qs('#email');
      const passwordInput = qs('#password');
      const emailError = qs('#emailError');
      const passwordError = qs('#passwordError');
      const loginAlert = qs('#loginAlert');
      
      let isValid = true;
      
      // Reset previous error states
      emailInput.classList.remove('error');
      passwordInput.classList.remove('error');
      emailError.classList.remove('visible');
      passwordError.classList.remove('visible');
      loginAlert.classList.remove('visible');
      
      // Validate Email
      if (!emailInput.value.trim() || !emailInput.value.includes('@')) {
        emailInput.classList.add('error');
        emailError.classList.add('visible');
        isValid = false;
      }
      
      // Validate Password
      if (!passwordInput.value.trim()) {
        passwordInput.classList.add('error');
        passwordError.classList.add('visible');
        isValid = false;
      }
      
      if (!isValid) return;
      
      // Mock authentication check
      if (emailInput.value === 'admin@nimbus.com' && passwordInput.value === 'password123') {
        // Successful login simulation -> Redirect to dashboard
        window.location.href = 'dashboard.html';
      } else {
        loginAlert.classList.add('visible');
        passwordInput.classList.add('error');
      }
    });
  }
});