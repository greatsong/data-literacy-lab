import { useState, useRef, useCallback } from 'react';

/**
 * Pyodide(브라우저 Python) 로딩/실행 훅
 * - 최초 실행 시 Pyodide를 CDN에서 로드 (약 10MB)
 * - 이후에는 캐시된 인스턴스 재사용
 * - matplotlib 출력을 base64 이미지로 변환
 */

let pyodideInstance = null;
let pyodideLoading = null;

async function loadPyodideOnce() {
  if (pyodideInstance) return pyodideInstance;
  if (pyodideLoading) return pyodideLoading;

  pyodideLoading = (async () => {
    // CDN에서 Pyodide 스크립트 로드
    if (!window.loadPyodide) {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js';
      document.head.appendChild(script);
      await new Promise((resolve, reject) => {
        script.onload = resolve;
        script.onerror = reject;
      });
    }

    const pyodide = await window.loadPyodide({
      indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/',
    });

    // micropip으로 matplotlib 설치
    await pyodide.loadPackage('micropip');
    const micropip = pyodide.pyimport('micropip');
    await micropip.install('matplotlib');

    // matplotlib 백엔드를 Agg로 설정
    await pyodide.runPythonAsync(`
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import io, base64

def _get_plot_base64():
    buf = io.BytesIO()
    plt.savefig(buf, format='png', dpi=100, bbox_inches='tight', facecolor='white')
    buf.seek(0)
    img = base64.b64encode(buf.read()).decode('utf-8')
    plt.close('all')
    return img
`);

    pyodideInstance = pyodide;
    return pyodide;
  })();

  return pyodideLoading;
}

export default function usePyodide() {
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(!!pyodideInstance);
  const [output, setOutput] = useState('');
  const [plotImage, setPlotImage] = useState(null);
  const [error, setError] = useState(null);

  const run = useCallback(async (code) => {
    setError(null);
    setOutput('');
    setPlotImage(null);

    try {
      if (!pyodideInstance) {
        setLoading(true);
        await loadPyodideOnce();
        setReady(true);
        setLoading(false);
      }

      const pyodide = pyodideInstance;

      // stdout 캡처
      await pyodide.runPythonAsync(`
import sys, io
_stdout_capture = io.StringIO()
sys.stdout = _stdout_capture
`);

      // 코드 실행
      await pyodide.runPythonAsync(code);

      // stdout 읽기
      const stdout = await pyodide.runPythonAsync(`
sys.stdout = sys.__stdout__
_stdout_capture.getvalue()
`);
      setOutput(stdout || '');

      // matplotlib 플롯이 있는지 확인
      const hasPlot = await pyodide.runPythonAsync(`
len(plt.get_fignums()) > 0
`);

      if (hasPlot) {
        const imgB64 = await pyodide.runPythonAsync(`_get_plot_base64()`);
        setPlotImage(`data:image/png;base64,${imgB64}`);
      }
    } catch (err) {
      setError(err.message || String(err));
      setLoading(false);
    }
  }, []);

  return { run, loading, ready, output, plotImage, error };
}
