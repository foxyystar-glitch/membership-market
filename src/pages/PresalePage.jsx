import React, { useState, useMemo } from 'react';
import { memberships } from '../data/memberships';
import { presales } from '../data/presales';
import { colors } from '../config/colors';
import CategoryTabs from '../components/CategoryTabs';
import PropertyCard from '../components/PropertyCard';
import DetailModal from '../components/DetailModal';

export default function PresalePage({ navigate }) {
  const [activeTab, setActiveTab] = useState('golf');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);

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
            product_name: membership.product_name,
            membership_name: membership.membership_name,
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
            product_name: membership.product_name,
            membership_name: membership.membership_name,
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
      <div className="sticky top-0 bg-white z-10" style={{ height: '64px', borderBottom: '1px solid #BDBDBD' }}>
        <div className="mx-auto h-full flex items-center" style={{ maxWidth: '1200px', paddingLeft: '24px', paddingRight: '24px' }}>
          <CategoryTabs activeTab={activeTab} onTabChange={setActiveTab} variant="default" />
        </div>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="mx-auto" style={{ maxWidth: '1200px', paddingLeft: '25px', paddingRight: '25px', paddingTop: '50px', paddingBottom: '50px' }}>
        <div className="mb-8 flex items-baseline justify-between">
          <h2 className="font-bold" style={{ color: '#111111', fontSize: '24px' }}>
            {config.title} 분양 정보
          </h2>
          <span className="font-bold" style={{ color: '#111111', fontSize: '18px' }}>총 {currentData.length}건</span>
        </div>

        {/* 분양 리스트 */}
        <div className="flex flex-wrap" style={{ gap: '25px' }}>
          {currentData.map((property) => (
            <PropertyCard
              key={property.id}
              category={activeTab}
              product_name={property.product_name}
              membership_name={property.membership_name}
              location={property.location}
              price={property.price}
              status={property.status}
              onClick={() => {
                setSelectedProperty(property);
                setIsModalOpen(true);
              }}
            />
          ))}
        </div>
      </div>

      {/* 상세보기 모달 */}
      <DetailModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {selectedProperty && (
          <div style={{ padding: '40px' }}>
            <div
              style={{
                position: 'absolute',
                top: '20px',
                left: '40px',
                padding: '4px 12px',
                backgroundColor: selectedProperty.status === '분양가능' ? colors[activeTab] : '#BDBDBD',
                color: '#ffffff',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: 700
              }}
            >
              {selectedProperty.status}
            </div>
            <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '20px', marginTop: '20px' }}>
              {selectedProperty.product_name}
            </h2>
            <div style={{ fontSize: '18px', marginBottom: '12px' }}>
              {selectedProperty.membership_name}
            </div>
            <div style={{ fontSize: '16px', color: '#717171', marginBottom: '20px' }}>
              {selectedProperty.location}
            </div>
            <div style={{ fontSize: '28px', fontWeight: 700, color: selectedProperty.status === '분양가능' ? colors[activeTab] : '#BDBDBD' }}>
              {selectedProperty.price.toLocaleString()} 만원
            </div>
          </div>
        )}
      </DetailModal>
    </div>
  );
}
