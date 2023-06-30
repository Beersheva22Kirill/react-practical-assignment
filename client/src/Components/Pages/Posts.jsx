import { useEffect, useMemo, useState } from "react";
import { useSelectorCashPosts, useSelectorCurrentPageStatus, useSelectorRenderStatus, useSelectorUserState } from "../../Redux/store";
import PostBoard from "../PostBoard";
import ModalWindow from "../common/ModalWindow";
import FormAddPost from "../Forms/FormAddPost";
import SearchComponent from "../common/SearchComponent";
import { postService } from "../../Config/service-config";
import { useDispatch } from "react-redux";
import { cashPostAction } from "../../Redux/slices/PostCashSlice";
import { currentPageAction } from "../../Redux/slices/CurrentPageSlice";
import PageController from "../common/PageController";
import { renderStatusAction } from "../../Redux/slices/RenderStatusSlice";

async function getAllPost(page) {
    const res = await postService.getPostsByPage(page);
    return res  
}

export default function Posts({arrayPosts}) {
    const flagReduxStatusRender = useSelectorRenderStatus()

    const currentUser = useSelectorUserState()
    const currentPage = useSelectorCurrentPageStatus()
    
    const [activeModal, setActiveModal] = useState(false)
    const [array, setArray] = useState([]) 
    const [totalPages, setTotalPages] = useState(0)
    const dispath = useDispatch();
    
    useEffect(()=> {
        getAllPost(currentPage).then(response => {
        setTotalPages(response.totalPages)
        dispath(currentPageAction.setCurrentPage(response.page))
          setArray(response.result);
          console.log(array);
            dispath(cashPostAction.setCashPost(array))
            dispath(renderStatusAction.setStatusRender(false))
              }).catch(() => setArray([]))
    },[array.length,flagReduxStatusRender])



    async function newPost(post) {
        const response = await postService.createPost(post)
        dispath(renderStatusAction.setStatusRender(true))
        return response.status = "success" ? response.result : response
       
    }

    async function uploadImage(file,id) {
        const response = await postService.uploadImage(file,id)
        dispath(renderStatusAction.setStatusRender(true))
        return response.status = "success" ? response.result : response
       
    }

    async function deletePost(id){
        await postService.deletePost(id)
        dispath(renderStatusAction.setStatusRender(true))
        console.log(id);
    }

    async function likeDislikeFn(id,like){
        const response = await postService.getPostById(id)
        const postForUpdate = response.result
        if(like){
            postForUpdate.likes.push(currentUser)
        } else {
            postForUpdate.dislikes.push(currentUser)
        }
        await postService.updatePost(id,postForUpdate)
        dispath(renderStatusAction.setStatusRender(true))
    }

    async function callbackSearch(str) {
        console.log(`search: ${str}`)
    }

    function callbackPaginator(page){
        dispath(currentPageAction.setCurrentPage(page))
        console.log(page);
        dispath(renderStatusAction.setStatusRender(true))
    }

    const addForm = <FormAddPost currentUser={currentUser} callBackFn={newPost} callBackUploadImage={uploadImage}></FormAddPost>

    return <div className = "post-area">  
            <ModalWindow active={activeModal} component={addForm} setActive={setActiveModal}></ModalWindow>
            <div className="action-place">
                <button onClick={() => setActiveModal(true)}>Add posts</button>
                <SearchComponent callbackFn={callbackSearch}></SearchComponent>
            </div>
            <div className="post-place">
                <PostBoard array={arrayPosts} callBackDel={deletePost} callBackLikeFn={likeDislikeFn}></PostBoard>
            </div> 
            <div>
                <PageController totalpages={totalPages} currentPage={currentPage} callback={(callbackPaginator)}></PageController>
            </div>       
        </div>
}