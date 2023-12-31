import { useEffect } from 'react';
import {NavLink, Outlet, useLocation, useNavigate} from 'react-router-dom';

export default function Navigator ({navItem, currentUser}) {

    const navigate = useNavigate();
    const location = useLocation();
 
    useEffect(() => {
        navigate(navItem[0][0]);
    },[navItem])

    return <div>
            <nav style={{display:'flex', alignItems:"baseline", width:"90vw", justifyContent:"center"}}>
                <p style={{margin:0}}>Welcome: {currentUser}</p>
                <ul style={{display:'flex', margin:0}}>
                 {navItem.map(item => <li key={item[1]} className='nav-li'><NavLink className={"li-navlink"} to = {item[0]}>{item[1]}</NavLink></li>)}
                </ul>
            </nav>
            <Outlet></Outlet>
            </div>
       
}