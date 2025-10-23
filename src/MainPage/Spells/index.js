import spells_table from "./spells.json"
import {useState} from "react"
export default function Spells({Name="", School="", Class="", Region="", Family="", Level=""}) {
    const props = {School, Class, Region, Family, Level};
    const schoolSelections =  ["Abjuration", "Conjuration", "Evocation", "Enchantment", "Divination", "Necromancy", "Illusion", "Transmutation"]

    const removeSchools = (text) => {
        schoolSelections.map((s) => 
            text = text.replace(s, "")
        )
        return text
    }
   
    const selections = {
        "School" : schoolSelections,
        "Level" : ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
        "Class" : ["Artificer", "Bard", "Cleric", "Druid", "Paladin", "Psion", "Ranger", "Sorcerer", "Warlock", "Wizard"],
        "Region" :  ["Base5e", "Zentravalk", "Orientavalk", "Mahanna"],
        "Family" : ["Sangromancy", "Hydromancy", "Geomancy", "Technique"]
    }
    const [filterPayload, setFilterPayload] = useState(
        { Name, School, Class, Region, Family, Level }
    ); 

    const handleFilterPayload = (f) => {
        var temp = {...filterPayload, ...f}
        setFilterPayload(temp); 
    }              
        
    const spells = spells_table.sort((a, b) => a.Level - b.Level)
               
    return (<div className="subPageContainer">

        {
            Object.keys(props).map((prop) => (
                 (props[prop]) 
                 ?
                 <h2>{props[prop]} Spell List</h2>
                 :
                 <></>
            ))

        }
         {
            
            Object.keys(props).map((prop) => (
                (!props[prop]) ?
                <div>By {prop}
                <div class="binderContainer">
                    {selections[prop].map((s) => (
                        <a class={`binderSelection ${filterPayload[prop] == s ? "active" : ""}`} onClick={() => {
                            (filterPayload[prop] != s) ? handleFilterPayload({[prop] : s}) : handleFilterPayload({[prop] : ""})
                        }}>{`${s}`}</a>
                    ))}
                </div>
            </div>
             :
            <></>
            ))
           
        }
         
                    <h2><input 
                    value={filterPayload["Name"]}
                    onChange={(e) =>
                        handleFilterPayload({"Name" : e.target.value})
                     }
                    
                    
                    placeholder={"Name"}></input></h2> 
             
          


         {
            spells.map((s, index) => (
              (!filterPayload.Name.trim() || s.Name.includes(filterPayload.Name)) &&
              (!filterPayload.Level.trim() || filterPayload.Level == s.Level) &&
              (!filterPayload.School.trim() || s.School.includes(filterPayload.School)) &&
              (!filterPayload.Class.trim() || (Array.isArray(s["Spell Lists"]) && s["Spell Lists"].reduce((prev, current) => prev + current.includes(filterPayload.Class), false))) &&
              (!filterPayload.Region.trim() || (s.Region && s.Region.includes(filterPayload.Region))) &&
              (!filterPayload.Family.trim() || removeSchools(s.School).includes(filterPayload.Family))
                ?
                (
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
                        )
                :
                <></>



            )
            )



         }
         </div>
         )

       
      
}