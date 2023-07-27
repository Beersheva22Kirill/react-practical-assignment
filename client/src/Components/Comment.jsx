import {useRef, useMemo, useState } from "react"
import { toDateTimeISOString } from "../utils/dateFuntion";
import { useSelectorUserState } from "../Redux/store";
import { postService } from "../Config/service-config";
import { connect, useDispatch } from "react-redux";
import { renderStatusAction } from "../Redux/slices/RenderStatusSlice"
import ModalWindow from "./common/ModalWindow";

export default function Comment ({comment}) {
    const dateComment = toDateTimeISOString(comment.date)
    const [activModal, setActiveModal] = useState(false)
    const dispath = useDispatch()
    const newText = useRef(0)
    const currentUser = useSelectorUserState()

    const style_like = { width:'30px'}
    const style_dislike = { width:'30px'}


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
        updateComment(commentForUpdate)

    }

    function prepareComment(){
        let newComment = JSON.stringify(comment);
        newComment = JSON.parse(newComment)
        newComment.text = newText.current.value;
        updateComment(newComment)
        alert('Comment updated')
    }

    async function updateComment(newComment){

        await postService.updateComment(newComment)
        dispath(renderStatusAction.setStatusRender(true))
       
    }

    async function delComment (){
        await postService.deleteComent(comment.id)
        dispath(renderStatusAction.setStatusRender(true))
    }

    return <div>
             
        <div className="comment-place">
        
        <div className="title-comment">
            <p className="title-information">{dateComment}</p>
            <p className="title-information">  user: {comment.username}</p>
        </div>
        <div className="text-comment-place">
            <textarea  ref={newText} className="text-comments" defaultValue={comment.text} readOnly = {comment.username != currentUser }></textarea>
        </div>
        <div className="button-place">
            <div className="rating-section">
                <img  className="img-like-dislike" 
                        hidden = {currentUser === 'unauthorized'} 
                        onClick = {() => likeDislike(true)} style = {style_like} 
                        src = {process.env.PUBLIC_URL + `/image/icons/${comment.likes.includes(currentUser)? "like.png" : "like_nopress.png"}`}></img> 
                <p style={{paddingLeft:"5px", paddingRight:"5px", margin:0}}>{comment.likes.length}</p>
                <img className="img-like-dislike" 
                        hidden = {currentUser === 'unauthorized'} 
                        onClick = {() => likeDislike(false)} style = {style_dislike} 
                        src = {process.env.PUBLIC_URL + `/image/icons/${comment.dislikes.includes(currentUser)? "dislike.png" : "dislike_nopress.png"}`}></img>
                <p style={{paddingLeft:"5px", paddingRight:"5px", margin:0}}>{comment.dislikes.length}</p>        
            </div>
        </div>
        <div className="control-section">
            <button disabled ={comment.username != currentUser} onClick={() => prepareComment()} className="button-control">Update comment</button>
            <button disabled = {comment.username != currentUser} onClick={delComment} className="button-control">Del</button>
        </div>
    </div>
    </div>
    
}