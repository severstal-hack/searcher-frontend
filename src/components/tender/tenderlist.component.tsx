import {SearchTendersFilters, useTenders} from "../../hooks/useTenders.hook.tsx";
import {forwardRef, useImperativeHandle} from "react";
import Loader from "../loader/loader.component.tsx";
import Pagination from "./pagination.component.tsx";

export type TenderListHandle = {
    refresh: (value: string, filters?: SearchTendersFilters) => void;
}

const TenderList = forwardRef<TenderListHandle>((_, ref) => {
    const {
        tenders,
        updateTenders,
        loading,
        pages,
        currentPage,
        nextPage, prevPage,
        setCurrentPage
    } = useTenders()

    useImperativeHandle(ref, () => {
        return {
            refresh: (value: string, filters?: SearchTendersFilters) => {
                updateTenders(value, filters)
            }
        }
    }, [updateTenders])

    const checkStatus = (status: string) => {
        switch (status) {
            case "OPEN":
                return "Открытый"
            case "CLOSED":
                return "Закрытый"
            default:
                return "-"
        }
    }

    if (loading)
        return <div className={"w-full h-full items-center flex justify-center"}>
            <Loader/>
        </div>

    if (!tenders || tenders.length === 0)
        return <></>

    return (
        <div className={"w-full mt-10 "}>
            {/*{tenders ? tenders.map(tender => <TenderCard tender={tender}/>) : "Ничего нет!"}*/}
            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            ИД
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Название
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Статус
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Компания
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Стоимость
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Дата публикации
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Дата начала
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Дата конца
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Сайт
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {tenders && tenders.map(tender =>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {tender.id}
                            </th>
                            <td className="px-6 py-4">
                                {tender.name}
                            </td>
                            <td className="px-6 py-4">
                                {checkStatus(tender.status)}
                            </td>
                            <td className="px-6 py-4">
                                {tender.company}
                            </td>
                            <td className="px-6 py-4">
                                {tender.price ? `${tender.price.value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} ${tender.price.currency}` : "-"}
                            </td>
                            <td className="px-6 py-4">
                                {tender.publishDate ? new Date(tender.publishDate * 1000).toLocaleDateString() : "-"}
                            </td>
                            <td className="px-6 py-4">
                                {tender.startDate ? new Date(tender.startDate * 1000).toLocaleDateString() : "-"}
                            </td>
                            <td className="px-6 py-4">
                                {tender.dueDate ? new Date(tender.dueDate * 1000).toLocaleDateString() : "-"}
                            </td>
                            <td className="px-6 py-4">
                                <a className={"text-blue-600 hover:underline"} href={tender.link}>{tender.domain}</a>
                            </td>

                        </tr>
                    )}
                    </tbody>
                </table>
                <Pagination onChangeCurrentPage={setCurrentPage} onNextPage={() => nextPage()}
                            onPrevPage={() => prevPage()} currentPage={currentPage}
                            totalPages={pages}/>
            </div>
        </div>
    );
});

export default TenderList;