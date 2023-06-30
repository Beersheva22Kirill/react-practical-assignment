import { useMemo, useState } from "react"
import { useSelectorUserState } from "../Redux/store";
import FormAddComment from "./Forms/FormAddComment";
import ModalWindow from "./common/ModalWindow";
import CommentsBoard from "./ComentBoard";
import { postService } from "../Config/service-config";
import { useDispatch } from "react-redux";
import { renderStatusAction } from "../Redux/slices/RenderStatusSlice"

export default function Post ({post,callBackAddComment}) {
    
    const dispath = useDispatch();

    const currentUser = useSelectorUserState()
    const[postId,setId] = useState(0);
    const[autorName,setAuthorName] = useState(0);

    const [activeComments, setActiveComments] = useState(false)
    const [activeCommentsBoard,setActiveCommentsBoard] = useState(false)

    useMemo(() => setId(post.id),[])
    useMemo(() => setAuthorName(post.username),[])



    async function delPost (){
        post.comments.forEach(async (comment) => await postService.deleteComent(comment.id))
        await postService.deletePost(post.id)
        dispath(renderStatusAction.setStatusRender(true))
    }

    async function likeDislikeFn(like){
        const response = await postService.getPostById(post.id)
        const postForUpdate = response.result
      
        if(like){
            const indexLike = postForUpdate.likes.findIndex(user => user === currentUser)
            indexLike > -1 ? postForUpdate.likes.splice(indexLike,1) : postForUpdate.likes.push(currentUser)
        } else {
            const indexDislike = postForUpdate.dislikes.findIndex(user => user === currentUser)
            indexDislike > -1 ? postForUpdate.dislikes.splice(indexDislike,1) : postForUpdate.dislikes.push(currentUser)
        }
        await postService.updatePost(post.id,postForUpdate)
        dispath(renderStatusAction.setStatusRender(true))
    }

    async function addComment(newComment){
        const response = await postService.createComment(newComment)
        dispath(renderStatusAction.setStatusRender(true))
    }

    function callbackLike(){

    }

    function callbackCommentLike(){

    }

    function callbackDelComment(){

    }
    

    const addCommentForm = <FormAddComment currentUser={currentUser} id={post.id} title={post.title} callBackUploadComment={addComment}></FormAddComment>
    const AllComments = <CommentsBoard array={post.comments} callBackDel={callbackDelComment} callBackLikeFn={callbackLike}></CommentsBoard>
    
    return <div className="post-thumbnails">
            <ModalWindow active={activeComments} component={addCommentForm} setActive={setActiveComments}></ModalWindow>
            <ModalWindow active={activeCommentsBoard} component={AllComments} setActive={setActiveCommentsBoard}></ModalWindow>
            <div>
                <button disabled = {autorName != currentUser} onClick={delPost}>Delete</button>
            </div>
            <div className="post-information-place">
                <p className="post-date">{post.date}</p>
                <p className="post-author">{post.username}</p>
            </div>
            <div className="post-title-place">
                <h1>{post.title}</h1>
            </div>
            <div className = "image-thumbnaills-place">
                <img  src="#"></img>
            </div>
            <div className="post-comments-place">
                <p>Count comments: {post.comments.length}</p>
            </div>
            <div className="like-dislike-place">
                <p className="likes-place">{post.likes.length}</p>
                <p className="dislikes-place">{post.dislikes.length}</p>
            </div>
            <div className="button-place">
                
                <div className="button-place-like">                  
                    <button  onClick = {likeDislikeFn.bind(this,true)} className="button-like">Like</button>
                    <button  onClick = {likeDislikeFn.bind(this,false)} className="button-dislike">Dislike</button>
                </div>

                <div className="button-place-coments">
                    <button onClick={() => setActiveCommentsBoard(true)} className="button-open-coments">Open</button>
                    <button onClick={() => setActiveComments(true)} className="button-add-coments">Add</button>
                </div>
            </div>
    </div>
}