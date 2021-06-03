import React from 'react';
import { daysInMonth, MONTHS } from './index';

export default function DayCard({ dayOfWeek, dayOfMonth, today, year, month }) {
  const daysThisMonth = daysInMonth(month + 1, year);
  const getRealDayOfMonth = () => {
    if (dayOfMonth > 0) return dayOfMonth;
    if (dayOfMonth > daysThisMonth) return dayOfMonth - daysThisMonth;
    const daysLastMonth = daysInMonth(month, year);
    return daysLastMonth + dayOfMonth;
  };
  getRealDayOfMonth(0);
  return (
    <div className={`DayCard ${today ? 'green-back' : ''}`}>
      <div className={'day-of-month'}>{getRealDayOfMonth()}</div>
      <div className='day-of-week'>{dayOfWeek}</div>
    </div>
  );
}
