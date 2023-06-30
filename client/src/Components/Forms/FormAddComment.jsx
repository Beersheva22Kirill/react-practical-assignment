import React, {useState } from "react";


export default function FormAddComment({currentUser, title, id, callBackUploadComment}) {

    function onSubmitFn (event) {
        const newComment = {};
        event.preventDefault();
        const formData = new FormData(document.getElementById("form-add-comment"));
        newComment.text = formData.get("text-comment");
        newComment.postId = id;
        newComment.username = currentUser;
        callBackUploadComment(newComment)

    }

    return <form onSubmit={onSubmitFn} id = "form-add-comment">
            <div>
                <h1>Add Coments of post {title}</h1>
                <div>
                    <p>{currentUser}</p>
                </div>
                <div className="text-place">
                    <textarea name = "text-comment" className="text-comments" placeholder="Enter your comment"></textarea>
                </div>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </div>
        </form>
    
    
    
   
    
}