document.addEventListener('DOMContentLoaded', () => {
  const countInput = document.getElementById('countInput');
  const price = document.getElementById('price');
  const totalPrice = document.getElementById('totalPrice');

  const maxAllowedBooks = 42;
  let prevCount = null;

  const updateTotalPrice = () => {
    let count = parseInt(countInput.value, 10);
    if (isNaN(count) || count < 0) {
      count = 0;
      countInput.value = count;
    } else if (count > maxAllowedBooks) {
      count = prevCount !== null ? prevCount : maxAllowedBooks;
      countInput.value = count;
      alert("There is no such quantity available.");
    } else {
      prevCount = count;
    }
    totalPrice.textContent = parseInt(price.textContent, 10) * count;
  };

  updateTotalPrice();

  countInput.addEventListener('input', updateTotalPrice);

  countInput.addEventListener('keydown', event => {
    if (event.key === 'ArrowUp') {
      countInput.value = parseInt(countInput.value, 10) + 1;
      updateTotalPrice();
    } else if (event.key === 'ArrowDown') {
      countInput.value = Math.max(parseInt(countInput.value, 10) - 1, 1);
      updateTotalPrice();
    }
  });
});
