//to import the styles file
import "./App.css";

//import data
import { books } from "./books";

//import component
import Book from "./Book";

function App() {
  return (
    <section className="booklist">
      {books.map((book) => {
        return (
          <Book key={book.id} {...book} />
        ); /*spread all the key-values as properties */
      })}
    </section>
  );
}

export default App;
