const defaultConfig = require( '@wordpress/scripts/config/webpack.config.js' );

// console.log(defaultConfig);
// process.exit(0);

module.exports = {
  ...defaultConfig,
  externals: {
    '@rjsf/core': [ 'window rjsf', 'core' ],
    '@rjsf/utils': [ 'window rjsf', 'utils' ],
    '@rjsf/validator-ajv8': [ 'window rjsf', 'validator-ajv8' ],
    '@cfhack2024-wp-react-jsonschema-form/react-jsonschema-form-renderer': [ 'window rjsf', 'renderer'],
    '@cfhack2024-wp-react-jsonschema-form/react-jsonschema-form-renderer/gutenberg': [ 'window rjsf', 'renderer', 'gutenberg', ],
    '@cfhack2024-wp-react-jsonschema-form/react-jsonschema-form-renderer/html5': [ 'window rjsf', 'renderer', 'html5', ],
    // generated in the browser using
    // Object.fromEntries( Object.entries(window.lodash).map(([key, value])=>[`lodash/${key}`, [ 'window lodash', key]]))
    "lodash/templateSettings": [
        "window lodash",
        "templateSettings"
    ],
    "lodash/after": [
        "window lodash",
        "after"
    ],
    "lodash/ary": [
        "window lodash",
        "ary"
    ],
    "lodash/assign": [
        "window lodash",
        "assign"
    ],
    "lodash/assignIn": [
        "window lodash",
        "assignIn"
    ],
    "lodash/assignInWith": [
        "window lodash",
        "assignInWith"
    ],
    "lodash/assignWith": [
        "window lodash",
        "assignWith"
    ],
    "lodash/at": [
        "window lodash",
        "at"
    ],
    "lodash/before": [
        "window lodash",
        "before"
    ],
    "lodash/bind": [
        "window lodash",
        "bind"
    ],
    "lodash/bindAll": [
        "window lodash",
        "bindAll"
    ],
    "lodash/bindKey": [
        "window lodash",
        "bindKey"
    ],
    "lodash/castArray": [
        "window lodash",
        "castArray"
    ],
    "lodash/chain": [
        "window lodash",
        "chain"
    ],
    "lodash/chunk": [
        "window lodash",
        "chunk"
    ],
    "lodash/compact": [
        "window lodash",
        "compact"
    ],
    "lodash/concat": [
        "window lodash",
        "concat"
    ],
    "lodash/cond": [
        "window lodash",
        "cond"
    ],
    "lodash/conforms": [
        "window lodash",
        "conforms"
    ],
    "lodash/constant": [
        "window lodash",
        "constant"
    ],
    "lodash/countBy": [
        "window lodash",
        "countBy"
    ],
    "lodash/create": [
        "window lodash",
        "create"
    ],
    "lodash/curry": [
        "window lodash",
        "curry"
    ],
    "lodash/curryRight": [
        "window lodash",
        "curryRight"
    ],
    "lodash/debounce": [
        "window lodash",
        "debounce"
    ],
    "lodash/defaults": [
        "window lodash",
        "defaults"
    ],
    "lodash/defaultsDeep": [
        "window lodash",
        "defaultsDeep"
    ],
    "lodash/defer": [
        "window lodash",
        "defer"
    ],
    "lodash/delay": [
        "window lodash",
        "delay"
    ],
    "lodash/difference": [
        "window lodash",
        "difference"
    ],
    "lodash/differenceBy": [
        "window lodash",
        "differenceBy"
    ],
    "lodash/differenceWith": [
        "window lodash",
        "differenceWith"
    ],
    "lodash/drop": [
        "window lodash",
        "drop"
    ],
    "lodash/dropRight": [
        "window lodash",
        "dropRight"
    ],
    "lodash/dropRightWhile": [
        "window lodash",
        "dropRightWhile"
    ],
    "lodash/dropWhile": [
        "window lodash",
        "dropWhile"
    ],
    "lodash/fill": [
        "window lodash",
        "fill"
    ],
    "lodash/filter": [
        "window lodash",
        "filter"
    ],
    "lodash/flatMap": [
        "window lodash",
        "flatMap"
    ],
    "lodash/flatMapDeep": [
        "window lodash",
        "flatMapDeep"
    ],
    "lodash/flatMapDepth": [
        "window lodash",
        "flatMapDepth"
    ],
    "lodash/flatten": [
        "window lodash",
        "flatten"
    ],
    "lodash/flattenDeep": [
        "window lodash",
        "flattenDeep"
    ],
    "lodash/flattenDepth": [
        "window lodash",
        "flattenDepth"
    ],
    "lodash/flip": [
        "window lodash",
        "flip"
    ],
    "lodash/flow": [
        "window lodash",
        "flow"
    ],
    "lodash/flowRight": [
        "window lodash",
        "flowRight"
    ],
    "lodash/fromPairs": [
        "window lodash",
        "fromPairs"
    ],
    "lodash/functions": [
        "window lodash",
        "functions"
    ],
    "lodash/functionsIn": [
        "window lodash",
        "functionsIn"
    ],
    "lodash/groupBy": [
        "window lodash",
        "groupBy"
    ],
    "lodash/initial": [
        "window lodash",
        "initial"
    ],
    "lodash/intersection": [
        "window lodash",
        "intersection"
    ],
    "lodash/intersectionBy": [
        "window lodash",
        "intersectionBy"
    ],
    "lodash/intersectionWith": [
        "window lodash",
        "intersectionWith"
    ],
    "lodash/invert": [
        "window lodash",
        "invert"
    ],
    "lodash/invertBy": [
        "window lodash",
        "invertBy"
    ],
    "lodash/invokeMap": [
        "window lodash",
        "invokeMap"
    ],
    "lodash/iteratee": [
        "window lodash",
        "iteratee"
    ],
    "lodash/keyBy": [
        "window lodash",
        "keyBy"
    ],
    "lodash/keys": [
        "window lodash",
        "keys"
    ],
    "lodash/keysIn": [
        "window lodash",
        "keysIn"
    ],
    "lodash/map": [
        "window lodash",
        "map"
    ],
    "lodash/mapKeys": [
        "window lodash",
        "mapKeys"
    ],
    "lodash/mapValues": [
        "window lodash",
        "mapValues"
    ],
    "lodash/matches": [
        "window lodash",
        "matches"
    ],
    "lodash/matchesProperty": [
        "window lodash",
        "matchesProperty"
    ],
    "lodash/memoize": [
        "window lodash",
        "memoize"
    ],
    "lodash/merge": [
        "window lodash",
        "merge"
    ],
    "lodash/mergeWith": [
        "window lodash",
        "mergeWith"
    ],
    "lodash/method": [
        "window lodash",
        "method"
    ],
    "lodash/methodOf": [
        "window lodash",
        "methodOf"
    ],
    "lodash/mixin": [
        "window lodash",
        "mixin"
    ],
    "lodash/negate": [
        "window lodash",
        "negate"
    ],
    "lodash/nthArg": [
        "window lodash",
        "nthArg"
    ],
    "lodash/omit": [
        "window lodash",
        "omit"
    ],
    "lodash/omitBy": [
        "window lodash",
        "omitBy"
    ],
    "lodash/once": [
        "window lodash",
        "once"
    ],
    "lodash/orderBy": [
        "window lodash",
        "orderBy"
    ],
    "lodash/over": [
        "window lodash",
        "over"
    ],
    "lodash/overArgs": [
        "window lodash",
        "overArgs"
    ],
    "lodash/overEvery": [
        "window lodash",
        "overEvery"
    ],
    "lodash/overSome": [
        "window lodash",
        "overSome"
    ],
    "lodash/partial": [
        "window lodash",
        "partial"
    ],
    "lodash/partialRight": [
        "window lodash",
        "partialRight"
    ],
    "lodash/partition": [
        "window lodash",
        "partition"
    ],
    "lodash/pick": [
        "window lodash",
        "pick"
    ],
    "lodash/pickBy": [
        "window lodash",
        "pickBy"
    ],
    "lodash/property": [
        "window lodash",
        "property"
    ],
    "lodash/propertyOf": [
        "window lodash",
        "propertyOf"
    ],
    "lodash/pull": [
        "window lodash",
        "pull"
    ],
    "lodash/pullAll": [
        "window lodash",
        "pullAll"
    ],
    "lodash/pullAllBy": [
        "window lodash",
        "pullAllBy"
    ],
    "lodash/pullAllWith": [
        "window lodash",
        "pullAllWith"
    ],
    "lodash/pullAt": [
        "window lodash",
        "pullAt"
    ],
    "lodash/range": [
        "window lodash",
        "range"
    ],
    "lodash/rangeRight": [
        "window lodash",
        "rangeRight"
    ],
    "lodash/rearg": [
        "window lodash",
        "rearg"
    ],
    "lodash/reject": [
        "window lodash",
        "reject"
    ],
    "lodash/remove": [
        "window lodash",
        "remove"
    ],
    "lodash/rest": [
        "window lodash",
        "rest"
    ],
    "lodash/reverse": [
        "window lodash",
        "reverse"
    ],
    "lodash/sampleSize": [
        "window lodash",
        "sampleSize"
    ],
    "lodash/set": [
        "window lodash",
        "set"
    ],
    "lodash/setWith": [
        "window lodash",
        "setWith"
    ],
    "lodash/shuffle": [
        "window lodash",
        "shuffle"
    ],
    "lodash/slice": [
        "window lodash",
        "slice"
    ],
    "lodash/sortBy": [
        "window lodash",
        "sortBy"
    ],
    "lodash/sortedUniq": [
        "window lodash",
        "sortedUniq"
    ],
    "lodash/sortedUniqBy": [
        "window lodash",
        "sortedUniqBy"
    ],
    "lodash/split": [
        "window lodash",
        "split"
    ],
    "lodash/spread": [
        "window lodash",
        "spread"
    ],
    "lodash/tail": [
        "window lodash",
        "tail"
    ],
    "lodash/take": [
        "window lodash",
        "take"
    ],
    "lodash/takeRight": [
        "window lodash",
        "takeRight"
    ],
    "lodash/takeRightWhile": [
        "window lodash",
        "takeRightWhile"
    ],
    "lodash/takeWhile": [
        "window lodash",
        "takeWhile"
    ],
    "lodash/tap": [
        "window lodash",
        "tap"
    ],
    "lodash/throttle": [
        "window lodash",
        "throttle"
    ],
    "lodash/thru": [
        "window lodash",
        "thru"
    ],
    "lodash/toArray": [
        "window lodash",
        "toArray"
    ],
    "lodash/toPairs": [
        "window lodash",
        "toPairs"
    ],
    "lodash/toPairsIn": [
        "window lodash",
        "toPairsIn"
    ],
    "lodash/toPath": [
        "window lodash",
        "toPath"
    ],
    "lodash/toPlainObject": [
        "window lodash",
        "toPlainObject"
    ],
    "lodash/transform": [
        "window lodash",
        "transform"
    ],
    "lodash/unary": [
        "window lodash",
        "unary"
    ],
    "lodash/union": [
        "window lodash",
        "union"
    ],
    "lodash/unionBy": [
        "window lodash",
        "unionBy"
    ],
    "lodash/unionWith": [
        "window lodash",
        "unionWith"
    ],
    "lodash/uniq": [
        "window lodash",
        "uniq"
    ],
    "lodash/uniqBy": [
        "window lodash",
        "uniqBy"
    ],
    "lodash/uniqWith": [
        "window lodash",
        "uniqWith"
    ],
    "lodash/unset": [
        "window lodash",
        "unset"
    ],
    "lodash/unzip": [
        "window lodash",
        "unzip"
    ],
    "lodash/unzipWith": [
        "window lodash",
        "unzipWith"
    ],
    "lodash/update": [
        "window lodash",
        "update"
    ],
    "lodash/updateWith": [
        "window lodash",
        "updateWith"
    ],
    "lodash/values": [
        "window lodash",
        "values"
    ],
    "lodash/valuesIn": [
        "window lodash",
        "valuesIn"
    ],
    "lodash/without": [
        "window lodash",
        "without"
    ],
    "lodash/words": [
        "window lodash",
        "words"
    ],
    "lodash/wrap": [
        "window lodash",
        "wrap"
    ],
    "lodash/xor": [
        "window lodash",
        "xor"
    ],
    "lodash/xorBy": [
        "window lodash",
        "xorBy"
    ],
    "lodash/xorWith": [
        "window lodash",
        "xorWith"
    ],
    "lodash/zip": [
        "window lodash",
        "zip"
    ],
    "lodash/zipObject": [
        "window lodash",
        "zipObject"
    ],
    "lodash/zipObjectDeep": [
        "window lodash",
        "zipObjectDeep"
    ],
    "lodash/zipWith": [
        "window lodash",
        "zipWith"
    ],
    "lodash/entries": [
        "window lodash",
        "entries"
    ],
    "lodash/entriesIn": [
        "window lodash",
        "entriesIn"
    ],
    "lodash/extend": [
        "window lodash",
        "extend"
    ],
    "lodash/extendWith": [
        "window lodash",
        "extendWith"
    ],
    "lodash/add": [
        "window lodash",
        "add"
    ],
    "lodash/attempt": [
        "window lodash",
        "attempt"
    ],
    "lodash/camelCase": [
        "window lodash",
        "camelCase"
    ],
    "lodash/capitalize": [
        "window lodash",
        "capitalize"
    ],
    "lodash/ceil": [
        "window lodash",
        "ceil"
    ],
    "lodash/clamp": [
        "window lodash",
        "clamp"
    ],
    "lodash/clone": [
        "window lodash",
        "clone"
    ],
    "lodash/cloneDeep": [
        "window lodash",
        "cloneDeep"
    ],
    "lodash/cloneDeepWith": [
        "window lodash",
        "cloneDeepWith"
    ],
    "lodash/cloneWith": [
        "window lodash",
        "cloneWith"
    ],
    "lodash/conformsTo": [
        "window lodash",
        "conformsTo"
    ],
    "lodash/deburr": [
        "window lodash",
        "deburr"
    ],
    "lodash/defaultTo": [
        "window lodash",
        "defaultTo"
    ],
    "lodash/divide": [
        "window lodash",
        "divide"
    ],
    "lodash/endsWith": [
        "window lodash",
        "endsWith"
    ],
    "lodash/eq": [
        "window lodash",
        "eq"
    ],
    "lodash/escape": [
        "window lodash",
        "escape"
    ],
    "lodash/escapeRegExp": [
        "window lodash",
        "escapeRegExp"
    ],
    "lodash/every": [
        "window lodash",
        "every"
    ],
    "lodash/find": [
        "window lodash",
        "find"
    ],
    "lodash/findIndex": [
        "window lodash",
        "findIndex"
    ],
    "lodash/findKey": [
        "window lodash",
        "findKey"
    ],
    "lodash/findLast": [
        "window lodash",
        "findLast"
    ],
    "lodash/findLastIndex": [
        "window lodash",
        "findLastIndex"
    ],
    "lodash/findLastKey": [
        "window lodash",
        "findLastKey"
    ],
    "lodash/floor": [
        "window lodash",
        "floor"
    ],
    "lodash/forEach": [
        "window lodash",
        "forEach"
    ],
    "lodash/forEachRight": [
        "window lodash",
        "forEachRight"
    ],
    "lodash/forIn": [
        "window lodash",
        "forIn"
    ],
    "lodash/forInRight": [
        "window lodash",
        "forInRight"
    ],
    "lodash/forOwn": [
        "window lodash",
        "forOwn"
    ],
    "lodash/forOwnRight": [
        "window lodash",
        "forOwnRight"
    ],
    "lodash/get": [
        "window lodash",
        "get"
    ],
    "lodash/gt": [
        "window lodash",
        "gt"
    ],
    "lodash/gte": [
        "window lodash",
        "gte"
    ],
    "lodash/has": [
        "window lodash",
        "has"
    ],
    "lodash/hasIn": [
        "window lodash",
        "hasIn"
    ],
    "lodash/head": [
        "window lodash",
        "head"
    ],
    "lodash/identity": [
        "window lodash",
        "identity"
    ],
    "lodash/includes": [
        "window lodash",
        "includes"
    ],
    "lodash/indexOf": [
        "window lodash",
        "indexOf"
    ],
    "lodash/inRange": [
        "window lodash",
        "inRange"
    ],
    "lodash/invoke": [
        "window lodash",
        "invoke"
    ],
    "lodash/isArguments": [
        "window lodash",
        "isArguments"
    ],
    "lodash/isArray": [
        "window lodash",
        "isArray"
    ],
    "lodash/isArrayBuffer": [
        "window lodash",
        "isArrayBuffer"
    ],
    "lodash/isArrayLike": [
        "window lodash",
        "isArrayLike"
    ],
    "lodash/isArrayLikeObject": [
        "window lodash",
        "isArrayLikeObject"
    ],
    "lodash/isBoolean": [
        "window lodash",
        "isBoolean"
    ],
    "lodash/isBuffer": [
        "window lodash",
        "isBuffer"
    ],
    "lodash/isDate": [
        "window lodash",
        "isDate"
    ],
    "lodash/isElement": [
        "window lodash",
        "isElement"
    ],
    "lodash/isEmpty": [
        "window lodash",
        "isEmpty"
    ],
    "lodash/isEqual": [
        "window lodash",
        "isEqual"
    ],
    "lodash/isEqualWith": [
        "window lodash",
        "isEqualWith"
    ],
    "lodash/isError": [
        "window lodash",
        "isError"
    ],
    "lodash/isFinite": [
        "window lodash",
        "isFinite"
    ],
    "lodash/isFunction": [
        "window lodash",
        "isFunction"
    ],
    "lodash/isInteger": [
        "window lodash",
        "isInteger"
    ],
    "lodash/isLength": [
        "window lodash",
        "isLength"
    ],
    "lodash/isMap": [
        "window lodash",
        "isMap"
    ],
    "lodash/isMatch": [
        "window lodash",
        "isMatch"
    ],
    "lodash/isMatchWith": [
        "window lodash",
        "isMatchWith"
    ],
    "lodash/isNaN": [
        "window lodash",
        "isNaN"
    ],
    "lodash/isNative": [
        "window lodash",
        "isNative"
    ],
    "lodash/isNil": [
        "window lodash",
        "isNil"
    ],
    "lodash/isNull": [
        "window lodash",
        "isNull"
    ],
    "lodash/isNumber": [
        "window lodash",
        "isNumber"
    ],
    "lodash/isObject": [
        "window lodash",
        "isObject"
    ],
    "lodash/isObjectLike": [
        "window lodash",
        "isObjectLike"
    ],
    "lodash/isPlainObject": [
        "window lodash",
        "isPlainObject"
    ],
    "lodash/isRegExp": [
        "window lodash",
        "isRegExp"
    ],
    "lodash/isSafeInteger": [
        "window lodash",
        "isSafeInteger"
    ],
    "lodash/isSet": [
        "window lodash",
        "isSet"
    ],
    "lodash/isString": [
        "window lodash",
        "isString"
    ],
    "lodash/isSymbol": [
        "window lodash",
        "isSymbol"
    ],
    "lodash/isTypedArray": [
        "window lodash",
        "isTypedArray"
    ],
    "lodash/isUndefined": [
        "window lodash",
        "isUndefined"
    ],
    "lodash/isWeakMap": [
        "window lodash",
        "isWeakMap"
    ],
    "lodash/isWeakSet": [
        "window lodash",
        "isWeakSet"
    ],
    "lodash/join": [
        "window lodash",
        "join"
    ],
    "lodash/kebabCase": [
        "window lodash",
        "kebabCase"
    ],
    "lodash/last": [
        "window lodash",
        "last"
    ],
    "lodash/lastIndexOf": [
        "window lodash",
        "lastIndexOf"
    ],
    "lodash/lowerCase": [
        "window lodash",
        "lowerCase"
    ],
    "lodash/lowerFirst": [
        "window lodash",
        "lowerFirst"
    ],
    "lodash/lt": [
        "window lodash",
        "lt"
    ],
    "lodash/lte": [
        "window lodash",
        "lte"
    ],
    "lodash/max": [
        "window lodash",
        "max"
    ],
    "lodash/maxBy": [
        "window lodash",
        "maxBy"
    ],
    "lodash/mean": [
        "window lodash",
        "mean"
    ],
    "lodash/meanBy": [
        "window lodash",
        "meanBy"
    ],
    "lodash/min": [
        "window lodash",
        "min"
    ],
    "lodash/minBy": [
        "window lodash",
        "minBy"
    ],
    "lodash/stubArray": [
        "window lodash",
        "stubArray"
    ],
    "lodash/stubFalse": [
        "window lodash",
        "stubFalse"
    ],
    "lodash/stubObject": [
        "window lodash",
        "stubObject"
    ],
    "lodash/stubString": [
        "window lodash",
        "stubString"
    ],
    "lodash/stubTrue": [
        "window lodash",
        "stubTrue"
    ],
    "lodash/multiply": [
        "window lodash",
        "multiply"
    ],
    "lodash/nth": [
        "window lodash",
        "nth"
    ],
    "lodash/noConflict": [
        "window lodash",
        "noConflict"
    ],
    "lodash/noop": [
        "window lodash",
        "noop"
    ],
    "lodash/now": [
        "window lodash",
        "now"
    ],
    "lodash/pad": [
        "window lodash",
        "pad"
    ],
    "lodash/padEnd": [
        "window lodash",
        "padEnd"
    ],
    "lodash/padStart": [
        "window lodash",
        "padStart"
    ],
    "lodash/parseInt": [
        "window lodash",
        "parseInt"
    ],
    "lodash/random": [
        "window lodash",
        "random"
    ],
    "lodash/reduce": [
        "window lodash",
        "reduce"
    ],
    "lodash/reduceRight": [
        "window lodash",
        "reduceRight"
    ],
    "lodash/repeat": [
        "window lodash",
        "repeat"
    ],
    "lodash/replace": [
        "window lodash",
        "replace"
    ],
    "lodash/result": [
        "window lodash",
        "result"
    ],
    "lodash/round": [
        "window lodash",
        "round"
    ],
    "lodash/runInContext": [
        "window lodash",
        "runInContext"
    ],
    "lodash/sample": [
        "window lodash",
        "sample"
    ],
    "lodash/size": [
        "window lodash",
        "size"
    ],
    "lodash/snakeCase": [
        "window lodash",
        "snakeCase"
    ],
    "lodash/some": [
        "window lodash",
        "some"
    ],
    "lodash/sortedIndex": [
        "window lodash",
        "sortedIndex"
    ],
    "lodash/sortedIndexBy": [
        "window lodash",
        "sortedIndexBy"
    ],
    "lodash/sortedIndexOf": [
        "window lodash",
        "sortedIndexOf"
    ],
    "lodash/sortedLastIndex": [
        "window lodash",
        "sortedLastIndex"
    ],
    "lodash/sortedLastIndexBy": [
        "window lodash",
        "sortedLastIndexBy"
    ],
    "lodash/sortedLastIndexOf": [
        "window lodash",
        "sortedLastIndexOf"
    ],
    "lodash/startCase": [
        "window lodash",
        "startCase"
    ],
    "lodash/startsWith": [
        "window lodash",
        "startsWith"
    ],
    "lodash/subtract": [
        "window lodash",
        "subtract"
    ],
    "lodash/sum": [
        "window lodash",
        "sum"
    ],
    "lodash/sumBy": [
        "window lodash",
        "sumBy"
    ],
    "lodash/template": [
        "window lodash",
        "template"
    ],
    "lodash/times": [
        "window lodash",
        "times"
    ],
    "lodash/toFinite": [
        "window lodash",
        "toFinite"
    ],
    "lodash/toInteger": [
        "window lodash",
        "toInteger"
    ],
    "lodash/toLength": [
        "window lodash",
        "toLength"
    ],
    "lodash/toLower": [
        "window lodash",
        "toLower"
    ],
    "lodash/toNumber": [
        "window lodash",
        "toNumber"
    ],
    "lodash/toSafeInteger": [
        "window lodash",
        "toSafeInteger"
    ],
    "lodash/toString": [
        "window lodash",
        "toString"
    ],
    "lodash/toUpper": [
        "window lodash",
        "toUpper"
    ],
    "lodash/trim": [
        "window lodash",
        "trim"
    ],
    "lodash/trimEnd": [
        "window lodash",
        "trimEnd"
    ],
    "lodash/trimStart": [
        "window lodash",
        "trimStart"
    ],
    "lodash/truncate": [
        "window lodash",
        "truncate"
    ],
    "lodash/unescape": [
        "window lodash",
        "unescape"
    ],
    "lodash/uniqueId": [
        "window lodash",
        "uniqueId"
    ],
    "lodash/upperCase": [
        "window lodash",
        "upperCase"
    ],
    "lodash/upperFirst": [
        "window lodash",
        "upperFirst"
    ],
    "lodash/each": [
        "window lodash",
        "each"
    ],
    "lodash/eachRight": [
        "window lodash",
        "eachRight"
    ],
    "lodash/first": [
        "window lodash",
        "first"
    ],
    "lodash/VERSION": [
        "window lodash",
        "VERSION"
    ],
  }
};
