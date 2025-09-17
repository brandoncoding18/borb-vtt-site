import feats_table from "./feats.json"
import {useState} from "react"

export default function Feats({params}) {
     const queryParams =  window.location.search
    const [query, queryParam] = queryParams.replace("?", "").split("=");
    console.log(window.location.search)

    const beautify = (queryParam) => {
        return(queryParam.replaceAll('%20', ' '))
    }
    const feats = (queryParam) ? feats_table.filter((feat) => feat.Name == beautify(queryParam)) : feats_table
    
    return (<div class="subPageContainer">
        <h1>Feats</h1>
        <br></br>
        {
            feats.map((feat) => 
                (
                    <div>
                <div class="spellContainer">
                    <h4>  {(feat.Name)} </h4>
                    <div><b>Prerequisite: </b> {feat.Prereq}</div>
                    {feat.Desc.split("\n").map((line, lineIndex) => (
                        <div>{
                            
                   line.startsWith('\t')
                            ? <li>{line.replace(/^\t+/, (tabs) => '\u00A0\u00A0\u00A0\u00A0'.repeat(tabs.length))}</li>
                            : <p>{line}</p>
                        }
                            </div>
                ))}

                </div>
                                    <br/>

                    <br/>

                </div>
                ))
        }
        </div>
    
    ); 
}