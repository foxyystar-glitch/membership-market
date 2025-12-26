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
          {/* 로고 이미지 (현재는 텍스트로 대체) */}
          <div
            className="flex items-center justify-center text-white font-bold"
            style={{ width: '212px', height: '32px', fontSize: '18px' }}
          >
            T&G LEISURE
          </div>
          {/* 회원권 텍스트 */}
          <span className="text-white font-bold text-lg">
            회원권
          </span>
        </button>

        {/* 네비게이션 메뉴 */}
        <nav className="flex gap-8" style={{ marginRight: '24px' }}>
          <button
            onClick={() => navigate('sise')}
            className="transition-colors"
            style={{
              color: currentPage === 'sise' ? '#AFC6FD' : '#FFFFFF',
              fontWeight: currentPage === 'sise' ? '700' : '400'
            }}
          >
            시세표
          </button>
          <button
            onClick={() => navigate('category', 'golf')}
            className="transition-colors"
            style={{
              color: currentPage === 'category' && selectedCategory === 'golf' ? '#AFC6FD' : '#FFFFFF',
              fontWeight: currentPage === 'category' && selectedCategory === 'golf' ? '700' : '400'
            }}
          >
            골프
          </button>
          <button
            onClick={() => navigate('category', 'condo')}
            className="transition-colors"
            style={{
              color: currentPage === 'category' && selectedCategory === 'condo' ? '#AFC6FD' : '#FFFFFF',
              fontWeight: currentPage === 'category' && selectedCategory === 'condo' ? '700' : '400'
            }}
          >
            콘도
          </button>
          <button
            onClick={() => navigate('category', 'fitness')}
            className="transition-colors"
            style={{
              color: currentPage === 'category' && selectedCategory === 'fitness' ? '#AFC6FD' : '#FFFFFF',
              fontWeight: currentPage === 'category' && selectedCategory === 'fitness' ? '700' : '400'
            }}
          >
            피트니스
          </button>
          <button
            onClick={() => navigate('urgent')}
            className="transition-colors"
            style={{
              color: currentPage === 'urgent' ? '#AFC6FD' : '#FFFFFF',
              fontWeight: currentPage === 'urgent' ? '700' : '400'
            }}
          >
            급매
          </button>
          <button
            onClick={() => navigate('presale')}
            className="transition-colors"
            style={{
              color: currentPage === 'presale' ? '#AFC6FD' : '#FFFFFF',
              fontWeight: currentPage === 'presale' ? '700' : '400'
            }}
          >
            분양
          </button>
          <button
            onClick={() => navigate('inquiry')}
            className="transition-colors"
            style={{
              color: currentPage === 'inquiry' ? '#AFC6FD' : '#FFFFFF',
              fontWeight: currentPage === 'inquiry' ? '700' : '400'
            }}
          >
            문의
          </button>
        </nav>
      </div>
    </header>
  );
}
