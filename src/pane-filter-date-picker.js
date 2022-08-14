import React, { useState,forwardRef,useEffect } from "react";
import DatePicker from "react-datepicker";
import moment from 'moment';
import "react-datepicker/dist/react-datepicker.css";

export function PaneDatepicker(props){
    const [endDate, setEndDate] = useState(props.endDate);
    const [startDate, setStartDate] = useState(props.startDate);
    const handleCalendarChangeStartDate = () => props.onStartDateChange(moment(startDate).valueOf());
    const handleCalendarChangeEndDate = () => props.onEndDateChange(moment(endDate).valueOf());
    const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
      <button className="example-custom-input" onClick={onClick} ref={ref}>
        {value}
      </button>
    ));
    
    console.log("RENDERN KLAPPR WENIGESRTEN");
    console.log(props.endDate);
    console.log(props.startDate);

    useEffect(() => {setStartDate(props.startDate);setEndDate(props.endDate);  });

    return (
        
        <div className={props.toggle ? 'boardsFlexCompetitor': 'boardsFlexCompetitor boardsFlexTimeClosed'}>
            <div className="wrapper">
                
                <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    customInput={<ExampleCustomInput />}
                    onCalendarClose={handleCalendarChangeStartDate}
                    withPortal
                />
                
            </div>
            <div className="wrapper">
                
                <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    customInput={<ExampleCustomInput />}
                    onCalendarClose={handleCalendarChangeEndDate}
                    withPortal
                />
                
            </div>
        </div>
    );
  };