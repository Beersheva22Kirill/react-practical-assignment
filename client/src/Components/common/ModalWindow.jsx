
export default function ModalWindow({component,active,setActive,closeArea}){
    const modalPlace = {position: "absolute",
                        width: "100%",
                        height: "100%",
                        left: "0",
                        top: "0",
                    }
    
    const style = {background: "rgba(0, 0, 0, 0.4)",
                   position: "fixed",
                   width: "100%",
                   height: "100%",
                   cursor: "pointer",
                }

    return <div style={modalPlace} hidden = {!active}>
            <div  style={style} onClick={() => closeArea ? setActive(false) : setActive(true)} hidden = {!active}>
                <div className = "modal_place_window"  onClick={(event) => event.stopPropagation()}>
                {component}
                </div>
            </div>
        </div>
            
}