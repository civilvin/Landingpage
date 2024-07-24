document.addEventListener('DOMContentLoaded', (event) => {
    let currentStep = 0;
    const formSteps = document.querySelectorAll('.form-step');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const paymentContainer = document.getElementById('payment-container');
    const payBtn = document.getElementById('payBtn');

    showStep(currentStep);

    function showStep(step) {
        formSteps[step].style.display = 'block';
        prevBtn.style.display = step === 0 ? 'none' : 'inline';
        nextBtn.textContent = step === formSteps.length - 1 ? 'Submit' : 'Next';
    }

    function nextPrev(n) {
        formSteps[currentStep].style.display = 'none';
        currentStep += n;

        if (currentStep >= formSteps.length) {
            document.getElementById('ai-policy-form').style.display = 'none';
            paymentContainer.style.display = 'block';
        } else {
            showStep(currentStep);
        }
    }

    payBtn.addEventListener('click', () => {
        // Stripe payment integration
        const stripe = Stripe('pk_test_51PftDQ2NZwV4DncDTsdvn60YjPahJLf3ihoYyFX1Cb94uJBM7e0WF2UW9H4unLjDAeTFz7JNbgnhUH4EDRfNcyVh00290a1Spp');
        stripe.redirectToCheckout({
            lineItems: [{price: 'psk_test_51PftDQ2NZwV4DncDEAIf2Brw521ZBF326zwFwKXa0klEZg5ijDk0QCznxCKRZA96KqP9mouX3nlrtV7DZF3H1lpG00eGtSU3ex', quantity: 1}],
            mode: 'payment',
            successUrl: window.location.origin + '/success.html',
            cancelUrl: window.location.origin + '/cancel.html',
        }).then((result) => {
            if (result.error) {
                alert(result.error.message);
            }
        });
    });
});
