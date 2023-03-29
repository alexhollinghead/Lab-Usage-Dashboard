import { DateRangePicker } from '@mantine/dates';

export default function DatePicker({date, setDate}){
       return(    
        <DateRangePicker
            pb='xl'
            placeholder='Pick date range'
            value={date}
            onChange={setDate}
            firstDayOfWeek="sunday"
        />
    )}