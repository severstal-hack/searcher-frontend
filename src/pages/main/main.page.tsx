import "./main.page.css"
import SearchInput from "../../components/search/searchinput.component.tsx";
import Filters, {FiltersHandle} from "../../components/filters/filters.components.tsx";
import {useRef} from "react";
import TenderList, {TenderListHandle} from "../../components/tender/tenderlist.component.tsx";

const MainPage = () => {
    const filtersRef = useRef<FiltersHandle>(null)
    const tenderListRef = useRef<TenderListHandle>(null)

    const onSearch = (value: string) => {
        tenderListRef.current?.refresh(value)
    }

    return (
        <div className="min-h-screen grid grid-cols-6 pt-5 bg-gray-100 pb-10 overflow-hidden">
            <div className={"col-start-2  col-span-4"}>
                <div className={"mb-5"}>
                    <SearchInput onSearch={onSearch} onFocus={() => filtersRef.current?.closeAllFilters()}/>
                </div>
                <Filters ref={filtersRef}/>
                <TenderList ref={tenderListRef}/>
            </div>
        </div>);
};

export default MainPage;