import { useState } from 'react';
import InfoBox from '../../components/common/InfoBox';
import ExerciseBlock from '../../components/common/ExerciseBlock';
import RevealAnswer from '../../components/common/RevealAnswer';

const qualityProblems = [
  {
    id: 1,
    title: '체중 측정 데이터',
    data: [
      ['이름', '체중(kg)'],
      ['김철수', '72'],
      ['이영희', ''],
      ['박민수', '68'],
      ['최지은', '-5'],
      ['정수현', '65'],
    ],
    issues: ['이영희: 값이 비어 있음 (결측치)', '최지은: -5kg은 불가능한 값 (이상값)'],
    quality: 'bad',
  },
  {
    id: 2,
    title: '학생 설문 응답',
    data: [
      ['학번', '만족도', '의견'],
      ['001', '5', '좋아요'],
      ['002', '4', '괜찮아요'],
      ['003', '3', '보통'],
      ['004', '4', '좋아요'],
      ['005', '5', '매우 좋아요'],
    ],
    issues: [],
    quality: 'good',
  },
  {
    id: 3,
    title: '기온 기록 데이터',
    data: [
      ['날짜', '기온(°C)'],
      ['2026-01-01', '-3'],
      ['2026-01-02', '-1'],
      ['2026-01-03', ''],
      ['2026-01-04', '2'],
      ['2026-01-03', '0'],
    ],
    issues: ['2026-01-03 날짜가 중복됨 (중복 데이터)', '2026-01-03 첫 번째 행의 기온이 비어 있음 (결측치)'],
    quality: 'bad',
  },
];

const qualityCriteria = [
  { emoji: '✅', label: '완전성', description: '빈 값(결측치)이 없는가?', bad: '빈 칸이 많은 설문 결과' },
  { emoji: '🎯', label: '정확성', description: '값이 정확하고 현실적인가?', bad: '나이가 -5세, 키가 300cm' },
  { emoji: '🔄', label: '일관성', description: '같은 기준으로 기록되었는가?', bad: '날짜: 2026/01/01, 1월 2일, Jan 3' },
  { emoji: '⏰', label: '최신성', description: '충분히 최근 데이터인가?', bad: '2010년 물가로 2026년 분석' },
  { emoji: '🚫', label: '중복 없음', description: '같은 데이터가 반복되지 않는가?', bad: '한 사람이 두 번 기록됨' },
];

export default function Lesson1_3() {
  return (
    <div className="space-y-6 text-slate-700 leading-relaxed">
      <p className="text-lg">
        아무리 많은 데이터가 있어도, <strong>데이터의 품질이 나쁘면 분석 결과도 엉터리</strong>가 됩니다.
        "쓰레기가 들어가면 쓰레기가 나온다(Garbage In, Garbage Out)"라는 유명한 격언이 있을 정도예요.
      </p>

      <InfoBox type="key">
        <strong>GIGO 원칙</strong> — Garbage In, Garbage Out
        <br />아무리 뛰어난 분석 도구(AI 포함)를 써도, 입력 데이터가 엉망이면 결과도 엉망입니다.
        <br />데이터 품질 확인은 모든 분석의 <strong>첫 번째 단계</strong>입니다.
      </InfoBox>

      {/* 데이터 품질 5가지 기준 */}
      <h2 className="text-xl font-bold text-slate-800 mt-8">데이터 품질의 5가지 기준</h2>

      <div className="space-y-3 my-6">
        {qualityCriteria.map((c, i) => (
          <div key={i} className="flex gap-4 p-4 bg-white rounded-xl border border-slate-200">
            <div className="text-2xl">{c.emoji}</div>
            <div className="flex-1">
              <h4 className="font-bold text-slate-800">{c.label}</h4>
              <p className="text-sm text-slate-600">{c.description}</p>
              <p className="text-xs text-red-400 mt-1 italic">나쁜 예: {c.bad}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 실습 1: 데이터 품질 진단 */}
      <ExerciseBlock title="실습: 데이터 품질 진단하기">
        <p className="text-sm text-slate-500 mb-4">
          아래 데이터를 살펴보고, 품질 문제가 있는지 찾아보세요.
        </p>
        <div className="space-y-6">
          {qualityProblems.map((prob) => (
            <DataQualityCard key={prob.id} {...prob} />
          ))}
        </div>
      </ExerciseBlock>

      {/* 데이터 정제 방법 */}
      <h2 className="text-xl font-bold text-slate-800 mt-10">문제가 있는 데이터, 어떻게 하나요?</h2>

      <div className="grid sm:grid-cols-2 gap-4 my-6">
        <FixCard
          emoji="🕳️"
          problem="결측치 (빈 값)"
          solutions={[
            '해당 행 제거하기',
            '평균값이나 중앙값으로 채우기',
            '가장 가까운 값으로 채우기',
          ]}
        />
        <FixCard
          emoji="👾"
          problem="이상값 (비현실적 값)"
          solutions={[
            '명백한 오류면 제거하기',
            '의미 있는 이상값이면 별도 분석',
            '전문가에게 확인하기',
          ]}
        />
        <FixCard
          emoji="📋"
          problem="중복 데이터"
          solutions={[
            '중복 행 찾아서 하나만 남기기',
            '어떤 값이 맞는지 확인 후 통합',
          ]}
        />
        <FixCard
          emoji="🔤"
          problem="일관성 문제"
          solutions={[
            '통일된 형식으로 변환하기',
            '오타나 약어를 표준화하기',
          ]}
        />
      </div>

      <InfoBox type="think">
        결측치가 있는 데이터를 무조건 삭제하면 될까요?
        <br />만약 200명 중 50명의 응답이 비어 있다면, 삭제하면 150명의 데이터만 남습니다.
        <br />비어 있는 응답에 <strong>패턴이 있을 수도</strong> 있어요
        (예: 남학생만 응답을 안 했다면?).
        <br /><strong>무작정 삭제보다는, 왜 비어 있는지 먼저 생각해보는 것이 중요합니다.</strong>
      </InfoBox>

      {/* 마무리 */}
      <div className="mt-10 p-6 bg-slate-50 rounded-xl">
        <h3 className="font-bold text-slate-800 mb-2">이번 레슨에서 배운 것</h3>
        <ul className="text-sm space-y-1 text-slate-600">
          <li>✓ GIGO 원칙: 나쁜 데이터 → 나쁜 결과</li>
          <li>✓ 데이터 품질 5기준: 완전성, 정확성, 일관성, 최신성, 중복 없음</li>
          <li>✓ 데이터 품질 문제를 눈으로 진단하는 방법</li>
          <li>✓ 결측치, 이상값, 중복 등의 처리 방법</li>
        </ul>
      </div>
    </div>
  );
}

// --- 하위 컴포넌트 ---

function DataQualityCard({ title, data, issues, quality }) {
  const [userAnswer, setUserAnswer] = useState(null);

  return (
    <div className="p-4 bg-white rounded-xl border border-slate-200">
      <h4 className="font-semibold text-sm text-slate-800 mb-3">📄 {title}</h4>

      {/* 미니 테이블 */}
      <div className="overflow-x-auto mb-3">
        <table className="text-xs border-collapse w-full">
          <thead>
            <tr>
              {data[0].map((h, i) => (
                <th key={i} className="px-3 py-1.5 bg-slate-50 border border-slate-200 text-left font-medium text-slate-600">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.slice(1).map((row, ri) => (
              <tr key={ri}>
                {row.map((cell, ci) => (
                  <td
                    key={ci}
                    className={`px-3 py-1.5 border border-slate-200 ${
                      cell === '' ? 'bg-red-50' : cell.startsWith('-') && data[0][ci].includes('kg') ? 'bg-yellow-50' : ''
                    }`}
                  >
                    {cell || <span className="text-red-400 italic">비어 있음</span>}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 판단 버튼 */}
      <div className="flex gap-2 mb-2">
        <button
          onClick={() => setUserAnswer('good')}
          disabled={userAnswer !== null}
          className={`px-3 py-1.5 rounded-lg text-sm transition-colors cursor-pointer ${
            userAnswer === 'good' && quality === 'good' ? 'bg-accent-500 text-white' :
            userAnswer === 'good' && quality !== 'good' ? 'bg-red-400 text-white' :
            userAnswer !== null ? 'bg-slate-100 text-slate-400' :
            'bg-slate-100 hover:bg-accent-100 text-slate-700'
          }`}
        >
          문제 없음 ✓
        </button>
        <button
          onClick={() => setUserAnswer('bad')}
          disabled={userAnswer !== null}
          className={`px-3 py-1.5 rounded-lg text-sm transition-colors cursor-pointer ${
            userAnswer === 'bad' && quality === 'bad' ? 'bg-accent-500 text-white' :
            userAnswer === 'bad' && quality !== 'bad' ? 'bg-red-400 text-white' :
            userAnswer !== null ? 'bg-slate-100 text-slate-400' :
            'bg-slate-100 hover:bg-warm-100 text-slate-700'
          }`}
        >
          문제 있음 ⚠️
        </button>
      </div>

      {userAnswer && (
        <div className="text-xs text-slate-600 mt-2">
          {quality === 'good' ? (
            <p>✅ 이 데이터는 품질에 큰 문제가 없습니다.</p>
          ) : (
            <div>
              <p className="font-medium text-red-600 mb-1">발견된 문제:</p>
              <ul className="space-y-0.5">
                {issues.map((issue, i) => (
                  <li key={i}>• {issue}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function FixCard({ emoji, problem, solutions }) {
  return (
    <div className="p-4 bg-white rounded-xl border border-slate-200">
      <div className="text-xl mb-1">{emoji}</div>
      <h4 className="font-bold text-sm text-slate-800 mb-2">{problem}</h4>
      <ul className="text-xs text-slate-600 space-y-1">
        {solutions.map((s, i) => (
          <li key={i}>→ {s}</li>
        ))}
      </ul>
    </div>
  );
}
