import Icon from './Icon';

const variants = {
  tip: {
    bg: 'bg-accent-50',
    border: 'border-accent-400',
    icon: 'lightbulb',
    iconColor: 'text-accent-600',
    title: '팁',
    textColor: 'text-accent-800',
  },
  warning: {
    bg: 'bg-warm-50',
    border: 'border-warm-400',
    icon: 'warning',
    iconColor: 'text-warm-600',
    title: '주의',
    textColor: 'text-warm-800',
  },
  note: {
    bg: 'bg-primary-50',
    border: 'border-primary-400',
    icon: 'memo',
    iconColor: 'text-primary-600',
    title: '참고',
    textColor: 'text-primary-800',
  },
  think: {
    bg: 'bg-purple-50',
    border: 'border-purple-400',
    icon: 'thinking',
    iconColor: 'text-purple-600',
    title: '생각해보기',
    textColor: 'text-purple-800',
  },
  key: {
    bg: 'bg-rose-50',
    border: 'border-rose-400',
    icon: 'keyIcon',
    iconColor: 'text-rose-600',
    title: '핵심 개념',
    textColor: 'text-rose-800',
  },
};

export default function InfoBox({ type = 'note', title, children }) {
  const v = variants[type] || variants.note;

  return (
    <div className={`my-6 p-4 rounded-xl border-l-4 ${v.bg} ${v.border}`}>
      <div className={`flex items-center gap-1.5 font-semibold mb-1 ${v.textColor}`}>
        <Icon name={v.icon} size={18} className={v.iconColor} />
        {title || v.title}
      </div>
      <div className="text-sm text-slate-700 leading-relaxed">{children}</div>
    </div>
  );
}
