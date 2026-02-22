import { useState } from 'react';
import InfoBox from '../../components/common/InfoBox';
import ExerciseBlock from '../../components/common/ExerciseBlock';
import QuestionBuilder from '../../components/interactive/QuestionBuilder';

const situationCards = [
  {
    emoji: '🏫',
    category: '학교생활',
    front: '점심시간이 짧아서 급식을 다 먹지 못하는 학생들이 많은 것 같다.',
    back: {
      context: '학교 급식 시간은 30분, 학생 수 800명, 배식 줄 평균 10분',
      possibleVars: ['대기 시간', '식사 시간', '남기는 양', '만족도'],
      hint: '시간, 양, 만족도 등 측정 가능한 변수를 생각해보세요.',
    },
  },
  {
    emoji: '🌡️',
    category: '환경',
    front: '요즘 여름이 점점 더 더워지는 것 같다.',
    back: {
      context: '최근 10년간 서울 기온 데이터가 있음, 지구 온난화 논의',
      possibleVars: ['연평균 기온', '최고 기온', '폭염 일수', '열대야 일수'],
      hint: '기온 데이터의 연도별 변화를 분석할 수 있어요.',
    },
  },
  {
    emoji: '💊',
    category: '건강',
    front: '스마트폰을 많이 하면 눈이 나빠지는 것 같다.',
    back: {
      context: '청소년 시력 저하 증가 추세, 스마트폰 보급률 증가',
      possibleVars: ['스마트폰 사용 시간', '시력', '나이', '야외 활동 시간'],
      hint: '스마트폰 사용 시간과 시력 사이의 관계를 조사할 수 있어요.',
    },
  },
  {
    emoji: '💰',
    category: '경제',
    front: '용돈을 많이 받는 친구가 더 행복해 보인다.',
    back: {
      context: '고등학생 월 평균 용돈 5만원, 소비 패턴 다양',
      possibleVars: ['용돈 액수', '생활 만족도', '저축 여부', '소비 항목'],
      hint: '용돈 액수와 행복/만족도의 관계를 조사할 수 있어요.',
    },
  },
  {
    emoji: '🎵',
    category: '문화',
    front: '좋아하는 음악 장르가 나이에 따라 다른 것 같다.',
    back: {
      context: '스트리밍 서비스 보편화, 세대별 음악 취향 차이',
      possibleVars: ['나이', '선호 장르', '음악 청취 시간', '유료 구독 여부'],
      hint: '연령대별 선호 장르 분포를 조사할 수 있어요.',
    },
  },
  {
    emoji: '🤖',
    category: '기술',
    front: 'AI를 사용하면 공부를 덜 하게 되는 것 같다.',
    back: {
      context: 'ChatGPT 등 AI 도구의 학습 목적 사용 증가',
      possibleVars: ['AI 사용 빈도', '자기주도 학습 시간', '성적', '과제 완성도'],
      hint: 'AI 도구 사용 빈도와 학습 성과의 관계를 조사할 수 있어요.',
    },
  },
];

export default function Lesson2_2() {
  return (
    <div className="space-y-6 text-slate-700 leading-relaxed">
      <p className="text-lg">
        이제 다양한 <strong>상황카드</strong>를 보고 데이터 질문을 직접 만들어봅시다.
        각 카드에는 일상의 궁금증이 담겨 있습니다. 카드를 뒤집으면 힌트를 볼 수 있어요!
      </p>

      <InfoBox type="tip">
        좋은 데이터 질문을 만드는 순서를 기억하세요:
        <br />1. 상황 속 궁금증을 찾고
        <br />2. 측정 가능한 변수를 떠올리고
        <br />3. 변수들 사이의 관계로 질문을 만듭니다
      </InfoBox>

      {/* 상황카드 */}
      <h2 className="text-xl font-bold text-slate-800 mt-8">상황카드 6장</h2>
      <p className="text-sm text-slate-500">카드를 클릭하면 뒤집힙니다. 힌트를 참고하여 질문을 만들어보세요.</p>

      <div className="grid sm:grid-cols-2 gap-4 my-6">
        {situationCards.map((card, i) => (
          <FlipCard key={i} card={card} index={i} />
        ))}
      </div>

      {/* 실습: 상황카드 기반 질문 만들기 */}
      <ExerciseBlock title="실습: 상황카드에서 데이터 질문 만들기">
        <p className="text-sm text-slate-500 mb-4">
          위 상황카드 중 하나를 골라 3단계로 질문을 변환해보세요.
        </p>
        <QuestionBuilder
          examples={[
            {
              vague: '점심시간이 짧아서 급식을 다 못 먹는다',
              curious: '점심 대기 시간이 실제 식사 시간에 영향을 주는가?',
              data: '배식 대기 시간이 10분 이상인 학생의 식사 잔반량이 대기 시간 5분 미만인 학생보다 유의하게 많은가?',
            },
          ]}
        />
      </ExerciseBlock>

      {/* 마무리 */}
      <div className="mt-10 p-6 bg-slate-50 rounded-xl">
        <h3 className="font-bold text-slate-800 mb-2">이번 레슨에서 배운 것</h3>
        <ul className="text-sm space-y-1 text-slate-600">
          <li>✓ 다양한 일상 상황에서 데이터 질문의 씨앗을 찾는 방법</li>
          <li>✓ 상황 → 변수 식별 → 질문 구조화의 흐름</li>
          <li>✓ 6가지 영역(학교, 환경, 건강, 경제, 문화, 기술)의 질문 예시</li>
        </ul>
      </div>
    </div>
  );
}

function FlipCard({ card, index }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      onClick={() => setFlipped(!flipped)}
      className="cursor-pointer perspective-1000"
    >
      <div
        className={`relative transition-transform duration-500 preserve-3d ${
          flipped ? '[transform:rotateY(180deg)]' : ''
        }`}
        style={{ transformStyle: 'preserve-3d', minHeight: '200px' }}
      >
        {/* 앞면 */}
        <div
          className="absolute inset-0 backface-hidden p-5 rounded-xl border-2 border-slate-200 bg-white"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">{card.emoji}</span>
            <span className="text-xs font-medium text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
              {card.category}
            </span>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed">{card.front}</p>
          <p className="text-xs text-slate-300 mt-4 text-center">클릭하여 뒤집기</p>
        </div>

        {/* 뒷면 */}
        <div
          className="absolute inset-0 backface-hidden p-5 rounded-xl border-2 border-primary-200 bg-primary-50 [transform:rotateY(180deg)]"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="text-xs font-semibold text-primary-600 mb-2">💡 힌트</div>
          <div className="text-xs text-slate-600 space-y-2">
            <p><strong>상황:</strong> {card.back.context}</p>
            <p><strong>측정 가능한 변수:</strong></p>
            <div className="flex flex-wrap gap-1">
              {card.back.possibleVars.map((v, i) => (
                <span key={i} className="px-2 py-0.5 bg-white rounded-full text-primary-700 border border-primary-200">
                  {v}
                </span>
              ))}
            </div>
            <p className="italic text-slate-500">{card.back.hint}</p>
          </div>
          <p className="text-xs text-primary-300 mt-2 text-center">클릭하여 뒤집기</p>
        </div>
      </div>
    </div>
  );
}
