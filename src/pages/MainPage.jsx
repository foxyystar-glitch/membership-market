import React, { useState, useMemo } from 'react';
import { memberships } from '../data/memberships';
import { urgentSales } from '../data/urgentSales';
import { presales } from '../data/presales';
import { colors } from '../config/colors';
import DetailModal from '../components/DetailModal';

export default function MainPage({ navigate }) {
  const [priceTab, setPriceTab] = useState('golf');
  const [urgentTab, setUrgentTab] = useState('golf');
  const [saleTab, setSaleTab] = useState('golf');

  // 모달 상태 관리
  const [isPriceModalOpen, setIsPriceModalOpen] = useState(false);
  const [isUrgentModalOpen, setIsUrgentModalOpen] = useState(false);
  const [isSaleModalOpen, setIsSaleModalOpen] = useState(false);
  const [selectedPriceItem, setSelectedPriceItem] = useState(null);
  const [selectedUrgentItem, setSelectedUrgentItem] = useState(null);
  const [selectedSaleItem, setSelectedSaleItem] = useState(null);

  // 시세표 데이터: display_flag=true & rank가 있는 TOP 5
  const priceData = useMemo(() => {
    const byCategory = { golf: [], condo: [], fitness: [] };

    memberships
      .filter(m => m.display_flag && m.rank !== null && m.active_flag)
      .sort((a, b) => a.rank - b.rank)
      .forEach(m => {
        if (byCategory[m.category].length < 5) {
          byCategory[m.category].push({
            name: `${m.product_name} ${m.membership_name}`,
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
            name: `${membership.product_name} ${membership.membership_name}`,
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
            productName: membership.product_name,
            membershipName: membership.membership_name,
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
    return {
      color: colors[tab],
      textClass: `text-[${colors[tab]}]`,
      borderClass: `border-[${colors[tab]}]`,
      bgClass: `bg-[${colors[tab]}]`
    };
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
        <div className="relative mx-auto h-full flex items-center" style={{ maxWidth: '1200px', paddingLeft: '24px', paddingRight: '24px' }}>
          <div className="text-white">
            <h1 className="text-5xl font-bold mb-4">프리미엄 회원권 거래</h1>
            <p className="text-xl opacity-90">골프 · 콘도 · 피트니스 회원권의 모든 것</p>
          </div>
        </div>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="mx-auto py-12" style={{ maxWidth: '1200px', paddingLeft: '24px', paddingRight: '24px' }}>
        <div className="grid grid-cols-2 gap-8">
          {/* 실시간 시세표 */}
          <div className="bg-white rounded-[5px] border border-[#BDBDBD] shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[24px] font-bold text-[#111111]">실시간 시세표</h2>
              <button
                onClick={() => navigate && navigate('sise')}
                className="cursor-pointer"
                style={{ fontSize: '20px', color: '#717171', fontWeight: 600 }}
              >
                +전체보기
              </button>
            </div>

            {/* 탭 */}
            <div className="flex gap-2 mb-6 border-b border-[#BDBDBD]">
              {Object.keys(tabLabels).map(tab => {
                const colors = getTabColors(tab);
                return (
                  <button
                    key={tab}
                    onClick={() => setPriceTab(tab)}
                    className={`px-4 py-2 text-[16px] font-medium transition-colors ${
                      priceTab === tab
                        ? `border-b-2`
                        : 'text-[#717171] hover:text-gray-700'
                    }`}
                    style={priceTab === tab ? { color: colors.color, borderBottomColor: colors.color } : {}}
                  >
                    {tabLabels[tab]}
                  </button>
                );
              })}
            </div>

            {/* 시세 리스트 */}
            <div className="overflow-y-auto space-y-4 mb-0" style={{ height: '430px' }}>
              {priceData[priceTab].map((item, idx) => {
                const colors = getTabColors(priceTab);
                return (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-4 bg-[#F6F5FD] rounded-lg hover:bg-[#E8E7F5] transition-colors cursor-pointer"
                    onClick={() => {
                      setSelectedPriceItem(item);
                      setIsPriceModalOpen(true);
                    }}
                  >
                    <div className="flex-1">
                      <div className="font-semibold" style={{ fontSize: '18px', color: '#111111' }}>{item.name}</div>
                      <div className="font-bold" style={{ fontSize: '24px', color: '#111111', marginTop: '4px' }}>
                        {item.price.toLocaleString()}
                        <span className="font-medium" style={{ fontSize: '14px', color: '#717171', marginLeft: '5px' }}>만원</span>
                      </div>
                    </div>
                    <div className={`flex-shrink-0 text-right text-[18px] font-medium mx-8 ${
                      item.trend === 'up' ? 'text-red-500' :
                      item.trend === 'down' ? 'text-blue-500' :
                      'text-[#717171]'
                    }`}>
                      <div>
                        {item.trend === 'up' ? '▲' : item.trend === 'down' ? '▼' : '─'}
                        {' '}{Math.abs(item.change).toLocaleString()}
                      </div>
                      <div className="text-sm">
                        ({item.changePercent > 0 ? '+' : ''}{item.changePercent}%)
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate && navigate('inquiry');
                      }}
                      className="flex-shrink-0 flex items-center justify-center text-white font-semibold rounded-[2px] transition-colors"
                      style={{ backgroundColor: colors.color, width: '60px', height: '36px', fontSize: '14px' }}
                    >
                      문의
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 급매 정보 */}
          <div className="bg-white rounded-[5px] border border-[#BDBDBD] shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[24px] font-bold text-[#111111]">급매 정보</h2>
              <button
                onClick={() => navigate && navigate('urgent')}
                className="cursor-pointer"
                style={{ fontSize: '20px', color: '#717171', fontWeight: 600 }}
              >
                +전체보기
              </button>
            </div>

            {/* 탭 */}
            <div className="flex gap-2 mb-6 border-b border-[#BDBDBD]">
              {Object.keys(tabLabels).map(tab => {
                return (
                  <button
                    key={tab}
                    onClick={() => setUrgentTab(tab)}
                    className={`px-4 py-2 text-[16px] font-medium transition-colors ${
                      urgentTab === tab
                        ? 'border-b-2'
                        : 'text-[#717171] hover:text-gray-700'
                    }`}
                    style={urgentTab === tab ? { color: '#FA3766', borderBottomColor: '#FA3766' } : {}}
                  >
                    {tabLabels[tab]}
                  </button>
                );
              })}
            </div>

            {/* 급매 리스트 */}
            <div className="overflow-y-auto space-y-4 mb-0" style={{ height: '430px' }}>
              {urgentData[urgentTab].map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-[5px] transition-colors bg-[#FEF3F6] cursor-pointer hover:bg-[#FDE1E9]"
                  style={{ padding: '16px' }}
                  onClick={() => {
                    setSelectedUrgentItem(item);
                    setIsUrgentModalOpen(true);
                  }}
                >
                  <div className="flex items-end justify-between" style={{ marginBottom: '10px' }}>
                    <div>
                      <span className="inline-block px-2 py-1 text-white rounded mb-2" style={{ fontSize: '12px', fontWeight: 700, backgroundColor: '#FA3766' }}>
                        급매
                      </span>
                      <div className="font-semibold" style={{ fontSize: '18px', color: '#111111' }}>{item.name}</div>
                      <div className="font-medium" style={{ fontSize: '14px', color: '#717171', marginTop: '4px' }}>{item.location}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold" style={{ fontSize: '24px', color: '#111111' }}>
                        {item.price}
                        <span className="font-medium" style={{ fontSize: '14px', color: '#717171', marginLeft: '5px' }}>만원</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate && navigate('inquiry');
                    }}
                    className="w-full text-white rounded-[2px] transition-colors font-medium"
                    style={{ height: '36px', backgroundColor: '#FA3766', fontSize: '14px' }}
                  >
                    문의하기
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 분양 정보 섹션 */}
        <div className="mt-12 bg-white rounded-[5px] border border-[#BDBDBD] shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[24px] font-bold text-[#111111]">분양 정보</h2>
            <button
              onClick={() => navigate && navigate('presale')}
              className="cursor-pointer"
              style={{ fontSize: '20px', color: '#717171', fontWeight: 600 }}
            >
              +전체보기
            </button>
          </div>

          {/* 탭 */}
          <div className="flex gap-2 mb-6 border-b border-[#BDBDBD]">
            {Object.keys(tabLabels).map(tab => {
              const colors = getTabColors(tab);
              return (
                <button
                  key={tab}
                  onClick={() => setSaleTab(tab)}
                  className={`px-4 py-2 font-medium transition-colors ${
                    saleTab === tab
                      ? `border-b-2`
                      : 'text-[#717171] hover:text-gray-700'
                  }`}
                  style={saleTab === tab ? { color: colors.color, borderBottomColor: colors.color } : {}}
                >
                  {tabLabels[tab]}
                </button>
              );
            })}
          </div>

          {/* 분양 카드 그리드 */}
          <div className="grid grid-cols-5" style={{ gap: '23px' }}>
            {saleData[saleTab].map((item, idx) => {
              const colors = getTabColors(saleTab);

              return (
                <div
                  key={idx}
                  className="rounded-[5px] overflow-hidden cursor-pointer hover:shadow-lg transition-all"
                  style={{ width: '202px', height: '380px', backgroundColor: '#F6F5FD', position: 'relative' }}
                  onClick={() => {
                    setSelectedSaleItem(item);
                    setIsSaleModalOpen(true);
                  }}
                >
                  {/* 분양 상태 배지 */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      padding: '4px 12px',
                      backgroundColor: colors.color,
                      color: '#ffffff',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: 700,
                      zIndex: 5,
                      boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                    }}
                  >
                    {item.status}
                  </div>

                  {/* 썸네일 */}
                  <div className="flex items-center justify-center" style={{ width: '202px', height: '202px' }}>
                    <img src="/thumbnail_tmp.png" alt="thumbnail" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>

                  {/* 본문 영역 */}
                  <div className="flex flex-col" style={{ padding: '16px', height: '178px' }}>
                    <div className="font-semibold" style={{ fontSize: '18px', color: '#111111', lineHeight: '22px' }}>
                      {item.productName}
                    </div>
                    <div className="font-medium" style={{ fontSize: '14px', color: '#111111', marginTop: '4px', lineHeight: '17px' }}>
                      {item.membershipName}
                    </div>
                    <div className="font-medium" style={{ fontSize: '12px', color: '#717171', marginTop: '8px', lineHeight: '14px' }}>
                      {item.location}
                    </div>
                    <div className="font-bold mb-auto" style={{ fontSize: '24px', color: colors.color, marginTop: '8px', marginBottom: '8px', lineHeight: '29px' }}>
                      {item.price.toLocaleString()}
                      <span className="font-medium" style={{ fontSize: '12px', color: '#717171', marginLeft: '5px', lineHeight: '14px' }}>만원</span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate && navigate('inquiry');
                      }}
                      className="w-full text-white rounded-[2px] transition-colors font-semibold"
                      style={{ height: '36px', backgroundColor: colors.color, fontSize: '14px', padding: 0 }}
                    >
                      문의하기
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 실시간 시세표 모달 */}
      <DetailModal isOpen={isPriceModalOpen} onClose={() => setIsPriceModalOpen(false)}>
        {selectedPriceItem && (
          <div style={{ padding: '40px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '20px' }}>
              {selectedPriceItem.name}
            </h2>
            <div style={{ fontSize: '28px', fontWeight: 700, color: colors[priceTab], marginBottom: '20px' }}>
              {selectedPriceItem.price.toLocaleString()} 만원
            </div>
            <div style={{ fontSize: '18px', marginBottom: '12px' }}>
              <span style={{ color: '#717171' }}>변동: </span>
              <span style={{
                color: selectedPriceItem.trend === 'up' ? '#ef4444' :
                       selectedPriceItem.trend === 'down' ? '#3b82f6' : '#717171'
              }}>
                {selectedPriceItem.trend === 'up' ? '▲' : selectedPriceItem.trend === 'down' ? '▼' : '─'}
                {' '}{Math.abs(selectedPriceItem.change).toLocaleString()} 만원
                {' '}({selectedPriceItem.changePercent > 0 ? '+' : ''}{selectedPriceItem.changePercent}%)
              </span>
            </div>
          </div>
        )}
      </DetailModal>

      {/* 급매 정보 모달 */}
      <DetailModal isOpen={isUrgentModalOpen} onClose={() => setIsUrgentModalOpen(false)}>
        {selectedUrgentItem && (
          <div style={{ padding: '40px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '20px' }}>
              {selectedUrgentItem.name}
            </h2>
            <div style={{ fontSize: '16px', color: '#717171', marginBottom: '20px' }}>
              {selectedUrgentItem.location}
            </div>
            <div style={{ fontSize: '28px', fontWeight: 700, color: colors.urgent }}>
              {selectedUrgentItem.price} 만원
            </div>
          </div>
        )}
      </DetailModal>

      {/* 분양 정보 모달 */}
      <DetailModal isOpen={isSaleModalOpen} onClose={() => setIsSaleModalOpen(false)}>
        {selectedSaleItem && (
          <div style={{ padding: '40px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '20px' }}>
              {selectedSaleItem.productName}
            </h2>
            <div style={{ fontSize: '18px', marginBottom: '12px' }}>
              {selectedSaleItem.membershipName}
            </div>
            <div style={{ fontSize: '16px', color: '#717171', marginBottom: '20px' }}>
              {selectedSaleItem.location}
            </div>
            <div style={{ fontSize: '28px', fontWeight: 700, color: colors[saleTab] }}>
              {selectedSaleItem.price.toLocaleString()} 만원
            </div>
          </div>
        )}
      </DetailModal>
    </div>
  );
}
