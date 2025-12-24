import React from 'react';

const categoryConfig = {
  golf: {
    title: '골프',
    emoji: '🏌️',
    color: 'green'
  },
  condo: {
    title: '콘도',
    emoji: '🏨',
    color: 'blue'
  },
  fitness: {
    title: '피트니스',
    emoji: '💪',
    color: 'purple'
  }
};

const getColorClasses = (color) => {
  const colors = {
    green: {
      bg: 'bg-green-600',
      hover: 'hover:bg-green-700',
      text: 'text-green-600',
      border: 'border-green-600'
    },
    blue: {
      bg: 'bg-blue-600',
      hover: 'hover:bg-blue-700',
      text: 'text-blue-600',
      border: 'border-blue-600'
    },
    purple: {
      bg: 'bg-purple-600',
      hover: 'hover:bg-purple-700',
      text: 'text-purple-600',
      border: 'border-purple-600'
    }
  };
  return colors[color];
};

/**
 * PropertyCard 컴포넌트
 *
 * @param {Object} property - 매물 데이터
 * @param {string} category - 카테고리 ('golf', 'condo', 'fitness')
 * @param {string} type - 카드 타입 ('category', 'urgent', 'presale')
 */
export default function PropertyCard({ property, category, type = 'category' }) {
  const config = categoryConfig[category];
  const colorClasses = getColorClasses(config.color);

  // 카테고리 페이지 카드 (rank 포함)
  if (type === 'category') {
    return (
      <div className={`relative bg-white border ${colorClasses.border} rounded-lg overflow-hidden hover:shadow-lg transition-shadow`}>
        {property.rank && (
          <div className={`absolute top-3 left-3 w-10 h-10 ${colorClasses.bg} text-white rounded-full flex items-center justify-center font-bold text-lg z-10 shadow-lg`}>
            {property.rank}
          </div>
        )}

        <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center text-6xl">
          {config.emoji}
        </div>

        <div className="p-4">
          <div className="font-bold text-gray-900 text-lg mb-1">{property.name}</div>
          <div className="text-sm text-gray-600 mb-3">{property.location}</div>
          <div className={`text-2xl font-bold ${colorClasses.text}`}>
            {property.price.toLocaleString()}
            <span className="text-sm text-gray-500 ml-1">만원</span>
          </div>
          <button className={`w-full mt-4 py-2 ${colorClasses.bg} text-white rounded ${colorClasses.hover} transition-colors text-sm font-medium`}>
            상세보기
          </button>
        </div>
      </div>
    );
  }

  // 급매 페이지 카드
  if (type === 'urgent') {
    const isAvailable = property.status === '거래가능';
    const badgeColor = isAvailable ? 'bg-red-600' : 'bg-gray-400';
    const borderColor = isAvailable ? 'border-red-200' : 'border-gray-300';
    const priceColor = isAvailable ? 'text-red-600' : 'text-gray-400';
    const buttonColor = isAvailable ? 'bg-red-600' : 'bg-gray-400';
    const buttonHover = isAvailable ? 'hover:bg-red-700' : '';
    const discountBadgeColor = isAvailable ? 'bg-red-600' : 'bg-gray-400';

    return (
      <div className={`relative bg-white border-2 ${borderColor} rounded-lg overflow-hidden hover:shadow-xl transition-all`}>
        <div className={`absolute top-3 left-3 px-3 py-1 ${badgeColor} text-white text-xs font-bold rounded-full z-10 shadow-lg`}>
          {property.status}
        </div>

        <div className={`h-48 bg-gradient-to-br ${isAvailable ? 'from-red-50 to-red-100' : 'from-gray-100 to-gray-50'} flex items-center justify-center text-6xl`}>
          {config.emoji}
        </div>

        <div className="p-4">
          <div className="font-bold text-gray-900 text-lg mb-1">{property.name}</div>
          <div className="text-sm text-gray-600 mb-3">{property.location}</div>

          <div className="mb-3">
            {property.originalPrice && (
              <div className="text-xs text-gray-400 line-through mb-1">
                {property.originalPrice.toLocaleString()}만원
              </div>
            )}
            <div className="flex items-end justify-between">
              <div className={`text-2xl font-bold ${priceColor}`}>
                {property.price.toLocaleString()}
                <span className="text-sm text-gray-500 ml-1">만원</span>
              </div>
              {property.discount && (
                <div className={`px-2 py-1 ${discountBadgeColor} text-white text-xs font-bold rounded`}>
                  {property.discount}% ↓
                </div>
              )}
            </div>
          </div>

          <button
            className={`w-full py-2 ${buttonColor} text-white rounded ${buttonHover} transition-colors text-sm font-medium ${!isAvailable && 'cursor-not-allowed'}`}
            disabled={!isAvailable}
          >
            {isAvailable ? '급매 문의' : '거래완료'}
          </button>
        </div>
      </div>
    );
  }

  // 분양 페이지 카드
  if (type === 'presale') {
    const isAvailable = property.status === '분양가능';
    const badgeColor = isAvailable ? colorClasses.bg : 'bg-gray-400';
    const borderColor = isAvailable ? colorClasses.border : 'border-gray-300';
    const priceColor = isAvailable ? colorClasses.text : 'text-gray-400';
    const buttonColor = isAvailable ? colorClasses.bg : 'bg-gray-400';
    const buttonHover = isAvailable ? colorClasses.hover : '';

    return (
      <div className={`relative bg-white border ${borderColor} rounded-lg overflow-hidden hover:shadow-lg transition-shadow`}>
        <div className={`absolute top-3 left-3 px-3 py-1 ${badgeColor} text-white text-xs font-bold rounded-full z-10 shadow-lg`}>
          {property.status}
        </div>

        <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center text-6xl">
          {config.emoji}
        </div>

        <div className="p-4">
          <div className="font-bold text-gray-900 text-lg mb-1">{property.name}</div>
          <div className="text-sm text-gray-600 mb-3">{property.location}</div>
          <div className={`text-2xl font-bold ${priceColor}`}>
            {property.price.toLocaleString()}
            <span className="text-sm text-gray-500 ml-1">만원</span>
          </div>
          <button
            className={`w-full mt-4 py-2 ${buttonColor} text-white rounded ${buttonHover} transition-colors text-sm font-medium ${!isAvailable && 'cursor-not-allowed'}`}
            disabled={!isAvailable}
          >
            {isAvailable ? '분양문의' : '분양완료'}
          </button>
        </div>
      </div>
    );
  }

  return null;
}
