import Dropdown, {DropdownHandle} from "../dropdown/dropdown.component.tsx";
import {Datepicker} from "flowbite-react";
import {forwardRef, useImperativeHandle, useRef, useState} from "react";

interface Props {
    onClick: () => void;
}

export type DateFilterHandler = {
    close: () => void;
    getDates: () => { after?: Date, before?: Date };
}

const DateFilter = forwardRef<DateFilterHandler, Props>(({onClick}, ref) => {
    const [after, setAfter] = useState<Date | undefined>(undefined)
    const [before, setBefore] = useState<Date | undefined>(undefined)
    const dropdownRef = useRef<DropdownHandle>(null)

    const child = <>
        <div className={"px-2"}>
            <div className={"flex items-center flex-row my-2"}>
                <span className={"mr-2 w-16"}>После: </span>
                <Datepicker
                    onSelectedDateChanged={(d) => setAfter(d)}
                    showTodayButton={false} labelClearButton={"Очистить"}
                    className={"col-start-1"}
                    weekStart={1} language={"ru-Ru"}/>
            </div>
            <div className={"flex items-center flex-row mb-2"}>
                <span className={"mr-2 w-16"}>До: </span>
                <Datepicker
                    onSelectedDateChanged={(d) => setBefore(d)}
                    showTodayButton={false} labelClearButton={"Очистить"} className={"col-start-1"}
                    weekStart={1} language={"ru-Ru"}/>
            </div>
        </div>
    </>

    useImperativeHandle(ref, () => {
        return {
            close() {
                dropdownRef.current?.close();
            },
            getDates() {
                return {
                    after: after,
                    before: before,
                }
            }
        }
    }, [after, before])

    return (
        <div>
            <Dropdown onOpenDropdown={onClick} ref={dropdownRef} name={"Ограничение по дате"} withoutAccept={true}
                      onSubmit={() => true} child={child}/>
        </div>
    );
});

export default DateFilter;