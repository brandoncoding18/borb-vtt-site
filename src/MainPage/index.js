import {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import SideNav from '../SideNav'; 
import Armory from './Armory/index.js'; 
import Races from './Races/index.js'; 
import Classes from './Classes/index.js'; 
import Feats from './Feats/index.js'; 
import Spells from './Spells/index.js'; 
import DatabaseGUI from './DatabaseGUI/index.js'; 
import Nations from "./Nations/index.js";
import Rules from "./Rules/index.js";




import styles from '../styles.css'
import MyError from '../Error/index.js';


export default function MainPage({selectedPage}) {

    const componentMap = {
    Armory : Armory, 
    Classes : Classes, 
    Feats : Feats, 
    Spells : Spells,
    DatabaseGUI : DatabaseGUI,
    Nations : Nations, 
    Races : Races,
    Rules : Rules
  };

  //TODO
  // query param format: /?spells&spell_name=[spellname]
  //Have it so that based on what you parse from the url, it selects the correct sidebar option, then looks for query parameters

    const ActivePage = componentMap[selectedPage] || MyError; // Fallback to SideNav

    return (<div class="mainContainer">
        <SideNav selectedPage={selectedPage}/>
        {<ActivePage />}
        </div>

    
    )
}