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

async function getPostByPage(page) {
    const res = await postService.getPostsByPage(page);
    return res  
}

async function getPostBySearch(keywords) {
    const res = await postService.searchPost(keywords);
    return res  
}

export default function Posts({arrayPosts}) {
    const flagReduxStatusRender = useSelectorRenderStatus()
    
    const currentUser = useSelectorUserState()
    const currentPage = useSelectorCurrentPageStatus()
    
    const [activeModal, setActiveModal] = useState(false)
    const [search, setSearch] = useState(false)
    const [keywords, setKeywords] = useState('')
    const [array, setArray] = useState([]) 
    const [totalPages, setTotalPages] = useState(0)

    const dispath = useDispatch();
    
    useEffect(()=> {
        if(!search){
            getPostByPage(currentPage).then(response => {
                setTotalPages(response.totalPages)
                dispath(currentPageAction.setCurrentPage(response.page))
                  setArray(response.result);
                  console.log(array);
                  dispath(cashPostAction.setCashPost(array))
                  dispath(renderStatusAction.setStatusRender(false))
                      }).catch(() => setArray([]))
        } else {
            getPostBySearch(keywords).then(response => {
                setTotalPages(response.totalPages)
                dispath(currentPageAction.setCurrentPage(response.page))
                  setArray(response.result);
                  console.log(array);
                  dispath(cashPostAction.setCashPost(array))
                  dispath(renderStatusAction.setStatusRender(false))
                      }).catch(() => setArray([]))
        }
        
       
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

    async function callbackSearch(keyword) {
        setSearch(true)
        setKeywords(keyword)
        dispath(renderStatusAction.setStatusRender(true))
       
    }

    function resetSearch(){
        dispath(renderStatusAction.setStatusRender(true))
    }

    function callbackPaginator(page){
        dispath(currentPageAction.setCurrentPage(page))
        dispath(renderStatusAction.setStatusRender(true))
    }

    const addForm = <FormAddPost currentUser={currentUser} callBackFn={newPost} callBackUploadImage={uploadImage}></FormAddPost>
    

    return <div className = "post-area">  
            <ModalWindow active={activeModal} closeArea={true} component={addForm} setActive={setActiveModal}></ModalWindow>
            <div className="action-place">
                <button disabled = {currentUser === 'unauthorized'} onClick={() => setActiveModal(true)}>Add posts</button>
                <button onClick={resetSearch}>Reset</button>
                <SearchComponent callbackFn={callbackSearch}></SearchComponent>
            </div>
            <div className="post-place">
                <PostBoard array={arrayPosts}></PostBoard>
            </div> 
            <div>
                <PageController totalpages={totalPages} currentPage={currentPage} callback={(callbackPaginator)}></PageController>
            </div>       
        </div>
}