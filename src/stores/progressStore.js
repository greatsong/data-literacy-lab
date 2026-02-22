import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { modules, totalLessons } from '../data/lessonRegistry';

const useProgressStore = create(
  persist(
    (set, get) => ({
      // { '1-1': true, '1-2': false, ... }
      completedLessons: {},

      completeLesson: (lessonId) =>
        set((state) => ({
          completedLessons: { ...state.completedLessons, [lessonId]: true },
        })),

      uncompleteLesson: (lessonId) =>
        set((state) => {
          const next = { ...state.completedLessons };
          delete next[lessonId];
          return { completedLessons: next };
        }),

      isLessonCompleted: (lessonId) => !!get().completedLessons[lessonId],

      // 모듈 진행률 (0~1)
      getModuleProgress: (moduleId) => {
        const mod = modules.find((m) => m.id === moduleId);
        if (!mod) return 0;
        const done = mod.lessons.filter((l) => get().completedLessons[l.id]).length;
        return done / mod.lessons.length;
      },

      // 전체 진행률 (0~1)
      getTotalProgress: () => {
        const done = Object.keys(get().completedLessons).length;
        return done / totalLessons;
      },

      // 완료된 레슨 수
      getCompletedCount: () => Object.keys(get().completedLessons).length,

      resetProgress: () => set({ completedLessons: {} }),
    }),
    { name: 'dll-progress' }
  )
);

export default useProgressStore;
