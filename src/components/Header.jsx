import React from 'react';
import { colors } from '../config/colors';

export default function Header({ navigate, currentPage, selectedCategory }) {
  return (
    <header className="w-full" style={{ backgroundColor: colors.brand }}>
      <div className="mx-auto px-6 flex items-center justify-between" style={{ maxWidth: '1200px', height: '64px' }}>
        {/* 로고 및 회원권 텍스트 */}
        <button
          onClick={() => navigate('main')}
          className="flex items-center gap-2.5 hover:opacity-80 transition-opacity"
        >
          {/* 로고 이미지 */}
          <img
            src="/TNG_LEISURE_logo.svg"
            alt="T&G LEISURE"
            style={{ width: '212px', height: '32px' }}
          />
          {/* 회원권 텍스트 */}
          <span className="text-white font-bold" style={{ fontSize: '24px' }}>
            회원권
          </span>
        </button>

        {/* 네비게이션 메뉴 */}
        <nav className="flex gap-8">
          <button
            onClick={() => navigate('sise')}
            className={`transition-all ${currentPage === 'sise' ? 'border-b-2' : 'hover:opacity-80'}`}
            style={{
              color: currentPage === 'sise' ? colors.selectedLight : colors.textWhite,
              fontWeight: currentPage === 'sise' ? '700' : '500',
              fontSize: '18px',
              borderColor: currentPage === 'sise' ? colors.selectedLight : 'transparent'
            }}
          >
            시세표
          </button>
          <button
            onClick={() => navigate('category', 'golf')}
            className={`transition-all ${currentPage === 'category' && selectedCategory === 'golf' ? 'border-b-2' : 'hover:opacity-80'}`}
            style={{
              color: currentPage === 'category' && selectedCategory === 'golf' ? colors.selectedLight : colors.textWhite,
              fontWeight: currentPage === 'category' && selectedCategory === 'golf' ? '700' : '500',
              fontSize: '18px',
              borderColor: currentPage === 'category' && selectedCategory === 'golf' ? colors.selectedLight : 'transparent'
            }}
          >
            골프
          </button>
          <button
            onClick={() => navigate('category', 'condo')}
            className={`transition-all ${currentPage === 'category' && selectedCategory === 'condo' ? 'border-b-2' : 'hover:opacity-80'}`}
            style={{
              color: currentPage === 'category' && selectedCategory === 'condo' ? colors.selectedLight : colors.textWhite,
              fontWeight: currentPage === 'category' && selectedCategory === 'condo' ? '700' : '500',
              fontSize: '18px',
              borderColor: currentPage === 'category' && selectedCategory === 'condo' ? colors.selectedLight : 'transparent'
            }}
          >
            콘도
          </button>
          <button
            onClick={() => navigate('category', 'fitness')}
            className={`transition-all ${currentPage === 'category' && selectedCategory === 'fitness' ? 'border-b-2' : 'hover:opacity-80'}`}
            style={{
              color: currentPage === 'category' && selectedCategory === 'fitness' ? colors.selectedLight : colors.textWhite,
              fontWeight: currentPage === 'category' && selectedCategory === 'fitness' ? '700' : '500',
              fontSize: '18px',
              borderColor: currentPage === 'category' && selectedCategory === 'fitness' ? colors.selectedLight : 'transparent'
            }}
          >
            피트니스
          </button>
          <button
            onClick={() => navigate('urgent')}
            className={`transition-all ${currentPage === 'urgent' ? 'border-b-2' : 'hover:opacity-80'}`}
            style={{
              color: currentPage === 'urgent' ? colors.selectedLight : colors.textWhite,
              fontWeight: currentPage === 'urgent' ? '700' : '500',
              fontSize: '18px',
              borderColor: currentPage === 'urgent' ? colors.selectedLight : 'transparent'
            }}
          >
            급매
          </button>
          <button
            onClick={() => navigate('presale')}
            className={`transition-all ${currentPage === 'presale' ? 'border-b-2' : 'hover:opacity-80'}`}
            style={{
              color: currentPage === 'presale' ? colors.selectedLight : colors.textWhite,
              fontWeight: currentPage === 'presale' ? '700' : '500',
              fontSize: '18px',
              borderColor: currentPage === 'presale' ? colors.selectedLight : 'transparent'
            }}
          >
            분양
          </button>
          <button
            onClick={() => navigate('inquiry')}
            className={`transition-all ${currentPage === 'inquiry' ? 'border-b-2' : 'hover:opacity-80'}`}
            style={{
              color: currentPage === 'inquiry' ? colors.selectedLight : colors.textWhite,
              fontWeight: currentPage === 'inquiry' ? '700' : '500',
              fontSize: '18px',
              borderColor: currentPage === 'inquiry' ? colors.selectedLight : 'transparent'
            }}
          >
            문의
          </button>
        </nav>
      </div>
    </header>
  );
}
