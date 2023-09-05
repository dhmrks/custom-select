import { useState } from 'react'

import Select from './components/Select'
import { SelectOption } from './types/SelectTypes'

const options = [
    { value: 1, label: "Option 1" },
    { value: 2, label: "Option 2" },
    { value: 3, label: "Option 3" },
    { value: 4, label: "Option 4" },
    { value: 5, label: "Option 5" }
]

const App = () => {
    const [value1, setValue1] = useState<SelectOption | undefined>()
    const [value2, setValue2] = useState<SelectOption[]>([])

    const handleSingleSelect = (option: SelectOption | undefined) => setValue1(option)
    const handleMultiSelect = (options: SelectOption[]) => setValue2(options)

    return (
        <>
            <Select
                value={value1}
                onChange={handleSingleSelect}
                options={options}
            />

            <br />

            <Select
                multiple
                value={value2}
                onChange={handleMultiSelect}
                options={options}
                mainColor="#FFC0CB"
            />
        </>
    )
}

export default App
