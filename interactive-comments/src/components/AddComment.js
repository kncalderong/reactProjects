import React, { useState } from "react";
import styled from "styled-components";
import { useAppContext } from "../context/appContext";

const AddComment = ({ isReplying, idComment, child }) => {
  const [commentAdded, setCommentAdded] = useState("");
  const { addComment } = useAppContext();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isReplying) {
      console.log(commentAdded);
      addComment(commentAdded, idComment, child);
    }
  };
  return (
    <Wrapper>
      <div className="add-img-container">
        <img
          src={require("../assets/images/avatars/image-juliusomo.png")}
          alt="user-avatar"
          className="img"
        />
      </div>
      <form>
        <textarea
          cols="30"
          rows="10"
          className="form-textarea"
          placeholder="Add a comment..."
          value={commentAdded}
          onChange={(e) => {
            setCommentAdded(e.target.value);
          }}
        ></textarea>
        <button className="btn submit-btn" onClick={handleSubmit}>
          {isReplying ? "reply" : "send"}
        </button>
      </form>
    </Wrapper>
  );
};

export default AddComment;

const Wrapper = styled.div`
  min-height: 110px;
  height: 140px;
  width: 100%;
  background-color: #fff;
  border-radius: var(--borderRadius);
  display: flex;
  padding: 1.5rem;
  margin-bottom: 15px;
  .add-img-container {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 1rem;
  }
  form {
    display: flex;
    flex-grow: 1;
  }
  /* .form-textarea {
    background-color: #fff;
    margin-right: 1rem;
    border: 2px solid var(--light-gray);
    padding: 1rem;
    color: var(--grayish-blue);
    font-weight: 500;
  } */
  .form-textarea:focus-visible {
    border: 3px solid var(--grey-400);
    outline: none;
  }
  .submit-btn {
    background-color: var(--moderate-blue);
    text-transform: uppercase;
    height: 40px;
    width: 115px;
  }
  .submit-btn:hover {
    background-color: var(--light-grayish-blue);
  }
`;
