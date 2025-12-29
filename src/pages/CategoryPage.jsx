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
        product_name: m.product_name,
        membership_name: m.membership_name,
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
      <div className="sticky top-0 bg-white z-10" style={{ height: '64px', borderBottom: '1px solid #BDBDBD' }}>
        <div className="mx-auto h-full flex items-center" style={{ maxWidth: '1200px', paddingLeft: '24px', paddingRight: '24px' }}>
          <CategoryTabs activeTab={category} onTabChange={setCategory} variant="default" />
        </div>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="mx-auto" style={{ maxWidth: '1200px', paddingLeft: '25px', paddingRight: '25px', paddingTop: '50px', paddingBottom: '50px' }}>
        {/* 인기 매물 TOP 5 */}
        <section style={{ marginBottom: '0px' }}>
          <h2 className="font-bold mb-8" style={{ color: '#111111', fontSize: '24px' }}>
            {config.title} 인기 매물 TOP 5
          </h2>

          <div className="flex flex-wrap" style={{ gap: '25px' }}>
            {topProperties.map((property) => (
              <PropertyCard
                key={property.id}
                category={category}
                product_name={property.product_name}
                membership_name={property.membership_name}
                location={property.location}
                price={property.price}
                rank={property.rank}
                onClick={() => navigate && navigate('inquiry')}
              />
            ))}
          </div>
        </section>
      </div>

      {/* 전체 매물 리스트 */}
      <div className="mx-auto" style={{ maxWidth: '1200px', paddingLeft: '25px', paddingRight: '25px', paddingTop: '50px', paddingBottom: '50px' }}>
        <section>
          <div className="mb-8 flex items-baseline justify-between">
            <h2 className="font-bold" style={{ color: '#111111', fontSize: '24px' }}>
              전체 {config.title} 매물
            </h2>
            <span className="font-bold" style={{ color: '#111111', fontSize: '18px' }}>총 {propertyData.length}건</span>
          </div>

          <div className="flex flex-wrap" style={{ gap: '25px' }}>
            {propertyData.map((property) => (
              <PropertyCard
                key={property.id}
                category={category}
                product_name={property.product_name}
                membership_name={property.membership_name}
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
