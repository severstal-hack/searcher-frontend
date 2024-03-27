import ExceptionalWordFilter, {ExceptionalWordFilterHandler} from "./exceptionalFilter.component.tsx";
import DateFilter, {DateFilterHandler} from "./dateFilter.component.tsx";
import {forwardRef, useImperativeHandle, useRef, useState} from "react";
import {SearchTendersFilters} from "../../hooks/useTenders.hook.tsx";

export type FiltersHandle = {
    closeAllFilters: () => void;
    getAllFilters: () => SearchTendersFilters
}

const Filters = forwardRef<FiltersHandle>((_, ref) => {
    const exceptionalWordFilterRef = useRef<ExceptionalWordFilterHandler>(null)
    const dateFilterRef = useRef<DateFilterHandler>(null)
    const [includeArchive, setIncludeArchive] = useState<boolean>(false)

    const closeAllFilters = () => {
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
            },
            getAllFilters() {
                const filters = {
                    excludes: exceptionalWordFilterRef.current?.getExceptionalWords(),
                    date: dateFilterRef.current?.getDates(),
                    includeArchive: includeArchive,
                }
                console.log(filters)

                return filters
            }
        }
    }, [])

    return (
        <div className={"root_filters flex select-none"}>
            <ExceptionalWordFilter onClick={onClick} ref={exceptionalWordFilterRef}/>
            <DateFilter onClick={onClick} ref={dateFilterRef}/>
            <div className="flex px-3 items-center  border border-gray-300 rounded-md shadow-sm">
                <input checked={includeArchive} onChange={() => setIncludeArchive(prev => !prev)}
                       id="bordered-checkbox-1" type="checkbox" value="" name="bordered-checkbox"
                       className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded "/>
                <label htmlFor="bordered-checkbox-1"
                       className="w-full  ms-2 text-sm font-medium text-gray-900 ">Архивные</label>
            </div>
        </div>
    );
});

export default Filters;