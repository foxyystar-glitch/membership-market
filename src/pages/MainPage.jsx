import React, { useState } from 'react';

export default function MembershipSite() {
  const [priceTab, setPriceTab] = useState('golf');
  const [urgentTab, setUrgentTab] = useState('golf');
  const [saleTab, setSaleTab] = useState('golf');

  // 샘플 시세 데이터
  const priceData = {
    golf: [
      { name: '○○컨트리클럽', price: 45000, change: 1035, changePercent: 2.3, trend: 'up' },
      { name: '△△골프장', price: 38500, change: -467, changePercent: -1.2, trend: 'down' },
      { name: '□□레이크CC', price: 52000, change: 1757, changePercent: 3.5, trend: 'up' },
      { name: '◇◇밸리', price: 41200, change: 0, changePercent: 0.0, trend: 'stable' },
      { name: '☆☆오션뷰CC', price: 47800, change: 845, changePercent: 1.8, trend: 'up' },
    ],
    condo: [
      { name: '○○콘도', price: 12000, change: 177, changePercent: 1.5, trend: 'up' },
      { name: '△△리조트', price: 15800, change: 325, changePercent: 2.1, trend: 'up' },
      { name: '□□타운', price: 9500, change: -77, changePercent: -0.8, trend: 'down' },
      { name: '◇◇빌리지', price: 11200, change: 56, changePercent: 0.5, trend: 'up' },
      { name: '☆☆힐스테이', price: 13500, change: 160, changePercent: 1.2, trend: 'up' },
    ],
    fitness: [
      { name: '○○휘트니스', price: 3200, change: 32, changePercent: 1.0, trend: 'up' },
      { name: '△△스포츠센터', price: 2800, change: 0, changePercent: 0.0, trend: 'stable' },
      { name: '□□헬스클럽', price: 4100, change: 100, changePercent: 2.5, trend: 'up' },
      { name: '◇◇PT센터', price: 3600, change: -18, changePercent: -0.5, trend: 'down' },
      { name: '☆☆애슬레틱', price: 3900, change: 58, changePercent: 1.5, trend: 'up' },
    ]
  };

  // 샘플 급매 데이터
  const urgentData = {
    golf: [
      { name: '○○컨트리클럽', price: '42,000', location: '경기' },
      { name: '□□레이크CC', price: '48,000', location: '강원' },
      { name: '☆☆오션뷰CC', price: '44,500', location: '부산' },
    ],
    condo: [
      { name: '○○콘도', price: '10,500', location: '제주' },
      { name: '△△리조트', price: '14,000', location: '강원' },
      { name: '☆☆힐스테이', price: '12,000', location: '경북' },
    ],
    fitness: [
      { name: '○○휘트니스', price: '2,800', location: '서울' },
      { name: '□□헬스클럽', price: '3,700', location: '경기' },
      { name: '☆☆애슬레틱', price: '3,400', location: '인천' },
    ]
  };

  // 샘플 분양 데이터
  const saleData = {
    golf: [
      { name: '○○컨트리클럽', price: 55000, location: '경기 용인', image: '🏌️', status: '분양가능' },
      { name: '△△오션CC', price: 48000, location: '부산 기장', image: '🏌️', status: '분양가능' },
      { name: '□□밸리CC', price: 42000, location: '강원 평창', image: '🏌️', status: '분양가능' },
      { name: '◇◇레이크CC', price: 51000, location: '경기 가평', image: '🏌️', status: '분양가능' },
      { name: '☆☆힐스CC', price: 58000, location: '경기 여주', image: '🏌️', status: '분양가능' },
    ],
    condo: [
      { name: '○○리조트콘도', price: 18000, location: '제주 서귀포', image: '🏨', status: '분양가능' },
      { name: '△△스파리조트', price: 15500, location: '강원 속초', image: '🏨', status: '분양가능' },
      { name: '□□마리나콘도', price: 16800, location: '부산 해운대', image: '🏨', status: '분양가능' },
      { name: '◇◇힐링콘도', price: 14200, location: '경북 경주', image: '🏨', status: '분양가능' },
      { name: '☆☆오션뷰콘도', price: 19500, location: '강원 양양', image: '🏨', status: '분양가능' },
    ],
    fitness: [
      { name: '○○프리미엄짐', price: 4500, location: '서울 강남', image: '💪', status: '분양가능' },
      { name: '△△스포츠센터', price: 3800, location: '서울 송파', image: '💪', status: '분양가능' },
      { name: '□□휘트니스', price: 3200, location: '경기 분당', image: '💪', status: '분양가능' },
      { name: '◇◇헬스클럽', price: 4100, location: '인천 송도', image: '💪', status: '분양가능' },
      { name: '☆☆애슬레틱센터', price: 4800, location: '서울 역삼', image: '💪', status: '분양가능' },
    ]
  };

  const tabLabels = {
    golf: '골프',
    condo: '콘도',
    fitness: '피트니스'
  };

  const getTabColors = (tab) => {
    const colors = {
      golf: { text: 'text-green-600', border: 'border-green-600', bg: 'bg-green-600', hover: 'hover:bg-green-700' },
      condo: { text: 'text-blue-600', border: 'border-blue-600', bg: 'bg-blue-600', hover: 'hover:bg-blue-700' },
      fitness: { text: 'text-purple-600', border: 'border-purple-600', bg: 'bg-purple-600', hover: 'hover:bg-purple-700' }
    };
    return colors[tab];
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
              <a href="#" className="text-gray-700 hover:text-gray-900">분양</a>
              <a href="#" className="text-gray-700 hover:text-gray-900">문의</a>
            </nav>
          </div>
        </div>
      </header>

      {/* 메인 배너 */}
      <div className="relative h-80 bg-gradient-to-r from-slate-700 to-slate-500 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 1200 400">
            <path d="M0,200 Q300,150 600,200 T1200,200 L1200,400 L0,400 Z" fill="rgba(255,255,255,0.1)"/>
            <circle cx="150" cy="180" r="8" fill="white"/>
            <circle cx="450" cy="160" r="8" fill="white"/>
            <circle cx="750" cy="190" r="8" fill="white"/>
            <circle cx="1050" cy="170" r="8" fill="white"/>
          </svg>
        </div>
        <div className="relative max-w-7xl mx-auto px-6 h-full flex items-center">
          <div className="text-white">
            <h1 className="text-5xl font-bold mb-4">프리미엄 회원권 거래</h1>
            <p className="text-xl opacity-90">골프 · 콘도 · 피트니스 회원권의 모든 것</p>
          </div>
        </div>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 gap-8">
          {/* 실시간 시세표 */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">실시간 시세표</h2>

            {/* 탭 */}
            <div className="flex gap-2 mb-6 border-b border-gray-200">
              {Object.keys(tabLabels).map(tab => {
                const colors = getTabColors(tab);
                return (
                  <button
                    key={tab}
                    onClick={() => setPriceTab(tab)}
                    className={`px-4 py-2 font-medium transition-colors ${
                      priceTab === tab
                        ? `${colors.text} border-b-2 ${colors.border}`
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {tabLabels[tab]}
                  </button>
                );
              })}
            </div>

            {/* 시세 리스트 */}
            <div className="h-96 overflow-y-auto space-y-3 mb-6">
              {priceData[priceTab].map((item, idx) => {
                const colors = getTabColors(priceTab);
                return (
                  <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{item.name}</div>
                      <div className="text-2xl font-bold text-gray-900 mt-1">
                        {item.price.toLocaleString()}
                        <span className="text-sm text-gray-500 ml-1">만원</span>
                      </div>
                    </div>
                    <div className={`flex-shrink-0 text-right font-medium mx-8 ${
                      item.trend === 'up' ? 'text-red-500' :
                      item.trend === 'down' ? 'text-blue-500' :
                      'text-gray-500'
                    }`}>
                      <div>
                        {item.trend === 'up' ? '▲' : item.trend === 'down' ? '▼' : '─'}
                        {' '}{Math.abs(item.change).toLocaleString()}
                      </div>
                      <div className="text-sm">
                        ({item.changePercent > 0 ? '+' : ''}{item.changePercent}%)
                      </div>
                    </div>
                    <button className={`flex-shrink-0 px-4 py-2 ${colors.bg} text-white text-sm rounded ${colors.hover} transition-colors`}>
                      문의
                    </button>
                  </div>
                );
              })}
            </div>

            <button className="w-full py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
              전체 시세표 보기
            </button>
          </div>

          {/* 급매 정보 */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">급매 정보</h2>

            {/* 탭 */}
            <div className="flex gap-2 mb-6 border-b border-gray-200">
              {Object.keys(tabLabels).map(tab => (
                <button
                  key={tab}
                  onClick={() => setUrgentTab(tab)}
                  className={`px-4 py-2 font-medium transition-colors ${
                    urgentTab === tab
                      ? 'text-red-600 border-b-2 border-red-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tabLabels[tab]}
                </button>
              ))}
            </div>

            {/* 급매 리스트 */}
            <div className="h-96 overflow-y-auto space-y-4 mb-6">
              {urgentData[urgentTab].map((item, idx) => (
                <div key={idx} className="p-5 border-2 border-red-100 rounded-lg hover:border-red-200 transition-colors bg-red-50">
                  <div className="flex items-end justify-between mb-3">
                    <div>
                      <span className="inline-block px-2 py-1 bg-red-600 text-white text-xs font-bold rounded mb-2">
                        급매
                      </span>
                      <div className="font-bold text-gray-900 text-lg">{item.name}</div>
                      <div className="text-sm text-gray-600 mt-1">{item.location}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">{item.price}<span className="text-sm text-gray-500 ml-1">만원</span></div>
                    </div>
                  </div>
                  <button className="w-full py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm font-medium">
                    문의하기
                  </button>
                </div>
              ))}
            </div>

            <button className="w-full py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
              전체 급매 보기
            </button>
          </div>
        </div>

        {/* 분양 정보 섹션 */}
        <div className="mt-12 bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">분양 정보</h2>

          {/* 탭 */}
          <div className="flex gap-2 mb-6 border-b border-gray-200">
            {Object.keys(tabLabels).map(tab => {
              const colors = getTabColors(tab);
              return (
                <button
                  key={tab}
                  onClick={() => setSaleTab(tab)}
                  className={`px-4 py-2 font-medium transition-colors ${
                    saleTab === tab
                      ? `${colors.text} border-b-2 ${colors.border}`
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tabLabels[tab]}
                </button>
              );
            })}
          </div>

          {/* 분양 카드 그리드 */}
          <div className="grid grid-cols-5 gap-6">
            {saleData[saleTab].map((item, idx) => {
              const colorConfig = {
                golf: { text: 'text-green-600', bg: 'bg-green-600', hover: 'hover:bg-green-700', border: 'border-green-600' },
                condo: { text: 'text-blue-600', bg: 'bg-blue-600', hover: 'hover:bg-blue-700', border: 'border-blue-600' },
                fitness: { text: 'text-purple-600', bg: 'bg-purple-600', hover: 'hover:bg-purple-700', border: 'border-purple-600' }
              };
              const colors = colorConfig[saleTab];
              const isAvailable = item.status === '분양가능';
              const badgeColor = isAvailable ? colors.bg : 'bg-gray-400';

              return (
                <div key={idx} className={`relative bg-white border ${colors.border} rounded-lg overflow-hidden hover:shadow-lg transition-shadow`}>
                  {/* 분양 상태 배지 */}
                  <div className={`absolute top-2 left-2 px-2 py-0.5 ${badgeColor} text-white font-bold rounded-full z-10 shadow-lg`} style={{ fontSize: '10px' }}>
                    {item.status}
                  </div>

                  {/* 썸네일 - 높이 183.47px */}
                  <div className="bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center text-6xl" style={{ height: '183.47px' }}>
                    {item.image}
                  </div>

                  {/* 정보 - 높이 172.01px */}
                  <div className="p-4 flex flex-col" style={{ height: '172.01px' }}>
                    <div className="font-bold text-gray-900 text-lg mb-1">{item.name}</div>
                    <div className="text-sm text-gray-600 mb-3">{item.location}</div>
                    <div className={`text-2xl font-bold ${colors.text} mb-auto`}>
                      {item.price.toLocaleString()}
                      <span className="text-sm text-gray-500 ml-1">만원</span>
                    </div>
                    <button
                      className={`w-full py-2 ${isAvailable ? colors.bg : 'bg-gray-400'} text-white rounded ${isAvailable ? colors.hover : ''} transition-colors text-sm font-medium ${!isAvailable && 'cursor-not-allowed'}`}
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
    </div>
  );
}
