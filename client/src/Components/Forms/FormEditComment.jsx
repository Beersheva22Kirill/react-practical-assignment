import React, {useState } from "react";


export default function FormEditComment({editComment, callBackUploadComment}) {

    function onSubmitFn (event) {
        const newComment = {}
        event.preventDefault();
        const formData = new FormData(document.getElementById("form-edit-comment"));
        newComment.text = formData.get("text-comment")
        callBackUploadComment(newComment)

    }

    return <form onSubmit={onSubmitFn} id = "form-edit-comment">
            <div>
                <div>
                    <p>{editComment.username}</p>
                </div>
                <div className="text-place">
                    <textarea name = "text-comment" className="text-comments" placeholder="Enter your comment" defaultValue={editComment.text}></textarea>
                </div>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </div>
        </form>
    
    
    
   
    
}