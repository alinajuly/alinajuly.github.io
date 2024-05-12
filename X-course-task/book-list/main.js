document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("search");
  const sortSelect = document.getElementById("sort");
  const booksContainer = document.getElementById("books-container");
  searchInput.addEventListener("input", updateBookCatalog);
  searchInput.addEventListener("change", updateBookCatalog);
  let books = []; // Оголошуємо змінну books на рівні модуля для доступу в усіх функціях

  fetch("../books.json")
      .then((response) => response.json())
      .then((data) => {
          books = data.books; // Присвоюємо дані з JSON файлу змінній books
          buildBookCatalog(books); // Передаємо масив книг для побудови каталогу
      })
      .catch((error) => {
          console.error("Error loading books:", error);
      });

  // Функція для оновлення каталогу книг
  function updateBookCatalog() {
      const searchTerm = searchInput.value.toLowerCase();
      const filteredBooks = books.filter((book) =>
          book.title.toLowerCase().includes(searchTerm)
      );
      if (filteredBooks.length === 0) {
          // Якщо не знайдено книг, встановлюємо повідомлення "Book not found" червоним кольором
          booksContainer.innerHTML = "<p style='color: red; text-align: center;'>Book not found</p>";
      } else {
          buildBookCatalog(filteredBooks);
      }
  }

  // Сортування книг за ціною
  sortSelect.addEventListener("change", function () {
      const sortOrder = sortSelect.value;
      let sortedBooks;

      // Перевіряємо, чи обране значення "default"
      if (sortOrder === "default") {
          // Якщо так, сортування не застосовується
          sortedBooks = books;
      } else {
          // В іншому випадку, сортуємо книги за вказаним порядком
          sortedBooks = [...books]; // Клонуємо масив книг
          sortedBooks.sort((a, b) => {
              if (sortOrder === "asc") {
                  return a.price - b.price;
              } else {
                  return b.price - a.price;
              }
          });
      }

      buildBookCatalog(sortedBooks);
  });

  // Функція для побудови каталогу книг
  function buildBookCatalog(books) {
      booksContainer.innerHTML = ""; // Очищення контейнера перед додаванням нових книг
      
      // Визначення кількості книг в рядку в залежності від ширини екрана
      let booksPerRow = 3; // За замовчуванням - 3 книги в рядку
      if (window.innerWidth <= 767) {
          booksPerRow = 1; // При ширині екрана до 767px - 1 книга в рядку
      } else if (window.innerWidth <= 320) {
          booksPerRow = 1; // При ширині екрана до 320px - 1 книга в рядку
      }
      
      // Розділ книг на рядки
      for (let i = 0; i < books.length; i += booksPerRow) {
          const bookRow = document.createElement("div");
          bookRow.classList.add("book-row");

          // Додавання кожної книги до рядка
          for (let j = i; j < i + booksPerRow && j < books.length; j++) {
              const book = books[j];
              const bookElement = document.createElement("div");
              bookElement.classList.add("book");

              // Створення HTML-структури для відображення книги
              const bookHTML = `
                  <img src="${book.image}" alt="${book.title}" class="book-image">
                  <h3 class="book-title">${book.title}</h3>
                  <p class="book-author">Author: ${book.author}</p>
                  <p class="book-description">${book.shortDescription}</p>
                  <div class="book-details">
                    <p class="book-price">Price: $${book.price}</p>
                    <button class="btn btn-warning view-button" type="button">View</button>
                  </div>
              `;
              bookElement.innerHTML = bookHTML;

              // Додавання bookElement до bookRow
              bookRow.appendChild(bookElement);
          }

          // Додавання рядка до booksContainer
          booksContainer.appendChild(bookRow);
      }
  }
});
