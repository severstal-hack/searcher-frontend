import Dropdown from "../dropdown/dropdown.component.tsx";
import PriceFilter from "./priceFilter.component.tsx";

const Filters = () => {
    return (
        <div className={"root_filters flex "}>
            <PriceFilter/>
            <Dropdown child={<h1>test2</h1>} name={"Ограничение по дате"}/>
        </div>
    );
};

export default Filters;