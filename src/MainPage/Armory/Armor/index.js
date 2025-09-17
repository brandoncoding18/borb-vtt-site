import armor_table from "./armor_table.json";
import {useState} from 'react'; 
export function Armor({queryParams}) {
     
    const categories = ['Light', 'Medium', 'Heavy']
    const [selectedCategory, setSelectedCategory] = useState(categories[0])
    return (<div>

    { (!queryParams) ?
    <div class="optionalContainers">
     <div class="binderContainer">
            {categories.map((s) => (
                <a class={`binderSelection ${(s == selectedCategory) ? "active" : ""}`} onClick={() => setSelectedCategory(s)}>{s}</a>
            ))}

            </div>
            </div> :
            <></>
        }

            <h1>Armor</h1>
            
            <div>
                    <h2>{selectedCategory}</h2>
                    <br/>
                    
            
                    <table class="table">
                    <thead>
                        
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Cost</th>
                            <th scope="col">Weight</th>
                            <th scope="col">AC</th>
                            <th scope="col">STR Requirement</th>
                            <th scope="col">Disadvantages</th>



                        </tr>
                    </thead>
                    <tbody>
                        
                       {armor_table.filter((w) => w["Armor Group"] == selectedCategory).map((armor) =>
                        
                        
                            <tr>
                                <td>{armor.Name}</td>
                                <td>{armor.Cost.Amount}{armor.Cost.Currency}</td>
                                <td>{armor.Weight}lbs</td>

                                <td>{`${armor["Armor Class"]}`}{armor["Damage Reduction"] ? `, ${armor["Damage Reduction"]} DR` : ""}</td>
                                <td>{armor["Strength Requirement"] || ' -- '}</td>
                                <td>
                                {armor["Stealth Disadvantage"] ? "Stealth" : " -- "}
                                {armor["Perception Disadvantage"] ? ", perception" : ""}
                                {armor["Climbing Disadvantage"] ? ", climbing" : ""}
                                </td>

                            </tr>
                        
                        
                        
                        )}
                        </tbody>
                    </table>

                </div>
    </div>)
    
}