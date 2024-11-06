import React, { useEffect, useRef, useState } from "react";
import { Calendar, DateObject } from "react-multi-date-picker";

import "./style.css";
import { FormInput } from "components/Inputs";
import Button from "components/Buttons";
import {
  CalenderIcon,
  ChevronDownRightIcon,
  ChevronUpRightIcon,
} from "components/Icons";
import useOnClickOutside from "hooks/useOutsideClick";

const DatePicker = ({ methods }) => {
  const [date, setDate] = useState(new DateObject());
  const [day, setDay] = useState("");
  const [years, setYears] = useState([]);
  const [showCalendar, setShowCalendar] = useState(true);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const currentYear = new Date().getFullYear();
  const startYear = 1990;
  const endYear = Math.min(currentYear, 2024);
  const newyears = [];
  const [month, setMonth] = useState("January");

  for (let year = startYear; year <= endYear; year++) {
    newyears.push(year);
  }

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showBox, setShowBox] = useState(false);
  const [val, setVal] = useState("January");
  const [yearVal, setYearVal] = useState(2024);
  const calendarRef = useRef(null);

  useEffect(() => {
    setYears(newyears);
  }, [date]);

  const handleDatePickerClose = (e) => {
    e.stopPropagation();
    setShowBox(false);
    setShowDatePicker(false);
  };

  useOnClickOutside(calendarRef, handleDatePickerClose);

  const handleDatePickerSelect = (selectedDate) => {
     setDate(selectedDate);
    setDay("1");
    setMonth(selectedDate.month.name);
    setYears(selectedDate.year);
    methods.setValue(
      "dob",
      `01/${selectedDate.day ? "01" : "01"}/${selectedDate.year}`
    );
    setShowCalendar(false);
  };

  const handleDivClick = (value, i, event) => {
    event.stopPropagation();
    setVal("January");
  };

  const handleYearClick = (value, event) => {
    event.stopPropagation();
    setYearVal(value);
  };

  return (
    <>
      <React.Fragment>
        {!showDatePicker && (
          <div className="relative !w-[210px] sm:!w-[257px] h-[56px] rounded-[30px]">
            <FormInput
              name="dob"
              label={"Date of Birth"}
              validations={{
                required: { value: true, message: "DOB is required" },
              }}
              placeholder="Select horse's DOB"
              onClick={(e) => {
                setShowBox(!showBox);
                e.stopPropagation();
              }}
              className="h-[60px] !w-[210px] sm:!w-[257px] rounded-[30px] outline-none relative"
            />
            <CalenderIcon
              onClick={(event) => {
                setShowBox(!showBox);
                event.stopPropagation();
              }}
              className="!absolute !w-5 !h-5 !bg-[#fff] !top-[15px] !right-[22px] !text-transparent"
            />
          </div>
        )}
        {showBox && !showDatePicker && (
          <>
            <div
              className="top-[310px] sm:top-[305px] shadow-lg w-[90%] sm:w-[427px] h-[356px] absolute z-10 left-5 sm:left-10 bg-[#fff] border border-black rounded-[10px]"
              onClick={(e) => e.stopPropagation()}
            >
              {!showDatePicker && (
                <div
                  className="month_head  space-x-[4px] py-[6px]  rounded-tl-[30px] rounded-tr-[30px] flex justify-center bg-white border-b border-[#999] relative font-bold items-center"
                  onClick={(e) => e.stopPropagation()}
                >
                  <p className="py-[16px] text-[20px]">
                    {val ? `${val}` : "January"} {yearVal}{" "}
                  </p>
                  <ChevronUpRightIcon
                    onClick={() => setShowDatePicker(true)}
                    className="!bg-transparent cursor-pointer !text-transparent  !absolute  !top-6 !right-[20px]"
                  />
                </div>
              )}

              {!showDatePicker && (
                <>
                  <div className="flex w-[100%]  sm:w-[100%] border border-[#999] h-[220px] justify-between">
                    <div className="w-[213.5px] overflow-hidden scrollbar overflow-y-scroll">
                      <div className="flex flex-col">
                        {months.map((m, i) => {
                          return (
                            <p
                              key={i}
                              className={`months_text cursor-pointer !text-center bg-transparent text-black"
                          }  mt-6  ${
                            val === m &&
                            "!bg-[#DEE6F0] font-bold py-[12px] text-black"
                          } `}
                              onClick={(e) => handleDivClick(m, i, e)}
                            >
                              {m}
                            </p>
                          );
                        })}
                      </div>
                    </div>
                    <div
                      className="months_text border border-[#999] h-[220px]
                     w-[250px] overflow-hidden scrollbar overflow-y-scroll"
                    >
                      <div className="flex flex-col">
                        {[...years].reverse().map((y, i) => {
                          return (
                            <p
                              key={i}
                              className={`bg-transparent cursor-pointer !text-center text-black"
                          }  mt-6  ${
                            y === yearVal &&
                            "!bg-[#DEE6F0] font-bold py-[12px]  text-black"
                          }  `}
                              onClick={(e) => handleYearClick(y, e)}
                            >
                              {y}
                            </p>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  <div>
                    <Button
                      size="14px"
                      onClick={() => {
                        setShowBox(false);
                        setShowDatePicker(true);
                      }}
                      className="apply_btn  my-[12px] pb-2 bg-[#2B364B] mx-auto text-[14px] !text-white rounded-3xl px-4 py-2 cursor-pointer"
                    >
                      Apply
                    </Button>
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </React.Fragment>

      {showDatePicker && (
        <div className="relative">
          <input
            value={`01/${day ? `01` : "01"}/${yearVal}`}
            type="text"
            placeholder="date and time"
            readOnly
            onClick={() => setShowCalendar(!showCalendar)}
            className=" calender-input text-[#999]  h-[56px] border border-[#999]
              w-[210px] sm:w-[257px] rounded-[30px]"
          />
          <CalenderIcon
            onClick={() => setShowDatePicker(false)}
            className="!absolute !top-[15px] !w-5 !h-5 !bg-[#fff] !right-[22px] !bg-transparent !text-transparent "
          />

          {showCalendar && (
            <div className="relative " onClick={(e) => e.stopPropagation()}>
              <div className="absolute z-10">
                <Calendar
                  ref={calendarRef}
                  style={{
                    marginTop: "10px",
                    borderRadius: "10px",
                  }}
                  // value={`${day ? `${day}` : "1"}/${val}/${yearVal}`}
                  value={`01 january ${yearVal}`}
                  format="DD/MMMM/YYYY"
                  calendarPosition="bottom-left"
                  onChange={handleDatePickerSelect}
                  buttons={false}
                  highlightToday={false}
                  className="custom-calendar  z-0"
                  inputClass="custom-input"
                  disableYearPicker
                  disableMonthPicker
                />
              </div>

              <ChevronDownRightIcon
                onClick={() => setShowDatePicker(false)}
                className="!absolute !text-transparent !top-9 !left-[400px] !z-50"
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default DatePicker;
