module.exports = {
  "version": 3,
  // 源文件
  "sources": [
    "webpack:///webpack/bootstrap",
    "webpack:///./src/index.js"
  ],
  "names": [
    "a",
    "console",
    "log"
  ],
  // 映射
  "mappings": ";QAAA;QACA;;QAEA;QACA;;QAEA;QACA;QACA;QACA;QACA;QACA;QACA;QACA;QACA;QACA;;QAEA;QACA;;QAEA;QACA;;QAEA;QACA;QACA;;;QAGA;QACA;;QAEA;QACA;;QAEA;QACA;QACA;QACA,0CAA0C,gCAAgC;QAC1E;QACA;;QAEA;QACA;QACA;QACA,wDAAwD,kBAAkB;QAC1E;QACA,iDAAiD,cAAc;QAC/D;;QAEA;QACA;QACA;QACA;QACA;QACA;QACA;QACA;QACA;QACA;QACA;QACA,yCAAyC,iCAAiC;QAC1E,gHAAgH,mBAAmB,EAAE;QACrI;QACA;;QAEA;QACA;QACA;QACA,2BAA2B,0BAA0B,EAAE;QACvD,iCAAiC,eAAe;QAChD;QACA;QACA;;QAEA;QACA,sDAAsD,+DAA+D;;QAErH;QACA;;;QAGA;QACA;;;;;;;;;;;;AClFA,IAAMA,CAAC,GAAG,CAAV;AAEA;AAEAC,OAAO,CAACC,GAAR,CAAYF,CAAZ,E",
  // 编译后的文件
  "file": "index.0afd008e.js",
  "sourcesContent": [
    " \t// The module cache\n \tvar installedModules = {};\n\n \t// The require function\n \tfunction __webpack_require__(moduleId) {\n\n \t\t// Check if module is in cache\n \t\tif(installedModules[moduleId]) {\n \t\t\treturn installedModules[moduleId].exports;\n \t\t}\n \t\t// Create a new module (and put it into the cache)\n \t\tvar module = installedModules[moduleId] = {\n \t\t\ti: moduleId,\n \t\t\tl: false,\n \t\t\texports: {}\n \t\t};\n\n \t\t// Execute the module function\n \t\tmodules[moduleId].call(module.exports, module, module.exports, __webpack_require__);\n\n \t\t// Flag the module as loaded\n \t\tmodule.l = true;\n\n \t\t// Return the exports of the module\n \t\treturn module.exports;\n \t}\n\n\n \t// expose the modules object (__webpack_modules__)\n \t__webpack_require__.m = modules;\n\n \t// expose the module cache\n \t__webpack_require__.c = installedModules;\n\n \t// define getter function for harmony exports\n \t__webpack_require__.d = function(exports, name, getter) {\n \t\tif(!__webpack_require__.o(exports, name)) {\n \t\t\tObject.defineProperty(exports, name, { enumerable: true, get: getter });\n \t\t}\n \t};\n\n \t// define __esModule on exports\n \t__webpack_require__.r = function(exports) {\n \t\tif(typeof Symbol !== 'undefined' && Symbol.toStringTag) {\n \t\t\tObject.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });\n \t\t}\n \t\tObject.defineProperty(exports, '__esModule', { value: true });\n \t};\n\n \t// create a fake namespace object\n \t// mode & 1: value is a module id, require it\n \t// mode & 2: merge all properties of value into the ns\n \t// mode & 4: return value when already ns object\n \t// mode & 8|1: behave like require\n \t__webpack_require__.t = function(value, mode) {\n \t\tif(mode & 1) value = __webpack_require__(value);\n \t\tif(mode & 8) return value;\n \t\tif((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;\n \t\tvar ns = Object.create(null);\n \t\t__webpack_require__.r(ns);\n \t\tObject.defineProperty(ns, 'default', { enumerable: true, value: value });\n \t\tif(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));\n \t\treturn ns;\n \t};\n\n \t// getDefaultExport function for compatibility with non-harmony modules\n \t__webpack_require__.n = function(module) {\n \t\tvar getter = module && module.__esModule ?\n \t\t\tfunction getDefault() { return module['default']; } :\n \t\t\tfunction getModuleExports() { return module; };\n \t\t__webpack_require__.d(getter, 'a', getter);\n \t\treturn getter;\n \t};\n\n \t// Object.prototype.hasOwnProperty.call\n \t__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };\n\n \t// __webpack_public_path__\n \t__webpack_require__.p = \"/\";\n\n\n \t// Load entry module and return exports\n \treturn __webpack_require__(__webpack_require__.s = \"./src/index.js\");\n",
    "const a = 1;\r\n\r\ndebugger;\r\n\r\nconsole.log(a);\r\n"
  ],
  "sourceRoot": ""
};
