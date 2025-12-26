import React, { useState, useMemo } from 'react';
import { memberships } from '../data/memberships';
import { presales } from '../data/presales';
import CategoryTabs from '../components/CategoryTabs';
import PropertyCard from '../components/PropertyCard';

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
          <CategoryTabs activeTab={activeTab} onTabChange={setActiveTab} variant="default" />
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
          {currentData.map((property) => (
            <PropertyCard
              key={property.id}
              item={property}
              category={activeTab}
              type="presale"
              onInquiry={() => navigate && navigate('inquiry')}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
