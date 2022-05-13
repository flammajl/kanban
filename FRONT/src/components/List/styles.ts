import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: #f3f5f6;
  border-radius: 8px;
  padding: 1rem;

  > button {
    color: #5e5e7a;
    margin-top: 2rem;
    cursor: pointer;
    text-transform: uppercase;
    border: none;
    background: none;
    width: fit-content;
  }
`;

export const Content = styled.div`
  background-color: white;
  border-radius: 6;
  box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px,
    hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90vw;
  max-width: 450px;
  max-height: 85vh;
  padding: 0.5rem 1.125rem;

  border-radius: 8px;
`;

export const Title = styled.h1`
  color: #2e2e4d;
  text-align: center;
`;

export const Form = styled.form`
  padding: 0.75rem;
  min-height: 12rem;
  border-radius: 8px;
  color: #2e2e4d;

  display: flex;
  flex-direction: column;
  gap: 1rem;

  input {
    border-radius: 8px;
    border: 1px solid currentColor;
    padding: 0.25rem 1rem;
  }

  div {
    textarea {
      padding: 0.5rem;
      width: 100%;
      border: 1px solid currentColor;
    }

    button {
      background: none;
      border: none;
      margin-top: 0;
    }
  }

  button {
    margin-left: auto;
    margin-top: 0.5rem;

    display: flex;
    align-items: center;
    gap: 0.5rem;

    background: #dcdcec;
    padding: 0.25rem;
    color: #2e2e4d;
    border: 1px solid #2e2e4d;
    border-radius: 8px;
  }
`;
