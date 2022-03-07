import styled from "styled-components";

function App() {
  return (
    <Wrapper>
      <div className="main-container">
        <div className="comments-container">
          <div className="comment"></div>
          <div className="comment"></div>
          <div className="comment"></div>
          <div className="comment"></div>
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
  background-color: var(--light-gray);
  padding: 40px 0;

  .main-container {
    background-color: var(--very-light-gray);
    width: 90%;
    max-width: 600px;
    height: auto;
    /* min-height: 600px; */
    display: flex;
    flex-direction: column;
  }
  .comments-container {
    height: auto;
    flex-grow: 1;
    width: 100%;
    background-color: var(--light-gray);
  }
  .comment {
    width: 100%;
    margin-bottom: 15px;
    background-color: var(--very-light-gray);
    height: 110px;
  }
  .add-comment {
    min-height: 110px;
    height: 110px;
    width: 100%;
    background-color: var(--grayish-blue);
  }
`;

export default App;
