import {ReactNode} from "react";

type PaginationProps = {
    currentPage: number;
    totalPages: number;
    onPrevPage: () => void;
    onNextPage: () => void;
    onChangeCurrentPage: (page: number) => void;
}
const Pagination = ({currentPage, totalPages, onPrevPage, onNextPage, onChangeCurrentPage}: PaginationProps) => {
    const getPagination = () => {
        const lis: ReactNode[] = [];
        for (let i = 1; i <= totalPages; i++) {
            if (i === currentPage)
                lis.push(<li>
                    <a href="#" aria-current="page"
                       onClick={() => onChangeCurrentPage(i)}
                       className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">{i}</a>
                </li>)
            else
                lis.push(<li>
                    <a href="#"
                       onClick={() => onChangeCurrentPage(i)}
                       className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{i}</a>
                </li>)
        }

        return lis;
    }

    return (
        <nav className="flex items-center flex-column flex-wrap md:flex-row justify-end pt-4"
             aria-label="Table navigation">
            <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                <li>
                    <a href="#"
                       onClick={() => onPrevPage()}
                       className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Пред.</a>
                </li>
                {getPagination().map(li => li)}
                <li>
                    <a href="#"
                       onClick={() => onNextPage()}
                       className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">След.</a>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;