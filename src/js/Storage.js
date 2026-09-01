class Storage {
    constructor(){
        this.storage = []
    }

    savePost(data){        
        this.storage.push(data)
    }

    getPosts(){
        return this.storage
    }
}


export default new Storage()