import "./main.page.css"
import SearchInput from "../../components/search/searchinput.component.tsx";
import Filters from "../../components/filters/filters.components.tsx";

const MainPage = () => {
    return (
        <div className="h-screen grid grid-cols-6 grid-rows-3 gap-4">
            <div className={"col-start-2 row-start-2 col-span-4"}>
                <div className={"mb-5"}>
                    <SearchInput/>
                </div>
                <Filters/>
            </div>
        </div>);
};

export default MainPage;