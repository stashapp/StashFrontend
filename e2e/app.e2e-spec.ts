import { StashFrontendPage } from './app.po';

describe('stash-frontend App', () => {
  let page: StashFrontendPage;

  beforeEach(() => {
    page = new StashFrontendPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
