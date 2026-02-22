const variants = {
  tip: {
    bg: 'bg-accent-50',
    border: 'border-accent-400',
    icon: '💡',
    title: '팁',
    textColor: 'text-accent-800',
  },
  warning: {
    bg: 'bg-warm-50',
    border: 'border-warm-400',
    icon: '⚠️',
    title: '주의',
    textColor: 'text-warm-800',
  },
  note: {
    bg: 'bg-primary-50',
    border: 'border-primary-400',
    icon: '📝',
    title: '참고',
    textColor: 'text-primary-800',
  },
  think: {
    bg: 'bg-purple-50',
    border: 'border-purple-400',
    icon: '🤔',
    title: '생각해보기',
    textColor: 'text-purple-800',
  },
  key: {
    bg: 'bg-rose-50',
    border: 'border-rose-400',
    icon: '🔑',
    title: '핵심 개념',
    textColor: 'text-rose-800',
  },
};

export default function InfoBox({ type = 'note', title, children }) {
  const v = variants[type] || variants.note;

  return (
    <div className={`my-6 p-4 rounded-xl border-l-4 ${v.bg} ${v.border}`}>
      <div className={`font-semibold mb-1 ${v.textColor}`}>
        {v.icon} {title || v.title}
      </div>
      <div className="text-sm text-slate-700 leading-relaxed">{children}</div>
    </div>
  );
}
