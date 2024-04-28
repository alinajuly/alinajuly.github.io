document.addEventListener('DOMContentLoaded', () => {
  const countInput = document.getElementById('countInput');
  const price = document.getElementById('price');
  const totalPrice = document.getElementById('totalPrice');

  let maxAllowedBooks = 0;
  let prevCount = null;

  const updateTotalPrice = () => {
    let count = parseInt(countInput.value, 10);
    if (isNaN(count) || count < 1) {
      count = 1;
      countInput.value = '';
    } else if (count === 0) {
      count = 1;
    } else if (count > maxAllowedBooks) {
      count = prevCount !== null ? prevCount : maxAllowedBooks;
      countInput.value = count;
      alert("There is no such quantity available.");
    } else {
      prevCount = count;
    }
    totalPrice.textContent = parseInt(price.textContent, 10) * count;
  };

  fetch("../books.json")
    .then(response => response.json())
    .then(data => {
      console.log(data);
      data.books.forEach(book => {
        if (book.amount > maxAllowedBooks) {
          maxAllowedBooks = book.amount;
        }
      });
      updateTotalPrice();
    })
    .catch(error => {
      console.error("Error loading books:", error);
    });

  countInput.addEventListener('input', () => {
    let count = parseInt(countInput.value, 10);
    if (isNaN(count) || count < 1) {
      count = 1;
      countInput.value = '';;
    } else if (count === 0) {
      count = 1;
    } else if (count > maxAllowedBooks) {
      countInput.value = prevCount !== null ? prevCount : maxAllowedBooks;
      alert("There is no such quantity available.");
    } else {
      prevCount = count;
    }
    updateTotalPrice();
  });

  countInput.addEventListener('keydown', event => {
    if (event.key === 'ArrowUp') {
      let count = parseInt(countInput.value, 10) + 1;
      if (count > maxAllowedBooks) {
        count = maxAllowedBooks;
        alert("There is no such quantity available.");
      }
      countInput.value = count;
      updateTotalPrice();
    } else if (event.key === 'ArrowDown') {
      let count = Math.max(parseInt(countInput.value, 10) - 1, 1);
      countInput.value = count;
      updateTotalPrice();
    }
  });
});
