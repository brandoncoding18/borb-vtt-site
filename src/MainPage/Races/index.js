import races from './races.json'
export default function Races() {
    const queryParams =  window.location.search
    const [query, queryParam] = queryParams.replace("?", "").split("=");

    const beautify = (queryParam) => {
        return(queryParam.replaceAll('%20', ' '))
    }

    return (<div class="subPageContainer">
        <h1>Races</h1>
        <br></br>
        {
            races.map((race) =>{
                
                const subraces = (queryParam) ? [...race.subraces].map((r) => ({...r, "size" : r.size || race.size, "features" : {...race.features, ...r.features, }, "speed" : r.speed || race.speed, "asi" : {...race.asi, ...r.asi}})) : race.subraces
                //(subraces.find((subrace) => subrace.name == queryParam).length == -1) ? 
                            

                const processed = [race, ...subraces]
                const processList =  (queryParam) ? processed.filter((race) => race.name == beautify(queryParam)) : processed
                const y = processList.map((x) => 
                    <div>
                        
                        <h3>{x?.name}</h3>
                        <h5>Ability Scores:</h5>
                        <div>{(x?.asi) ? Object.keys(x.asi).map((score) => (
                                    (x.asi[score] > 0) ?
                                   <div><b>{score}: </b> +{x.asi[score]}</div> : <></>
                                )) : <></>}</div>
                                <br/>
                        <h5>Features:</h5>
                        <div>{Object.keys(x.features).map((f) => <div><b>{f}</b>: {x.features[f]}<br/></div>)}</div>
                        <h5>{x?.sub}</h5>
                        <div>{(x?.size) ? <><b>Size:</b> {JSON.stringify(x?.size)}</> : <></>}</div>
                        
                        <div>{
                            (x.speed) ? <><b>Speed: </b>
                                {Object.keys(x.speed).map((s) => (
                                                <li>{s}: {x.speed[s]} feet</li>
                                ))}
                                </>
                                :
                                <></>
                            }
                        <></>
                    
                        </div>
                        <div>{
                            (x.languages) ? <><b>Languages: </b>
                                {
                                    x.languages.map((l) => <li>{(l?.Choice) ? <>{l.Choice} choices of {l.Of.join(', ')} </> : <>{l}</>}</li>)
                                }
                                </>
                                :
                                <></>
                            }
                        <></>
                    
                        </div>
                        <br/>

                    </div>
                )
                return (y)
            
            
            
            
                }
            )

        }



    </div>)
}