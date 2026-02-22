import { useState } from 'react';
import Icon from './Icon';

export default function RevealAnswer({ label = '정답 확인하기', children }) {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="my-4">
      {!revealed ? (
        <button
          onClick={() => setRevealed(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 text-sm font-medium rounded-lg transition-colors cursor-pointer"
        >
          {label} <Icon name="eyes" size={16} className="text-slate-500" />
        </button>
      ) : (
        <div className="p-4 bg-accent-50 border border-accent-200 rounded-xl text-sm">
          <div className="flex justify-between items-start mb-2">
            <span className="inline-flex items-center gap-1.5 font-semibold text-accent-700">
              <Icon name="lightbulb" size={16} className="text-accent-500" /> 정답
            </span>
            <button
              onClick={() => setRevealed(false)}
              className="text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              숨기기
            </button>
          </div>
          <div className="text-slate-700 leading-relaxed">{children}</div>
        </div>
      )}
    </div>
  );
}
