import { useState } from 'react';
import InfoBox from '../../components/common/InfoBox';
import ExerciseBlock from '../../components/common/ExerciseBlock';

const ethicsScenarios = [
  {
    title: '학생 성적 예측 AI',
    scenario: '학교에서 학생들의 출석, 과제, 시험 점수로 "성적이 낮을 학생"을 예측하는 AI를 도입하려 합니다.',
    stakeholders: ['학생', '교사', '학부모', '학교'],
    issues: [
      { category: '개인정보', detail: '학생의 학습 데이터가 동의 없이 수집/분석될 수 있음' },
      { category: '편향', detail: '특정 배경(저소득, 다문화)의 학생이 불공정하게 "위험군"으로 분류될 수 있음' },
      { category: '자기실현적 예언', detail: '"성적 하락 예측" 라벨이 붙으면 교사/학생의 기대가 낮아져 실제로 성적이 하락할 수 있음' },
      { category: '투명성', detail: 'AI가 왜 그렇게 예측했는지 설명할 수 없으면 신뢰하기 어려움' },
    ],
  },
  {
    title: 'SNS 맞춤 광고',
    scenario: 'SNS 회사가 10대 사용자의 게시글, 좋아요, 검색 기록을 분석해 맞춤 광고를 보여줍니다.',
    stakeholders: ['10대 사용자', 'SNS 회사', '광고주', '학부모'],
    issues: [
      { category: '동의', detail: '미성년자가 데이터 수집에 충분히 이해하고 동의했는지 의문' },
      { category: '착취', detail: '감정적으로 취약한 순간(자존감 낮을 때)에 맞춤 광고가 노출될 수 있음' },
      { category: '프라이버시', detail: '개인의 관심사, 성향, 감정 상태가 상업적 목적으로 사용됨' },
      { category: '중독 설계', detail: '데이터 기반으로 사용자를 더 오래 붙잡아두는 알고리즘 설계' },
    ],
  },
  {
    title: '채용 AI 필터링',
    scenario: '기업이 수천 건의 이력서를 AI로 자동 필터링하여 면접 대상자를 선별합니다.',
    stakeholders: ['지원자', '기업', '사회 전체'],
    issues: [
      { category: '편향', detail: '과거 데이터에 남성 합격자가 많았다면 AI가 여성을 불리하게 평가할 수 있음' },
      { category: '투명성', detail: '불합격 사유를 AI가 설명할 수 없으면 지원자는 이의를 제기할 수 없음' },
      { category: '공정성', detail: '출신 학교, 나이, 주소 등 능력과 무관한 요소가 영향을 줄 수 있음' },
      { category: '책임', detail: 'AI의 잘못된 판단에 대해 누가 책임지는가?' },
    ],
  },
];

const principleCards = [
  { emoji: '🔒', title: '개인정보 보호', desc: '데이터 수집 전 동의를 받고, 꼭 필요한 정보만 수집한다', example: '설문조사 시 개인 식별 불가능하게 익명화' },
  { emoji: '⚖️', title: '공정성', desc: '특정 집단에 불리하지 않도록 편향을 확인하고 제거한다', example: '인종, 성별, 나이에 따른 차별 없는 분석' },
  { emoji: '🔍', title: '투명성', desc: '분석 방법과 한계를 솔직하게 공개한다', example: '"이 결과는 200명 표본이므로 일반화에 주의"' },
  { emoji: '📢', title: '정직한 보고', desc: '원하는 결론에 맞게 데이터를 왜곡하지 않는다', example: '불리한 결과도 숨기지 않고 보고' },
  { emoji: '🤝', title: '사회적 책임', desc: '분석 결과가 사회에 미칠 영향을 고려한다', example: '차별을 강화하는 분석 결과의 활용 방지' },
];

const realCases = [
  { title: 'Amazon 채용 AI (2018)', desc: 'Amazon이 개발한 채용 AI가 과거 데이터 학습 결과, 여성을 체계적으로 불리하게 평가했음이 밝혀져 폐기', principle: '공정성' },
  { title: 'Cambridge Analytica (2018)', desc: 'Facebook 사용자 8,700만 명의 데이터가 동의 없이 정치 캠페인에 활용된 사건', principle: '개인정보 보호' },
  { title: 'COMPAS 재범 예측 (2016)', desc: '미국 법원에서 사용한 재범 예측 AI가 흑인에게 불공정하게 높은 재범 위험을 부여', principle: '공정성, 투명성' },
  { title: '코로나 접촉추적 앱 (2020)', desc: '감염병 예방을 위한 위치 추적이 프라이버시 침해 논란으로 이어짐', principle: '개인정보 보호, 사회적 책임' },
];

export default function Lesson7_3() {
  return (
    <div className="space-y-6 text-slate-700 leading-relaxed">
      <p className="text-lg">
        데이터를 분석하는 능력만큼 중요한 것이 있습니다.
        바로 <strong>"이 데이터를 이렇게 써도 되는가?"</strong>라는 질문을 하는 것입니다.
        데이터 윤리는 데이터 리터러시의 핵심 축입니다.
      </p>

      <h2 className="text-xl font-bold text-slate-800 mt-8">데이터 윤리의 5대 원칙</h2>
      <div className="space-y-3 my-6">
        {principleCards.map((card) => (
          <div key={card.title} className="flex gap-3 p-4 bg-white rounded-xl border border-slate-200">
            <div className="w-10 h-10 rounded-full bg-warm-100 flex items-center justify-center text-lg shrink-0">
              {card.emoji}
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-800">{card.title}</h4>
              <p className="text-sm text-slate-600">{card.desc}</p>
              <p className="text-xs text-slate-400 mt-1 italic">예: {card.example}</p>
            </div>
          </div>
        ))}
      </div>

      <InfoBox type="warning">
        <strong>"데이터로 할 수 있는 것"과 "해도 되는 것"은 다릅니다.</strong>
        <br />기술적으로 가능하다고 해서 윤리적으로 올바른 것은 아닙니다.
        항상 "누가 영향을 받는가?"를 먼저 생각하세요.
      </InfoBox>

      <h2 className="text-xl font-bold text-slate-800 mt-10">실제 사례로 보는 데이터 윤리</h2>
      <div className="grid sm:grid-cols-2 gap-3 my-6">
        {realCases.map((c, i) => (
          <div key={i} className="p-4 bg-white rounded-xl border border-slate-200">
            <h4 className="font-bold text-sm text-slate-800 mb-1">{c.title}</h4>
            <p className="text-xs text-slate-600 mb-2">{c.desc}</p>
            <span className="px-2 py-0.5 bg-warm-100 text-warm-700 text-xs rounded-full">
              관련 원칙: {c.principle}
            </span>
          </div>
        ))}
      </div>

      <ExerciseBlock title="실습: 데이터 윤리 시나리오 분석">
        <p className="text-sm text-slate-500 mb-4">
          각 시나리오를 읽고, 어떤 윤리적 문제가 있는지 생각한 후 답을 확인하세요.
        </p>
        <EthicsScenarioExplorer scenarios={ethicsScenarios} />
      </ExerciseBlock>

      <ExerciseBlock title="실습: 윤리 체크리스트">
        <EthicsChecklist />
      </ExerciseBlock>

      <InfoBox type="think">
        데이터 윤리에는 정답이 없는 경우가 많습니다.
        <br />"효율성 vs 프라이버시", "안전 vs 자유"처럼 가치가 충돌하는 상황에서
        <strong> 균형점을 찾는 능력</strong>이 중요합니다.
        <br />핵심은 항상 <strong>"영향받는 사람의 입장"</strong>에서 생각하는 것입니다.
      </InfoBox>

      <div className="mt-10 p-6 bg-slate-50 rounded-xl">
        <h3 className="font-bold text-slate-800 mb-2">이번 레슨에서 배운 것</h3>
        <ul className="text-sm space-y-1 text-slate-600">
          <li>✓ 데이터 윤리의 5대 원칙</li>
          <li>✓ 실제 사례: Amazon AI, Cambridge Analytica, COMPAS 등</li>
          <li>✓ 시나리오 기반 윤리적 문제 분석</li>
          <li>✓ 데이터 프로젝트 윤리 체크리스트</li>
        </ul>
      </div>
    </div>
  );
}

function EthicsScenarioExplorer({ scenarios }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [revealed, setRevealed] = useState({});
  const scenario = scenarios[activeIdx];

  return (
    <div className="space-y-3">
      <div className="flex gap-2 flex-wrap">
        {scenarios.map((s, i) => (
          <button key={i} onClick={() => setActiveIdx(i)}
            className={`px-3 py-1.5 rounded-lg text-xs cursor-pointer transition-colors ${i === activeIdx ? 'bg-primary-500 text-white' : 'bg-slate-100 hover:bg-primary-100 text-slate-600'}`}>
            {s.title}
          </button>
        ))}
      </div>

      <div className="p-4 bg-white rounded-xl border border-slate-200">
        <h4 className="font-bold text-slate-800 mb-2">{scenario.title}</h4>
        <p className="text-sm text-slate-600 mb-3">{scenario.scenario}</p>

        <div className="mb-3">
          <span className="text-xs font-bold text-slate-500">영향받는 이해관계자:</span>
          <div className="flex gap-1.5 mt-1">
            {scenario.stakeholders.map((s) => (
              <span key={s} className="px-2 py-0.5 bg-primary-50 text-primary-700 text-xs rounded-full">{s}</span>
            ))}
          </div>
        </div>

        {!revealed[activeIdx] ? (
          <button onClick={() => setRevealed((p) => ({ ...p, [activeIdx]: true }))}
            className="px-4 py-2 bg-warm-100 hover:bg-warm-200 text-warm-700 text-sm rounded-lg cursor-pointer">
            윤리적 문제점 확인하기
          </button>
        ) : (
          <div className="space-y-2 mt-2">
            {scenario.issues.map((issue, i) => (
              <div key={i} className="flex gap-2 p-2 bg-warm-50 rounded-lg">
                <span className="px-2 py-0.5 bg-warm-200 text-warm-800 text-xs rounded-full shrink-0 h-fit">{issue.category}</span>
                <p className="text-sm text-slate-600">{issue.detail}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function EthicsChecklist() {
  const items = [
    { q: '데이터 수집 전에 대상자의 동의를 받았는가?', category: '개인정보' },
    { q: '꼭 필요한 정보만 수집하고 있는가?', category: '개인정보' },
    { q: '개인을 식별할 수 있는 정보가 포함되어 있지 않은가?', category: '개인정보' },
    { q: '특정 집단에 불리한 결과가 나오지 않는가?', category: '공정성' },
    { q: '분석 방법과 한계를 투명하게 밝히고 있는가?', category: '투명성' },
    { q: '결론에 맞게 데이터를 선택적으로 사용하지 않았는가?', category: '정직성' },
    { q: '분석 결과가 누군가에게 피해를 줄 가능성은 없는가?', category: '사회적 책임' },
    { q: '결과를 공유할 때 오해의 소지가 없는가?', category: '투명성' },
  ];

  const [checked, setChecked] = useState({});
  const checkedCount = Object.values(checked).filter(Boolean).length;

  return (
    <div className="space-y-3">
      <p className="text-sm text-slate-500">데이터 프로젝트를 시작하기 전 확인해야 할 항목입니다. 체크해보세요.</p>
      <div className="space-y-2">
        {items.map((item, i) => (
          <label key={i} className="flex items-start gap-2 p-2 bg-white rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-50">
            <input type="checkbox" checked={!!checked[i]} onChange={() => setChecked((p) => ({ ...p, [i]: !p[i] }))} className="w-4 h-4 mt-0.5 rounded" />
            <div>
              <span className="text-sm text-slate-700">{item.q}</span>
              <span className="ml-2 px-1.5 py-0.5 bg-slate-100 text-slate-500 text-xs rounded">{item.category}</span>
            </div>
          </label>
        ))}
      </div>
      <div className={`p-3 rounded-lg text-sm text-center font-medium ${checkedCount === items.length ? 'bg-accent-100 text-accent-800' : checkedCount >= 5 ? 'bg-warm-100 text-warm-800' : 'bg-slate-100 text-slate-500'}`}>
        {checkedCount === items.length ? '✅ 모든 항목을 확인했습니다! 윤리적으로 준비된 프로젝트입니다.' :
          checkedCount >= 5 ? `⚠️ ${checkedCount}/${items.length}개 확인. 나머지 항목도 검토해보세요.` :
            `${checkedCount}/${items.length}개 확인됨`}
      </div>
    </div>
  );
}
