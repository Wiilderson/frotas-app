import { useEffect, useState } from 'react';
import API from '../services/API';
import ModalMotorista from '../components/modalMotorista';
import eventEmitter from '../services/eventEmitter';

function Motorista() {
  const [motoristas, setMotoristas] = useState([]);

  const getMotoristasByAPI = async () => {
    try {
      const response = await API.get('/motoristas');
      setMotoristas(response.data);
    } catch (error) {
      console.error('Erro ao carregar dados da API:', error);
    }
  };

  useEffect(() => {
    getMotoristasByAPI();
    eventEmitter.on('updateTableDriverByForms', getMotoristasByAPI);
    return () => {
      eventEmitter.off('updateTableDriverByForms', getMotoristasByAPI);
    };
  }, []);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <div className="w-full ps-button">
        <button
          onClick={handleOpenModal}
          type="button"
          className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        >
          Cadastrar motorista
        </button>
        {isModalOpen && <ModalMotorista onClose={handleCloseModal} />}
      </div>
      <div className=" flex justify-center">
        <div className="w-9/12 overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-white uppercase bg-gray-500 ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Motorista
                </th>
                <th scope="col" className="px-6 py-3">
                  CNH
                </th>
              </tr>
            </thead>
            <tbody>
              {motoristas.map((item, index) => (
                <tr
                  key={index}
                  className={
                    index % 2 === 0
                      ? 'bg-gray-50 dark:bg-gray-800'
                      : 'bg-white dark:bg-gray-900'
                  }
                >
                  <td className="px-6 py-4 whitespace-nowrap">{item.nome}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.cnh}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Motorista;
