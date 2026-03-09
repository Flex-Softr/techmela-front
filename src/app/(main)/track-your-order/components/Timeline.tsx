import React from "react";
import TimelineEvent from "./TimelineEvent";

type Status = {
  status: string;
  title: string;
  date: string;
  time: string;
  icon: string;
  description: string;
  isActive: boolean;
};

type TimelineProps = {
  statuses: Status[];
  latestStatus: string;
};

const Timeline: React.FC<TimelineProps> = ({ statuses }) => {
  return (
    <div className="space-y-0 relative">
      <div className="absolute left-[15px] top-2 bottom-2 w-0.5 bg-gray-100"></div>

      {/* Show in reverse order (latest at top) */}
      {[...statuses].reverse().map((status, index) => (
        <TimelineEvent
          key={index}
          status={status.status}
          description={status.description}
          date={status.date}
          time={status.time}
          isActive={index === 0}
          isLast={index === statuses.length - 1}
        />
      ))}
    </div>
  );
};

export default Timeline;
