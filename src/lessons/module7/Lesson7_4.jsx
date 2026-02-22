import { useState } from 'react';
import InfoBox from '../../components/common/InfoBox';
import ExerciseBlock from '../../components/common/ExerciseBlock';

const storytellingSteps = [
  { num: 1, emoji: '🎯', title: '핵심 메시지 정하기', desc: '한 문장으로 요약할 수 있는 핵심 발견', example: '"수면 시간이 긴 학생일수록 성적 만족도가 높다"' },
  { num: 2, emoji: '🧑‍🤝‍🧑', title: '청중 파악하기', desc: '누구에게 전달하는가?', example: '교사에게? 학생에게? 학부모에게? → 전문 용어 수준 결정' },
  { num: 3, emoji: '📊', title: '근거 차트 선택', desc: '메시지를 가장 잘 보여주는 시각화', example: '추세 → 꺾은선, 비교 → 막대, 관계 → 산점도' },
  { num: 4, emoji: '📖', title: '내러티브 구성', desc: '문제 → 발견 → 의미 → 제안', example: '"왜 궁금했나 → 무엇을 발견했나 → 이것이 의미하는 바 → 다음 행동"' },
  { num: 5, emoji: '⚠️', title: '한계 명시', desc: '분석의 제한점을 솔직하게 밝히기', example: '"200명 표본이라 일반화에 주의", "상관관계이지 인과관계가 아님"' },
];

const goodBadExamples = [
  {
    topic: '학생 수면과 성적의 관계',
    bad: {
      title: '수면과 성적',
      content: '상관계수 r=0.35, p<0.01. 수면시간 변수의 평균은 6.8시간, 표준편차 1.2. 성적만족도 평균 3.2, 표준편차 0.9. 회귀식: y = 0.26x + 1.43.',
      problems: ['수치만 나열', '해석 없음', '누구를 위한 보고인지 불분명', '"그래서 뭐?"라는 질문에 답이 없음'],
    },
    good: {
      title: '잠을 더 자는 학생이 성적에 만족할까?',
      content: '200명 학생을 조사한 결과, 수면 시간이 긴 학생일수록 성적 만족도가 높은 경향이 발견되었습니다(r=0.35).\n\n💡 핵심 발견: 하루 7시간 이상 자는 학생의 79%가 성적에 "만족" 이상으로 응답한 반면, 6시간 미만은 45%만 만족했습니다.\n\n⚠️ 주의: 이 결과는 "잠을 많이 자면 성적이 오른다"는 뜻이 아닙니다. 성적이 좋은 학생이 스트레스가 적어 잠을 잘 자는 것일 수도 있습니다.\n\n📌 제안: 학생들의 수면 환경 개선을 위한 후속 조사를 권합니다.',
      strengths: ['흥미를 끄는 제목', '핵심 수치 + 해석', '인과관계 오해 방지', '다음 행동 제안'],
    },
  },
];

const reportParts = [
  { key: 'title', label: '제목', placeholder: '흥미를 끌 수 있는 질문형 제목 (예: "아침을 먹으면 성적이 오를까?")' },
  { key: 'finding', label: '핵심 발견', placeholder: '가장 중요한 발견 1-2문장' },
  { key: 'evidence', label: '근거', placeholder: '이 발견을 뒷받침하는 데이터/수치' },
  { key: 'meaning', label: '의미/해석', placeholder: '이 결과가 의미하는 바는? (인과관계 주의!)' },
  { key: 'limitation', label: '한계점', placeholder: '이 분석의 제한점은?' },
  { key: 'action', label: '제안/다음 행동', placeholder: '이 결과를 바탕으로 무엇을 할 수 있을까?' },
];

export default function Lesson7_4() {
  return (
    <div className="space-y-6 text-slate-700 leading-relaxed">
      <p className="text-lg">
        훌륭한 분석도 제대로 전달하지 못하면 의미가 없습니다.
        데이터를 <strong>"이야기"로 만들어 전달하는 능력</strong>은
        데이터 리터러시의 마지막 퍼즐입니다.
      </p>

      <h2 className="text-xl font-bold text-slate-800 mt-8">데이터 스토리텔링 5단계</h2>
      <div className="space-y-3 my-6">
        {storytellingSteps.map((step) => (
          <div key={step.num} className="flex gap-3 p-4 bg-white rounded-xl border border-slate-200">
            <div className="w-10 h-10 rounded-full bg-accent-100 flex items-center justify-center text-lg shrink-0">
              {step.emoji}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-accent-500">Step {step.num}</span>
                <h4 className="font-bold text-sm text-slate-800">{step.title}</h4>
              </div>
              <p className="text-sm text-slate-600">{step.desc}</p>
              <p className="text-xs text-slate-400 mt-1 italic">{step.example}</p>
            </div>
          </div>
        ))}
      </div>

      <InfoBox type="key">
        데이터 스토리텔링의 핵심은 <strong>"So What?"</strong>에 답하는 것입니다.
        <br />"상관계수가 0.35이다" → <strong>"그래서 뭐?"</strong> → "수면 시간이 긴 학생이 성적 만족도가 높은 경향이 있다"
        <br />숫자를 넘어 <strong>의미와 행동</strong>으로 연결하세요.
      </InfoBox>

      <h2 className="text-xl font-bold text-slate-800 mt-10">나쁜 보고서 vs 좋은 보고서</h2>
      <GoodBadReport example={goodBadExamples[0]} />

      <ExerciseBlock title="실습 1: 청중에 따라 달라지는 메시지">
        <AudienceAdaptation />
      </ExerciseBlock>

      <ExerciseBlock title="실습 2: 나만의 데이터 보고서 작성">
        <p className="text-sm text-slate-500 mb-4">
          6개 섹션을 채워 미니 데이터 보고서를 완성해보세요.
        </p>
        <ReportBuilder parts={reportParts} />
      </ExerciseBlock>

      <div className="mt-10 p-6 bg-slate-50 rounded-xl">
        <h3 className="font-bold text-slate-800 mb-2">이번 레슨에서 배운 것</h3>
        <ul className="text-sm space-y-1 text-slate-600">
          <li>✓ 데이터 스토리텔링의 5단계</li>
          <li>✓ "So What?" — 숫자를 의미로 변환하는 기술</li>
          <li>✓ 청중에 맞게 메시지를 조절하는 방법</li>
          <li>✓ 구조화된 데이터 보고서 작성 연습</li>
        </ul>
      </div>
    </div>
  );
}

function GoodBadReport({ example }) {
  const [showGood, setShowGood] = useState(false);

  return (
    <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-3">
      <div className="p-4 bg-red-50 rounded-xl border border-red-200">
        <div className="font-bold text-red-700 mb-2">❌ 나쁜 보고서</div>
        <h4 className="font-medium text-sm text-slate-700 mb-2">{example.bad.title}</h4>
        <p className="text-sm text-slate-600 whitespace-pre-line">{example.bad.content}</p>
        <div className="mt-3 space-y-1">
          {example.bad.problems.map((p, i) => (
            <div key={i} className="text-xs text-red-600">⚠️ {p}</div>
          ))}
        </div>
      </div>

      <div className={`p-4 rounded-xl border transition-all ${showGood ? 'bg-green-50 border-green-200' : 'bg-slate-50 border-slate-200'}`}>
        <div className="font-bold text-green-700 mb-2">✅ 좋은 보고서</div>
        {showGood ? (
          <>
            <h4 className="font-medium text-sm text-slate-700 mb-2">{example.good.title}</h4>
            <p className="text-sm text-slate-600 whitespace-pre-line">{example.good.content}</p>
            <div className="mt-3 space-y-1">
              {example.good.strengths.map((s, i) => (
                <div key={i} className="text-xs text-green-600">✅ {s}</div>
              ))}
            </div>
          </>
        ) : (
          <button onClick={() => setShowGood(true)}
            className="w-full py-12 text-center text-slate-400 hover:text-primary-500 cursor-pointer transition-colors">
            클릭하여 좋은 보고서 보기 →
          </button>
        )}
      </div>
    </div>
  );
}

function AudienceAdaptation() {
  const finding = '학생들의 주당 평균 운동일수가 1학년 3.2일, 2학년 2.8일, 3학년 2.1일로 학년이 올라갈수록 감소';
  const audiences = [
    { name: '학생회', emoji: '🧑‍🎓', ideal: '고학년이 될수록 운동할 시간이 줄고 있어요. 점심시간 체육 활동이나 동아리를 통해 운동 기회를 늘릴 방법을 찾아봐요!' },
    { name: '교사', emoji: '👩‍🏫', ideal: '학년별 운동일수 격차(1학년 3.2일 → 3학년 2.1일)가 유의미합니다. 3학년의 체육 시간 확보나 스트레스 관리 프로그램 연계를 고려해주세요.' },
    { name: '학부모', emoji: '👨‍👩‍👧', ideal: '자녀가 고학년이 될수록 운동량이 30% 이상 감소합니다. 주말 가족 운동이나 방과 후 활동 참여를 권장드립니다.' },
  ];

  const [answers, setAnswers] = useState({});
  const [revealed, setRevealed] = useState({});

  return (
    <div className="space-y-3">
      <div className="p-3 bg-primary-50 rounded-lg">
        <span className="text-xs font-bold text-primary-600">분석 결과</span>
        <p className="text-sm text-slate-700 mt-1">{finding}</p>
      </div>
      <p className="text-sm text-slate-500">같은 데이터를 아래 세 청중에게 각각 어떻게 전달하면 좋을까요?</p>

      {audiences.map((aud) => (
        <div key={aud.name} className="p-3 bg-white rounded-xl border border-slate-200">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">{aud.emoji}</span>
            <span className="font-bold text-sm text-slate-800">{aud.name}에게</span>
          </div>
          <textarea
            rows={2}
            placeholder={`${aud.name}에게 전달할 메시지를 작성해보세요...`}
            value={answers[aud.name] || ''}
            onChange={(e) => setAnswers((p) => ({ ...p, [aud.name]: e.target.value }))}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 resize-none"
          />
          {!revealed[aud.name] ? (
            <button onClick={() => setRevealed((p) => ({ ...p, [aud.name]: true }))}
              className="mt-2 px-3 py-1 bg-slate-100 hover:bg-primary-100 text-slate-600 text-xs rounded-lg cursor-pointer">
              예시 답변 보기
            </button>
          ) : (
            <div className="mt-2 p-2 bg-accent-50 rounded-lg text-sm text-accent-800">
              💡 {aud.ideal}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function ReportBuilder({ parts }) {
  const [values, setValues] = useState({});
  const [showPreview, setShowPreview] = useState(false);
  const filledCount = parts.filter((p) => values[p.key]?.trim()).length;

  return (
    <div className="space-y-3">
      {parts.map((part) => (
        <div key={part.key} className="p-3 bg-white rounded-xl border border-slate-200">
          <label className="text-sm font-medium text-slate-700">{part.label}</label>
          {part.key === 'title' ? (
            <input type="text" placeholder={part.placeholder} value={values[part.key] || ''}
              onChange={(e) => { setValues((p) => ({ ...p, [part.key]: e.target.value })); setShowPreview(false); }}
              className="mt-1.5 w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-300" />
          ) : (
            <textarea rows={2} placeholder={part.placeholder} value={values[part.key] || ''}
              onChange={(e) => { setValues((p) => ({ ...p, [part.key]: e.target.value })); setShowPreview(false); }}
              className="mt-1.5 w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 resize-none" />
          )}
        </div>
      ))}

      <button onClick={() => setShowPreview(true)}
        disabled={filledCount < 4}
        className={`px-4 py-2 rounded-lg text-sm cursor-pointer ${filledCount >= 4 ? 'bg-accent-500 hover:bg-accent-600 text-white' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}>
        보고서 미리보기 ({filledCount}/6 작성)
      </button>

      {showPreview && (
        <div className="p-5 bg-white rounded-xl border-2 border-accent-200 shadow-sm">
          {values.title && <h3 className="text-lg font-bold text-slate-800 mb-3">{values.title}</h3>}
          {values.finding && (
            <div className="mb-3">
              <span className="text-xs font-bold text-accent-600">핵심 발견</span>
              <p className="text-sm text-slate-700">{values.finding}</p>
            </div>
          )}
          {values.evidence && (
            <div className="mb-3 p-2 bg-slate-50 rounded-lg">
              <span className="text-xs font-bold text-slate-500">근거</span>
              <p className="text-sm text-slate-600">{values.evidence}</p>
            </div>
          )}
          {values.meaning && (
            <div className="mb-3">
              <span className="text-xs font-bold text-primary-600">의미</span>
              <p className="text-sm text-slate-700">{values.meaning}</p>
            </div>
          )}
          {values.limitation && (
            <div className="mb-3 p-2 bg-warm-50 rounded-lg">
              <span className="text-xs font-bold text-warm-600">⚠️ 한계점</span>
              <p className="text-sm text-slate-600">{values.limitation}</p>
            </div>
          )}
          {values.action && (
            <div className="p-2 bg-accent-50 rounded-lg">
              <span className="text-xs font-bold text-accent-600">📌 제안</span>
              <p className="text-sm text-slate-700">{values.action}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
