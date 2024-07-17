document.addEventListener('DOMContentLoaded', function() {
    // Prevent page reload on button click
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
        });
    });

    // Display a popup message after purchase
    function showPurchasePopup() {
        alert('Compra realizada con éxito');
    }

    // Handle form submission
    const form = document.getElementById('formulario');
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const correo = document.getElementById('correo').value;
        const texto = document.getElementById('texto').value;
        const rut = document.getElementById('rut').value;

        if (!validateEmail(correo)) {
            showError('correo', 'Ingrese un correo electrónico válido.');
            return;
        }

        if (texto.trim() === '') {
            showError('texto', 'Este campo es obligatorio.');
            return;
        }

        if (!validateRUT(rut)) {
            showError('rut', 'Ingrese un RUT válido.');
            return;
        }

        const formData = new FormData();
        formData.append('correo', correo);
        formData.append('texto', texto);
        formData.append('rut', rut);

        fetch('/send-email/', {
            method: 'POST',
            body: formData
        }).then(response => {
            if (response.ok) {
                showPurchasePopup();
            } else {
                alert('Hubo un error al enviar el formulario.');
            }
        }).catch(error => {
            console.error('Error:', error);
            alert('Hubo un error al enviar el formulario.');
        });
    });

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function validateRUT(rut) {
        // Aquí puedes agregar la lógica de validación del RUT
        return rut.trim() !== '';
    }

    function showError(inputId, message) {
        const inputElement = document.getElementById(inputId);
        const feedbackElement = inputElement.nextElementSibling;
        feedbackElement.textContent = message;
        inputElement.classList.add('is-invalid');
    }
});
