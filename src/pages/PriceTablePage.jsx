import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import CategoryTabs from '../components/CategoryTabs';
import { colors } from '../config/colors';
import DetailModal from '../components/DetailModal';
import { getMembershipsByCategory, getPriceHistoryById } from '../services/membershipService';

export default function PriceTablePage({ navigate }) {
  const [activeTab, setActiveTab] = useState('golf');
  const [selectedItem, setSelectedItem] = useState(null);
  const [chartPeriod, setChartPeriod] = useState('week');
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [priceData, setPriceData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chartLoading, setChartLoading] = useState(false);

  // Supabase에서 카테고리별 시세 데이터 로드
  useEffect(() => {
    const loadPriceData = async () => {
      try {
        setLoading(true);
        
        const data = await getMembershipsByCategory(activeTab);
        
        const formatted = data
          .filter(m => m.active_flag)
          .map(m => ({
            id: m.id,
            product_name: m.product_name,
            membership_name: m.membership_name,
            fullName: `${m.product_name} ${m.membership_name}`,
            price: m.current_price,
            change: m.change_value,
            changePercent: m.change_percent,
            trend: m.trend
          }));
        
        setPriceData(formatted);
      } catch (error) {
        console.error('시세 데이터 로드 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPriceData();
    setSelectedItem(null); // 카테고리 변경시 선택 초기화
  }, [activeTab]);

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

  // Supabase에서 차트 데이터 로드
  useEffect(() => {
    const loadChartData = async () => {
      if (!selectedItem) {
        setChartData([]);
        return;
      }

      try {
        setChartLoading(true);

        const daysMap = {
          week: 7,
          month: 30,
          sixMonths: 180,
          year: 365
        };

        const days = daysMap[chartPeriod];
        
        // 전체 히스토리 데이터 가져오기 (기간 제한 없음)
        const allHistoryData = await getPriceHistoryById(selectedItem.id, null);

        if (allHistoryData.length === 0) {
          setChartData([]);
          return;
        }

        // 최신 날짜 기준으로 필터링
        const latestDate = new Date(allHistoryData[allHistoryData.length - 1].date);
        const startDate = new Date(latestDate);
        startDate.setDate(startDate.getDate() - days);

        const filteredData = allHistoryData.filter(h => {
          const recordDate = new Date(h.date);
          return recordDate >= startDate;
        });

        if (filteredData.length === 0) {
          setChartData([]);
          return;
        }

        const formatted = filteredData.map(h => {
          const date = new Date(h.date);
          let label;

          if (chartPeriod === 'week' || chartPeriod === 'month') {
            label = `${date.getMonth() + 1}/${date.getDate()}`;
          } else {
            label = `${date.getFullYear()}.${date.getMonth() + 1}`;
          }

          return {
            name: label,
            price: h.price,
            fullDate: h.date
          };
        });

        setChartData(formatted);
      } catch (error) {
        console.error('차트 데이터 로드 실패:', error);
        setChartData([]);
      } finally {
        setChartLoading(false);
      }
    };

    loadChartData();
  }, [selectedItem, chartPeriod]);

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


  // 날짜 포맷 함수
  const getDateDisplay = (category) => {
    const today = new Date();

    if (category === 'golf') {
      // 골프: 오늘 날짜
      const year = today.getFullYear();
      const month = today.getMonth() + 1;
      const date = today.getDate();
      return `${year}.${month}.${date}`;
    } else {
      // 콘도, 피트니스: 이번 주 월요일 ~ 일요일
      const currentDay = today.getDay(); // 0: 일요일, 1: 월요일, ...
      
      // 월요일 계산
      const monday = new Date(today);
      const daysToMonday = currentDay === 0 ? -6 : 1 - currentDay;
      monday.setDate(monday.getDate() + daysToMonday);

      // 일요일 계산 (월요일로부터 6일 후)
      const sunday = new Date(monday);
      sunday.setDate(sunday.getDate() + 6);

      const mondayYear = monday.getFullYear();
      const mondayMonth = monday.getMonth() + 1;
      const mondayDate = monday.getDate();
      
      const sundayYear = sunday.getFullYear();
      const sundayMonth = sunday.getMonth() + 1;
      const sundayDate = sunday.getDate();

      return `${mondayYear}.${mondayMonth}.${mondayDate} ~ ${sundayYear}.${sundayMonth}.${sundayDate}`;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* 스티키 탭 */}
      <div className="sticky top-0 bg-white z-10" style={{ height: '64px', borderBottom: '1px solid #BDBDBD' }}>
        <div className="mx-auto h-full flex items-center" style={{ maxWidth: '1200px', paddingLeft: '24px', paddingRight: '24px'}}>
          <CategoryTabs
            activeTab={activeTab}
            onTabChange={(tab) => {
              setActiveTab(tab);
              setSelectedItem(null);
              // 골프는 일주일, 콘도/피트니스는 1개월 디폴트
              setChartPeriod(tab === 'golf' ? 'week' : 'month');
            }}
            variant="default"
          />
        </div>
      </div>

      {/* 메인 컨텐츠 */}

      <div className="mx-auto" style={{ maxWidth: '1200px', paddingTop: '48px', paddingBottom: '48px', paddingLeft: '24px', paddingRight: '24px' }}>

        <div className="grid grid-cols-2 gap-8">
          {/* 좌측: 시세표 카드 리스트 */}
          <div className="bg-white rounded-[5px] border border-[#BDBDBD]">
            <div className="p-6">
              <div className="flex items-end justify-between mb-6">
                <h2 className="font-bold" style={{ color: '#111111', fontSize: '24px', fontWeight: 700 }}>
                  {tabLabels[activeTab]} {activeTab === 'golf' ? '금일' : '금주'} 시세표
                </h2>
                <div style={{ fontSize: '16px', fontWeight: 500, color: '#717171' }}>
                  {getDateDisplay(activeTab)}
                </div>
              </div>

              {/* 헤더 */}
              <div className="flex items-center px-4 py-3 mb-4" style={{ width: '510px', borderBottom: '1px solid #BDBDBD' }}>
                <div className="text-center font-medium" style={{ width: '135px', color: '#111111', fontSize: '16px', fontWeight: 500 }}>
                  회원권명
                </div>
                <div className="text-center font-medium" style={{ width: '96px', color: '#111111', fontSize: '16px', fontWeight: 500, marginLeft: '16px' }}>
                  시세
                </div>
                <div className="text-center font-medium" style={{ width: '63px', color: '#111111', fontSize: '16px', fontWeight: 500, marginLeft: '16px' }}>
                  등락
                </div>
              </div>

              {/* 카드 리스트 */}
              <div className="flex flex-col gap-4">
                {loading ? (
                  <div className="text-center py-10 text-gray-600">데이터를 불러오는 중...</div>
                ) : priceData.length === 0 ? (
                  <div className="text-center py-10 text-gray-600">시세 데이터가 없습니다.</div>
                ) : (
                  priceData.map((item) => {
                  const tabColors = getTabColors(activeTab);
                  const isSelected = selectedItem?.id === item.id;
                  return (
                    <div
                      key={item.id}
                      className={`w-full h-[74px] p-4 rounded-[5px] flex items-center gap-4 transition-colors ${
                        isSelected ? 'bg-[#E8E7F5]' : 'bg-[#F6F5FD] hover:bg-[#E8E7F5]'
                      }`}
                      onClick={(e) => {
                        if (!e.target.closest('button')) {
                          setSelectedItem(item);
                        }
                      }}
                    >
                      {/* 회원권명 + 카테고리 */}
                      <div className="w-[135px] flex flex-col gap-1.5">
                        <div className="w-[135px] h-[19px] text-[#111111] text-base font-semibold leading-[19.2px]" style={{ letterSpacing: '-0.015em' }}>
                          {item.product_name}
                        </div>
                        <div className="w-[135px] text-[#111111] text-sm font-medium leading-[16.8px]">
                          {item.membership_name}
                        </div>
                      </div>

                      {/* 가격 */}
                      <div className="w-24 flex justify-end items-baseline gap-1">
                        <div className="text-right text-[#111111] text-lg font-bold leading-[21.6px]">
                          {item.price.toLocaleString()}
                        </div>
                        <div className="text-right text-[#717171] text-xs font-medium leading-[14.4px]">
                          만원
                        </div>
                      </div>

                      {/* 등락 */}
                      <div
                        className={`w-[63px] flex flex-col items-end ${
                          item.trend === 'up' ? 'text-[#EF4444]' :
                          item.trend === 'down' ? 'text-blue-500' :
                          'text-[#717171]'
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
                        className="w-[60px] h-[36px] bg-[#284AB5] rounded-[2px] text-white text-sm font-semibold leading-[16.8px] flex items-center justify-center hover:opacity-90 transition-opacity cursor-pointer"
                        onClick={() => {
                          setSelectedItem(item);
                          setIsDetailModalOpen(true);
                        }}
                      >
                        상세
                      </button>

                      {/* 문의 버튼 */}
                      <button
                        className="w-[60px] h-[36px] rounded-[2px] text-white text-sm font-semibold leading-[16.8px] flex items-center justify-center hover:opacity-90 transition-opacity cursor-pointer"
                        style={{ backgroundColor: tabColors.inquiryBg }}
                        onClick={() => navigate && navigate('inquiry')}
                      >
                        문의
                      </button>
                    </div>
                  );
                })
                )}
              </div>
            </div>
          </div>

          {/* 우측: 가격 변동 그래프 (sticky) */}
          <div className="sticky top-20 h-fit">
            <div className="bg-white p-[25px]">
              <h2 className="font-bold mb-[24px]" style={{ height: '32px', fontSize: '24px', color: '#111111', fontWeight: 700 }}>
                가격 변동 그래프
              </h2>

              {/* 기간 선택 탭 */}
              <div className="flex mb-4" style={{ width: '510px', height: '49px', borderBottom: '1px solid #BDBDBD' }}>
                {Object.keys(periodLabels)
                  // 콘도, 피트니스일 때 일주일 제외 (나중에 복구 가능하도록 주석 처리)
                  .filter(period => {
                    // return true; // 주석 해제하면 모든 기간 표시
                    if (activeTab === 'condo' || activeTab === 'fitness') {
                      return period !== 'week'; // 일주일 제외
                    }
                    return true; // 골프는 모든 기간 표시
                  })
                  .map(period => {
                    const tabColors = getTabColors(activeTab);
                    return (
                      <button
                        key={period}
                        onClick={() => setChartPeriod(period)}
                        className={`px-4 transition-colors ${chartPeriod === period ? '' : 'text-[#717171] hover:text-gray-700'}`}
                        style={{
                          fontSize: '16px',
                          fontWeight: 500,
                          color: chartPeriod === period ? tabColors.chartColor : undefined,
                          borderBottom: chartPeriod === period ? `2px solid ${tabColors.chartColor}` : 'none'
                        }}
                      >
                        {periodLabels[period]}
                      </button>
                    );
                  })}
              </div>

              {/* 그래프 영역 */}
              {selectedItem ? (
                <div>
                  <div className="mb-4 p-4 rounded-lg" style={{ width: '510px', backgroundColor: '#F6F5FD', padding: '16px', marginBottom: '16px' }}>
                    <div style={{ fontSize: '18px', color: '#111111', fontWeight: 600 }}>
                      {selectedItem.fullName || selectedItem.name}
                    </div>
                    <div style={{ marginTop: '8px' }}>
                      <span style={{ fontSize: '30px', color: '#111111', fontWeight: 700 }}>
                        {selectedItem.price.toLocaleString()}
                      </span>
                      <span style={{ fontSize: '16px', color: '#717171', fontWeight: 500, marginLeft: '8px' }}>
                        만원
                      </span>
                    </div>
                    <div style={{
                      fontSize: '18px',
                      fontWeight: 500,
                      marginTop: '8px',
                      color: selectedItem.trend === 'up' ? '#EF4444' :
                             selectedItem.trend === 'down' ? '#2563eb' :
                             '#717171'
                    }}>
                      {selectedItem.trend === 'up' ? '▲' : selectedItem.trend === 'down' ? '▼' : '─'}
                      {' '}{Math.abs(selectedItem.change).toLocaleString()}
                      {' '}({selectedItem.changePercent > 0 ? '+' : ''}{selectedItem.changePercent}%)
                    </div>
                  </div>

                  {chartLoading ? (
                    <div className="h-80 flex items-center justify-center text-gray-600">
                      차트 데이터를 불러오는 중...
                    </div>
                  ) : chartData.length === 0 ? (
                    <div className="h-80 flex items-center justify-center text-gray-600">
                      가격 히스토리 데이터가 없습니다.
                    </div>
                  ) : (
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#BDBDBD" />
                      <XAxis
                        dataKey="name"
                        tick={(props) => {
                          const { x, y, payload, index } = props;
                          if (index === 0) {
                            return null;
                          }
                          return (
                            <text x={x} y={y + 10} textAnchor="middle" fontSize={12} fill="#717171">
                              {payload.value}
                            </text>
                          );
                        }}
                        tickLine={true}
                        interval={getXAxisInterval(chartPeriod)}
                        domain={['dataMin', 'dataMax']}
                        stroke="#717171"
                      />
                      <YAxis
                        tick={{ fontSize: 12, fill: '#717171' }}
                        domain={['dataMin - 1000', 'dataMax + 1000']}
                        stroke="#717171"
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
                  )}
                </div>
              ) : (
                <div className="h-96 flex items-center justify-center" style={{ color: '#717171' }}>
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

      {/* 상세보기 모달 */}
      <DetailModal isOpen={isDetailModalOpen} onClose={() => setIsDetailModalOpen(false)}>
        {selectedItem && (
          <div style={{ padding: '40px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '20px' }}>
              {selectedItem.fullName || selectedItem.name}
            </h2>
            <div style={{ fontSize: '28px', fontWeight: 700, color: colors[activeTab], marginBottom: '20px' }}>
              {selectedItem.price.toLocaleString()} 만원
            </div>
            <div style={{ fontSize: '18px', marginBottom: '12px' }}>
              <span style={{ color: '#717171' }}>변동: </span>
              <span style={{
                color: selectedItem.trend === 'up' ? '#ef4444' :
                       selectedItem.trend === 'down' ? '#3b82f6' : '#717171'
              }}>
                {selectedItem.trend === 'up' ? '▲' : selectedItem.trend === 'down' ? '▼' : '─'}
                {' '}{Math.abs(selectedItem.change).toLocaleString()} 만원
                {' '}({selectedItem.changePercent > 0 ? '+' : ''}{selectedItem.changePercent}%)
              </span>
            </div>
          </div>
        )}
      </DetailModal>
    </div>
  );
}
