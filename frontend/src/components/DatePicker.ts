import { Component } from 'react';
import { useState } from 'react';
import { DateRangePicker, DateRangePickerValue } from '@mantine/dates';

function DatePicker() {
    const [value, setValue] = useState<DateRangePickerValue>([
        new Date(2021, 11, 1),
        new Date(2021, 11, 5),
    ]);

    return (
        <DateRangePicker
        pb= 'xl'
    placeholder = 'Pick date range'
    value = { dateRange }
    onChange = { setDateRange }
    firstDayOfWeek = "sunday"
        />
    );
}

export default DatePicker