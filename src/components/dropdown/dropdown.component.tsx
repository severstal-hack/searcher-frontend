import "./dropdown.component.css"
import {useRef, useState} from "react";
import * as React from "react";

interface Props {
    name: string;
    onSubmit: () => boolean;
    child: React.ReactNode
    buttonName?: string;
    withoutAccept?: boolean;
}

const Dropdown = ({name, child, onSubmit, buttonName, withoutAccept}: Props) => {
    const [selected, setSelected] = useState<boolean>(false)
    const menuRef = useRef<HTMLDivElement>(null)

    const switchMenu = () => {
        if (menuRef.current!.classList.contains("hidden")) {
            menuRef.current!.classList.remove("hidden")
            setSelected(true)
        } else {
            menuRef.current!.classList.add("hidden")
            setSelected(false)
        }
    }

    const onClick = () => {
        switchMenu()
    }

    const onSubmitHandle = () => {
        if (onSubmit())
            switchMenu()
    }

    return (
        <div className={"mr-5"}>
            <div className="relative inline-block w-60  text-left">
                <button id="dropdown-button"
                        onClick={onClick}
                        className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md shadow-sm  ">
                    {name}
                    <svg style={selected ? {transform: "rotate(180deg)"} : {}} xmlns="http://www.w3.org/2000/svg"
                         className="w-5 h-5 ml-2 -mr-1" viewBox="0 0 20 20"
                         fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd"
                              d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                              clipRule="evenodd"/>
                    </svg>
                </button>
                <div id="dropdown-menu"
                     ref={menuRef}
                     className="origin-top-right absolute right-0 mt-3 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 hidden">
                    <div className="py-2 p-2" role="menu" aria-orientation="vertical"
                         aria-labelledby="dropdown-button">
                        {child}
                        {withoutAccept ? null :
                            <button id="submit-button"
                                    onClick={onSubmitHandle}
                                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                {buttonName ? buttonName : "Применить"}
                            </button>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dropdown;