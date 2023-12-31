export default class PostsService {
    
    #main_url;

    constructor(url){
        this.#main_url = url;
    }
    
   async createPost(newpost){
    const response = await fetch(this.#main_url + 'post/',{
                                method: 'POST',
                                headers: {"Content-Type": "application/json"},
                                body: JSON.stringify(newpost)
                            }) 
        const data = await response.json()                                           
        return data
    }

    async getPostsByPage(pageNumber){

        const response = await fetch(this.#main_url + `post/page/${pageNumber}`)
        const data = await response.json()
        return data
    }

    async uploadImage(id,file){
        const response = await fetch(this.#main_url + `post/${id}/picture`,{
            method: 'POST',
            body: file
        }) 
        const data = await response.json() 
        return data;  
    }

    async deletePost(id){
        const response = await fetch(this.#main_url + `post/${id}`,{
            method: 'DELETE',
        }) 
        const data = await response.json()   
    }

    async updatePost(id,postForUpdate){
        const post = await this.getPostById(id)

        const response = await fetch(this.#main_url + `post/${id}`,{
            method: 'PUT',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(postForUpdate)
        }) 
        const data = await response.json()  
        return data 
    }

    async getPostById(id){
            const response = await fetch(this.#main_url + `post/${id}`)
            const data = await response.json()
        return data;   
    }   


    async createComment(newComment){
        const response = await fetch(this.#main_url + 'comment/',{
                                    method: 'POST',
                                    headers: {"Content-Type": "application/json"},
                                    body: JSON.stringify(newComment)
                                }) 
            const data = await response.json()
        return data;
        }

    async deleteComent(id){
        const response = await fetch(this.#main_url + `comment/${id}`,{
            method: 'DELETE',
        }) 
    }    

    async updateComment(commentForUpdate){

        const response = await fetch(this.#main_url + `comment/${commentForUpdate.id}`,{
            method: 'PUT',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(commentForUpdate)
        }) 
        const data = await response.json()  
        return data 
    }

    async searchPost(keywords){
            const response = await fetch(this.#main_url + `post/search/${keywords}`,{
            method: "GET"    
        })
        const data = await response.json()
        return data;  
    }

}