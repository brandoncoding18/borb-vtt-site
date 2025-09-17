import {useState} from 'react'; 
export default function Spell() {
    const levelOptions = ["Cantrip", ...Array(9).keys().map((n) => {return n + 1})]
    const [selectedSpell, setSelectedSpell] = useState(levelOptions[0])
   

    return (<>Spell
    
    <div>Spell level: </div>
    <label htmlFor="form-dropdown">{}</label>
                    <select
                        id="form-dropdown"
                        value={selectedSpell}
                        onChange={(event) => setSelectedSpell(event.target.value)}
                        style={{ marginLeft: "10px", padding: "5px" }}
                    >
                        <option value="" disabled>
                        -- Select an option --
                        </option>
                        {levelOptions.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                        ))}
            </select>
    
    </>)
}