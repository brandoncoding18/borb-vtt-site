import firearms from "./firearms.json";
import {useState} from 'react'; 
export function Firearms({queryParam}) {
     const beautify = (queryParam) => {
        return(queryParam.replaceAll('%20', ' '))
    }
    const rarities = ["Common", "Uncommon", "Rare"]
    const [raritySelection, setRaritySelection] = useState(rarities[0])
    const firearms_table = ((queryParam) ? firearms.filter((firearm) => firearm.Name == beautify(queryParam)) : firearms)

    return (

        
    
    <div>
        <h1>Firearms</h1>
    <br/>
    {
        (!queryParam) ?
        <div class="optionalContainers">
        <div class="binderContainer">
            {rarities.map((s) => (
                <a class={`binderSelection ${(s == raritySelection) ? "active" : ""}`} onClick={() => setRaritySelection(s)}>{s}</a>
            ))}

            </div>
        
        </div> :
        <></>

    }
                <div>
                    <br/>

                    <table class="table">
                    <thead>
                        
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Firearm Group</th>

                            <th scope="col">Cost</th>
                            <th scope="col">Ammo Cost</th>
                            <th scope="col">Weight</th>
                            <th scope="col">Damage</th>
                            <th scope="col">Range</th>
                            <th scope="col">Properties</th>
                            <th scope="col">Mastery Feat</th>




                            





                        </tr>
                    </thead>
                    <tbody>
                        
                       {firearms_table.filter((s) => s["Rarity"] == raritySelection).map((firearm) =>
                        
                        
                            <tr>
                                <td>{firearm.Name}</td>
                                <td>{firearm["Firearm Group"]}</td>
                                <td>{firearm.Cost.Amount}{firearm.Cost.Currency}</td>
                                <td>{firearm["Ammo Cost"].Amount}{firearm["Ammo Cost"].Currency}</td>

                                <td>{firearm.Weight}lbs</td>
                                <td>{firearm.Damage["Number Die"]}d{firearm.Damage["Die Amount"]}+{firearm.Damage["Extra Damage"]} {firearm.Damage.Type}</td>
                                <td>{firearm.Range.Short}    {firearm.Range.Long ? `/ ${firearm.Range.Long}` :  ``} ft {firearm.Range.Type}</td>
                                <td>{Object.entries(firearm.Properties).join(' ')}</td>
                                <td>{firearm["Mastery Feat"]}</td>


                            </tr>
                        )}
                        </tbody>
                    </table>

                </div>
        
        
        
        
        
        




    </div>)
    
}