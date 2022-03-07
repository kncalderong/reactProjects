import React from "react";
import styled from "styled-components";
import { GoPlus } from "react-icons/go";
import { HiMinus } from "react-icons/hi";

const Counter = () => {
  return (
    <Wrapper>
      <GoPlus style={{ color: "var(--grey-400)" }} />
      <div className="count">5</div>
      <HiMinus style={{ color: "var(--grey-400)" }} />
    </Wrapper>
  );
};

export default Counter;

const Wrapper = styled.div`
  margin-right: 1.25rem;
  width: 35px;
  height: 70px;
  background-color: var(--very-light-gray);
  display: flex;
  flex-direction: column;

  .symbol {
    color: var(--grayish-blue);
  }
`;
