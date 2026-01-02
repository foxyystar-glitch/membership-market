import React, { useState, useEffect } from 'react';
import { colors } from '../config/colors';
import CategoryTabs from '../components/CategoryTabs';
import PropertyCard from '../components/PropertyCard';
import DetailModal from '../components/DetailModal';
import { getAllPresales } from '../services/membershipService';

export default function PresalePage({ navigate }) {
  const [activeTab, setActiveTab] = useState('golf');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [presaleData, setPresaleData] = useState({ golf: [], condo: [], fitness: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  // Supabase에서 분양 데이터 로드
  useEffect(() => {
    const loadPresales = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const data = await getAllPresales();
        
        // 카테고리별로 그룹화
        const byCategory = { golf: [], condo: [], fitness: [] };
        
        data.forEach(presale => {
          if (presale.memberships) {
            const statusText = presale.status === 'available' ? '분양가능' : '분양완료';
            byCategory[presale.category].push({
              id: presale.id,
              c_id: presale.c_id,
              product_name: presale.memberships.product_name,
              membership_name: presale.memberships.membership_name,
              price: presale.presale_price,
              original_price: presale.original_price,
              location: presale.memberships.location,
              status: statusText,
              raw_status: presale.status
            });
          }
        });
        
        setPresaleData(byCategory);
      } catch (err) {
        console.error('분양 데이터 로드 실패:', err);
        setError('데이터를 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    loadPresales();
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

        {/* 로딩 상태 */}
        {loading && (
          <div className="text-center py-20">
            <div className="text-lg text-gray-600">데이터를 불러오는 중...</div>
          </div>
        )}

        {/* 에러 상태 */}
        {error && (
          <div className="text-center py-20">
            <div className="text-lg text-red-600">{error}</div>
          </div>
        )}

        {/* 분양 리스트 */}
        {!loading && !error && (
          <div className="flex flex-wrap" style={{ gap: '25px' }}>
            {currentData.length === 0 ? (
              <div className="w-full text-center py-20">
                <div className="text-lg text-gray-600">분양 정보가 없습니다.</div>
              </div>
            ) : (
              currentData.map((property) => (
                <PropertyCard
                  key={property.id}
                  category={activeTab}
                  product_name={property.product_name}
                  membership_name={property.membership_name}
                  location={property.location}
                  price={property.price}
                  status={property.status}
                  navigate={navigate}
                  onClick={() => {
                    setSelectedProperty(property);
                    setIsModalOpen(true);
                  }}
                />
              ))
            )}
          </div>
        )}
      </div>

      {/* 상세보기 모달 */}
      <DetailModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {selectedProperty && (
          <div style={{ padding: '40px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '20px' }}>
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
