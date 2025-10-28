import styles from '../../styles.css'
import {useState, useEffect} from 'react'
import {GiantLine} from '../../helpers'
import Weapons from './weapon_table.json';
import Armor from './Armor/armor_table.json';
import Ammunition from './ammunitions.json';
import Shields from './Shields/shields.json';
import Poisons from './Poisons/poisons.json'
import Firearms from './Firearms/firearms.json'
import {formatter} from '../../helpers'
//import { Weapons } from './Weapons';
//import { Armor } from './Armor'
//import { Shields } from './Shields';
//import { Ammunition } from './Ammunition';
//import { Firearms } from './Firearms';
//import { Poisons } from './Poisons';

// Define jsonDict outside the component to prevent re-creation on every render
const jsonDict = {
    "Weapons" : Weapons,
    "Armor" : Armor, 
    "Shields" : Shields,
    "Ammunition" : Ammunition, 
    "Firearms" : Firearms, 
    "Poisons" : Poisons
}

// Define categorize outside the component to prevent re-creation on every render


export default function Armory({Name=""}) {
    const [filterPayload, setFilterPayload] = useState(
        { Name }
    ); 
    const categorize = (json, selectedPage) => {
    
        var categorized = {}
        if(filterPayload["Name"]) {
            const match = Object.entries(jsonDict).find(([name, data]) => 
            data.find((entry) => 
                entry["Name"] === filterPayload["Name"]
            )   
            );
                    if (match) {
                    selectedPage = match[0]; 
                } else {
                    // Handle case where item is not found, maybe reset selectedPage to the default view
                }
        }
        // Safely get the data array for the selected page
        const data = json[selectedPage] || []; 
        data.map((x) => {
            // Use a logical fallback to determine the item's category key
            var training = Object.values(x["Type"] || x["Armor Type"] || x["Armor Group"] || x["Rarity"] || x["Poison Type"] || "Ammunition").join((x["Type"] ? " " : ""))
            categorized[training] = categorized[training] ? [...categorized[training], (x)] : [x]
        })
        console.log(categorized)
        setSelectedPage(selectedPage)
        return categorized; 
    }

    const handleFilterPayload = (f) => {
        var temp = {...filterPayload, ...f}
        setFilterPayload(temp); 
    }     

    const findAmmoName = (name) => {
        const foundAmmo = Ammunition.find((ammo) => {
            return ammo["For Use With"].includes(`~wn^${name}~#`);
        });
        return foundAmmo ? foundAmmo["Name"] : undefined;
    };
    
    const normalize = (key, val, name="") => {
        var keys = Object.keys(val || {"test" : "null"})
        var values = Object.values( val || {"test" : "null"})
        
        if(keys.includes("amount") || keys.includes("Amount")) {
            return values.join('')
        }
        if(key == "Type") {
            return ""
        }
        if(keys.includes("training") || keys.includes("Training")) {
            return values.join(" ")
        }
        if(keys.includes("num_die")) {
            return `${val["num_die"]}d${val["die"]}${val["additional"] ? ` +${val["additional"]}` : ''} ${val["types"].join(val["inclusive"] ? " and " : " or")}`        }
        if(key == ("Range")) {
            return `${(values || val).join("/")} feet`
        }
        if(key == ("Weight")) {
            return `${val} lbs`
        }
        if(key == ("Family")) {
            return `~fnp^${val}~#`
        }
        if(key == ("Special") && val == "N/A") {
            return " -- "
        }
        if(key == ("Disadvantages") || key == ("Properties") || key == "For Use With") {
            var v = values || val
            var f = findAmmoName(name) 
            //console.log(f)
            v = v.map((x) => x.replace("~wp^Ammunition~#", `~wp^Ammunition~# (~wn^${f}~#)`))
            //console.log(v)
            return `${v.join(", ")}` || " -- "
        }
        
        if(keys)
            return (val || "--")
    }

    var initialPage = Object.keys(jsonDict)[0]
    
    const [selectedPage, setSelectedPage] = useState(initialPage)
    
    // Initialize categorized state using the initialPage
    const [categorized, setCategorized] = useState(() => categorize(jsonDict, initialPage))
    
    // 👇 FIX: Use useEffect to recalculate categorized data when selectedPage changes
    useEffect(() => {
        const newCategorized = categorize(jsonDict, selectedPage);
        setCategorized(newCategorized);
    }, [selectedPage]); 
    // We only need 'selectedPage' in the dependency array. 
    // Since 'jsonDict' is defined outside, it won't trigger the effect unless it changes, which it won't.
    
    return (  
        <div className="subPageContainer">
            
            <h1>Zentravalk Armory</h1>
            <h2>How to use this document</h2>
            <h4 style={{'width' : '90vw'}}>This document contains a mixture of weapons & armor homebrew used in the Zentravalk Central campaigns (Feel free to use them too!). This is a guide on how to best use this document</h4>
            <ul>

                <li>Read this page and the pages just below on weapon & armor properties.</li>
                <li>Skim the pages to find a weapon or armor you like that your character is also proficient in. There are many new weapons to choose from and even those from the Player's Handbook have been altered.</li>
                <li>Build your character as normal.</li>
                <li>During play you may get a mastery perk as a reward. Talk to your DM about when this may occur (good tables always talk about expectations).</li>
                <li>When you get ability score improvements, take a look at the feats towards the end of each section as options to further improve use of your favored weapons.</li>

            </ul>


            <div class="binderContainer">
                {
                    (!filterPayload["Name"] ? <>{(Object.keys(jsonDict)).map((c) => 
                        <a 
                            key={c} // Added key for list stability
                            class={`binderSelection ${(c == selectedPage) ? "active" : ""}`} 
                            onClick={() => setSelectedPage(c)}
                        >
                            {(c)}
                        </a>
                    )}</> : <></>)
                }
            </div>

                
                
                {
                    Object.entries(categorized).filter(([key, val]) => val.some((row) => (!filterPayload["Name"]) || row["Name"] == filterPayload["Name"])).map(([category, categorizedItems]) => {

                            //console.log(categorizedItems[0])
                            // Added key for list stability
                            return <div key={category}> 
                            <h2>{filterPayload["Name"] ? <>{filterPayload["Name"]} <a href="../Armory">Clear</a></> : category}</h2>

                            <table class="table">
                                <thead>
                                    {Object.keys(categorizedItems[0]).map((table_label) => 
                                        // Added key for list stability
                                        (table_label != "Type") ? <th key={table_label} scope="col">{table_label}</th> : <></>
                                    )}
                                </thead>

                                {<tbody style={{"border" : "solid"}}>
                                    
                                    {categorizedItems.filter((ci) => (!filterPayload["Name"]) || ci["Name"] == filterPayload["Name"]).map((k, index) => 
                                        // Added key for list stability
                                        <tr key={k["Name"] || index}>
                                            {  Object.entries(k).map(([x, y]) => 
                                                {
                                                    var result = <td>{formatter(normalize(x, y, k["Name"]))}</td>
                                                    if(x != "Type")
                                                        // Added key for list stability
                                                        return <td key={x}>{formatter(normalize(x, y, k["Name"]))}</td>
                                                })
                                            }
                                        </tr>
                                            
                                    )}
                                    
                                </tbody>}
                                        
                            </table>
                        </div>
                    })
                }
                        
            </div>
        )
}