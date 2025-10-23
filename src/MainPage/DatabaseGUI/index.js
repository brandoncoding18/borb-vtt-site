import {useState} from 'react'
import Races from './Races';
import Feat from './Feat';
import Nation from './Nation';
import Weapon from './Weapon';
import Armor from '../Armory/Armor/armor_table.json';
import MagicItem from './Magic Item';
import Subclass from './Subclass';
import {FormDropdown} from './formdropdown';
import spells from '../Spells/spells.json'
import feats from '../Feats/feats.json'
import {formatter, formatForGUI, GiantLine} from '../../helpers'
import { useNavigate } from 'react-router-dom';
export default function DatabaseGUI() {

    const docs = { "Feats" : feats, 
                 "Spells": spells} 
    const pages = []

    const [readFilter, setReadFilter] = useState("")

    //const options = Object.keys(pages); 
    //const [activeOption, setActiveOption] = useState(options[0])
    const [activeDropdown, setActiveDropdown] = useState(false); 
    const [activeItem, setActiveItem] = useState(Object.keys(docs)[0])

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
        const navigate = useNavigate(); 
    return (<div class="subPageContainer">
        
        
        <h1>Database GUI</h1>


        <h4>User guide:</h4>
        <h5>For descriptions,</h5>
            <li>including "\n" and "\t" will specify line breaks and list items respectively</li>
            <li>Links will be created automatically using the syntax: ~[item]^~#. Anything that's enclosed will form a link to a page</li>
            
            <br/>
            <>Supported link formats: </>
            <li>~fn^[Feat Name]~#</li>
            <li>~rn^[Race Name]~#</li>
            <li>~wn^[Weapon/Shield/Firearm/Poison/Armor]~#</li>
            <li>~sn^[Spell Name]~#</li>
            <li>~sc^[Spell Class]~#</li>
            <li>~ss^[Spell School (Subschool not supported as of now)]~#</li>
            <div><b>Raw input:</b> {formatForGUI("\"I'm really a big fan of the ~sn^Grease~# spell.\nthe one that's in the ~sc^Artificer~# spell list, \n\t and in the ~ss^Conjuration~# spell school \n Hooray!\"")}</div>
            <div><b>Displays as:</b> {formatter("\"I'm really a big fan of the ~sn^Grease~# spell. \tthe \none that's in the ~sc^Artificer~# spell list, \n\t and in the ~ss^Conjuration~# spell school \n Hooray!\"")}</div>





            <GiantLine/>
                    <div>Item type:{Object.keys(docs).map((x) => <a class={`binderSelection ${activeItem == x ? "active" : ""}`} onClick={() => setActiveItem(x)}>{x}</a>)}</div>

        <h2>Create entry in table: "{activeItem}"</h2>
            <h3></h3>
        <>{Object.entries((docs[activeItem][0])).map(([key, values], index) => 
        <div><div>{key }</div>
            <div>{<input></input>} Example: {formatForGUI(JSON.stringify(values)) || "N/A"}</div>

            
        </div>
        )}</>
        <h2>Read & Update</h2>
        <h3>Enter a search criteria, allowing you to read the entry then edit it</h3>
        <div><div>Search for Name: </div>{<input onChange={(e) => setReadFilter(e.target.value)}></input>}</div>
        <GiantLine/>
        <>{(Object.entries((docs[activeItem]).find((entry) => entry["Name"].includes(readFilter)) || {"Name" : "None"})).map(([key, value]) => <div><div>{key }</div>
            <div>{<input value={value}/>}</div>

            
        </div>)}</>
        </div>
        )

       

}
