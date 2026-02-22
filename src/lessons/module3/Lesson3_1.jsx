import { useState, useMemo } from 'react';
import InfoBox from '../../components/common/InfoBox';
import ExerciseBlock from '../../components/common/ExerciseBlock';
import RevealAnswer from '../../components/common/RevealAnswer';

export default function Lesson3_1() {
  return (
    <div className="space-y-6 text-slate-700 leading-relaxed">
      <p className="text-lg">
        뉴스에서 "국민 78%가 찬성"이라는 기사를 봤다면, 정말 <strong>모든 국민</strong>에게 물어본 걸까요?
        대부분의 조사는 전체가 아닌 <strong>일부(표본)</strong>만 조사합니다. 이것이 어떤 의미인지 알아봅시다.
      </p>

      <InfoBox type="key">
        <strong>모집단</strong>: 알고 싶은 전체 대상 (예: 전국 고등학생 130만 명)
        <br /><strong>표본</strong>: 실제로 조사한 일부 (예: 1,000명)
        <br />표본으로 모집단의 특성을 <strong>추정</strong>합니다.
      </InfoBox>

      <h2 className="text-xl font-bold text-slate-800 mt-8">왜 전수조사를 하지 않을까?</h2>
      <div className="grid sm:grid-cols-3 gap-3 my-4">
        <ReasonCard emoji="💰" title="비용" desc="130만 명에게 설문하려면 수십억 원이 필요" />
        <ReasonCard emoji="⏰" title="시간" desc="전수조사에 몇 달~몇 년 소요" />
        <ReasonCard emoji="🏗️" title="현실성" desc="모든 대상에게 접근 자체가 불가능한 경우" />
      </div>

      <InfoBox type="note">
        인구주택총조사(인구센서스)는 5년마다 전수조사를 하지만, 비용이 수천억 원에 달합니다.
        일반적인 여론조사는 1,000~3,000명으로 전체를 추정합니다.
      </InfoBox>

      <ExerciseBlock title="실습: 구슬 뽑기 시뮬레이션">
        <p className="text-sm text-slate-500 mb-3">
          주머니에 빨간 구슬 60개, 파란 구슬 40개(총 100개)가 있습니다.
          샘플을 뽑아보며 표본 크기에 따라 추정이 어떻게 달라지는지 관찰하세요.
        </p>
        <MarbleSampler />
      </ExerciseBlock>

      <h2 className="text-xl font-bold text-slate-800 mt-10">표본 크기가 중요한 이유</h2>
      <p>
        위 시뮬레이션에서 경험했듯이, <strong>표본이 작으면 결과가 크게 흔들립니다</strong>.
        하지만 표본이 커질수록 실제 비율(60%)에 점점 가까워지죠.
        이것을 <strong>큰 수의 법칙</strong>이라고 합니다.
      </p>

      <div className="my-6 bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="grid grid-cols-3 text-center text-sm">
          <div className="p-3 border-r border-slate-200">
            <div className="text-2xl mb-1">5개</div>
            <div className="text-slate-500">매우 불안정</div>
            <div className="text-xs text-slate-400">20%~100% 변동</div>
          </div>
          <div className="p-3 border-r border-slate-200">
            <div className="text-2xl mb-1">30개</div>
            <div className="text-slate-500">어느 정도 안정</div>
            <div className="text-xs text-slate-400">±10% 내외</div>
          </div>
          <div className="p-3">
            <div className="text-2xl mb-1">100개</div>
            <div className="text-slate-500">매우 안정</div>
            <div className="text-xs text-slate-400">±5% 내외</div>
          </div>
        </div>
      </div>

      <ExerciseBlock title="실습: 이 조사 결과를 믿을 수 있을까?">
        <SurveyTrustQuiz />
      </ExerciseBlock>

      <InfoBox type="think">
        표본이 크면 항상 정확할까요? 아닙니다!
        표본의 <strong>크기</strong>도 중요하지만, <strong>뽑는 방식</strong>(무작위인지, 편향되었는지)도
        똑같이 중요합니다. 다음 레슨에서 편향에 대해 배워봅시다.
      </InfoBox>

      <div className="mt-10 p-6 bg-slate-50 rounded-xl">
        <h3 className="font-bold text-slate-800 mb-2">이번 레슨에서 배운 것</h3>
        <ul className="text-sm space-y-1 text-slate-600">
          <li>✓ 모집단과 표본의 차이</li>
          <li>✓ 전수조사가 어려운 이유 (비용, 시간, 현실성)</li>
          <li>✓ 표본 크기가 클수록 추정이 안정됨 (큰 수의 법칙)</li>
          <li>✓ 표본 크기뿐 아니라 뽑는 방식도 중요</li>
        </ul>
      </div>
    </div>
  );
}

function ReasonCard({ emoji, title, desc }) {
  return (
    <div className="p-4 bg-white rounded-xl border border-slate-200 text-center">
      <div className="text-2xl mb-1">{emoji}</div>
      <h4 className="font-bold text-sm text-slate-800">{title}</h4>
      <p className="text-xs text-slate-500 mt-1">{desc}</p>
    </div>
  );
}

function MarbleSampler() {
  const [sampleSize, setSampleSize] = useState(10);
  const [samples, setSamples] = useState([]);

  const population = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 60; i++) arr.push('red');
    for (let i = 0; i < 40; i++) arr.push('blue');
    return arr;
  }, []);

  const drawSample = () => {
    const shuffled = [...population].sort(() => Math.random() - 0.5);
    const sample = shuffled.slice(0, sampleSize);
    const redCount = sample.filter((c) => c === 'red').length;
    const ratio = ((redCount / sampleSize) * 100).toFixed(1);
    setSamples((prev) => [{ size: sampleSize, red: redCount, ratio }, ...prev].slice(0, 10));
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <label className="text-sm text-slate-600">표본 크기:</label>
        <select
          value={sampleSize}
          onChange={(e) => setSampleSize(Number(e.target.value))}
          className="px-3 py-1.5 border border-slate-200 rounded-lg text-sm"
        >
          {[5, 10, 20, 30, 50, 80, 100].map((n) => (
            <option key={n} value={n}>{n}개</option>
          ))}
        </select>
        <button
          onClick={drawSample}
          className="px-4 py-1.5 bg-primary-500 hover:bg-primary-600 text-white text-sm rounded-lg cursor-pointer"
        >
          뽑기!
        </button>
      </div>

      {samples.length > 0 && (
        <div className="space-y-1">
          <div className="text-xs text-slate-400">실제 빨간 비율: 60% | 추정 결과:</div>
          {samples.map((s, i) => {
            const diff = Math.abs(parseFloat(s.ratio) - 60);
            return (
              <div key={i} className="flex items-center gap-2 text-sm">
                <span className="text-slate-400 w-12">{s.size}개</span>
                <div className="flex-1 h-5 bg-slate-100 rounded-full overflow-hidden relative">
                  <div className="h-full bg-red-400 rounded-full" style={{ width: `${s.ratio}%` }} />
                  <div className="absolute left-[60%] top-0 h-full w-0.5 bg-slate-800" />
                </div>
                <span className={`w-16 text-right font-mono ${diff < 5 ? 'text-accent-600' : diff < 15 ? 'text-warm-600' : 'text-red-600'}`}>
                  {s.ratio}%
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function SurveyTrustQuiz() {
  const questions = [
    { q: '"전국 고등학생 10명에게 물어본 결과, 80%가 교복에 불만"', trust: false, reason: '표본 10명은 너무 적어 전국 고등학생을 대표할 수 없습니다.' },
    { q: '"1,500명 무작위 전화조사 결과, 대통령 지지율 52%"', trust: true, reason: '1,500명 무작위 표본은 여론조사에서 일반적으로 신뢰할 수 있는 크기입니다.' },
    { q: '"인스타그램 투표 5만 명 참여, 90%가 찬성"', trust: false, reason: '표본 크기는 크지만 인스타그램 사용자만 참여한 자기선택 편향이 있습니다.' },
    { q: '"학교 전교생 800명 전수조사 결과, 급식 만족도 72%"', trust: true, reason: '전수조사이므로 이 학교에 대해서는 정확합니다 (다만 다른 학교에 일반화는 어려움).' },
  ];
  const [answers, setAnswers] = useState({});

  return (
    <div className="space-y-3">
      {questions.map((item, i) => {
        const answered = answers[i] !== undefined;
        const isCorrect = answers[i] === item.trust;
        return (
          <div key={i} className={`p-3 rounded-xl border ${answered ? (isCorrect ? 'border-accent-300 bg-accent-50' : 'border-red-300 bg-red-50') : 'border-slate-200 bg-white'}`}>
            <p className="text-sm mb-2">{item.q}</p>
            <div className="flex gap-2">
              {[true, false].map((val) => (
                <button key={String(val)} onClick={() => setAnswers((p) => ({ ...p, [i]: val }))}
                  disabled={answered}
                  className={`px-3 py-1 rounded-lg text-xs cursor-pointer ${answered && val === item.trust ? 'bg-accent-500 text-white' : answered && val === answers[i] ? 'bg-red-400 text-white' : answered ? 'bg-slate-100 text-slate-400' : 'bg-slate-100 hover:bg-primary-100'}`}
                >{val ? '믿을 수 있다' : '주의 필요'}</button>
              ))}
            </div>
            {answered && <p className="text-xs text-slate-600 mt-2">{isCorrect ? '✅ ' : '❌ '}{item.reason}</p>}
          </div>
        );
      })}
    </div>
  );
}
