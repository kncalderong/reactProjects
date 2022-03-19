import styled from "styled-components";
import { Comment, AddComment } from "./components";
import { useAppContext } from "./context/appContext";

function App() {
  const { comments, currentUser } = useAppContext();

  return (
    <Wrapper>
      <div className="main-container">
        <div className="comments-container">
          {comments.map((item) => {
            return (
              <Comment key={item.id} {...item} currentUser={currentUser} />
            );
          })}
        </div>
        {console.log("this is rendered one more time")}
        <AddComment />
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.main`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  background-color: var(--very-light-gray);
  padding: 40px 0;

  .main-container {
    background-color: var(--very-light-gray);
    width: 90%;
    max-width: 750px;
    height: auto;
    display: flex;
    flex-direction: column;
  }
  .comments-container {
    height: auto;
    flex-grow: 1;
    width: 100%;
    background-color: var(--very-light-gray);
  }

  .child-comments-container {
    width: 100%;
    height: auto;
    background-color: var(--very-light-gray);
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
  .child-comments {
    width: 85%;
  }

  .line {
    width: 3px;
    height: calc(100% - 15px);
    background-color: var(--light-gray);
    position: absolute;
    left: 7.5%;
  }
`;

export default App;
