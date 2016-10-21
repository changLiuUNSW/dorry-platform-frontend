import { browser, element, by } from 'protractor/globals';

export class DorryWebPage {
  /**************************************************************************
   * Web navigation
   **************************************************************************/
  navigateToHome() {
    return browser.get('/');
  }

  navigateToService() {
    return browser.get('/');
  }

  navigateToApp() {
    return browser.get('/apps');
  }

  /***************************************************************************
   * Testing static text contents
   **************************************************************************/
  getMasthead() {
    return element(by.css('app-masthead')).getText();
  }

  getFooter() {
    return element(by.css('app-footer')).getText();
  }

  getErrorServiceHeader() {
    return element(by.css('.error-service-header .service-header-left')).getText();
  }

  getRemoveAll() {
    return element(by.css('.error-service-header .service-header-right')).getText();
  }

  getStoppedServiceHeader() {
    return element(by.css('.stopped-service-header')).getText();
  }

  getRunningServiceHeader() {
    return element(by.css('.running-service-header')).getText();
  }

  /***************************************************************************
   * Counting services in status of error, stopped and running
   **************************************************************************/
  getErrorServiceCount() {
    return element.all(by.css('.error-service-container')).count();
  }

  getStoppedServiceCount() {
    return element.all(by.css('.stopped-service-container')).count();
  }

  getRunningServiceCount() {
    return element.all(by.css('.running-service-container')).count();
  }

  /***************************************************************************
   * Removing, restarting and stoppping a service
   **************************************************************************/
  stopService(index: number) {
    element(by.css('.service-btn-stop')).click();
  }

  restartService(index: number) {
    element(by.css('.service-btn-restart')).click();
  }

  removeService(index: number) {
    element(by.css('.service-btn-remove')).click();
  }

  removeAll() {
    element(by.css('.error-service-header .service-header-right')).click();
  }

  clickYes() {
    element(by.css('.btn-yes')).click();
  }

  clickNo() {
    element(by.css('.btn-no')).click();
  }

  /***************************************************************************
   * Checking app details
   **************************************************************************/
  checkAppDetails() {
    element(by.css('.app-details')).click();
  }

  /***************************************************************************
   * Closing the detail panel
   **************************************************************************/
  closeDetails() {
    element(by.css('.detail-close')).click();
  }

  /***************************************************************************
   * Removing an app
   **************************************************************************/
  removeApp() {
    // element(by.css('.app-removebtn')).click();
  }
}
