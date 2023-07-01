import { useMemo, useState } from "react"
import { toDateTimeISOString } from "../utils/dateFuntion";
import { useSelectorUserState } from "../Redux/store";
import { postService } from "../Config/service-config";
import { connect, useDispatch } from "react-redux";
import { renderStatusAction } from "../Redux/slices/RenderStatusSlice"
import ModalWindow from "./common/ModalWindow";
import FormEditComment from "./Forms/FormEditComment";

export default function Comment ({comment}) {
    const dateComment = toDateTimeISOString(comment.date)
    const [activModal, setActiveModal] = useState(false)
    const dispath = useDispatch()
    const currentUser = useSelectorUserState()

    function likeDislike(like){
        let commentForUpdate = JSON.stringify(comment);
        commentForUpdate = JSON.parse(commentForUpdate)
        if(like){
            const indexLike = commentForUpdate.likes.findIndex(user => user === currentUser)
            indexLike > -1 ? commentForUpdate.likes.splice(indexLike,1) : commentForUpdate.likes.push(currentUser)
        } else {
            const indexDislike = commentForUpdate.dislikes.findIndex(user => user === currentUser)
            indexDislike > -1 ? commentForUpdate.dislikes.splice(indexDislike,1) : commentForUpdate.dislikes.push(currentUser)
        }
        updateComent(commentForUpdate)

    }

    function editComment(commentUpd) {
        let newComment = JSON.stringify(comment);
        newComment = JSON.parse(newComment)
        newComment.text = commentUpd.text
        updateComent(newComment)
    }

    async function updateComent(comment){
        setActiveModal(false)
        await postService.updateComment(comment)
        dispath(renderStatusAction.setStatusRender(true))
    }

    async function delComment (){
        await postService.deleteComent(comment.id)
        dispath(renderStatusAction.setStatusRender(true))
    }

    const editForm = <FormEditComment editComment={comment} callBackUploadComment={editComment}></FormEditComment>
    return <div>
        <ModalWindow active={activModal} component={editForm} setActive={setActiveModal}></ModalWindow>
        <div className="comment-place">
        
        <div className="title-comment">
            <p className="title-information">{dateComment}</p>
            <p className="title-information">  user: {comment.username}</p>
        </div>
        <div className="text-comment-place">
            <p style={{margin:0}} className="text-comment-place">{comment.text}</p>
        </div>
        <div className="button-place">
            <div className="rating-section">
                <button onClick={() => likeDislike(true)}>like</button>
                <p style={{paddingLeft:"5px", paddingRight:"5px", margin:0}}>{comment.likes.length}</p>
                <button onClick={() => likeDislike(false)} >dis</button>
                <p style={{paddingLeft:"5px", paddingRight:"5px", margin:0}}>{comment.dislikes.length}</p>
            </div>
            <div className="control-section">
            <button disabled ={comment.username != currentUser} onClick={() => setActiveModal(true)} className="button-control">Edit</button>
            <button disabled = {comment.username != currentUser} onClick={delComment} className="button-control">Del</button>
            </div>
        </div>
    </div>
    </div>
    
}