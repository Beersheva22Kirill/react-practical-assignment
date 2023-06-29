import React, {useState } from "react";

let newPost ={};

export default function FormAddPost ({currentUser, callBackFn}) {
    
    const [imageComponent, setImage] = useState()

    function onSubmiFn (event) {
        event.preventDefault()
        const formData = new FormData(document.getElementById("form-add-post"));
        newPost.title = formData.get("title-post");
        newPost.username = formData.get("name-author")
        callBackFn(newPost);

    }

    function onChangeFn(event){
        const formData = new FormData(document.getElementById("form-add-post"));
        const reader = new FileReader();
        const file = formData.get("image-file")
        reader.readAsDataURL(file);
        reader.onloadend = function () {
            const image = React.createElement('img',{src:reader.result, className:"preload-image"});
            setImage(image)
        }
        
    }

    return <form id="form-add-post" onSubmit={onSubmiFn}>
                <div style={{display:"flex", justifyContent:"center"}}>
                    <input name="title-post"  type="text" required placeholder="Enter title of post"></input>
                    <input name="name-author" type="text" required defaultValue={currentUser}></input>
                </div>
                <div>
                    <input id = "image-path-id" name = "image-file" type="file" onChange={onChangeFn}></input>
                    <div id = "image-place"></div>
                    {imageComponent}
                </div>
                <div><button type="submit">Submit</button></div>
            </form>
}