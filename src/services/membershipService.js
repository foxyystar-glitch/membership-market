import { supabase } from '../config/supabaseClient'

// ============================================
// 📖 READ (조회) 함수들
// ============================================

/**
 * 모든 회원권 조회
 */
export const getAllMemberships = async () => {
  const { data, error } = await supabase
    .from('memberships')
    .select('*')
    .order('id', { ascending: true })
  
  if (error) {
    console.error('데이터 조회 실패:', error)
    throw error
  }
  
  return data
}

/**
 * 카테고리별 회원권 조회
 * @param {string} category - 'golf', 'condo', 'fitness'
 */
export const getMembershipsByCategory = async (category) => {
  const { data, error } = await supabase
    .from('memberships')
    .select('*')
    .eq('category', category)
    .order('id', { ascending: true })
  
  if (error) {
    console.error('카테고리별 조회 실패:', error)
    throw error
  }
  
  return data
}

/**
 * ID로 특정 회원권 조회
 * @param {number} id - 회원권 ID
 */
export const getMembershipById = async (id) => {
  const { data, error } = await supabase
    .from('memberships')
    .select('*')
    .eq('id', id)
    .single()
  
  if (error) {
    console.error('ID로 조회 실패:', error)
    throw error
  }
  
  return data
}

/**
 * 활성화된 회원권만 조회
 */
export const getActiveMemberships = async () => {
  const { data, error } = await supabase
    .from('memberships')
    .select('*')
    .eq('active_flag', true)
    .order('id', { ascending: true })
  
  if (error) {
    console.error('활성 회원권 조회 실패:', error)
    throw error
  }
  
  return data
}

/**
 * 메인 페이지에 노출할 회원권 조회 (display_flag = true)
 */
export const getDisplayMemberships = async () => {
  const { data, error } = await supabase
    .from('memberships')
    .select('*')
    .eq('display_flag', true)
    .order('rank', { ascending: true, nullsLast: true })
  
  if (error) {
    console.error('노출 회원권 조회 실패:', error)
    throw error
  }
  
  return data
}

/**
 * 카테고리별 랭킹 회원권 조회 (rank 1~5)
 * @param {string} category - 'golf', 'condo', 'fitness'
 */
export const getRankedMembershipsByCategory = async (category) => {
  const { data, error } = await supabase
    .from('memberships')
    .select('*')
    .eq('category', category)
    .not('rank', 'is', null)
    .order('rank', { ascending: true })
    .limit(5)
  
  if (error) {
    console.error('랭킹 조회 실패:', error)
    throw error
  }
  
  return data
}

// ============================================
// ✏️ UPDATE (수정) 함수들
// ============================================

/**
 * 회원권 정보 업데이트 (범용)
 * @param {number} id - 회원권 ID
 * @param {Object} updates - 업데이트할 필드들
 */
export const updateMembership = async (id, updates) => {
  const { data, error } = await supabase
    .from('memberships')
    .update({
      ...updates,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select()
  
  if (error) {
    console.error('업데이트 실패:', error)
    throw error
  }
  
  return data
}

/**
 * 가격 업데이트
 * @param {number} id - 회원권 ID
 * @param {number} newPrice - 새 가격 (만원 단위)
 */
export const updatePrice = async (id, newPrice) => {
  return updateMembership(id, {
    current_price: newPrice
  })
}

/**
 * 트렌드 업데이트
 * @param {number} id - 회원권 ID
 * @param {string} trend - 'up', 'down', 'stable'
 */
export const updateTrend = async (id, trend) => {
  return updateMembership(id, { trend })
}

/**
 * 활성화 상태 토글
 * @param {number} id - 회원권 ID
 * @param {boolean} activeFlag - true/false
 */
export const toggleActive = async (id, activeFlag) => {
  return updateMembership(id, { active_flag: activeFlag })
}

/**
 * 메인 노출 상태 토글
 * @param {number} id - 회원권 ID
 * @param {boolean} displayFlag - true/false
 */
export const toggleDisplay = async (id, displayFlag) => {
  return updateMembership(id, { display_flag: displayFlag })
}

/**
 * 랭킹 설정 (1~5)
 * @param {number} id - 회원권 ID
 * @param {number|null} rank - 1~5 또는 null
 */
export const setRank = async (id, rank) => {
  return updateMembership(id, { rank })
}

// ============================================
// ➕ CREATE (추가) 함수들
// ============================================

/**
 * 새 회원권 추가
 * @param {Object} membershipData - 회원권 데이터
 */
export const addMembership = async (membershipData) => {
  const { data, error } = await supabase
    .from('memberships')
    .insert([membershipData])
    .select()
  
  if (error) {
    console.error('추가 실패:', error)
    throw error
  }
  
  return data
}

/**
 * 가격 히스토리 추가
 * @param {Object} priceData - { c_id, record_date, price }
 */
export const addPriceHistory = async (priceData) => {
  const { data, error } = await supabase
    .from('price_history')
    .insert([{
      c_id: priceData.c_id,
      date: priceData.record_date || new Date().toISOString().split('T')[0],
      price: priceData.price
    }])
    .select()
  
  if (error) {
    console.error('가격 히스토리 추가 실패:', error)
    throw error
  }
  
  return data
}

/**
 * 급매 정보 추가
 * @param {Object} urgentData - { c_id, original_price?, urgent_price?, status?, display_flag? }
 */
export const addUrgentSale = async (urgentData) => {
  const { data, error } = await supabase
    .from('urgent_sales')
    .insert([urgentData])
    .select()
  
  if (error) {
    console.error('급매 추가 실패:', error)
    throw error
  }
  
  return data
}

/**
 * 분양 정보 추가
 * @param {Object} presaleData - { c_id, original_price?, presale_price?, status?, display_flag? }
 */
export const addPresale = async (presaleData) => {
  const { data, error } = await supabase
    .from('presales')
    .insert([presaleData])
    .select()
  
  if (error) {
    console.error('분양 추가 실패:', error)
    throw error
  }
  
  return data
}

// ============================================
// 🗑️ DELETE (삭제) 함수들
// ============================================

/**
 * 회원권 삭제
 * @param {number} id - 회원권 ID
 */
export const deleteMembership = async (id) => {
  const { data, error } = await supabase
    .from('memberships')
    .delete()
    .eq('id', id)
  
  if (error) {
    console.error('삭제 실패:', error)
    throw error
  }
  
  return data
}

// ============================================
// 📊 통계 및 분석 함수들
// ============================================

/**
 * 카테고리별 통계
 */
export const getCategoryStats = async () => {
  const { data, error } = await supabase
    .from('memberships')
    .select('category, current_price')
  
  if (error) {
    console.error('통계 조회 실패:', error)
    throw error
  }
  
  // 카테고리별 집계
  const stats = data.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = {
        count: 0,
        totalPrice: 0,
        avgPrice: 0
      }
    }
    acc[item.category].count++
    acc[item.category].totalPrice += item.current_price
    return acc
  }, {})
  
  // 평균 계산
  Object.keys(stats).forEach(category => {
    stats[category].avgPrice = Math.round(
      stats[category].totalPrice / stats[category].count
    )
  })
  
  return stats
}

/**
 * 검색 (상품명 또는 회원권명)
 * @param {string} searchTerm - 검색어
 */
export const searchMemberships = async (searchTerm) => {
  const { data, error } = await supabase
    .from('memberships')
    .select('*')
    .or(`product_name.ilike.%${searchTerm}%,membership_name.ilike.%${searchTerm}%`)
    .order('id', { ascending: true })
  
  if (error) {
    console.error('검색 실패:', error)
    throw error
  }
  
  return data
}

// ============================================
// 🏷️ PRESALES (분양) 조회 함수들
// ============================================

/**
 * 모든 분양 정보 조회 (memberships JOIN)
 */
export const getAllPresales = async () => {
  const { data, error } = await supabase
    .from('presales')
    .select(`
      *,
      memberships (
        id,
        category,
        product_name,
        membership_name,
        location,
        current_price
      )
    `)
    .order('id', { ascending: true })
  
  if (error) {
    console.error('분양 조회 실패:', error)
    throw error
  }
  
  return data
}

/**
 * 노출 중인 분양 정보 조회 (display_flag = true)
 */
export const getDisplayPresales = async () => {
  const { data, error } = await supabase
    .from('presales')
    .select(`
      *,
      memberships (
        id,
        category,
        product_name,
        membership_name,
        location,
        current_price
      )
    `)
    .eq('display_flag', true)
    .eq('status', 'available')
    .order('id', { ascending: true })
  
  if (error) {
    console.error('노출 분양 조회 실패:', error)
    throw error
  }
  
  return data
}

/**
 * 카테고리별 분양 정보 조회
 * @param {string} category - 'golf', 'condo', 'fitness'
 */
export const getPresalesByCategory = async (category) => {
  const { data, error } = await supabase
    .from('presales')
    .select(`
      *,
      memberships (
        id,
        category,
        product_name,
        membership_name,
        location,
        current_price
      )
    `)
    .eq('category', category)
    .order('id', { ascending: true })
  
  if (error) {
    console.error('카테고리별 분양 조회 실패:', error)
    throw error
  }
  
  return data
}

/**
 * 분양가능 항목만 조회
 */
export const getAvailablePresales = async () => {
  const { data, error } = await supabase
    .from('presales')
    .select(`
      *,
      memberships (
        id,
        category,
        product_name,
        membership_name,
        location,
        current_price
      )
    `)
    .eq('status', 'available')
    .order('id', { ascending: true })
  
  if (error) {
    console.error('분양가능 항목 조회 실패:', error)
    throw error
  }
  
  return data
}

// ============================================
// 🚨 URGENT SALES (급매) 조회 함수들
// ============================================

/**
 * 모든 급매 정보 조회 (memberships JOIN)
 */
export const getAllUrgentSales = async () => {
  const { data, error } = await supabase
    .from('urgent_sales')
    .select(`
      *,
      memberships (
        id,
        category,
        product_name,
        membership_name,
        location,
        current_price
      )
    `)
    .order('id', { ascending: true })
  
  if (error) {
    console.error('급매 조회 실패:', error)
    throw error
  }
  
  return data
}

/**
 * 노출 중인 급매 정보 조회 (display_flag = true)
 */
export const getDisplayUrgentSales = async () => {
  const { data, error } = await supabase
    .from('urgent_sales')
    .select(`
      *,
      memberships (
        id,
        category,
        product_name,
        membership_name,
        location,
        current_price
      )
    `)
    .eq('display_flag', true)
    .eq('status', 'available')
    .order('id', { ascending: true })
  
  if (error) {
    console.error('노출 급매 조회 실패:', error)
    throw error
  }
  
  return data
}

/**
 * 카테고리별 급매 정보 조회
 * @param {string} category - 'golf', 'condo', 'fitness'
 */
export const getUrgentSalesByCategory = async (category) => {
  const { data, error } = await supabase
    .from('urgent_sales')
    .select(`
      *,
      memberships (
        id,
        category,
        product_name,
        membership_name,
        location,
        current_price
      )
    `)
    .eq('category', category)
    .order('id', { ascending: true })
  
  if (error) {
    console.error('카테고리별 급매 조회 실패:', error)
    throw error
  }
  
  return data
}

/**
 * 거래가능 항목만 조회
 */
export const getAvailableUrgentSales = async () => {
  const { data, error } = await supabase
    .from('urgent_sales')
    .select(`
      *,
      memberships (
        id,
        category,
        product_name,
        membership_name,
        location,
        current_price
      )
    `)
    .eq('status', 'available')
    .order('id', { ascending: true })
  
  if (error) {
    console.error('거래가능 항목 조회 실패:', error)
    throw error
  }
  
  return data
}

// ============================================
// 📊 메인 페이지용 통합 조회 함수들
// ============================================

/**
 * 메인 페이지 시세표 데이터 조회 (카테고리별 TOP 5)
 */
export const getMainPriceTable = async () => {
  const { data, error } = await supabase
    .from('memberships')
    .select('*')
    .eq('display_flag', true)
    .not('rank', 'is', null)
    .order('category', { ascending: true })
    .order('rank', { ascending: true })
  
  if (error) {
    console.error('메인 시세표 조회 실패:', error)
    throw error
  }
  
  // 카테고리별로 그룹화
  const grouped = {
    golf: [],
    condo: [],
    fitness: []
  }
  
  data.forEach(item => {
    if (grouped[item.category]) {
      grouped[item.category].push(item)
    }
  })
  
  return grouped
}

/**
 * 메인 페이지 급매 정보 조회 (display_flag = true인 모든 항목)
 */
export const getMainUrgentSales = async () => {
  const { data, error } = await supabase
    .from('urgent_sales')
    .select(`
      *,
      memberships (
        id,
        category,
        product_name,
        membership_name,
        location,
        current_price
      )
    `)
    .eq('display_flag', true)
    .eq('status', 'available')
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('메인 급매 조회 실패:', error)
    throw error
  }
  
  return data
}

/**
 * 메인 페이지 분양 정보 조회 (display_flag = true인 모든 항목)
 */
export const getMainPresales = async () => {
  const { data, error } = await supabase
    .from('presales')
    .select(`
      *,
      memberships (
        id,
        category,
        product_name,
        membership_name,
        location,
        current_price
      )
    `)
    .eq('display_flag', true)
    .eq('status', 'available')
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('메인 분양 조회 실패:', error)
    throw error
  }
  
  return data
}

// ============================================
// 📈 PRICE HISTORY (가격 히스토리) 조회 함수들
// ============================================

/**
 * 특정 회원권의 가격 히스토리 조회
 * @param {number} c_id - 회원권 ID
 * @param {number} days - 조회할 일수 (기본값: 전체)
 */
export const getPriceHistoryById = async (c_id, days = null) => {
  let query = supabase
    .from('price_history')
    .select('*')
    .eq('c_id', c_id)
    .order('date', { ascending: true })
  
  // 기간 필터 (days가 지정된 경우)
  if (days) {
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)
    const startDateStr = startDate.toISOString().split('T')[0]
    query = query.gte('date', startDateStr)
  }
  
  const { data, error } = await query
  
  if (error) {
    console.error('가격 히스토리 조회 실패:', error)
    throw error
  }
  
  return data
}

/**
 * 카테고리별 모든 회원권의 최신 가격 히스토리 조회
 * @param {string} category - 'golf', 'condo', 'fitness'
 * @param {number} limit - 각 회원권당 최근 몇 개의 기록을 가져올지
 */
export const getRecentPriceHistoryByCategory = async (category, limit = 30) => {
  const { data, error } = await supabase
    .from('price_history')
    .select('*')
    .eq('category', category)
    .order('c_id', { ascending: true })
    .order('date', { ascending: false })
  
  if (error) {
    console.error('카테고리별 가격 히스토리 조회 실패:', error)
    throw error
  }
  
  return data
}

