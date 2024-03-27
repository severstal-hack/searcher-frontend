import {useState} from "react";
import Tender from "../domain/tender.ts";
import api from "../api.ts";

export interface SearchTendersFilters {
    excludes?: string[];
    date?: {
        after?: Date;
        before?: Date;
    };
    includeArchive?: boolean;
}


const t = [
    {
        "id": "ID 876689",
        "name": "Седельный тягач КАМАЗ 65116-7010-48(A5) (T2230) - 3 ед.; Самосвал специальный автомобиль- КАМАЗ 45143-776012-50 (45143-50)-3ед.. Реализация поштучно. Самовывоз из Ставропольский край, г. Минеральные Воды, ул. Советская, 20 (id876689)",
        "status": "OPEN",
        "company": "КАМАЗ",
        "price": null,
        "publishDate": null,
        "startDate": null,
        "dueDate": 1712056200,
        "domain": "tender.pro",
        "link": "https://www.tender.pro/api/landings/etp/api/tender/876689/view_public"
    },
    {
        "id": "ID 876180",
        "name": "ПРЗ реализует Автомобиль УАЗ-315195,инв.№500321000,г.в.2008,ПТС есть. Местонахождение о/х \"Красноборское\" (id876180)",
        "status": "OPEN",
        "company": "КАМАЗ",
        "price": null,
        "publishDate": null,
        "startDate": null,
        "dueDate": 1712905800,
        "domain": "tender.pro",
        "link": "https://www.tender.pro/api/landings/etp/api/tender/876180/view_public"
    },
    {
        "id": "ID 875755",
        "name": "Оказание услуг автоэвакуатора (грузоподъёмность не менее 3000 кг, размеры платформы не менее 5000х2400 мм) для транспортировки автомобиля ГАЗ-22177 от ул.Пограничников, 40 до ул.Шумяцкого, 8 к месту проведения технического осмотра (2 рейса) ООО «ИСО» в г.Красноярске в апреле 2024г (id875755)",
        "status": "OPEN",
        "company": "Филиал ИСО в г.Красноярск",
        "price": null,
        "publishDate": null,
        "startDate": null,
        "dueDate": 1712606400,
        "domain": "tender.pro",
        "link": "https://www.tender.pro/api/landings/etp/api/tender/875755/view_public"
    },
    {
        "id": "ID 875278",
        "name": "Конкурсный отбор по предоставлению услуг по техническому обслуживанию автомобилей ГАЗ 3221, ГАЗ-2752 для АО «Кремний» в 2024г. (id823285) (4-й этап торгов) (id875278)",
        "status": "OPEN",
        "company": "РУСАЛ Кремний",
        "price": null,
        "publishDate": null,
        "startDate": null,
        "dueDate": 1711569600,
        "domain": "tender.pro",
        "link": "https://www.tender.pro/api/landings/etp/api/tender/875278/view_public"
    },
    {
        "id": "ID 875361",
        "name": "Техническое обслуживание автомобиля ГАЗ-231073-00710 \"Соболь\" 2022 г.в., оснащенного двигателем Evotech (А275), системой полного привода 4х4, в объеме ТО-45, ТО-60 (id875361)",
        "status": "OPEN",
        "company": "ГК ЛокоТех",
        "price": null,
        "publishDate": null,
        "startDate": null,
        "dueDate": 1711915200,
        "domain": "tender.pro",
        "link": "https://www.tender.pro/api/landings/etp/api/tender/875361/view_public"
    },
    {
        "id": "ID 874306",
        "name": "Автомобиль Mercedes-Benz Actros 1841LS 4*2 3600 vin Z9M9340325G744268 гос.н. Т883АК Инв. Б00000179. Пробег 1435358км (id874306)",
        "status": "OPEN",
        "company": "КАМАЗ",
        "price": null,
        "publishDate": null,
        "startDate": null,
        "dueDate": 1711710600,
        "domain": "tender.pro",
        "link": "https://www.tender.pro/api/landings/etp/api/tender/874306/view_public"
    },
    {
        "id": "ID 874280",
        "name": "Услуга по оказанию вызгрузки П/В и автомобилей с сырьевыми материалами в Б/Б на склад или в приемный бункер (id874280)",
        "status": "OPEN",
        "company": "Саратовстройстекло",
        "price": null,
        "publishDate": null,
        "startDate": null,
        "dueDate": 1711486800,
        "domain": "tender.pro",
        "link": "https://www.tender.pro/api/landings/etp/api/tender/874280/view_public"
    },
    {
        "id": "ID 874094",
        "name": "АО МАЗ \"МОСКВИЧ\" реализует комплектующие к автомобилям (5 наименований- кронштейны,блоки, динамики,болты). г.Москва. (id874094)",
        "status": "OPEN",
        "company": "КАМАЗ",
        "price": null,
        "publishDate": null,
        "startDate": null,
        "dueDate": 1712646600,
        "domain": "tender.pro",
        "link": "https://www.tender.pro/api/landings/etp/api/tender/874094/view_public"
    },
    {
        "id": "ID 873528",
        "name": "текущий ремонт автомобиля КАМАЗ (id873528)",
        "status": "OPEN",
        "company": "ГК ЛокоТех",
        "price": null,
        "publishDate": null,
        "startDate": null,
        "dueDate": 1711569600,
        "domain": "tender.pro",
        "link": "https://www.tender.pro/api/landings/etp/api/tender/873528/view_public"
    },
    {
        "id": "ID 872403",
        "name": "Автомобиль Renault Fluence E E2B MR M гос.№ Н637УЕ инв. № 429545000 г.в. 2011 (id872403)",
        "status": "OPEN",
        "company": "КАМАЗ",
        "price": null,
        "publishDate": null,
        "startDate": null,
        "dueDate": 1712214600,
        "domain": "tender.pro",
        "link": "https://www.tender.pro/api/landings/etp/api/tender/872403/view_public"
    },
    {
        "id": "ID 872286",
        "name": "Автомобиль HYUNDAI IX35 , год выпуска 2014, инв.№ 1407011200; Шины зимние 225/60 R17 103Т \"Nokian Nordman-7\" 4 шт, год 2020, ном.№ Z00706910151176, место нахождения г.Белебей (id872286)",
        "status": "OPEN",
        "company": "КАМАЗ",
        "price": null,
        "publishDate": null,
        "startDate": null,
        "dueDate": 1712301000,
        "domain": "tender.pro",
        "link": "https://www.tender.pro/api/landings/etp/api/tender/872286/view_public"
    },
    {
        "id": "ID 872280",
        "name": "Автомобиль КIА SORENTO, год выпуска 2016, инв.№ 2007011800; Шины зимние 235/60 R18. \"Nokian Nordman-7\" 4 шт, год 2020, ном.№ Z00706912235600 (id872280)",
        "status": "OPEN",
        "company": "КАМАЗ",
        "price": null,
        "publishDate": null,
        "startDate": null,
        "dueDate": 1712301000,
        "domain": "tender.pro",
        "link": "https://www.tender.pro/api/landings/etp/api/tender/872280/view_public"
    },
    {
        "id": "ID 872278",
        "name": "Автомобиль легковой FORD FOCUS, год выпуска 2007, инв.№ 542753000 (РИЗ) (id872278)",
        "status": "OPEN",
        "company": "КАМАЗ",
        "price": null,
        "publishDate": null,
        "startDate": null,
        "dueDate": 1712301000,
        "domain": "tender.pro",
        "link": "https://www.tender.pro/api/landings/etp/api/tender/872278/view_public"
    },
    {
        "id": "ID 872053",
        "name": "Автомобиль ВАЗ 11113 \"ОКА\", год выпуска 1999, инв.№ 000504025 (КАМЭР) (id872053)",
        "status": "OPEN",
        "company": "КАМАЗ",
        "price": null,
        "publishDate": null,
        "startDate": null,
        "dueDate": 1712301000,
        "domain": "tender.pro",
        "link": "https://www.tender.pro/api/landings/etp/api/tender/872053/view_public"
    },
    {
        "id": "ID 872045",
        "name": "Автомобиль ВАЗ 21144-22-010, год выпуска 2009, инв.№ 000504048 (КАМЭР) (id872045)",
        "status": "OPEN",
        "company": "КАМАЗ",
        "price": null,
        "publishDate": null,
        "startDate": null,
        "dueDate": 1712301000,
        "domain": "tender.pro",
        "link": "https://www.tender.pro/api/landings/etp/api/tender/872045/view_public"
    },
    {
        "id": "ID 870164",
        "name": "ОП АО «СибВАМИ» в г.Красноярске: отбор покупателей НПА (автомобили УАЗ-220694-04, УАЗ-3163-223; буровая установка ПБУ-2-21 на шасси УРАЛ-4320-41). (id853062) (2-й этап торгов) ЛОТ ДЕЛИМЫЙ (id870164)",
        "status": "OPEN",
        "company": "РУСАЛ Менеджмент (непрофильные активы)",
        "price": null,
        "publishDate": null,
        "startDate": null,
        "dueDate": 1712606400,
        "domain": "tender.pro",
        "link": "https://www.tender.pro/api/landings/etp/api/tender/870164/view_public"
    },
    {
        "id": "ID 869291",
        "name": "Ремонт сколов и трещин на лобовых стеклах автомобилей (id859104) (2-й этап торгов) (id869291)",
        "status": "OPEN",
        "company": "РУСАЛ Краснотурьинск",
        "price": null,
        "publishDate": null,
        "startDate": null,
        "dueDate": 1711569600,
        "domain": "tender.pro",
        "link": "https://www.tender.pro/api/landings/etp/api/tender/869291/view_public"
    },
    {
        "id": "ID 869116",
        "name": "Покупка автомобиля для нужд ООО «Тайшет -Энергия» г. Тайшет, Иркутской области УАЗ 390995-500-04. Комби 7 мест \"Юбилейный\", поставка в г. Иркутск (id869116)",
        "status": "OPEN",
        "company": "ТАЙШЕТ-ЭНЕРГИЯ",
        "price": null,
        "publishDate": null,
        "startDate": null,
        "dueDate": 1711742400,
        "domain": "tender.pro",
        "link": "https://www.tender.pro/api/landings/etp/api/tender/869116/view_public"
    },
    {
        "id": "ID 867755",
        "name": "ООО \"КрасКом\" (склад г. Красноярск) продает автомобили и др. автотехнику б/у (id867755)",
        "status": "OPEN",
        "company": "Краском",
        "price": null,
        "publishDate": null,
        "startDate": null,
        "dueDate": 1717444800,
        "domain": "tender.pro",
        "link": "https://www.tender.pro/api/landings/etp/api/tender/867755/view_public"
    },
    {
        "id": "ID 867485",
        "name": "АО \"МАЗ \"МОСКВИЧ\" реализует МПЗ (комплектующие к автомобилям -321 наименования). Месторасположение г.Москва (id867485)",
        "status": "OPEN",
        "company": "КАМАЗ",
        "price": null,
        "publishDate": null,
        "startDate": null,
        "dueDate": 1711696200,
        "domain": "tender.pro",
        "link": "https://www.tender.pro/api/landings/etp/api/tender/867485/view_public"
    },
    {
        "id": "ID 867461",
        "name": "АО \"МАЗ \"МОСКВИЧ\" реализует МПЗ (комплектующие к автомобилям -23 наименования). Месторасположение г.Москва (id867461)",
        "status": "OPEN",
        "company": "КАМАЗ",
        "price": null,
        "publishDate": null,
        "startDate": null,
        "dueDate": 1711696200,
        "domain": "tender.pro",
        "link": "https://www.tender.pro/api/landings/etp/api/tender/867461/view_public"
    }
]

export const useTenders = () => {
    const pageSize = 10;
    const [tenders, setTenders] = useState<Tender[]>()
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [count, setCount] = useState<number>(0)
    const [loading, setLoading] = useState<boolean>(false)
    const fetchData = async (query: string, filters?: SearchTendersFilters) => {
        // setTenders(t)
        // setCount(t.length)
        setLoading(true)
        try {
            let uri = `/parse?query=${query}`
            if (filters)
                uri += buildFiltersQuery(filters)
            const res = await api.get(uri)
            const body = await res.json();
            console.log(body)
            if (res.status !== 200)
                throw new Error(body.message)
            console.log(tenders)
            setTenders(body.tenders)
            setCount(body.count)
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    const buildFiltersQuery = (filters: SearchTendersFilters): string => {
        let query = ""
        if (filters.includeArchive)
            query += "&include_archive=true"
        if (filters.date) {
            if (filters.date.after) {
                const d = filters.date.after
                console.log("FILTER AFTER: ", d)
                query += `&start_date=${d.getDate()}.${d.getMonth()+1}.${d.getFullYear()}`
            }
            if (filters.date.before) {
                const d = filters.date.before
                console.log("FILTER BEFORE: ", d)
                query += `&end_date=${d.getDate()}.${d.getMonth()+1}.${d.getFullYear()}`
            }
        }
        if (filters.excludes) {
            filters.excludes.forEach(exclude => query += `&exclude=${exclude}`)
        }

        return query;
    }

    const nextPage = () => {
        const pages = Math.round(count / pageSize);
        if (currentPage === pages)
            return;

        setCurrentPage(page => page + 1)
    }

    const prevPage = () => {
        if (currentPage === 1)
            return;

        setCurrentPage(page => page - 1)
    }

    return {
        tenders: tenders?.slice((currentPage - 1) * pageSize, currentPage * pageSize),
        count,
        loading,
        updateTenders: fetchData,
        pages: Math.round(count / pageSize),
        nextPage,
        prevPage,
        currentPage,
        setCurrentPage: setCurrentPage
    }
}