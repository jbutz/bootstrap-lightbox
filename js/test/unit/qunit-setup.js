// Logging setup for phantom integration
// adapted from Modernizr

/*QUnit.begin = function () {
  console.log("Starting test suite")
  console.log("================================================\n")
}

QUnit.moduleDone = function (opts) {
  if (opts.failed === 0) {
    console.log("\u2714 All tests passed in '" + opts.name + "' module")
  } else {
    console.log("\u2716 " + opts.failed + " tests failed in '" + opts.name + "' module")
  }
}

QUnit.done = function (opts) {
  console.log("\n================================================")
  console.log("Tests completed in " + opts.runtime + " milliseconds")
  console.log(opts.passed + " tests of " + opts.total + " passed, " + opts.failed + " failed.")
}*/

(function() {
    var module = '',
        test = '',
        lastModuleLogged = '',
        lastTestLogged = '',
        failuresOnCurrentTest = 0,
        failureFound = false;

    QUnit.moduleStart(function(details) {
        module = details.name;
    });
    QUnit.testStart(function(details) {
        test = details.name;
    });

    QUnit.log(function(details) {
        if (!details.result) {
            if (!failureFound) {
                failureFound = true;
                console.log('');
                console.log('/*********************************************************************/');
                console.log('/************************** FAILURE SUMMARY **************************/');
                console.log('/*********************************************************************/');
            }

            if (lastModuleLogged != module) {
                console.log('');
                console.log('-----------------------------------------------------------------------');
                console.log('Module: ' + module);
            }

            if (lastTestLogged != test) {
                failuresOnCurrentTest = 1;
                console.log('-----------------------------------------------------------------------');
                console.log('Test: ' + test);
            } else {
                failuresOnCurrentTest++;
            }

            console.log(' ' + failuresOnCurrentTest + ') Message: ' + details.message);
            if (typeof details.expected !== 'undefined') {
                console.log('    Expected: ' + details.expected);
                console.log('    Actual: ' + details.actual);
            }
            if (typeof details.source !== 'undefined') {
                console.log('    Source: ' + details.source);
            }

            lastModuleLogged = module;
            lastTestLogged = test;
        }
    });

    QUnit.done(function(details) {
        if (details.failed > 0) {
            console.log('-----------------------------------------------------------------------');
            console.log('');
        }
    });
}());