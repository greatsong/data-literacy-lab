import { useState, useCallback } from 'react';

/**
 * 드래그앤드롭 분류 컴포넌트
 * @param {Object} props
 * @param {Array<{id: string, label: string}>} props.items - 분류할 아이템들
 * @param {Array<{id: string, title: string, color?: string}>} props.categories - 분류 카테고리들
 * @param {Object} props.correctMapping - { itemId: categoryId } 정답 매핑
 * @param {string} props.instruction - 안내 문구
 */
export default function DragDropSort({ items, categories, correctMapping, instruction }) {
  const [placements, setPlacements] = useState({}); // { itemId: categoryId }
  const [draggedItem, setDraggedItem] = useState(null);
  const [checked, setChecked] = useState(false);

  const unplaced = items.filter((item) => !placements[item.id]);

  const handleDragStart = (itemId) => setDraggedItem(itemId);

  const handleDrop = useCallback(
    (categoryId) => {
      if (!draggedItem) return;
      setPlacements((prev) => ({ ...prev, [draggedItem]: categoryId }));
      setDraggedItem(null);
      setChecked(false);
    },
    [draggedItem]
  );

  const handleRemove = (itemId) => {
    setPlacements((prev) => {
      const next = { ...prev };
      delete next[itemId];
      return next;
    });
    setChecked(false);
  };

  const handleCheck = () => setChecked(true);

  const handleReset = () => {
    setPlacements({});
    setChecked(false);
  };

  const allPlaced = unplaced.length === 0;
  const correctCount = checked
    ? Object.entries(placements).filter(([itemId, catId]) => correctMapping[itemId] === catId).length
    : 0;

  const categoryColors = {
    blue: 'border-primary-300 bg-primary-50',
    green: 'border-accent-300 bg-accent-50',
    yellow: 'border-warm-300 bg-warm-50',
    purple: 'border-purple-300 bg-purple-50',
    default: 'border-slate-300 bg-slate-50',
  };

  return (
    <div className="space-y-4">
      {instruction && <p className="text-sm text-slate-500">{instruction}</p>}

      {/* 미분류 아이템 */}
      {unplaced.length > 0 && (
        <div className="flex flex-wrap gap-2 p-3 bg-slate-50 rounded-xl min-h-[48px]">
          {unplaced.map((item) => (
            <div
              key={item.id}
              draggable
              onDragStart={() => handleDragStart(item.id)}
              className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm font-medium cursor-grab active:cursor-grabbing hover:border-primary-300 hover:shadow-sm transition-all select-none"
            >
              {item.label}
            </div>
          ))}
        </div>
      )}

      {/* 카테고리 영역 */}
      <div className="grid gap-3" style={{ gridTemplateColumns: `repeat(${categories.length}, 1fr)` }}>
        {categories.map((cat) => {
          const catItems = items.filter((item) => placements[item.id] === cat.id);
          const colorClass = categoryColors[cat.color] || categoryColors.default;

          return (
            <div
              key={cat.id}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop(cat.id)}
              className={`p-3 rounded-xl border-2 border-dashed min-h-[100px] transition-colors ${colorClass} ${
                draggedItem ? 'border-solid opacity-90' : ''
              }`}
            >
              <div className="text-sm font-semibold text-center mb-2 text-slate-700">
                {cat.title}
              </div>
              <div className="space-y-1.5">
                {catItems.map((item) => {
                  const isCorrect = checked && correctMapping[item.id] === cat.id;
                  const isWrong = checked && correctMapping[item.id] !== cat.id;

                  return (
                    <div
                      key={item.id}
                      className={`px-2 py-1 rounded-md text-xs font-medium flex justify-between items-center ${
                        isCorrect
                          ? 'bg-accent-100 text-accent-800'
                          : isWrong
                            ? 'bg-red-100 text-red-800'
                            : 'bg-white text-slate-700'
                      }`}
                    >
                      <span>{checked && (isCorrect ? '✓ ' : '✗ ')}{item.label}</span>
                      {!checked && (
                        <button
                          onClick={() => handleRemove(item.id)}
                          className="text-slate-400 hover:text-red-400 ml-1 cursor-pointer"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* 버튼 */}
      <div className="flex gap-2">
        {allPlaced && !checked && (
          <button
            onClick={handleCheck}
            className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white text-sm font-medium rounded-lg transition-colors cursor-pointer"
          >
            정답 확인
          </button>
        )}
        {checked && (
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium">
              {correctCount === items.length
                ? '🎉 모두 정답!'
                : `${correctCount}/${items.length}개 정답`}
            </span>
            <button
              onClick={handleReset}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 text-sm rounded-lg transition-colors cursor-pointer"
            >
              다시 하기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
