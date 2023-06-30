import Post from "./Post";
import { postService } from "../Config/service-config";



export default function PostBoard ({array, callBackDel, callBackLikeFn}){
    
    function deletePost (id) {
        callBackDel(id)
    }

    function likeDislike(id,title,like) {
        callBackLikeFn(id,title,like)
    }

    const style = {display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent:"center",
                    height: "60vh",
                    width:"90vw,"
}
   
    return <div style={style}>
            {array.map(post => <Post key={post.id} id={post.id} autor={post.username} date={post.date} 
                                          title={post.title} likes={post.likes} 
                                          dislikes={post.dislikes} callBackDel={deletePost} callBackLike={likeDislike}>
                                    </Post>)}
            </div>
}