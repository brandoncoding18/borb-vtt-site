import styles from '../styles.css'

import {useNavigate} from 'react-router'
import {useEffect} from 'react'
export default function Redirect({selectedPage}) {
    


  //TODO
  // query param format: /?spells&spell_name=[spellname]
  //Have it so that based on what you parse from the url, it selects the correct sidebar option, then looks for query parameters
    const handleRedirect  = () => {
        var redirectLink = ""; 
        switch(query) {
            
            //THE HARD R??!?!?!?!?!?!?!?!??!??????11
            case 'r':
                navigate(`../Races${queryParams}`, {replace : true})
                break; 
            case 's':
                navigate(`../Spells${queryParams}`, { replace: true })
                break; 
             case 'x':
                navigate(`../Spells${queryParams}`, { replace: true })
                break; 
            case 'f':
                navigate(`../Feats${queryParams}`, { replace: true })
                break;
            case 'w': 
                navigate(`../Armory${queryParams}`, { replace: true })
                break; 

                                       

        }
    }

    useEffect(() => handleRedirect(), [])
   // const ActivePage = componentMap[selectedPage] || Armory; // Fallback to SideNav
    const queryParams =  window.location.search
    const [query, queryParam] = queryParams.replace("?", "").split("=");
    const navigate = useNavigate(); 
    return (<div class="mainContainer">
        {
            
            handleRedirect()

        }
        </div>

    
    )
}