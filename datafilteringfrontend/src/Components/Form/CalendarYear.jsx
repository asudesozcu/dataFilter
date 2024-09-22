import {useState} from 'react';
import {format} from 'date-fns';

import {Calendar} from 'primereact/calendar';
import {useGlobalContext} from "../../GlobalContext.jsx";

export default function CalendarYear() {

    const {dates, setDates, startDate, endDate} = useGlobalContext();


    return (
        <div  >
            <label htmlFor="calendarYearMonth"> Choose Date Range</label>
            <div>

                <Calendar variant="filled"
                          value={dates}
                          onChange={(e) => setDates(e.value)}
                          view="month"
                          dateFormat="yy/mm"
                          selectionMode="range"
                          placeholder="Select a range"
                          readOnlyInput
                          showIcon
                          showButtonBar
                          hideOnRangeSelection/>

            </div>
            <input type="hidden" name="startDate" value={startDate}/>
            <input type="hidden" name="endDate" value={endDate}/>

        </div>

    )
}


