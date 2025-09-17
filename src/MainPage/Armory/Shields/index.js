import shields from "./shields.json";
import {useState} from 'react'; 
export function Shields({queryParams}) {
       const beautify = (queryParam) => {
        return(queryParam.replaceAll('%20', ' '))
    }
    const categories = ['Light', 'Medium', 'Heavy']
    const [selectedCategory, setSelectedCategory] = useState(categories[0])
    const shields_table = ((queryParams) ? shields.filter((shield) => shield.Name == beautify(queryParams)) : shields)
    
    return (<div><h1>Shields</h1>
    <br/>


    <p>
        Shields come in all shapes and sizes from kites to circles to teardrops to coffins. There are obvious benefits to the size and shape of your shield, and masters learn offensive use of their shield and can even protect themselves from dragon's breath. Much like armor, Light and Medium armor shields allow ones Dexterity Score to be used, as long as no Heavy piece of armor is being worn


    </p>
    <p>
        Equipping a shield

    </p>

    <p>
        Donning a shield describes moving it from your back or a sling to be strapped to your arm or held in hand. In order to use two hands for some task while a shield is strapped to your arm, it will need to be removed, and all shields are doffed with an Object Interaction. A shield on your back provides no benefit and is simply a piece of garb, unless stated otherwise.
    </p>

        <div>{
            (!queryParams) ?
            <div class="optionalContainer">
            <div class="binderContainer">
            {categories.map((s) => (
                <a class={`binderSelection ${(s == selectedCategory) ? "active" : ""}`} onClick={() => setSelectedCategory(s)}>{s}</a>
            ))}

            </div>
                    <h2>{selectedCategory}</h2>
                    <br/>
            </div> :
            <></>
        }
                    <table class="table">
                    <thead>
                        
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Cost</th>
                            <th scope="col">Weight</th>
                            <th scope="col">Stealth</th>
                            <th scope="col">AC</th>
                            <th scope="col">STR Requirement</th>
                            <th scope="col">Properties</th>
                            <th scope="col">Mastery Feat</th>



                        </tr>
                    </thead>
                    <tbody>
                        
                       {shields_table.filter((s) => s["Armor Type"] == selectedCategory).map((armor) =>
                        
                        
                            <tr>
                                <td>{armor.Name}</td>
                                <td>{armor.Cost.Amount}{armor.Cost.Currency}</td>
                                <td>{armor.Weight}lbs</td>
                                <td>{armor["Stealth"]}</td>
                                <td>{`${armor["Armor Class"]}`}{armor["Damage Reduction"] ? `, ${armor["Damage Reduction"]} DR` : ""}</td>                    
                                <td>{armor["Strength Requirement"] || ' -- '}</td>
                                <td>{armor["Properties"] || '--'}</td>
                                <td>{armor["Mastery"]}</td>


                            </tr>
                        )}
                        </tbody>
                    </table>

                </div>
        



    </div>)
    
}