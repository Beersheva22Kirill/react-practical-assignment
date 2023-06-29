

const SearchComponent = ({callbackFn}) => {

    function submitFn(event){
        event.preventDefault()
        const formData = new FormData(document.getElementById("search-form-id"))
        const res = formData.get("search-string")
        callbackFn(res)
    }

    return <div><form id = "search-form-id" onSubmit={submitFn}>
            <input name = "search-string" type = "text" placeholder="Search..."></input>
            <button type="submit">Go</button>
        </form></div>
}

export default SearchComponent;