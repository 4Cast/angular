import {verifyNoBrowserErrors} from 'angular2/src/testing/e2e_util';
import {Promise} from 'angular2/src/core/facade/async';

function waitForElement(selector) {
  var EC = (<any>protractor).ExpectedConditions;
  // Waits for the element with id 'abc' to be present on the dom.
  browser.wait(EC.presenceOf($(selector)), 20000);
}

describe('hash routing example app', function() {
  afterEach(verifyNoBrowserErrors);

  var URL = 'playground/src/hash_routing/index.html';

  it('should navigate between routes', function() {
    browser.get(URL + '#/bye');
    waitForElement('goodbye-cmp');

    element(by.css('#hello-link')).click();
    waitForElement('hello-cmp');

    expect(element(by.css('hello-cmp')).getText()).toContain('hello');

    browser.navigate().back();
    waitForElement('goodbye-cmp');

    expect(element(by.css('goodbye-cmp')).getText()).toContain('goodbye');
  });


  it('should open in new window if target is _blank', () => {
    var URL = 'playground/src/hash_routing/index.html';
    browser.get(URL + '#/');
    waitForElement('hello-cmp');

    element(by.css('#goodbye-link-blank')).click();
    expect(browser.driver.getCurrentUrl()).not.toContain('#/bye');
    browser.getAllWindowHandles().then(function(windows) {
      browser.switchTo()
          .window(windows[1])
          .then(function() { expect(browser.driver.getCurrentUrl()).toContain("#/bye"); });
    });
  });
});
