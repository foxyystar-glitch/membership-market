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
      <div className="sticky top-0 bg-white z-10" style={{ height: '64px' }}>
        <div className="mx-auto h-full flex items-center" style={{ maxWidth: '1200px', paddingLeft: '24px', paddingRight: '24px' }}>
          <CategoryTabs activeTab={category} onTabChange={setCategory} variant="default" />
        </div>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="mx-auto py-12" style={{ maxWidth: '1200px', paddingLeft: '24px', paddingRight: '24px' }}>
        {/* 인기 매물 TOP 5 */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            {config.emoji} {config.title} 인기 매물 TOP 5
          </h2>

          <div className="flex flex-wrap gap-6">
            {topProperties.map((property) => (
              <PropertyCard
                key={property.id}
                category={category}
                name={property.name}
                location={property.location}
                price={property.price}
                rank={property.rank}
                onClick={() => navigate && navigate('inquiry')}
              />
            ))}
          </div>
        </section>

        {/* 전체 매물 리스트 */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            전체 {config.title} 매물
          </h2>

          <div className="flex flex-wrap gap-6">
            {propertyData.map((property) => (
              <PropertyCard
                key={property.id}
                category={category}
                name={property.name}
                location={property.location}
                price={property.price}
                onClick={() => navigate && navigate('inquiry')}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
