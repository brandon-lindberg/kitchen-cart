import React from "react";
import { daysInMonth, MONTHS } from "./index";
import { useTranslation } from "react-i18next";

export default function DayCard({
  dayOfWeek,
  dayOfMonth,
  today,
  year,
  month,
  lightBorder,
  onClick,
}) {
  const t = useTranslation().t;
  const MONTHS = [
    t("month.jan"),
    t("month.feb"),
    t("month.mar"),
    t("month.apr"),
    t("month.may"),
    t("month.jun"),
    t("month.jul"),
    t("month.aug"),
    t("month.sep"),
    t("month.oct"),
    t("month.nov"),
    t("month.dec"),
  ];
  const daysThisMonth = daysInMonth(
    typeof month === "number" ? month + 1 : MONTHS.indexOf(month) + 1,
    year
  );
  const getRealDayOfMonth = () => {
    console.log("HEY!: ", month, year, daysThisMonth, dayOfMonth, today);
    if (dayOfMonth > daysThisMonth) return dayOfMonth - daysThisMonth;
    if (dayOfMonth > 0) return dayOfMonth;
    const daysLastMonth = daysInMonth(
      typeof month === "number" ? month : MONTHS.indexOf(month),
      year
    );
    console.log(daysLastMonth);
    return daysLastMonth + dayOfMonth;
  };
  getRealDayOfMonth(0);
  return (
    <div
      onClick={onClick ? onClick : () => {}}
      className={`DayCard ${today ? "green-back" : ""} ${
        lightBorder && "light-border"
      }`}
    >
      <div className={"day-of-month"}>{getRealDayOfMonth()}</div>
      <div className="day-of-week">{dayOfWeek}</div>
    </div>
  );
}
