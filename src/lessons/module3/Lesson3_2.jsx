import { useState } from 'react';
import InfoBox from '../../components/common/InfoBox';
import ExerciseBlock from '../../components/common/ExerciseBlock';
import RevealAnswer from '../../components/common/RevealAnswer';

const biasScenarios = [
  { scenario: '학교 정문 앞에서 "등교 시간이 너무 이르다"에 대한 설문을 받았다', bias: '선택 편향', explanation: '학교 정문을 지나는 사람은 학생/교사뿐이므로, 학부모나 일반 시민의 의견이 빠짐' },
  { scenario: '성공한 CEO 100명에게 "성공 비결"을 물었더니 대부분 "포기하지 않은 것"이라고 답했다', bias: '생존자 편향', explanation: '실패한 사람도 포기하지 않았을 수 있지만, 그들의 이야기는 들을 수 없음' },
  { scenario: '"스마트폰이 학습에 도움이 된다"는 기사를 본 후, 주변에서 그런 사례만 눈에 들어왔다', bias: '확인 편향', explanation: '자신의 기존 믿음을 확인하는 정보만 선택적으로 인식하는 경향' },
  { scenario: '온라인 건강식품 리뷰가 대부분 긍정적이라 "효과가 좋다"고 판단했다', bias: '선택 편향', explanation: '만족한 사람이 리뷰를 쓸 확률이 높고, 불만족한 사람은 그냥 떠남 (자기선택 편향)' },
  { scenario: '2차 대전 중 귀환한 폭격기의 총탄 자국을 보고, 그 부분을 보강했다', bias: '생존자 편향', explanation: '돌아오지 못한 비행기(격추된 비행기)에 맞은 부위를 보강해야 했음. 귀환 비행기는 그 부위에 맞아도 살아남은 것' },
];

const newsScenarios = [
  { headline: '"아침형 인간이 성공한다" — 유명 CEO 20명 인터뷰 결과', hasBias: true, biasType: '생존자 편향', detail: '야행성이지만 성공한 사람도 많지만 기사에 안 나옴' },
  { headline: '"국민 62%가 OO정책에 찬성" — 전국 2,000명 무작위 전화조사', hasBias: false, biasType: '없음', detail: '무작위 표본 2,000명은 신뢰할 만한 조사 방법' },
  { headline: '"청소년 SNS 사용시간 증가" — 인스타그램 설문 3만 명 응답', hasBias: true, biasType: '선택 편향', detail: 'SNS 사용자에게만 물었으므로 비사용자 의견 누락' },
];

export default function Lesson3_2() {
  return (
    <div className="space-y-6 text-slate-700 leading-relaxed">
      <p className="text-lg">
        데이터에는 보이지 않는 <strong>편향(Bias)</strong>이 숨어 있을 수 있습니다.
        편향된 데이터로 분석하면, 아무리 분석 방법이 좋아도 <strong>잘못된 결론</strong>에 도달합니다.
      </p>

      <h2 className="text-xl font-bold text-slate-800 mt-8">3가지 주요 편향</h2>

      <div className="space-y-4 my-6">
        <BiasCard emoji="🎯" name="선택 편향" subtitle="Selection Bias"
          desc="특정 집단만 데이터에 포함되어 전체를 대표하지 못하는 경우"
          example="학교 앞에서만 설문 → 학생만 응답 / 온라인 조사 → 인터넷 사용자만 응답" />
        <BiasCard emoji="✈️" name="생존자 편향" subtitle="Survivorship Bias"
          desc="살아남은(성공한) 것만 보고 판단하여, 실패/탈락한 경우를 무시하는 경우"
          example="성공한 중퇴자(빌 게이츠, 스티브 잡스)만 보고 '중퇴해도 성공한다' 결론" />
        <BiasCard emoji="🔍" name="확인 편향" subtitle="Confirmation Bias"
          desc="자신의 기존 믿음을 확인하는 정보만 선택적으로 받아들이는 경향"
          example="'A 다이어트 좋다'고 믿으면 효과 본 후기만 눈에 들어옴" />
      </div>

      <InfoBox type="warning">
        <strong>가장 위험한 편향은 "내가 편향되지 않았다"고 생각하는 것입니다.</strong>
        <br />누구나 편향에 빠질 수 있으며, 인식하는 것이 첫걸음입니다.
      </InfoBox>

      <ExerciseBlock title="실습 1: 이것은 어떤 편향일까?">
        <BiasIdentifyQuiz items={biasScenarios} />
      </ExerciseBlock>

      <h2 className="text-xl font-bold text-slate-800 mt-10">2차 대전 비행기 이야기</h2>
      <p>
        2차 세계대전 중, 미군은 귀환한 폭격기의 총탄 자국 위치를 조사했습니다.
        날개와 동체에 총탄 자국이 많았고, 엔진과 조종석에는 적었습니다.
      </p>
      <div className="my-4 p-4 bg-white rounded-xl border border-slate-200">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="p-3 bg-red-50 rounded-lg">
            <div className="font-bold text-red-700 mb-1">❌ 잘못된 판단</div>
            <p className="text-slate-600">총탄 자국이 많은 날개/동체를 보강하자</p>
          </div>
          <div className="p-3 bg-green-50 rounded-lg">
            <div className="font-bold text-green-700 mb-1">✅ 올바른 판단</div>
            <p className="text-slate-600">총탄 자국이 적은 엔진/조종석을 보강하자 (그 부위에 맞은 비행기는 돌아오지 못함)</p>
          </div>
        </div>
      </div>
      <p className="text-sm text-slate-600">
        통계학자 아브라함 발드(Abraham Wald)의 이 분석은 <strong>생존자 편향</strong>의 대표적 사례입니다.
        "보이는 데이터"에만 집중하면 "보이지 않는 데이터"를 놓칩니다.
      </p>

      <ExerciseBlock title="실습 2: 이 데이터에 편향이 있을까?">
        <NewsbiasQuiz items={newsScenarios} />
      </ExerciseBlock>

      <InfoBox type="think">
        완벽히 편향 없는 데이터가 가능할까요?
        <br />현실적으로 모든 편향을 제거하기는 어렵습니다. 중요한 것은:
        <ul className="mt-1 space-y-0.5">
          <li>1. 편향이 <strong>있을 수 있다는 것을 인식</strong>하고</li>
          <li>2. 어떤 편향인지 <strong>식별</strong>하고</li>
          <li>3. 결론에 <strong>영향을 미치는 정도를 판단</strong>하는 것</li>
        </ul>
      </InfoBox>

      <div className="mt-10 p-6 bg-slate-50 rounded-xl">
        <h3 className="font-bold text-slate-800 mb-2">이번 레슨에서 배운 것</h3>
        <ul className="text-sm space-y-1 text-slate-600">
          <li>✓ 선택 편향: 특정 집단만 데이터에 포함</li>
          <li>✓ 생존자 편향: 성공/생존한 경우만 관찰</li>
          <li>✓ 확인 편향: 기존 믿음을 확인하는 정보만 수용</li>
          <li>✓ 편향된 데이터 → 잘못된 결론</li>
        </ul>
      </div>
    </div>
  );
}

function BiasCard({ emoji, name, subtitle, desc, example }) {
  return (
    <div className="p-4 bg-white rounded-xl border border-slate-200">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xl">{emoji}</span>
        <div>
          <span className="font-bold text-slate-800">{name}</span>
          <span className="text-xs text-slate-400 ml-2">{subtitle}</span>
        </div>
      </div>
      <p className="text-sm text-slate-600 mb-1">{desc}</p>
      <p className="text-xs text-slate-400 italic">예: {example}</p>
    </div>
  );
}

function BiasIdentifyQuiz({ items }) {
  const [answers, setAnswers] = useState({});
  const biasTypes = ['선택 편향', '생존자 편향', '확인 편향'];

  return (
    <div className="space-y-3">
      {items.map((item, i) => {
        const answered = answers[i] !== undefined;
        const isCorrect = answers[i] === item.bias;
        return (
          <div key={i} className={`p-3 rounded-xl border ${answered ? (isCorrect ? 'border-accent-300 bg-accent-50' : 'border-red-300 bg-red-50') : 'border-slate-200 bg-white'}`}>
            <p className="text-sm mb-2">{item.scenario}</p>
            <div className="flex flex-wrap gap-1.5">
              {biasTypes.map((bt) => (
                <button key={bt} onClick={() => setAnswers((p) => ({ ...p, [i]: bt }))}
                  disabled={answered}
                  className={`px-3 py-1 rounded-lg text-xs cursor-pointer ${answered && bt === item.bias ? 'bg-accent-500 text-white' : answered && bt === answers[i] ? 'bg-red-400 text-white' : answered ? 'bg-slate-100 text-slate-400' : 'bg-slate-100 hover:bg-primary-100'}`}>
                  {bt}
                </button>
              ))}
            </div>
            {answered && <p className="text-xs text-slate-600 mt-2">{isCorrect ? '✅ ' : '❌ '}{item.explanation}</p>}
          </div>
        );
      })}
    </div>
  );
}

function NewsbiasQuiz({ items }) {
  const [answers, setAnswers] = useState({});
  return (
    <div className="space-y-3">
      {items.map((item, i) => {
        const answered = answers[i] !== undefined;
        const isCorrect = answers[i] === item.hasBias;
        return (
          <div key={i} className={`p-3 rounded-xl border ${answered ? (isCorrect ? 'border-accent-300 bg-accent-50' : 'border-red-300 bg-red-50') : 'border-slate-200 bg-white'}`}>
            <p className="text-sm font-medium mb-2">📰 {item.headline}</p>
            <div className="flex gap-2">
              {[true, false].map((val) => (
                <button key={String(val)} onClick={() => setAnswers((p) => ({ ...p, [i]: val }))}
                  disabled={answered}
                  className={`px-3 py-1 rounded-lg text-xs cursor-pointer ${answered && val === item.hasBias ? 'bg-accent-500 text-white' : answered && val === answers[i] ? 'bg-red-400 text-white' : answered ? 'bg-slate-100 text-slate-400' : 'bg-slate-100 hover:bg-primary-100'}`}>
                  {val ? '⚠️ 편향 있음' : '✅ 괜찮음'}
                </button>
              ))}
            </div>
            {answered && <p className="text-xs text-slate-600 mt-2">{isCorrect ? '✅ ' : '❌ '}{item.biasType}: {item.detail}</p>}
          </div>
        );
      })}
    </div>
  );
}
