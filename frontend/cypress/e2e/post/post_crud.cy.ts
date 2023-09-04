import loginPage from '../../page_objects/login.po'
import homePage from '../../page_objects/home.po'
import editPostPage from '../../page_objects/edit_post.po'
import viewPostPage from '../../page_objects/view_post.po'


describe('Testing CRUD operations upon POSTS', () => {

    beforeEach('Login to application before', () => {
        loginPage.loginWith(
            'andiy', 'andriy'
        )

        // Remove by API all comments + posts

    })

    it('Can create post ', () => {
        homePage.startCreatingPost()

        editPostPage.fill({
            heading: "Heading ",
            subHeading: "Sub Heading"
        })
        .submitPost()

        // Assert
        homePage.verifyThatAmountOfPostsIs(1);
    })

    it('Can View post and go back', () => {

        homePage.openPostByIndex(1)

        viewPostPage.goBack()

        homePage.verifyThatAmountOfPostsIs(1);

    })

    it('Can delete post', () => {

        homePage.openPostByIndex(1)

        viewPostPage.deletePost()

        homePage.verifyThatAmountOfPostsIs(0);

    })
})