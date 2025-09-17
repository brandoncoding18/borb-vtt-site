import {useState} from 'react';
import { useLocation } from 'react-router-dom';

import nations from './nations.json'
export default function Nations() {
     const selections = ["Zentravalk", "Orientavalk", "Mahanna"]
    const [binderSelection, setBinderSelection] = useState(selections[0])
    const handleNavigate = (queryParam, queryParamName) => {
        window.open(`${window.location.origin}/Redirect/?${queryParamName}=${queryParam.replaceAll(" ", "%20")}`)
    }
    
    const formatter = (listToConvert) => {
        
        return <span>{listToConvert.map((l) => {
           //
           var fullHtmlString = []; 
           var temp = l; 
          // return <div>{l.indexOf('~#')}</div>
           while(temp.indexOf('~#') != -1) {
                const startIndex = temp.indexOf('~')
                const endIndex = temp.indexOf('~#')
                const param = temp.substring(startIndex, endIndex + 2)
                const queryParamName = temp.substring(startIndex + 1, startIndex + 2)
                const queryParam = temp.substring(startIndex + 2, endIndex)
                console.log(queryParam)
                
                const paramNoCode = temp.substring(startIndex + 2, endIndex)
                temp = temp.replace(param, `<span><a href=./Redirect/?${queryParamName}=${queryParam.replaceAll(" ", "%20")} target="_blank">${queryParam}</a></span>`)

                //temp = temp.replace(param, `<span><a href=# onClick={${handleNavigate(queryParam, queryParamName)}}>${queryParam}</a></span>`)
           }
            fullHtmlString += temp + "  |   ";

            return <a
                dangerouslySetInnerHTML={{ __html: fullHtmlString }}
                />

        }    

        )
        }</span>
    }
    

    
    const linkHelper = (term) => {
        const index = term.indexOf('~');
        const lastIndex = term.indexOf('~#')
        var queryParamName = term.substring(index + 1, index + 2)
        var queryParam = term.substring(index + 2, lastIndex)
        var desc = term.substring(lastIndex + 2)
         //var desc = term.replaceAll(`~`, '').replaceAll(term.charAt(index+1), '')
        //console.log(desc)
       return ((index > -1) ? <span><a href={`./Redirect/?${queryParamName}=${queryParam}`}>{queryParam}</a>{desc}</span> : <>{desc}</>)

    }
    return (
    <div className="subPageContainer">

        <h1>Regions</h1>
            <div class="binderContainer">
            {selections.map((s) => (
                <a class={`binderSelection ${binderSelection == s ? "active" : ""}`} onClick={() => {
                    (binderSelection != s) ? setBinderSelection(s) : setBinderSelection(null)
                }}>{`${s}`}</a>
            ))}
            </div>

            <div>

                {
                    
                    nations.map((n) => 
                        <div>
                            {!n["member of"] ? <h2>{n.name}</h2> : <h3>{n.name}</h3>}
                            <div>
                                {
                                    Object.keys(n).map((k, index) => 
                                        (index > 0 && k != "member of") ?
                                        <div>
                                            
                                            <b>{(k[0].toUpperCase() + k.substring(1)).replace("_", " ")}: </b>
                                            {/*n[k].join().split(',').reduce((current, acc) =>
                                            
                                            acc += linkHelper(current)
                                        , "")
                                        */
                                        
                                        <span>|  {formatter(n[k])}</span>}</div> : <></>
                                    
                                    )
                                    /*n.spells.join().split('~#').map((s) => 
                                    <div>{linkHelper(s)}</div>
                                    )*/
                                }
                            <br/>
                            </div> 
                        </div>
                    )
                    
                }
            </div>

    </div>)
}