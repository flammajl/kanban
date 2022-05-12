import { useState } from 'react';
import { FiEdit, FiEye, FiEyeOff } from 'react-icons/fi';

import { CardHeader } from './CardHeader';
import * as S from './styles';
import { Markdown } from './Markdown';

export function Card() {
  const [title, setTitle] = useState('Card');
  const [content, setContent] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  function handleEditMode() {
    setIsEditMode(!isEditMode);
    setIsPreviewMode(false);
  }

  function handlePreviewMode() {
    setIsPreviewMode(!isPreviewMode);
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
        <S.Content>
          {isEditMode ? (
            // eslint-disable-next-line react/jsx-no-useless-fragment
            <>
              {isPreviewMode ? (
                <Markdown content={content} />
              ) : (
                <textarea
                  value={content}
                  placeholder="Digite o conteúdo em Markdown..."
                  onChange={e => setContent(e.target.value)}
                  cols={30}
                  rows={10}
                />
              )}
            </>
          ) : (
            <Markdown content={content} />
          )}
          {isEditMode && (
            <button type="button" onClick={handlePreviewMode}>
              {isPreviewMode ? (
                <>
                  <FiEyeOff /> Preview
                </>
              ) : (
                <>
                  <FiEye /> Preview
                </>
              )}
            </button>
          )}
        </S.Content>
      </S.Container>
      <div>+ new task</div>
    </S.Wrapper>
  );
}
