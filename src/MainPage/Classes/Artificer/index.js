//import artificer from './artificer.json';
import artificer from './bard.json';
import source_dict from './source_dict.json'
import {useState} from "react"
export function Artificer() {
   const num_word_dict = {
    1 : 'one', 
    2 : 'two',
    3 : 'three', 
    4 : 'four', 
    5 : 'five', 
    6 : 'six', 
    7 : 'seven', 
    8 : 'eight', 
    9 : 'nine', 
    10 : 'ten'
   }
   const vowel_name = ["a", "e", "i", "o", "u"].reduce((prev, curr) => prev || artificer.name[0].toLowerCase() == curr, false)
   const casting_progression =  {1 : {1 : 2},
    2 : {1 : 3},
    3 : {1 : 4, 2 : 2},
    4 : {1 : 4, 2 : 3},
    5 : {1 : 4, 2 : 3, 3 : 2},
    6 : {1 : 4, 2 : 3, 3 : 3},
    7 : {1 : 4, 2 : 3, 3 : 3, 4 : 1},
    8 : {1 : 4, 2 : 3, 3 : 3, 4 : 2},
    9 : {1 : 4, 2 : 3, 3 : 3, 4 : 2, 5 : 1},
    10 : {1 : 4, 2 : 3, 3 : 3, 4 : 2, 5 : 2},
    11 : {1 : 4, 2 : 3, 3 : 3, 4 : 2, 5 : 2, 6 : 1},
    12 : {1 : 4, 2 : 3, 3 : 3, 4 : 2, 5 : 2, 6 : 1},
    13 : {1 : 4, 2 : 3, 3 : 3, 4 : 2, 5 : 2, 6 : 1, 7 : 1},
    14 : {1 : 4, 2 : 3, 3 : 3, 4 : 2, 5 : 2, 6 : 1, 7 : 1},
    15 : {1 : 4, 2 : 3, 3 : 3, 4 : 2, 5 : 2, 6 : 1, 7 : 1, 8 : 1},
    16 : {1 : 4, 2 : 3, 3 : 3, 4 : 2, 5 : 2, 6 : 1, 7 : 1, 8 : 1},
    17 : {1 : 4, 2 : 3, 3 : 3, 4 : 2, 5 : 2, 6 : 1, 7 : 1, 8 : 1, 9 : 1},
    18 : {1 : 4, 2 : 3, 3 : 3, 4 : 2, 5 : 2, 6 : 1, 7 : 1, 8 : 1, 9 : 1},
    19 : {1 : 4, 2 : 3, 3 : 3, 4 : 2, 5 : 2, 6 : 1, 7 : 1, 8 : 1, 9 : 1},
    20 : {1 : 4, 2 : 3, 3 : 3, 4 : 2, 5 : 2, 6 : 1, 7 : 1, 8 : 1, 9 : 1}
    }

 
    const subclasses = [...artificer.features.reduce((prev, curr) => (curr.subclass) ? prev.add(curr.subclass) : prev, new Set())];    
    const [selectedSubclass, setSelectedSubclass] = useState(subclasses[0])
    const maxSpellSlots = (artificer.caster_type == "Full") ? [9, 1]: (artificer.caster_type == "Half") ? [5, 2] : [0, 1]
    return (<div class="classPageContainer"> 
        
        <div style={{'position' : 'absolute', 'width' : '100%', 'background-color' : 'cyan'}}>Subclass Selection
            <div class="binderContainer">
            {subclasses.map((s) => (
                <a class={`binderSelection ${selectedSubclass == s ? "active" : ""}`} onClick={() => {
                    (selectedSubclass != s) ? setSelectedSubclass(s) : setSelectedSubclass(null)
                }}>{`${s}`}</a>
            ))}
            </div>
        </div>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <h1>The {artificer.name}</h1>
         
        <h2>Class Features</h2>
        <span>As a{(vowel_name) ? 'n' : ''} {artificer.name.toLowerCase()}, you gain the following class features</span>
        <h2>Hit Points</h2>
        <div><b>Hit dice:</b> 1d{artificer.hitDie} per {artificer.name.toLowerCase()} level</div>
        <div><b>Hit Points at 1st level:</b> {artificer.hitDie} + your Constitution modifier</div>
        <div><b>Hit Points at Higher level:</b  > 1d{artificer.hitDie} (or {Math.ceil((artificer.hitDie + 1) / 2)}) + your Constitution modifier per {artificer.name.toLowerCase()} level after 1st</div>
       
         <h2>Proficiencies</h2>
        <div><b>Armor: </b> { artificer.armor_prof.length > 0 ? 
        artificer.armor_prof.join(" Armor, ")
            : 
            <>None</>
    }</div>
        <div><b>Weapons:</b> {artificer.weapon_prof.length > 0 ?
        
        <>{artificer.weapon_prof.map((w) => (w.includes("Simple") || w.includes("Martial")) ? `${w} weapons` : w).join(", ")}</>
        : <>None</>
         }
        </div> 
       
        <div><b>Tools: </b> {artificer.tools_prof.length > 0 ? 
        artificer.tools_prof.map((tp) => (tp.choice == null) ? <>{tp} , </> : <>{num_word_dict[tp.choice]} {tp.type} tools of your choice</>)
        : <>None</>
    }
        </div>
        <div><b>Saving Throws:</b> {artificer.saving_throws.join(", ")}</div>
        <div><b>Skills:</b> Choose {num_word_dict[artificer.skill_prof.choice]} from {artificer.skill_prof.skills.join(", ")} </div>


        <h2>Equipment</h2>
        <div>You start with the following equipment, in addition to the equipment granted by your background:</div>
        <ul>

            {
                artificer.equipment.map((val) => 
                <li>{val}</li>)
            }
        </ul>

        <div>
            {

                artificer.features.sort((a, b) => a.lvl[0] - b.lvl[0]).map((f) => 
                    <div>


                         {(!f.sub) ? (!(f.subclass) || f.subclass == selectedSubclass) ? <div><h4>{f.name}</h4>  
                         <div>        
                            {f.desc.split("\n").map((f) => (f.includes("\b") ? <li>{`\t${f.replace("\b", "")}`}<br/></li> : <div>{f}<br/></div>))}
                             {(f.table) ? <table class="table">
                            <thead>
                                 <tr>
                                    {
                                        f.table.column_names.map((tc) => 
                                          <th scope="col">{tc}</th>
                                        )
                                    }
                                </tr>
                            </thead>
                            <tbody>
                               
                                {
                                    f.table.columns.map((c) => 
                                    <tr>
                                        {
                                            c.map((cn) => 
                                                <td>{
                                                        [...cn].join((cn[0].length <= 1) ? "" : ", ")
                                                    }</td>

                                            )
                                        }
                                    </tr>)
                                }
                                
                            </tbody>
                            </table> : <></> }
                            <br/></div>

                    </div> : <></> : <div><h5>{f.name}</h5>                         
                    <div>{f.desc.split("\n").map((f) => (f.includes("\b") ? <li>{`\t${f.replace("\b", "")}`}<br/></li> : <div>{f}<br/></div>))}</div>
                    </div>}
                         {(f.subclassOptions) ? <table class="table">
                            <thead>
                                 <tr>
                                    <th scope="col">Subclass</th>
                                    <th scope="col">Source</th>
                                </tr>
                            </thead>
                            <tbody>
                               
                                {
                                    [...subclasses].map((s) => 
                                    <tr>
                                        <td>{s}</td>
                                        <td>{source_dict[s]}</td>
                                    </tr>)
                                }
                                
                            </tbody>
                            </table>: <></>}


                           
                         
                    </div>
                
               
            
            
            )
            }



        </div>

      

            <table class="table">
                    <thead>
                        
                        <tr>
                            <th scope="col">Level</th>
                            <th scope="col">Proficiency Bonus</th>
                            <th scope="col">Features</th>
                            {

                                Object.keys(artificer.misc_table_features).map((mf) => 
                                    <th scope="col">{mf}</th>
                                )
                            }
                            {
                                  [...Array(maxSpellSlots[0]).keys()].map((n) => <th>{n + 1}</th>)
                            }
                        </tr>
                    </thead>
                    <tbody>
                        
                       {
                       
                         [...Array(20).keys()].map((index) => 
                         <tr>
                                <td>{index + 1}</td>
                                <td>+{2 + Math.floor(index / 4)}</td>
                                <td>{artificer.features.filter((f)=> (f.lvl.includes(index + 1)) && !f.sub && (f.subclass ? f.subclass == selectedSubclass : true)).map((f) => (f.prog) ? `${f.name} ${f.prog[f.lvl.findIndex((i) => i == index + 1)]}` : f.name).join(", ") || <div>--</div>}</td>
                                {Object.values(artificer.misc_table_features).map((misc) => 
                                
                                            <td>{misc[index]  || <>--</>}</td>
                            
                                        )   
                                    
                                    
                                    }

                                    {
                                 [...Array(maxSpellSlots[0]).keys()].map((level) => <td>{casting_progression[Math.ceil((index + 1) / maxSpellSlots[1])][level + 1]|| <>--</>}</td> )
                            }

                            </tr>
                        
                        
                        
                        )}
                        </tbody>
                    </table>




    </div>)
}