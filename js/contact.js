// Contact Form Validation and Submission
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contactForm');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Validation functions
  function validateName() {
    const value = nameInput.value.trim();
    const errorElement = document.getElementById('name-error');

    if (value === '') {
      showError(nameInput, errorElement, 'Le nom et prénom sont requis');
      return false;
    } else if (value.length < 3) {
      showError(nameInput, errorElement, 'Le nom doit contenir au moins 3 caractères');
      return false;
    } else {
      hideError(nameInput, errorElement);
      return true;
    }
  }

  function validateEmail() {
    const value = emailInput.value.trim();
    const errorElement = document.getElementById('email-error');

    if (value === '') {
      showError(emailInput, errorElement, 'L\'email est requis');
      return false;
    } else if (!emailRegex.test(value)) {
      showError(emailInput, errorElement, 'Veuillez entrer un email valide');
      return false;
    } else {
      hideError(emailInput, errorElement);
      return true;
    }
  }

  function validateMessage() {
    const value = messageInput.value.trim();
    const errorElement = document.getElementById('message-error');

    if (value === '') {
      showError(messageInput, errorElement, 'Le message est requis');
      return false;
    } else if (value.length < 10) {
      showError(messageInput, errorElement, 'Le message doit contenir au moins 10 caractères');
      return false;
    } else {
      hideError(messageInput, errorElement);
      return true;
    }
  }

  function showError(input, errorElement, message) {
    input.classList.add('invalid');
    errorElement.textContent = message;
    errorElement.classList.add('show');
  }

  function hideError(input, errorElement) {
    input.classList.remove('invalid');
    errorElement.textContent = '';
    errorElement.classList.remove('show');
  }

  // Add blur event listeners for validation
  nameInput.addEventListener('blur', validateName);
  emailInput.addEventListener('blur', validateEmail);
  messageInput.addEventListener('blur', validateMessage);

  // Form submission
  form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Validate all fields
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isMessageValid = validateMessage();

    if (isNameValid && isEmailValid && isMessageValid) {
      // Get form data
      const formData = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        message: messageInput.value.trim()
      };

      // Disable submit button
      const submitButton = form.querySelector('.submit-button');
      submitButton.disabled = true;
      submitButton.textContent = 'Envoi en cours...';

      // Simulate form submission (replace with actual API call)
      setTimeout(() => {
        console.log('Form submitted:', formData);
        
        // Show success message
        alert('Merci ! Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.');
        
        // Reset form
        form.reset();
        
        // Re-enable submit button
        submitButton.disabled = false;
        submitButton.textContent = 'Envoyé';
      }, 1500);
    } else {
      // Scroll to first error
      const firstError = form.querySelector('.invalid');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        firstError.focus();
      }
    }
  });

  // Clear errors on input
  nameInput.addEventListener('input', function() {
    if (this.classList.contains('invalid')) {
      validateName();
    }
  });

  emailInput.addEventListener('input', function() {
    if (this.classList.contains('invalid')) {
      validateEmail();
    }
  });

  messageInput.addEventListener('input', function() {
    if (this.classList.contains('invalid')) {
      validateMessage();
    }
  });
});
