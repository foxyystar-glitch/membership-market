import React from 'react';

export default function Header({ navigate, currentPage, selectedCategory }) {
  return (
    <header className="w-full" style={{ backgroundColor: '#284AB5' }}>
      <div className="mx-auto px-6 flex items-center justify-between" style={{ maxWidth: '1200px', height: '64px' }}>
        {/* 로고 및 회원권 텍스트 */}
        <button
          onClick={() => navigate('main')}
          className="flex items-center gap-2.5 hover:opacity-80 transition-opacity"
          style={{ marginLeft: '24px' }}
        >
          {/* 로고 이미지 */}
          <img
            src="/TNG_LEISURE_logo.svg"
            alt="T&G LEISURE"
            style={{ width: '212px', height: '32px' }}
          />
          {/* 회원권 텍스트 */}
          <span className="text-white font-bold text-lg">
            회원권
          </span>
        </button>

        {/* 네비게이션 메뉴 */}
        <nav className="flex gap-8" style={{ marginRight: '24px' }}>
          <button
            onClick={() => navigate('sise')}
            className={`transition-all ${currentPage === 'sise' ? 'border-b-2' : ''}`}
            style={{
              color: currentPage === 'sise' ? '#AFC6FD' : '#FFFFFF',
              fontWeight: currentPage === 'sise' ? '700' : '400',
              borderColor: currentPage === 'sise' ? '#AFC6FD' : 'transparent',
              transform: currentPage === 'sise' ? 'translateY(-2px)' : 'translateY(0)'
            }}
          >
            시세표
          </button>
          <button
            onClick={() => navigate('category', 'golf')}
            className={`transition-all ${currentPage === 'category' && selectedCategory === 'golf' ? 'border-b-2' : ''}`}
            style={{
              color: currentPage === 'category' && selectedCategory === 'golf' ? '#AFC6FD' : '#FFFFFF',
              fontWeight: currentPage === 'category' && selectedCategory === 'golf' ? '700' : '400',
              borderColor: currentPage === 'category' && selectedCategory === 'golf' ? '#AFC6FD' : 'transparent',
              transform: currentPage === 'category' && selectedCategory === 'golf' ? 'translateY(-2px)' : 'translateY(0)'
            }}
          >
            골프
          </button>
          <button
            onClick={() => navigate('category', 'condo')}
            className={`transition-all ${currentPage === 'category' && selectedCategory === 'condo' ? 'border-b-2' : ''}`}
            style={{
              color: currentPage === 'category' && selectedCategory === 'condo' ? '#AFC6FD' : '#FFFFFF',
              fontWeight: currentPage === 'category' && selectedCategory === 'condo' ? '700' : '400',
              borderColor: currentPage === 'category' && selectedCategory === 'condo' ? '#AFC6FD' : 'transparent',
              transform: currentPage === 'category' && selectedCategory === 'condo' ? 'translateY(-2px)' : 'translateY(0)'
            }}
          >
            콘도
          </button>
          <button
            onClick={() => navigate('category', 'fitness')}
            className={`transition-all ${currentPage === 'category' && selectedCategory === 'fitness' ? 'border-b-2' : ''}`}
            style={{
              color: currentPage === 'category' && selectedCategory === 'fitness' ? '#AFC6FD' : '#FFFFFF',
              fontWeight: currentPage === 'category' && selectedCategory === 'fitness' ? '700' : '400',
              borderColor: currentPage === 'category' && selectedCategory === 'fitness' ? '#AFC6FD' : 'transparent',
              transform: currentPage === 'category' && selectedCategory === 'fitness' ? 'translateY(-2px)' : 'translateY(0)'
            }}
          >
            피트니스
          </button>
          <button
            onClick={() => navigate('urgent')}
            className={`transition-all ${currentPage === 'urgent' ? 'border-b-2' : ''}`}
            style={{
              color: currentPage === 'urgent' ? '#AFC6FD' : '#FFFFFF',
              fontWeight: currentPage === 'urgent' ? '700' : '400',
              borderColor: currentPage === 'urgent' ? '#AFC6FD' : 'transparent',
              transform: currentPage === 'urgent' ? 'translateY(-2px)' : 'translateY(0)'
            }}
          >
            급매
          </button>
          <button
            onClick={() => navigate('presale')}
            className={`transition-all ${currentPage === 'presale' ? 'border-b-2' : ''}`}
            style={{
              color: currentPage === 'presale' ? '#AFC6FD' : '#FFFFFF',
              fontWeight: currentPage === 'presale' ? '700' : '400',
              borderColor: currentPage === 'presale' ? '#AFC6FD' : 'transparent',
              transform: currentPage === 'presale' ? 'translateY(-2px)' : 'translateY(0)'
            }}
          >
            분양
          </button>
          <button
            onClick={() => navigate('inquiry')}
            className={`transition-all ${currentPage === 'inquiry' ? 'border-b-2' : ''}`}
            style={{
              color: currentPage === 'inquiry' ? '#AFC6FD' : '#FFFFFF',
              fontWeight: currentPage === 'inquiry' ? '700' : '400',
              borderColor: currentPage === 'inquiry' ? '#AFC6FD' : 'transparent',
              transform: currentPage === 'inquiry' ? 'translateY(-2px)' : 'translateY(0)'
            }}
          >
            문의
          </button>
        </nav>
      </div>
    </header>
  );
}
