const expect = require('chai').expect;

/**
 * 
 * @param {any[]} results 
 */
function expectImage(results) {
  results.forEach((result, idx) => expect(result.isExactSameImage, `Image ${idx} is not the same`).to.be.true);
}

describe('Google Auth error', () => {
  it('should sign in google', () => {
    browser.url('https://www.doodle.com');

    const report = browser.checkElement('.d-fullHeader .d-signup');

    console.log(report);

    expectImage(report);
  });
});
