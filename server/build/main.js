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
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(__dirname) {console.log('Im up');
var express = __webpack_require__(37);
var app = express();
var http = __webpack_require__(9).Server(app);
var port = 1337;
var fs = __webpack_require__(2);
var data = __webpack_require__(3);
var io = __webpack_require__(103)();

readFolder('./src/folders');

function readFolder(folder) {

  fs.readdir(folder, function (err, files) {
    var tmp = {};
    tmp.folder = folder;
    tmp.files = [];
    files.forEach(function (file) {

      if (fs.lstatSync(folder + '/' + file).isDirectory()) {
        readFolder(folder + '/' + file);
      } else {
        tmp.files.push(file);
      }
    });
    writeToJSON(tmp);
  });
}

function writeToJSON(obj) {
  data.folders.push(obj);
}

io.on('connection', function (socket) {
  socket.emit('data_deliverd', data);
});

app.use(express.static(__dirname + '/public'));
app.all('/', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  next();
});

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/public/index.html');
});

app.get('/data', function (req, res) {
  res.send(data);
});

app.listen(port, function () {
  console.log('Our app is running on http://localhost:' + port);
});
/* WEBPACK VAR INJECTION */}.call(exports, "src"))

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = {"folders":[]}

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("debug");

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * depd
 * Copyright(c) 2014-2017 Douglas Christopher Wilson
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var callSiteToString = __webpack_require__(24).callSiteToString
var eventListenerCount = __webpack_require__(24).eventListenerCount
var relative = __webpack_require__(4).relative

/**
 * Module exports.
 */

module.exports = depd

/**
 * Get the path to base files on.
 */

var basePath = process.cwd()

/**
 * Determine if namespace is contained in the string.
 */

function containsNamespace (str, namespace) {
  var val = str.split(/[ ,]+/)

  namespace = String(namespace).toLowerCase()

  for (var i = 0; i < val.length; i++) {
    if (!(str = val[i])) continue

    // namespace contained
    if (str === '*' || str.toLowerCase() === namespace) {
      return true
    }
  }

  return false
}

/**
 * Convert a data descriptor to accessor descriptor.
 */

function convertDataDescriptorToAccessor (obj, prop, message) {
  var descriptor = Object.getOwnPropertyDescriptor(obj, prop)
  var value = descriptor.value

  descriptor.get = function getter () { return value }

  if (descriptor.writable) {
    descriptor.set = function setter (val) { return (value = val) }
  }

  delete descriptor.value
  delete descriptor.writable

  Object.defineProperty(obj, prop, descriptor)

  return descriptor
}

/**
 * Create arguments string to keep arity.
 */

function createArgumentsString (arity) {
  var str = ''

  for (var i = 0; i < arity; i++) {
    str += ', arg' + i
  }

  return str.substr(2)
}

/**
 * Create stack string from stack.
 */

function createStackString (stack) {
  var str = this.name + ': ' + this.namespace

  if (this.message) {
    str += ' deprecated ' + this.message
  }

  for (var i = 0; i < stack.length; i++) {
    str += '\n    at ' + callSiteToString(stack[i])
  }

  return str
}

/**
 * Create deprecate for namespace in caller.
 */

function depd (namespace) {
  if (!namespace) {
    throw new TypeError('argument namespace is required')
  }

  var stack = getStack()
  var site = callSiteLocation(stack[1])
  var file = site[0]

  function deprecate (message) {
    // call to self as log
    log.call(deprecate, message)
  }

  deprecate._file = file
  deprecate._ignored = isignored(namespace)
  deprecate._namespace = namespace
  deprecate._traced = istraced(namespace)
  deprecate._warned = Object.create(null)

  deprecate.function = wrapfunction
  deprecate.property = wrapproperty

  return deprecate
}

/**
 * Determine if namespace is ignored.
 */

function isignored (namespace) {
  /* istanbul ignore next: tested in a child processs */
  if (process.noDeprecation) {
    // --no-deprecation support
    return true
  }

  var str = process.env.NO_DEPRECATION || ''

  // namespace ignored
  return containsNamespace(str, namespace)
}

/**
 * Determine if namespace is traced.
 */

function istraced (namespace) {
  /* istanbul ignore next: tested in a child processs */
  if (process.traceDeprecation) {
    // --trace-deprecation support
    return true
  }

  var str = process.env.TRACE_DEPRECATION || ''

  // namespace traced
  return containsNamespace(str, namespace)
}

/**
 * Display deprecation message.
 */

function log (message, site) {
  var haslisteners = eventListenerCount(process, 'deprecation') !== 0

  // abort early if no destination
  if (!haslisteners && this._ignored) {
    return
  }

  var caller
  var callFile
  var callSite
  var i = 0
  var seen = false
  var stack = getStack()
  var file = this._file

  if (site) {
    // provided site
    callSite = callSiteLocation(stack[1])
    callSite.name = site.name
    file = callSite[0]
  } else {
    // get call site
    i = 2
    site = callSiteLocation(stack[i])
    callSite = site
  }

  // get caller of deprecated thing in relation to file
  for (; i < stack.length; i++) {
    caller = callSiteLocation(stack[i])
    callFile = caller[0]

    if (callFile === file) {
      seen = true
    } else if (callFile === this._file) {
      file = this._file
    } else if (seen) {
      break
    }
  }

  var key = caller
    ? site.join(':') + '__' + caller.join(':')
    : undefined

  if (key !== undefined && key in this._warned) {
    // already warned
    return
  }

  this._warned[key] = true

  // generate automatic message from call site
  if (!message) {
    message = callSite === site || !callSite.name
      ? defaultMessage(site)
      : defaultMessage(callSite)
  }

  // emit deprecation if listeners exist
  if (haslisteners) {
    var err = DeprecationError(this._namespace, message, stack.slice(i))
    process.emit('deprecation', err)
    return
  }

  // format and write message
  var format = process.stderr.isTTY
    ? formatColor
    : formatPlain
  var msg = format.call(this, message, caller, stack.slice(i))
  process.stderr.write(msg + '\n', 'utf8')
}

/**
 * Get call site location as array.
 */

function callSiteLocation (callSite) {
  var file = callSite.getFileName() || '<anonymous>'
  var line = callSite.getLineNumber()
  var colm = callSite.getColumnNumber()

  if (callSite.isEval()) {
    file = callSite.getEvalOrigin() + ', ' + file
  }

  var site = [file, line, colm]

  site.callSite = callSite
  site.name = callSite.getFunctionName()

  return site
}

/**
 * Generate a default message from the site.
 */

function defaultMessage (site) {
  var callSite = site.callSite
  var funcName = site.name

  // make useful anonymous name
  if (!funcName) {
    funcName = '<anonymous@' + formatLocation(site) + '>'
  }

  var context = callSite.getThis()
  var typeName = context && callSite.getTypeName()

  // ignore useless type name
  if (typeName === 'Object') {
    typeName = undefined
  }

  // make useful type name
  if (typeName === 'Function') {
    typeName = context.name || typeName
  }

  return typeName && callSite.getMethodName()
    ? typeName + '.' + funcName
    : funcName
}

/**
 * Format deprecation message without color.
 */

function formatPlain (msg, caller, stack) {
  var timestamp = new Date().toUTCString()

  var formatted = timestamp +
    ' ' + this._namespace +
    ' deprecated ' + msg

  // add stack trace
  if (this._traced) {
    for (var i = 0; i < stack.length; i++) {
      formatted += '\n    at ' + callSiteToString(stack[i])
    }

    return formatted
  }

  if (caller) {
    formatted += ' at ' + formatLocation(caller)
  }

  return formatted
}

/**
 * Format deprecation message with color.
 */

function formatColor (msg, caller, stack) {
  var formatted = '\x1b[36;1m' + this._namespace + '\x1b[22;39m' + // bold cyan
    ' \x1b[33;1mdeprecated\x1b[22;39m' + // bold yellow
    ' \x1b[0m' + msg + '\x1b[39m' // reset

  // add stack trace
  if (this._traced) {
    for (var i = 0; i < stack.length; i++) {
      formatted += '\n    \x1b[36mat ' + callSiteToString(stack[i]) + '\x1b[39m' // cyan
    }

    return formatted
  }

  if (caller) {
    formatted += ' \x1b[36m' + formatLocation(caller) + '\x1b[39m' // cyan
  }

  return formatted
}

/**
 * Format call site location.
 */

function formatLocation (callSite) {
  return relative(basePath, callSite[0]) +
    ':' + callSite[1] +
    ':' + callSite[2]
}

/**
 * Get the stack as array of call sites.
 */

function getStack () {
  var limit = Error.stackTraceLimit
  var obj = {}
  var prep = Error.prepareStackTrace

  Error.prepareStackTrace = prepareObjectStackTrace
  Error.stackTraceLimit = Math.max(10, limit)

  // capture the stack
  Error.captureStackTrace(obj)

  // slice this function off the top
  var stack = obj.stack.slice(1)

  Error.prepareStackTrace = prep
  Error.stackTraceLimit = limit

  return stack
}

/**
 * Capture call site stack from v8.
 */

function prepareObjectStackTrace (obj, stack) {
  return stack
}

/**
 * Return a wrapped function in a deprecation message.
 */

function wrapfunction (fn, message) {
  if (typeof fn !== 'function') {
    throw new TypeError('argument fn must be a function')
  }

  var args = createArgumentsString(fn.length)
  var deprecate = this // eslint-disable-line no-unused-vars
  var stack = getStack()
  var site = callSiteLocation(stack[1])

  site.name = fn.name

   // eslint-disable-next-line no-eval
  var deprecatedfn = eval('(function (' + args + ') {\n' +
    '"use strict"\n' +
    'log.call(deprecate, message, site)\n' +
    'return fn.apply(this, arguments)\n' +
    '})')

  return deprecatedfn
}

/**
 * Wrap property in a deprecation message.
 */

function wrapproperty (obj, prop, message) {
  if (!obj || (typeof obj !== 'object' && typeof obj !== 'function')) {
    throw new TypeError('argument obj must be object')
  }

  var descriptor = Object.getOwnPropertyDescriptor(obj, prop)

  if (!descriptor) {
    throw new TypeError('must call property on owner object')
  }

  if (!descriptor.configurable) {
    throw new TypeError('property must be configurable')
  }

  var deprecate = this
  var stack = getStack()
  var site = callSiteLocation(stack[1])

  // set site name
  site.name = prop

  // convert data descriptor
  if ('value' in descriptor) {
    descriptor = convertDataDescriptorToAccessor(obj, prop, message)
  }

  var get = descriptor.get
  var set = descriptor.set

  // wrap getter
  if (typeof get === 'function') {
    descriptor.get = function getter () {
      log.call(deprecate, message, site)
      return get.apply(this, arguments)
    }
  }

  // wrap setter
  if (typeof set === 'function') {
    descriptor.set = function setter () {
      log.call(deprecate, message, site)
      return set.apply(this, arguments)
    }
  }

  Object.defineProperty(obj, prop, descriptor)
}

/**
 * Create DeprecationError for deprecation
 */

function DeprecationError (namespace, message, stack) {
  var error = new Error()
  var stackString

  Object.defineProperty(error, 'constructor', {
    value: DeprecationError
  })

  Object.defineProperty(error, 'message', {
    configurable: true,
    enumerable: false,
    value: message,
    writable: true
  })

  Object.defineProperty(error, 'name', {
    enumerable: false,
    configurable: true,
    value: 'DeprecationError',
    writable: true
  })

  Object.defineProperty(error, 'namespace', {
    configurable: true,
    enumerable: false,
    value: namespace,
    writable: true
  })

  Object.defineProperty(error, 'stack', {
    configurable: true,
    enumerable: false,
    get: function () {
      if (stackString !== undefined) {
        return stackString
      }

      // prepare stack trace
      return (stackString = createStackString.call(this, stack))
    },
    set: function setter (val) {
      stackString = val
    }
  })

  return error
}


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * express
 * Copyright(c) 2009-2013 TJ Holowaychuk
 * Copyright(c) 2014-2015 Douglas Christopher Wilson
 * MIT Licensed
 */



/**
 * Module dependencies.
 * @api private
 */

var contentDisposition = __webpack_require__(29);
var contentType = __webpack_require__(53);
var deprecate = __webpack_require__(6)('express');
var flatten = __webpack_require__(13);
var mime = __webpack_require__(19).mime;
var etag = __webpack_require__(31);
var proxyaddr = __webpack_require__(35);
var qs = __webpack_require__(26);
var querystring = __webpack_require__(64);

/**
 * Return strong ETag for `body`.
 *
 * @param {String|Buffer} body
 * @param {String} [encoding]
 * @return {String}
 * @api private
 */

exports.etag = function (body, encoding) {
  var buf = !Buffer.isBuffer(body)
    ? new Buffer(body, encoding)
    : body;

  return etag(buf, {weak: false});
};

/**
 * Return weak ETag for `body`.
 *
 * @param {String|Buffer} body
 * @param {String} [encoding]
 * @return {String}
 * @api private
 */

exports.wetag = function wetag(body, encoding){
  var buf = !Buffer.isBuffer(body)
    ? new Buffer(body, encoding)
    : body;

  return etag(buf, {weak: true});
};

/**
 * Check if `path` looks absolute.
 *
 * @param {String} path
 * @return {Boolean}
 * @api private
 */

exports.isAbsolute = function(path){
  if ('/' === path[0]) return true;
  if (':' === path[1] && ('\\' === path[2] || '/' === path[2])) return true; // Windows device path
  if ('\\\\' === path.substring(0, 2)) return true; // Microsoft Azure absolute path
};

/**
 * Flatten the given `arr`.
 *
 * @param {Array} arr
 * @return {Array}
 * @api private
 */

exports.flatten = deprecate.function(flatten,
  'utils.flatten: use array-flatten npm module instead');

/**
 * Normalize the given `type`, for example "html" becomes "text/html".
 *
 * @param {String} type
 * @return {Object}
 * @api private
 */

exports.normalizeType = function(type){
  return ~type.indexOf('/')
    ? acceptParams(type)
    : { value: mime.lookup(type), params: {} };
};

/**
 * Normalize `types`, for example "html" becomes "text/html".
 *
 * @param {Array} types
 * @return {Array}
 * @api private
 */

exports.normalizeTypes = function(types){
  var ret = [];

  for (var i = 0; i < types.length; ++i) {
    ret.push(exports.normalizeType(types[i]));
  }

  return ret;
};

/**
 * Generate Content-Disposition header appropriate for the filename.
 * non-ascii filenames are urlencoded and a filename* parameter is added
 *
 * @param {String} filename
 * @return {String}
 * @api private
 */

exports.contentDisposition = deprecate.function(contentDisposition,
  'utils.contentDisposition: use content-disposition npm module instead');

/**
 * Parse accept params `str` returning an
 * object with `.value`, `.quality` and `.params`.
 * also includes `.originalIndex` for stable sorting
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */

function acceptParams(str, index) {
  var parts = str.split(/ *; */);
  var ret = { value: parts[0], quality: 1, params: {}, originalIndex: index };

  for (var i = 1; i < parts.length; ++i) {
    var pms = parts[i].split(/ *= */);
    if ('q' === pms[0]) {
      ret.quality = parseFloat(pms[1]);
    } else {
      ret.params[pms[0]] = pms[1];
    }
  }

  return ret;
}

/**
 * Compile "etag" value to function.
 *
 * @param  {Boolean|String|Function} val
 * @return {Function}
 * @api private
 */

exports.compileETag = function(val) {
  var fn;

  if (typeof val === 'function') {
    return val;
  }

  switch (val) {
    case true:
      fn = exports.wetag;
      break;
    case false:
      break;
    case 'strong':
      fn = exports.etag;
      break;
    case 'weak':
      fn = exports.wetag;
      break;
    default:
      throw new TypeError('unknown value for etag function: ' + val);
  }

  return fn;
}

/**
 * Compile "query parser" value to function.
 *
 * @param  {String|Function} val
 * @return {Function}
 * @api private
 */

exports.compileQueryParser = function compileQueryParser(val) {
  var fn;

  if (typeof val === 'function') {
    return val;
  }

  switch (val) {
    case true:
      fn = querystring.parse;
      break;
    case false:
      fn = newObject;
      break;
    case 'extended':
      fn = parseExtendedQueryString;
      break;
    case 'simple':
      fn = querystring.parse;
      break;
    default:
      throw new TypeError('unknown value for query parser function: ' + val);
  }

  return fn;
}

/**
 * Compile "proxy trust" value to function.
 *
 * @param  {Boolean|String|Number|Array|Function} val
 * @return {Function}
 * @api private
 */

exports.compileTrust = function(val) {
  if (typeof val === 'function') return val;

  if (val === true) {
    // Support plain true/false
    return function(){ return true };
  }

  if (typeof val === 'number') {
    // Support trusting hop count
    return function(a, i){ return i < val };
  }

  if (typeof val === 'string') {
    // Support comma-separated values
    val = val.split(/ *, */);
  }

  return proxyaddr.compile(val || []);
}

/**
 * Set the charset in a given Content-Type string.
 *
 * @param {String} type
 * @param {String} charset
 * @return {String}
 * @api private
 */

exports.setCharset = function setCharset(type, charset) {
  if (!type || !charset) {
    return type;
  }

  // parse type
  var parsed = contentType.parse(type);

  // set charset
  parsed.parameters.charset = charset;

  // format type
  return contentType.format(parsed);
};

/**
 * Parse an extended query string with qs.
 *
 * @return {Object}
 * @private
 */

function parseExtendedQueryString(str) {
  return qs.parse(str, {
    allowPrototypes: true
  });
}

/**
 * Return new empty object.
 *
 * @return {Object}
 * @api private
 */

function newObject() {
  return {};
}


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * parseurl
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2014-2017 Douglas Christopher Wilson
 * MIT Licensed
 */



/**
 * Module dependencies.
 * @private
 */

var url = __webpack_require__(20)
var parse = url.parse
var Url = url.Url

/**
 * Module exports.
 * @public
 */

module.exports = parseurl
module.exports.original = originalurl

/**
 * Parse the `req` url with memoization.
 *
 * @param {ServerRequest} req
 * @return {Object}
 * @public
 */

function parseurl (req) {
  var url = req.url

  if (url === undefined) {
    // URL is undefined
    return undefined
  }

  var parsed = req._parsedUrl

  if (fresh(url, parsed)) {
    // Return cached URL parse
    return parsed
  }

  // Parse the URL
  parsed = fastparse(url)
  parsed._raw = url

  return (req._parsedUrl = parsed)
};

/**
 * Parse the `req` original url with fallback and memoization.
 *
 * @param {ServerRequest} req
 * @return {Object}
 * @public
 */

function originalurl (req) {
  var url = req.originalUrl

  if (typeof url !== 'string') {
    // Fallback
    return parseurl(req)
  }

  var parsed = req._parsedOriginalUrl

  if (fresh(url, parsed)) {
    // Return cached URL parse
    return parsed
  }

  // Parse the URL
  parsed = fastparse(url)
  parsed._raw = url

  return (req._parsedOriginalUrl = parsed)
};

/**
 * Parse the `str` url with fast-path short-cut.
 *
 * @param {string} str
 * @return {Object}
 * @private
 */

function fastparse (str) {
  if (typeof str !== 'string' || str.charCodeAt(0) !== 0x2f /* / */) {
    return parse(str)
  }

  var pathname = str
  var query = null
  var search = null

  // This takes the regexp from https://github.com/joyent/node/pull/7878
  // Which is /^(\/[^?#\s]*)(\?[^#\s]*)?$/
  // And unrolls it into a for loop
  for (var i = 1; i < str.length; i++) {
    switch (str.charCodeAt(i)) {
      case 0x3f: /* ?  */
        if (search === null) {
          pathname = str.substring(0, i)
          query = str.substring(i + 1)
          search = str.substring(i)
        }
        break
      case 0x09: /* \t */
      case 0x0a: /* \n */
      case 0x0c: /* \f */
      case 0x0d: /* \r */
      case 0x20: /*    */
      case 0x23: /* #  */
      case 0xa0:
      case 0xfeff:
        return parse(str)
    }
  }

  var url = Url !== undefined
    ? new Url()
    : {}
  url.path = str
  url.href = str
  url.pathname = pathname
  url.query = query
  url.search = search

  return url
}

/**
 * Determine if parsed is still fresh for url.
 *
 * @param {string} url
 * @param {object} parsedUrl
 * @return {boolean}
 * @private
 */

function fresh (url, parsedUrl) {
  return typeof parsedUrl === 'object' &&
    parsedUrl !== null &&
    (Url === undefined || parsedUrl instanceof Url) &&
    parsedUrl._raw === url
}


/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * encodeurl
 * Copyright(c) 2016 Douglas Christopher Wilson
 * MIT Licensed
 */



/**
 * Module exports.
 * @public
 */

module.exports = encodeUrl

/**
 * RegExp to match non-URL code points, *after* encoding (i.e. not including "%")
 * and including invalid escape sequences.
 * @private
 */

var ENCODE_CHARS_REGEXP = /(?:[^\x21\x25\x26-\x3B\x3D\x3F-\x5B\x5D\x5F\x61-\x7A\x7E]|%(?:[^0-9A-Fa-f]|[0-9A-Fa-f][^0-9A-Fa-f]))+/g

/**
 * RegExp to match unmatched surrogate pair.
 * @private
 */

var UNMATCHED_SURROGATE_PAIR_REGEXP = /(^|[^\uD800-\uDBFF])[\uDC00-\uDFFF]|[\uD800-\uDBFF]([^\uDC00-\uDFFF]|$)/g

/**
 * String to replace unmatched surrogate pair with.
 * @private
 */

var UNMATCHED_SURROGATE_PAIR_REPLACE = '$1\uFFFD$2'

/**
 * Encode a URL to a percent-encoded form, excluding already-encoded sequences.
 *
 * This function will take an already-encoded URL and encode all the non-URL
 * code points. This function will not encode the "%" character unless it is
 * not part of a valid sequence (`%20` will be left as-is, but `%foo` will
 * be encoded as `%25foo`).
 *
 * This encode is meant to be "safe" and does not throw errors. It will try as
 * hard as it can to properly encode the given URL, including replacing any raw,
 * unpaired surrogate pairs with the Unicode replacement character prior to
 * encoding.
 *
 * @param {string} url
 * @return {string}
 * @public
 */

function encodeUrl (url) {
  return String(url)
    .replace(UNMATCHED_SURROGATE_PAIR_REGEXP, UNMATCHED_SURROGATE_PAIR_REPLACE)
    .replace(ENCODE_CHARS_REGEXP, encodeURI)
}


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * escape-html
 * Copyright(c) 2012-2013 TJ Holowaychuk
 * Copyright(c) 2015 Andreas Lubbe
 * Copyright(c) 2015 Tiancheng "Timothy" Gu
 * MIT Licensed
 */



/**
 * Module variables.
 * @private
 */

var matchHtmlRegExp = /["'&<>]/;

/**
 * Module exports.
 * @public
 */

module.exports = escapeHtml;

/**
 * Escape special characters in the given string of html.
 *
 * @param  {string} string The string to escape for inserting into HTML
 * @return {string}
 * @public
 */

function escapeHtml(string) {
  var str = '' + string;
  var match = matchHtmlRegExp.exec(str);

  if (!match) {
    return str;
  }

  var escape;
  var html = '';
  var index = 0;
  var lastIndex = 0;

  for (index = match.index; index < str.length; index++) {
    switch (str.charCodeAt(index)) {
      case 34: // "
        escape = '&quot;';
        break;
      case 38: // &
        escape = '&amp;';
        break;
      case 39: // '
        escape = '&#39;';
        break;
      case 60: // <
        escape = '&lt;';
        break;
      case 62: // >
        escape = '&gt;';
        break;
      default:
        continue;
    }

    if (lastIndex !== index) {
      html += str.substring(lastIndex, index);
    }

    lastIndex = index + 1;
    html += escape;
  }

  return lastIndex !== index
    ? html + str.substring(lastIndex, index)
    : html;
}


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * statuses
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2016 Douglas Christopher Wilson
 * MIT Licensed
 */



/**
 * Module dependencies.
 * @private
 */

var codes = __webpack_require__(43)

/**
 * Module exports.
 * @public
 */

module.exports = status

// array of status codes
status.codes = populateStatusesMap(status, codes)

// status codes for redirects
status.redirect = {
  300: true,
  301: true,
  302: true,
  303: true,
  305: true,
  307: true,
  308: true
}

// status codes for empty bodies
status.empty = {
  204: true,
  205: true,
  304: true
}

// status codes for when you should retry the request
status.retry = {
  502: true,
  503: true,
  504: true
}

/**
 * Populate the statuses map for given codes.
 * @private
 */

function populateStatusesMap (statuses, codes) {
  var arr = []

  Object.keys(codes).forEach(function forEachCode (code) {
    var message = codes[code]
    var status = Number(code)

    // Populate properties
    statuses[status] = message
    statuses[message] = status
    statuses[message.toLowerCase()] = status

    // Add to array
    arr.push(status)
  })

  return arr
}

/**
 * Get the status code.
 *
 * Given a number, this will throw if it is not a known status
 * code, otherwise the code will be returned. Given a string,
 * the string will be parsed for a number and return the code
 * if valid, otherwise will lookup the code assuming this is
 * the status message.
 *
 * @param {string|number} code
 * @returns {number}
 * @public
 */

function status (code) {
  if (typeof code === 'number') {
    if (!status[code]) throw new Error('invalid status code: ' + code)
    return code
  }

  if (typeof code !== 'string') {
    throw new TypeError('code must be a number or string')
  }

  // '403'
  var n = parseInt(code, 10)
  if (!isNaN(n)) {
    if (!status[n]) throw new Error('invalid status code: ' + n)
    return n
  }

  n = status[code.toLowerCase()]
  if (!n) throw new Error('invalid status message: "' + code + '"')
  return n
}


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Expose `arrayFlatten`.
 */
module.exports = arrayFlatten

/**
 * Recursive flatten function with depth.
 *
 * @param  {Array}  array
 * @param  {Array}  result
 * @param  {Number} depth
 * @return {Array}
 */
function flattenWithDepth (array, result, depth) {
  for (var i = 0; i < array.length; i++) {
    var value = array[i]

    if (depth > 0 && Array.isArray(value)) {
      flattenWithDepth(value, result, depth - 1)
    } else {
      result.push(value)
    }
  }

  return result
}

/**
 * Recursive flatten function. Omitting depth is slightly faster.
 *
 * @param  {Array} array
 * @param  {Array} result
 * @return {Array}
 */
function flattenForever (array, result) {
  for (var i = 0; i < array.length; i++) {
    var value = array[i]

    if (Array.isArray(value)) {
      flattenForever(value, result)
    } else {
      result.push(value)
    }
  }

  return result
}

/**
 * Flatten an array, with the ability to define a depth.
 *
 * @param  {Array}  array
 * @param  {Number} depth
 * @return {Array}
 */
function arrayFlatten (array, depth) {
  if (depth == null) {
    return flattenForever(array, [])
  }

  return flattenWithDepth(array, [], depth)
}


/***/ }),
/* 14 */
/***/ (function(module, exports) {

/**
 * Merge object b with object a.
 *
 *     var a = { foo: 'bar' }
 *       , b = { bar: 'baz' };
 *
 *     merge(a, b);
 *     // => { foo: 'bar', bar: 'baz' }
 *
 * @param {Object} a
 * @param {Object} b
 * @return {Object}
 * @api public
 */

exports = module.exports = function(a, b){
  if (a && b) {
    for (var key in b) {
      a[key] = b[key];
    }
  }
  return a;
};


/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = Object.setPrototypeOf || ({__proto__:[]} instanceof Array ? setProtoOf : mixinProperties);

function setProtoOf(obj, proto) {
	obj.__proto__ = proto;
	return obj;
}

function mixinProperties(obj, proto) {
	for (var prop in proto) {
		if (!obj.hasOwnProperty(prop)) {
			obj[prop] = proto[prop];
		}
	}
	return obj;
}


/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("events");

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * on-finished
 * Copyright(c) 2013 Jonathan Ong
 * Copyright(c) 2014 Douglas Christopher Wilson
 * MIT Licensed
 */



/**
 * Module exports.
 * @public
 */

module.exports = onFinished
module.exports.isFinished = isFinished

/**
 * Module dependencies.
 * @private
 */

var first = __webpack_require__(42)

/**
 * Variables.
 * @private
 */

/* istanbul ignore next */
var defer = typeof setImmediate === 'function'
  ? setImmediate
  : function(fn){ process.nextTick(fn.bind.apply(fn, arguments)) }

/**
 * Invoke callback when the response has finished, useful for
 * cleaning up resources afterwards.
 *
 * @param {object} msg
 * @param {function} listener
 * @return {object}
 * @public
 */

function onFinished(msg, listener) {
  if (isFinished(msg) !== false) {
    defer(listener, null, msg)
    return msg
  }

  // attach the listener to the message
  attachListener(msg, listener)

  return msg
}

/**
 * Determine if message is already finished.
 *
 * @param {object} msg
 * @return {boolean}
 * @public
 */

function isFinished(msg) {
  var socket = msg.socket

  if (typeof msg.finished === 'boolean') {
    // OutgoingMessage
    return Boolean(msg.finished || (socket && !socket.writable))
  }

  if (typeof msg.complete === 'boolean') {
    // IncomingMessage
    return Boolean(msg.upgrade || !socket || !socket.readable || (msg.complete && !msg.readable))
  }

  // don't know
  return undefined
}

/**
 * Attach a finished listener to the message.
 *
 * @param {object} msg
 * @param {function} callback
 * @private
 */

function attachFinishedListener(msg, callback) {
  var eeMsg
  var eeSocket
  var finished = false

  function onFinish(error) {
    eeMsg.cancel()
    eeSocket.cancel()

    finished = true
    callback(error)
  }

  // finished on first message event
  eeMsg = eeSocket = first([[msg, 'end', 'finish']], onFinish)

  function onSocket(socket) {
    // remove listener
    msg.removeListener('socket', onSocket)

    if (finished) return
    if (eeMsg !== eeSocket) return

    // finished on first socket event
    eeSocket = first([[socket, 'error', 'close']], onFinish)
  }

  if (msg.socket) {
    // socket already assigned
    onSocket(msg.socket)
    return
  }

  // wait for socket to be assigned
  msg.on('socket', onSocket)

  if (msg.socket === undefined) {
    // node.js 0.8 patch
    patchAssignSocket(msg, onSocket)
  }
}

/**
 * Attach the listener to the message.
 *
 * @param {object} msg
 * @return {function}
 * @private
 */

function attachListener(msg, listener) {
  var attached = msg.__onFinished

  // create a private single listener with queue
  if (!attached || !attached.queue) {
    attached = msg.__onFinished = createListener(msg)
    attachFinishedListener(msg, attached)
  }

  attached.queue.push(listener)
}

/**
 * Create listener on message.
 *
 * @param {object} msg
 * @return {function}
 * @private
 */

function createListener(msg) {
  function listener(err) {
    if (msg.__onFinished === listener) msg.__onFinished = null
    if (!listener.queue) return

    var queue = listener.queue
    listener.queue = null

    for (var i = 0; i < queue.length; i++) {
      queue[i](err, msg)
    }
  }

  listener.queue = []

  return listener
}

/**
 * Patch ServerResponse.prototype.assignSocket for node.js 0.8.
 *
 * @param {ServerResponse} res
 * @param {function} callback
 * @private
 */

function patchAssignSocket(res, callback) {
  var assignSocket = res.assignSocket

  if (typeof assignSocket !== 'function') return

  // res.on('socket', callback) is broken in 0.8
  res.assignSocket = function _assignSocket(socket) {
    assignSocket.call(this, socket)
    callback(socket)
  }
}


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * methods
 * Copyright(c) 2013-2014 TJ Holowaychuk
 * Copyright(c) 2015-2016 Douglas Christopher Wilson
 * MIT Licensed
 */



/**
 * Module dependencies.
 * @private
 */

var http = __webpack_require__(9);

/**
 * Module exports.
 * @public
 */

module.exports = getCurrentNodeMethods() || getBasicNodeMethods();

/**
 * Get the current Node.js methods.
 * @private
 */

function getCurrentNodeMethods() {
  return http.METHODS && http.METHODS.map(function lowerCaseMethod(method) {
    return method.toLowerCase();
  });
}

/**
 * Get the "basic" Node.js methods, a snapshot from Node.js 0.10.
 * @private
 */

function getBasicNodeMethods() {
  return [
    'get',
    'post',
    'put',
    'head',
    'delete',
    'options',
    'trace',
    'copy',
    'lock',
    'mkcol',
    'move',
    'purge',
    'propfind',
    'proppatch',
    'unlock',
    'report',
    'mkactivity',
    'checkout',
    'merge',
    'm-search',
    'notify',
    'subscribe',
    'unsubscribe',
    'patch',
    'search',
    'connect'
  ];
}


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * send
 * Copyright(c) 2012 TJ Holowaychuk
 * Copyright(c) 2014-2016 Douglas Christopher Wilson
 * MIT Licensed
 */



/**
 * Module dependencies.
 * @private
 */

var createError = __webpack_require__(54)
var debug = __webpack_require__(5)('send')
var deprecate = __webpack_require__(6)('send')
var destroy = __webpack_require__(56)
var encodeUrl = __webpack_require__(10)
var escapeHtml = __webpack_require__(11)
var etag = __webpack_require__(31)
var EventEmitter = __webpack_require__(16).EventEmitter
var fresh = __webpack_require__(33)
var fs = __webpack_require__(2)
var mime = __webpack_require__(57)
var ms = __webpack_require__(59)
var onFinished = __webpack_require__(17)
var parseRange = __webpack_require__(34)
var path = __webpack_require__(4)
var statuses = __webpack_require__(12)
var Stream = __webpack_require__(30)
var util = __webpack_require__(60)

/**
 * Path function references.
 * @private
 */

var extname = path.extname
var join = path.join
var normalize = path.normalize
var resolve = path.resolve
var sep = path.sep

/**
 * Regular expression for identifying a bytes Range header.
 * @private
 */

var BYTES_RANGE_REGEXP = /^ *bytes=/

/**
 * Simple expression to split token list.
 * @private
 */

var TOKEN_LIST_REGEXP = / *, */

/**
 * Maximum value allowed for the max age.
 * @private
 */

var MAX_MAXAGE = 60 * 60 * 24 * 365 * 1000 // 1 year

/**
 * Regular expression to match a path with a directory up component.
 * @private
 */

var UP_PATH_REGEXP = /(?:^|[\\/])\.\.(?:[\\/]|$)/

/**
 * Module exports.
 * @public
 */

module.exports = send
module.exports.mime = mime

/**
 * Shim EventEmitter.listenerCount for node.js < 0.10
 */

/* istanbul ignore next */
var listenerCount = EventEmitter.listenerCount ||
  function (emitter, type) { return emitter.listeners(type).length }

/**
 * Return a `SendStream` for `req` and `path`.
 *
 * @param {object} req
 * @param {string} path
 * @param {object} [options]
 * @return {SendStream}
 * @public
 */

function send (req, path, options) {
  return new SendStream(req, path, options)
}

/**
 * Initialize a `SendStream` with the given `path`.
 *
 * @param {Request} req
 * @param {String} path
 * @param {object} [options]
 * @private
 */

function SendStream (req, path, options) {
  Stream.call(this)

  var opts = options || {}

  this.options = opts
  this.path = path
  this.req = req

  this._acceptRanges = opts.acceptRanges !== undefined
    ? Boolean(opts.acceptRanges)
    : true

  this._cacheControl = opts.cacheControl !== undefined
    ? Boolean(opts.cacheControl)
    : true

  this._etag = opts.etag !== undefined
    ? Boolean(opts.etag)
    : true

  this._dotfiles = opts.dotfiles !== undefined
    ? opts.dotfiles
    : 'ignore'

  if (this._dotfiles !== 'ignore' && this._dotfiles !== 'allow' && this._dotfiles !== 'deny') {
    throw new TypeError('dotfiles option must be "allow", "deny", or "ignore"')
  }

  this._hidden = Boolean(opts.hidden)

  if (opts.hidden !== undefined) {
    deprecate('hidden: use dotfiles: \'' + (this._hidden ? 'allow' : 'ignore') + '\' instead')
  }

  // legacy support
  if (opts.dotfiles === undefined) {
    this._dotfiles = undefined
  }

  this._extensions = opts.extensions !== undefined
    ? normalizeList(opts.extensions, 'extensions option')
    : []

  this._index = opts.index !== undefined
    ? normalizeList(opts.index, 'index option')
    : ['index.html']

  this._lastModified = opts.lastModified !== undefined
    ? Boolean(opts.lastModified)
    : true

  this._maxage = opts.maxAge || opts.maxage
  this._maxage = typeof this._maxage === 'string'
    ? ms(this._maxage)
    : Number(this._maxage)
  this._maxage = !isNaN(this._maxage)
    ? Math.min(Math.max(0, this._maxage), MAX_MAXAGE)
    : 0

  this._root = opts.root
    ? resolve(opts.root)
    : null

  if (!this._root && opts.from) {
    this.from(opts.from)
  }
}

/**
 * Inherits from `Stream`.
 */

util.inherits(SendStream, Stream)

/**
 * Enable or disable etag generation.
 *
 * @param {Boolean} val
 * @return {SendStream}
 * @api public
 */

SendStream.prototype.etag = deprecate.function(function etag (val) {
  this._etag = Boolean(val)
  debug('etag %s', this._etag)
  return this
}, 'send.etag: pass etag as option')

/**
 * Enable or disable "hidden" (dot) files.
 *
 * @param {Boolean} path
 * @return {SendStream}
 * @api public
 */

SendStream.prototype.hidden = deprecate.function(function hidden (val) {
  this._hidden = Boolean(val)
  this._dotfiles = undefined
  debug('hidden %s', this._hidden)
  return this
}, 'send.hidden: use dotfiles option')

/**
 * Set index `paths`, set to a falsy
 * value to disable index support.
 *
 * @param {String|Boolean|Array} paths
 * @return {SendStream}
 * @api public
 */

SendStream.prototype.index = deprecate.function(function index (paths) {
  var index = !paths ? [] : normalizeList(paths, 'paths argument')
  debug('index %o', paths)
  this._index = index
  return this
}, 'send.index: pass index as option')

/**
 * Set root `path`.
 *
 * @param {String} path
 * @return {SendStream}
 * @api public
 */

SendStream.prototype.root = function root (path) {
  this._root = resolve(String(path))
  debug('root %s', this._root)
  return this
}

SendStream.prototype.from = deprecate.function(SendStream.prototype.root,
  'send.from: pass root as option')

SendStream.prototype.root = deprecate.function(SendStream.prototype.root,
  'send.root: pass root as option')

/**
 * Set max-age to `maxAge`.
 *
 * @param {Number} maxAge
 * @return {SendStream}
 * @api public
 */

SendStream.prototype.maxage = deprecate.function(function maxage (maxAge) {
  this._maxage = typeof maxAge === 'string'
    ? ms(maxAge)
    : Number(maxAge)
  this._maxage = !isNaN(this._maxage)
    ? Math.min(Math.max(0, this._maxage), MAX_MAXAGE)
    : 0
  debug('max-age %d', this._maxage)
  return this
}, 'send.maxage: pass maxAge as option')

/**
 * Emit error with `status`.
 *
 * @param {number} status
 * @param {Error} [err]
 * @private
 */

SendStream.prototype.error = function error (status, err) {
  // emit if listeners instead of responding
  if (listenerCount(this, 'error') !== 0) {
    return this.emit('error', createError(status, err, {
      expose: false
    }))
  }

  var res = this.res
  var msg = statuses[status] || String(status)
  var doc = createHtmlDocument('Error', escapeHtml(msg))

  // clear existing headers
  clearHeaders(res)

  // add error headers
  if (err && err.headers) {
    setHeaders(res, err.headers)
  }

  // send basic response
  res.statusCode = status
  res.setHeader('Content-Type', 'text/html; charset=UTF-8')
  res.setHeader('Content-Length', Buffer.byteLength(doc))
  res.setHeader('Content-Security-Policy', "default-src 'self'")
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.end(doc)
}

/**
 * Check if the pathname ends with "/".
 *
 * @return {boolean}
 * @private
 */

SendStream.prototype.hasTrailingSlash = function hasTrailingSlash () {
  return this.path[this.path.length - 1] === '/'
}

/**
 * Check if this is a conditional GET request.
 *
 * @return {Boolean}
 * @api private
 */

SendStream.prototype.isConditionalGET = function isConditionalGET () {
  return this.req.headers['if-match'] ||
    this.req.headers['if-unmodified-since'] ||
    this.req.headers['if-none-match'] ||
    this.req.headers['if-modified-since']
}

/**
 * Check if the request preconditions failed.
 *
 * @return {boolean}
 * @private
 */

SendStream.prototype.isPreconditionFailure = function isPreconditionFailure () {
  var req = this.req
  var res = this.res

  // if-match
  var match = req.headers['if-match']
  if (match) {
    var etag = res.getHeader('ETag')
    return !etag || (match !== '*' && match.split(TOKEN_LIST_REGEXP).every(function (match) {
      return match !== etag && match !== 'W/' + etag && 'W/' + match !== etag
    }))
  }

  // if-unmodified-since
  var unmodifiedSince = parseHttpDate(req.headers['if-unmodified-since'])
  if (!isNaN(unmodifiedSince)) {
    var lastModified = parseHttpDate(res.getHeader('Last-Modified'))
    return isNaN(lastModified) || lastModified > unmodifiedSince
  }

  return false
}

/**
 * Strip content-* header fields.
 *
 * @private
 */

SendStream.prototype.removeContentHeaderFields = function removeContentHeaderFields () {
  var res = this.res
  var headers = getHeaderNames(res)

  for (var i = 0; i < headers.length; i++) {
    var header = headers[i]
    if (header.substr(0, 8) === 'content-' && header !== 'content-location') {
      res.removeHeader(header)
    }
  }
}

/**
 * Respond with 304 not modified.
 *
 * @api private
 */

SendStream.prototype.notModified = function notModified () {
  var res = this.res
  debug('not modified')
  this.removeContentHeaderFields()
  res.statusCode = 304
  res.end()
}

/**
 * Raise error that headers already sent.
 *
 * @api private
 */

SendStream.prototype.headersAlreadySent = function headersAlreadySent () {
  var err = new Error('Can\'t set headers after they are sent.')
  debug('headers already sent')
  this.error(500, err)
}

/**
 * Check if the request is cacheable, aka
 * responded with 2xx or 304 (see RFC 2616 section 14.2{5,6}).
 *
 * @return {Boolean}
 * @api private
 */

SendStream.prototype.isCachable = function isCachable () {
  var statusCode = this.res.statusCode
  return (statusCode >= 200 && statusCode < 300) ||
    statusCode === 304
}

/**
 * Handle stat() error.
 *
 * @param {Error} error
 * @private
 */

SendStream.prototype.onStatError = function onStatError (error) {
  switch (error.code) {
    case 'ENAMETOOLONG':
    case 'ENOENT':
    case 'ENOTDIR':
      this.error(404, error)
      break
    default:
      this.error(500, error)
      break
  }
}

/**
 * Check if the cache is fresh.
 *
 * @return {Boolean}
 * @api private
 */

SendStream.prototype.isFresh = function isFresh () {
  return fresh(this.req.headers, {
    'etag': this.res.getHeader('ETag'),
    'last-modified': this.res.getHeader('Last-Modified')
  })
}

/**
 * Check if the range is fresh.
 *
 * @return {Boolean}
 * @api private
 */

SendStream.prototype.isRangeFresh = function isRangeFresh () {
  var ifRange = this.req.headers['if-range']

  if (!ifRange) {
    return true
  }

  // if-range as etag
  if (ifRange.indexOf('"') !== -1) {
    var etag = this.res.getHeader('ETag')
    return Boolean(etag && ifRange.indexOf(etag) !== -1)
  }

  // if-range as modified date
  var lastModified = this.res.getHeader('Last-Modified')
  return parseHttpDate(lastModified) <= parseHttpDate(ifRange)
}

/**
 * Redirect to path.
 *
 * @param {string} path
 * @private
 */

SendStream.prototype.redirect = function redirect (path) {
  var res = this.res

  if (listenerCount(this, 'directory') !== 0) {
    this.emit('directory', res, path)
    return
  }

  if (this.hasTrailingSlash()) {
    this.error(403)
    return
  }

  var loc = encodeUrl(collapseLeadingSlashes(this.path + '/'))
  var doc = createHtmlDocument('Redirecting', 'Redirecting to <a href="' + escapeHtml(loc) + '">' +
    escapeHtml(loc) + '</a>')

  // redirect
  res.statusCode = 301
  res.setHeader('Content-Type', 'text/html; charset=UTF-8')
  res.setHeader('Content-Length', Buffer.byteLength(doc))
  res.setHeader('Content-Security-Policy', "default-src 'self'")
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('Location', loc)
  res.end(doc)
}

/**
 * Pipe to `res.
 *
 * @param {Stream} res
 * @return {Stream} res
 * @api public
 */

SendStream.prototype.pipe = function pipe (res) {
  // root path
  var root = this._root

  // references
  this.res = res

  // decode the path
  var path = decode(this.path)
  if (path === -1) {
    this.error(400)
    return res
  }

  // null byte(s)
  if (~path.indexOf('\0')) {
    this.error(400)
    return res
  }

  var parts
  if (root !== null) {
    // malicious path
    if (UP_PATH_REGEXP.test(normalize('.' + sep + path))) {
      debug('malicious path "%s"', path)
      this.error(403)
      return res
    }

    // join / normalize from optional root dir
    path = normalize(join(root, path))
    root = normalize(root + sep)

    // explode path parts
    parts = path.substr(root.length).split(sep)
  } else {
    // ".." is malicious without "root"
    if (UP_PATH_REGEXP.test(path)) {
      debug('malicious path "%s"', path)
      this.error(403)
      return res
    }

    // explode path parts
    parts = normalize(path).split(sep)

    // resolve the path
    path = resolve(path)
  }

  // dotfile handling
  if (containsDotFile(parts)) {
    var access = this._dotfiles

    // legacy support
    if (access === undefined) {
      access = parts[parts.length - 1][0] === '.'
        ? (this._hidden ? 'allow' : 'ignore')
        : 'allow'
    }

    debug('%s dotfile "%s"', access, path)
    switch (access) {
      case 'allow':
        break
      case 'deny':
        this.error(403)
        return res
      case 'ignore':
      default:
        this.error(404)
        return res
    }
  }

  // index file support
  if (this._index.length && this.hasTrailingSlash()) {
    this.sendIndex(path)
    return res
  }

  this.sendFile(path)
  return res
}

/**
 * Transfer `path`.
 *
 * @param {String} path
 * @api public
 */

SendStream.prototype.send = function send (path, stat) {
  var len = stat.size
  var options = this.options
  var opts = {}
  var res = this.res
  var req = this.req
  var ranges = req.headers.range
  var offset = options.start || 0

  if (headersSent(res)) {
    // impossible to send now
    this.headersAlreadySent()
    return
  }

  debug('pipe "%s"', path)

  // set header fields
  this.setHeader(path, stat)

  // set content-type
  this.type(path)

  // conditional GET support
  if (this.isConditionalGET()) {
    if (this.isPreconditionFailure()) {
      this.error(412)
      return
    }

    if (this.isCachable() && this.isFresh()) {
      this.notModified()
      return
    }
  }

  // adjust len to start/end options
  len = Math.max(0, len - offset)
  if (options.end !== undefined) {
    var bytes = options.end - offset + 1
    if (len > bytes) len = bytes
  }

  // Range support
  if (this._acceptRanges && BYTES_RANGE_REGEXP.test(ranges)) {
    // parse
    ranges = parseRange(len, ranges, {
      combine: true
    })

    // If-Range support
    if (!this.isRangeFresh()) {
      debug('range stale')
      ranges = -2
    }

    // unsatisfiable
    if (ranges === -1) {
      debug('range unsatisfiable')

      // Content-Range
      res.setHeader('Content-Range', contentRange('bytes', len))

      // 416 Requested Range Not Satisfiable
      return this.error(416, {
        headers: {'Content-Range': res.getHeader('Content-Range')}
      })
    }

    // valid (syntactically invalid/multiple ranges are treated as a regular response)
    if (ranges !== -2 && ranges.length === 1) {
      debug('range %j', ranges)

      // Content-Range
      res.statusCode = 206
      res.setHeader('Content-Range', contentRange('bytes', len, ranges[0]))

      // adjust for requested range
      offset += ranges[0].start
      len = ranges[0].end - ranges[0].start + 1
    }
  }

  // clone options
  for (var prop in options) {
    opts[prop] = options[prop]
  }

  // set read options
  opts.start = offset
  opts.end = Math.max(offset, offset + len - 1)

  // content-length
  res.setHeader('Content-Length', len)

  // HEAD support
  if (req.method === 'HEAD') {
    res.end()
    return
  }

  this.stream(path, opts)
}

/**
 * Transfer file for `path`.
 *
 * @param {String} path
 * @api private
 */
SendStream.prototype.sendFile = function sendFile (path) {
  var i = 0
  var self = this

  debug('stat "%s"', path)
  fs.stat(path, function onstat (err, stat) {
    if (err && err.code === 'ENOENT' && !extname(path) && path[path.length - 1] !== sep) {
      // not found, check extensions
      return next(err)
    }
    if (err) return self.onStatError(err)
    if (stat.isDirectory()) return self.redirect(path)
    self.emit('file', path, stat)
    self.send(path, stat)
  })

  function next (err) {
    if (self._extensions.length <= i) {
      return err
        ? self.onStatError(err)
        : self.error(404)
    }

    var p = path + '.' + self._extensions[i++]

    debug('stat "%s"', p)
    fs.stat(p, function (err, stat) {
      if (err) return next(err)
      if (stat.isDirectory()) return next()
      self.emit('file', p, stat)
      self.send(p, stat)
    })
  }
}

/**
 * Transfer index for `path`.
 *
 * @param {String} path
 * @api private
 */
SendStream.prototype.sendIndex = function sendIndex (path) {
  var i = -1
  var self = this

  function next (err) {
    if (++i >= self._index.length) {
      if (err) return self.onStatError(err)
      return self.error(404)
    }

    var p = join(path, self._index[i])

    debug('stat "%s"', p)
    fs.stat(p, function (err, stat) {
      if (err) return next(err)
      if (stat.isDirectory()) return next()
      self.emit('file', p, stat)
      self.send(p, stat)
    })
  }

  next()
}

/**
 * Stream `path` to the response.
 *
 * @param {String} path
 * @param {Object} options
 * @api private
 */

SendStream.prototype.stream = function stream (path, options) {
  // TODO: this is all lame, refactor meeee
  var finished = false
  var self = this
  var res = this.res

  // pipe
  var stream = fs.createReadStream(path, options)
  this.emit('stream', stream)
  stream.pipe(res)

  // response finished, done with the fd
  onFinished(res, function onfinished () {
    finished = true
    destroy(stream)
  })

  // error handling code-smell
  stream.on('error', function onerror (err) {
    // request already finished
    if (finished) return

    // clean up stream
    finished = true
    destroy(stream)

    // error
    self.onStatError(err)
  })

  // end
  stream.on('end', function onend () {
    self.emit('end')
  })
}

/**
 * Set content-type based on `path`
 * if it hasn't been explicitly set.
 *
 * @param {String} path
 * @api private
 */

SendStream.prototype.type = function type (path) {
  var res = this.res

  if (res.getHeader('Content-Type')) return

  var type = mime.lookup(path)

  if (!type) {
    debug('no content-type')
    return
  }

  var charset = mime.charsets.lookup(type)

  debug('content-type %s', type)
  res.setHeader('Content-Type', type + (charset ? '; charset=' + charset : ''))
}

/**
 * Set response header fields, most
 * fields may be pre-defined.
 *
 * @param {String} path
 * @param {Object} stat
 * @api private
 */

SendStream.prototype.setHeader = function setHeader (path, stat) {
  var res = this.res

  this.emit('headers', res, path, stat)

  if (this._acceptRanges && !res.getHeader('Accept-Ranges')) {
    debug('accept ranges')
    res.setHeader('Accept-Ranges', 'bytes')
  }

  if (this._cacheControl && !res.getHeader('Cache-Control')) {
    var cacheControl = 'public, max-age=' + Math.floor(this._maxage / 1000)
    debug('cache-control %s', cacheControl)
    res.setHeader('Cache-Control', cacheControl)
  }

  if (this._lastModified && !res.getHeader('Last-Modified')) {
    var modified = stat.mtime.toUTCString()
    debug('modified %s', modified)
    res.setHeader('Last-Modified', modified)
  }

  if (this._etag && !res.getHeader('ETag')) {
    var val = etag(stat)
    debug('etag %s', val)
    res.setHeader('ETag', val)
  }
}

/**
 * Clear all headers from a response.
 *
 * @param {object} res
 * @private
 */

function clearHeaders (res) {
  var headers = getHeaderNames(res)

  for (var i = 0; i < headers.length; i++) {
    res.removeHeader(headers[i])
  }
}

/**
 * Collapse all leading slashes into a single slash
 *
 * @param {string} str
 * @private
 */
function collapseLeadingSlashes (str) {
  for (var i = 0; i < str.length; i++) {
    if (str[i] !== '/') {
      break
    }
  }

  return i > 1
    ? '/' + str.substr(i)
    : str
}

/**
 * Determine if path parts contain a dotfile.
 *
 * @api private
 */

function containsDotFile (parts) {
  for (var i = 0; i < parts.length; i++) {
    if (parts[i][0] === '.') {
      return true
    }
  }

  return false
}

/**
 * Create a Content-Range header.
 *
 * @param {string} type
 * @param {number} size
 * @param {array} [range]
 */

function contentRange (type, size, range) {
  return type + ' ' + (range ? range.start + '-' + range.end : '*') + '/' + size
}

/**
 * Create a minimal HTML document.
 *
 * @param {string} title
 * @param {string} body
 * @private
 */

function createHtmlDocument (title, body) {
  return '<!DOCTYPE html>\n' +
    '<html lang="en">\n' +
    '<head>\n' +
    '<meta charset="utf-8">\n' +
    '<title>' + title + '</title>\n' +
    '</head>\n' +
    '<body>\n' +
    '<pre>' + body + '</pre>\n' +
    '</body>\n'
}

/**
 * decodeURIComponent.
 *
 * Allows V8 to only deoptimize this fn instead of all
 * of send().
 *
 * @param {String} path
 * @api private
 */

function decode (path) {
  try {
    return decodeURIComponent(path)
  } catch (err) {
    return -1
  }
}

/**
 * Get the header names on a respnse.
 *
 * @param {object} res
 * @returns {array[string]}
 * @private
 */

function getHeaderNames (res) {
  return typeof res.getHeaderNames !== 'function'
    ? Object.keys(res._headers || {})
    : res.getHeaderNames()
}

/**
 * Determine if the response headers have been sent.
 *
 * @param {object} res
 * @returns {boolean}
 * @private
 */

function headersSent (res) {
  return typeof res.headersSent !== 'boolean'
    ? Boolean(res._header)
    : res.headersSent
}

/**
 * Normalize the index option into an array.
 *
 * @param {boolean|string|array} val
 * @param {string} name
 * @private
 */

function normalizeList (val, name) {
  var list = [].concat(val || [])

  for (var i = 0; i < list.length; i++) {
    if (typeof list[i] !== 'string') {
      throw new TypeError(name + ' must be array of strings or false')
    }
  }

  return list
}

/**
 * Parse an HTTP Date into a number.
 *
 * @param {string} date
 * @private
 */

function parseHttpDate (date) {
  var timestamp = date && Date.parse(date)

  return typeof timestamp === 'number'
    ? timestamp
    : NaN
}

/**
 * Set an object of headers on a response.
 *
 * @param {object} res
 * @param {object} headers
 * @private
 */

function setHeaders (res, headers) {
  var keys = Object.keys(headers)

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i]
    res.setHeader(key, headers[key])
  }
}


/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("url");

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * express
 * Copyright(c) 2009-2013 TJ Holowaychuk
 * Copyright(c) 2013 Roman Shtylman
 * Copyright(c) 2014-2015 Douglas Christopher Wilson
 * MIT Licensed
 */



/**
 * Module dependencies.
 * @private
 */

var Route = __webpack_require__(22);
var Layer = __webpack_require__(23);
var methods = __webpack_require__(18);
var mixin = __webpack_require__(14);
var debug = __webpack_require__(5)('express:router');
var deprecate = __webpack_require__(6)('express');
var flatten = __webpack_require__(13);
var parseUrl = __webpack_require__(8);
var setPrototypeOf = __webpack_require__(15)

/**
 * Module variables.
 * @private
 */

var objectRegExp = /^\[object (\S+)\]$/;
var slice = Array.prototype.slice;
var toString = Object.prototype.toString;

/**
 * Initialize a new `Router` with the given `options`.
 *
 * @param {Object} options
 * @return {Router} which is an callable function
 * @public
 */

var proto = module.exports = function(options) {
  var opts = options || {};

  function router(req, res, next) {
    router.handle(req, res, next);
  }

  // mixin Router class functions
  setPrototypeOf(router, proto)

  router.params = {};
  router._params = [];
  router.caseSensitive = opts.caseSensitive;
  router.mergeParams = opts.mergeParams;
  router.strict = opts.strict;
  router.stack = [];

  return router;
};

/**
 * Map the given param placeholder `name`(s) to the given callback.
 *
 * Parameter mapping is used to provide pre-conditions to routes
 * which use normalized placeholders. For example a _:user_id_ parameter
 * could automatically load a user's information from the database without
 * any additional code,
 *
 * The callback uses the same signature as middleware, the only difference
 * being that the value of the placeholder is passed, in this case the _id_
 * of the user. Once the `next()` function is invoked, just like middleware
 * it will continue on to execute the route, or subsequent parameter functions.
 *
 * Just like in middleware, you must either respond to the request or call next
 * to avoid stalling the request.
 *
 *  app.param('user_id', function(req, res, next, id){
 *    User.find(id, function(err, user){
 *      if (err) {
 *        return next(err);
 *      } else if (!user) {
 *        return next(new Error('failed to load user'));
 *      }
 *      req.user = user;
 *      next();
 *    });
 *  });
 *
 * @param {String} name
 * @param {Function} fn
 * @return {app} for chaining
 * @public
 */

proto.param = function param(name, fn) {
  // param logic
  if (typeof name === 'function') {
    deprecate('router.param(fn): Refactor to use path params');
    this._params.push(name);
    return;
  }

  // apply param functions
  var params = this._params;
  var len = params.length;
  var ret;

  if (name[0] === ':') {
    deprecate('router.param(' + JSON.stringify(name) + ', fn): Use router.param(' + JSON.stringify(name.substr(1)) + ', fn) instead');
    name = name.substr(1);
  }

  for (var i = 0; i < len; ++i) {
    if (ret = params[i](name, fn)) {
      fn = ret;
    }
  }

  // ensure we end up with a
  // middleware function
  if ('function' !== typeof fn) {
    throw new Error('invalid param() call for ' + name + ', got ' + fn);
  }

  (this.params[name] = this.params[name] || []).push(fn);
  return this;
};

/**
 * Dispatch a req, res into the router.
 * @private
 */

proto.handle = function handle(req, res, out) {
  var self = this;

  debug('dispatching %s %s', req.method, req.url);

  var idx = 0;
  var protohost = getProtohost(req.url) || ''
  var removed = '';
  var slashAdded = false;
  var paramcalled = {};

  // store options for OPTIONS request
  // only used if OPTIONS request
  var options = [];

  // middleware and routes
  var stack = self.stack;

  // manage inter-router variables
  var parentParams = req.params;
  var parentUrl = req.baseUrl || '';
  var done = restore(out, req, 'baseUrl', 'next', 'params');

  // setup next layer
  req.next = next;

  // for options requests, respond with a default if nothing else responds
  if (req.method === 'OPTIONS') {
    done = wrap(done, function(old, err) {
      if (err || options.length === 0) return old(err);
      sendOptionsResponse(res, options, old);
    });
  }

  // setup basic req values
  req.baseUrl = parentUrl;
  req.originalUrl = req.originalUrl || req.url;

  next();

  function next(err) {
    var layerError = err === 'route'
      ? null
      : err;

    // remove added slash
    if (slashAdded) {
      req.url = req.url.substr(1);
      slashAdded = false;
    }

    // restore altered req.url
    if (removed.length !== 0) {
      req.baseUrl = parentUrl;
      req.url = protohost + removed + req.url.substr(protohost.length);
      removed = '';
    }

    // signal to exit router
    if (layerError === 'router') {
      setImmediate(done, null)
      return
    }

    // no more matching layers
    if (idx >= stack.length) {
      setImmediate(done, layerError);
      return;
    }

    // get pathname of request
    var path = getPathname(req);

    if (path == null) {
      return done(layerError);
    }

    // find next matching layer
    var layer;
    var match;
    var route;

    while (match !== true && idx < stack.length) {
      layer = stack[idx++];
      match = matchLayer(layer, path);
      route = layer.route;

      if (typeof match !== 'boolean') {
        // hold on to layerError
        layerError = layerError || match;
      }

      if (match !== true) {
        continue;
      }

      if (!route) {
        // process non-route handlers normally
        continue;
      }

      if (layerError) {
        // routes do not match with a pending error
        match = false;
        continue;
      }

      var method = req.method;
      var has_method = route._handles_method(method);

      // build up automatic options response
      if (!has_method && method === 'OPTIONS') {
        appendMethods(options, route._options());
      }

      // don't even bother matching route
      if (!has_method && method !== 'HEAD') {
        match = false;
        continue;
      }
    }

    // no match
    if (match !== true) {
      return done(layerError);
    }

    // store route for dispatch on change
    if (route) {
      req.route = route;
    }

    // Capture one-time layer values
    req.params = self.mergeParams
      ? mergeParams(layer.params, parentParams)
      : layer.params;
    var layerPath = layer.path;

    // this should be done for the layer
    self.process_params(layer, paramcalled, req, res, function (err) {
      if (err) {
        return next(layerError || err);
      }

      if (route) {
        return layer.handle_request(req, res, next);
      }

      trim_prefix(layer, layerError, layerPath, path);
    });
  }

  function trim_prefix(layer, layerError, layerPath, path) {
    if (layerPath.length !== 0) {
      // Validate path breaks on a path separator
      var c = path[layerPath.length]
      if (c && c !== '/' && c !== '.') return next(layerError)

      // Trim off the part of the url that matches the route
      // middleware (.use stuff) needs to have the path stripped
      debug('trim prefix (%s) from url %s', layerPath, req.url);
      removed = layerPath;
      req.url = protohost + req.url.substr(protohost.length + removed.length);

      // Ensure leading slash
      if (!protohost && req.url[0] !== '/') {
        req.url = '/' + req.url;
        slashAdded = true;
      }

      // Setup base URL (no trailing slash)
      req.baseUrl = parentUrl + (removed[removed.length - 1] === '/'
        ? removed.substring(0, removed.length - 1)
        : removed);
    }

    debug('%s %s : %s', layer.name, layerPath, req.originalUrl);

    if (layerError) {
      layer.handle_error(layerError, req, res, next);
    } else {
      layer.handle_request(req, res, next);
    }
  }
};

/**
 * Process any parameters for the layer.
 * @private
 */

proto.process_params = function process_params(layer, called, req, res, done) {
  var params = this.params;

  // captured parameters from the layer, keys and values
  var keys = layer.keys;

  // fast track
  if (!keys || keys.length === 0) {
    return done();
  }

  var i = 0;
  var name;
  var paramIndex = 0;
  var key;
  var paramVal;
  var paramCallbacks;
  var paramCalled;

  // process params in order
  // param callbacks can be async
  function param(err) {
    if (err) {
      return done(err);
    }

    if (i >= keys.length ) {
      return done();
    }

    paramIndex = 0;
    key = keys[i++];
    name = key.name;
    paramVal = req.params[name];
    paramCallbacks = params[name];
    paramCalled = called[name];

    if (paramVal === undefined || !paramCallbacks) {
      return param();
    }

    // param previously called with same value or error occurred
    if (paramCalled && (paramCalled.match === paramVal
      || (paramCalled.error && paramCalled.error !== 'route'))) {
      // restore value
      req.params[name] = paramCalled.value;

      // next param
      return param(paramCalled.error);
    }

    called[name] = paramCalled = {
      error: null,
      match: paramVal,
      value: paramVal
    };

    paramCallback();
  }

  // single param callbacks
  function paramCallback(err) {
    var fn = paramCallbacks[paramIndex++];

    // store updated value
    paramCalled.value = req.params[key.name];

    if (err) {
      // store error
      paramCalled.error = err;
      param(err);
      return;
    }

    if (!fn) return param();

    try {
      fn(req, res, paramCallback, paramVal, key.name);
    } catch (e) {
      paramCallback(e);
    }
  }

  param();
};

/**
 * Use the given middleware function, with optional path, defaulting to "/".
 *
 * Use (like `.all`) will run for any http METHOD, but it will not add
 * handlers for those methods so OPTIONS requests will not consider `.use`
 * functions even if they could respond.
 *
 * The other difference is that _route_ path is stripped and not visible
 * to the handler function. The main effect of this feature is that mounted
 * handlers can operate without any code changes regardless of the "prefix"
 * pathname.
 *
 * @public
 */

proto.use = function use(fn) {
  var offset = 0;
  var path = '/';

  // default path to '/'
  // disambiguate router.use([fn])
  if (typeof fn !== 'function') {
    var arg = fn;

    while (Array.isArray(arg) && arg.length !== 0) {
      arg = arg[0];
    }

    // first arg is the path
    if (typeof arg !== 'function') {
      offset = 1;
      path = fn;
    }
  }

  var callbacks = flatten(slice.call(arguments, offset));

  if (callbacks.length === 0) {
    throw new TypeError('Router.use() requires middleware functions');
  }

  for (var i = 0; i < callbacks.length; i++) {
    var fn = callbacks[i];

    if (typeof fn !== 'function') {
      throw new TypeError('Router.use() requires middleware function but got a ' + gettype(fn));
    }

    // add the middleware
    debug('use %o %s', path, fn.name || '<anonymous>')

    var layer = new Layer(path, {
      sensitive: this.caseSensitive,
      strict: false,
      end: false
    }, fn);

    layer.route = undefined;

    this.stack.push(layer);
  }

  return this;
};

/**
 * Create a new Route for the given path.
 *
 * Each route contains a separate middleware stack and VERB handlers.
 *
 * See the Route api documentation for details on adding handlers
 * and middleware to routes.
 *
 * @param {String} path
 * @return {Route}
 * @public
 */

proto.route = function route(path) {
  var route = new Route(path);

  var layer = new Layer(path, {
    sensitive: this.caseSensitive,
    strict: this.strict,
    end: true
  }, route.dispatch.bind(route));

  layer.route = route;

  this.stack.push(layer);
  return route;
};

// create Router#VERB functions
methods.concat('all').forEach(function(method){
  proto[method] = function(path){
    var route = this.route(path)
    route[method].apply(route, slice.call(arguments, 1));
    return this;
  };
});

// append methods to a list of methods
function appendMethods(list, addition) {
  for (var i = 0; i < addition.length; i++) {
    var method = addition[i];
    if (list.indexOf(method) === -1) {
      list.push(method);
    }
  }
}

// get pathname of request
function getPathname(req) {
  try {
    return parseUrl(req).pathname;
  } catch (err) {
    return undefined;
  }
}

// Get get protocol + host for a URL
function getProtohost(url) {
  if (typeof url !== 'string' || url.length === 0 || url[0] === '/') {
    return undefined
  }

  var searchIndex = url.indexOf('?')
  var pathLength = searchIndex !== -1
    ? searchIndex
    : url.length
  var fqdnIndex = url.substr(0, pathLength).indexOf('://')

  return fqdnIndex !== -1
    ? url.substr(0, url.indexOf('/', 3 + fqdnIndex))
    : undefined
}

// get type for error message
function gettype(obj) {
  var type = typeof obj;

  if (type !== 'object') {
    return type;
  }

  // inspect [[Class]] for objects
  return toString.call(obj)
    .replace(objectRegExp, '$1');
}

/**
 * Match path to a layer.
 *
 * @param {Layer} layer
 * @param {string} path
 * @private
 */

function matchLayer(layer, path) {
  try {
    return layer.match(path);
  } catch (err) {
    return err;
  }
}

// merge params with parent params
function mergeParams(params, parent) {
  if (typeof parent !== 'object' || !parent) {
    return params;
  }

  // make copy of parent for base
  var obj = mixin({}, parent);

  // simple non-numeric merging
  if (!(0 in params) || !(0 in parent)) {
    return mixin(obj, params);
  }

  var i = 0;
  var o = 0;

  // determine numeric gaps
  while (i in params) {
    i++;
  }

  while (o in parent) {
    o++;
  }

  // offset numeric indices in params before merge
  for (i--; i >= 0; i--) {
    params[i + o] = params[i];

    // create holes for the merge when necessary
    if (i < o) {
      delete params[i];
    }
  }

  return mixin(obj, params);
}

// restore obj props after function
function restore(fn, obj) {
  var props = new Array(arguments.length - 2);
  var vals = new Array(arguments.length - 2);

  for (var i = 0; i < props.length; i++) {
    props[i] = arguments[i + 2];
    vals[i] = obj[props[i]];
  }

  return function () {
    // restore vals
    for (var i = 0; i < props.length; i++) {
      obj[props[i]] = vals[i];
    }

    return fn.apply(this, arguments);
  };
}

// send an OPTIONS response
function sendOptionsResponse(res, options, next) {
  try {
    var body = options.join(',');
    res.set('Allow', body);
    res.send(body);
  } catch (err) {
    next(err);
  }
}

// wrap a function
function wrap(old, fn) {
  return function proxy() {
    var args = new Array(arguments.length + 1);

    args[0] = old;
    for (var i = 0, len = arguments.length; i < len; i++) {
      args[i + 1] = arguments[i];
    }

    fn.apply(this, args);
  };
}


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * express
 * Copyright(c) 2009-2013 TJ Holowaychuk
 * Copyright(c) 2013 Roman Shtylman
 * Copyright(c) 2014-2015 Douglas Christopher Wilson
 * MIT Licensed
 */



/**
 * Module dependencies.
 * @private
 */

var debug = __webpack_require__(5)('express:router:route');
var flatten = __webpack_require__(13);
var Layer = __webpack_require__(23);
var methods = __webpack_require__(18);

/**
 * Module variables.
 * @private
 */

var slice = Array.prototype.slice;
var toString = Object.prototype.toString;

/**
 * Module exports.
 * @public
 */

module.exports = Route;

/**
 * Initialize `Route` with the given `path`,
 *
 * @param {String} path
 * @public
 */

function Route(path) {
  this.path = path;
  this.stack = [];

  debug('new %o', path)

  // route handlers for various http methods
  this.methods = {};
}

/**
 * Determine if the route handles a given method.
 * @private
 */

Route.prototype._handles_method = function _handles_method(method) {
  if (this.methods._all) {
    return true;
  }

  var name = method.toLowerCase();

  if (name === 'head' && !this.methods['head']) {
    name = 'get';
  }

  return Boolean(this.methods[name]);
};

/**
 * @return {Array} supported HTTP methods
 * @private
 */

Route.prototype._options = function _options() {
  var methods = Object.keys(this.methods);

  // append automatic head
  if (this.methods.get && !this.methods.head) {
    methods.push('head');
  }

  for (var i = 0; i < methods.length; i++) {
    // make upper case
    methods[i] = methods[i].toUpperCase();
  }

  return methods;
};

/**
 * dispatch req, res into this route
 * @private
 */

Route.prototype.dispatch = function dispatch(req, res, done) {
  var idx = 0;
  var stack = this.stack;
  if (stack.length === 0) {
    return done();
  }

  var method = req.method.toLowerCase();
  if (method === 'head' && !this.methods['head']) {
    method = 'get';
  }

  req.route = this;

  next();

  function next(err) {
    // signal to exit route
    if (err && err === 'route') {
      return done();
    }

    // signal to exit router
    if (err && err === 'router') {
      return done(err)
    }

    var layer = stack[idx++];
    if (!layer) {
      return done(err);
    }

    if (layer.method && layer.method !== method) {
      return next(err);
    }

    if (err) {
      layer.handle_error(err, req, res, next);
    } else {
      layer.handle_request(req, res, next);
    }
  }
};

/**
 * Add a handler for all HTTP verbs to this route.
 *
 * Behaves just like middleware and can respond or call `next`
 * to continue processing.
 *
 * You can use multiple `.all` call to add multiple handlers.
 *
 *   function check_something(req, res, next){
 *     next();
 *   };
 *
 *   function validate_user(req, res, next){
 *     next();
 *   };
 *
 *   route
 *   .all(validate_user)
 *   .all(check_something)
 *   .get(function(req, res, next){
 *     res.send('hello world');
 *   });
 *
 * @param {function} handler
 * @return {Route} for chaining
 * @api public
 */

Route.prototype.all = function all() {
  var handles = flatten(slice.call(arguments));

  for (var i = 0; i < handles.length; i++) {
    var handle = handles[i];

    if (typeof handle !== 'function') {
      var type = toString.call(handle);
      var msg = 'Route.all() requires callback functions but got a ' + type;
      throw new TypeError(msg);
    }

    var layer = Layer('/', {}, handle);
    layer.method = undefined;

    this.methods._all = true;
    this.stack.push(layer);
  }

  return this;
};

methods.forEach(function(method){
  Route.prototype[method] = function(){
    var handles = flatten(slice.call(arguments));

    for (var i = 0; i < handles.length; i++) {
      var handle = handles[i];

      if (typeof handle !== 'function') {
        var type = toString.call(handle);
        var msg = 'Route.' + method + '() requires callback functions but got a ' + type;
        throw new Error(msg);
      }

      debug('%s %o', method, this.path)

      var layer = Layer('/', {}, handle);
      layer.method = method;

      this.methods[method] = true;
      this.stack.push(layer);
    }

    return this;
  };
});


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * express
 * Copyright(c) 2009-2013 TJ Holowaychuk
 * Copyright(c) 2013 Roman Shtylman
 * Copyright(c) 2014-2015 Douglas Christopher Wilson
 * MIT Licensed
 */



/**
 * Module dependencies.
 * @private
 */

var pathRegexp = __webpack_require__(45);
var debug = __webpack_require__(5)('express:router:layer');

/**
 * Module variables.
 * @private
 */

var hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * Module exports.
 * @public
 */

module.exports = Layer;

function Layer(path, options, fn) {
  if (!(this instanceof Layer)) {
    return new Layer(path, options, fn);
  }

  debug('new %o', path)
  var opts = options || {};

  this.handle = fn;
  this.name = fn.name || '<anonymous>';
  this.params = undefined;
  this.path = undefined;
  this.regexp = pathRegexp(path, this.keys = [], opts);

  // set fast path flags
  this.regexp.fast_star = path === '*'
  this.regexp.fast_slash = path === '/' && opts.end === false
}

/**
 * Handle the error for the layer.
 *
 * @param {Error} error
 * @param {Request} req
 * @param {Response} res
 * @param {function} next
 * @api private
 */

Layer.prototype.handle_error = function handle_error(error, req, res, next) {
  var fn = this.handle;

  if (fn.length !== 4) {
    // not a standard error handler
    return next(error);
  }

  try {
    fn(error, req, res, next);
  } catch (err) {
    next(err);
  }
};

/**
 * Handle the request for the layer.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {function} next
 * @api private
 */

Layer.prototype.handle_request = function handle(req, res, next) {
  var fn = this.handle;

  if (fn.length > 3) {
    // not a standard request handler
    return next();
  }

  try {
    fn(req, res, next);
  } catch (err) {
    next(err);
  }
};

/**
 * Check if this route matches `path`, if so
 * populate `.params`.
 *
 * @param {String} path
 * @return {Boolean}
 * @api private
 */

Layer.prototype.match = function match(path) {
  var match

  if (path != null) {
    // fast path non-ending match for / (any path matches)
    if (this.regexp.fast_slash) {
      this.params = {}
      this.path = ''
      return true
    }

    // fast path for * (everything matched in a param)
    if (this.regexp.fast_star) {
      this.params = {'0': decode_param(path)}
      this.path = path
      return true
    }

    // match the path
    match = this.regexp.exec(path)
  }

  if (!match) {
    this.params = undefined;
    this.path = undefined;
    return false;
  }

  // store values
  this.params = {};
  this.path = match[0]

  var keys = this.keys;
  var params = this.params;

  for (var i = 1; i < match.length; i++) {
    var key = keys[i - 1];
    var prop = key.name;
    var val = decode_param(match[i])

    if (val !== undefined || !(hasOwnProperty.call(params, prop))) {
      params[prop] = val;
    }
  }

  return true;
};

/**
 * Decode param value.
 *
 * @param {string} val
 * @return {string}
 * @private
 */

function decode_param(val) {
  if (typeof val !== 'string' || val.length === 0) {
    return val;
  }

  try {
    return decodeURIComponent(val);
  } catch (err) {
    if (err instanceof URIError) {
      err.message = 'Failed to decode param \'' + val + '\'';
      err.status = err.statusCode = 400;
    }

    throw err;
  }
}


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * depd
 * Copyright(c) 2014-2015 Douglas Christopher Wilson
 * MIT Licensed
 */



/**
 * Module dependencies.
 * @private
 */

var EventEmitter = __webpack_require__(16).EventEmitter

/**
 * Module exports.
 * @public
 */

lazyProperty(module.exports, 'callSiteToString', function callSiteToString () {
  var limit = Error.stackTraceLimit
  var obj = {}
  var prep = Error.prepareStackTrace

  function prepareObjectStackTrace (obj, stack) {
    return stack
  }

  Error.prepareStackTrace = prepareObjectStackTrace
  Error.stackTraceLimit = 2

  // capture the stack
  Error.captureStackTrace(obj)

  // slice the stack
  var stack = obj.stack.slice()

  Error.prepareStackTrace = prep
  Error.stackTraceLimit = limit

  return stack[0].toString ? toString : __webpack_require__(46)
})

lazyProperty(module.exports, 'eventListenerCount', function eventListenerCount () {
  return EventEmitter.listenerCount || __webpack_require__(47)
})

/**
 * Define a lazy property.
 */

function lazyProperty (obj, prop, getter) {
  function get () {
    var val = getter()

    Object.defineProperty(obj, prop, {
      configurable: true,
      enumerable: true,
      value: val
    })

    return val
  }

  Object.defineProperty(obj, prop, {
    configurable: true,
    enumerable: true,
    get: get
  })
}

/**
 * Call toString() on the obj
 */

function toString (obj) {
  return obj.toString()
}


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * express
 * Copyright(c) 2009-2013 TJ Holowaychuk
 * Copyright(c) 2013 Roman Shtylman
 * Copyright(c) 2014-2015 Douglas Christopher Wilson
 * MIT Licensed
 */



/**
 * Module dependencies.
 */

var merge = __webpack_require__(14)
var parseUrl = __webpack_require__(8);
var qs = __webpack_require__(26);

/**
 * @param {Object} options
 * @return {Function}
 * @api public
 */

module.exports = function query(options) {
  var opts = merge({}, options)
  var queryparse = qs.parse;

  if (typeof options === 'function') {
    queryparse = options;
    opts = undefined;
  }

  if (opts !== undefined && opts.allowPrototypes === undefined) {
    // back-compat for qs module
    opts.allowPrototypes = true;
  }

  return function query(req, res, next){
    if (!req.query) {
      var val = parseUrl(req).query;
      req.query = queryparse(val, opts);
    }

    next();
  };
};


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var stringify = __webpack_require__(49);
var parse = __webpack_require__(50);
var formats = __webpack_require__(28);

module.exports = {
    formats: formats,
    parse: parse,
    stringify: stringify
};


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var has = Object.prototype.hasOwnProperty;

var hexTable = (function () {
    var array = [];
    for (var i = 0; i < 256; ++i) {
        array.push('%' + ((i < 16 ? '0' : '') + i.toString(16)).toUpperCase());
    }

    return array;
}());

exports.arrayToObject = function (source, options) {
    var obj = options && options.plainObjects ? Object.create(null) : {};
    for (var i = 0; i < source.length; ++i) {
        if (typeof source[i] !== 'undefined') {
            obj[i] = source[i];
        }
    }

    return obj;
};

exports.merge = function (target, source, options) {
    if (!source) {
        return target;
    }

    if (typeof source !== 'object') {
        if (Array.isArray(target)) {
            target.push(source);
        } else if (typeof target === 'object') {
            if (options.plainObjects || options.allowPrototypes || !has.call(Object.prototype, source)) {
                target[source] = true;
            }
        } else {
            return [target, source];
        }

        return target;
    }

    if (typeof target !== 'object') {
        return [target].concat(source);
    }

    var mergeTarget = target;
    if (Array.isArray(target) && !Array.isArray(source)) {
        mergeTarget = exports.arrayToObject(target, options);
    }

    if (Array.isArray(target) && Array.isArray(source)) {
        source.forEach(function (item, i) {
            if (has.call(target, i)) {
                if (target[i] && typeof target[i] === 'object') {
                    target[i] = exports.merge(target[i], item, options);
                } else {
                    target.push(item);
                }
            } else {
                target[i] = item;
            }
        });
        return target;
    }

    return Object.keys(source).reduce(function (acc, key) {
        var value = source[key];

        if (has.call(acc, key)) {
            acc[key] = exports.merge(acc[key], value, options);
        } else {
            acc[key] = value;
        }
        return acc;
    }, mergeTarget);
};

exports.assign = function assignSingleSource(target, source) {
    return Object.keys(source).reduce(function (acc, key) {
        acc[key] = source[key];
        return acc;
    }, target);
};

exports.decode = function (str) {
    try {
        return decodeURIComponent(str.replace(/\+/g, ' '));
    } catch (e) {
        return str;
    }
};

exports.encode = function (str) {
    // This code was originally written by Brian White (mscdex) for the io.js core querystring library.
    // It has been adapted here for stricter adherence to RFC 3986
    if (str.length === 0) {
        return str;
    }

    var string = typeof str === 'string' ? str : String(str);

    var out = '';
    for (var i = 0; i < string.length; ++i) {
        var c = string.charCodeAt(i);

        if (
            c === 0x2D    // -
            || c === 0x2E // .
            || c === 0x5F // _
            || c === 0x7E // ~
            || (c >= 0x30 && c <= 0x39) // 0-9
            || (c >= 0x41 && c <= 0x5A) // a-z
            || (c >= 0x61 && c <= 0x7A) // A-Z
        ) {
            out += string.charAt(i);
            continue;
        }

        if (c < 0x80) {
            out = out + hexTable[c];
            continue;
        }

        if (c < 0x800) {
            out = out + (hexTable[0xC0 | (c >> 6)] + hexTable[0x80 | (c & 0x3F)]);
            continue;
        }

        if (c < 0xD800 || c >= 0xE000) {
            out = out + (hexTable[0xE0 | (c >> 12)] + hexTable[0x80 | ((c >> 6) & 0x3F)] + hexTable[0x80 | (c & 0x3F)]);
            continue;
        }

        i += 1;
        c = 0x10000 + (((c & 0x3FF) << 10) | (string.charCodeAt(i) & 0x3FF));
        out += hexTable[0xF0 | (c >> 18)]
            + hexTable[0x80 | ((c >> 12) & 0x3F)]
            + hexTable[0x80 | ((c >> 6) & 0x3F)]
            + hexTable[0x80 | (c & 0x3F)];
    }

    return out;
};

exports.compact = function (obj, references) {
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }

    var refs = references || [];
    var lookup = refs.indexOf(obj);
    if (lookup !== -1) {
        return refs[lookup];
    }

    refs.push(obj);

    if (Array.isArray(obj)) {
        var compacted = [];

        for (var i = 0; i < obj.length; ++i) {
            if (obj[i] && typeof obj[i] === 'object') {
                compacted.push(exports.compact(obj[i], refs));
            } else if (typeof obj[i] !== 'undefined') {
                compacted.push(obj[i]);
            }
        }

        return compacted;
    }

    var keys = Object.keys(obj);
    keys.forEach(function (key) {
        obj[key] = exports.compact(obj[key], refs);
    });

    return obj;
};

exports.isRegExp = function (obj) {
    return Object.prototype.toString.call(obj) === '[object RegExp]';
};

exports.isBuffer = function (obj) {
    if (obj === null || typeof obj === 'undefined') {
        return false;
    }

    return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
};


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var replace = String.prototype.replace;
var percentTwenties = /%20/g;

module.exports = {
    'default': 'RFC3986',
    formatters: {
        RFC1738: function (value) {
            return replace.call(value, percentTwenties, '+');
        },
        RFC3986: function (value) {
            return value;
        }
    },
    RFC1738: 'RFC1738',
    RFC3986: 'RFC3986'
};


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * content-disposition
 * Copyright(c) 2014 Douglas Christopher Wilson
 * MIT Licensed
 */



/**
 * Module exports.
 */

module.exports = contentDisposition
module.exports.parse = parse

/**
 * Module dependencies.
 */

var basename = __webpack_require__(4).basename

/**
 * RegExp to match non attr-char, *after* encodeURIComponent (i.e. not including "%")
 */

var ENCODE_URL_ATTR_CHAR_REGEXP = /[\x00-\x20"'()*,/:;<=>?@[\\\]{}\x7f]/g // eslint-disable-line no-control-regex

/**
 * RegExp to match percent encoding escape.
 */

var HEX_ESCAPE_REGEXP = /%[0-9A-Fa-f]{2}/
var HEX_ESCAPE_REPLACE_REGEXP = /%([0-9A-Fa-f]{2})/g

/**
 * RegExp to match non-latin1 characters.
 */

var NON_LATIN1_REGEXP = /[^\x20-\x7e\xa0-\xff]/g

/**
 * RegExp to match quoted-pair in RFC 2616
 *
 * quoted-pair = "\" CHAR
 * CHAR        = <any US-ASCII character (octets 0 - 127)>
 */

var QESC_REGEXP = /\\([\u0000-\u007f])/g

/**
 * RegExp to match chars that must be quoted-pair in RFC 2616
 */

var QUOTE_REGEXP = /([\\"])/g

/**
 * RegExp for various RFC 2616 grammar
 *
 * parameter     = token "=" ( token | quoted-string )
 * token         = 1*<any CHAR except CTLs or separators>
 * separators    = "(" | ")" | "<" | ">" | "@"
 *               | "," | ";" | ":" | "\" | <">
 *               | "/" | "[" | "]" | "?" | "="
 *               | "{" | "}" | SP | HT
 * quoted-string = ( <"> *(qdtext | quoted-pair ) <"> )
 * qdtext        = <any TEXT except <">>
 * quoted-pair   = "\" CHAR
 * CHAR          = <any US-ASCII character (octets 0 - 127)>
 * TEXT          = <any OCTET except CTLs, but including LWS>
 * LWS           = [CRLF] 1*( SP | HT )
 * CRLF          = CR LF
 * CR            = <US-ASCII CR, carriage return (13)>
 * LF            = <US-ASCII LF, linefeed (10)>
 * SP            = <US-ASCII SP, space (32)>
 * HT            = <US-ASCII HT, horizontal-tab (9)>
 * CTL           = <any US-ASCII control character (octets 0 - 31) and DEL (127)>
 * OCTET         = <any 8-bit sequence of data>
 */

var PARAM_REGEXP = /;[\x09\x20]*([!#$%&'*+.0-9A-Z^_`a-z|~-]+)[\x09\x20]*=[\x09\x20]*("(?:[\x20!\x23-\x5b\x5d-\x7e\x80-\xff]|\\[\x20-\x7e])*"|[!#$%&'*+.0-9A-Z^_`a-z|~-]+)[\x09\x20]*/g // eslint-disable-line no-control-regex
var TEXT_REGEXP = /^[\x20-\x7e\x80-\xff]+$/
var TOKEN_REGEXP = /^[!#$%&'*+.0-9A-Z^_`a-z|~-]+$/

/**
 * RegExp for various RFC 5987 grammar
 *
 * ext-value     = charset  "'" [ language ] "'" value-chars
 * charset       = "UTF-8" / "ISO-8859-1" / mime-charset
 * mime-charset  = 1*mime-charsetc
 * mime-charsetc = ALPHA / DIGIT
 *               / "!" / "#" / "$" / "%" / "&"
 *               / "+" / "-" / "^" / "_" / "`"
 *               / "{" / "}" / "~"
 * language      = ( 2*3ALPHA [ extlang ] )
 *               / 4ALPHA
 *               / 5*8ALPHA
 * extlang       = *3( "-" 3ALPHA )
 * value-chars   = *( pct-encoded / attr-char )
 * pct-encoded   = "%" HEXDIG HEXDIG
 * attr-char     = ALPHA / DIGIT
 *               / "!" / "#" / "$" / "&" / "+" / "-" / "."
 *               / "^" / "_" / "`" / "|" / "~"
 */

var EXT_VALUE_REGEXP = /^([A-Za-z0-9!#$%&+\-^_`{}~]+)'(?:[A-Za-z]{2,3}(?:-[A-Za-z]{3}){0,3}|[A-Za-z]{4,8}|)'((?:%[0-9A-Fa-f]{2}|[A-Za-z0-9!#$&+.^_`|~-])+)$/

/**
 * RegExp for various RFC 6266 grammar
 *
 * disposition-type = "inline" | "attachment" | disp-ext-type
 * disp-ext-type    = token
 * disposition-parm = filename-parm | disp-ext-parm
 * filename-parm    = "filename" "=" value
 *                  | "filename*" "=" ext-value
 * disp-ext-parm    = token "=" value
 *                  | ext-token "=" ext-value
 * ext-token        = <the characters in token, followed by "*">
 */

var DISPOSITION_TYPE_REGEXP = /^([!#$%&'*+.0-9A-Z^_`a-z|~-]+)[\x09\x20]*(?:$|;)/ // eslint-disable-line no-control-regex

/**
 * Create an attachment Content-Disposition header.
 *
 * @param {string} [filename]
 * @param {object} [options]
 * @param {string} [options.type=attachment]
 * @param {string|boolean} [options.fallback=true]
 * @return {string}
 * @api public
 */

function contentDisposition (filename, options) {
  var opts = options || {}

  // get type
  var type = opts.type || 'attachment'

  // get parameters
  var params = createparams(filename, opts.fallback)

  // format into string
  return format(new ContentDisposition(type, params))
}

/**
 * Create parameters object from filename and fallback.
 *
 * @param {string} [filename]
 * @param {string|boolean} [fallback=true]
 * @return {object}
 * @api private
 */

function createparams (filename, fallback) {
  if (filename === undefined) {
    return
  }

  var params = {}

  if (typeof filename !== 'string') {
    throw new TypeError('filename must be a string')
  }

  // fallback defaults to true
  if (fallback === undefined) {
    fallback = true
  }

  if (typeof fallback !== 'string' && typeof fallback !== 'boolean') {
    throw new TypeError('fallback must be a string or boolean')
  }

  if (typeof fallback === 'string' && NON_LATIN1_REGEXP.test(fallback)) {
    throw new TypeError('fallback must be ISO-8859-1 string')
  }

  // restrict to file base name
  var name = basename(filename)

  // determine if name is suitable for quoted string
  var isQuotedString = TEXT_REGEXP.test(name)

  // generate fallback name
  var fallbackName = typeof fallback !== 'string'
    ? fallback && getlatin1(name)
    : basename(fallback)
  var hasFallback = typeof fallbackName === 'string' && fallbackName !== name

  // set extended filename parameter
  if (hasFallback || !isQuotedString || HEX_ESCAPE_REGEXP.test(name)) {
    params['filename*'] = name
  }

  // set filename parameter
  if (isQuotedString || hasFallback) {
    params.filename = hasFallback
      ? fallbackName
      : name
  }

  return params
}

/**
 * Format object to Content-Disposition header.
 *
 * @param {object} obj
 * @param {string} obj.type
 * @param {object} [obj.parameters]
 * @return {string}
 * @api private
 */

function format (obj) {
  var parameters = obj.parameters
  var type = obj.type

  if (!type || typeof type !== 'string' || !TOKEN_REGEXP.test(type)) {
    throw new TypeError('invalid type')
  }

  // start with normalized type
  var string = String(type).toLowerCase()

  // append parameters
  if (parameters && typeof parameters === 'object') {
    var param
    var params = Object.keys(parameters).sort()

    for (var i = 0; i < params.length; i++) {
      param = params[i]

      var val = param.substr(-1) === '*'
        ? ustring(parameters[param])
        : qstring(parameters[param])

      string += '; ' + param + '=' + val
    }
  }

  return string
}

/**
 * Decode a RFC 6987 field value (gracefully).
 *
 * @param {string} str
 * @return {string}
 * @api private
 */

function decodefield (str) {
  var match = EXT_VALUE_REGEXP.exec(str)

  if (!match) {
    throw new TypeError('invalid extended field value')
  }

  var charset = match[1].toLowerCase()
  var encoded = match[2]
  var value

  // to binary string
  var binary = encoded.replace(HEX_ESCAPE_REPLACE_REGEXP, pdecode)

  switch (charset) {
    case 'iso-8859-1':
      value = getlatin1(binary)
      break
    case 'utf-8':
      value = new Buffer(binary, 'binary').toString('utf8')
      break
    default:
      throw new TypeError('unsupported charset in extended field')
  }

  return value
}

/**
 * Get ISO-8859-1 version of string.
 *
 * @param {string} val
 * @return {string}
 * @api private
 */

function getlatin1 (val) {
  // simple Unicode -> ISO-8859-1 transformation
  return String(val).replace(NON_LATIN1_REGEXP, '?')
}

/**
 * Parse Content-Disposition header string.
 *
 * @param {string} string
 * @return {object}
 * @api private
 */

function parse (string) {
  if (!string || typeof string !== 'string') {
    throw new TypeError('argument string is required')
  }

  var match = DISPOSITION_TYPE_REGEXP.exec(string)

  if (!match) {
    throw new TypeError('invalid type format')
  }

  // normalize type
  var index = match[0].length
  var type = match[1].toLowerCase()

  var key
  var names = []
  var params = {}
  var value

  // calculate index to start at
  index = PARAM_REGEXP.lastIndex = match[0].substr(-1) === ';'
    ? index - 1
    : index

  // match parameters
  while ((match = PARAM_REGEXP.exec(string))) {
    if (match.index !== index) {
      throw new TypeError('invalid parameter format')
    }

    index += match[0].length
    key = match[1].toLowerCase()
    value = match[2]

    if (names.indexOf(key) !== -1) {
      throw new TypeError('invalid duplicate parameter')
    }

    names.push(key)

    if (key.indexOf('*') + 1 === key.length) {
      // decode extended value
      key = key.slice(0, -1)
      value = decodefield(value)

      // overwrite existing value
      params[key] = value
      continue
    }

    if (typeof params[key] === 'string') {
      continue
    }

    if (value[0] === '"') {
      // remove quotes and escapes
      value = value
        .substr(1, value.length - 2)
        .replace(QESC_REGEXP, '$1')
    }

    params[key] = value
  }

  if (index !== -1 && index !== string.length) {
    throw new TypeError('invalid parameter format')
  }

  return new ContentDisposition(type, params)
}

/**
 * Percent decode a single character.
 *
 * @param {string} str
 * @param {string} hex
 * @return {string}
 * @api private
 */

function pdecode (str, hex) {
  return String.fromCharCode(parseInt(hex, 16))
}

/**
 * Percent encode a single character.
 *
 * @param {string} char
 * @return {string}
 * @api private
 */

function pencode (char) {
  var hex = String(char)
    .charCodeAt(0)
    .toString(16)
    .toUpperCase()
  return hex.length === 1
    ? '%0' + hex
    : '%' + hex
}

/**
 * Quote a string for HTTP.
 *
 * @param {string} val
 * @return {string}
 * @api private
 */

function qstring (val) {
  var str = String(val)

  return '"' + str.replace(QUOTE_REGEXP, '\\$1') + '"'
}

/**
 * Encode a Unicode string for HTTP (RFC 5987).
 *
 * @param {string} val
 * @return {string}
 * @api private
 */

function ustring (val) {
  var str = String(val)

  // percent encode as UTF-8
  var encoded = encodeURIComponent(str)
    .replace(ENCODE_URL_ATTR_CHAR_REGEXP, pencode)

  return 'UTF-8\'\'' + encoded
}

/**
 * Class for parsed Content-Disposition header for v8 optimization
 */

function ContentDisposition (type, parameters) {
  this.type = type
  this.parameters = parameters
}


/***/ }),
/* 30 */
/***/ (function(module, exports) {

module.exports = require("stream");

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * etag
 * Copyright(c) 2014-2016 Douglas Christopher Wilson
 * MIT Licensed
 */



/**
 * Module exports.
 * @public
 */

module.exports = etag

/**
 * Module dependencies.
 * @private
 */

var crypto = __webpack_require__(32)
var Stats = __webpack_require__(2).Stats

/**
 * Module variables.
 * @private
 */

var toString = Object.prototype.toString

/**
 * Generate an entity tag.
 *
 * @param {Buffer|string} entity
 * @return {string}
 * @private
 */

function entitytag (entity) {
  if (entity.length === 0) {
    // fast-path empty
    return '"0-2jmj7l5rSw0yVb/vlWAYkK/YBwk"'
  }

  // compute hash of entity
  var hash = crypto
    .createHash('sha1')
    .update(entity, 'utf8')
    .digest('base64')
    .substring(0, 27)

  // compute length of entity
  var len = typeof entity === 'string'
    ? Buffer.byteLength(entity, 'utf8')
    : entity.length

  return '"' + len.toString(16) + '-' + hash + '"'
}

/**
 * Create a simple ETag.
 *
 * @param {string|Buffer|Stats} entity
 * @param {object} [options]
 * @param {boolean} [options.weak]
 * @return {String}
 * @public
 */

function etag (entity, options) {
  if (entity == null) {
    throw new TypeError('argument entity is required')
  }

  // support fs.Stats object
  var isStats = isstats(entity)
  var weak = options && typeof options.weak === 'boolean'
    ? options.weak
    : isStats

  // validate argument
  if (!isStats && typeof entity !== 'string' && !Buffer.isBuffer(entity)) {
    throw new TypeError('argument entity must be string, Buffer, or fs.Stats')
  }

  // generate entity tag
  var tag = isStats
    ? stattag(entity)
    : entitytag(entity)

  return weak
    ? 'W/' + tag
    : tag
}

/**
 * Determine if object is a Stats object.
 *
 * @param {object} obj
 * @return {boolean}
 * @api private
 */

function isstats (obj) {
  // genuine fs.Stats
  if (typeof Stats === 'function' && obj instanceof Stats) {
    return true
  }

  // quack quack
  return obj && typeof obj === 'object' &&
    'ctime' in obj && toString.call(obj.ctime) === '[object Date]' &&
    'mtime' in obj && toString.call(obj.mtime) === '[object Date]' &&
    'ino' in obj && typeof obj.ino === 'number' &&
    'size' in obj && typeof obj.size === 'number'
}

/**
 * Generate a tag for a stat.
 *
 * @param {object} stat
 * @return {string}
 * @private
 */

function stattag (stat) {
  var mtime = stat.mtime.getTime().toString(16)
  var size = stat.size.toString(16)

  return '"' + size + '-' + mtime + '"'
}


/***/ }),
/* 32 */
/***/ (function(module, exports) {

module.exports = require("crypto");

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * fresh
 * Copyright(c) 2012 TJ Holowaychuk
 * Copyright(c) 2016-2017 Douglas Christopher Wilson
 * MIT Licensed
 */



/**
 * RegExp to check for no-cache token in Cache-Control.
 * @private
 */

var CACHE_CONTROL_NO_CACHE_REGEXP = /(?:^|,)\s*?no-cache\s*?(?:,|$)/

/**
 * Simple expression to split token list.
 * @private
 */

var TOKEN_LIST_REGEXP = / *, */

/**
 * Module exports.
 * @public
 */

module.exports = fresh

/**
 * Check freshness of the response using request and response headers.
 *
 * @param {Object} reqHeaders
 * @param {Object} resHeaders
 * @return {Boolean}
 * @public
 */

function fresh (reqHeaders, resHeaders) {
  // fields
  var modifiedSince = reqHeaders['if-modified-since']
  var noneMatch = reqHeaders['if-none-match']

  // unconditional request
  if (!modifiedSince && !noneMatch) {
    return false
  }

  // Always return stale when Cache-Control: no-cache
  // to support end-to-end reload requests
  // https://tools.ietf.org/html/rfc2616#section-14.9.4
  var cacheControl = reqHeaders['cache-control']
  if (cacheControl && CACHE_CONTROL_NO_CACHE_REGEXP.test(cacheControl)) {
    return false
  }

  // if-none-match
  if (noneMatch && noneMatch !== '*') {
    var etag = resHeaders['etag']
    var etagStale = !etag || noneMatch.split(TOKEN_LIST_REGEXP).every(function (match) {
      return match !== etag && match !== 'W/' + etag && 'W/' + match !== etag
    })

    if (etagStale) {
      return false
    }
  }

  // if-modified-since
  if (modifiedSince) {
    var lastModified = resHeaders['last-modified']
    var modifiedStale = !lastModified || Date.parse(lastModified) > Date.parse(modifiedSince)

    if (modifiedStale) {
      return false
    }
  }

  return true
}


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * range-parser
 * Copyright(c) 2012-2014 TJ Holowaychuk
 * Copyright(c) 2015-2016 Douglas Christopher Wilson
 * MIT Licensed
 */



/**
 * Module exports.
 * @public
 */

module.exports = rangeParser

/**
 * Parse "Range" header `str` relative to the given file `size`.
 *
 * @param {Number} size
 * @param {String} str
 * @param {Object} [options]
 * @return {Array}
 * @public
 */

function rangeParser (size, str, options) {
  var index = str.indexOf('=')

  if (index === -1) {
    return -2
  }

  // split the range string
  var arr = str.slice(index + 1).split(',')
  var ranges = []

  // add ranges type
  ranges.type = str.slice(0, index)

  // parse all ranges
  for (var i = 0; i < arr.length; i++) {
    var range = arr[i].split('-')
    var start = parseInt(range[0], 10)
    var end = parseInt(range[1], 10)

    // -nnn
    if (isNaN(start)) {
      start = size - end
      end = size - 1
    // nnn-
    } else if (isNaN(end)) {
      end = size - 1
    }

    // limit last-byte-pos to current length
    if (end > size - 1) {
      end = size - 1
    }

    // invalid or unsatisifiable
    if (isNaN(start) || isNaN(end) || start > end || start < 0) {
      continue
    }

    // add range
    ranges.push({
      start: start,
      end: end
    })
  }

  if (ranges.length < 1) {
    // unsatisifiable
    return -1
  }

  return options && options.combine
    ? combineRanges(ranges)
    : ranges
}

/**
 * Combine overlapping & adjacent ranges.
 * @private
 */

function combineRanges (ranges) {
  var ordered = ranges.map(mapWithIndex).sort(sortByRangeStart)

  for (var j = 0, i = 1; i < ordered.length; i++) {
    var range = ordered[i]
    var current = ordered[j]

    if (range.start > current.end + 1) {
      // next range
      ordered[++j] = range
    } else if (range.end > current.end) {
      // extend range
      current.end = range.end
      current.index = Math.min(current.index, range.index)
    }
  }

  // trim ordered array
  ordered.length = j + 1

  // generate combined range
  var combined = ordered.sort(sortByRangeIndex).map(mapWithoutIndex)

  // copy ranges type
  combined.type = ranges.type

  return combined
}

/**
 * Map function to add index value to ranges.
 * @private
 */

function mapWithIndex (range, index) {
  return {
    start: range.start,
    end: range.end,
    index: index
  }
}

/**
 * Map function to remove index value from ranges.
 * @private
 */

function mapWithoutIndex (range) {
  return {
    start: range.start,
    end: range.end
  }
}

/**
 * Sort function to sort ranges by index.
 * @private
 */

function sortByRangeIndex (a, b) {
  return a.index - b.index
}

/**
 * Sort function to sort ranges by start position.
 * @private
 */

function sortByRangeStart (a, b) {
  return a.start - b.start
}


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * proxy-addr
 * Copyright(c) 2014-2016 Douglas Christopher Wilson
 * MIT Licensed
 */



/**
 * Module exports.
 * @public
 */

module.exports = proxyaddr;
module.exports.all = alladdrs;
module.exports.compile = compile;

/**
 * Module dependencies.
 * @private
 */

var forwarded = __webpack_require__(61);
var ipaddr = __webpack_require__(62);

/**
 * Variables.
 * @private
 */

var digitre = /^[0-9]+$/;
var isip = ipaddr.isValid;
var parseip = ipaddr.parse;

/**
 * Pre-defined IP ranges.
 * @private
 */

var ipranges = {
  linklocal: ['169.254.0.0/16', 'fe80::/10'],
  loopback: ['127.0.0.1/8', '::1/128'],
  uniquelocal: ['10.0.0.0/8', '172.16.0.0/12', '192.168.0.0/16', 'fc00::/7']
};

/**
 * Get all addresses in the request, optionally stopping
 * at the first untrusted.
 *
 * @param {Object} request
 * @param {Function|Array|String} [trust]
 * @public
 */

function alladdrs(req, trust) {
  // get addresses
  var addrs = forwarded(req);

  if (!trust) {
    // Return all addresses
    return addrs;
  }

  if (typeof trust !== 'function') {
    trust = compile(trust);
  }

  for (var i = 0; i < addrs.length - 1; i++) {
    if (trust(addrs[i], i)) continue;

    addrs.length = i + 1;
  }

  return addrs;
}

/**
 * Compile argument into trust function.
 *
 * @param {Array|String} val
 * @private
 */

function compile(val) {
  if (!val) {
    throw new TypeError('argument is required');
  }

  var trust;

  if (typeof val === 'string') {
    trust = [val];
  } else if (Array.isArray(val)) {
    trust = val.slice();
  } else {
    throw new TypeError('unsupported trust argument');
  }

  for (var i = 0; i < trust.length; i++) {
    val = trust[i];

    if (!ipranges.hasOwnProperty(val)) {
      continue;
    }

    // Splice in pre-defined range
    val = ipranges[val];
    trust.splice.apply(trust, [i, 1].concat(val));
    i += val.length - 1;
  }

  return compileTrust(compileRangeSubnets(trust));
}

/**
 * Compile `arr` elements into range subnets.
 *
 * @param {Array} arr
 * @private
 */

function compileRangeSubnets(arr) {
  var rangeSubnets = new Array(arr.length);

  for (var i = 0; i < arr.length; i++) {
    rangeSubnets[i] = parseipNotation(arr[i]);
  }

  return rangeSubnets;
}

/**
 * Compile range subnet array into trust function.
 *
 * @param {Array} rangeSubnets
 * @private
 */

function compileTrust(rangeSubnets) {
  // Return optimized function based on length
  var len = rangeSubnets.length;
  return len === 0
    ? trustNone
    : len === 1
    ? trustSingle(rangeSubnets[0])
    : trustMulti(rangeSubnets);
}

/**
 * Parse IP notation string into range subnet.
 *
 * @param {String} note
 * @private
 */

function parseipNotation(note) {
  var pos = note.lastIndexOf('/');
  var str = pos !== -1
    ? note.substring(0, pos)
    : note;

  if (!isip(str)) {
    throw new TypeError('invalid IP address: ' + str);
  }

  var ip = parseip(str);

  if (pos === -1 && ip.kind() === 'ipv6' && ip.isIPv4MappedAddress()) {
    // Store as IPv4
    ip = ip.toIPv4Address();
  }

  var max = ip.kind() === 'ipv6'
    ? 128
    : 32;

  var range = pos !== -1
    ? note.substring(pos + 1, note.length)
    : null;

  if (range === null) {
    range = max;
  } else if (digitre.test(range)) {
    range = parseInt(range, 10);
  } else if (ip.kind() === 'ipv4' && isip(range)) {
    range = parseNetmask(range);
  } else {
    range = null;
  }

  if (range <= 0 || range > max) {
    throw new TypeError('invalid range on address: ' + note);
  }

  return [ip, range];
}

/**
 * Parse netmask string into CIDR range.
 *
 * @param {String} netmask
 * @private
 */

function parseNetmask(netmask) {
  var ip = parseip(netmask);
  var kind = ip.kind();

  return kind === 'ipv4'
    ? ip.prefixLengthFromSubnetMask()
    : null;
}

/**
 * Determine address of proxied request.
 *
 * @param {Object} request
 * @param {Function|Array|String} trust
 * @public
 */

function proxyaddr(req, trust) {
  if (!req) {
    throw new TypeError('req argument is required');
  }

  if (!trust) {
    throw new TypeError('trust argument is required');
  }

  var addrs = alladdrs(req, trust);
  var addr = addrs[addrs.length - 1];

  return addr;
}

/**
 * Static trust function to trust nothing.
 *
 * @private
 */

function trustNone() {
  return false;
}

/**
 * Compile trust function for multiple subnets.
 *
 * @param {Array} subnets
 * @private
 */

function trustMulti(subnets) {
  return function trust(addr) {
    if (!isip(addr)) return false;

    var ip = parseip(addr);
    var ipconv;
    var kind = ip.kind();

    for (var i = 0; i < subnets.length; i++) {
      var subnet = subnets[i];
      var subnetip = subnet[0];
      var subnetkind = subnetip.kind();
      var subnetrange = subnet[1];
      var trusted = ip;

      if (kind !== subnetkind) {
        if (subnetkind === 'ipv4' && !ip.isIPv4MappedAddress()) {
          // Incompatible IP addresses
          continue;
        }

        if (!ipconv) {
          // Convert IP to match subnet IP kind
          ipconv = subnetkind === 'ipv4'
            ? ip.toIPv4Address()
            : ip.toIPv4MappedAddress();
        }

        trusted = ipconv;
      }

      if (trusted.match(subnetip, subnetrange)) {
        return true;
      }
    }

    return false;
  };
}

/**
 * Compile trust function for single subnet.
 *
 * @param {Object} subnet
 * @private
 */

function trustSingle(subnet) {
  var subnetip = subnet[0];
  var subnetkind = subnetip.kind();
  var subnetisipv4 = subnetkind === 'ipv4';
  var subnetrange = subnet[1];

  return function trust(addr) {
    if (!isip(addr)) return false;

    var ip = parseip(addr);
    var kind = ip.kind();

    if (kind !== subnetkind) {
      if (subnetisipv4 && !ip.isIPv4MappedAddress()) {
        // Incompatible IP addresses
        return false;
      }

      // Convert IP to match subnet IP kind
      ip = subnetisipv4
        ? ip.toIPv4Address()
        : ip.toIPv4MappedAddress();
    }

    return ip.match(subnetip, subnetrange);
  };
}


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * mime-types
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */



/**
 * Module dependencies.
 * @private
 */

var db = __webpack_require__(72)
var extname = __webpack_require__(4).extname

/**
 * Module variables.
 * @private
 */

var EXTRACT_TYPE_REGEXP = /^\s*([^;\s]*)(?:;|\s|$)/
var TEXT_TYPE_REGEXP = /^text\//i

/**
 * Module exports.
 * @public
 */

exports.charset = charset
exports.charsets = { lookup: charset }
exports.contentType = contentType
exports.extension = extension
exports.extensions = Object.create(null)
exports.lookup = lookup
exports.types = Object.create(null)

// Populate the extensions/types maps
populateMaps(exports.extensions, exports.types)

/**
 * Get the default charset for a MIME type.
 *
 * @param {string} type
 * @return {boolean|string}
 */

function charset (type) {
  if (!type || typeof type !== 'string') {
    return false
  }

  // TODO: use media-typer
  var match = EXTRACT_TYPE_REGEXP.exec(type)
  var mime = match && db[match[1].toLowerCase()]

  if (mime && mime.charset) {
    return mime.charset
  }

  // default text/* to utf-8
  if (match && TEXT_TYPE_REGEXP.test(match[1])) {
    return 'UTF-8'
  }

  return false
}

/**
 * Create a full Content-Type header given a MIME type or extension.
 *
 * @param {string} str
 * @return {boolean|string}
 */

function contentType (str) {
  // TODO: should this even be in this module?
  if (!str || typeof str !== 'string') {
    return false
  }

  var mime = str.indexOf('/') === -1
    ? exports.lookup(str)
    : str

  if (!mime) {
    return false
  }

  // TODO: use content-type or other module
  if (mime.indexOf('charset') === -1) {
    var charset = exports.charset(mime)
    if (charset) mime += '; charset=' + charset.toLowerCase()
  }

  return mime
}

/**
 * Get the default extension for a MIME type.
 *
 * @param {string} type
 * @return {boolean|string}
 */

function extension (type) {
  if (!type || typeof type !== 'string') {
    return false
  }

  // TODO: use media-typer
  var match = EXTRACT_TYPE_REGEXP.exec(type)

  // get extensions
  var exts = match && exports.extensions[match[1].toLowerCase()]

  if (!exts || !exts.length) {
    return false
  }

  return exts[0]
}

/**
 * Lookup the MIME type for a file path/extension.
 *
 * @param {string} path
 * @return {boolean|string}
 */

function lookup (path) {
  if (!path || typeof path !== 'string') {
    return false
  }

  // get the extension ("ext" or ".ext" or full path)
  var extension = extname('x.' + path)
    .toLowerCase()
    .substr(1)

  if (!extension) {
    return false
  }

  return exports.types[extension] || false
}

/**
 * Populate the extensions and types maps.
 * @private
 */

function populateMaps (extensions, types) {
  // source preference (least -> most)
  var preference = ['nginx', 'apache', undefined, 'iana']

  Object.keys(db).forEach(function forEachMimeType (type) {
    var mime = db[type]
    var exts = mime.extensions

    if (!exts || !exts.length) {
      return
    }

    // mime -> extensions
    extensions[type] = exts

    // extension -> mime
    for (var i = 0; i < exts.length; i++) {
      var extension = exts[i]

      if (types[extension]) {
        var from = preference.indexOf(db[types[extension]].source)
        var to = preference.indexOf(mime.source)

        if (types[extension] !== 'application/octet-stream' &&
          (from > to || (from === to && types[extension].substr(0, 12) === 'application/'))) {
          // skip the remapping
          continue
        }
      }

      // set the extension -> mime
      types[extension] = type
    }
  })
}


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * express
 * Copyright(c) 2009-2013 TJ Holowaychuk
 * Copyright(c) 2013 Roman Shtylman
 * Copyright(c) 2014-2015 Douglas Christopher Wilson
 * MIT Licensed
 */



module.exports = __webpack_require__(38);


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * express
 * Copyright(c) 2009-2013 TJ Holowaychuk
 * Copyright(c) 2013 Roman Shtylman
 * Copyright(c) 2014-2015 Douglas Christopher Wilson
 * MIT Licensed
 */



/**
 * Module dependencies.
 */

var EventEmitter = __webpack_require__(16).EventEmitter;
var mixin = __webpack_require__(39);
var proto = __webpack_require__(40);
var Route = __webpack_require__(22);
var Router = __webpack_require__(21);
var req = __webpack_require__(65);
var res = __webpack_require__(77);

/**
 * Expose `createApplication()`.
 */

exports = module.exports = createApplication;

/**
 * Create an express application.
 *
 * @return {Function}
 * @api public
 */

function createApplication() {
  var app = function(req, res, next) {
    app.handle(req, res, next);
  };

  mixin(app, EventEmitter.prototype, false);
  mixin(app, proto, false);

  // expose the prototype that will get set on requests
  app.request = Object.create(req, {
    app: { configurable: true, enumerable: true, writable: true, value: app }
  })

  // expose the prototype that will get set on responses
  app.response = Object.create(res, {
    app: { configurable: true, enumerable: true, writable: true, value: app }
  })

  app.init();
  return app;
}

/**
 * Expose the prototypes.
 */

exports.application = proto;
exports.request = req;
exports.response = res;

/**
 * Expose constructors.
 */

exports.Route = Route;
exports.Router = Router;

/**
 * Expose middleware
 */

exports.query = __webpack_require__(25);
exports.static = __webpack_require__(81);

/**
 * Replace removed middleware with an appropriate error message.
 */

[
  'json',
  'urlencoded',
  'bodyParser',
  'compress',
  'cookieSession',
  'session',
  'logger',
  'cookieParser',
  'favicon',
  'responseTime',
  'errorHandler',
  'timeout',
  'methodOverride',
  'vhost',
  'csrf',
  'directory',
  'limit',
  'multipart',
  'staticCache',
].forEach(function (name) {
  Object.defineProperty(exports, name, {
    get: function () {
      throw new Error('Most middleware (like ' + name + ') is no longer bundled with Express and must be installed separately. Please see https://github.com/senchalabs/connect#middleware.');
    },
    configurable: true
  });
});


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * merge-descriptors
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */



/**
 * Module exports.
 * @public
 */

module.exports = merge

/**
 * Module variables.
 * @private
 */

var hasOwnProperty = Object.prototype.hasOwnProperty

/**
 * Merge the property descriptors of `src` into `dest`
 *
 * @param {object} dest Object to add descriptors to
 * @param {object} src Object to clone descriptors from
 * @param {boolean} [redefine=true] Redefine `dest` properties with `src` properties
 * @returns {object} Reference to dest
 * @public
 */

function merge(dest, src, redefine) {
  if (!dest) {
    throw new TypeError('argument dest is required')
  }

  if (!src) {
    throw new TypeError('argument src is required')
  }

  if (redefine === undefined) {
    // Default to true
    redefine = true
  }

  Object.getOwnPropertyNames(src).forEach(function forEachOwnPropertyName(name) {
    if (!redefine && hasOwnProperty.call(dest, name)) {
      // Skip desriptor
      return
    }

    // Copy descriptor
    var descriptor = Object.getOwnPropertyDescriptor(src, name)
    Object.defineProperty(dest, name, descriptor)
  })

  return dest
}


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * express
 * Copyright(c) 2009-2013 TJ Holowaychuk
 * Copyright(c) 2013 Roman Shtylman
 * Copyright(c) 2014-2015 Douglas Christopher Wilson
 * MIT Licensed
 */



/**
 * Module dependencies.
 * @private
 */

var finalhandler = __webpack_require__(41);
var Router = __webpack_require__(21);
var methods = __webpack_require__(18);
var middleware = __webpack_require__(48);
var query = __webpack_require__(25);
var debug = __webpack_require__(5)('express:application');
var View = __webpack_require__(51);
var http = __webpack_require__(9);
var compileETag = __webpack_require__(7).compileETag;
var compileQueryParser = __webpack_require__(7).compileQueryParser;
var compileTrust = __webpack_require__(7).compileTrust;
var deprecate = __webpack_require__(6)('express');
var flatten = __webpack_require__(13);
var merge = __webpack_require__(14);
var resolve = __webpack_require__(4).resolve;
var setPrototypeOf = __webpack_require__(15)
var slice = Array.prototype.slice;

/**
 * Application prototype.
 */

var app = exports = module.exports = {};

/**
 * Variable for trust proxy inheritance back-compat
 * @private
 */

var trustProxyDefaultSymbol = '@@symbol:trust_proxy_default';

/**
 * Initialize the server.
 *
 *   - setup default configuration
 *   - setup default middleware
 *   - setup route reflection methods
 *
 * @private
 */

app.init = function init() {
  this.cache = {};
  this.engines = {};
  this.settings = {};

  this.defaultConfiguration();
};

/**
 * Initialize application configuration.
 * @private
 */

app.defaultConfiguration = function defaultConfiguration() {
  var env = "development" || 'development';

  // default settings
  this.enable('x-powered-by');
  this.set('etag', 'weak');
  this.set('env', env);
  this.set('query parser', 'extended');
  this.set('subdomain offset', 2);
  this.set('trust proxy', false);

  // trust proxy inherit back-compat
  Object.defineProperty(this.settings, trustProxyDefaultSymbol, {
    configurable: true,
    value: true
  });

  debug('booting in %s mode', env);

  this.on('mount', function onmount(parent) {
    // inherit trust proxy
    if (this.settings[trustProxyDefaultSymbol] === true
      && typeof parent.settings['trust proxy fn'] === 'function') {
      delete this.settings['trust proxy'];
      delete this.settings['trust proxy fn'];
    }

    // inherit protos
    setPrototypeOf(this.request, parent.request)
    setPrototypeOf(this.response, parent.response)
    setPrototypeOf(this.engines, parent.engines)
    setPrototypeOf(this.settings, parent.settings)
  });

  // setup locals
  this.locals = Object.create(null);

  // top-most app is mounted at /
  this.mountpath = '/';

  // default locals
  this.locals.settings = this.settings;

  // default configuration
  this.set('view', View);
  this.set('views', resolve('views'));
  this.set('jsonp callback name', 'callback');

  if (env === 'production') {
    this.enable('view cache');
  }

  Object.defineProperty(this, 'router', {
    get: function() {
      throw new Error('\'app.router\' is deprecated!\nPlease see the 3.x to 4.x migration guide for details on how to update your app.');
    }
  });
};

/**
 * lazily adds the base router if it has not yet been added.
 *
 * We cannot add the base router in the defaultConfiguration because
 * it reads app settings which might be set after that has run.
 *
 * @private
 */
app.lazyrouter = function lazyrouter() {
  if (!this._router) {
    this._router = new Router({
      caseSensitive: this.enabled('case sensitive routing'),
      strict: this.enabled('strict routing')
    });

    this._router.use(query(this.get('query parser fn')));
    this._router.use(middleware.init(this));
  }
};

/**
 * Dispatch a req, res pair into the application. Starts pipeline processing.
 *
 * If no callback is provided, then default error handlers will respond
 * in the event of an error bubbling through the stack.
 *
 * @private
 */

app.handle = function handle(req, res, callback) {
  var router = this._router;

  // final handler
  var done = callback || finalhandler(req, res, {
    env: this.get('env'),
    onerror: logerror.bind(this)
  });

  // no routes
  if (!router) {
    debug('no routes defined on app');
    done();
    return;
  }

  router.handle(req, res, done);
};

/**
 * Proxy `Router#use()` to add middleware to the app router.
 * See Router#use() documentation for details.
 *
 * If the _fn_ parameter is an express app, then it will be
 * mounted at the _route_ specified.
 *
 * @public
 */

app.use = function use(fn) {
  var offset = 0;
  var path = '/';

  // default path to '/'
  // disambiguate app.use([fn])
  if (typeof fn !== 'function') {
    var arg = fn;

    while (Array.isArray(arg) && arg.length !== 0) {
      arg = arg[0];
    }

    // first arg is the path
    if (typeof arg !== 'function') {
      offset = 1;
      path = fn;
    }
  }

  var fns = flatten(slice.call(arguments, offset));

  if (fns.length === 0) {
    throw new TypeError('app.use() requires middleware functions');
  }

  // setup router
  this.lazyrouter();
  var router = this._router;

  fns.forEach(function (fn) {
    // non-express app
    if (!fn || !fn.handle || !fn.set) {
      return router.use(path, fn);
    }

    debug('.use app under %s', path);
    fn.mountpath = path;
    fn.parent = this;

    // restore .app property on req and res
    router.use(path, function mounted_app(req, res, next) {
      var orig = req.app;
      fn.handle(req, res, function (err) {
        setPrototypeOf(req, orig.request)
        setPrototypeOf(res, orig.response)
        next(err);
      });
    });

    // mounted an app
    fn.emit('mount', this);
  }, this);

  return this;
};

/**
 * Proxy to the app `Router#route()`
 * Returns a new `Route` instance for the _path_.
 *
 * Routes are isolated middleware stacks for specific paths.
 * See the Route api docs for details.
 *
 * @public
 */

app.route = function route(path) {
  this.lazyrouter();
  return this._router.route(path);
};

/**
 * Register the given template engine callback `fn`
 * as `ext`.
 *
 * By default will `require()` the engine based on the
 * file extension. For example if you try to render
 * a "foo.ejs" file Express will invoke the following internally:
 *
 *     app.engine('ejs', require('ejs').__express);
 *
 * For engines that do not provide `.__express` out of the box,
 * or if you wish to "map" a different extension to the template engine
 * you may use this method. For example mapping the EJS template engine to
 * ".html" files:
 *
 *     app.engine('html', require('ejs').renderFile);
 *
 * In this case EJS provides a `.renderFile()` method with
 * the same signature that Express expects: `(path, options, callback)`,
 * though note that it aliases this method as `ejs.__express` internally
 * so if you're using ".ejs" extensions you dont need to do anything.
 *
 * Some template engines do not follow this convention, the
 * [Consolidate.js](https://github.com/tj/consolidate.js)
 * library was created to map all of node's popular template
 * engines to follow this convention, thus allowing them to
 * work seamlessly within Express.
 *
 * @param {String} ext
 * @param {Function} fn
 * @return {app} for chaining
 * @public
 */

app.engine = function engine(ext, fn) {
  if (typeof fn !== 'function') {
    throw new Error('callback function required');
  }

  // get file extension
  var extension = ext[0] !== '.'
    ? '.' + ext
    : ext;

  // store engine
  this.engines[extension] = fn;

  return this;
};

/**
 * Proxy to `Router#param()` with one added api feature. The _name_ parameter
 * can be an array of names.
 *
 * See the Router#param() docs for more details.
 *
 * @param {String|Array} name
 * @param {Function} fn
 * @return {app} for chaining
 * @public
 */

app.param = function param(name, fn) {
  this.lazyrouter();

  if (Array.isArray(name)) {
    for (var i = 0; i < name.length; i++) {
      this.param(name[i], fn);
    }

    return this;
  }

  this._router.param(name, fn);

  return this;
};

/**
 * Assign `setting` to `val`, or return `setting`'s value.
 *
 *    app.set('foo', 'bar');
 *    app.get('foo');
 *    // => "bar"
 *
 * Mounted servers inherit their parent server's settings.
 *
 * @param {String} setting
 * @param {*} [val]
 * @return {Server} for chaining
 * @public
 */

app.set = function set(setting, val) {
  if (arguments.length === 1) {
    // app.get(setting)
    return this.settings[setting];
  }

  debug('set "%s" to %o', setting, val);

  // set value
  this.settings[setting] = val;

  // trigger matched settings
  switch (setting) {
    case 'etag':
      this.set('etag fn', compileETag(val));
      break;
    case 'query parser':
      this.set('query parser fn', compileQueryParser(val));
      break;
    case 'trust proxy':
      this.set('trust proxy fn', compileTrust(val));

      // trust proxy inherit back-compat
      Object.defineProperty(this.settings, trustProxyDefaultSymbol, {
        configurable: true,
        value: false
      });

      break;
  }

  return this;
};

/**
 * Return the app's absolute pathname
 * based on the parent(s) that have
 * mounted it.
 *
 * For example if the application was
 * mounted as "/admin", which itself
 * was mounted as "/blog" then the
 * return value would be "/blog/admin".
 *
 * @return {String}
 * @private
 */

app.path = function path() {
  return this.parent
    ? this.parent.path() + this.mountpath
    : '';
};

/**
 * Check if `setting` is enabled (truthy).
 *
 *    app.enabled('foo')
 *    // => false
 *
 *    app.enable('foo')
 *    app.enabled('foo')
 *    // => true
 *
 * @param {String} setting
 * @return {Boolean}
 * @public
 */

app.enabled = function enabled(setting) {
  return Boolean(this.set(setting));
};

/**
 * Check if `setting` is disabled.
 *
 *    app.disabled('foo')
 *    // => true
 *
 *    app.enable('foo')
 *    app.disabled('foo')
 *    // => false
 *
 * @param {String} setting
 * @return {Boolean}
 * @public
 */

app.disabled = function disabled(setting) {
  return !this.set(setting);
};

/**
 * Enable `setting`.
 *
 * @param {String} setting
 * @return {app} for chaining
 * @public
 */

app.enable = function enable(setting) {
  return this.set(setting, true);
};

/**
 * Disable `setting`.
 *
 * @param {String} setting
 * @return {app} for chaining
 * @public
 */

app.disable = function disable(setting) {
  return this.set(setting, false);
};

/**
 * Delegate `.VERB(...)` calls to `router.VERB(...)`.
 */

methods.forEach(function(method){
  app[method] = function(path){
    if (method === 'get' && arguments.length === 1) {
      // app.get(setting)
      return this.set(path);
    }

    this.lazyrouter();

    var route = this._router.route(path);
    route[method].apply(route, slice.call(arguments, 1));
    return this;
  };
});

/**
 * Special-cased "all" method, applying the given route `path`,
 * middleware, and callback to _every_ HTTP method.
 *
 * @param {String} path
 * @param {Function} ...
 * @return {app} for chaining
 * @public
 */

app.all = function all(path) {
  this.lazyrouter();

  var route = this._router.route(path);
  var args = slice.call(arguments, 1);

  for (var i = 0; i < methods.length; i++) {
    route[methods[i]].apply(route, args);
  }

  return this;
};

// del -> delete alias

app.del = deprecate.function(app.delete, 'app.del: Use app.delete instead');

/**
 * Render the given view `name` name with `options`
 * and a callback accepting an error and the
 * rendered template string.
 *
 * Example:
 *
 *    app.render('email', { name: 'Tobi' }, function(err, html){
 *      // ...
 *    })
 *
 * @param {String} name
 * @param {Object|Function} options or fn
 * @param {Function} callback
 * @public
 */

app.render = function render(name, options, callback) {
  var cache = this.cache;
  var done = callback;
  var engines = this.engines;
  var opts = options;
  var renderOptions = {};
  var view;

  // support callback function as second arg
  if (typeof options === 'function') {
    done = options;
    opts = {};
  }

  // merge app.locals
  merge(renderOptions, this.locals);

  // merge options._locals
  if (opts._locals) {
    merge(renderOptions, opts._locals);
  }

  // merge options
  merge(renderOptions, opts);

  // set .cache unless explicitly provided
  if (renderOptions.cache == null) {
    renderOptions.cache = this.enabled('view cache');
  }

  // primed cache
  if (renderOptions.cache) {
    view = cache[name];
  }

  // view
  if (!view) {
    var View = this.get('view');

    view = new View(name, {
      defaultEngine: this.get('view engine'),
      root: this.get('views'),
      engines: engines
    });

    if (!view.path) {
      var dirs = Array.isArray(view.root) && view.root.length > 1
        ? 'directories "' + view.root.slice(0, -1).join('", "') + '" or "' + view.root[view.root.length - 1] + '"'
        : 'directory "' + view.root + '"'
      var err = new Error('Failed to lookup view "' + name + '" in views ' + dirs);
      err.view = view;
      return done(err);
    }

    // prime the cache
    if (renderOptions.cache) {
      cache[name] = view;
    }
  }

  // render
  tryRender(view, renderOptions, done);
};

/**
 * Listen for connections.
 *
 * A node `http.Server` is returned, with this
 * application (which is a `Function`) as its
 * callback. If you wish to create both an HTTP
 * and HTTPS server you may do so with the "http"
 * and "https" modules as shown here:
 *
 *    var http = require('http')
 *      , https = require('https')
 *      , express = require('express')
 *      , app = express();
 *
 *    http.createServer(app).listen(80);
 *    https.createServer({ ... }, app).listen(443);
 *
 * @return {http.Server}
 * @public
 */

app.listen = function listen() {
  var server = http.createServer(this);
  return server.listen.apply(server, arguments);
};

/**
 * Log error using console.error.
 *
 * @param {Error} err
 * @private
 */

function logerror(err) {
  /* istanbul ignore next */
  if (this.get('env') !== 'test') console.error(err.stack || err.toString());
}

/**
 * Try rendering a view.
 * @private
 */

function tryRender(view, options, callback) {
  try {
    view.render(options, callback);
  } catch (err) {
    callback(err);
  }
}


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * finalhandler
 * Copyright(c) 2014-2017 Douglas Christopher Wilson
 * MIT Licensed
 */



/**
 * Module dependencies.
 * @private
 */

var debug = __webpack_require__(5)('finalhandler')
var encodeUrl = __webpack_require__(10)
var escapeHtml = __webpack_require__(11)
var onFinished = __webpack_require__(17)
var parseUrl = __webpack_require__(8)
var statuses = __webpack_require__(12)
var unpipe = __webpack_require__(44)

/**
 * Module variables.
 * @private
 */

var DOUBLE_SPACE_REGEXP = /\x20{2}/g
var NEWLINE_REGEXP = /\n/g

/* istanbul ignore next */
var defer = typeof setImmediate === 'function'
  ? setImmediate
  : function (fn) { process.nextTick(fn.bind.apply(fn, arguments)) }
var isFinished = onFinished.isFinished

/**
 * Create a minimal HTML document.
 *
 * @param {string} message
 * @private
 */

function createHtmlDocument (message) {
  var body = escapeHtml(message)
    .replace(NEWLINE_REGEXP, '<br>')
    .replace(DOUBLE_SPACE_REGEXP, ' &nbsp;')

  return '<!DOCTYPE html>\n' +
    '<html lang="en">\n' +
    '<head>\n' +
    '<meta charset="utf-8">\n' +
    '<title>Error</title>\n' +
    '</head>\n' +
    '<body>\n' +
    '<pre>' + body + '</pre>\n' +
    '</body>\n' +
    '</html>\n'
}

/**
 * Module exports.
 * @public
 */

module.exports = finalhandler

/**
 * Create a function to handle the final response.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {Object} [options]
 * @return {Function}
 * @public
 */

function finalhandler (req, res, options) {
  var opts = options || {}

  // get environment
  var env = opts.env || "development" || 'development'

  // get error callback
  var onerror = opts.onerror

  return function (err) {
    var headers
    var msg
    var status

    // ignore 404 on in-flight response
    if (!err && res._header) {
      debug('cannot 404 after headers sent')
      return
    }

    // unhandled error
    if (err) {
      // respect status code from error
      status = getErrorStatusCode(err)

      // respect headers from error
      if (status !== undefined) {
        headers = getErrorHeaders(err)
      }

      // fallback to status code on response
      if (status === undefined) {
        status = getResponseStatusCode(res)
      }

      // get error message
      msg = getErrorMessage(err, status, env)
    } else {
      // not found
      status = 404
      msg = 'Cannot ' + req.method + ' ' + encodeUrl(parseUrl.original(req).pathname)
    }

    debug('default %s', status)

    // schedule onerror callback
    if (err && onerror) {
      defer(onerror, err, req, res)
    }

    // cannot actually respond
    if (res._header) {
      debug('cannot %d after headers sent', status)
      req.socket.destroy()
      return
    }

    // send response
    send(req, res, status, headers, msg)
  }
}

/**
 * Get headers from Error object.
 *
 * @param {Error} err
 * @return {object}
 * @private
 */

function getErrorHeaders (err) {
  if (!err.headers || typeof err.headers !== 'object') {
    return undefined
  }

  var headers = Object.create(null)
  var keys = Object.keys(err.headers)

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i]
    headers[key] = err.headers[key]
  }

  return headers
}

/**
 * Get message from Error object, fallback to status message.
 *
 * @param {Error} err
 * @param {number} status
 * @param {string} env
 * @return {string}
 * @private
 */

function getErrorMessage (err, status, env) {
  var msg

  if (env !== 'production') {
    // use err.stack, which typically includes err.message
    msg = err.stack

    // fallback to err.toString() when possible
    if (!msg && typeof err.toString === 'function') {
      msg = err.toString()
    }
  }

  return msg || statuses[status]
}

/**
 * Get status code from Error object.
 *
 * @param {Error} err
 * @return {number}
 * @private
 */

function getErrorStatusCode (err) {
  // check err.status
  if (typeof err.status === 'number' && err.status >= 400 && err.status < 600) {
    return err.status
  }

  // check err.statusCode
  if (typeof err.statusCode === 'number' && err.statusCode >= 400 && err.statusCode < 600) {
    return err.statusCode
  }

  return undefined
}

/**
 * Get status code from response.
 *
 * @param {OutgoingMessage} res
 * @return {number}
 * @private
 */

function getResponseStatusCode (res) {
  var status = res.statusCode

  // default status code to 500 if outside valid range
  if (typeof status !== 'number' || status < 400 || status > 599) {
    status = 500
  }

  return status
}

/**
 * Send response.
 *
 * @param {IncomingMessage} req
 * @param {OutgoingMessage} res
 * @param {number} status
 * @param {object} headers
 * @param {string} message
 * @private
 */

function send (req, res, status, headers, message) {
  function write () {
    // response body
    var body = createHtmlDocument(message)

    // response status
    res.statusCode = status
    res.statusMessage = statuses[status]

    // response headers
    setHeaders(res, headers)

    // security headers
    res.setHeader('Content-Security-Policy', "default-src 'self'")
    res.setHeader('X-Content-Type-Options', 'nosniff')

    // standard headers
    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    res.setHeader('Content-Length', Buffer.byteLength(body, 'utf8'))

    if (req.method === 'HEAD') {
      res.end()
      return
    }

    res.end(body, 'utf8')
  }

  if (isFinished(req)) {
    write()
    return
  }

  // unpipe everything from the request
  unpipe(req)

  // flush the request
  onFinished(req, write)
  req.resume()
}

/**
 * Set response headers from an object.
 *
 * @param {OutgoingMessage} res
 * @param {object} headers
 * @private
 */

function setHeaders (res, headers) {
  if (!headers) {
    return
  }

  var keys = Object.keys(headers)
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i]
    res.setHeader(key, headers[key])
  }
}


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * ee-first
 * Copyright(c) 2014 Jonathan Ong
 * MIT Licensed
 */



/**
 * Module exports.
 * @public
 */

module.exports = first

/**
 * Get the first event in a set of event emitters and event pairs.
 *
 * @param {array} stuff
 * @param {function} done
 * @public
 */

function first(stuff, done) {
  if (!Array.isArray(stuff))
    throw new TypeError('arg must be an array of [ee, events...] arrays')

  var cleanups = []

  for (var i = 0; i < stuff.length; i++) {
    var arr = stuff[i]

    if (!Array.isArray(arr) || arr.length < 2)
      throw new TypeError('each array member must be [ee, events...]')

    var ee = arr[0]

    for (var j = 1; j < arr.length; j++) {
      var event = arr[j]
      var fn = listener(event, callback)

      // listen to the event
      ee.on(event, fn)
      // push this listener to the list of cleanups
      cleanups.push({
        ee: ee,
        event: event,
        fn: fn,
      })
    }
  }

  function callback() {
    cleanup()
    done.apply(null, arguments)
  }

  function cleanup() {
    var x
    for (var i = 0; i < cleanups.length; i++) {
      x = cleanups[i]
      x.ee.removeListener(x.event, x.fn)
    }
  }

  function thunk(fn) {
    done = fn
  }

  thunk.cancel = cleanup

  return thunk
}

/**
 * Create the event listener.
 * @private
 */

function listener(event, done) {
  return function onevent(arg1) {
    var args = new Array(arguments.length)
    var ee = this
    var err = event === 'error'
      ? arg1
      : null

    // copy args to prevent arguments escaping scope
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i]
    }

    done(err, ee, event, args)
  }
}


/***/ }),
/* 43 */
/***/ (function(module, exports) {

module.exports = {"100":"Continue","101":"Switching Protocols","102":"Processing","200":"OK","201":"Created","202":"Accepted","203":"Non-Authoritative Information","204":"No Content","205":"Reset Content","206":"Partial Content","207":"Multi-Status","208":"Already Reported","226":"IM Used","300":"Multiple Choices","301":"Moved Permanently","302":"Found","303":"See Other","304":"Not Modified","305":"Use Proxy","306":"(Unused)","307":"Temporary Redirect","308":"Permanent Redirect","400":"Bad Request","401":"Unauthorized","402":"Payment Required","403":"Forbidden","404":"Not Found","405":"Method Not Allowed","406":"Not Acceptable","407":"Proxy Authentication Required","408":"Request Timeout","409":"Conflict","410":"Gone","411":"Length Required","412":"Precondition Failed","413":"Payload Too Large","414":"URI Too Long","415":"Unsupported Media Type","416":"Range Not Satisfiable","417":"Expectation Failed","418":"I'm a teapot","421":"Misdirected Request","422":"Unprocessable Entity","423":"Locked","424":"Failed Dependency","425":"Unordered Collection","426":"Upgrade Required","428":"Precondition Required","429":"Too Many Requests","431":"Request Header Fields Too Large","451":"Unavailable For Legal Reasons","500":"Internal Server Error","501":"Not Implemented","502":"Bad Gateway","503":"Service Unavailable","504":"Gateway Timeout","505":"HTTP Version Not Supported","506":"Variant Also Negotiates","507":"Insufficient Storage","508":"Loop Detected","509":"Bandwidth Limit Exceeded","510":"Not Extended","511":"Network Authentication Required"}

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * unpipe
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */



/**
 * Module exports.
 * @public
 */

module.exports = unpipe

/**
 * Determine if there are Node.js pipe-like data listeners.
 * @private
 */

function hasPipeDataListeners(stream) {
  var listeners = stream.listeners('data')

  for (var i = 0; i < listeners.length; i++) {
    if (listeners[i].name === 'ondata') {
      return true
    }
  }

  return false
}

/**
 * Unpipe a stream from all destinations.
 *
 * @param {object} stream
 * @public
 */

function unpipe(stream) {
  if (!stream) {
    throw new TypeError('argument stream is required')
  }

  if (typeof stream.unpipe === 'function') {
    // new-style
    stream.unpipe()
    return
  }

  // Node.js 0.8 hack
  if (!hasPipeDataListeners(stream)) {
    return
  }

  var listener
  var listeners = stream.listeners('close')

  for (var i = 0; i < listeners.length; i++) {
    listener = listeners[i]

    if (listener.name !== 'cleanup' && listener.name !== 'onclose') {
      continue
    }

    // invoke the listener
    listener.call(stream)
  }
}


/***/ }),
/* 45 */
/***/ (function(module, exports) {

/**
 * Expose `pathtoRegexp`.
 */

module.exports = pathtoRegexp;

/**
 * Match matching groups in a regular expression.
 */
var MATCHING_GROUP_REGEXP = /\((?!\?)/g;

/**
 * Normalize the given path string,
 * returning a regular expression.
 *
 * An empty array should be passed,
 * which will contain the placeholder
 * key names. For example "/user/:id" will
 * then contain ["id"].
 *
 * @param  {String|RegExp|Array} path
 * @param  {Array} keys
 * @param  {Object} options
 * @return {RegExp}
 * @api private
 */

function pathtoRegexp(path, keys, options) {
  options = options || {};
  keys = keys || [];
  var strict = options.strict;
  var end = options.end !== false;
  var flags = options.sensitive ? '' : 'i';
  var extraOffset = 0;
  var keysOffset = keys.length;
  var i = 0;
  var name = 0;
  var m;

  if (path instanceof RegExp) {
    while (m = MATCHING_GROUP_REGEXP.exec(path.source)) {
      keys.push({
        name: name++,
        optional: false,
        offset: m.index
      });
    }

    return path;
  }

  if (Array.isArray(path)) {
    // Map array parts into regexps and return their source. We also pass
    // the same keys and options instance into every generation to get
    // consistent matching groups before we join the sources together.
    path = path.map(function (value) {
      return pathtoRegexp(value, keys, options).source;
    });

    return new RegExp('(?:' + path.join('|') + ')', flags);
  }

  path = ('^' + path + (strict ? '' : path[path.length - 1] === '/' ? '?' : '/?'))
    .replace(/\/\(/g, '/(?:')
    .replace(/([\/\.])/g, '\\$1')
    .replace(/(\\\/)?(\\\.)?:(\w+)(\(.*?\))?(\*)?(\?)?/g, function (match, slash, format, key, capture, star, optional, offset) {
      slash = slash || '';
      format = format || '';
      capture = capture || '([^\\/' + format + ']+?)';
      optional = optional || '';

      keys.push({
        name: key,
        optional: !!optional,
        offset: offset + extraOffset
      });

      var result = ''
        + (optional ? '' : slash)
        + '(?:'
        + format + (optional ? slash : '') + capture
        + (star ? '((?:[\\/' + format + '].+?)?)' : '')
        + ')'
        + optional;

      extraOffset += result.length - match.length;

      return result;
    })
    .replace(/\*/g, function (star, index) {
      var len = keys.length

      while (len-- > keysOffset && keys[len].offset > index) {
        keys[len].offset += 3; // Replacement length minus asterisk length.
      }

      return '(.*)';
    });

  // This is a workaround for handling unnamed matching groups.
  while (m = MATCHING_GROUP_REGEXP.exec(path)) {
    var escapeCount = 0;
    var index = m.index;

    while (path.charAt(--index) === '\\') {
      escapeCount++;
    }

    // It's possible to escape the bracket.
    if (escapeCount % 2 === 1) {
      continue;
    }

    if (keysOffset + i === keys.length || keys[keysOffset + i].offset > m.index) {
      keys.splice(keysOffset + i, 0, {
        name: name++, // Unnamed matching groups must be consistently linear.
        optional: false,
        offset: m.index
      });
    }

    i++;
  }

  // If the path is non-ending, match until the end or a slash.
  path += (end ? '$' : (path[path.length - 1] === '/' ? '' : '(?=\\/|$)'));

  return new RegExp(path, flags);
};


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * depd
 * Copyright(c) 2014 Douglas Christopher Wilson
 * MIT Licensed
 */



/**
 * Module exports.
 */

module.exports = callSiteToString

/**
 * Format a CallSite file location to a string.
 */

function callSiteFileLocation (callSite) {
  var fileName
  var fileLocation = ''

  if (callSite.isNative()) {
    fileLocation = 'native'
  } else if (callSite.isEval()) {
    fileName = callSite.getScriptNameOrSourceURL()
    if (!fileName) {
      fileLocation = callSite.getEvalOrigin()
    }
  } else {
    fileName = callSite.getFileName()
  }

  if (fileName) {
    fileLocation += fileName

    var lineNumber = callSite.getLineNumber()
    if (lineNumber != null) {
      fileLocation += ':' + lineNumber

      var columnNumber = callSite.getColumnNumber()
      if (columnNumber) {
        fileLocation += ':' + columnNumber
      }
    }
  }

  return fileLocation || 'unknown source'
}

/**
 * Format a CallSite to a string.
 */

function callSiteToString (callSite) {
  var addSuffix = true
  var fileLocation = callSiteFileLocation(callSite)
  var functionName = callSite.getFunctionName()
  var isConstructor = callSite.isConstructor()
  var isMethodCall = !(callSite.isToplevel() || isConstructor)
  var line = ''

  if (isMethodCall) {
    var methodName = callSite.getMethodName()
    var typeName = getConstructorName(callSite)

    if (functionName) {
      if (typeName && functionName.indexOf(typeName) !== 0) {
        line += typeName + '.'
      }

      line += functionName

      if (methodName && functionName.lastIndexOf('.' + methodName) !== functionName.length - methodName.length - 1) {
        line += ' [as ' + methodName + ']'
      }
    } else {
      line += typeName + '.' + (methodName || '<anonymous>')
    }
  } else if (isConstructor) {
    line += 'new ' + (functionName || '<anonymous>')
  } else if (functionName) {
    line += functionName
  } else {
    addSuffix = false
    line += fileLocation
  }

  if (addSuffix) {
    line += ' (' + fileLocation + ')'
  }

  return line
}

/**
 * Get constructor name of reviver.
 */

function getConstructorName (obj) {
  var receiver = obj.receiver
  return (receiver.constructor && receiver.constructor.name) || null
}


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * depd
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */



/**
 * Module exports.
 * @public
 */

module.exports = eventListenerCount

/**
 * Get the count of listeners on an event emitter of a specific type.
 */

function eventListenerCount (emitter, type) {
  return emitter.listeners(type).length
}


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * express
 * Copyright(c) 2009-2013 TJ Holowaychuk
 * Copyright(c) 2013 Roman Shtylman
 * Copyright(c) 2014-2015 Douglas Christopher Wilson
 * MIT Licensed
 */



/**
 * Module dependencies.
 * @private
 */

var setPrototypeOf = __webpack_require__(15)

/**
 * Initialization middleware, exposing the
 * request and response to each other, as well
 * as defaulting the X-Powered-By header field.
 *
 * @param {Function} app
 * @return {Function}
 * @api private
 */

exports.init = function(app){
  return function expressInit(req, res, next){
    if (app.enabled('x-powered-by')) res.setHeader('X-Powered-By', 'Express');
    req.res = res;
    res.req = req;
    req.next = next;

    setPrototypeOf(req, app.request)
    setPrototypeOf(res, app.response)

    res.locals = res.locals || Object.create(null);

    next();
  };
};



/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(27);
var formats = __webpack_require__(28);

var arrayPrefixGenerators = {
    brackets: function brackets(prefix) { // eslint-disable-line func-name-matching
        return prefix + '[]';
    },
    indices: function indices(prefix, key) { // eslint-disable-line func-name-matching
        return prefix + '[' + key + ']';
    },
    repeat: function repeat(prefix) { // eslint-disable-line func-name-matching
        return prefix;
    }
};

var toISO = Date.prototype.toISOString;

var defaults = {
    delimiter: '&',
    encode: true,
    encoder: utils.encode,
    encodeValuesOnly: false,
    serializeDate: function serializeDate(date) { // eslint-disable-line func-name-matching
        return toISO.call(date);
    },
    skipNulls: false,
    strictNullHandling: false
};

var stringify = function stringify( // eslint-disable-line func-name-matching
    object,
    prefix,
    generateArrayPrefix,
    strictNullHandling,
    skipNulls,
    encoder,
    filter,
    sort,
    allowDots,
    serializeDate,
    formatter,
    encodeValuesOnly
) {
    var obj = object;
    if (typeof filter === 'function') {
        obj = filter(prefix, obj);
    } else if (obj instanceof Date) {
        obj = serializeDate(obj);
    } else if (obj === null) {
        if (strictNullHandling) {
            return encoder && !encodeValuesOnly ? encoder(prefix, defaults.encoder) : prefix;
        }

        obj = '';
    }

    if (typeof obj === 'string' || typeof obj === 'number' || typeof obj === 'boolean' || utils.isBuffer(obj)) {
        if (encoder) {
            var keyValue = encodeValuesOnly ? prefix : encoder(prefix, defaults.encoder);
            return [formatter(keyValue) + '=' + formatter(encoder(obj, defaults.encoder))];
        }
        return [formatter(prefix) + '=' + formatter(String(obj))];
    }

    var values = [];

    if (typeof obj === 'undefined') {
        return values;
    }

    var objKeys;
    if (Array.isArray(filter)) {
        objKeys = filter;
    } else {
        var keys = Object.keys(obj);
        objKeys = sort ? keys.sort(sort) : keys;
    }

    for (var i = 0; i < objKeys.length; ++i) {
        var key = objKeys[i];

        if (skipNulls && obj[key] === null) {
            continue;
        }

        if (Array.isArray(obj)) {
            values = values.concat(stringify(
                obj[key],
                generateArrayPrefix(prefix, key),
                generateArrayPrefix,
                strictNullHandling,
                skipNulls,
                encoder,
                filter,
                sort,
                allowDots,
                serializeDate,
                formatter,
                encodeValuesOnly
            ));
        } else {
            values = values.concat(stringify(
                obj[key],
                prefix + (allowDots ? '.' + key : '[' + key + ']'),
                generateArrayPrefix,
                strictNullHandling,
                skipNulls,
                encoder,
                filter,
                sort,
                allowDots,
                serializeDate,
                formatter,
                encodeValuesOnly
            ));
        }
    }

    return values;
};

module.exports = function (object, opts) {
    var obj = object;
    var options = opts ? utils.assign({}, opts) : {};

    if (options.encoder !== null && options.encoder !== undefined && typeof options.encoder !== 'function') {
        throw new TypeError('Encoder has to be a function.');
    }

    var delimiter = typeof options.delimiter === 'undefined' ? defaults.delimiter : options.delimiter;
    var strictNullHandling = typeof options.strictNullHandling === 'boolean' ? options.strictNullHandling : defaults.strictNullHandling;
    var skipNulls = typeof options.skipNulls === 'boolean' ? options.skipNulls : defaults.skipNulls;
    var encode = typeof options.encode === 'boolean' ? options.encode : defaults.encode;
    var encoder = typeof options.encoder === 'function' ? options.encoder : defaults.encoder;
    var sort = typeof options.sort === 'function' ? options.sort : null;
    var allowDots = typeof options.allowDots === 'undefined' ? false : options.allowDots;
    var serializeDate = typeof options.serializeDate === 'function' ? options.serializeDate : defaults.serializeDate;
    var encodeValuesOnly = typeof options.encodeValuesOnly === 'boolean' ? options.encodeValuesOnly : defaults.encodeValuesOnly;
    if (typeof options.format === 'undefined') {
        options.format = formats.default;
    } else if (!Object.prototype.hasOwnProperty.call(formats.formatters, options.format)) {
        throw new TypeError('Unknown format option provided.');
    }
    var formatter = formats.formatters[options.format];
    var objKeys;
    var filter;

    if (typeof options.filter === 'function') {
        filter = options.filter;
        obj = filter('', obj);
    } else if (Array.isArray(options.filter)) {
        filter = options.filter;
        objKeys = filter;
    }

    var keys = [];

    if (typeof obj !== 'object' || obj === null) {
        return '';
    }

    var arrayFormat;
    if (options.arrayFormat in arrayPrefixGenerators) {
        arrayFormat = options.arrayFormat;
    } else if ('indices' in options) {
        arrayFormat = options.indices ? 'indices' : 'repeat';
    } else {
        arrayFormat = 'indices';
    }

    var generateArrayPrefix = arrayPrefixGenerators[arrayFormat];

    if (!objKeys) {
        objKeys = Object.keys(obj);
    }

    if (sort) {
        objKeys.sort(sort);
    }

    for (var i = 0; i < objKeys.length; ++i) {
        var key = objKeys[i];

        if (skipNulls && obj[key] === null) {
            continue;
        }

        keys = keys.concat(stringify(
            obj[key],
            key,
            generateArrayPrefix,
            strictNullHandling,
            skipNulls,
            encode ? encoder : null,
            filter,
            sort,
            allowDots,
            serializeDate,
            formatter,
            encodeValuesOnly
        ));
    }

    var joined = keys.join(delimiter);
    var prefix = options.addQueryPrefix === true ? '?' : '';

    return joined.length > 0 ? prefix + joined : '';
};


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(27);

var has = Object.prototype.hasOwnProperty;

var defaults = {
    allowDots: false,
    allowPrototypes: false,
    arrayLimit: 20,
    decoder: utils.decode,
    delimiter: '&',
    depth: 5,
    parameterLimit: 1000,
    plainObjects: false,
    strictNullHandling: false
};

var parseValues = function parseQueryStringValues(str, options) {
    var obj = {};
    var cleanStr = options.ignoreQueryPrefix ? str.replace(/^\?/, '') : str;
    var limit = options.parameterLimit === Infinity ? undefined : options.parameterLimit;
    var parts = cleanStr.split(options.delimiter, limit);

    for (var i = 0; i < parts.length; ++i) {
        var part = parts[i];

        var bracketEqualsPos = part.indexOf(']=');
        var pos = bracketEqualsPos === -1 ? part.indexOf('=') : bracketEqualsPos + 1;

        var key, val;
        if (pos === -1) {
            key = options.decoder(part, defaults.decoder);
            val = options.strictNullHandling ? null : '';
        } else {
            key = options.decoder(part.slice(0, pos), defaults.decoder);
            val = options.decoder(part.slice(pos + 1), defaults.decoder);
        }
        if (has.call(obj, key)) {
            obj[key] = [].concat(obj[key]).concat(val);
        } else {
            obj[key] = val;
        }
    }

    return obj;
};

var parseObject = function parseObjectRecursive(chain, val, options) {
    if (!chain.length) {
        return val;
    }

    var root = chain.shift();

    var obj;
    if (root === '[]') {
        obj = [];
        obj = obj.concat(parseObject(chain, val, options));
    } else {
        obj = options.plainObjects ? Object.create(null) : {};
        var cleanRoot = root.charAt(0) === '[' && root.charAt(root.length - 1) === ']' ? root.slice(1, -1) : root;
        var index = parseInt(cleanRoot, 10);
        if (
            !isNaN(index)
            && root !== cleanRoot
            && String(index) === cleanRoot
            && index >= 0
            && (options.parseArrays && index <= options.arrayLimit)
        ) {
            obj = [];
            obj[index] = parseObject(chain, val, options);
        } else {
            obj[cleanRoot] = parseObject(chain, val, options);
        }
    }

    return obj;
};

var parseKeys = function parseQueryStringKeys(givenKey, val, options) {
    if (!givenKey) {
        return;
    }

    // Transform dot notation to bracket notation
    var key = options.allowDots ? givenKey.replace(/\.([^.[]+)/g, '[$1]') : givenKey;

    // The regex chunks

    var brackets = /(\[[^[\]]*])/;
    var child = /(\[[^[\]]*])/g;

    // Get the parent

    var segment = brackets.exec(key);
    var parent = segment ? key.slice(0, segment.index) : key;

    // Stash the parent if it exists

    var keys = [];
    if (parent) {
        // If we aren't using plain objects, optionally prefix keys
        // that would overwrite object prototype properties
        if (!options.plainObjects && has.call(Object.prototype, parent)) {
            if (!options.allowPrototypes) {
                return;
            }
        }

        keys.push(parent);
    }

    // Loop through children appending to the array until we hit depth

    var i = 0;
    while ((segment = child.exec(key)) !== null && i < options.depth) {
        i += 1;
        if (!options.plainObjects && has.call(Object.prototype, segment[1].slice(1, -1))) {
            if (!options.allowPrototypes) {
                return;
            }
        }
        keys.push(segment[1]);
    }

    // If there's a remainder, just add whatever is left

    if (segment) {
        keys.push('[' + key.slice(segment.index) + ']');
    }

    return parseObject(keys, val, options);
};

module.exports = function (str, opts) {
    var options = opts ? utils.assign({}, opts) : {};

    if (options.decoder !== null && options.decoder !== undefined && typeof options.decoder !== 'function') {
        throw new TypeError('Decoder has to be a function.');
    }

    options.ignoreQueryPrefix = options.ignoreQueryPrefix === true;
    options.delimiter = typeof options.delimiter === 'string' || utils.isRegExp(options.delimiter) ? options.delimiter : defaults.delimiter;
    options.depth = typeof options.depth === 'number' ? options.depth : defaults.depth;
    options.arrayLimit = typeof options.arrayLimit === 'number' ? options.arrayLimit : defaults.arrayLimit;
    options.parseArrays = options.parseArrays !== false;
    options.decoder = typeof options.decoder === 'function' ? options.decoder : defaults.decoder;
    options.allowDots = typeof options.allowDots === 'boolean' ? options.allowDots : defaults.allowDots;
    options.plainObjects = typeof options.plainObjects === 'boolean' ? options.plainObjects : defaults.plainObjects;
    options.allowPrototypes = typeof options.allowPrototypes === 'boolean' ? options.allowPrototypes : defaults.allowPrototypes;
    options.parameterLimit = typeof options.parameterLimit === 'number' ? options.parameterLimit : defaults.parameterLimit;
    options.strictNullHandling = typeof options.strictNullHandling === 'boolean' ? options.strictNullHandling : defaults.strictNullHandling;

    if (str === '' || str === null || typeof str === 'undefined') {
        return options.plainObjects ? Object.create(null) : {};
    }

    var tempObj = typeof str === 'string' ? parseValues(str, options) : str;
    var obj = options.plainObjects ? Object.create(null) : {};

    // Iterate over the keys and setup the new object

    var keys = Object.keys(tempObj);
    for (var i = 0; i < keys.length; ++i) {
        var key = keys[i];
        var newObj = parseKeys(key, tempObj[key], options);
        obj = utils.merge(obj, newObj, options);
    }

    return utils.compact(obj);
};


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * express
 * Copyright(c) 2009-2013 TJ Holowaychuk
 * Copyright(c) 2013 Roman Shtylman
 * Copyright(c) 2014-2015 Douglas Christopher Wilson
 * MIT Licensed
 */



/**
 * Module dependencies.
 * @private
 */

var debug = __webpack_require__(5)('express:view');
var path = __webpack_require__(4);
var fs = __webpack_require__(2);

/**
 * Module variables.
 * @private
 */

var dirname = path.dirname;
var basename = path.basename;
var extname = path.extname;
var join = path.join;
var resolve = path.resolve;

/**
 * Module exports.
 * @public
 */

module.exports = View;

/**
 * Initialize a new `View` with the given `name`.
 *
 * Options:
 *
 *   - `defaultEngine` the default template engine name
 *   - `engines` template engine require() cache
 *   - `root` root path for view lookup
 *
 * @param {string} name
 * @param {object} options
 * @public
 */

function View(name, options) {
  var opts = options || {};

  this.defaultEngine = opts.defaultEngine;
  this.ext = extname(name);
  this.name = name;
  this.root = opts.root;

  if (!this.ext && !this.defaultEngine) {
    throw new Error('No default engine was specified and no extension was provided.');
  }

  var fileName = name;

  if (!this.ext) {
    // get extension from default engine name
    this.ext = this.defaultEngine[0] !== '.'
      ? '.' + this.defaultEngine
      : this.defaultEngine;

    fileName += this.ext;
  }

  if (!opts.engines[this.ext]) {
    // load engine
    var mod = this.ext.substr(1)
    debug('require "%s"', mod)
    opts.engines[this.ext] = !(function webpackMissingModule() { var e = new Error("Cannot find module \".\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()).__express
  }

  // store loaded engine
  this.engine = opts.engines[this.ext];

  // lookup path
  this.path = this.lookup(fileName);
}

/**
 * Lookup view by the given `name`
 *
 * @param {string} name
 * @private
 */

View.prototype.lookup = function lookup(name) {
  var path;
  var roots = [].concat(this.root);

  debug('lookup "%s"', name);

  for (var i = 0; i < roots.length && !path; i++) {
    var root = roots[i];

    // resolve the path
    var loc = resolve(root, name);
    var dir = dirname(loc);
    var file = basename(loc);

    // resolve the file
    path = this.resolve(dir, file);
  }

  return path;
};

/**
 * Render with the given options.
 *
 * @param {object} options
 * @param {function} callback
 * @private
 */

View.prototype.render = function render(options, callback) {
  debug('render "%s"', this.path);
  this.engine(this.path, options, callback);
};

/**
 * Resolve the file within the given directory.
 *
 * @param {string} dir
 * @param {string} file
 * @private
 */

View.prototype.resolve = function resolve(dir, file) {
  var ext = this.ext;

  // <path>.<ext>
  var path = join(dir, file);
  var stat = tryStat(path);

  if (stat && stat.isFile()) {
    return path;
  }

  // <path>/index.<ext>
  path = join(dir, basename(file, ext), 'index' + ext);
  stat = tryStat(path);

  if (stat && stat.isFile()) {
    return path;
  }
};

/**
 * Return a stat, maybe.
 *
 * @param {string} path
 * @return {fs.Stats}
 * @private
 */

function tryStat(path) {
  debug('stat "%s"', path);

  try {
    return fs.statSync(path);
  } catch (e) {
    return undefined;
  }
}


/***/ }),
/* 52 */
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 52;

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * content-type
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */



/**
 * RegExp to match *( ";" parameter ) in RFC 7231 sec 3.1.1.1
 *
 * parameter     = token "=" ( token / quoted-string )
 * token         = 1*tchar
 * tchar         = "!" / "#" / "$" / "%" / "&" / "'" / "*"
 *               / "+" / "-" / "." / "^" / "_" / "`" / "|" / "~"
 *               / DIGIT / ALPHA
 *               ; any VCHAR, except delimiters
 * quoted-string = DQUOTE *( qdtext / quoted-pair ) DQUOTE
 * qdtext        = HTAB / SP / %x21 / %x23-5B / %x5D-7E / obs-text
 * obs-text      = %x80-FF
 * quoted-pair   = "\" ( HTAB / SP / VCHAR / obs-text )
 */
var PARAM_REGEXP = /; *([!#$%&'*+.^_`|~0-9A-Za-z-]+) *= *("(?:[\u000b\u0020\u0021\u0023-\u005b\u005d-\u007e\u0080-\u00ff]|\\[\u000b\u0020-\u00ff])*"|[!#$%&'*+.^_`|~0-9A-Za-z-]+) */g
var TEXT_REGEXP = /^[\u000b\u0020-\u007e\u0080-\u00ff]+$/
var TOKEN_REGEXP = /^[!#$%&'*+.^_`|~0-9A-Za-z-]+$/

/**
 * RegExp to match quoted-pair in RFC 7230 sec 3.2.6
 *
 * quoted-pair = "\" ( HTAB / SP / VCHAR / obs-text )
 * obs-text    = %x80-FF
 */
var QESC_REGEXP = /\\([\u000b\u0020-\u00ff])/g

/**
 * RegExp to match chars that must be quoted-pair in RFC 7230 sec 3.2.6
 */
var QUOTE_REGEXP = /([\\"])/g

/**
 * RegExp to match type in RFC 7231 sec 3.1.1.1
 *
 * media-type = type "/" subtype
 * type       = token
 * subtype    = token
 */
var TYPE_REGEXP = /^[!#$%&'*+.^_`|~0-9A-Za-z-]+\/[!#$%&'*+.^_`|~0-9A-Za-z-]+$/

/**
 * Module exports.
 * @public
 */

exports.format = format
exports.parse = parse

/**
 * Format object to media type.
 *
 * @param {object} obj
 * @return {string}
 * @public
 */

function format (obj) {
  if (!obj || typeof obj !== 'object') {
    throw new TypeError('argument obj is required')
  }

  var parameters = obj.parameters
  var type = obj.type

  if (!type || !TYPE_REGEXP.test(type)) {
    throw new TypeError('invalid type')
  }

  var string = type

  // append parameters
  if (parameters && typeof parameters === 'object') {
    var param
    var params = Object.keys(parameters).sort()

    for (var i = 0; i < params.length; i++) {
      param = params[i]

      if (!TOKEN_REGEXP.test(param)) {
        throw new TypeError('invalid parameter name')
      }

      string += '; ' + param + '=' + qstring(parameters[param])
    }
  }

  return string
}

/**
 * Parse media type to object.
 *
 * @param {string|object} string
 * @return {Object}
 * @public
 */

function parse (string) {
  if (!string) {
    throw new TypeError('argument string is required')
  }

  // support req/res-like objects as argument
  var header = typeof string === 'object'
    ? getcontenttype(string)
    : string

  if (typeof header !== 'string') {
    throw new TypeError('argument string is required to be a string')
  }

  var index = header.indexOf(';')
  var type = index !== -1
    ? header.substr(0, index).trim()
    : header.trim()

  if (!TYPE_REGEXP.test(type)) {
    throw new TypeError('invalid media type')
  }

  var obj = new ContentType(type.toLowerCase())

  // parse parameters
  if (index !== -1) {
    var key
    var match
    var value

    PARAM_REGEXP.lastIndex = index

    while ((match = PARAM_REGEXP.exec(header))) {
      if (match.index !== index) {
        throw new TypeError('invalid parameter format')
      }

      index += match[0].length
      key = match[1].toLowerCase()
      value = match[2]

      if (value[0] === '"') {
        // remove quotes and escapes
        value = value
          .substr(1, value.length - 2)
          .replace(QESC_REGEXP, '$1')
      }

      obj.parameters[key] = value
    }

    if (index !== header.length) {
      throw new TypeError('invalid parameter format')
    }
  }

  return obj
}

/**
 * Get content-type from req/res objects.
 *
 * @param {object}
 * @return {Object}
 * @private
 */

function getcontenttype (obj) {
  var header

  if (typeof obj.getHeader === 'function') {
    // res-like
    header = obj.getHeader('content-type')
  } else if (typeof obj.headers === 'object') {
    // req-like
    header = obj.headers && obj.headers['content-type']
  }

  if (typeof header !== 'string') {
    throw new TypeError('content-type header is missing from object')
  }

  return header
}

/**
 * Quote a string if necessary.
 *
 * @param {string} val
 * @return {string}
 * @private
 */

function qstring (val) {
  var str = String(val)

  // no need to quote tokens
  if (TOKEN_REGEXP.test(str)) {
    return str
  }

  if (str.length > 0 && !TEXT_REGEXP.test(str)) {
    throw new TypeError('invalid parameter value')
  }

  return '"' + str.replace(QUOTE_REGEXP, '\\$1') + '"'
}

/**
 * Class to represent a content type.
 * @private
 */
function ContentType (type) {
  this.parameters = Object.create(null)
  this.type = type
}


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * http-errors
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2016 Douglas Christopher Wilson
 * MIT Licensed
 */



/**
 * Module dependencies.
 * @private
 */

var deprecate = __webpack_require__(6)('http-errors')
var setPrototypeOf = __webpack_require__(15)
var statuses = __webpack_require__(12)
var inherits = __webpack_require__(55)

/**
 * Module exports.
 * @public
 */

module.exports = createError
module.exports.HttpError = createHttpErrorConstructor()

// Populate exports for all constructors
populateConstructorExports(module.exports, statuses.codes, module.exports.HttpError)

/**
 * Get the code class of a status code.
 * @private
 */

function codeClass (status) {
  return Number(String(status).charAt(0) + '00')
}

/**
 * Create a new HTTP Error.
 *
 * @returns {Error}
 * @public
 */

function createError () {
  // so much arity going on ~_~
  var err
  var msg
  var status = 500
  var props = {}
  for (var i = 0; i < arguments.length; i++) {
    var arg = arguments[i]
    if (arg instanceof Error) {
      err = arg
      status = err.status || err.statusCode || status
      continue
    }
    switch (typeof arg) {
      case 'string':
        msg = arg
        break
      case 'number':
        status = arg
        if (i !== 0) {
          deprecate('non-first-argument status code; replace with createError(' + arg + ', ...)')
        }
        break
      case 'object':
        props = arg
        break
    }
  }

  if (typeof status === 'number' && (status < 400 || status >= 600)) {
    deprecate('non-error status code; use only 4xx or 5xx status codes')
  }

  if (typeof status !== 'number' ||
    (!statuses[status] && (status < 400 || status >= 600))) {
    status = 500
  }

  // constructor
  var HttpError = createError[status] || createError[codeClass(status)]

  if (!err) {
    // create error
    err = HttpError
      ? new HttpError(msg)
      : new Error(msg || statuses[status])
    Error.captureStackTrace(err, createError)
  }

  if (!HttpError || !(err instanceof HttpError) || err.status !== status) {
    // add properties to generic error
    err.expose = status < 500
    err.status = err.statusCode = status
  }

  for (var key in props) {
    if (key !== 'status' && key !== 'statusCode') {
      err[key] = props[key]
    }
  }

  return err
}

/**
 * Create HTTP error abstract base class.
 * @private
 */

function createHttpErrorConstructor () {
  function HttpError () {
    throw new TypeError('cannot construct abstract class')
  }

  inherits(HttpError, Error)

  return HttpError
}

/**
 * Create a constructor for a client error.
 * @private
 */

function createClientErrorConstructor (HttpError, name, code) {
  var className = name.match(/Error$/) ? name : name + 'Error'

  function ClientError (message) {
    // create the error object
    var msg = message != null ? message : statuses[code]
    var err = new Error(msg)

    // capture a stack trace to the construction point
    Error.captureStackTrace(err, ClientError)

    // adjust the [[Prototype]]
    setPrototypeOf(err, ClientError.prototype)

    // redefine the error message
    Object.defineProperty(err, 'message', {
      enumerable: true,
      configurable: true,
      value: msg,
      writable: true
    })

    // redefine the error name
    Object.defineProperty(err, 'name', {
      enumerable: false,
      configurable: true,
      value: className,
      writable: true
    })

    return err
  }

  inherits(ClientError, HttpError)

  ClientError.prototype.status = code
  ClientError.prototype.statusCode = code
  ClientError.prototype.expose = true

  return ClientError
}

/**
 * Create a constructor for a server error.
 * @private
 */

function createServerErrorConstructor (HttpError, name, code) {
  var className = name.match(/Error$/) ? name : name + 'Error'

  function ServerError (message) {
    // create the error object
    var msg = message != null ? message : statuses[code]
    var err = new Error(msg)

    // capture a stack trace to the construction point
    Error.captureStackTrace(err, ServerError)

    // adjust the [[Prototype]]
    setPrototypeOf(err, ServerError.prototype)

    // redefine the error message
    Object.defineProperty(err, 'message', {
      enumerable: true,
      configurable: true,
      value: msg,
      writable: true
    })

    // redefine the error name
    Object.defineProperty(err, 'name', {
      enumerable: false,
      configurable: true,
      value: className,
      writable: true
    })

    return err
  }

  inherits(ServerError, HttpError)

  ServerError.prototype.status = code
  ServerError.prototype.statusCode = code
  ServerError.prototype.expose = false

  return ServerError
}

/**
 * Populate the exports object with constructors for every error class.
 * @private
 */

function populateConstructorExports (exports, codes, HttpError) {
  codes.forEach(function forEachCode (code) {
    var CodeError
    var name = toIdentifier(statuses[code])

    switch (codeClass(code)) {
      case 400:
        CodeError = createClientErrorConstructor(HttpError, name, code)
        break
      case 500:
        CodeError = createServerErrorConstructor(HttpError, name, code)
        break
    }

    if (CodeError) {
      // export the constructor
      exports[code] = CodeError
      exports[name] = CodeError
    }
  })

  // backwards-compatibility
  exports["I'mateapot"] = deprecate.function(exports.ImATeapot,
    '"I\'mateapot"; use "ImATeapot" instead')
}

/**
 * Convert a string of words to a JavaScript identifier.
 * @private
 */

function toIdentifier (str) {
  return str.split(' ').map(function (token) {
    return token.slice(0, 1).toUpperCase() + token.slice(1)
  }).join('').replace(/[^ _0-9a-z]/gi, '')
}


/***/ }),
/* 55 */
/***/ (function(module, exports) {

module.exports = require("inherits");

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * destroy
 * Copyright(c) 2014 Jonathan Ong
 * MIT Licensed
 */



/**
 * Module dependencies.
 * @private
 */

var ReadStream = __webpack_require__(2).ReadStream
var Stream = __webpack_require__(30)

/**
 * Module exports.
 * @public
 */

module.exports = destroy

/**
 * Destroy a stream.
 *
 * @param {object} stream
 * @public
 */

function destroy(stream) {
  if (stream instanceof ReadStream) {
    return destroyReadStream(stream)
  }

  if (!(stream instanceof Stream)) {
    return stream
  }

  if (typeof stream.destroy === 'function') {
    stream.destroy()
  }

  return stream
}

/**
 * Destroy a ReadStream.
 *
 * @param {object} stream
 * @private
 */

function destroyReadStream(stream) {
  stream.destroy()

  if (typeof stream.close === 'function') {
    // node.js core bug work-around
    stream.on('open', onOpenClose)
  }

  return stream
}

/**
 * On open handler to close stream.
 * @private
 */

function onOpenClose() {
  if (typeof this.fd === 'number') {
    // actually close down the fd
    this.close()
  }
}


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

var path = __webpack_require__(4);
var fs = __webpack_require__(2);

function Mime() {
  // Map of extension -> mime type
  this.types = Object.create(null);

  // Map of mime type -> extension
  this.extensions = Object.create(null);
}

/**
 * Define mimetype -> extension mappings.  Each key is a mime-type that maps
 * to an array of extensions associated with the type.  The first extension is
 * used as the default extension for the type.
 *
 * e.g. mime.define({'audio/ogg', ['oga', 'ogg', 'spx']});
 *
 * @param map (Object) type definitions
 */
Mime.prototype.define = function (map) {
  for (var type in map) {
    var exts = map[type];
    for (var i = 0; i < exts.length; i++) {
      if (process.env.DEBUG_MIME && this.types[exts]) {
        console.warn(this._loading.replace(/.*\//, ''), 'changes "' + exts[i] + '" extension type from ' +
          this.types[exts] + ' to ' + type);
      }

      this.types[exts[i]] = type;
    }

    // Default extension is the first one we encounter
    if (!this.extensions[type]) {
      this.extensions[type] = exts[0];
    }
  }
};

/**
 * Load an Apache2-style ".types" file
 *
 * This may be called multiple times (it's expected).  Where files declare
 * overlapping types/extensions, the last file wins.
 *
 * @param file (String) path of file to load.
 */
Mime.prototype.load = function(file) {
  this._loading = file;
  // Read file and split into lines
  var map = {},
      content = fs.readFileSync(file, 'ascii'),
      lines = content.split(/[\r\n]+/);

  lines.forEach(function(line) {
    // Clean up whitespace/comments, and split into fields
    var fields = line.replace(/\s*#.*|^\s*|\s*$/g, '').split(/\s+/);
    map[fields.shift()] = fields;
  });

  this.define(map);

  this._loading = null;
};

/**
 * Lookup a mime type based on extension
 */
Mime.prototype.lookup = function(path, fallback) {
  var ext = path.replace(/.*[\.\/\\]/, '').toLowerCase();

  return this.types[ext] || fallback || this.default_type;
};

/**
 * Return file extension associated with a mime type
 */
Mime.prototype.extension = function(mimeType) {
  var type = mimeType.match(/^\s*([^;\s]*)(?:;|\s|$)/)[1].toLowerCase();
  return this.extensions[type];
};

// Default instance
var mime = new Mime();

// Define built-in types
mime.define(__webpack_require__(58));

// Default type
mime.default_type = mime.lookup('bin');

//
// Additional API specific to the default instance
//

mime.Mime = Mime;

/**
 * Lookup a charset based on mime type.
 */
mime.charsets = {
  lookup: function(mimeType, fallback) {
    // Assume text types are utf8
    return (/^text\//).test(mimeType) ? 'UTF-8' : fallback;
  }
};

module.exports = mime;


/***/ }),
/* 58 */
/***/ (function(module, exports) {

module.exports = {"application/andrew-inset":["ez"],"application/applixware":["aw"],"application/atom+xml":["atom"],"application/atomcat+xml":["atomcat"],"application/atomsvc+xml":["atomsvc"],"application/ccxml+xml":["ccxml"],"application/cdmi-capability":["cdmia"],"application/cdmi-container":["cdmic"],"application/cdmi-domain":["cdmid"],"application/cdmi-object":["cdmio"],"application/cdmi-queue":["cdmiq"],"application/cu-seeme":["cu"],"application/dash+xml":["mdp"],"application/davmount+xml":["davmount"],"application/docbook+xml":["dbk"],"application/dssc+der":["dssc"],"application/dssc+xml":["xdssc"],"application/ecmascript":["ecma"],"application/emma+xml":["emma"],"application/epub+zip":["epub"],"application/exi":["exi"],"application/font-tdpfr":["pfr"],"application/font-woff":["woff"],"application/font-woff2":["woff2"],"application/gml+xml":["gml"],"application/gpx+xml":["gpx"],"application/gxf":["gxf"],"application/hyperstudio":["stk"],"application/inkml+xml":["ink","inkml"],"application/ipfix":["ipfix"],"application/java-archive":["jar"],"application/java-serialized-object":["ser"],"application/java-vm":["class"],"application/javascript":["js"],"application/json":["json","map"],"application/json5":["json5"],"application/jsonml+json":["jsonml"],"application/lost+xml":["lostxml"],"application/mac-binhex40":["hqx"],"application/mac-compactpro":["cpt"],"application/mads+xml":["mads"],"application/marc":["mrc"],"application/marcxml+xml":["mrcx"],"application/mathematica":["ma","nb","mb"],"application/mathml+xml":["mathml"],"application/mbox":["mbox"],"application/mediaservercontrol+xml":["mscml"],"application/metalink+xml":["metalink"],"application/metalink4+xml":["meta4"],"application/mets+xml":["mets"],"application/mods+xml":["mods"],"application/mp21":["m21","mp21"],"application/mp4":["mp4s","m4p"],"application/msword":["doc","dot"],"application/mxf":["mxf"],"application/octet-stream":["bin","dms","lrf","mar","so","dist","distz","pkg","bpk","dump","elc","deploy","buffer"],"application/oda":["oda"],"application/oebps-package+xml":["opf"],"application/ogg":["ogx"],"application/omdoc+xml":["omdoc"],"application/onenote":["onetoc","onetoc2","onetmp","onepkg"],"application/oxps":["oxps"],"application/patch-ops-error+xml":["xer"],"application/pdf":["pdf"],"application/pgp-encrypted":["pgp"],"application/pgp-signature":["asc","sig"],"application/pics-rules":["prf"],"application/pkcs10":["p10"],"application/pkcs7-mime":["p7m","p7c"],"application/pkcs7-signature":["p7s"],"application/pkcs8":["p8"],"application/pkix-attr-cert":["ac"],"application/pkix-cert":["cer"],"application/pkix-crl":["crl"],"application/pkix-pkipath":["pkipath"],"application/pkixcmp":["pki"],"application/pls+xml":["pls"],"application/postscript":["ai","eps","ps"],"application/prs.cww":["cww"],"application/pskc+xml":["pskcxml"],"application/rdf+xml":["rdf"],"application/reginfo+xml":["rif"],"application/relax-ng-compact-syntax":["rnc"],"application/resource-lists+xml":["rl"],"application/resource-lists-diff+xml":["rld"],"application/rls-services+xml":["rs"],"application/rpki-ghostbusters":["gbr"],"application/rpki-manifest":["mft"],"application/rpki-roa":["roa"],"application/rsd+xml":["rsd"],"application/rss+xml":["rss"],"application/rtf":["rtf"],"application/sbml+xml":["sbml"],"application/scvp-cv-request":["scq"],"application/scvp-cv-response":["scs"],"application/scvp-vp-request":["spq"],"application/scvp-vp-response":["spp"],"application/sdp":["sdp"],"application/set-payment-initiation":["setpay"],"application/set-registration-initiation":["setreg"],"application/shf+xml":["shf"],"application/smil+xml":["smi","smil"],"application/sparql-query":["rq"],"application/sparql-results+xml":["srx"],"application/srgs":["gram"],"application/srgs+xml":["grxml"],"application/sru+xml":["sru"],"application/ssdl+xml":["ssdl"],"application/ssml+xml":["ssml"],"application/tei+xml":["tei","teicorpus"],"application/thraud+xml":["tfi"],"application/timestamped-data":["tsd"],"application/vnd.3gpp.pic-bw-large":["plb"],"application/vnd.3gpp.pic-bw-small":["psb"],"application/vnd.3gpp.pic-bw-var":["pvb"],"application/vnd.3gpp2.tcap":["tcap"],"application/vnd.3m.post-it-notes":["pwn"],"application/vnd.accpac.simply.aso":["aso"],"application/vnd.accpac.simply.imp":["imp"],"application/vnd.acucobol":["acu"],"application/vnd.acucorp":["atc","acutc"],"application/vnd.adobe.air-application-installer-package+zip":["air"],"application/vnd.adobe.formscentral.fcdt":["fcdt"],"application/vnd.adobe.fxp":["fxp","fxpl"],"application/vnd.adobe.xdp+xml":["xdp"],"application/vnd.adobe.xfdf":["xfdf"],"application/vnd.ahead.space":["ahead"],"application/vnd.airzip.filesecure.azf":["azf"],"application/vnd.airzip.filesecure.azs":["azs"],"application/vnd.amazon.ebook":["azw"],"application/vnd.americandynamics.acc":["acc"],"application/vnd.amiga.ami":["ami"],"application/vnd.android.package-archive":["apk"],"application/vnd.anser-web-certificate-issue-initiation":["cii"],"application/vnd.anser-web-funds-transfer-initiation":["fti"],"application/vnd.antix.game-component":["atx"],"application/vnd.apple.installer+xml":["mpkg"],"application/vnd.apple.mpegurl":["m3u8"],"application/vnd.aristanetworks.swi":["swi"],"application/vnd.astraea-software.iota":["iota"],"application/vnd.audiograph":["aep"],"application/vnd.blueice.multipass":["mpm"],"application/vnd.bmi":["bmi"],"application/vnd.businessobjects":["rep"],"application/vnd.chemdraw+xml":["cdxml"],"application/vnd.chipnuts.karaoke-mmd":["mmd"],"application/vnd.cinderella":["cdy"],"application/vnd.claymore":["cla"],"application/vnd.cloanto.rp9":["rp9"],"application/vnd.clonk.c4group":["c4g","c4d","c4f","c4p","c4u"],"application/vnd.cluetrust.cartomobile-config":["c11amc"],"application/vnd.cluetrust.cartomobile-config-pkg":["c11amz"],"application/vnd.commonspace":["csp"],"application/vnd.contact.cmsg":["cdbcmsg"],"application/vnd.cosmocaller":["cmc"],"application/vnd.crick.clicker":["clkx"],"application/vnd.crick.clicker.keyboard":["clkk"],"application/vnd.crick.clicker.palette":["clkp"],"application/vnd.crick.clicker.template":["clkt"],"application/vnd.crick.clicker.wordbank":["clkw"],"application/vnd.criticaltools.wbs+xml":["wbs"],"application/vnd.ctc-posml":["pml"],"application/vnd.cups-ppd":["ppd"],"application/vnd.curl.car":["car"],"application/vnd.curl.pcurl":["pcurl"],"application/vnd.dart":["dart"],"application/vnd.data-vision.rdz":["rdz"],"application/vnd.dece.data":["uvf","uvvf","uvd","uvvd"],"application/vnd.dece.ttml+xml":["uvt","uvvt"],"application/vnd.dece.unspecified":["uvx","uvvx"],"application/vnd.dece.zip":["uvz","uvvz"],"application/vnd.denovo.fcselayout-link":["fe_launch"],"application/vnd.dna":["dna"],"application/vnd.dolby.mlp":["mlp"],"application/vnd.dpgraph":["dpg"],"application/vnd.dreamfactory":["dfac"],"application/vnd.ds-keypoint":["kpxx"],"application/vnd.dvb.ait":["ait"],"application/vnd.dvb.service":["svc"],"application/vnd.dynageo":["geo"],"application/vnd.ecowin.chart":["mag"],"application/vnd.enliven":["nml"],"application/vnd.epson.esf":["esf"],"application/vnd.epson.msf":["msf"],"application/vnd.epson.quickanime":["qam"],"application/vnd.epson.salt":["slt"],"application/vnd.epson.ssf":["ssf"],"application/vnd.eszigno3+xml":["es3","et3"],"application/vnd.ezpix-album":["ez2"],"application/vnd.ezpix-package":["ez3"],"application/vnd.fdf":["fdf"],"application/vnd.fdsn.mseed":["mseed"],"application/vnd.fdsn.seed":["seed","dataless"],"application/vnd.flographit":["gph"],"application/vnd.fluxtime.clip":["ftc"],"application/vnd.framemaker":["fm","frame","maker","book"],"application/vnd.frogans.fnc":["fnc"],"application/vnd.frogans.ltf":["ltf"],"application/vnd.fsc.weblaunch":["fsc"],"application/vnd.fujitsu.oasys":["oas"],"application/vnd.fujitsu.oasys2":["oa2"],"application/vnd.fujitsu.oasys3":["oa3"],"application/vnd.fujitsu.oasysgp":["fg5"],"application/vnd.fujitsu.oasysprs":["bh2"],"application/vnd.fujixerox.ddd":["ddd"],"application/vnd.fujixerox.docuworks":["xdw"],"application/vnd.fujixerox.docuworks.binder":["xbd"],"application/vnd.fuzzysheet":["fzs"],"application/vnd.genomatix.tuxedo":["txd"],"application/vnd.geogebra.file":["ggb"],"application/vnd.geogebra.tool":["ggt"],"application/vnd.geometry-explorer":["gex","gre"],"application/vnd.geonext":["gxt"],"application/vnd.geoplan":["g2w"],"application/vnd.geospace":["g3w"],"application/vnd.gmx":["gmx"],"application/vnd.google-earth.kml+xml":["kml"],"application/vnd.google-earth.kmz":["kmz"],"application/vnd.grafeq":["gqf","gqs"],"application/vnd.groove-account":["gac"],"application/vnd.groove-help":["ghf"],"application/vnd.groove-identity-message":["gim"],"application/vnd.groove-injector":["grv"],"application/vnd.groove-tool-message":["gtm"],"application/vnd.groove-tool-template":["tpl"],"application/vnd.groove-vcard":["vcg"],"application/vnd.hal+xml":["hal"],"application/vnd.handheld-entertainment+xml":["zmm"],"application/vnd.hbci":["hbci"],"application/vnd.hhe.lesson-player":["les"],"application/vnd.hp-hpgl":["hpgl"],"application/vnd.hp-hpid":["hpid"],"application/vnd.hp-hps":["hps"],"application/vnd.hp-jlyt":["jlt"],"application/vnd.hp-pcl":["pcl"],"application/vnd.hp-pclxl":["pclxl"],"application/vnd.ibm.minipay":["mpy"],"application/vnd.ibm.modcap":["afp","listafp","list3820"],"application/vnd.ibm.rights-management":["irm"],"application/vnd.ibm.secure-container":["sc"],"application/vnd.iccprofile":["icc","icm"],"application/vnd.igloader":["igl"],"application/vnd.immervision-ivp":["ivp"],"application/vnd.immervision-ivu":["ivu"],"application/vnd.insors.igm":["igm"],"application/vnd.intercon.formnet":["xpw","xpx"],"application/vnd.intergeo":["i2g"],"application/vnd.intu.qbo":["qbo"],"application/vnd.intu.qfx":["qfx"],"application/vnd.ipunplugged.rcprofile":["rcprofile"],"application/vnd.irepository.package+xml":["irp"],"application/vnd.is-xpr":["xpr"],"application/vnd.isac.fcs":["fcs"],"application/vnd.jam":["jam"],"application/vnd.jcp.javame.midlet-rms":["rms"],"application/vnd.jisp":["jisp"],"application/vnd.joost.joda-archive":["joda"],"application/vnd.kahootz":["ktz","ktr"],"application/vnd.kde.karbon":["karbon"],"application/vnd.kde.kchart":["chrt"],"application/vnd.kde.kformula":["kfo"],"application/vnd.kde.kivio":["flw"],"application/vnd.kde.kontour":["kon"],"application/vnd.kde.kpresenter":["kpr","kpt"],"application/vnd.kde.kspread":["ksp"],"application/vnd.kde.kword":["kwd","kwt"],"application/vnd.kenameaapp":["htke"],"application/vnd.kidspiration":["kia"],"application/vnd.kinar":["kne","knp"],"application/vnd.koan":["skp","skd","skt","skm"],"application/vnd.kodak-descriptor":["sse"],"application/vnd.las.las+xml":["lasxml"],"application/vnd.llamagraphics.life-balance.desktop":["lbd"],"application/vnd.llamagraphics.life-balance.exchange+xml":["lbe"],"application/vnd.lotus-1-2-3":["123"],"application/vnd.lotus-approach":["apr"],"application/vnd.lotus-freelance":["pre"],"application/vnd.lotus-notes":["nsf"],"application/vnd.lotus-organizer":["org"],"application/vnd.lotus-screencam":["scm"],"application/vnd.lotus-wordpro":["lwp"],"application/vnd.macports.portpkg":["portpkg"],"application/vnd.mcd":["mcd"],"application/vnd.medcalcdata":["mc1"],"application/vnd.mediastation.cdkey":["cdkey"],"application/vnd.mfer":["mwf"],"application/vnd.mfmp":["mfm"],"application/vnd.micrografx.flo":["flo"],"application/vnd.micrografx.igx":["igx"],"application/vnd.mif":["mif"],"application/vnd.mobius.daf":["daf"],"application/vnd.mobius.dis":["dis"],"application/vnd.mobius.mbk":["mbk"],"application/vnd.mobius.mqy":["mqy"],"application/vnd.mobius.msl":["msl"],"application/vnd.mobius.plc":["plc"],"application/vnd.mobius.txf":["txf"],"application/vnd.mophun.application":["mpn"],"application/vnd.mophun.certificate":["mpc"],"application/vnd.mozilla.xul+xml":["xul"],"application/vnd.ms-artgalry":["cil"],"application/vnd.ms-cab-compressed":["cab"],"application/vnd.ms-excel":["xls","xlm","xla","xlc","xlt","xlw"],"application/vnd.ms-excel.addin.macroenabled.12":["xlam"],"application/vnd.ms-excel.sheet.binary.macroenabled.12":["xlsb"],"application/vnd.ms-excel.sheet.macroenabled.12":["xlsm"],"application/vnd.ms-excel.template.macroenabled.12":["xltm"],"application/vnd.ms-fontobject":["eot"],"application/vnd.ms-htmlhelp":["chm"],"application/vnd.ms-ims":["ims"],"application/vnd.ms-lrm":["lrm"],"application/vnd.ms-officetheme":["thmx"],"application/vnd.ms-pki.seccat":["cat"],"application/vnd.ms-pki.stl":["stl"],"application/vnd.ms-powerpoint":["ppt","pps","pot"],"application/vnd.ms-powerpoint.addin.macroenabled.12":["ppam"],"application/vnd.ms-powerpoint.presentation.macroenabled.12":["pptm"],"application/vnd.ms-powerpoint.slide.macroenabled.12":["sldm"],"application/vnd.ms-powerpoint.slideshow.macroenabled.12":["ppsm"],"application/vnd.ms-powerpoint.template.macroenabled.12":["potm"],"application/vnd.ms-project":["mpp","mpt"],"application/vnd.ms-word.document.macroenabled.12":["docm"],"application/vnd.ms-word.template.macroenabled.12":["dotm"],"application/vnd.ms-works":["wps","wks","wcm","wdb"],"application/vnd.ms-wpl":["wpl"],"application/vnd.ms-xpsdocument":["xps"],"application/vnd.mseq":["mseq"],"application/vnd.musician":["mus"],"application/vnd.muvee.style":["msty"],"application/vnd.mynfc":["taglet"],"application/vnd.neurolanguage.nlu":["nlu"],"application/vnd.nitf":["ntf","nitf"],"application/vnd.noblenet-directory":["nnd"],"application/vnd.noblenet-sealer":["nns"],"application/vnd.noblenet-web":["nnw"],"application/vnd.nokia.n-gage.data":["ngdat"],"application/vnd.nokia.radio-preset":["rpst"],"application/vnd.nokia.radio-presets":["rpss"],"application/vnd.novadigm.edm":["edm"],"application/vnd.novadigm.edx":["edx"],"application/vnd.novadigm.ext":["ext"],"application/vnd.oasis.opendocument.chart":["odc"],"application/vnd.oasis.opendocument.chart-template":["otc"],"application/vnd.oasis.opendocument.database":["odb"],"application/vnd.oasis.opendocument.formula":["odf"],"application/vnd.oasis.opendocument.formula-template":["odft"],"application/vnd.oasis.opendocument.graphics":["odg"],"application/vnd.oasis.opendocument.graphics-template":["otg"],"application/vnd.oasis.opendocument.image":["odi"],"application/vnd.oasis.opendocument.image-template":["oti"],"application/vnd.oasis.opendocument.presentation":["odp"],"application/vnd.oasis.opendocument.presentation-template":["otp"],"application/vnd.oasis.opendocument.spreadsheet":["ods"],"application/vnd.oasis.opendocument.spreadsheet-template":["ots"],"application/vnd.oasis.opendocument.text":["odt"],"application/vnd.oasis.opendocument.text-master":["odm"],"application/vnd.oasis.opendocument.text-template":["ott"],"application/vnd.oasis.opendocument.text-web":["oth"],"application/vnd.olpc-sugar":["xo"],"application/vnd.oma.dd2+xml":["dd2"],"application/vnd.openofficeorg.extension":["oxt"],"application/vnd.openxmlformats-officedocument.presentationml.presentation":["pptx"],"application/vnd.openxmlformats-officedocument.presentationml.slide":["sldx"],"application/vnd.openxmlformats-officedocument.presentationml.slideshow":["ppsx"],"application/vnd.openxmlformats-officedocument.presentationml.template":["potx"],"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":["xlsx"],"application/vnd.openxmlformats-officedocument.spreadsheetml.template":["xltx"],"application/vnd.openxmlformats-officedocument.wordprocessingml.document":["docx"],"application/vnd.openxmlformats-officedocument.wordprocessingml.template":["dotx"],"application/vnd.osgeo.mapguide.package":["mgp"],"application/vnd.osgi.dp":["dp"],"application/vnd.osgi.subsystem":["esa"],"application/vnd.palm":["pdb","pqa","oprc"],"application/vnd.pawaafile":["paw"],"application/vnd.pg.format":["str"],"application/vnd.pg.osasli":["ei6"],"application/vnd.picsel":["efif"],"application/vnd.pmi.widget":["wg"],"application/vnd.pocketlearn":["plf"],"application/vnd.powerbuilder6":["pbd"],"application/vnd.previewsystems.box":["box"],"application/vnd.proteus.magazine":["mgz"],"application/vnd.publishare-delta-tree":["qps"],"application/vnd.pvi.ptid1":["ptid"],"application/vnd.quark.quarkxpress":["qxd","qxt","qwd","qwt","qxl","qxb"],"application/vnd.realvnc.bed":["bed"],"application/vnd.recordare.musicxml":["mxl"],"application/vnd.recordare.musicxml+xml":["musicxml"],"application/vnd.rig.cryptonote":["cryptonote"],"application/vnd.rim.cod":["cod"],"application/vnd.rn-realmedia":["rm"],"application/vnd.rn-realmedia-vbr":["rmvb"],"application/vnd.route66.link66+xml":["link66"],"application/vnd.sailingtracker.track":["st"],"application/vnd.seemail":["see"],"application/vnd.sema":["sema"],"application/vnd.semd":["semd"],"application/vnd.semf":["semf"],"application/vnd.shana.informed.formdata":["ifm"],"application/vnd.shana.informed.formtemplate":["itp"],"application/vnd.shana.informed.interchange":["iif"],"application/vnd.shana.informed.package":["ipk"],"application/vnd.simtech-mindmapper":["twd","twds"],"application/vnd.smaf":["mmf"],"application/vnd.smart.teacher":["teacher"],"application/vnd.solent.sdkm+xml":["sdkm","sdkd"],"application/vnd.spotfire.dxp":["dxp"],"application/vnd.spotfire.sfs":["sfs"],"application/vnd.stardivision.calc":["sdc"],"application/vnd.stardivision.draw":["sda"],"application/vnd.stardivision.impress":["sdd"],"application/vnd.stardivision.math":["smf"],"application/vnd.stardivision.writer":["sdw","vor"],"application/vnd.stardivision.writer-global":["sgl"],"application/vnd.stepmania.package":["smzip"],"application/vnd.stepmania.stepchart":["sm"],"application/vnd.sun.xml.calc":["sxc"],"application/vnd.sun.xml.calc.template":["stc"],"application/vnd.sun.xml.draw":["sxd"],"application/vnd.sun.xml.draw.template":["std"],"application/vnd.sun.xml.impress":["sxi"],"application/vnd.sun.xml.impress.template":["sti"],"application/vnd.sun.xml.math":["sxm"],"application/vnd.sun.xml.writer":["sxw"],"application/vnd.sun.xml.writer.global":["sxg"],"application/vnd.sun.xml.writer.template":["stw"],"application/vnd.sus-calendar":["sus","susp"],"application/vnd.svd":["svd"],"application/vnd.symbian.install":["sis","sisx"],"application/vnd.syncml+xml":["xsm"],"application/vnd.syncml.dm+wbxml":["bdm"],"application/vnd.syncml.dm+xml":["xdm"],"application/vnd.tao.intent-module-archive":["tao"],"application/vnd.tcpdump.pcap":["pcap","cap","dmp"],"application/vnd.tmobile-livetv":["tmo"],"application/vnd.trid.tpt":["tpt"],"application/vnd.triscape.mxs":["mxs"],"application/vnd.trueapp":["tra"],"application/vnd.ufdl":["ufd","ufdl"],"application/vnd.uiq.theme":["utz"],"application/vnd.umajin":["umj"],"application/vnd.unity":["unityweb"],"application/vnd.uoml+xml":["uoml"],"application/vnd.vcx":["vcx"],"application/vnd.visio":["vsd","vst","vss","vsw"],"application/vnd.visionary":["vis"],"application/vnd.vsf":["vsf"],"application/vnd.wap.wbxml":["wbxml"],"application/vnd.wap.wmlc":["wmlc"],"application/vnd.wap.wmlscriptc":["wmlsc"],"application/vnd.webturbo":["wtb"],"application/vnd.wolfram.player":["nbp"],"application/vnd.wordperfect":["wpd"],"application/vnd.wqd":["wqd"],"application/vnd.wt.stf":["stf"],"application/vnd.xara":["xar"],"application/vnd.xfdl":["xfdl"],"application/vnd.yamaha.hv-dic":["hvd"],"application/vnd.yamaha.hv-script":["hvs"],"application/vnd.yamaha.hv-voice":["hvp"],"application/vnd.yamaha.openscoreformat":["osf"],"application/vnd.yamaha.openscoreformat.osfpvg+xml":["osfpvg"],"application/vnd.yamaha.smaf-audio":["saf"],"application/vnd.yamaha.smaf-phrase":["spf"],"application/vnd.yellowriver-custom-menu":["cmp"],"application/vnd.zul":["zir","zirz"],"application/vnd.zzazz.deck+xml":["zaz"],"application/voicexml+xml":["vxml"],"application/widget":["wgt"],"application/winhlp":["hlp"],"application/wsdl+xml":["wsdl"],"application/wspolicy+xml":["wspolicy"],"application/x-7z-compressed":["7z"],"application/x-abiword":["abw"],"application/x-ace-compressed":["ace"],"application/x-apple-diskimage":["dmg"],"application/x-authorware-bin":["aab","x32","u32","vox"],"application/x-authorware-map":["aam"],"application/x-authorware-seg":["aas"],"application/x-bcpio":["bcpio"],"application/x-bittorrent":["torrent"],"application/x-blorb":["blb","blorb"],"application/x-bzip":["bz"],"application/x-bzip2":["bz2","boz"],"application/x-cbr":["cbr","cba","cbt","cbz","cb7"],"application/x-cdlink":["vcd"],"application/x-cfs-compressed":["cfs"],"application/x-chat":["chat"],"application/x-chess-pgn":["pgn"],"application/x-chrome-extension":["crx"],"application/x-conference":["nsc"],"application/x-cpio":["cpio"],"application/x-csh":["csh"],"application/x-debian-package":["deb","udeb"],"application/x-dgc-compressed":["dgc"],"application/x-director":["dir","dcr","dxr","cst","cct","cxt","w3d","fgd","swa"],"application/x-doom":["wad"],"application/x-dtbncx+xml":["ncx"],"application/x-dtbook+xml":["dtb"],"application/x-dtbresource+xml":["res"],"application/x-dvi":["dvi"],"application/x-envoy":["evy"],"application/x-eva":["eva"],"application/x-font-bdf":["bdf"],"application/x-font-ghostscript":["gsf"],"application/x-font-linux-psf":["psf"],"application/x-font-otf":["otf"],"application/x-font-pcf":["pcf"],"application/x-font-snf":["snf"],"application/x-font-ttf":["ttf","ttc"],"application/x-font-type1":["pfa","pfb","pfm","afm"],"application/x-freearc":["arc"],"application/x-futuresplash":["spl"],"application/x-gca-compressed":["gca"],"application/x-glulx":["ulx"],"application/x-gnumeric":["gnumeric"],"application/x-gramps-xml":["gramps"],"application/x-gtar":["gtar"],"application/x-hdf":["hdf"],"application/x-install-instructions":["install"],"application/x-iso9660-image":["iso"],"application/x-java-jnlp-file":["jnlp"],"application/x-latex":["latex"],"application/x-lua-bytecode":["luac"],"application/x-lzh-compressed":["lzh","lha"],"application/x-mie":["mie"],"application/x-mobipocket-ebook":["prc","mobi"],"application/x-ms-application":["application"],"application/x-ms-shortcut":["lnk"],"application/x-ms-wmd":["wmd"],"application/x-ms-wmz":["wmz"],"application/x-ms-xbap":["xbap"],"application/x-msaccess":["mdb"],"application/x-msbinder":["obd"],"application/x-mscardfile":["crd"],"application/x-msclip":["clp"],"application/x-msdownload":["exe","dll","com","bat","msi"],"application/x-msmediaview":["mvb","m13","m14"],"application/x-msmetafile":["wmf","wmz","emf","emz"],"application/x-msmoney":["mny"],"application/x-mspublisher":["pub"],"application/x-msschedule":["scd"],"application/x-msterminal":["trm"],"application/x-mswrite":["wri"],"application/x-netcdf":["nc","cdf"],"application/x-nzb":["nzb"],"application/x-pkcs12":["p12","pfx"],"application/x-pkcs7-certificates":["p7b","spc"],"application/x-pkcs7-certreqresp":["p7r"],"application/x-rar-compressed":["rar"],"application/x-research-info-systems":["ris"],"application/x-sh":["sh"],"application/x-shar":["shar"],"application/x-shockwave-flash":["swf"],"application/x-silverlight-app":["xap"],"application/x-sql":["sql"],"application/x-stuffit":["sit"],"application/x-stuffitx":["sitx"],"application/x-subrip":["srt"],"application/x-sv4cpio":["sv4cpio"],"application/x-sv4crc":["sv4crc"],"application/x-t3vm-image":["t3"],"application/x-tads":["gam"],"application/x-tar":["tar"],"application/x-tcl":["tcl"],"application/x-tex":["tex"],"application/x-tex-tfm":["tfm"],"application/x-texinfo":["texinfo","texi"],"application/x-tgif":["obj"],"application/x-ustar":["ustar"],"application/x-wais-source":["src"],"application/x-web-app-manifest+json":["webapp"],"application/x-x509-ca-cert":["der","crt"],"application/x-xfig":["fig"],"application/x-xliff+xml":["xlf"],"application/x-xpinstall":["xpi"],"application/x-xz":["xz"],"application/x-zmachine":["z1","z2","z3","z4","z5","z6","z7","z8"],"application/xaml+xml":["xaml"],"application/xcap-diff+xml":["xdf"],"application/xenc+xml":["xenc"],"application/xhtml+xml":["xhtml","xht"],"application/xml":["xml","xsl","xsd"],"application/xml-dtd":["dtd"],"application/xop+xml":["xop"],"application/xproc+xml":["xpl"],"application/xslt+xml":["xslt"],"application/xspf+xml":["xspf"],"application/xv+xml":["mxml","xhvml","xvml","xvm"],"application/yang":["yang"],"application/yin+xml":["yin"],"application/zip":["zip"],"audio/adpcm":["adp"],"audio/basic":["au","snd"],"audio/midi":["mid","midi","kar","rmi"],"audio/mp4":["mp4a","m4a"],"audio/mpeg":["mpga","mp2","mp2a","mp3","m2a","m3a"],"audio/ogg":["oga","ogg","spx"],"audio/s3m":["s3m"],"audio/silk":["sil"],"audio/vnd.dece.audio":["uva","uvva"],"audio/vnd.digital-winds":["eol"],"audio/vnd.dra":["dra"],"audio/vnd.dts":["dts"],"audio/vnd.dts.hd":["dtshd"],"audio/vnd.lucent.voice":["lvp"],"audio/vnd.ms-playready.media.pya":["pya"],"audio/vnd.nuera.ecelp4800":["ecelp4800"],"audio/vnd.nuera.ecelp7470":["ecelp7470"],"audio/vnd.nuera.ecelp9600":["ecelp9600"],"audio/vnd.rip":["rip"],"audio/webm":["weba"],"audio/x-aac":["aac"],"audio/x-aiff":["aif","aiff","aifc"],"audio/x-caf":["caf"],"audio/x-flac":["flac"],"audio/x-matroska":["mka"],"audio/x-mpegurl":["m3u"],"audio/x-ms-wax":["wax"],"audio/x-ms-wma":["wma"],"audio/x-pn-realaudio":["ram","ra"],"audio/x-pn-realaudio-plugin":["rmp"],"audio/x-wav":["wav"],"audio/xm":["xm"],"chemical/x-cdx":["cdx"],"chemical/x-cif":["cif"],"chemical/x-cmdf":["cmdf"],"chemical/x-cml":["cml"],"chemical/x-csml":["csml"],"chemical/x-xyz":["xyz"],"font/opentype":["otf"],"image/bmp":["bmp"],"image/cgm":["cgm"],"image/g3fax":["g3"],"image/gif":["gif"],"image/ief":["ief"],"image/jpeg":["jpeg","jpg","jpe"],"image/ktx":["ktx"],"image/png":["png"],"image/prs.btif":["btif"],"image/sgi":["sgi"],"image/svg+xml":["svg","svgz"],"image/tiff":["tiff","tif"],"image/vnd.adobe.photoshop":["psd"],"image/vnd.dece.graphic":["uvi","uvvi","uvg","uvvg"],"image/vnd.djvu":["djvu","djv"],"image/vnd.dvb.subtitle":["sub"],"image/vnd.dwg":["dwg"],"image/vnd.dxf":["dxf"],"image/vnd.fastbidsheet":["fbs"],"image/vnd.fpx":["fpx"],"image/vnd.fst":["fst"],"image/vnd.fujixerox.edmics-mmr":["mmr"],"image/vnd.fujixerox.edmics-rlc":["rlc"],"image/vnd.ms-modi":["mdi"],"image/vnd.ms-photo":["wdp"],"image/vnd.net-fpx":["npx"],"image/vnd.wap.wbmp":["wbmp"],"image/vnd.xiff":["xif"],"image/webp":["webp"],"image/x-3ds":["3ds"],"image/x-cmu-raster":["ras"],"image/x-cmx":["cmx"],"image/x-freehand":["fh","fhc","fh4","fh5","fh7"],"image/x-icon":["ico"],"image/x-mrsid-image":["sid"],"image/x-pcx":["pcx"],"image/x-pict":["pic","pct"],"image/x-portable-anymap":["pnm"],"image/x-portable-bitmap":["pbm"],"image/x-portable-graymap":["pgm"],"image/x-portable-pixmap":["ppm"],"image/x-rgb":["rgb"],"image/x-tga":["tga"],"image/x-xbitmap":["xbm"],"image/x-xpixmap":["xpm"],"image/x-xwindowdump":["xwd"],"message/rfc822":["eml","mime"],"model/iges":["igs","iges"],"model/mesh":["msh","mesh","silo"],"model/vnd.collada+xml":["dae"],"model/vnd.dwf":["dwf"],"model/vnd.gdl":["gdl"],"model/vnd.gtw":["gtw"],"model/vnd.mts":["mts"],"model/vnd.vtu":["vtu"],"model/vrml":["wrl","vrml"],"model/x3d+binary":["x3db","x3dbz"],"model/x3d+vrml":["x3dv","x3dvz"],"model/x3d+xml":["x3d","x3dz"],"text/cache-manifest":["appcache","manifest"],"text/calendar":["ics","ifb"],"text/coffeescript":["coffee"],"text/css":["css"],"text/csv":["csv"],"text/hjson":["hjson"],"text/html":["html","htm"],"text/jade":["jade"],"text/jsx":["jsx"],"text/less":["less"],"text/n3":["n3"],"text/plain":["txt","text","conf","def","list","log","in","ini"],"text/prs.lines.tag":["dsc"],"text/richtext":["rtx"],"text/sgml":["sgml","sgm"],"text/stylus":["stylus","styl"],"text/tab-separated-values":["tsv"],"text/troff":["t","tr","roff","man","me","ms"],"text/turtle":["ttl"],"text/uri-list":["uri","uris","urls"],"text/vcard":["vcard"],"text/vnd.curl":["curl"],"text/vnd.curl.dcurl":["dcurl"],"text/vnd.curl.mcurl":["mcurl"],"text/vnd.curl.scurl":["scurl"],"text/vnd.dvb.subtitle":["sub"],"text/vnd.fly":["fly"],"text/vnd.fmi.flexstor":["flx"],"text/vnd.graphviz":["gv"],"text/vnd.in3d.3dml":["3dml"],"text/vnd.in3d.spot":["spot"],"text/vnd.sun.j2me.app-descriptor":["jad"],"text/vnd.wap.wml":["wml"],"text/vnd.wap.wmlscript":["wmls"],"text/vtt":["vtt"],"text/x-asm":["s","asm"],"text/x-c":["c","cc","cxx","cpp","h","hh","dic"],"text/x-component":["htc"],"text/x-fortran":["f","for","f77","f90"],"text/x-handlebars-template":["hbs"],"text/x-java-source":["java"],"text/x-lua":["lua"],"text/x-markdown":["markdown","md","mkd"],"text/x-nfo":["nfo"],"text/x-opml":["opml"],"text/x-pascal":["p","pas"],"text/x-sass":["sass"],"text/x-scss":["scss"],"text/x-setext":["etx"],"text/x-sfv":["sfv"],"text/x-uuencode":["uu"],"text/x-vcalendar":["vcs"],"text/x-vcard":["vcf"],"text/yaml":["yaml","yml"],"video/3gpp":["3gp"],"video/3gpp2":["3g2"],"video/h261":["h261"],"video/h263":["h263"],"video/h264":["h264"],"video/jpeg":["jpgv"],"video/jpm":["jpm","jpgm"],"video/mj2":["mj2","mjp2"],"video/mp2t":["ts"],"video/mp4":["mp4","mp4v","mpg4"],"video/mpeg":["mpeg","mpg","mpe","m1v","m2v"],"video/ogg":["ogv"],"video/quicktime":["qt","mov"],"video/vnd.dece.hd":["uvh","uvvh"],"video/vnd.dece.mobile":["uvm","uvvm"],"video/vnd.dece.pd":["uvp","uvvp"],"video/vnd.dece.sd":["uvs","uvvs"],"video/vnd.dece.video":["uvv","uvvv"],"video/vnd.dvb.file":["dvb"],"video/vnd.fvt":["fvt"],"video/vnd.mpegurl":["mxu","m4u"],"video/vnd.ms-playready.media.pyv":["pyv"],"video/vnd.uvvu.mp4":["uvu","uvvu"],"video/vnd.vivo":["viv"],"video/webm":["webm"],"video/x-f4v":["f4v"],"video/x-fli":["fli"],"video/x-flv":["flv"],"video/x-m4v":["m4v"],"video/x-matroska":["mkv","mk3d","mks"],"video/x-mng":["mng"],"video/x-ms-asf":["asf","asx"],"video/x-ms-vob":["vob"],"video/x-ms-wm":["wm"],"video/x-ms-wmv":["wmv"],"video/x-ms-wmx":["wmx"],"video/x-ms-wvx":["wvx"],"video/x-msvideo":["avi"],"video/x-sgi-movie":["movie"],"video/x-smv":["smv"],"x-conference/x-cooltalk":["ice"]}

/***/ }),
/* 59 */
/***/ (function(module, exports) {

module.exports = require("ms");

/***/ }),
/* 60 */
/***/ (function(module, exports) {

module.exports = require("util");

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * forwarded
 * Copyright(c) 2014-2017 Douglas Christopher Wilson
 * MIT Licensed
 */



/**
 * Module exports.
 * @public
 */

module.exports = forwarded

/**
 * Get all addresses in the request, using the `X-Forwarded-For` header.
 *
 * @param {object} req
 * @return {array}
 * @public
 */

function forwarded (req) {
  if (!req) {
    throw new TypeError('argument req is required')
  }

  // simple header parsing
  var proxyAddrs = parse(req.headers['x-forwarded-for'] || '')
  var socketAddr = req.connection.remoteAddress
  var addrs = [socketAddr].concat(proxyAddrs)

  // return all addresses
  return addrs
}

/**
 * Parse the X-Forwarded-For header.
 *
 * @param {string} header
 * @private
 */

function parse (header) {
  var end = header.length
  var list = []
  var start = header.length

  // gather addresses, backwards
  for (var i = header.length - 1; i >= 0; i--) {
    switch (header.charCodeAt(i)) {
      case 0x20: /*   */
        if (start === end) {
          start = end = i
        }
        break
      case 0x2c: /* , */
        if (start !== end) {
          list.push(header.substring(start, end))
        }
        start = end = i
        break
      default:
        start = i
        break
    }
  }

  // final address
  if (start !== end) {
    list.push(header.substring(start, end))
  }

  return list
}


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {(function() {
  var expandIPv6, ipaddr, ipv4Part, ipv4Regexes, ipv6Part, ipv6Regexes, matchCIDR, root;

  ipaddr = {};

  root = this;

  if ((typeof module !== "undefined" && module !== null) && module.exports) {
    module.exports = ipaddr;
  } else {
    root['ipaddr'] = ipaddr;
  }

  matchCIDR = function(first, second, partSize, cidrBits) {
    var part, shift;
    if (first.length !== second.length) {
      throw new Error("ipaddr: cannot match CIDR for objects with different lengths");
    }
    part = 0;
    while (cidrBits > 0) {
      shift = partSize - cidrBits;
      if (shift < 0) {
        shift = 0;
      }
      if (first[part] >> shift !== second[part] >> shift) {
        return false;
      }
      cidrBits -= partSize;
      part += 1;
    }
    return true;
  };

  ipaddr.subnetMatch = function(address, rangeList, defaultName) {
    var k, len, rangeName, rangeSubnets, subnet;
    if (defaultName == null) {
      defaultName = 'unicast';
    }
    for (rangeName in rangeList) {
      rangeSubnets = rangeList[rangeName];
      if (rangeSubnets[0] && !(rangeSubnets[0] instanceof Array)) {
        rangeSubnets = [rangeSubnets];
      }
      for (k = 0, len = rangeSubnets.length; k < len; k++) {
        subnet = rangeSubnets[k];
        if (address.match.apply(address, subnet)) {
          return rangeName;
        }
      }
    }
    return defaultName;
  };

  ipaddr.IPv4 = (function() {
    function IPv4(octets) {
      var k, len, octet;
      if (octets.length !== 4) {
        throw new Error("ipaddr: ipv4 octet count should be 4");
      }
      for (k = 0, len = octets.length; k < len; k++) {
        octet = octets[k];
        if (!((0 <= octet && octet <= 255))) {
          throw new Error("ipaddr: ipv4 octet should fit in 8 bits");
        }
      }
      this.octets = octets;
    }

    IPv4.prototype.kind = function() {
      return 'ipv4';
    };

    IPv4.prototype.toString = function() {
      return this.octets.join(".");
    };

    IPv4.prototype.toByteArray = function() {
      return this.octets.slice(0);
    };

    IPv4.prototype.match = function(other, cidrRange) {
      var ref;
      if (cidrRange === void 0) {
        ref = other, other = ref[0], cidrRange = ref[1];
      }
      if (other.kind() !== 'ipv4') {
        throw new Error("ipaddr: cannot match ipv4 address with non-ipv4 one");
      }
      return matchCIDR(this.octets, other.octets, 8, cidrRange);
    };

    IPv4.prototype.SpecialRanges = {
      unspecified: [[new IPv4([0, 0, 0, 0]), 8]],
      broadcast: [[new IPv4([255, 255, 255, 255]), 32]],
      multicast: [[new IPv4([224, 0, 0, 0]), 4]],
      linkLocal: [[new IPv4([169, 254, 0, 0]), 16]],
      loopback: [[new IPv4([127, 0, 0, 0]), 8]],
      carrierGradeNat: [[new IPv4([100, 64, 0, 0]), 10]],
      "private": [[new IPv4([10, 0, 0, 0]), 8], [new IPv4([172, 16, 0, 0]), 12], [new IPv4([192, 168, 0, 0]), 16]],
      reserved: [[new IPv4([192, 0, 0, 0]), 24], [new IPv4([192, 0, 2, 0]), 24], [new IPv4([192, 88, 99, 0]), 24], [new IPv4([198, 51, 100, 0]), 24], [new IPv4([203, 0, 113, 0]), 24], [new IPv4([240, 0, 0, 0]), 4]]
    };

    IPv4.prototype.range = function() {
      return ipaddr.subnetMatch(this, this.SpecialRanges);
    };

    IPv4.prototype.toIPv4MappedAddress = function() {
      return ipaddr.IPv6.parse("::ffff:" + (this.toString()));
    };

    IPv4.prototype.prefixLengthFromSubnetMask = function() {
      var cidr, i, k, octet, stop, zeros, zerotable;
      zerotable = {
        0: 8,
        128: 7,
        192: 6,
        224: 5,
        240: 4,
        248: 3,
        252: 2,
        254: 1,
        255: 0
      };
      cidr = 0;
      stop = false;
      for (i = k = 3; k >= 0; i = k += -1) {
        octet = this.octets[i];
        if (octet in zerotable) {
          zeros = zerotable[octet];
          if (stop && zeros !== 0) {
            return null;
          }
          if (zeros !== 8) {
            stop = true;
          }
          cidr += zeros;
        } else {
          return null;
        }
      }
      return 32 - cidr;
    };

    return IPv4;

  })();

  ipv4Part = "(0?\\d+|0x[a-f0-9]+)";

  ipv4Regexes = {
    fourOctet: new RegExp("^" + ipv4Part + "\\." + ipv4Part + "\\." + ipv4Part + "\\." + ipv4Part + "$", 'i'),
    longValue: new RegExp("^" + ipv4Part + "$", 'i')
  };

  ipaddr.IPv4.parser = function(string) {
    var match, parseIntAuto, part, shift, value;
    parseIntAuto = function(string) {
      if (string[0] === "0" && string[1] !== "x") {
        return parseInt(string, 8);
      } else {
        return parseInt(string);
      }
    };
    if (match = string.match(ipv4Regexes.fourOctet)) {
      return (function() {
        var k, len, ref, results;
        ref = match.slice(1, 6);
        results = [];
        for (k = 0, len = ref.length; k < len; k++) {
          part = ref[k];
          results.push(parseIntAuto(part));
        }
        return results;
      })();
    } else if (match = string.match(ipv4Regexes.longValue)) {
      value = parseIntAuto(match[1]);
      if (value > 0xffffffff || value < 0) {
        throw new Error("ipaddr: address outside defined range");
      }
      return ((function() {
        var k, results;
        results = [];
        for (shift = k = 0; k <= 24; shift = k += 8) {
          results.push((value >> shift) & 0xff);
        }
        return results;
      })()).reverse();
    } else {
      return null;
    }
  };

  ipaddr.IPv6 = (function() {
    function IPv6(parts) {
      var i, k, l, len, part, ref;
      if (parts.length === 16) {
        this.parts = [];
        for (i = k = 0; k <= 14; i = k += 2) {
          this.parts.push((parts[i] << 8) | parts[i + 1]);
        }
      } else if (parts.length === 8) {
        this.parts = parts;
      } else {
        throw new Error("ipaddr: ipv6 part count should be 8 or 16");
      }
      ref = this.parts;
      for (l = 0, len = ref.length; l < len; l++) {
        part = ref[l];
        if (!((0 <= part && part <= 0xffff))) {
          throw new Error("ipaddr: ipv6 part should fit in 16 bits");
        }
      }
    }

    IPv6.prototype.kind = function() {
      return 'ipv6';
    };

    IPv6.prototype.toString = function() {
      var compactStringParts, k, len, part, pushPart, state, stringParts;
      stringParts = (function() {
        var k, len, ref, results;
        ref = this.parts;
        results = [];
        for (k = 0, len = ref.length; k < len; k++) {
          part = ref[k];
          results.push(part.toString(16));
        }
        return results;
      }).call(this);
      compactStringParts = [];
      pushPart = function(part) {
        return compactStringParts.push(part);
      };
      state = 0;
      for (k = 0, len = stringParts.length; k < len; k++) {
        part = stringParts[k];
        switch (state) {
          case 0:
            if (part === '0') {
              pushPart('');
            } else {
              pushPart(part);
            }
            state = 1;
            break;
          case 1:
            if (part === '0') {
              state = 2;
            } else {
              pushPart(part);
            }
            break;
          case 2:
            if (part !== '0') {
              pushPart('');
              pushPart(part);
              state = 3;
            }
            break;
          case 3:
            pushPart(part);
        }
      }
      if (state === 2) {
        pushPart('');
        pushPart('');
      }
      return compactStringParts.join(":");
    };

    IPv6.prototype.toByteArray = function() {
      var bytes, k, len, part, ref;
      bytes = [];
      ref = this.parts;
      for (k = 0, len = ref.length; k < len; k++) {
        part = ref[k];
        bytes.push(part >> 8);
        bytes.push(part & 0xff);
      }
      return bytes;
    };

    IPv6.prototype.toNormalizedString = function() {
      var part;
      return ((function() {
        var k, len, ref, results;
        ref = this.parts;
        results = [];
        for (k = 0, len = ref.length; k < len; k++) {
          part = ref[k];
          results.push(part.toString(16));
        }
        return results;
      }).call(this)).join(":");
    };

    IPv6.prototype.match = function(other, cidrRange) {
      var ref;
      if (cidrRange === void 0) {
        ref = other, other = ref[0], cidrRange = ref[1];
      }
      if (other.kind() !== 'ipv6') {
        throw new Error("ipaddr: cannot match ipv6 address with non-ipv6 one");
      }
      return matchCIDR(this.parts, other.parts, 16, cidrRange);
    };

    IPv6.prototype.SpecialRanges = {
      unspecified: [new IPv6([0, 0, 0, 0, 0, 0, 0, 0]), 128],
      linkLocal: [new IPv6([0xfe80, 0, 0, 0, 0, 0, 0, 0]), 10],
      multicast: [new IPv6([0xff00, 0, 0, 0, 0, 0, 0, 0]), 8],
      loopback: [new IPv6([0, 0, 0, 0, 0, 0, 0, 1]), 128],
      uniqueLocal: [new IPv6([0xfc00, 0, 0, 0, 0, 0, 0, 0]), 7],
      ipv4Mapped: [new IPv6([0, 0, 0, 0, 0, 0xffff, 0, 0]), 96],
      rfc6145: [new IPv6([0, 0, 0, 0, 0xffff, 0, 0, 0]), 96],
      rfc6052: [new IPv6([0x64, 0xff9b, 0, 0, 0, 0, 0, 0]), 96],
      '6to4': [new IPv6([0x2002, 0, 0, 0, 0, 0, 0, 0]), 16],
      teredo: [new IPv6([0x2001, 0, 0, 0, 0, 0, 0, 0]), 32],
      reserved: [[new IPv6([0x2001, 0xdb8, 0, 0, 0, 0, 0, 0]), 32]]
    };

    IPv6.prototype.range = function() {
      return ipaddr.subnetMatch(this, this.SpecialRanges);
    };

    IPv6.prototype.isIPv4MappedAddress = function() {
      return this.range() === 'ipv4Mapped';
    };

    IPv6.prototype.toIPv4Address = function() {
      var high, low, ref;
      if (!this.isIPv4MappedAddress()) {
        throw new Error("ipaddr: trying to convert a generic ipv6 address to ipv4");
      }
      ref = this.parts.slice(-2), high = ref[0], low = ref[1];
      return new ipaddr.IPv4([high >> 8, high & 0xff, low >> 8, low & 0xff]);
    };

    return IPv6;

  })();

  ipv6Part = "(?:[0-9a-f]+::?)+";

  ipv6Regexes = {
    "native": new RegExp("^(::)?(" + ipv6Part + ")?([0-9a-f]+)?(::)?$", 'i'),
    transitional: new RegExp(("^((?:" + ipv6Part + ")|(?:::)(?:" + ipv6Part + ")?)") + (ipv4Part + "\\." + ipv4Part + "\\." + ipv4Part + "\\." + ipv4Part + "$"), 'i')
  };

  expandIPv6 = function(string, parts) {
    var colonCount, lastColon, part, replacement, replacementCount;
    if (string.indexOf('::') !== string.lastIndexOf('::')) {
      return null;
    }
    colonCount = 0;
    lastColon = -1;
    while ((lastColon = string.indexOf(':', lastColon + 1)) >= 0) {
      colonCount++;
    }
    if (string.substr(0, 2) === '::') {
      colonCount--;
    }
    if (string.substr(-2, 2) === '::') {
      colonCount--;
    }
    if (colonCount > parts) {
      return null;
    }
    replacementCount = parts - colonCount;
    replacement = ':';
    while (replacementCount--) {
      replacement += '0:';
    }
    string = string.replace('::', replacement);
    if (string[0] === ':') {
      string = string.slice(1);
    }
    if (string[string.length - 1] === ':') {
      string = string.slice(0, -1);
    }
    return (function() {
      var k, len, ref, results;
      ref = string.split(":");
      results = [];
      for (k = 0, len = ref.length; k < len; k++) {
        part = ref[k];
        results.push(parseInt(part, 16));
      }
      return results;
    })();
  };

  ipaddr.IPv6.parser = function(string) {
    var k, len, match, octet, octets, parts;
    if (string.match(ipv6Regexes['native'])) {
      return expandIPv6(string, 8);
    } else if (match = string.match(ipv6Regexes['transitional'])) {
      parts = expandIPv6(match[1].slice(0, -1), 6);
      if (parts) {
        octets = [parseInt(match[2]), parseInt(match[3]), parseInt(match[4]), parseInt(match[5])];
        for (k = 0, len = octets.length; k < len; k++) {
          octet = octets[k];
          if (!((0 <= octet && octet <= 255))) {
            return null;
          }
        }
        parts.push(octets[0] << 8 | octets[1]);
        parts.push(octets[2] << 8 | octets[3]);
        return parts;
      }
    }
    return null;
  };

  ipaddr.IPv4.isIPv4 = ipaddr.IPv6.isIPv6 = function(string) {
    return this.parser(string) !== null;
  };

  ipaddr.IPv4.isValid = function(string) {
    var e;
    try {
      new this(this.parser(string));
      return true;
    } catch (error1) {
      e = error1;
      return false;
    }
  };

  ipaddr.IPv4.isValidFourPartDecimal = function(string) {
    if (ipaddr.IPv4.isValid(string) && string.match(/^\d+(\.\d+){3}$/)) {
      return true;
    } else {
      return false;
    }
  };

  ipaddr.IPv6.isValid = function(string) {
    var e;
    if (typeof string === "string" && string.indexOf(":") === -1) {
      return false;
    }
    try {
      new this(this.parser(string));
      return true;
    } catch (error1) {
      e = error1;
      return false;
    }
  };

  ipaddr.IPv4.parse = ipaddr.IPv6.parse = function(string) {
    var parts;
    parts = this.parser(string);
    if (parts === null) {
      throw new Error("ipaddr: string is not formatted like ip address");
    }
    return new this(parts);
  };

  ipaddr.IPv4.parseCIDR = function(string) {
    var maskLength, match;
    if (match = string.match(/^(.+)\/(\d+)$/)) {
      maskLength = parseInt(match[2]);
      if (maskLength >= 0 && maskLength <= 32) {
        return [this.parse(match[1]), maskLength];
      }
    }
    throw new Error("ipaddr: string is not formatted like an IPv4 CIDR range");
  };

  ipaddr.IPv4.subnetMaskFromPrefixLength = function(prefix) {
    var j, octets;
    if (prefix < 0 || prefix > 32) {
      throw new Error('ipaddr: invalid prefix length');
    }
    octets = Array(4).fill(0);
    j = 0;
    while (j < Math.floor(prefix / 8)) {
      octets[j] = 255;
      j++;
    }
    octets[Math.floor(prefix / 8)] = Math.pow(2, prefix % 8) - 1 << 8 - (prefix % 8);
    return new ipaddr.IPv4(octets);
  };

  ipaddr.IPv4.broadcastAddressFromCIDR = function(string) {
    var error, i, ipInterface, octets, subnetMask;
    try {
      ipInterface = ipaddr.IPv4.parseCIDR(string)[0];
      subnetMask = this.subnetMaskFromPrefixLength([ipaddr.IPv4.parseCIDR(string)[1]]);
      octets = [];
      i = 0;
      while (i < 4) {
        octets.push(parseInt(ipInterface.octets[i], 10) | parseInt(subnetMask.octets[i], 10) ^ 255);
        i++;
      }
      return new ipaddr.IPv4(octets);
    } catch (error1) {
      error = error1;
      throw new Error('ipaddr: the address does not have IPv4 CIDR format');
    }
  };

  ipaddr.IPv4.networkAddressFromCIDR = function(string) {
    var error, i, ipInterface, octets, subnetMask;
    try {
      ipInterface = ipaddr.IPv4.parseCIDR(string)[0];
      subnetMask = this.subnetMaskFromPrefixLength([ipaddr.IPv4.parseCIDR(string)[1]]);
      octets = [];
      i = 0;
      while (i < 4) {
        octets.push(parseInt(ipInterface.octets[i], 10) & parseInt(subnetMask.octets[i], 10));
        i++;
      }
      return new ipaddr.IPv4(octets);
    } catch (error1) {
      error = error1;
      throw new Error('ipaddr: the address does not have IPv4 CIDR format');
    }
  };

  ipaddr.IPv6.parseCIDR = function(string) {
    var maskLength, match;
    if (match = string.match(/^(.+)\/(\d+)$/)) {
      maskLength = parseInt(match[2]);
      if (maskLength >= 0 && maskLength <= 128) {
        return [this.parse(match[1]), maskLength];
      }
    }
    throw new Error("ipaddr: string is not formatted like an IPv6 CIDR range");
  };

  ipaddr.isValid = function(string) {
    return ipaddr.IPv6.isValid(string) || ipaddr.IPv4.isValid(string);
  };

  ipaddr.parse = function(string) {
    if (ipaddr.IPv6.isValid(string)) {
      return ipaddr.IPv6.parse(string);
    } else if (ipaddr.IPv4.isValid(string)) {
      return ipaddr.IPv4.parse(string);
    } else {
      throw new Error("ipaddr: the address has neither IPv6 nor IPv4 format");
    }
  };

  ipaddr.parseCIDR = function(string) {
    var e;
    try {
      return ipaddr.IPv6.parseCIDR(string);
    } catch (error1) {
      e = error1;
      try {
        return ipaddr.IPv4.parseCIDR(string);
      } catch (error1) {
        e = error1;
        throw new Error("ipaddr: the address has neither IPv6 nor IPv4 CIDR format");
      }
    }
  };

  ipaddr.fromByteArray = function(bytes) {
    var length;
    length = bytes.length;
    if (length === 4) {
      return new ipaddr.IPv4(bytes);
    } else if (length === 16) {
      return new ipaddr.IPv6(bytes);
    } else {
      throw new Error("ipaddr: the binary input is neither an IPv6 nor IPv4 address");
    }
  };

  ipaddr.process = function(string) {
    var addr;
    addr = this.parse(string);
    if (addr.kind() === 'ipv6' && addr.isIPv4MappedAddress()) {
      return addr.toIPv4Address();
    } else {
      return addr;
    }
  };

}).call(this);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(63)(module)))

/***/ }),
/* 63 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 64 */
/***/ (function(module, exports) {

module.exports = require("querystring");

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * express
 * Copyright(c) 2009-2013 TJ Holowaychuk
 * Copyright(c) 2013 Roman Shtylman
 * Copyright(c) 2014-2015 Douglas Christopher Wilson
 * MIT Licensed
 */



/**
 * Module dependencies.
 * @private
 */

var accepts = __webpack_require__(66);
var deprecate = __webpack_require__(6)('express');
var isIP = __webpack_require__(74).isIP;
var typeis = __webpack_require__(75);
var http = __webpack_require__(9);
var fresh = __webpack_require__(33);
var parseRange = __webpack_require__(34);
var parse = __webpack_require__(8);
var proxyaddr = __webpack_require__(35);

/**
 * Request prototype.
 * @public
 */

var req = Object.create(http.IncomingMessage.prototype)

/**
 * Module exports.
 * @public
 */

module.exports = req

/**
 * Return request header.
 *
 * The `Referrer` header field is special-cased,
 * both `Referrer` and `Referer` are interchangeable.
 *
 * Examples:
 *
 *     req.get('Content-Type');
 *     // => "text/plain"
 *
 *     req.get('content-type');
 *     // => "text/plain"
 *
 *     req.get('Something');
 *     // => undefined
 *
 * Aliased as `req.header()`.
 *
 * @param {String} name
 * @return {String}
 * @public
 */

req.get =
req.header = function header(name) {
  if (!name) {
    throw new TypeError('name argument is required to req.get');
  }

  if (typeof name !== 'string') {
    throw new TypeError('name must be a string to req.get');
  }

  var lc = name.toLowerCase();

  switch (lc) {
    case 'referer':
    case 'referrer':
      return this.headers.referrer
        || this.headers.referer;
    default:
      return this.headers[lc];
  }
};

/**
 * To do: update docs.
 *
 * Check if the given `type(s)` is acceptable, returning
 * the best match when true, otherwise `undefined`, in which
 * case you should respond with 406 "Not Acceptable".
 *
 * The `type` value may be a single MIME type string
 * such as "application/json", an extension name
 * such as "json", a comma-delimited list such as "json, html, text/plain",
 * an argument list such as `"json", "html", "text/plain"`,
 * or an array `["json", "html", "text/plain"]`. When a list
 * or array is given, the _best_ match, if any is returned.
 *
 * Examples:
 *
 *     // Accept: text/html
 *     req.accepts('html');
 *     // => "html"
 *
 *     // Accept: text/*, application/json
 *     req.accepts('html');
 *     // => "html"
 *     req.accepts('text/html');
 *     // => "text/html"
 *     req.accepts('json, text');
 *     // => "json"
 *     req.accepts('application/json');
 *     // => "application/json"
 *
 *     // Accept: text/*, application/json
 *     req.accepts('image/png');
 *     req.accepts('png');
 *     // => undefined
 *
 *     // Accept: text/*;q=.5, application/json
 *     req.accepts(['html', 'json']);
 *     req.accepts('html', 'json');
 *     req.accepts('html, json');
 *     // => "json"
 *
 * @param {String|Array} type(s)
 * @return {String|Array|Boolean}
 * @public
 */

req.accepts = function(){
  var accept = accepts(this);
  return accept.types.apply(accept, arguments);
};

/**
 * Check if the given `encoding`s are accepted.
 *
 * @param {String} ...encoding
 * @return {String|Array}
 * @public
 */

req.acceptsEncodings = function(){
  var accept = accepts(this);
  return accept.encodings.apply(accept, arguments);
};

req.acceptsEncoding = deprecate.function(req.acceptsEncodings,
  'req.acceptsEncoding: Use acceptsEncodings instead');

/**
 * Check if the given `charset`s are acceptable,
 * otherwise you should respond with 406 "Not Acceptable".
 *
 * @param {String} ...charset
 * @return {String|Array}
 * @public
 */

req.acceptsCharsets = function(){
  var accept = accepts(this);
  return accept.charsets.apply(accept, arguments);
};

req.acceptsCharset = deprecate.function(req.acceptsCharsets,
  'req.acceptsCharset: Use acceptsCharsets instead');

/**
 * Check if the given `lang`s are acceptable,
 * otherwise you should respond with 406 "Not Acceptable".
 *
 * @param {String} ...lang
 * @return {String|Array}
 * @public
 */

req.acceptsLanguages = function(){
  var accept = accepts(this);
  return accept.languages.apply(accept, arguments);
};

req.acceptsLanguage = deprecate.function(req.acceptsLanguages,
  'req.acceptsLanguage: Use acceptsLanguages instead');

/**
 * Parse Range header field, capping to the given `size`.
 *
 * Unspecified ranges such as "0-" require knowledge of your resource length. In
 * the case of a byte range this is of course the total number of bytes. If the
 * Range header field is not given `undefined` is returned, `-1` when unsatisfiable,
 * and `-2` when syntactically invalid.
 *
 * When ranges are returned, the array has a "type" property which is the type of
 * range that is required (most commonly, "bytes"). Each array element is an object
 * with a "start" and "end" property for the portion of the range.
 *
 * The "combine" option can be set to `true` and overlapping & adjacent ranges
 * will be combined into a single range.
 *
 * NOTE: remember that ranges are inclusive, so for example "Range: users=0-3"
 * should respond with 4 users when available, not 3.
 *
 * @param {number} size
 * @param {object} [options]
 * @param {boolean} [options.combine=false]
 * @return {number|array}
 * @public
 */

req.range = function range(size, options) {
  var range = this.get('Range');
  if (!range) return;
  return parseRange(size, range, options);
};

/**
 * Return the value of param `name` when present or `defaultValue`.
 *
 *  - Checks route placeholders, ex: _/user/:id_
 *  - Checks body params, ex: id=12, {"id":12}
 *  - Checks query string params, ex: ?id=12
 *
 * To utilize request bodies, `req.body`
 * should be an object. This can be done by using
 * the `bodyParser()` middleware.
 *
 * @param {String} name
 * @param {Mixed} [defaultValue]
 * @return {String}
 * @public
 */

req.param = function param(name, defaultValue) {
  var params = this.params || {};
  var body = this.body || {};
  var query = this.query || {};

  var args = arguments.length === 1
    ? 'name'
    : 'name, default';
  deprecate('req.param(' + args + '): Use req.params, req.body, or req.query instead');

  if (null != params[name] && params.hasOwnProperty(name)) return params[name];
  if (null != body[name]) return body[name];
  if (null != query[name]) return query[name];

  return defaultValue;
};

/**
 * Check if the incoming request contains the "Content-Type"
 * header field, and it contains the give mime `type`.
 *
 * Examples:
 *
 *      // With Content-Type: text/html; charset=utf-8
 *      req.is('html');
 *      req.is('text/html');
 *      req.is('text/*');
 *      // => true
 *
 *      // When Content-Type is application/json
 *      req.is('json');
 *      req.is('application/json');
 *      req.is('application/*');
 *      // => true
 *
 *      req.is('html');
 *      // => false
 *
 * @param {String|Array} types...
 * @return {String|false|null}
 * @public
 */

req.is = function is(types) {
  var arr = types;

  // support flattened arguments
  if (!Array.isArray(types)) {
    arr = new Array(arguments.length);
    for (var i = 0; i < arr.length; i++) {
      arr[i] = arguments[i];
    }
  }

  return typeis(this, arr);
};

/**
 * Return the protocol string "http" or "https"
 * when requested with TLS. When the "trust proxy"
 * setting trusts the socket address, the
 * "X-Forwarded-Proto" header field will be trusted
 * and used if present.
 *
 * If you're running behind a reverse proxy that
 * supplies https for you this may be enabled.
 *
 * @return {String}
 * @public
 */

defineGetter(req, 'protocol', function protocol(){
  var proto = this.connection.encrypted
    ? 'https'
    : 'http';
  var trust = this.app.get('trust proxy fn');

  if (!trust(this.connection.remoteAddress, 0)) {
    return proto;
  }

  // Note: X-Forwarded-Proto is normally only ever a
  //       single value, but this is to be safe.
  proto = this.get('X-Forwarded-Proto') || proto;
  return proto.split(/\s*,\s*/)[0];
});

/**
 * Short-hand for:
 *
 *    req.protocol === 'https'
 *
 * @return {Boolean}
 * @public
 */

defineGetter(req, 'secure', function secure(){
  return this.protocol === 'https';
});

/**
 * Return the remote address from the trusted proxy.
 *
 * The is the remote address on the socket unless
 * "trust proxy" is set.
 *
 * @return {String}
 * @public
 */

defineGetter(req, 'ip', function ip(){
  var trust = this.app.get('trust proxy fn');
  return proxyaddr(this, trust);
});

/**
 * When "trust proxy" is set, trusted proxy addresses + client.
 *
 * For example if the value were "client, proxy1, proxy2"
 * you would receive the array `["client", "proxy1", "proxy2"]`
 * where "proxy2" is the furthest down-stream and "proxy1" and
 * "proxy2" were trusted.
 *
 * @return {Array}
 * @public
 */

defineGetter(req, 'ips', function ips() {
  var trust = this.app.get('trust proxy fn');
  var addrs = proxyaddr.all(this, trust);

  // reverse the order (to farthest -> closest)
  // and remove socket address
  addrs.reverse().pop()

  return addrs
});

/**
 * Return subdomains as an array.
 *
 * Subdomains are the dot-separated parts of the host before the main domain of
 * the app. By default, the domain of the app is assumed to be the last two
 * parts of the host. This can be changed by setting "subdomain offset".
 *
 * For example, if the domain is "tobi.ferrets.example.com":
 * If "subdomain offset" is not set, req.subdomains is `["ferrets", "tobi"]`.
 * If "subdomain offset" is 3, req.subdomains is `["tobi"]`.
 *
 * @return {Array}
 * @public
 */

defineGetter(req, 'subdomains', function subdomains() {
  var hostname = this.hostname;

  if (!hostname) return [];

  var offset = this.app.get('subdomain offset');
  var subdomains = !isIP(hostname)
    ? hostname.split('.').reverse()
    : [hostname];

  return subdomains.slice(offset);
});

/**
 * Short-hand for `url.parse(req.url).pathname`.
 *
 * @return {String}
 * @public
 */

defineGetter(req, 'path', function path() {
  return parse(this).pathname;
});

/**
 * Parse the "Host" header field to a hostname.
 *
 * When the "trust proxy" setting trusts the socket
 * address, the "X-Forwarded-Host" header field will
 * be trusted.
 *
 * @return {String}
 * @public
 */

defineGetter(req, 'hostname', function hostname(){
  var trust = this.app.get('trust proxy fn');
  var host = this.get('X-Forwarded-Host');

  if (!host || !trust(this.connection.remoteAddress, 0)) {
    host = this.get('Host');
  }

  if (!host) return;

  // IPv6 literal support
  var offset = host[0] === '['
    ? host.indexOf(']') + 1
    : 0;
  var index = host.indexOf(':', offset);

  return index !== -1
    ? host.substring(0, index)
    : host;
});

// TODO: change req.host to return host in next major

defineGetter(req, 'host', deprecate.function(function host(){
  return this.hostname;
}, 'req.host: Use req.hostname instead'));

/**
 * Check if the request is fresh, aka
 * Last-Modified and/or the ETag
 * still match.
 *
 * @return {Boolean}
 * @public
 */

defineGetter(req, 'fresh', function(){
  var method = this.method;
  var res = this.res
  var status = res.statusCode

  // GET or HEAD for weak freshness validation only
  if ('GET' !== method && 'HEAD' !== method) return false;

  // 2xx or 304 as per rfc2616 14.26
  if ((status >= 200 && status < 300) || 304 === status) {
    return fresh(this.headers, {
      'etag': res.get('ETag'),
      'last-modified': res.get('Last-Modified')
    })
  }

  return false;
});

/**
 * Check if the request is stale, aka
 * "Last-Modified" and / or the "ETag" for the
 * resource has changed.
 *
 * @return {Boolean}
 * @public
 */

defineGetter(req, 'stale', function stale(){
  return !this.fresh;
});

/**
 * Check if the request was an _XMLHttpRequest_.
 *
 * @return {Boolean}
 * @public
 */

defineGetter(req, 'xhr', function xhr(){
  var val = this.get('X-Requested-With') || '';
  return val.toLowerCase() === 'xmlhttprequest';
});

/**
 * Helper function for creating a getter on an object.
 *
 * @param {Object} obj
 * @param {String} name
 * @param {Function} getter
 * @private
 */
function defineGetter(obj, name, getter) {
  Object.defineProperty(obj, name, {
    configurable: true,
    enumerable: true,
    get: getter
  });
}


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * accepts
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */



/**
 * Module dependencies.
 * @private
 */

var Negotiator = __webpack_require__(67)
var mime = __webpack_require__(36)

/**
 * Module exports.
 * @public
 */

module.exports = Accepts

/**
 * Create a new Accepts object for the given req.
 *
 * @param {object} req
 * @public
 */

function Accepts (req) {
  if (!(this instanceof Accepts)) {
    return new Accepts(req)
  }

  this.headers = req.headers
  this.negotiator = new Negotiator(req)
}

/**
 * Check if the given `type(s)` is acceptable, returning
 * the best match when true, otherwise `undefined`, in which
 * case you should respond with 406 "Not Acceptable".
 *
 * The `type` value may be a single mime type string
 * such as "application/json", the extension name
 * such as "json" or an array `["json", "html", "text/plain"]`. When a list
 * or array is given the _best_ match, if any is returned.
 *
 * Examples:
 *
 *     // Accept: text/html
 *     this.types('html');
 *     // => "html"
 *
 *     // Accept: text/*, application/json
 *     this.types('html');
 *     // => "html"
 *     this.types('text/html');
 *     // => "text/html"
 *     this.types('json', 'text');
 *     // => "json"
 *     this.types('application/json');
 *     // => "application/json"
 *
 *     // Accept: text/*, application/json
 *     this.types('image/png');
 *     this.types('png');
 *     // => undefined
 *
 *     // Accept: text/*;q=.5, application/json
 *     this.types(['html', 'json']);
 *     this.types('html', 'json');
 *     // => "json"
 *
 * @param {String|Array} types...
 * @return {String|Array|Boolean}
 * @public
 */

Accepts.prototype.type =
Accepts.prototype.types = function (types_) {
  var types = types_

  // support flattened arguments
  if (types && !Array.isArray(types)) {
    types = new Array(arguments.length)
    for (var i = 0; i < types.length; i++) {
      types[i] = arguments[i]
    }
  }

  // no types, return all requested types
  if (!types || types.length === 0) {
    return this.negotiator.mediaTypes()
  }

  // no accept header, return first given type
  if (!this.headers.accept) {
    return types[0]
  }

  var mimes = types.map(extToMime)
  var accepts = this.negotiator.mediaTypes(mimes.filter(validMime))
  var first = accepts[0]

  return first
    ? types[mimes.indexOf(first)]
    : false
}

/**
 * Return accepted encodings or best fit based on `encodings`.
 *
 * Given `Accept-Encoding: gzip, deflate`
 * an array sorted by quality is returned:
 *
 *     ['gzip', 'deflate']
 *
 * @param {String|Array} encodings...
 * @return {String|Array}
 * @public
 */

Accepts.prototype.encoding =
Accepts.prototype.encodings = function (encodings_) {
  var encodings = encodings_

  // support flattened arguments
  if (encodings && !Array.isArray(encodings)) {
    encodings = new Array(arguments.length)
    for (var i = 0; i < encodings.length; i++) {
      encodings[i] = arguments[i]
    }
  }

  // no encodings, return all requested encodings
  if (!encodings || encodings.length === 0) {
    return this.negotiator.encodings()
  }

  return this.negotiator.encodings(encodings)[0] || false
}

/**
 * Return accepted charsets or best fit based on `charsets`.
 *
 * Given `Accept-Charset: utf-8, iso-8859-1;q=0.2, utf-7;q=0.5`
 * an array sorted by quality is returned:
 *
 *     ['utf-8', 'utf-7', 'iso-8859-1']
 *
 * @param {String|Array} charsets...
 * @return {String|Array}
 * @public
 */

Accepts.prototype.charset =
Accepts.prototype.charsets = function (charsets_) {
  var charsets = charsets_

  // support flattened arguments
  if (charsets && !Array.isArray(charsets)) {
    charsets = new Array(arguments.length)
    for (var i = 0; i < charsets.length; i++) {
      charsets[i] = arguments[i]
    }
  }

  // no charsets, return all requested charsets
  if (!charsets || charsets.length === 0) {
    return this.negotiator.charsets()
  }

  return this.negotiator.charsets(charsets)[0] || false
}

/**
 * Return accepted languages or best fit based on `langs`.
 *
 * Given `Accept-Language: en;q=0.8, es, pt`
 * an array sorted by quality is returned:
 *
 *     ['es', 'pt', 'en']
 *
 * @param {String|Array} langs...
 * @return {Array|String}
 * @public
 */

Accepts.prototype.lang =
Accepts.prototype.langs =
Accepts.prototype.language =
Accepts.prototype.languages = function (languages_) {
  var languages = languages_

  // support flattened arguments
  if (languages && !Array.isArray(languages)) {
    languages = new Array(arguments.length)
    for (var i = 0; i < languages.length; i++) {
      languages[i] = arguments[i]
    }
  }

  // no languages, return all requested languages
  if (!languages || languages.length === 0) {
    return this.negotiator.languages()
  }

  return this.negotiator.languages(languages)[0] || false
}

/**
 * Convert extnames to mime.
 *
 * @param {String} type
 * @return {String}
 * @private
 */

function extToMime (type) {
  return type.indexOf('/') === -1
    ? mime.lookup(type)
    : type
}

/**
 * Check if mime is valid.
 *
 * @param {String} type
 * @return {String}
 * @private
 */

function validMime (type) {
  return typeof type === 'string'
}


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * negotiator
 * Copyright(c) 2012 Federico Romero
 * Copyright(c) 2012-2014 Isaac Z. Schlueter
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */



/**
 * Cached loaded submodules.
 * @private
 */

var modules = Object.create(null);

/**
 * Module exports.
 * @public
 */

module.exports = Negotiator;
module.exports.Negotiator = Negotiator;

/**
 * Create a Negotiator instance from a request.
 * @param {object} request
 * @public
 */

function Negotiator(request) {
  if (!(this instanceof Negotiator)) {
    return new Negotiator(request);
  }

  this.request = request;
}

Negotiator.prototype.charset = function charset(available) {
  var set = this.charsets(available);
  return set && set[0];
};

Negotiator.prototype.charsets = function charsets(available) {
  var preferredCharsets = loadModule('charset').preferredCharsets;
  return preferredCharsets(this.request.headers['accept-charset'], available);
};

Negotiator.prototype.encoding = function encoding(available) {
  var set = this.encodings(available);
  return set && set[0];
};

Negotiator.prototype.encodings = function encodings(available) {
  var preferredEncodings = loadModule('encoding').preferredEncodings;
  return preferredEncodings(this.request.headers['accept-encoding'], available);
};

Negotiator.prototype.language = function language(available) {
  var set = this.languages(available);
  return set && set[0];
};

Negotiator.prototype.languages = function languages(available) {
  var preferredLanguages = loadModule('language').preferredLanguages;
  return preferredLanguages(this.request.headers['accept-language'], available);
};

Negotiator.prototype.mediaType = function mediaType(available) {
  var set = this.mediaTypes(available);
  return set && set[0];
};

Negotiator.prototype.mediaTypes = function mediaTypes(available) {
  var preferredMediaTypes = loadModule('mediaType').preferredMediaTypes;
  return preferredMediaTypes(this.request.headers.accept, available);
};

// Backwards compatibility
Negotiator.prototype.preferredCharset = Negotiator.prototype.charset;
Negotiator.prototype.preferredCharsets = Negotiator.prototype.charsets;
Negotiator.prototype.preferredEncoding = Negotiator.prototype.encoding;
Negotiator.prototype.preferredEncodings = Negotiator.prototype.encodings;
Negotiator.prototype.preferredLanguage = Negotiator.prototype.language;
Negotiator.prototype.preferredLanguages = Negotiator.prototype.languages;
Negotiator.prototype.preferredMediaType = Negotiator.prototype.mediaType;
Negotiator.prototype.preferredMediaTypes = Negotiator.prototype.mediaTypes;

/**
 * Load the given module.
 * @private
 */

function loadModule(moduleName) {
  var module = modules[moduleName];

  if (module !== undefined) {
    return module;
  }

  // This uses a switch for static require analysis
  switch (moduleName) {
    case 'charset':
      module = __webpack_require__(68);
      break;
    case 'encoding':
      module = __webpack_require__(69);
      break;
    case 'language':
      module = __webpack_require__(70);
      break;
    case 'mediaType':
      module = __webpack_require__(71);
      break;
    default:
      throw new Error('Cannot find module \'' + moduleName + '\'');
  }

  // Store to prevent invoking require()
  modules[moduleName] = module;

  return module;
}


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * negotiator
 * Copyright(c) 2012 Isaac Z. Schlueter
 * Copyright(c) 2014 Federico Romero
 * Copyright(c) 2014-2015 Douglas Christopher Wilson
 * MIT Licensed
 */



/**
 * Module exports.
 * @public
 */

module.exports = preferredCharsets;
module.exports.preferredCharsets = preferredCharsets;

/**
 * Module variables.
 * @private
 */

var simpleCharsetRegExp = /^\s*([^\s;]+)\s*(?:;(.*))?$/;

/**
 * Parse the Accept-Charset header.
 * @private
 */

function parseAcceptCharset(accept) {
  var accepts = accept.split(',');

  for (var i = 0, j = 0; i < accepts.length; i++) {
    var charset = parseCharset(accepts[i].trim(), i);

    if (charset) {
      accepts[j++] = charset;
    }
  }

  // trim accepts
  accepts.length = j;

  return accepts;
}

/**
 * Parse a charset from the Accept-Charset header.
 * @private
 */

function parseCharset(str, i) {
  var match = simpleCharsetRegExp.exec(str);
  if (!match) return null;

  var charset = match[1];
  var q = 1;
  if (match[2]) {
    var params = match[2].split(';')
    for (var i = 0; i < params.length; i ++) {
      var p = params[i].trim().split('=');
      if (p[0] === 'q') {
        q = parseFloat(p[1]);
        break;
      }
    }
  }

  return {
    charset: charset,
    q: q,
    i: i
  };
}

/**
 * Get the priority of a charset.
 * @private
 */

function getCharsetPriority(charset, accepted, index) {
  var priority = {o: -1, q: 0, s: 0};

  for (var i = 0; i < accepted.length; i++) {
    var spec = specify(charset, accepted[i], index);

    if (spec && (priority.s - spec.s || priority.q - spec.q || priority.o - spec.o) < 0) {
      priority = spec;
    }
  }

  return priority;
}

/**
 * Get the specificity of the charset.
 * @private
 */

function specify(charset, spec, index) {
  var s = 0;
  if(spec.charset.toLowerCase() === charset.toLowerCase()){
    s |= 1;
  } else if (spec.charset !== '*' ) {
    return null
  }

  return {
    i: index,
    o: spec.i,
    q: spec.q,
    s: s
  }
}

/**
 * Get the preferred charsets from an Accept-Charset header.
 * @public
 */

function preferredCharsets(accept, provided) {
  // RFC 2616 sec 14.2: no header = *
  var accepts = parseAcceptCharset(accept === undefined ? '*' : accept || '');

  if (!provided) {
    // sorted list of all charsets
    return accepts
      .filter(isQuality)
      .sort(compareSpecs)
      .map(getFullCharset);
  }

  var priorities = provided.map(function getPriority(type, index) {
    return getCharsetPriority(type, accepts, index);
  });

  // sorted list of accepted charsets
  return priorities.filter(isQuality).sort(compareSpecs).map(function getCharset(priority) {
    return provided[priorities.indexOf(priority)];
  });
}

/**
 * Compare two specs.
 * @private
 */

function compareSpecs(a, b) {
  return (b.q - a.q) || (b.s - a.s) || (a.o - b.o) || (a.i - b.i) || 0;
}

/**
 * Get full charset string.
 * @private
 */

function getFullCharset(spec) {
  return spec.charset;
}

/**
 * Check if a spec has any quality.
 * @private
 */

function isQuality(spec) {
  return spec.q > 0;
}


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * negotiator
 * Copyright(c) 2012 Isaac Z. Schlueter
 * Copyright(c) 2014 Federico Romero
 * Copyright(c) 2014-2015 Douglas Christopher Wilson
 * MIT Licensed
 */



/**
 * Module exports.
 * @public
 */

module.exports = preferredEncodings;
module.exports.preferredEncodings = preferredEncodings;

/**
 * Module variables.
 * @private
 */

var simpleEncodingRegExp = /^\s*([^\s;]+)\s*(?:;(.*))?$/;

/**
 * Parse the Accept-Encoding header.
 * @private
 */

function parseAcceptEncoding(accept) {
  var accepts = accept.split(',');
  var hasIdentity = false;
  var minQuality = 1;

  for (var i = 0, j = 0; i < accepts.length; i++) {
    var encoding = parseEncoding(accepts[i].trim(), i);

    if (encoding) {
      accepts[j++] = encoding;
      hasIdentity = hasIdentity || specify('identity', encoding);
      minQuality = Math.min(minQuality, encoding.q || 1);
    }
  }

  if (!hasIdentity) {
    /*
     * If identity doesn't explicitly appear in the accept-encoding header,
     * it's added to the list of acceptable encoding with the lowest q
     */
    accepts[j++] = {
      encoding: 'identity',
      q: minQuality,
      i: i
    };
  }

  // trim accepts
  accepts.length = j;

  return accepts;
}

/**
 * Parse an encoding from the Accept-Encoding header.
 * @private
 */

function parseEncoding(str, i) {
  var match = simpleEncodingRegExp.exec(str);
  if (!match) return null;

  var encoding = match[1];
  var q = 1;
  if (match[2]) {
    var params = match[2].split(';');
    for (var i = 0; i < params.length; i ++) {
      var p = params[i].trim().split('=');
      if (p[0] === 'q') {
        q = parseFloat(p[1]);
        break;
      }
    }
  }

  return {
    encoding: encoding,
    q: q,
    i: i
  };
}

/**
 * Get the priority of an encoding.
 * @private
 */

function getEncodingPriority(encoding, accepted, index) {
  var priority = {o: -1, q: 0, s: 0};

  for (var i = 0; i < accepted.length; i++) {
    var spec = specify(encoding, accepted[i], index);

    if (spec && (priority.s - spec.s || priority.q - spec.q || priority.o - spec.o) < 0) {
      priority = spec;
    }
  }

  return priority;
}

/**
 * Get the specificity of the encoding.
 * @private
 */

function specify(encoding, spec, index) {
  var s = 0;
  if(spec.encoding.toLowerCase() === encoding.toLowerCase()){
    s |= 1;
  } else if (spec.encoding !== '*' ) {
    return null
  }

  return {
    i: index,
    o: spec.i,
    q: spec.q,
    s: s
  }
};

/**
 * Get the preferred encodings from an Accept-Encoding header.
 * @public
 */

function preferredEncodings(accept, provided) {
  var accepts = parseAcceptEncoding(accept || '');

  if (!provided) {
    // sorted list of all encodings
    return accepts
      .filter(isQuality)
      .sort(compareSpecs)
      .map(getFullEncoding);
  }

  var priorities = provided.map(function getPriority(type, index) {
    return getEncodingPriority(type, accepts, index);
  });

  // sorted list of accepted encodings
  return priorities.filter(isQuality).sort(compareSpecs).map(function getEncoding(priority) {
    return provided[priorities.indexOf(priority)];
  });
}

/**
 * Compare two specs.
 * @private
 */

function compareSpecs(a, b) {
  return (b.q - a.q) || (b.s - a.s) || (a.o - b.o) || (a.i - b.i) || 0;
}

/**
 * Get full encoding string.
 * @private
 */

function getFullEncoding(spec) {
  return spec.encoding;
}

/**
 * Check if a spec has any quality.
 * @private
 */

function isQuality(spec) {
  return spec.q > 0;
}


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * negotiator
 * Copyright(c) 2012 Isaac Z. Schlueter
 * Copyright(c) 2014 Federico Romero
 * Copyright(c) 2014-2015 Douglas Christopher Wilson
 * MIT Licensed
 */



/**
 * Module exports.
 * @public
 */

module.exports = preferredLanguages;
module.exports.preferredLanguages = preferredLanguages;

/**
 * Module variables.
 * @private
 */

var simpleLanguageRegExp = /^\s*([^\s\-;]+)(?:-([^\s;]+))?\s*(?:;(.*))?$/;

/**
 * Parse the Accept-Language header.
 * @private
 */

function parseAcceptLanguage(accept) {
  var accepts = accept.split(',');

  for (var i = 0, j = 0; i < accepts.length; i++) {
    var langauge = parseLanguage(accepts[i].trim(), i);

    if (langauge) {
      accepts[j++] = langauge;
    }
  }

  // trim accepts
  accepts.length = j;

  return accepts;
}

/**
 * Parse a language from the Accept-Language header.
 * @private
 */

function parseLanguage(str, i) {
  var match = simpleLanguageRegExp.exec(str);
  if (!match) return null;

  var prefix = match[1],
      suffix = match[2],
      full = prefix;

  if (suffix) full += "-" + suffix;

  var q = 1;
  if (match[3]) {
    var params = match[3].split(';')
    for (var i = 0; i < params.length; i ++) {
      var p = params[i].split('=');
      if (p[0] === 'q') q = parseFloat(p[1]);
    }
  }

  return {
    prefix: prefix,
    suffix: suffix,
    q: q,
    i: i,
    full: full
  };
}

/**
 * Get the priority of a language.
 * @private
 */

function getLanguagePriority(language, accepted, index) {
  var priority = {o: -1, q: 0, s: 0};

  for (var i = 0; i < accepted.length; i++) {
    var spec = specify(language, accepted[i], index);

    if (spec && (priority.s - spec.s || priority.q - spec.q || priority.o - spec.o) < 0) {
      priority = spec;
    }
  }

  return priority;
}

/**
 * Get the specificity of the language.
 * @private
 */

function specify(language, spec, index) {
  var p = parseLanguage(language)
  if (!p) return null;
  var s = 0;
  if(spec.full.toLowerCase() === p.full.toLowerCase()){
    s |= 4;
  } else if (spec.prefix.toLowerCase() === p.full.toLowerCase()) {
    s |= 2;
  } else if (spec.full.toLowerCase() === p.prefix.toLowerCase()) {
    s |= 1;
  } else if (spec.full !== '*' ) {
    return null
  }

  return {
    i: index,
    o: spec.i,
    q: spec.q,
    s: s
  }
};

/**
 * Get the preferred languages from an Accept-Language header.
 * @public
 */

function preferredLanguages(accept, provided) {
  // RFC 2616 sec 14.4: no header = *
  var accepts = parseAcceptLanguage(accept === undefined ? '*' : accept || '');

  if (!provided) {
    // sorted list of all languages
    return accepts
      .filter(isQuality)
      .sort(compareSpecs)
      .map(getFullLanguage);
  }

  var priorities = provided.map(function getPriority(type, index) {
    return getLanguagePriority(type, accepts, index);
  });

  // sorted list of accepted languages
  return priorities.filter(isQuality).sort(compareSpecs).map(function getLanguage(priority) {
    return provided[priorities.indexOf(priority)];
  });
}

/**
 * Compare two specs.
 * @private
 */

function compareSpecs(a, b) {
  return (b.q - a.q) || (b.s - a.s) || (a.o - b.o) || (a.i - b.i) || 0;
}

/**
 * Get full language string.
 * @private
 */

function getFullLanguage(spec) {
  return spec.full;
}

/**
 * Check if a spec has any quality.
 * @private
 */

function isQuality(spec) {
  return spec.q > 0;
}


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * negotiator
 * Copyright(c) 2012 Isaac Z. Schlueter
 * Copyright(c) 2014 Federico Romero
 * Copyright(c) 2014-2015 Douglas Christopher Wilson
 * MIT Licensed
 */



/**
 * Module exports.
 * @public
 */

module.exports = preferredMediaTypes;
module.exports.preferredMediaTypes = preferredMediaTypes;

/**
 * Module variables.
 * @private
 */

var simpleMediaTypeRegExp = /^\s*([^\s\/;]+)\/([^;\s]+)\s*(?:;(.*))?$/;

/**
 * Parse the Accept header.
 * @private
 */

function parseAccept(accept) {
  var accepts = splitMediaTypes(accept);

  for (var i = 0, j = 0; i < accepts.length; i++) {
    var mediaType = parseMediaType(accepts[i].trim(), i);

    if (mediaType) {
      accepts[j++] = mediaType;
    }
  }

  // trim accepts
  accepts.length = j;

  return accepts;
}

/**
 * Parse a media type from the Accept header.
 * @private
 */

function parseMediaType(str, i) {
  var match = simpleMediaTypeRegExp.exec(str);
  if (!match) return null;

  var params = Object.create(null);
  var q = 1;
  var subtype = match[2];
  var type = match[1];

  if (match[3]) {
    var kvps = splitParameters(match[3]).map(splitKeyValuePair);

    for (var j = 0; j < kvps.length; j++) {
      var pair = kvps[j];
      var key = pair[0].toLowerCase();
      var val = pair[1];

      // get the value, unwrapping quotes
      var value = val && val[0] === '"' && val[val.length - 1] === '"'
        ? val.substr(1, val.length - 2)
        : val;

      if (key === 'q') {
        q = parseFloat(value);
        break;
      }

      // store parameter
      params[key] = value;
    }
  }

  return {
    type: type,
    subtype: subtype,
    params: params,
    q: q,
    i: i
  };
}

/**
 * Get the priority of a media type.
 * @private
 */

function getMediaTypePriority(type, accepted, index) {
  var priority = {o: -1, q: 0, s: 0};

  for (var i = 0; i < accepted.length; i++) {
    var spec = specify(type, accepted[i], index);

    if (spec && (priority.s - spec.s || priority.q - spec.q || priority.o - spec.o) < 0) {
      priority = spec;
    }
  }

  return priority;
}

/**
 * Get the specificity of the media type.
 * @private
 */

function specify(type, spec, index) {
  var p = parseMediaType(type);
  var s = 0;

  if (!p) {
    return null;
  }

  if(spec.type.toLowerCase() == p.type.toLowerCase()) {
    s |= 4
  } else if(spec.type != '*') {
    return null;
  }

  if(spec.subtype.toLowerCase() == p.subtype.toLowerCase()) {
    s |= 2
  } else if(spec.subtype != '*') {
    return null;
  }

  var keys = Object.keys(spec.params);
  if (keys.length > 0) {
    if (keys.every(function (k) {
      return spec.params[k] == '*' || (spec.params[k] || '').toLowerCase() == (p.params[k] || '').toLowerCase();
    })) {
      s |= 1
    } else {
      return null
    }
  }

  return {
    i: index,
    o: spec.i,
    q: spec.q,
    s: s,
  }
}

/**
 * Get the preferred media types from an Accept header.
 * @public
 */

function preferredMediaTypes(accept, provided) {
  // RFC 2616 sec 14.2: no header = */*
  var accepts = parseAccept(accept === undefined ? '*/*' : accept || '');

  if (!provided) {
    // sorted list of all types
    return accepts
      .filter(isQuality)
      .sort(compareSpecs)
      .map(getFullType);
  }

  var priorities = provided.map(function getPriority(type, index) {
    return getMediaTypePriority(type, accepts, index);
  });

  // sorted list of accepted types
  return priorities.filter(isQuality).sort(compareSpecs).map(function getType(priority) {
    return provided[priorities.indexOf(priority)];
  });
}

/**
 * Compare two specs.
 * @private
 */

function compareSpecs(a, b) {
  return (b.q - a.q) || (b.s - a.s) || (a.o - b.o) || (a.i - b.i) || 0;
}

/**
 * Get full type string.
 * @private
 */

function getFullType(spec) {
  return spec.type + '/' + spec.subtype;
}

/**
 * Check if a spec has any quality.
 * @private
 */

function isQuality(spec) {
  return spec.q > 0;
}

/**
 * Count the number of quotes in a string.
 * @private
 */

function quoteCount(string) {
  var count = 0;
  var index = 0;

  while ((index = string.indexOf('"', index)) !== -1) {
    count++;
    index++;
  }

  return count;
}

/**
 * Split a key value pair.
 * @private
 */

function splitKeyValuePair(str) {
  var index = str.indexOf('=');
  var key;
  var val;

  if (index === -1) {
    key = str;
  } else {
    key = str.substr(0, index);
    val = str.substr(index + 1);
  }

  return [key, val];
}

/**
 * Split an Accept header into media types.
 * @private
 */

function splitMediaTypes(accept) {
  var accepts = accept.split(',');

  for (var i = 1, j = 0; i < accepts.length; i++) {
    if (quoteCount(accepts[j]) % 2 == 0) {
      accepts[++j] = accepts[i];
    } else {
      accepts[j] += ',' + accepts[i];
    }
  }

  // trim accepts
  accepts.length = j + 1;

  return accepts;
}

/**
 * Split a string of parameters.
 * @private
 */

function splitParameters(str) {
  var parameters = str.split(';');

  for (var i = 1, j = 0; i < parameters.length; i++) {
    if (quoteCount(parameters[j]) % 2 == 0) {
      parameters[++j] = parameters[i];
    } else {
      parameters[j] += ';' + parameters[i];
    }
  }

  // trim parameters
  parameters.length = j + 1;

  for (var i = 0; i < parameters.length; i++) {
    parameters[i] = parameters[i].trim();
  }

  return parameters;
}


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * mime-db
 * Copyright(c) 2014 Jonathan Ong
 * MIT Licensed
 */

/**
 * Module exports.
 */

module.exports = __webpack_require__(73)


/***/ }),
/* 73 */
/***/ (function(module, exports) {

module.exports = {"application/1d-interleaved-parityfec":{"source":"iana"},"application/3gpdash-qoe-report+xml":{"source":"iana"},"application/3gpp-ims+xml":{"source":"iana"},"application/a2l":{"source":"iana"},"application/activemessage":{"source":"iana"},"application/alto-costmap+json":{"source":"iana","compressible":true},"application/alto-costmapfilter+json":{"source":"iana","compressible":true},"application/alto-directory+json":{"source":"iana","compressible":true},"application/alto-endpointcost+json":{"source":"iana","compressible":true},"application/alto-endpointcostparams+json":{"source":"iana","compressible":true},"application/alto-endpointprop+json":{"source":"iana","compressible":true},"application/alto-endpointpropparams+json":{"source":"iana","compressible":true},"application/alto-error+json":{"source":"iana","compressible":true},"application/alto-networkmap+json":{"source":"iana","compressible":true},"application/alto-networkmapfilter+json":{"source":"iana","compressible":true},"application/aml":{"source":"iana"},"application/andrew-inset":{"source":"iana","extensions":["ez"]},"application/applefile":{"source":"iana"},"application/applixware":{"source":"apache","extensions":["aw"]},"application/atf":{"source":"iana"},"application/atfx":{"source":"iana"},"application/atom+xml":{"source":"iana","compressible":true,"extensions":["atom"]},"application/atomcat+xml":{"source":"iana","extensions":["atomcat"]},"application/atomdeleted+xml":{"source":"iana"},"application/atomicmail":{"source":"iana"},"application/atomsvc+xml":{"source":"iana","extensions":["atomsvc"]},"application/atxml":{"source":"iana"},"application/auth-policy+xml":{"source":"iana"},"application/bacnet-xdd+zip":{"source":"iana"},"application/batch-smtp":{"source":"iana"},"application/bdoc":{"compressible":false,"extensions":["bdoc"]},"application/beep+xml":{"source":"iana"},"application/calendar+json":{"source":"iana","compressible":true},"application/calendar+xml":{"source":"iana"},"application/call-completion":{"source":"iana"},"application/cals-1840":{"source":"iana"},"application/cbor":{"source":"iana"},"application/cccex":{"source":"iana"},"application/ccmp+xml":{"source":"iana"},"application/ccxml+xml":{"source":"iana","extensions":["ccxml"]},"application/cdfx+xml":{"source":"iana"},"application/cdmi-capability":{"source":"iana","extensions":["cdmia"]},"application/cdmi-container":{"source":"iana","extensions":["cdmic"]},"application/cdmi-domain":{"source":"iana","extensions":["cdmid"]},"application/cdmi-object":{"source":"iana","extensions":["cdmio"]},"application/cdmi-queue":{"source":"iana","extensions":["cdmiq"]},"application/cdni":{"source":"iana"},"application/cea":{"source":"iana"},"application/cea-2018+xml":{"source":"iana"},"application/cellml+xml":{"source":"iana"},"application/cfw":{"source":"iana"},"application/clue_info+xml":{"source":"iana"},"application/cms":{"source":"iana"},"application/cnrp+xml":{"source":"iana"},"application/coap-group+json":{"source":"iana","compressible":true},"application/coap-payload":{"source":"iana"},"application/commonground":{"source":"iana"},"application/conference-info+xml":{"source":"iana"},"application/cose":{"source":"iana"},"application/cose-key":{"source":"iana"},"application/cose-key-set":{"source":"iana"},"application/cpl+xml":{"source":"iana"},"application/csrattrs":{"source":"iana"},"application/csta+xml":{"source":"iana"},"application/cstadata+xml":{"source":"iana"},"application/csvm+json":{"source":"iana","compressible":true},"application/cu-seeme":{"source":"apache","extensions":["cu"]},"application/cybercash":{"source":"iana"},"application/dart":{"compressible":true},"application/dash+xml":{"source":"iana","extensions":["mpd"]},"application/dashdelta":{"source":"iana"},"application/davmount+xml":{"source":"iana","extensions":["davmount"]},"application/dca-rft":{"source":"iana"},"application/dcd":{"source":"iana"},"application/dec-dx":{"source":"iana"},"application/dialog-info+xml":{"source":"iana"},"application/dicom":{"source":"iana"},"application/dicom+json":{"source":"iana","compressible":true},"application/dicom+xml":{"source":"iana"},"application/dii":{"source":"iana"},"application/dit":{"source":"iana"},"application/dns":{"source":"iana"},"application/docbook+xml":{"source":"apache","extensions":["dbk"]},"application/dskpp+xml":{"source":"iana"},"application/dssc+der":{"source":"iana","extensions":["dssc"]},"application/dssc+xml":{"source":"iana","extensions":["xdssc"]},"application/dvcs":{"source":"iana"},"application/ecmascript":{"source":"iana","compressible":true,"extensions":["ecma"]},"application/edi-consent":{"source":"iana"},"application/edi-x12":{"source":"iana","compressible":false},"application/edifact":{"source":"iana","compressible":false},"application/efi":{"source":"iana"},"application/emergencycalldata.comment+xml":{"source":"iana"},"application/emergencycalldata.control+xml":{"source":"iana"},"application/emergencycalldata.deviceinfo+xml":{"source":"iana"},"application/emergencycalldata.ecall.msd":{"source":"iana"},"application/emergencycalldata.providerinfo+xml":{"source":"iana"},"application/emergencycalldata.serviceinfo+xml":{"source":"iana"},"application/emergencycalldata.subscriberinfo+xml":{"source":"iana"},"application/emergencycalldata.veds+xml":{"source":"iana"},"application/emma+xml":{"source":"iana","extensions":["emma"]},"application/emotionml+xml":{"source":"iana"},"application/encaprtp":{"source":"iana"},"application/epp+xml":{"source":"iana"},"application/epub+zip":{"source":"iana","extensions":["epub"]},"application/eshop":{"source":"iana"},"application/exi":{"source":"iana","extensions":["exi"]},"application/fastinfoset":{"source":"iana"},"application/fastsoap":{"source":"iana"},"application/fdt+xml":{"source":"iana"},"application/fido.trusted-apps+json":{"compressible":true},"application/fits":{"source":"iana"},"application/font-sfnt":{"source":"iana"},"application/font-tdpfr":{"source":"iana","extensions":["pfr"]},"application/font-woff":{"source":"iana","compressible":false,"extensions":["woff"]},"application/font-woff2":{"compressible":false,"extensions":["woff2"]},"application/framework-attributes+xml":{"source":"iana"},"application/geo+json":{"source":"iana","compressible":true,"extensions":["geojson"]},"application/geo+json-seq":{"source":"iana"},"application/geoxacml+xml":{"source":"iana"},"application/gml+xml":{"source":"iana","extensions":["gml"]},"application/gpx+xml":{"source":"apache","extensions":["gpx"]},"application/gxf":{"source":"apache","extensions":["gxf"]},"application/gzip":{"source":"iana","compressible":false,"extensions":["gz"]},"application/h224":{"source":"iana"},"application/held+xml":{"source":"iana"},"application/http":{"source":"iana"},"application/hyperstudio":{"source":"iana","extensions":["stk"]},"application/ibe-key-request+xml":{"source":"iana"},"application/ibe-pkg-reply+xml":{"source":"iana"},"application/ibe-pp-data":{"source":"iana"},"application/iges":{"source":"iana"},"application/im-iscomposing+xml":{"source":"iana"},"application/index":{"source":"iana"},"application/index.cmd":{"source":"iana"},"application/index.obj":{"source":"iana"},"application/index.response":{"source":"iana"},"application/index.vnd":{"source":"iana"},"application/inkml+xml":{"source":"iana","extensions":["ink","inkml"]},"application/iotp":{"source":"iana"},"application/ipfix":{"source":"iana","extensions":["ipfix"]},"application/ipp":{"source":"iana"},"application/isup":{"source":"iana"},"application/its+xml":{"source":"iana"},"application/java-archive":{"source":"apache","compressible":false,"extensions":["jar","war","ear"]},"application/java-serialized-object":{"source":"apache","compressible":false,"extensions":["ser"]},"application/java-vm":{"source":"apache","compressible":false,"extensions":["class"]},"application/javascript":{"source":"iana","charset":"UTF-8","compressible":true,"extensions":["js","mjs"]},"application/jf2feed+json":{"source":"iana","compressible":true},"application/jose":{"source":"iana"},"application/jose+json":{"source":"iana","compressible":true},"application/jrd+json":{"source":"iana","compressible":true},"application/json":{"source":"iana","charset":"UTF-8","compressible":true,"extensions":["json","map"]},"application/json-patch+json":{"source":"iana","compressible":true},"application/json-seq":{"source":"iana"},"application/json5":{"extensions":["json5"]},"application/jsonml+json":{"source":"apache","compressible":true,"extensions":["jsonml"]},"application/jwk+json":{"source":"iana","compressible":true},"application/jwk-set+json":{"source":"iana","compressible":true},"application/jwt":{"source":"iana"},"application/kpml-request+xml":{"source":"iana"},"application/kpml-response+xml":{"source":"iana"},"application/ld+json":{"source":"iana","compressible":true,"extensions":["jsonld"]},"application/lgr+xml":{"source":"iana"},"application/link-format":{"source":"iana"},"application/load-control+xml":{"source":"iana"},"application/lost+xml":{"source":"iana","extensions":["lostxml"]},"application/lostsync+xml":{"source":"iana"},"application/lxf":{"source":"iana"},"application/mac-binhex40":{"source":"iana","extensions":["hqx"]},"application/mac-compactpro":{"source":"apache","extensions":["cpt"]},"application/macwriteii":{"source":"iana"},"application/mads+xml":{"source":"iana","extensions":["mads"]},"application/manifest+json":{"charset":"UTF-8","compressible":true,"extensions":["webmanifest"]},"application/marc":{"source":"iana","extensions":["mrc"]},"application/marcxml+xml":{"source":"iana","extensions":["mrcx"]},"application/mathematica":{"source":"iana","extensions":["ma","nb","mb"]},"application/mathml+xml":{"source":"iana","extensions":["mathml"]},"application/mathml-content+xml":{"source":"iana"},"application/mathml-presentation+xml":{"source":"iana"},"application/mbms-associated-procedure-description+xml":{"source":"iana"},"application/mbms-deregister+xml":{"source":"iana"},"application/mbms-envelope+xml":{"source":"iana"},"application/mbms-msk+xml":{"source":"iana"},"application/mbms-msk-response+xml":{"source":"iana"},"application/mbms-protection-description+xml":{"source":"iana"},"application/mbms-reception-report+xml":{"source":"iana"},"application/mbms-register+xml":{"source":"iana"},"application/mbms-register-response+xml":{"source":"iana"},"application/mbms-schedule+xml":{"source":"iana"},"application/mbms-user-service-description+xml":{"source":"iana"},"application/mbox":{"source":"iana","extensions":["mbox"]},"application/media-policy-dataset+xml":{"source":"iana"},"application/media_control+xml":{"source":"iana"},"application/mediaservercontrol+xml":{"source":"iana","extensions":["mscml"]},"application/merge-patch+json":{"source":"iana","compressible":true},"application/metalink+xml":{"source":"apache","extensions":["metalink"]},"application/metalink4+xml":{"source":"iana","extensions":["meta4"]},"application/mets+xml":{"source":"iana","extensions":["mets"]},"application/mf4":{"source":"iana"},"application/mikey":{"source":"iana"},"application/mmt-usd+xml":{"source":"iana"},"application/mods+xml":{"source":"iana","extensions":["mods"]},"application/moss-keys":{"source":"iana"},"application/moss-signature":{"source":"iana"},"application/mosskey-data":{"source":"iana"},"application/mosskey-request":{"source":"iana"},"application/mp21":{"source":"iana","extensions":["m21","mp21"]},"application/mp4":{"source":"iana","extensions":["mp4s","m4p"]},"application/mpeg4-generic":{"source":"iana"},"application/mpeg4-iod":{"source":"iana"},"application/mpeg4-iod-xmt":{"source":"iana"},"application/mrb-consumer+xml":{"source":"iana"},"application/mrb-publish+xml":{"source":"iana"},"application/msc-ivr+xml":{"source":"iana"},"application/msc-mixer+xml":{"source":"iana"},"application/msword":{"source":"iana","compressible":false,"extensions":["doc","dot"]},"application/mud+json":{"source":"iana","compressible":true},"application/mxf":{"source":"iana","extensions":["mxf"]},"application/n-quads":{"source":"iana"},"application/n-triples":{"source":"iana"},"application/nasdata":{"source":"iana"},"application/news-checkgroups":{"source":"iana"},"application/news-groupinfo":{"source":"iana"},"application/news-transmission":{"source":"iana"},"application/nlsml+xml":{"source":"iana"},"application/nss":{"source":"iana"},"application/ocsp-request":{"source":"iana"},"application/ocsp-response":{"source":"iana"},"application/octet-stream":{"source":"iana","compressible":false,"extensions":["bin","dms","lrf","mar","so","dist","distz","pkg","bpk","dump","elc","deploy","exe","dll","deb","dmg","iso","img","msi","msp","msm","buffer"]},"application/oda":{"source":"iana","extensions":["oda"]},"application/odx":{"source":"iana"},"application/oebps-package+xml":{"source":"iana","extensions":["opf"]},"application/ogg":{"source":"iana","compressible":false,"extensions":["ogx"]},"application/omdoc+xml":{"source":"apache","extensions":["omdoc"]},"application/onenote":{"source":"apache","extensions":["onetoc","onetoc2","onetmp","onepkg"]},"application/oxps":{"source":"iana","extensions":["oxps"]},"application/p2p-overlay+xml":{"source":"iana"},"application/parityfec":{"source":"iana"},"application/passport":{"source":"iana"},"application/patch-ops-error+xml":{"source":"iana","extensions":["xer"]},"application/pdf":{"source":"iana","compressible":false,"extensions":["pdf"]},"application/pdx":{"source":"iana"},"application/pgp-encrypted":{"source":"iana","compressible":false,"extensions":["pgp"]},"application/pgp-keys":{"source":"iana"},"application/pgp-signature":{"source":"iana","extensions":["asc","sig"]},"application/pics-rules":{"source":"apache","extensions":["prf"]},"application/pidf+xml":{"source":"iana"},"application/pidf-diff+xml":{"source":"iana"},"application/pkcs10":{"source":"iana","extensions":["p10"]},"application/pkcs12":{"source":"iana"},"application/pkcs7-mime":{"source":"iana","extensions":["p7m","p7c"]},"application/pkcs7-signature":{"source":"iana","extensions":["p7s"]},"application/pkcs8":{"source":"iana","extensions":["p8"]},"application/pkix-attr-cert":{"source":"iana","extensions":["ac"]},"application/pkix-cert":{"source":"iana","extensions":["cer"]},"application/pkix-crl":{"source":"iana","extensions":["crl"]},"application/pkix-pkipath":{"source":"iana","extensions":["pkipath"]},"application/pkixcmp":{"source":"iana","extensions":["pki"]},"application/pls+xml":{"source":"iana","extensions":["pls"]},"application/poc-settings+xml":{"source":"iana"},"application/postscript":{"source":"iana","compressible":true,"extensions":["ai","eps","ps"]},"application/ppsp-tracker+json":{"source":"iana","compressible":true},"application/problem+json":{"source":"iana","compressible":true},"application/problem+xml":{"source":"iana"},"application/provenance+xml":{"source":"iana"},"application/prs.alvestrand.titrax-sheet":{"source":"iana"},"application/prs.cww":{"source":"iana","extensions":["cww"]},"application/prs.hpub+zip":{"source":"iana"},"application/prs.nprend":{"source":"iana"},"application/prs.plucker":{"source":"iana"},"application/prs.rdf-xml-crypt":{"source":"iana"},"application/prs.xsf+xml":{"source":"iana"},"application/pskc+xml":{"source":"iana","extensions":["pskcxml"]},"application/qsig":{"source":"iana"},"application/raptorfec":{"source":"iana"},"application/rdap+json":{"source":"iana","compressible":true},"application/rdf+xml":{"source":"iana","compressible":true,"extensions":["rdf"]},"application/reginfo+xml":{"source":"iana","extensions":["rif"]},"application/relax-ng-compact-syntax":{"source":"iana","extensions":["rnc"]},"application/remote-printing":{"source":"iana"},"application/reputon+json":{"source":"iana","compressible":true},"application/resource-lists+xml":{"source":"iana","extensions":["rl"]},"application/resource-lists-diff+xml":{"source":"iana","extensions":["rld"]},"application/rfc+xml":{"source":"iana"},"application/riscos":{"source":"iana"},"application/rlmi+xml":{"source":"iana"},"application/rls-services+xml":{"source":"iana","extensions":["rs"]},"application/route-apd+xml":{"source":"iana"},"application/route-s-tsid+xml":{"source":"iana"},"application/route-usd+xml":{"source":"iana"},"application/rpki-ghostbusters":{"source":"iana","extensions":["gbr"]},"application/rpki-manifest":{"source":"iana","extensions":["mft"]},"application/rpki-publication":{"source":"iana"},"application/rpki-roa":{"source":"iana","extensions":["roa"]},"application/rpki-updown":{"source":"iana"},"application/rsd+xml":{"source":"apache","extensions":["rsd"]},"application/rss+xml":{"source":"apache","compressible":true,"extensions":["rss"]},"application/rtf":{"source":"iana","compressible":true,"extensions":["rtf"]},"application/rtploopback":{"source":"iana"},"application/rtx":{"source":"iana"},"application/samlassertion+xml":{"source":"iana"},"application/samlmetadata+xml":{"source":"iana"},"application/sbml+xml":{"source":"iana","extensions":["sbml"]},"application/scaip+xml":{"source":"iana"},"application/scim+json":{"source":"iana","compressible":true},"application/scvp-cv-request":{"source":"iana","extensions":["scq"]},"application/scvp-cv-response":{"source":"iana","extensions":["scs"]},"application/scvp-vp-request":{"source":"iana","extensions":["spq"]},"application/scvp-vp-response":{"source":"iana","extensions":["spp"]},"application/sdp":{"source":"iana","extensions":["sdp"]},"application/sep+xml":{"source":"iana"},"application/sep-exi":{"source":"iana"},"application/session-info":{"source":"iana"},"application/set-payment":{"source":"iana"},"application/set-payment-initiation":{"source":"iana","extensions":["setpay"]},"application/set-registration":{"source":"iana"},"application/set-registration-initiation":{"source":"iana","extensions":["setreg"]},"application/sgml":{"source":"iana"},"application/sgml-open-catalog":{"source":"iana"},"application/shf+xml":{"source":"iana","extensions":["shf"]},"application/sieve":{"source":"iana"},"application/simple-filter+xml":{"source":"iana"},"application/simple-message-summary":{"source":"iana"},"application/simplesymbolcontainer":{"source":"iana"},"application/slate":{"source":"iana"},"application/smil":{"source":"iana"},"application/smil+xml":{"source":"iana","extensions":["smi","smil"]},"application/smpte336m":{"source":"iana"},"application/soap+fastinfoset":{"source":"iana"},"application/soap+xml":{"source":"iana","compressible":true},"application/sparql-query":{"source":"iana","extensions":["rq"]},"application/sparql-results+xml":{"source":"iana","extensions":["srx"]},"application/spirits-event+xml":{"source":"iana"},"application/sql":{"source":"iana"},"application/srgs":{"source":"iana","extensions":["gram"]},"application/srgs+xml":{"source":"iana","extensions":["grxml"]},"application/sru+xml":{"source":"iana","extensions":["sru"]},"application/ssdl+xml":{"source":"apache","extensions":["ssdl"]},"application/ssml+xml":{"source":"iana","extensions":["ssml"]},"application/tamp-apex-update":{"source":"iana"},"application/tamp-apex-update-confirm":{"source":"iana"},"application/tamp-community-update":{"source":"iana"},"application/tamp-community-update-confirm":{"source":"iana"},"application/tamp-error":{"source":"iana"},"application/tamp-sequence-adjust":{"source":"iana"},"application/tamp-sequence-adjust-confirm":{"source":"iana"},"application/tamp-status-query":{"source":"iana"},"application/tamp-status-response":{"source":"iana"},"application/tamp-update":{"source":"iana"},"application/tamp-update-confirm":{"source":"iana"},"application/tar":{"compressible":true},"application/tei+xml":{"source":"iana","extensions":["tei","teicorpus"]},"application/thraud+xml":{"source":"iana","extensions":["tfi"]},"application/timestamp-query":{"source":"iana"},"application/timestamp-reply":{"source":"iana"},"application/timestamped-data":{"source":"iana","extensions":["tsd"]},"application/trig":{"source":"iana"},"application/ttml+xml":{"source":"iana"},"application/tve-trigger":{"source":"iana"},"application/ulpfec":{"source":"iana"},"application/urc-grpsheet+xml":{"source":"iana"},"application/urc-ressheet+xml":{"source":"iana"},"application/urc-targetdesc+xml":{"source":"iana"},"application/urc-uisocketdesc+xml":{"source":"iana"},"application/vcard+json":{"source":"iana","compressible":true},"application/vcard+xml":{"source":"iana"},"application/vemmi":{"source":"iana"},"application/vividence.scriptfile":{"source":"apache"},"application/vnd.1000minds.decision-model+xml":{"source":"iana"},"application/vnd.3gpp-prose+xml":{"source":"iana"},"application/vnd.3gpp-prose-pc3ch+xml":{"source":"iana"},"application/vnd.3gpp.access-transfer-events+xml":{"source":"iana"},"application/vnd.3gpp.bsf+xml":{"source":"iana"},"application/vnd.3gpp.gmop+xml":{"source":"iana"},"application/vnd.3gpp.mcptt-info+xml":{"source":"iana"},"application/vnd.3gpp.mcptt-mbms-usage-info+xml":{"source":"iana"},"application/vnd.3gpp.mid-call+xml":{"source":"iana"},"application/vnd.3gpp.pic-bw-large":{"source":"iana","extensions":["plb"]},"application/vnd.3gpp.pic-bw-small":{"source":"iana","extensions":["psb"]},"application/vnd.3gpp.pic-bw-var":{"source":"iana","extensions":["pvb"]},"application/vnd.3gpp.sms":{"source":"iana"},"application/vnd.3gpp.sms+xml":{"source":"iana"},"application/vnd.3gpp.srvcc-ext+xml":{"source":"iana"},"application/vnd.3gpp.srvcc-info+xml":{"source":"iana"},"application/vnd.3gpp.state-and-event-info+xml":{"source":"iana"},"application/vnd.3gpp.ussd+xml":{"source":"iana"},"application/vnd.3gpp2.bcmcsinfo+xml":{"source":"iana"},"application/vnd.3gpp2.sms":{"source":"iana"},"application/vnd.3gpp2.tcap":{"source":"iana","extensions":["tcap"]},"application/vnd.3lightssoftware.imagescal":{"source":"iana"},"application/vnd.3m.post-it-notes":{"source":"iana","extensions":["pwn"]},"application/vnd.accpac.simply.aso":{"source":"iana","extensions":["aso"]},"application/vnd.accpac.simply.imp":{"source":"iana","extensions":["imp"]},"application/vnd.acucobol":{"source":"iana","extensions":["acu"]},"application/vnd.acucorp":{"source":"iana","extensions":["atc","acutc"]},"application/vnd.adobe.air-application-installer-package+zip":{"source":"apache","extensions":["air"]},"application/vnd.adobe.flash.movie":{"source":"iana"},"application/vnd.adobe.formscentral.fcdt":{"source":"iana","extensions":["fcdt"]},"application/vnd.adobe.fxp":{"source":"iana","extensions":["fxp","fxpl"]},"application/vnd.adobe.partial-upload":{"source":"iana"},"application/vnd.adobe.xdp+xml":{"source":"iana","extensions":["xdp"]},"application/vnd.adobe.xfdf":{"source":"iana","extensions":["xfdf"]},"application/vnd.aether.imp":{"source":"iana"},"application/vnd.ah-barcode":{"source":"iana"},"application/vnd.ahead.space":{"source":"iana","extensions":["ahead"]},"application/vnd.airzip.filesecure.azf":{"source":"iana","extensions":["azf"]},"application/vnd.airzip.filesecure.azs":{"source":"iana","extensions":["azs"]},"application/vnd.amazon.ebook":{"source":"apache","extensions":["azw"]},"application/vnd.amazon.mobi8-ebook":{"source":"iana"},"application/vnd.americandynamics.acc":{"source":"iana","extensions":["acc"]},"application/vnd.amiga.ami":{"source":"iana","extensions":["ami"]},"application/vnd.amundsen.maze+xml":{"source":"iana"},"application/vnd.android.package-archive":{"source":"apache","compressible":false,"extensions":["apk"]},"application/vnd.anki":{"source":"iana"},"application/vnd.anser-web-certificate-issue-initiation":{"source":"iana","extensions":["cii"]},"application/vnd.anser-web-funds-transfer-initiation":{"source":"apache","extensions":["fti"]},"application/vnd.antix.game-component":{"source":"iana","extensions":["atx"]},"application/vnd.apache.thrift.binary":{"source":"iana"},"application/vnd.apache.thrift.compact":{"source":"iana"},"application/vnd.apache.thrift.json":{"source":"iana"},"application/vnd.api+json":{"source":"iana","compressible":true},"application/vnd.apothekende.reservation+json":{"source":"iana","compressible":true},"application/vnd.apple.installer+xml":{"source":"iana","extensions":["mpkg"]},"application/vnd.apple.mpegurl":{"source":"iana","extensions":["m3u8"]},"application/vnd.apple.pkpass":{"compressible":false,"extensions":["pkpass"]},"application/vnd.arastra.swi":{"source":"iana"},"application/vnd.aristanetworks.swi":{"source":"iana","extensions":["swi"]},"application/vnd.artsquare":{"source":"iana"},"application/vnd.astraea-software.iota":{"source":"iana","extensions":["iota"]},"application/vnd.audiograph":{"source":"iana","extensions":["aep"]},"application/vnd.autopackage":{"source":"iana"},"application/vnd.avistar+xml":{"source":"iana"},"application/vnd.balsamiq.bmml+xml":{"source":"iana"},"application/vnd.balsamiq.bmpr":{"source":"iana"},"application/vnd.bekitzur-stech+json":{"source":"iana","compressible":true},"application/vnd.bint.med-content":{"source":"iana"},"application/vnd.biopax.rdf+xml":{"source":"iana"},"application/vnd.blink-idb-value-wrapper":{"source":"iana"},"application/vnd.blueice.multipass":{"source":"iana","extensions":["mpm"]},"application/vnd.bluetooth.ep.oob":{"source":"iana"},"application/vnd.bluetooth.le.oob":{"source":"iana"},"application/vnd.bmi":{"source":"iana","extensions":["bmi"]},"application/vnd.businessobjects":{"source":"iana","extensions":["rep"]},"application/vnd.cab-jscript":{"source":"iana"},"application/vnd.canon-cpdl":{"source":"iana"},"application/vnd.canon-lips":{"source":"iana"},"application/vnd.capasystems-pg+json":{"source":"iana","compressible":true},"application/vnd.cendio.thinlinc.clientconf":{"source":"iana"},"application/vnd.century-systems.tcp_stream":{"source":"iana"},"application/vnd.chemdraw+xml":{"source":"iana","extensions":["cdxml"]},"application/vnd.chess-pgn":{"source":"iana"},"application/vnd.chipnuts.karaoke-mmd":{"source":"iana","extensions":["mmd"]},"application/vnd.cinderella":{"source":"iana","extensions":["cdy"]},"application/vnd.cirpack.isdn-ext":{"source":"iana"},"application/vnd.citationstyles.style+xml":{"source":"iana"},"application/vnd.claymore":{"source":"iana","extensions":["cla"]},"application/vnd.cloanto.rp9":{"source":"iana","extensions":["rp9"]},"application/vnd.clonk.c4group":{"source":"iana","extensions":["c4g","c4d","c4f","c4p","c4u"]},"application/vnd.cluetrust.cartomobile-config":{"source":"iana","extensions":["c11amc"]},"application/vnd.cluetrust.cartomobile-config-pkg":{"source":"iana","extensions":["c11amz"]},"application/vnd.coffeescript":{"source":"iana"},"application/vnd.collection+json":{"source":"iana","compressible":true},"application/vnd.collection.doc+json":{"source":"iana","compressible":true},"application/vnd.collection.next+json":{"source":"iana","compressible":true},"application/vnd.comicbook+zip":{"source":"iana"},"application/vnd.commerce-battelle":{"source":"iana"},"application/vnd.commonspace":{"source":"iana","extensions":["csp"]},"application/vnd.contact.cmsg":{"source":"iana","extensions":["cdbcmsg"]},"application/vnd.coreos.ignition+json":{"source":"iana","compressible":true},"application/vnd.cosmocaller":{"source":"iana","extensions":["cmc"]},"application/vnd.crick.clicker":{"source":"iana","extensions":["clkx"]},"application/vnd.crick.clicker.keyboard":{"source":"iana","extensions":["clkk"]},"application/vnd.crick.clicker.palette":{"source":"iana","extensions":["clkp"]},"application/vnd.crick.clicker.template":{"source":"iana","extensions":["clkt"]},"application/vnd.crick.clicker.wordbank":{"source":"iana","extensions":["clkw"]},"application/vnd.criticaltools.wbs+xml":{"source":"iana","extensions":["wbs"]},"application/vnd.ctc-posml":{"source":"iana","extensions":["pml"]},"application/vnd.ctct.ws+xml":{"source":"iana"},"application/vnd.cups-pdf":{"source":"iana"},"application/vnd.cups-postscript":{"source":"iana"},"application/vnd.cups-ppd":{"source":"iana","extensions":["ppd"]},"application/vnd.cups-raster":{"source":"iana"},"application/vnd.cups-raw":{"source":"iana"},"application/vnd.curl":{"source":"iana"},"application/vnd.curl.car":{"source":"apache","extensions":["car"]},"application/vnd.curl.pcurl":{"source":"apache","extensions":["pcurl"]},"application/vnd.cyan.dean.root+xml":{"source":"iana"},"application/vnd.cybank":{"source":"iana"},"application/vnd.d2l.coursepackage1p0+zip":{"source":"iana"},"application/vnd.dart":{"source":"iana","compressible":true,"extensions":["dart"]},"application/vnd.data-vision.rdz":{"source":"iana","extensions":["rdz"]},"application/vnd.datapackage+json":{"source":"iana","compressible":true},"application/vnd.dataresource+json":{"source":"iana","compressible":true},"application/vnd.debian.binary-package":{"source":"iana"},"application/vnd.dece.data":{"source":"iana","extensions":["uvf","uvvf","uvd","uvvd"]},"application/vnd.dece.ttml+xml":{"source":"iana","extensions":["uvt","uvvt"]},"application/vnd.dece.unspecified":{"source":"iana","extensions":["uvx","uvvx"]},"application/vnd.dece.zip":{"source":"iana","extensions":["uvz","uvvz"]},"application/vnd.denovo.fcselayout-link":{"source":"iana","extensions":["fe_launch"]},"application/vnd.desmume-movie":{"source":"iana"},"application/vnd.desmume.movie":{"source":"apache"},"application/vnd.dir-bi.plate-dl-nosuffix":{"source":"iana"},"application/vnd.dm.delegation+xml":{"source":"iana"},"application/vnd.dna":{"source":"iana","extensions":["dna"]},"application/vnd.document+json":{"source":"iana","compressible":true},"application/vnd.dolby.mlp":{"source":"apache","extensions":["mlp"]},"application/vnd.dolby.mobile.1":{"source":"iana"},"application/vnd.dolby.mobile.2":{"source":"iana"},"application/vnd.doremir.scorecloud-binary-document":{"source":"iana"},"application/vnd.dpgraph":{"source":"iana","extensions":["dpg"]},"application/vnd.dreamfactory":{"source":"iana","extensions":["dfac"]},"application/vnd.drive+json":{"source":"iana","compressible":true},"application/vnd.ds-keypoint":{"source":"apache","extensions":["kpxx"]},"application/vnd.dtg.local":{"source":"iana"},"application/vnd.dtg.local.flash":{"source":"iana"},"application/vnd.dtg.local.html":{"source":"iana"},"application/vnd.dvb.ait":{"source":"iana","extensions":["ait"]},"application/vnd.dvb.dvbj":{"source":"iana"},"application/vnd.dvb.esgcontainer":{"source":"iana"},"application/vnd.dvb.ipdcdftnotifaccess":{"source":"iana"},"application/vnd.dvb.ipdcesgaccess":{"source":"iana"},"application/vnd.dvb.ipdcesgaccess2":{"source":"iana"},"application/vnd.dvb.ipdcesgpdd":{"source":"iana"},"application/vnd.dvb.ipdcroaming":{"source":"iana"},"application/vnd.dvb.iptv.alfec-base":{"source":"iana"},"application/vnd.dvb.iptv.alfec-enhancement":{"source":"iana"},"application/vnd.dvb.notif-aggregate-root+xml":{"source":"iana"},"application/vnd.dvb.notif-container+xml":{"source":"iana"},"application/vnd.dvb.notif-generic+xml":{"source":"iana"},"application/vnd.dvb.notif-ia-msglist+xml":{"source":"iana"},"application/vnd.dvb.notif-ia-registration-request+xml":{"source":"iana"},"application/vnd.dvb.notif-ia-registration-response+xml":{"source":"iana"},"application/vnd.dvb.notif-init+xml":{"source":"iana"},"application/vnd.dvb.pfr":{"source":"iana"},"application/vnd.dvb.service":{"source":"iana","extensions":["svc"]},"application/vnd.dxr":{"source":"iana"},"application/vnd.dynageo":{"source":"iana","extensions":["geo"]},"application/vnd.dzr":{"source":"iana"},"application/vnd.easykaraoke.cdgdownload":{"source":"iana"},"application/vnd.ecdis-update":{"source":"iana"},"application/vnd.ecowin.chart":{"source":"iana","extensions":["mag"]},"application/vnd.ecowin.filerequest":{"source":"iana"},"application/vnd.ecowin.fileupdate":{"source":"iana"},"application/vnd.ecowin.series":{"source":"iana"},"application/vnd.ecowin.seriesrequest":{"source":"iana"},"application/vnd.ecowin.seriesupdate":{"source":"iana"},"application/vnd.efi.img":{"source":"iana"},"application/vnd.efi.iso":{"source":"iana"},"application/vnd.emclient.accessrequest+xml":{"source":"iana"},"application/vnd.enliven":{"source":"iana","extensions":["nml"]},"application/vnd.enphase.envoy":{"source":"iana"},"application/vnd.eprints.data+xml":{"source":"iana"},"application/vnd.epson.esf":{"source":"iana","extensions":["esf"]},"application/vnd.epson.msf":{"source":"iana","extensions":["msf"]},"application/vnd.epson.quickanime":{"source":"iana","extensions":["qam"]},"application/vnd.epson.salt":{"source":"iana","extensions":["slt"]},"application/vnd.epson.ssf":{"source":"iana","extensions":["ssf"]},"application/vnd.ericsson.quickcall":{"source":"iana"},"application/vnd.espass-espass+zip":{"source":"iana"},"application/vnd.eszigno3+xml":{"source":"iana","extensions":["es3","et3"]},"application/vnd.etsi.aoc+xml":{"source":"iana"},"application/vnd.etsi.asic-e+zip":{"source":"iana"},"application/vnd.etsi.asic-s+zip":{"source":"iana"},"application/vnd.etsi.cug+xml":{"source":"iana"},"application/vnd.etsi.iptvcommand+xml":{"source":"iana"},"application/vnd.etsi.iptvdiscovery+xml":{"source":"iana"},"application/vnd.etsi.iptvprofile+xml":{"source":"iana"},"application/vnd.etsi.iptvsad-bc+xml":{"source":"iana"},"application/vnd.etsi.iptvsad-cod+xml":{"source":"iana"},"application/vnd.etsi.iptvsad-npvr+xml":{"source":"iana"},"application/vnd.etsi.iptvservice+xml":{"source":"iana"},"application/vnd.etsi.iptvsync+xml":{"source":"iana"},"application/vnd.etsi.iptvueprofile+xml":{"source":"iana"},"application/vnd.etsi.mcid+xml":{"source":"iana"},"application/vnd.etsi.mheg5":{"source":"iana"},"application/vnd.etsi.overload-control-policy-dataset+xml":{"source":"iana"},"application/vnd.etsi.pstn+xml":{"source":"iana"},"application/vnd.etsi.sci+xml":{"source":"iana"},"application/vnd.etsi.simservs+xml":{"source":"iana"},"application/vnd.etsi.timestamp-token":{"source":"iana"},"application/vnd.etsi.tsl+xml":{"source":"iana"},"application/vnd.etsi.tsl.der":{"source":"iana"},"application/vnd.eudora.data":{"source":"iana"},"application/vnd.evolv.ecig.profile":{"source":"iana"},"application/vnd.evolv.ecig.settings":{"source":"iana"},"application/vnd.evolv.ecig.theme":{"source":"iana"},"application/vnd.ezpix-album":{"source":"iana","extensions":["ez2"]},"application/vnd.ezpix-package":{"source":"iana","extensions":["ez3"]},"application/vnd.f-secure.mobile":{"source":"iana"},"application/vnd.fastcopy-disk-image":{"source":"iana"},"application/vnd.fdf":{"source":"iana","extensions":["fdf"]},"application/vnd.fdsn.mseed":{"source":"iana","extensions":["mseed"]},"application/vnd.fdsn.seed":{"source":"iana","extensions":["seed","dataless"]},"application/vnd.ffsns":{"source":"iana"},"application/vnd.filmit.zfc":{"source":"iana"},"application/vnd.fints":{"source":"iana"},"application/vnd.firemonkeys.cloudcell":{"source":"iana"},"application/vnd.flographit":{"source":"iana","extensions":["gph"]},"application/vnd.fluxtime.clip":{"source":"iana","extensions":["ftc"]},"application/vnd.font-fontforge-sfd":{"source":"iana"},"application/vnd.framemaker":{"source":"iana","extensions":["fm","frame","maker","book"]},"application/vnd.frogans.fnc":{"source":"iana","extensions":["fnc"]},"application/vnd.frogans.ltf":{"source":"iana","extensions":["ltf"]},"application/vnd.fsc.weblaunch":{"source":"iana","extensions":["fsc"]},"application/vnd.fujitsu.oasys":{"source":"iana","extensions":["oas"]},"application/vnd.fujitsu.oasys2":{"source":"iana","extensions":["oa2"]},"application/vnd.fujitsu.oasys3":{"source":"iana","extensions":["oa3"]},"application/vnd.fujitsu.oasysgp":{"source":"iana","extensions":["fg5"]},"application/vnd.fujitsu.oasysprs":{"source":"iana","extensions":["bh2"]},"application/vnd.fujixerox.art-ex":{"source":"iana"},"application/vnd.fujixerox.art4":{"source":"iana"},"application/vnd.fujixerox.ddd":{"source":"iana","extensions":["ddd"]},"application/vnd.fujixerox.docuworks":{"source":"iana","extensions":["xdw"]},"application/vnd.fujixerox.docuworks.binder":{"source":"iana","extensions":["xbd"]},"application/vnd.fujixerox.docuworks.container":{"source":"iana"},"application/vnd.fujixerox.hbpl":{"source":"iana"},"application/vnd.fut-misnet":{"source":"iana"},"application/vnd.fuzzysheet":{"source":"iana","extensions":["fzs"]},"application/vnd.genomatix.tuxedo":{"source":"iana","extensions":["txd"]},"application/vnd.geo+json":{"source":"iana","compressible":true},"application/vnd.geocube+xml":{"source":"iana"},"application/vnd.geogebra.file":{"source":"iana","extensions":["ggb"]},"application/vnd.geogebra.tool":{"source":"iana","extensions":["ggt"]},"application/vnd.geometry-explorer":{"source":"iana","extensions":["gex","gre"]},"application/vnd.geonext":{"source":"iana","extensions":["gxt"]},"application/vnd.geoplan":{"source":"iana","extensions":["g2w"]},"application/vnd.geospace":{"source":"iana","extensions":["g3w"]},"application/vnd.gerber":{"source":"iana"},"application/vnd.globalplatform.card-content-mgt":{"source":"iana"},"application/vnd.globalplatform.card-content-mgt-response":{"source":"iana"},"application/vnd.gmx":{"source":"iana","extensions":["gmx"]},"application/vnd.google-apps.document":{"compressible":false,"extensions":["gdoc"]},"application/vnd.google-apps.presentation":{"compressible":false,"extensions":["gslides"]},"application/vnd.google-apps.spreadsheet":{"compressible":false,"extensions":["gsheet"]},"application/vnd.google-earth.kml+xml":{"source":"iana","compressible":true,"extensions":["kml"]},"application/vnd.google-earth.kmz":{"source":"iana","compressible":false,"extensions":["kmz"]},"application/vnd.gov.sk.e-form+xml":{"source":"iana"},"application/vnd.gov.sk.e-form+zip":{"source":"iana"},"application/vnd.gov.sk.xmldatacontainer+xml":{"source":"iana"},"application/vnd.grafeq":{"source":"iana","extensions":["gqf","gqs"]},"application/vnd.gridmp":{"source":"iana"},"application/vnd.groove-account":{"source":"iana","extensions":["gac"]},"application/vnd.groove-help":{"source":"iana","extensions":["ghf"]},"application/vnd.groove-identity-message":{"source":"iana","extensions":["gim"]},"application/vnd.groove-injector":{"source":"iana","extensions":["grv"]},"application/vnd.groove-tool-message":{"source":"iana","extensions":["gtm"]},"application/vnd.groove-tool-template":{"source":"iana","extensions":["tpl"]},"application/vnd.groove-vcard":{"source":"iana","extensions":["vcg"]},"application/vnd.hal+json":{"source":"iana","compressible":true},"application/vnd.hal+xml":{"source":"iana","extensions":["hal"]},"application/vnd.handheld-entertainment+xml":{"source":"iana","extensions":["zmm"]},"application/vnd.hbci":{"source":"iana","extensions":["hbci"]},"application/vnd.hc+json":{"source":"iana","compressible":true},"application/vnd.hcl-bireports":{"source":"iana"},"application/vnd.hdt":{"source":"iana"},"application/vnd.heroku+json":{"source":"iana","compressible":true},"application/vnd.hhe.lesson-player":{"source":"iana","extensions":["les"]},"application/vnd.hp-hpgl":{"source":"iana","extensions":["hpgl"]},"application/vnd.hp-hpid":{"source":"iana","extensions":["hpid"]},"application/vnd.hp-hps":{"source":"iana","extensions":["hps"]},"application/vnd.hp-jlyt":{"source":"iana","extensions":["jlt"]},"application/vnd.hp-pcl":{"source":"iana","extensions":["pcl"]},"application/vnd.hp-pclxl":{"source":"iana","extensions":["pclxl"]},"application/vnd.httphone":{"source":"iana"},"application/vnd.hydrostatix.sof-data":{"source":"iana","extensions":["sfd-hdstx"]},"application/vnd.hyper-item+json":{"source":"iana","compressible":true},"application/vnd.hyperdrive+json":{"source":"iana","compressible":true},"application/vnd.hzn-3d-crossword":{"source":"iana"},"application/vnd.ibm.afplinedata":{"source":"iana"},"application/vnd.ibm.electronic-media":{"source":"iana"},"application/vnd.ibm.minipay":{"source":"iana","extensions":["mpy"]},"application/vnd.ibm.modcap":{"source":"iana","extensions":["afp","listafp","list3820"]},"application/vnd.ibm.rights-management":{"source":"iana","extensions":["irm"]},"application/vnd.ibm.secure-container":{"source":"iana","extensions":["sc"]},"application/vnd.iccprofile":{"source":"iana","extensions":["icc","icm"]},"application/vnd.ieee.1905":{"source":"iana"},"application/vnd.igloader":{"source":"iana","extensions":["igl"]},"application/vnd.imagemeter.folder+zip":{"source":"iana"},"application/vnd.imagemeter.image+zip":{"source":"iana"},"application/vnd.immervision-ivp":{"source":"iana","extensions":["ivp"]},"application/vnd.immervision-ivu":{"source":"iana","extensions":["ivu"]},"application/vnd.ims.imsccv1p1":{"source":"iana"},"application/vnd.ims.imsccv1p2":{"source":"iana"},"application/vnd.ims.imsccv1p3":{"source":"iana"},"application/vnd.ims.lis.v2.result+json":{"source":"iana","compressible":true},"application/vnd.ims.lti.v2.toolconsumerprofile+json":{"source":"iana","compressible":true},"application/vnd.ims.lti.v2.toolproxy+json":{"source":"iana","compressible":true},"application/vnd.ims.lti.v2.toolproxy.id+json":{"source":"iana","compressible":true},"application/vnd.ims.lti.v2.toolsettings+json":{"source":"iana","compressible":true},"application/vnd.ims.lti.v2.toolsettings.simple+json":{"source":"iana","compressible":true},"application/vnd.informedcontrol.rms+xml":{"source":"iana"},"application/vnd.informix-visionary":{"source":"iana"},"application/vnd.infotech.project":{"source":"iana"},"application/vnd.infotech.project+xml":{"source":"iana"},"application/vnd.innopath.wamp.notification":{"source":"iana"},"application/vnd.insors.igm":{"source":"iana","extensions":["igm"]},"application/vnd.intercon.formnet":{"source":"iana","extensions":["xpw","xpx"]},"application/vnd.intergeo":{"source":"iana","extensions":["i2g"]},"application/vnd.intertrust.digibox":{"source":"iana"},"application/vnd.intertrust.nncp":{"source":"iana"},"application/vnd.intu.qbo":{"source":"iana","extensions":["qbo"]},"application/vnd.intu.qfx":{"source":"iana","extensions":["qfx"]},"application/vnd.iptc.g2.catalogitem+xml":{"source":"iana"},"application/vnd.iptc.g2.conceptitem+xml":{"source":"iana"},"application/vnd.iptc.g2.knowledgeitem+xml":{"source":"iana"},"application/vnd.iptc.g2.newsitem+xml":{"source":"iana"},"application/vnd.iptc.g2.newsmessage+xml":{"source":"iana"},"application/vnd.iptc.g2.packageitem+xml":{"source":"iana"},"application/vnd.iptc.g2.planningitem+xml":{"source":"iana"},"application/vnd.ipunplugged.rcprofile":{"source":"iana","extensions":["rcprofile"]},"application/vnd.irepository.package+xml":{"source":"iana","extensions":["irp"]},"application/vnd.is-xpr":{"source":"iana","extensions":["xpr"]},"application/vnd.isac.fcs":{"source":"iana","extensions":["fcs"]},"application/vnd.jam":{"source":"iana","extensions":["jam"]},"application/vnd.japannet-directory-service":{"source":"iana"},"application/vnd.japannet-jpnstore-wakeup":{"source":"iana"},"application/vnd.japannet-payment-wakeup":{"source":"iana"},"application/vnd.japannet-registration":{"source":"iana"},"application/vnd.japannet-registration-wakeup":{"source":"iana"},"application/vnd.japannet-setstore-wakeup":{"source":"iana"},"application/vnd.japannet-verification":{"source":"iana"},"application/vnd.japannet-verification-wakeup":{"source":"iana"},"application/vnd.jcp.javame.midlet-rms":{"source":"iana","extensions":["rms"]},"application/vnd.jisp":{"source":"iana","extensions":["jisp"]},"application/vnd.joost.joda-archive":{"source":"iana","extensions":["joda"]},"application/vnd.jsk.isdn-ngn":{"source":"iana"},"application/vnd.kahootz":{"source":"iana","extensions":["ktz","ktr"]},"application/vnd.kde.karbon":{"source":"iana","extensions":["karbon"]},"application/vnd.kde.kchart":{"source":"iana","extensions":["chrt"]},"application/vnd.kde.kformula":{"source":"iana","extensions":["kfo"]},"application/vnd.kde.kivio":{"source":"iana","extensions":["flw"]},"application/vnd.kde.kontour":{"source":"iana","extensions":["kon"]},"application/vnd.kde.kpresenter":{"source":"iana","extensions":["kpr","kpt"]},"application/vnd.kde.kspread":{"source":"iana","extensions":["ksp"]},"application/vnd.kde.kword":{"source":"iana","extensions":["kwd","kwt"]},"application/vnd.kenameaapp":{"source":"iana","extensions":["htke"]},"application/vnd.kidspiration":{"source":"iana","extensions":["kia"]},"application/vnd.kinar":{"source":"iana","extensions":["kne","knp"]},"application/vnd.koan":{"source":"iana","extensions":["skp","skd","skt","skm"]},"application/vnd.kodak-descriptor":{"source":"iana","extensions":["sse"]},"application/vnd.las.las+json":{"source":"iana","compressible":true},"application/vnd.las.las+xml":{"source":"iana","extensions":["lasxml"]},"application/vnd.liberty-request+xml":{"source":"iana"},"application/vnd.llamagraphics.life-balance.desktop":{"source":"iana","extensions":["lbd"]},"application/vnd.llamagraphics.life-balance.exchange+xml":{"source":"iana","extensions":["lbe"]},"application/vnd.lotus-1-2-3":{"source":"iana","extensions":["123"]},"application/vnd.lotus-approach":{"source":"iana","extensions":["apr"]},"application/vnd.lotus-freelance":{"source":"iana","extensions":["pre"]},"application/vnd.lotus-notes":{"source":"iana","extensions":["nsf"]},"application/vnd.lotus-organizer":{"source":"iana","extensions":["org"]},"application/vnd.lotus-screencam":{"source":"iana","extensions":["scm"]},"application/vnd.lotus-wordpro":{"source":"iana","extensions":["lwp"]},"application/vnd.macports.portpkg":{"source":"iana","extensions":["portpkg"]},"application/vnd.mapbox-vector-tile":{"source":"iana"},"application/vnd.marlin.drm.actiontoken+xml":{"source":"iana"},"application/vnd.marlin.drm.conftoken+xml":{"source":"iana"},"application/vnd.marlin.drm.license+xml":{"source":"iana"},"application/vnd.marlin.drm.mdcf":{"source":"iana"},"application/vnd.mason+json":{"source":"iana","compressible":true},"application/vnd.maxmind.maxmind-db":{"source":"iana"},"application/vnd.mcd":{"source":"iana","extensions":["mcd"]},"application/vnd.medcalcdata":{"source":"iana","extensions":["mc1"]},"application/vnd.mediastation.cdkey":{"source":"iana","extensions":["cdkey"]},"application/vnd.meridian-slingshot":{"source":"iana"},"application/vnd.mfer":{"source":"iana","extensions":["mwf"]},"application/vnd.mfmp":{"source":"iana","extensions":["mfm"]},"application/vnd.micro+json":{"source":"iana","compressible":true},"application/vnd.micrografx.flo":{"source":"iana","extensions":["flo"]},"application/vnd.micrografx.igx":{"source":"iana","extensions":["igx"]},"application/vnd.microsoft.portable-executable":{"source":"iana"},"application/vnd.microsoft.windows.thumbnail-cache":{"source":"iana"},"application/vnd.miele+json":{"source":"iana","compressible":true},"application/vnd.mif":{"source":"iana","extensions":["mif"]},"application/vnd.minisoft-hp3000-save":{"source":"iana"},"application/vnd.mitsubishi.misty-guard.trustweb":{"source":"iana"},"application/vnd.mobius.daf":{"source":"iana","extensions":["daf"]},"application/vnd.mobius.dis":{"source":"iana","extensions":["dis"]},"application/vnd.mobius.mbk":{"source":"iana","extensions":["mbk"]},"application/vnd.mobius.mqy":{"source":"iana","extensions":["mqy"]},"application/vnd.mobius.msl":{"source":"iana","extensions":["msl"]},"application/vnd.mobius.plc":{"source":"iana","extensions":["plc"]},"application/vnd.mobius.txf":{"source":"iana","extensions":["txf"]},"application/vnd.mophun.application":{"source":"iana","extensions":["mpn"]},"application/vnd.mophun.certificate":{"source":"iana","extensions":["mpc"]},"application/vnd.motorola.flexsuite":{"source":"iana"},"application/vnd.motorola.flexsuite.adsi":{"source":"iana"},"application/vnd.motorola.flexsuite.fis":{"source":"iana"},"application/vnd.motorola.flexsuite.gotap":{"source":"iana"},"application/vnd.motorola.flexsuite.kmr":{"source":"iana"},"application/vnd.motorola.flexsuite.ttc":{"source":"iana"},"application/vnd.motorola.flexsuite.wem":{"source":"iana"},"application/vnd.motorola.iprm":{"source":"iana"},"application/vnd.mozilla.xul+xml":{"source":"iana","compressible":true,"extensions":["xul"]},"application/vnd.ms-3mfdocument":{"source":"iana"},"application/vnd.ms-artgalry":{"source":"iana","extensions":["cil"]},"application/vnd.ms-asf":{"source":"iana"},"application/vnd.ms-cab-compressed":{"source":"iana","extensions":["cab"]},"application/vnd.ms-color.iccprofile":{"source":"apache"},"application/vnd.ms-excel":{"source":"iana","compressible":false,"extensions":["xls","xlm","xla","xlc","xlt","xlw"]},"application/vnd.ms-excel.addin.macroenabled.12":{"source":"iana","extensions":["xlam"]},"application/vnd.ms-excel.sheet.binary.macroenabled.12":{"source":"iana","extensions":["xlsb"]},"application/vnd.ms-excel.sheet.macroenabled.12":{"source":"iana","extensions":["xlsm"]},"application/vnd.ms-excel.template.macroenabled.12":{"source":"iana","extensions":["xltm"]},"application/vnd.ms-fontobject":{"source":"iana","compressible":true,"extensions":["eot"]},"application/vnd.ms-htmlhelp":{"source":"iana","extensions":["chm"]},"application/vnd.ms-ims":{"source":"iana","extensions":["ims"]},"application/vnd.ms-lrm":{"source":"iana","extensions":["lrm"]},"application/vnd.ms-office.activex+xml":{"source":"iana"},"application/vnd.ms-officetheme":{"source":"iana","extensions":["thmx"]},"application/vnd.ms-opentype":{"source":"apache","compressible":true},"application/vnd.ms-outlook":{"compressible":false,"extensions":["msg"]},"application/vnd.ms-package.obfuscated-opentype":{"source":"apache"},"application/vnd.ms-pki.seccat":{"source":"apache","extensions":["cat"]},"application/vnd.ms-pki.stl":{"source":"apache","extensions":["stl"]},"application/vnd.ms-playready.initiator+xml":{"source":"iana"},"application/vnd.ms-powerpoint":{"source":"iana","compressible":false,"extensions":["ppt","pps","pot"]},"application/vnd.ms-powerpoint.addin.macroenabled.12":{"source":"iana","extensions":["ppam"]},"application/vnd.ms-powerpoint.presentation.macroenabled.12":{"source":"iana","extensions":["pptm"]},"application/vnd.ms-powerpoint.slide.macroenabled.12":{"source":"iana","extensions":["sldm"]},"application/vnd.ms-powerpoint.slideshow.macroenabled.12":{"source":"iana","extensions":["ppsm"]},"application/vnd.ms-powerpoint.template.macroenabled.12":{"source":"iana","extensions":["potm"]},"application/vnd.ms-printdevicecapabilities+xml":{"source":"iana"},"application/vnd.ms-printing.printticket+xml":{"source":"apache"},"application/vnd.ms-printschematicket+xml":{"source":"iana"},"application/vnd.ms-project":{"source":"iana","extensions":["mpp","mpt"]},"application/vnd.ms-tnef":{"source":"iana"},"application/vnd.ms-windows.devicepairing":{"source":"iana"},"application/vnd.ms-windows.nwprinting.oob":{"source":"iana"},"application/vnd.ms-windows.printerpairing":{"source":"iana"},"application/vnd.ms-windows.wsd.oob":{"source":"iana"},"application/vnd.ms-wmdrm.lic-chlg-req":{"source":"iana"},"application/vnd.ms-wmdrm.lic-resp":{"source":"iana"},"application/vnd.ms-wmdrm.meter-chlg-req":{"source":"iana"},"application/vnd.ms-wmdrm.meter-resp":{"source":"iana"},"application/vnd.ms-word.document.macroenabled.12":{"source":"iana","extensions":["docm"]},"application/vnd.ms-word.template.macroenabled.12":{"source":"iana","extensions":["dotm"]},"application/vnd.ms-works":{"source":"iana","extensions":["wps","wks","wcm","wdb"]},"application/vnd.ms-wpl":{"source":"iana","extensions":["wpl"]},"application/vnd.ms-xpsdocument":{"source":"iana","compressible":false,"extensions":["xps"]},"application/vnd.msa-disk-image":{"source":"iana"},"application/vnd.mseq":{"source":"iana","extensions":["mseq"]},"application/vnd.msign":{"source":"iana"},"application/vnd.multiad.creator":{"source":"iana"},"application/vnd.multiad.creator.cif":{"source":"iana"},"application/vnd.music-niff":{"source":"iana"},"application/vnd.musician":{"source":"iana","extensions":["mus"]},"application/vnd.muvee.style":{"source":"iana","extensions":["msty"]},"application/vnd.mynfc":{"source":"iana","extensions":["taglet"]},"application/vnd.ncd.control":{"source":"iana"},"application/vnd.ncd.reference":{"source":"iana"},"application/vnd.nearst.inv+json":{"source":"iana","compressible":true},"application/vnd.nervana":{"source":"iana"},"application/vnd.netfpx":{"source":"iana"},"application/vnd.neurolanguage.nlu":{"source":"iana","extensions":["nlu"]},"application/vnd.nintendo.nitro.rom":{"source":"iana"},"application/vnd.nintendo.snes.rom":{"source":"iana"},"application/vnd.nitf":{"source":"iana","extensions":["ntf","nitf"]},"application/vnd.noblenet-directory":{"source":"iana","extensions":["nnd"]},"application/vnd.noblenet-sealer":{"source":"iana","extensions":["nns"]},"application/vnd.noblenet-web":{"source":"iana","extensions":["nnw"]},"application/vnd.nokia.catalogs":{"source":"iana"},"application/vnd.nokia.conml+wbxml":{"source":"iana"},"application/vnd.nokia.conml+xml":{"source":"iana"},"application/vnd.nokia.iptv.config+xml":{"source":"iana"},"application/vnd.nokia.isds-radio-presets":{"source":"iana"},"application/vnd.nokia.landmark+wbxml":{"source":"iana"},"application/vnd.nokia.landmark+xml":{"source":"iana"},"application/vnd.nokia.landmarkcollection+xml":{"source":"iana"},"application/vnd.nokia.n-gage.ac+xml":{"source":"iana"},"application/vnd.nokia.n-gage.data":{"source":"iana","extensions":["ngdat"]},"application/vnd.nokia.n-gage.symbian.install":{"source":"iana","extensions":["n-gage"]},"application/vnd.nokia.ncd":{"source":"iana"},"application/vnd.nokia.pcd+wbxml":{"source":"iana"},"application/vnd.nokia.pcd+xml":{"source":"iana"},"application/vnd.nokia.radio-preset":{"source":"iana","extensions":["rpst"]},"application/vnd.nokia.radio-presets":{"source":"iana","extensions":["rpss"]},"application/vnd.novadigm.edm":{"source":"iana","extensions":["edm"]},"application/vnd.novadigm.edx":{"source":"iana","extensions":["edx"]},"application/vnd.novadigm.ext":{"source":"iana","extensions":["ext"]},"application/vnd.ntt-local.content-share":{"source":"iana"},"application/vnd.ntt-local.file-transfer":{"source":"iana"},"application/vnd.ntt-local.ogw_remote-access":{"source":"iana"},"application/vnd.ntt-local.sip-ta_remote":{"source":"iana"},"application/vnd.ntt-local.sip-ta_tcp_stream":{"source":"iana"},"application/vnd.oasis.opendocument.chart":{"source":"iana","extensions":["odc"]},"application/vnd.oasis.opendocument.chart-template":{"source":"iana","extensions":["otc"]},"application/vnd.oasis.opendocument.database":{"source":"iana","extensions":["odb"]},"application/vnd.oasis.opendocument.formula":{"source":"iana","extensions":["odf"]},"application/vnd.oasis.opendocument.formula-template":{"source":"iana","extensions":["odft"]},"application/vnd.oasis.opendocument.graphics":{"source":"iana","compressible":false,"extensions":["odg"]},"application/vnd.oasis.opendocument.graphics-template":{"source":"iana","extensions":["otg"]},"application/vnd.oasis.opendocument.image":{"source":"iana","extensions":["odi"]},"application/vnd.oasis.opendocument.image-template":{"source":"iana","extensions":["oti"]},"application/vnd.oasis.opendocument.presentation":{"source":"iana","compressible":false,"extensions":["odp"]},"application/vnd.oasis.opendocument.presentation-template":{"source":"iana","extensions":["otp"]},"application/vnd.oasis.opendocument.spreadsheet":{"source":"iana","compressible":false,"extensions":["ods"]},"application/vnd.oasis.opendocument.spreadsheet-template":{"source":"iana","extensions":["ots"]},"application/vnd.oasis.opendocument.text":{"source":"iana","compressible":false,"extensions":["odt"]},"application/vnd.oasis.opendocument.text-master":{"source":"iana","extensions":["odm"]},"application/vnd.oasis.opendocument.text-template":{"source":"iana","extensions":["ott"]},"application/vnd.oasis.opendocument.text-web":{"source":"iana","extensions":["oth"]},"application/vnd.obn":{"source":"iana"},"application/vnd.ocf+cbor":{"source":"iana"},"application/vnd.oftn.l10n+json":{"source":"iana","compressible":true},"application/vnd.oipf.contentaccessdownload+xml":{"source":"iana"},"application/vnd.oipf.contentaccessstreaming+xml":{"source":"iana"},"application/vnd.oipf.cspg-hexbinary":{"source":"iana"},"application/vnd.oipf.dae.svg+xml":{"source":"iana"},"application/vnd.oipf.dae.xhtml+xml":{"source":"iana"},"application/vnd.oipf.mippvcontrolmessage+xml":{"source":"iana"},"application/vnd.oipf.pae.gem":{"source":"iana"},"application/vnd.oipf.spdiscovery+xml":{"source":"iana"},"application/vnd.oipf.spdlist+xml":{"source":"iana"},"application/vnd.oipf.ueprofile+xml":{"source":"iana"},"application/vnd.oipf.userprofile+xml":{"source":"iana"},"application/vnd.olpc-sugar":{"source":"iana","extensions":["xo"]},"application/vnd.oma-scws-config":{"source":"iana"},"application/vnd.oma-scws-http-request":{"source":"iana"},"application/vnd.oma-scws-http-response":{"source":"iana"},"application/vnd.oma.bcast.associated-procedure-parameter+xml":{"source":"iana"},"application/vnd.oma.bcast.drm-trigger+xml":{"source":"iana"},"application/vnd.oma.bcast.imd+xml":{"source":"iana"},"application/vnd.oma.bcast.ltkm":{"source":"iana"},"application/vnd.oma.bcast.notification+xml":{"source":"iana"},"application/vnd.oma.bcast.provisioningtrigger":{"source":"iana"},"application/vnd.oma.bcast.sgboot":{"source":"iana"},"application/vnd.oma.bcast.sgdd+xml":{"source":"iana"},"application/vnd.oma.bcast.sgdu":{"source":"iana"},"application/vnd.oma.bcast.simple-symbol-container":{"source":"iana"},"application/vnd.oma.bcast.smartcard-trigger+xml":{"source":"iana"},"application/vnd.oma.bcast.sprov+xml":{"source":"iana"},"application/vnd.oma.bcast.stkm":{"source":"iana"},"application/vnd.oma.cab-address-book+xml":{"source":"iana"},"application/vnd.oma.cab-feature-handler+xml":{"source":"iana"},"application/vnd.oma.cab-pcc+xml":{"source":"iana"},"application/vnd.oma.cab-subs-invite+xml":{"source":"iana"},"application/vnd.oma.cab-user-prefs+xml":{"source":"iana"},"application/vnd.oma.dcd":{"source":"iana"},"application/vnd.oma.dcdc":{"source":"iana"},"application/vnd.oma.dd2+xml":{"source":"iana","extensions":["dd2"]},"application/vnd.oma.drm.risd+xml":{"source":"iana"},"application/vnd.oma.group-usage-list+xml":{"source":"iana"},"application/vnd.oma.lwm2m+json":{"source":"iana","compressible":true},"application/vnd.oma.lwm2m+tlv":{"source":"iana"},"application/vnd.oma.pal+xml":{"source":"iana"},"application/vnd.oma.poc.detailed-progress-report+xml":{"source":"iana"},"application/vnd.oma.poc.final-report+xml":{"source":"iana"},"application/vnd.oma.poc.groups+xml":{"source":"iana"},"application/vnd.oma.poc.invocation-descriptor+xml":{"source":"iana"},"application/vnd.oma.poc.optimized-progress-report+xml":{"source":"iana"},"application/vnd.oma.push":{"source":"iana"},"application/vnd.oma.scidm.messages+xml":{"source":"iana"},"application/vnd.oma.xcap-directory+xml":{"source":"iana"},"application/vnd.omads-email+xml":{"source":"iana"},"application/vnd.omads-file+xml":{"source":"iana"},"application/vnd.omads-folder+xml":{"source":"iana"},"application/vnd.omaloc-supl-init":{"source":"iana"},"application/vnd.onepager":{"source":"iana"},"application/vnd.onepagertamp":{"source":"iana"},"application/vnd.onepagertamx":{"source":"iana"},"application/vnd.onepagertat":{"source":"iana"},"application/vnd.onepagertatp":{"source":"iana"},"application/vnd.onepagertatx":{"source":"iana"},"application/vnd.openblox.game+xml":{"source":"iana"},"application/vnd.openblox.game-binary":{"source":"iana"},"application/vnd.openeye.oeb":{"source":"iana"},"application/vnd.openofficeorg.extension":{"source":"apache","extensions":["oxt"]},"application/vnd.openstreetmap.data+xml":{"source":"iana"},"application/vnd.openxmlformats-officedocument.custom-properties+xml":{"source":"iana"},"application/vnd.openxmlformats-officedocument.customxmlproperties+xml":{"source":"iana"},"application/vnd.openxmlformats-officedocument.drawing+xml":{"source":"iana"},"application/vnd.openxmlformats-officedocument.drawingml.chart+xml":{"source":"iana"},"application/vnd.openxmlformats-officedocument.drawingml.chartshapes+xml":{"source":"iana"},"application/vnd.openxmlformats-officedocument.drawingml.diagramcolors+xml":{"source":"iana"},"application/vnd.openxmlformats-officedocument.drawingml.diagramdata+xml":{"source":"iana"},"application/vnd.openxmlformats-officedocument.drawingml.diagramlayout+xml":{"source":"iana"},"application/vnd.openxmlformats-officedocument.drawingml.diagramstyle+xml":{"source":"iana"},"application/vnd.openxmlformats-officedocument.extended-properties+xml":{"source":"iana"},"application/vnd.openxmlformats-officedocument.presentationml-template":{"source":"iana"},"application/vnd.openxmlformats-officedocument.presentationml.commentauthors+xml":{"source":"iana"},"application/vnd.openxmlformats-officedocument.presentationml.comments+xml":{"source":"iana"},"application/vnd.openxmlformats-officedocument.presentationml.handoutmaster+xml":{"source":"iana"},"application/vnd.openxmlformats-officedocument.presentationml.notesmaster+xml":{"source":"iana"},"application/vnd.openxmlformats-officedocument.presentationml.notesslide+xml":{"source":"iana"},"application/vnd.openxmlformats-officedocument.presentationml.presentation":{"source":"iana","compressible":false,"extensions":["pptx"]},"application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml":{"source":"iana"},"application/vnd.openxmlformats-officedocument.presentationml.presprops+xml":{"source":"iana"},"application/vnd.openxmlformats-officedocument.presentationml.slide":{"source":"iana","extensions":["sldx"]},"application/vnd.openxmlformats-officedocument.presentationml.slide+xml":{"source":"iana"},"application/vnd.openxmlformats-officedocument.presentationml.slidelayout+xml":{"source":"iana"},"application/vnd.openxmlformats-officedocument.presentationml.slidemaster+xml":{"source":"iana"},"application/vnd.openxmlformats-officedocument.presentationml.slideshow":{"source":"iana","extensions":["ppsx"]},"application/vnd.openxmlformats-officedocument.presentationml.slideshow.main+xml":{"source":"iana"},"application/vnd.openxmlformats-officedocument.presentationml.slideupdateinfo+xml":{"source":"iana"},"application/vnd.openxmlformats-officedocument.presentationml.tablestyles+xml":{"source":"iana"},"application/vnd.openxmlformats-officedocument.presentationml.tags+xml":{"source":"iana"},"application/vnd.openxmlformats-officedocument.presentationml.template":{"source":"apache","extensions":["potx"]},"application/vnd.openxmlformats-officedocument.presentationml.template.main+xml":{"source":"iana"},"application/vnd.openxmlformats-officedocument.presentationml.viewprops+xml":{"source":"iana"},"application/vnd.openxmlformats-officedocument.spreadsheetml-template":{"source":"iana"},"application/vnd.openxmlformats-officedocument.spreadsheetml.calcchain+xml":{"source":"iana"},"application/vnd.openxmlformats-officedocument.spreadsheetml.chartsheet+xml":{"source":"iana"},"application/vnd.openxmlformats-officedocument.spreadsheetml.comments+xml":{"source":"iana"},"application/vnd.openxmlformats-officedocument.spreadsheetml.connections+xml":{"source":"iana"},"application/vnd.openxmlformats-officedocument.spreadsheetml.dialogsheet+xml":{"source":"iana"},"application/vnd.openxmlformats-officedocument.spreadsheetml.externallink+xml":{"source":"iana"},"application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcachedefinition+xml":{"source":"iana"},"application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcacherecords+xml":{"source":"iana"},"application/vnd.openxmlformats-officedocument.spreadsheetml.pivottable+xml":{"source":"iana"},"application/vnd.openxmlformats-officedocument.spreadsheetml.querytable+xml":{"source":"iana"},"application/vnd.openxmlformats-officedocument.spreadsheetml.revisionheaders+xml":{"source":"iana"},"application/vnd.openxmlformats-officedocument.spreadsheetml.revisionlog+xml":{"source":"iana"},"application/vnd.openxmlformats-officedocument.spreadsheetml.sharedstrings+xml":{"source":"iana"},"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":{"source":"iana","compressible":false,"extensions":["xlsx"]},"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml":{"source":"iana"},"application/vnd.openxmlformats-officedocument.spreadsheetml.sheetmetadata+xml":{"source":"iana"},"application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml":{"source":"iana"},"application/vnd.openxmlformats-officedocument.spreadsheetml.table+xml":{"source":"iana"},"application/vnd.openxmlformats-officedocument.spreadsheetml.tablesinglecells+xml":{"source":"iana"},"application/vnd.openxmlformats-officedocument.spreadsheetml.template":{"source":"apache","extensions":["xltx"]},"application/vnd.openxmlformats-officedocument.spreadsheetml.template.main+xml":{"source":"iana"},"application/vnd.openxmlformats-officedocument.spreadsheetml.usernames+xml":{"source":"iana"},"application/vnd.openxmlformats-officedocument.spreadsheetml.volatiledependencies+xml":{"source":"iana"},"application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml":{"source":"iana"},"application/vnd.openxmlformats-officedocument.theme+xml":{"source":"iana"},"application/vnd.openxmlformats-officedocument.themeoverride+xml":{"source":"iana"},"application/vnd.openxmlformats-officedocument.vmldrawing":{"source":"iana"},"application/vnd.openxmlformats-officedocument.wordprocessingml-template":{"source":"iana"},"application/vnd.openxmlformats-officedocument.wordprocessingml.comments+xml":{"source":"iana"},"application/vnd.openxmlformats-officedocument.wordprocessingml.document":{"source":"iana","compressible":false,"extensions":["docx"]},"application/vnd.openxmlformats-officedocument.wordprocessingml.document.glossary+xml":{"source":"iana"},"application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml":{"source":"iana"},"application/vnd.openxmlformats-officedocument.wordprocessingml.endnotes+xml":{"source":"iana"},"application/vnd.openxmlformats-officedocument.wordprocessingml.fonttable+xml":{"source":"iana"},"application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml":{"source":"iana"},"application/vnd.openxmlformats-officedocument.wordprocessingml.footnotes+xml":{"source":"iana"},"application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml":{"source":"iana"},"application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml":{"source":"iana"},"application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml":{"source":"iana"},"application/vnd.openxmlformats-officedocument.wordprocessingml.template":{"source":"apache","extensions":["dotx"]},"application/vnd.openxmlformats-officedocument.wordprocessingml.template.main+xml":{"source":"iana"},"application/vnd.openxmlformats-officedocument.wordprocessingml.websettings+xml":{"source":"iana"},"application/vnd.openxmlformats-package.core-properties+xml":{"source":"iana"},"application/vnd.openxmlformats-package.digital-signature-xmlsignature+xml":{"source":"iana"},"application/vnd.openxmlformats-package.relationships+xml":{"source":"iana"},"application/vnd.oracle.resource+json":{"source":"iana","compressible":true},"application/vnd.orange.indata":{"source":"iana"},"application/vnd.osa.netdeploy":{"source":"iana"},"application/vnd.osgeo.mapguide.package":{"source":"iana","extensions":["mgp"]},"application/vnd.osgi.bundle":{"source":"iana"},"application/vnd.osgi.dp":{"source":"iana","extensions":["dp"]},"application/vnd.osgi.subsystem":{"source":"iana","extensions":["esa"]},"application/vnd.otps.ct-kip+xml":{"source":"iana"},"application/vnd.oxli.countgraph":{"source":"iana"},"application/vnd.pagerduty+json":{"source":"iana","compressible":true},"application/vnd.palm":{"source":"iana","extensions":["pdb","pqa","oprc"]},"application/vnd.panoply":{"source":"iana"},"application/vnd.paos+xml":{"source":"iana"},"application/vnd.paos.xml":{"source":"apache"},"application/vnd.pawaafile":{"source":"iana","extensions":["paw"]},"application/vnd.pcos":{"source":"iana"},"application/vnd.pg.format":{"source":"iana","extensions":["str"]},"application/vnd.pg.osasli":{"source":"iana","extensions":["ei6"]},"application/vnd.piaccess.application-licence":{"source":"iana"},"application/vnd.picsel":{"source":"iana","extensions":["efif"]},"application/vnd.pmi.widget":{"source":"iana","extensions":["wg"]},"application/vnd.poc.group-advertisement+xml":{"source":"iana"},"application/vnd.pocketlearn":{"source":"iana","extensions":["plf"]},"application/vnd.powerbuilder6":{"source":"iana","extensions":["pbd"]},"application/vnd.powerbuilder6-s":{"source":"iana"},"application/vnd.powerbuilder7":{"source":"iana"},"application/vnd.powerbuilder7-s":{"source":"iana"},"application/vnd.powerbuilder75":{"source":"iana"},"application/vnd.powerbuilder75-s":{"source":"iana"},"application/vnd.preminet":{"source":"iana"},"application/vnd.previewsystems.box":{"source":"iana","extensions":["box"]},"application/vnd.proteus.magazine":{"source":"iana","extensions":["mgz"]},"application/vnd.publishare-delta-tree":{"source":"iana","extensions":["qps"]},"application/vnd.pvi.ptid1":{"source":"iana","extensions":["ptid"]},"application/vnd.pwg-multiplexed":{"source":"iana"},"application/vnd.pwg-xhtml-print+xml":{"source":"iana"},"application/vnd.qualcomm.brew-app-res":{"source":"iana"},"application/vnd.quarantainenet":{"source":"iana"},"application/vnd.quark.quarkxpress":{"source":"iana","extensions":["qxd","qxt","qwd","qwt","qxl","qxb"]},"application/vnd.quobject-quoxdocument":{"source":"iana"},"application/vnd.radisys.moml+xml":{"source":"iana"},"application/vnd.radisys.msml+xml":{"source":"iana"},"application/vnd.radisys.msml-audit+xml":{"source":"iana"},"application/vnd.radisys.msml-audit-conf+xml":{"source":"iana"},"application/vnd.radisys.msml-audit-conn+xml":{"source":"iana"},"application/vnd.radisys.msml-audit-dialog+xml":{"source":"iana"},"application/vnd.radisys.msml-audit-stream+xml":{"source":"iana"},"application/vnd.radisys.msml-conf+xml":{"source":"iana"},"application/vnd.radisys.msml-dialog+xml":{"source":"iana"},"application/vnd.radisys.msml-dialog-base+xml":{"source":"iana"},"application/vnd.radisys.msml-dialog-fax-detect+xml":{"source":"iana"},"application/vnd.radisys.msml-dialog-fax-sendrecv+xml":{"source":"iana"},"application/vnd.radisys.msml-dialog-group+xml":{"source":"iana"},"application/vnd.radisys.msml-dialog-speech+xml":{"source":"iana"},"application/vnd.radisys.msml-dialog-transform+xml":{"source":"iana"},"application/vnd.rainstor.data":{"source":"iana"},"application/vnd.rapid":{"source":"iana"},"application/vnd.rar":{"source":"iana"},"application/vnd.realvnc.bed":{"source":"iana","extensions":["bed"]},"application/vnd.recordare.musicxml":{"source":"iana","extensions":["mxl"]},"application/vnd.recordare.musicxml+xml":{"source":"iana","extensions":["musicxml"]},"application/vnd.renlearn.rlprint":{"source":"iana"},"application/vnd.rig.cryptonote":{"source":"iana","extensions":["cryptonote"]},"application/vnd.rim.cod":{"source":"apache","extensions":["cod"]},"application/vnd.rn-realmedia":{"source":"apache","extensions":["rm"]},"application/vnd.rn-realmedia-vbr":{"source":"apache","extensions":["rmvb"]},"application/vnd.route66.link66+xml":{"source":"iana","extensions":["link66"]},"application/vnd.rs-274x":{"source":"iana"},"application/vnd.ruckus.download":{"source":"iana"},"application/vnd.s3sms":{"source":"iana"},"application/vnd.sailingtracker.track":{"source":"iana","extensions":["st"]},"application/vnd.sbm.cid":{"source":"iana"},"application/vnd.sbm.mid2":{"source":"iana"},"application/vnd.scribus":{"source":"iana"},"application/vnd.sealed.3df":{"source":"iana"},"application/vnd.sealed.csf":{"source":"iana"},"application/vnd.sealed.doc":{"source":"iana"},"application/vnd.sealed.eml":{"source":"iana"},"application/vnd.sealed.mht":{"source":"iana"},"application/vnd.sealed.net":{"source":"iana"},"application/vnd.sealed.ppt":{"source":"iana"},"application/vnd.sealed.tiff":{"source":"iana"},"application/vnd.sealed.xls":{"source":"iana"},"application/vnd.sealedmedia.softseal.html":{"source":"iana"},"application/vnd.sealedmedia.softseal.pdf":{"source":"iana"},"application/vnd.seemail":{"source":"iana","extensions":["see"]},"application/vnd.sema":{"source":"iana","extensions":["sema"]},"application/vnd.semd":{"source":"iana","extensions":["semd"]},"application/vnd.semf":{"source":"iana","extensions":["semf"]},"application/vnd.shana.informed.formdata":{"source":"iana","extensions":["ifm"]},"application/vnd.shana.informed.formtemplate":{"source":"iana","extensions":["itp"]},"application/vnd.shana.informed.interchange":{"source":"iana","extensions":["iif"]},"application/vnd.shana.informed.package":{"source":"iana","extensions":["ipk"]},"application/vnd.sigrok.session":{"source":"iana"},"application/vnd.simtech-mindmapper":{"source":"iana","extensions":["twd","twds"]},"application/vnd.siren+json":{"source":"iana","compressible":true},"application/vnd.smaf":{"source":"iana","extensions":["mmf"]},"application/vnd.smart.notebook":{"source":"iana"},"application/vnd.smart.teacher":{"source":"iana","extensions":["teacher"]},"application/vnd.software602.filler.form+xml":{"source":"iana"},"application/vnd.software602.filler.form-xml-zip":{"source":"iana"},"application/vnd.solent.sdkm+xml":{"source":"iana","extensions":["sdkm","sdkd"]},"application/vnd.spotfire.dxp":{"source":"iana","extensions":["dxp"]},"application/vnd.spotfire.sfs":{"source":"iana","extensions":["sfs"]},"application/vnd.sss-cod":{"source":"iana"},"application/vnd.sss-dtf":{"source":"iana"},"application/vnd.sss-ntf":{"source":"iana"},"application/vnd.stardivision.calc":{"source":"apache","extensions":["sdc"]},"application/vnd.stardivision.draw":{"source":"apache","extensions":["sda"]},"application/vnd.stardivision.impress":{"source":"apache","extensions":["sdd"]},"application/vnd.stardivision.math":{"source":"apache","extensions":["smf"]},"application/vnd.stardivision.writer":{"source":"apache","extensions":["sdw","vor"]},"application/vnd.stardivision.writer-global":{"source":"apache","extensions":["sgl"]},"application/vnd.stepmania.package":{"source":"iana","extensions":["smzip"]},"application/vnd.stepmania.stepchart":{"source":"iana","extensions":["sm"]},"application/vnd.street-stream":{"source":"iana"},"application/vnd.sun.wadl+xml":{"source":"iana","compressible":true,"extensions":["wadl"]},"application/vnd.sun.xml.calc":{"source":"apache","extensions":["sxc"]},"application/vnd.sun.xml.calc.template":{"source":"apache","extensions":["stc"]},"application/vnd.sun.xml.draw":{"source":"apache","extensions":["sxd"]},"application/vnd.sun.xml.draw.template":{"source":"apache","extensions":["std"]},"application/vnd.sun.xml.impress":{"source":"apache","extensions":["sxi"]},"application/vnd.sun.xml.impress.template":{"source":"apache","extensions":["sti"]},"application/vnd.sun.xml.math":{"source":"apache","extensions":["sxm"]},"application/vnd.sun.xml.writer":{"source":"apache","extensions":["sxw"]},"application/vnd.sun.xml.writer.global":{"source":"apache","extensions":["sxg"]},"application/vnd.sun.xml.writer.template":{"source":"apache","extensions":["stw"]},"application/vnd.sus-calendar":{"source":"iana","extensions":["sus","susp"]},"application/vnd.svd":{"source":"iana","extensions":["svd"]},"application/vnd.swiftview-ics":{"source":"iana"},"application/vnd.symbian.install":{"source":"apache","extensions":["sis","sisx"]},"application/vnd.syncml+xml":{"source":"iana","extensions":["xsm"]},"application/vnd.syncml.dm+wbxml":{"source":"iana","extensions":["bdm"]},"application/vnd.syncml.dm+xml":{"source":"iana","extensions":["xdm"]},"application/vnd.syncml.dm.notification":{"source":"iana"},"application/vnd.syncml.dmddf+wbxml":{"source":"iana"},"application/vnd.syncml.dmddf+xml":{"source":"iana"},"application/vnd.syncml.dmtnds+wbxml":{"source":"iana"},"application/vnd.syncml.dmtnds+xml":{"source":"iana"},"application/vnd.syncml.ds.notification":{"source":"iana"},"application/vnd.tableschema+json":{"source":"iana","compressible":true},"application/vnd.tao.intent-module-archive":{"source":"iana","extensions":["tao"]},"application/vnd.tcpdump.pcap":{"source":"iana","extensions":["pcap","cap","dmp"]},"application/vnd.tmd.mediaflex.api+xml":{"source":"iana"},"application/vnd.tml":{"source":"iana"},"application/vnd.tmobile-livetv":{"source":"iana","extensions":["tmo"]},"application/vnd.tri.onesource":{"source":"iana"},"application/vnd.trid.tpt":{"source":"iana","extensions":["tpt"]},"application/vnd.triscape.mxs":{"source":"iana","extensions":["mxs"]},"application/vnd.trueapp":{"source":"iana","extensions":["tra"]},"application/vnd.truedoc":{"source":"iana"},"application/vnd.ubisoft.webplayer":{"source":"iana"},"application/vnd.ufdl":{"source":"iana","extensions":["ufd","ufdl"]},"application/vnd.uiq.theme":{"source":"iana","extensions":["utz"]},"application/vnd.umajin":{"source":"iana","extensions":["umj"]},"application/vnd.unity":{"source":"iana","extensions":["unityweb"]},"application/vnd.uoml+xml":{"source":"iana","extensions":["uoml"]},"application/vnd.uplanet.alert":{"source":"iana"},"application/vnd.uplanet.alert-wbxml":{"source":"iana"},"application/vnd.uplanet.bearer-choice":{"source":"iana"},"application/vnd.uplanet.bearer-choice-wbxml":{"source":"iana"},"application/vnd.uplanet.cacheop":{"source":"iana"},"application/vnd.uplanet.cacheop-wbxml":{"source":"iana"},"application/vnd.uplanet.channel":{"source":"iana"},"application/vnd.uplanet.channel-wbxml":{"source":"iana"},"application/vnd.uplanet.list":{"source":"iana"},"application/vnd.uplanet.list-wbxml":{"source":"iana"},"application/vnd.uplanet.listcmd":{"source":"iana"},"application/vnd.uplanet.listcmd-wbxml":{"source":"iana"},"application/vnd.uplanet.signal":{"source":"iana"},"application/vnd.uri-map":{"source":"iana"},"application/vnd.valve.source.material":{"source":"iana"},"application/vnd.vcx":{"source":"iana","extensions":["vcx"]},"application/vnd.vd-study":{"source":"iana"},"application/vnd.vectorworks":{"source":"iana"},"application/vnd.vel+json":{"source":"iana","compressible":true},"application/vnd.verimatrix.vcas":{"source":"iana"},"application/vnd.vidsoft.vidconference":{"source":"iana"},"application/vnd.visio":{"source":"iana","extensions":["vsd","vst","vss","vsw"]},"application/vnd.visionary":{"source":"iana","extensions":["vis"]},"application/vnd.vividence.scriptfile":{"source":"iana"},"application/vnd.vsf":{"source":"iana","extensions":["vsf"]},"application/vnd.wap.sic":{"source":"iana"},"application/vnd.wap.slc":{"source":"iana"},"application/vnd.wap.wbxml":{"source":"iana","extensions":["wbxml"]},"application/vnd.wap.wmlc":{"source":"iana","extensions":["wmlc"]},"application/vnd.wap.wmlscriptc":{"source":"iana","extensions":["wmlsc"]},"application/vnd.webturbo":{"source":"iana","extensions":["wtb"]},"application/vnd.wfa.p2p":{"source":"iana"},"application/vnd.wfa.wsc":{"source":"iana"},"application/vnd.windows.devicepairing":{"source":"iana"},"application/vnd.wmc":{"source":"iana"},"application/vnd.wmf.bootstrap":{"source":"iana"},"application/vnd.wolfram.mathematica":{"source":"iana"},"application/vnd.wolfram.mathematica.package":{"source":"iana"},"application/vnd.wolfram.player":{"source":"iana","extensions":["nbp"]},"application/vnd.wordperfect":{"source":"iana","extensions":["wpd"]},"application/vnd.wqd":{"source":"iana","extensions":["wqd"]},"application/vnd.wrq-hp3000-labelled":{"source":"iana"},"application/vnd.wt.stf":{"source":"iana","extensions":["stf"]},"application/vnd.wv.csp+wbxml":{"source":"iana"},"application/vnd.wv.csp+xml":{"source":"iana"},"application/vnd.wv.ssp+xml":{"source":"iana"},"application/vnd.xacml+json":{"source":"iana","compressible":true},"application/vnd.xara":{"source":"iana","extensions":["xar"]},"application/vnd.xfdl":{"source":"iana","extensions":["xfdl"]},"application/vnd.xfdl.webform":{"source":"iana"},"application/vnd.xmi+xml":{"source":"iana"},"application/vnd.xmpie.cpkg":{"source":"iana"},"application/vnd.xmpie.dpkg":{"source":"iana"},"application/vnd.xmpie.plan":{"source":"iana"},"application/vnd.xmpie.ppkg":{"source":"iana"},"application/vnd.xmpie.xlim":{"source":"iana"},"application/vnd.yamaha.hv-dic":{"source":"iana","extensions":["hvd"]},"application/vnd.yamaha.hv-script":{"source":"iana","extensions":["hvs"]},"application/vnd.yamaha.hv-voice":{"source":"iana","extensions":["hvp"]},"application/vnd.yamaha.openscoreformat":{"source":"iana","extensions":["osf"]},"application/vnd.yamaha.openscoreformat.osfpvg+xml":{"source":"iana","extensions":["osfpvg"]},"application/vnd.yamaha.remote-setup":{"source":"iana"},"application/vnd.yamaha.smaf-audio":{"source":"iana","extensions":["saf"]},"application/vnd.yamaha.smaf-phrase":{"source":"iana","extensions":["spf"]},"application/vnd.yamaha.through-ngn":{"source":"iana"},"application/vnd.yamaha.tunnel-udpencap":{"source":"iana"},"application/vnd.yaoweme":{"source":"iana"},"application/vnd.yellowriver-custom-menu":{"source":"iana","extensions":["cmp"]},"application/vnd.zul":{"source":"iana","extensions":["zir","zirz"]},"application/vnd.zzazz.deck+xml":{"source":"iana","extensions":["zaz"]},"application/voicexml+xml":{"source":"iana","extensions":["vxml"]},"application/vq-rtcpxr":{"source":"iana"},"application/watcherinfo+xml":{"source":"iana"},"application/whoispp-query":{"source":"iana"},"application/whoispp-response":{"source":"iana"},"application/widget":{"source":"iana","extensions":["wgt"]},"application/winhlp":{"source":"apache","extensions":["hlp"]},"application/wita":{"source":"iana"},"application/wordperfect5.1":{"source":"iana"},"application/wsdl+xml":{"source":"iana","extensions":["wsdl"]},"application/wspolicy+xml":{"source":"iana","extensions":["wspolicy"]},"application/x-7z-compressed":{"source":"apache","compressible":false,"extensions":["7z"]},"application/x-abiword":{"source":"apache","extensions":["abw"]},"application/x-ace-compressed":{"source":"apache","extensions":["ace"]},"application/x-amf":{"source":"apache"},"application/x-apple-diskimage":{"source":"apache","extensions":["dmg"]},"application/x-arj":{"compressible":false,"extensions":["arj"]},"application/x-authorware-bin":{"source":"apache","extensions":["aab","x32","u32","vox"]},"application/x-authorware-map":{"source":"apache","extensions":["aam"]},"application/x-authorware-seg":{"source":"apache","extensions":["aas"]},"application/x-bcpio":{"source":"apache","extensions":["bcpio"]},"application/x-bdoc":{"compressible":false,"extensions":["bdoc"]},"application/x-bittorrent":{"source":"apache","extensions":["torrent"]},"application/x-blorb":{"source":"apache","extensions":["blb","blorb"]},"application/x-bzip":{"source":"apache","compressible":false,"extensions":["bz"]},"application/x-bzip2":{"source":"apache","compressible":false,"extensions":["bz2","boz"]},"application/x-cbr":{"source":"apache","extensions":["cbr","cba","cbt","cbz","cb7"]},"application/x-cdlink":{"source":"apache","extensions":["vcd"]},"application/x-cfs-compressed":{"source":"apache","extensions":["cfs"]},"application/x-chat":{"source":"apache","extensions":["chat"]},"application/x-chess-pgn":{"source":"apache","extensions":["pgn"]},"application/x-chrome-extension":{"extensions":["crx"]},"application/x-cocoa":{"source":"nginx","extensions":["cco"]},"application/x-compress":{"source":"apache"},"application/x-conference":{"source":"apache","extensions":["nsc"]},"application/x-cpio":{"source":"apache","extensions":["cpio"]},"application/x-csh":{"source":"apache","extensions":["csh"]},"application/x-deb":{"compressible":false},"application/x-debian-package":{"source":"apache","extensions":["deb","udeb"]},"application/x-dgc-compressed":{"source":"apache","extensions":["dgc"]},"application/x-director":{"source":"apache","extensions":["dir","dcr","dxr","cst","cct","cxt","w3d","fgd","swa"]},"application/x-doom":{"source":"apache","extensions":["wad"]},"application/x-dtbncx+xml":{"source":"apache","extensions":["ncx"]},"application/x-dtbook+xml":{"source":"apache","extensions":["dtb"]},"application/x-dtbresource+xml":{"source":"apache","extensions":["res"]},"application/x-dvi":{"source":"apache","compressible":false,"extensions":["dvi"]},"application/x-envoy":{"source":"apache","extensions":["evy"]},"application/x-eva":{"source":"apache","extensions":["eva"]},"application/x-font-bdf":{"source":"apache","extensions":["bdf"]},"application/x-font-dos":{"source":"apache"},"application/x-font-framemaker":{"source":"apache"},"application/x-font-ghostscript":{"source":"apache","extensions":["gsf"]},"application/x-font-libgrx":{"source":"apache"},"application/x-font-linux-psf":{"source":"apache","extensions":["psf"]},"application/x-font-otf":{"source":"apache","compressible":true,"extensions":["otf"]},"application/x-font-pcf":{"source":"apache","extensions":["pcf"]},"application/x-font-snf":{"source":"apache","extensions":["snf"]},"application/x-font-speedo":{"source":"apache"},"application/x-font-sunos-news":{"source":"apache"},"application/x-font-ttf":{"source":"apache","compressible":true,"extensions":["ttf","ttc"]},"application/x-font-type1":{"source":"apache","extensions":["pfa","pfb","pfm","afm"]},"application/x-font-vfont":{"source":"apache"},"application/x-freearc":{"source":"apache","extensions":["arc"]},"application/x-futuresplash":{"source":"apache","extensions":["spl"]},"application/x-gca-compressed":{"source":"apache","extensions":["gca"]},"application/x-glulx":{"source":"apache","extensions":["ulx"]},"application/x-gnumeric":{"source":"apache","extensions":["gnumeric"]},"application/x-gramps-xml":{"source":"apache","extensions":["gramps"]},"application/x-gtar":{"source":"apache","extensions":["gtar"]},"application/x-gzip":{"source":"apache"},"application/x-hdf":{"source":"apache","extensions":["hdf"]},"application/x-httpd-php":{"compressible":true,"extensions":["php"]},"application/x-install-instructions":{"source":"apache","extensions":["install"]},"application/x-iso9660-image":{"source":"apache","extensions":["iso"]},"application/x-java-archive-diff":{"source":"nginx","extensions":["jardiff"]},"application/x-java-jnlp-file":{"source":"apache","compressible":false,"extensions":["jnlp"]},"application/x-javascript":{"compressible":true},"application/x-latex":{"source":"apache","compressible":false,"extensions":["latex"]},"application/x-lua-bytecode":{"extensions":["luac"]},"application/x-lzh-compressed":{"source":"apache","extensions":["lzh","lha"]},"application/x-makeself":{"source":"nginx","extensions":["run"]},"application/x-mie":{"source":"apache","extensions":["mie"]},"application/x-mobipocket-ebook":{"source":"apache","extensions":["prc","mobi"]},"application/x-mpegurl":{"compressible":false},"application/x-ms-application":{"source":"apache","extensions":["application"]},"application/x-ms-shortcut":{"source":"apache","extensions":["lnk"]},"application/x-ms-wmd":{"source":"apache","extensions":["wmd"]},"application/x-ms-wmz":{"source":"apache","extensions":["wmz"]},"application/x-ms-xbap":{"source":"apache","extensions":["xbap"]},"application/x-msaccess":{"source":"apache","extensions":["mdb"]},"application/x-msbinder":{"source":"apache","extensions":["obd"]},"application/x-mscardfile":{"source":"apache","extensions":["crd"]},"application/x-msclip":{"source":"apache","extensions":["clp"]},"application/x-msdos-program":{"extensions":["exe"]},"application/x-msdownload":{"source":"apache","extensions":["exe","dll","com","bat","msi"]},"application/x-msmediaview":{"source":"apache","extensions":["mvb","m13","m14"]},"application/x-msmetafile":{"source":"apache","extensions":["wmf","wmz","emf","emz"]},"application/x-msmoney":{"source":"apache","extensions":["mny"]},"application/x-mspublisher":{"source":"apache","extensions":["pub"]},"application/x-msschedule":{"source":"apache","extensions":["scd"]},"application/x-msterminal":{"source":"apache","extensions":["trm"]},"application/x-mswrite":{"source":"apache","extensions":["wri"]},"application/x-netcdf":{"source":"apache","extensions":["nc","cdf"]},"application/x-ns-proxy-autoconfig":{"compressible":true,"extensions":["pac"]},"application/x-nzb":{"source":"apache","extensions":["nzb"]},"application/x-perl":{"source":"nginx","extensions":["pl","pm"]},"application/x-pilot":{"source":"nginx","extensions":["prc","pdb"]},"application/x-pkcs12":{"source":"apache","compressible":false,"extensions":["p12","pfx"]},"application/x-pkcs7-certificates":{"source":"apache","extensions":["p7b","spc"]},"application/x-pkcs7-certreqresp":{"source":"apache","extensions":["p7r"]},"application/x-rar-compressed":{"source":"apache","compressible":false,"extensions":["rar"]},"application/x-redhat-package-manager":{"source":"nginx","extensions":["rpm"]},"application/x-research-info-systems":{"source":"apache","extensions":["ris"]},"application/x-sea":{"source":"nginx","extensions":["sea"]},"application/x-sh":{"source":"apache","compressible":true,"extensions":["sh"]},"application/x-shar":{"source":"apache","extensions":["shar"]},"application/x-shockwave-flash":{"source":"apache","compressible":false,"extensions":["swf"]},"application/x-silverlight-app":{"source":"apache","extensions":["xap"]},"application/x-sql":{"source":"apache","extensions":["sql"]},"application/x-stuffit":{"source":"apache","compressible":false,"extensions":["sit"]},"application/x-stuffitx":{"source":"apache","extensions":["sitx"]},"application/x-subrip":{"source":"apache","extensions":["srt"]},"application/x-sv4cpio":{"source":"apache","extensions":["sv4cpio"]},"application/x-sv4crc":{"source":"apache","extensions":["sv4crc"]},"application/x-t3vm-image":{"source":"apache","extensions":["t3"]},"application/x-tads":{"source":"apache","extensions":["gam"]},"application/x-tar":{"source":"apache","compressible":true,"extensions":["tar"]},"application/x-tcl":{"source":"apache","extensions":["tcl","tk"]},"application/x-tex":{"source":"apache","extensions":["tex"]},"application/x-tex-tfm":{"source":"apache","extensions":["tfm"]},"application/x-texinfo":{"source":"apache","extensions":["texinfo","texi"]},"application/x-tgif":{"source":"apache","extensions":["obj"]},"application/x-ustar":{"source":"apache","extensions":["ustar"]},"application/x-virtualbox-hdd":{"compressible":true,"extensions":["hdd"]},"application/x-virtualbox-ova":{"compressible":true,"extensions":["ova"]},"application/x-virtualbox-ovf":{"compressible":true,"extensions":["ovf"]},"application/x-virtualbox-vbox":{"compressible":true,"extensions":["vbox"]},"application/x-virtualbox-vbox-extpack":{"compressible":false,"extensions":["vbox-extpack"]},"application/x-virtualbox-vdi":{"compressible":true,"extensions":["vdi"]},"application/x-virtualbox-vhd":{"compressible":true,"extensions":["vhd"]},"application/x-virtualbox-vmdk":{"compressible":true,"extensions":["vmdk"]},"application/x-wais-source":{"source":"apache","extensions":["src"]},"application/x-web-app-manifest+json":{"compressible":true,"extensions":["webapp"]},"application/x-www-form-urlencoded":{"source":"iana","compressible":true},"application/x-x509-ca-cert":{"source":"apache","extensions":["der","crt","pem"]},"application/x-xfig":{"source":"apache","extensions":["fig"]},"application/x-xliff+xml":{"source":"apache","extensions":["xlf"]},"application/x-xpinstall":{"source":"apache","compressible":false,"extensions":["xpi"]},"application/x-xz":{"source":"apache","extensions":["xz"]},"application/x-zmachine":{"source":"apache","extensions":["z1","z2","z3","z4","z5","z6","z7","z8"]},"application/x400-bp":{"source":"iana"},"application/xacml+xml":{"source":"iana"},"application/xaml+xml":{"source":"apache","extensions":["xaml"]},"application/xcap-att+xml":{"source":"iana"},"application/xcap-caps+xml":{"source":"iana"},"application/xcap-diff+xml":{"source":"iana","extensions":["xdf"]},"application/xcap-el+xml":{"source":"iana"},"application/xcap-error+xml":{"source":"iana"},"application/xcap-ns+xml":{"source":"iana"},"application/xcon-conference-info+xml":{"source":"iana"},"application/xcon-conference-info-diff+xml":{"source":"iana"},"application/xenc+xml":{"source":"iana","extensions":["xenc"]},"application/xhtml+xml":{"source":"iana","compressible":true,"extensions":["xhtml","xht"]},"application/xhtml-voice+xml":{"source":"apache"},"application/xml":{"source":"iana","compressible":true,"extensions":["xml","xsl","xsd","rng"]},"application/xml-dtd":{"source":"iana","compressible":true,"extensions":["dtd"]},"application/xml-external-parsed-entity":{"source":"iana"},"application/xml-patch+xml":{"source":"iana"},"application/xmpp+xml":{"source":"iana"},"application/xop+xml":{"source":"iana","compressible":true,"extensions":["xop"]},"application/xproc+xml":{"source":"apache","extensions":["xpl"]},"application/xslt+xml":{"source":"iana","extensions":["xslt"]},"application/xspf+xml":{"source":"apache","extensions":["xspf"]},"application/xv+xml":{"source":"iana","extensions":["mxml","xhvml","xvml","xvm"]},"application/yang":{"source":"iana","extensions":["yang"]},"application/yang-data+json":{"source":"iana","compressible":true},"application/yang-data+xml":{"source":"iana"},"application/yang-patch+json":{"source":"iana","compressible":true},"application/yang-patch+xml":{"source":"iana"},"application/yin+xml":{"source":"iana","extensions":["yin"]},"application/zip":{"source":"iana","compressible":false,"extensions":["zip"]},"application/zlib":{"source":"iana"},"audio/1d-interleaved-parityfec":{"source":"iana"},"audio/32kadpcm":{"source":"iana"},"audio/3gpp":{"source":"iana","compressible":false,"extensions":["3gpp"]},"audio/3gpp2":{"source":"iana"},"audio/ac3":{"source":"iana"},"audio/adpcm":{"source":"apache","extensions":["adp"]},"audio/amr":{"source":"iana"},"audio/amr-wb":{"source":"iana"},"audio/amr-wb+":{"source":"iana"},"audio/aptx":{"source":"iana"},"audio/asc":{"source":"iana"},"audio/atrac-advanced-lossless":{"source":"iana"},"audio/atrac-x":{"source":"iana"},"audio/atrac3":{"source":"iana"},"audio/basic":{"source":"iana","compressible":false,"extensions":["au","snd"]},"audio/bv16":{"source":"iana"},"audio/bv32":{"source":"iana"},"audio/clearmode":{"source":"iana"},"audio/cn":{"source":"iana"},"audio/dat12":{"source":"iana"},"audio/dls":{"source":"iana"},"audio/dsr-es201108":{"source":"iana"},"audio/dsr-es202050":{"source":"iana"},"audio/dsr-es202211":{"source":"iana"},"audio/dsr-es202212":{"source":"iana"},"audio/dv":{"source":"iana"},"audio/dvi4":{"source":"iana"},"audio/eac3":{"source":"iana"},"audio/encaprtp":{"source":"iana"},"audio/evrc":{"source":"iana"},"audio/evrc-qcp":{"source":"iana"},"audio/evrc0":{"source":"iana"},"audio/evrc1":{"source":"iana"},"audio/evrcb":{"source":"iana"},"audio/evrcb0":{"source":"iana"},"audio/evrcb1":{"source":"iana"},"audio/evrcnw":{"source":"iana"},"audio/evrcnw0":{"source":"iana"},"audio/evrcnw1":{"source":"iana"},"audio/evrcwb":{"source":"iana"},"audio/evrcwb0":{"source":"iana"},"audio/evrcwb1":{"source":"iana"},"audio/evs":{"source":"iana"},"audio/fwdred":{"source":"iana"},"audio/g711-0":{"source":"iana"},"audio/g719":{"source":"iana"},"audio/g722":{"source":"iana"},"audio/g7221":{"source":"iana"},"audio/g723":{"source":"iana"},"audio/g726-16":{"source":"iana"},"audio/g726-24":{"source":"iana"},"audio/g726-32":{"source":"iana"},"audio/g726-40":{"source":"iana"},"audio/g728":{"source":"iana"},"audio/g729":{"source":"iana"},"audio/g7291":{"source":"iana"},"audio/g729d":{"source":"iana"},"audio/g729e":{"source":"iana"},"audio/gsm":{"source":"iana"},"audio/gsm-efr":{"source":"iana"},"audio/gsm-hr-08":{"source":"iana"},"audio/ilbc":{"source":"iana"},"audio/ip-mr_v2.5":{"source":"iana"},"audio/isac":{"source":"apache"},"audio/l16":{"source":"iana"},"audio/l20":{"source":"iana"},"audio/l24":{"source":"iana","compressible":false},"audio/l8":{"source":"iana"},"audio/lpc":{"source":"iana"},"audio/melp":{"source":"iana"},"audio/melp1200":{"source":"iana"},"audio/melp2400":{"source":"iana"},"audio/melp600":{"source":"iana"},"audio/midi":{"source":"apache","extensions":["mid","midi","kar","rmi"]},"audio/mobile-xmf":{"source":"iana"},"audio/mp3":{"compressible":false,"extensions":["mp3"]},"audio/mp4":{"source":"iana","compressible":false,"extensions":["m4a","mp4a"]},"audio/mp4a-latm":{"source":"iana"},"audio/mpa":{"source":"iana"},"audio/mpa-robust":{"source":"iana"},"audio/mpeg":{"source":"iana","compressible":false,"extensions":["mpga","mp2","mp2a","mp3","m2a","m3a"]},"audio/mpeg4-generic":{"source":"iana"},"audio/musepack":{"source":"apache"},"audio/ogg":{"source":"iana","compressible":false,"extensions":["oga","ogg","spx"]},"audio/opus":{"source":"iana"},"audio/parityfec":{"source":"iana"},"audio/pcma":{"source":"iana"},"audio/pcma-wb":{"source":"iana"},"audio/pcmu":{"source":"iana"},"audio/pcmu-wb":{"source":"iana"},"audio/prs.sid":{"source":"iana"},"audio/qcelp":{"source":"iana"},"audio/raptorfec":{"source":"iana"},"audio/red":{"source":"iana"},"audio/rtp-enc-aescm128":{"source":"iana"},"audio/rtp-midi":{"source":"iana"},"audio/rtploopback":{"source":"iana"},"audio/rtx":{"source":"iana"},"audio/s3m":{"source":"apache","extensions":["s3m"]},"audio/silk":{"source":"apache","extensions":["sil"]},"audio/smv":{"source":"iana"},"audio/smv-qcp":{"source":"iana"},"audio/smv0":{"source":"iana"},"audio/sp-midi":{"source":"iana"},"audio/speex":{"source":"iana"},"audio/t140c":{"source":"iana"},"audio/t38":{"source":"iana"},"audio/telephone-event":{"source":"iana"},"audio/tone":{"source":"iana"},"audio/uemclip":{"source":"iana"},"audio/ulpfec":{"source":"iana"},"audio/vdvi":{"source":"iana"},"audio/vmr-wb":{"source":"iana"},"audio/vnd.3gpp.iufp":{"source":"iana"},"audio/vnd.4sb":{"source":"iana"},"audio/vnd.audiokoz":{"source":"iana"},"audio/vnd.celp":{"source":"iana"},"audio/vnd.cisco.nse":{"source":"iana"},"audio/vnd.cmles.radio-events":{"source":"iana"},"audio/vnd.cns.anp1":{"source":"iana"},"audio/vnd.cns.inf1":{"source":"iana"},"audio/vnd.dece.audio":{"source":"iana","extensions":["uva","uvva"]},"audio/vnd.digital-winds":{"source":"iana","extensions":["eol"]},"audio/vnd.dlna.adts":{"source":"iana"},"audio/vnd.dolby.heaac.1":{"source":"iana"},"audio/vnd.dolby.heaac.2":{"source":"iana"},"audio/vnd.dolby.mlp":{"source":"iana"},"audio/vnd.dolby.mps":{"source":"iana"},"audio/vnd.dolby.pl2":{"source":"iana"},"audio/vnd.dolby.pl2x":{"source":"iana"},"audio/vnd.dolby.pl2z":{"source":"iana"},"audio/vnd.dolby.pulse.1":{"source":"iana"},"audio/vnd.dra":{"source":"iana","extensions":["dra"]},"audio/vnd.dts":{"source":"iana","extensions":["dts"]},"audio/vnd.dts.hd":{"source":"iana","extensions":["dtshd"]},"audio/vnd.dvb.file":{"source":"iana"},"audio/vnd.everad.plj":{"source":"iana"},"audio/vnd.hns.audio":{"source":"iana"},"audio/vnd.lucent.voice":{"source":"iana","extensions":["lvp"]},"audio/vnd.ms-playready.media.pya":{"source":"iana","extensions":["pya"]},"audio/vnd.nokia.mobile-xmf":{"source":"iana"},"audio/vnd.nortel.vbk":{"source":"iana"},"audio/vnd.nuera.ecelp4800":{"source":"iana","extensions":["ecelp4800"]},"audio/vnd.nuera.ecelp7470":{"source":"iana","extensions":["ecelp7470"]},"audio/vnd.nuera.ecelp9600":{"source":"iana","extensions":["ecelp9600"]},"audio/vnd.octel.sbc":{"source":"iana"},"audio/vnd.presonus.multitrack":{"source":"iana"},"audio/vnd.qcelp":{"source":"iana"},"audio/vnd.rhetorex.32kadpcm":{"source":"iana"},"audio/vnd.rip":{"source":"iana","extensions":["rip"]},"audio/vnd.rn-realaudio":{"compressible":false},"audio/vnd.sealedmedia.softseal.mpeg":{"source":"iana"},"audio/vnd.vmx.cvsd":{"source":"iana"},"audio/vnd.wave":{"compressible":false},"audio/vorbis":{"source":"iana","compressible":false},"audio/vorbis-config":{"source":"iana"},"audio/wav":{"compressible":false,"extensions":["wav"]},"audio/wave":{"compressible":false,"extensions":["wav"]},"audio/webm":{"source":"apache","compressible":false,"extensions":["weba"]},"audio/x-aac":{"source":"apache","compressible":false,"extensions":["aac"]},"audio/x-aiff":{"source":"apache","extensions":["aif","aiff","aifc"]},"audio/x-caf":{"source":"apache","compressible":false,"extensions":["caf"]},"audio/x-flac":{"source":"apache","extensions":["flac"]},"audio/x-m4a":{"source":"nginx","extensions":["m4a"]},"audio/x-matroska":{"source":"apache","extensions":["mka"]},"audio/x-mpegurl":{"source":"apache","extensions":["m3u"]},"audio/x-ms-wax":{"source":"apache","extensions":["wax"]},"audio/x-ms-wma":{"source":"apache","extensions":["wma"]},"audio/x-pn-realaudio":{"source":"apache","extensions":["ram","ra"]},"audio/x-pn-realaudio-plugin":{"source":"apache","extensions":["rmp"]},"audio/x-realaudio":{"source":"nginx","extensions":["ra"]},"audio/x-tta":{"source":"apache"},"audio/x-wav":{"source":"apache","extensions":["wav"]},"audio/xm":{"source":"apache","extensions":["xm"]},"chemical/x-cdx":{"source":"apache","extensions":["cdx"]},"chemical/x-cif":{"source":"apache","extensions":["cif"]},"chemical/x-cmdf":{"source":"apache","extensions":["cmdf"]},"chemical/x-cml":{"source":"apache","extensions":["cml"]},"chemical/x-csml":{"source":"apache","extensions":["csml"]},"chemical/x-pdb":{"source":"apache"},"chemical/x-xyz":{"source":"apache","extensions":["xyz"]},"font/otf":{"compressible":true,"extensions":["otf"]},"image/apng":{"compressible":false,"extensions":["apng"]},"image/bmp":{"source":"iana","compressible":true,"extensions":["bmp"]},"image/cgm":{"source":"iana","extensions":["cgm"]},"image/dicom-rle":{"source":"iana"},"image/emf":{"source":"iana"},"image/fits":{"source":"iana"},"image/g3fax":{"source":"iana","extensions":["g3"]},"image/gif":{"source":"iana","compressible":false,"extensions":["gif"]},"image/ief":{"source":"iana","extensions":["ief"]},"image/jls":{"source":"iana"},"image/jp2":{"source":"iana"},"image/jpeg":{"source":"iana","compressible":false,"extensions":["jpeg","jpg","jpe"]},"image/jpm":{"source":"iana"},"image/jpx":{"source":"iana"},"image/ktx":{"source":"iana","extensions":["ktx"]},"image/naplps":{"source":"iana"},"image/pjpeg":{"compressible":false},"image/png":{"source":"iana","compressible":false,"extensions":["png"]},"image/prs.btif":{"source":"iana","extensions":["btif"]},"image/prs.pti":{"source":"iana"},"image/pwg-raster":{"source":"iana"},"image/sgi":{"source":"apache","extensions":["sgi"]},"image/svg+xml":{"source":"iana","compressible":true,"extensions":["svg","svgz"]},"image/t38":{"source":"iana"},"image/tiff":{"source":"iana","compressible":false,"extensions":["tiff","tif"]},"image/tiff-fx":{"source":"iana"},"image/vnd.adobe.photoshop":{"source":"iana","compressible":true,"extensions":["psd"]},"image/vnd.airzip.accelerator.azv":{"source":"iana"},"image/vnd.cns.inf2":{"source":"iana"},"image/vnd.dece.graphic":{"source":"iana","extensions":["uvi","uvvi","uvg","uvvg"]},"image/vnd.djvu":{"source":"iana","extensions":["djvu","djv"]},"image/vnd.dvb.subtitle":{"source":"iana","extensions":["sub"]},"image/vnd.dwg":{"source":"iana","extensions":["dwg"]},"image/vnd.dxf":{"source":"iana","extensions":["dxf"]},"image/vnd.fastbidsheet":{"source":"iana","extensions":["fbs"]},"image/vnd.fpx":{"source":"iana","extensions":["fpx"]},"image/vnd.fst":{"source":"iana","extensions":["fst"]},"image/vnd.fujixerox.edmics-mmr":{"source":"iana","extensions":["mmr"]},"image/vnd.fujixerox.edmics-rlc":{"source":"iana","extensions":["rlc"]},"image/vnd.globalgraphics.pgb":{"source":"iana"},"image/vnd.microsoft.icon":{"source":"iana"},"image/vnd.mix":{"source":"iana"},"image/vnd.mozilla.apng":{"source":"iana"},"image/vnd.ms-modi":{"source":"iana","extensions":["mdi"]},"image/vnd.ms-photo":{"source":"apache","extensions":["wdp"]},"image/vnd.net-fpx":{"source":"iana","extensions":["npx"]},"image/vnd.radiance":{"source":"iana"},"image/vnd.sealed.png":{"source":"iana"},"image/vnd.sealedmedia.softseal.gif":{"source":"iana"},"image/vnd.sealedmedia.softseal.jpg":{"source":"iana"},"image/vnd.svf":{"source":"iana"},"image/vnd.tencent.tap":{"source":"iana"},"image/vnd.valve.source.texture":{"source":"iana"},"image/vnd.wap.wbmp":{"source":"iana","extensions":["wbmp"]},"image/vnd.xiff":{"source":"iana","extensions":["xif"]},"image/vnd.zbrush.pcx":{"source":"iana"},"image/webp":{"source":"apache","extensions":["webp"]},"image/wmf":{"source":"iana"},"image/x-3ds":{"source":"apache","extensions":["3ds"]},"image/x-cmu-raster":{"source":"apache","extensions":["ras"]},"image/x-cmx":{"source":"apache","extensions":["cmx"]},"image/x-freehand":{"source":"apache","extensions":["fh","fhc","fh4","fh5","fh7"]},"image/x-icon":{"source":"apache","compressible":true,"extensions":["ico"]},"image/x-jng":{"source":"nginx","extensions":["jng"]},"image/x-mrsid-image":{"source":"apache","extensions":["sid"]},"image/x-ms-bmp":{"source":"nginx","compressible":true,"extensions":["bmp"]},"image/x-pcx":{"source":"apache","extensions":["pcx"]},"image/x-pict":{"source":"apache","extensions":["pic","pct"]},"image/x-portable-anymap":{"source":"apache","extensions":["pnm"]},"image/x-portable-bitmap":{"source":"apache","extensions":["pbm"]},"image/x-portable-graymap":{"source":"apache","extensions":["pgm"]},"image/x-portable-pixmap":{"source":"apache","extensions":["ppm"]},"image/x-rgb":{"source":"apache","extensions":["rgb"]},"image/x-tga":{"source":"apache","extensions":["tga"]},"image/x-xbitmap":{"source":"apache","extensions":["xbm"]},"image/x-xcf":{"compressible":false},"image/x-xpixmap":{"source":"apache","extensions":["xpm"]},"image/x-xwindowdump":{"source":"apache","extensions":["xwd"]},"message/cpim":{"source":"iana"},"message/delivery-status":{"source":"iana"},"message/disposition-notification":{"source":"iana"},"message/external-body":{"source":"iana"},"message/feedback-report":{"source":"iana"},"message/global":{"source":"iana"},"message/global-delivery-status":{"source":"iana"},"message/global-disposition-notification":{"source":"iana"},"message/global-headers":{"source":"iana"},"message/http":{"source":"iana","compressible":false},"message/imdn+xml":{"source":"iana","compressible":true},"message/news":{"source":"iana"},"message/partial":{"source":"iana","compressible":false},"message/rfc822":{"source":"iana","compressible":true,"extensions":["eml","mime"]},"message/s-http":{"source":"iana"},"message/sip":{"source":"iana"},"message/sipfrag":{"source":"iana"},"message/tracking-status":{"source":"iana"},"message/vnd.si.simp":{"source":"iana"},"message/vnd.wfa.wsc":{"source":"iana"},"model/3mf":{"source":"iana"},"model/gltf+json":{"source":"iana","compressible":true,"extensions":["gltf"]},"model/gltf-binary":{"compressible":true,"extensions":["glb"]},"model/iges":{"source":"iana","compressible":false,"extensions":["igs","iges"]},"model/mesh":{"source":"iana","compressible":false,"extensions":["msh","mesh","silo"]},"model/vnd.collada+xml":{"source":"iana","extensions":["dae"]},"model/vnd.dwf":{"source":"iana","extensions":["dwf"]},"model/vnd.flatland.3dml":{"source":"iana"},"model/vnd.gdl":{"source":"iana","extensions":["gdl"]},"model/vnd.gs-gdl":{"source":"apache"},"model/vnd.gs.gdl":{"source":"iana"},"model/vnd.gtw":{"source":"iana","extensions":["gtw"]},"model/vnd.moml+xml":{"source":"iana"},"model/vnd.mts":{"source":"iana","extensions":["mts"]},"model/vnd.opengex":{"source":"iana"},"model/vnd.parasolid.transmit.binary":{"source":"iana"},"model/vnd.parasolid.transmit.text":{"source":"iana"},"model/vnd.rosette.annotated-data-model":{"source":"iana"},"model/vnd.valve.source.compiled-map":{"source":"iana"},"model/vnd.vtu":{"source":"iana","extensions":["vtu"]},"model/vrml":{"source":"iana","compressible":false,"extensions":["wrl","vrml"]},"model/x3d+binary":{"source":"apache","compressible":false,"extensions":["x3db","x3dbz"]},"model/x3d+fastinfoset":{"source":"iana"},"model/x3d+vrml":{"source":"apache","compressible":false,"extensions":["x3dv","x3dvz"]},"model/x3d+xml":{"source":"iana","compressible":true,"extensions":["x3d","x3dz"]},"model/x3d-vrml":{"source":"iana"},"multipart/alternative":{"source":"iana","compressible":false},"multipart/appledouble":{"source":"iana"},"multipart/byteranges":{"source":"iana"},"multipart/digest":{"source":"iana"},"multipart/encrypted":{"source":"iana","compressible":false},"multipart/form-data":{"source":"iana","compressible":false},"multipart/header-set":{"source":"iana"},"multipart/mixed":{"source":"iana","compressible":false},"multipart/parallel":{"source":"iana"},"multipart/related":{"source":"iana","compressible":false},"multipart/report":{"source":"iana"},"multipart/signed":{"source":"iana","compressible":false},"multipart/vnd.bint.med-plus":{"source":"iana"},"multipart/voice-message":{"source":"iana"},"multipart/x-mixed-replace":{"source":"iana"},"text/1d-interleaved-parityfec":{"source":"iana"},"text/cache-manifest":{"source":"iana","compressible":true,"extensions":["appcache","manifest"]},"text/calendar":{"source":"iana","extensions":["ics","ifb"]},"text/calender":{"compressible":true},"text/cmd":{"compressible":true},"text/coffeescript":{"extensions":["coffee","litcoffee"]},"text/css":{"source":"iana","charset":"UTF-8","compressible":true,"extensions":["css"]},"text/csv":{"source":"iana","compressible":true,"extensions":["csv"]},"text/csv-schema":{"source":"iana"},"text/directory":{"source":"iana"},"text/dns":{"source":"iana"},"text/ecmascript":{"source":"iana"},"text/encaprtp":{"source":"iana"},"text/enriched":{"source":"iana"},"text/fwdred":{"source":"iana"},"text/grammar-ref-list":{"source":"iana"},"text/hjson":{"extensions":["hjson"]},"text/html":{"source":"iana","compressible":true,"extensions":["html","htm","shtml"]},"text/jade":{"extensions":["jade"]},"text/javascript":{"source":"iana","compressible":true},"text/jcr-cnd":{"source":"iana"},"text/jsx":{"compressible":true,"extensions":["jsx"]},"text/less":{"extensions":["less"]},"text/markdown":{"source":"iana","compressible":true,"extensions":["markdown","md"]},"text/mathml":{"source":"nginx","extensions":["mml"]},"text/mizar":{"source":"iana"},"text/n3":{"source":"iana","compressible":true,"extensions":["n3"]},"text/parameters":{"source":"iana"},"text/parityfec":{"source":"iana"},"text/plain":{"source":"iana","compressible":true,"extensions":["txt","text","conf","def","list","log","in","ini"]},"text/provenance-notation":{"source":"iana"},"text/prs.fallenstein.rst":{"source":"iana"},"text/prs.lines.tag":{"source":"iana","extensions":["dsc"]},"text/prs.prop.logic":{"source":"iana"},"text/raptorfec":{"source":"iana"},"text/red":{"source":"iana"},"text/rfc822-headers":{"source":"iana"},"text/richtext":{"source":"iana","compressible":true,"extensions":["rtx"]},"text/rtf":{"source":"iana","compressible":true,"extensions":["rtf"]},"text/rtp-enc-aescm128":{"source":"iana"},"text/rtploopback":{"source":"iana"},"text/rtx":{"source":"iana"},"text/sgml":{"source":"iana","extensions":["sgml","sgm"]},"text/slim":{"extensions":["slim","slm"]},"text/strings":{"source":"iana"},"text/stylus":{"extensions":["stylus","styl"]},"text/t140":{"source":"iana"},"text/tab-separated-values":{"source":"iana","compressible":true,"extensions":["tsv"]},"text/troff":{"source":"iana","extensions":["t","tr","roff","man","me","ms"]},"text/turtle":{"source":"iana","extensions":["ttl"]},"text/ulpfec":{"source":"iana"},"text/uri-list":{"source":"iana","compressible":true,"extensions":["uri","uris","urls"]},"text/vcard":{"source":"iana","compressible":true,"extensions":["vcard"]},"text/vnd.a":{"source":"iana"},"text/vnd.abc":{"source":"iana"},"text/vnd.ascii-art":{"source":"iana"},"text/vnd.curl":{"source":"iana","extensions":["curl"]},"text/vnd.curl.dcurl":{"source":"apache","extensions":["dcurl"]},"text/vnd.curl.mcurl":{"source":"apache","extensions":["mcurl"]},"text/vnd.curl.scurl":{"source":"apache","extensions":["scurl"]},"text/vnd.debian.copyright":{"source":"iana"},"text/vnd.dmclientscript":{"source":"iana"},"text/vnd.dvb.subtitle":{"source":"iana","extensions":["sub"]},"text/vnd.esmertec.theme-descriptor":{"source":"iana"},"text/vnd.fly":{"source":"iana","extensions":["fly"]},"text/vnd.fmi.flexstor":{"source":"iana","extensions":["flx"]},"text/vnd.graphviz":{"source":"iana","extensions":["gv"]},"text/vnd.in3d.3dml":{"source":"iana","extensions":["3dml"]},"text/vnd.in3d.spot":{"source":"iana","extensions":["spot"]},"text/vnd.iptc.newsml":{"source":"iana"},"text/vnd.iptc.nitf":{"source":"iana"},"text/vnd.latex-z":{"source":"iana"},"text/vnd.motorola.reflex":{"source":"iana"},"text/vnd.ms-mediapackage":{"source":"iana"},"text/vnd.net2phone.commcenter.command":{"source":"iana"},"text/vnd.radisys.msml-basic-layout":{"source":"iana"},"text/vnd.si.uricatalogue":{"source":"iana"},"text/vnd.sun.j2me.app-descriptor":{"source":"iana","extensions":["jad"]},"text/vnd.trolltech.linguist":{"source":"iana"},"text/vnd.wap.si":{"source":"iana"},"text/vnd.wap.sl":{"source":"iana"},"text/vnd.wap.wml":{"source":"iana","extensions":["wml"]},"text/vnd.wap.wmlscript":{"source":"iana","extensions":["wmls"]},"text/vtt":{"charset":"UTF-8","compressible":true,"extensions":["vtt"]},"text/x-asm":{"source":"apache","extensions":["s","asm"]},"text/x-c":{"source":"apache","extensions":["c","cc","cxx","cpp","h","hh","dic"]},"text/x-component":{"source":"nginx","extensions":["htc"]},"text/x-fortran":{"source":"apache","extensions":["f","for","f77","f90"]},"text/x-gwt-rpc":{"compressible":true},"text/x-handlebars-template":{"extensions":["hbs"]},"text/x-java-source":{"source":"apache","extensions":["java"]},"text/x-jquery-tmpl":{"compressible":true},"text/x-lua":{"extensions":["lua"]},"text/x-markdown":{"compressible":true,"extensions":["mkd"]},"text/x-nfo":{"source":"apache","extensions":["nfo"]},"text/x-opml":{"source":"apache","extensions":["opml"]},"text/x-org":{"compressible":true,"extensions":["org"]},"text/x-pascal":{"source":"apache","extensions":["p","pas"]},"text/x-processing":{"compressible":true,"extensions":["pde"]},"text/x-sass":{"extensions":["sass"]},"text/x-scss":{"extensions":["scss"]},"text/x-setext":{"source":"apache","extensions":["etx"]},"text/x-sfv":{"source":"apache","extensions":["sfv"]},"text/x-suse-ymp":{"compressible":true,"extensions":["ymp"]},"text/x-uuencode":{"source":"apache","extensions":["uu"]},"text/x-vcalendar":{"source":"apache","extensions":["vcs"]},"text/x-vcard":{"source":"apache","extensions":["vcf"]},"text/xml":{"source":"iana","compressible":true,"extensions":["xml"]},"text/xml-external-parsed-entity":{"source":"iana"},"text/yaml":{"extensions":["yaml","yml"]},"video/1d-interleaved-parityfec":{"source":"iana"},"video/3gpp":{"source":"iana","extensions":["3gp","3gpp"]},"video/3gpp-tt":{"source":"iana"},"video/3gpp2":{"source":"iana","extensions":["3g2"]},"video/bmpeg":{"source":"iana"},"video/bt656":{"source":"iana"},"video/celb":{"source":"iana"},"video/dv":{"source":"iana"},"video/encaprtp":{"source":"iana"},"video/h261":{"source":"iana","extensions":["h261"]},"video/h263":{"source":"iana","extensions":["h263"]},"video/h263-1998":{"source":"iana"},"video/h263-2000":{"source":"iana"},"video/h264":{"source":"iana","extensions":["h264"]},"video/h264-rcdo":{"source":"iana"},"video/h264-svc":{"source":"iana"},"video/h265":{"source":"iana"},"video/iso.segment":{"source":"iana"},"video/jpeg":{"source":"iana","extensions":["jpgv"]},"video/jpeg2000":{"source":"iana"},"video/jpm":{"source":"apache","extensions":["jpm","jpgm"]},"video/mj2":{"source":"iana","extensions":["mj2","mjp2"]},"video/mp1s":{"source":"iana"},"video/mp2p":{"source":"iana"},"video/mp2t":{"source":"iana","extensions":["ts"]},"video/mp4":{"source":"iana","compressible":false,"extensions":["mp4","mp4v","mpg4"]},"video/mp4v-es":{"source":"iana"},"video/mpeg":{"source":"iana","compressible":false,"extensions":["mpeg","mpg","mpe","m1v","m2v"]},"video/mpeg4-generic":{"source":"iana"},"video/mpv":{"source":"iana"},"video/nv":{"source":"iana"},"video/ogg":{"source":"iana","compressible":false,"extensions":["ogv"]},"video/parityfec":{"source":"iana"},"video/pointer":{"source":"iana"},"video/quicktime":{"source":"iana","compressible":false,"extensions":["qt","mov"]},"video/raptorfec":{"source":"iana"},"video/raw":{"source":"iana"},"video/rtp-enc-aescm128":{"source":"iana"},"video/rtploopback":{"source":"iana"},"video/rtx":{"source":"iana"},"video/smpte292m":{"source":"iana"},"video/ulpfec":{"source":"iana"},"video/vc1":{"source":"iana"},"video/vnd.cctv":{"source":"iana"},"video/vnd.dece.hd":{"source":"iana","extensions":["uvh","uvvh"]},"video/vnd.dece.mobile":{"source":"iana","extensions":["uvm","uvvm"]},"video/vnd.dece.mp4":{"source":"iana"},"video/vnd.dece.pd":{"source":"iana","extensions":["uvp","uvvp"]},"video/vnd.dece.sd":{"source":"iana","extensions":["uvs","uvvs"]},"video/vnd.dece.video":{"source":"iana","extensions":["uvv","uvvv"]},"video/vnd.directv.mpeg":{"source":"iana"},"video/vnd.directv.mpeg-tts":{"source":"iana"},"video/vnd.dlna.mpeg-tts":{"source":"iana"},"video/vnd.dvb.file":{"source":"iana","extensions":["dvb"]},"video/vnd.fvt":{"source":"iana","extensions":["fvt"]},"video/vnd.hns.video":{"source":"iana"},"video/vnd.iptvforum.1dparityfec-1010":{"source":"iana"},"video/vnd.iptvforum.1dparityfec-2005":{"source":"iana"},"video/vnd.iptvforum.2dparityfec-1010":{"source":"iana"},"video/vnd.iptvforum.2dparityfec-2005":{"source":"iana"},"video/vnd.iptvforum.ttsavc":{"source":"iana"},"video/vnd.iptvforum.ttsmpeg2":{"source":"iana"},"video/vnd.motorola.video":{"source":"iana"},"video/vnd.motorola.videop":{"source":"iana"},"video/vnd.mpegurl":{"source":"iana","extensions":["mxu","m4u"]},"video/vnd.ms-playready.media.pyv":{"source":"iana","extensions":["pyv"]},"video/vnd.nokia.interleaved-multimedia":{"source":"iana"},"video/vnd.nokia.videovoip":{"source":"iana"},"video/vnd.objectvideo":{"source":"iana"},"video/vnd.radgamettools.bink":{"source":"iana"},"video/vnd.radgamettools.smacker":{"source":"iana"},"video/vnd.sealed.mpeg1":{"source":"iana"},"video/vnd.sealed.mpeg4":{"source":"iana"},"video/vnd.sealed.swf":{"source":"iana"},"video/vnd.sealedmedia.softseal.mov":{"source":"iana"},"video/vnd.uvvu.mp4":{"source":"iana","extensions":["uvu","uvvu"]},"video/vnd.vivo":{"source":"iana","extensions":["viv"]},"video/vp8":{"source":"iana"},"video/webm":{"source":"apache","compressible":false,"extensions":["webm"]},"video/x-f4v":{"source":"apache","extensions":["f4v"]},"video/x-fli":{"source":"apache","extensions":["fli"]},"video/x-flv":{"source":"apache","compressible":false,"extensions":["flv"]},"video/x-m4v":{"source":"apache","extensions":["m4v"]},"video/x-matroska":{"source":"apache","compressible":false,"extensions":["mkv","mk3d","mks"]},"video/x-mng":{"source":"apache","extensions":["mng"]},"video/x-ms-asf":{"source":"apache","extensions":["asf","asx"]},"video/x-ms-vob":{"source":"apache","extensions":["vob"]},"video/x-ms-wm":{"source":"apache","extensions":["wm"]},"video/x-ms-wmv":{"source":"apache","compressible":false,"extensions":["wmv"]},"video/x-ms-wmx":{"source":"apache","extensions":["wmx"]},"video/x-ms-wvx":{"source":"apache","extensions":["wvx"]},"video/x-msvideo":{"source":"apache","extensions":["avi"]},"video/x-sgi-movie":{"source":"apache","extensions":["movie"]},"video/x-smv":{"source":"apache","extensions":["smv"]},"x-conference/x-cooltalk":{"source":"apache","extensions":["ice"]},"x-shader/x-fragment":{"compressible":true},"x-shader/x-vertex":{"compressible":true}}

/***/ }),
/* 74 */
/***/ (function(module, exports) {

module.exports = require("net");

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * type-is
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2014-2015 Douglas Christopher Wilson
 * MIT Licensed
 */



/**
 * Module dependencies.
 * @private
 */

var typer = __webpack_require__(76)
var mime = __webpack_require__(36)

/**
 * Module exports.
 * @public
 */

module.exports = typeofrequest
module.exports.is = typeis
module.exports.hasBody = hasbody
module.exports.normalize = normalize
module.exports.match = mimeMatch

/**
 * Compare a `value` content-type with `types`.
 * Each `type` can be an extension like `html`,
 * a special shortcut like `multipart` or `urlencoded`,
 * or a mime type.
 *
 * If no types match, `false` is returned.
 * Otherwise, the first `type` that matches is returned.
 *
 * @param {String} value
 * @param {Array} types
 * @public
 */

function typeis (value, types_) {
  var i
  var types = types_

  // remove parameters and normalize
  var val = tryNormalizeType(value)

  // no type or invalid
  if (!val) {
    return false
  }

  // support flattened arguments
  if (types && !Array.isArray(types)) {
    types = new Array(arguments.length - 1)
    for (i = 0; i < types.length; i++) {
      types[i] = arguments[i + 1]
    }
  }

  // no types, return the content type
  if (!types || !types.length) {
    return val
  }

  var type
  for (i = 0; i < types.length; i++) {
    if (mimeMatch(normalize(type = types[i]), val)) {
      return type[0] === '+' || type.indexOf('*') !== -1
        ? val
        : type
    }
  }

  // no matches
  return false
}

/**
 * Check if a request has a request body.
 * A request with a body __must__ either have `transfer-encoding`
 * or `content-length` headers set.
 * http://www.w3.org/Protocols/rfc2616/rfc2616-sec4.html#sec4.3
 *
 * @param {Object} request
 * @return {Boolean}
 * @public
 */

function hasbody (req) {
  return req.headers['transfer-encoding'] !== undefined ||
    !isNaN(req.headers['content-length'])
}

/**
 * Check if the incoming request contains the "Content-Type"
 * header field, and it contains any of the give mime `type`s.
 * If there is no request body, `null` is returned.
 * If there is no content type, `false` is returned.
 * Otherwise, it returns the first `type` that matches.
 *
 * Examples:
 *
 *     // With Content-Type: text/html; charset=utf-8
 *     this.is('html'); // => 'html'
 *     this.is('text/html'); // => 'text/html'
 *     this.is('text/*', 'application/json'); // => 'text/html'
 *
 *     // When Content-Type is application/json
 *     this.is('json', 'urlencoded'); // => 'json'
 *     this.is('application/json'); // => 'application/json'
 *     this.is('html', 'application/*'); // => 'application/json'
 *
 *     this.is('html'); // => false
 *
 * @param {String|Array} types...
 * @return {String|false|null}
 * @public
 */

function typeofrequest (req, types_) {
  var types = types_

  // no body
  if (!hasbody(req)) {
    return null
  }

  // support flattened arguments
  if (arguments.length > 2) {
    types = new Array(arguments.length - 1)
    for (var i = 0; i < types.length; i++) {
      types[i] = arguments[i + 1]
    }
  }

  // request content type
  var value = req.headers['content-type']

  return typeis(value, types)
}

/**
 * Normalize a mime type.
 * If it's a shorthand, expand it to a valid mime type.
 *
 * In general, you probably want:
 *
 *   var type = is(req, ['urlencoded', 'json', 'multipart']);
 *
 * Then use the appropriate body parsers.
 * These three are the most common request body types
 * and are thus ensured to work.
 *
 * @param {String} type
 * @private
 */

function normalize (type) {
  if (typeof type !== 'string') {
    // invalid type
    return false
  }

  switch (type) {
    case 'urlencoded':
      return 'application/x-www-form-urlencoded'
    case 'multipart':
      return 'multipart/*'
  }

  if (type[0] === '+') {
    // "+json" -> "*/*+json" expando
    return '*/*' + type
  }

  return type.indexOf('/') === -1
    ? mime.lookup(type)
    : type
}

/**
 * Check if `expected` mime type
 * matches `actual` mime type with
 * wildcard and +suffix support.
 *
 * @param {String} expected
 * @param {String} actual
 * @return {Boolean}
 * @private
 */

function mimeMatch (expected, actual) {
  // invalid type
  if (expected === false) {
    return false
  }

  // split types
  var actualParts = actual.split('/')
  var expectedParts = expected.split('/')

  // invalid format
  if (actualParts.length !== 2 || expectedParts.length !== 2) {
    return false
  }

  // validate type
  if (expectedParts[0] !== '*' && expectedParts[0] !== actualParts[0]) {
    return false
  }

  // validate suffix wildcard
  if (expectedParts[1].substr(0, 2) === '*+') {
    return expectedParts[1].length <= actualParts[1].length + 1 &&
      expectedParts[1].substr(1) === actualParts[1].substr(1 - expectedParts[1].length)
  }

  // validate subtype
  if (expectedParts[1] !== '*' && expectedParts[1] !== actualParts[1]) {
    return false
  }

  return true
}

/**
 * Normalize a type and remove parameters.
 *
 * @param {string} value
 * @return {string}
 * @private
 */

function normalizeType (value) {
  // parse the type
  var type = typer.parse(value)

  // remove the parameters
  type.parameters = undefined

  // reformat it
  return typer.format(type)
}

/**
 * Try to normalize a type and remove parameters.
 *
 * @param {string} value
 * @return {string}
 * @private
 */

function tryNormalizeType (value) {
  try {
    return normalizeType(value)
  } catch (err) {
    return null
  }
}


/***/ }),
/* 76 */
/***/ (function(module, exports) {

/*!
 * media-typer
 * Copyright(c) 2014 Douglas Christopher Wilson
 * MIT Licensed
 */

/**
 * RegExp to match *( ";" parameter ) in RFC 2616 sec 3.7
 *
 * parameter     = token "=" ( token | quoted-string )
 * token         = 1*<any CHAR except CTLs or separators>
 * separators    = "(" | ")" | "<" | ">" | "@"
 *               | "," | ";" | ":" | "\" | <">
 *               | "/" | "[" | "]" | "?" | "="
 *               | "{" | "}" | SP | HT
 * quoted-string = ( <"> *(qdtext | quoted-pair ) <"> )
 * qdtext        = <any TEXT except <">>
 * quoted-pair   = "\" CHAR
 * CHAR          = <any US-ASCII character (octets 0 - 127)>
 * TEXT          = <any OCTET except CTLs, but including LWS>
 * LWS           = [CRLF] 1*( SP | HT )
 * CRLF          = CR LF
 * CR            = <US-ASCII CR, carriage return (13)>
 * LF            = <US-ASCII LF, linefeed (10)>
 * SP            = <US-ASCII SP, space (32)>
 * SHT           = <US-ASCII HT, horizontal-tab (9)>
 * CTL           = <any US-ASCII control character (octets 0 - 31) and DEL (127)>
 * OCTET         = <any 8-bit sequence of data>
 */
var paramRegExp = /; *([!#$%&'\*\+\-\.0-9A-Z\^_`a-z\|~]+) *= *("(?:[ !\u0023-\u005b\u005d-\u007e\u0080-\u00ff]|\\[\u0020-\u007e])*"|[!#$%&'\*\+\-\.0-9A-Z\^_`a-z\|~]+) */g;
var textRegExp = /^[\u0020-\u007e\u0080-\u00ff]+$/
var tokenRegExp = /^[!#$%&'\*\+\-\.0-9A-Z\^_`a-z\|~]+$/

/**
 * RegExp to match quoted-pair in RFC 2616
 *
 * quoted-pair = "\" CHAR
 * CHAR        = <any US-ASCII character (octets 0 - 127)>
 */
var qescRegExp = /\\([\u0000-\u007f])/g;

/**
 * RegExp to match chars that must be quoted-pair in RFC 2616
 */
var quoteRegExp = /([\\"])/g;

/**
 * RegExp to match type in RFC 6838
 *
 * type-name = restricted-name
 * subtype-name = restricted-name
 * restricted-name = restricted-name-first *126restricted-name-chars
 * restricted-name-first  = ALPHA / DIGIT
 * restricted-name-chars  = ALPHA / DIGIT / "!" / "#" /
 *                          "$" / "&" / "-" / "^" / "_"
 * restricted-name-chars =/ "." ; Characters before first dot always
 *                              ; specify a facet name
 * restricted-name-chars =/ "+" ; Characters after last plus always
 *                              ; specify a structured syntax suffix
 * ALPHA =  %x41-5A / %x61-7A   ; A-Z / a-z
 * DIGIT =  %x30-39             ; 0-9
 */
var subtypeNameRegExp = /^[A-Za-z0-9][A-Za-z0-9!#$&^_.-]{0,126}$/
var typeNameRegExp = /^[A-Za-z0-9][A-Za-z0-9!#$&^_-]{0,126}$/
var typeRegExp = /^ *([A-Za-z0-9][A-Za-z0-9!#$&^_-]{0,126})\/([A-Za-z0-9][A-Za-z0-9!#$&^_.+-]{0,126}) *$/;

/**
 * Module exports.
 */

exports.format = format
exports.parse = parse

/**
 * Format object to media type.
 *
 * @param {object} obj
 * @return {string}
 * @api public
 */

function format(obj) {
  if (!obj || typeof obj !== 'object') {
    throw new TypeError('argument obj is required')
  }

  var parameters = obj.parameters
  var subtype = obj.subtype
  var suffix = obj.suffix
  var type = obj.type

  if (!type || !typeNameRegExp.test(type)) {
    throw new TypeError('invalid type')
  }

  if (!subtype || !subtypeNameRegExp.test(subtype)) {
    throw new TypeError('invalid subtype')
  }

  // format as type/subtype
  var string = type + '/' + subtype

  // append +suffix
  if (suffix) {
    if (!typeNameRegExp.test(suffix)) {
      throw new TypeError('invalid suffix')
    }

    string += '+' + suffix
  }

  // append parameters
  if (parameters && typeof parameters === 'object') {
    var param
    var params = Object.keys(parameters).sort()

    for (var i = 0; i < params.length; i++) {
      param = params[i]

      if (!tokenRegExp.test(param)) {
        throw new TypeError('invalid parameter name')
      }

      string += '; ' + param + '=' + qstring(parameters[param])
    }
  }

  return string
}

/**
 * Parse media type to object.
 *
 * @param {string|object} string
 * @return {Object}
 * @api public
 */

function parse(string) {
  if (!string) {
    throw new TypeError('argument string is required')
  }

  // support req/res-like objects as argument
  if (typeof string === 'object') {
    string = getcontenttype(string)
  }

  if (typeof string !== 'string') {
    throw new TypeError('argument string is required to be a string')
  }

  var index = string.indexOf(';')
  var type = index !== -1
    ? string.substr(0, index)
    : string

  var key
  var match
  var obj = splitType(type)
  var params = {}
  var value

  paramRegExp.lastIndex = index

  while (match = paramRegExp.exec(string)) {
    if (match.index !== index) {
      throw new TypeError('invalid parameter format')
    }

    index += match[0].length
    key = match[1].toLowerCase()
    value = match[2]

    if (value[0] === '"') {
      // remove quotes and escapes
      value = value
        .substr(1, value.length - 2)
        .replace(qescRegExp, '$1')
    }

    params[key] = value
  }

  if (index !== -1 && index !== string.length) {
    throw new TypeError('invalid parameter format')
  }

  obj.parameters = params

  return obj
}

/**
 * Get content-type from req/res objects.
 *
 * @param {object}
 * @return {Object}
 * @api private
 */

function getcontenttype(obj) {
  if (typeof obj.getHeader === 'function') {
    // res-like
    return obj.getHeader('content-type')
  }

  if (typeof obj.headers === 'object') {
    // req-like
    return obj.headers && obj.headers['content-type']
  }
}

/**
 * Quote a string if necessary.
 *
 * @param {string} val
 * @return {string}
 * @api private
 */

function qstring(val) {
  var str = String(val)

  // no need to quote tokens
  if (tokenRegExp.test(str)) {
    return str
  }

  if (str.length > 0 && !textRegExp.test(str)) {
    throw new TypeError('invalid parameter value')
  }

  return '"' + str.replace(quoteRegExp, '\\$1') + '"'
}

/**
 * Simply "type/subtype+siffx" into parts.
 *
 * @param {string} string
 * @return {Object}
 * @api private
 */

function splitType(string) {
  var match = typeRegExp.exec(string.toLowerCase())

  if (!match) {
    throw new TypeError('invalid media type')
  }

  var type = match[1]
  var subtype = match[2]
  var suffix

  // suffix after last +
  var index = subtype.lastIndexOf('+')
  if (index !== -1) {
    suffix = subtype.substr(index + 1)
    subtype = subtype.substr(0, index)
  }

  var obj = {
    type: type,
    subtype: subtype,
    suffix: suffix
  }

  return obj
}


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * express
 * Copyright(c) 2009-2013 TJ Holowaychuk
 * Copyright(c) 2014-2015 Douglas Christopher Wilson
 * MIT Licensed
 */



/**
 * Module dependencies.
 * @private
 */

var contentDisposition = __webpack_require__(29);
var deprecate = __webpack_require__(6)('express');
var encodeUrl = __webpack_require__(10);
var escapeHtml = __webpack_require__(11);
var http = __webpack_require__(9);
var isAbsolute = __webpack_require__(7).isAbsolute;
var onFinished = __webpack_require__(17);
var path = __webpack_require__(4);
var statuses = __webpack_require__(12)
var merge = __webpack_require__(14);
var sign = __webpack_require__(78).sign;
var normalizeType = __webpack_require__(7).normalizeType;
var normalizeTypes = __webpack_require__(7).normalizeTypes;
var setCharset = __webpack_require__(7).setCharset;
var cookie = __webpack_require__(79);
var send = __webpack_require__(19);
var extname = path.extname;
var mime = send.mime;
var resolve = path.resolve;
var vary = __webpack_require__(80);

/**
 * Response prototype.
 * @public
 */

var res = Object.create(http.ServerResponse.prototype)

/**
 * Module exports.
 * @public
 */

module.exports = res

/**
 * Module variables.
 * @private
 */

var charsetRegExp = /;\s*charset\s*=/;

/**
 * Set status `code`.
 *
 * @param {Number} code
 * @return {ServerResponse}
 * @public
 */

res.status = function status(code) {
  this.statusCode = code;
  return this;
};

/**
 * Set Link header field with the given `links`.
 *
 * Examples:
 *
 *    res.links({
 *      next: 'http://api.example.com/users?page=2',
 *      last: 'http://api.example.com/users?page=5'
 *    });
 *
 * @param {Object} links
 * @return {ServerResponse}
 * @public
 */

res.links = function(links){
  var link = this.get('Link') || '';
  if (link) link += ', ';
  return this.set('Link', link + Object.keys(links).map(function(rel){
    return '<' + links[rel] + '>; rel="' + rel + '"';
  }).join(', '));
};

/**
 * Send a response.
 *
 * Examples:
 *
 *     res.send(new Buffer('wahoo'));
 *     res.send({ some: 'json' });
 *     res.send('<p>some html</p>');
 *
 * @param {string|number|boolean|object|Buffer} body
 * @public
 */

res.send = function send(body) {
  var chunk = body;
  var encoding;
  var len;
  var req = this.req;
  var type;

  // settings
  var app = this.app;

  // allow status / body
  if (arguments.length === 2) {
    // res.send(body, status) backwards compat
    if (typeof arguments[0] !== 'number' && typeof arguments[1] === 'number') {
      deprecate('res.send(body, status): Use res.status(status).send(body) instead');
      this.statusCode = arguments[1];
    } else {
      deprecate('res.send(status, body): Use res.status(status).send(body) instead');
      this.statusCode = arguments[0];
      chunk = arguments[1];
    }
  }

  // disambiguate res.send(status) and res.send(status, num)
  if (typeof chunk === 'number' && arguments.length === 1) {
    // res.send(status) will set status message as text string
    if (!this.get('Content-Type')) {
      this.type('txt');
    }

    deprecate('res.send(status): Use res.sendStatus(status) instead');
    this.statusCode = chunk;
    chunk = statuses[chunk]
  }

  switch (typeof chunk) {
    // string defaulting to html
    case 'string':
      if (!this.get('Content-Type')) {
        this.type('html');
      }
      break;
    case 'boolean':
    case 'number':
    case 'object':
      if (chunk === null) {
        chunk = '';
      } else if (Buffer.isBuffer(chunk)) {
        if (!this.get('Content-Type')) {
          this.type('bin');
        }
      } else {
        return this.json(chunk);
      }
      break;
  }

  // write strings in utf-8
  if (typeof chunk === 'string') {
    encoding = 'utf8';
    type = this.get('Content-Type');

    // reflect this in content-type
    if (typeof type === 'string') {
      this.set('Content-Type', setCharset(type, 'utf-8'));
    }
  }

  // populate Content-Length
  if (chunk !== undefined) {
    if (!Buffer.isBuffer(chunk)) {
      // convert chunk to Buffer; saves later double conversions
      chunk = new Buffer(chunk, encoding);
      encoding = undefined;
    }

    len = chunk.length;
    this.set('Content-Length', len);
  }

  // populate ETag
  var etag;
  var generateETag = len !== undefined && app.get('etag fn');
  if (typeof generateETag === 'function' && !this.get('ETag')) {
    if ((etag = generateETag(chunk, encoding))) {
      this.set('ETag', etag);
    }
  }

  // freshness
  if (req.fresh) this.statusCode = 304;

  // strip irrelevant headers
  if (204 === this.statusCode || 304 === this.statusCode) {
    this.removeHeader('Content-Type');
    this.removeHeader('Content-Length');
    this.removeHeader('Transfer-Encoding');
    chunk = '';
  }

  if (req.method === 'HEAD') {
    // skip body for HEAD
    this.end();
  } else {
    // respond
    this.end(chunk, encoding);
  }

  return this;
};

/**
 * Send JSON response.
 *
 * Examples:
 *
 *     res.json(null);
 *     res.json({ user: 'tj' });
 *
 * @param {string|number|boolean|object} obj
 * @public
 */

res.json = function json(obj) {
  var val = obj;

  // allow status / body
  if (arguments.length === 2) {
    // res.json(body, status) backwards compat
    if (typeof arguments[1] === 'number') {
      deprecate('res.json(obj, status): Use res.status(status).json(obj) instead');
      this.statusCode = arguments[1];
    } else {
      deprecate('res.json(status, obj): Use res.status(status).json(obj) instead');
      this.statusCode = arguments[0];
      val = arguments[1];
    }
  }

  // settings
  var app = this.app;
  var replacer = app.get('json replacer');
  var spaces = app.get('json spaces');
  var body = stringify(val, replacer, spaces);

  // content-type
  if (!this.get('Content-Type')) {
    this.set('Content-Type', 'application/json');
  }

  return this.send(body);
};

/**
 * Send JSON response with JSONP callback support.
 *
 * Examples:
 *
 *     res.jsonp(null);
 *     res.jsonp({ user: 'tj' });
 *
 * @param {string|number|boolean|object} obj
 * @public
 */

res.jsonp = function jsonp(obj) {
  var val = obj;

  // allow status / body
  if (arguments.length === 2) {
    // res.json(body, status) backwards compat
    if (typeof arguments[1] === 'number') {
      deprecate('res.jsonp(obj, status): Use res.status(status).json(obj) instead');
      this.statusCode = arguments[1];
    } else {
      deprecate('res.jsonp(status, obj): Use res.status(status).jsonp(obj) instead');
      this.statusCode = arguments[0];
      val = arguments[1];
    }
  }

  // settings
  var app = this.app;
  var replacer = app.get('json replacer');
  var spaces = app.get('json spaces');
  var body = stringify(val, replacer, spaces);
  var callback = this.req.query[app.get('jsonp callback name')];

  // content-type
  if (!this.get('Content-Type')) {
    this.set('X-Content-Type-Options', 'nosniff');
    this.set('Content-Type', 'application/json');
  }

  // fixup callback
  if (Array.isArray(callback)) {
    callback = callback[0];
  }

  // jsonp
  if (typeof callback === 'string' && callback.length !== 0) {
    this.charset = 'utf-8';
    this.set('X-Content-Type-Options', 'nosniff');
    this.set('Content-Type', 'text/javascript');

    // restrict callback charset
    callback = callback.replace(/[^\[\]\w$.]/g, '');

    // replace chars not allowed in JavaScript that are in JSON
    body = body
      .replace(/\u2028/g, '\\u2028')
      .replace(/\u2029/g, '\\u2029');

    // the /**/ is a specific security mitigation for "Rosetta Flash JSONP abuse"
    // the typeof check is just to reduce client error noise
    body = '/**/ typeof ' + callback + ' === \'function\' && ' + callback + '(' + body + ');';
  }

  return this.send(body);
};

/**
 * Send given HTTP status code.
 *
 * Sets the response status to `statusCode` and the body of the
 * response to the standard description from node's http.STATUS_CODES
 * or the statusCode number if no description.
 *
 * Examples:
 *
 *     res.sendStatus(200);
 *
 * @param {number} statusCode
 * @public
 */

res.sendStatus = function sendStatus(statusCode) {
  var body = statuses[statusCode] || String(statusCode)

  this.statusCode = statusCode;
  this.type('txt');

  return this.send(body);
};

/**
 * Transfer the file at the given `path`.
 *
 * Automatically sets the _Content-Type_ response header field.
 * The callback `callback(err)` is invoked when the transfer is complete
 * or when an error occurs. Be sure to check `res.sentHeader`
 * if you wish to attempt responding, as the header and some data
 * may have already been transferred.
 *
 * Options:
 *
 *   - `maxAge`   defaulting to 0 (can be string converted by `ms`)
 *   - `root`     root directory for relative filenames
 *   - `headers`  object of headers to serve with file
 *   - `dotfiles` serve dotfiles, defaulting to false; can be `"allow"` to send them
 *
 * Other options are passed along to `send`.
 *
 * Examples:
 *
 *  The following example illustrates how `res.sendFile()` may
 *  be used as an alternative for the `static()` middleware for
 *  dynamic situations. The code backing `res.sendFile()` is actually
 *  the same code, so HTTP cache support etc is identical.
 *
 *     app.get('/user/:uid/photos/:file', function(req, res){
 *       var uid = req.params.uid
 *         , file = req.params.file;
 *
 *       req.user.mayViewFilesFrom(uid, function(yes){
 *         if (yes) {
 *           res.sendFile('/uploads/' + uid + '/' + file);
 *         } else {
 *           res.send(403, 'Sorry! you cant see that.');
 *         }
 *       });
 *     });
 *
 * @public
 */

res.sendFile = function sendFile(path, options, callback) {
  var done = callback;
  var req = this.req;
  var res = this;
  var next = req.next;
  var opts = options || {};

  if (!path) {
    throw new TypeError('path argument is required to res.sendFile');
  }

  // support function as second arg
  if (typeof options === 'function') {
    done = options;
    opts = {};
  }

  if (!opts.root && !isAbsolute(path)) {
    throw new TypeError('path must be absolute or specify root to res.sendFile');
  }

  // create file stream
  var pathname = encodeURI(path);
  var file = send(req, pathname, opts);

  // transfer
  sendfile(res, file, opts, function (err) {
    if (done) return done(err);
    if (err && err.code === 'EISDIR') return next();

    // next() all but write errors
    if (err && err.code !== 'ECONNABORTED' && err.syscall !== 'write') {
      next(err);
    }
  });
};

/**
 * Transfer the file at the given `path`.
 *
 * Automatically sets the _Content-Type_ response header field.
 * The callback `callback(err)` is invoked when the transfer is complete
 * or when an error occurs. Be sure to check `res.sentHeader`
 * if you wish to attempt responding, as the header and some data
 * may have already been transferred.
 *
 * Options:
 *
 *   - `maxAge`   defaulting to 0 (can be string converted by `ms`)
 *   - `root`     root directory for relative filenames
 *   - `headers`  object of headers to serve with file
 *   - `dotfiles` serve dotfiles, defaulting to false; can be `"allow"` to send them
 *
 * Other options are passed along to `send`.
 *
 * Examples:
 *
 *  The following example illustrates how `res.sendfile()` may
 *  be used as an alternative for the `static()` middleware for
 *  dynamic situations. The code backing `res.sendfile()` is actually
 *  the same code, so HTTP cache support etc is identical.
 *
 *     app.get('/user/:uid/photos/:file', function(req, res){
 *       var uid = req.params.uid
 *         , file = req.params.file;
 *
 *       req.user.mayViewFilesFrom(uid, function(yes){
 *         if (yes) {
 *           res.sendfile('/uploads/' + uid + '/' + file);
 *         } else {
 *           res.send(403, 'Sorry! you cant see that.');
 *         }
 *       });
 *     });
 *
 * @public
 */

res.sendfile = function (path, options, callback) {
  var done = callback;
  var req = this.req;
  var res = this;
  var next = req.next;
  var opts = options || {};

  // support function as second arg
  if (typeof options === 'function') {
    done = options;
    opts = {};
  }

  // create file stream
  var file = send(req, path, opts);

  // transfer
  sendfile(res, file, opts, function (err) {
    if (done) return done(err);
    if (err && err.code === 'EISDIR') return next();

    // next() all but write errors
    if (err && err.code !== 'ECONNABORT' && err.syscall !== 'write') {
      next(err);
    }
  });
};

res.sendfile = deprecate.function(res.sendfile,
  'res.sendfile: Use res.sendFile instead');

/**
 * Transfer the file at the given `path` as an attachment.
 *
 * Optionally providing an alternate attachment `filename`,
 * and optional callback `callback(err)`. The callback is invoked
 * when the data transfer is complete, or when an error has
 * ocurred. Be sure to check `res.headersSent` if you plan to respond.
 *
 * This method uses `res.sendfile()`.
 *
 * @public
 */

res.download = function download(path, filename, callback) {
  var done = callback;
  var name = filename;

  // support function as second arg
  if (typeof filename === 'function') {
    done = filename;
    name = null;
  }

  // set Content-Disposition when file is sent
  var headers = {
    'Content-Disposition': contentDisposition(name || path)
  };

  // Resolve the full path for sendFile
  var fullPath = resolve(path);

  return this.sendFile(fullPath, { headers: headers }, done);
};

/**
 * Set _Content-Type_ response header with `type` through `mime.lookup()`
 * when it does not contain "/", or set the Content-Type to `type` otherwise.
 *
 * Examples:
 *
 *     res.type('.html');
 *     res.type('html');
 *     res.type('json');
 *     res.type('application/json');
 *     res.type('png');
 *
 * @param {String} type
 * @return {ServerResponse} for chaining
 * @public
 */

res.contentType =
res.type = function contentType(type) {
  var ct = type.indexOf('/') === -1
    ? mime.lookup(type)
    : type;

  return this.set('Content-Type', ct);
};

/**
 * Respond to the Acceptable formats using an `obj`
 * of mime-type callbacks.
 *
 * This method uses `req.accepted`, an array of
 * acceptable types ordered by their quality values.
 * When "Accept" is not present the _first_ callback
 * is invoked, otherwise the first match is used. When
 * no match is performed the server responds with
 * 406 "Not Acceptable".
 *
 * Content-Type is set for you, however if you choose
 * you may alter this within the callback using `res.type()`
 * or `res.set('Content-Type', ...)`.
 *
 *    res.format({
 *      'text/plain': function(){
 *        res.send('hey');
 *      },
 *
 *      'text/html': function(){
 *        res.send('<p>hey</p>');
 *      },
 *
 *      'appliation/json': function(){
 *        res.send({ message: 'hey' });
 *      }
 *    });
 *
 * In addition to canonicalized MIME types you may
 * also use extnames mapped to these types:
 *
 *    res.format({
 *      text: function(){
 *        res.send('hey');
 *      },
 *
 *      html: function(){
 *        res.send('<p>hey</p>');
 *      },
 *
 *      json: function(){
 *        res.send({ message: 'hey' });
 *      }
 *    });
 *
 * By default Express passes an `Error`
 * with a `.status` of 406 to `next(err)`
 * if a match is not made. If you provide
 * a `.default` callback it will be invoked
 * instead.
 *
 * @param {Object} obj
 * @return {ServerResponse} for chaining
 * @public
 */

res.format = function(obj){
  var req = this.req;
  var next = req.next;

  var fn = obj.default;
  if (fn) delete obj.default;
  var keys = Object.keys(obj);

  var key = keys.length > 0
    ? req.accepts(keys)
    : false;

  this.vary("Accept");

  if (key) {
    this.set('Content-Type', normalizeType(key).value);
    obj[key](req, this, next);
  } else if (fn) {
    fn();
  } else {
    var err = new Error('Not Acceptable');
    err.status = err.statusCode = 406;
    err.types = normalizeTypes(keys).map(function(o){ return o.value });
    next(err);
  }

  return this;
};

/**
 * Set _Content-Disposition_ header to _attachment_ with optional `filename`.
 *
 * @param {String} filename
 * @return {ServerResponse}
 * @public
 */

res.attachment = function attachment(filename) {
  if (filename) {
    this.type(extname(filename));
  }

  this.set('Content-Disposition', contentDisposition(filename));

  return this;
};

/**
 * Append additional header `field` with value `val`.
 *
 * Example:
 *
 *    res.append('Link', ['<http://localhost/>', '<http://localhost:3000/>']);
 *    res.append('Set-Cookie', 'foo=bar; Path=/; HttpOnly');
 *    res.append('Warning', '199 Miscellaneous warning');
 *
 * @param {String} field
 * @param {String|Array} val
 * @return {ServerResponse} for chaining
 * @public
 */

res.append = function append(field, val) {
  var prev = this.get(field);
  var value = val;

  if (prev) {
    // concat the new and prev vals
    value = Array.isArray(prev) ? prev.concat(val)
      : Array.isArray(val) ? [prev].concat(val)
      : [prev, val];
  }

  return this.set(field, value);
};

/**
 * Set header `field` to `val`, or pass
 * an object of header fields.
 *
 * Examples:
 *
 *    res.set('Foo', ['bar', 'baz']);
 *    res.set('Accept', 'application/json');
 *    res.set({ Accept: 'text/plain', 'X-API-Key': 'tobi' });
 *
 * Aliased as `res.header()`.
 *
 * @param {String|Object} field
 * @param {String|Array} val
 * @return {ServerResponse} for chaining
 * @public
 */

res.set =
res.header = function header(field, val) {
  if (arguments.length === 2) {
    var value = Array.isArray(val)
      ? val.map(String)
      : String(val);

    // add charset to content-type
    if (field.toLowerCase() === 'content-type') {
      if (Array.isArray(value)) {
        throw new TypeError('Content-Type cannot be set to an Array');
      }
      if (!charsetRegExp.test(value)) {
        var charset = mime.charsets.lookup(value.split(';')[0]);
        if (charset) value += '; charset=' + charset.toLowerCase();
      }
    }

    this.setHeader(field, value);
  } else {
    for (var key in field) {
      this.set(key, field[key]);
    }
  }
  return this;
};

/**
 * Get value for header `field`.
 *
 * @param {String} field
 * @return {String}
 * @public
 */

res.get = function(field){
  return this.getHeader(field);
};

/**
 * Clear cookie `name`.
 *
 * @param {String} name
 * @param {Object} [options]
 * @return {ServerResponse} for chaining
 * @public
 */

res.clearCookie = function clearCookie(name, options) {
  var opts = merge({ expires: new Date(1), path: '/' }, options);

  return this.cookie(name, '', opts);
};

/**
 * Set cookie `name` to `value`, with the given `options`.
 *
 * Options:
 *
 *    - `maxAge`   max-age in milliseconds, converted to `expires`
 *    - `signed`   sign the cookie
 *    - `path`     defaults to "/"
 *
 * Examples:
 *
 *    // "Remember Me" for 15 minutes
 *    res.cookie('rememberme', '1', { expires: new Date(Date.now() + 900000), httpOnly: true });
 *
 *    // save as above
 *    res.cookie('rememberme', '1', { maxAge: 900000, httpOnly: true })
 *
 * @param {String} name
 * @param {String|Object} value
 * @param {Object} [options]
 * @return {ServerResponse} for chaining
 * @public
 */

res.cookie = function (name, value, options) {
  var opts = merge({}, options);
  var secret = this.req.secret;
  var signed = opts.signed;

  if (signed && !secret) {
    throw new Error('cookieParser("secret") required for signed cookies');
  }

  var val = typeof value === 'object'
    ? 'j:' + JSON.stringify(value)
    : String(value);

  if (signed) {
    val = 's:' + sign(val, secret);
  }

  if ('maxAge' in opts) {
    opts.expires = new Date(Date.now() + opts.maxAge);
    opts.maxAge /= 1000;
  }

  if (opts.path == null) {
    opts.path = '/';
  }

  this.append('Set-Cookie', cookie.serialize(name, String(val), opts));

  return this;
};

/**
 * Set the location header to `url`.
 *
 * The given `url` can also be "back", which redirects
 * to the _Referrer_ or _Referer_ headers or "/".
 *
 * Examples:
 *
 *    res.location('/foo/bar').;
 *    res.location('http://example.com');
 *    res.location('../login');
 *
 * @param {String} url
 * @return {ServerResponse} for chaining
 * @public
 */

res.location = function location(url) {
  var loc = url;

  // "back" is an alias for the referrer
  if (url === 'back') {
    loc = this.req.get('Referrer') || '/';
  }

  // set location
  return this.set('Location', encodeUrl(loc));
};

/**
 * Redirect to the given `url` with optional response `status`
 * defaulting to 302.
 *
 * The resulting `url` is determined by `res.location()`, so
 * it will play nicely with mounted apps, relative paths,
 * `"back"` etc.
 *
 * Examples:
 *
 *    res.redirect('/foo/bar');
 *    res.redirect('http://example.com');
 *    res.redirect(301, 'http://example.com');
 *    res.redirect('../login'); // /blog/post/1 -> /blog/login
 *
 * @public
 */

res.redirect = function redirect(url) {
  var address = url;
  var body;
  var status = 302;

  // allow status / url
  if (arguments.length === 2) {
    if (typeof arguments[0] === 'number') {
      status = arguments[0];
      address = arguments[1];
    } else {
      deprecate('res.redirect(url, status): Use res.redirect(status, url) instead');
      status = arguments[1];
    }
  }

  // Set location header
  address = this.location(address).get('Location');

  // Support text/{plain,html} by default
  this.format({
    text: function(){
      body = statuses[status] + '. Redirecting to ' + address
    },

    html: function(){
      var u = escapeHtml(address);
      body = '<p>' + statuses[status] + '. Redirecting to <a href="' + u + '">' + u + '</a></p>'
    },

    default: function(){
      body = '';
    }
  });

  // Respond
  this.statusCode = status;
  this.set('Content-Length', Buffer.byteLength(body));

  if (this.req.method === 'HEAD') {
    this.end();
  } else {
    this.end(body);
  }
};

/**
 * Add `field` to Vary. If already present in the Vary set, then
 * this call is simply ignored.
 *
 * @param {Array|String} field
 * @return {ServerResponse} for chaining
 * @public
 */

res.vary = function(field){
  // checks for back-compat
  if (!field || (Array.isArray(field) && !field.length)) {
    deprecate('res.vary(): Provide a field name');
    return this;
  }

  vary(this, field);

  return this;
};

/**
 * Render `view` with the given `options` and optional callback `fn`.
 * When a callback function is given a response will _not_ be made
 * automatically, otherwise a response of _200_ and _text/html_ is given.
 *
 * Options:
 *
 *  - `cache`     boolean hinting to the engine it should cache
 *  - `filename`  filename of the view being rendered
 *
 * @public
 */

res.render = function render(view, options, callback) {
  var app = this.req.app;
  var done = callback;
  var opts = options || {};
  var req = this.req;
  var self = this;

  // support callback function as second arg
  if (typeof options === 'function') {
    done = options;
    opts = {};
  }

  // merge res.locals
  opts._locals = self.locals;

  // default callback to respond
  done = done || function (err, str) {
    if (err) return req.next(err);
    self.send(str);
  };

  // render
  app.render(view, opts, done);
};

// pipe the send file stream
function sendfile(res, file, options, callback) {
  var done = false;
  var streaming;

  // request aborted
  function onaborted() {
    if (done) return;
    done = true;

    var err = new Error('Request aborted');
    err.code = 'ECONNABORTED';
    callback(err);
  }

  // directory
  function ondirectory() {
    if (done) return;
    done = true;

    var err = new Error('EISDIR, read');
    err.code = 'EISDIR';
    callback(err);
  }

  // errors
  function onerror(err) {
    if (done) return;
    done = true;
    callback(err);
  }

  // ended
  function onend() {
    if (done) return;
    done = true;
    callback();
  }

  // file
  function onfile() {
    streaming = false;
  }

  // finished
  function onfinish(err) {
    if (err && err.code === 'ECONNRESET') return onaborted();
    if (err) return onerror(err);
    if (done) return;

    setImmediate(function () {
      if (streaming !== false && !done) {
        onaborted();
        return;
      }

      if (done) return;
      done = true;
      callback();
    });
  }

  // streaming
  function onstream() {
    streaming = true;
  }

  file.on('directory', ondirectory);
  file.on('end', onend);
  file.on('error', onerror);
  file.on('file', onfile);
  file.on('stream', onstream);
  onFinished(res, onfinish);

  if (options.headers) {
    // set headers on successful transfer
    file.on('headers', function headers(res) {
      var obj = options.headers;
      var keys = Object.keys(obj);

      for (var i = 0; i < keys.length; i++) {
        var k = keys[i];
        res.setHeader(k, obj[k]);
      }
    });
  }

  // pipe
  file.pipe(res);
}

/**
 * Stringify JSON, like JSON.stringify, but v8 optimized.
 * @private
 */

function stringify(value, replacer, spaces) {
  // v8 checks arguments.length for optimizing simple call
  // https://bugs.chromium.org/p/v8/issues/detail?id=4730
  return replacer || spaces
    ? JSON.stringify(value, replacer, spaces)
    : JSON.stringify(value);
}


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module dependencies.
 */

var crypto = __webpack_require__(32);

/**
 * Sign the given `val` with `secret`.
 *
 * @param {String} val
 * @param {String} secret
 * @return {String}
 * @api private
 */

exports.sign = function(val, secret){
  if ('string' != typeof val) throw new TypeError("Cookie value must be provided as a string.");
  if ('string' != typeof secret) throw new TypeError("Secret string must be provided.");
  return val + '.' + crypto
    .createHmac('sha256', secret)
    .update(val)
    .digest('base64')
    .replace(/\=+$/, '');
};

/**
 * Unsign and decode the given `val` with `secret`,
 * returning `false` if the signature is invalid.
 *
 * @param {String} val
 * @param {String} secret
 * @return {String|Boolean}
 * @api private
 */

exports.unsign = function(val, secret){
  if ('string' != typeof val) throw new TypeError("Signed cookie string must be provided.");
  if ('string' != typeof secret) throw new TypeError("Secret string must be provided.");
  var str = val.slice(0, val.lastIndexOf('.'))
    , mac = exports.sign(str, secret);
  
  return sha1(mac) == sha1(val) ? str : false;
};

/**
 * Private
 */

function sha1(str){
  return crypto.createHash('sha1').update(str).digest('hex');
}


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */



/**
 * Module exports.
 * @public
 */

exports.parse = parse;
exports.serialize = serialize;

/**
 * Module variables.
 * @private
 */

var decode = decodeURIComponent;
var encode = encodeURIComponent;
var pairSplitRegExp = /; */;

/**
 * RegExp to match field-content in RFC 7230 sec 3.2
 *
 * field-content = field-vchar [ 1*( SP / HTAB ) field-vchar ]
 * field-vchar   = VCHAR / obs-text
 * obs-text      = %x80-FF
 */

var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;

/**
 * Parse a cookie header.
 *
 * Parse the given cookie header string into an object
 * The object has the various cookies as keys(names) => values
 *
 * @param {string} str
 * @param {object} [options]
 * @return {object}
 * @public
 */

function parse(str, options) {
  if (typeof str !== 'string') {
    throw new TypeError('argument str must be a string');
  }

  var obj = {}
  var opt = options || {};
  var pairs = str.split(pairSplitRegExp);
  var dec = opt.decode || decode;

  for (var i = 0; i < pairs.length; i++) {
    var pair = pairs[i];
    var eq_idx = pair.indexOf('=');

    // skip things that don't look like key=value
    if (eq_idx < 0) {
      continue;
    }

    var key = pair.substr(0, eq_idx).trim()
    var val = pair.substr(++eq_idx, pair.length).trim();

    // quoted values
    if ('"' == val[0]) {
      val = val.slice(1, -1);
    }

    // only assign once
    if (undefined == obj[key]) {
      obj[key] = tryDecode(val, dec);
    }
  }

  return obj;
}

/**
 * Serialize data into a cookie header.
 *
 * Serialize the a name value pair into a cookie string suitable for
 * http headers. An optional options object specified cookie parameters.
 *
 * serialize('foo', 'bar', { httpOnly: true })
 *   => "foo=bar; httpOnly"
 *
 * @param {string} name
 * @param {string} val
 * @param {object} [options]
 * @return {string}
 * @public
 */

function serialize(name, val, options) {
  var opt = options || {};
  var enc = opt.encode || encode;

  if (typeof enc !== 'function') {
    throw new TypeError('option encode is invalid');
  }

  if (!fieldContentRegExp.test(name)) {
    throw new TypeError('argument name is invalid');
  }

  var value = enc(val);

  if (value && !fieldContentRegExp.test(value)) {
    throw new TypeError('argument val is invalid');
  }

  var str = name + '=' + value;

  if (null != opt.maxAge) {
    var maxAge = opt.maxAge - 0;
    if (isNaN(maxAge)) throw new Error('maxAge should be a Number');
    str += '; Max-Age=' + Math.floor(maxAge);
  }

  if (opt.domain) {
    if (!fieldContentRegExp.test(opt.domain)) {
      throw new TypeError('option domain is invalid');
    }

    str += '; Domain=' + opt.domain;
  }

  if (opt.path) {
    if (!fieldContentRegExp.test(opt.path)) {
      throw new TypeError('option path is invalid');
    }

    str += '; Path=' + opt.path;
  }

  if (opt.expires) {
    if (typeof opt.expires.toUTCString !== 'function') {
      throw new TypeError('option expires is invalid');
    }

    str += '; Expires=' + opt.expires.toUTCString();
  }

  if (opt.httpOnly) {
    str += '; HttpOnly';
  }

  if (opt.secure) {
    str += '; Secure';
  }

  if (opt.sameSite) {
    var sameSite = typeof opt.sameSite === 'string'
      ? opt.sameSite.toLowerCase() : opt.sameSite;

    switch (sameSite) {
      case true:
        str += '; SameSite=Strict';
        break;
      case 'lax':
        str += '; SameSite=Lax';
        break;
      case 'strict':
        str += '; SameSite=Strict';
        break;
      default:
        throw new TypeError('option sameSite is invalid');
    }
  }

  return str;
}

/**
 * Try decoding a string using a decoding function.
 *
 * @param {string} str
 * @param {function} decode
 * @private
 */

function tryDecode(str, decode) {
  try {
    return decode(str);
  } catch (e) {
    return str;
  }
}


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * vary
 * Copyright(c) 2014-2017 Douglas Christopher Wilson
 * MIT Licensed
 */



/**
 * Module exports.
 */

module.exports = vary
module.exports.append = append

/**
 * Regular expression to split on commas, trimming spaces
 * @private
 */

var ARRAY_SPLIT_REGEXP = / *, */

/**
 * RegExp to match field-name in RFC 7230 sec 3.2
 *
 * field-name    = token
 * token         = 1*tchar
 * tchar         = "!" / "#" / "$" / "%" / "&" / "'" / "*"
 *               / "+" / "-" / "." / "^" / "_" / "`" / "|" / "~"
 *               / DIGIT / ALPHA
 *               ; any VCHAR, except delimiters
 */

var FIELD_NAME_REGEXP = /^[!#$%&'*+\-.^_`|~0-9A-Za-z]+$/

/**
 * Append a field to a vary header.
 *
 * @param {String} header
 * @param {String|Array} field
 * @return {String}
 * @public
 */

function append (header, field) {
  if (typeof header !== 'string') {
    throw new TypeError('header argument is required')
  }

  if (!field) {
    throw new TypeError('field argument is required')
  }

  // get fields array
  var fields = !Array.isArray(field)
    ? parse(String(field))
    : field

  // assert on invalid field names
  for (var j = 0; j < fields.length; j++) {
    if (!FIELD_NAME_REGEXP.test(fields[j])) {
      throw new TypeError('field argument contains an invalid header name')
    }
  }

  // existing, unspecified vary
  if (header === '*') {
    return header
  }

  // enumerate current values
  var val = header
  var vals = parse(header.toLowerCase())

  // unspecified vary
  if (fields.indexOf('*') !== -1 || vals.indexOf('*') !== -1) {
    return '*'
  }

  for (var i = 0; i < fields.length; i++) {
    var fld = fields[i].toLowerCase()

    // append value (case-preserving)
    if (vals.indexOf(fld) === -1) {
      vals.push(fld)
      val = val
        ? val + ', ' + fields[i]
        : fields[i]
    }
  }

  return val
}

/**
 * Parse a vary header into an array.
 *
 * @param {String} header
 * @return {Array}
 * @private
 */

function parse (header) {
  return header.trim().split(ARRAY_SPLIT_REGEXP)
}

/**
 * Mark that a request is varied on a header field.
 *
 * @param {Object} res
 * @param {String|Array} field
 * @public
 */

function vary (res, field) {
  if (!res || !res.getHeader || !res.setHeader) {
    // quack quack
    throw new TypeError('res argument is required')
  }

  // get existing header
  var val = res.getHeader('Vary') || ''
  var header = Array.isArray(val)
    ? val.join(', ')
    : String(val)

  // set new header
  if ((val = append(header, field))) {
    res.setHeader('Vary', val)
  }
}


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * serve-static
 * Copyright(c) 2010 Sencha Inc.
 * Copyright(c) 2011 TJ Holowaychuk
 * Copyright(c) 2014-2016 Douglas Christopher Wilson
 * MIT Licensed
 */



/**
 * Module dependencies.
 * @private
 */

var encodeUrl = __webpack_require__(10)
var escapeHtml = __webpack_require__(11)
var parseUrl = __webpack_require__(8)
var resolve = __webpack_require__(4).resolve
var send = __webpack_require__(19)
var url = __webpack_require__(20)

/**
 * Module exports.
 * @public
 */

module.exports = serveStatic
module.exports.mime = send.mime

/**
 * @param {string} root
 * @param {object} [options]
 * @return {function}
 * @public
 */

function serveStatic (root, options) {
  if (!root) {
    throw new TypeError('root path required')
  }

  if (typeof root !== 'string') {
    throw new TypeError('root path must be a string')
  }

  // copy options object
  var opts = Object.create(options || null)

  // fall-though
  var fallthrough = opts.fallthrough !== false

  // default redirect
  var redirect = opts.redirect !== false

  // headers listener
  var setHeaders = opts.setHeaders

  if (setHeaders && typeof setHeaders !== 'function') {
    throw new TypeError('option setHeaders must be function')
  }

  // setup options for send
  opts.maxage = opts.maxage || opts.maxAge || 0
  opts.root = resolve(root)

  // construct directory listener
  var onDirectory = redirect
    ? createRedirectDirectoryListener()
    : createNotFoundDirectoryListener()

  return function serveStatic (req, res, next) {
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      if (fallthrough) {
        return next()
      }

      // method not allowed
      res.statusCode = 405
      res.setHeader('Allow', 'GET, HEAD')
      res.setHeader('Content-Length', '0')
      res.end()
      return
    }

    var forwardError = !fallthrough
    var originalUrl = parseUrl.original(req)
    var path = parseUrl(req).pathname

    // make sure redirect occurs at mount
    if (path === '/' && originalUrl.pathname.substr(-1) !== '/') {
      path = ''
    }

    // create send stream
    var stream = send(req, path, opts)

    // add directory handler
    stream.on('directory', onDirectory)

    // add headers listener
    if (setHeaders) {
      stream.on('headers', setHeaders)
    }

    // add file listener for fallthrough
    if (fallthrough) {
      stream.on('file', function onFile () {
        // once file is determined, always forward error
        forwardError = true
      })
    }

    // forward errors
    stream.on('error', function error (err) {
      if (forwardError || !(err.statusCode < 500)) {
        next(err)
        return
      }

      next()
    })

    // pipe
    stream.pipe(res)
  }
}

/**
 * Collapse all leading slashes into a single slash
 * @private
 */
function collapseLeadingSlashes (str) {
  for (var i = 0; i < str.length; i++) {
    if (str[i] !== '/') {
      break
    }
  }

  return i > 1
    ? '/' + str.substr(i)
    : str
}

 /**
 * Create a minimal HTML document.
 *
 * @param {string} title
 * @param {string} body
 * @private
 */

function createHtmlDocument (title, body) {
  return '<!DOCTYPE html>\n' +
    '<html lang="en">\n' +
    '<head>\n' +
    '<meta charset="utf-8">\n' +
    '<title>' + title + '</title>\n' +
    '</head>\n' +
    '<body>\n' +
    '<pre>' + body + '</pre>\n' +
    '</body>\n'
}

/**
 * Create a directory listener that just 404s.
 * @private
 */

function createNotFoundDirectoryListener () {
  return function notFound () {
    this.error(404)
  }
}

/**
 * Create a directory listener that performs a redirect.
 * @private
 */

function createRedirectDirectoryListener () {
  return function redirect (res) {
    if (this.hasTrailingSlash()) {
      this.error(404)
      return
    }

    // get original URL
    var originalUrl = parseUrl.original(this.req)

    // append trailing slash
    originalUrl.path = null
    originalUrl.pathname = collapseLeadingSlashes(originalUrl.pathname + '/')

    // reformat the URL
    var loc = encodeUrl(url.format(originalUrl))
    var doc = createHtmlDocument('Redirecting', 'Redirecting to <a href="' + escapeHtml(loc) + '">' +
      escapeHtml(loc) + '</a>')

    // send redirect response
    res.statusCode = 301
    res.setHeader('Content-Type', 'text/html; charset=UTF-8')
    res.setHeader('Content-Length', Buffer.byteLength(doc))
    res.setHeader('Content-Security-Policy', "default-src 'self'")
    res.setHeader('X-Content-Type-Options', 'nosniff')
    res.setHeader('Location', loc)
    res.end(doc)
  }
}


/***/ }),
/* 82 */
/***/ (function(module, exports) {

module.exports = require("safe-buffer");

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {


module.exports = __webpack_require__(108);


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const safeBuffer = __webpack_require__(82);
const zlib = __webpack_require__(93);

const bufferUtil = __webpack_require__(87);

const Buffer = safeBuffer.Buffer;

const AVAILABLE_WINDOW_BITS = [8, 9, 10, 11, 12, 13, 14, 15];
const TRAILER = Buffer.from([0x00, 0x00, 0xff, 0xff]);
const EMPTY_BLOCK = Buffer.from([0x00]);
const DEFAULT_WINDOW_BITS = 15;
const DEFAULT_MEM_LEVEL = 8;

/**
 * Per-message Deflate implementation.
 */
class PerMessageDeflate {
  constructor (options, isServer, maxPayload) {
    this._options = options || {};
    this._isServer = !!isServer;
    this._inflate = null;
    this._deflate = null;
    this.params = null;
    this._maxPayload = maxPayload || 0;
    this.threshold = this._options.threshold === undefined ? 1024 : this._options.threshold;
  }

  static get extensionName () {
    return 'permessage-deflate';
  }

  /**
   * Create extension parameters offer.
   *
   * @return {Object} Extension parameters
   * @public
   */
  offer () {
    const params = {};

    if (this._options.serverNoContextTakeover) {
      params.server_no_context_takeover = true;
    }
    if (this._options.clientNoContextTakeover) {
      params.client_no_context_takeover = true;
    }
    if (this._options.serverMaxWindowBits) {
      params.server_max_window_bits = this._options.serverMaxWindowBits;
    }
    if (this._options.clientMaxWindowBits) {
      params.client_max_window_bits = this._options.clientMaxWindowBits;
    } else if (this._options.clientMaxWindowBits == null) {
      params.client_max_window_bits = true;
    }

    return params;
  }

  /**
   * Accept extension offer.
   *
   * @param {Array} paramsList Extension parameters
   * @return {Object} Accepted configuration
   * @public
   */
  accept (paramsList) {
    paramsList = this.normalizeParams(paramsList);

    var params;
    if (this._isServer) {
      params = this.acceptAsServer(paramsList);
    } else {
      params = this.acceptAsClient(paramsList);
    }

    this.params = params;
    return params;
  }

  /**
   * Releases all resources used by the extension.
   *
   * @public
   */
  cleanup () {
    if (this._inflate) {
      if (this._inflate.writeInProgress) {
        this._inflate.pendingClose = true;
      } else {
        this._inflate.close();
        this._inflate = null;
      }
    }
    if (this._deflate) {
      if (this._deflate.writeInProgress) {
        this._deflate.pendingClose = true;
      } else {
        this._deflate.close();
        this._deflate = null;
      }
    }
  }

  /**
   * Accept extension offer from client.
   *
   * @param {Array} paramsList Extension parameters
   * @return {Object} Accepted configuration
   * @private
   */
  acceptAsServer (paramsList) {
    const accepted = {};
    const result = paramsList.some((params) => {
      if ((
        this._options.serverNoContextTakeover === false &&
        params.server_no_context_takeover
      ) || (
        this._options.serverMaxWindowBits === false &&
        params.server_max_window_bits
      ) || (
        typeof this._options.serverMaxWindowBits === 'number' &&
        typeof params.server_max_window_bits === 'number' &&
        this._options.serverMaxWindowBits > params.server_max_window_bits
      ) || (
        typeof this._options.clientMaxWindowBits === 'number' &&
        !params.client_max_window_bits
      )) {
        return;
      }

      if (
        this._options.serverNoContextTakeover ||
        params.server_no_context_takeover
      ) {
        accepted.server_no_context_takeover = true;
      }
      if (this._options.clientNoContextTakeover) {
        accepted.client_no_context_takeover = true;
      }
      if (
        this._options.clientNoContextTakeover !== false &&
        params.client_no_context_takeover
      ) {
        accepted.client_no_context_takeover = true;
      }
      if (typeof this._options.serverMaxWindowBits === 'number') {
        accepted.server_max_window_bits = this._options.serverMaxWindowBits;
      } else if (typeof params.server_max_window_bits === 'number') {
        accepted.server_max_window_bits = params.server_max_window_bits;
      }
      if (typeof this._options.clientMaxWindowBits === 'number') {
        accepted.client_max_window_bits = this._options.clientMaxWindowBits;
      } else if (
        this._options.clientMaxWindowBits !== false &&
        typeof params.client_max_window_bits === 'number'
      ) {
        accepted.client_max_window_bits = params.client_max_window_bits;
      }
      return true;
    });

    if (!result) throw new Error(`Doesn't support the offered configuration`);

    return accepted;
  }

  /**
   * Accept extension response from server.
   *
   * @param {Array} paramsList Extension parameters
   * @return {Object} Accepted configuration
   * @private
   */
  acceptAsClient (paramsList) {
    const params = paramsList[0];

    if (this._options.clientNoContextTakeover != null) {
      if (
        this._options.clientNoContextTakeover === false &&
        params.client_no_context_takeover
      ) {
        throw new Error('Invalid value for "client_no_context_takeover"');
      }
    }
    if (this._options.clientMaxWindowBits != null) {
      if (
        this._options.clientMaxWindowBits === false &&
        params.client_max_window_bits
      ) {
        throw new Error('Invalid value for "client_max_window_bits"');
      }
      if (
        typeof this._options.clientMaxWindowBits === 'number' && (
        !params.client_max_window_bits ||
        params.client_max_window_bits > this._options.clientMaxWindowBits
      )) {
        throw new Error('Invalid value for "client_max_window_bits"');
      }
    }

    return params;
  }

  /**
   * Normalize extensions parameters.
   *
   * @param {Array} paramsList Extension parameters
   * @return {Array} Normalized extensions parameters
   * @private
   */
  normalizeParams (paramsList) {
    return paramsList.map((params) => {
      Object.keys(params).forEach((key) => {
        var value = params[key];
        if (value.length > 1) {
          throw new Error(`Multiple extension parameters for ${key}`);
        }

        value = value[0];

        switch (key) {
          case 'server_no_context_takeover':
          case 'client_no_context_takeover':
            if (value !== true) {
              throw new Error(`invalid extension parameter value for ${key} (${value})`);
            }
            params[key] = true;
            break;
          case 'server_max_window_bits':
          case 'client_max_window_bits':
            if (typeof value === 'string') {
              value = parseInt(value, 10);
              if (!~AVAILABLE_WINDOW_BITS.indexOf(value)) {
                throw new Error(`invalid extension parameter value for ${key} (${value})`);
              }
            }
            if (!this._isServer && value === true) {
              throw new Error(`Missing extension parameter value for ${key}`);
            }
            params[key] = value;
            break;
          default:
            throw new Error(`Not defined extension parameter (${key})`);
        }
      });
      return params;
    });
  }

  /**
   * Decompress data.
   *
   * @param {Buffer} data Compressed data
   * @param {Boolean} fin Specifies whether or not this is the last fragment
   * @param {Function} callback Callback
   * @public
   */
  decompress (data, fin, callback) {
    const endpoint = this._isServer ? 'client' : 'server';

    if (!this._inflate) {
      const maxWindowBits = this.params[`${endpoint}_max_window_bits`];
      this._inflate = zlib.createInflateRaw({
        windowBits: typeof maxWindowBits === 'number' ? maxWindowBits : DEFAULT_WINDOW_BITS
      });
    }
    this._inflate.writeInProgress = true;

    var totalLength = 0;
    const buffers = [];
    var err;

    const onData = (data) => {
      totalLength += data.length;
      if (this._maxPayload < 1 || totalLength <= this._maxPayload) {
        return buffers.push(data);
      }

      err = new Error('max payload size exceeded');
      err.closeCode = 1009;
      this._inflate.reset();
    };

    const onError = (err) => {
      cleanup();
      callback(err);
    };

    const cleanup = () => {
      if (!this._inflate) return;

      this._inflate.removeListener('error', onError);
      this._inflate.removeListener('data', onData);
      this._inflate.writeInProgress = false;

      if (
        (fin && this.params[`${endpoint}_no_context_takeover`]) ||
        this._inflate.pendingClose
      ) {
        this._inflate.close();
        this._inflate = null;
      }
    };

    this._inflate.on('error', onError).on('data', onData);
    this._inflate.write(data);
    if (fin) this._inflate.write(TRAILER);

    this._inflate.flush(() => {
      cleanup();
      if (err) callback(err);
      else callback(null, bufferUtil.concat(buffers, totalLength));
    });
  }

  /**
   * Compress data.
   *
   * @param {Buffer} data Data to compress
   * @param {Boolean} fin Specifies whether or not this is the last fragment
   * @param {Function} callback Callback
   * @public
   */
  compress (data, fin, callback) {
    if (!data || data.length === 0) {
      process.nextTick(callback, null, EMPTY_BLOCK);
      return;
    }

    const endpoint = this._isServer ? 'server' : 'client';

    if (!this._deflate) {
      const maxWindowBits = this.params[`${endpoint}_max_window_bits`];
      this._deflate = zlib.createDeflateRaw({
        flush: zlib.Z_SYNC_FLUSH,
        windowBits: typeof maxWindowBits === 'number' ? maxWindowBits : DEFAULT_WINDOW_BITS,
        memLevel: this._options.memLevel || DEFAULT_MEM_LEVEL
      });
    }
    this._deflate.writeInProgress = true;

    var totalLength = 0;
    const buffers = [];

    const onData = (data) => {
      totalLength += data.length;
      buffers.push(data);
    };

    const onError = (err) => {
      cleanup();
      callback(err);
    };

    const cleanup = () => {
      if (!this._deflate) return;

      this._deflate.removeListener('error', onError);
      this._deflate.removeListener('data', onData);
      this._deflate.writeInProgress = false;

      if (
        (fin && this.params[`${endpoint}_no_context_takeover`]) ||
        this._deflate.pendingClose
      ) {
        this._deflate.close();
        this._deflate = null;
      }
    };

    this._deflate.on('error', onError).on('data', onData);
    this._deflate.write(data);
    this._deflate.flush(zlib.Z_SYNC_FLUSH, () => {
      cleanup();
      var data = bufferUtil.concat(buffers, totalLength);
      if (fin) data = data.slice(0, data.length - 4);
      callback(null, data);
    });
  }
}

module.exports = PerMessageDeflate;


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * Module dependencies.
 */

var debug = __webpack_require__(5)('socket.io-parser');
var Emitter = __webpack_require__(132);
var hasBin = __webpack_require__(91);
var binary = __webpack_require__(133);
var isBuf = __webpack_require__(102);

/**
 * Protocol version.
 *
 * @api public
 */

exports.protocol = 4;

/**
 * Packet types.
 *
 * @api public
 */

exports.types = [
  'CONNECT',
  'DISCONNECT',
  'EVENT',
  'ACK',
  'ERROR',
  'BINARY_EVENT',
  'BINARY_ACK'
];

/**
 * Packet type `connect`.
 *
 * @api public
 */

exports.CONNECT = 0;

/**
 * Packet type `disconnect`.
 *
 * @api public
 */

exports.DISCONNECT = 1;

/**
 * Packet type `event`.
 *
 * @api public
 */

exports.EVENT = 2;

/**
 * Packet type `ack`.
 *
 * @api public
 */

exports.ACK = 3;

/**
 * Packet type `error`.
 *
 * @api public
 */

exports.ERROR = 4;

/**
 * Packet type 'binary event'
 *
 * @api public
 */

exports.BINARY_EVENT = 5;

/**
 * Packet type `binary ack`. For acks with binary arguments.
 *
 * @api public
 */

exports.BINARY_ACK = 6;

/**
 * Encoder constructor.
 *
 * @api public
 */

exports.Encoder = Encoder;

/**
 * Decoder constructor.
 *
 * @api public
 */

exports.Decoder = Decoder;

/**
 * A socket.io Encoder instance
 *
 * @api public
 */

function Encoder() {}

/**
 * Encode a packet as a single string if non-binary, or as a
 * buffer sequence, depending on packet type.
 *
 * @param {Object} obj - packet object
 * @param {Function} callback - function to handle encodings (likely engine.write)
 * @return Calls callback with Array of encodings
 * @api public
 */

Encoder.prototype.encode = function(obj, callback){
  if ((obj.type === exports.EVENT || obj.type === exports.ACK) && hasBin(obj.data)) {
    obj.type = obj.type === exports.EVENT ? exports.BINARY_EVENT : exports.BINARY_ACK;
  }

  debug('encoding packet %j', obj);

  if (exports.BINARY_EVENT === obj.type || exports.BINARY_ACK === obj.type) {
    encodeAsBinary(obj, callback);
  }
  else {
    var encoding = encodeAsString(obj);
    callback([encoding]);
  }
};

/**
 * Encode packet as string.
 *
 * @param {Object} packet
 * @return {String} encoded
 * @api private
 */

function encodeAsString(obj) {

  // first is type
  var str = '' + obj.type;

  // attachments if we have them
  if (exports.BINARY_EVENT === obj.type || exports.BINARY_ACK === obj.type) {
    str += obj.attachments + '-';
  }

  // if we have a namespace other than `/`
  // we append it followed by a comma `,`
  if (obj.nsp && '/' !== obj.nsp) {
    str += obj.nsp + ',';
  }

  // immediately followed by the id
  if (null != obj.id) {
    str += obj.id;
  }

  // json data
  if (null != obj.data) {
    str += JSON.stringify(obj.data);
  }

  debug('encoded %j as %s', obj, str);
  return str;
}

/**
 * Encode packet as 'buffer sequence' by removing blobs, and
 * deconstructing packet into object with placeholders and
 * a list of buffers.
 *
 * @param {Object} packet
 * @return {Buffer} encoded
 * @api private
 */

function encodeAsBinary(obj, callback) {

  function writeEncoding(bloblessData) {
    var deconstruction = binary.deconstructPacket(bloblessData);
    var pack = encodeAsString(deconstruction.packet);
    var buffers = deconstruction.buffers;

    buffers.unshift(pack); // add packet info to beginning of data list
    callback(buffers); // write all the buffers
  }

  binary.removeBlobs(obj, writeEncoding);
}

/**
 * A socket.io Decoder instance
 *
 * @return {Object} decoder
 * @api public
 */

function Decoder() {
  this.reconstructor = null;
}

/**
 * Mix in `Emitter` with Decoder.
 */

Emitter(Decoder.prototype);

/**
 * Decodes an ecoded packet string into packet JSON.
 *
 * @param {String} obj - encoded packet
 * @return {Object} packet
 * @api public
 */

Decoder.prototype.add = function(obj) {
  var packet;
  if (typeof obj === 'string') {
    packet = decodeString(obj);
    if (exports.BINARY_EVENT === packet.type || exports.BINARY_ACK === packet.type) { // binary packet's json
      this.reconstructor = new BinaryReconstructor(packet);

      // no attachments, labeled binary but no binary data to follow
      if (this.reconstructor.reconPack.attachments === 0) {
        this.emit('decoded', packet);
      }
    } else { // non-binary full packet
      this.emit('decoded', packet);
    }
  }
  else if (isBuf(obj) || obj.base64) { // raw binary data
    if (!this.reconstructor) {
      throw new Error('got binary data when not reconstructing a packet');
    } else {
      packet = this.reconstructor.takeBinaryData(obj);
      if (packet) { // received final buffer
        this.reconstructor = null;
        this.emit('decoded', packet);
      }
    }
  }
  else {
    throw new Error('Unknown type: ' + obj);
  }
};

/**
 * Decode a packet String (JSON data)
 *
 * @param {String} str
 * @return {Object} packet
 * @api private
 */

function decodeString(str) {
  var i = 0;
  // look up type
  var p = {
    type: Number(str.charAt(0))
  };

  if (null == exports.types[p.type]) return error();

  // look up attachments if type binary
  if (exports.BINARY_EVENT === p.type || exports.BINARY_ACK === p.type) {
    var buf = '';
    while (str.charAt(++i) !== '-') {
      buf += str.charAt(i);
      if (i == str.length) break;
    }
    if (buf != Number(buf) || str.charAt(i) !== '-') {
      throw new Error('Illegal attachments');
    }
    p.attachments = Number(buf);
  }

  // look up namespace (if any)
  if ('/' === str.charAt(i + 1)) {
    p.nsp = '';
    while (++i) {
      var c = str.charAt(i);
      if (',' === c) break;
      p.nsp += c;
      if (i === str.length) break;
    }
  } else {
    p.nsp = '/';
  }

  // look up id
  var next = str.charAt(i + 1);
  if ('' !== next && Number(next) == next) {
    p.id = '';
    while (++i) {
      var c = str.charAt(i);
      if (null == c || Number(c) != c) {
        --i;
        break;
      }
      p.id += str.charAt(i);
      if (i === str.length) break;
    }
    p.id = Number(p.id);
  }

  // look up json data
  if (str.charAt(++i)) {
    p = tryParse(p, str.substr(i));
  }

  debug('decoded %s as %j', str, p);
  return p;
}

function tryParse(p, str) {
  try {
    p.data = JSON.parse(str);
  } catch(e){
    return error();
  }
  return p; 
}

/**
 * Deallocates a parser's resources
 *
 * @api public
 */

Decoder.prototype.destroy = function() {
  if (this.reconstructor) {
    this.reconstructor.finishedReconstruction();
  }
};

/**
 * A manager of a binary event's 'buffer sequence'. Should
 * be constructed whenever a packet of type BINARY_EVENT is
 * decoded.
 *
 * @param {Object} packet
 * @return {BinaryReconstructor} initialized reconstructor
 * @api private
 */

function BinaryReconstructor(packet) {
  this.reconPack = packet;
  this.buffers = [];
}

/**
 * Method to be called when binary data received from connection
 * after a BINARY_EVENT packet.
 *
 * @param {Buffer | ArrayBuffer} binData - the raw binary data received
 * @return {null | Object} returns null if more binary data is expected or
 *   a reconstructed packet object if all buffers have been received.
 * @api private
 */

BinaryReconstructor.prototype.takeBinaryData = function(binData) {
  this.buffers.push(binData);
  if (this.buffers.length === this.reconPack.attachments) { // done with buffer list
    var packet = binary.reconstructPacket(this.reconPack, this.buffers);
    this.finishedReconstruction();
    return packet;
  }
  return null;
};

/**
 * Cleans up binary packet reconstruction variables.
 *
 * @api private
 */

BinaryReconstructor.prototype.finishedReconstruction = function() {
  this.reconPack = null;
  this.buffers = [];
};

function error() {
  return {
    type: exports.ERROR,
    data: 'parser error'
  };
}


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * Module dependencies.
 */

var EventEmitter = __webpack_require__(16).EventEmitter;
var parser = __webpack_require__(83);
var util = __webpack_require__(60);
var debug = __webpack_require__(5)('engine:transport');

/**
 * Expose the constructor.
 */

module.exports = Transport;

/**
 * Noop function.
 *
 * @api private
 */

function noop () {}

/**
 * Transport constructor.
 *
 * @param {http.IncomingMessage} request
 * @api public
 */

function Transport (req) {
  this.readyState = 'open';
  this.discarded = false;
}

/**
 * Inherits from EventEmitter.
 */

util.inherits(Transport, EventEmitter);

/**
 * Flags the transport as discarded.
 *
 * @api private
 */

Transport.prototype.discard = function () {
  this.discarded = true;
};

/**
 * Called with an incoming HTTP request.
 *
 * @param {http.IncomingMessage} request
 * @api private
 */

Transport.prototype.onRequest = function (req) {
  debug('setting request');
  this.req = req;
};

/**
 * Closes the transport.
 *
 * @api private
 */

Transport.prototype.close = function (fn) {
  if ('closed' === this.readyState || 'closing' === this.readyState) return;

  this.readyState = 'closing';
  this.doClose(fn || noop);
};

/**
 * Called with a transport error.
 *
 * @param {String} message error
 * @param {Object} error description
 * @api private
 */

Transport.prototype.onError = function (msg, desc) {
  if (this.listeners('error').length) {
    var err = new Error(msg);
    err.type = 'TransportError';
    err.description = desc;
    this.emit('error', err);
  } else {
    debug('ignored transport error %s (%s)', msg, desc);
  }
};

/**
 * Called with parsed out a packets from the data stream.
 *
 * @param {Object} packet
 * @api private
 */

Transport.prototype.onPacket = function (packet) {
  this.emit('packet', packet);
};

/**
 * Called with the encoded packet data.
 *
 * @param {String} data
 * @api private
 */

Transport.prototype.onData = function (data) {
  this.onPacket(parser.decodePacket(data));
};

/**
 * Called upon transport close.
 *
 * @api private
 */

Transport.prototype.onClose = function () {
  this.readyState = 'closed';
  this.emit('close');
};


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * ws: a node.js websocket client
 * Copyright(c) 2011 Einar Otto Stangvik <einaros@gmail.com>
 * MIT Licensed
 */



const safeBuffer = __webpack_require__(82);

const Buffer = safeBuffer.Buffer;

/**
 * Merges an array of buffers into a new buffer.
 *
 * @param {Buffer[]} list The array of buffers to concat
 * @param {Number} totalLength The total length of buffers in the list
 * @return {Buffer} The resulting buffer
 * @public
 */
const concat = (list, totalLength) => {
  const target = Buffer.allocUnsafe(totalLength);
  var offset = 0;

  for (var i = 0; i < list.length; i++) {
    const buf = list[i];
    buf.copy(target, offset);
    offset += buf.length;
  }

  return target;
};

try {
  const bufferUtil = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"bufferutil\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

  module.exports = Object.assign({ concat }, bufferUtil.BufferUtil || bufferUtil);
} catch (e) /* istanbul ignore next */ {
  /**
   * Masks a buffer using the given mask.
   *
   * @param {Buffer} source The buffer to mask
   * @param {Buffer} mask The mask to use
   * @param {Buffer} output The buffer where to store the result
   * @param {Number} offset The offset at which to start writing
   * @param {Number} length The number of bytes to mask.
   * @public
   */
  const mask = (source, mask, output, offset, length) => {
    for (var i = 0; i < length; i++) {
      output[offset + i] = source[i] ^ mask[i & 3];
    }
  };

  /**
   * Unmasks a buffer using the given mask.
   *
   * @param {Buffer} buffer The buffer to unmask
   * @param {Buffer} mask The mask to use
   * @public
   */
  const unmask = (buffer, mask) => {
    // Required until https://github.com/nodejs/node/issues/9006 is resolved.
    const length = buffer.length;
    for (var i = 0; i < length; i++) {
      buffer[i] ^= mask[i & 3];
    }
  };

  module.exports = { concat, mask, unmask };
}


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const safeBuffer = __webpack_require__(82);

const Buffer = safeBuffer.Buffer;

exports.BINARY_TYPES = ['nodebuffer', 'arraybuffer', 'fragments'];
exports.GUID = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11';
exports.EMPTY_BUFFER = Buffer.alloc(0);
exports.NOOP = () => {};


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * Module dependencies.
 */

var XHR = __webpack_require__(107);
var JSONP = __webpack_require__(112);

/**
 * Export transports.
 */

module.exports = exports = {
  polling: polling,
  websocket: __webpack_require__(113)
};

/**
 * Export upgrades map.
 */

exports.polling.upgradesTo = ['websocket'];

/**
 * Polling polymorphic constructor.
 *
 * @api private
 */

function polling (req) {
  if ('string' === typeof req._query.j) {
    return new JSONP(req);
  } else {
    return new XHR(req);
  }
}


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * Module requirements.
 */

var Transport = __webpack_require__(86);
var parser = __webpack_require__(83);
var zlib = __webpack_require__(93);
var accepts = __webpack_require__(66);
var util = __webpack_require__(60);
var debug = __webpack_require__(5)('engine:polling');

var compressionMethods = {
  gzip: zlib.createGzip,
  deflate: zlib.createDeflate
};

/**
 * Exports the constructor.
 */

module.exports = Polling;

/**
 * HTTP polling constructor.
 *
 * @api public.
 */

function Polling (req) {
  Transport.call(this, req);

  this.closeTimeout = 30 * 1000;
  this.maxHttpBufferSize = null;
  this.httpCompression = null;
}

/**
 * Inherits from Transport.
 *
 * @api public.
 */

util.inherits(Polling, Transport);

/**
 * Transport name
 *
 * @api public
 */

Polling.prototype.name = 'polling';

/**
 * Overrides onRequest.
 *
 * @param {http.IncomingMessage}
 * @api private
 */

Polling.prototype.onRequest = function (req) {
  var res = req.res;

  if ('GET' === req.method) {
    this.onPollRequest(req, res);
  } else if ('POST' === req.method) {
    this.onDataRequest(req, res);
  } else {
    res.writeHead(500);
    res.end();
  }
};

/**
 * The client sends a request awaiting for us to send data.
 *
 * @api private
 */

Polling.prototype.onPollRequest = function (req, res) {
  if (this.req) {
    debug('request overlap');
    // assert: this.res, '.req and .res should be (un)set together'
    this.onError('overlap from client');
    res.writeHead(500);
    res.end();
    return;
  }

  debug('setting request');

  this.req = req;
  this.res = res;

  var self = this;

  function onClose () {
    self.onError('poll connection closed prematurely');
  }

  function cleanup () {
    req.removeListener('close', onClose);
    self.req = self.res = null;
  }

  req.cleanup = cleanup;
  req.on('close', onClose);

  this.writable = true;
  this.emit('drain');

  // if we're still writable but had a pending close, trigger an empty send
  if (this.writable && this.shouldClose) {
    debug('triggering empty send to append close packet');
    this.send([{ type: 'noop' }]);
  }
};

/**
 * The client sends a request with data.
 *
 * @api private
 */

Polling.prototype.onDataRequest = function (req, res) {
  if (this.dataReq) {
    // assert: this.dataRes, '.dataReq and .dataRes should be (un)set together'
    this.onError('data request overlap from client');
    res.writeHead(500);
    res.end();
    return;
  }

  var isBinary = 'application/octet-stream' === req.headers['content-type'];

  this.dataReq = req;
  this.dataRes = res;

  var chunks = isBinary ? new Buffer(0) : ''; // eslint-disable-line node/no-deprecated-api
  var self = this;

  function cleanup () {
    req.removeListener('data', onData);
    req.removeListener('end', onEnd);
    req.removeListener('close', onClose);
    self.dataReq = self.dataRes = chunks = null;
  }

  function onClose () {
    cleanup();
    self.onError('data request connection closed prematurely');
  }

  function onData (data) {
    var contentLength;
    if (isBinary) {
      chunks = Buffer.concat([chunks, data]);
      contentLength = chunks.length;
    } else {
      chunks += data;
      contentLength = Buffer.byteLength(chunks);
    }

    if (contentLength > self.maxHttpBufferSize) {
      chunks = isBinary ? new Buffer(0) : ''; // eslint-disable-line node/no-deprecated-api
      req.connection.destroy();
    }
  }

  function onEnd () {
    self.onData(chunks);

    var headers = {
      // text/html is required instead of text/plain to avoid an
      // unwanted download dialog on certain user-agents (GH-43)
      'Content-Type': 'text/html',
      'Content-Length': 2
    };

    res.writeHead(200, self.headers(req, headers));
    res.end('ok');
    cleanup();
  }

  req.on('close', onClose);
  if (!isBinary) req.setEncoding('utf8');
  req.on('data', onData);
  req.on('end', onEnd);
};

/**
 * Processes the incoming data payload.
 *
 * @param {String} encoded payload
 * @api private
 */

Polling.prototype.onData = function (data) {
  debug('received "%s"', data);
  var self = this;
  var callback = function (packet) {
    if ('close' === packet.type) {
      debug('got xhr close packet');
      self.onClose();
      return false;
    }

    self.onPacket(packet);
  };

  parser.decodePayload(data, callback);
};

/**
 * Overrides onClose.
 *
 * @api private
 */

Polling.prototype.onClose = function () {
  if (this.writable) {
    // close pending poll request
    this.send([{ type: 'noop' }]);
  }
  Transport.prototype.onClose.call(this);
};

/**
 * Writes a packet payload.
 *
 * @param {Object} packet
 * @api private
 */

Polling.prototype.send = function (packets) {
  this.writable = false;

  if (this.shouldClose) {
    debug('appending close packet to payload');
    packets.push({ type: 'close' });
    this.shouldClose();
    this.shouldClose = null;
  }

  var self = this;
  parser.encodePayload(packets, this.supportsBinary, function (data) {
    var compress = packets.some(function (packet) {
      return packet.options && packet.options.compress;
    });
    self.write(data, { compress: compress });
  });
};

/**
 * Writes data as response to poll request.
 *
 * @param {String} data
 * @param {Object} options
 * @api private
 */

Polling.prototype.write = function (data, options) {
  debug('writing "%s"', data);
  var self = this;
  this.doWrite(data, options, function () {
    self.req.cleanup();
  });
};

/**
 * Performs the write.
 *
 * @api private
 */

Polling.prototype.doWrite = function (data, options, callback) {
  var self = this;

  // explicit UTF-8 is required for pages not served under utf
  var isString = typeof data === 'string';
  var contentType = isString
    ? 'text/plain; charset=UTF-8'
    : 'application/octet-stream';

  var headers = {
    'Content-Type': contentType
  };

  if (!this.httpCompression || !options.compress) {
    respond(data);
    return;
  }

  var len = isString ? Buffer.byteLength(data) : data.length;
  if (len < this.httpCompression.threshold) {
    respond(data);
    return;
  }

  var encoding = accepts(this.req).encodings(['gzip', 'deflate']);
  if (!encoding) {
    respond(data);
    return;
  }

  this.compress(data, encoding, function (err, data) {
    if (err) {
      self.res.writeHead(500);
      self.res.end();
      callback(err);
      return;
    }

    headers['Content-Encoding'] = encoding;
    respond(data);
  });

  function respond (data) {
    headers['Content-Length'] = 'string' === typeof data ? Buffer.byteLength(data) : data.length;
    self.res.writeHead(200, self.headers(self.req, headers));
    self.res.end(data);
    callback();
  }
};

/**
 * Compresses data.
 *
 * @api private
 */

Polling.prototype.compress = function (data, encoding, callback) {
  debug('compressing');

  var buffers = [];
  var nread = 0;

  compressionMethods[encoding](this.httpCompression)
    .on('error', callback)
    .on('data', function (chunk) {
      buffers.push(chunk);
      nread += chunk.length;
    })
    .on('end', function () {
      callback(null, Buffer.concat(buffers, nread));
    })
    .end(data);
};

/**
 * Closes the transport.
 *
 * @api private
 */

Polling.prototype.doClose = function (fn) {
  debug('closing');

  var self = this;
  var closeTimeoutTimer;

  if (this.dataReq) {
    debug('aborting ongoing data request');
    this.dataReq.destroy();
  }

  if (this.writable) {
    debug('transport writable - closing right away');
    this.send([{ type: 'close' }]);
    onClose();
  } else if (this.discarded) {
    debug('transport discarded - closing right away');
    onClose();
  } else {
    debug('transport not writable - buffering orderly close');
    this.shouldClose = onClose;
    closeTimeoutTimer = setTimeout(onClose, this.closeTimeout);
  }

  function onClose () {
    clearTimeout(closeTimeoutTimer);
    fn();
    self.onClose();
  }
};

/**
 * Returns headers for a response.
 *
 * @param {http.IncomingMessage} request
 * @param {Object} extra headers
 * @api private
 */

Polling.prototype.headers = function (req, headers) {
  headers = headers || {};

  // prevent XSS warnings on IE
  // https://github.com/LearnBoost/socket.io/pull/1333
  var ua = req.headers['user-agent'];
  if (ua && (~ua.indexOf(';MSIE') || ~ua.indexOf('Trident/'))) {
    headers['X-XSS-Protection'] = '0';
  }

  this.emit('headers', headers);
  return headers;
};


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

/* global Blob File */

/*
 * Module requirements.
 */

var isArray = __webpack_require__(92);

var toString = Object.prototype.toString;
var withNativeBlob = typeof global.Blob === 'function' || toString.call(global.Blob) === '[object BlobConstructor]';
var withNativeFile = typeof global.File === 'function' || toString.call(global.File) === '[object FileConstructor]';

/**
 * Module exports.
 */

module.exports = hasBinary;

/**
 * Checks for binary data.
 *
 * Supports Buffer, ArrayBuffer, Blob and File.
 *
 * @param {Object} anything
 * @api public
 */

function hasBinary (obj) {
  if (!obj || typeof obj !== 'object') {
    return false;
  }

  if (isArray(obj)) {
    for (var i = 0, l = obj.length; i < l; i++) {
      if (hasBinary(obj[i])) {
        return true;
      }
    }
    return false;
  }

  if ((typeof global.Buffer === 'function' && global.Buffer.isBuffer && global.Buffer.isBuffer(obj)) ||
     (typeof global.ArrayBuffer === 'function' && obj instanceof ArrayBuffer) ||
     (withNativeBlob && obj instanceof Blob) ||
     (withNativeFile && obj instanceof File)
    ) {
    return true;
  }

  // see: https://github.com/Automattic/has-binary/pull/4
  if (obj.toJSON && typeof obj.toJSON === 'function' && arguments.length === 1) {
    return hasBinary(obj.toJSON(), true);
  }

  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key) && hasBinary(obj[key])) {
      return true;
    }
  }

  return false;
}


/***/ }),
/* 92 */
/***/ (function(module, exports) {

module.exports = require("isarray");

/***/ }),
/* 93 */
/***/ (function(module, exports) {

module.exports = require("zlib");

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module dependencies.
 */

var EventEmitter = __webpack_require__(16).EventEmitter;
var util = __webpack_require__(60);
var debug = __webpack_require__(5)('engine:socket');

/**
 * Module exports.
 */

module.exports = Socket;

/**
 * Client class (abstract).
 *
 * @api private
 */

function Socket (id, server, transport, req) {
  this.id = id;
  this.server = server;
  this.upgrading = false;
  this.upgraded = false;
  this.readyState = 'opening';
  this.writeBuffer = [];
  this.packetsFn = [];
  this.sentCallbackFn = [];
  this.cleanupFn = [];
  this.request = req;

  // Cache IP since it might not be in the req later
  this.remoteAddress = req.connection.remoteAddress;

  this.checkIntervalTimer = null;
  this.upgradeTimeoutTimer = null;
  this.pingTimeoutTimer = null;

  this.setTransport(transport);
  this.onOpen();
}

/**
 * Inherits from EventEmitter.
 */

util.inherits(Socket, EventEmitter);

/**
 * Called upon transport considered open.
 *
 * @api private
 */

Socket.prototype.onOpen = function () {
  this.readyState = 'open';

  // sends an `open` packet
  this.transport.sid = this.id;
  this.sendPacket('open', JSON.stringify({
    sid: this.id,
    upgrades: this.getAvailableUpgrades(),
    pingInterval: this.server.pingInterval,
    pingTimeout: this.server.pingTimeout
  }));

  if (this.server.initialPacket) {
    this.sendPacket('message', this.server.initialPacket);
  }

  this.emit('open');
  this.setPingTimeout();
};

/**
 * Called upon transport packet.
 *
 * @param {Object} packet
 * @api private
 */

Socket.prototype.onPacket = function (packet) {
  if ('open' === this.readyState) {
    // export packet event
    debug('packet');
    this.emit('packet', packet);

    // Reset ping timeout on any packet, incoming data is a good sign of
    // other side's liveness
    this.setPingTimeout();

    switch (packet.type) {
      case 'ping':
        debug('got ping');
        this.sendPacket('pong');
        this.emit('heartbeat');
        break;

      case 'error':
        this.onClose('parse error');
        break;

      case 'message':
        this.emit('data', packet.data);
        this.emit('message', packet.data);
        break;
    }
  } else {
    debug('packet received with closed socket');
  }
};

/**
 * Called upon transport error.
 *
 * @param {Error} error object
 * @api private
 */

Socket.prototype.onError = function (err) {
  debug('transport error');
  this.onClose('transport error', err);
};

/**
 * Sets and resets ping timeout timer based on client pings.
 *
 * @api private
 */

Socket.prototype.setPingTimeout = function () {
  var self = this;
  clearTimeout(self.pingTimeoutTimer);
  self.pingTimeoutTimer = setTimeout(function () {
    self.onClose('ping timeout');
  }, self.server.pingInterval + self.server.pingTimeout);
};

/**
 * Attaches handlers for the given transport.
 *
 * @param {Transport} transport
 * @api private
 */

Socket.prototype.setTransport = function (transport) {
  var onError = this.onError.bind(this);
  var onPacket = this.onPacket.bind(this);
  var flush = this.flush.bind(this);
  var onClose = this.onClose.bind(this, 'transport close');

  this.transport = transport;
  this.transport.once('error', onError);
  this.transport.on('packet', onPacket);
  this.transport.on('drain', flush);
  this.transport.once('close', onClose);
  // this function will manage packet events (also message callbacks)
  this.setupSendCallback();

  this.cleanupFn.push(function () {
    transport.removeListener('error', onError);
    transport.removeListener('packet', onPacket);
    transport.removeListener('drain', flush);
    transport.removeListener('close', onClose);
  });
};

/**
 * Upgrades socket to the given transport
 *
 * @param {Transport} transport
 * @api private
 */

Socket.prototype.maybeUpgrade = function (transport) {
  debug('might upgrade socket transport from "%s" to "%s"'
    , this.transport.name, transport.name);

  this.upgrading = true;

  var self = this;

  // set transport upgrade timer
  self.upgradeTimeoutTimer = setTimeout(function () {
    debug('client did not complete upgrade - closing transport');
    cleanup();
    if ('open' === transport.readyState) {
      transport.close();
    }
  }, this.server.upgradeTimeout);

  function onPacket (packet) {
    if ('ping' === packet.type && 'probe' === packet.data) {
      transport.send([{ type: 'pong', data: 'probe' }]);
      self.emit('upgrading', transport);
      clearInterval(self.checkIntervalTimer);
      self.checkIntervalTimer = setInterval(check, 100);
    } else if ('upgrade' === packet.type && self.readyState !== 'closed') {
      debug('got upgrade packet - upgrading');
      cleanup();
      self.transport.discard();
      self.upgraded = true;
      self.clearTransport();
      self.setTransport(transport);
      self.emit('upgrade', transport);
      self.setPingTimeout();
      self.flush();
      if (self.readyState === 'closing') {
        transport.close(function () {
          self.onClose('forced close');
        });
      }
    } else {
      cleanup();
      transport.close();
    }
  }

  // we force a polling cycle to ensure a fast upgrade
  function check () {
    if ('polling' === self.transport.name && self.transport.writable) {
      debug('writing a noop packet to polling for fast upgrade');
      self.transport.send([{ type: 'noop' }]);
    }
  }

  function cleanup () {
    self.upgrading = false;

    clearInterval(self.checkIntervalTimer);
    self.checkIntervalTimer = null;

    clearTimeout(self.upgradeTimeoutTimer);
    self.upgradeTimeoutTimer = null;

    transport.removeListener('packet', onPacket);
    transport.removeListener('close', onTransportClose);
    transport.removeListener('error', onError);
    self.removeListener('close', onClose);
  }

  function onError (err) {
    debug('client did not complete upgrade - %s', err);
    cleanup();
    transport.close();
    transport = null;
  }

  function onTransportClose () {
    onError('transport closed');
  }

  function onClose () {
    onError('socket closed');
  }

  transport.on('packet', onPacket);
  transport.once('close', onTransportClose);
  transport.once('error', onError);

  self.once('close', onClose);
};

/**
 * Clears listeners and timers associated with current transport.
 *
 * @api private
 */

Socket.prototype.clearTransport = function () {
  var cleanup;

  var toCleanUp = this.cleanupFn.length;

  for (var i = 0; i < toCleanUp; i++) {
    cleanup = this.cleanupFn.shift();
    cleanup();
  }

  // silence further transport errors and prevent uncaught exceptions
  this.transport.on('error', function () {
    debug('error triggered by discarded transport');
  });

  // ensure transport won't stay open
  this.transport.close();

  clearTimeout(this.pingTimeoutTimer);
};

/**
 * Called upon transport considered closed.
 * Possible reasons: `ping timeout`, `client error`, `parse error`,
 * `transport error`, `server close`, `transport close`
 */

Socket.prototype.onClose = function (reason, description) {
  if ('closed' !== this.readyState) {
    this.readyState = 'closed';
    clearTimeout(this.pingTimeoutTimer);
    clearInterval(this.checkIntervalTimer);
    this.checkIntervalTimer = null;
    clearTimeout(this.upgradeTimeoutTimer);
    var self = this;
    // clean writeBuffer in next tick, so developers can still
    // grab the writeBuffer on 'close' event
    process.nextTick(function () {
      self.writeBuffer = [];
    });
    this.packetsFn = [];
    this.sentCallbackFn = [];
    this.clearTransport();
    this.emit('close', reason, description);
  }
};

/**
 * Setup and manage send callback
 *
 * @api private
 */

Socket.prototype.setupSendCallback = function () {
  var self = this;
  this.transport.on('drain', onDrain);

  this.cleanupFn.push(function () {
    self.transport.removeListener('drain', onDrain);
  });

  // the message was sent successfully, execute the callback
  function onDrain () {
    if (self.sentCallbackFn.length > 0) {
      var seqFn = self.sentCallbackFn.splice(0, 1)[0];
      if ('function' === typeof seqFn) {
        debug('executing send callback');
        seqFn(self.transport);
      } else if (Array.isArray(seqFn)) {
        debug('executing batch send callback');
        for (var l = seqFn.length, i = 0; i < l; i++) {
          if ('function' === typeof seqFn[i]) {
            seqFn[i](self.transport);
          }
        }
      }
    }
  }
};

/**
 * Sends a message packet.
 *
 * @param {String} message
 * @param {Object} options
 * @param {Function} callback
 * @return {Socket} for chaining
 * @api public
 */

Socket.prototype.send =
Socket.prototype.write = function (data, options, callback) {
  this.sendPacket('message', data, options, callback);
  return this;
};

/**
 * Sends a packet.
 *
 * @param {String} packet type
 * @param {String} optional, data
 * @param {Object} options
 * @api private
 */

Socket.prototype.sendPacket = function (type, data, options, callback) {
  if ('function' === typeof options) {
    callback = options;
    options = null;
  }

  options = options || {};
  options.compress = false !== options.compress;

  if ('closing' !== this.readyState && 'closed' !== this.readyState) {
    debug('sending packet "%s" (%s)', type, data);

    var packet = {
      type: type,
      options: options
    };
    if (data) packet.data = data;

    // exports packetCreate event
    this.emit('packetCreate', packet);

    this.writeBuffer.push(packet);

    // add send callback to object, if defined
    if (callback) this.packetsFn.push(callback);

    this.flush();
  }
};

/**
 * Attempts to flush the packets buffer.
 *
 * @api private
 */

Socket.prototype.flush = function () {
  if ('closed' !== this.readyState &&
                this.transport.writable &&
                this.writeBuffer.length) {
    debug('flushing buffer to transport');
    this.emit('flush', this.writeBuffer);
    this.server.emit('flush', this, this.writeBuffer);
    var wbuf = this.writeBuffer;
    this.writeBuffer = [];
    if (!this.transport.supportsFraming) {
      this.sentCallbackFn.push(this.packetsFn);
    } else {
      this.sentCallbackFn.push.apply(this.sentCallbackFn, this.packetsFn);
    }
    this.packetsFn = [];
    this.transport.send(wbuf);
    this.emit('drain');
    this.server.emit('drain', this);
  }
};

/**
 * Get available upgrades for this socket.
 *
 * @api private
 */

Socket.prototype.getAvailableUpgrades = function () {
  var availableUpgrades = [];
  var allUpgrades = this.server.upgrades(this.transport.name);
  for (var i = 0, l = allUpgrades.length; i < l; ++i) {
    var upg = allUpgrades[i];
    if (this.server.transports.indexOf(upg) !== -1) {
      availableUpgrades.push(upg);
    }
  }
  return availableUpgrades;
};

/**
 * Closes the socket and underlying transport.
 *
 * @param {Boolean} optional, discard
 * @return {Socket} for chaining
 * @api public
 */

Socket.prototype.close = function (discard) {
  if ('open' !== this.readyState) return;

  this.readyState = 'closing';

  if (this.writeBuffer.length) {
    this.once('drain', this.closeTransport.bind(this, discard));
    return;
  }

  this.closeTransport(discard);
};

/**
 * Closes the underlying transport.
 *
 * @param {Boolean} discard
 * @api private
 */

Socket.prototype.closeTransport = function (discard) {
  if (discard) this.transport.discard();
  this.transport.close(this.onClose.bind(this, 'forced close'));
};


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * ws: a node.js websocket client
 * Copyright(c) 2011 Einar Otto Stangvik <einaros@gmail.com>
 * MIT Licensed
 */



const WebSocket = __webpack_require__(96);

WebSocket.Server = __webpack_require__(129);
WebSocket.Receiver = __webpack_require__(99);
WebSocket.Sender = __webpack_require__(101);

module.exports = WebSocket;


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * ws: a node.js websocket client
 * Copyright(c) 2011 Einar Otto Stangvik <einaros@gmail.com>
 * MIT Licensed
 */



const EventEmitter = __webpack_require__(16);
const crypto = __webpack_require__(32);
const Ultron = __webpack_require__(97);
const https = __webpack_require__(126);
const http = __webpack_require__(9);
const url = __webpack_require__(20);

const PerMessageDeflate = __webpack_require__(84);
const EventTarget = __webpack_require__(127);
const Extensions = __webpack_require__(98);
const constants = __webpack_require__(88);
const Receiver = __webpack_require__(99);
const Sender = __webpack_require__(101);

const protocolVersions = [8, 13];
const closeTimeout = 30 * 1000; // Allow 30 seconds to terminate the connection cleanly.

/**
 * Class representing a WebSocket.
 *
 * @extends EventEmitter
 */
class WebSocket extends EventEmitter {
  /**
   * Create a new `WebSocket`.
   *
   * @param {String} address The URL to which to connect
   * @param {(String|String[])} protocols The subprotocols
   * @param {Object} options Connection options
   */
  constructor (address, protocols, options) {
    super();

    if (!protocols) {
      protocols = [];
    } else if (typeof protocols === 'string') {
      protocols = [protocols];
    } else if (!Array.isArray(protocols)) {
      options = protocols;
      protocols = [];
    }

    this.readyState = WebSocket.CONNECTING;
    this.bytesReceived = 0;
    this.extensions = {};
    this.protocol = '';

    this._binaryType = constants.BINARY_TYPES[0];
    this._finalize = this.finalize.bind(this);
    this._finalizeCalled = false;
    this._closeMessage = null;
    this._closeTimer = null;
    this._closeCode = null;
    this._receiver = null;
    this._sender = null;
    this._socket = null;
    this._ultron = null;

    if (Array.isArray(address)) {
      initAsServerClient.call(this, address[0], address[1], address[2], options);
    } else {
      initAsClient.call(this, address, protocols, options);
    }
  }

  get CONNECTING () { return WebSocket.CONNECTING; }
  get CLOSING () { return WebSocket.CLOSING; }
  get CLOSED () { return WebSocket.CLOSED; }
  get OPEN () { return WebSocket.OPEN; }

  /**
   * @type {Number}
   */
  get bufferedAmount () {
    var amount = 0;

    if (this._socket) {
      amount = this._socket.bufferSize + this._sender.bufferedBytes;
    }
    return amount;
  }

  /**
   * This deviates from the WHATWG interface since ws doesn't support the required
   * default "blob" type (instead we define a custom "nodebuffer" type).
   *
   * @type {String}
   */
  get binaryType () {
    return this._binaryType;
  }

  set binaryType (type) {
    if (constants.BINARY_TYPES.indexOf(type) < 0) return;

    this._binaryType = type;

    //
    // Allow to change `binaryType` on the fly.
    //
    if (this._receiver) this._receiver.binaryType = type;
  }

  /**
   * Set up the socket and the internal resources.
   *
   * @param {net.Socket} socket The network socket between the server and client
   * @param {Buffer} head The first packet of the upgraded stream
   * @private
   */
  setSocket (socket, head) {
    socket.setTimeout(0);
    socket.setNoDelay();

    this._receiver = new Receiver(this.extensions, this.maxPayload, this.binaryType);
    this._sender = new Sender(socket, this.extensions);
    this._ultron = new Ultron(socket);
    this._socket = socket;

    // socket cleanup handlers
    this._ultron.on('close', this._finalize);
    this._ultron.on('error', this._finalize);
    this._ultron.on('end', this._finalize);

    // ensure that the head is added to the receiver
    if (head && head.length > 0) {
      socket.unshift(head);
      head = null;
    }

    // subsequent packets are pushed to the receiver
    this._ultron.on('data', (data) => {
      this.bytesReceived += data.length;
      this._receiver.add(data);
    });

    // receiver event handlers
    this._receiver.onmessage = (data, flags) => this.emit('message', data, flags);
    this._receiver.onping = (data, flags) => {
      this.pong(data, !this._isServer, true);
      this.emit('ping', data, flags);
    };
    this._receiver.onpong = (data, flags) => this.emit('pong', data, flags);
    this._receiver.onclose = (code, reason) => {
      this._closeMessage = reason;
      this._closeCode = code;
      this.close(code, reason);
    };
    this._receiver.onerror = (error, code) => {
      // close the connection when the receiver reports a HyBi error code
      this.close(code, '');
      this.emit('error', error);
    };

    // sender event handlers
    this._sender.onerror = (error) => {
      this.close(1002, '');
      this.emit('error', error);
    };

    this.readyState = WebSocket.OPEN;
    this.emit('open');
  }

  /**
   * Clean up and release internal resources.
   *
   * @param {(Boolean|Error)} Indicates whether or not an error occurred
   * @private
   */
  finalize (error) {
    if (this._finalizeCalled) return;

    this.readyState = WebSocket.CLOSING;
    this._finalizeCalled = true;

    clearTimeout(this._closeTimer);
    this._closeTimer = null;

    //
    // If the connection was closed abnormally (with an error), or if the close
    // control frame was malformed or not received then the close code must be
    // 1006.
    //
    if (error) this._closeCode = 1006;

    if (this._socket) {
      this._ultron.destroy();
      this._socket.on('error', function onerror () {
        this.destroy();
      });

      if (!error) this._socket.end();
      else this._socket.destroy();

      this._socket = null;
      this._ultron = null;
    }

    if (this._sender) {
      this._sender = this._sender.onerror = null;
    }

    if (this._receiver) {
      this._receiver.cleanup(() => this.emitClose());
      this._receiver = null;
    } else {
      this.emitClose();
    }
  }

  /**
   * Emit the `close` event.
   *
   * @private
   */
  emitClose () {
    this.readyState = WebSocket.CLOSED;
    this.emit('close', this._closeCode || 1006, this._closeMessage || '');

    if (this.extensions[PerMessageDeflate.extensionName]) {
      this.extensions[PerMessageDeflate.extensionName].cleanup();
    }

    this.extensions = null;

    this.removeAllListeners();
    this.on('error', constants.NOOP); // Catch all errors after this.
  }

  /**
   * Pause the socket stream.
   *
   * @public
   */
  pause () {
    if (this.readyState !== WebSocket.OPEN) throw new Error('not opened');

    this._socket.pause();
  }

  /**
   * Resume the socket stream
   *
   * @public
   */
  resume () {
    if (this.readyState !== WebSocket.OPEN) throw new Error('not opened');

    this._socket.resume();
  }

  /**
   * Start a closing handshake.
   *
   * @param {Number} code Status code explaining why the connection is closing
   * @param {String} data A string explaining why the connection is closing
   * @public
   */
  close (code, data) {
    if (this.readyState === WebSocket.CLOSED) return;
    if (this.readyState === WebSocket.CONNECTING) {
      if (this._req && !this._req.aborted) {
        this._req.abort();
        this.emit('error', new Error('closed before the connection is established'));
        this.finalize(true);
      }
      return;
    }

    if (this.readyState === WebSocket.CLOSING) {
      if (this._closeCode && this._socket) this._socket.end();
      return;
    }

    this.readyState = WebSocket.CLOSING;
    this._sender.close(code, data, !this._isServer, (err) => {
      if (err) this.emit('error', err);

      if (this._socket) {
        if (this._closeCode) this._socket.end();
        //
        // Ensure that the connection is cleaned up even when the closing
        // handshake fails.
        //
        clearTimeout(this._closeTimer);
        this._closeTimer = setTimeout(this._finalize, closeTimeout, true);
      }
    });
  }

  /**
   * Send a ping message.
   *
   * @param {*} data The message to send
   * @param {Boolean} mask Indicates whether or not to mask `data`
   * @param {Boolean} failSilently Indicates whether or not to throw if `readyState` isn't `OPEN`
   * @public
   */
  ping (data, mask, failSilently) {
    if (this.readyState !== WebSocket.OPEN) {
      if (failSilently) return;
      throw new Error('not opened');
    }

    if (typeof data === 'number') data = data.toString();
    if (mask === undefined) mask = !this._isServer;
    this._sender.ping(data || constants.EMPTY_BUFFER, mask);
  }

  /**
   * Send a pong message.
   *
   * @param {*} data The message to send
   * @param {Boolean} mask Indicates whether or not to mask `data`
   * @param {Boolean} failSilently Indicates whether or not to throw if `readyState` isn't `OPEN`
   * @public
   */
  pong (data, mask, failSilently) {
    if (this.readyState !== WebSocket.OPEN) {
      if (failSilently) return;
      throw new Error('not opened');
    }

    if (typeof data === 'number') data = data.toString();
    if (mask === undefined) mask = !this._isServer;
    this._sender.pong(data || constants.EMPTY_BUFFER, mask);
  }

  /**
   * Send a data message.
   *
   * @param {*} data The message to send
   * @param {Object} options Options object
   * @param {Boolean} options.compress Specifies whether or not to compress `data`
   * @param {Boolean} options.binary Specifies whether `data` is binary or text
   * @param {Boolean} options.fin Specifies whether the fragment is the last one
   * @param {Boolean} options.mask Specifies whether or not to mask `data`
   * @param {Function} cb Callback which is executed when data is written out
   * @public
   */
  send (data, options, cb) {
    if (typeof options === 'function') {
      cb = options;
      options = {};
    }

    if (this.readyState !== WebSocket.OPEN) {
      if (cb) cb(new Error('not opened'));
      else throw new Error('not opened');
      return;
    }

    if (typeof data === 'number') data = data.toString();

    const opts = Object.assign({
      binary: typeof data !== 'string',
      mask: !this._isServer,
      compress: true,
      fin: true
    }, options);

    if (!this.extensions[PerMessageDeflate.extensionName]) {
      opts.compress = false;
    }

    this._sender.send(data || constants.EMPTY_BUFFER, opts, cb);
  }

  /**
   * Forcibly close the connection.
   *
   * @public
   */
  terminate () {
    if (this.readyState === WebSocket.CLOSED) return;
    if (this.readyState === WebSocket.CONNECTING) {
      if (this._req && !this._req.aborted) {
        this._req.abort();
        this.emit('error', new Error('closed before the connection is established'));
        this.finalize(true);
      }
      return;
    }

    this.finalize(true);
  }
}

WebSocket.CONNECTING = 0;
WebSocket.OPEN = 1;
WebSocket.CLOSING = 2;
WebSocket.CLOSED = 3;

//
// Add the `onopen`, `onerror`, `onclose`, and `onmessage` attributes.
// See https://html.spec.whatwg.org/multipage/comms.html#the-websocket-interface
//
['open', 'error', 'close', 'message'].forEach((method) => {
  Object.defineProperty(WebSocket.prototype, `on${method}`, {
    /**
     * Return the listener of the event.
     *
     * @return {(Function|undefined)} The event listener or `undefined`
     * @public
     */
    get () {
      const listeners = this.listeners(method);
      for (var i = 0; i < listeners.length; i++) {
        if (listeners[i]._listener) return listeners[i]._listener;
      }
    },
    /**
     * Add a listener for the event.
     *
     * @param {Function} listener The listener to add
     * @public
     */
    set (listener) {
      const listeners = this.listeners(method);
      for (var i = 0; i < listeners.length; i++) {
        //
        // Remove only the listeners added via `addEventListener`.
        //
        if (listeners[i]._listener) this.removeListener(method, listeners[i]);
      }
      this.addEventListener(method, listener);
    }
  });
});

WebSocket.prototype.addEventListener = EventTarget.addEventListener;
WebSocket.prototype.removeEventListener = EventTarget.removeEventListener;

module.exports = WebSocket;

/**
 * Initialize a WebSocket server client.
 *
 * @param {http.IncomingMessage} req The request object
 * @param {net.Socket} socket The network socket between the server and client
 * @param {Buffer} head The first packet of the upgraded stream
 * @param {Object} options WebSocket attributes
 * @param {Number} options.protocolVersion The WebSocket protocol version
 * @param {Object} options.extensions The negotiated extensions
 * @param {Number} options.maxPayload The maximum allowed message size
 * @param {String} options.protocol The chosen subprotocol
 * @private
 */
function initAsServerClient (req, socket, head, options) {
  this.protocolVersion = options.protocolVersion;
  this.extensions = options.extensions;
  this.maxPayload = options.maxPayload;
  this.protocol = options.protocol;

  this.upgradeReq = req;
  this._isServer = true;

  this.setSocket(socket, head);
}

/**
 * Initialize a WebSocket client.
 *
 * @param {String} address The URL to which to connect
 * @param {String[]} protocols The list of subprotocols
 * @param {Object} options Connection options
 * @param {String} options.protocol Value of the `Sec-WebSocket-Protocol` header
 * @param {(Boolean|Object)} options.perMessageDeflate Enable/disable permessage-deflate
 * @param {String} options.localAddress Local interface to bind for network connections
 * @param {Number} options.protocolVersion Value of the `Sec-WebSocket-Version` header
 * @param {Object} options.headers An object containing request headers
 * @param {String} options.origin Value of the `Origin` or `Sec-WebSocket-Origin` header
 * @param {http.Agent} options.agent Use the specified Agent
 * @param {String} options.host Value of the `Host` header
 * @param {Number} options.family IP address family to use during hostname lookup (4 or 6).
 * @param {Function} options.checkServerIdentity A function to validate the server hostname
 * @param {Boolean} options.rejectUnauthorized Verify or not the server certificate
 * @param {String} options.passphrase The passphrase for the private key or pfx
 * @param {String} options.ciphers The ciphers to use or exclude
 * @param {(String|String[]|Buffer|Buffer[])} options.cert The certificate key
 * @param {(String|String[]|Buffer|Buffer[])} options.key The private key
 * @param {(String|Buffer)} options.pfx The private key, certificate, and CA certs
 * @param {(String|String[]|Buffer|Buffer[])} options.ca Trusted certificates
 * @private
 */
function initAsClient (address, protocols, options) {
  options = Object.assign({
    protocolVersion: protocolVersions[1],
    protocol: protocols.join(','),
    perMessageDeflate: true,
    localAddress: null,
    headers: null,
    family: null,
    origin: null,
    agent: null,
    host: null,

    //
    // SSL options.
    //
    checkServerIdentity: null,
    rejectUnauthorized: null,
    passphrase: null,
    ciphers: null,
    cert: null,
    key: null,
    pfx: null,
    ca: null
  }, options);

  if (protocolVersions.indexOf(options.protocolVersion) === -1) {
    throw new Error(
      `unsupported protocol version: ${options.protocolVersion} ` +
      `(supported versions: ${protocolVersions.join(', ')})`
    );
  }

  this.protocolVersion = options.protocolVersion;
  this._isServer = false;
  this.url = address;

  const serverUrl = url.parse(address);
  const isUnixSocket = serverUrl.protocol === 'ws+unix:';

  if (!serverUrl.host && (!isUnixSocket || !serverUrl.path)) {
    throw new Error('invalid url');
  }

  const isSecure = serverUrl.protocol === 'wss:' || serverUrl.protocol === 'https:';
  const key = crypto.randomBytes(16).toString('base64');
  const httpObj = isSecure ? https : http;

  //
  // Prepare extensions.
  //
  const extensionsOffer = {};
  var perMessageDeflate;

  if (options.perMessageDeflate) {
    perMessageDeflate = new PerMessageDeflate(
      options.perMessageDeflate !== true ? options.perMessageDeflate : {},
      false
    );
    extensionsOffer[PerMessageDeflate.extensionName] = perMessageDeflate.offer();
  }

  const requestOptions = {
    port: serverUrl.port || (isSecure ? 443 : 80),
    host: serverUrl.hostname,
    path: '/',
    headers: {
      'Sec-WebSocket-Version': options.protocolVersion,
      'Sec-WebSocket-Key': key,
      'Connection': 'Upgrade',
      'Upgrade': 'websocket'
    }
  };

  if (options.headers) Object.assign(requestOptions.headers, options.headers);
  if (Object.keys(extensionsOffer).length) {
    requestOptions.headers['Sec-WebSocket-Extensions'] = Extensions.format(extensionsOffer);
  }
  if (options.protocol) {
    requestOptions.headers['Sec-WebSocket-Protocol'] = options.protocol;
  }
  if (options.origin) {
    if (options.protocolVersion < 13) {
      requestOptions.headers['Sec-WebSocket-Origin'] = options.origin;
    } else {
      requestOptions.headers.Origin = options.origin;
    }
  }
  if (options.host) requestOptions.headers.Host = options.host;
  if (serverUrl.auth) requestOptions.auth = serverUrl.auth;

  if (options.localAddress) requestOptions.localAddress = options.localAddress;
  if (options.family) requestOptions.family = options.family;

  if (isUnixSocket) {
    const parts = serverUrl.path.split(':');

    requestOptions.socketPath = parts[0];
    requestOptions.path = parts[1];
  } else if (serverUrl.path) {
    //
    // Make sure that path starts with `/`.
    //
    if (serverUrl.path.charAt(0) !== '/') {
      requestOptions.path = `/${serverUrl.path}`;
    } else {
      requestOptions.path = serverUrl.path;
    }
  }

  var agent = options.agent;

  //
  // A custom agent is required for these options.
  //
  if (
    options.rejectUnauthorized != null ||
    options.checkServerIdentity ||
    options.passphrase ||
    options.ciphers ||
    options.cert ||
    options.key ||
    options.pfx ||
    options.ca
  ) {
    if (options.passphrase) requestOptions.passphrase = options.passphrase;
    if (options.ciphers) requestOptions.ciphers = options.ciphers;
    if (options.cert) requestOptions.cert = options.cert;
    if (options.key) requestOptions.key = options.key;
    if (options.pfx) requestOptions.pfx = options.pfx;
    if (options.ca) requestOptions.ca = options.ca;
    if (options.checkServerIdentity) {
      requestOptions.checkServerIdentity = options.checkServerIdentity;
    }
    if (options.rejectUnauthorized != null) {
      requestOptions.rejectUnauthorized = options.rejectUnauthorized;
    }

    if (!agent) agent = new httpObj.Agent(requestOptions);
  }

  if (agent) requestOptions.agent = agent;

  this._req = httpObj.get(requestOptions);

  this._req.on('error', (error) => {
    if (this._req.aborted) return;

    this._req = null;
    this.emit('error', error);
    this.finalize(true);
  });

  this._req.on('response', (res) => {
    if (!this.emit('unexpected-response', this._req, res)) {
      this._req.abort();
      this.emit('error', new Error(`unexpected server response (${res.statusCode})`));
      this.finalize(true);
    }
  });

  this._req.on('upgrade', (res, socket, head) => {
    this.emit('headers', res.headers, res);

    //
    // The user may have closed the connection from a listener of the `headers`
    // event.
    //
    if (this.readyState !== WebSocket.CONNECTING) return;

    this._req = null;

    const digest = crypto.createHash('sha1')
      .update(key + constants.GUID, 'binary')
      .digest('base64');

    if (res.headers['sec-websocket-accept'] !== digest) {
      socket.destroy();
      this.emit('error', new Error('invalid server key'));
      return this.finalize(true);
    }

    const serverProt = res.headers['sec-websocket-protocol'];
    const protList = (options.protocol || '').split(/, */);
    var protError;

    if (!options.protocol && serverProt) {
      protError = 'server sent a subprotocol even though none requested';
    } else if (options.protocol && !serverProt) {
      protError = 'server sent no subprotocol even though requested';
    } else if (serverProt && protList.indexOf(serverProt) === -1) {
      protError = 'server responded with an invalid protocol';
    }

    if (protError) {
      socket.destroy();
      this.emit('error', new Error(protError));
      return this.finalize(true);
    }

    if (serverProt) this.protocol = serverProt;

    const serverExtensions = Extensions.parse(res.headers['sec-websocket-extensions']);

    if (perMessageDeflate && serverExtensions[PerMessageDeflate.extensionName]) {
      try {
        perMessageDeflate.accept(serverExtensions[PerMessageDeflate.extensionName]);
      } catch (err) {
        socket.destroy();
        this.emit('error', new Error('invalid extension parameter'));
        return this.finalize(true);
      }

      this.extensions[PerMessageDeflate.extensionName] = perMessageDeflate;
    }

    this.setSocket(socket, head);
  });
}


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var has = Object.prototype.hasOwnProperty;

/**
 * An auto incrementing id which we can use to create "unique" Ultron instances
 * so we can track the event emitters that are added through the Ultron
 * interface.
 *
 * @type {Number}
 * @private
 */
var id = 0;

/**
 * Ultron is high-intelligence robot. It gathers intelligence so it can start improving
 * upon his rudimentary design. It will learn from your EventEmitting patterns
 * and exterminate them.
 *
 * @constructor
 * @param {EventEmitter} ee EventEmitter instance we need to wrap.
 * @api public
 */
function Ultron(ee) {
  if (!(this instanceof Ultron)) return new Ultron(ee);

  this.id = id++;
  this.ee = ee;
}

/**
 * Register a new EventListener for the given event.
 *
 * @param {String} event Name of the event.
 * @param {Functon} fn Callback function.
 * @param {Mixed} context The context of the function.
 * @returns {Ultron}
 * @api public
 */
Ultron.prototype.on = function on(event, fn, context) {
  fn.__ultron = this.id;
  this.ee.on(event, fn, context);

  return this;
};
/**
 * Add an EventListener that's only called once.
 *
 * @param {String} event Name of the event.
 * @param {Function} fn Callback function.
 * @param {Mixed} context The context of the function.
 * @returns {Ultron}
 * @api public
 */
Ultron.prototype.once = function once(event, fn, context) {
  fn.__ultron = this.id;
  this.ee.once(event, fn, context);

  return this;
};

/**
 * Remove the listeners we assigned for the given event.
 *
 * @returns {Ultron}
 * @api public
 */
Ultron.prototype.remove = function remove() {
  var args = arguments
    , ee = this.ee
    , event;

  //
  // When no event names are provided we assume that we need to clear all the
  // events that were assigned through us.
  //
  if (args.length === 1 && 'string' === typeof args[0]) {
    args = args[0].split(/[, ]+/);
  } else if (!args.length) {
    if (ee.eventNames) {
      args = ee.eventNames();
    } else if (ee._events) {
      args = [];

      for (event in ee._events) {
        if (has.call(ee._events, event)) args.push(event);
      }

      if (Object.getOwnPropertySymbols) {
        args = args.concat(Object.getOwnPropertySymbols(ee._events));
      }
    }
  }

  for (var i = 0; i < args.length; i++) {
    var listeners = ee.listeners(args[i]);

    for (var j = 0; j < listeners.length; j++) {
      event = listeners[j];

      //
      // Once listeners have a `listener` property that stores the real listener
      // in the EventEmitter that ships with Node.js.
      //
      if (event.listener) {
        if (event.listener.__ultron !== this.id) continue;
        delete event.listener.__ultron;
      } else {
        if (event.__ultron !== this.id) continue;
        delete event.__ultron;
      }

      ee.removeListener(args[i], event);
    }
  }

  return this;
};

/**
 * Destroy the Ultron instance, remove all listeners and release all references.
 *
 * @returns {Boolean}
 * @api public
 */
Ultron.prototype.destroy = function destroy() {
  if (!this.ee) return false;

  this.remove();
  this.ee = null;

  return true;
};

//
// Expose the module.
//
module.exports = Ultron;


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Parse the `Sec-WebSocket-Extensions` header into an object.
 *
 * @param {String} value field value of the header
 * @return {Object} The parsed object
 * @public
 */
const parse = (value) => {
  value = value || '';

  const extensions = {};

  value.split(',').forEach((v) => {
    const params = v.split(';');
    const token = params.shift().trim();
    const paramsList = extensions[token] = extensions[token] || [];
    const parsedParams = {};

    params.forEach((param) => {
      const parts = param.trim().split('=');
      const key = parts[0];
      var value = parts[1];

      if (value === undefined) {
        value = true;
      } else {
        // unquote value
        if (value[0] === '"') {
          value = value.slice(1);
        }
        if (value[value.length - 1] === '"') {
          value = value.slice(0, value.length - 1);
        }
      }
      (parsedParams[key] = parsedParams[key] || []).push(value);
    });

    paramsList.push(parsedParams);
  });

  return extensions;
};

/**
 * Serialize a parsed `Sec-WebSocket-Extensions` header to a string.
 *
 * @param {Object} value The object to format
 * @return {String} A string representing the given value
 * @public
 */
const format = (value) => {
  return Object.keys(value).map((token) => {
    var paramsList = value[token];
    if (!Array.isArray(paramsList)) paramsList = [paramsList];
    return paramsList.map((params) => {
      return [token].concat(Object.keys(params).map((k) => {
        var p = params[k];
        if (!Array.isArray(p)) p = [p];
        return p.map((v) => v === true ? k : `${k}=${v}`).join('; ');
      })).join('; ');
    }).join(', ');
  }).join(', ');
};

module.exports = { format, parse };


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * ws: a node.js websocket client
 * Copyright(c) 2011 Einar Otto Stangvik <einaros@gmail.com>
 * MIT Licensed
 */



const safeBuffer = __webpack_require__(82);

const PerMessageDeflate = __webpack_require__(84);
const isValidUTF8 = __webpack_require__(128);
const bufferUtil = __webpack_require__(87);
const ErrorCodes = __webpack_require__(100);
const constants = __webpack_require__(88);

const Buffer = safeBuffer.Buffer;

const GET_INFO = 0;
const GET_PAYLOAD_LENGTH_16 = 1;
const GET_PAYLOAD_LENGTH_64 = 2;
const GET_MASK = 3;
const GET_DATA = 4;
const INFLATING = 5;

/**
 * HyBi Receiver implementation.
 */
class Receiver {
  /**
   * Creates a Receiver instance.
   *
   * @param {Object} extensions An object containing the negotiated extensions
   * @param {Number} maxPayload The maximum allowed message length
   * @param {String} binaryType The type for binary data
   */
  constructor (extensions, maxPayload, binaryType) {
    this.binaryType = binaryType || constants.BINARY_TYPES[0];
    this.extensions = extensions || {};
    this.maxPayload = maxPayload | 0;

    this.bufferedBytes = 0;
    this.buffers = [];

    this.compressed = false;
    this.payloadLength = 0;
    this.fragmented = 0;
    this.masked = false;
    this.fin = false;
    this.mask = null;
    this.opcode = 0;

    this.totalPayloadLength = 0;
    this.messageLength = 0;
    this.fragments = [];

    this.cleanupCallback = null;
    this.hadError = false;
    this.dead = false;
    this.loop = false;

    this.onmessage = null;
    this.onclose = null;
    this.onerror = null;
    this.onping = null;
    this.onpong = null;

    this.state = GET_INFO;
  }

  /**
   * Consumes bytes from the available buffered data.
   *
   * @param {Number} bytes The number of bytes to consume
   * @return {Buffer} Consumed bytes
   * @private
   */
  readBuffer (bytes) {
    var offset = 0;
    var dst;
    var l;

    this.bufferedBytes -= bytes;

    if (bytes === this.buffers[0].length) return this.buffers.shift();

    if (bytes < this.buffers[0].length) {
      dst = this.buffers[0].slice(0, bytes);
      this.buffers[0] = this.buffers[0].slice(bytes);
      return dst;
    }

    dst = Buffer.allocUnsafe(bytes);

    while (bytes > 0) {
      l = this.buffers[0].length;

      if (bytes >= l) {
        this.buffers[0].copy(dst, offset);
        offset += l;
        this.buffers.shift();
      } else {
        this.buffers[0].copy(dst, offset, 0, bytes);
        this.buffers[0] = this.buffers[0].slice(bytes);
      }

      bytes -= l;
    }

    return dst;
  }

  /**
   * Checks if the number of buffered bytes is bigger or equal than `n` and
   * calls `cleanup` if necessary.
   *
   * @param {Number} n The number of bytes to check against
   * @return {Boolean} `true` if `bufferedBytes >= n`, else `false`
   * @private
   */
  hasBufferedBytes (n) {
    if (this.bufferedBytes >= n) return true;

    this.loop = false;
    if (this.dead) this.cleanup(this.cleanupCallback);
    return false;
  }

  /**
   * Adds new data to the parser.
   *
   * @public
   */
  add (data) {
    if (this.dead) return;

    this.bufferedBytes += data.length;
    this.buffers.push(data);
    this.startLoop();
  }

  /**
   * Starts the parsing loop.
   *
   * @private
   */
  startLoop () {
    this.loop = true;

    while (this.loop) {
      switch (this.state) {
        case GET_INFO:
          this.getInfo();
          break;
        case GET_PAYLOAD_LENGTH_16:
          this.getPayloadLength16();
          break;
        case GET_PAYLOAD_LENGTH_64:
          this.getPayloadLength64();
          break;
        case GET_MASK:
          this.getMask();
          break;
        case GET_DATA:
          this.getData();
          break;
        default: // `INFLATING`
          this.loop = false;
      }
    }
  }

  /**
   * Reads the first two bytes of a frame.
   *
   * @private
   */
  getInfo () {
    if (!this.hasBufferedBytes(2)) return;

    const buf = this.readBuffer(2);

    if ((buf[0] & 0x30) !== 0x00) {
      this.error(new Error('RSV2 and RSV3 must be clear'), 1002);
      return;
    }

    const compressed = (buf[0] & 0x40) === 0x40;

    if (compressed && !this.extensions[PerMessageDeflate.extensionName]) {
      this.error(new Error('RSV1 must be clear'), 1002);
      return;
    }

    this.fin = (buf[0] & 0x80) === 0x80;
    this.opcode = buf[0] & 0x0f;
    this.payloadLength = buf[1] & 0x7f;

    if (this.opcode === 0x00) {
      if (compressed) {
        this.error(new Error('RSV1 must be clear'), 1002);
        return;
      }

      if (!this.fragmented) {
        this.error(new Error(`invalid opcode: ${this.opcode}`), 1002);
        return;
      } else {
        this.opcode = this.fragmented;
      }
    } else if (this.opcode === 0x01 || this.opcode === 0x02) {
      if (this.fragmented) {
        this.error(new Error(`invalid opcode: ${this.opcode}`), 1002);
        return;
      }

      this.compressed = compressed;
    } else if (this.opcode > 0x07 && this.opcode < 0x0b) {
      if (!this.fin) {
        this.error(new Error('FIN must be set'), 1002);
        return;
      }

      if (compressed) {
        this.error(new Error('RSV1 must be clear'), 1002);
        return;
      }

      if (this.payloadLength > 0x7d) {
        this.error(new Error('invalid payload length'), 1002);
        return;
      }
    } else {
      this.error(new Error(`invalid opcode: ${this.opcode}`), 1002);
      return;
    }

    if (!this.fin && !this.fragmented) this.fragmented = this.opcode;

    this.masked = (buf[1] & 0x80) === 0x80;

    if (this.payloadLength === 126) this.state = GET_PAYLOAD_LENGTH_16;
    else if (this.payloadLength === 127) this.state = GET_PAYLOAD_LENGTH_64;
    else this.haveLength();
  }

  /**
   * Gets extended payload length (7+16).
   *
   * @private
   */
  getPayloadLength16 () {
    if (!this.hasBufferedBytes(2)) return;

    this.payloadLength = this.readBuffer(2).readUInt16BE(0, true);
    this.haveLength();
  }

  /**
   * Gets extended payload length (7+64).
   *
   * @private
   */
  getPayloadLength64 () {
    if (!this.hasBufferedBytes(8)) return;

    const buf = this.readBuffer(8);
    const num = buf.readUInt32BE(0, true);

    //
    // The maximum safe integer in JavaScript is 2^53 - 1. An error is returned
    // if payload length is greater than this number.
    //
    if (num > Math.pow(2, 53 - 32) - 1) {
      this.error(new Error('max payload size exceeded'), 1009);
      return;
    }

    this.payloadLength = (num * Math.pow(2, 32)) + buf.readUInt32BE(4, true);
    this.haveLength();
  }

  /**
   * Payload length has been read.
   *
   * @private
   */
  haveLength () {
    if (this.opcode < 0x08 && this.maxPayloadExceeded(this.payloadLength)) {
      return;
    }

    if (this.masked) this.state = GET_MASK;
    else this.state = GET_DATA;
  }

  /**
   * Reads mask bytes.
   *
   * @private
   */
  getMask () {
    if (!this.hasBufferedBytes(4)) return;

    this.mask = this.readBuffer(4);
    this.state = GET_DATA;
  }

  /**
   * Reads data bytes.
   *
   * @private
   */
  getData () {
    var data = constants.EMPTY_BUFFER;

    if (this.payloadLength) {
      if (!this.hasBufferedBytes(this.payloadLength)) return;

      data = this.readBuffer(this.payloadLength);
      if (this.masked) bufferUtil.unmask(data, this.mask);
    }

    if (this.opcode > 0x07) {
      this.controlMessage(data);
    } else if (this.compressed) {
      this.state = INFLATING;
      this.decompress(data);
    } else if (this.pushFragment(data)) {
      this.dataMessage();
    }
  }

  /**
   * Decompresses data.
   *
   * @param {Buffer} data Compressed data
   * @private
   */
  decompress (data) {
    const extension = this.extensions[PerMessageDeflate.extensionName];

    extension.decompress(data, this.fin, (err, buf) => {
      if (err) {
        this.error(err, err.closeCode === 1009 ? 1009 : 1007);
        return;
      }

      if (this.pushFragment(buf)) this.dataMessage();
      this.startLoop();
    });
  }

  /**
   * Handles a data message.
   *
   * @private
   */
  dataMessage () {
    if (this.fin) {
      const messageLength = this.messageLength;
      const fragments = this.fragments;

      this.totalPayloadLength = 0;
      this.messageLength = 0;
      this.fragmented = 0;
      this.fragments = [];

      if (this.opcode === 2) {
        var data;

        if (this.binaryType === 'nodebuffer') {
          data = toBuffer(fragments, messageLength);
        } else if (this.binaryType === 'arraybuffer') {
          data = toArrayBuffer(toBuffer(fragments, messageLength));
        } else {
          data = fragments;
        }

        this.onmessage(data, { masked: this.masked, binary: true });
      } else {
        const buf = toBuffer(fragments, messageLength);

        if (!isValidUTF8(buf)) {
          this.error(new Error('invalid utf8 sequence'), 1007);
          return;
        }

        this.onmessage(buf.toString(), { masked: this.masked });
      }
    }

    this.state = GET_INFO;
  }

  /**
   * Handles a control message.
   *
   * @param {Buffer} data Data to handle
   * @private
   */
  controlMessage (data) {
    if (this.opcode === 0x08) {
      if (data.length === 0) {
        this.onclose(1000, '', { masked: this.masked });
        this.loop = false;
        this.cleanup(this.cleanupCallback);
      } else if (data.length === 1) {
        this.error(new Error('invalid payload length'), 1002);
      } else {
        const code = data.readUInt16BE(0, true);

        if (!ErrorCodes.isValidErrorCode(code)) {
          this.error(new Error(`invalid status code: ${code}`), 1002);
          return;
        }

        const buf = data.slice(2);

        if (!isValidUTF8(buf)) {
          this.error(new Error('invalid utf8 sequence'), 1007);
          return;
        }

        this.onclose(code, buf.toString(), { masked: this.masked });
        this.loop = false;
        this.cleanup(this.cleanupCallback);
      }

      return;
    }

    const flags = { masked: this.masked, binary: true };

    if (this.opcode === 0x09) this.onping(data, flags);
    else this.onpong(data, flags);

    this.state = GET_INFO;
  }

  /**
   * Handles an error.
   *
   * @param {Error} err The error
   * @param {Number} code Close code
   * @private
   */
  error (err, code) {
    this.onerror(err, code);
    this.hadError = true;
    this.loop = false;
    this.cleanup(this.cleanupCallback);
  }

  /**
   * Checks payload size, disconnects socket when it exceeds `maxPayload`.
   *
   * @param {Number} length Payload length
   * @private
   */
  maxPayloadExceeded (length) {
    if (length === 0 || this.maxPayload < 1) return false;

    const fullLength = this.totalPayloadLength + length;

    if (fullLength <= this.maxPayload) {
      this.totalPayloadLength = fullLength;
      return false;
    }

    this.error(new Error('max payload size exceeded'), 1009);
    return true;
  }

  /**
   * Appends a fragment in the fragments array after checking that the sum of
   * fragment lengths does not exceed `maxPayload`.
   *
   * @param {Buffer} fragment The fragment to add
   * @return {Boolean} `true` if `maxPayload` is not exceeded, else `false`
   * @private
   */
  pushFragment (fragment) {
    if (fragment.length === 0) return true;

    const totalLength = this.messageLength + fragment.length;

    if (this.maxPayload < 1 || totalLength <= this.maxPayload) {
      this.messageLength = totalLength;
      this.fragments.push(fragment);
      return true;
    }

    this.error(new Error('max payload size exceeded'), 1009);
    return false;
  }

  /**
   * Releases resources used by the receiver.
   *
   * @param {Function} cb Callback
   * @public
   */
  cleanup (cb) {
    this.dead = true;

    if (!this.hadError && (this.loop || this.state === INFLATING)) {
      this.cleanupCallback = cb;
    } else {
      this.extensions = null;
      this.fragments = null;
      this.buffers = null;
      this.mask = null;

      this.cleanupCallback = null;
      this.onmessage = null;
      this.onclose = null;
      this.onerror = null;
      this.onping = null;
      this.onpong = null;

      if (cb) cb();
    }
  }
}

module.exports = Receiver;

/**
 * Makes a buffer from a list of fragments.
 *
 * @param {Buffer[]} fragments The list of fragments composing the message
 * @param {Number} messageLength The length of the message
 * @return {Buffer}
 * @private
 */
function toBuffer (fragments, messageLength) {
  if (fragments.length === 1) return fragments[0];
  if (fragments.length > 1) return bufferUtil.concat(fragments, messageLength);
  return constants.EMPTY_BUFFER;
}

/**
 * Converts a buffer to an `ArrayBuffer`.
 *
 * @param {Buffer} The buffer to convert
 * @return {ArrayBuffer} Converted buffer
 */
function toArrayBuffer (buf) {
  if (buf.byteOffset === 0 && buf.byteLength === buf.buffer.byteLength) {
    return buf.buffer;
  }

  return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
}


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * ws: a node.js websocket client
 * Copyright(c) 2011 Einar Otto Stangvik <einaros@gmail.com>
 * MIT Licensed
 */



module.exports = {
  isValidErrorCode: function (code) {
    return (code >= 1000 && code <= 1013 && code !== 1004 && code !== 1005 && code !== 1006) ||
      (code >= 3000 && code <= 4999);
  },
  1000: 'normal',
  1001: 'going away',
  1002: 'protocol error',
  1003: 'unsupported data',
  1004: 'reserved',
  1005: 'reserved for extensions',
  1006: 'reserved for extensions',
  1007: 'inconsistent or invalid data',
  1008: 'policy violation',
  1009: 'message too big',
  1010: 'extension handshake missing',
  1011: 'an unexpected condition prevented the request from being fulfilled',
  1012: 'service restart',
  1013: 'try again later'
};


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * ws: a node.js websocket client
 * Copyright(c) 2011 Einar Otto Stangvik <einaros@gmail.com>
 * MIT Licensed
 */



const safeBuffer = __webpack_require__(82);
const crypto = __webpack_require__(32);

const PerMessageDeflate = __webpack_require__(84);
const bufferUtil = __webpack_require__(87);
const ErrorCodes = __webpack_require__(100);

const Buffer = safeBuffer.Buffer;

/**
 * HyBi Sender implementation.
 */
class Sender {
  /**
   * Creates a Sender instance.
   *
   * @param {net.Socket} socket The connection socket
   * @param {Object} extensions An object containing the negotiated extensions
   */
  constructor (socket, extensions) {
    this.perMessageDeflate = (extensions || {})[PerMessageDeflate.extensionName];
    this._socket = socket;

    this.firstFragment = true;
    this.compress = false;

    this.bufferedBytes = 0;
    this.deflating = false;
    this.queue = [];

    this.onerror = null;
  }

  /**
   * Frames a piece of data according to the HyBi WebSocket protocol.
   *
   * @param {Buffer} data The data to frame
   * @param {Object} options Options object
   * @param {Number} options.opcode The opcode
   * @param {Boolean} options.readOnly Specifies whether `data` can be modified
   * @param {Boolean} options.fin Specifies whether or not to set the FIN bit
   * @param {Boolean} options.mask Specifies whether or not to mask `data`
   * @param {Boolean} options.rsv1 Specifies whether or not to set the RSV1 bit
   * @return {Buffer[]} The framed data as a list of `Buffer` instances
   * @public
   */
  static frame (data, options) {
    const merge = data.length < 1024 || (options.mask && options.readOnly);
    var offset = options.mask ? 6 : 2;
    var payloadLength = data.length;

    if (data.length >= 65536) {
      offset += 8;
      payloadLength = 127;
    } else if (data.length > 125) {
      offset += 2;
      payloadLength = 126;
    }

    const target = Buffer.allocUnsafe(merge ? data.length + offset : offset);

    target[0] = options.fin ? options.opcode | 0x80 : options.opcode;
    if (options.rsv1) target[0] |= 0x40;

    if (payloadLength === 126) {
      target.writeUInt16BE(data.length, 2, true);
    } else if (payloadLength === 127) {
      target.writeUInt32BE(0, 2, true);
      target.writeUInt32BE(data.length, 6, true);
    }

    if (!options.mask) {
      target[1] = payloadLength;
      if (merge) {
        data.copy(target, offset);
        return [target];
      }

      return [target, data];
    }

    const mask = crypto.randomBytes(4);

    target[1] = payloadLength | 0x80;
    target[offset - 4] = mask[0];
    target[offset - 3] = mask[1];
    target[offset - 2] = mask[2];
    target[offset - 1] = mask[3];

    if (merge) {
      bufferUtil.mask(data, mask, target, offset, data.length);
      return [target];
    }

    bufferUtil.mask(data, mask, data, 0, data.length);
    return [target, data];
  }

  /**
   * Sends a close message to the other peer.
   *
   * @param {(Number|undefined)} code The status code component of the body
   * @param {String} data The message component of the body
   * @param {Boolean} mask Specifies whether or not to mask the message
   * @param {Function} cb Callback
   * @public
   */
  close (code, data, mask, cb) {
    if (code !== undefined && (typeof code !== 'number' || !ErrorCodes.isValidErrorCode(code))) {
      throw new Error('first argument must be a valid error code number');
    }

    const buf = Buffer.allocUnsafe(2 + (data ? Buffer.byteLength(data) : 0));

    buf.writeUInt16BE(code || 1000, 0, true);
    if (buf.length > 2) buf.write(data, 2);

    if (this.deflating) {
      this.enqueue([this.doClose, buf, mask, cb]);
    } else {
      this.doClose(buf, mask, cb);
    }
  }

  /**
   * Frames and sends a close message.
   *
   * @param {Buffer} data The message to send
   * @param {Boolean} mask Specifies whether or not to mask `data`
   * @param {Function} cb Callback
   * @private
   */
  doClose (data, mask, cb) {
    this.sendFrame(Sender.frame(data, {
      fin: true,
      rsv1: false,
      opcode: 0x08,
      mask,
      readOnly: false
    }), cb);
  }

  /**
   * Sends a ping message to the other peer.
   *
   * @param {*} data The message to send
   * @param {Boolean} mask Specifies whether or not to mask `data`
   * @public
   */
  ping (data, mask) {
    var readOnly = true;

    if (!Buffer.isBuffer(data)) {
      if (data instanceof ArrayBuffer) {
        data = Buffer.from(data);
      } else if (ArrayBuffer.isView(data)) {
        data = viewToBuffer(data);
      } else {
        data = Buffer.from(data);
        readOnly = false;
      }
    }

    if (this.deflating) {
      this.enqueue([this.doPing, data, mask, readOnly]);
    } else {
      this.doPing(data, mask, readOnly);
    }
  }

  /**
   * Frames and sends a ping message.
   *
   * @param {*} data The message to send
   * @param {Boolean} mask Specifies whether or not to mask `data`
   * @param {Boolean} readOnly Specifies whether `data` can be modified
   * @private
   */
  doPing (data, mask, readOnly) {
    this.sendFrame(Sender.frame(data, {
      fin: true,
      rsv1: false,
      opcode: 0x09,
      mask,
      readOnly
    }));
  }

  /**
   * Sends a pong message to the other peer.
   *
   * @param {*} data The message to send
   * @param {Boolean} mask Specifies whether or not to mask `data`
   * @public
   */
  pong (data, mask) {
    var readOnly = true;

    if (!Buffer.isBuffer(data)) {
      if (data instanceof ArrayBuffer) {
        data = Buffer.from(data);
      } else if (ArrayBuffer.isView(data)) {
        data = viewToBuffer(data);
      } else {
        data = Buffer.from(data);
        readOnly = false;
      }
    }

    if (this.deflating) {
      this.enqueue([this.doPong, data, mask, readOnly]);
    } else {
      this.doPong(data, mask, readOnly);
    }
  }

  /**
   * Frames and sends a pong message.
   *
   * @param {*} data The message to send
   * @param {Boolean} mask Specifies whether or not to mask `data`
   * @param {Boolean} readOnly Specifies whether `data` can be modified
   * @private
   */
  doPong (data, mask, readOnly) {
    this.sendFrame(Sender.frame(data, {
      fin: true,
      rsv1: false,
      opcode: 0x0a,
      mask,
      readOnly
    }));
  }

  /**
   * Sends a data message to the other peer.
   *
   * @param {*} data The message to send
   * @param {Object} options Options object
   * @param {Boolean} options.compress Specifies whether or not to compress `data`
   * @param {Boolean} options.binary Specifies whether `data` is binary or text
   * @param {Boolean} options.fin Specifies whether the fragment is the last one
   * @param {Boolean} options.mask Specifies whether or not to mask `data`
   * @param {Function} cb Callback
   * @public
   */
  send (data, options, cb) {
    var opcode = options.binary ? 2 : 1;
    var rsv1 = options.compress;
    var readOnly = true;

    if (!Buffer.isBuffer(data)) {
      if (data instanceof ArrayBuffer) {
        data = Buffer.from(data);
      } else if (ArrayBuffer.isView(data)) {
        data = viewToBuffer(data);
      } else {
        data = Buffer.from(data);
        readOnly = false;
      }
    }

    if (this.firstFragment) {
      this.firstFragment = false;
      if (rsv1 && this.perMessageDeflate) {
        rsv1 = data.length >= this.perMessageDeflate.threshold;
      }
      this.compress = rsv1;
    } else {
      rsv1 = false;
      opcode = 0;
    }

    if (options.fin) this.firstFragment = true;

    if (this.perMessageDeflate) {
      const opts = {
        fin: options.fin,
        rsv1,
        opcode,
        mask: options.mask,
        readOnly
      };

      if (this.deflating) {
        this.enqueue([this.dispatch, data, this.compress, opts, cb]);
      } else {
        this.dispatch(data, this.compress, opts, cb);
      }
    } else {
      this.sendFrame(Sender.frame(data, {
        fin: options.fin,
        rsv1: false,
        opcode,
        mask: options.mask,
        readOnly
      }), cb);
    }
  }

  /**
   * Dispatches a data message.
   *
   * @param {Buffer} data The message to send
   * @param {Boolean} compress Specifies whether or not to compress `data`
   * @param {Object} options Options object
   * @param {Number} options.opcode The opcode
   * @param {Boolean} options.readOnly Specifies whether `data` can be modified
   * @param {Boolean} options.fin Specifies whether or not to set the FIN bit
   * @param {Boolean} options.mask Specifies whether or not to mask `data`
   * @param {Boolean} options.rsv1 Specifies whether or not to set the RSV1 bit
   * @param {Function} cb Callback
   * @private
   */
  dispatch (data, compress, options, cb) {
    if (!compress) {
      this.sendFrame(Sender.frame(data, options), cb);
      return;
    }

    this.deflating = true;
    this.perMessageDeflate.compress(data, options.fin, (err, buf) => {
      if (err) {
        if (cb) cb(err);
        else this.onerror(err);
        return;
      }

      options.readOnly = false;
      this.sendFrame(Sender.frame(buf, options), cb);
      this.deflating = false;
      this.dequeue();
    });
  }

  /**
   * Executes queued send operations.
   *
   * @private
   */
  dequeue () {
    while (!this.deflating && this.queue.length) {
      const params = this.queue.shift();

      this.bufferedBytes -= params[1].length;
      params[0].apply(this, params.slice(1));
    }
  }

  /**
   * Enqueues a send operation.
   *
   * @param {Array} params Send operation parameters.
   * @private
   */
  enqueue (params) {
    this.bufferedBytes += params[1].length;
    this.queue.push(params);
  }

  /**
   * Sends a frame.
   *
   * @param {Buffer[]} list The frame to send
   * @param {Function} cb Callback
   * @private
   */
  sendFrame (list, cb) {
    if (list.length === 2) {
      this._socket.write(list[0]);
      this._socket.write(list[1], cb);
    } else {
      this._socket.write(list[0], cb);
    }
  }
}

module.exports = Sender;

/**
 * Converts an `ArrayBuffer` view into a buffer.
 *
 * @param {(DataView|TypedArray)} view The view to convert
 * @return {Buffer} Converted view
 * @private
 */
function viewToBuffer (view) {
  const buf = Buffer.from(view.buffer);

  if (view.byteLength !== view.buffer.byteLength) {
    return buf.slice(view.byteOffset, view.byteOffset + view.byteLength);
  }

  return buf;
}


/***/ }),
/* 102 */
/***/ (function(module, exports) {


module.exports = isBuf;

/**
 * Returns true if obj is a buffer or an arraybuffer.
 *
 * @api private
 */

function isBuf(obj) {
  return (global.Buffer && global.Buffer.isBuffer(obj)) ||
         (global.ArrayBuffer && obj instanceof ArrayBuffer);
}


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(__dirname) {
/**
 * Module dependencies.
 */

var http = __webpack_require__(9);
var read = __webpack_require__(2).readFileSync;
var path = __webpack_require__(4);
var exists = __webpack_require__(2).existsSync;
var engine = __webpack_require__(104);
var clientVersion = __webpack_require__(130).version;
var Client = __webpack_require__(131);
var Emitter = __webpack_require__(16).EventEmitter;
var Namespace = __webpack_require__(134);
var Adapter = __webpack_require__(137);
var parser = __webpack_require__(85);
var debug = __webpack_require__(5)('socket.io:server');
var url = __webpack_require__(20);

/**
 * Module exports.
 */

module.exports = Server;

/**
 * Socket.IO client source.
 */

var clientSource = undefined;
var clientSourceMap = undefined;

/**
 * Server constructor.
 *
 * @param {http.Server|Number|Object} srv http server, port or options
 * @param {Object} [opts]
 * @api public
 */

function Server(srv, opts){
  if (!(this instanceof Server)) return new Server(srv, opts);
  if ('object' == typeof srv && srv instanceof Object && !srv.listen) {
    opts = srv;
    srv = null;
  }
  opts = opts || {};
  this.nsps = {};
  this.path(opts.path || '/socket.io');
  this.serveClient(false !== opts.serveClient);
  this.parser = opts.parser || parser;
  this.encoder = new this.parser.Encoder();
  this.adapter(opts.adapter || Adapter);
  this.origins(opts.origins || '*:*');
  this.sockets = this.of('/');
  if (srv) this.attach(srv, opts);
}

/**
 * Server request verification function, that checks for allowed origins
 *
 * @param {http.IncomingMessage} req request
 * @param {Function} fn callback to be called with the result: `fn(err, success)`
 */

Server.prototype.checkRequest = function(req, fn) {
  var origin = req.headers.origin || req.headers.referer;

  // file:// URLs produce a null Origin which can't be authorized via echo-back
  if ('null' == origin || null == origin) origin = '*';

  if (!!origin && typeof(this._origins) == 'function') return this._origins(origin, fn);
  if (this._origins.indexOf('*:*') !== -1) return fn(null, true);
  if (origin) {
    try {
      var parts = url.parse(origin);
      var defaultPort = 'https:' == parts.protocol ? 443 : 80;
      parts.port = parts.port != null
        ? parts.port
        : defaultPort;
      var ok =
        ~this._origins.indexOf(parts.hostname + ':' + parts.port) ||
        ~this._origins.indexOf(parts.hostname + ':*') ||
        ~this._origins.indexOf('*:' + parts.port);
      return fn(null, !!ok);
    } catch (ex) {
    }
  }
  fn(null, false);
};

/**
 * Sets/gets whether client code is being served.
 *
 * @param {Boolean} v whether to serve client code
 * @return {Server|Boolean} self when setting or value when getting
 * @api public
 */

Server.prototype.serveClient = function(v){
  if (!arguments.length) return this._serveClient;
  this._serveClient = v;
  var resolvePath = function(file){
    var filepath = path.resolve(__dirname, './../../', file);
    if (exists(filepath)) {
      return filepath;
    }
    return /*require.resolve*/(!(function webpackMissingModule() { var e = new Error("Cannot find module \".\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
  };
  if (v && !clientSource) {
    clientSource = read(resolvePath( 'socket.io-client/dist/socket.io.js'), 'utf-8');
    try {
      clientSourceMap = read(resolvePath( 'socket.io-client/dist/socket.io.js.map'), 'utf-8');
    } catch(err) {
      debug('could not load sourcemap file');
    }
  }
  return this;
};

/**
 * Old settings for backwards compatibility
 */

var oldSettings = {
  "transports": "transports",
  "heartbeat timeout": "pingTimeout",
  "heartbeat interval": "pingInterval",
  "destroy buffer size": "maxHttpBufferSize"
};

/**
 * Backwards compatibility.
 *
 * @api public
 */

Server.prototype.set = function(key, val){
  if ('authorization' == key && val) {
    this.use(function(socket, next) {
      val(socket.request, function(err, authorized) {
        if (err) return next(new Error(err));
        if (!authorized) return next(new Error('Not authorized'));
        next();
      });
    });
  } else if ('origins' == key && val) {
    this.origins(val);
  } else if ('resource' == key) {
    this.path(val);
  } else if (oldSettings[key] && this.eio[oldSettings[key]]) {
    this.eio[oldSettings[key]] = val;
  } else {
    console.error('Option %s is not valid. Please refer to the README.', key);
  }

  return this;
};

/**
 * Sets the client serving path.
 *
 * @param {String} v pathname
 * @return {Server|String} self when setting or value when getting
 * @api public
 */

Server.prototype.path = function(v){
  if (!arguments.length) return this._path;
  this._path = v.replace(/\/$/, '');
  return this;
};

/**
 * Sets the adapter for rooms.
 *
 * @param {Adapter} v pathname
 * @return {Server|Adapter} self when setting or value when getting
 * @api public
 */

Server.prototype.adapter = function(v){
  if (!arguments.length) return this._adapter;
  this._adapter = v;
  for (var i in this.nsps) {
    if (this.nsps.hasOwnProperty(i)) {
      this.nsps[i].initAdapter();
    }
  }
  return this;
};

/**
 * Sets the allowed origins for requests.
 *
 * @param {String} v origins
 * @return {Server|Adapter} self when setting or value when getting
 * @api public
 */

Server.prototype.origins = function(v){
  if (!arguments.length) return this._origins;

  this._origins = v;
  return this;
};

/**
 * Attaches socket.io to a server or port.
 *
 * @param {http.Server|Number} server or port
 * @param {Object} options passed to engine.io
 * @return {Server} self
 * @api public
 */

Server.prototype.listen =
Server.prototype.attach = function(srv, opts){
  if ('function' == typeof srv) {
    var msg = 'You are trying to attach socket.io to an express ' +
    'request handler function. Please pass a http.Server instance.';
    throw new Error(msg);
  }

  // handle a port as a string
  if (Number(srv) == srv) {
    srv = Number(srv);
  }

  if ('number' == typeof srv) {
    debug('creating http server and binding to %d', srv);
    var port = srv;
    srv = http.Server(function(req, res){
      res.writeHead(404);
      res.end();
    });
    srv.listen(port);

  }

  // set engine.io path to `/socket.io`
  opts = opts || {};
  opts.path = opts.path || this.path();
  // set origins verification
  opts.allowRequest = opts.allowRequest || this.checkRequest.bind(this);

  if (this.sockets.fns.length > 0) {
    this.initEngine(srv, opts);
    return this;
  }

  var self = this;
  var connectPacket = { type: parser.CONNECT, nsp: '/' };
  this.encoder.encode(connectPacket, function (encodedPacket){
    // the CONNECT packet will be merged with Engine.IO handshake,
    // to reduce the number of round trips
    opts.initialPacket = encodedPacket;

    self.initEngine(srv, opts);
  });
  return this;
};

/**
 * Initialize engine
 *
 * @param {Object} options passed to engine.io
 * @api private
 */

Server.prototype.initEngine = function(srv, opts){
  // initialize engine
  debug('creating engine.io instance with opts %j', opts);
  this.eio = engine.attach(srv, opts);

  // attach static file serving
  if (this._serveClient) this.attachServe(srv);

  // Export http server
  this.httpServer = srv;

  // bind to engine events
  this.bind(this.eio);
};

/**
 * Attaches the static file serving.
 *
 * @param {Function|http.Server} srv http server
 * @api private
 */

Server.prototype.attachServe = function(srv){
  debug('attaching client serving req handler');
  var url = this._path + '/socket.io.js';
  var urlMap = this._path + '/socket.io.js.map';
  var evs = srv.listeners('request').slice(0);
  var self = this;
  srv.removeAllListeners('request');
  srv.on('request', function(req, res) {
    if (0 === req.url.indexOf(urlMap)) {
      self.serveMap(req, res);
    } else if (0 === req.url.indexOf(url)) {
      self.serve(req, res);
    } else {
      for (var i = 0; i < evs.length; i++) {
        evs[i].call(srv, req, res);
      }
    }
  });
};

/**
 * Handles a request serving `/socket.io.js`
 *
 * @param {http.Request} req
 * @param {http.Response} res
 * @api private
 */

Server.prototype.serve = function(req, res){
  // Per the standard, ETags must be quoted:
  // https://tools.ietf.org/html/rfc7232#section-2.3
  var expectedEtag = '"' + clientVersion + '"';

  var etag = req.headers['if-none-match'];
  if (etag) {
    if (expectedEtag == etag) {
      debug('serve client 304');
      res.writeHead(304);
      res.end();
      return;
    }
  }

  debug('serve client source');
  res.setHeader('Content-Type', 'application/javascript');
  res.setHeader('ETag', expectedEtag);
  res.writeHead(200);
  res.end(clientSource);
};

/**
 * Handles a request serving `/socket.io.js.map`
 *
 * @param {http.Request} req
 * @param {http.Response} res
 * @api private
 */

Server.prototype.serveMap = function(req, res){
  // Per the standard, ETags must be quoted:
  // https://tools.ietf.org/html/rfc7232#section-2.3
  var expectedEtag = '"' + clientVersion + '"';

  var etag = req.headers['if-none-match'];
  if (etag) {
    if (expectedEtag == etag) {
      debug('serve client 304');
      res.writeHead(304);
      res.end();
      return;
    }
  }

  debug('serve client sourcemap');
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('ETag', expectedEtag);
  res.writeHead(200);
  res.end(clientSourceMap);
};

/**
 * Binds socket.io to an engine.io instance.
 *
 * @param {engine.Server} engine engine.io (or compatible) server
 * @return {Server} self
 * @api public
 */

Server.prototype.bind = function(engine){
  this.engine = engine;
  this.engine.on('connection', this.onconnection.bind(this));
  return this;
};

/**
 * Called with each incoming transport connection.
 *
 * @param {engine.Socket} conn
 * @return {Server} self
 * @api public
 */

Server.prototype.onconnection = function(conn){
  debug('incoming connection with id %s', conn.id);
  var client = new Client(this, conn);
  client.connect('/');
  return this;
};

/**
 * Looks up a namespace.
 *
 * @param {String} name nsp name
 * @param {Function} [fn] optional, nsp `connection` ev handler
 * @api public
 */

Server.prototype.of = function(name, fn){
  if (String(name)[0] !== '/') name = '/' + name;

  var nsp = this.nsps[name];
  if (!nsp) {
    debug('initializing namespace %s', name);
    nsp = new Namespace(this, name);
    this.nsps[name] = nsp;
  }
  if (fn) nsp.on('connect', fn);
  return nsp;
};

/**
 * Closes server connection
 *
 * @param {Function} [fn] optional, called as `fn([err])` on error OR all conns closed
 * @api public
 */

Server.prototype.close = function(fn){
  for (var id in this.nsps['/'].sockets) {
    if (this.nsps['/'].sockets.hasOwnProperty(id)) {
      this.nsps['/'].sockets[id].onclose();
    }
  }

  this.engine.close();

  if (this.httpServer) {
    this.httpServer.close(fn);
  } else {
    fn && fn();
  }
};

/**
 * Expose main namespace (/).
 */

var emitterMethods = Object.keys(Emitter.prototype).filter(function(key){
  return typeof Emitter.prototype[key] === 'function';
});

emitterMethods.concat(['to', 'in', 'use', 'send', 'write', 'clients', 'compress']).forEach(function(fn){
  Server.prototype[fn] = function(){
    return this.sockets[fn].apply(this.sockets, arguments);
  };
});

Namespace.flags.forEach(function(flag){
  Object.defineProperty(Server.prototype, flag, {
    get: function() {
      this.sockets.flags = this.sockets.flags || {};
      this.sockets.flags[flag] = true;
      return this;
    }
  });
});

/**
 * BC with `io.listen`
 */

Server.listen = Server;

/* WEBPACK VAR INJECTION */}.call(exports, "node_modules/socket.io/lib"))

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module dependencies.
 */

var http = __webpack_require__(9);

/**
 * Invoking the library as a function delegates to attach if the first argument
 * is an `http.Server`.
 *
 * If there are no arguments or the first argument is an options object, then
 * a new Server instance is returned.
 *
 * @param {http.Server} server (if specified, will be attached to by the new Server instance)
 * @param {Object} options
 * @return {Server} engine server
 * @api public
 */

exports = module.exports = function () {
  // backwards compatible use as `.attach`
  // if first argument is an http server
  if (arguments.length && arguments[0] instanceof http.Server) {
    return attach.apply(this, arguments);
  }

  // if first argument is not an http server, then just make a regular eio server
  return exports.Server.apply(null, arguments);
};

/**
 * Protocol revision number.
 *
 * @api public
 */

exports.protocol = 1;

/**
 * Expose Server constructor.
 *
 * @api public
 */

exports.Server = __webpack_require__(105);

/**
 * Expose Socket constructor.
 *
 * @api public
 */

exports.Socket = __webpack_require__(94);

/**
 * Expose Transport constructor.
 *
 * @api public
 */

exports.Transport = __webpack_require__(86);

/**
 * Expose mutable list of available transports.
 *
 * @api public
 */

exports.transports = __webpack_require__(89);

/**
 * Exports parser.
 *
 * @api public
 */

exports.parser = __webpack_require__(83);

/**
 * Creates an http.Server exclusively used for WS upgrades.
 *
 * @param {Number} port
 * @param {Function} callback
 * @param {Object} options
 * @return {Server} websocket.io server
 * @api public
 */

exports.listen = listen;

function listen (port, options, fn) {
  if ('function' === typeof options) {
    fn = options;
    options = {};
  }

  var server = http.createServer(function (req, res) {
    res.writeHead(501);
    res.end('Not Implemented');
  });

  // create engine server
  var engine = exports.attach(server, options);
  engine.httpServer = server;

  server.listen(port, fn);

  return engine;
}

/**
 * Captures upgrade requests for a http.Server.
 *
 * @param {http.Server} server
 * @param {Object} options
 * @return {Server} engine server
 * @api public
 */

exports.attach = attach;

function attach (server, options) {
  var engine = new exports.Server(options);
  engine.attach(server, options);
  return engine;
}


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * Module dependencies.
 */

var qs = __webpack_require__(64);
var parse = __webpack_require__(20).parse;
var base64id = __webpack_require__(106);
var transports = __webpack_require__(89);
var EventEmitter = __webpack_require__(16).EventEmitter;
var Socket = __webpack_require__(94);
var util = __webpack_require__(60);
var debug = __webpack_require__(5)('engine');
var cookieMod = __webpack_require__(79);

/**
 * Module exports.
 */

module.exports = Server;

/**
 * Server constructor.
 *
 * @param {Object} options
 * @api public
 */

function Server (opts) {
  if (!(this instanceof Server)) {
    return new Server(opts);
  }

  this.clients = {};
  this.clientsCount = 0;

  opts = opts || {};

  this.wsEngine = opts.wsEngine || process.env.EIO_WS_ENGINE || 'uws';
  this.pingTimeout = opts.pingTimeout || 60000;
  this.pingInterval = opts.pingInterval || 25000;
  this.upgradeTimeout = opts.upgradeTimeout || 10000;
  this.maxHttpBufferSize = opts.maxHttpBufferSize || 10E7;
  this.transports = opts.transports || Object.keys(transports);
  this.allowUpgrades = false !== opts.allowUpgrades;
  this.allowRequest = opts.allowRequest;
  this.cookie = false !== opts.cookie ? (opts.cookie || 'io') : false;
  this.cookiePath = false !== opts.cookiePath ? (opts.cookiePath || '/') : false;
  this.cookieHttpOnly = false !== opts.cookieHttpOnly;
  this.perMessageDeflate = false !== opts.perMessageDeflate ? (opts.perMessageDeflate || true) : false;
  this.httpCompression = false !== opts.httpCompression ? (opts.httpCompression || {}) : false;
  this.initialPacket = opts.initialPacket;

  var self = this;

  // initialize compression options
  ['perMessageDeflate', 'httpCompression'].forEach(function (type) {
    var compression = self[type];
    if (true === compression) self[type] = compression = {};
    if (compression && null == compression.threshold) {
      compression.threshold = 1024;
    }
  });

  this.init();
}

/**
 * Protocol errors mappings.
 */

Server.errors = {
  UNKNOWN_TRANSPORT: 0,
  UNKNOWN_SID: 1,
  BAD_HANDSHAKE_METHOD: 2,
  BAD_REQUEST: 3,
  FORBIDDEN: 4
};

Server.errorMessages = {
  0: 'Transport unknown',
  1: 'Session ID unknown',
  2: 'Bad handshake method',
  3: 'Bad request',
  4: 'Forbidden'
};

/**
 * Inherits from EventEmitter.
 */

util.inherits(Server, EventEmitter);

/**
 * Initialize websocket server
 *
 * @api private
 */

Server.prototype.init = function () {
  if (!~this.transports.indexOf('websocket')) return;

  if (this.ws) this.ws.close();

  var wsModule;
  try {
    switch (this.wsEngine) {
      case 'uws': wsModule = __webpack_require__(114); break;
      case 'ws': wsModule = __webpack_require__(95); break;
      default: throw new Error('unknown wsEngine');
    }
  } catch (ex) {
    this.wsEngine = 'ws';
    // keep require('ws') as separate expression for packers (browserify, etc)
    wsModule = __webpack_require__(95);
  }
  this.ws = new wsModule.Server({
    noServer: true,
    clientTracking: false,
    perMessageDeflate: this.perMessageDeflate,
    maxPayload: this.maxHttpBufferSize
  });
};

/**
 * Returns a list of available transports for upgrade given a certain transport.
 *
 * @return {Array}
 * @api public
 */

Server.prototype.upgrades = function (transport) {
  if (!this.allowUpgrades) return [];
  return transports[transport].upgradesTo || [];
};

/**
 * Verifies a request.
 *
 * @param {http.IncomingMessage}
 * @return {Boolean} whether the request is valid
 * @api private
 */

Server.prototype.verify = function (req, upgrade, fn) {
  // transport check
  var transport = req._query.transport;
  if (!~this.transports.indexOf(transport)) {
    debug('unknown transport "%s"', transport);
    return fn(Server.errors.UNKNOWN_TRANSPORT, false);
  }

  // 'Origin' header check
  var isOriginInvalid = checkInvalidHeaderChar(req.headers.origin);
  if (isOriginInvalid) {
    req.headers.origin = null;
    return fn(Server.errors.BAD_REQUEST, false);
  }

  // sid check
  var sid = req._query.sid;
  if (sid) {
    if (!this.clients.hasOwnProperty(sid)) {
      return fn(Server.errors.UNKNOWN_SID, false);
    }
    if (!upgrade && this.clients[sid].transport.name !== transport) {
      debug('bad request: unexpected transport without upgrade');
      return fn(Server.errors.BAD_REQUEST, false);
    }
  } else {
    // handshake is GET only
    if ('GET' !== req.method) return fn(Server.errors.BAD_HANDSHAKE_METHOD, false);
    if (!this.allowRequest) return fn(null, true);
    return this.allowRequest(req, fn);
  }

  fn(null, true);
};

/**
 * Prepares a request by processing the query string.
 *
 * @api private
 */

Server.prototype.prepare = function (req) {
  // try to leverage pre-existing `req._query` (e.g: from connect)
  if (!req._query) {
    req._query = ~req.url.indexOf('?') ? qs.parse(parse(req.url).query) : {};
  }
};

/**
 * Closes all clients.
 *
 * @api public
 */

Server.prototype.close = function () {
  debug('closing all open clients');
  for (var i in this.clients) {
    if (this.clients.hasOwnProperty(i)) {
      this.clients[i].close(true);
    }
  }
  if (this.ws) {
    debug('closing webSocketServer');
    this.ws.close();
    // don't delete this.ws because it can be used again if the http server starts listening again
  }
  return this;
};

/**
 * Handles an Engine.IO HTTP request.
 *
 * @param {http.IncomingMessage} request
 * @param {http.ServerResponse|http.OutgoingMessage} response
 * @api public
 */

Server.prototype.handleRequest = function (req, res) {
  debug('handling "%s" http request "%s"', req.method, req.url);
  this.prepare(req);
  req.res = res;

  var self = this;
  this.verify(req, false, function (err, success) {
    if (!success) {
      sendErrorMessage(req, res, err);
      return;
    }

    if (req._query.sid) {
      debug('setting new request for existing client');
      self.clients[req._query.sid].transport.onRequest(req);
    } else {
      self.handshake(req._query.transport, req);
    }
  });
};

/**
 * Sends an Engine.IO Error Message
 *
 * @param {http.ServerResponse} response
 * @param {code} error code
 * @api private
 */

function sendErrorMessage (req, res, code) {
  var headers = { 'Content-Type': 'application/json' };

  var isForbidden = !Server.errorMessages.hasOwnProperty(code);
  if (isForbidden) {
    res.writeHead(403, headers);
    res.end(JSON.stringify({
      code: Server.errors.FORBIDDEN,
      message: code || Server.errorMessages[Server.errors.FORBIDDEN]
    }));
    return;
  }
  if (req.headers.origin) {
    headers['Access-Control-Allow-Credentials'] = 'true';
    headers['Access-Control-Allow-Origin'] = req.headers.origin;
  } else {
    headers['Access-Control-Allow-Origin'] = '*';
  }
  res.writeHead(400, headers);
  res.end(JSON.stringify({
    code: code,
    message: Server.errorMessages[code]
  }));
}

/**
 * generate a socket id.
 * Overwrite this method to generate your custom socket id
 *
 * @param {Object} request object
 * @api public
 */

Server.prototype.generateId = function (req) {
  return base64id.generateId();
};

/**
 * Handshakes a new client.
 *
 * @param {String} transport name
 * @param {Object} request object
 * @api private
 */

Server.prototype.handshake = function (transportName, req) {
  var id = this.generateId(req);

  debug('handshaking client "%s"', id);

  try {
    var transport = new transports[transportName](req);
    if ('polling' === transportName) {
      transport.maxHttpBufferSize = this.maxHttpBufferSize;
      transport.httpCompression = this.httpCompression;
    } else if ('websocket' === transportName) {
      transport.perMessageDeflate = this.perMessageDeflate;
    }

    if (req._query && req._query.b64) {
      transport.supportsBinary = false;
    } else {
      transport.supportsBinary = true;
    }
  } catch (e) {
    sendErrorMessage(req, req.res, Server.errors.BAD_REQUEST);
    return;
  }
  var socket = new Socket(id, this, transport, req);
  var self = this;

  if (false !== this.cookie) {
    transport.on('headers', function (headers) {
      headers['Set-Cookie'] = cookieMod.serialize(self.cookie, id,
        {
          path: self.cookiePath,
          httpOnly: self.cookiePath ? self.cookieHttpOnly : false
        });
    });
  }

  transport.onRequest(req);

  this.clients[id] = socket;
  this.clientsCount++;

  socket.once('close', function () {
    delete self.clients[id];
    self.clientsCount--;
  });

  this.emit('connection', socket);
};

/**
 * Handles an Engine.IO HTTP Upgrade.
 *
 * @api public
 */

Server.prototype.handleUpgrade = function (req, socket, upgradeHead) {
  this.prepare(req);

  var self = this;
  this.verify(req, true, function (err, success) {
    if (!success) {
      abortConnection(socket, err);
      return;
    }

    var head = new Buffer(upgradeHead.length); // eslint-disable-line node/no-deprecated-api
    upgradeHead.copy(head);
    upgradeHead = null;

    // delegate to ws
    self.ws.handleUpgrade(req, socket, head, function (conn) {
      self.onWebSocket(req, conn);
    });
  });
};

/**
 * Called upon a ws.io connection.
 *
 * @param {ws.Socket} websocket
 * @api private
 */

Server.prototype.onWebSocket = function (req, socket) {
  socket.on('error', onUpgradeError);

  if (!transports[req._query.transport].prototype.handlesUpgrades) {
    debug('transport doesnt handle upgraded requests');
    socket.close();
    return;
  }

  // get client id
  var id = req._query.sid;

  // keep a reference to the ws.Socket
  req.websocket = socket;

  if (id) {
    var client = this.clients[id];
    if (!client) {
      debug('upgrade attempt for closed client');
      socket.close();
    } else if (client.upgrading) {
      debug('transport has already been trying to upgrade');
      socket.close();
    } else if (client.upgraded) {
      debug('transport had already been upgraded');
      socket.close();
    } else {
      debug('upgrading existing transport');

      // transport error handling takes over
      socket.removeListener('error', onUpgradeError);

      var transport = new transports[req._query.transport](req);
      if (req._query && req._query.b64) {
        transport.supportsBinary = false;
      } else {
        transport.supportsBinary = true;
      }
      transport.perMessageDeflate = this.perMessageDeflate;
      client.maybeUpgrade(transport);
    }
  } else {
    // transport error handling takes over
    socket.removeListener('error', onUpgradeError);

    this.handshake(req._query.transport, req);
  }

  function onUpgradeError () {
    debug('websocket error before upgrade');
    // socket.close() not needed
  }
};

/**
 * Captures upgrade requests for a http.Server.
 *
 * @param {http.Server} server
 * @param {Object} options
 * @api public
 */

Server.prototype.attach = function (server, options) {
  var self = this;
  options = options || {};
  var path = (options.path || '/engine.io').replace(/\/$/, '');

  var destroyUpgradeTimeout = options.destroyUpgradeTimeout || 1000;

  // normalize path
  path += '/';

  function check (req) {
    if ('OPTIONS' === req.method && false === options.handlePreflightRequest) {
      return false;
    }
    return path === req.url.substr(0, path.length);
  }

  // cache and clean up listeners
  var listeners = server.listeners('request').slice(0);
  server.removeAllListeners('request');
  server.on('close', self.close.bind(self));
  server.on('listening', self.init.bind(self));

  // add request handler
  server.on('request', function (req, res) {
    if (check(req)) {
      debug('intercepting request for path "%s"', path);
      if ('OPTIONS' === req.method && 'function' === typeof options.handlePreflightRequest) {
        options.handlePreflightRequest.call(server, req, res);
      } else {
        self.handleRequest(req, res);
      }
    } else {
      for (var i = 0, l = listeners.length; i < l; i++) {
        listeners[i].call(server, req, res);
      }
    }
  });

  if (~self.transports.indexOf('websocket')) {
    server.on('upgrade', function (req, socket, head) {
      if (check(req)) {
        self.handleUpgrade(req, socket, head);
      } else if (false !== options.destroyUpgrade) {
        // default node behavior is to disconnect when no handlers
        // but by adding a handler, we prevent that
        // and if no eio thing handles the upgrade
        // then the socket needs to die!
        setTimeout(function () {
          if (socket.writable && socket.bytesWritten <= 0) {
            return socket.end();
          }
        }, destroyUpgradeTimeout);
      }
    });
  }
};

/**
 * Closes the connection
 *
 * @param {net.Socket} socket
 * @param {code} error code
 * @api private
 */

function abortConnection (socket, code) {
  if (socket.writable) {
    var message = Server.errorMessages.hasOwnProperty(code) ? Server.errorMessages[code] : (code || '');
    var length = Buffer.byteLength(message);
    socket.write(
      'HTTP/1.1 400 Bad Request\r\n' +
      'Connection: close\r\n' +
      'Content-type: text/html\r\n' +
      'Content-Length: ' + length + '\r\n' +
      '\r\n' +
      message
    );
  }
  socket.destroy();
}

/* eslint-disable */

/**
 * From https://github.com/nodejs/node/blob/v8.4.0/lib/_http_common.js#L303-L354
 *
 * True if val contains an invalid field-vchar
 *  field-value    = *( field-content / obs-fold )
 *  field-content  = field-vchar [ 1*( SP / HTAB ) field-vchar ]
 *  field-vchar    = VCHAR / obs-text
 *
 * checkInvalidHeaderChar() is currently designed to be inlinable by v8,
 * so take care when making changes to the implementation so that the source
 * code size does not exceed v8's default max_inlined_source_size setting.
 **/
var validHdrChars = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, // 0 - 15
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 16 - 31
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, // 32 - 47
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, // 48 - 63
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, // 64 - 79
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, // 80 - 95
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, // 96 - 111
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, // 112 - 127
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, // 128 ...
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1  // ... 255
];

function checkInvalidHeaderChar(val) {
  val += '';
  if (val.length < 1)
    return false;
  if (!validHdrChars[val.charCodeAt(0)])
    return true;
  if (val.length < 2)
    return false;
  if (!validHdrChars[val.charCodeAt(1)])
    return true;
  if (val.length < 3)
    return false;
  if (!validHdrChars[val.charCodeAt(2)])
    return true;
  if (val.length < 4)
    return false;
  if (!validHdrChars[val.charCodeAt(3)])
    return true;
  for (var i = 4; i < val.length; ++i) {
    if (!validHdrChars[val.charCodeAt(i)])
      return true;
  }
  return false;
}


/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * base64id v0.1.0
 */

/**
 * Module dependencies
 */

var crypto = __webpack_require__(32);

/**
 * Constructor
 */

var Base64Id = function() { };

/**
 * Get random bytes
 *
 * Uses a buffer if available, falls back to crypto.randomBytes
 */

Base64Id.prototype.getRandomBytes = function(bytes) {

  var BUFFER_SIZE = 4096
  var self = this;  
  
  bytes = bytes || 12;

  if (bytes > BUFFER_SIZE) {
    return crypto.randomBytes(bytes);
  }
  
  var bytesInBuffer = parseInt(BUFFER_SIZE/bytes);
  var threshold = parseInt(bytesInBuffer*0.85);

  if (!threshold) {
    return crypto.randomBytes(bytes);
  }

  if (this.bytesBufferIndex == null) {
     this.bytesBufferIndex = -1;
  }

  if (this.bytesBufferIndex == bytesInBuffer) {
    this.bytesBuffer = null;
    this.bytesBufferIndex = -1;
  }

  // No buffered bytes available or index above threshold
  if (this.bytesBufferIndex == -1 || this.bytesBufferIndex > threshold) {
     
    if (!this.isGeneratingBytes) {
      this.isGeneratingBytes = true;
      crypto.randomBytes(BUFFER_SIZE, function(err, bytes) {
        self.bytesBuffer = bytes;
        self.bytesBufferIndex = 0;
        self.isGeneratingBytes = false;
      }); 
    }
    
    // Fall back to sync call when no buffered bytes are available
    if (this.bytesBufferIndex == -1) {
      return crypto.randomBytes(bytes);
    }
  }
  
  var result = this.bytesBuffer.slice(bytes*this.bytesBufferIndex, bytes*(this.bytesBufferIndex+1)); 
  this.bytesBufferIndex++; 
  
  return result;
}

/**
 * Generates a base64 id
 *
 * (Original version from socket.io <http://socket.io>)
 */

Base64Id.prototype.generateId = function () {
  var rand = new Buffer(15); // multiple of 3 for base64
  if (!rand.writeInt32BE) {
    return Math.abs(Math.random() * Math.random() * Date.now() | 0).toString()
      + Math.abs(Math.random() * Math.random() * Date.now() | 0).toString();
  }
  this.sequenceNumber = (this.sequenceNumber + 1) | 0;
  rand.writeInt32BE(this.sequenceNumber, 11);
  if (crypto.randomBytes) {
    this.getRandomBytes(12).copy(rand);
  } else {
    // not secure for node 0.4
    [0, 4, 8].forEach(function(i) {
      rand.writeInt32BE(Math.random() * Math.pow(2, 32) | 0, i);
    });
  }
  return rand.toString('base64').replace(/\//g, '_').replace(/\+/g, '-');
};

/**
 * Export
 */

exports = module.exports = new Base64Id();


/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * Module dependencies.
 */

var Polling = __webpack_require__(90);
var util = __webpack_require__(60);

/**
 * Module exports.
 */

module.exports = XHR;

/**
 * Ajax polling transport.
 *
 * @api public
 */

function XHR (req) {
  Polling.call(this, req);
}

/**
 * Inherits from Polling.
 */

util.inherits(XHR, Polling);

/**
 * Overrides `onRequest` to handle `OPTIONS`..
 *
 * @param {http.IncomingMessage}
 * @api private
 */

XHR.prototype.onRequest = function (req) {
  if ('OPTIONS' === req.method) {
    var res = req.res;
    var headers = this.headers(req);
    headers['Access-Control-Allow-Headers'] = 'Content-Type';
    res.writeHead(200, headers);
    res.end();
  } else {
    Polling.prototype.onRequest.call(this, req);
  }
};

/**
 * Returns headers for a response.
 *
 * @param {http.IncomingMessage} request
 * @param {Object} extra headers
 * @api private
 */

XHR.prototype.headers = function (req, headers) {
  headers = headers || {};

  if (req.headers.origin) {
    headers['Access-Control-Allow-Credentials'] = 'true';
    headers['Access-Control-Allow-Origin'] = req.headers.origin;
  } else {
    headers['Access-Control-Allow-Origin'] = '*';
  }

  return Polling.prototype.headers.call(this, req, headers);
};


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module dependencies.
 */

var utf8 = __webpack_require__(109);
var hasBinary = __webpack_require__(91);
var after = __webpack_require__(110);
var keys = __webpack_require__(111);

/**
 * Current protocol version.
 */
exports.protocol = 3;

/**
 * Packet types.
 */

var packets = exports.packets = {
    open:     0    // non-ws
  , close:    1    // non-ws
  , ping:     2
  , pong:     3
  , message:  4
  , upgrade:  5
  , noop:     6
};

var packetslist = keys(packets);

/**
 * Premade error packet.
 */

var err = { type: 'error', data: 'parser error' };

/**
 * Encodes a packet.
 *
 *     <packet type id> [ <data> ]
 *
 * Example:
 *
 *     5hello world
 *     3
 *     4
 *
 * Binary is encoded in an identical principle
 *
 * @api private
 */

exports.encodePacket = function (packet, supportsBinary, utf8encode, callback) {
  if (typeof supportsBinary === 'function') {
    callback = supportsBinary;
    supportsBinary = null;
  }

  if (typeof utf8encode === 'function') {
    callback = utf8encode;
    utf8encode = null;
  }

  if (Buffer.isBuffer(packet.data)) {
    return encodeBuffer(packet, supportsBinary, callback);
  } else if (packet.data && (packet.data.buffer || packet.data) instanceof ArrayBuffer) {
    packet.data = arrayBufferToBuffer(packet.data);
    return encodeBuffer(packet, supportsBinary, callback);
  }

  // Sending data as a utf-8 string
  var encoded = packets[packet.type];

  // data fragment is optional
  if (undefined !== packet.data) {
    encoded += utf8encode ? utf8.encode(String(packet.data), { strict: false }) : String(packet.data);
  }

  return callback('' + encoded);
};

/**
 * Encode Buffer data
 */

function encodeBuffer(packet, supportsBinary, callback) {
  if (!supportsBinary) {
    return exports.encodeBase64Packet(packet, callback);
  }

  var data = packet.data;
  var typeBuffer = new Buffer(1);
  typeBuffer[0] = packets[packet.type];
  return callback(Buffer.concat([typeBuffer, data]));
}

/**
 * Encodes a packet with binary data in a base64 string
 *
 * @param {Object} packet, has `type` and `data`
 * @return {String} base64 encoded message
 */

exports.encodeBase64Packet = function(packet, callback){
  if (!Buffer.isBuffer(packet.data)) {
    packet.data = arrayBufferToBuffer(packet.data);
  }

  var message = 'b' + packets[packet.type];
  message += packet.data.toString('base64');
  return callback(message);
};

/**
 * Decodes a packet. Data also available as an ArrayBuffer if requested.
 *
 * @return {Object} with `type` and `data` (if any)
 * @api private
 */

exports.decodePacket = function (data, binaryType, utf8decode) {
  if (data === undefined) {
    return err;
  }

  var type;

  // String data
  if (typeof data === 'string') {

    type = data.charAt(0);

    if (type === 'b') {
      return exports.decodeBase64Packet(data.substr(1), binaryType);
    }

    if (utf8decode) {
      data = tryDecode(data);
      if (data === false) {
        return err;
      }
    }

    if (Number(type) != type || !packetslist[type]) {
      return err;
    }

    if (data.length > 1) {
      return { type: packetslist[type], data: data.substring(1) };
    } else {
      return { type: packetslist[type] };
    }
  }

  // Binary data
  if (binaryType === 'arraybuffer') {
    // wrap Buffer/ArrayBuffer data into an Uint8Array
    var intArray = new Uint8Array(data);
    type = intArray[0];
    return { type: packetslist[type], data: intArray.buffer.slice(1) };
  }

  if (data instanceof ArrayBuffer) {
    data = arrayBufferToBuffer(data);
  }
  type = data[0];
  return { type: packetslist[type], data: data.slice(1) };
};

function tryDecode(data) {
  try {
    data = utf8.decode(data, { strict: false });
  } catch (e) {
    return false;
  }
  return data;
}

/**
 * Decodes a packet encoded in a base64 string.
 *
 * @param {String} base64 encoded message
 * @return {Object} with `type` and `data` (if any)
 */

exports.decodeBase64Packet = function(msg, binaryType) {
  var type = packetslist[msg.charAt(0)];
  var data = new Buffer(msg.substr(1), 'base64');
  if (binaryType === 'arraybuffer') {
    var abv = new Uint8Array(data.length);
    for (var i = 0; i < abv.length; i++){
      abv[i] = data[i];
    }
    data = abv.buffer;
  }
  return { type: type, data: data };
};

/**
 * Encodes multiple messages (payload).
 *
 *     <length>:data
 *
 * Example:
 *
 *     11:hello world2:hi
 *
 * If any contents are binary, they will be encoded as base64 strings. Base64
 * encoded strings are marked with a b before the length specifier
 *
 * @param {Array} packets
 * @api private
 */

exports.encodePayload = function (packets, supportsBinary, callback) {
  if (typeof supportsBinary === 'function') {
    callback = supportsBinary;
    supportsBinary = null;
  }

  if (supportsBinary && hasBinary(packets)) {
    return exports.encodePayloadAsBinary(packets, callback);
  }

  if (!packets.length) {
    return callback('0:');
  }

  function encodeOne(packet, doneCallback) {
    exports.encodePacket(packet, supportsBinary, false, function(message) {
      doneCallback(null, setLengthHeader(message));
    });
  }

  map(packets, encodeOne, function(err, results) {
    return callback(results.join(''));
  });
};

function setLengthHeader(message) {
  return message.length + ':' + message;
}

/**
 * Async array map using after
 */

function map(ary, each, done) {
  var result = new Array(ary.length);
  var next = after(ary.length, done);

  for (var i = 0; i < ary.length; i++) {
    each(ary[i], function(error, msg) {
      result[i] = msg;
      next(error, result);
    });
  }
}

/*
 * Decodes data when a payload is maybe expected. Possible binary contents are
 * decoded from their base64 representation
 *
 * @param {String} data, callback method
 * @api public
 */

exports.decodePayload = function (data, binaryType, callback) {
  if (typeof data !== 'string') {
    return exports.decodePayloadAsBinary(data, binaryType, callback);
  }

  if (typeof binaryType === 'function') {
    callback = binaryType;
    binaryType = null;
  }

  if (data === '') {
    // parser error - ignoring payload
    return callback(err, 0, 1);
  }

  var length = '', n, msg, packet;

  for (var i = 0, l = data.length; i < l; i++) {
    var chr = data.charAt(i);

    if (chr !== ':') {
      length += chr;
      continue;
    }

    if (length === '' || (length != (n = Number(length)))) {
      // parser error - ignoring payload
      return callback(err, 0, 1);
    }

    msg = data.substr(i + 1, n);

    if (length != msg.length) {
      // parser error - ignoring payload
      return callback(err, 0, 1);
    }

    if (msg.length) {
      packet = exports.decodePacket(msg, binaryType, false);

      if (err.type === packet.type && err.data === packet.data) {
        // parser error in individual packet - ignoring payload
        return callback(err, 0, 1);
      }

      var more = callback(packet, i + n, l);
      if (false === more) return;
    }

    // advance cursor
    i += n;
    length = '';
  }

  if (length !== '') {
    // parser error - ignoring payload
    return callback(err, 0, 1);
  }

};

/**
 *
 * Converts a buffer to a utf8.js encoded string
 *
 * @api private
 */

function bufferToString(buffer) {
  var str = '';
  for (var i = 0, l = buffer.length; i < l; i++) {
    str += String.fromCharCode(buffer[i]);
  }
  return str;
}

/**
 *
 * Converts a utf8.js encoded string to a buffer
 *
 * @api private
 */

function stringToBuffer(string) {
  var buf = new Buffer(string.length);
  for (var i = 0, l = string.length; i < l; i++) {
    buf.writeUInt8(string.charCodeAt(i), i);
  }
  return buf;
}

/**
 *
 * Converts an ArrayBuffer to a Buffer
 *
 * @api private
 */

function arrayBufferToBuffer(data) {
  // data is either an ArrayBuffer or ArrayBufferView.
  var array = new Uint8Array(data.buffer || data);
  var length = data.byteLength || data.length;
  var offset = data.byteOffset || 0;
  var buffer = new Buffer(length);

  for (var i = 0; i < length; i++) {
    buffer[i] = array[offset + i];
  }
  return buffer;
}

/**
 * Encodes multiple messages (payload) as binary.
 *
 * <1 = binary, 0 = string><number from 0-9><number from 0-9>[...]<number
 * 255><data>
 *
 * Example:
 * 1 3 255 1 2 3, if the binary contents are interpreted as 8 bit integers
 *
 * @param {Array} packets
 * @return {Buffer} encoded payload
 * @api private
 */

exports.encodePayloadAsBinary = function (packets, callback) {
  if (!packets.length) {
    return callback(new Buffer(0));
  }

  map(packets, encodeOneBinaryPacket, function(err, results) {
    return callback(Buffer.concat(results));
  });
};

function encodeOneBinaryPacket(p, doneCallback) {

  function onBinaryPacketEncode(packet) {

    var encodingLength = '' + packet.length;
    var sizeBuffer;

    if (typeof packet === 'string') {
      sizeBuffer = new Buffer(encodingLength.length + 2);
      sizeBuffer[0] = 0; // is a string (not true binary = 0)
      for (var i = 0; i < encodingLength.length; i++) {
        sizeBuffer[i + 1] = parseInt(encodingLength[i], 10);
      }
      sizeBuffer[sizeBuffer.length - 1] = 255;
      return doneCallback(null, Buffer.concat([sizeBuffer, stringToBuffer(packet)]));
    }

    sizeBuffer = new Buffer(encodingLength.length + 2);
    sizeBuffer[0] = 1; // is binary (true binary = 1)
    for (var i = 0; i < encodingLength.length; i++) {
      sizeBuffer[i + 1] = parseInt(encodingLength[i], 10);
    }
    sizeBuffer[sizeBuffer.length - 1] = 255;

    doneCallback(null, Buffer.concat([sizeBuffer, packet]));
  }

  exports.encodePacket(p, true, true, onBinaryPacketEncode);

}


/*
 * Decodes data when a payload is maybe expected. Strings are decoded by
 * interpreting each byte as a key code for entries marked to start with 0. See
 * description of encodePayloadAsBinary

 * @param {Buffer} data, callback method
 * @api public
 */

exports.decodePayloadAsBinary = function (data, binaryType, callback) {
  if (typeof binaryType === 'function') {
    callback = binaryType;
    binaryType = null;
  }

  var bufferTail = data;
  var buffers = [];
  var i;

  while (bufferTail.length > 0) {
    var strLen = '';
    var isString = bufferTail[0] === 0;
    for (i = 1; ; i++) {
      if (bufferTail[i] === 255)  break;
      // 310 = char length of Number.MAX_VALUE
      if (strLen.length > 310) {
        return callback(err, 0, 1);
      }
      strLen += '' + bufferTail[i];
    }
    bufferTail = bufferTail.slice(strLen.length + 1);

    var msgLength = parseInt(strLen, 10);

    var msg = bufferTail.slice(1, msgLength + 1);
    if (isString) msg = bufferToString(msg);
    buffers.push(msg);
    bufferTail = bufferTail.slice(msgLength + 1);
  }

  var total = buffers.length;
  for (i = 0; i < total; i++) {
    var buffer = buffers[i];
    callback(exports.decodePacket(buffer, binaryType, true), i, total);
  }
};


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_RESULT__;/*! https://mths.be/utf8js v2.1.2 by @mathias */
;(function(root) {

	// Detect free variables `exports`
	var freeExports = typeof exports == 'object' && exports;

	// Detect free variable `module`
	var freeModule = typeof module == 'object' && module &&
		module.exports == freeExports && module;

	// Detect free variable `global`, from Node.js or Browserified code,
	// and use it as `root`
	var freeGlobal = typeof global == 'object' && global;
	if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) {
		root = freeGlobal;
	}

	/*--------------------------------------------------------------------------*/

	var stringFromCharCode = String.fromCharCode;

	// Taken from https://mths.be/punycode
	function ucs2decode(string) {
		var output = [];
		var counter = 0;
		var length = string.length;
		var value;
		var extra;
		while (counter < length) {
			value = string.charCodeAt(counter++);
			if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
				// high surrogate, and there is a next character
				extra = string.charCodeAt(counter++);
				if ((extra & 0xFC00) == 0xDC00) { // low surrogate
					output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
				} else {
					// unmatched surrogate; only append this code unit, in case the next
					// code unit is the high surrogate of a surrogate pair
					output.push(value);
					counter--;
				}
			} else {
				output.push(value);
			}
		}
		return output;
	}

	// Taken from https://mths.be/punycode
	function ucs2encode(array) {
		var length = array.length;
		var index = -1;
		var value;
		var output = '';
		while (++index < length) {
			value = array[index];
			if (value > 0xFFFF) {
				value -= 0x10000;
				output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
				value = 0xDC00 | value & 0x3FF;
			}
			output += stringFromCharCode(value);
		}
		return output;
	}

	function checkScalarValue(codePoint, strict) {
		if (codePoint >= 0xD800 && codePoint <= 0xDFFF) {
			if (strict) {
				throw Error(
					'Lone surrogate U+' + codePoint.toString(16).toUpperCase() +
					' is not a scalar value'
				);
			}
			return false;
		}
		return true;
	}
	/*--------------------------------------------------------------------------*/

	function createByte(codePoint, shift) {
		return stringFromCharCode(((codePoint >> shift) & 0x3F) | 0x80);
	}

	function encodeCodePoint(codePoint, strict) {
		if ((codePoint & 0xFFFFFF80) == 0) { // 1-byte sequence
			return stringFromCharCode(codePoint);
		}
		var symbol = '';
		if ((codePoint & 0xFFFFF800) == 0) { // 2-byte sequence
			symbol = stringFromCharCode(((codePoint >> 6) & 0x1F) | 0xC0);
		}
		else if ((codePoint & 0xFFFF0000) == 0) { // 3-byte sequence
			if (!checkScalarValue(codePoint, strict)) {
				codePoint = 0xFFFD;
			}
			symbol = stringFromCharCode(((codePoint >> 12) & 0x0F) | 0xE0);
			symbol += createByte(codePoint, 6);
		}
		else if ((codePoint & 0xFFE00000) == 0) { // 4-byte sequence
			symbol = stringFromCharCode(((codePoint >> 18) & 0x07) | 0xF0);
			symbol += createByte(codePoint, 12);
			symbol += createByte(codePoint, 6);
		}
		symbol += stringFromCharCode((codePoint & 0x3F) | 0x80);
		return symbol;
	}

	function utf8encode(string, opts) {
		opts = opts || {};
		var strict = false !== opts.strict;

		var codePoints = ucs2decode(string);
		var length = codePoints.length;
		var index = -1;
		var codePoint;
		var byteString = '';
		while (++index < length) {
			codePoint = codePoints[index];
			byteString += encodeCodePoint(codePoint, strict);
		}
		return byteString;
	}

	/*--------------------------------------------------------------------------*/

	function readContinuationByte() {
		if (byteIndex >= byteCount) {
			throw Error('Invalid byte index');
		}

		var continuationByte = byteArray[byteIndex] & 0xFF;
		byteIndex++;

		if ((continuationByte & 0xC0) == 0x80) {
			return continuationByte & 0x3F;
		}

		// If we end up here, it’s not a continuation byte
		throw Error('Invalid continuation byte');
	}

	function decodeSymbol(strict) {
		var byte1;
		var byte2;
		var byte3;
		var byte4;
		var codePoint;

		if (byteIndex > byteCount) {
			throw Error('Invalid byte index');
		}

		if (byteIndex == byteCount) {
			return false;
		}

		// Read first byte
		byte1 = byteArray[byteIndex] & 0xFF;
		byteIndex++;

		// 1-byte sequence (no continuation bytes)
		if ((byte1 & 0x80) == 0) {
			return byte1;
		}

		// 2-byte sequence
		if ((byte1 & 0xE0) == 0xC0) {
			byte2 = readContinuationByte();
			codePoint = ((byte1 & 0x1F) << 6) | byte2;
			if (codePoint >= 0x80) {
				return codePoint;
			} else {
				throw Error('Invalid continuation byte');
			}
		}

		// 3-byte sequence (may include unpaired surrogates)
		if ((byte1 & 0xF0) == 0xE0) {
			byte2 = readContinuationByte();
			byte3 = readContinuationByte();
			codePoint = ((byte1 & 0x0F) << 12) | (byte2 << 6) | byte3;
			if (codePoint >= 0x0800) {
				return checkScalarValue(codePoint, strict) ? codePoint : 0xFFFD;
			} else {
				throw Error('Invalid continuation byte');
			}
		}

		// 4-byte sequence
		if ((byte1 & 0xF8) == 0xF0) {
			byte2 = readContinuationByte();
			byte3 = readContinuationByte();
			byte4 = readContinuationByte();
			codePoint = ((byte1 & 0x07) << 0x12) | (byte2 << 0x0C) |
				(byte3 << 0x06) | byte4;
			if (codePoint >= 0x010000 && codePoint <= 0x10FFFF) {
				return codePoint;
			}
		}

		throw Error('Invalid UTF-8 detected');
	}

	var byteArray;
	var byteCount;
	var byteIndex;
	function utf8decode(byteString, opts) {
		opts = opts || {};
		var strict = false !== opts.strict;

		byteArray = ucs2decode(byteString);
		byteCount = byteArray.length;
		byteIndex = 0;
		var codePoints = [];
		var tmp;
		while ((tmp = decodeSymbol(strict)) !== false) {
			codePoints.push(tmp);
		}
		return ucs2encode(codePoints);
	}

	/*--------------------------------------------------------------------------*/

	var utf8 = {
		'version': '2.1.2',
		'encode': utf8encode,
		'decode': utf8decode
	};

	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if (
		true
	) {
		!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
			return utf8;
		}.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}	else if (freeExports && !freeExports.nodeType) {
		if (freeModule) { // in Node.js or RingoJS v0.8.0+
			freeModule.exports = utf8;
		} else { // in Narwhal or RingoJS v0.7.0-
			var object = {};
			var hasOwnProperty = object.hasOwnProperty;
			for (var key in utf8) {
				hasOwnProperty.call(utf8, key) && (freeExports[key] = utf8[key]);
			}
		}
	} else { // in Rhino or a web browser
		root.utf8 = utf8;
	}

}(this));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(63)(module)))

/***/ }),
/* 110 */
/***/ (function(module, exports) {

module.exports = after

function after(count, callback, err_cb) {
    var bail = false
    err_cb = err_cb || noop
    proxy.count = count

    return (count === 0) ? callback() : proxy

    function proxy(err, result) {
        if (proxy.count <= 0) {
            throw new Error('after called too many times')
        }
        --proxy.count

        // after first error, rest are passed to err_cb
        if (err) {
            bail = true
            callback(err)
            // future error callbacks will go to error handler
            callback = err_cb
        } else if (proxy.count === 0 && !bail) {
            callback(null, result)
        }
    }
}

function noop() {}


/***/ }),
/* 111 */
/***/ (function(module, exports) {


/**
 * Gets the keys for an object.
 *
 * @return {Array} keys
 * @api private
 */

module.exports = Object.keys || function keys (obj){
  var arr = [];
  var has = Object.prototype.hasOwnProperty;

  for (var i in obj) {
    if (has.call(obj, i)) {
      arr.push(i);
    }
  }
  return arr;
};


/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * Module dependencies.
 */

var Polling = __webpack_require__(90);
var qs = __webpack_require__(64);
var rDoubleSlashes = /\\\\n/g;
var rSlashes = /(\\)?\\n/g;
var util = __webpack_require__(60);

/**
 * Module exports.
 */

module.exports = JSONP;

/**
 * JSON-P polling transport.
 *
 * @api public
 */

function JSONP (req) {
  Polling.call(this, req);

  this.head = '___eio[' + (req._query.j || '').replace(/[^0-9]/g, '') + '](';
  this.foot = ');';
}

/**
 * Inherits from Polling.
 */

util.inherits(JSONP, Polling);

/**
 * Handles incoming data.
 * Due to a bug in \n handling by browsers, we expect a escaped string.
 *
 * @api private
 */

JSONP.prototype.onData = function (data) {
  // we leverage the qs module so that we get built-in DoS protection
  // and the fast alternative to decodeURIComponent
  data = qs.parse(data).d;
  if ('string' === typeof data) {
    // client will send already escaped newlines as \\\\n and newlines as \\n
    // \\n must be replaced with \n and \\\\n with \\n
    data = data.replace(rSlashes, function (match, slashes) {
      return slashes ? match : '\n';
    });
    Polling.prototype.onData.call(this, data.replace(rDoubleSlashes, '\\n'));
  }
};

/**
 * Performs the write.
 *
 * @api private
 */

JSONP.prototype.doWrite = function (data, options, callback) {
  // we must output valid javascript, not valid json
  // see: http://timelessrepo.com/json-isnt-a-javascript-subset
  var js = JSON.stringify(data)
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');

  // prepare response
  data = this.head + js + this.foot;

  Polling.prototype.doWrite.call(this, data, options, callback);
};


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * Module dependencies.
 */

var Transport = __webpack_require__(86);
var parser = __webpack_require__(83);
var util = __webpack_require__(60);
var debug = __webpack_require__(5)('engine:ws');

/**
 * Export the constructor.
 */

module.exports = WebSocket;

/**
 * WebSocket transport
 *
 * @param {http.IncomingMessage}
 * @api public
 */

function WebSocket (req) {
  Transport.call(this, req);
  var self = this;
  this.socket = req.websocket;
  this.socket.on('message', this.onData.bind(this));
  this.socket.once('close', this.onClose.bind(this));
  this.socket.on('error', this.onError.bind(this));
  this.socket.on('headers', onHeaders);
  this.writable = true;
  this.perMessageDeflate = null;

  function onHeaders (headers) {
    self.emit('headers', headers);
  }
}

/**
 * Inherits from Transport.
 */

util.inherits(WebSocket, Transport);

/**
 * Transport name
 *
 * @api public
 */

WebSocket.prototype.name = 'websocket';

/**
 * Advertise upgrade support.
 *
 * @api public
 */

WebSocket.prototype.handlesUpgrades = true;

/**
 * Advertise framing support.
 *
 * @api public
 */

WebSocket.prototype.supportsFraming = true;

/**
 * Processes the incoming data.
 *
 * @param {String} encoded packet
 * @api private
 */

WebSocket.prototype.onData = function (data) {
  debug('received "%s"', data);
  Transport.prototype.onData.call(this, data);
};

/**
 * Writes a packet payload.
 *
 * @param {Array} packets
 * @api private
 */

WebSocket.prototype.send = function (packets) {
  var self = this;

  for (var i = 0; i < packets.length; i++) {
    var packet = packets[i];
    parser.encodePacket(packet, self.supportsBinary, send);
  }

  function send (data) {
    debug('writing "%s"', data);

    // always creates a new object since ws modifies it
    var opts = {};
    if (packet.options) {
      opts.compress = packet.options.compress;
    }

    if (self.perMessageDeflate) {
      var len = 'string' === typeof data ? Buffer.byteLength(data) : data.length;
      if (len < self.perMessageDeflate.threshold) {
        opts.compress = false;
      }
    }

    self.writable = false;
    self.socket.send(data, opts, onEnd);
  }

  function onEnd (err) {
    if (err) return self.onError('write error', err.stack);
    self.writable = true;
    self.emit('drain');
  }
};

/**
 * Closes the transport.
 *
 * @api private
 */

WebSocket.prototype.doClose = function (fn) {
  debug('closing');
  this.socket.close();
  fn && fn();
};


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const http = __webpack_require__(9);
const EventEmitter = __webpack_require__(16);
const EE_ERROR = 'Registering more than one listener to a WebSocket is not supported.';
const DEFAULT_PAYLOAD_LIMIT = 16777216;

function noop() {}

function abortConnection(socket, code, name) {
    socket.end('HTTP/1.1 ' + code + ' ' + name + '\r\n\r\n');
}

function emitConnection(ws) {
    this.emit('connection', ws);
}

function onServerMessage(message, webSocket) {
    webSocket.internalOnMessage(message);
}

const native = (() => {
    try {
        try {
            return process.binding('uws_builtin');
        } catch (e) {
            return __webpack_require__(115)(`./uws_${process.platform}_${process.versions.modules}`);
        }
    } catch (e) {
        const version = process.version.substring(1).split('.').map(function(n) {
            return parseInt(n);
        });
        const lessThanSixFour = version[0] < 6 || (version[0] === 6 && version[1] < 4);

        if (process.platform === 'win32' && lessThanSixFour) {
            throw new Error('µWebSockets requires Node.js 6.4.0 or greater on Windows.');
        } else {
            throw new Error('Compilation of µWebSockets has failed and there is no pre-compiled binary ' +
            'available for your system. Please install a supported C++11 compiler and reinstall the module \'uws\'.');
        }
    }
})();

native.setNoop(noop);

var _upgradeReq = null;

const clientGroup = native.client.group.create(0, DEFAULT_PAYLOAD_LIMIT);

native.client.group.onConnection(clientGroup, (external) => {
    const webSocket = native.getUserData(external);
    webSocket.external = external;
    webSocket.internalOnOpen();
});

native.client.group.onMessage(clientGroup, (message, webSocket) => {
    webSocket.internalOnMessage(message);
});

native.client.group.onDisconnection(clientGroup, (external, code, message, webSocket) => {
    webSocket.external = null;

    process.nextTick(() => {
        webSocket.internalOnClose(code, message);
    });

    native.clearUserData(external);
});

native.client.group.onPing(clientGroup, (message, webSocket) => {
    webSocket.onping(message);
});

native.client.group.onPong(clientGroup, (message, webSocket) => {
    webSocket.onpong(message);
});

native.client.group.onError(clientGroup, (webSocket) => {
    process.nextTick(() => {
        webSocket.internalOnError({
            message: 'uWs client connection error',
            stack: 'uWs client connection error'
        });
    });
});

class WebSocket {
    constructor(external) {
        this.external = external;
        this.internalOnMessage = noop;
        this.internalOnClose = noop;
        this.onping = noop;
        this.onpong = noop;
    }

    get upgradeReq() {
        return _upgradeReq;
    }

    set onmessage(f) {
        if (f) {
            this.internalOnMessage = (message) => {
                f({data: message});
            };
        } else {
            this.internalOnMessage = noop;
        }
    }

    set onopen(f) {
        if (f) {
            this.internalOnOpen = f;
        } else {
            this.internalOnOpen = noop;
        }
    }

    set onclose(f) {
        if (f) {
            this.internalOnClose = (code, message) => {
                f({code: code, reason: message});
            };
        } else {
            this.internalOnClose = noop;
        }
    }

    set onerror(f) {
        if (f && this instanceof WebSocketClient) {
            this.internalOnError = f;
        } else {
            this.internalOnError = noop;
        }
    }

    emit(eventName, arg1, arg2) {
        if (eventName === 'message') {
            this.internalOnMessage(arg1);
        } else if (eventName === 'close') {
            this.internalOnClose(arg1, arg2);
        } else if (eventName === 'ping') {
            this.onping(arg1);
        } else if (eventName === 'pong') {
            this.onpong(arg1);
        }
        return this;
    }

    on(eventName, f) {
        if (eventName === 'message') {
            if (this.internalOnMessage !== noop) {
                throw Error(EE_ERROR);
            }
            this.internalOnMessage = f;
        } else if (eventName === 'close') {
            if (this.internalOnClose !== noop) {
                throw Error(EE_ERROR);
            }
            this.internalOnClose = f;
        } else if (eventName === 'ping') {
            if (this.onping !== noop) {
                throw Error(EE_ERROR);
            }
            this.onping = f;
        } else if (eventName === 'pong') {
            if (this.onpong !== noop) {
                throw Error(EE_ERROR);
            }
            this.onpong = f;
        } else if (eventName === 'open') {
            if (this.internalOnOpen !== noop) {
                throw Error(EE_ERROR);
            }
            this.internalOnOpen = f;
        } else if (eventName === 'error' && this instanceof WebSocketClient) {
            if (this.internalOnError !== noop) {
                throw Error(EE_ERROR);
            }
            this.internalOnError = f;
        }
        return this;
    }

    once(eventName, f) {
        if (eventName === 'message') {
            if (this.internalOnMessage !== noop) {
                throw Error(EE_ERROR);
            }
            this.internalOnMessage = (message) => {
                this.internalOnMessage = noop;
                f(message);
            };
        } else if (eventName === 'close') {
            if (this.internalOnClose !== noop) {
                throw Error(EE_ERROR);
            }
            this.internalOnClose = (code, message) => {
                this.internalOnClose = noop;
                f(code, message);
            };
        } else if (eventName === 'ping') {
            if (this.onping !== noop) {
                throw Error(EE_ERROR);
            }
            this.onping = () => {
                this.onping = noop;
                f();
            };
        } else if (eventName === 'pong') {
            if (this.onpong !== noop) {
                throw Error(EE_ERROR);
            }
            this.onpong = () => {
                this.onpong = noop;
                f();
            };
        }
        return this;
    }

    removeAllListeners(eventName) {
        if (!eventName || eventName === 'message') {
            this.internalOnMessage = noop;
        }
        if (!eventName || eventName === 'close') {
            this.internalOnClose = noop;
        }
        if (!eventName || eventName === 'ping') {
            this.onping = noop;
        }
        if (!eventName || eventName === 'pong') {
            this.onpong = noop;
        }
        return this;
    }

    removeListener(eventName, cb) {
        if (eventName === 'message' && this.internalOnMessage === cb) {
            this.internalOnMessage = noop;
        } else if (eventName === 'close' && this.internalOnClose === cb) {
            this.internalOnClose = noop;
        } else if (eventName === 'ping' && this.onping === cb) {
            this.onping = noop;
        } else if (eventName === 'pong' && this.onpong === cb) {
            this.onpong = noop;
        }
        return this;
    }

    get OPEN() {
        return WebSocketClient.OPEN;
    }

    get CLOSED() {
        return WebSocketClient.CLOSED;
    }

    get readyState() {
        return this.external ? WebSocketClient.OPEN : WebSocketClient.CLOSED;
    }

    get _socket() {
        const address = this.external ? native.getAddress(this.external) : new Array(3);
        return {
            remotePort: address[0],
            remoteAddress: address[1],
            remoteFamily: address[2]
        };
    }

    // from here down, functions are not common between client and server

    ping(message, options, dontFailWhenClosed) {
        if (this.external) {
            native.server.send(this.external, message, WebSocketClient.OPCODE_PING);
        }
    }

    terminate() {
        if (this.external) {
            native.server.terminate(this.external);
            this.external = null;
        }
    }

    send(message, options, cb) {
        if (this.external) {
            if (typeof options === 'function') {
                cb = options;
                options = null;
            }

            const binary = options && options.binary || typeof message !== 'string';

            native.server.send(this.external, message, binary ? WebSocketClient.OPCODE_BINARY : WebSocketClient.OPCODE_TEXT, cb ? (() => {
                process.nextTick(cb);
            }) : undefined);
        } else if (cb) {
            cb(new Error('not opened'));
        }
    }

    close(code, data) {
        if (this.external) {
            native.server.close(this.external, code, data);
            this.external = null;
        }
    }
}

class WebSocketClient extends WebSocket {
    constructor(uri) {
        super(null);
        this.internalOnOpen = noop;
        this.internalOnError = noop;
        native.connect(clientGroup, uri, this);
    }

    ping(message, options, dontFailWhenClosed) {
        if (this.external) {
            native.client.send(this.external, message, WebSocketClient.OPCODE_PING);
        }
    }

    terminate() {
        if (this.external) {
            native.client.terminate(this.external);
            this.external = null;
        }
    }

    send(message, options, cb) {
        if (this.external) {
            if (typeof options === 'function') {
                cb = options;
                options = null;
            }

            const binary = options && options.binary || typeof message !== 'string';

            native.client.send(this.external, message, binary ? WebSocketClient.OPCODE_BINARY : WebSocketClient.OPCODE_TEXT, cb ? (() => {
                process.nextTick(cb);
            }) : undefined);
        } else if (cb) {
            cb(new Error('not opened'));
        }
    }

    close(code, data) {
        if (this.external) {
            native.client.close(this.external, code, data);
            this.external = null;
        }
    }
}

class Server extends EventEmitter {
    constructor(options, callback) {
        super();

        if (!options) {
            throw new TypeError('missing options');
        }

        if (options.port === undefined && !options.server && !options.noServer) {
            throw new TypeError('invalid options');
        }

        var nativeOptions = WebSocketClient.PERMESSAGE_DEFLATE;

        if (options.perMessageDeflate !== undefined) {
            if (options.perMessageDeflate === false) {
                nativeOptions = 0;
            }
        }

        this.serverGroup = native.server.group.create(nativeOptions, options.maxPayload === undefined ? DEFAULT_PAYLOAD_LIMIT : options.maxPayload);

        // can these be made private?
        this._upgradeCallback = noop;
        this._upgradeListener = null;
        this._noDelay = options.noDelay === undefined ? true : options.noDelay;
        this._lastUpgradeListener = true;
        this._passedHttpServer = options.server;

        if (!options.noServer) {
            this.httpServer = options.server ? options.server : http.createServer((request, response) => {
                // todo: default HTTP response
                response.end();
            });

            if (options.path && (!options.path.length || options.path[0] !== '/')) {
                options.path = '/' + options.path;
            }

            this.httpServer.on('upgrade', this._upgradeListener = ((request, socket, head) => {
                if (!options.path || options.path == request.url.split('?')[0].split('#')[0]) {
                    if (options.verifyClient) {
                        const info = {
                            origin: request.headers.origin,
                            secure: request.connection.authorized !== undefined || request.connection.encrypted !== undefined,
                            req: request
                        };

                        if (options.verifyClient.length === 2) {
                            options.verifyClient(info, (result, code, name) => {
                                if (result) {
                                    this.handleUpgrade(request, socket, head, emitConnection);
                                } else {
                                    abortConnection(socket, code, name);
                                }
                            });
                        } else {
                            if (options.verifyClient(info)) {
                                this.handleUpgrade(request, socket, head, emitConnection);
                            } else {
                                abortConnection(socket, 400, 'Client verification failed');
                            }
                        }
                    } else {
                        this.handleUpgrade(request, socket, head, emitConnection);
                    }
                } else {
                    if (this._lastUpgradeListener) {
                        abortConnection(socket, 400, 'URL not supported');
                    }
                }
            }));

            this.httpServer.on('newListener', (eventName, listener) => {
                if (eventName === 'upgrade') {
                    this._lastUpgradeListener = false;
                }
            });

            this.httpServer.on('error', (err) => {
                this.emit('error', err);
            });
        }

        native.server.group.onDisconnection(this.serverGroup, (external, code, message, webSocket) => {
            webSocket.external = null;

            process.nextTick(() => {
                webSocket.internalOnClose(code, message);
            });

            native.clearUserData(external);
        });

        native.server.group.onMessage(this.serverGroup, onServerMessage);

        native.server.group.onPing(this.serverGroup, (message, webSocket) => {
            webSocket.onping(message);
        });

        native.server.group.onPong(this.serverGroup, (message, webSocket) => {
            webSocket.onpong(message);
        });

        native.server.group.onConnection(this.serverGroup, (external) => {
            const webSocket = new WebSocket(external);

            native.setUserData(external, webSocket);
            this._upgradeCallback(webSocket);
            _upgradeReq = null;
        });

        if (options.port !== undefined) {
            if (options.host) {
                this.httpServer.listen(options.port, options.host, () => {
                    this.emit('listening');
                    callback && callback();
                });
            } else {
                this.httpServer.listen(options.port, () => {
                    this.emit('listening');
                    callback && callback();
                });
            }
        }
    }

    handleUpgrade(request, socket, upgradeHead, callback) {
        if (socket._isNative) {
            if (this.serverGroup) {
                _upgradeReq = request;
                this._upgradeCallback = callback ? callback : noop;
                native.upgrade(this.serverGroup, socket.external, secKey, request.headers['sec-websocket-extensions'], request.headers['sec-websocket-protocol']);
            }
        } else {
            const secKey = request.headers['sec-websocket-key'];
            const socketHandle = socket.ssl ? socket._parent._handle : socket._handle;
            const sslState = socket.ssl ? socket.ssl._external : null;
            if (socketHandle && secKey && secKey.length == 24) {
                socket.setNoDelay(this._noDelay);
                const ticket = native.transfer(socketHandle.fd === -1 ? socketHandle : socketHandle.fd, sslState);
                socket.on('close', (error) => {
                    if (this.serverGroup) {
                        _upgradeReq = request;
                        this._upgradeCallback = callback ? callback : noop;
                        native.upgrade(this.serverGroup, ticket, secKey, request.headers['sec-websocket-extensions'], request.headers['sec-websocket-protocol']);
                    }
                });
            }
            socket.destroy();
        }
    }

    broadcast(message, options) {
        if (this.serverGroup) {
            native.server.group.broadcast(this.serverGroup, message, options && options.binary || false);
        }
    }

    startAutoPing(interval, userMessage) {
        if (this.serverGroup) {
            native.server.group.startAutoPing(this.serverGroup, interval, userMessage);
        }
    }

    close(cb) {
        if (this._upgradeListener && this.httpServer) {
            this.httpServer.removeListener('upgrade', this._upgradeListener);

            if (!this._passedHttpServer) {
                this.httpServer.close();
            }
        }

        if (this.serverGroup) {
            native.server.group.close(this.serverGroup);
            this.serverGroup = null;
        }

        if (typeof cb === 'function') {
            // compatibility hack, 15 seconds timeout
            setTimeout(cb, 20000);
        }
    }

    get clients() {
        if (this.serverGroup) {
            return {
                length: native.server.group.getSize(this.serverGroup),
                forEach: ((cb) => {native.server.group.forEach(this.serverGroup, cb)})
            };
        }
    }
}

WebSocketClient.PERMESSAGE_DEFLATE = 1;
WebSocketClient.SERVER_NO_CONTEXT_TAKEOVER = 2;
WebSocketClient.CLIENT_NO_CONTEXT_TAKEOVER = 4;
WebSocketClient.OPCODE_TEXT = 1;
WebSocketClient.OPCODE_BINARY = 2;
WebSocketClient.OPCODE_PING = 9;
WebSocketClient.OPEN = 1;
WebSocketClient.CLOSED = 0;
WebSocketClient.Server = Server;
WebSocketClient.http = native.httpServer;
WebSocketClient.native = native;
module.exports = WebSocketClient;


/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./uws_darwin_46.node": 116,
	"./uws_darwin_47.node": 117,
	"./uws_darwin_48.node": 118,
	"./uws_darwin_51.node": 119,
	"./uws_linux_46.node": 120,
	"./uws_linux_47.node": 121,
	"./uws_linux_48.node": 122,
	"./uws_linux_51.node": 123,
	"./uws_win32_48.node": 124,
	"./uws_win32_51.node": 125
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 115;

/***/ }),
/* 116 */
/***/ (function(module, exports) {

throw new Error("Module parse failed: /home/hampus/Programmering/selfpoint/server/node_modules/uws/uws_darwin_46.node Unexpected character '�' (1:0)\nYou may need an appropriate loader to handle this file type.\n(Source code omitted for this binary file)");

/***/ }),
/* 117 */
/***/ (function(module, exports) {

throw new Error("Module parse failed: /home/hampus/Programmering/selfpoint/server/node_modules/uws/uws_darwin_47.node Unexpected character '�' (1:0)\nYou may need an appropriate loader to handle this file type.\n(Source code omitted for this binary file)");

/***/ }),
/* 118 */
/***/ (function(module, exports) {

throw new Error("Module parse failed: /home/hampus/Programmering/selfpoint/server/node_modules/uws/uws_darwin_48.node Unexpected character '�' (1:0)\nYou may need an appropriate loader to handle this file type.\n(Source code omitted for this binary file)");

/***/ }),
/* 119 */
/***/ (function(module, exports) {

throw new Error("Module parse failed: /home/hampus/Programmering/selfpoint/server/node_modules/uws/uws_darwin_51.node Unexpected character '�' (1:0)\nYou may need an appropriate loader to handle this file type.\n(Source code omitted for this binary file)");

/***/ }),
/* 120 */
/***/ (function(module, exports) {

throw new Error("Module parse failed: /home/hampus/Programmering/selfpoint/server/node_modules/uws/uws_linux_46.node Unexpected character '' (1:0)\nYou may need an appropriate loader to handle this file type.\n(Source code omitted for this binary file)");

/***/ }),
/* 121 */
/***/ (function(module, exports) {

throw new Error("Module parse failed: /home/hampus/Programmering/selfpoint/server/node_modules/uws/uws_linux_47.node Unexpected character '' (1:0)\nYou may need an appropriate loader to handle this file type.\n(Source code omitted for this binary file)");

/***/ }),
/* 122 */
/***/ (function(module, exports) {

throw new Error("Module parse failed: /home/hampus/Programmering/selfpoint/server/node_modules/uws/uws_linux_48.node Unexpected character '' (1:0)\nYou may need an appropriate loader to handle this file type.\n(Source code omitted for this binary file)");

/***/ }),
/* 123 */
/***/ (function(module, exports) {

throw new Error("Module parse failed: /home/hampus/Programmering/selfpoint/server/node_modules/uws/uws_linux_51.node Unexpected character '' (1:0)\nYou may need an appropriate loader to handle this file type.\n(Source code omitted for this binary file)");

/***/ }),
/* 124 */
/***/ (function(module, exports) {

throw new Error("Module parse failed: /home/hampus/Programmering/selfpoint/server/node_modules/uws/uws_win32_48.node Unexpected character '�' (1:2)\nYou may need an appropriate loader to handle this file type.\n(Source code omitted for this binary file)");

/***/ }),
/* 125 */
/***/ (function(module, exports) {

throw new Error("Module parse failed: /home/hampus/Programmering/selfpoint/server/node_modules/uws/uws_win32_51.node Unexpected character '�' (1:2)\nYou may need an appropriate loader to handle this file type.\n(Source code omitted for this binary file)");

/***/ }),
/* 126 */
/***/ (function(module, exports) {

module.exports = require("https");

/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Class representing an event.
 *
 * @private
 */
class Event {
  /**
   * Create a new `Event`.
   *
   * @param {String} type The name of the event
   * @param {Object} target A reference to the target to which the event was dispatched
   */
  constructor (type, target) {
    this.target = target;
    this.type = type;
  }
}

/**
 * Class representing a message event.
 *
 * @extends Event
 * @private
 */
class MessageEvent extends Event {
  /**
   * Create a new `MessageEvent`.
   *
   * @param {(String|Buffer|ArrayBuffer|Buffer[])} data The received data
   * @param {Boolean} isBinary Specifies if `data` is binary
   * @param {WebSocket} target A reference to the target to which the event was dispatched
   */
  constructor (data, isBinary, target) {
    super('message', target);

    this.binary = isBinary; // non-standard.
    this.data = data;
  }
}

/**
 * Class representing a close event.
 *
 * @extends Event
 * @private
 */
class CloseEvent extends Event {
  /**
   * Create a new `CloseEvent`.
   *
   * @param {Number} code The status code explaining why the connection is being closed
   * @param {String} reason A human-readable string explaining why the connection is closing
   * @param {WebSocket} target A reference to the target to which the event was dispatched
   */
  constructor (code, reason, target) {
    super('close', target);

    this.wasClean = code === undefined || code === 1000;
    this.reason = reason;
    this.target = target;
    this.type = 'close';
    this.code = code;
  }
}

/**
 * Class representing an open event.
 *
 * @extends Event
 * @private
 */
class OpenEvent extends Event {
  /**
   * Create a new `OpenEvent`.
   *
   * @param {WebSocket} target A reference to the target to which the event was dispatched
   */
  constructor (target) {
    super('open', target);
  }
}

/**
 * This provides methods for emulating the `EventTarget` interface. It's not
 * meant to be used directly.
 *
 * @mixin
 */
const EventTarget = {
  /**
   * Register an event listener.
   *
   * @param {String} method A string representing the event type to listen for
   * @param {Function} listener The listener to add
   * @public
   */
  addEventListener (method, listener) {
    if (typeof listener !== 'function') return;

    function onMessage (data, flags) {
      listener.call(this, new MessageEvent(data, !!flags.binary, this));
    }

    function onClose (code, message) {
      listener.call(this, new CloseEvent(code, message, this));
    }

    function onError (event) {
      event.type = 'error';
      event.target = this;
      listener.call(this, event);
    }

    function onOpen () {
      listener.call(this, new OpenEvent(this));
    }

    if (method === 'message') {
      onMessage._listener = listener;
      this.on(method, onMessage);
    } else if (method === 'close') {
      onClose._listener = listener;
      this.on(method, onClose);
    } else if (method === 'error') {
      onError._listener = listener;
      this.on(method, onError);
    } else if (method === 'open') {
      onOpen._listener = listener;
      this.on(method, onOpen);
    } else {
      this.on(method, listener);
    }
  },

  /**
   * Remove an event listener.
   *
   * @param {String} method A string representing the event type to remove
   * @param {Function} listener The listener to remove
   * @public
   */
  removeEventListener (method, listener) {
    const listeners = this.listeners(method);

    for (var i = 0; i < listeners.length; i++) {
      if (listeners[i] === listener || listeners[i]._listener === listener) {
        this.removeListener(method, listeners[i]);
      }
    }
  }
};

module.exports = EventTarget;


/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * ws: a node.js websocket client
 * Copyright(c) 2011 Einar Otto Stangvik <einaros@gmail.com>
 * MIT Licensed
 */



try {
  const isValidUTF8 = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"utf-8-validate\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

  module.exports = typeof isValidUTF8 === 'object'
    ? isValidUTF8.Validation.isValidUTF8  // utf-8-validate@<3.0.0
    : isValidUTF8;
} catch (e) /* istanbul ignore next */ {
  module.exports = () => true;
}


/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * ws: a node.js websocket client
 * Copyright(c) 2011 Einar Otto Stangvik <einaros@gmail.com>
 * MIT Licensed
 */



const safeBuffer = __webpack_require__(82);
const EventEmitter = __webpack_require__(16);
const crypto = __webpack_require__(32);
const Ultron = __webpack_require__(97);
const http = __webpack_require__(9);
const url = __webpack_require__(20);

const PerMessageDeflate = __webpack_require__(84);
const Extensions = __webpack_require__(98);
const constants = __webpack_require__(88);
const WebSocket = __webpack_require__(96);

const Buffer = safeBuffer.Buffer;

/**
 * Class representing a WebSocket server.
 *
 * @extends EventEmitter
 */
class WebSocketServer extends EventEmitter {
  /**
   * Create a `WebSocketServer` instance.
   *
   * @param {Object} options Configuration options
   * @param {String} options.host The hostname where to bind the server
   * @param {Number} options.port The port where to bind the server
   * @param {http.Server} options.server A pre-created HTTP/S server to use
   * @param {Function} options.verifyClient An hook to reject connections
   * @param {Function} options.handleProtocols An hook to handle protocols
   * @param {String} options.path Accept only connections matching this path
   * @param {Boolean} options.noServer Enable no server mode
   * @param {Boolean} options.clientTracking Specifies whether or not to track clients
   * @param {(Boolean|Object)} options.perMessageDeflate Enable/disable permessage-deflate
   * @param {Number} options.maxPayload The maximum allowed message size
   * @param {Function} callback A listener for the `listening` event
   */
  constructor (options, callback) {
    super();

    options = Object.assign({
      maxPayload: 100 * 1024 * 1024,
      perMessageDeflate: true,
      handleProtocols: null,
      clientTracking: true,
      verifyClient: null,
      noServer: false,
      backlog: null, // use default (511 as implemented in net.js)
      server: null,
      host: null,
      path: null,
      port: null
    }, options);

    if (options.port == null && !options.server && !options.noServer) {
      throw new TypeError('missing or invalid options');
    }

    if (options.port != null) {
      this._server = http.createServer((req, res) => {
        const body = http.STATUS_CODES[426];

        res.writeHead(426, {
          'Content-Length': body.length,
          'Content-Type': 'text/plain'
        });
        res.end(body);
      });
      this._server.allowHalfOpen = false;
      this._server.listen(options.port, options.host, options.backlog, callback);
    } else if (options.server) {
      this._server = options.server;
    }

    if (this._server) {
      this._ultron = new Ultron(this._server);
      this._ultron.on('listening', () => this.emit('listening'));
      this._ultron.on('error', (err) => this.emit('error', err));
      this._ultron.on('upgrade', (req, socket, head) => {
        this.handleUpgrade(req, socket, head, (client) => {
          this.emit(`connection${req.url}`, client);
          this.emit('connection', client);
        });
      });
    }

    if (options.clientTracking) this.clients = new Set();
    this.options = options;
    this.path = options.path;
  }

  /**
   * Close the server.
   *
   * @param {Function} cb Callback
   * @public
   */
  close (cb) {
    //
    // Terminate all associated clients.
    //
    if (this.clients) {
      for (const client of this.clients) client.terminate();
    }

    const server = this._server;

    if (server) {
      this._ultron.destroy();
      this._ultron = this._server = null;

      //
      // Close the http server if it was internally created.
      //
      if (this.options.port != null) return server.close(cb);
    }

    if (cb) cb();
  }

  /**
   * See if a given request should be handled by this server instance.
   *
   * @param {http.IncomingMessage} req Request object to inspect
   * @return {Boolean} `true` if the request is valid, else `false`
   * @public
   */
  shouldHandle (req) {
    if (this.options.path && url.parse(req.url).pathname !== this.options.path) {
      return false;
    }

    return true;
  }

  /**
   * Handle a HTTP Upgrade request.
   *
   * @param {http.IncomingMessage} req The request object
   * @param {net.Socket} socket The network socket between the server and client
   * @param {Buffer} head The first packet of the upgraded stream
   * @param {Function} cb Callback
   * @public
   */
  handleUpgrade (req, socket, head, cb) {
    socket.on('error', socketError);

    const version = +req.headers['sec-websocket-version'];

    if (
      req.method !== 'GET' || req.headers.upgrade.toLowerCase() !== 'websocket' ||
      !req.headers['sec-websocket-key'] || (version !== 8 && version !== 13) ||
      !this.shouldHandle(req)
    ) {
      return abortConnection(socket, 400);
    }

    var protocol = (req.headers['sec-websocket-protocol'] || '').split(/, */);

    //
    // Optionally call external protocol selection handler.
    //
    if (this.options.handleProtocols) {
      protocol = this.options.handleProtocols(protocol, req);
      if (protocol === false) return abortConnection(socket, 401);
    } else {
      protocol = protocol[0];
    }

    //
    // Optionally call external client verification handler.
    //
    if (this.options.verifyClient) {
      const info = {
        origin: req.headers[`${version === 8 ? 'sec-websocket-origin' : 'origin'}`],
        secure: !!(req.connection.authorized || req.connection.encrypted),
        req
      };

      if (this.options.verifyClient.length === 2) {
        this.options.verifyClient(info, (verified, code, message) => {
          if (!verified) return abortConnection(socket, code || 401, message);

          this.completeUpgrade(protocol, version, req, socket, head, cb);
        });
        return;
      } else if (!this.options.verifyClient(info)) {
        return abortConnection(socket, 401);
      }
    }

    this.completeUpgrade(protocol, version, req, socket, head, cb);
  }

  /**
   * Upgrade the connection to WebSocket.
   *
   * @param {String} protocol The chosen subprotocol
   * @param {Number} version The WebSocket protocol version
   * @param {http.IncomingMessage} req The request object
   * @param {net.Socket} socket The network socket between the server and client
   * @param {Buffer} head The first packet of the upgraded stream
   * @param {Function} cb Callback
   * @private
   */
  completeUpgrade (protocol, version, req, socket, head, cb) {
    //
    // Destroy the socket if the client has already sent a FIN packet.
    //
    if (!socket.readable || !socket.writable) return socket.destroy();

    const key = crypto.createHash('sha1')
      .update(req.headers['sec-websocket-key'] + constants.GUID, 'binary')
      .digest('base64');

    const headers = [
      'HTTP/1.1 101 Switching Protocols',
      'Upgrade: websocket',
      'Connection: Upgrade',
      `Sec-WebSocket-Accept: ${key}`
    ];

    if (protocol) headers.push(`Sec-WebSocket-Protocol: ${protocol}`);

    const offer = Extensions.parse(req.headers['sec-websocket-extensions']);
    var extensions;

    try {
      extensions = acceptExtensions(this.options, offer);
    } catch (err) {
      return abortConnection(socket, 400);
    }

    const props = Object.keys(extensions);

    if (props.length) {
      const serverExtensions = props.reduce((obj, key) => {
        obj[key] = [extensions[key].params];
        return obj;
      }, {});

      headers.push(`Sec-WebSocket-Extensions: ${Extensions.format(serverExtensions)}`);
    }

    //
    // Allow external modification/inspection of handshake headers.
    //
    this.emit('headers', headers, req);

    socket.write(headers.concat('', '').join('\r\n'));

    const client = new WebSocket([req, socket, head], null, {
      maxPayload: this.options.maxPayload,
      protocolVersion: version,
      extensions,
      protocol
    });

    if (this.clients) {
      this.clients.add(client);
      client.on('close', () => this.clients.delete(client));
    }

    socket.removeListener('error', socketError);
    cb(client);
  }
}

module.exports = WebSocketServer;

/**
 * Handle premature socket errors.
 *
 * @private
 */
function socketError () {
  this.destroy();
}

/**
 * Accept WebSocket extensions.
 *
 * @param {Object} options The `WebSocketServer` configuration options
 * @param {Object} offer The parsed value of the `sec-websocket-extensions` header
 * @return {Object} Accepted extensions
 * @private
 */
function acceptExtensions (options, offer) {
  const pmd = options.perMessageDeflate;
  const extensions = {};

  if (pmd && offer[PerMessageDeflate.extensionName]) {
    const perMessageDeflate = new PerMessageDeflate(
      pmd !== true ? pmd : {},
      true,
      options.maxPayload
    );

    perMessageDeflate.accept(offer[PerMessageDeflate.extensionName]);
    extensions[PerMessageDeflate.extensionName] = perMessageDeflate;
  }

  return extensions;
}

/**
 * Close the connection when preconditions are not fulfilled.
 *
 * @param {net.Socket} socket The socket of the upgrade request
 * @param {Number} code The HTTP response status code
 * @param {String} [message] The HTTP response body
 * @private
 */
function abortConnection (socket, code, message) {
  if (socket.writable) {
    message = message || http.STATUS_CODES[code];
    socket.write(
      `HTTP/1.1 ${code} ${http.STATUS_CODES[code]}\r\n` +
      'Connection: close\r\n' +
      'Content-type: text/html\r\n' +
      `Content-Length: ${Buffer.byteLength(message)}\r\n` +
      '\r\n' +
      message
    );
  }

  socket.removeListener('error', socketError);
  socket.destroy();
}


/***/ }),
/* 130 */
/***/ (function(module, exports) {

module.exports = {"_args":[[{"raw":"socket.io-client@~2.0.2","scope":null,"escapedName":"socket.io-client","name":"socket.io-client","rawSpec":"~2.0.2","spec":">=2.0.2 <2.1.0","type":"range"},"/home/hampus/Programmering/selfpoint/server/node_modules/socket.io"]],"_from":"socket.io-client@>=2.0.2 <2.1.0","_id":"socket.io-client@2.0.3","_inCache":true,"_location":"/socket.io-client","_nodeVersion":"6.9.4","_npmOperationalInternal":{"host":"s3://npm-registry-packages","tmp":"tmp/socket.io-client-2.0.3.tgz_1497269241170_0.7307047063950449"},"_npmUser":{"name":"darrachequesne","email":"damien.arrachequesne@gmail.com"},"_npmVersion":"3.10.10","_phantomChildren":{},"_requested":{"raw":"socket.io-client@~2.0.2","scope":null,"escapedName":"socket.io-client","name":"socket.io-client","rawSpec":"~2.0.2","spec":">=2.0.2 <2.1.0","type":"range"},"_requiredBy":["/socket.io"],"_resolved":"https://registry.npmjs.org/socket.io-client/-/socket.io-client-2.0.3.tgz","_shasum":"6caf4aff9f85b19fd91b6ce13d69adb564f8873b","_shrinkwrap":null,"_spec":"socket.io-client@~2.0.2","_where":"/home/hampus/Programmering/selfpoint/server/node_modules/socket.io","bugs":{"url":"https://github.com/Automattic/socket.io-client/issues"},"contributors":[{"name":"Guillermo Rauch","email":"rauchg@gmail.com"},{"name":"Arnout Kazemier","email":"info@3rd-eden.com"},{"name":"Vladimir Dronnikov","email":"dronnikov@gmail.com"},{"name":"Einar Otto Stangvik","email":"einaros@gmail.com"}],"dependencies":{"backo2":"1.0.2","base64-arraybuffer":"0.1.5","component-bind":"1.0.0","component-emitter":"1.2.1","debug":"~2.6.4","engine.io-client":"~3.1.0","has-cors":"1.1.0","indexof":"0.0.1","object-component":"0.0.3","parseqs":"0.0.5","parseuri":"0.0.5","socket.io-parser":"~3.1.1","to-array":"0.1.4"},"description":"[![Build Status](https://secure.travis-ci.org/socketio/socket.io-client.svg?branch=master)](http://travis-ci.org/socketio/socket.io-client) [![Dependency Status](https://david-dm.org/socketio/socket.io-client.svg)](https://david-dm.org/socketio/socket.io-","devDependencies":{"babel-core":"^6.24.1","babel-eslint":"4.1.7","babel-loader":"7.0.0","babel-preset-es2015":"6.24.1","concat-stream":"^1.6.0","derequire":"^2.0.6","eslint-config-standard":"4.4.0","eslint-plugin-standard":"1.3.1","expect.js":"0.3.1","gulp":"^3.9.1","gulp-eslint":"1.1.1","gulp-file":"^0.3.0","gulp-istanbul":"^1.1.1","gulp-mocha":"^4.3.1","gulp-task-listing":"1.0.1","imports-loader":"^0.7.1","istanbul":"^0.4.5","mocha":"^3.3.0","socket.io":"^2.0.2","strip-loader":"0.1.2","text-blob-builder":"0.0.1","webpack-stream":"3.2.0","zuul":"^3.11.1  ","zuul-builder-webpack":"^1.2.0","zuul-ngrok":"4.0.0"},"directories":{},"dist":{"shasum":"6caf4aff9f85b19fd91b6ce13d69adb564f8873b","tarball":"https://registry.npmjs.org/socket.io-client/-/socket.io-client-2.0.3.tgz"},"files":["lib/","dist/"],"gitHead":"19f2b1990079f7bc206186490fffd8fda1a01e8c","homepage":"https://github.com/Automattic/socket.io-client#readme","keywords":["realtime","framework","websocket","tcp","events","client"],"license":"MIT","main":"./lib/index","maintainers":[{"name":"darrachequesne","email":"damien.arrachequesne@gmail.com"},{"name":"rauchg","email":"rauchg@gmail.com"}],"name":"socket.io-client","optionalDependencies":{},"readme":"ERROR: No README data found!","repository":{"type":"git","url":"git+https://github.com/Automattic/socket.io-client.git"},"scripts":{"test":"gulp test"},"version":"2.0.3"}

/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * Module dependencies.
 */

var parser = __webpack_require__(85);
var debug = __webpack_require__(5)('socket.io:client');
var url = __webpack_require__(20);

/**
 * Module exports.
 */

module.exports = Client;

/**
 * Client constructor.
 *
 * @param {Server} server instance
 * @param {Socket} conn
 * @api private
 */

function Client(server, conn){
  this.server = server;
  this.conn = conn;
  this.encoder = server.encoder;
  this.decoder = new server.parser.Decoder();
  this.id = conn.id;
  this.request = conn.request;
  this.setup();
  this.sockets = {};
  this.nsps = {};
  this.connectBuffer = [];
}

/**
 * Sets up event listeners.
 *
 * @api private
 */

Client.prototype.setup = function(){
  this.onclose = this.onclose.bind(this);
  this.ondata = this.ondata.bind(this);
  this.onerror = this.onerror.bind(this);
  this.ondecoded = this.ondecoded.bind(this);

  this.decoder.on('decoded', this.ondecoded);
  this.conn.on('data', this.ondata);
  this.conn.on('error', this.onerror);
  this.conn.on('close', this.onclose);
};

/**
 * Connects a client to a namespace.
 *
 * @param {String} name namespace
 * @api private
 */

Client.prototype.connect = function(name, query){
  debug('connecting to namespace %s', name);
  var nsp = this.server.nsps[name];
  if (!nsp) {
    this.packet({ type: parser.ERROR, nsp: name, data : 'Invalid namespace'});
    return;
  }

  if ('/' != name && !this.nsps['/']) {
    this.connectBuffer.push(name);
    return;
  }

  var self = this;
  var socket = nsp.add(this, query, function(){
    self.sockets[socket.id] = socket;
    self.nsps[nsp.name] = socket;

    if ('/' == nsp.name && self.connectBuffer.length > 0) {
      self.connectBuffer.forEach(self.connect, self);
      self.connectBuffer = [];
    }
  });
};

/**
 * Disconnects from all namespaces and closes transport.
 *
 * @api private
 */

Client.prototype.disconnect = function(){
  for (var id in this.sockets) {
    if (this.sockets.hasOwnProperty(id)) {
      this.sockets[id].disconnect();
    }
  }
  this.sockets = {};
  this.close();
};

/**
 * Removes a socket. Called by each `Socket`.
 *
 * @api private
 */

Client.prototype.remove = function(socket){
  if (this.sockets.hasOwnProperty(socket.id)) {
    var nsp = this.sockets[socket.id].nsp.name;
    delete this.sockets[socket.id];
    delete this.nsps[nsp];
  } else {
    debug('ignoring remove for %s', socket.id);
  }
};

/**
 * Closes the underlying connection.
 *
 * @api private
 */

Client.prototype.close = function(){
  if ('open' == this.conn.readyState) {
    debug('forcing transport close');
    this.conn.close();
    this.onclose('forced server close');
  }
};

/**
 * Writes a packet to the transport.
 *
 * @param {Object} packet object
 * @param {Object} opts
 * @api private
 */

Client.prototype.packet = function(packet, opts){
  opts = opts || {};
  var self = this;

  // this writes to the actual connection
  function writeToEngine(encodedPackets) {
    if (opts.volatile && !self.conn.transport.writable) return;
    for (var i = 0; i < encodedPackets.length; i++) {
      self.conn.write(encodedPackets[i], { compress: opts.compress });
    }
  }

  if ('open' == this.conn.readyState) {
    debug('writing packet %j', packet);
    if (!opts.preEncoded) { // not broadcasting, need to encode
      this.encoder.encode(packet, writeToEngine); // encode, then write results to engine
    } else { // a broadcast pre-encodes a packet
      writeToEngine(packet);
    }
  } else {
    debug('ignoring packet write %j', packet);
  }
};

/**
 * Called with incoming transport data.
 *
 * @api private
 */

Client.prototype.ondata = function(data){
  // try/catch is needed for protocol violations (GH-1880)
  try {
    this.decoder.add(data);
  } catch(e) {
    this.onerror(e);
  }
};

/**
 * Called when parser fully decodes a packet.
 *
 * @api private
 */

Client.prototype.ondecoded = function(packet) {
  if (parser.CONNECT == packet.type) {
    this.connect(url.parse(packet.nsp).pathname, url.parse(packet.nsp, true).query);
  } else {
    var socket = this.nsps[packet.nsp];
    if (socket) {
      process.nextTick(function() {
        socket.onpacket(packet);
      });
    } else {
      debug('no socket for namespace %s', packet.nsp);
    }
  }
};

/**
 * Handles an error.
 *
 * @param {Object} err object
 * @api private
 */

Client.prototype.onerror = function(err){
  for (var id in this.sockets) {
    if (this.sockets.hasOwnProperty(id)) {
      this.sockets[id].onerror(err);
    }
  }
  this.conn.close();
};

/**
 * Called upon transport close.
 *
 * @param {String} reason
 * @api private
 */

Client.prototype.onclose = function(reason){
  debug('client close with reason %s', reason);

  // ignore a potential subsequent `close` event
  this.destroy();

  // `nsps` and `sockets` are cleaned up seamlessly
  for (var id in this.sockets) {
    if (this.sockets.hasOwnProperty(id)) {
      this.sockets[id].onclose(reason);
    }
  }
  this.sockets = {};

  this.decoder.destroy(); // clean up decoder
};

/**
 * Cleans up event listeners.
 *
 * @api private
 */

Client.prototype.destroy = function(){
  this.conn.removeListener('data', this.ondata);
  this.conn.removeListener('error', this.onerror);
  this.conn.removeListener('close', this.onclose);
  this.decoder.removeListener('decoded', this.ondecoded);
};


/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * Expose `Emitter`.
 */

if (true) {
  module.exports = Emitter;
}

/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */

function Emitter(obj) {
  if (obj) return mixin(obj);
};

/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}

/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.on =
Emitter.prototype.addEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};
  (this._callbacks['$' + event] = this._callbacks['$' + event] || [])
    .push(fn);
  return this;
};

/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.once = function(event, fn){
  function on() {
    this.off(event, on);
    fn.apply(this, arguments);
  }

  on.fn = fn;
  this.on(event, on);
  return this;
};

/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.off =
Emitter.prototype.removeListener =
Emitter.prototype.removeAllListeners =
Emitter.prototype.removeEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};

  // all
  if (0 == arguments.length) {
    this._callbacks = {};
    return this;
  }

  // specific event
  var callbacks = this._callbacks['$' + event];
  if (!callbacks) return this;

  // remove all handlers
  if (1 == arguments.length) {
    delete this._callbacks['$' + event];
    return this;
  }

  // remove specific handler
  var cb;
  for (var i = 0; i < callbacks.length; i++) {
    cb = callbacks[i];
    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i, 1);
      break;
    }
  }
  return this;
};

/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */

Emitter.prototype.emit = function(event){
  this._callbacks = this._callbacks || {};
  var args = [].slice.call(arguments, 1)
    , callbacks = this._callbacks['$' + event];

  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args);
    }
  }

  return this;
};

/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */

Emitter.prototype.listeners = function(event){
  this._callbacks = this._callbacks || {};
  return this._callbacks['$' + event] || [];
};

/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */

Emitter.prototype.hasListeners = function(event){
  return !! this.listeners(event).length;
};


/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

/*global Blob,File*/

/**
 * Module requirements
 */

var isArray = __webpack_require__(92);
var isBuf = __webpack_require__(102);
var toString = Object.prototype.toString;
var withNativeBlob = typeof global.Blob === 'function' || toString.call(global.Blob) === '[object BlobConstructor]';
var withNativeFile = typeof global.File === 'function' || toString.call(global.File) === '[object FileConstructor]';

/**
 * Replaces every Buffer | ArrayBuffer in packet with a numbered placeholder.
 * Anything with blobs or files should be fed through removeBlobs before coming
 * here.
 *
 * @param {Object} packet - socket.io event packet
 * @return {Object} with deconstructed packet and list of buffers
 * @api public
 */

exports.deconstructPacket = function(packet) {
  var buffers = [];
  var packetData = packet.data;
  var pack = packet;
  pack.data = _deconstructPacket(packetData, buffers);
  pack.attachments = buffers.length; // number of binary 'attachments'
  return {packet: pack, buffers: buffers};
};

function _deconstructPacket(data, buffers) {
  if (!data) return data;

  if (isBuf(data)) {
    var placeholder = { _placeholder: true, num: buffers.length };
    buffers.push(data);
    return placeholder;
  } else if (isArray(data)) {
    var newData = new Array(data.length);
    for (var i = 0; i < data.length; i++) {
      newData[i] = _deconstructPacket(data[i], buffers);
    }
    return newData;
  } else if (typeof data === 'object' && !(data instanceof Date)) {
    var newData = {};
    for (var key in data) {
      newData[key] = _deconstructPacket(data[key], buffers);
    }
    return newData;
  }
  return data;
}

/**
 * Reconstructs a binary packet from its placeholder packet and buffers
 *
 * @param {Object} packet - event packet with placeholders
 * @param {Array} buffers - binary buffers to put in placeholder positions
 * @return {Object} reconstructed packet
 * @api public
 */

exports.reconstructPacket = function(packet, buffers) {
  packet.data = _reconstructPacket(packet.data, buffers);
  packet.attachments = undefined; // no longer useful
  return packet;
};

function _reconstructPacket(data, buffers) {
  if (!data) return data;

  if (data && data._placeholder) {
    return buffers[data.num]; // appropriate buffer (should be natural order anyway)
  } else if (isArray(data)) {
    for (var i = 0; i < data.length; i++) {
      data[i] = _reconstructPacket(data[i], buffers);
    }
  } else if (typeof data === 'object') {
    for (var key in data) {
      data[key] = _reconstructPacket(data[key], buffers);
    }
  }

  return data;
}

/**
 * Asynchronously removes Blobs or Files from data via
 * FileReader's readAsArrayBuffer method. Used before encoding
 * data as msgpack. Calls callback with the blobless data.
 *
 * @param {Object} data
 * @param {Function} callback
 * @api private
 */

exports.removeBlobs = function(data, callback) {
  function _removeBlobs(obj, curKey, containingObject) {
    if (!obj) return obj;

    // convert any blob
    if ((withNativeBlob && obj instanceof Blob) ||
        (withNativeFile && obj instanceof File)) {
      pendingBlobs++;

      // async filereader
      var fileReader = new FileReader();
      fileReader.onload = function() { // this.result == arraybuffer
        if (containingObject) {
          containingObject[curKey] = this.result;
        }
        else {
          bloblessData = this.result;
        }

        // if nothing pending its callback time
        if(! --pendingBlobs) {
          callback(bloblessData);
        }
      };

      fileReader.readAsArrayBuffer(obj); // blob -> arraybuffer
    } else if (isArray(obj)) { // handle array
      for (var i = 0; i < obj.length; i++) {
        _removeBlobs(obj[i], i, obj);
      }
    } else if (typeof obj === 'object' && !isBuf(obj)) { // and object
      for (var key in obj) {
        _removeBlobs(obj[key], key, obj);
      }
    }
  }

  var pendingBlobs = 0;
  var bloblessData = data;
  _removeBlobs(bloblessData);
  if (!pendingBlobs) {
    callback(bloblessData);
  }
};


/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * Module dependencies.
 */

var Socket = __webpack_require__(135);
var Emitter = __webpack_require__(16).EventEmitter;
var parser = __webpack_require__(85);
var debug = __webpack_require__(5)('socket.io:namespace');

/**
 * Module exports.
 */

module.exports = exports = Namespace;

/**
 * Blacklisted events.
 */

exports.events = [
  'connect',    // for symmetry with client
  'connection',
  'newListener'
];

/**
 * Flags.
 */

exports.flags = [
  'json',
  'volatile',
  'local'
];

/**
 * `EventEmitter#emit` reference.
 */

var emit = Emitter.prototype.emit;

/**
 * Namespace constructor.
 *
 * @param {Server} server instance
 * @param {Socket} name
 * @api private
 */

function Namespace(server, name){
  this.name = name;
  this.server = server;
  this.sockets = {};
  this.connected = {};
  this.fns = [];
  this.ids = 0;
  this.rooms = [];
  this.flags = {};
  this.initAdapter();
}

/**
 * Inherits from `EventEmitter`.
 */

Namespace.prototype.__proto__ = Emitter.prototype;

/**
 * Apply flags from `Socket`.
 */

exports.flags.forEach(function(flag){
  Object.defineProperty(Namespace.prototype, flag, {
    get: function() {
      this.flags[flag] = true;
      return this;
    }
  });
});

/**
 * Initializes the `Adapter` for this nsp.
 * Run upon changing adapter by `Server#adapter`
 * in addition to the constructor.
 *
 * @api private
 */

Namespace.prototype.initAdapter = function(){
  this.adapter = new (this.server.adapter())(this);
};

/**
 * Sets up namespace middleware.
 *
 * @return {Namespace} self
 * @api public
 */

Namespace.prototype.use = function(fn){
  if (this.server.eio) {
    debug('removing initial packet');
    delete this.server.eio.initialPacket;
  }
  this.fns.push(fn);
  return this;
};

/**
 * Executes the middleware for an incoming client.
 *
 * @param {Socket} socket that will get added
 * @param {Function} fn last fn call in the middleware
 * @api private
 */

Namespace.prototype.run = function(socket, fn){
  var fns = this.fns.slice(0);
  if (!fns.length) return fn(null);

  function run(i){
    fns[i](socket, function(err){
      // upon error, short-circuit
      if (err) return fn(err);

      // if no middleware left, summon callback
      if (!fns[i + 1]) return fn(null);

      // go on to next
      run(i + 1);
    });
  }

  run(0);
};

/**
 * Targets a room when emitting.
 *
 * @param {String} name
 * @return {Namespace} self
 * @api public
 */

Namespace.prototype.to =
Namespace.prototype.in = function(name){
  if (!~this.rooms.indexOf(name)) this.rooms.push(name);
  return this;
};

/**
 * Adds a new client.
 *
 * @return {Socket}
 * @api private
 */

Namespace.prototype.add = function(client, query, fn){
  debug('adding socket to nsp %s', this.name);
  var socket = new Socket(this, client, query);
  var self = this;
  this.run(socket, function(err){
    process.nextTick(function(){
      if ('open' == client.conn.readyState) {
        if (err) return socket.error(err.data || err.message);

        // track socket
        self.sockets[socket.id] = socket;

        // it's paramount that the internal `onconnect` logic
        // fires before user-set events to prevent state order
        // violations (such as a disconnection before the connection
        // logic is complete)
        socket.onconnect();
        if (fn) fn();

        // fire user-set events
        self.emit('connect', socket);
        self.emit('connection', socket);
      } else {
        debug('next called after client was closed - ignoring socket');
      }
    });
  });
  return socket;
};

/**
 * Removes a client. Called by each `Socket`.
 *
 * @api private
 */

Namespace.prototype.remove = function(socket){
  if (this.sockets.hasOwnProperty(socket.id)) {
    delete this.sockets[socket.id];
  } else {
    debug('ignoring remove for %s', socket.id);
  }
};

/**
 * Emits to all clients.
 *
 * @return {Namespace} self
 * @api public
 */

Namespace.prototype.emit = function(ev){
  if (~exports.events.indexOf(ev)) {
    emit.apply(this, arguments);
  } else {
    // set up packet object
    var args = Array.prototype.slice.call(arguments);
    var packet = { type: parser.EVENT, data: args };

    if ('function' == typeof args[args.length - 1]) {
      throw new Error('Callbacks are not supported when broadcasting');
    }

    this.adapter.broadcast(packet, {
      rooms: this.rooms,
      flags: this.flags
    });

    this.rooms = [];
    this.flags = {};
  }
  return this;
};

/**
 * Sends a `message` event to all clients.
 *
 * @return {Namespace} self
 * @api public
 */

Namespace.prototype.send =
Namespace.prototype.write = function(){
  var args = Array.prototype.slice.call(arguments);
  args.unshift('message');
  this.emit.apply(this, args);
  return this;
};

/**
 * Gets a list of clients.
 *
 * @return {Namespace} self
 * @api public
 */

Namespace.prototype.clients = function(fn){
  this.adapter.clients(this.rooms, fn);
  // reset rooms for scenario:
  // .in('room').clients() (GH-1978)
  this.rooms = [];
  return this;
};

/**
 * Sets the compress flag.
 *
 * @param {Boolean} compress if `true`, compresses the sending data
 * @return {Socket} self
 * @api public
 */

Namespace.prototype.compress = function(compress){
  this.flags.compress = compress;
  return this;
};


/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * Module dependencies.
 */

var Emitter = __webpack_require__(16).EventEmitter;
var parser = __webpack_require__(85);
var url = __webpack_require__(20);
var debug = __webpack_require__(5)('socket.io:socket');
var assign = __webpack_require__(136);

/**
 * Module exports.
 */

module.exports = exports = Socket;

/**
 * Blacklisted events.
 *
 * @api public
 */

exports.events = [
  'error',
  'connect',
  'disconnect',
  'disconnecting',
  'newListener',
  'removeListener'
];

/**
 * Flags.
 *
 * @api private
 */

var flags = [
  'json',
  'volatile',
  'broadcast'
];

/**
 * `EventEmitter#emit` reference.
 */

var emit = Emitter.prototype.emit;

/**
 * Interface to a `Client` for a given `Namespace`.
 *
 * @param {Namespace} nsp
 * @param {Client} client
 * @api public
 */

function Socket(nsp, client, query){
  this.nsp = nsp;
  this.server = nsp.server;
  this.adapter = this.nsp.adapter;
  this.id = nsp.name !== '/' ? nsp.name + '#' + client.id : client.id;
  this.client = client;
  this.conn = client.conn;
  this.rooms = {};
  this.acks = {};
  this.connected = true;
  this.disconnected = false;
  this.handshake = this.buildHandshake(query);
  this.fns = [];
  this.flags = {};
  this._rooms = [];
}

/**
 * Inherits from `EventEmitter`.
 */

Socket.prototype.__proto__ = Emitter.prototype;

/**
 * Apply flags from `Socket`.
 */

flags.forEach(function(flag){
  Object.defineProperty(Socket.prototype, flag, {
    get: function() {
      this.flags[flag] = true;
      return this;
    }
  });
});

/**
 * `request` engine.io shortcut.
 *
 * @api public
 */

Object.defineProperty(Socket.prototype, 'request', {
  get: function() {
    return this.conn.request;
  }
});

/**
 * Builds the `handshake` BC object
 *
 * @api private
 */

Socket.prototype.buildHandshake = function(query){
  var self = this;
  function buildQuery(){
    var requestQuery = url.parse(self.request.url, true).query;
    //if socket-specific query exist, replace query strings in requestQuery
    return assign({}, query, requestQuery);
  }
  return {
    headers: this.request.headers,
    time: (new Date) + '',
    address: this.conn.remoteAddress,
    xdomain: !!this.request.headers.origin,
    secure: !!this.request.connection.encrypted,
    issued: +(new Date),
    url: this.request.url,
    query: buildQuery()
  };
};

/**
 * Emits to this client.
 *
 * @return {Socket} self
 * @api public
 */

Socket.prototype.emit = function(ev){
  if (~exports.events.indexOf(ev)) {
    emit.apply(this, arguments);
    return this;
  }

  var args = Array.prototype.slice.call(arguments);
  var packet = {
    type: parser.EVENT,
    data: args
  };

  // access last argument to see if it's an ACK callback
  if (typeof args[args.length - 1] === 'function') {
    if (this._rooms.length || this.flags.broadcast) {
      throw new Error('Callbacks are not supported when broadcasting');
    }

    debug('emitting packet with ack id %d', this.nsp.ids);
    this.acks[this.nsp.ids] = args.pop();
    packet.id = this.nsp.ids++;
  }

  var rooms = this._rooms.slice(0);
  var flags = assign({}, this.flags);

  // reset flags
  this._rooms = [];
  this.flags = {};

  if (rooms.length || flags.broadcast) {
    this.adapter.broadcast(packet, {
      except: [this.id],
      rooms: rooms,
      flags: flags
    });
  } else {
    // dispatch packet
    this.packet(packet, flags);
  }
  return this;
};

/**
 * Targets a room when broadcasting.
 *
 * @param {String} name
 * @return {Socket} self
 * @api public
 */

Socket.prototype.to =
Socket.prototype.in = function(name){
  if (!~this._rooms.indexOf(name)) this._rooms.push(name);
  return this;
};

/**
 * Sends a `message` event.
 *
 * @return {Socket} self
 * @api public
 */

Socket.prototype.send =
Socket.prototype.write = function(){
  var args = Array.prototype.slice.call(arguments);
  args.unshift('message');
  this.emit.apply(this, args);
  return this;
};

/**
 * Writes a packet.
 *
 * @param {Object} packet object
 * @param {Object} opts options
 * @api private
 */

Socket.prototype.packet = function(packet, opts){
  packet.nsp = this.nsp.name;
  opts = opts || {};
  opts.compress = false !== opts.compress;
  this.client.packet(packet, opts);
};

/**
 * Joins a room.
 *
 * @param {String|Array} room or array of rooms
 * @param {Function} fn optional, callback
 * @return {Socket} self
 * @api private
 */

Socket.prototype.join = function(rooms, fn){
  debug('joining room %s', rooms);
  var self = this;
  if (!Array.isArray(rooms)) {
    rooms = [rooms];
  }
  rooms = rooms.filter(function (room) {
    return !self.rooms.hasOwnProperty(room);
  });
  if (!rooms.length) {
    fn && fn(null);
    return this;
  }
  this.adapter.addAll(this.id, rooms, function(err){
    if (err) return fn && fn(err);
    debug('joined room %s', rooms);
    rooms.forEach(function (room) {
      self.rooms[room] = room;
    });
    fn && fn(null);
  });
  return this;
};

/**
 * Leaves a room.
 *
 * @param {String} room
 * @param {Function} fn optional, callback
 * @return {Socket} self
 * @api private
 */

Socket.prototype.leave = function(room, fn){
  debug('leave room %s', room);
  var self = this;
  this.adapter.del(this.id, room, function(err){
    if (err) return fn && fn(err);
    debug('left room %s', room);
    delete self.rooms[room];
    fn && fn(null);
  });
  return this;
};

/**
 * Leave all rooms.
 *
 * @api private
 */

Socket.prototype.leaveAll = function(){
  this.adapter.delAll(this.id);
  this.rooms = {};
};

/**
 * Called by `Namespace` upon successful
 * middleware execution (ie: authorization).
 * Socket is added to namespace array before
 * call to join, so adapters can access it.
 *
 * @api private
 */

Socket.prototype.onconnect = function(){
  debug('socket connected - writing packet');
  this.nsp.connected[this.id] = this;
  this.join(this.id);
  var skip = this.nsp.name === '/' && this.nsp.fns.length === 0;
  if (skip) {
    debug('packet already sent in initial handshake');
  } else {
    this.packet({ type: parser.CONNECT });
  }
};

/**
 * Called with each packet. Called by `Client`.
 *
 * @param {Object} packet
 * @api private
 */

Socket.prototype.onpacket = function(packet){
  debug('got packet %j', packet);
  switch (packet.type) {
    case parser.EVENT:
      this.onevent(packet);
      break;

    case parser.BINARY_EVENT:
      this.onevent(packet);
      break;

    case parser.ACK:
      this.onack(packet);
      break;

    case parser.BINARY_ACK:
      this.onack(packet);
      break;

    case parser.DISCONNECT:
      this.ondisconnect();
      break;

    case parser.ERROR:
      this.emit('error', packet.data);
  }
};

/**
 * Called upon event packet.
 *
 * @param {Object} packet object
 * @api private
 */

Socket.prototype.onevent = function(packet){
  var args = packet.data || [];
  debug('emitting event %j', args);

  if (null != packet.id) {
    debug('attaching ack callback to event');
    args.push(this.ack(packet.id));
  }

  this.dispatch(args);
};

/**
 * Produces an ack callback to emit with an event.
 *
 * @param {Number} id packet id
 * @api private
 */

Socket.prototype.ack = function(id){
  var self = this;
  var sent = false;
  return function(){
    // prevent double callbacks
    if (sent) return;
    var args = Array.prototype.slice.call(arguments);
    debug('sending ack %j', args);

    self.packet({
      id: id,
      type: parser.ACK,
      data: args
    });

    sent = true;
  };
};

/**
 * Called upon ack packet.
 *
 * @api private
 */

Socket.prototype.onack = function(packet){
  var ack = this.acks[packet.id];
  if ('function' == typeof ack) {
    debug('calling ack %s with %j', packet.id, packet.data);
    ack.apply(this, packet.data);
    delete this.acks[packet.id];
  } else {
    debug('bad ack %s', packet.id);
  }
};

/**
 * Called upon client disconnect packet.
 *
 * @api private
 */

Socket.prototype.ondisconnect = function(){
  debug('got disconnect packet');
  this.onclose('client namespace disconnect');
};

/**
 * Handles a client error.
 *
 * @api private
 */

Socket.prototype.onerror = function(err){
  if (this.listeners('error').length) {
    this.emit('error', err);
  } else {
    console.error('Missing error handler on `socket`.');
    console.error(err.stack);
  }
};

/**
 * Called upon closing. Called by `Client`.
 *
 * @param {String} reason
 * @throw {Error} optional error object
 * @api private
 */

Socket.prototype.onclose = function(reason){
  if (!this.connected) return this;
  debug('closing socket - reason %s', reason);
  this.emit('disconnecting', reason);
  this.leaveAll();
  this.nsp.remove(this);
  this.client.remove(this);
  this.connected = false;
  this.disconnected = true;
  delete this.nsp.connected[this.id];
  this.emit('disconnect', reason);
};

/**
 * Produces an `error` packet.
 *
 * @param {Object} err error object
 * @api private
 */

Socket.prototype.error = function(err){
  this.packet({ type: parser.ERROR, data: err });
};

/**
 * Disconnects this client.
 *
 * @param {Boolean} close if `true`, closes the underlying connection
 * @return {Socket} self
 * @api public
 */

Socket.prototype.disconnect = function(close){
  if (!this.connected) return this;
  if (close) {
    this.client.disconnect();
  } else {
    this.packet({ type: parser.DISCONNECT });
    this.onclose('server namespace disconnect');
  }
  return this;
};

/**
 * Sets the compress flag.
 *
 * @param {Boolean} compress if `true`, compresses the sending data
 * @return {Socket} self
 * @api public
 */

Socket.prototype.compress = function(compress){
  this.flags.compress = compress;
  return this;
};

/**
 * Dispatch incoming event to socket listeners.
 *
 * @param {Array} event that will get emitted
 * @api private
 */

Socket.prototype.dispatch = function(event){
  debug('dispatching an event %j', event);
  var self = this;
  function dispatchSocket(err) {
    process.nextTick(function(){
      if (err) {
        return self.error(err.data || err.message);
      }
      emit.apply(self, event);
    });
  }
  this.run(event, dispatchSocket);
};

/**
 * Sets up socket middleware.
 *
 * @param {Function} middleware function (event, next)
 * @return {Socket} self
 * @api public
 */

Socket.prototype.use = function(fn){
  this.fns.push(fn);
  return this;
};

/**
 * Executes the middleware for an incoming event.
 *
 * @param {Array} event that will get emitted
 * @param {Function} last fn call in the middleware
 * @api private
 */
Socket.prototype.run = function(event, fn){
  var fns = this.fns.slice(0);
  if (!fns.length) return fn(null);

  function run(i){
    fns[i](event, function(err){
      // upon error, short-circuit
      if (err) return fn(err);

      // if no middleware left, summon callback
      if (!fns[i + 1]) return fn(null);

      // go on to next
      run(i + 1);
    });
  }

  run(0);
};


/***/ }),
/* 136 */
/***/ (function(module, exports) {

module.exports = require("object-assign");

/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * Module dependencies.
 */

var Emitter = __webpack_require__(16).EventEmitter;

/**
 * Module exports.
 */

module.exports = Adapter;

/**
 * Memory adapter constructor.
 *
 * @param {Namespace} nsp
 * @api public
 */

function Adapter(nsp){
  this.nsp = nsp;
  this.rooms = {};
  this.sids = {};
  this.encoder = nsp.server.encoder;
}

/**
 * Inherits from `EventEmitter`.
 */

Adapter.prototype.__proto__ = Emitter.prototype;

/**
 * Adds a socket to a room.
 *
 * @param {String} socket id
 * @param {String} room name
 * @param {Function} callback
 * @api public
 */

Adapter.prototype.add = function(id, room, fn){
  return this.addAll(id, [ room ], fn);
};

/**
 * Adds a socket to a list of room.
 *
 * @param {String} socket id
 * @param {String} rooms
 * @param {Function} callback
 * @api public
 */

Adapter.prototype.addAll = function(id, rooms, fn){
  for (var i = 0; i < rooms.length; i++) {
    var room = rooms[i];
    this.sids[id] = this.sids[id] || {};
    this.sids[id][room] = true;
    this.rooms[room] = this.rooms[room] || Room();
    this.rooms[room].add(id);
  }
  if (fn) process.nextTick(fn.bind(null, null));
};

/**
 * Removes a socket from a room.
 *
 * @param {String} socket id
 * @param {String} room name
 * @param {Function} callback
 * @api public
 */

Adapter.prototype.del = function(id, room, fn){
  this.sids[id] = this.sids[id] || {};
  delete this.sids[id][room];
  if (this.rooms.hasOwnProperty(room)) {
    this.rooms[room].del(id);
    if (this.rooms[room].length === 0) delete this.rooms[room];
  }

  if (fn) process.nextTick(fn.bind(null, null));
};

/**
 * Removes a socket from all rooms it's joined.
 *
 * @param {String} socket id
 * @param {Function} callback
 * @api public
 */

Adapter.prototype.delAll = function(id, fn){
  var rooms = this.sids[id];
  if (rooms) {
    for (var room in rooms) {
      if (this.rooms.hasOwnProperty(room)) {
        this.rooms[room].del(id);
        if (this.rooms[room].length === 0) delete this.rooms[room];
      }
    }
  }
  delete this.sids[id];

  if (fn) process.nextTick(fn.bind(null, null));
};

/**
 * Broadcasts a packet.
 *
 * Options:
 *  - `flags` {Object} flags for this packet
 *  - `except` {Array} sids that should be excluded
 *  - `rooms` {Array} list of rooms to broadcast to
 *
 * @param {Object} packet object
 * @api public
 */

Adapter.prototype.broadcast = function(packet, opts){
  var rooms = opts.rooms || [];
  var except = opts.except || [];
  var flags = opts.flags || {};
  var packetOpts = {
    preEncoded: true,
    volatile: flags.volatile,
    compress: flags.compress
  };
  var ids = {};
  var self = this;
  var socket;

  packet.nsp = this.nsp.name;
  this.encoder.encode(packet, function(encodedPackets) {
    if (rooms.length) {
      for (var i = 0; i < rooms.length; i++) {
        var room = self.rooms[rooms[i]];
        if (!room) continue;
        var sockets = room.sockets;
        for (var id in sockets) {
          if (sockets.hasOwnProperty(id)) {
            if (ids[id] || ~except.indexOf(id)) continue;
            socket = self.nsp.connected[id];
            if (socket) {
              socket.packet(encodedPackets, packetOpts);
              ids[id] = true;
            }
          }
        }
      }
    } else {
      for (var id in self.sids) {
        if (self.sids.hasOwnProperty(id)) {
          if (~except.indexOf(id)) continue;
          socket = self.nsp.connected[id];
          if (socket) socket.packet(encodedPackets, packetOpts);
        }
      }
    }
  });
};

/**
 * Gets a list of clients by sid.
 *
 * @param {Array} explicit set of rooms to check.
 * @param {Function} callback
 * @api public
 */

Adapter.prototype.clients = function(rooms, fn){
  if ('function' == typeof rooms){
    fn = rooms;
    rooms = null;
  }

  rooms = rooms || [];

  var ids = {};
  var sids = [];
  var socket;

  if (rooms.length) {
    for (var i = 0; i < rooms.length; i++) {
      var room = this.rooms[rooms[i]];
      if (!room) continue;
      var sockets = room.sockets;
      for (var id in sockets) {
        if (sockets.hasOwnProperty(id)) {
          if (ids[id]) continue;
          socket = this.nsp.connected[id];
          if (socket) {
            sids.push(id);
            ids[id] = true;
          }
        }
      }
    }
  } else {
    for (var id in this.sids) {
      if (this.sids.hasOwnProperty(id)) {
        socket = this.nsp.connected[id];
        if (socket) sids.push(id);
      }
    }
  }

  if (fn) process.nextTick(fn.bind(null, null, sids));
};

/**
 * Gets the list of rooms a given client has joined.
 *
 * @param {String} socket id
 * @param {Function} callback
 * @api public
 */
Adapter.prototype.clientRooms = function(id, fn){
  var rooms = this.sids[id];
  if (fn) process.nextTick(fn.bind(null, null, rooms ? Object.keys(rooms) : null));
};

/**
* Room constructor.
*
* @api private
*/

function Room(){
  if (!(this instanceof Room)) return new Room();
  this.sockets = {};
  this.length = 0;
}

/**
 * Adds a socket to a room.
 *
 * @param {String} socket id
 * @api private
 */

Room.prototype.add = function(id){
  if (!this.sockets.hasOwnProperty(id)) {
    this.sockets[id] = true;
    this.length++;
  }
};

/**
 * Removes a socket from a room.
 *
 * @param {String} socket id
 * @api private
 */

Room.prototype.del = function(id){
  if (this.sockets.hasOwnProperty(id)) {
    delete this.sockets[id];
    this.length--;
  }
};


/***/ }),
/* 138 */
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 138;

/***/ })
/******/ ]);
//# sourceMappingURL=main.map