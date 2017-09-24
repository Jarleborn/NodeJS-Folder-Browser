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
// app.use(express.static(__dirname + '/public'))
// app.all('/', function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*')
//   res.header('Access-Control-Allow-Headers', 'X-Requested-With')
//   next()
// })

app.get('/getFolders', function (req, res) {
  console.log('bajs');
  //readFolder('./src/folders')
  console.log('HHOOOOOOOOOOOOOOOOJ!!!!!!!!');
  console.log(Object(__WEBPACK_IMPORTED_MODULE_0__modules_folderWalker__["a" /* returnData */])());
  res.send(Object(__WEBPACK_IMPORTED_MODULE_0__modules_folderWalker__["a" /* returnData */])());
});

app.listen(port, function () {
  console.log('Our app is running on http://localhost:' + port);
});

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export readFolder */
/* unused harmony export writeToJSON */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return returnData; });
var fs = __webpack_require__(3);
var data = __webpack_require__(4);

function readFolder(folder) {
  fs.readdir(folder, function (err, files) {
    var tmp = {};
    tmp.files = [];
    tmp.folder = folder;
    files.forEach(function (file) {

      if (fs.lstatSync(folder + '/' + file).isDirectory()) {
        readFolder(folder + '/' + file);
      } else {
        tmp.files.push(file);
      }
    });
    data.files.push(tmp);
    tmp = {};
    console.log(data);
    writeToJSON(data);
  });
}

function writeToJSON(obj) {
  console.log(obj);
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

module.exports = {"files":[{"files":[],"folder":"./src/folders"},{"files":["bar","ff","flo","foo"],"folder":"./src/folders/bar"},{"files":["bar","ff","flo","foo","hoj"],"folder":"./src/folders/fold"},{"files":[],"folder":"./src/folders/foo"},{"files":[],"folder":"./src/folders/test"},{"files":["1","2"],"folder":"./src/folders/fold/blaw"},{"files":["1","2","3","4"],"folder":"./src/folders/fold/yo"},{"files":["w","www","wwww"],"folder":"./src/folders/foo/woo"},{"files":["hip","hop"],"folder":"./src/folders/foo/wop"},{"files":["yo.cs","yoy.cs","yoyo.cs"],"folder":"./src/folders/test/c#"},{"files":["contavts.html","index.html"],"folder":"./src/folders/test/html"},{"files":["getter.js","index.js","scraper.js","setter.js"],"folder":"./src/folders/test/js"},{"files":[".initLint",".lint"],"folder":"./src/folders/test/lint"},{"files":["getter.php","index.php","scraper.php"],"folder":"./src/folders/test/php"},{"files":["getterds.rb","index.rb","scrapereee.rb"],"folder":"./src/folders/test/ruby"},{"files":["78"],"folder":"./src/folders/fold/blaw/hoppla"},{"files":["style.css"],"folder":"./src/folders/test/html/css"},{"files":[],"folder":"./src/folders"},{"files":["bar","ff","flo","foo"],"folder":"./src/folders/bar"},{"files":["bar","ff","flo","foo","hoj"],"folder":"./src/folders/fold"},{"files":[],"folder":"./src/folders/foo"},{"files":[],"folder":"./src/folders/test"},{"files":["1","2"],"folder":"./src/folders/fold/blaw"},{"files":["1","2","3","4"],"folder":"./src/folders/fold/yo"},{"files":["w","www","wwww"],"folder":"./src/folders/foo/woo"},{"files":["hip","hop"],"folder":"./src/folders/foo/wop"},{"files":["yo.cs","yoy.cs","yoyo.cs"],"folder":"./src/folders/test/c#"},{"files":["contavts.html","index.html"],"folder":"./src/folders/test/html"},{"files":[".initLint",".lint"],"folder":"./src/folders/test/lint"},{"files":["getter.js","index.js","scraper.js","setter.js"],"folder":"./src/folders/test/js"},{"files":["getter.php","index.php","scraper.php"],"folder":"./src/folders/test/php"},{"files":["getterds.rb","index.rb","scrapereee.rb"],"folder":"./src/folders/test/ruby"},{"files":["78"],"folder":"./src/folders/fold/blaw/hoppla"},{"files":["style.css"],"folder":"./src/folders/test/html/css"}]}

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