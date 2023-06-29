import { useMemo, useState } from "react";
import { useSelectorUserState } from "../../Redux/store";
import PostBoard from "../PostBoard";
import ModalWindow from "../common/ModalWindow";
import FormAddPost from "../Forms/FormAddPost";
import SearchComponent from "../common/SearchComponent";
import { postService } from "../../Config/service-config";

export default function Posts({arrayPosts}) {
    
    const currentUser = useSelectorUserState()
    const [activeModal, setActiveModal] = useState(false)
    

    async function newPost(post) {
        const response = await postService.createPost(post)
        console.log(`posts: ${response}`)
    }

    async function callbackSearch(str) {
        console.log(`search: ${str}`)
    }

    const addForm = <FormAddPost currentUser={currentUser} callBackFn={newPost}></FormAddPost>

    return <div className = "post-area">  
            <ModalWindow active={activeModal} component={addForm} setActive={setActiveModal}></ModalWindow>
            <div className="action-place">
                <button onClick={() => setActiveModal(true)}>Add posts</button>
                <SearchComponent callbackFn={callbackSearch}></SearchComponent>
            </div>
            <div className="post-place">
                <PostBoard array={arrayPosts}></PostBoard>
            </div>        
        </div>
}