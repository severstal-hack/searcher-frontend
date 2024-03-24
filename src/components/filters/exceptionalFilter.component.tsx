import Dropdown, {DropdownHandle} from "../dropdown/dropdown.component.tsx";
import {forwardRef, useImperativeHandle, useRef, useState} from "react";
import Exception from "./exception.component.tsx";


interface Props {
    onClick: () => void;
}

const ExceptionalWordFilter = forwardRef<DropdownHandle, Props>(({onClick}, ref) => {
    const dropdownRef = useRef<DropdownHandle>(null)
    const [inputValue, setInputValue] = useState<string>("")
    const [words, setWords] = useState<string[]>([])

    const addWord = (word: string) => {
        if (!words.includes(word))
            setWords(prev => [...prev, word])
    }

    const deleteWord = (word: string) => {
        setWords(prev => prev.filter(w => w != word))
    }

    const onAddTag = () => {
        if (inputValue === "")
            return false;

        addWord(inputValue)
        return false
    }

    const onChangeValue = (value: string) => {
        setInputValue(value)
    }

    const onDeleteTag = (word: string) => {
        deleteWord(word)
    }

    useImperativeHandle(ref, () => {
        return {
            close() {
                dropdownRef.current?.close();
            }
        }
    }, [])

    const child = <div className={"p-2 w-full"}>
        <div className={"flex flex-row flex-wrap mb-2"}>
            {words.map(w => <Exception onClick={() => onDeleteTag(w)} name={w}/>)}
        </div>
        <input type="text"
               onChange={(e) => onChangeValue(e.target.value)}
               className="mr-5 col-span-4 w-full text-left  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 "
               placeholder="Ключевая фраза" required/>
    </div>
    return (
        <div>
            <Dropdown onOpenDropdown={onClick} ref={dropdownRef}
                      name={words.length > 0 ? `Исключено: ${words.length}` : "Исключения"}
                      buttonName={"Добавить"}
                      onSubmit={onAddTag}
                      child={child}/>
        </div>
    );
});

export default ExceptionalWordFilter;