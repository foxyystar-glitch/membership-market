import React, { useState, useMemo } from 'react';
import { memberships } from '../data/memberships';
import { urgentSales } from '../data/urgentSales';
import CategoryTabs from '../components/CategoryTabs';
import PropertyCard from '../components/PropertyCard';

export default function UrgentSalePage({ navigate }) {
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

  // 급매 데이터 - 실제 데이터 사용
  const urgentData = useMemo(() => {
    const byCategory = { golf: [], condo: [], fitness: [] };

    urgentSales
      .filter(u => u.status === 'available')
      .forEach(u => {
        const membership = memberships.find(m => m.id === u.c_id);
        if (membership) {
          byCategory[u.category].push({
            id: u.id,
            name: membership.name,
            price: u.urgent_price,
            location: membership.location,
            status: '거래가능'
          });
        }
      });

    // sold_out 상품도 추가
    urgentSales
      .filter(u => u.status === 'sold_out')
      .forEach(u => {
        const membership = memberships.find(m => m.id === u.c_id);
        if (membership) {
          byCategory[u.category].push({
            id: u.id,
            name: membership.name,
            price: u.urgent_price,
            location: membership.location,
            status: '거래완료'
          });
        }
      });

    return byCategory;
  }, []);

  const currentData = urgentData[activeTab];
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
      <div className="sticky top-0 bg-white z-10" style={{ height: '64px' }}>
        <div className="mx-auto h-full flex items-center" style={{ maxWidth: '1200px', paddingLeft: '24px', paddingRight: '24px' }}>
          <CategoryTabs activeTab={activeTab} onTabChange={setActiveTab} variant="urgent" />
        </div>
      </div>

      {/* 구분선 */}
      <div style={{ width: '100%', height: '5px', backgroundColor: '#F6F5FD' }} />

      {/* 메인 컨텐츠 */}
      <div className="mx-auto" style={{ maxWidth: '1200px', paddingLeft: '24px', paddingRight: '24px', paddingTop: '48px', paddingBottom: '48px' }}>
        <div className="mb-8 flex items-baseline justify-between">
          <h2 className="text-3xl font-bold" style={{ color: '#111111' }}>
            {config.emoji} {config.title} 급매 매물
          </h2>
          <span className="font-bold text-lg" style={{ color: '#111111' }}>🔥 총 {currentData.length}건</span>
        </div>

        {/* 급매 리스트 */}
        <div className="flex flex-wrap gap-6">
          {currentData.map((property) => (
            <PropertyCard
              key={property.id}
              category="urgent"
              name={property.name}
              location={property.location}
              price={property.price}
              status={property.status}
              onClick={() => navigate && navigate('inquiry')}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
