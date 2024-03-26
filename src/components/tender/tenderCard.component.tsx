import Tender from "../../domain/tender.ts";

interface TenderCardProps {
    tender: Tender;
}

const TenderCard = ({tender}: TenderCardProps) => {
    return (
        <div
            className={"w-full grid grid-cols-2 border gap-2 border-gray-300 rounded-md h-40 hover:shadow-xl transition-all"}>
            <div className={"flex flex-col items-center bg-blue-600"}>
                <h1>{tender.id}</h1>
            </div>
            <div className={"flex flex-col items-center bg-blue-600"}> 2</div>
        </div>
    );
};

export default TenderCard;
