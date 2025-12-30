import React, { useState } from 'react';

export default function InquiryPage({ navigate }) {
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
    <div className="min-h-screen bg-[#F6F5FD]">
      {/* 메인 컨텐츠 */}
      <div className="max-w-[1200px] mx-auto px-6 py-12 bg-[#F6F5FD]">
        <div className="max-w-[720px] mx-auto bg-white rounded-[5px] border border-[#BDBDBD] p-8">
          <h1 className="text-[28px] font-bold text-[#111111] mb-8 text-center">회원권 매매문의</h1>

          <div>
            {/* 회원권 구분 */}
            <div className="mb-6">
              <label className="block text-[14px] font-bold text-[#111111] mb-3">회원권 구분</label>
              <div className="flex gap-6">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="category"
                    value="golf"
                    checked={formData.category === 'golf'}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-4 h-4 accent-[#284AB5]"
                    style={{ border: '1px solid #717171' }}
                  />
                  <span className="ml-2 text-[16px] font-normal text-[#111111]">골프</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="category"
                    value="condo"
                    checked={formData.category === 'condo'}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-4 h-4 accent-[#284AB5]"
                    style={{ border: '1px solid #717171' }}
                  />
                  <span className="ml-2 text-[16px] font-normal text-[#111111]">콘도</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="category"
                    value="fitness"
                    checked={formData.category === 'fitness'}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-4 h-4 accent-[#284AB5]"
                    style={{ border: '1px solid #717171' }}
                  />
                  <span className="ml-2 text-[16px] font-normal text-[#111111]">피트니스</span>
                </label>
              </div>
            </div>

            {/* 회원권명 */}
            <div className="mb-6">
              <label className="block text-[14px] font-bold text-[#111111] mb-3">회원권명</label>
              <input
                type="text"
                value={formData.membershipName}
                onChange={(e) => setFormData({...formData, membershipName: e.target.value})}
                className="w-full px-4 py-3 border border-[#BDBDBD] rounded-[5px] focus:outline-none focus:border-[#717171] text-[16px] font-normal text-[#111111] placeholder:text-[#BDBDBD]"
                placeholder="회원권명을 입력하세요"
              />
            </div>

            {/* 희망 가격 */}
            <div className="mb-6">
              <label className="block text-[14px] font-bold text-[#111111] mb-3">희망 가격</label>
              <input
                type="text"
                value={formData.desiredPrice}
                onChange={(e) => setFormData({...formData, desiredPrice: e.target.value})}
                className="w-full px-4 py-3 border border-[#BDBDBD] rounded-[5px] focus:outline-none focus:border-[#717171] text-[16px] font-normal text-[#111111] placeholder:text-[#BDBDBD]"
                placeholder="희망 가격을 입력하세요 (만원)"
              />
            </div>

            {/* 이름 */}
            <div className="mb-6">
              <label className="block text-[14px] font-bold text-[#111111] mb-3">이름</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-3 border border-[#BDBDBD] rounded-[5px] focus:outline-none focus:border-[#717171] text-[16px] font-normal text-[#111111] placeholder:text-[#BDBDBD]"
                placeholder="이름을 입력하세요"
              />
            </div>

            {/* 연락처 */}
            <div className="mb-6">
              <label className="block text-[14px] font-bold text-[#111111] mb-3">연락처</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={formData.phone1}
                  onChange={(e) => setFormData({...formData, phone1: e.target.value})}
                  className="w-full px-4 py-3 border border-[#BDBDBD] rounded-[5px] focus:outline-none focus:border-[#717171] text-center text-[16px] font-normal text-[#111111]"
                  style={{ flex: '3' }}
                  maxLength="3"
                />
                <span className="text-gray-500">-</span>
                <input
                  type="text"
                  value={formData.phone2}
                  onChange={(e) => setFormData({...formData, phone2: e.target.value})}
                  className="w-full px-4 py-3 border border-[#BDBDBD] rounded-[5px] focus:outline-none focus:border-[#717171] text-center text-[16px] font-normal text-[#111111] placeholder:text-[#BDBDBD]"
                  style={{ flex: '4' }}
                  maxLength="4"
                  placeholder="0000"
                />
                <span className="text-gray-500">-</span>
                <input
                  type="text"
                  value={formData.phone3}
                  onChange={(e) => setFormData({...formData, phone3: e.target.value})}
                  className="w-full px-4 py-3 border border-[#BDBDBD] rounded-[5px] focus:outline-none focus:border-[#717171] text-center text-[16px] font-normal text-[#111111] placeholder:text-[#BDBDBD]"
                  style={{ flex: '4' }}
                  maxLength="4"
                  placeholder="0000"
                />
              </div>
            </div>

            {/* 참고사항 */}
            <div className="mb-6">
              <label className="block text-[14px] font-bold text-[#111111] mb-3">참고사항</label>
              <textarea
                value={formData.note}
                onChange={(e) => setFormData({...formData, note: e.target.value})}
                className="w-full px-4 py-3 border border-[#BDBDBD] rounded-[5px] focus:outline-none focus:border-[#717171] resize-none text-[16px] font-normal text-[#111111] placeholder:text-[#BDBDBD]"
                rows="6"
                placeholder="참고사항을 입력하세요"
              />
            </div>

            {/* 개인정보 동의 */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.agreePrivacy}
                    onChange={(e) => setFormData({...formData, agreePrivacy: e.target.checked})}
                    className="w-4 h-4 accent-[#284AB5] rounded"
                    style={{ border: '1px solid #717171' }}
                  />
                  <span className="ml-2 text-[14px] font-normal text-[#717171]">개인정보 수집 및 이용에 동의합니다.</span>
                </label>
                <button
                  type="button"
                  onClick={() => setShowTerms(!showTerms)}
                  className="px-3 py-1 text-[14px] text-[#111111] border border-[#BDBDBD] rounded-[2px] hover:bg-gray-50 transition-colors font-medium"
                >
                  약관보기
                </button>
              </div>

              {showTerms && (
                <div className="mt-4 p-4 bg-[#F6F5FD] rounded-[5px] border border-[#BDBDBD] text-sm text-[#717171] max-h-40 overflow-y-auto">
                  <p className="font-bold mb-2">개인정보 수집과 이용에 대한 동의</p>
                  <p className="mb-2">1. 수집하는 자: (주)티앤지레저</p>
                  <p className="mb-2">2. 개인정보 수집 및 이용 목적: 회원권 매매 상담 및 연락</p>
                  <p className="mb-2">3. 수집하는 개인정보 항목: 이름, 연락처</p>
                  <p className="mb-2">4. 개인정보 보유 및 이용 기간: 상담 완료 후 6개월</p>
                  <p>※ 개인정보 수집에 동의하지 않을 수 있으며, 동의하지 않을 경우 상담 서비스 이용이 제한될 수 있습니다.</p>
                </div>
              )}
            </div>

            {/* 신청 버튼 */}
            <button
              onClick={handleSubmit}
              className="w-full h-[52px] bg-[#284AB5] text-white rounded-[2px] hover:bg-[#1e3a8a] transition-colors text-[18px] font-bold"
            >
              문의신청
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
