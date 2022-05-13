import { FiPlusCircle } from 'react-icons/fi';

import * as S from './styles';

interface ICardType {
  type: string;
  openModal: () => void;
}

export function CardHeader({ type, openModal }: ICardType) {
  return (
    <S.Container>
      <S.Header>
        <div>
          <h2>{type === 'ToDo' ? 'To Do' : type}</h2>
        </div>
        <button type="button" onClick={openModal}>
          <FiPlusCircle size={24} />
        </button>
      </S.Header>
    </S.Container>
  );
}
