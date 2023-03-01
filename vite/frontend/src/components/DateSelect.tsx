import { useState, useEffect } from 'react';
import { DateRangePicker, DateRangePickerValue } from '@mantine/dates';

function DateSelect () {
    
    const [dateRange, setDateRange] = useState<DateRangePickerValue>([
      new Date(2021, 8, 1),
      new Date(2022, 12, 25)
    ]);


    return(
        <DateRangePicker
                pb='xl'
                placeholder='Pick date range'
                value={dateRange}
                onChange={setDateRange}
                firstDayOfWeek="sunday"
              />
    );
}

export default DateSelect;