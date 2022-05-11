import { CardHeader } from '../Card/CardHeader';

import * as S from './styles';

export function Board() {
  return (
    <S.Wrapper>
      <div>
        <CardHeader type="ToDo" />
        <CardHeader type="Doing" />
        <CardHeader type="Done" />
      </div>
    </S.Wrapper>
  );
}
