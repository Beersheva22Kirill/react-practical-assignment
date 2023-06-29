import { useEffect, useState } from "react"
import ModalWindow from "./common/ModalWindow"
import { userStateAction } from "../Redux/slices/AuthorizedSlice";
import { useDispatch } from "react-redux";
import { postService } from "../Config/service-config";
import { cashPostAction } from "../Redux/slices/PostCashSlice";

async function getAllPost() {
    const res = await postService.getPostsByPage();
    return res
    
}

export default function Autorized() {
    const [activeModal, setActiveModal] = useState(true)
    const [array, setArray] = useState([])

    const style = {display:'flex',
                   flexDirection:'column',
                   alignItems:"center"   
                }
    const styleInput = {"width":"10vw"}
    const styleButton = {"width":"10vw"}
    
    const dispath = useDispatch();

    useEffect(()=> {
        getAllPost().then(response => {
          setArray(response.result);
          console.log(response.result);
              }).catch(() => setArray([]))
    },[array.length])


    async function submitFn(event) {
        event.preventDefault()
        
        let current_user = {}
        const formData = new FormData(document.getElementById("form-autorized"));
        current_user.userName = formData.get("user-name");
        current_user.password = formData.get("password")
        dispath(userStateAction.setStatus(current_user.userName))
        dispath(cashPostAction.setCashPost(array))
        setActiveModal(false)
    }

    function anchorWithoutAuth(){
        dispath(userStateAction.setStatus('unauthorized'))
        setActiveModal(false)
    }

    const autorizetionForm = <form id="form-autorized" style={style} onSubmit={submitFn}>
                                <input name="user-name" style={styleInput} type="text" required></input>
                                <a href="#" onClick={anchorWithoutAuth}>Enter without registration</a>
                                <button style={styleButton} type="submit">Submit</button>
                            </form>

    return <div>
            <ModalWindow component={autorizetionForm} active={activeModal} setActive={setActiveModal}/>
            </div>
            
}
