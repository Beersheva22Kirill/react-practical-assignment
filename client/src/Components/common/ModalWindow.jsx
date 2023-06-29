
export default function ModalWindow({component,active,setActive}){
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

    const styleModal = {position: "absolute",
                        width: "75vw",
                        height: "73vh",
                        top: "8%",
                        left: "8%",
                        borderRadius: "10px",
                        backgroundColor: "rgb(255, 255, 255)",
                        cursor: "default",
                        padding: "31px 15px",
                        }

    return <div style={modalPlace} hidden = {!active}>
            <div style={style} onClick={() => setActive(false)} hidden = {!active}>
                <div style={styleModal} onClick={(event) => event.stopPropagation()}>
                {component}
                </div>
            </div>
        </div>
            
}