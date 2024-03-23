import PriceFilter from "./priceFilter.component.tsx";
import ExceptionalWordFilter from "./exceptionalFilter.component.tsx";
import DateFilter from "./dateFilter.component.tsx";

const Filters = () => {
    return (
        <div className={"root_filters flex "}>
            <PriceFilter/>
            <ExceptionalWordFilter/>
            <DateFilter/>
        </div>
    );
};

export default Filters;