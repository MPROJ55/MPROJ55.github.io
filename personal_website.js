
document.addEventListener('DOMContentLoaded', () => {
  // AOS
  if (window.AOS) {
    AOS.init();
  }

  // EmailJS
  if (window.emailjs) {
    emailjs.init("rXTsSG3UvjHRpHGqB"); // PUBLIC key only
  }

  initThemeToggle();
  restoreTheme();
});


function initThemeToggle() {
  const toggleBtn = document.getElementById('themeToggle');
  if (!toggleBtn) return;

  toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const mode = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
    localStorage.setItem('theme', mode);
    toggleBtn.textContent = mode === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';
  });
}

function restoreTheme() {
  const toggleBtn = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    if (toggleBtn) toggleBtn.textContent = '☀️ Light Mode';
  }
}


function toggleCard(card) {
  const details = card.querySelector('.details');
  if (!details) return;

  details.style.display =
    details.style.display === 'block' ? 'none' : 'block';
}


function sendEmail(event) {
  event.preventDefault();

  const name = document.querySelector('[name=name]').value.trim();
  const email = document.querySelector('[name=email]').value.trim();
  const message = document.querySelector('[name=message]').value.trim();

  // Basic validation (IMPORTANT)
  if (!name || !email || !message) {
    alert("All fields are required.");
    return;
  }

  if (!validateEmail(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  emailjs.send("service_jnrgs1f", "Gmail", {
    from_name: name,
    from_email: email,
    message: message
  })
  .then(() => {
    alert("Message sent successfully!");
    document.querySelector(".contact-form").reset();
  })
  .catch(err => {
    console.error("EmailJS Error:", err);
    alert("Failed to send message. Please try again later.");
  });
}


function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

