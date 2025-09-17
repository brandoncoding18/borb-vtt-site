import {useState} from 'react'
export const FormDropdown = ({options}) => {
    const [activeOption, setActiveOption] = useState(options[0])
    return(<>
        <label htmlFor="form-dropdown">{}</label>
                        <select
                            id="form-dropdown"
                            value={activeOption}
                            onChange={(event) => setActiveOption(event.target.value)}
                            style={{ marginLeft: "10px", padding: "5px" }}
                        >
                            <option value="" disabled>
                            -- Select an option --
                            </option>
                            {options.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                            ))}
                </select>

    
    
    
    </>)
    
}