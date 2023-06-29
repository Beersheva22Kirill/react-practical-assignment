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

    async getPostsByPage(){

        const response = await fetch(this.#main_url + `post/`)
        const data = await response.json()
        return data
    }

}