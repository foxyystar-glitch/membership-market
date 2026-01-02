import React, { useEffect, useState } from 'react'
import { 
  getAllMemberships,
  getMembershipsByCategory,
  updatePrice,
  updateTrend,
  toggleDisplay,
  setRank,
  addMembership,
  searchMemberships
} from '../services/membershipService'

/**
 * Supabase 연동 예제 컴포넌트
 * 
 * 이 컴포넌트는 membershipService의 사용법을 보여줍니다.
 * App.jsx에서 import하여 사용할 수 있습니다.
 */
function MembershipManager() {
  const [memberships, setMemberships] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [category, setCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  // 초기 데이터 로드
  useEffect(() => {
    loadMemberships()
  }, [category])

  // 데이터 로드 함수
  const loadMemberships = async () => {
    setLoading(true)
    setError(null)
    
    try {
      let data
      if (category === 'all') {
        data = await getAllMemberships()
      } else {
        data = await getMembershipsByCategory(category)
      }
      setMemberships(data)
    } catch (err) {
      console.error('로드 실패:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // 검색
  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      loadMemberships()
      return
    }

    setLoading(true)
    try {
      const data = await searchMemberships(searchTerm)
      setMemberships(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // 가격 업데이트
  const handleUpdatePrice = async (id, currentPrice) => {
    const newPrice = prompt(`새 가격 입력 (현재: ${currentPrice}만원)`, currentPrice)
    if (!newPrice) return

    try {
      await updatePrice(id, parseInt(newPrice))
      alert('가격이 업데이트되었습니다!')
      loadMemberships()
    } catch (err) {
      alert('실패: ' + err.message)
    }
  }

  // 트렌드 변경
  const handleChangeTrend = async (id, currentTrend) => {
    const trends = ['up', 'down', 'stable']
    const newTrend = prompt(
      `트렌드 선택 (현재: ${currentTrend})\nup, down, stable 중 입력:`,
      currentTrend
    )
    
    if (!newTrend || !trends.includes(newTrend)) return

    try {
      await updateTrend(id, newTrend)
      alert('트렌드가 변경되었습니다!')
      loadMemberships()
    } catch (err) {
      alert('실패: ' + err.message)
    }
  }

  // 메인 노출 토글
  const handleToggleDisplay = async (id, currentDisplay) => {
    try {
      await toggleDisplay(id, !currentDisplay)
      alert(`메인 노출이 ${!currentDisplay ? '활성화' : '비활성화'}되었습니다!`)
      loadMemberships()
    } catch (err) {
      alert('실패: ' + err.message)
    }
  }

  // 랭킹 설정
  const handleSetRank = async (id, currentRank) => {
    const newRank = prompt(
      `랭킹 설정 (1-5, 또는 null)\n현재: ${currentRank || '없음'}`,
      currentRank || ''
    )
    
    if (newRank === null) return

    const rank = newRank === '' ? null : parseInt(newRank)
    if (rank !== null && (rank < 1 || rank > 5)) {
      alert('1-5 사이의 숫자를 입력하세요')
      return
    }

    try {
      await setRank(id, rank)
      alert('랭킹이 설정되었습니다!')
      loadMemberships()
    } catch (err) {
      alert('실패: ' + err.message)
    }
  }

  // 새 회원권 추가
  const handleAddMembership = async () => {
    const productName = prompt('상품명:')
    if (!productName) return

    const membershipName = prompt('회원권명:')
    if (!membershipName) return

    const location = prompt('지역:')
    if (!location) return

    const selectedCategory = prompt('카테고리 (golf/condo/fitness):', 'golf')
    if (!['golf', 'condo', 'fitness'].includes(selectedCategory)) {
      alert('올바른 카테고리를 입력하세요')
      return
    }

    try {
      await addMembership({
        category: selectedCategory,
        product_name: productName,
        membership_name: membershipName,
        location: location,
        current_price: 0,
        trend: 'stable'
      })
      alert('회원권이 추가되었습니다!')
      loadMemberships()
    } catch (err) {
      alert('실패: ' + err.message)
    }
  }

  // 트렌드 아이콘
  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return '📈'
      case 'down': return '📉'
      default: return '➡️'
    }
  }

  // 로딩 상태
  if (loading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <p>로딩 중...</p>
      </div>
    )
  }

  // 에러 상태
  if (error) {
    return (
      <div style={{ padding: '20px', color: 'red' }}>
        <h2>❌ 오류 발생</h2>
        <p>{error}</p>
        <button onClick={loadMemberships}>다시 시도</button>
      </div>
    )
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>🏌️ 회원권 관리 시스템</h1>
      <p>총 {memberships.length}개의 회원권</p>

      {/* 컨트롤 */}
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <button onClick={() => setCategory('all')}>
          전체 {category === 'all' && '✓'}
        </button>
        <button onClick={() => setCategory('golf')}>
          골프 {category === 'golf' && '✓'}
        </button>
        <button onClick={() => setCategory('condo')}>
          콘도 {category === 'condo' && '✓'}
        </button>
        <button onClick={() => setCategory('fitness')}>
          피트니스 {category === 'fitness' && '✓'}
        </button>
        
        <button onClick={handleAddMembership} style={{ marginLeft: 'auto', background: '#4CAF50', color: 'white' }}>
          ➕ 새 회원권 추가
        </button>
      </div>

      {/* 검색 */}
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <input
          type="text"
          placeholder="상품명 또는 회원권명 검색..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          style={{ flex: 1, padding: '8px' }}
        />
        <button onClick={handleSearch}>🔍 검색</button>
        <button onClick={() => { setSearchTerm(''); loadMemberships(); }}>
          ❌ 초기화
        </button>
      </div>

      {/* 회원권 목록 */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
          <thead>
            <tr style={{ background: '#f0f0f0' }}>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>ID</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>카테고리</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>상품명</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>회원권명</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>지역</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>가격</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>트렌드</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>랭킹</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>노출</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>작업</th>
            </tr>
          </thead>
          <tbody>
            {memberships.map((m) => (
              <tr key={m.id} style={{ background: m.display_flag ? '#ffffcc' : 'white' }}>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>{m.id}</td>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>{m.category}</td>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>{m.product_name}</td>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>{m.membership_name}</td>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>{m.location}</td>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                  {m.current_price.toLocaleString()}만원
                </td>
                <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center' }}>
                  {getTrendIcon(m.trend)}
                </td>
                <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center' }}>
                  {m.rank || '-'}
                </td>
                <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center' }}>
                  {m.display_flag ? '✅' : '❌'}
                </td>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                  <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                    <button 
                      onClick={() => handleUpdatePrice(m.id, m.current_price)}
                      style={{ fontSize: '11px', padding: '4px 8px' }}
                    >
                      💰
                    </button>
                    <button 
                      onClick={() => handleChangeTrend(m.id, m.trend)}
                      style={{ fontSize: '11px', padding: '4px 8px' }}
                    >
                      📊
                    </button>
                    <button 
                      onClick={() => handleSetRank(m.id, m.rank)}
                      style={{ fontSize: '11px', padding: '4px 8px' }}
                    >
                      🏆
                    </button>
                    <button 
                      onClick={() => handleToggleDisplay(m.id, m.display_flag)}
                      style={{ fontSize: '11px', padding: '4px 8px' }}
                    >
                      👁️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {memberships.length === 0 && (
        <p style={{ textAlign: 'center', padding: '40px', color: '#999' }}>
          데이터가 없습니다.
        </p>
      )}
    </div>
  )
}

export default MembershipManager

