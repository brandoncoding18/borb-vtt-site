import ammo from "./ammo.json";
import {useState} from 'react'; 
export function Ammunition() {
     
    return (<div><h1>Ammunition</h1>
    <br/>
        
        <div>
                    <br/>

                    <table class="table">
                    <thead>
                        
                        <tr>
                            <th scope="col">Type</th>
                            <th scope="col">Cost</th>
                            <th scope="col">Weight</th>
                            <th scope="col">For Use With</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                       {ammo.map((a) =>
                        
                        
                            <tr>
                                <td>{a.Name}</td>
                                <td>{a.Cost.Amount}{a.Cost.Currency}</td>
                                <td>{a["Units Per Sale"]} / 1lb</td>
                                <td>{a["For Use With"].join(", ")}</td>

                            </tr>
                        
                        
                        
                        )}
                        </tbody>
                    </table>

                </div>
      





    </div>)
    
}