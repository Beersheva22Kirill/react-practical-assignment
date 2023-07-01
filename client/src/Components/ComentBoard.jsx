import Comment from "./Comment";


export default function CommentsBoard ({array, title, callBackDel, callBackLikeFn}){

    const style = {display: "flex",
                    flexDirection: "column",
                    overflowY: "auto",
                    height: "60vh",
                    width:"90vw,"
}

    return <div>
                <div>
                    <h2>Comments of post: {title}</h2>
                </div>
            <div className="comments-board" style={style}>
                {array.map(commentElement => <Comment comment={commentElement} key={commentElement.id}></Comment>)}
            </div>
                
    </div>
}