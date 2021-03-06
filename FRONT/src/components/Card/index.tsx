import { useState } from 'react';
import {
  FiArrowLeftCircle,
  FiArrowRightCircle,
  FiMoreHorizontal,
} from 'react-icons/fi';
import Modal from 'react-modal';
import * as Popover from '@radix-ui/react-popover';

import { useMutation } from 'react-query';
import toast from 'react-hot-toast';
import * as S from './styles';
import { Markdown } from './Markdown';
import { api } from '../../services/api';
import { queryClient } from '../../services/queryClient';
import { ICard } from '../../interfaces';

export function Card({ data }: ICard) {
  const [title, setTitle] = useState(data.titulo);
  const [content, setContent] = useState(data.conteudo);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const listTypes = ['ToDo', 'Doing', 'Done'];

  function handleChangeListType(change: 'previous' | 'next') {
    const index = listTypes.findIndex(type => type === data.lista);
    return change === 'next' ? listTypes[index + 1] : listTypes[index - 1];
  }

  function handleEditMode() {
    setIsEditMode(!isEditMode);
    setIsPreviewMode(false);
    setTitle(data.titulo);
    setContent(data.conteudo);
  }

  function handleOpenModal() {
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  function handlePreviewMode() {
    setIsPreviewMode(!isPreviewMode);
  }

  const updateTask = useMutation(
    async () => {
      setIsLoading(true);
      try {
        await api.put(`/cards/${data.id}`, {
          ...data,
          titulo: title,
          conteudo: content,
        });

        toast.success('Card atualizado com sucesso !');
        setIsEditMode(false);
        setIsPreviewMode(false);
      } catch (error) {
        toast.error('Erro ao tentar atualizar card.');
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

  const updateTaskList = useMutation(
    async (list: string) => {
      setIsLoading(true);
      try {
        await api.put(`/cards/${data.id}`, {
          ...data,
          lista: list,
        });

        toast.success('Card atualizado com sucesso !');
        setIsEditMode(false);
        setIsPreviewMode(false);
      } catch (error) {
        toast.error('Erro ao tentar atualizar card.');
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

  const deleteTask = useMutation(
    async () => {
      setIsLoading(true);
      try {
        await api.delete(`/cards/${data.id}`);

        toast.success('Card deletado com sucesso !');
      } catch (error) {
        toast.error('Erro ao tentar deletar card.');
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

  async function handleDeleteCard() {
    await deleteTask.mutateAsync();
  }

  async function handleUpdateCard() {
    await updateTask.mutateAsync();
  }

  async function handleUpdateCardList(change: 'previous' | 'next') {
    const list = handleChangeListType(change);
    await updateTaskList.mutateAsync(list);
  }

  return (
    <S.Container>
      <S.Header>
        {isEditMode ? (
          <input
            type="text"
            value={title}
            placeholder="T??tulo"
            onChange={e => setTitle(e.target.value)}
          />
        ) : (
          <h3>{title}</h3>
        )}
        <Popover.Root>
          <Popover.Trigger asChild>
            <button type="button">
              <FiMoreHorizontal />
            </button>
          </Popover.Trigger>
          <S.PopoverContent sideOffset={5}>
            <div>
              <button type="button" onClick={handleEditMode}>
                {isEditMode ? 'Cancelar' : 'Editar'}
              </button>
              <button type="button" onClick={handleOpenModal}>
                Deletar
              </button>
            </div>

            <S.Arrow />
          </S.PopoverContent>
        </Popover.Root>
      </S.Header>
      <S.Content>
        {isEditMode ? (
          // eslint-disable-next-line react/jsx-no-useless-fragment
          <>
            {isPreviewMode ? (
              <div>
                <Markdown content={content || 'Nenhum conte??do'} />
                <button type="button" onClick={handlePreviewMode}>
                  Close Preview
                </button>
              </div>
            ) : (
              <div>
                <textarea
                  value={content}
                  placeholder="Digite o conte??do em Markdown..."
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
          </>
        ) : (
          <Markdown content={content} />
        )}
        {isEditMode && (
          <button type="button" onClick={handleUpdateCard} disabled={isLoading}>
            Atualizar
          </button>
        )}
      </S.Content>

      {!isEditMode && (
        <>
          {!data.lista.includes('ToDo') && (
            <S.LeftArrow
              type="button"
              onClick={() => handleUpdateCardList('previous')}
              disabled={isLoading}
            >
              <FiArrowLeftCircle />
            </S.LeftArrow>
          )}

          {!data.lista.includes('Done') && (
            <S.RightArrow
              type="button"
              onClick={() => handleUpdateCardList('next')}
              disabled={isLoading}
            >
              <FiArrowRightCircle />
            </S.RightArrow>
          )}
        </>
      )}

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => handleCloseModal()}
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
      >
        <S.Content>
          <S.ModalContent>
            <h1>Tem certeza que deseja deletar este card ?</h1>

            <S.DeleteButtonsContainer>
              <button type="button" onClick={handleCloseModal}>
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleDeleteCard}
                disabled={isLoading}
              >
                Deletar
              </button>
            </S.DeleteButtonsContainer>
          </S.ModalContent>
        </S.Content>
      </Modal>
    </S.Container>
  );
}
