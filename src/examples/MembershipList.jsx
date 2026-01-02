import { useState, useEffect } from 'react'
import { getAllMemberships, getMembershipsByCategory } from '../lib/supabase'

/**
 * 회원권 목록 표시 예제
 */
export default function MembershipList() {
  const [memberships, setMemberships] = useState([])
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState('all')

  // 데이터 로드
  useEffect(() => {
    loadMemberships()
  }, [category])

  async function loadMemberships() {
    setLoading(true)

    try {
      let data
      if (category === 'all') {
        data = await getAllMemberships()
      } else {
        data = await getMembershipsByCategory(category)
      }

      setMemberships(data)
    } catch (error) {
      console.error('데이터 로드 실패:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="p-8 text-center">
        <div className="text-xl">로딩 중...</div>
      </div>
    )
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">회원권 목록</h1>

      {/* 카테고리 필터 */}
      <div className="mb-6 flex gap-2">
        <button
          onClick={() => setCategory('all')}
          className={`px-4 py-2 rounded ${
            category === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          전체 ({memberships.length})
        </button>
        <button
          onClick={() => setCategory('golf')}
          className={`px-4 py-2 rounded ${
            category === 'golf' ? 'bg-green-500 text-white' : 'bg-gray-200'
          }`}
        >
          골프
        </button>
        <button
          onClick={() => setCategory('condo')}
          className={`px-4 py-2 rounded ${
            category === 'condo' ? 'bg-purple-500 text-white' : 'bg-gray-200'
          }`}
        >
          콘도
        </button>
        <button
          onClick={() => setCategory('fitness')}
          className={`px-4 py-2 rounded ${
            category === 'fitness' ? 'bg-orange-500 text-white' : 'bg-gray-200'
          }`}
        >
          피트니스
        </button>
      </div>

      {/* 데이터 테이블 */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">ID</th>
              <th className="px-4 py-2 border">카테고리</th>
              <th className="px-4 py-2 border">상품명</th>
              <th className="px-4 py-2 border">회원권명</th>
              <th className="px-4 py-2 border">지역</th>
              <th className="px-4 py-2 border">현재가</th>
              <th className="px-4 py-2 border">추세</th>
            </tr>
          </thead>
          <tbody>
            {memberships.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border text-center">{item.id}</td>
                <td className="px-4 py-2 border">
                  <span className={`px-2 py-1 rounded text-sm ${
                    item.category === 'golf' ? 'bg-green-100' :
                    item.category === 'condo' ? 'bg-purple-100' :
                    'bg-orange-100'
                  }`}>
                    {item.category}
                  </span>
                </td>
                <td className="px-4 py-2 border font-medium">{item.product_name}</td>
                <td className="px-4 py-2 border">{item.membership_name}</td>
                <td className="px-4 py-2 border text-sm text-gray-600">{item.location}</td>
                <td className="px-4 py-2 border text-right">
                  {item.current_price > 0
                    ? `${item.current_price.toLocaleString()}만원`
                    : '-'
                  }
                </td>
                <td className="px-4 py-2 border text-center">
                  {item.trend === 'up' && <span className="text-red-500">▲</span>}
                  {item.trend === 'down' && <span className="text-blue-500">▼</span>}
                  {item.trend === 'stable' && <span className="text-gray-400">-</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {memberships.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          데이터가 없습니다.
        </div>
      )}
    </div>
  )
}
