import styled from 'styled-components';

export const Container = styled.div`
  height: 50px;
  background: #fff;
  border-radius: 0 0 8px 8px;
  box-shadow: 2px 2px 3px rgba(46, 46, 77, 0.2);

  position: relative;

  &::before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: #04a9f4;
  }

  > div {
    color: #5e5e7a;
    margin-top: 2rem;
    cursor: pointer;
    text-transform: uppercase;
  }
`;

export const Header = styled.header`
  height: 100%;
  display: flex;
  align-items: center;
  color: #2e2e4d;

  padding: 0.5rem 1rem;

  div {
    flex: 1;

    h2 {
      text-transform: uppercase;
      color: #2e2e4d;
    }
  }

  button {
    color: #04a9f4;
    background: none;
    border: none;
  }
`;
