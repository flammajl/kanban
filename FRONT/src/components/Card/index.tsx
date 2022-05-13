import { useState } from 'react';
import { FiMoreHorizontal } from 'react-icons/fi';
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
      try {
        await api.put(`/cards/${data.id}`, {
          ...data,
          titulo: title,
          conteudo: content,
        });

        toast.success('Card atualizado com sucesso !');
        setIsEditMode(!isEditMode);
        setIsPreviewMode(false);
      } catch (error) {
        toast.error('Erro ao tentar atualizar card.');
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
      try {
        await api.delete(`/cards/${data.id}`);

        toast.success('Card deletado com sucesso !');
      } catch (error) {
        toast.error('Erro ao tentar deletar card.');
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

  return (
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
          </>
        ) : (
          <Markdown content={content} />
        )}
        {isEditMode && (
          <button type="button" onClick={handleUpdateCard}>
            Atualizar
          </button>
        )}
      </S.Content>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => handleCloseModal()}
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
      >
        <S.Content>
          <S.ModalContent>
            <h1>Tem certeza que deseja deletar este card ?</h1>

            <div>
              <button type="button" onClick={handleCloseModal}>
                Cancelar
              </button>
              <button type="button" onClick={handleDeleteCard}>
                Deletar
              </button>
            </div>
          </S.ModalContent>
        </S.Content>
      </Modal>
    </S.Container>
  );
}
