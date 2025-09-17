import styles from '../../styles.css'
import {useState} from 'react'
import weapons_table from './weapon_table.json';
import ammunition_table from './ammunitions.json';
import { Weapons } from './Weapons';
import { Armor } from './Armor'
import { Shields } from './Shields';
import { Ammunition } from './Ammunition';
import { Firearms } from './Firearms';
import { Poisons } from './Poisons';

export default function Armory() {
const queryParams =  window.location.search
        const [query, queryParam] = queryParams.replace("?", "").split("=");
        const HoverText = ({textLink, textToDisplay}) => {
        const [isHovered, setIsHovered] = useState(false);
        
        
        return (
            <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                padding: "20px",
                border: "1px solid black",
                display: "absolute",
                cursor: "pointer",
            }}
            >
            {textLink}
            {isHovered && (
                <div style={{ marginTop: "10px", color: "blue" }}>
                    {textToDisplay}
                </div>
            )}
            </div>
        );
        };
         const beautify = (queryParam) => {
        return(queryParam.replaceAll('%20', ' '))
    }
       const jsonDict = {
            'w' : "Weapons"
       }

    
    const pages = {
        "Weapons" : Weapons, 
        "Armor" : Armor, 
        "Shields" : Shields,
        "Ammunition" : Ammunition, 
        "Firearms" : Firearms, 
        "Poisons" : Poisons
    }

    const [selectedPage, setSelectedPage] = useState(queryParams ? jsonDict[query] : Object.keys(pages)[0]);



   const CurrentPage = pages[selectedPage]

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

            <div>
                {
                    (queryParams) ? <></> :
                <div class="binderContainer">
                {(Object.keys(pages)).map((c) => (
                    <a class={`binderSelection ${(c == selectedPage) ? "active" : ""}`} onClick={() => setSelectedPage(c)}>{(c)}</a>
                ))}
                </div>
                }
                <CurrentPage queryParams={queryParam}/>

            </div>
        </div>
        
        )
        
}