import React from 'react';
import { colors } from '../config/colors';

/**
 * 공통 부동산/회원권 카드 컴포넌트
 * @param {object} item - 카드에 표시할 데이터
 * @param {string} category - 카테고리 ('golf', 'condo', 'fitness')
 * @param {string} type - 카드 타입 ('urgent', 'presale', 'category')
 * @param {function} onInquiry - 문의하기 클릭 핸들러
 */
export default function PropertyCard({ item, category, type = 'category', onInquiry }) {
  const categoryConfig = {
    golf: { emoji: '🏌️' },
    condo: { emoji: '🏨' },
    fitness: { emoji: '💪' }
  };

  const config = categoryConfig[category];
  const categoryColor = colors[category];

  // 급매 카드
  if (type === 'urgent') {
    const isAvailable = item.status === '거래가능';
    const urgentColor = colors.urgent;

    return (
      <div
        className="relative bg-white border-2 rounded-lg overflow-hidden hover:shadow-xl transition-all"
        style={{ borderColor: isAvailable ? `${urgentColor}33` : '#d1d5db' }}
      >
        <div
          className="absolute top-3 left-3 px-3 py-1 text-white text-xs font-bold rounded-full z-10 shadow-lg"
          style={{ backgroundColor: isAvailable ? urgentColor : '#9ca3af' }}
        >
          {item.status}
        </div>
        <div
          className="h-48 flex items-center justify-center text-6xl"
          style={{
            background: isAvailable
              ? `linear-gradient(to bottom right, ${urgentColor}20, ${urgentColor}40)`
              : 'linear-gradient(to bottom right, #f3f4f6, #e5e7eb)'
          }}
        >
          {config.emoji}
        </div>
        <div className="p-4">
          <div className="font-bold text-gray-900 text-lg mb-1">{item.name}</div>
          <div className="text-sm text-gray-600 mb-3">{item.location}</div>
          <div className="mb-3">
            <div
              className="text-2xl font-bold"
              style={{ color: isAvailable ? urgentColor : '#9ca3af' }}
            >
              {item.price.toLocaleString()}
              <span className="text-sm text-gray-500 ml-1">만원</span>
            </div>
          </div>
          <button
            onClick={() => isAvailable && onInquiry && onInquiry()}
            className={`w-full py-2 text-white rounded transition-colors text-sm font-medium ${!isAvailable && 'cursor-not-allowed'}`}
            style={{
              backgroundColor: isAvailable ? urgentColor : '#9ca3af',
              ':hover': { backgroundColor: isAvailable ? `${urgentColor}dd` : '#9ca3af' }
            }}
            disabled={!isAvailable}
          >
            {isAvailable ? '문의하기' : '거래완료'}
          </button>
        </div>
      </div>
    );
  }

  // 분양 카드
  if (type === 'presale') {
    const isAvailable = item.status === '분양가능';

    return (
      <div
        className="relative bg-white border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
        style={{ borderColor: categoryColor }}
      >
        <div
          className="absolute top-2 left-2 px-2 py-0.5 text-white font-bold rounded-full z-10 shadow-lg"
          style={{ fontSize: '10px', backgroundColor: isAvailable ? categoryColor : '#9ca3af' }}
        >
          {item.status}
        </div>
        <div className="bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center text-6xl" style={{ height: '183.47px' }}>
          {item.image || config.emoji}
        </div>
        <div className="p-4 flex flex-col" style={{ height: '172.01px' }}>
          <div className="font-bold text-gray-900 text-lg mb-1">{item.name}</div>
          <div className="text-sm text-gray-600 mb-3">{item.location}</div>
          <div className="text-2xl font-bold mb-auto" style={{ color: categoryColor }}>
            {item.price.toLocaleString()}
            <span className="text-sm text-gray-500 ml-1">만원</span>
          </div>
          <button
            onClick={() => isAvailable && onInquiry && onInquiry()}
            className={`w-full py-2 text-white rounded transition-colors text-sm font-medium ${!isAvailable && 'cursor-not-allowed'}`}
            style={{ backgroundColor: isAvailable ? categoryColor : '#9ca3af' }}
            disabled={!isAvailable}
          >
            {isAvailable ? '문의하기' : '분양완료'}
          </button>
        </div>
      </div>
    );
  }

  // 기본 카드 (카테고리 페이지용)
  return (
    <div
      className="bg-white border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
      style={{ borderColor: categoryColor }}
    >
      <div
        className="h-40 flex items-center justify-center text-5xl"
        style={{
          background: `linear-gradient(to bottom right, ${categoryColor}15, ${categoryColor}25)`
        }}
      >
        {config.emoji}
      </div>
      <div className="p-4">
        <div className="font-bold text-gray-900 text-lg mb-1">{item.name}</div>
        <div className="text-sm text-gray-600 mb-3">{item.location}</div>
        <div className="text-2xl font-bold mb-3" style={{ color: categoryColor }}>
          {item.price.toLocaleString()}
          <span className="text-sm text-gray-500 ml-1">만원</span>
        </div>
        <button
          onClick={() => onInquiry && onInquiry()}
          className="w-full py-2 text-white rounded transition-colors text-sm font-medium"
          style={{ backgroundColor: categoryColor }}
        >
          문의하기
        </button>
      </div>
    </div>
  );
}
