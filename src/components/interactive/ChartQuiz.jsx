import { useState, useEffect, useRef } from 'react';
import Plotly from 'plotly.js-dist-min';

/**
 * 차트 + 퀴즈 컴포넌트
 * @param {Object} props
 * @param {Object} props.chartData - Plotly data array
 * @param {Object} props.chartLayout - Plotly layout object
 * @param {Array<{question: string, options: string[], answer: number, explanation: string}>} props.questions
 */
export default function ChartQuiz({ chartData, chartLayout, questions }) {
  const chartRef = useRef(null);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    if (chartRef.current) {
      const layout = {
        margin: { t: 30, r: 20, b: 40, l: 50 },
        height: 300,
        font: { family: 'Noto Sans KR' },
        ...chartLayout,
      };
      Plotly.newPlot(chartRef.current, chartData, layout, {
        responsive: true,
        displayModeBar: false,
      });
    }
    return () => {
      if (chartRef.current) Plotly.purge(chartRef.current);
    };
  }, [chartData, chartLayout]);

  const handleAnswer = (qIdx, optIdx) => {
    setAnswers((prev) => ({ ...prev, [qIdx]: optIdx }));
  };

  return (
    <div className="space-y-4">
      {/* 차트 */}
      <div ref={chartRef} className="w-full rounded-xl overflow-hidden border border-slate-200" />

      {/* 퀴즈 */}
      <div className="space-y-3">
        {questions.map((q, qi) => {
          const selected = answers[qi];
          const answered = selected !== undefined;
          const isCorrect = selected === q.answer;

          return (
            <div key={qi} className={`p-3 rounded-xl border ${answered ? (isCorrect ? 'border-accent-300 bg-accent-50/50' : 'border-red-300 bg-red-50/50') : 'border-slate-200 bg-white'}`}>
              <p className="text-sm font-medium mb-2">{q.question}</p>
              <div className="flex flex-wrap gap-2">
                {q.options.map((opt, oi) => (
                  <button
                    key={oi}
                    onClick={() => handleAnswer(qi, oi)}
                    disabled={answered}
                    className={`px-3 py-1.5 rounded-lg text-sm transition-colors cursor-pointer ${
                      answered && oi === q.answer
                        ? 'bg-accent-500 text-white'
                        : answered && oi === selected
                          ? 'bg-red-400 text-white'
                          : answered
                            ? 'bg-slate-100 text-slate-400'
                            : 'bg-slate-100 hover:bg-primary-100 text-slate-700'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              {answered && (
                <p className="text-xs text-slate-600 mt-2">
                  {isCorrect ? '✅ ' : '❌ '}{q.explanation}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
