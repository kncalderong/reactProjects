import React, { useState } from "react";
import styled from "styled-components";
import { Counter } from "./";
import { FaReply } from "react-icons/fa";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { AddComment } from "./";

const Comment = ({
  id,
  content,
  createdAt,
  score,
  user,
  replies,
  currentUser,
  replyingTo,
  setComments,
}) => {
  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  let isFromCurrentUser = currentUser.username === user.username ? true : false;

  const handleEdit = (e) => {
    setIsEditing(!isEditing);
  };
  const handleReply = () => {
    setIsReplying(!isReplying);
  };

  let marginBottom = isReplying ? "5px" : "15px";
  return (
    <>
      <Wrapper marginBottom={marginBottom}>
        <Counter score={score} />
        <div className="content">
          <div className="comment-head">
            <div className="user-info">
              <div className="img-container">
                <img
                  src={require(`../assets/images/avatars/image-${user.username}.png`)}
                  alt="avatar"
                  className="img"
                />
              </div>
              <div className="name">
                {user.username}
                {isFromCurrentUser && <span className="you-notif">you</span>}
              </div>
              <div className="createdAt">{createdAt}</div>
            </div>
            <div className="actions">
              {isFromCurrentUser && (
                <div className="delete">
                  <MdDelete />
                  <p className="action-name">Delete</p>
                </div>
              )}

              {!isFromCurrentUser && (
                <div className="reply" onClick={handleReply}>
                  <FaReply />
                  <p className="action-name">Reply</p>
                </div>
              )}
              {isFromCurrentUser && (
                <div className="edit" onClick={handleEdit}>
                  <MdModeEdit />
                  <p className="action-name">Edit</p>
                </div>
              )}
            </div>
          </div>
          {!isEditing && (
            <div className="comment-info">
              <p>
                {replyingTo && (
                  <span className="replyingTo">@{replyingTo}</span>
                )}
                <span>{content}</span>
              </p>
            </div>
          )}
          {isEditing && (
            <form>
              <textarea
                rows="4"
                cols="30"
                className="form-textarea"
                defaultValue={content}
              ></textarea>
              <button className="btn edit-btn">update</button>
            </form>
          )}
        </div>
      </Wrapper>
      {isReplying && (
        <AddComment
          isReplying={isReplying}
          setComments={setComments}
          idCommentToReply={id}
        />
      )}
      {replies && (
        <div className="child-comments-container">
          <div className="line"></div>
          <div className="child-comments">
            {replies.map((reply, idx) => {
              return (
                <Comment {...reply} currentUser={currentUser} key={reply.id} />
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Comment;

const Wrapper = styled.div`
  width: 100%;
  margin-bottom: ${(props) => props.marginBottom};
  background-color: #fff;
  height: auto;
  max-height: 300px;
  border-radius: var(--borderRadius);
  padding: 1.5rem;
  display: flex;
  .content {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }
  .comment-head {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .user-info {
    display: flex;
    align-items: center;
  }
  .img-container {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 1rem;
  }
  .name {
    margin-right: 1rem;
    font-weight: 600;
  }
  .you-notif {
    background-color: var(--moderate-blue);
    color: #fff;
    margin-left: 0.5rem;
    border-radius: 2px;
    padding: 0.1rem 0.5rem;
    font-size: 0.8rem;
  }
  .createdAt {
    color: var(--grayish-blue);
    font-weight: 550;
  }
  .actions {
    display: flex;
    align-items: center;
  }
  .reply,
  .edit,
  .delete {
    display: flex;
    cursor: pointer;
  }
  .edit,
  .reply {
    color: var(--moderate-blue);
  }
  .edit:hover,
  .reply:hover {
    color: var(--light-grayish-blue);
  }
  .delete {
    margin-right: 1rem;
    color: var(--soft-red);
  }
  .delete:hover {
    color: var(--pale-red);
  }
  .action-name {
    margin-left: 0.5rem;
    font-weight: 600;
  }

  .comment-info {
    width: 100%;
    line-height: 1.8rem;
    margin-top: 0.5rem;
    overflow: auto;
  }
  .replyingTo {
    color: var(--moderate-blue);
    font-weight: 600;
    margin-right: 0.5rem;
  }
  .comment-info p {
    color: var(--grayish-blue);
    font-weight: 500;
  }
  form {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    width: 100%;
    flex-grow: 1;
  }
  .form-textarea {
    margin: 1rem 0;
    line-height: 1.8rem;
    resize: none;
  }
  .form-textarea:focus-visible {
    border: 3px solid var(--grey-400);
    outline: none;
  }
  .edit-btn {
    background-color: var(--moderate-blue);
    text-transform: uppercase;
    height: 40px;
    width: 115px;
  }
  .edit-btn:hover {
    background-color: var(--light-grayish-blue);
  }
`;
