import PriceFilter from "./priceFilter.component.tsx";
import ExceptionalWordFilter from "./exceptionalFilter.component.tsx";
import DateFilter from "./dateFilter.component.tsx";
import {forwardRef, useImperativeHandle, useRef} from "react";
import {DropdownHandle} from "../dropdown/dropdown.component.tsx";

export type FiltersHandle = {
    closeAllFilters: () => void;
}

const Filters = forwardRef<FiltersHandle>((_, ref) => {
    const priceFilterRef = useRef<DropdownHandle>(null)
    const exceptionalWordFilterRef = useRef<DropdownHandle>(null)
    const dateFilterRef = useRef<DropdownHandle>(null)

    const closeAllFilters = () => {
        priceFilterRef.current?.close()
        exceptionalWordFilterRef.current?.close()
        dateFilterRef.current?.close()
    }

    const onClick = () => {
        closeAllFilters()
    }

    useImperativeHandle(ref, () => {
        return {
            closeAllFilters() {
                closeAllFilters()
            }
        }
    }, [])

    return (
        <div className={"root_filters flex select-none"}>
            <PriceFilter onClick={onClick} ref={priceFilterRef}/>
            <ExceptionalWordFilter onClick={onClick} ref={exceptionalWordFilterRef}/>
            <DateFilter onClick={onClick} ref={dateFilterRef}/>
            <div className="flex px-3 items-center  border border-gray-300 rounded-md shadow-sm">
                <input id="bordered-checkbox-1" type="checkbox" value="" name="bordered-checkbox"
                       className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded "/>
                <label htmlFor="bordered-checkbox-1"
                       className="w-full  ms-2 text-sm font-medium text-gray-900 ">Архивные</label>
            </div>
        </div>
    );
});

export default Filters;