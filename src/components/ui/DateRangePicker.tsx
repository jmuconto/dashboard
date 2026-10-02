import { Calendar } from 'lucide-react';

export type DateRange = '7d' | '30d' | '90d' | 'ytd';

interface DateRangePickerProps {
  value: DateRange;
  onChange: (range: DateRange) => void;
}

const RANGES: { id: DateRange; label: string }[] = [
  { id: '7d', label: 'Últimos 7 Dias' },
  { id: '30d', label: 'Últimos 30 Dias' },
  { id: '90d', label: 'Últimos 90 Dias' },
  { id: 'ytd', label: 'Desde o Início do Ano' },
];

export default function DateRangePicker({ value, onChange }: DateRangePickerProps) {
  return (
    <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
      <div className="px-2 text-slate-400">
        <Calendar className="w-3.5 h-3.5" />
      </div>
      {RANGES.map((range) => (
        <button
          key={range.id}
          onClick={() => onChange(range.id)}
          className={`px-3 py-1.5 text-[11px] font-semibold rounded-md transition-all whitespace-nowrap ${
            value === range.id
              ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm'
              : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
          }`}
        >
          {range.label}
        </button>
      ))}
    </div>
  );
}
