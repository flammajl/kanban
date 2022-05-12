import { Card } from '../Card';
import { CardHeader } from '../Card/CardHeader';

import * as S from './styles';

export function List() {
  return (
    <S.Wrapper>
      <CardHeader type="ToDo" />
      <Card />
      <div>+ new task</div>
    </S.Wrapper>
  );
}
