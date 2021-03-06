import styled from 'styled-components';
import { ICardList } from '../../../interfaces';

export const Container = styled.div<Pick<ICardList, 'lista'>>`
  height: 50px;
  border-radius: 0 0 8px 8px;

  position: relative;

  &::before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 5px;
    height: 100%;
    background: ${({ theme, lista }) => theme.colors[lista]};
  }

  > div {
    color: #5e5e7a;
    margin-top: 2rem;
    cursor: pointer;
  }
`;

export const Header = styled.header<Pick<ICardList, 'lista'>>`
  height: 100%;
  display: flex;
  align-items: center;
  color: #2e2e4d;

  padding: 0.5rem 1rem;

  div {
    flex: 1;

    h2 {
      color: #2e2e4d;
    }
  }

  button {
    color: ${({ theme, lista }) => theme.colors[lista]};
    background: none;
    border: none;
  }
`;
