import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {ChangeEvent, useEffect, useState, useTransition} from "react";
import {FaFemale, FaMale} from "react-icons/fa";
import {Selection} from "@nextui-org/react";
import useFilterStore from "@/hooks/useFilterStore";
import usePaginationStore from "@/hooks/usePaginationStore";

export const useFilters = () => {

    const pathname = usePathname()
    const searchParams = useSearchParams()
    const router = useRouter()
    const [clientLoaded, setClientLoaded] = useState(false)
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        setClientLoaded(true)
    }, [])

    const {filters, setFilters} = useFilterStore()
    const {pageNumber, pageSize, setPage, totalCount} = usePaginationStore(state => ({
        pageNumber: state.pagination.pageNumber,
        pageSize: state.pagination.pageSize,
        setPage: state.setPage,
        totalCount: state.pagination.totalCount
    }))
    const {gender, ageRange, orderBy, withPhoto} = filters

    useEffect(() => {
        if (gender || ageRange || orderBy) {
            setPage(1)
        }
    }, [ageRange, gender, orderBy, setPage]);

    useEffect(() => {
        startTransition(() => {
            const searchParams = new URLSearchParams()

            if (gender) searchParams.set("gender", gender.join(","))
            if (ageRange) searchParams.set("ageRange", ageRange.join(","))
            if (orderBy) searchParams.set('orderBy', orderBy);
            if (pageSize) searchParams.set('pageSize', pageSize.toString());
            if (pageNumber) searchParams.set('pageNumber', pageNumber.toString());
            searchParams.set('withPhoto', withPhoto.toString());

            router.replace(`${pathname}?${searchParams}`)
        })
    }, [gender, ageRange, orderBy, router, pathname, pageSize, pageNumber, withPhoto]);

    const orderByList = [{label: "Last Active", value: "updated"}, {label: "Newest members", value: "created"}]
    const genderList = [{value: "male", icon: FaMale}, {value: "female", icon: FaFemale}]

    const handleAgeSelect = (value: number[]) => {
        setFilters("ageRange", value)
    }

    const handleOrderSelect = (value: Selection) => {
        if (value instanceof Set) {
            setFilters("orderBy", value.values().next().value)
        }
    }

    const handleGenderSelect = (value: string) => {
        if (gender.includes(value)) {
            setFilters("gender", gender.filter(g => g !== value))
        } else {
            setFilters("gender", [...gender,  value])
        }
    }

    const handleWithPhotoToggle = (e: ChangeEvent<HTMLInputElement>) => {
        setFilters('withPhoto', e.target.checked);
    }

    return {
        clientLoaded,
        filters,
        genderList,
        isPending,
        orderByList,
        selectAge: handleAgeSelect,
        selectGender: handleGenderSelect,
        selectOrder: handleOrderSelect,
        selectWithPhoto: handleWithPhotoToggle,
        totalCount
    }
}
