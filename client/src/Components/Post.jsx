import { useMemo, useState } from "react"
import { useSelectorUserState } from "../Redux/store";

export default function Post ({id,title,autor,date,likes,dislikes,callBackDel,callBackLike}) {
    const currentUser = useSelectorUserState()
    const[postId,setId] = useState(0);
    const[autorName,setAuthorName] = useState(0);
    const[titlePost,setTitlePost] = useState(0);
    useMemo(() => setId(id),[])
    useMemo(() => setAuthorName(autor),[])
    useMemo(() => setTitlePost(title),[])

    return <div className="post-thumbnails">
            <div>
                <button hidden = {autorName != currentUser} onClick={() => callBackDel(postId)}>Delete</button>
            </div>
            <div className="post-information-place">
                <p className="post-date">{date}</p>
                <p className="post-author">{autor}</p>
            </div>
            <div className="post-title-place">
                <h1>{title}</h1>
            </div>
            <div className = "image-thumbnaills-place">
                <img  src="#"></img>
            </div>
            <div className="post-text-place">
                <p>Text of post</p>
            </div>
            <div className="like-dislike-place">
                <p className="likes-place">{likes.length}</p>
                <p className="dislikes-place">{dislikes.length}</p>
            </div>
            <div className="button-place">
                <button disabled = {likes.includes(currentUser)} onClick = {() => callBackLike(id,true)} className="button-like">Like</button>
                <button disabled = {dislikes.includes(currentUser)} onClick = {() => callBackLike(id,false)} className="button-dislike">Dislike</button>
            </div>
    </div>
}