class CommentsAPI {

    baseURL = 'localhost:3000'

    getCommentIdsForPostById(postId: string) {

        return cy.request({
            method: 'GET', 
            url: `${this.baseURL}/post/${postId}/comments`,
            failOnStatusCode: false
        }).then((res) => {

            let comments = [];

            if (res.status === 404) {
                return comments;
            }

            if (res.status === 200) {
                comments = res.body;
            }

            let commentIds = comments.map(c => c.id);

            return commentIds;
        })
    }

    getCommentIdsForPostsByIds(postIds: Array<string>) {

        let commentIds = [];

        for (let postId of postIds) {
            let idsForOnePost = this.getCommentIdsForPostById(postId);
            commentIds.push(idsForOnePost);
        }

        return commentIds;
    }

    dropCommentById(commentId: string) {

        cy.request({
            method: 'DELETE',
            url: `${this.baseURL}/comment/${commentId}`
        })
    }

    deleteAllComments(postIds){

        let commentIdsToDrop = this.getCommentIdsForPostsByIds(postIds);
        console.log('Comment ids to drop are ', commentIdsToDrop);

        if (commentIdsToDrop.length === 0) {
            console.log('No comment to remove. Exit')
            return
        }

        for (let commentId of commentIdsToDrop) {
            this.dropCommentById(commentId)
        }

    }


}

export default new CommentsAPI();