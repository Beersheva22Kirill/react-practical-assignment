import { useDispatch } from "react-redux";
import { userStateAction } from "../../Redux/slices/AuthorizedSlice";
import { cloneElement } from "react";

export default function SignOut() {
    const dispath = useDispatch();
    
    function callBackFn() {  
        dispath(userStateAction.setStatus(undefined))
   }

    
    return  <div style={{textAlign:"center"}}>
                <button onClick={callBackFn}>Confirm exit</button>
            </div>
}