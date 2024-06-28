"use client"

import {Button, Select, SelectItem, Slider, Spinner} from "@nextui-org/react";
import {useFilters} from "@/hooks/useFilters";

const Filters = () => {

    const {clientLoaded, filters, genderList, isPending, orderByList, selectAge, selectGender, selectOrder, totalCount} = useFilters()

    return (<div className="shaddow-md5 py-2">
        <div className="flex flex-row justify-around items-center">
            <div className='flex gap-2 items-center'>
                <div className='text-secondary font-semibold text-xl'>
                    Results: {isPending ? <Spinner size='sm' color='secondary'/> : totalCount}
                </div>

            </div>
            <div className="flex gap-2 items-center">
                <div>Gender:</div>
                {genderList.map(({icon: Icon, value}) => (
                    <Button
                        key={value}
                        size="sm"
                        isIconOnly
                        color={filters.gender.includes(value) ? "secondary" : "default"}
                        onClick={() => selectGender(value)}
                    >
                        <Icon size={24}/>
                    </Button>
                ))}
            </div>
            <div className="flex flex-row gap-2 items-center w-1/4">
                <Slider
                    label={clientLoaded && "Age range"}
                    color="secondary"
                    size="sm"
                    minValue={18}
                    maxValue={100}
                    defaultValue={filters.ageRange}
                    onChangeEnd={(value) => selectAge(value as number[])}
                    aria-label="Age range slider"
                />
            </div>
            <div className="w-1/4">
                <Select
                    size="sm"
                    fullWidth
                    placeholder="Order by"
                    value="bordered"
                    color="secondary"
                    aria-label="Order by"
                    selectedKeys={new Set([filters.orderBy])}
                    onSelectionChange={selectOrder}
                >
                    {orderByList.map((item) => (
                        <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>))}
                </Select>
            </div>
        </div>
    </div>)
}
export default Filters;
