import { useState } from 'react';
import { Link } from 'react-router-dom';

function Header() {
  const [activeIndex, setActiveIndex] = useState(0);

  const menuItems = [
    { name: 'Entregas', path: '/' },
    { name: 'Caminhões', path: '/caminhoes' },
    { name: 'Motoristas', path: '/motoristas' },
  ];
  return (
    <header>
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <div
            className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.path}
                    className={`block py-2 pr-4 pl-3 rounded lg:p-0 ${
                      activeIndex === index
                        ? 'text-white bg-primary-700 lg:bg-transparent lg:text-primary-700 dark:text-white'
                        : 'text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700'
                    }`}
                    onClick={() => setActiveIndex(index)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
