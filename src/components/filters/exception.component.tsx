import {useRef} from "react";

interface Props {
    name: string;
    onClick: () => void
}

const Exception = ({name, onClick}: Props) => {
    const dotRef = useRef<HTMLSpanElement>(null)

    const red = () => {
        if (dotRef.current!.classList.contains("bg-blue-600")) {
            dotRef.current!.classList.remove("bg-blue-600")
        }

        dotRef.current!.classList.add("bg-red-600")
    }

    const blue = () => {
        if (dotRef.current!.classList.contains("bg-red-600"))
            dotRef.current!.classList.remove("bg-red-600")

        dotRef.current!.classList.add("bg-blue-600")
    }

    return (
        <div
            onClick={() => onClick()}
            onMouseEnter={() => red()}
            onMouseLeave={() => blue()}
            className="m-1 text-xs inline-flex items-center font-bold leading-sm  px-3 py-1 bg-blue-200 text-blue-500 rounded-full hover:cursor-pointer"
        >
            <span ref={dotRef} className="flex w-2.5 h-2.5 bg-blue-600 rounded-full me-1.5 flex-shrink-0"></span>
            {name}
        </div>
    );
};

export default Exception;