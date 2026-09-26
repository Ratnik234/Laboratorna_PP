let library = [
 { title: "1984", author: "Джордж Орвелл", year: 1949, genre:
"Дистопія", available: true },
 { title: "Гаррі Поттер і філософський камінь", author: "Дж. К. Ролінґ", year: 1997, genre: "Фентезі", available: false },
 { title: "Володар перснів", author: "Дж. Р. Р. Толкін", year:
1954, genre: "Фентезі", available: true },
 { title: "Код да Вінчі", author: "Ден Браун", year: 2003,
genre: "Детектив", available: true },
 { title: "Маленький принц", author: "Антуан де Сент-Екзюпері",
year: 1943, genre: "Філософія", available: false }
];

function addBook(library, newBook) {
 library.push(newBook);
 console.log(`Книга "${newBook.title}" додана до бібліотеки.`);
}

function DeletBook(library, title) {
   const index = library.findIndex( book => book.title === title);
   
   if (index === -1){
    console.log("Книгі нема");
    return;
   }
library.splice(index, 1);
 consle.log(`Книга "${title}" видалена.`);
};

function Search(library, author){
   const found = library.filter(book => book.author === author);

   if (found.length === 0 ){
    console.log("Книгі нема ")
    return[];
   }
    console.log(`Книга автора "${author}":`);
    found.forEach(book => {
        const status = book.availabe ? "Доступна !" : "Видана";
        console.log(`- ${book.title} (${book.year}, ${book.genre}, ${status})`);

    });
    return found;
}
const getBook = (library) => {
     const total = library.length; 
     console.log(`Загалом книг: ${total}`);
     return total;
};
 function Anitibria(library, title){
    const book = library.find(book => book.title === title);

    if (!book){
        console.log("Книгі нема ");
        return;
    }
 book.available = !book.available;
const status = book.available ? "Доступна " : "Видана";
console.log(`Статус книгі "${title}" змінена на  "${status}". `);
 }
   


const newBook = { title: "Шерлок Холмс", author: "Артур Конан Дойл", year: 1887, genre: "Детектив", available: true };
addBook(library, newBook);

Search(library, "Ден Браун" );

getBook(library);

DeletBook(library, "1943");

DeletBook(library, "Бард");

Anitibria(library, "Маленький принц");

Anitibria(library,  "Анархія");

console.log("\nПоточний стан бібліотеки:");
library.forEach(book => {
  const status = book.available ? "Доступна" : "Видана";
  console.log(`- "${book.title}" — ${book.author}, ${book.year}, ${book.genre}, ${status}`);
});
