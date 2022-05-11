import { Card } from '../Card';
import { CardHeader } from '../Card/CardHeader';

import * as S from './styles';

export function Board() {
  return (
    <S.Wrapper>
      <div>
        <Card />
        <CardHeader type="Doing" />
        <CardHeader type="Done" />
      </div>
    </S.Wrapper>
  );
}
