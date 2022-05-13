import styled from 'styled-components';

export const Wrapper = styled.div`
  padding: 7rem;
  min-height: 100vh;

  @media (max-width: 514px) {
    padding: 2rem;
  }

  > div {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1rem;
    padding: 0.625rem;

    @media (max-width: 514px) {
      grid-template-columns: 1fr;
    }
  }
`;
