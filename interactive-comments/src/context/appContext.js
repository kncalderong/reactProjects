import React, { useState, useContext, useReducer } from "react";
import data from "../assets/data.json";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [comments, setComments] = useState(data.comments);
  const currentUser = data.currentUser;
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  const handleScore = (action, idComment) => {
    let currentComment = comments.find((item) => item.id === idComment);
    let indexCurrent = comments.indexOf(currentComment);
    if (action === "+") {
      currentComment.score += 1;
    } else if (action === "-") {
      currentComment.score -= 1;
    }
    setComments((prevComments) => {
      console.log(prevComments);
      prevComments[indexCurrent] = currentComment;
      return prevComments;
    });
    console.log(currentComment);
    console.log(indexCurrent);
    console.log(comments);
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
