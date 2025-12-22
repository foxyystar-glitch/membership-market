import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function PriceTablePage({ navigate }) {
  const [activeTab, setActiveTab] = useState('golf');
  const [selectedItem, setSelectedItem] = useState(null);
  const [chartPeriod, setChartPeriod] = useState('week');

  // 확장된 시세 데이터 (기존 5개 + 5개 추가 = 10개)
  const priceData = {
    golf: [
      { id: 1, name: '○○컨트리클럽', price: 45000, change: 1035, changePercent: 2.3, trend: 'up' },
      { id: 2, name: '△△골프장', price: 38500, change: -467, changePercent: -1.2, trend: 'down' },
      { id: 3, name: '□□레이크CC', price: 52000, change: 1757, changePercent: 3.5, trend: 'up' },
      { id: 4, name: '◇◇밸리', price: 41200, change: 0, changePercent: 0.0, trend: 'stable' },
      { id: 5, name: '☆☆오션뷰CC', price: 47800, change: 845, changePercent: 1.8, trend: 'up' },
      { id: 6, name: '▽▽마운틴CC', price: 39800, change: -523, changePercent: -1.3, trend: 'down' },
      { id: 7, name: '▷▷힐스CC', price: 54500, change: 2180, changePercent: 4.2, trend: 'up' },
      { id: 8, name: '●●파크CC', price: 43200, change: 345, changePercent: 0.8, trend: 'up' },
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
      { id: 8, name: '●●마리나', price: 10800, change: 89, changePercent: 0.8, trend: 'up' },
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
      { id: 8, name: '●●피지컬센터', price: 3100, change: 25, changePercent: 0.8, trend: 'up' },
      { id: 9, name: '♤♤스트롱짐', price: 3750, change: -67, changePercent: -1.8, trend: 'down' },
      { id: 10, name: '♧♧웰니스센터', price: 4200, change: 98, changePercent: 2.4, trend: 'up' },
    ]
  };

  // X축 가이드라인 인터벌 계산
  const getXAxisInterval = (period) => {
    switch(period) {
      case 'week': return 0; // 매일 표시
      case 'month': return 4; // 약 5일마다
      case 'sixMonths': return 4; // 약 1개월마다
      case 'year': return 1; // 2개월마다
      default: return 1;
    }
  };

  // 차트 데이터 생성 함수
  const generateChartData = (itemId, period) => {
    const dataPoints = {
      week: 7,
      month: 30,
      sixMonths: 26, // 주단위
      year: 12 // 월단위
    };

    const points = dataPoints[period];
    const item = priceData[activeTab].find(i => i.id === itemId);
    if (!item) return [];

    const data = [];
    const basePrice = item.price;
    const volatility = basePrice * 0.05; // 5% 변동폭
    const today = new Date();

    for (let i = 0; i < points; i++) {
      const variation = (Math.random() - 0.5) * volatility;
      const price = Math.round(basePrice + variation);

      let label;
      const date = new Date(today);

      if (period === 'week') {
        date.setDate(today.getDate() - (points - 1 - i));
        label = `${date.getMonth() + 1}월 ${date.getDate()}일`;
      } else if (period === 'month') {
        date.setDate(today.getDate() - (points - 1 - i));
        label = `${date.getMonth() + 1}월 ${date.getDate()}일`;
      } else if (period === 'sixMonths') {
        date.setDate(today.getDate() - (points - 1 - i) * 7);
        label = `${date.getFullYear()}년 ${date.getMonth() + 1}월`;
      } else {
        date.setMonth(today.getMonth() - (points - 1 - i));
        label = `${date.getFullYear()}년 ${date.getMonth() + 1}월`;
      }

      data.push({
        name: label,
        price: price
      });
    }

    return data;
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

  const getTabColors = (tab) => {
    const colors = {
      golf: {
        text: 'text-green-600',
        border: 'border-green-600',
        bg: 'bg-green-600',
        hover: 'hover:bg-green-700',
        lightBg: 'bg-green-50',
        chartColor: '#16a34a'
      },
      condo: {
        text: 'text-blue-600',
        border: 'border-blue-600',
        bg: 'bg-blue-600',
        hover: 'hover:bg-blue-700',
        lightBg: 'bg-blue-50',
        chartColor: '#2563eb'
      },
      fitness: {
        text: 'text-purple-600',
        border: 'border-purple-600',
        bg: 'bg-purple-600',
        hover: 'hover:bg-purple-700',
        lightBg: 'bg-purple-50',
        chartColor: '#9333ea'
      }
    };
    return colors[tab];
  };

  const chartData = selectedItem ? generateChartData(selectedItem.id, chartPeriod) : [];

  return (
    <div className="min-h-screen bg-white">
      {/* 스티키 탭 */}
      <div className="sticky top-0 bg-white border-b border-gray-200 shadow-sm z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-2">
            {Object.keys(tabLabels).map(tab => {
              const colors = getTabColors(tab);
              return (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                    setSelectedItem(null);
                  }}
                  className={`px-6 py-4 font-bold text-lg transition-colors ${
                    activeTab === tab
                      ? `${colors.text} border-b-2 ${colors.border}`
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tabLabels[tab]}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-2 gap-8">
          {/* 좌측: 시세표 테이블 */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{tabLabels[activeTab]} 시세표</h2>

              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-center py-3 px-4 font-bold text-gray-900">회원권명</th>
                    <th className="text-center py-3 px-4 font-bold text-gray-900">시세</th>
                    <th className="text-center py-3 px-4 font-bold text-gray-900">등락</th>
                    <th className="text-right py-3 px-4 font-bold text-gray-900"></th>
                  </tr>
                </thead>
                <tbody>
                  {priceData[activeTab].map((item) => {
                    const colors = getTabColors(activeTab);
                    return (
                      <tr
                        key={item.id}
                        className={`border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
                          selectedItem?.id === item.id ? colors.lightBg : ''
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
                              상세
                            </button>
                            <button
                              onClick={() => navigate && navigate('inquiry')}
                              className={`px-4 py-2 ${colors.bg} text-white text-sm rounded ${colors.hover} transition-colors`}
                            >
                              문의
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* 우측: 가격 변동 그래프 (sticky) */}
          <div className="sticky top-20 h-fit">
            <div className="bg-white p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">가격 변동 그래프</h2>

              {/* 기간 선택 탭 */}
              <div className="flex gap-2 mb-6 border-b border-gray-200">
                {Object.keys(periodLabels).map(period => {
                  const colors = getTabColors(activeTab);
                  return (
                    <button
                      key={period}
                      onClick={() => setChartPeriod(period)}
                      className={`px-4 py-2 font-medium transition-colors ${
                        chartPeriod === period
                          ? `${colors.text} border-b-2 ${colors.border}`
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      {periodLabels[period]}
                    </button>
                  );
                })}
              </div>

              {/* 그래프 영역 */}
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
                        tick={(props) => {
                          const { x, y, payload, index } = props;
                          if (index === 0) {
                            return null;
                          }
                          return (
                            <text x={x} y={y + 10} textAnchor="middle" fontSize={12} fill="#666">
                              {payload.value}
                            </text>
                          );
                        }}
                        tickLine={true}
                        interval={getXAxisInterval(chartPeriod)}
                        domain={['dataMin', 'dataMax']}
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
                        stroke={getTabColors(activeTab).chartColor}
                        strokeWidth={2}
                        dot={{ fill: getTabColors(activeTab).chartColor, r: 3 }}
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
}
