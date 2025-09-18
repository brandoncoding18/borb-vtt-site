import {useState} from 'react';
import { useLocation } from 'react-router-dom';
import {formatter} from '../../helpers'
import nations from './nations.json'
export default function Nations() {
     const selections = ["Zentravalk", "Orientavalk", "Mahanna"]
    const [binderSelection, setBinderSelection] = useState(selections[0])
    const handleNavigate = (queryParam, queryParamName) => {
        window.open(`${window.location.origin}/Redirect/?${queryParamName}=${queryParam.replaceAll(" ", "%20")}`)
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
                                {
                                [n, ...(n.subnations || []).map((x) => ({...x, 'subnation' : true}))].map((nation) => 

                                <div>
                                    {
                                        <>
                                        <div>{!nation.subnation ? <GiantLine/> : <></>}</div>
                                        <div>{(nation.subnation) ? <h4>{nation.name}</h4> : <h2>{nation.name}</h2>}</div>
                                        <div>{(nation.races) ? <><b>Races: </b>| {(nation.races).map((r) => <>{formatter(r)}</>)}</>: <></>}</div>
                                        <div>{(nation.feats) ? <><b>Feats: </b>| {(nation.feats).map((r) => <>{formatter(r)}</>)}</> : <></>}</div>
                                        <div>{(nation.spells) ? <><b>Spells: </b>| {(nation.spells).map((r) => <>{formatter(r)}</>)}</> : <></>}</div>
                                        <div>{(nation.unique_feat) ? <><b>Unique Feat: </b>| {(nation.unique_feat).map((r) => <>{formatter(r)}</>)}</> : <></>}</div>
                                        <div>{(nation.language) ? <><b>Language: </b>| {(nation.language).map((r) => <>{formatter(r)}</>)}</> : <></>}</div>

                                        </>
                                    /*
                                        <div>
                                        /*Object.keys(nation).map((k, index) => 
                                            (index > 0 && k != 'subnation') ?
                                            <div>
                                                
                                                <b>{(k[0].toUpperCase() + k.substring(1)).replace("_", " ")}: </b>
                                             
                                            
                                            <span>|  {/*formatter(n[k])}</span>}</div> : <></>
                                        
                                        )
                                        */
                                    }
                                <br/>
                                </div>
                                )
                            }
                            </div>
                    )
                }
                <GiantLine/>
            </div>
                
    </div>
   )
}
  