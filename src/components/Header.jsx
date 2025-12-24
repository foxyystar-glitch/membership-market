import React from 'react';

export default function Header({ navigate, activePage, selectedCategory }) {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div
            className="text-2xl font-bold text-gray-900 cursor-pointer hover:text-green-600 transition-colors"
            onClick={() => navigate('main')}
          >
            T&G LEISURE 회원권
          </div>
          <nav className="flex gap-8">
            <button
              onClick={() => navigate('sise')}
              className={activePage === 'sise' ? 'text-gray-900 font-bold border-b-2 border-gray-900' : 'text-gray-700 hover:text-gray-900'}
            >
              시세표
            </button>
            <button
              onClick={() => navigate('category', 'golf')}
              className={activePage === 'category' && selectedCategory === 'golf' ? 'text-gray-900 font-bold border-b-2 border-gray-900' : 'text-gray-700 hover:text-gray-900'}
            >
              골프
            </button>
            <button
              onClick={() => navigate('category', 'condo')}
              className={activePage === 'category' && selectedCategory === 'condo' ? 'text-gray-900 font-bold border-b-2 border-gray-900' : 'text-gray-700 hover:text-gray-900'}
            >
              콘도
            </button>
            <button
              onClick={() => navigate('category', 'fitness')}
              className={activePage === 'category' && selectedCategory === 'fitness' ? 'text-gray-900 font-bold border-b-2 border-gray-900' : 'text-gray-700 hover:text-gray-900'}
            >
              피트니스
            </button>
            <button
              onClick={() => navigate('urgent')}
              className={activePage === 'urgent' ? 'text-gray-900 font-bold border-b-2 border-gray-900' : 'text-gray-700 hover:text-gray-900'}
            >
              급매
            </button>
            <button
              onClick={() => navigate('presale')}
              className={activePage === 'presale' ? 'text-gray-900 font-bold border-b-2 border-gray-900' : 'text-gray-700 hover:text-gray-900'}
            >
              분양
            </button>
            <button
              onClick={() => navigate('inquiry')}
              className={activePage === 'inquiry' ? 'text-gray-900 font-bold border-b-2 border-gray-900' : 'text-gray-700 hover:text-gray-900'}
            >
              문의
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
