import { useEffect, useState } from 'react';
import API from '../services/API';
import Modal from '../components/modal';
import eventEmitter from '../services/eventEmitter';
import { AiFillDollarCircle } from 'react-icons/ai';
import { AiFillSafetyCertificate } from 'react-icons/ai';
import { IoWarning } from 'react-icons/io5';
import { Tooltip } from 'react-tooltip';

function Home() {
  const [entregas, setEntregas] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getEntregasbyAPI = async () => {
    try {
      const response = await API.get('/entregas');
      setEntregas(response.data);
    } catch (error) {
      console.error('Erro ao carregar dados da API:', error);
    }
  };

  useEffect(() => {
    getEntregasbyAPI();
    eventEmitter.on('updateTableByForms', getEntregasbyAPI);
    return () => {
      eventEmitter.off('updateTableByForms', getEntregasbyAPI);
    };
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
  };

  return (
    <>
      <div className="w-full ps-button">
        <button
          onClick={handleOpenModal}
          type="button"
          className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        >
          Cadastrar entrega
        </button>
        {isModalOpen && <Modal onClose={handleCloseModal} />}
      </div>
      <div className=" flex justify-center">
        <div className="w-9/12 overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-white uppercase bg-gray-500 ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Tipo
                </th>
                <th scope="col" className="px-6 py-3">
                  Destino
                </th>
                <th scope="col" className="px-6 py-3">
                  Descrição
                </th>
                <th scope="col" className="px-5 py-3">
                  Valores
                </th>
                <th scope="col" className="px-6 py-3">
                  Seguro
                </th>
                <th scope="col" className="px-6 py-3">
                  Motorista
                </th>
                <th scope="col" className="px-6 py-3">
                  Caminhão
                </th>
                <th scope="col" className="px-6 py-3">
                  Horário
                </th>
                <th scope="col" className="px-6 py-3">
                  Infos
                </th>
              </tr>
            </thead>
            <tbody>
              {entregas.map((item, index) => (
                <tr
                  key={index}
                  className={
                    index % 2 === 0
                      ? 'bg-gray-50 dark:bg-gray-800'
                      : 'bg-white dark:bg-gray-900'
                  }
                >
                  <td className="px-6 py-4 whitespace-nowrap">{item.tipo}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.destino}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.descricao}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    R$ {item.valor}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.indicadorSeguro}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.motoristas.nome}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.caminhoes.modelo}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {formatDate(item.createdAt)}
                  </td>
                  <td className="px-6 py-4 flex ">
                    <Tooltip id="my-tooltip" />
                    <a
                      data-tooltip-id="my-tooltip"
                      data-tooltip-content="Carga Valiosa!"
                    >
                      {item.indicadorValioso ? (
                        <AiFillDollarCircle
                          size={20}
                          style={{
                            marginLeft: '4px',
                            color: 'green',
                            backgroundColor: 'white',
                            borderRadius: '5px',
                          }}
                        />
                      ) : (
                        ''
                      )}
                    </a>

                    <a
                      data-tooltip-id="my-tooltip"
                      data-tooltip-content="Carga cotém seguro!"
                    >
                      {item.indicadorSeguro ? (
                        <AiFillSafetyCertificate
                          size={20}
                          style={{
                            marginLeft: '4px',
                            color: 'blue',
                            backgroundColor: 'white',
                            borderRadius: '5px',
                          }}
                        />
                      ) : (
                        ''
                      )}
                    </a>
                    <a
                      data-tooltip-id="my-tooltip"
                      data-tooltip-content="Carga Perigosa!"
                    >
                      {item.indicadorPerigoso ? (
                        <IoWarning
                          size={20}
                          style={{
                            marginLeft: '4px',
                            color: 'yellow',
                            backgroundColor: '',
                            borderRadius: '5px',
                          }}
                        />
                      ) : (
                        ''
                      )}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Home;
