import React, { useState } from 'react';

export default function MainPage({ navigate }) {
  const [priceTab, setPriceTab] = useState('golf');
  const [urgentTab, setUrgentTab] = useState('golf');
  const [saleTab, setSaleTab] = useState('golf');

  // 샘플 시세 데이터
  const priceData = {
    golf: [
      { name: '○○컨트리클럽', price: '45,000', change: '+2.3%', trend: 'up' },
      { name: '△△골프장', price: '38,500', change: '-1.2%', trend: 'down' },
      { name: '□□레이크CC', price: '52,000', change: '+3.5%', trend: 'up' },
      { name: '◇◇밸리', price: '41,200', change: '0.0%', trend: 'stable' },
      { name: '☆☆오션뷰CC', price: '47,800', change: '+1.8%', trend: 'up' },
    ],
    condo: [
      { name: '○○콘도', price: '12,000', change: '+1.5%', trend: 'up' },
      { name: '△△리조트', price: '15,800', change: '+2.1%', trend: 'up' },
      { name: '□□타운', price: '9,500', change: '-0.8%', trend: 'down' },
      { name: '◇◇빌리지', price: '11,200', change: '+0.5%', trend: 'up' },
      { name: '☆☆힐스테이', price: '13,500', change: '+1.2%', trend: 'up' },
    ],
    fitness: [
      { name: '○○휘트니스', price: '3,200', change: '+1.0%', trend: 'up' },
      { name: '△△스포츠센터', price: '2,800', change: '0.0%', trend: 'stable' },
      { name: '□□헬스클럽', price: '4,100', change: '+2.5%', trend: 'up' },
      { name: '◇◇PT센터', price: '3,600', change: '-0.5%', trend: 'down' },
      { name: '☆☆애슬레틱', price: '3,900', change: '+1.5%', trend: 'up' },
    ]
  };

  // 샘플 급매 데이터
  const urgentData = {
    golf: [
      { name: '○○컨트리클럽', price: '42,000', discount: '7%', location: '경기' },
      { name: '□□레이크CC', price: '48,000', discount: '8%', location: '강원' },
      { name: '☆☆오션뷰CC', price: '44,500', discount: '7%', location: '부산' },
    ],
    condo: [
      { name: '○○콘도', price: '10,500', discount: '12%', location: '제주' },
      { name: '△△리조트', price: '14,000', discount: '11%', location: '강원' },
      { name: '☆☆힐스테이', price: '12,000', discount: '11%', location: '경북' },
    ],
    fitness: [
      { name: '○○휘트니스', price: '2,800', discount: '13%', location: '서울' },
      { name: '□□헬스클럽', price: '3,700', discount: '10%', location: '경기' },
      { name: '☆☆애슬레틱', price: '3,400', discount: '13%', location: '인천' },
    ]
  };

  // 샘플 분양 데이터
  const saleData = {
    golf: [
      { name: '○○컨트리클럽', price: '55,000', location: '경기 용인', image: '🏌️' },
      { name: '△△오션CC', price: '48,000', location: '부산 기장', image: '🏌️' },
      { name: '□□밸리CC', price: '42,000', location: '강원 평창', image: '🏌️' },
      { name: '◇◇레이크CC', price: '51,000', location: '경기 가평', image: '🏌️' },
    ],
    condo: [
      { name: '○○리조트콘도', price: '18,000', location: '제주 서귀포', image: '🏨' },
      { name: '△△스파리조트', price: '15,500', location: '강원 속초', image: '🏨' },
      { name: '□□마리나콘도', price: '16,800', location: '부산 해운대', image: '🏨' },
      { name: '◇◇힐링콘도', price: '14,200', location: '경북 경주', image: '🏨' },
    ],
    fitness: [
      { name: '○○프리미엄짐', price: '4,500', location: '서울 강남', image: '💪' },
      { name: '△△스포츠센터', price: '3,800', location: '서울 송파', image: '💪' },
      { name: '□□휘트니스', price: '3,200', location: '경기 분당', image: '💪' },
      { name: '◇◇헬스클럽', price: '4,100', location: '인천 송도', image: '💪' },
    ]
  };

  const tabLabels = {
    golf: '골프',
    condo: '콘도',
    fitness: '피트니스'
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 메인 배너 */}
      <div className="relative h-80 bg-gradient-to-r from-green-700 to-green-500 overflow-hidden">
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
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">실시간 시세표</h2>
            
            {/* 탭 */}
            <div className="flex gap-2 mb-6 border-b border-gray-200">
              {Object.keys(tabLabels).map(tab => (
                <button
                  key={tab}
                  onClick={() => setPriceTab(tab)}
                  className={`px-4 py-2 font-medium transition-colors ${
                    priceTab === tab
                      ? 'text-green-600 border-b-2 border-green-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tabLabels[tab]}
                </button>
              ))}
            </div>

            {/* 시세 리스트 */}
            <div className="h-96 overflow-y-auto space-y-3 mb-6">
              {priceData[priceTab].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div>
                    <div className="font-medium text-gray-900">{item.name}</div>
                    <div className="text-2xl font-bold text-gray-900 mt-1">{item.price}<span className="text-sm text-gray-500 ml-1">만원</span></div>
                  </div>
                  <div className={`text-right ${
                    item.trend === 'up' ? 'text-red-500' : 
                    item.trend === 'down' ? 'text-blue-500' : 
                    'text-gray-500'
                  }`}>
                    <div className="text-lg font-bold">{item.change}</div>
                    <div className="text-xs mt-1">
                      {item.trend === 'up' ? '▲' : item.trend === 'down' ? '▼' : '─'}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => navigate && navigate('sise')}
              className="w-full py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              전체 시세표 보기
            </button>
          </div>

          {/* 급매 정보 */}
          <div className="bg-white rounded-lg shadow-sm p-6">
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
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <span className="inline-block px-2 py-1 bg-red-600 text-white text-xs font-bold rounded mb-2">
                        급매
                      </span>
                      <div className="font-bold text-gray-900 text-lg">{item.name}</div>
                      <div className="text-sm text-gray-600 mt-1">{item.location}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-red-600 font-bold text-sm mb-1">{item.discount} 할인</div>
                      <div className="text-2xl font-bold text-gray-900">{item.price}<span className="text-sm text-gray-500 ml-1">만원</span></div>
                    </div>
                  </div>
                  <button className="w-full py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm font-medium">
                    상세보기
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={() => navigate && navigate('urgent')}
              className="w-full py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              전체 급매 보기
            </button>
          </div>
        </div>

        {/* 분양 정보 섹션 */}
        <div className="mt-12 bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">분양 정보</h2>
          
          {/* 탭 */}
          <div className="flex gap-2 mb-6 border-b border-gray-200">
            {Object.keys(tabLabels).map(tab => (
              <button
                key={tab}
                onClick={() => setSaleTab(tab)}
                className={`px-4 py-2 font-medium transition-colors ${
                  saleTab === tab
                    ? 'text-green-600 border-b-2 border-green-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tabLabels[tab]}
              </button>
            ))}
          </div>

          {/* 분양 카드 그리드 */}
          <div className="grid grid-cols-4 gap-6">
            {saleData[saleTab].map((item, idx) => (
              <div key={idx} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                {/* 썸네일 */}
                <div className="h-48 bg-gradient-to-br from-green-100 to-green-50 flex items-center justify-center text-6xl">
                  {item.image}
                </div>
                
                {/* 정보 */}
                <div className="p-4">
                  <div className="font-bold text-gray-900 text-lg mb-1">{item.name}</div>
                  <div className="text-sm text-gray-600 mb-3">{item.location}</div>
                  <div className="text-2xl font-bold text-green-600">{item.price}<span className="text-sm text-gray-500 ml-1">만원</span></div>
                  <button
                    onClick={() => navigate && navigate('presale')}
                    className="w-full mt-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors text-sm font-medium"
                  >
                    분양문의
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}