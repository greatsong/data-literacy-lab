import { useState } from 'react';

export default function RevealAnswer({ label = '정답 확인하기', children }) {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="my-4">
      {!revealed ? (
        <button
          onClick={() => setRevealed(true)}
          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 text-sm font-medium rounded-lg transition-colors cursor-pointer"
        >
          {label} 👀
        </button>
      ) : (
        <div className="p-4 bg-accent-50 border border-accent-200 rounded-xl text-sm">
          <div className="flex justify-between items-start mb-2">
            <span className="font-semibold text-accent-700">💡 정답</span>
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
