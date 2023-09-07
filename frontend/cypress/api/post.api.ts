class PostAPI {

    baseURL = 'localhost:3000'

    deletePost(postId: number) {

        cy.request({
            method: 'DELETE',
            url: `${this.baseURL}/post/${postId}`
        }).then((res) => {
            if (res.status === 200) {
                return true;
            }

        })

    }

    getAllPosts() {

        return cy.request({
            method: 'GET',
            url: `${this.baseURL}/posts`
        }).then((res) => {

            let posts = res.body;

            return posts;
        })

    }

    getAllPostIds(){
        let postIds = [];

        return cy.request({
            method: 'GET',
            url: `${this.baseURL}/posts`
        }).then((res) => {

            if (res.status === 404) {
                return []
            }

            let posts = res.body;
            postIds = posts.map(p => p.id);

            console.log('getAllPostIds', postIds);

            return postIds;
        })
        
    }

    isAnyPostExist() {

        return cy.request({
            method: 'GET',
            url: `${this.baseURL}/posts`
        }).then((res) => {

            if (res.status === 404) {
                return false
            }

            let postsCount = res.body.length;

            if (res.status === 200 && postsCount > 0) {
                return true;
            }

        })

    }

    deleteAllPosts() {

        this.isAnyPostExist()
            .then((doesExist) => {

                if (!doesExist) {
                    console.log('No posts, so nothing to remove');
                    return
                }

                this.getAllPosts()
                    .then((posts) => {

                        let postIds = posts.map(p => p.id);

                        for (let pId of postIds) {
                            this.deletePost(pId);
                        }
                    })
            })
    }
}

export default new PostAPI();