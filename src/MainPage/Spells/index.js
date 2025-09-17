import spells_table from "./spells.json"
import {useState} from "react"
export default function Spells() {
    const selections = ["Cantrip", "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th"]
    const [binderSelection, setBinderSelection] = useState(null)

    const schoolSelections = ["Abjuration", "Conjuration", "Evocation", "Enchantment", "Divination", "Necromancy", "Illusion", "Transmutation"]
    const [schoolSelection, setSchoolSelection] = useState(null)

    const classSelections = ["Artificer", "Bard", "Cleric", "Druid", "Paladin", "Psion", "Ranger", "Sorcerer", "Warlock", "Wizard"]
    const [classSelection, setClassSelection] = useState(null)

    const regionSelections = ["Base5e", "Zentravalk", "Orientavalk", "Mahanna"]
    const [regionSelection, setRegionSelection] = useState(null)
    
    const familySelections = ["Sangromancy", "Hydromancy", "Geomancy", "Technique"]
    const [familySelection, setFamilySelection] = useState(null)
               //||(s["Spell Lists"].findIndex((spell) => spell == classSelection) !== -1)

    const queryParams =  window.location.search
    const [query, queryParam] = queryParams.replace("?", "").split("=");
    const beautify = (queryParam) => {
        return(queryParam.replaceAll('%20', ' '))
    }
    const spells = 
    (query && query == 'x') ?
        spells_table.filter((spell) => spell["Spell Lists"].includes(beautify(queryParam)))
    :
    ((queryParam) ? spells_table.filter((spell) => spell.Name == beautify(queryParam)) : spells_table)
               
    return (<div className="subPageContainer">

    
        {!queryParam || query == 'x'
        ?
        <div>
        <h1>{(query == 'x') ? `${queryParam} Spell List` : "Spells"}</h1>
            By Level
            <div class="binderContainer">
            {selections.map((s) => (
                <a class={`binderSelection ${binderSelection == s ? "active" : ""}`} onClick={() => {
                    (binderSelection != s) ? setBinderSelection(s) : setBinderSelection(null)
                }}>{`${s}`}</a>
            ))}
            </div>

             By School
            <div class="binderContainer">
            {schoolSelections.map((s) => (
                <a class={`binderSelection ${schoolSelection == s ? "active" : ""}`} onClick={() => {
                    (schoolSelection != s) ? setSchoolSelection(s) : setSchoolSelection(null)
                }}>{`${s}`}</a>
            ))}
            </div>
            {
                query != 'x' ?
             <>By Class
            <div class="binderContainer">
            {classSelections.map((s) => (
                <a class={`binderSelection ${classSelection == s ? "active" : ""}`} onClick={() => {
                    (classSelection != s) ? setClassSelection(s) : setClassSelection(null)
                }}>{`${s}`}</a>
            ))}
            </div>
            </>
            :
            <></>
            }

            By Family
            <div class="binderContainer">
            {familySelections.map((s) => (
                <a class={`binderSelection ${familySelection == s ? "active" : ""}`} onClick={() => {
                    (familySelection != s) ? setFamilySelection(s) : setFamilySelection(null)
                }}>{`${s}`}</a>
            ))}
            </div>


             By Region
            <div class="binderContainer">
            {regionSelections.map((s) => (
                <a class={`binderSelection ${regionSelection == s ? "active" : ""}`} onClick={() => {
                    (regionSelection != s) ? setRegionSelection(s) : setRegionSelection(null)
                }}>{`${s}`}</a>
            ))}
            </div>
        </div>
            :
            <></>
            
        }
        


       {/* Spell List Rendering */}
            {
                (spells.length > 0) ?
                spells.map((s, index) => { // Added index for key, though a unique spell ID is better
                    // Boolean filter logic
                    const isLevelMatch = (s.Level == selections.findIndex(levelStr => levelStr === binderSelection) || !binderSelection);
                    const isSchoolMatch = (s.School.includes(schoolSelection) || !schoolSelection);
                    const isClassMatch = (!classSelection || (Array.isArray(s["Spell Lists"]) ? s["Spell Lists"].includes(classSelection) : classSelection == s["Spell Lists"]))
                    const isFamilyMatch = (s.School.includes(familySelection) || !familySelection);

                    const isRegionMatch = ((!regionSelection || (regionSelection == "Faerun (Base5e)" && !s.Region)) || (s.Region === regionSelection));
                    
                    if (isLevelMatch && isSchoolMatch && isClassMatch && isFamilyMatch && isRegionMatch) {
                        return (
                            <div key={s.Name || index}> {/* Use spell name as key if unique, otherwise index */}

                                <div className="spellContainer">
                                    <h4>
                                        {s.Name} : {Number(s.Level) ? <>Level {s.Level} {s.School}</> : <> {s.School} cantrip  </>}
                                        {
                                            (s.Ritual) ? <> (ritual)</> : <></>
                                        }
                                    </h4>
                                    <div><b>Source:</b> {s.Source}</div> {/* Assuming Source exists from previous parsing */}
                                    <div><b>Casting Time:</b> {s["Casting Time"]}</div>
                                    <div><b>Range:</b> {s.Range}</div>
                                    {/* Conditionally render Target only if it exists and has content */}
                                    {s.Target && <div><b>Target:</b> {s.Target}</div>}
                                    <div><b>Components:</b> {s.Components}</div>
                                    <div><b>Duration:</b> {s.Duration}</div>
                                    <p>{s.Description}</p> {/* Use p tag for description */}
                                    {s.Upcast && s.Upcast !== "N/A" && <div><b>At Higher Levels:</b> {s.Upcast}</div>}
                                    <div><b>Spell Lists:</b> {Array.isArray(s["Spell Lists"]) ? s["Spell Lists"].join(", ") : s["Spell Lists"]}</div>

                                </div>
                                <br/>
                            </div>
                        );
                    }
                    return null; // Don't render if filters don't match
                })
                :
                <div>Error: no spells found with the name: {beautify(queryParam)}</div>
            }
    </div>)
}