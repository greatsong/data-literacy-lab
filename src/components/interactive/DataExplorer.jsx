import { useState, useEffect, useMemo } from 'react';

/**
 * 인터랙티브 데이터 테이블 탐색기
 * @param {Object} props
 * @param {string} props.csvUrl - CSV 파일 경로
 * @param {string} props.title - 테이블 제목
 * @param {number} props.pageSize - 페이지당 행 수
 */
export default function DataExplorer({ csvUrl, title = '데이터 탐색기', pageSize = 20 }) {
  const [rawData, setRawData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [sortCol, setSortCol] = useState(null);
  const [sortDir, setSortDir] = useState('asc');
  const [filterText, setFilterText] = useState('');
  const [page, setPage] = useState(0);
  const [selectedCol, setSelectedCol] = useState(null);

  // CSV 파싱
  useEffect(() => {
    fetch(csvUrl)
      .then((r) => r.text())
      .then((text) => {
        const lines = text.trim().split('\n');
        const h = lines[0].split(',').map((s) => s.trim());
        const rows = lines.slice(1).map((line) => {
          const vals = line.split(',').map((s) => s.trim());
          const row = {};
          h.forEach((col, i) => {
            const num = parseFloat(vals[i]);
            row[col] = isNaN(num) ? vals[i] : num;
          });
          return row;
        });
        setHeaders(h);
        setRawData(rows);
      });
  }, [csvUrl]);

  // 필터 + 정렬
  const processedData = useMemo(() => {
    let data = [...rawData];

    if (filterText) {
      const lower = filterText.toLowerCase();
      data = data.filter((row) =>
        headers.some((h) => String(row[h]).toLowerCase().includes(lower))
      );
    }

    if (sortCol) {
      data.sort((a, b) => {
        const va = a[sortCol], vb = b[sortCol];
        if (typeof va === 'number' && typeof vb === 'number') {
          return sortDir === 'asc' ? va - vb : vb - va;
        }
        return sortDir === 'asc'
          ? String(va).localeCompare(String(vb))
          : String(vb).localeCompare(String(va));
      });
    }

    return data;
  }, [rawData, filterText, sortCol, sortDir, headers]);

  const totalPages = Math.ceil(processedData.length / pageSize);
  const pageData = processedData.slice(page * pageSize, (page + 1) * pageSize);

  // 열 통계 계산
  const colStats = useMemo(() => {
    if (!selectedCol) return null;
    const vals = rawData.map((r) => r[selectedCol]).filter((v) => typeof v === 'number');
    if (vals.length === 0) {
      // 범주형 빈도
      const freq = {};
      rawData.forEach((r) => {
        const v = String(r[selectedCol]);
        freq[v] = (freq[v] || 0) + 1;
      });
      return { type: 'categorical', freq };
    }
    const sorted = [...vals].sort((a, b) => a - b);
    const sum = vals.reduce((a, b) => a + b, 0);
    const mean = sum / vals.length;
    const median = sorted.length % 2 === 0
      ? (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2
      : sorted[Math.floor(sorted.length / 2)];
    const variance = vals.reduce((s, v) => s + (v - mean) ** 2, 0) / vals.length;
    const std = Math.sqrt(variance);
    return {
      type: 'numeric',
      count: vals.length,
      mean: mean.toFixed(2),
      median: median.toFixed(2),
      std: std.toFixed(2),
      min: sorted[0],
      max: sorted[sorted.length - 1],
    };
  }, [selectedCol, rawData]);

  const handleSort = (col) => {
    if (sortCol === col) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortCol(col);
      setSortDir('asc');
    }
    setPage(0);
  };

  if (rawData.length === 0) return <div className="text-sm text-slate-400 py-8 text-center">데이터 로딩 중...</div>;

  return (
    <div className="space-y-3">
      {/* 헤더 */}
      <div className="flex items-center justify-between gap-3">
        <h4 className="font-semibold text-sm text-slate-700">{title}</h4>
        <span className="text-xs text-slate-400">{rawData.length}행 × {headers.length}열</span>
      </div>

      {/* 검색 */}
      <input
        type="text"
        value={filterText}
        onChange={(e) => { setFilterText(e.target.value); setPage(0); }}
        placeholder="검색어 입력..."
        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-primary-400"
      />

      {/* 테이블 */}
      <div className="overflow-x-auto rounded-xl border border-slate-200">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50">
              {headers.map((h) => (
                <th
                  key={h}
                  onClick={() => handleSort(h)}
                  className="px-3 py-2 text-left font-medium text-slate-600 cursor-pointer hover:bg-slate-100 whitespace-nowrap select-none"
                >
                  {h}
                  {sortCol === h && (
                    <span className="ml-1 text-primary-500">{sortDir === 'asc' ? '↑' : '↓'}</span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pageData.map((row, ri) => (
              <tr key={ri} className="border-t border-slate-100 hover:bg-primary-50/30">
                {headers.map((h) => (
                  <td key={h} className="px-3 py-1.5 text-slate-700 whitespace-nowrap">
                    {typeof row[h] === 'number' ? row[h].toLocaleString() : row[h]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 text-sm">
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            className="px-2 py-1 rounded hover:bg-slate-100 disabled:opacity-30 cursor-pointer"
          >
            ←
          </button>
          <span className="text-slate-500">
            {page + 1} / {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={page >= totalPages - 1}
            className="px-2 py-1 rounded hover:bg-slate-100 disabled:opacity-30 cursor-pointer"
          >
            →
          </button>
        </div>
      )}

      {/* 열 통계 */}
      <div>
        <p className="text-xs font-semibold text-slate-400 mb-1">열을 클릭하면 통계를 볼 수 있어요</p>
        <div className="flex flex-wrap gap-1.5">
          {headers.map((h) => (
            <button
              key={h}
              onClick={() => setSelectedCol(selectedCol === h ? null : h)}
              className={`px-2 py-1 text-xs rounded-md transition-colors cursor-pointer ${
                selectedCol === h
                  ? 'bg-primary-500 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-primary-100'
              }`}
            >
              {h}
            </button>
          ))}
        </div>

        {colStats && (
          <div className="mt-2 p-3 bg-primary-50 rounded-xl text-xs">
            <div className="font-semibold text-primary-700 mb-1">📊 {selectedCol} 통계</div>
            {colStats.type === 'numeric' ? (
              <div className="grid grid-cols-3 gap-2">
                <StatItem label="개수" value={colStats.count} />
                <StatItem label="평균" value={colStats.mean} />
                <StatItem label="중앙값" value={colStats.median} />
                <StatItem label="표준편차" value={colStats.std} />
                <StatItem label="최솟값" value={colStats.min} />
                <StatItem label="최댓값" value={colStats.max} />
              </div>
            ) : (
              <div className="space-y-1">
                {Object.entries(colStats.freq)
                  .sort(([, a], [, b]) => b - a)
                  .map(([val, count]) => (
                    <div key={val} className="flex items-center gap-2">
                      <span className="text-slate-600 w-16 truncate">{val}</span>
                      <div className="flex-1 h-3 bg-primary-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary-400 rounded-full"
                          style={{ width: `${(count / rawData.length) * 100}%` }}
                        />
                      </div>
                      <span className="text-slate-500 w-8 text-right">{count}</span>
                    </div>
                  ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function StatItem({ label, value }) {
  return (
    <div className="text-center p-1.5 bg-white rounded-lg">
      <div className="text-slate-400">{label}</div>
      <div className="font-semibold text-slate-800">{value}</div>
    </div>
  );
}
