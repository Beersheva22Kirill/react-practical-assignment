import { useDispatch } from "react-redux";
import { userStateAction } from "../../Redux/slices/AuthorizedSlice";

export default function SignOut() {
    const dispath = useDispatch();
    
    function callBackFn() {  
        dispath(userStateAction.setStatus(undefined))
   }

    
    return  <div>
                <button onClick={callBackFn}>Confirm exit</button>
            </div>
}