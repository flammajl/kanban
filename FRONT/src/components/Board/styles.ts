import styled from 'styled-components';

export const Wrapper = styled.div`
  padding: 7rem;
  min-height: 100vh;

  > div {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1rem;
    background: #f2eff5;
    padding: 0.625rem;
  }
`;