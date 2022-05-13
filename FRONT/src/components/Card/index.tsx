import { useState } from 'react';
import { FiEye, FiEyeOff, FiMoreHorizontal, FiTrash2 } from 'react-icons/fi';
import Modal from 'react-modal';

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
          <>
            <button type="button" onClick={handleOpenModal}>
              <FiTrash2 />
            </button>

            <h3>{title}</h3>
          </>
        )}
        <button type="button" onClick={handleEditMode}>
          <FiMoreHorizontal />
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
                <FiEyeOff /> Close Preview
              </>
            ) : (
              <>
                <FiEye /> Preview
              </>
            )}
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
