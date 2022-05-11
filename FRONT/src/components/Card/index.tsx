import { useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import { CardHeader } from './CardHeader';
import * as S from './styles';

export function Card() {
  const [title, setTitle] = useState('Card');
  const [content, setContent] = useState('<h1>Conteudo</h1> <p>Paragrafo</p>');
  const [isEditMode, setIsEditMode] = useState(false);

  function handleEditMode() {
    setIsEditMode(!isEditMode);
  }

  return (
    <S.Wrapper>
      <CardHeader type="ToDo" />
      <S.Container>
        <S.Header>
          {isEditMode ? (
            <input
              type="text"
              value={title}
              placeholder="Título"
              onChange={e => setTitle(e.target.value)}
            />
          ) : (
            <h3>{title}</h3>
          )}
          <button type="button" onClick={handleEditMode}>
            <FiEdit />
          </button>
        </S.Header>
        {isEditMode ? (
          <textarea
            value={content}
            placeholder="Digite o conteúdo..."
            onChange={e => setContent(e.target.value)}
            cols={30}
            rows={10}
          />
        ) : (
          <S.Content dangerouslySetInnerHTML={{ __html: content }} />
        )}
      </S.Container>
      <div>+ new task</div>
    </S.Wrapper>
  );
}
