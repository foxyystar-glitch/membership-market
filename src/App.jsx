import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function App() {
  const [currentPage, setCurrentPage] = useState('main');
  const [selectedCategory, setSelectedCategory] = useState('golf');

  const navigate = (page, category) => {
    setCurrentPage(page);
    if (category) {
      setSelectedCategory(category);
    }
    window.scrollTo(0, 0);
  };

  // 공통 Header 컴포넌트
  const Header = ({ activePage }) => (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div
            className="text-2xl font-bold text-gray-900 cursor-pointer hover:text-green-600 transition-colors"
            onClick={() => navigate('main')}
          >
            T&G LEISURE 회원권
          </div>
          <nav className="flex gap-8">
            <button
              onClick={() => navigate('sise')}
              className={activePage === 'sise' ? 'text-gray-900 font-bold border-b-2 border-gray-900' : 'text-gray-700 hover:text-gray-900'}
            >
              시세표
            </button>
            <button
              onClick={() => navigate('category', 'golf')}
              className={activePage === 'category' && selectedCategory === 'golf' ? 'text-gray-900 font-bold border-b-2 border-gray-900' : 'text-gray-700 hover:text-gray-900'}
            >
              골프
            </button>
            <button
              onClick={() => navigate('category', 'condo')}
              className={activePage === 'category' && selectedCategory === 'condo' ? 'text-gray-900 font-bold border-b-2 border-gray-900' : 'text-gray-700 hover:text-gray-900'}
            >
              콘도
            </button>
            <button
              onClick={() => navigate('category', 'fitness')}
              className={activePage === 'category' && selectedCategory === 'fitness' ? 'text-gray-900 font-bold border-b-2 border-gray-900' : 'text-gray-700 hover:text-gray-900'}
            >
              피트니스
            </button>
            <button
              onClick={() => navigate('urgent')}
              className={activePage === 'urgent' ? 'text-gray-900 font-bold border-b-2 border-gray-900' : 'text-gray-700 hover:text-gray-900'}
            >
              급매
            </button>
            <button
              onClick={() => navigate('presale')}
              className={activePage === 'presale' ? 'text-gray-900 font-bold border-b-2 border-gray-900' : 'text-gray-700 hover:text-gray-900'}
            >
              분양
            </button>
            <button
              onClick={() => navigate('inquiry')}
              className={activePage === 'inquiry' ? 'text-gray-900 font-bold border-b-2 border-gray-900' : 'text-gray-700 hover:text-gray-900'}
            >
              문의
            </button>
          </nav>
        </div>
      </div>
    </header>
  );

  // 렌더링 함수
  const renderPage = () => {
    switch (currentPage) {
      case 'main':
        return <MainPage />;
      case 'sise':
        return <PriceTablePage />;
      case 'category':
        return <CategoryPage />;
      case 'urgent':
        return <UrgentSalePage />;
      case 'presale':
        return <PresalePage />;
      case 'inquiry':
        return <InquiryPage />;
      default:
        return <MainPage />;
    }
  };

  // ==================== 메인 페이지 ====================
  const MainPage = () => {
    const [priceTab, setPriceTab] = useState('golf');
    const [urgentTab, setUrgentTab] = useState('golf');
    const [saleTab, setSaleTab] = useState('golf');

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
        <Header activePage="main" />

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

        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-2 gap-8">
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">실시간 시세표</h2>

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

              <button 
                onClick={() => navigate('sise')}
                className="w-full py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                전체 시세표 보기
              </button>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">급매 정보</h2>

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

              <button 
                onClick={() => navigate('urgent')}
                className="w-full py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                전체 급매 보기
              </button>
            </div>
          </div>

          <div className="mt-12 bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">분양 정보</h2>

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
                        onClick={() => navigate('presale')}
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
  };

  // ==================== 시세표 페이지 (PriceTablePage) ====================
  const PriceTablePage = () => {
    const [activeTab, setActiveTab] = useState('golf');
    const [selectedItem, setSelectedItem] = useState(null);
    const [chartPeriod, setChartPeriod] = useState('week');

    const priceData = {
      golf: [
        { id: 1, name: '○○컨트리클럽', price: 45000, change: 1035, changePercent: 2.3, trend: 'up' },
        { id: 2, name: '△△골프장', price: 38500, change: -467, changePercent: -1.2, trend: 'down' },
        { id: 3, name: '□□레이크CC', price: 52000, change: 1757, changePercent: 3.5, trend: 'up' },
        { id: 4, name: '◇◇밸리', price: 41200, change: 0, changePercent: 0.0, trend: 'stable' },
        { id: 5, name: '☆☆오션뷰CC', price: 47800, change: 845, changePercent: 1.8, trend: 'up' },
        { id: 6, name: '▽▽마운틴CC', price: 39800, change: -523, changePercent: -1.3, trend: 'down' },
        { id: 7, name: '▷▷힐스CC', price: 54500, change: 2180, changePercent: 4.2, trend: 'up' },
        { id: 8, name: '◁◁파크CC', price: 43200, change: 345, changePercent: 0.8, trend: 'up' },
        { id: 9, name: '♤♤포레스트CC', price: 36900, change: -789, changePercent: -2.1, trend: 'down' },
        { id: 10, name: '♧♧그린CC', price: 49500, change: 1234, changePercent: 2.6, trend: 'up' },
      ],
      condo: [
        { id: 1, name: '○○콘도', price: 12000, change: 177, changePercent: 1.5, trend: 'up' },
        { id: 2, name: '△△리조트', price: 15800, change: 325, changePercent: 2.1, trend: 'up' },
        { id: 3, name: '□□타운', price: 9500, change: -77, changePercent: -0.8, trend: 'down' },
        { id: 4, name: '◇◇빌리지', price: 11200, change: 56, changePercent: 0.5, trend: 'up' },
        { id: 5, name: '☆☆힐스테이', price: 13500, change: 160, changePercent: 1.2, trend: 'up' },
        { id: 6, name: '▽▽스파리조트', price: 16200, change: 405, changePercent: 2.6, trend: 'up' },
        { id: 7, name: '▷▷비치콘도', price: 14800, change: -223, changePercent: -1.5, trend: 'down' },
        { id: 8, name: '◁◁마리나', price: 10800, change: 89, changePercent: 0.8, trend: 'up' },
        { id: 9, name: '♤♤레이크뷰', price: 13200, change: -145, changePercent: -1.1, trend: 'down' },
        { id: 10, name: '♧♧힐링스테이', price: 11900, change: 178, changePercent: 1.5, trend: 'up' },
      ],
      fitness: [
        { id: 1, name: '○○휘트니스', price: 3200, change: 32, changePercent: 1.0, trend: 'up' },
        { id: 2, name: '△△스포츠센터', price: 2800, change: 0, changePercent: 0.0, trend: 'stable' },
        { id: 3, name: '□□헬스클럽', price: 4100, change: 100, changePercent: 2.5, trend: 'up' },
        { id: 4, name: '◇◇PT센터', price: 3600, change: -18, changePercent: -0.5, trend: 'down' },
        { id: 5, name: '☆☆애슬레틱', price: 3900, change: 58, changePercent: 1.5, trend: 'up' },
        { id: 6, name: '▽▽파워짐', price: 3400, change: -45, changePercent: -1.3, trend: 'down' },
        { id: 7, name: '▷▷바디짐', price: 4500, change: 135, changePercent: 3.1, trend: 'up' },
        { id: 8, name: '◁◁피지컬센터', price: 3100, change: 25, changePercent: 0.8, trend: 'up' },
        { id: 9, name: '♤♤스트롱짐', price: 3750, change: -67, changePercent: -1.8, trend: 'down' },
        { id: 10, name: '♧♧웰니스센터', price: 4200, change: 98, changePercent: 2.4, trend: 'up' },
      ]
    };

    const generateChartData = (itemId, period) => {
      const dataPoints = {
        week: 7,
        month: 30,
        sixMonths: 26,
        year: 12
      };

      const points = dataPoints[period];
      const item = priceData[activeTab].find(i => i.id === itemId);
      if (!item) return [];

      const data = [];
      const basePrice = item.price;
      const volatility = basePrice * 0.05;

      for (let i = 0; i < points; i++) {
        const variation = (Math.random() - 0.5) * volatility;
        const price = Math.round(basePrice + variation);
        
        let label;
        if (period === 'week') {
          label = `${i + 1}일전`;
        } else if (period === 'month') {
          label = `${i + 1}일전`;
        } else if (period === 'sixMonths') {
          label = `${i + 1}주전`;
        } else {
          label = `${i + 1}개월전`;
        }

        data.push({
          name: label,
          price: price
        });
      }

      return data.reverse();
    };

    const tabLabels = {
      golf: '골프',
      condo: '콘도',
      fitness: '피트니스'
    };

    const periodLabels = {
      week: '일주일',
      month: '1개월',
      sixMonths: '6개월',
      year: '1년'
    };

    const chartData = selectedItem ? generateChartData(selectedItem.id, chartPeriod) : [];

    return (
      <div className="min-h-screen bg-white">
        <Header activePage="sise" />

        <div className="sticky top-0 bg-white border-b border-gray-200 shadow-sm z-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex gap-2">
              {Object.keys(tabLabels).map(tab => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                    setSelectedItem(null);
                  }}
                  className={`px-6 py-4 font-bold text-lg transition-colors ${
                    activeTab === tab
                      ? 'text-green-600 border-b-2 border-green-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tabLabels[tab]}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">{tabLabels[activeTab]} 시세표</h2>
                
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left py-3 px-4 font-bold text-gray-900">회원권명</th>
                      <th className="text-right py-3 px-4 font-bold text-gray-900">시세</th>
                      <th className="text-right py-3 px-4 font-bold text-gray-900">등락</th>
                      <th className="text-right py-3 px-4 font-bold text-gray-900"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {priceData[activeTab].map((item) => (
                      <tr 
                        key={item.id} 
                        className={`border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
                          selectedItem?.id === item.id ? 'bg-green-50' : ''
                        }`}
                        onClick={(e) => {
                          if (!e.target.closest('button')) {
                            setSelectedItem(item);
                          }
                        }}
                      >
                        <td className="py-4 px-4 font-medium text-gray-900">{item.name}</td>
                        <td className="py-4 px-4 text-right">
                          <span className="text-lg font-bold text-gray-900">
                            {item.price.toLocaleString()}
                          </span>
                          <span className="text-sm text-gray-500 ml-1">만원</span>
                        </td>
                        <td className={`py-4 px-4 text-right font-medium ${
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
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex gap-2 justify-end">
                            <button className="px-4 py-2 bg-gray-900 text-white text-sm rounded hover:bg-gray-800 transition-colors">
                              확인
                            </button>
                            <button 
                              onClick={() => navigate('inquiry')}
                              className="px-4 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors"
                            >
                              문의
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="sticky top-20 h-fit">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">가격 변동 그래프</h2>
                
                <div className="flex gap-2 mb-6 border-b border-gray-200">
                  {Object.keys(periodLabels).map(period => (
                    <button
                      key={period}
                      onClick={() => setChartPeriod(period)}
                      className={`px-4 py-2 font-medium transition-colors ${
                        chartPeriod === period
                          ? 'text-green-600 border-b-2 border-green-600'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      {periodLabels[period]}
                    </button>
                  ))}
                </div>

                {selectedItem ? (
                  <div>
                    <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                      <div className="font-bold text-gray-900 text-lg">{selectedItem.name}</div>
                      <div className="text-3xl font-bold text-gray-900 mt-2">
                        {selectedItem.price.toLocaleString()}
                        <span className="text-base text-gray-500 ml-2">만원</span>
                      </div>
                      <div className={`text-lg font-medium mt-1 ${
                        selectedItem.trend === 'up' ? 'text-red-500' : 
                        selectedItem.trend === 'down' ? 'text-blue-500' : 
                        'text-gray-500'
                      }`}>
                        {selectedItem.trend === 'up' ? '▲' : selectedItem.trend === 'down' ? '▼' : '─'}
                        {' '}{Math.abs(selectedItem.change).toLocaleString()}
                        {' '}({selectedItem.changePercent > 0 ? '+' : ''}{selectedItem.changePercent}%)
                      </div>
                    </div>

                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          dataKey="name" 
                          tick={{ fontSize: 12 }}
                          interval="preserveStartEnd"
                        />
                        <YAxis 
                          tick={{ fontSize: 12 }}
                          domain={['dataMin - 1000', 'dataMax + 1000']}
                        />
                        <Tooltip 
                          formatter={(value) => [`${value.toLocaleString()}만원`, '시세']}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="price" 
                          stroke="#16a34a" 
                          strokeWidth={2}
                          dot={{ fill: '#16a34a', r: 3 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <div className="h-96 flex items-center justify-center text-gray-400">
                    <div className="text-center">
                      <div className="text-6xl mb-4">📊</div>
                      <div className="text-lg">좌측 시세표에서 항목을 선택하세요</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ==================== 카테고리 페이지 (CategoryPage) ====================
  const CategoryPage = () => {
    const [category, setCategory] = useState(selectedCategory);

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
        <Header activePage="category" />

        <div className="max-w-7xl mx-auto px-6 py-12">
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              {config.emoji} {config.title} 인기 매물 TOP 5
            </h2>
            
            <div className="grid grid-cols-5 gap-6">
              {topProperties.map((property) => {
                return (
                  <div key={property.id} className={`relative bg-white border ${colorClasses.border} rounded-lg overflow-hidden hover:shadow-lg transition-shadow`}>
                    <div className={`absolute top-3 left-3 w-10 h-10 ${colorClasses.bg} text-white rounded-full flex items-center justify-center font-bold text-lg z-10 shadow-lg`}>
                      {property.rank}
                    </div>
                    
                    <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center text-6xl">
                      {config.emoji}
                    </div>
                    
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

          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              전체 {config.title} 매물
            </h2>
            
            <div className="grid grid-cols-5 gap-6">
              {currentData.map((property) => (
                <div key={property.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center text-6xl">
                    {config.emoji}
                  </div>
                  
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
  };

  // ==================== 급매 페이지 (UrgentSalePage) ====================
  const UrgentSalePage = () => {
    const [activeTab, setActiveTab] = useState('golf');

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
        <Header activePage="urgent" />

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

        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-3xl font-bold text-gray-900">
              {config.emoji} {config.title} 급매 매물
            </h2>
            <span className="text-red-600 font-bold text-lg">🔥 총 {currentData.length}건</span>
          </div>

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
                  <div className={`absolute top-3 left-3 px-3 py-1 ${badgeColor} text-white text-xs font-bold rounded-full z-10 shadow-lg`}>
                    {property.status}
                  </div>
                  
                  <div className={`h-48 bg-gradient-to-br ${isAvailable ? 'from-red-50 to-red-100' : 'from-gray-100 to-gray-50'} flex items-center justify-center text-6xl`}>
                    {config.emoji}
                  </div>
                  
                  <div className="p-4">
                    <div className="font-bold text-gray-900 text-lg mb-1">{property.name}</div>
                    <div className="text-sm text-gray-600 mb-3">{property.location}</div>
                    
                    <div className="mb-3">
                      <div className="text-xs text-gray-400 line-through mb-1">
                        {property.originalPrice.toLocaleString()}만원
                      </div>
                      <div className="flex items-end justify-between">
                        <div className={`text-2xl font-bold ${priceColor}`}>
                          {property.price.toLocaleString()}
                          <span className="text-sm text-gray-500 ml-1">만원</span>
                        </div>
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
  };

  // ==================== 분양 페이지 (PresalePage) ====================
  const PresalePage = () => {
    const [activeTab, setActiveTab] = useState('golf');

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
      <div className="min-h-screen bg-gray-50">
        <Header activePage="presale" />

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

        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-3xl font-bold text-gray-900">
              {config.emoji} {config.title} 분양 정보
            </h2>
            <span className={`${colorClasses.text} font-bold text-lg`}>총 {currentData.length}건</span>
          </div>

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
                  <div className={`absolute top-3 left-3 px-3 py-1 ${badgeColor} text-white text-xs font-bold rounded-full z-10 shadow-lg`}>
                    {property.status}
                  </div>
                  
                  <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center text-6xl">
                    {config.emoji}
                  </div>
                  
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
                      {isAvailable ? '분양문의' : '분양완료'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  // ==================== 문의 페이지 (InquiryPage) ====================
  const InquiryPage = () => {
    const [formData, setFormData] = useState({
      category: 'golf',
      membershipName: '',
      desiredPrice: '',
      name: '',
      phone1: '010',
      phone2: '',
      phone3: '',
      note: '',
      agreePrivacy: false
    });

    const [showTerms, setShowTerms] = useState(false);

    const handleSubmit = () => {
      if (!formData.agreePrivacy) {
        alert('개인정보 수집 및 이용에 동의해주세요.');
        return;
      }
      console.log('Form submitted:', formData);
      alert('문의가 접수되었습니다.');
    };

    return (
      <div className="min-h-screen bg-gray-50">
        <Header activePage="inquiry" />

        <div className="max-w-3xl mx-auto px-6 py-12">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">회원권 매매문의</h1>
            
            <div>
              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-900 mb-3">회원권 구분</label>
                <div className="flex gap-6">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="category"
                      value="golf"
                      checked={formData.category === 'golf'}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="w-4 h-4 text-green-600 focus:ring-green-500"
                    />
                    <span className="ml-2 text-gray-700">골프</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="category"
                      value="condo"
                      checked={formData.category === 'condo'}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-gray-700">콘도</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="category"
                      value="fitness"
                      checked={formData.category === 'fitness'}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="w-4 h-4 text-purple-600 focus:ring-purple-500"
                    />
                    <span className="ml-2 text-gray-700">피트니스</span>
                  </label>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-900 mb-2">회원권명</label>
                <input
                  type="text"
                  value={formData.membershipName}
                  onChange={(e) => setFormData({...formData, membershipName: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="회원권명을 입력하세요"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-900 mb-2">희망 가격</label>
                <input
                  type="text"
                  value={formData.desiredPrice}
                  onChange={(e) => setFormData({...formData, desiredPrice: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="희망 가격을 입력하세요 (만원)"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-900 mb-2">이름</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="이름을 입력하세요"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-900 mb-2">연락처</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={formData.phone1}
                    onChange={(e) => setFormData({...formData, phone1: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-center"
                    style={{ flex: '3' }}
                    maxLength="3"
                  />
                  <span className="text-gray-500">-</span>
                  <input
                    type="text"
                    value={formData.phone2}
                    onChange={(e) => setFormData({...formData, phone2: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-center"
                    style={{ flex: '4' }}
                    maxLength="4"
                    placeholder="0000"
                  />
                  <span className="text-gray-500">-</span>
                  <input
                    type="text"
                    value={formData.phone3}
                    onChange={(e) => setFormData({...formData, phone3: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-center"
                    style={{ flex: '4' }}
                    maxLength="4"
                    placeholder="0000"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-900 mb-2">참고사항</label>
                <textarea
                  value={formData.note}
                  onChange={(e) => setFormData({...formData, note: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                  rows="6"
                  placeholder="참고사항을 입력하세요"
                />
              </div>

              <div className="mb-8">
                <div className="flex items-center justify-between">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.agreePrivacy}
                      onChange={(e) => setFormData({...formData, agreePrivacy: e.target.checked})}
                      className="w-4 h-4 text-green-600 focus:ring-green-500 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">개인정보 수집 및 이용에 동의합니다.</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowTerms(!showTerms)}
                    className="text-sm text-green-600 hover:text-green-700 font-medium"
                  >
                    약관보기
                  </button>
                </div>
                
                {showTerms && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200 text-sm text-gray-600 max-h-40 overflow-y-auto">
                    <p className="font-bold mb-2">개인정보 수집 및 이용 동의</p>
                    <p className="mb-2">1. 수집하는 개인정보 항목: 이름, 연락처, 회원권 정보</p>
                    <p className="mb-2">2. 개인정보의 수집 및 이용 목적: 회원권 매매 상담 및 연락</p>
                    <p className="mb-2">3. 개인정보의 보유 및 이용 기간: 상담 완료 후 6개월</p>
                    <p>4. 동의를 거부할 권리 및 동의 거부에 따른 불이익: 개인정보 수집에 동의하지 않을 수 있으며, 동의하지 않을 경우 상담 서비스 이용이 제한될 수 있습니다.</p>
                  </div>
                )}
              </div>

              <button
                onClick={handleSubmit}
                className="w-full py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-lg font-bold"
              >
                신청
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return <div className="App">{renderPage()}</div>;
}

export default App;
