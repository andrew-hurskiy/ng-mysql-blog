class ViewPostPage {

    backButton = () => cy.get('button[data-test="backFromPost"]')
    deletePostButton = () => cy.get('button[data-test="delete-post"]')
   
    goBack(){
        this.backButton().click();
    }

    deletePost(){
        this.deletePostButton().click();
    }


}

export default new ViewPostPage();