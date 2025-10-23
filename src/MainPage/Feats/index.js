import feats_table from "./feats.json"
import {useState} from "react"
import {formatter} from '../../helpers.js'
import '../../styles.css'
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
            feats.sort((a, b) => a.Name.localeCompare(b.Name)).map((feat) => 
                (
                    <div>
                <div class="tab-item">
                    <h4>  {(feat.Name)} </h4>
                    {(feat.Prereq && feat.Prereq != 'N/A') ?  <div><b>Prerequisite: </b> {feat.Prereq}</div> : <></>}
                    <></>
                    <div >{formatter(feat.Desc)}</div>
                    

                </div>
                                    <br/>

                    <br/>

                </div>
                ))
        }
        </div>
    
    ); 
}