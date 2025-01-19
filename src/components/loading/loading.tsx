import React from "react";
import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Spinner = styled.div`
  border: 5px solid rgba(255, 255, 255, 0.3);
  border-top: 5px solid #292626;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: ${spin} 1s linear infinite;
  margin: 2rem auto;
`;

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px;
`;

const Loading = () => {
  return (
    <LoadingWrapper>
      <Spinner />
    </LoadingWrapper>
  );
};

export default Loading;
