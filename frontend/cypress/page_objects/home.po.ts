class HomePage {

    createPostButton = () => cy.get('button[test-data="create-post"]')
    postCards = () => cy.get('div[test-data="post-card"]')

    startCreatingPost(){
        this.createPostButton().click();
        cy.url().should('contain', 'post/create')

    }

    openPostByIndex(index: number) {

        index -= 1;

        this.postCards().eq(index).click()
        cy.url().should('contain', 'details')
    }

    verifyThatAmountOfPostsIs(expectedNum: number){
        this.postCards().should('have.length', expectedNum);
    }



}

export default new HomePage();