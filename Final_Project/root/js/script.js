document.addEventListener('DOMContentLoaded', () => {
  const totalItemsSpan = document.querySelector('.total-items');
  const subtotalPriceSpan = document.querySelector('.subtotal-price-value');
  const totalPriceSpan = document.querySelector('.total-price-value');
  const shippingSelect = document.getElementById('shipping');

  const updateCart = () => {
      const cartItems = document.querySelectorAll('.cart-item');
      let totalItems = 0;
      let subtotalPrice = 0;

      cartItems.forEach(item => {
          const quantityInput = item.querySelector('.quantity-input');
          const itemPrice = parseFloat(item.dataset.price);
          const quantity = parseInt(quantityInput.value);

          totalItems += quantity;
          subtotalPrice += itemPrice * quantity;
      });

      totalItemsSpan.textContent = totalItems;
      subtotalPriceSpan.textContent = `$${subtotalPrice.toLocaleString()}`;
      const shippingCost = parseFloat(shippingSelect.value);
      totalPriceSpan.textContent = totalItems === 0 ? `$0.00` : `$${(subtotalPrice + shippingCost).toLocaleString()}`;

      if (totalItems === 0) {
          subtotalPriceSpan.textContent = `$0.00`;
      }
  };

  const addEventListeners = (item) => {
      const decreaseButton = item.querySelector('.decrease-quantity');
      const increaseButton = item.querySelector('.increase-quantity');
      const quantityInput = item.querySelector('.quantity-input');
      const removeButton = item.querySelector('.item-remove');

      decreaseButton.addEventListener('click', () => {
          let quantity = parseInt(quantityInput.value);
          if (quantity > 1) {
              quantity--;
              quantityInput.value = quantity;
              updateCart();
          }
      });

      increaseButton.addEventListener('click', () => {
          let quantity = parseInt(quantityInput.value);
          quantity++;
          quantityInput.value = quantity;
          updateCart();
      });

      quantityInput.addEventListener('change', () => {
          if (quantityInput.value < 1) {
              quantityInput.value = 1;
          }
          updateCart();
      });

      removeButton.addEventListener('click', () => {
          item.remove();
          updateCart();
      });
  };

  document.querySelectorAll('.cart-item').forEach(addEventListeners);

  shippingSelect.addEventListener('change', updateCart);

  updateCart();
});
