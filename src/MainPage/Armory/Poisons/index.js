import poisons from "./poisons.json";
import diseases from "./diseases.json";
import bespokes from "./bespoke_poisons.json";


import {useState} from 'react'; 
export function Poisons() {
    const poisonTypes = ["Liquid", "Venom", "Volatile", "Powder", "Paste", "Plant", "Spore", "Parasite", "Disease", "Bespoke"]
    const [poisonType, setPoisonType] = useState(poisonTypes[0])
    return (<div>
        
        
        <h1>Poisons</h1>

                    <a href="https://www.gmbinder.com/share/-ODOtfIXkEU6gtqk-enH">Click here to read more about poisons</a>
                    <div>Will be added to this page when Borb's lazy ass decides to format the doc as html (FUCK YOU GIDEON)</div>

            <div class="binderContainer">
            {poisonTypes.map((s) => (
                <a class={`binderSelection ${(s == poisonType) ? "active" : ""}`} onClick={() => setPoisonType(s)}>{`${s}s`}</a>
            ))} 
            </div>


            <div>
                    {(poisonType == "Disease") ? 

                    <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Phase 1</th>
                                    <th scope="col">Phase 2</th>
                                    <th scope="col">Phase 3</th>
                                    <th scope="col">Save</th>
                                    <th scope="col">Cost</th>
                                </tr>
                            </thead>
                            <tbody>
                                    {
                                        diseases.map((disease) =>
                                    
                                    
                                        <tr>
                                            <td>{disease.Name}</td>
                                            <td>{disease["Phase 1"]}</td>
                                            <td>{disease["Phase 2"]}</td>
                                            <td>{disease["Phase 3"]}</td>
                                            <td>{disease.DC}</td>
                                            <td>{disease.Cost}</td>

                                        </tr>)
                                    }
                            
                        </tbody>
                    </table> 
                      
                    : (poisonType == "Bespoke") ? 
                       <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Ingredients</th>



                                </tr>
                            </thead>
                            <tbody>
                                    {
                                        bespokes.map((bespoke) =>
                                    
                                    
                                        <tr>
                                            <td>{bespoke.Name}</td>
                                            <td>{bespoke.Description}</td>
                                            <td>{bespoke.Ingredients}</td>

                                        </tr>)
                                    }
                            
                        </tbody>
                    </table> 
                    :
                      <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Cost</th>
                                    <th scope="col">Effect</th>
                                    <th scope="col">Save (on hit or end of turn)</th>
                                    <th scope="col">Duration</th>
                                </tr>
                            </thead>
                            <tbody>
                                    {
                                        poisons.filter((p) => p["Poison Type"] == poisonType).map((poison) =>
                                    
                                    
                                        <tr>
                                            <td>{poison.Name}</td>
                                            <td>{poison.Cost}</td>
                                            <td>{poison.Effect}</td>
                                            <td>{poison.Save}</td>
                                            <td>{poison.Duration}</td>
                                        </tr>)
                                    }
                            
                        </tbody>
                    </table>
                    }
                    </div>
                    </div>); 
}
