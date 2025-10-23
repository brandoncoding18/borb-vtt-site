import styles from '../styles.css'
    import { useSearchParams } from 'react-router-dom'; // Import useSearchParams

import {useNavigate} from 'react-router'
import {useEffect} from 'react'
export default function Redirect({selectedPage}) {
    


  //TODO
  // query param format: /?spells&spell_name=[spellname]
  //Have it so that based on what you parse from the url, it selects the correct sidebar option, then looks for query parameters
    const handleRedirect  = () => {
        var redirectLink = ""; 
        switch(Object.keys(query)[0]) {
            
            //THE HARD R??!?!?!?!?!?!?!?!??!??????11
            case 'rn':
                navigate(`../Races?Name=${query["rn"]}`, {replace : true})
                break; 
            case 'sn':
                navigate(`../Spells?Name=${query["sn"]}`, { replace: true })
                break; 
             case 'sc':
                navigate(`../Spells?Class=${query["sc"]}`, { replace: true })
                break; 
             case 'ss':
                navigate(`../Spells?School=${query["ss"]}`, { replace: true })
                break; 
             case 'x':
                navigate(`../Spells${query}`, { replace: true })
                break; 
            case 'fn':
                navigate(`../Feats?Name=${query["fn"]}`, { replace: true })
                break;
            case 'fnp':
                navigate(`../Feats?Name=${query["fnp"]} Prowess`, { replace: true })
                break;
            case 'wn': 
                navigate(`../Armory?Name=${query["wn"]}`, { replace: true })
                break; 

                                       

        }
    }

    useEffect(() => handleRedirect(), [])
   // const ActivePage = componentMap[selectedPage] || Armory; // Fallback to SideNav
    const [searchParams] = useSearchParams();
    const query = Object.fromEntries(searchParams.entries())
    const navigate = useNavigate(); 
    return (<div class="mainContainer">
        {
            
            handleRedirect()

        }
        </div>

    
    )
}