// small helper for the portfolio pages: mobile nav toggle & contact form storage
document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.getElementById('menuBtn');
  const mainNav = document.getElementById('mainNav');
  if(menuBtn && mainNav){
    menuBtn.addEventListener('click', ()=> mainNav.classList.toggle('open'));
  }

  // Contact form demo - stores messages locally (for testing/demo purposes)
  const contactForm = document.getElementById('contactForm');
  if(contactForm){
    const status = document.getElementById('contactStatus');
    contactForm.addEventListener('submit', (ev) => {
      ev.preventDefault();
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
      if(!name || !email || !message){
        status.textContent = 'Please fill every field.';
        return;
      }
      const messages = JSON.parse(localStorage.getItem('portfolio_messages') || '[]');
      messages.push({name, email, message, created: new Date().toISOString()});
      localStorage.setItem('portfolio_messages', JSON.stringify(messages));
      contactForm.reset();
      status.textContent = 'Message saved locally (demo). Thank you!';
    });
  }
});
