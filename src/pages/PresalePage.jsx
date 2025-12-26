import React, { useState, useMemo } from 'react';
import { memberships } from '../data/memberships';
import { presales } from '../data/presales';

export default function PresalePage({ navigate }) {
  const [activeTab, setActiveTab] = useState('golf');

  // 카테고리별 설정
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

  // 분양 데이터 - 실제 데이터 사용
  const presaleData = useMemo(() => {
    const byCategory = { golf: [], condo: [], fitness: [] };

    presales
      .filter(p => p.status === 'available')
      .forEach(p => {
        const membership = memberships.find(m => m.id === p.c_id);
        if (membership) {
          byCategory[p.category].push({
            id: p.id,
            name: membership.name,
            price: p.presale_price,
            location: membership.location,
            status: '분양가능'
          });
        }
      });

    // sold_out 상품도 추가
    presales
      .filter(p => p.status === 'sold_out')
      .forEach(p => {
        const membership = memberships.find(m => m.id === p.c_id);
        if (membership) {
          byCategory[p.category].push({
            id: p.id,
            name: membership.name,
            price: p.presale_price,
            location: membership.location,
            status: '분양완료'
          });
        }
      });

    return byCategory;
  }, []);

  const currentData = presaleData[activeTab];
  const config = categoryConfig[activeTab];

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

  const colorClasses = getColorClasses(config.color);

  const tabLabels = {
    golf: '골프',
    condo: '콘도',
    fitness: '피트니스'
  };

  return (
    <div className="min-h-screen bg-white">
      {/* 스티키 탭 */}
      <div className="sticky top-0 bg-white border-b border-gray-200 shadow-sm z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-2">
            {Object.keys(tabLabels).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 font-bold text-lg transition-colors ${
                  activeTab === tab
                    ? `${getColorClasses(categoryConfig[tab].color).text} border-b-2 ${getColorClasses(categoryConfig[tab].color).border}`
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tabLabels[tab]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-8 flex items-baseline justify-between">
          <h2 className="text-3xl font-bold text-gray-900">
            {config.emoji} {config.title} 분양 정보
          </h2>
          <span className={`${colorClasses.text} font-bold text-lg`}>총 {currentData.length}건</span>
        </div>

        {/* 분양 리스트 */}
        <div className="grid grid-cols-5 gap-6">
          {currentData.map((property) => {
            const isAvailable = property.status === '분양가능';
            const badgeColor = isAvailable ? colorClasses.bg : 'bg-gray-400';
            const borderColor = isAvailable ? colorClasses.border : 'border-gray-300';
            const priceColor = isAvailable ? colorClasses.text : 'text-gray-400';
            const buttonColor = isAvailable ? colorClasses.bg : 'bg-gray-400';
            const buttonHover = isAvailable ? colorClasses.hover : '';

            return (
              <div key={property.id} className={`relative bg-white border ${borderColor} rounded-lg overflow-hidden hover:shadow-lg transition-shadow`}>
                {/* 분양 상태 배지 */}
                <div className={`absolute top-3 left-3 px-3 py-1 ${badgeColor} text-white text-xs font-bold rounded-full z-10 shadow-lg`}>
                  {property.status}
                </div>

                {/* 썸네일 */}
                <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center text-6xl">
                  {config.emoji}
                </div>

                {/* 정보 */}
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
                    {isAvailable ? '문의하기' : '분양완료'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
