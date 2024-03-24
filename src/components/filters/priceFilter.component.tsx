import Dropdown, {DropdownHandle} from "../dropdown/dropdown.component.tsx";
import {forwardRef, useImperativeHandle, useRef, useState} from "react";

interface IPrice {
    min?: number;
    max?: number;
}

interface Props {
    onClick: () => void;
}


const PriceFilter = forwardRef<DropdownHandle, Props>(({onClick}: Props, ref) => {
    const dropdownRef = useRef<DropdownHandle>(null)
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
        if (price.min) str += `От: ${price.min.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} ₽`
        if (price.max) str += ` До: ${price.max.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} ₽`

        return str
    }

    useImperativeHandle(ref, () => {
        return {
            close() {
                dropdownRef.current?.close()
            }
        }
    }, [])

    const child = <>
        <div className={"flex flex-row p-2"}>
            <input onChange={(e) => onChange("min", Number.parseFloat(e.target.value))} type="number" id="first_name"
                   className="w-full mr-5  text-center border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 "
                   placeholder="От" required/>
            <input type="number" id="first_name"
                   onChange={(e) => onChange("max", Number.parseFloat(e.target.value))}
                   className="w-full text-center  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 "
                   placeholder="До" required/>
        </div>
    </>

    return (
        <div>
            <Dropdown onOpenDropdown={onClick} ref={dropdownRef} onSubmit={onSubmit} child={child}
                      name={apply.length < 1 ? "Ограничение по цене" : apply}/>
        </div>
    );
});

export default PriceFilter;