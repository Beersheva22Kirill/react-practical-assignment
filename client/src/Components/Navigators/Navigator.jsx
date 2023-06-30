import { useEffect } from 'react';
import {NavLink, Outlet, useLocation, useNavigate} from 'react-router-dom';

export default function Navigator ({navItem, currentUser}) {

    const navigate = useNavigate();
    const location = useLocation();
 
    useEffect(() => {
        navigate(navItem[0][0]);
    },[navItem])

    return <div>
            <nav style={{display:'flex', alignItems:"center", width:"90vw", justifyContent:"center"}}>
                <p>Welcome: {currentUser}</p>
                <ul style={{display:'flex'}}>
                 {navItem.map(item => <li key={item[1]} className='nav-li'><NavLink to = {item[0]}>{item[1]}</NavLink></li>)}
                </ul>
            </nav>
            <Outlet></Outlet>
            </div>
       
}