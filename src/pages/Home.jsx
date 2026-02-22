import { Link } from 'react-router-dom';
import { modules, totalLessons } from '../data/lessonRegistry';
import useProgressStore from '../stores/progressStore';
import ProgressBadge from '../components/common/ProgressBadge';
import Icon from '../components/common/Icon';

const colorMap = {
  primary: {
    card: 'border-primary-200 hover:border-primary-400 hover:shadow-primary-100',
    badge: 'bg-primary-100 text-primary-700',
    num: 'bg-primary-500',
    iconColor: 'text-primary-500',
  },
  accent: {
    card: 'border-accent-200 hover:border-accent-400 hover:shadow-accent-100',
    badge: 'bg-accent-100 text-accent-700',
    num: 'bg-accent-500',
    iconColor: 'text-accent-500',
  },
  warm: {
    card: 'border-warm-200 hover:border-warm-400 hover:shadow-warm-100',
    badge: 'bg-warm-100 text-warm-700',
    num: 'bg-warm-500',
    iconColor: 'text-warm-600',
  },
};

export default function Home() {
  const { getModuleProgress, getCompletedCount, getTotalProgress } = useProgressStore();
  const completedCount = getCompletedCount();
  const totalProgress = getTotalProgress();

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      {/* 히어로 */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary-50 rounded-full text-sm text-primary-600 font-medium mb-4">
          모두를 위한 실습 중심의 데이터 리터러시 수업!
        </div>
        <h1 className="text-4xl font-bold text-slate-800 mb-4">
          데이터 리터러시 랩
        </h1>
        <p className="text-lg text-slate-500 mb-6 max-w-2xl mx-auto leading-relaxed">
          데이터를 읽고, 질문하고, 분석하고, 검증하는 힘을 키우세요.
          <br />
          <strong className="text-slate-700">설명을 읽고 바로 실습</strong>하며 자연스럽게 익히는 인터랙티브 학습 사이트입니다.
        </p>

        {/* 통계 */}
        <div className="flex items-center justify-center gap-6 text-sm text-slate-500 mb-4">
          <span className="inline-flex items-center gap-1"><Icon name="books" size={16} className="text-slate-400" /> {modules.length}개 모듈</span>
          <span>·</span>
          <span className="inline-flex items-center gap-1"><Icon name="memo" size={16} className="text-slate-400" /> {totalLessons}개 레슨</span>
          <span>·</span>
          <span className="inline-flex items-center gap-1"><Icon name="timer" size={16} className="text-slate-400" /> 약 {Math.round(modules.reduce((s, m) => s + m.lessons.reduce((ls, l) => ls + l.duration, 0), 0) / 60)}시간</span>
        </div>

        {/* 전체 진행도 */}
        {completedCount > 0 && (
          <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-white rounded-full shadow-sm border border-slate-200">
            <span className="text-sm text-slate-500">학습 진행</span>
            <div className="w-36 h-2.5 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-accent-500 rounded-full transition-all duration-700"
                style={{ width: `${Math.round(totalProgress * 100)}%` }}
              />
            </div>
            <span className="text-sm font-bold text-accent-600">
              {completedCount}/{totalLessons}
            </span>
          </div>
        )}
      </div>

      {/* 학습 로드맵 */}
      <div className="mb-8 px-4">
        <div className="flex items-center overflow-x-auto gap-1 py-2">
          {modules.map((mod, i) => {
            const progress = getModuleProgress(mod.id);
            const done = progress === 1;
            return (
              <div key={mod.id} className="flex items-center shrink-0">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                  done ? 'bg-accent-500 text-white' : progress > 0 ? 'bg-primary-100 text-primary-600' : 'bg-slate-100 text-slate-400'
                }`}>
                  {done ? <Icon name="check" size={14} className="text-white" /> : i + 1}
                </div>
                {i < modules.length - 1 && (
                  <div className={`w-8 h-0.5 ${done ? 'bg-accent-400' : 'bg-slate-200'}`} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 모듈 카드 그리드 */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {modules.map((mod, i) => {
          const colors = colorMap[mod.color] || colorMap.primary;
          const progress = getModuleProgress(mod.id);
          const firstLesson = mod.lessons[0];

          return (
            <Link
              key={mod.id}
              to={`/lesson/${firstLesson.id}`}
              className={`group block p-5 bg-white rounded-2xl border-2 transition-all hover:shadow-lg ${colors.card}`}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${colors.num}`}>
                  {i + 1}
                </span>
                <Icon name={mod.icon} size={24} className={colors.iconColor} />
              </div>
              <h3 className="font-bold text-sm text-slate-800 mb-1 group-hover:text-primary-600 transition-colors leading-snug">
                {mod.title}
              </h3>
              <p className="text-xs text-slate-500 mb-3 leading-relaxed line-clamp-2">
                {mod.description}
              </p>
              <div className="flex items-center justify-between">
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${colors.badge}`}>
                  {mod.lessons.length}개 레슨
                </span>
                <ProgressBadge progress={progress} />
              </div>
            </Link>
          );
        })}
      </div>

      {/* 특징 소개 */}
      <div className="mt-14 grid sm:grid-cols-3 gap-6 text-center">
        <div className="p-4">
          <div className="flex justify-center mb-2"><Icon name="target" size={32} className="text-primary-500" /></div>
          <h4 className="font-bold text-slate-700 mb-1">실습 중심</h4>
          <p className="text-xs text-slate-500">읽고 바로 해보는 인터랙티브 위젯과 퀴즈로 개념을 체득합니다</p>
        </div>
        <div className="p-4">
          <div className="flex justify-center mb-2"><Icon name="realData" size={32} className="text-accent-500" /></div>
          <h4 className="font-bold text-slate-700 mb-1">실제 데이터</h4>
          <p className="text-xs text-slate-500">200명 학생 설문과 10년간 기온 데이터로 현실적인 분석을 경험합니다</p>
        </div>
        <div className="p-4">
          <div className="flex justify-center mb-2"><Icon name="brain" size={32} className="text-warm-600" /></div>
          <h4 className="font-bold text-slate-700 mb-1">사고력 중심</h4>
          <p className="text-xs text-slate-500">도구 사용법이 아닌 데이터를 비판적으로 읽고 질문하는 힘을 키웁니다</p>
        </div>
      </div>

      {/* 하단 */}
      <div className="mt-10 text-center text-xs text-slate-400">
        데이터 리터러시 랩 · 데이터 분석 에이전틱 수업 실습 사이트
      </div>
    </div>
  );
}
