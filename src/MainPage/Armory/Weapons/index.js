import weapons_table from "../weapon_table.json";
import {useState} from 'react'; 
export function Weapons({Name=""}) {
       const selections = [
                        {training: "Simple", type : "Melee"},
                        {training: "Simple", type : "Ranged"},
                        {training: "Martial", type : "Melee"},
                        {training: "Martial", type : "Ranged"},

                        ]
    const beautify = (queryParams) => {
        return(queryParams.replaceAll('%20', ' '))
    }
    const [binderSelection, setBinderSelection] = useState(selections[0])
    
    const weapons = ((Name) ? weapons_table.filter((weapon) => weapon.name == beautify(Name)) : weapons_table)


    return(
        <div>
            {Name}
            
            {
                (!Name) ?
            <div class="optionalContainer">
                <div class="binderContainer">
                    {selections.map((s) => (
                        <a class={`binderSelection ${(s.training == binderSelection.training && s.type == binderSelection.type) ? "active" : ""}`} onClick={() => setBinderSelection(s)}>{`${s.training} ${s.type} Weapons`}</a>
                    ))}

                    </div>

                    <h1>Weapons</h1>
                    <h2>{binderSelection.training} {binderSelection.type} Weapons</h2>

            </div> 
            :
            <></>
            }
        <table class="table">
                    <thead>
                        
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Cost</th>
                            <th scope="col">Damage</th>
                            <th scope="col">Weight</th>
                            <th scope="col">Weapon Group</th>
                            <th scope="col">Properties</th>
                            <th scope="col">Mastery Feat</th>

                        </tr>
                    </thead>
                    <tbody>
                        
                       {weapons.filter((w) => (Name) ||   w.type.training == binderSelection.training && w.type.type == binderSelection.type).map(
                        (weapon) => 
                        
                        
                            <tr>
                                <td>{weapon.name}</td>
                                <td>{`${(weapon.cost.amount)}${weapon.cost.currency}`}</td>
                                <td>{`${(weapon.damage.num_die)}d${weapon.damage.die} ${weapon.damage_types.types.join((weapon.damage_types.inclusive ? " and " : " or "))}`}</td>
                                <td>{`${(weapon.weight)} lbs`}</td>
                                <td>{`${(weapon.weapon_group)}`}</td>
                                <td>{weapon.properties.sort( function(a, b) {return a-b} ).join(', ') || 'None'}</td>
                                <td>{weapon.mastery}</td>
                            </tr>
                        
                        
                        
                        )}

                        
                        </tbody>
                    </table>
</div>
    )
}