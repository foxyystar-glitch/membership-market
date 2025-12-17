import React, { useState } from 'react';

export default function CategoryPage() {
  const [category, setCategory] = useState('golf');

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

  // 전체 매물 데이터 (시세표 데이터 활용)
  const propertyData = {
    golf: [
      { id: 1, name: '○○컨트리클럽', price: 45000, location: '경기 용인', rank: 1 },
      { id: 2, name: '△△골프장', price: 38500, location: '경기 이천', rank: 5 },
      { id: 3, name: '□□레이크CC', price: 52000, location: '강원 평창', rank: 2 },
      { id: 4, name: '◇◇밸리', price: 41200, location: '경기 가평', rank: null },
      { id: 5, name: '☆☆오션뷰CC', price: 47800, location: '부산 기장', rank: 3 },
      { id: 6, name: '▽▽마운틴CC', price: 39800, location: '강원 홍천', rank: null },
      { id: 7, name: '▷▷힐스CC', price: 54500, location: '경기 여주', rank: null },
      { id: 8, name: '◁◁파크CC', price: 43200, location: '충북 제천', rank: 4 },
      { id: 9, name: '♤♤포레스트CC', price: 36900, location: '경북 포항', rank: null },
      { id: 10, name: '♧♧그린CC', price: 49500, location: '전남 여수', rank: null },
    ],
    condo: [
      { id: 1, name: '○○콘도', price: 12000, location: '제주 서귀포', rank: 1 },
      { id: 2, name: '△△리조트', price: 15800, location: '강원 속초', rank: 2 },
      { id: 3, name: '□□타운', price: 9500, location: '경북 경주', rank: 5 },
      { id: 4, name: '◇◇빌리지', price: 11200, location: '전남 여수', rank: null },
      { id: 5, name: '☆☆힐스테이', price: 13500, location: '충남 보령', rank: 3 },
      { id: 6, name: '▽▽스파리조트', price: 16200, location: '강원 평창', rank: null },
      { id: 7, name: '▷▷비치콘도', price: 14800, location: '부산 해운대', rank: 4 },
      { id: 8, name: '◁◁마리나', price: 10800, location: '인천 영종도', rank: null },
      { id: 9, name: '♤♤레이크뷰', price: 13200, location: '경기 가평', rank: null },
      { id: 10, name: '♧♧힐링스테이', price: 11900, location: '전북 무주', rank: null },
    ],
    fitness: [
      { id: 1, name: '○○휘트니스', price: 3200, location: '서울 강남', rank: 2 },
      { id: 2, name: '△△스포츠센터', price: 2800, location: '서울 송파', rank: 5 },
      { id: 3, name: '□□헬스클럽', price: 4100, location: '서울 서초', rank: 1 },
      { id: 4, name: '◇◇PT센터', price: 3600, location: '경기 분당', rank: 3 },
      { id: 5, name: '☆☆애슬레틱', price: 3900, location: '서울 역삼', rank: null },
      { id: 6, name: '▽▽파워짐', price: 3400, location: '인천 송도', rank: 4 },
      { id: 7, name: '▷▷바디짐', price: 4500, location: '서울 잠실', rank: null },
      { id: 8, name: '◁◁피지컬센터', price: 3100, location: '경기 수원', rank: null },
      { id: 9, name: '♤♤스트롱짐', price: 3750, location: '부산 해운대', rank: null },
      { id: 10, name: '♧♧웰니스센터', price: 4200, location: '대구 수성', rank: null },
    ]
  };

  const currentData = propertyData[category];
  const topProperties = currentData.filter(p => p.rank !== null).sort((a, b) => a.rank - b.rank);
  const config = categoryConfig[category];

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-gray-900">회원권마켓</div>
            <nav className="flex gap-8">
              <a href="#" className="text-gray-700 hover:text-gray-900">시세표</a>
              <button 
                onClick={() => setCategory('golf')}
                className={category === 'golf' ? 'text-gray-900 font-bold border-b-2 border-gray-900' : 'text-gray-700 hover:text-gray-900'}
              >
                골프
              </button>
              <button 
                onClick={() => setCategory('condo')}
                className={category === 'condo' ? 'text-gray-900 font-bold border-b-2 border-gray-900' : 'text-gray-700 hover:text-gray-900'}
              >
                콘도
              </button>
              <button 
                onClick={() => setCategory('fitness')}
                className={category === 'fitness' ? 'text-gray-900 font-bold border-b-2 border-gray-900' : 'text-gray-700 hover:text-gray-900'}
              >
                피트니스
              </button>
              <a href="#" className="text-gray-700 hover:text-gray-900">급매</a>
              <a href="#" className="text-gray-700 hover:text-gray-900">분양</a>
              <a href="#" className="text-gray-700 hover:text-gray-900">문의</a>
            </nav>
          </div>
        </div>
      </header>

      {/* 메인 컨텐츠 */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* 인기 매물 TOP 5 */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            {config.emoji} {config.title} 인기 매물 TOP 5
          </h2>
          
          <div className="grid grid-cols-5 gap-6">
            {topProperties.map((property) => {
              return (
                <div key={property.id} className={`relative bg-white border ${colorClasses.border} rounded-lg overflow-hidden hover:shadow-lg transition-shadow`}>
                  {/* 순위 배지 */}
                  <div className={`absolute top-3 left-3 w-10 h-10 ${colorClasses.bg} text-white rounded-full flex items-center justify-center font-bold text-lg z-10 shadow-lg`}>
                    {property.rank}
                  </div>
                  
                  {/* 썸네일 */}
                  <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center text-6xl">
                    {config.emoji}
                  </div>
                  
                  {/* 정보 */}
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
            })}
          </div>
        </section>

        {/* 전체 매물 리스트 */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            전체 {config.title} 매물
          </h2>
          
          <div className="grid grid-cols-5 gap-6">
            {currentData.map((property) => (
              <div key={property.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                {/* 썸네일 */}
                <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center text-6xl">
                  {config.emoji}
                </div>
                
                {/* 정보 */}
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
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}