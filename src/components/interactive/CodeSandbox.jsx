import { useState, useRef } from 'react';
import usePyodide from '../../hooks/usePyodide';

/**
 * Python 코드 편집 + 실행 (Pyodide)
 * @param {Object} props
 * @param {string} props.initialCode - 초기 코드
 * @param {string} props.hint - 힌트 텍스트
 */
export default function CodeSandbox({ initialCode = '', hint = '' }) {
  const [code, setCode] = useState(initialCode);
  const { run, loading, ready, output, plotImage, error } = usePyodide();
  const [running, setRunning] = useState(false);
  const textareaRef = useRef(null);

  const handleRun = async () => {
    setRunning(true);
    await run(code);
    setRunning(false);
  };

  const handleKeyDown = (e) => {
    // Tab → 들여쓰기
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      const newCode = code.substring(0, start) + '    ' + code.substring(end);
      setCode(newCode);
      setTimeout(() => {
        e.target.selectionStart = e.target.selectionEnd = start + 4;
      }, 0);
    }
    // Ctrl/Cmd + Enter → 실행
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      handleRun();
    }
  };

  return (
    <div className="rounded-xl border border-slate-200 overflow-hidden bg-white">
      {/* 에디터 헤더 */}
      <div className="flex items-center justify-between px-3 py-2 bg-slate-800 text-white">
        <div className="flex items-center gap-2">
          <span className="text-xs">🐍 Python</span>
          {loading && <span className="text-xs text-yellow-400 animate-pulse">Pyodide 로딩 중...</span>}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCode(initialCode)}
            className="px-2 py-0.5 text-xs bg-slate-700 hover:bg-slate-600 rounded cursor-pointer"
          >
            초기화
          </button>
          <button
            onClick={handleRun}
            disabled={running}
            className="px-3 py-0.5 text-xs bg-accent-600 hover:bg-accent-500 rounded font-medium disabled:opacity-50 cursor-pointer"
          >
            {running ? '실행 중...' : '▶ 실행'}
          </button>
        </div>
      </div>

      {/* 코드 입력 */}
      <textarea
        ref={textareaRef}
        value={code}
        onChange={(e) => setCode(e.target.value)}
        onKeyDown={handleKeyDown}
        spellCheck={false}
        rows={Math.max(6, code.split('\n').length + 1)}
        className="w-full px-4 py-3 font-mono text-sm bg-slate-900 text-green-300 resize-y focus:outline-none"
        style={{ tabSize: 4 }}
      />

      {/* 힌트 */}
      {hint && (
        <div className="px-3 py-1.5 bg-warm-50 text-xs text-warm-700 border-t border-slate-200">
          💡 {hint}
        </div>
      )}

      {/* 실행 결과 */}
      {(output || error || plotImage) && (
        <div className="border-t border-slate-200">
          <div className="px-3 py-1.5 bg-slate-50 text-xs font-medium text-slate-500">
            실행 결과
          </div>

          {error && (
            <div className="px-4 py-3 bg-red-50 text-sm text-red-700 font-mono whitespace-pre-wrap">
              {error}
            </div>
          )}

          {output && (
            <div className="px-4 py-3 text-sm font-mono text-slate-800 whitespace-pre-wrap bg-white">
              {output}
            </div>
          )}

          {plotImage && (
            <div className="p-3 bg-white flex justify-center">
              <img src={plotImage} alt="matplotlib 출력" className="max-w-full rounded-lg shadow-sm" />
            </div>
          )}
        </div>
      )}

      {/* 단축키 안내 */}
      <div className="px-3 py-1.5 bg-slate-50 text-xs text-slate-400 border-t border-slate-100">
        Ctrl+Enter로 실행 · Tab으로 들여쓰기
      </div>
    </div>
  );
}
