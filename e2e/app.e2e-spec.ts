import { DorryWebPage } from './app.po';

describe('dorry-web App', function() {
  let page: DorryWebPage;
  // Service button events testing flags
  var testServiceBtn = true;
  var testRemoveAll = false;
  // App button events testing flags
  var testAppBtn = true;

  beforeEach(() => {
    page = new DorryWebPage();
  });

  /***************************************************************************
   * Test static text contents
   **************************************************************************/
  it('should display masthead and footer', () => {
    page.navigateToHome();
    expect(page.getMasthead()).toEqual('masthead works!');
    expect(page.getFooter()).toEqual('footer works!');
  });

  it('should display headers on service page', () => {
    page.navigateToService();
    expect(page.getErrorServiceHeader())
      .toEqual('Oops! There Is Something Wrong');
    expect(page.getRemoveAll()).toEqual('Remove All');
    expect(page.getStoppedServiceHeader()).toEqual('Stopped Service');
    expect(page.getRunningServiceHeader()).toEqual('Running Service');
  });

  /***************************************************************************
   * Test click events of services
   **************************************************************************/
  if (testServiceBtn) {
    it('should test click events of services', () => {
      page.navigateToService();
      // Stop the first running service
      page.stopService(2);
      // Restart the first stopped service
      page.restartService(2);
      // Remove the first Error service
      page.removeService(2);
      page.clickYes();

      // Remove all services
      if (testRemoveAll) {
        it('should remove all services', () => {
          page.navigateToService();
          page.removeAll();
          page.clickYes();
          expect(page.getErrorServiceCount()).toEqual(0);
        });
      }
    });
  }

  /***************************************************************************
   * Test click events of apps
   **************************************************************************/
  if (testAppBtn) {
    it('should test click events of apps', () => {
      page.navigateToApp();
      // Display then close the app details
      page.checkAppDetails();
      page.closeDetails();
      // Remove an app
      page.removeApp();
    });
  }
});
