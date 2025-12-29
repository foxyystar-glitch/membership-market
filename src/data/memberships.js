// mainDB (memberships) - 회원권 마스터 데이터
export const memberships = [
  // 골프 회원권 (15개)
  { id: 1, category: 'golf', product_name: '골프 회원권', membership_name: '남서울컨트리클럽', location: '경기 용인', current_price: 45000, change_value: -1000, change_percent: -2.17, trend: 'down', active_flag: true, display_flag: true, rank: 1 },
  { id: 2, category: 'golf', product_name: '골프 회원권', membership_name: '레이크사이드CC', location: '경기 이천', current_price: 38500, change_value: 500, change_percent: 1.32, trend: 'up', active_flag: true, display_flag: true, rank: 2 },
  { id: 3, category: 'golf', product_name: '골프 회원권', membership_name: '안양베네스트CC', location: '경기 의왕', current_price: 52000, change_value: 0, change_percent: 0, trend: 'stable', active_flag: true, display_flag: true, rank: 3 },
  { id: 4, category: 'golf', product_name: '골프 회원권', membership_name: '용인컨트리클럽', location: '경기 용인', current_price: 41200, change_value: 800, change_percent: 1.98, trend: 'up', active_flag: true, display_flag: true, rank: 4 },
  { id: 5, category: 'golf', product_name: '골프 회원권', membership_name: '일동레이크CC', location: '경기 포천', current_price: 47800, change_value: -500, change_percent: -1.04, trend: 'down', active_flag: true, display_flag: true, rank: 5 },
  { id: 6, category: 'golf', product_name: '골프 회원권', membership_name: '오크밸리CC', location: '강원 원주', current_price: 36000, change_value: 200, change_percent: 0.56, trend: 'up', active_flag: true, display_flag: false, rank: null },
  { id: 7, category: 'golf', product_name: '골프 회원권', membership_name: '크리스탈밸리CC', location: '충남 아산', current_price: 29500, change_value: -300, change_percent: -1.01, trend: 'down', active_flag: true, display_flag: false, rank: null },
  { id: 8, category: 'golf', product_name: '골프 회원권', membership_name: '제주샹그릴라CC', location: '제주 서귀포', current_price: 58000, change_value: 1000, change_percent: 1.75, trend: 'up', active_flag: true, display_flag: false, rank: null },
  { id: 9, category: 'golf', product_name: '골프 회원권', membership_name: '파인비치CC', location: '경북 포항', current_price: 33500, change_value: 0, change_percent: 0, trend: 'stable', active_flag: true, display_flag: false, rank: null },
  { id: 10, category: 'golf', product_name: '골프 회원권', membership_name: '스카이72(오션)', location: '인천 영종도', current_price: 44200, change_value: -400, change_percent: -0.90, trend: 'down', active_flag: true, display_flag: false, rank: null },
  { id: 11, category: 'golf', product_name: '골프 회원권', membership_name: '발안CC', location: '경기 화성', current_price: 39800, change_value: 600, change_percent: 1.53, trend: 'up', active_flag: true, display_flag: false, rank: null },
  { id: 12, category: 'golf', product_name: '골프 회원권', membership_name: '블루원 상주CC', location: '경북 상주', current_price: 31000, change_value: 0, change_percent: 0, trend: 'stable', active_flag: true, display_flag: false, rank: null },
  { id: 13, category: 'golf', product_name: '골프 회원권', membership_name: '경주신라CC', location: '경북 경주', current_price: 42500, change_value: 700, change_percent: 1.67, trend: 'up', active_flag: true, display_flag: false, rank: null },
  { id: 14, category: 'golf', product_name: '골프 회원권', membership_name: '한라산CC', location: '제주 제주시', current_price: 61000, change_value: 1500, change_percent: 2.52, trend: 'up', active_flag: true, display_flag: false, rank: null },
  { id: 15, category: 'golf', product_name: '골프 회원권', membership_name: '라데나CC', location: '충북 청주', current_price: 28000, change_value: -200, change_percent: -0.71, trend: 'down', active_flag: true, display_flag: false, rank: null },

  // 콘도 회원권 (10개)
  { id: 16, category: 'condo', product_name: '콘도 회원권', membership_name: '한화리조트 설악', location: '강원 속초', current_price: 850, change_value: 50, change_percent: 6.25, trend: 'up', active_flag: true, display_flag: true, rank: 1 },
  { id: 17, category: 'condo', product_name: '콘도 회원권', membership_name: '제주 롯데리조트', location: '제주 서귀포', current_price: 1200, change_value: 0, change_percent: 0, trend: 'stable', active_flag: true, display_flag: true, rank: 2 },
  { id: 18, category: 'condo', product_name: '콘도 회원권', membership_name: '대명리조트 소노문', location: '강원 홍천', current_price: 680, change_value: -20, change_percent: -2.86, trend: 'down', active_flag: true, display_flag: true, rank: 3 },
  { id: 19, category: 'condo', product_name: '콘도 회원권', membership_name: '파인리즈리조트', location: '경기 포천', current_price: 520, change_value: 30, change_percent: 6.12, trend: 'up', active_flag: true, display_flag: true, rank: 4 },
  { id: 20, category: 'condo', product_name: '콘도 회원권', membership_name: '켄싱턴제주호텔', location: '제주 제주시', current_price: 950, change_value: 50, change_percent: 5.56, trend: 'up', active_flag: true, display_flag: true, rank: 5 },
  { id: 21, category: 'condo', product_name: '콘도 회원권', membership_name: '현대성우리조트', location: '강원 고성', current_price: 580, change_value: 0, change_percent: 0, trend: 'stable', active_flag: true, display_flag: false, rank: null },
  { id: 22, category: 'condo', product_name: '콘도 회원권', membership_name: '설악 델피노', location: '강원 속초', current_price: 720, change_value: 20, change_percent: 2.86, trend: 'up', active_flag: true, display_flag: false, rank: null },
  { id: 23, category: 'condo', product_name: '콘도 회원권', membership_name: '오션월드', location: '강원 홍천', current_price: 650, change_value: -10, change_percent: -1.52, trend: 'down', active_flag: true, display_flag: false, rank: null },
  { id: 24, category: 'condo', product_name: '콘도 회원권', membership_name: '대명리조트 단양', location: '충북 단양', current_price: 480, change_value: 10, change_percent: 2.13, trend: 'up', active_flag: true, display_flag: false, rank: null },
  { id: 25, category: 'condo', product_name: '콘도 회원권', membership_name: '거제씨월드', location: '경남 거제', current_price: 620, change_value: 0, change_percent: 0, trend: 'stable', active_flag: true, display_flag: false, rank: null },

  // 피트니스 회원권 (10개)
  { id: 26, category: 'fitness', product_name: '피트니스 회원권', membership_name: '이촌한강스포렉스', location: '서울 용산구', current_price: 450, change_value: 20, change_percent: 4.65, trend: 'up', active_flag: true, display_flag: true, rank: 1 },
  { id: 27, category: 'fitness', product_name: '피트니스 회원권', membership_name: '타임스퀘어 휘트니스', location: '서울 영등포구', current_price: 380, change_value: 0, change_percent: 0, trend: 'stable', active_flag: true, display_flag: true, rank: 2 },
  { id: 28, category: 'fitness', product_name: '피트니스 회원권', membership_name: '반포 센트럴피트니스', location: '서울 서초구', current_price: 520, change_value: -10, change_percent: -1.89, trend: 'down', active_flag: true, display_flag: true, rank: 3 },
  { id: 29, category: 'fitness', product_name: '피트니스 회원권', membership_name: '청담 라휘트니스', location: '서울 강남구', current_price: 680, change_value: 30, change_percent: 4.62, trend: 'up', active_flag: true, display_flag: true, rank: 4 },
  { id: 30, category: 'fitness', product_name: '피트니스 회원권', membership_name: '목동 아이파크 휘트니스', location: '서울 양천구', current_price: 410, change_value: 15, change_percent: 3.80, trend: 'up', active_flag: true, display_flag: true, rank: 5 },
  { id: 31, category: 'fitness', product_name: '피트니스 회원권', membership_name: '분당 정자 휘트니스', location: '경기 성남시', current_price: 350, change_value: 0, change_percent: 0, trend: 'stable', active_flag: true, display_flag: false, rank: null },
  { id: 32, category: 'fitness', product_name: '피트니스 회원권', membership_name: '일산 킨텍스 스포츠', location: '경기 고양시', current_price: 320, change_value: 10, change_percent: 3.23, trend: 'up', active_flag: true, display_flag: false, rank: null },
  { id: 33, category: 'fitness', product_name: '피트니스 회원권', membership_name: '수지 동천 휘트니스', location: '경기 용인시', current_price: 290, change_value: -5, change_percent: -1.69, trend: 'down', active_flag: true, display_flag: false, rank: null },
  { id: 34, category: 'fitness', product_name: '피트니스 회원권', membership_name: '판교 알파돔시티', location: '경기 성남시', current_price: 580, change_value: 20, change_percent: 3.57, trend: 'up', active_flag: true, display_flag: false, rank: null },
  { id: 35, category: 'fitness', product_name: '피트니스 회원권', membership_name: '평촌 범계역 휘트니스', location: '경기 안양시', current_price: 310, change_value: 0, change_percent: 0, trend: 'stable', active_flag: true, display_flag: false, rank: null },
];

export default memberships;
