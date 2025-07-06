document.addEventListener('DOMContentLoaded', () => {
    const productOptions = document.querySelectorAll('.product-option');
    const option2DetailsHTML = document.querySelector('#option2 .option-details').innerHTML;
    const radioButtons = document.querySelectorAll('input[name="product-units"]');
    const totalPriceElement = document.querySelector('.total-price');

    // Function to update the total price
    function updateTotalPrice() {
        let currentPrice = 0;
        const selectedRadio = document.querySelector('input[name="product-units"]:checked');
        if (selectedRadio) {
            const optionElement = selectedRadio.closest('.product-option');
            const priceText = optionElement.querySelector('.current-price').textContent;
            currentPrice = parseFloat(priceText.replace('$', '').replace(' USD', ''));
        }
        totalPriceElement.textContent = `Total : $${currentPrice.toFixed(2)} USD`;
    }

    productOptions.forEach(option => {
        const optionDetails = option.querySelector('.option-details');
        const radio = option.querySelector('input[type="radio"]');

        // Initial state based on checked radio button
        if (radio.checked) {
            option.classList.add('expanded');
            optionDetails.classList.remove('hidden');
        } else {
            optionDetails.classList.add('hidden');
        }

        option.addEventListener('mouseenter', () => {
            // Collapse all other options first
            productOptions.forEach(otherOption => {
                if (otherOption !== option) {
                    otherOption.classList.remove('expanded');
                    otherOption.querySelector('.option-details').classList.add('hidden');
                }
            });

            // Expand the hovered option
            option.classList.add('expanded');
            optionDetails.classList.remove('hidden');

            // If it's not the "Most Popular" option, populate its details with Option 2's details
            if (!option.classList.contains('most-popular')) {
                optionDetails.innerHTML = option2DetailsHTML;
            } else {
                 // For the "Most Popular" option, ensure its original details are present
                 // This handles the case where it might have been modified by another hover
                 const originalOption2Details = document.createElement('div');
                 originalOption2Details.innerHTML = option2DetailsHTML;
                 optionDetails.innerHTML = originalOption2Details.innerHTML;
            }
        });

        // Add a click listener to the entire block to check the radio button
        option.addEventListener('click', () => {
            radio.checked = true;
            updateTotalPrice(); // Update total price on selection
            // Trigger mouseenter effect for immediate visual feedback on click
            const event = new MouseEvent('mouseenter', {
                'view': window,
                'bubbles': true,
                'cancelable': true
            });
            option.dispatchEvent(event);
        });
    });

    // Add event listener for radio button changes to update total price
    radioButtons.forEach(radio => {
        radio.addEventListener('change', updateTotalPrice);
    });

    // Initial total price update
    updateTotalPrice();
});