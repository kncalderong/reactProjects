import React, { useState, useContext, useReducer } from "react";
import data from "../assets/data.json";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [comments, setComments] = useState(data.comments);
  const currentUser = data.currentUser;
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  const handleScore = (action, idComment, child) => {
    let currentComment = comments.find((item) => item.id === idComment);
    let indexCurrent = comments.indexOf(currentComment);
    //to handle only inside child array
    if (child) {
      currentComment = comments.find((item) => {
        return item.replies.find((itemChild) => itemChild.id === idComment);
      });
      indexCurrent = comments.indexOf(currentComment);
      let currentChildComment = currentComment.replies.find(
        (item) => item.id === idComment
      );
      let indexCurrentChild =
        currentComment.replies.indexOf(currentChildComment);

      if (action === "+") {
        currentChildComment.score += 1;
      } else if (action === "-") {
        currentChildComment.score -= 1;
      }

      setComments((prevComments) => {
        prevComments[indexCurrent].replies[indexCurrentChild] =
          currentChildComment;
        return prevComments;
      });
      forceUpdate();

      return;
    }

    if (action === "+") {
      currentComment.score += 1;
    } else if (action === "-") {
      currentComment.score -= 1;
    }
    setComments((prevComments) => {
      prevComments[indexCurrent] = currentComment;
      return prevComments;
    });

    forceUpdate();
  };

  return (
    <AppContext.Provider
      value={{ comments, setComments, currentUser, handleScore }}
    >
      {children}
    </AppContext.Provider>
  );
};

//custom hook
export const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider };
