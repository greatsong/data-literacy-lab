import { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { findLesson } from '../data/lessonRegistry';
import LessonNav from '../components/layout/LessonNav';
import Icon from '../components/common/Icon';

// 레슨 컴포넌트 동적 임포트
const lessonComponents = import.meta.glob('../lessons/**/Lesson*.jsx', { eager: true });

function getLessonComponent(lessonId) {
  // '1-1' → module1/Lesson1_1
  const [modNum, lessonNum] = lessonId.split('-');
  const key = `../lessons/module${modNum}/Lesson${modNum}_${lessonNum}.jsx`;
  const mod = lessonComponents[key];
  return mod?.default || null;
}

export default function LessonPage() {
  const { lessonId } = useParams();
  const info = findLesson(lessonId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [lessonId]);

  if (!info) return <Navigate to="/" replace />;

  const LessonComponent = getLessonComponent(lessonId);

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      {/* 레슨 헤더 */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-slate-400 mb-2">
          <Icon name={info.module.icon} size={16} className="text-slate-400" />
          <span>{info.module.title}</span>
          <span>·</span>
          <span>{info.lesson.duration}분</span>
        </div>
        <h1 className="text-3xl font-bold text-slate-800">{info.lesson.title}</h1>
        <p className="mt-2 text-slate-500">{info.lesson.description}</p>
      </div>

      {/* 레슨 본문 */}
      {LessonComponent ? (
        <div className="lesson-content">
          <LessonComponent />
        </div>
      ) : (
        <div className="text-center py-20 text-slate-400">
          <div className="flex justify-center mb-4"><Icon name="construction" size={48} className="text-slate-300" /></div>
          <p className="text-lg font-medium">이 레슨은 준비 중입니다</p>
          <p className="text-sm mt-1">곧 만나볼 수 있어요!</p>
        </div>
      )}

      {/* 하단 내비게이션 */}
      <LessonNav lessonId={lessonId} />
    </div>
  );
}
