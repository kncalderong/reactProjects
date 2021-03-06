import React from "react";
import styled from "styled-components";
import { GoPlus } from "react-icons/go";
import { HiMinus } from "react-icons/hi";
import { useAppContext } from "../context/appContext";

const Counter = ({ score, idComment, child }) => {
  const { handleScore } = useAppContext();

  return (
    <Wrapper>
      <div
        className="symbol-container"
        onClick={() => {
          handleScore("+", idComment, child);
        }}
      >
        <GoPlus />
      </div>
      <div className="count">{score}</div>
      <div
        className="symbol-container"
        onClick={() => {
          handleScore("-", idComment, child);
        }}
      >
        <HiMinus />
      </div>
    </Wrapper>
  );
};

export default Counter;

const Wrapper = styled.div`
  margin-right: 1.25rem;
  width: 40px;
  height: 100px;
  background-color: var(--very-light-gray);
  display: flex;
  flex-direction: column;
  border-radius: var(--borderRadius);
  align-items: center;
  justify-content: space-around;

  .count {
    font-size: 0.9rem;
    font-weight: 600;
    height: 21px;
  }
  .symbol-conteiner,
  .count {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .symbol-container {
    color: var(--grey-400);
    cursor: pointer;
  }
  .symbol-container:hover {
    color: var(--grey-600);
  }
`;
