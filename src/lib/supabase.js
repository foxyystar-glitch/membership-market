import { createClient } from '@supabase/supabase-js'

// Supabase 프로젝트 정보
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://wdnaezkkdltbtugrqczh.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

// Supabase 클라이언트 생성
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// ============================================
// 데이터 읽기 함수들
// ============================================

/**
 * 전체 회원권 데이터 조회
 * @returns {Promise<Array>} 회원권 목록
 */
export async function getAllMemberships() {
  const { data, error } = await supabase
    .from('memberships')
    .select('id, category, product_name, membership_name, location, current_price, trend')
    .order('id')

  if (error) {
    console.error('Error fetching memberships:', error)
    return []
  }

  return data
}

/**
 * 카테고리별 회원권 조회
 * @param {string} category - 'golf', 'condo', 'fitness'
 * @returns {Promise<Array>}
 */
export async function getMembershipsByCategory(category) {
  const { data, error } = await supabase
    .from('memberships')
    .select('*')
    .eq('category', category)
    .order('id')

  if (error) {
    console.error(`Error fetching ${category} memberships:`, error)
    return []
  }

  return data
}

/**
 * 특정 회원권 상세 정보 조회
 * @param {number} id - 회원권 ID
 * @returns {Promise<Object|null>}
 */
export async function getMembershipById(id) {
  const { data, error } = await supabase
    .from('memberships')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error(`Error fetching membership ${id}:`, error)
    return null
  }

  return data
}

/**
 * 메인 페이지 노출 회원권 조회 (display_flag = true)
 * @param {string} category - 카테고리 (선택사항)
 * @returns {Promise<Array>}
 */
export async function getDisplayedMemberships(category = null) {
  let query = supabase
    .from('memberships')
    .select('*')
    .eq('display_flag', true)
    .eq('active_flag', true)

  if (category) {
    query = query.eq('category', category)
  }

  const { data, error } = await query
    .order('rank', { nullsLast: true })
    .order('id')

  if (error) {
    console.error('Error fetching displayed memberships:', error)
    return []
  }

  return data
}

/**
 * 랭킹 회원권 조회 (rank 1-5)
 * @param {string} category - 카테고리
 * @returns {Promise<Array>}
 */
export async function getRankedMemberships(category) {
  const { data, error } = await supabase
    .from('memberships')
    .select('*')
    .eq('category', category)
    .not('rank', 'is', null)
    .order('rank')

  if (error) {
    console.error(`Error fetching ranked ${category} memberships:`, error)
    return []
  }

  return data
}

/**
 * 급매 정보 조회
 * @param {string} category - 카테고리 (선택사항)
 * @returns {Promise<Array>}
 */
export async function getUrgentSales(category = null) {
  let query = supabase
    .from('urgent_sales')
    .select(`
      *,
      memberships (
        product_name,
        membership_name,
        location
      )
    `)
    .eq('status', 'available')
    .eq('display_flag', true)

  if (category) {
    query = query.eq('category', category)
  }

  const { data, error } = await query.order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching urgent sales:', error)
    return []
  }

  return data
}

/**
 * 분양 정보 조회
 * @param {string} category - 카테고리 (선택사항)
 * @returns {Promise<Array>}
 */
export async function getPresales(category = null) {
  let query = supabase
    .from('presales')
    .select(`
      *,
      memberships (
        product_name,
        membership_name,
        location
      )
    `)
    .eq('status', 'available')
    .eq('display_flag', true)

  if (category) {
    query = query.eq('category', category)
  }

  const { data, error } = await query.order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching presales:', error)
    return []
  }

  return data
}

/**
 * 가격 히스토리 조회
 * @param {number} c_id - 회원권 ID
 * @param {number} days - 조회할 일수 (기본 30일)
 * @returns {Promise<Array>}
 */
export async function getPriceHistory(c_id, days = 30) {
  const fromDate = new Date()
  fromDate.setDate(fromDate.getDate() - days)

  const { data, error } = await supabase
    .from('price_history')
    .select('date, price')
    .eq('c_id', c_id)
    .gte('date', fromDate.toISOString().split('T')[0])
    .order('date')

  if (error) {
    console.error(`Error fetching price history for ${c_id}:`, error)
    return []
  }

  return data
}

// ============================================
// 데이터 쓰기 함수들 (관리자용)
// ============================================

/**
 * 회원권 추가
 * @param {Object} membership - 회원권 정보
 * @returns {Promise<Object|null>}
 */
export async function addMembership(membership) {
  const { data, error } = await supabase
    .from('memberships')
    .insert([membership])
    .select()
    .single()

  if (error) {
    console.error('Error adding membership:', error)
    return null
  }

  return data
}

/**
 * 회원권 정보 업데이트
 * @param {number} id - 회원권 ID
 * @param {Object} updates - 업데이트할 필드들
 * @returns {Promise<Object|null>}
 */
export async function updateMembership(id, updates) {
  const { data, error } = await supabase
    .from('memberships')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error(`Error updating membership ${id}:`, error)
    return null
  }

  return data
}

/**
 * 회원권 삭제 (실제로는 active_flag를 false로)
 * @param {number} id - 회원권 ID
 * @returns {Promise<boolean>}
 */
export async function deleteMembership(id) {
  const { error } = await supabase
    .from('memberships')
    .update({ active_flag: false })
    .eq('id', id)

  if (error) {
    console.error(`Error deleting membership ${id}:`, error)
    return false
  }

  return true
}

/**
 * 가격 데이터 추가 (자동으로 current_price 업데이트됨)
 * @param {number} c_id - 회원권 ID
 * @param {string} category - 카테고리
 * @param {string} date - 날짜 (YYYY-MM-DD)
 * @param {number} price - 가격
 * @returns {Promise<Object|null>}
 */
export async function addPrice(c_id, category, date, price) {
  const { data, error } = await supabase
    .from('price_history')
    .insert([{ c_id, category, date, price }])
    .select()
    .single()

  if (error) {
    console.error('Error adding price:', error)
    return null
  }

  return data
}

/**
 * 급매 정보 추가
 * @param {Object} urgentSale - 급매 정보
 * @returns {Promise<Object|null>}
 */
export async function addUrgentSale(urgentSale) {
  const { data, error } = await supabase
    .from('urgent_sales')
    .insert([urgentSale])
    .select()
    .single()

  if (error) {
    console.error('Error adding urgent sale:', error)
    return null
  }

  return data
}

/**
 * 분양 정보 추가
 * @param {Object} presale - 분양 정보
 * @returns {Promise<Object|null>}
 */
export async function addPresale(presale) {
  const { data, error } = await supabase
    .from('presales')
    .insert([presale])
    .select()
    .single()

  if (error) {
    console.error('Error adding presale:', error)
    return null
  }

  return data
}

// ============================================
// 실시간 구독 (선택사항)
// ============================================

/**
 * 회원권 데이터 실시간 구독
 * @param {Function} callback - 데이터 변경 시 호출될 콜백
 * @returns {Object} 구독 객체
 */
export function subscribeMemberships(callback) {
  return supabase
    .channel('memberships_changes')
    .on('postgres_changes',
      { event: '*', schema: 'public', table: 'memberships' },
      callback
    )
    .subscribe()
}
