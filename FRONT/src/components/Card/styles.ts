import styled from 'styled-components';

export const Container = styled.li`
  background: #fff;
  padding: 0.75rem;
  list-style: none;
  min-height: 12rem;
  border-radius: 8px;

  display: flex;
  flex-direction: column;
  gap: 1rem;

  textarea {
    padding: 0.5rem;
    width: 100%;
  }
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #2e2e4d;
  gap: 0.5rem;
  padding: 0.5rem;

  h3 {
    flex: 1;
    text-align: center;
    text-transform: capitalize;
  }

  input {
    flex: 1;
    border-radius: 8px;
    border: 1px solid currentColor;
    padding: 0.25rem 1rem;
  }

  button {
    background: none;
    border: none;
    width: 1.125rem;
    height: 1.125rem;

    &:first-child {
      color: #c53030;
    }

    svg {
      width: 100%;
      height: 100%;
    }
  }
`;

export const Content = styled.div`
  flex: 1;

  position: relative;
  padding: 0.5rem;

  color: #5e5e7a;

  > button {
    margin-left: auto;

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

export const ModalContent = styled.div`
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

  color: #2e2e4d;

  div {
    margin-top: 1.5rem;
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
  }

  button {
    padding: 0.5rem 1rem;
    border-radius: 8px;
    border: none;
    transition: filter 0.2s;

    &:last-child {
      background: #c53030;
      color: #fff;
    }

    &:hover {
      filter: brightness(0.9);
    }
  }
`;
