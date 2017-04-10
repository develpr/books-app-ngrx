import { BlahPage } from './app.po';

describe('blah App', () => {
  let page: BlahPage;

  beforeEach(() => {
    page = new BlahPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
