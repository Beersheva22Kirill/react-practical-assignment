import React, {useState,useEffect,useMemo} from "react";
import { useRef } from "react";


let newPost ={};

export default function FormPost ({post,currentUser, callBackFn, callBackUploadImage}) {
    const defaultImage = React.createElement('img',{src:process.env.PUBLIC_URL + '/image/noimage.png', className:"preload-image"});
    const path = post ? post.imageSrc : undefined
    const postImage = post ? post.imageSrc ? React.createElement('img',{src:path, className:"preload-image"}) : undefined : undefined;

    const [imageComponent, setImage] = useState(post ? postImage : defaultImage)
    const form = useRef(0)

    useEffect(() => {
        setImage(post ? postImage : defaultImage)
    },[post])

    function onChangeFn(event){
        
        const formData = new FormData(form.current);
        const reader = new FileReader();
        const file = formData.get("picture")
        reader.readAsDataURL(file);
        reader.onloadend = function () {
            const image = React.createElement('img',{src:reader.result, className:"preload-image"});
           
            setImage(image) 
        }       
        
    }

    async function onSubmiFn(event) {
        event.preventDefault()
        const formDataPost = new FormData(form.current);
        newPost.title = formDataPost.get("title-post");
        newPost.username = formDataPost.get("name-author")
        let newPostObj;
        if(post){
            newPostObj = await callBackFn(post.id, newPost) 
        } else {
            newPostObj = await callBackFn(newPost)  
        }    
        await callBackUploadImage(post ? post.id : newPostObj.id,formDataPost)
        form.current.reset();
        setImage(defaultImage)
    }

    return <div>
        <form ref={form} id="form-add-post" onSubmit={onSubmiFn}>
                <div style={{display:"flex", flexDirection:'column', alignItems:'center'}}>
                    <input style={{width:'40%',marginTop:'5px'}} name="name-author" type="text" required defaultValue={currentUser} readOnly></input>
                    <input style={{width:'40%',marginTop:'5px'}} name="title-post"  type="text" required placeholder="Enter title of post" defaultValue={post ? post.title : null}></input> 
                </div>
                <div style={{display:"flex", flexDirection:'column', alignItems:'center'}}>
                    <input style={{marginTop:'5px', marginBottom:'5px'}} id = "image-path-id" name = "picture" type="file" onChange={() => onChangeFn()}></input>
                    <div id = "image-place">
                        {imageComponent}
                    </div>
                </div>
                <div style ={{display:"flex", justifyContent:'center', marginTop:'5px'}}><button type="submit">{post ? 'Update post' : 'Create post'}</button></div>
            </form>
    </div>
}