var path = require('path');
var VisualRegressionCompare = require('wdio-visual-regression-service/compare');

function getScreenshotName(basePath) {
  return function(context) {
    var type = context.type;
    var testName = context.test.title;
    var browserVersion = parseInt(context.browser.version, 10);
    var browserName = context.browser.name;
    var browserViewport = context.meta.viewport;
    var browserWidth = browserViewport.width;
    var browserHeight = browserViewport.height;

    return path.join(
      basePath,
      `${testName}_${type}_${browserName}_v${browserVersion}_${browserWidth}x${browserHeight}.png`
    );
  };
}

exports.config = {
  port: 4444,
  maxInstances: 10,
  capabilities: [
    {
      browserName: 'chrome'
    }
  ],
  specs: [ './*.spec.js' ],
  framework: 'jasmine',
  jasmineNodeOpts: {
    defaultTimeoutInterval: 90000
  },
  services: [ 'selenium-standalone', 'visual-regression' ],
  visualRegression: {
    compare: new VisualRegressionCompare.LocalCompare({
      referenceName: getScreenshotName(path.join(process.cwd(), 'screenshots/reference')),
      screenshotName: getScreenshotName(path.join(process.cwd(), 'screenshots/screen')),
      diffName: getScreenshotName(path.join(process.cwd(), 'screenshots/diff')),
      misMatchTolerance: 0.01
    }),
    viewportChangePause: 300,
    viewports: [{ width: 800, height: 768 },{ width: 1024, height: 768 } ],
    orientations: [ 'landscape' ]
  }
};
