import { useState } from 'react';
import Icon from './Icon';

export default function ExerciseBlock({ title = '실습', children }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="my-8 rounded-2xl border-2 border-primary-200 bg-white overflow-hidden shadow-sm">
      {/* 헤더 */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="w-full flex items-center gap-2 px-5 py-3 bg-primary-50 text-left cursor-pointer"
      >
        <Icon name="target" size={20} className="text-primary-500" />
        <span className="font-semibold text-primary-800 flex-1">{title}</span>
        <span className="text-primary-400 text-sm">{collapsed ? '펼치기 ▼' : '접기 ▲'}</span>
      </button>

      {/* 내용 */}
      {!collapsed && <div className="p-5">{children}</div>}
    </div>
  );
}
