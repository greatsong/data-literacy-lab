import { NavLink, useParams } from 'react-router-dom';
import { modules } from '../../data/lessonRegistry';
import useProgressStore from '../../stores/progressStore';

export default function Sidebar({ open, onClose }) {
  const { lessonId } = useParams();
  const { isLessonCompleted, getModuleProgress } = useProgressStore();

  return (
    <>
      {/* 모바일 오버레이 */}
      {open && (
        <div className="fixed inset-0 bg-black/30 z-40 lg:hidden" onClick={onClose} />
      )}

      <aside
        className={`fixed top-0 left-0 z-50 h-full w-72 bg-white border-r border-slate-200 overflow-y-auto transition-transform duration-300 lg:translate-x-0 lg:static lg:z-auto ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* 로고 */}
        <NavLink to="/" className="flex items-center gap-2 px-5 py-4 border-b border-slate-100" onClick={onClose}>
          <span className="text-2xl">📊</span>
          <span className="font-bold text-lg text-slate-800">데이터 리터러시 랩</span>
        </NavLink>

        {/* 모듈 목록 */}
        <nav className="p-3">
          {modules.map((mod) => {
            const progress = getModuleProgress(mod.id);
            const progressPct = Math.round(progress * 100);

            return (
              <div key={mod.id} className="mb-2">
                {/* 모듈 헤더 */}
                <div className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-slate-600 uppercase tracking-wide">
                  <span>{mod.emoji}</span>
                  <span className="flex-1 truncate">{mod.title}</span>
                  {progressPct > 0 && (
                    <span className="text-xs font-normal text-primary-500">{progressPct}%</span>
                  )}
                </div>

                {/* 진행률 바 */}
                {progressPct > 0 && (
                  <div className="mx-3 mb-1 h-1 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary-500 rounded-full transition-all duration-500"
                      style={{ width: `${progressPct}%` }}
                    />
                  </div>
                )}

                {/* 레슨 목록 */}
                <ul className="space-y-0.5">
                  {mod.lessons.map((lesson) => {
                    const isActive = lessonId === lesson.id;
                    const completed = isLessonCompleted(lesson.id);

                    return (
                      <li key={lesson.id}>
                        <NavLink
                          to={`/lesson/${lesson.id}`}
                          onClick={onClose}
                          className={`flex items-center gap-2 px-3 py-2 mx-1 rounded-lg text-sm transition-colors ${
                            isActive
                              ? 'bg-primary-50 text-primary-700 font-medium'
                              : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                          }`}
                        >
                          {/* 완료 체크 */}
                          <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center text-xs shrink-0 ${
                            completed
                              ? 'bg-accent-500 border-accent-500 text-white'
                              : isActive
                                ? 'border-primary-400'
                                : 'border-slate-300'
                          }`}>
                            {completed && '✓'}
                          </span>
                          <span className="truncate">{lesson.title}</span>
                        </NavLink>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
