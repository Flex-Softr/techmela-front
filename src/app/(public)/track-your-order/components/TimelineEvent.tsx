import { Check } from "lucide-react";

type TimelineEventProps = {
  status: string;
  description: string;
  date: string;
  time: string;
  isActive: boolean;
  isLast: boolean;
};

const TimelineEvent: React.FC<TimelineEventProps> = ({
  status,
  description,
  date,
  time,
  isActive,
}) => {
  return (
    <div className="relative pl-12 pb-10 last:pb-0 group">
      {/* Vertical line connecting steps — soft green since all are completed */}
      <div className="absolute left-[15px] top-8 bottom-0 w-0.5 bg-green-100 group-last:hidden"></div>

      {/* Step dot — all filled with a check since all are completed historical events */}
      <div
        className={`absolute left-0 top-0 w-8 h-8 rounded-full border-2 flex items-center justify-center z-10 transition-all ${
          isActive
            ? "border-primary bg-primary text-white shadow-md shadow-primary/30 scale-110"
            : "border-green-400 bg-green-50 text-green-600"
        }`}
      >
        <Check className="w-4 h-4" strokeWidth={3} />
      </div>

      {/* Content */}
      <div className="space-y-1 pt-0.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
          <h3
            className={`font-bold transition-colors ${isActive ? "text-primary" : "text-foreground/70"}`}
          >
            {status}
            {isActive && (
              <span className="ml-2 inline-flex items-center text-[10px] font-semibold uppercase tracking-wider bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                সর্বশেষ
              </span>
            )}
          </h3>
          <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider tabular-nums">
            {date} • {time}
          </span>
        </div>
        <p
          className={`text-sm leading-relaxed ${isActive ? "text-foreground" : "text-muted-foreground"}`}
        >
          {description}
        </p>
      </div>
    </div>
  );
};

export default TimelineEvent;
