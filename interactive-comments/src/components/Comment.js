import React, { useState } from "react";
import styled from "styled-components";
import { Counter } from "./";
import { FaReply } from "react-icons/fa";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { AddComment } from "./";

const Comment = () => {
  const [isReplying, setIsReplying] = useState(false);

  let marginBottom = isReplying ? "5px" : "15px";
  return (
    <>
      <Wrapper marginBottom={marginBottom}>
        <Counter />
        <div className="content">
          <div className="comment-head">
            <div className="user-info">
              <div className="img-container">
                <img
                  src={require("../assets/images/avatars/image-amyrobson.png")}
                  alt="avatar"
                  className="img"
                />
              </div>
              <div className="name">
                amyrobson
                <span className="you-notif">you</span>
              </div>
              <div className="createdAt">1 month ago</div>
            </div>
            <div className="actions">
              <div className="delete">
                <MdDelete />
                <p className="action-name">Delete</p>
              </div>
              {/* <div className="reply">
              <FaReply />
              <p className="action-name">Reply</p>
            </div> */}
              <div className="edit">
                <MdModeEdit />
                <p className="action-name">Edit</p>
              </div>
            </div>
          </div>
          <div className="comment-info">
            <p>
              <span className="replyingTo">@maxblagun</span>
              If you're still new, I'd recommend focusing on the fundamentals of
              HTML, CSS, and JS before considering React. It's very tempting to
              jump ahead but lay a solid foundation first.
            </p>
          </div>
        </div>
      </Wrapper>
      {isReplying && <AddComment />}
    </>
  );
};

export default Comment;

const Wrapper = styled.div`
  width: 100%;
  margin-bottom: ${(props) => props.marginBottom};
  background-color: #fff;
  height: auto;
  max-height: 200px;
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
`;
