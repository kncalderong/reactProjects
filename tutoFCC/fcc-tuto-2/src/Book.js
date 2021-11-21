import React from "react";

const Book = (props) => {
  const { img, title, author, children } = props;

  const clickHandler = () => {
    alert("hello world");
  };

  return (
    <article className="book">
      <img src={img} alt="" />
      <h1
        onClick={() => {
          console.log(title);
        }}
      >
        {title}
      </h1>
      <h4> {author}</h4>
      <p>{children}</p>
      <button type="button" onClick={clickHandler}>
        Example Event
      </button>
    </article>
  );
};

export default Book;
