
import './styles.css';
import {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectPage } from './zvkSlice'
import { useNavigate } from "react-router";

export default function SideNav({selectedPage}) {

    const pages = useSelector((state) => state.zvk.pages)

   // const activePage = useSelector((state) => state.zvk.pageSelect)
    const dispatch = useDispatch()
    const navigate = useNavigate(); 

    const handleActivePage = (p) => {
       // dispatch(selectPage(p))
        navigate(`../${p.name}`)
    }
    return (<div className="sideNav"> 
    {
        pages.map((p) => 
            (<a className={`sideNavLink ${selectedPage === p.name ? "a" : ""}`}  onClick={() => 
                handleActivePage(p)}>
                {p.name} <img class="icon" src={p.tag}></img>
                <div> EXPAND </div>

            </a>))
    }
    
    
    </div>)
}