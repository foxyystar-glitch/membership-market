import React, { useState, useEffect, useMemo } from 'react';
import { memberships } from '../data/memberships';
import CategoryTabs from '../components/CategoryTabs';
import PropertyCard from '../components/PropertyCard';

export default function CategoryPage({ navigate, selectedCategory }) {
  const [category, setCategory] = useState(selectedCategory || 'golf');

  // selectedCategory prop이 변경되면 category state 업데이트
  useEffect(() => {
    if (selectedCategory) {
      setCategory(selectedCategory);
    }
  }, [selectedCategory]);

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

  // DB에서 카테고리별 매물 데이터 가져오기
  const propertyData = useMemo(() => {
    return memberships
      .filter(m => m.category === category && m.active_flag)
      .map(m => ({
        id: m.id,
        name: m.name,
        price: m.current_price,
        location: m.location,
        rank: m.rank
      }));
  }, [category]);

  const topProperties = useMemo(() => {
    return propertyData
      .filter(p => p.rank !== null)
      .sort((a, b) => a.rank - b.rank)
      .slice(0, 5);
  }, [propertyData]);

  const config = categoryConfig[category];

  return (
    <div className="min-h-screen bg-white">
      {/* 스티키 탭 */}
      <div className="sticky top-0 bg-white border-b border-gray-200 shadow-sm z-10">
        <div className="max-w-7xl mx-auto px-6">
          <CategoryTabs activeTab={category} onTabChange={setCategory} variant="default" />
        </div>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* 인기 매물 TOP 5 */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            {config.emoji} {config.title} 인기 매물 TOP 5
          </h2>

          <div className="grid grid-cols-5 gap-6">
            {topProperties.map((property) => (
              <div key={property.id} className="relative">
                <PropertyCard
                  item={property}
                  category={category}
                  type="category"
                  onInquiry={() => navigate && navigate('inquiry')}
                />
                {/* 순위 배지 오버레이 */}
                <div className={`absolute top-3 left-3 w-10 h-10 ${
                  category === 'golf' ? 'bg-green-600' :
                  category === 'condo' ? 'bg-blue-600' :
                  'bg-purple-600'
                } text-white rounded-full flex items-center justify-center font-bold text-lg z-10 shadow-lg`}>
                  {property.rank}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 전체 매물 리스트 */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            전체 {config.title} 매물
          </h2>

          <div className="grid grid-cols-5 gap-6">
            {propertyData.map((property) => (
              <PropertyCard
                key={property.id}
                item={property}
                category={category}
                type="category"
                onInquiry={() => navigate && navigate('inquiry')}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
