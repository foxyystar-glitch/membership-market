import React from 'react';

/**
 * 공통 부동산/회원권 카드 컴포넌트
 * @param {object} item - 카드에 표시할 데이터
 * @param {string} category - 카테고리 ('golf', 'condo', 'fitness')
 * @param {string} type - 카드 타입 ('urgent', 'presale', 'category')
 * @param {function} onInquiry - 문의하기 클릭 핸들러
 */
export default function PropertyCard({ item, category, type = 'category', onInquiry }) {
  const categoryConfig = {
    golf: { emoji: '🏌️', color: 'green' },
    condo: { emoji: '🏨', color: 'blue' },
    fitness: { emoji: '💪', color: 'purple' }
  };

  const config = categoryConfig[category];

  const getColorClasses = (color) => {
    const colors = {
      green: {
        bg: 'bg-green-600',
        hover: 'hover:bg-green-700',
        text: 'text-green-600',
        border: 'border-green-600',
        lightBg: 'from-green-50 to-green-100'
      },
      blue: {
        bg: 'bg-blue-600',
        hover: 'hover:bg-blue-700',
        text: 'text-blue-600',
        border: 'border-blue-600',
        lightBg: 'from-blue-50 to-blue-100'
      },
      purple: {
        bg: 'bg-purple-600',
        hover: 'hover:bg-purple-700',
        text: 'text-purple-600',
        border: 'border-purple-600',
        lightBg: 'from-purple-50 to-purple-100'
      }
    };
    return colors[color];
  };

  const colorClasses = getColorClasses(config.color);

  // 급매 카드
  if (type === 'urgent') {
    const isAvailable = item.status === '거래가능';
    const badgeColor = isAvailable ? 'bg-red-600' : 'bg-gray-400';
    const borderColor = isAvailable ? 'border-red-200' : 'border-gray-300';
    const priceColor = isAvailable ? 'text-red-600' : 'text-gray-400';
    const buttonColor = isAvailable ? 'bg-red-600' : 'bg-gray-400';
    const buttonHover = isAvailable ? 'hover:bg-red-700' : '';
    const bgGradient = isAvailable ? 'from-red-50 to-red-100' : 'from-gray-100 to-gray-50';

    return (
      <div className={`relative bg-white border-2 ${borderColor} rounded-lg overflow-hidden hover:shadow-xl transition-all`}>
        <div className={`absolute top-3 left-3 px-3 py-1 ${badgeColor} text-white text-xs font-bold rounded-full z-10 shadow-lg`}>
          {item.status}
        </div>
        <div className={`h-48 bg-gradient-to-br ${bgGradient} flex items-center justify-center text-6xl`}>
          {config.emoji}
        </div>
        <div className="p-4">
          <div className="font-bold text-gray-900 text-lg mb-1">{item.name}</div>
          <div className="text-sm text-gray-600 mb-3">{item.location}</div>
          <div className="mb-3">
            <div className={`text-2xl font-bold ${priceColor}`}>
              {item.price.toLocaleString()}
              <span className="text-sm text-gray-500 ml-1">만원</span>
            </div>
          </div>
          <button
            onClick={() => isAvailable && onInquiry && onInquiry()}
            className={`w-full py-2 ${buttonColor} text-white rounded ${buttonHover} transition-colors text-sm font-medium ${!isAvailable && 'cursor-not-allowed'}`}
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
    const badgeColor = isAvailable ? colorClasses.bg : 'bg-gray-400';
    const buttonColor = isAvailable ? colorClasses.bg : 'bg-gray-400';
    const buttonHover = isAvailable ? colorClasses.hover : '';

    return (
      <div className={`relative bg-white border ${colorClasses.border} rounded-lg overflow-hidden hover:shadow-lg transition-shadow`}>
        <div className={`absolute top-2 left-2 px-2 py-0.5 ${badgeColor} text-white font-bold rounded-full z-10 shadow-lg`} style={{ fontSize: '10px' }}>
          {item.status}
        </div>
        <div className="bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center text-6xl" style={{ height: '183.47px' }}>
          {item.image || config.emoji}
        </div>
        <div className="p-4 flex flex-col" style={{ height: '172.01px' }}>
          <div className="font-bold text-gray-900 text-lg mb-1">{item.name}</div>
          <div className="text-sm text-gray-600 mb-3">{item.location}</div>
          <div className={`text-2xl font-bold ${colorClasses.text} mb-auto`}>
            {item.price.toLocaleString()}
            <span className="text-sm text-gray-500 ml-1">만원</span>
          </div>
          <button
            onClick={() => isAvailable && onInquiry && onInquiry()}
            className={`w-full py-2 ${buttonColor} text-white rounded ${buttonHover} transition-colors text-sm font-medium ${!isAvailable && 'cursor-not-allowed'}`}
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
    <div className={`bg-white border ${colorClasses.border} rounded-lg overflow-hidden hover:shadow-lg transition-shadow`}>
      <div className={`h-40 bg-gradient-to-br ${colorClasses.lightBg} flex items-center justify-center text-5xl`}>
        {config.emoji}
      </div>
      <div className="p-4">
        <div className="font-bold text-gray-900 text-lg mb-1">{item.name}</div>
        <div className="text-sm text-gray-600 mb-3">{item.location}</div>
        <div className={`text-2xl font-bold ${colorClasses.text} mb-3`}>
          {item.price.toLocaleString()}
          <span className="text-sm text-gray-500 ml-1">만원</span>
        </div>
        <button
          onClick={() => onInquiry && onInquiry()}
          className={`w-full py-2 ${colorClasses.bg} text-white rounded ${colorClasses.hover} transition-colors text-sm font-medium`}
        >
          문의하기
        </button>
      </div>
    </div>
  );
}
