import Comment from "./Comment";


export default function CommentsBoard ({array, callBackDel, callBackLikeFn}){

    const style = {display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent:"center",
                    height: "60vh",
                    width:"90vw,"
}

    return <div style={style}>
                {array.map(commentElement => <Comment comment={commentElement} key={commentElement.id}></Comment>)}
    </div>
}