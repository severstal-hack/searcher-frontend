import Dropdown from "../dropdown/dropdown.component.tsx";
import {useRef, useState} from "react";

interface IPrice {
    min?: number;
    max?: number;
}

const PriceFilter = () => {
    const [price, setPrice] = useState<IPrice>({})
    const [apply, setApply] = useState<string>("")

    const onChange = (delta: string, value: number) => {
        setPrice(prev => {
            return {...prev, [delta]: value}
        })
    }

    const onSubmit = (): boolean => {
        setApply(generateLabel())
        return true;
    }

    const generateLabel = () => {
        let str = ""
        if (price.min) str += `От: ${price.min} ₽`
        if (price.max) str += ` До: ${price.max} ₽`

        return str
    }

    const child = <>
        <div className={"flex flex-row p-2"}>
            <input onChange={(e) => onChange("min", Number.parseFloat(e.target.value))} type="number" id="first_name"
                   className="mr-5 text-center border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                   placeholder="От" required/>
            <input type="number" id="first_name"
                   onChange={(e) => onChange("max", Number.parseFloat(e.target.value))}
                   className="text-center  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                   placeholder="До" required/>
        </div>
    </>

    return (
        <div>
            <Dropdown onSubmit={onSubmit} child={child}
                      name={apply.length < 1 ? "Ограничение по цене" : apply}/>
        </div>
    );
};

export default PriceFilter;