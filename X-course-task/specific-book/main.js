document.addEventListener('DOMContentLoaded', () => {
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
                    max="${book.amount}"
                    value="1"
                  >
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <label for="totalPrice" class="form-label">Total Price</label>
              </div>
              <div class="col-md-6">
                <p id="totalPriceDisplay" class="float-end">${book.price}</p>
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

    const totalPriceDisplay = document.getElementById('totalPriceDisplay');
    const countInput = document.getElementById('countInput');

    function updateTotalPrice() {
      let count = parseInt(countInput.value, 10);
      const maxAllowedBooks = parseInt(countInput.max, 10);
      const prevCount = parseInt(countInput.dataset.prevCount, 10); // Отримуємо попереднє значення, якщо воно було збережено
    
      if (isNaN(count) || count < 1) {
        count = 1;
      } else if (count >= maxAllowedBooks) {
        count = maxAllowedBooks; // Встановлюємо максимально допустиме значення
        setTimeout(() => {
          alert("This is the maximum number of books.");
        }, 0); // Викликаємо alert після оновлення значення count
      }
    
      countInput.value = count; // Оновлюємо значення введеного числа
      countInput.dataset.prevCount = count; // Зберігаємо поточне значення для подальшого використання
    
      totalPriceDisplay.textContent = (parseFloat(book.price) * count).toFixed(2);
    }

    countInput.addEventListener('input', updateTotalPrice);

    countInput.addEventListener('keydown', event => {
      const count = parseInt(countInput.value, 10); // Отримуємо поточне значення поля вводу
      const maxAllowedBooks = parseInt(countInput.max, 10); // Отримуємо максимально допустиме значення
      const prevCount = parseInt(countInput.dataset.prevCount, 10); // Отримуємо попереднє значення, якщо воно було збережено

      if (event.key === 'ArrowUp') {
        if (count >= maxAllowedBooks) {
          countInput.value = maxAllowedBooks;
          alert("This is the maximum number of books.");
        } else {
          updateTotalPrice();
        }
      }
    });
      
    updateTotalPrice();
  }
});
