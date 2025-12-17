import React, { useState } from 'react';

export default function UrgentSalePage() {
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

  // 급매 데이터
  const urgentData = {
    golf: [
      { id: 1, name: '○○컨트리클럽', price: 42000, originalPrice: 45000, discount: 7, location: '경기 용인', status: '거래가능' },
      { id: 2, name: '□□레이크CC', price: 48000, originalPrice: 52000, discount: 8, location: '강원 평창', status: '거래가능' },
      { id: 3, name: '☆☆오션뷰CC', price: 44500, originalPrice: 47800, discount: 7, location: '부산 기장', status: '거래완료' },
      { id: 4, name: '▽▽마운틴CC', price: 36500, originalPrice: 39800, discount: 8, location: '강원 홍천', status: '거래가능' },
      { id: 5, name: '▷▷힐스CC', price: 50000, originalPrice: 54500, discount: 8, location: '경기 여주', status: '거래가능' },
      { id: 6, name: '◁◁파크CC', price: 39800, originalPrice: 43200, discount: 8, location: '충북 제천', status: '거래완료' },
      { id: 7, name: '♤♤포레스트CC', price: 33500, originalPrice: 36900, discount: 9, location: '경북 포항', status: '거래가능' },
      { id: 8, name: '♧♧그린CC', price: 45500, originalPrice: 49500, discount: 8, location: '전남 여수', status: '거래가능' },
      { id: 9, name: '△△골프장', price: 35200, originalPrice: 38500, discount: 9, location: '경기 이천', status: '거래완료' },
      { id: 10, name: '◇◇밸리', price: 38000, originalPrice: 41200, discount: 8, location: '경기 가평', status: '거래가능' },
    ],
    condo: [
      { id: 1, name: '○○콘도', price: 10500, originalPrice: 12000, discount: 12, location: '제주 서귀포', status: '거래가능' },
      { id: 2, name: '△△리조트', price: 14000, originalPrice: 15800, discount: 11, location: '강원 속초', status: '거래가능' },
      { id: 3, name: '☆☆힐스테이', price: 12000, originalPrice: 13500, discount: 11, location: '충남 보령', status: '거래완료' },
      { id: 4, name: '▽▽스파리조트', price: 14500, originalPrice: 16200, discount: 10, location: '강원 평창', status: '거래가능' },
      { id: 5, name: '▷▷비치콘도', price: 13200, originalPrice: 14800, discount: 11, location: '부산 해운대', status: '거래가능' },
      { id: 6, name: '◁◁마리나', price: 9800, originalPrice: 10800, discount: 9, location: '인천 영종도', status: '거래완료' },
      { id: 7, name: '♤♤레이크뷰', price: 11800, originalPrice: 13200, discount: 11, location: '경기 가평', status: '거래가능' },
      { id: 8, name: '♧♧힐링스테이', price: 10700, originalPrice: 11900, discount: 10, location: '전북 무주', status: '거래가능' },
      { id: 9, name: '□□타운', price: 8500, originalPrice: 9500, discount: 11, location: '경북 경주', status: '거래완료' },
      { id: 10, name: '◇◇빌리지', price: 10000, originalPrice: 11200, discount: 11, location: '전남 여수', status: '거래가능' },
    ],
    fitness: [
      { id: 1, name: '○○휘트니스', price: 2800, originalPrice: 3200, discount: 13, location: '서울 강남', status: '거래가능' },
      { id: 2, name: '□□헬스클럽', price: 3700, originalPrice: 4100, discount: 10, location: '서울 서초', status: '거래가능' },
      { id: 3, name: '☆☆애슬레틱', price: 3400, originalPrice: 3900, discount: 13, location: '서울 역삼', status: '거래완료' },
      { id: 4, name: '▽▽파워짐', price: 3000, originalPrice: 3400, discount: 12, location: '인천 송도', status: '거래가능' },
      { id: 5, name: '▷▷바디짐', price: 4000, originalPrice: 4500, discount: 11, location: '서울 잠실', status: '거래가능' },
      { id: 6, name: '◁◁피지컬센터', price: 2800, originalPrice: 3100, discount: 10, location: '경기 수원', status: '거래완료' },
      { id: 7, name: '♤♤스트롱짐', price: 3300, originalPrice: 3750, discount: 12, location: '부산 해운대', status: '거래가능' },
      { id: 8, name: '♧♧웰니스센터', price: 3800, originalPrice: 4200, discount: 10, location: '대구 수성', status: '거래가능' },
      { id: 9, name: '△△스포츠센터', price: 2500, originalPrice: 2800, discount: 11, location: '서울 송파', status: '거래완료' },
      { id: 10, name: '◇◇PT센터', price: 3200, originalPrice: 3600, discount: 11, location: '경기 분당', status: '거래가능' },
    ]
  };

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
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-gray-900">회원권마켓</div>
            <nav className="flex gap-8">
              <a href="#" className="text-gray-700 hover:text-gray-900">시세표</a>
              <a href="#" className="text-gray-700 hover:text-gray-900">골프</a>
              <a href="#" className="text-gray-700 hover:text-gray-900">콘도</a>
              <a href="#" className="text-gray-700 hover:text-gray-900">피트니스</a>
              <a href="#" className="text-gray-900 font-bold border-b-2 border-gray-900">급매</a>
              <a href="#" className="text-gray-700 hover:text-gray-900">분양</a>
              <a href="#" className="text-gray-700 hover:text-gray-900">문의</a>
            </nav>
          </div>
        </div>
      </header>

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
                    ? 'text-red-600 border-b-2 border-red-600'
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
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-bold text-gray-900">
            {config.emoji} {config.title} 급매 매물
          </h2>
          <span className="text-red-600 font-bold text-lg">🔥 총 {currentData.length}건</span>
        </div>

        {/* 급매 리스트 */}
        <div className="grid grid-cols-5 gap-6">
          {currentData.map((property) => {
            const isAvailable = property.status === '거래가능';
            const badgeColor = isAvailable ? 'bg-red-600' : 'bg-gray-400';
            const borderColor = isAvailable ? 'border-red-200' : 'border-gray-300';
            const priceColor = isAvailable ? 'text-red-600' : 'text-gray-400';
            const buttonColor = isAvailable ? 'bg-red-600' : 'bg-gray-400';
            const buttonHover = isAvailable ? 'hover:bg-red-700' : '';
            const discountBadgeColor = isAvailable ? 'bg-red-600' : 'bg-gray-400';

            return (
              <div key={property.id} className={`relative bg-white border-2 ${borderColor} rounded-lg overflow-hidden hover:shadow-xl transition-all`}>
                {/* 거래 상태 배지 */}
                <div className={`absolute top-3 left-3 px-3 py-1 ${badgeColor} text-white text-xs font-bold rounded-full z-10 shadow-lg`}>
                  {property.status}
                </div>
                
                {/* 썸네일 */}
                <div className={`h-48 bg-gradient-to-br ${isAvailable ? 'from-red-50 to-red-100' : 'from-gray-100 to-gray-50'} flex items-center justify-center text-6xl`}>
                  {config.emoji}
                </div>
                
                {/* 정보 */}
                <div className="p-4">
                  <div className="font-bold text-gray-900 text-lg mb-1">{property.name}</div>
                  <div className="text-sm text-gray-600 mb-3">{property.location}</div>
                  
                  {/* 가격 정보 */}
                  <div className="mb-3">
                    <div className="text-xs text-gray-400 line-through mb-1">
                      {property.originalPrice.toLocaleString()}만원
                    </div>
                    <div className="flex items-end justify-between">
                      <div className={`text-2xl font-bold ${priceColor}`}>
                        {property.price.toLocaleString()}
                        <span className="text-sm text-gray-500 ml-1">만원</span>
                      </div>
                      {/* 할인율 배지 */}
                      <div className={`px-2 py-1 ${discountBadgeColor} text-white text-xs font-bold rounded`}>
                        {property.discount}% ↓
                      </div>
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
          })}
        </div>
      </div>
    </div>
  );
}