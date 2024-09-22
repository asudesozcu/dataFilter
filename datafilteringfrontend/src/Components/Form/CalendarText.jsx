import { Calendar } from 'primereact/calendar';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { useGlobalContext } from "../../GlobalContext.jsx";

export default function CalendarText() {
    const { selectedDate, setSelectedDate } = useGlobalContext();

    const formattedDateString = selectedDate instanceof Date
        ? format(selectedDate, 'yyyy MMMM', { locale: tr })
        : 'No date selected';

    return (
        <div >
            <label htmlFor="calendarYearMonthText">Calendar Year Month Text</label>
            <div>
                <Calendar
                    variant="filled"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.value)}
                    view="month"
                    dateFormat="yy/mm"
                    placeholder="Select a date"
                    showButtonBar
                    readOnlyInput
                    showIcon
                />

            </div>
        </div>
            )
            }
