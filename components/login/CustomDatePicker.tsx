import 'react-day-picker/dist/style.css';
import { DayPicker } from "react-day-picker";

export default function CustomDatePicker({ date, setDate }: { date: Date | undefined; setDate: any }) {
    return <DayPicker
        mode="single"
        selected={ date }
        onSelect={ setDate }
        captionLayout="dropdown-buttons"
        fromYear={ 1900 }
        toYear={ 2025 }
        weekStartsOn={1}
        classNames={ {
            caption_label: 'flex items-center text-sm font-medium',
            dropdown: 'rdp-dropdown bg-card',
            dropdown_icon: 'ml-2',
            dropdown_year: 'rdp-dropdown_year ml-3',
            button: '',
            button_reset: '',
        } }
    />
}
