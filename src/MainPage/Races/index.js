import races from './races.json'
export default function Races() {
    const queryParams =  window.location.search
    const [query, queryParam] = queryParams.replace("?", "").split("=");
    console.log(window.location.search)

    const beautify = (queryParam) => {
        return(queryParam.replaceAll('%20', ' '))
    }
    const race_table = (queryParam) ? races.filter((race) => race.name == beautify(queryParam)) : races

    return (<div>
        <h1>Races</h1>
        <br></br>
        {
            race_table.map((race) =>{

                const processList = [race, ...race.subraces];
                const y = processList.map((x) => 
                    <div>
                        <h3>{x?.name}</h3>
                        <h5>{x?.sub}</h5>
                        <div>{(x?.size) ? <><b>Size:</b> {x?.size}</> : <></>}</div>

                        {/*<div>{(x.asi) ? `${x?.asi?.Choice} ${(x?.asi?.Of) ? `choices of ${x?.asi.Of} of your ` : ''} ability scores increase by ${x?.asi?.Amount}` : <></>}</div>*/}
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