import PostsService from "../Services/PostsService";
import { useEffect, useMemo, useState, useRef} from "react";
import Post from "./Post";



export default function PostBoard ({array}){
    

    const style = {display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent:"center",
                    height: "60vh",
                    width:"90vw,"
}
   
    return <div style={style}>
            {array.map(post => <Post key={post.id} autor={post.username} date={post.date} 
                                          title={post.title} likes={post.likes.length} 
                                          dislikes={post.dislikes.length}>
                                    </Post>)}
            </div>
}