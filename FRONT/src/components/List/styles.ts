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
