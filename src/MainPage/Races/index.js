import races from './races.json'
import {formatter} from '../../helpers'
import './test.css'
export default function Races() {
    const queryParams =  window.location.search
    const [query, queryParam] = queryParams.replace("?", "").split("=");

    const beautify = (queryParam) => {
        return(queryParam.replaceAll('%20', ' '))
    }

    const GiantLine = () => {
  return (
    <div
      style={{
        height: "10px", // Thickness of the line
        backgroundColor: "#000", // Line color
        width: "100%", // Full width
        margin: "20px 0", // Spacing around the line
      }}
    ></div>
  );
};
    return (<div class="subPageContainer">
        <h1>Races</h1>
        <br></br>
        {
            races.map((race) =>{
                
                const subraces = (queryParam) ? [...race.subraces].map((r) => ({...r, "parent" : race.name, "size" : r.size || race.size, "features" : {...race.features, ...r.features, }, "subrace_id" : true, "speed" : r.speed || race.speed, "asi" : {...race.asi, ...r.asi}})) : [...race.subraces].map((r) => ({...r, "subrace_id" : true}) )
                //(subraces.find((subrace) => subrace.name == queryParam).length == -1) ? 
                            
            
                const processed = [race, ...subraces]
                const processList =  (queryParam) ? processed.filter((race) => race.parent == beautify(queryParam) || race.name == beautify(queryParam)) : processed
                const y = processList.map((x) => 
                    <div class="list-item">

                        {(x.subrace_id) ? <><h5 class="list-item">{x?.name}</h5></> : <h3><GiantLine/>{x?.name}<br/><br/></h3>}
                         <div class={`${x.subrace_id ? "list-item" : ""}`}>
                        <div>{(x?.asi) ? Object.keys(x.asi).map((score) => (
                                    (x.asi[score] > 0) ?
                                   <div class={`${x.subrace_id ? "list-item" : ""}`}><b>Ability scores: </b> +{x.asi[score]} to {score} </div> : <></>
                                )) : <></>}</div>

                         <div class={`${x.subrace_id ? "list-item" : ""}`}>{(x?.size) ? <><b>Size:</b> {x?.size.join(" or ")}</> : <></>}</div>

                         <div class={`${x.subrace_id ? "list-item" : ""}`}>{
                            (x.speed) ? <>
                                {Object.keys(x.speed).map((s) => (
                                                <div class=""><b>Speed ({s}): </b>{x.speed[s]} feet</div>
                                ))}
                                </>
                                :
                                <></>
                            }
                        <></>
                    
                        </div>
                         <div class={`${x.subrace_id ? "list-item" : ""}`}>{
                            (x.languages) ? <><b>Languages: </b>
                                {
                                    x.languages.map((l, index) =>
                                        <span>{l}{index < x.languages.length - 1 ? <>, </> : <></>}</span>  
                                        
                                    )
                                    
                                    
                                    //<div class="list-item">{(l?.Choice) ? <>{l.Choice} choices of {l.Of.join(', ')} </> : <>{l}</>}</div>)
                                }
                                </>
                                :
                                <></>
                            }
                        <></>
                    
                        </div>
                         <div class={`${x.subrace_id ? "list-item" : ""}`}>{ (x.features) ? Object.keys(x.features).map((f) => <div><b>{f}</b>: {formatter(x.features[f])}<br/></div>) : <></>}</div>

                        </div>
                        <br/>
                        <h4>{!x?.subrace_id ? <>Subraces
                        
                            
                        
                        
                        
                        </> : <></>}</h4>
                        
                        
                        <br/>

                    </div>
                )
                return (y)
            
            
            
            
                }
            )

        }



    </div>)
}