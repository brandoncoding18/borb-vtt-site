import {useState} from 'react'
import Spell from './Spell';
import Races from './Races';
import Feat from './Feat';
import Nation from './Nation';
import Weapon from './Weapon';
import Armor from './Armor';
import MagicItem from './Magic Item';
import Subclass from './Subclass';
import {FormDropdown} from './formdropdown';
import spells from '../Spells/spells.json'
export default function DatabaseGUI() {

    const docs = [spells]
    const pages = {
        Spell : spells, 
        Races : Races, 
        Feat : Feat, 
        Nation: Nation,
        Weapon : Weapon, 
        Armor : Armor, 
        "Magic Item" : MagicItem, 
        Subclass : Subclass, 
    }
    const options = Object.keys(pages); 
    //const [activeOption, setActiveOption] = useState(options[0])
    const [activeDropdown, setActiveDropdown] = useState(false); 

    const [name, setName] = useState("");

   // const SelectedPage = pages[activeOption] || Spell; 

    /*const toggleDisplay = () => {
        setActiveDropdown(!activeDropdown); 
    }*/

        const handleClick = (event) => {
    // 👇️ Toggle class on click
            console.log("hello")
             event.currentTarget.classList.toggle('a');
        };

    return (<div class="subPageContainer">
        
        
        <h1>Database GUI</h1>

       {/*
                <h8>

                    ADD SPELL
                    {docs.map((d) => 
                    
                    <table class="table">

                        <thead>
                            <tr>
                                <th></th>
                                {
                                    Object.keys(d[0]).map((k) => 
                                    <th>{k}</th>)
                                }
                            </tr>

                        </thead>
                        <tbody>
                            
                             {d.map((d) => 
                            
                            <tr>
                                {
                                   
                                    
                                        Object.values(d).map((dr) => 
                                        
                                        <td>
                                            <form onSubmit={() => console.log("gleepglorp")}>
                                                <input
                                                type="text"
                                                value={dr}
                                                onChange={(e) => setName(e.target.value)}
                                                required
                                                />
                                                <button type="submit">Update</button>
                                            </form>
                                            <span onClick={(event) => handleClick(event)} class="editable-column">
                                            {dr} <span class="bi bi-pencil"></span>
                                            </span>
                                        </td>
                                        
                                        )
                                    
                                    
                                    
                                    
                                }
                                
                            </tr>

                             )}
                        </tbody>



                    </table>

                    
                    
                    
                    )}
                    


                </h8>
*/}

    </div>)
}
