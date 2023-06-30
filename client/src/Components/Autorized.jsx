import { useState } from "react"
import ModalWindow from "./common/ModalWindow"
import { userStateAction } from "../Redux/slices/AuthorizedSlice";
import { useDispatch } from "react-redux";


export default function Autorized() {

    const [activeModal, setActiveModal] = useState(true)

    const dispath = useDispatch();

    function submitFn(event) {
        event.preventDefault() 
        let current_user = {}
        const formData = new FormData(document.getElementById("form-autorized"));
        current_user.userName = formData.get("user-name");
        current_user.password = formData.get("password")
        dispath(userStateAction.setStatus(current_user.userName))
        setActiveModal(false)
    }

    function anchorWithoutAuth(){
        dispath(userStateAction.setStatus('unauthorized'))
        setActiveModal(false)
    }

    const style = {display:'flex',
                    flexDirection:'column',
                    alignItems:"center"   
                    }

    const styleInput = {"width":"10vw"}
    const styleButton = {"width":"10vw"}

    const autorizetionForm = <form id="form-autorized" style={style} onSubmit={submitFn}>
                                <input name="user-name" style={styleInput} type="text" required></input>
                                <a href="#" onClick={anchorWithoutAuth}>Enter without registration</a>
                                <button style={styleButton} type="submit">Submit</button>
                            </form>

    return <div>
            <ModalWindow component={autorizetionForm} active={activeModal} setActive={setActiveModal}/>
            </div>
            
}
