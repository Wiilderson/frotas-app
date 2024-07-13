import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../App.css';
import API from '../services/API';
import eventEmitter from '../services/eventEmitter';

function ModalMotorista({ onClose }) {
  const [nome, setNome] = useState('');
  const [cnh, setCnh] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post('/motoristas/create', {
        nome,
        cnh,
      });

      toast.success('Cadastrado com sucesso!');
      eventEmitter.emit('updateTableDriverByForms');
      setTimeout(() => {
        onClose();
      }, 2000);
      console.log('Dados enviados com sucesso:', response.data);
    } catch (error) {
      toast.error(`${error.response.data.error}`);
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
                  Motorista
                </label>
                <input
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  name="nome"
                  id="nome"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Ex: João"
                  required=""
                />
                <label
                  htmlFor="name"
                  className="block mb-2 mt-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  CNH
                </label>
                <input
                  type="text"
                  value={cnh}
                  onChange={(e) => setCnh(e.target.value)}
                  name="cnh"
                  id="cnh"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Ex: 00000000"
                  required=""
                />
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
                Add Novo Motorista
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

export default ModalMotorista;
