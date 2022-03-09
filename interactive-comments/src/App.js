import styled from "styled-components";
import { Comment } from "./components";

function App() {
  return (
    <Wrapper>
      <div className="main-container">
        <div className="comments-container">
          <Comment />
          <Comment />
          <div className="child-comments-container">
            <div className="line"></div>
            <Comment child={"child"} />
            <Comment child={"child"} />
          </div>
        </div>
        <div className="add-comment"></div>
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

  .line {
    width: 3px;
    height: calc(100% - 15px);
    background-color: var(--light-gray);
    position: absolute;
    left: 7.5%;
  }
  .add-comment {
    min-height: 110px;
    height: 150px;
    width: 100%;
    background-color: var(--grayish-blue);
    border-radius: var(--borderRadius);
  }
`;

export default App;
