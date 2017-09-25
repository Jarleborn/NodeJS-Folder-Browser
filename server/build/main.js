require('source-map-support/register')
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modules_folderWalker__ = __webpack_require__(2);

var express = __webpack_require__(5);
var app = express();
var http = __webpack_require__(6).Server(app);
var port = 1337;
var cors = __webpack_require__(7);

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/test2', function (req, res) {
  Object(__WEBPACK_IMPORTED_MODULE_0__modules_folderWalker__["a" /* readFolders */])('./src/folders').then(function (response) {
    return res.send(response);
  });
});
app.listen(port, function () {
  console.log('Our app is running on http://localhost:' + port);
});

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return readFolders; });
/* unused harmony export writeToJSON */
var fs = __webpack_require__(3);
var data = __webpack_require__(4);

function readFolders(folder) {
  var promiseHolder = [];
  var filesInFolder = {};
  return new Promise(function (resolve, reject) {
    fs.readdir(folder, function (err, files) {

      filesInFolder.folder = folder;
      filesInFolder.files = [];
      filesInFolder.folders = [];

      for (var i = 0; i < files.length; i++) {

        if (fs.lstatSync(folder + '/' + files[i]).isDirectory()) {
          promiseHolder.push(readFolders(folder + '/' + files[i]));
        } else {
          filesInFolder.files.push(files[i]);
        }
      }
      return Promise.all(promiseHolder).then(function (res) {
        console.log(res);
        filesInFolder.folders.push(res);
        writeToJSON(filesInFolder);
        resolve(filesInFolder);
      }).catch(function (err) {
        return console.log(err);
      });
    });
  });
}

function writeToJSON(obj) {
  // console.log(obj)
  fs.writeFile('./lib/data.json', JSON.stringify(obj), 'utf8', function (err) {
    if (err) {
      return console.log(err);
    }
    console.log('The file was saved!');
  });
}

function returnData() {
  return data;
}


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = {"folder":"./src/folders","files":["hej","hop","san"],"folders":[[{"folder":"./src/folders/bar","files":["bar","ff","flo","foo"],"folders":[[]]},{"folder":"./src/folders/fold","files":["bar","ff","flo","foo","hoj"],"folders":[[{"folder":"./src/folders/fold/blaw","files":["1","2"],"folders":[[{"folder":"./src/folders/fold/blaw/hoppla","files":["78"],"folders":[[]]}]]},{"folder":"./src/folders/fold/yo","files":["1","2","3","4"],"folders":[[]]}]]},{"folder":"./src/folders/foo","files":[],"folders":[[{"folder":"./src/folders/foo/woo","files":["w","www","wwww"],"folders":[[]]},{"folder":"./src/folders/foo/wop","files":["hip","hop"],"folders":[[]]}]]},{"folder":"./src/folders/test","files":[],"folders":[[{"folder":"./src/folders/test/c#","files":["yo.cs","yoy.cs","yoyo.cs"],"folders":[[]]},{"folder":"./src/folders/test/html","files":["contavts.html","index.html"],"folders":[[{"folder":"./src/folders/test/html/css","files":["style.css"],"folders":[[]]}]]},{"folder":"./src/folders/test/js","files":["getter.js","index.js","scraper.js","setter.js"],"folders":[[]]},{"folder":"./src/folders/test/lint","files":[".initLint",".lint"],"folders":[[]]},{"folder":"./src/folders/test/php","files":["getter.php","index.php","scraper.php"],"folders":[[]]},{"folder":"./src/folders/test/ruby","files":["getterds.rb","index.rb","scrapereee.rb"],"folders":[[]]}]]}]]}

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("cors");

/***/ })
/******/ ]);
//# sourceMappingURL=main.map