import Dropdown, {DropdownHandle} from "../dropdown/dropdown.component.tsx";
import {Datepicker} from "flowbite-react";
import {forwardRef, useImperativeHandle, useRef} from "react";

interface Props {
    onClick: () => void;
}

const DateFilter = forwardRef<DropdownHandle, Props>(({onClick}, ref) => {
    const dropdownRef = useRef<DropdownHandle>(null)

    const child = <>
        <div className={"px-2"}>
            <div className={"flex items-center flex-row my-2"}>
                <span className={"mr-2 w-16"}>После: </span>
                <Datepicker showTodayButton={false} labelClearButton={"Очистить"} className={"col-start-1"}
                            weekStart={1} language={"ru-Ru"}/>
            </div>
            <div className={"flex items-center flex-row mb-2"}>
                <span className={"mr-2 w-16"}>До: </span>
                <Datepicker showTodayButton={false} labelClearButton={"Очистить"} className={"col-start-1"}
                            weekStart={1} language={"ru-Ru"}/>
            </div>
        </div>
    </>

    useImperativeHandle(ref, () => {
        return {
            close() {
                dropdownRef.current?.close();
            }
        }
    }, [])

    return (
        <div>
            <Dropdown onOpenDropdown={onClick} ref={dropdownRef} name={"Ограничение по дате"} withoutAccept={true}
                      onSubmit={() => true} child={child}/>
        </div>
    );
});

export default DateFilter;