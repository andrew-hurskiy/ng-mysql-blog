class EditPostPage {
  headingInput = () => cy.get('input[test-data="heading"]');
  subHeadingInput = () => cy.get('input[test-data="subHeading"]');

  section1Input = () => cy.get('input[test-data="section1"]');
  section2Input = () => cy.get('input[test-data="section2"]');
  section3Input = () => cy.get('input[test-data="section3"]');

  sectionHeadingInput = () => cy.get('input[test-data="sectionHeading"]');
  submitPostButton = () => cy.get('button[test-data="submitPost"]');

  fill(post: any) {
    if (post.heading) {
      this.headingInput().clear().type(post.heading);
    }

    if (post.subHeading) {
      this.subHeadingInput().clear().type(post.subHeading);
    }

    if (post.section1) {
      this.section1Input().clear().type(post.section1);
    }

    if (post.section2) {
      this.section2Input().clear().type(post.section2);
    }

    if (post.section3) {
      this.section3Input().clear().type(post.section3);
    }

    if (post.sectionHeading) {
      this.sectionHeadingInput().clear().type(post.sectionHeading);
    }

    return this;
  }

  submitPost() {
    this.submitPostButton().click();
    cy.url().should('contain', 'home');
  }
}

export default new EditPostPage();
