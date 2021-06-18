import React, { useState } from 'react';
import DayCard from './DayCard';
import DetailedSchedule from './DetailedSchedule';

export const MONTHS = [
  'JANUARY',
  'FEBRUARY',
  'MARCH',
  'APRIL',
  'MAY',
  'JUNE',
  'JULY',
  'AUGUST',
  'SEPTEMBER',
  'OCTOBER',
  'NOVEMBER',
  'DECEMBER',
];
export const DAYS_OF_WEEK = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

const Schedules = ({ schedules, foodCart, user }) => {
  const date = new Date();
  const year = date.getFullYear();
  const [month, setMonth] = useState(MONTHS[date.getMonth()]);
  const [dayOfWeek, setDayOfWeek] = useState(DAYS_OF_WEEK[date.getDay()]);
  const [dayOfMonth, setDayOfMonth] = useState(date.getDate());
  const [viewingNextWeek, setViewingNextWeek] = useState(false);
  const daysThisMonth = daysInMonth(date.getMonth() + 1, year);
  const getCalendarCards = () => {
    const cards = [];
    for (let i = 0; i < 7; i++) {
      let myDayOfMonth = i - DAYS_OF_WEEK.indexOf(dayOfWeek) + dayOfMonth;
      if (myDayOfMonth > daysThisMonth) {
        myDayOfMonth = myDayOfMonth - daysThisMonth;
      }
      const myDayOfWeek = DAYS_OF_WEEK[i];
      cards.push(
        <DayCard
          dayOfWeek={myDayOfWeek}
          dayOfMonth={myDayOfMonth}
          key={i}
          year={year}
          month={date.getMonth()}
          today={dayOfMonth === myDayOfMonth ? true : false}
          onClick={() => {
            setDayOfMonth(myDayOfMonth);
            setDayOfWeek(myDayOfWeek);
          }}
        />
      );
    }
    return cards;
  };

  console.log('$$THESE ARE THE SCHEDULES$$', schedules);
  return (
    <div className='Schedules'>
      <div className='top-calendar'>
        <div className='schedule-header'>
          <div>WEEKLY SCHEDULE</div>
          {user.id === foodCart.user_id && (
            <a
              className='add-schedule'
              href={`/food_carts/${foodCart.id}/schedules/new`}>
              + ADD SCHEDULE{' '}
              {console.log(user.id, foodCart.user_id, 'FRIED PLUTONIUM')}
            </a>
          )}
        </div>
        <h2>{foodCart.name}</h2>
        <div
          style={{
            justifyContent: 'center',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
          }}>
          <div className='seperator' />

          <div className='month-btn-container'>
            <button
              className='next-week-btn'
              onClick={() => {
                if (viewingNextWeek) {
                  setDayOfMonth(date.getDate());
                  setDayOfWeek(DAYS_OF_WEEK[date.getDay()]);
                  setMonth(MONTHS[date.getMonth()]);
                  setViewingNextWeek(false);
                }
              }}>
              ˂
            </button>
            <div className='month-name'>{month}</div>
            <button
              className='next-week-btn'
              onClick={() => {
                if (!viewingNextWeek) {
                  setDayOfMonth(dayOfMonth + 7);
                  setViewingNextWeek(true);
                  if (dayOfMonth + 7 > daysThisMonth) {
                    const nextMonth = MONTHS[date.getMonth() + 1];
                    setMonth(nextMonth ? nextMonth : MONTHS[0]);
                  }
                }
              }}>
              ˃
            </button>
          </div>
        </div>
        <div className='calendar-cards-container'>
          {getCalendarCards().map((card) => card)}
        </div>
      </div>
      <div className='detailed-schedules'>
        <DetailedSchedule
          schedules={schedules}
          dayOfWeek={dayOfWeek}
          dayOfMonth={dayOfMonth}
          year={year}
          month={month}
          isToday={true}
        />
        <DetailedSchedule
          schedules={schedules}
          dayOfWeek={DAYS_OF_WEEK[date.getDay() + 1]}
          dayOfMonth={dayOfMonth + 1}
          year={year}
          month={month}
          isToday={false}
        />
        <DetailedSchedule
          schedules={schedules}
          dayOfWeek={DAYS_OF_WEEK[date.getDay() + 2]}
          dayOfMonth={dayOfMonth + 2}
          year={year}
          month={month}
          isToday={false}
        />
      </div>
    </div>
  );
};
export function daysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
}
export default Schedules;
