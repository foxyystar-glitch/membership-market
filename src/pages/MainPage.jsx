import React, { useState, useMemo } from 'react';
import { memberships } from '../data/memberships';
import { urgentSales } from '../data/urgentSales';
import { presales } from '../data/presales';

export default function MainPage({ navigate }) {
  const [priceTab, setPriceTab] = useState('golf');
  const [urgentTab, setUrgentTab] = useState('golf');
  const [saleTab, setSaleTab] = useState('golf');

  // 시세표 데이터: display_flag=true & rank가 있는 TOP 5
  const priceData = useMemo(() => {
    const byCategory = { golf: [], condo: [], fitness: [] };

    memberships
      .filter(m => m.display_flag && m.rank !== null && m.active_flag)
      .sort((a, b) => a.rank - b.rank)
      .forEach(m => {
        if (byCategory[m.category].length < 5) {
          byCategory[m.category].push({
            name: m.name,
            price: m.current_price,
            change: m.change_value,
            changePercent: m.change_percent,
            trend: m.trend
          });
        }
      });

    return byCategory;
  }, []);

  // 급매 데이터: display_flag=true & status='available'
  const urgentData = useMemo(() => {
    const byCategory = { golf: [], condo: [], fitness: [] };

    urgentSales
      .filter(u => u.display_flag && u.status === 'available')
      .forEach(u => {
        const membership = memberships.find(m => m.id === u.c_id);
        if (membership) {
          byCategory[u.category].push({
            name: membership.name,
            price: u.urgent_price.toLocaleString(),
            location: membership.location
          });
        }
      });

    return byCategory;
  }, []);

  // 분양 데이터: display_flag=true & status='available'
  const saleData = useMemo(() => {
    const byCategory = { golf: [], condo: [], fitness: [] };
    const emojis = { golf: '🏌️', condo: '🏨', fitness: '💪' };

    presales
      .filter(p => p.display_flag && p.status === 'available')
      .forEach(p => {
        const membership = memberships.find(m => m.id === p.c_id);
        if (membership) {
          byCategory[p.category].push({
            name: membership.name,
            price: p.presale_price,
            location: membership.location,
            image: emojis[p.category],
            status: '분양가능'
          });
        }
      });

    return byCategory;
  }, []);

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

            <button
              onClick={() => navigate && navigate('sise')}
              className="w-full py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
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

            <button
              onClick={() => navigate && navigate('urgent')}
              className="w-full py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
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
                      onClick={() => navigate && navigate('presale')}
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
