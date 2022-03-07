import styled from "styled-components";
import { Counter } from "./components";

function App() {
  return (
    <Wrapper>
      <div className="main-container">
        <div className="comments-container">
          <div className="comment">
            <Counter />
            main comment
          </div>
          <div className="comment">main comment</div>
          <div className="child-comments-container">
            <div className="line"></div>
            <div className="comment child-comment">child comment</div>
            <div className="comment child-comment">child comment</div>
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
    max-width: 600px;
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
  .comment {
    width: 100%;
    margin-bottom: 15px;
    background-color: #fff;
    height: 120px;
    border-radius: var(--borderRadius);
    padding: 1.25rem;
    display: flex;
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
  .child-comment {
    width: 85%;
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
    height: 120px;
    width: 100%;
    background-color: var(--grayish-blue);
    border-radius: var(--borderRadius);
  }
`;

export default App;
