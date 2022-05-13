import { useCallback } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useQuery } from 'react-query';

import { List } from '../List';

import * as S from './styles';
import { api } from '../../services/api';

export function Board() {
  const listTypes: Array<'ToDo' | 'Doing' | 'Done'> = ['ToDo', 'Doing', 'Done'];

  async function signIn() {
    try {
      const response = await api.post('/login', {
        login: 'letscode',
        senha: 'lets@123',
      });

      api.defaults.headers.Authorization = `Bearer ${response.data}`;
    } catch (e) {
      console.error('Erro ao tentar fazer login');
    }
  }

  const getCards = useCallback(async () => {
    try {
      await signIn();
      const response = await api.get('/cards');

      return response.data;
    } catch {
      return toast.error('Falha as buscar os cards.');
    }
  }, []);

  const { data } = useQuery('cards', getCards);

  return (
    <>
      <S.Wrapper>
        <div>
          {listTypes.map(list => (
            <List key={list} list={list} cards={data} />
          ))}
        </div>
      </S.Wrapper>
      <Toaster />
    </>
  );
}
