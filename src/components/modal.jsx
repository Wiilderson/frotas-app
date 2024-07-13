import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../App.css';
import API from '../services/API';
import eventEmitter from '../services/eventEmitter';

function Modal({ onClose }) {
  const [descricao, setDescricao] = useState('');
  const [tipo, setTipo] = useState('');
  const [valor, setValor] = useState(0);
  const [destino, setDestino] = useState('');
  const [seguro, setSeguro] = useState();
  const [caminhaoId, setCaminhaoId] = useState(0);
  const [motoristaId, setMotoristaId] = useState(0);
  const [motoristas, setMotoristas] = useState([]);
  const [caminhoes, setCaminhoes] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post('/entregas/create', {
        tipo,
        destino,
        valor,
        motoristaId,
        caminhaoId,
        seguro,
        descricao,
      });

      toast.success('Cadastrado com sucesso!');
      eventEmitter.emit('updateTableByForms');
      setTimeout(() => {
        onClose();
      }, 3000);
      console.log('Dados enviados com sucesso:', response.data);
    } catch (error) {
      toast.error(`${error.response.data.error}`);
    }
  };

  useEffect(() => {
    getMotoristas();
    getCaminhoes();
  }, []);

  const getMotoristas = async () => {
    try {
      const response = await API.get('/motoristas');
      setMotoristas(response.data);
    } catch (error) {
      console.error('Erro ao carregar dados da API:', error);
    }
  };

  const getCaminhoes = async () => {
    try {
      const response = await API.get('/caminhoes');
      console.log(response.data);
      setCaminhoes(response.data);
    } catch (error) {
      console.error('Erro ao carregar dados da API:', error);
    }
  };

  return (
    <>
      <div className="modal-overlay">
        <div className="relative rounded-lg shadow dark:bg-gray-700">
          <form className="p-4 md:p-5" onSubmit={handleSubmit}>
            <div className="grid gap-4 mb-4 grid-cols-2">
              <div className="col-span-2">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Tipo Mercadoria
                </label>
                <input
                  type="text"
                  value={tipo}
                  onChange={(e) => setTipo(e.target.value)}
                  name="tipo"
                  id="tipo"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Ex: Computadores"
                  required=""
                />
                <label
                  htmlFor="name"
                  className="block mb-2 mt-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Destino
                </label>
                <input
                  type="text"
                  value={destino}
                  onChange={(e) => setDestino(e.target.value)}
                  name="destino"
                  id="destino"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Ex: Região ou País"
                  required=""
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label
                  htmlFor="price"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Valor Mercadoria
                </label>
                <input
                  type="number"
                  value={valor}
                  onChange={(e) => setValor(e.target.value)}
                  name="price"
                  id="price"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="R$ 3000"
                  required=""
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label
                  htmlFor="category"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Motoristas
                </label>
                <select
                  value={motoristaId}
                  onChange={(e) => setMotoristaId(e.target.value)}
                  id="motorista"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option selected>Selecione motorista</option>
                  {motoristas.map((motorista) => (
                    <option key={motorista.id} value={motorista.id}>
                      {motorista.nome}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label
                  htmlFor="category"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Caminhões
                </label>
                <select
                  value={caminhaoId}
                  onChange={(e) => setCaminhaoId(e.target.value)}
                  id="caminhoes"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option selected>Selecione caminhão</option>
                  {caminhoes.map((caminhao) => (
                    <option key={caminhao.id} value={caminhao.id}>
                      {caminhao.modelo}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label
                  htmlFor="seguro"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Seguro
                </label>
                <select
                  name="seguro"
                  value={seguro}
                  onChange={(e) => setSeguro(e.target.value)}
                  id="seguro"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option selected>Selecione</option>
                  <option value="true">Com seguro</option>
                  <option value="false">Sem seguro</option>
                </select>
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Descrição
                </label>
                <textarea
                  id="description"
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  rows="4"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Descrição da mercadoria"
                ></textarea>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                type="submit"
                className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <svg
                  className="me-1 -ms-1 w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                Add Nova entrega
              </button>
              <button
                onClick={onClose}
                type="button"
                className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Modal;
