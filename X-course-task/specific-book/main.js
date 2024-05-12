document.addEventListener('DOMContentLoaded', () => {
  const countInput = document.getElementById('countInput');
  let totalPriceDisplay;

  let maxAllowedBooks = 0;
  let prevCount = null;

  const updateTotalPrice = () => {
    let count = parseInt(countInput.value, 10);
    if (isNaN(count) || count < 1) {
      count = 1;
      countInput.value = '';
    } else if (count > maxAllowedBooks) {
      count = prevCount !== null ? prevCount : maxAllowedBooks;
      countInput.value = count;
      alert("There is no such quantity available.");
    } else {
      prevCount = count;
    }
    totalPriceDisplay.textContent = (parseFloat(totalPriceDisplay.textContent) * count).toFixed(2);
  };

  const bookDetailsContainer = document.getElementById('book-details');

  const urlParams = new URLSearchParams(window.location.search);
  const bookId = urlParams.get('id');

  fetch('../books.json')
      .then(response => response.json())
      .then(data => {
          const books = data.books;
          const book = books.find(book => book.id == bookId);
          if (book) {
              renderBookDetails(book);
              maxAllowedBooks = book.amount;
              updateTotalPrice(); // Оновлюємо загальну ціну при завантаженні даних книги
          } else {
              bookDetailsContainer.innerHTML = '<p>Book not found</p>';
          }
      })
      .catch(error => {
          console.error('Error loading book data:', error);
      });

  function renderBookDetails(book) {
      const bookHTML = `
          <div class="book-image">
              <img src="${book.image}" alt="${book.title}" class="img-fluid">
          </div>
          <div class="book-info">
              <h2>${book.title}</h2>
              <h3>${book.author}</h3>
          </div>
          <div class="add-to-cart">
            <div class="col-md-12 text-start">
              <div class="row">
                <div class="col-md-6">
                  <label for="price" class="form-label">Price</label>
                </div>
                <div class="col-md-6">
                  <p class="float-end">${book.price}</p>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <label for="countInput" class="form-label">Count</label>
                </div>
                <div class="col-md-6">
                  <div class="input-group">
                    <input
                      type="number"
                      class="form-control form-control-sm mb-3"
                      id="countInput"
                      min="1"
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <label for="totalPrice" class="form-label">Total Price</label>
                </div>
                <div class="col-md-6">
                  <p id="totalPriceDisplay" class="float-end">${totalPriceDisplay}</p>
                </div>              
              </div>
              <button type="button" class="btn btn-warning btn-block float-end" onclick="addToCart(${book.id})">
                Add to Cart
              </button>
            </div>
          </div>
          <div class="book-description">
              <p>${book.description}</p>
          </div>
      `;
      bookDetailsContainer.innerHTML = bookHTML;

      totalPriceDisplay = document.getElementById('totalPriceDisplay'); // Переміщуємо отримання totalPriceDisplay сюди
  }

  countInput.addEventListener('input', () => {
    updateTotalPrice();
  });

  countInput.addEventListener('keydown', event => {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      updateTotalPrice();
    }
  });
});
