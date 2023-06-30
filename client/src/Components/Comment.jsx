import { useMemo, useState } from "react"
import { useSelectorUserState } from "../Redux/store";

export default function Comment ({comment,callBackDel,callBackLike}) {
    return <div>
        <div className="title-comment">
            <p>{comment.date}</p>
            <p>{comment.autor}</p>
        </div>
        <div className="text-comment">
            <p>{comment.text}</p>
        </div>
        <div className="button-place">
            <button>like</button>
            <button>dis</button>
        </div>
    </div>
}