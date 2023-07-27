import { useMemo, useState } from "react"
import { useSelectorUserState } from "../Redux/store";
import FormAddComment from "./Forms/FormAddComment";
import ModalWindow from "./common/ModalWindow";
import CommentsBoard from "./ComentBoard";
import { postService } from "../Config/service-config";
import { useDispatch } from "react-redux";
import { renderStatusAction } from "../Redux/slices/RenderStatusSlice"
import { toDateTimeISOString } from "../utils/dateFuntion";
import FormPost from "./Forms/FormPost";

export default function Post ({post}) {
    const datePost = toDateTimeISOString(post.date)
   
    const dispath = useDispatch();

    const currentUser = useSelectorUserState()
    const[postId,setId] = useState(0);
    const[autorName,setAuthorName] = useState(0);

    const [activeComments, setActiveComments] = useState(false)
    const [activeCommentsBoard,setActiveCommentsBoard] = useState(false)
    const [activeUpdatePost,setActiveUpdatePost] = useState(false)

    useMemo(() => setId(post.id),[])
    useMemo(() => setAuthorName(post.username),[])

    const style_like = { width:'25px',
                        marginRight:'6px'            }

    const style_dislike = { width:'25px'}


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
        updatePost(post.id,postForUpdate)
    }

    async function updatePost(newPost,id){
        await postService.updatePost(id,newPost)
        dispath(renderStatusAction.setStatusRender(true))
    }

    async function uploadImage(file,id) {
        const response = await postService.uploadImage(file,id)
        setActiveUpdatePost(false);
        dispath(renderStatusAction.setStatusRender(true))
        return response.status = "success" ? response.result : response
       
    }

    async function addComment(newComment){
        const response = await postService.createComment(newComment)
        setActiveComments(false)
        dispath(renderStatusAction.setStatusRender(true))
    }
    

    const addCommentForm = <FormAddComment currentUser={currentUser} id={post.id} title={post.title} callBackUploadComment={addComment}></FormAddComment>
    const AllComments = <CommentsBoard title={post.title} array={post.comments}></CommentsBoard>
    const formUpdate = <FormPost post={post} callBackFn={updatePost} callBackUploadImage={uploadImage} currentUser={currentUser}></FormPost>
    
    return <div className="post-thumbnails">
        <ModalWindow closeArea={true} active={activeUpdatePost} component={formUpdate} setActive={setActiveUpdatePost}></ModalWindow>
            <ModalWindow closeArea={true} active={activeComments} component={addCommentForm} setActive={setActiveComments}></ModalWindow>
            <ModalWindow closeArea={true} active={activeCommentsBoard} component={AllComments} setActive={setActiveCommentsBoard}></ModalWindow>
            <div className="button-top-place">
                <button disabled = {autorName != currentUser} onClick={() => setActiveUpdatePost(true)}>Update</button>
                <button disabled = {autorName != currentUser} onClick={delPost}>Delete</button>
            </div>
            <div className="post-information-place">
                <p className="post-date">{datePost}</p>
                <p className="post-author">{post.username}</p>
            </div>
            <div className="post-title-place">
                <h1 className="post-title">{post.title}</h1>
            </div>
            <div className = "image-thumbnaills-place">
                <img className="image-thumbnaills" 
                src = {post.imageSrc ? post.imageSrc : process.env.PUBLIC_URL + "/image/noimage.png"}></img>
            </div>
            <div className="post-comments-place">
                <p className="count-comments">Count comments: {post.comments.length}</p>
            </div>
            <div className="like-dislike-place">
                <p className="likes-place">{post.likes.length} likes</p>
                <p className="dislikes-place">{post.dislikes.length} dislikes</p>
            </div>
            <div className="button-place">
                
                <div className="button-place-like"> 
                <div style={{width: '15px', height: '15px'}}>
                
                </div>  
                    <img  className="img-like-dislike" 
                        hidden = {currentUser === 'unauthorized'} 
                        onClick = {likeDislikeFn.bind(this,true)} style = {style_like} 
                        src = {process.env.PUBLIC_URL + `/image/icons/${post.likes.includes(currentUser)? "like.png" : "like_nopress.png"}`}></img> 
                    <img className="img-like-dislike" 
                        hidden = {currentUser === 'unauthorized'} 
                        onClick = {likeDislikeFn.bind(this,false)} style = {style_dislike} 
                        src = {process.env.PUBLIC_URL + `/image/icons/${post.dislikes.includes(currentUser)? "dislike.png" : "dislike_nopress.png"}`}></img>              
                </div>
 
                <div className="button-place-coments">
                    <button onClick={() => setActiveCommentsBoard(true)} className="button-open-coments">Open</button>
                    <button disabled = {currentUser === 'unauthorized'} onClick={() => setActiveComments(true)} className="button-add-coments">Add</button>
                </div>
            </div>
    </div>
}