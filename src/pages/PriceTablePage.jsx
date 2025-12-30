import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { memberships } from '../data/memberships';
import { priceHistory } from '../data/priceHistory';
import CategoryTabs from '../components/CategoryTabs';
import { colors } from '../config/colors';

export default function PriceTablePage({ navigate }) {
  const [activeTab, setActiveTab] = useState('golf');
  const [selectedItem, setSelectedItem] = useState(null);
  const [chartPeriod, setChartPeriod] = useState('week');

  // 카테고리별 시세 데이터
  const priceData = useMemo(() => {
    const byCategory = { golf: [], condo: [], fitness: [] };

    memberships
      .filter(m => m.active_flag)
      .forEach(m => {
        byCategory[m.category].push({
          id: m.id,
          name: m.product_name,
          price: m.current_price,
          change: m.change_value,
          changePercent: m.change_percent,
          trend: m.trend
        });
      });

    return byCategory;
  }, []);

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

  // 차트 데이터 생성 함수 - 실제 priceHistory 데이터 사용
  const generateChartData = (itemId, period) => {
    const today = new Date('2025-12-26');
    const daysMap = {
      week: 7,
      month: 30,
      sixMonths: 180,
      year: 365
    };

    const days = daysMap[period];
    const startDate = new Date(today);
    startDate.setDate(startDate.getDate() - days);

    // 실제 priceHistory에서 데이터 가져오기
    const historyData = priceHistory
      .filter(p => p.c_id === itemId && new Date(p.date) >= startDate)
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    if (historyData.length === 0) {
      return [];
    }

    return historyData.map(h => {
      const date = new Date(h.date);
      let label;

      if (period === 'week' || period === 'month') {
        label = `${date.getMonth() + 1}월 ${date.getDate()}일`;
      } else {
        label = `${date.getFullYear()}년 ${date.getMonth() + 1}월`;
      }

      return {
        name: label,
        price: h.price
      };
    });
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
    const tabColors = {
      golf: {
        text: 'text-green-600',
        border: 'border-green-600',
        bg: 'bg-green-600',
        hover: 'hover:bg-green-700',
        lightBg: 'bg-green-50',
        chartColor: colors.golf,
        inquiryBg: colors.golf,
        inquiryHover: '#0d8c5a'
      },
      condo: {
        text: 'text-orange-600',
        border: 'border-orange-600',
        bg: 'bg-orange-600',
        hover: 'hover:bg-orange-700',
        lightBg: 'bg-orange-50',
        chartColor: colors.condo,
        inquiryBg: colors.condo,
        inquiryHover: '#e67300'
      },
      fitness: {
        text: 'text-purple-600',
        border: 'border-purple-600',
        bg: 'bg-purple-600',
        hover: 'hover:bg-purple-700',
        lightBg: 'bg-purple-50',
        chartColor: colors.fitness,
        inquiryBg: colors.fitness,
        inquiryHover: '#7444a8'
      }
    };
    return tabColors[tab];
  };

  const chartData = selectedItem ? generateChartData(selectedItem.id, chartPeriod) : [];

  return (
    <div className="min-h-screen bg-white">
      {/* 스티키 탭 */}
      <div className="sticky top-0 bg-white z-10" style={{ height: '64px', borderBottom: '1px solid #BDBDBD' }}>
        <div className="mx-auto h-full flex items-center" style={{ maxWidth: '1200px', paddingLeft: '24px', paddingRight: '24px' }}>
          <CategoryTabs
            activeTab={activeTab}
            onTabChange={(tab) => {
              setActiveTab(tab);
              setSelectedItem(null);
            }}
            variant="default"
          />
        </div>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="mx-auto py-6" style={{ maxWidth: '1200px', paddingLeft: '24px', paddingRight: '24px' }}>
        <div className="grid grid-cols-2 gap-8">
          {/* 좌측: 시세표 카드 리스트 */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{tabLabels[activeTab]} 시세표</h2>

              {/* 헤더 */}
              <div className="flex items-center px-4 py-3 border-b-2 border-gray-200 mb-4">
                <div className="flex-1 font-bold text-gray-900">회원권명</div>
                <div className="w-24 font-bold text-gray-900 text-center">시세</div>
                <div className="w-32 font-bold text-gray-900 text-center">등락</div>
                <div className="w-32"></div>
              </div>

              {/* 카드 리스트 */}
              <div className="flex flex-col gap-4">
                {priceData[activeTab].map((item) => {
                  const tabColors = getTabColors(activeTab);
                  const isSelected = selectedItem?.id === item.id;
                  return (
                    <div
                      key={item.id}
                      className="w-full h-[74px] p-4 rounded-[5px] flex items-center gap-4 cursor-pointer"
                      style={{ backgroundColor: isSelected ? '#E8E7F5' : '#F6F5FD' }}
                      onClick={(e) => {
                        if (!e.target.closest('button')) {
                          setSelectedItem(item);
                        }
                      }}
                    >
                      {/* 회원권명 + 카테고리 */}
                      <div className="w-[135px] flex flex-col gap-1.5">
                        <div className="w-[135px] h-[19px] text-[#111111] text-base font-semibold leading-[19.2px]">
                          {item.name}
                        </div>
                        <div className="w-[135px] text-[#111111] text-sm font-medium leading-[16.8px]">
                          {tabLabels[activeTab]} 회원권
                        </div>
                      </div>

                      {/* 가격 */}
                      <div className="w-24 h-[22px] flex justify-end items-end gap-1">
                        <div className="w-[66px] text-right text-[#111111] text-lg font-bold leading-[21.6px]">
                          {item.price.toLocaleString()}
                        </div>
                        <div className="w-[23px] text-right text-[#717171] text-xs font-medium leading-[14.4px]">
                          만원
                        </div>
                      </div>

                      {/* 등락 */}
                      <div
                        className={`w-[63px] flex flex-col items-end ${
                          item.trend === 'up' ? 'text-[#EF4444]' :
                          item.trend === 'down' ? 'text-blue-500' :
                          'text-gray-500'
                        }`}
                      >
                        <div className="text-right text-base font-medium leading-[22.4px]">
                          {item.trend === 'up' ? '▲' : item.trend === 'down' ? '▼' : '─'} {Math.abs(item.change).toLocaleString()}
                        </div>
                        <div className="text-right text-xs font-medium leading-[16.8px]">
                          ({item.changePercent > 0 ? '+' : ''}{item.changePercent}%)
                        </div>
                      </div>

                      {/* 상세 버튼 */}
                      <button
                        className="w-[60px] h-[36px] bg-[#284AB5] rounded-[2px] text-white text-sm font-semibold leading-[16.8px] flex items-center justify-center hover:opacity-90 transition-opacity"
                        onClick={() => {
                          // 상세 페이지로 이동 로직 추가 가능
                        }}
                      >
                        상세
                      </button>

                      {/* 문의 버튼 */}
                      <button
                        className="w-[60px] h-[36px] rounded-[2px] text-white text-sm font-semibold leading-[16.8px] flex items-center justify-center transition-opacity hover:opacity-90"
                        style={{ backgroundColor: tabColors.inquiryBg }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = tabColors.inquiryHover}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = tabColors.inquiryBg}
                        onClick={() => navigate && navigate('inquiry')}
                      >
                        문의
                      </button>
                    </div>
                  );
                })}
              </div>
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
