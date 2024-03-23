import "./main.page.css"
import SearchInput from "../../components/search/searchinput.component.tsx";
import Filters from "../../components/filters/filters.components.tsx";

const MainPage = () => {
    return (
        <div className="grid grid-cols-6 gap-4 mt-5">
            <div className={"col-start-2 col-span-4"}>
                <SearchInput/>
            </div>
            <div className={"col-start-2 col-span-4 "}>
                <Filters/>
            </div>
        </div>);
};

export default MainPage;