import { FormEvent, useCallback, useState } from 'react';
import Modal from 'react-modal';
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';
import { IList } from '../../interfaces';
import { Card } from '../Card';
import { CardHeader } from '../Card/CardHeader';

import * as S from './styles';
import { Markdown } from '../Card/Markdown';
import { api } from '../../services/api';
import { queryClient } from '../../services/queryClient';

export function List({ list, cards }: IList) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function handlePreviewMode() {
    setIsPreviewMode(!isPreviewMode);
  }

  const handleOpenModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  function clearModal() {
    setTitle('');
    setContent('');
  }

  const createTask = useMutation(
    async () => {
      setIsLoading(true);
      try {
        await api.post('/cards', {
          titulo: title,
          conteudo: content,
          lista: list,
        });
        toast.success('Card cadastrado com sucesso !');
        clearModal();
        handleCloseModal();
        setIsPreviewMode(false);
      } catch (error) {
        toast.error('Erro ao cadastrar card.');
      } finally {
        setIsLoading(false);
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('cards');
      },
    }
  );

  async function handleCreateTask(e: FormEvent) {
    e.preventDefault();

    await createTask.mutateAsync();
  }

  return (
    <S.Wrapper>
      <CardHeader type={list} openModal={handleOpenModal} />
      {cards
        ?.filter(card => card.lista === list)
        .map(card => (
          <Card key={card.id} data={card} />
        ))}

      <button type="button" onClick={handleOpenModal}>
        + new task
      </button>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => handleCloseModal()}
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
      >
        <S.Content>
          <S.Title>Criar Task</S.Title>
          <S.Form onSubmit={e => handleCreateTask(e)}>
            <input
              type="text"
              value={title}
              placeholder="Título"
              onChange={e => setTitle(e.target.value)}
              required
            />

            {isPreviewMode ? (
              <div>
                <Markdown content={content || 'Nenhum conteúdo'} />
                <button type="button" onClick={handlePreviewMode}>
                  Close Preview
                </button>
              </div>
            ) : (
              <div>
                <textarea
                  value={content}
                  placeholder="Digite o conteúdo em Markdown..."
                  onChange={e => setContent(e.target.value)}
                  cols={30}
                  rows={10}
                  required
                />
                <button type="button" onClick={handlePreviewMode}>
                  Preview
                </button>
              </div>
            )}

            <button type="submit" disabled={isLoading}>
              Criar Card
            </button>
          </S.Form>
        </S.Content>
      </Modal>
    </S.Wrapper>
  );
}
