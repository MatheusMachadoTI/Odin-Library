
const myLibrary = [];

// Elementos do diálogo e do formulário
const bookDialog = document.getElementById("book-dialog");
const bookForm = document.getElementById("book-form");

const newBookButton = document.getElementById("new-book-btn");
const emptyNewBookButton = document.getElementById("empty-new-book-btn");
const closeDialogButton = document.getElementById("close-dialog");
const cancelButton = document.getElementById("cancel-btn");

const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pagesInput = document.getElementById("pages");
const readInput = document.getElementById("read");

// Elementos da biblioteca
const library = document.getElementById("library");
const bookCount = document.getElementById("book-count");
const emptyLibrary = document.getElementById("empty-library");

// Construtor dos livros
function book(titulo, autor, paginas, read) {
    this.id = crypto.randomUUID();
    this.titulo = titulo;
    this.autor = autor;
    this.paginas = paginas;
    this.read = read;
}

// Alterna o status de leitura
book.prototype.toggleRead = function() {
    this.read = !this.read;
};

// Adiciona um livro ao array
function addBooktoLibrary(titulo, autor, paginas, read) {
    const novoLivro = new book(titulo, autor, paginas, read);
    myLibrary.push(novoLivro);
}

// Abre o formulário
newBookButton.addEventListener("click", function() {
    bookDialog.showModal();
});

emptyNewBookButton.addEventListener("click", function() {
    bookDialog.showModal();
});

// Fecha o formulário
closeDialogButton.addEventListener("click", function() {
    bookDialog.close();
});

cancelButton.addEventListener("click", function() {
    bookDialog.close();
});

// Cadastra um livro pelo formulário
bookForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const titulo = titleInput.value.trim();
    const autor = authorInput.value.trim();
    const paginas = Number(pagesInput.value);
    const read = readInput.checked;

    if (titulo === "" || autor === "" || paginas < 1) {
        return;
    }

    addBooktoLibrary(titulo, autor, paginas, read);

    renderBooks();

    bookForm.reset();
    bookDialog.close();
});

// Renderiza os livros na página
function renderBooks() {
    library.innerHTML = "";

    for (let i = 0; i < myLibrary.length; i++) {
        const livroAtual = myLibrary[i];

        const card = document.createElement("div");
        card.classList.add("book-card");

        const title = document.createElement("h3");
        title.textContent = livroAtual.titulo;
        card.appendChild(title);

        const author = document.createElement("p");
        author.textContent = "Autor: " + livroAtual.autor;
        card.appendChild(author);

        const pages = document.createElement("p");
        pages.textContent = "Páginas: " + livroAtual.paginas;
        card.appendChild(pages);

        const status = document.createElement("p");
        status.textContent = livroAtual.read ? "Lido" : "Não lido";
        card.appendChild(status);

        // Botão para alterar o status de leitura
        const readButton = document.createElement("button");
        readButton.classList.add("read-button");
        readButton.textContent = "Alterar leitura";

        readButton.addEventListener("click", function() {
            livroAtual.toggleRead();
            renderBooks();
        });

        card.appendChild(readButton);

        // Botão para remover o livro
        const removeButton = document.createElement("button");
        removeButton.classList.add("remove-button");
        removeButton.textContent = "Remover";

        removeButton.addEventListener("click", function() {
        const livroIndex = myLibrary.findIndex(function(livro) {
            return livro.id === livroAtual.id;
        });

    if (livroIndex !== -1) {
        myLibrary.splice(livroIndex, 1);
        renderBooks();
    }
});

        card.appendChild(removeButton);

        library.appendChild(card);
    }

    // Atualiza o contador
    if (myLibrary.length === 1) {
        bookCount.textContent = "1 livro";
    } else {
        bookCount.textContent = myLibrary.length + " livros";
    }

    // Mostra ou esconde o estado de biblioteca vazia
    if (myLibrary.length === 0) {
        emptyLibrary.style.display = "block";
        library.style.display = "none";
    } else {
        emptyLibrary.style.display = "none";
        library.style.display = "grid";
    }
}

// Livros iniciais para testar o projeto
addBooktoLibrary("O Hobbit", "J.R.R. Tolkien", 310, true);
addBooktoLibrary("1984", "George Orwell", 328, false);
addBooktoLibrary("Dom Casmurro", "Machado de Assis", 258, true);

// Exibe os livros iniciais
renderBooks();
