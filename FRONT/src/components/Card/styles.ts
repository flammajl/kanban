import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  > div:last-child {
    color: #5e5e7a;
    margin-top: 2rem;
    cursor: pointer;
    text-transform: uppercase;
  }
`;

export const Container = styled.li`
  background: #fff;
  padding: 0.75rem;
  list-style: none;
  min-height: 12rem;
  border-radius: 8px;
  box-shadow: 2px 2px 3px rgba(46, 46, 77, 0.2);

  display: flex;
  flex-direction: column;
  gap: 1rem;

  textarea {
    padding: 0.5rem;
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

    svg {
      width: 100%;
      height: 100%;
    }
  }
`;

export const Content = styled.div`
  flex: 1;

  padding: 0.5rem;

  color: #5e5e7a;
`;
