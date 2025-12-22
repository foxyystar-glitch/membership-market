import React, { useState } from 'react';

export default function PresalePage() {
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

  // 분양 데이터
  const presaleData = {
    golf: [
      { id: 1, name: '○○컨트리클럽', price: 55000, location: '경기 용인', status: '분양가능' },
      { id: 2, name: '△△오션CC', price: 48000, location: '부산 기장', status: '분양가능' },
      { id: 3, name: '□□밸리CC', price: 42000, location: '강원 평창', status: '분양완료' },
      { id: 4, name: '◇◇레이크CC', price: 51000, location: '경기 가평', status: '분양가능' },
      { id: 5, name: '☆☆힐스CC', price: 58000, location: '경기 여주', status: '분양가능' },
      { id: 6, name: '▽▽포레스트CC', price: 46000, location: '충북 제천', status: '분양완료' },
      { id: 7, name: '▷▷파크CC', price: 52000, location: '강원 홍천', status: '분양가능' },
      { id: 8, name: '◁◁마운틴CC', price: 49000, location: '경북 포항', status: '분양가능' },
      { id: 9, name: '♤♤그린CC', price: 54000, location: '전남 여수', status: '분양완료' },
      { id: 10, name: '♧♧스카이CC', price: 60000, location: '제주 서귀포', status: '분양가능' },
    ],
    condo: [
      { id: 1, name: '○○리조트콘도', price: 18000, location: '제주 서귀포', status: '분양가능' },
      { id: 2, name: '△△스파리조트', price: 15500, location: '강원 속초', status: '분양가능' },
      { id: 3, name: '□□마리나콘도', price: 16800, location: '부산 해운대', status: '분양완료' },
      { id: 4, name: '◇◇힐링콘도', price: 14200, location: '경북 경주', status: '분양가능' },
      { id: 5, name: '☆☆오션뷰콘도', price: 19500, location: '강원 양양', status: '분양가능' },
      { id: 6, name: '▽▽레이크콘도', price: 13800, location: '경기 가평', status: '분양완료' },
      { id: 7, name: '▷▷비치리조트', price: 17200, location: '부산 기장', status: '분양가능' },
      { id: 8, name: '◁◁힐스테이', price: 15000, location: '충남 보령', status: '분양가능' },
      { id: 9, name: '♤♤파크콘도', price: 16500, location: '전북 무주', status: '분양완료' },
      { id: 10, name: '♧♧밸리리조트', price: 14800, location: '강원 평창', status: '분양가능' },
    ],
    fitness: [
      { id: 1, name: '○○프리미엄짐', price: 4500, location: '서울 강남', status: '분양가능' },
      { id: 2, name: '△△스포츠센터', price: 3800, location: '서울 송파', status: '분양가능' },
      { id: 3, name: '□□휘트니스', price: 3200, location: '경기 분당', status: '분양완료' },
      { id: 4, name: '◇◇헬스클럽', price: 4100, location: '인천 송도', status: '분양가능' },
      { id: 5, name: '☆☆애슬레틱센터', price: 4800, location: '서울 역삼', status: '분양가능' },
      { id: 6, name: '▽▽바디짐', price: 3500, location: '경기 수원', status: '분양완료' },
      { id: 7, name: '▷▷파워센터', price: 4200, location: '서울 잠실', status: '분양가능' },
      { id: 8, name: '◁◁피지컬짐', price: 3900, location: '부산 해운대', status: '분양가능' },
      { id: 9, name: '♤♤웰니스센터', price: 4600, location: '대구 수성', status: '분양완료' },
      { id: 10, name: '♧♧스트롱짐', price: 3700, location: '대전 유성', status: '분양가능' },
    ]
  };

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
      {/* 헤더 */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-gray-900">T&G LEISURE 회원권</div>
            <nav className="flex gap-8">
              <a href="#" className="text-gray-700 hover:text-gray-900">시세표</a>
              <a href="#" className="text-gray-700 hover:text-gray-900">골프</a>
              <a href="#" className="text-gray-700 hover:text-gray-900">콘도</a>
              <a href="#" className="text-gray-700 hover:text-gray-900">피트니스</a>
              <a href="#" className="text-gray-700 hover:text-gray-900">급매</a>
              <a href="#" className="text-gray-900 font-bold border-b-2 border-gray-900">분양</a>
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
