import { Link } from 'react-router-dom';
import { getAdjacentLessons } from '../../data/lessonRegistry';
import useProgressStore from '../../stores/progressStore';
import Icon from '../common/Icon';

export default function LessonNav({ lessonId }) {
  const { prev, next } = getAdjacentLessons(lessonId);
  const { isLessonCompleted, completeLesson } = useProgressStore();
  const completed = isLessonCompleted(lessonId);

  return (
    <div className="mt-12 pt-6 border-t border-slate-200">
      {/* 완료 버튼 */}
      {!completed && (
        <button
          onClick={() => completeLesson(lessonId)}
          className="w-full mb-6 py-3 bg-accent-500 hover:bg-accent-600 text-white font-semibold rounded-xl transition-colors cursor-pointer"
        >
          <span className="inline-flex items-center gap-2">이 레슨 완료하기 <Icon name="check" size={16} className="text-white" /></span>
        </button>
      )}
      {completed && (
        <div className="mb-6 py-3 flex items-center justify-center gap-2 text-accent-600 font-semibold bg-accent-50 rounded-xl">
          <Icon name="check" size={18} className="text-accent-500" /> 이 레슨을 완료했습니다!
        </div>
      )}

      {/* 이전/다음 */}
      <div className="flex justify-between gap-4">
        {prev ? (
          <Link
            to={`/lesson/${prev.id}`}
            className="flex-1 p-4 border border-slate-200 rounded-xl hover:border-primary-300 hover:bg-primary-50 transition-colors text-left"
          >
            <div className="text-xs text-slate-400 mb-1">← 이전 레슨</div>
            <div className="text-sm font-medium text-slate-700">{prev.title}</div>
          </Link>
        ) : (
          <div className="flex-1" />
        )}
        {next ? (
          <Link
            to={`/lesson/${next.id}`}
            className="flex-1 p-4 border border-slate-200 rounded-xl hover:border-primary-300 hover:bg-primary-50 transition-colors text-right"
          >
            <div className="text-xs text-slate-400 mb-1">다음 레슨 →</div>
            <div className="text-sm font-medium text-slate-700">{next.title}</div>
          </Link>
        ) : (
          <div className="flex-1" />
        )}
      </div>
    </div>
  );
}
