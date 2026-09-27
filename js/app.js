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
      emailInput.classList.remove('error');
      passwordInput.classList.remove('error');
      emailError.classList.remove('visible');
      passwordError.classList.remove('visible');
      loginAlert.classList.remove('visible');
      if (!emailInput.value.trim() || !emailInput.value.includes('@')) {
        emailInput.classList.add('error');
        emailError.classList.add('visible');
        isValid = false;
      }
      if (!passwordInput.value.trim()) {
        passwordInput.classList.add('error');
        passwordError.classList.add('visible');
        isValid = false;
      }
      if (!isValid) return;
      if (emailInput.value === 'admin@nimbus.com' && passwordInput.value === 'password123') {
        window.location.href = 'dashboard.html';
      } else {
        loginAlert.classList.add('visible');
        passwordInput.classList.add('error');
      }
    });
  }
});