import { useMemo, useState } from "react"
import { useSelectorUserState } from "../Redux/store";
import FormAddComment from "./Forms/FormAddComment";
import ModalWindow from "./common/ModalWindow";
import CommentsBoard from "./ComentBoard";
import { postService } from "../Config/service-config";
import { useDispatch } from "react-redux";
import { renderStatusAction } from "../Redux/slices/RenderStatusSlice"
import { toDateTimeISOString } from "../utils/dateFuntion";

export default function Post ({post}) {
    const datePost = toDateTimeISOString(post.date)
   
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
        let postForUpdate = JSON.stringify(post)
        postForUpdate = JSON.parse(postForUpdate)
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
    

    const addCommentForm = <FormAddComment currentUser={currentUser} id={post.id} title={post.title} callBackUploadComment={addComment}></FormAddComment>
    const AllComments = <CommentsBoard title={post.title} array={post.comments}></CommentsBoard>
    
    return <div className="post-thumbnails">
            <ModalWindow closeArea={true} active={activeComments} component={addCommentForm} setActive={setActiveComments}></ModalWindow>
            <ModalWindow closeArea={true} active={activeCommentsBoard} component={AllComments} setActive={setActiveCommentsBoard}></ModalWindow>
            <div>
                <button disabled = {autorName != currentUser} onClick={delPost}>Delete</button>
            </div>
            <div className="post-information-place">
                <p className="post-date">{datePost}</p>
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
                    <button  disabled = {currentUser === 'unauthorized'} onClick = {likeDislikeFn.bind(this,true)} className="button-like">Like</button>
                    <button  disabled = {currentUser === 'unauthorized'} onClick = {likeDislikeFn.bind(this,false)} className="button-dislike">Dislike</button>
                </div>
 
                <div className="button-place-coments">
                    <button onClick={() => setActiveCommentsBoard(true)} className="button-open-coments">Open</button>
                    <button disabled = {currentUser === 'unauthorized'} onClick={() => setActiveComments(true)} className="button-add-coments">Add</button>
                </div>
            </div>
    </div>
}