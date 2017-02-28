import { BookTradingPage } from './app.po';

describe('book-trading App', () => {
  let page: BookTradingPage;

  beforeEach(() => {
    page = new BookTradingPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
