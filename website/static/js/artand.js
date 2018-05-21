(function (global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        module.exports = global.document ? factory(global, true) : function (w) {
            if (!w.document) {
                throw new Error("jQuery requires a window with a document");
            }
            return factory(w);
        };
    } else {
        factory(global);
    }
}(typeof window !== "undefined" ? window : this, function (window, noGlobal) {
    var deletedIds = [];
    var slice = deletedIds.slice;
    var concat = deletedIds.concat;
    var push = deletedIds.push;
    var indexOf = deletedIds.indexOf;
    var class2type = {};
    var toString = class2type.toString;
    var hasOwn = class2type.hasOwnProperty;
    var trim = "".trim;
    var support = {};
    var
    version = "1.11.0",
        jQuery = function (selector, context) {
            return new jQuery.fn.init(selector, context);
        },
        rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
        rmsPrefix = /^-ms-/,
        rdashAlpha = /-([\da-z])/gi,
        fcamelCase = function (all, letter) {
            return letter.toUpperCase();
        };
    jQuery.fn = jQuery.prototype = {
            jquery: version,
            constructor: jQuery,
            selector: "",
            length: 0,
            toArray: function () {
                return slice.call(this);
            },
            get: function (num) {
                return num != null ? (num < 0 ? this[num + this.length] : this[num]) : slice.call(this);
            },
            pushStack: function (elems) {
                var ret = jQuery.merge(this.constructor(), elems);
                ret.prevObject = this;
                ret.context = this.context;
                return ret;
            },
            each: function (callback, args) {
                return jQuery.each(this, callback, args);
            },
            map: function (callback) {
                return this.pushStack(jQuery.map(this, function (elem, i) {
                    return callback.call(elem, i, elem);
                }));
            },
            slice: function () {
                return this.pushStack(slice.apply(this, arguments));
            },
            first: function () {
                return this.eq(0);
            },
            last: function () {
                return this.eq(-1);
            },
            eq: function (i) {
                var len = this.length,
                    j = +i + (i < 0 ? len : 0);
                return this.pushStack(j >= 0 && j < len ? [this[j]] : []);
            },
            end: function () {
                return this.prevObject || this.constructor(null);
            },
            push: push,
            sort: deletedIds.sort,
            splice: deletedIds.splice
        };
    jQuery.extend = jQuery.fn.extend = function () {
            var src, copyIsArray, copy, name, options, clone, target = arguments[0] || {},
                i = 1,
                length = arguments.length,
                deep = false;
            if (typeof target === "boolean") {
                    deep = target;
                    target = arguments[i] || {};
                    i++;
                }
            if (typeof target !== "object" && !jQuery.isFunction(target)) {
                    target = {};
                }
            if (i === length) {
                    target = this;
                    i--;
                }
            for (; i < length; i++) {
                    if ((options = arguments[i]) != null) {
                        for (name in options) {
                            src = target[name];
                            copy = options[name];
                            if (target === copy) {
                                continue;
                            }
                            if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)))) {
                                if (copyIsArray) {
                                    copyIsArray = false;
                                    clone = src && jQuery.isArray(src) ? src : [];
                                } else {
                                    clone = src && jQuery.isPlainObject(src) ? src : {};
                                }
                                target[name] = jQuery.extend(deep, clone, copy);
                            } else if (copy !== undefined) {
                                target[name] = copy;
                            }
                        }
                    }
                }
            return target;
        };
    jQuery.extend({
            expando: "jQuery" + (version + Math.random()).replace(/\D/g, ""),
            isReady: true,
            error: function (msg) {
                throw new Error(msg);
            },
            noop: function () {},
            isFunction: function (obj) {
                return jQuery.type(obj) === "function";
            },
            isArray: Array.isArray ||
            function (obj) {
                return jQuery.type(obj) === "array";
            },
            isWindow: function (obj) {
                return obj != null && obj == obj.window;
            },
            isNumeric: function (obj) {
                return obj - parseFloat(obj) >= 0;
            },
            isEmptyObject: function (obj) {
                var name;
                for (name in obj) {
                    return false;
                }
                return true;
            },
            isPlainObject: function (obj) {
                var key;
                if (!obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow(obj)) {
                    return false;
                }
                try {
                    if (obj.constructor && !hasOwn.call(obj, "constructor") && !hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
                        return false;
                    }
                } catch (e) {
                    return false;
                }
                if (support.ownLast) {
                    for (key in obj) {
                        return hasOwn.call(obj, key);
                    }
                }
                for (key in obj) {}
                return key === undefined || hasOwn.call(obj, key);
            },
            type: function (obj) {
                if (obj == null) {
                    return obj + "";
                }
                return typeof obj === "object" || typeof obj === "function" ? class2type[toString.call(obj)] || "object" : typeof obj;
            },
            globalEval: function (data) {
                if (data && jQuery.trim(data)) {
                    (window.execScript ||
                    function (data) {
                        window["eval"].call(window, data);
                    })(data);
                }
            },
            camelCase: function (string) {
                return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
            },
            nodeName: function (elem, name) {
                return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
            },
            each: function (obj, callback, args) {
                var value, i = 0,
                    length = obj.length,
                    isArray = isArraylike(obj);
                if (args) {
                        if (isArray) {
                            for (; i < length; i++) {
                                value = callback.apply(obj[i], args);
                                if (value === false) {
                                    break;
                                }
                            }
                        } else {
                            for (i in obj) {
                                value = callback.apply(obj[i], args);
                                if (value === false) {
                                    break;
                                }
                            }
                        }
                    } else {
                        if (isArray) {
                            for (; i < length; i++) {
                                value = callback.call(obj[i], i, obj[i]);
                                if (value === false) {
                                    break;
                                }
                            }
                        } else {
                            for (i in obj) {
                                value = callback.call(obj[i], i, obj[i]);
                                if (value === false) {
                                    break;
                                }
                            }
                        }
                    }
                return obj;
            },
            trim: trim && !trim.call("\uFEFF\xA0") ?
            function (text) {
                return text == null ? "" : trim.call(text);
            } : function (text) {
                return text == null ? "" : (text + "").replace(rtrim, "");
            },
            makeArray: function (arr, results) {
                var ret = results || [];
                if (arr != null) {
                    if (isArraylike(Object(arr))) {
                        jQuery.merge(ret, typeof arr === "string" ? [arr] : arr);
                    } else {
                        push.call(ret, arr);
                    }
                }
                return ret;
            },
            inArray: function (elem, arr, i) {
                var len;
                if (arr) {
                    if (indexOf) {
                        return indexOf.call(arr, elem, i);
                    }
                    len = arr.length;
                    i = i ? i < 0 ? Math.max(0, len + i) : i : 0;
                    for (; i < len; i++) {
                        if (i in arr && arr[i] === elem) {
                            return i;
                        }
                    }
                }
                return -1;
            },
            merge: function (first, second) {
                var len = +second.length,
                    j = 0,
                    i = first.length;
                while (j < len) {
                        first[i++] = second[j++];
                    }
                if (len !== len) {
                        while (second[j] !== undefined) {
                            first[i++] = second[j++];
                        }
                    }
                first.length = i;
                return first;
            },
            grep: function (elems, callback, invert) {
                var callbackInverse, matches = [],
                    i = 0,
                    length = elems.length,
                    callbackExpect = !invert;
                for (; i < length; i++) {
                        callbackInverse = !callback(elems[i], i);
                        if (callbackInverse !== callbackExpect) {
                            matches.push(elems[i]);
                        }
                    }
                return matches;
            },
            map: function (elems, callback, arg) {
                var value, i = 0,
                    length = elems.length,
                    isArray = isArraylike(elems),
                    ret = [];
                if (isArray) {
                        for (; i < length; i++) {
                            value = callback(elems[i], i, arg);
                            if (value != null) {
                                ret.push(value);
                            }
                        }
                    } else {
                        for (i in elems) {
                            value = callback(elems[i], i, arg);
                            if (value != null) {
                                ret.push(value);
                            }
                        }
                    }
                return concat.apply([], ret);
            },
            guid: 1,
            proxy: function (fn, context) {
                var args, proxy, tmp;
                if (typeof context === "string") {
                    tmp = fn[context];
                    context = fn;
                    fn = tmp;
                }
                if (!jQuery.isFunction(fn)) {
                    return undefined;
                }
                args = slice.call(arguments, 2);
                proxy = function () {
                    return fn.apply(context || this, args.concat(slice.call(arguments)));
                };
                proxy.guid = fn.guid = fn.guid || jQuery.guid++;
                return proxy;
            },
            now: function () {
                return +(new Date());
            },
            support: support
        });
    jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (i, name) {
            class2type["[object " + name + "]"] = name.toLowerCase();
        });

    function isArraylike(obj) {
            var length = obj.length,
                type = jQuery.type(obj);
            if (type === "function" || jQuery.isWindow(obj)) {
                    return false;
                }
            if (obj.nodeType === 1 && length) {
                    return true;
                }
            return type === "array" || length === 0 || typeof length === "number" && length > 0 && (length - 1) in obj;
        }
    var Sizzle =
    /*!
     * Sizzle CSS Selector Engine v1.10.16
     * http://sizzlejs.com/
     *
     * Copyright 2013 jQuery Foundation, Inc. and other contributors
     * Released under the MIT license
     * http://jquery.org/license
     *
     * Date: 2014-01-13
     */
    (function (window) {
            var i, support, Expr, getText, isXML, compile, outermostContext, sortInput, hasDuplicate, setDocument, document, docElem, documentIsHTML, rbuggyQSA, rbuggyMatches, matches, contains, expando = "sizzle" + -(new Date()),
                preferredDoc = window.document,
                dirruns = 0,
                done = 0,
                classCache = createCache(),
                tokenCache = createCache(),
                compilerCache = createCache(),
                sortOrder = function (a, b) {
                    if (a === b) {
                        hasDuplicate = true;
                    }
                    return 0;
                },
                strundefined = typeof undefined,
                MAX_NEGATIVE = 1 << 31,
                hasOwn = ({}).hasOwnProperty,
                arr = [],
                pop = arr.pop,
                push_native = arr.push,
                push = arr.push,
                slice = arr.slice,
                indexOf = arr.indexOf ||
            function (elem) {
                    var i = 0,
                        len = this.length;
                    for (; i < len; i++) {
                            if (this[i] === elem) {
                                return i;
                            }
                        }
                    return -1;
                },
                booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
                whitespace = "[\\x20\\t\\r\\n\\f]",
                characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
                identifier = characterEncoding.replace("w", "w#"),
                attributes = "\\[" + whitespace + "*(" + characterEncoding + ")" + whitespace + "*(?:([*^$|!~]?=)" + whitespace + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + identifier + ")|)|)" + whitespace + "*\\]",
                pseudos = ":(" + characterEncoding + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + attributes.replace(3, 8) + ")*)|.*)\\)|)",
                rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g"),
                rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"),
                rcombinators = new RegExp("^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*"),
                rattributeQuotes = new RegExp("=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g"),
                rpseudo = new RegExp(pseudos),
                ridentifier = new RegExp("^" + identifier + "$"),
                matchExpr = {
                    "ID": new RegExp("^#(" + characterEncoding + ")"),
                    "CLASS": new RegExp("^\\.(" + characterEncoding + ")"),
                    "TAG": new RegExp("^(" + characterEncoding.replace("w", "w*") + ")"),
                    "ATTR": new RegExp("^" + attributes),
                    "PSEUDO": new RegExp("^" + pseudos),
                    "CHILD": new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i"),
                    "bool": new RegExp("^(?:" + booleans + ")$", "i"),
                    "needsContext": new RegExp("^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i")
                },
                rinputs = /^(?:input|select|textarea|button)$/i,
                rheader = /^h\d$/i,
                rnative = /^[^{]+\{\s*\[native \w/,
                rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
                rsibling = /[+~]/,
                rescape = /'|\\/g,
                runescape = new RegExp("\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig"),
                funescape = function (_, escaped, escapedWhitespace) {
                    var high = "0x" + escaped - 0x10000;
                    return high !== high || escapedWhitespace ? escaped : high < 0 ? String.fromCharCode(high + 0x10000) : String.fromCharCode(high >> 10 | 0xD800, high & 0x3FF | 0xDC00);
                };
            try {
                    push.apply((arr = slice.call(preferredDoc.childNodes)), preferredDoc.childNodes);
                    arr[preferredDoc.childNodes.length].nodeType;
                } catch (e) {
                    push = {
                        apply: arr.length ?
                        function (target, els) {
                            push_native.apply(target, slice.call(els));
                        } : function (target, els) {
                            var j = target.length,
                                i = 0;
                            while ((target[j++] = els[i++])) {}
                            target.length = j - 1;
                        }
                    };
                }

            function Sizzle(selector, context, results, seed) {
                    var match, elem, m, nodeType, i, groups, old, nid, newContext, newSelector;
                    if ((context ? context.ownerDocument || context : preferredDoc) !== document) {
                        setDocument(context);
                    }
                    context = context || document;
                    results = results || [];
                    if (!selector || typeof selector !== "string") {
                        return results;
                    }
                    if ((nodeType = context.nodeType) !== 1 && nodeType !== 9) {
                        return [];
                    }
                    if (documentIsHTML && !seed) {
                        if ((match = rquickExpr.exec(selector))) {
                            if ((m = match[1])) {
                                if (nodeType === 9) {
                                    elem = context.getElementById(m);
                                    if (elem && elem.parentNode) {
                                        if (elem.id === m) {
                                            results.push(elem);
                                            return results;
                                        }
                                    } else {
                                        return results;
                                    }
                                } else {
                                    if (context.ownerDocument && (elem = context.ownerDocument.getElementById(m)) && contains(context, elem) && elem.id === m) {
                                        results.push(elem);
                                        return results;
                                    }
                                }
                            } else if (match[2]) {
                                push.apply(results, context.getElementsByTagName(selector));
                                return results;
                            } else if ((m = match[3]) && support.getElementsByClassName && context.getElementsByClassName) {
                                push.apply(results, context.getElementsByClassName(m));
                                return results;
                            }
                        }
                        if (support.qsa && (!rbuggyQSA || !rbuggyQSA.test(selector))) {
                            nid = old = expando;
                            newContext = context;
                            newSelector = nodeType === 9 && selector;
                            if (nodeType === 1 && context.nodeName.toLowerCase() !== "object") {
                                groups = tokenize(selector);
                                if ((old = context.getAttribute("id"))) {
                                    nid = old.replace(rescape, "\\$&");
                                } else {
                                    context.setAttribute("id", nid);
                                }
                                nid = "[id='" + nid + "'] ";
                                i = groups.length;
                                while (i--) {
                                    groups[i] = nid + toSelector(groups[i]);
                                }
                                newContext = rsibling.test(selector) && testContext(context.parentNode) || context;
                                newSelector = groups.join(",");
                            }
                            if (newSelector) {
                                try {
                                    push.apply(results, newContext.querySelectorAll(newSelector));
                                    return results;
                                } catch (qsaError) {} finally {
                                    if (!old) {
                                        context.removeAttribute("id");
                                    }
                                }
                            }
                        }
                    }
                    return select(selector.replace(rtrim, "$1"), context, results, seed);
                }

            function createCache() {
                    var keys = [];

                    function cache(key, value) {
                        if (keys.push(key + " ") > Expr.cacheLength) {
                            delete cache[keys.shift()];
                        }
                        return (cache[key + " "] = value);
                    }
                    return cache;
                }

            function markFunction(fn) {
                    fn[expando] = true;
                    return fn;
                }

            function assert(fn) {
                    var div = document.createElement("div");
                    try {
                        return !!fn(div);
                    } catch (e) {
                        return false;
                    } finally {
                        if (div.parentNode) {
                            div.parentNode.removeChild(div);
                        }
                        div = null;
                    }
                }

            function addHandle(attrs, handler) {
                    var arr = attrs.split("|"),
                        i = attrs.length;
                    while (i--) {
                            Expr.attrHandle[arr[i]] = handler;
                        }
                }

            function siblingCheck(a, b) {
                    var cur = b && a,
                        diff = cur && a.nodeType === 1 && b.nodeType === 1 && (~b.sourceIndex || MAX_NEGATIVE) - (~a.sourceIndex || MAX_NEGATIVE);
                    if (diff) {
                            return diff;
                        }
                    if (cur) {
                            while ((cur = cur.nextSibling)) {
                                if (cur === b) {
                                    return -1;
                                }
                            }
                        }
                    return a ? 1 : -1;
                }

            function createInputPseudo(type) {
                    return function (elem) {
                        var name = elem.nodeName.toLowerCase();
                        return name === "input" && elem.type === type;
                    };
                }

            function createButtonPseudo(type) {
                    return function (elem) {
                        var name = elem.nodeName.toLowerCase();
                        return (name === "input" || name === "button") && elem.type === type;
                    };
                }

            function createPositionalPseudo(fn) {
                    return markFunction(function (argument) {
                        argument = +argument;
                        return markFunction(function (seed, matches) {
                            var j, matchIndexes = fn([], seed.length, argument),
                                i = matchIndexes.length;
                            while (i--) {
                                    if (seed[(j = matchIndexes[i])]) {
                                        seed[j] = !(matches[j] = seed[j]);
                                    }
                                }
                        });
                    });
                }

            function testContext(context) {
                    return context && typeof context.getElementsByTagName !== strundefined && context;
                }
            support = Sizzle.support = {};
            isXML = Sizzle.isXML = function (elem) {
                    var documentElement = elem && (elem.ownerDocument || elem).documentElement;
                    return documentElement ? documentElement.nodeName !== "HTML" : false;
                };
            setDocument = Sizzle.setDocument = function (node) {
                    var hasCompare, doc = node ? node.ownerDocument || node : preferredDoc,
                        parent = doc.defaultView;
                    if (doc === document || doc.nodeType !== 9 || !doc.documentElement) {
                            return document;
                        }
                    document = doc;
                    docElem = doc.documentElement;
                    documentIsHTML = !isXML(doc);
                    if (parent && parent !== parent.top) {
                            if (parent.addEventListener) {
                                parent.addEventListener("unload", function () {
                                    setDocument();
                                }, false);
                            } else if (parent.attachEvent) {
                                parent.attachEvent("onunload", function () {
                                    setDocument();
                                });
                            }
                        }
                    support.attributes = assert(function (div) {
                            div.className = "i";
                            return !div.getAttribute("className");
                        });
                    support.getElementsByTagName = assert(function (div) {
                            div.appendChild(doc.createComment(""));
                            return !div.getElementsByTagName("*").length;
                        });
                    support.getElementsByClassName = rnative.test(doc.getElementsByClassName) && assert(function (div) {
                            div.innerHTML = "<div class='a'></div><div class='a i'></div>";
                            div.firstChild.className = "i";
                            return div.getElementsByClassName("i").length === 2;
                        });
                    support.getById = assert(function (div) {
                            docElem.appendChild(div).id = expando;
                            return !doc.getElementsByName || !doc.getElementsByName(expando).length;
                        });
                    if (support.getById) {
                            Expr.find["ID"] = function (id, context) {
                                if (typeof context.getElementById !== strundefined && documentIsHTML) {
                                    var m = context.getElementById(id);
                                    return m && m.parentNode ? [m] : [];
                                }
                            };
                            Expr.filter["ID"] = function (id) {
                                var attrId = id.replace(runescape, funescape);
                                return function (elem) {
                                    return elem.getAttribute("id") === attrId;
                                };
                            };
                        } else {
                            delete Expr.find["ID"];
                            Expr.filter["ID"] = function (id) {
                                var attrId = id.replace(runescape, funescape);
                                return function (elem) {
                                    var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
                                    return node && node.value === attrId;
                                };
                            };
                        }
                    Expr.find["TAG"] = support.getElementsByTagName ?
                    function (tag, context) {
                            if (typeof context.getElementsByTagName !== strundefined) {
                                return context.getElementsByTagName(tag);
                            }
                        } : function (tag, context) {
                            var elem, tmp = [],
                                i = 0,
                                results = context.getElementsByTagName(tag);
                            if (tag === "*") {
                                    while ((elem = results[i++])) {
                                        if (elem.nodeType === 1) {
                                            tmp.push(elem);
                                        }
                                    }
                                    return tmp;
                                }
                            return results;
                        };
                    Expr.find["CLASS"] = support.getElementsByClassName &&
                    function (className, context) {
                            if (typeof context.getElementsByClassName !== strundefined && documentIsHTML) {
                                return context.getElementsByClassName(className);
                            }
                        };
                    rbuggyMatches = [];
                    rbuggyQSA = [];
                    if ((support.qsa = rnative.test(doc.querySelectorAll))) {
                            assert(function (div) {
                                div.innerHTML = "<select t=''><option selected=''></option></select>";
                                if (div.querySelectorAll("[t^='']").length) {
                                    rbuggyQSA.push("[*^$]=" + whitespace + "*(?:''|\"\")");
                                }
                                if (!div.querySelectorAll("[selected]").length) {
                                    rbuggyQSA.push("\\[" + whitespace + "*(?:value|" + booleans + ")");
                                }
                                if (!div.querySelectorAll(":checked").length) {
                                    rbuggyQSA.push(":checked");
                                }
                            });
                            assert(function (div) {
                                var input = doc.createElement("input");
                                input.setAttribute("type", "hidden");
                                div.appendChild(input).setAttribute("name", "D");
                                if (div.querySelectorAll("[name=d]").length) {
                                    rbuggyQSA.push("name" + whitespace + "*[*^$|!~]?=");
                                }
                                if (!div.querySelectorAll(":enabled").length) {
                                    rbuggyQSA.push(":enabled", ":disabled");
                                }
                                div.querySelectorAll("*,:x");
                                rbuggyQSA.push(",.*:");
                            });
                        }
                    if ((support.matchesSelector = rnative.test((matches = docElem.webkitMatchesSelector || docElem.mozMatchesSelector || docElem.oMatchesSelector || docElem.msMatchesSelector)))) {
                            assert(function (div) {
                                support.disconnectedMatch = matches.call(div, "div");
                                matches.call(div, "[s!='']:x");
                                rbuggyMatches.push("!=", pseudos);
                            });
                        }
                    rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|"));
                    rbuggyMatches = rbuggyMatches.length && new RegExp(rbuggyMatches.join("|"));
                    hasCompare = rnative.test(docElem.compareDocumentPosition);
                    contains = hasCompare || rnative.test(docElem.contains) ?
                    function (a, b) {
                            var adown = a.nodeType === 9 ? a.documentElement : a,
                                bup = b && b.parentNode;
                            return a === bup || !! (bup && bup.nodeType === 1 && (adown.contains ? adown.contains(bup) : a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16));
                        } : function (a, b) {
                            if (b) {
                                while ((b = b.parentNode)) {
                                    if (b === a) {
                                        return true;
                                    }
                                }
                            }
                            return false;
                        };
                    sortOrder = hasCompare ?
                    function (a, b) {
                            if (a === b) {
                                hasDuplicate = true;
                                return 0;
                            }
                            var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
                            if (compare) {
                                return compare;
                            }
                            compare = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1;
                            if (compare & 1 || (!support.sortDetached && b.compareDocumentPosition(a) === compare)) {
                                if (a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a)) {
                                    return -1;
                                }
                                if (b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b)) {
                                    return 1;
                                }
                                return sortInput ? (indexOf.call(sortInput, a) - indexOf.call(sortInput, b)) : 0;
                            }
                            return compare & 4 ? -1 : 1;
                        } : function (a, b) {
                            if (a === b) {
                                hasDuplicate = true;
                                return 0;
                            }
                            var cur, i = 0,
                                aup = a.parentNode,
                                bup = b.parentNode,
                                ap = [a],
                                bp = [b];
                            if (!aup || !bup) {
                                    return a === doc ? -1 : b === doc ? 1 : aup ? -1 : bup ? 1 : sortInput ? (indexOf.call(sortInput, a) - indexOf.call(sortInput, b)) : 0;
                                } else if (aup === bup) {
                                    return siblingCheck(a, b);
                                }
                            cur = a;
                            while ((cur = cur.parentNode)) {
                                    ap.unshift(cur);
                                }
                            cur = b;
                            while ((cur = cur.parentNode)) {
                                    bp.unshift(cur);
                                }
                            while (ap[i] === bp[i]) {
                                    i++;
                                }
                            return i ? siblingCheck(ap[i], bp[i]) : ap[i] === preferredDoc ? -1 : bp[i] === preferredDoc ? 1 : 0;
                        };
                    return doc;
                };
            Sizzle.matches = function (expr, elements) {
                    return Sizzle(expr, null, null, elements);
                };
            Sizzle.matchesSelector = function (elem, expr) {
                    if ((elem.ownerDocument || elem) !== document) {
                        setDocument(elem);
                    }
                    expr = expr.replace(rattributeQuotes, "='$1']");
                    if (support.matchesSelector && documentIsHTML && (!rbuggyMatches || !rbuggyMatches.test(expr)) && (!rbuggyQSA || !rbuggyQSA.test(expr))) {
                        try {
                            var ret = matches.call(elem, expr);
                            if (ret || support.disconnectedMatch || elem.document && elem.document.nodeType !== 11) {
                                return ret;
                            }
                        } catch (e) {}
                    }
                    return Sizzle(expr, document, null, [elem]).length > 0;
                };
            Sizzle.contains = function (context, elem) {
                    if ((context.ownerDocument || context) !== document) {
                        setDocument(context);
                    }
                    return contains(context, elem);
                };
            Sizzle.attr = function (elem, name) {
                    if ((elem.ownerDocument || elem) !== document) {
                        setDocument(elem);
                    }
                    var fn = Expr.attrHandle[name.toLowerCase()],
                        val = fn && hasOwn.call(Expr.attrHandle, name.toLowerCase()) ? fn(elem, name, !documentIsHTML) : undefined;
                    return val !== undefined ? val : support.attributes || !documentIsHTML ? elem.getAttribute(name) : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
                };
            Sizzle.error = function (msg) {
                    throw new Error("Syntax error, unrecognized expression: " + msg);
                };
            Sizzle.uniqueSort = function (results) {
                    var elem, duplicates = [],
                        j = 0,
                        i = 0;
                    hasDuplicate = !support.detectDuplicates;
                    sortInput = !support.sortStable && results.slice(0);
                    results.sort(sortOrder);
                    if (hasDuplicate) {
                            while ((elem = results[i++])) {
                                if (elem === results[i]) {
                                    j = duplicates.push(i);
                                }
                            }
                            while (j--) {
                                results.splice(duplicates[j], 1);
                            }
                        }
                    sortInput = null;
                    return results;
                };
            getText = Sizzle.getText = function (elem) {
                    var node, ret = "",
                        i = 0,
                        nodeType = elem.nodeType;
                    if (!nodeType) {
                            while ((node = elem[i++])) {
                                ret += getText(node);
                            }
                        } else if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
                            if (typeof elem.textContent === "string") {
                                return elem.textContent;
                            } else {
                                for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
                                    ret += getText(elem);
                                }
                            }
                        } else if (nodeType === 3 || nodeType === 4) {
                            return elem.nodeValue;
                        }
                    return ret;
                };
            Expr = Sizzle.selectors = {
                    cacheLength: 50,
                    createPseudo: markFunction,
                    match: matchExpr,
                    attrHandle: {},
                    find: {},
                    relative: {
                        ">": {
                            dir: "parentNode",
                            first: true
                        },
                        " ": {
                            dir: "parentNode"
                        },
                        "+": {
                            dir: "previousSibling",
                            first: true
                        },
                        "~": {
                            dir: "previousSibling"
                        }
                    },
                    preFilter: {
                        "ATTR": function (match) {
                            match[1] = match[1].replace(runescape, funescape);
                            match[3] = (match[4] || match[5] || "").replace(runescape, funescape);
                            if (match[2] === "~=") {
                                match[3] = " " + match[3] + " ";
                            }
                            return match.slice(0, 4);
                        },
                        "CHILD": function (match) {
                            match[1] = match[1].toLowerCase();
                            if (match[1].slice(0, 3) === "nth") {
                                if (!match[3]) {
                                    Sizzle.error(match[0]);
                                }
                                match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * (match[3] === "even" || match[3] === "odd"));
                                match[5] = +((match[7] + match[8]) || match[3] === "odd");
                            } else if (match[3]) {
                                Sizzle.error(match[0]);
                            }
                            return match;
                        },
                        "PSEUDO": function (match) {
                            var excess, unquoted = !match[5] && match[2];
                            if (matchExpr["CHILD"].test(match[0])) {
                                return null;
                            }
                            if (match[3] && match[4] !== undefined) {
                                match[2] = match[4];
                            } else if (unquoted && rpseudo.test(unquoted) && (excess = tokenize(unquoted, true)) && (excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length)) {
                                match[0] = match[0].slice(0, excess);
                                match[2] = unquoted.slice(0, excess);
                            }
                            return match.slice(0, 3);
                        }
                    },
                    filter: {
                        "TAG": function (nodeNameSelector) {
                            var nodeName = nodeNameSelector.replace(runescape, funescape).toLowerCase();
                            return nodeNameSelector === "*" ?
                            function () {
                                return true;
                            } : function (elem) {
                                return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
                            };
                        },
                        "CLASS": function (className) {
                            var pattern = classCache[className + " "];
                            return pattern || (pattern = new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)")) && classCache(className, function (elem) {
                                return pattern.test(typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute("class") || "");
                            });
                        },
                        "ATTR": function (name, operator, check) {
                            return function (elem) {
                                var result = Sizzle.attr(elem, name);
                                if (result == null) {
                                    return operator === "!=";
                                }
                                if (!operator) {
                                    return true;
                                }
                                result += "";
                                return operator === "=" ? result === check : operator === "!=" ? result !== check : operator === "^=" ? check && result.indexOf(check) === 0 : operator === "*=" ? check && result.indexOf(check) > -1 : operator === "$=" ? check && result.slice(-check.length) === check : operator === "~=" ? (" " + result + " ").indexOf(check) > -1 : operator === "|=" ? result === check || result.slice(0, check.length + 1) === check + "-" : false;
                            };
                        },
                        "CHILD": function (type, what, argument, first, last) {
                            var simple = type.slice(0, 3) !== "nth",
                                forward = type.slice(-4) !== "last",
                                ofType = what === "of-type";
                            return first === 1 && last === 0 ?
                            function (elem) {
                                    return !!elem.parentNode;
                                } : function (elem, context, xml) {
                                    var cache, outerCache, node, diff, nodeIndex, start, dir = simple !== forward ? "nextSibling" : "previousSibling",
                                        parent = elem.parentNode,
                                        name = ofType && elem.nodeName.toLowerCase(),
                                        useCache = !xml && !ofType;
                                    if (parent) {
                                            if (simple) {
                                                while (dir) {
                                                    node = elem;
                                                    while ((node = node[dir])) {
                                                        if (ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) {
                                                            return false;
                                                        }
                                                    }
                                                    start = dir = type === "only" && !start && "nextSibling";
                                                }
                                                return true;
                                            }
                                            start = [forward ? parent.firstChild : parent.lastChild];
                                            if (forward && useCache) {
                                                outerCache = parent[expando] || (parent[expando] = {});
                                                cache = outerCache[type] || [];
                                                nodeIndex = cache[0] === dirruns && cache[1];
                                                diff = cache[0] === dirruns && cache[2];
                                                node = nodeIndex && parent.childNodes[nodeIndex];
                                                while ((node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop())) {
                                                    if (node.nodeType === 1 && ++diff && node === elem) {
                                                        outerCache[type] = [dirruns, nodeIndex, diff];
                                                        break;
                                                    }
                                                }
                                            } else if (useCache && (cache = (elem[expando] || (elem[expando] = {}))[type]) && cache[0] === dirruns) {
                                                diff = cache[1];
                                            } else {
                                                while ((node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop())) {
                                                    if ((ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) && ++diff) {
                                                        if (useCache) {
                                                            (node[expando] || (node[expando] = {}))[type] = [dirruns, diff];
                                                        }
                                                        if (node === elem) {
                                                            break;
                                                        }
                                                    }
                                                }
                                            }
                                            diff -= last;
                                            return diff === first || (diff % first === 0 && diff / first >= 0);
                                        }
                                };
                        },
                        "PSEUDO": function (pseudo, argument) {
                            var args, fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] || Sizzle.error("unsupported pseudo: " + pseudo);
                            if (fn[expando]) {
                                return fn(argument);
                            }
                            if (fn.length > 1) {
                                args = [pseudo, pseudo, "", argument];
                                return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ? markFunction(function (seed, matches) {
                                    var idx, matched = fn(seed, argument),
                                        i = matched.length;
                                    while (i--) {
                                            idx = indexOf.call(seed, matched[i]);
                                            seed[idx] = !(matches[idx] = matched[i]);
                                        }
                                }) : function (elem) {
                                    return fn(elem, 0, args);
                                };
                            }
                            return fn;
                        }
                    },
                    pseudos: {
                        "not": markFunction(function (selector) {
                            var input = [],
                                results = [],
                                matcher = compile(selector.replace(rtrim, "$1"));
                            return matcher[expando] ? markFunction(function (seed, matches, context, xml) {
                                    var elem, unmatched = matcher(seed, null, xml, []),
                                        i = seed.length;
                                    while (i--) {
                                            if ((elem = unmatched[i])) {
                                                seed[i] = !(matches[i] = elem);
                                            }
                                        }
                                }) : function (elem, context, xml) {
                                    input[0] = elem;
                                    matcher(input, null, xml, results);
                                    return !results.pop();
                                };
                        }),
                        "has": markFunction(function (selector) {
                            return function (elem) {
                                return Sizzle(selector, elem).length > 0;
                            };
                        }),
                        "contains": markFunction(function (text) {
                            return function (elem) {
                                return (elem.textContent || elem.innerText || getText(elem)).indexOf(text) > -1;
                            };
                        }),
                        "lang": markFunction(function (lang) {
                            if (!ridentifier.test(lang || "")) {
                                Sizzle.error("unsupported lang: " + lang);
                            }
                            lang = lang.replace(runescape, funescape).toLowerCase();
                            return function (elem) {
                                var elemLang;
                                do {
                                    if ((elemLang = documentIsHTML ? elem.lang : elem.getAttribute("xml:lang") || elem.getAttribute("lang"))) {
                                        elemLang = elemLang.toLowerCase();
                                        return elemLang === lang || elemLang.indexOf(lang + "-") === 0;
                                    }
                                } while ((elem = elem.parentNode) && elem.nodeType === 1);
                                return false;
                            };
                        }),
                        "target": function (elem) {
                            var hash = window.location && window.location.hash;
                            return hash && hash.slice(1) === elem.id;
                        },
                        "root": function (elem) {
                            return elem === docElem;
                        },
                        "focus": function (elem) {
                            return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !! (elem.type || elem.href || ~elem.tabIndex);
                        },
                        "enabled": function (elem) {
                            return elem.disabled === false;
                        },
                        "disabled": function (elem) {
                            return elem.disabled === true;
                        },
                        "checked": function (elem) {
                            var nodeName = elem.nodeName.toLowerCase();
                            return (nodeName === "input" && !! elem.checked) || (nodeName === "option" && !! elem.selected);
                        },
                        "selected": function (elem) {
                            if (elem.parentNode) {
                                elem.parentNode.selectedIndex;
                            }
                            return elem.selected === true;
                        },
                        "empty": function (elem) {
                            for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
                                if (elem.nodeType < 6) {
                                    return false;
                                }
                            }
                            return true;
                        },
                        "parent": function (elem) {
                            return !Expr.pseudos["empty"](elem);
                        },
                        "header": function (elem) {
                            return rheader.test(elem.nodeName);
                        },
                        "input": function (elem) {
                            return rinputs.test(elem.nodeName);
                        },
                        "button": function (elem) {
                            var name = elem.nodeName.toLowerCase();
                            return name === "input" && elem.type === "button" || name === "button";
                        },
                        "text": function (elem) {
                            var attr;
                            return elem.nodeName.toLowerCase() === "input" && elem.type === "text" && ((attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text");
                        },
                        "first": createPositionalPseudo(function () {
                            return [0];
                        }),
                        "last": createPositionalPseudo(function (matchIndexes, length) {
                            return [length - 1];
                        }),
                        "eq": createPositionalPseudo(function (matchIndexes, length, argument) {
                            return [argument < 0 ? argument + length : argument];
                        }),
                        "even": createPositionalPseudo(function (matchIndexes, length) {
                            var i = 0;
                            for (; i < length; i += 2) {
                                matchIndexes.push(i);
                            }
                            return matchIndexes;
                        }),
                        "odd": createPositionalPseudo(function (matchIndexes, length) {
                            var i = 1;
                            for (; i < length; i += 2) {
                                matchIndexes.push(i);
                            }
                            return matchIndexes;
                        }),
                        "lt": createPositionalPseudo(function (matchIndexes, length, argument) {
                            var i = argument < 0 ? argument + length : argument;
                            for (; --i >= 0;) {
                                matchIndexes.push(i);
                            }
                            return matchIndexes;
                        }),
                        "gt": createPositionalPseudo(function (matchIndexes, length, argument) {
                            var i = argument < 0 ? argument + length : argument;
                            for (; ++i < length;) {
                                matchIndexes.push(i);
                            }
                            return matchIndexes;
                        })
                    }
                };
            Expr.pseudos["nth"] = Expr.pseudos["eq"];
            for (i in {
                    radio: true,
                    checkbox: true,
                    file: true,
                    password: true,
                    image: true
                }) {
                    Expr.pseudos[i] = createInputPseudo(i);
                }
            for (i in {
                    submit: true,
                    reset: true
                }) {
                    Expr.pseudos[i] = createButtonPseudo(i);
                }

            function setFilters() {}
            setFilters.prototype = Expr.filters = Expr.pseudos;
            Expr.setFilters = new setFilters();

            function tokenize(selector, parseOnly) {
                    var matched, match, tokens, type, soFar, groups, preFilters, cached = tokenCache[selector + " "];
                    if (cached) {
                        return parseOnly ? 0 : cached.slice(0);
                    }
                    soFar = selector;
                    groups = [];
                    preFilters = Expr.preFilter;
                    while (soFar) {
                        if (!matched || (match = rcomma.exec(soFar))) {
                            if (match) {
                                soFar = soFar.slice(match[0].length) || soFar;
                            }
                            groups.push((tokens = []));
                        }
                        matched = false;
                        if ((match = rcombinators.exec(soFar))) {
                            matched = match.shift();
                            tokens.push({
                                value: matched,
                                type: match[0].replace(rtrim, " ")
                            });
                            soFar = soFar.slice(matched.length);
                        }
                        for (type in Expr.filter) {
                            if ((match = matchExpr[type].exec(soFar)) && (!preFilters[type] || (match = preFilters[type](match)))) {
                                matched = match.shift();
                                tokens.push({
                                    value: matched,
                                    type: type,
                                    matches: match
                                });
                                soFar = soFar.slice(matched.length);
                            }
                        }
                        if (!matched) {
                            break;
                        }
                    }
                    return parseOnly ? soFar.length : soFar ? Sizzle.error(selector) : tokenCache(selector, groups).slice(0);
                }

            function toSelector(tokens) {
                    var i = 0,
                        len = tokens.length,
                        selector = "";
                    for (; i < len; i++) {
                            selector += tokens[i].value;
                        }
                    return selector;
                }

            function addCombinator(matcher, combinator, base) {
                    var dir = combinator.dir,
                        checkNonElements = base && dir === "parentNode",
                        doneName = done++;
                    return combinator.first ?
                    function (elem, context, xml) {
                            while ((elem = elem[dir])) {
                                if (elem.nodeType === 1 || checkNonElements) {
                                    return matcher(elem, context, xml);
                                }
                            }
                        } : function (elem, context, xml) {
                            var oldCache, outerCache, newCache = [dirruns, doneName];
                            if (xml) {
                                while ((elem = elem[dir])) {
                                    if (elem.nodeType === 1 || checkNonElements) {
                                        if (matcher(elem, context, xml)) {
                                            return true;
                                        }
                                    }
                                }
                            } else {
                                while ((elem = elem[dir])) {
                                    if (elem.nodeType === 1 || checkNonElements) {
                                        outerCache = elem[expando] || (elem[expando] = {});
                                        if ((oldCache = outerCache[dir]) && oldCache[0] === dirruns && oldCache[1] === doneName) {
                                            return (newCache[2] = oldCache[2]);
                                        } else {
                                            outerCache[dir] = newCache;
                                            if ((newCache[2] = matcher(elem, context, xml))) {
                                                return true;
                                            }
                                        }
                                    }
                                }
                            }
                        };
                }

            function elementMatcher(matchers) {
                    return matchers.length > 1 ?
                    function (elem, context, xml) {
                        var i = matchers.length;
                        while (i--) {
                            if (!matchers[i](elem, context, xml)) {
                                return false;
                            }
                        }
                        return true;
                    } : matchers[0];
                }

            function condense(unmatched, map, filter, context, xml) {
                    var elem, newUnmatched = [],
                        i = 0,
                        len = unmatched.length,
                        mapped = map != null;
                    for (; i < len; i++) {
                            if ((elem = unmatched[i])) {
                                if (!filter || filter(elem, context, xml)) {
                                    newUnmatched.push(elem);
                                    if (mapped) {
                                        map.push(i);
                                    }
                                }
                            }
                        }
                    return newUnmatched;
                }

            function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
                    if (postFilter && !postFilter[expando]) {
                        postFilter = setMatcher(postFilter);
                    }
                    if (postFinder && !postFinder[expando]) {
                        postFinder = setMatcher(postFinder, postSelector);
                    }
                    return markFunction(function (seed, results, context, xml) {
                        var temp, i, elem, preMap = [],
                            postMap = [],
                            preexisting = results.length,
                            elems = seed || multipleContexts(selector || "*", context.nodeType ? [context] : context, []),
                            matcherIn = preFilter && (seed || !selector) ? condense(elems, preMap, preFilter, context, xml) : elems,
                            matcherOut = matcher ? postFinder || (seed ? preFilter : preexisting || postFilter) ? [] : results : matcherIn;
                        if (matcher) {
                                matcher(matcherIn, matcherOut, context, xml);
                            }
                        if (postFilter) {
                                temp = condense(matcherOut, postMap);
                                postFilter(temp, [], context, xml);
                                i = temp.length;
                                while (i--) {
                                    if ((elem = temp[i])) {
                                        matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem);
                                    }
                                }
                            }
                        if (seed) {
                                if (postFinder || preFilter) {
                                    if (postFinder) {
                                        temp = [];
                                        i = matcherOut.length;
                                        while (i--) {
                                            if ((elem = matcherOut[i])) {
                                                temp.push((matcherIn[i] = elem));
                                            }
                                        }
                                        postFinder(null, (matcherOut = []), temp, xml);
                                    }
                                    i = matcherOut.length;
                                    while (i--) {
                                        if ((elem = matcherOut[i]) && (temp = postFinder ? indexOf.call(seed, elem) : preMap[i]) > -1) {
                                            seed[temp] = !(results[temp] = elem);
                                        }
                                    }
                                }
                            } else {
                                matcherOut = condense(matcherOut === results ? matcherOut.splice(preexisting, matcherOut.length) : matcherOut);
                                if (postFinder) {
                                    postFinder(null, results, matcherOut, xml);
                                } else {
                                    push.apply(results, matcherOut);
                                }
                            }
                    });
                }

            function matcherFromTokens(tokens) {
                    var checkContext, matcher, j, len = tokens.length,
                        leadingRelative = Expr.relative[tokens[0].type],
                        implicitRelative = leadingRelative || Expr.relative[" "],
                        i = leadingRelative ? 1 : 0,
                        matchContext = addCombinator(function (elem) {
                            return elem === checkContext;
                        }, implicitRelative, true),
                        matchAnyContext = addCombinator(function (elem) {
                            return indexOf.call(checkContext, elem) > -1;
                        }, implicitRelative, true),
                        matchers = [function (elem, context, xml) {
                            return (!leadingRelative && (xml || context !== outermostContext)) || ((checkContext = context).nodeType ? matchContext(elem, context, xml) : matchAnyContext(elem, context, xml));
                        }];
                    for (; i < len; i++) {
                            if ((matcher = Expr.relative[tokens[i].type])) {
                                matchers = [addCombinator(elementMatcher(matchers), matcher)];
                            } else {
                                matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches);
                                if (matcher[expando]) {
                                    j = ++i;
                                    for (; j < len; j++) {
                                        if (Expr.relative[tokens[j].type]) {
                                            break;
                                        }
                                    }
                                    return setMatcher(i > 1 && elementMatcher(matchers), i > 1 && toSelector(tokens.slice(0, i - 1).concat({
                                        value: tokens[i - 2].type === " " ? "*" : ""
                                    })).replace(rtrim, "$1"), matcher, i < j && matcherFromTokens(tokens.slice(i, j)), j < len && matcherFromTokens((tokens = tokens.slice(j))), j < len && toSelector(tokens));
                                }
                                matchers.push(matcher);
                            }
                        }
                    return elementMatcher(matchers);
                }

            function matcherFromGroupMatchers(elementMatchers, setMatchers) {
                    var bySet = setMatchers.length > 0,
                        byElement = elementMatchers.length > 0,
                        superMatcher = function (seed, context, xml, results, outermost) {
                            var elem, j, matcher, matchedCount = 0,
                                i = "0",
                                unmatched = seed && [],
                                setMatched = [],
                                contextBackup = outermostContext,
                                elems = seed || byElement && Expr.find["TAG"]("*", outermost),
                                dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
                                len = elems.length;
                            if (outermost) {
                                    outermostContext = context !== document && context;
                                }
                            for (; i !== len && (elem = elems[i]) != null; i++) {
                                    if (byElement && elem) {
                                        j = 0;
                                        while ((matcher = elementMatchers[j++])) {
                                            if (matcher(elem, context, xml)) {
                                                results.push(elem);
                                                break;
                                            }
                                        }
                                        if (outermost) {
                                            dirruns = dirrunsUnique;
                                        }
                                    }
                                    if (bySet) {
                                        if ((elem = !matcher && elem)) {
                                            matchedCount--;
                                        }
                                        if (seed) {
                                            unmatched.push(elem);
                                        }
                                    }
                                }
                            matchedCount += i;
                            if (bySet && i !== matchedCount) {
                                    j = 0;
                                    while ((matcher = setMatchers[j++])) {
                                        matcher(unmatched, setMatched, context, xml);
                                    }
                                    if (seed) {
                                        if (matchedCount > 0) {
                                            while (i--) {
                                                if (!(unmatched[i] || setMatched[i])) {
                                                    setMatched[i] = pop.call(results);
                                                }
                                            }
                                        }
                                        setMatched = condense(setMatched);
                                    }
                                    push.apply(results, setMatched);
                                    if (outermost && !seed && setMatched.length > 0 && (matchedCount + setMatchers.length) > 1) {
                                        Sizzle.uniqueSort(results);
                                    }
                                }
                            if (outermost) {
                                    dirruns = dirrunsUnique;
                                    outermostContext = contextBackup;
                                }
                            return unmatched;
                        };
                    return bySet ? markFunction(superMatcher) : superMatcher;
                }
            compile = Sizzle.compile = function (selector, group) {
                    var i, setMatchers = [],
                        elementMatchers = [],
                        cached = compilerCache[selector + " "];
                    if (!cached) {
                            if (!group) {
                                group = tokenize(selector);
                            }
                            i = group.length;
                            while (i--) {
                                cached = matcherFromTokens(group[i]);
                                if (cached[expando]) {
                                    setMatchers.push(cached);
                                } else {
                                    elementMatchers.push(cached);
                                }
                            }
                            cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers));
                        }
                    return cached;
                };

            function multipleContexts(selector, contexts, results) {
                    var i = 0,
                        len = contexts.length;
                    for (; i < len; i++) {
                            Sizzle(selector, contexts[i], results);
                        }
                    return results;
                }

            function select(selector, context, results, seed) {
                    var i, tokens, token, type, find, match = tokenize(selector);
                    if (!seed) {
                        if (match.length === 1) {
                            tokens = match[0] = match[0].slice(0);
                            if (tokens.length > 2 && (token = tokens[0]).type === "ID" && support.getById && context.nodeType === 9 && documentIsHTML && Expr.relative[tokens[1].type]) {
                                context = (Expr.find["ID"](token.matches[0].replace(runescape, funescape), context) || [])[0];
                                if (!context) {
                                    return results;
                                }
                                selector = selector.slice(tokens.shift().value.length);
                            }
                            i = matchExpr["needsContext"].test(selector) ? 0 : tokens.length;
                            while (i--) {
                                token = tokens[i];
                                if (Expr.relative[(type = token.type)]) {
                                    break;
                                }
                                if ((find = Expr.find[type])) {
                                    if ((seed = find(token.matches[0].replace(runescape, funescape), rsibling.test(tokens[0].type) && testContext(context.parentNode) || context))) {
                                        tokens.splice(i, 1);
                                        selector = seed.length && toSelector(tokens);
                                        if (!selector) {
                                            push.apply(results, seed);
                                            return results;
                                        }
                                        break;
                                    }
                                }
                            }
                        }
                    }
                    compile(selector, match)(seed, context, !documentIsHTML, results, rsibling.test(selector) && testContext(context.parentNode) || context);
                    return results;
                }
            support.sortStable = expando.split("").sort(sortOrder).join("") === expando;
            support.detectDuplicates = !! hasDuplicate;
            setDocument();
            support.sortDetached = assert(function (div1) {
                    return div1.compareDocumentPosition(document.createElement("div")) & 1;
                });
            if (!assert(function (div) {
                    div.innerHTML = "<a href='#'></a>";
                    return div.firstChild.getAttribute("href") === "#";
                })) {
                    addHandle("type|href|height|width", function (elem, name, isXML) {
                        if (!isXML) {
                            return elem.getAttribute(name, name.toLowerCase() === "type" ? 1 : 2);
                        }
                    });
                }
            if (!support.attributes || !assert(function (div) {
                    div.innerHTML = "<input/>";
                    div.firstChild.setAttribute("value", "");
                    return div.firstChild.getAttribute("value") === "";
                })) {
                    addHandle("value", function (elem, name, isXML) {
                        if (!isXML && elem.nodeName.toLowerCase() === "input") {
                            return elem.defaultValue;
                        }
                    });
                }
            if (!assert(function (div) {
                    return div.getAttribute("disabled") == null;
                })) {
                    addHandle(booleans, function (elem, name, isXML) {
                        var val;
                        if (!isXML) {
                            return elem[name] === true ? name.toLowerCase() : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
                        }
                    });
                }
            return Sizzle;
        })(window);
    jQuery.find = Sizzle;
    jQuery.expr = Sizzle.selectors;
    jQuery.expr[":"] = jQuery.expr.pseudos;
    jQuery.unique = Sizzle.uniqueSort;
    jQuery.text = Sizzle.getText;
    jQuery.isXMLDoc = Sizzle.isXML;
    jQuery.contains = Sizzle.contains;
    var rneedsContext = jQuery.expr.match.needsContext;
    var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);
    var risSimple = /^.[^:#\[\.,]*$/;

    function winnow(elements, qualifier, not) {
            if (jQuery.isFunction(qualifier)) {
                return jQuery.grep(elements, function (elem, i) {
                    return !!qualifier.call(elem, i, elem) !== not;
                });
            }
            if (qualifier.nodeType) {
                return jQuery.grep(elements, function (elem) {
                    return (elem === qualifier) !== not;
                });
            }
            if (typeof qualifier === "string") {
                if (risSimple.test(qualifier)) {
                    return jQuery.filter(qualifier, elements, not);
                }
                qualifier = jQuery.filter(qualifier, elements);
            }
            return jQuery.grep(elements, function (elem) {
                return (jQuery.inArray(elem, qualifier) >= 0) !== not;
            });
        }
    jQuery.filter = function (expr, elems, not) {
            var elem = elems[0];
            if (not) {
                expr = ":not(" + expr + ")";
            }
            return elems.length === 1 && elem.nodeType === 1 ? jQuery.find.matchesSelector(elem, expr) ? [elem] : [] : jQuery.find.matches(expr, jQuery.grep(elems, function (elem) {
                return elem.nodeType === 1;
            }));
        };
    jQuery.fn.extend({
            find: function (selector) {
                var i, ret = [],
                    self = this,
                    len = self.length;
                if (typeof selector !== "string") {
                        return this.pushStack(jQuery(selector).filter(function () {
                            for (i = 0; i < len; i++) {
                                if (jQuery.contains(self[i], this)) {
                                    return true;
                                }
                            }
                        }));
                    }
                for (i = 0; i < len; i++) {
                        jQuery.find(selector, self[i], ret);
                    }
                ret = this.pushStack(len > 1 ? jQuery.unique(ret) : ret);
                ret.selector = this.selector ? this.selector + " " + selector : selector;
                return ret;
            },
            filter: function (selector) {
                return this.pushStack(winnow(this, selector || [], false));
            },
            not: function (selector) {
                return this.pushStack(winnow(this, selector || [], true));
            },
            is: function (selector) {
                return !!winnow(this, typeof selector === "string" && rneedsContext.test(selector) ? jQuery(selector) : selector || [], false).length;
            }
        });
    var rootjQuery, document = window.document,
        rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
        init = jQuery.fn.init = function (selector, context) {
            var match, elem;
            if (!selector) {
                return this;
            }
            if (typeof selector === "string") {
                if (selector.charAt(0) === "<" && selector.charAt(selector.length - 1) === ">" && selector.length >= 3) {
                    match = [null, selector, null];
                } else {
                    match = rquickExpr.exec(selector);
                }
                if (match && (match[1] || !context)) {
                    if (match[1]) {
                        context = context instanceof jQuery ? context[0] : context;
                        jQuery.merge(this, jQuery.parseHTML(match[1], context && context.nodeType ? context.ownerDocument || context : document, true));
                        if (rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
                            for (match in context) {
                                if (jQuery.isFunction(this[match])) {
                                    this[match](context[match]);
                                } else {
                                    this.attr(match, context[match]);
                                }
                            }
                        }
                        return this;
                    } else {
                        elem = document.getElementById(match[2]);
                        if (elem && elem.parentNode) {
                            if (elem.id !== match[2]) {
                                return rootjQuery.find(selector);
                            }
                            this.length = 1;
                            this[0] = elem;
                        }
                        this.context = document;
                        this.selector = selector;
                        return this;
                    }
                } else if (!context || context.jquery) {
                    return (context || rootjQuery).find(selector);
                } else {
                    return this.constructor(context).find(selector);
                }
            } else if (selector.nodeType) {
                this.context = this[0] = selector;
                this.length = 1;
                return this;
            } else if (jQuery.isFunction(selector)) {
                return typeof rootjQuery.ready !== "undefined" ? rootjQuery.ready(selector) : selector(jQuery);
            }
            if (selector.selector !== undefined) {
                this.selector = selector.selector;
                this.context = selector.context;
            }
            return jQuery.makeArray(selector, this);
        };
    init.prototype = jQuery.fn;
    rootjQuery = jQuery(document);
    var rparentsprev = /^(?:parents|prev(?:Until|All))/,
        guaranteedUnique = {
            children: true,
            contents: true,
            next: true,
            prev: true
        };
    jQuery.extend({
            dir: function (elem, dir, until) {
                var matched = [],
                    cur = elem[dir];
                while (cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery(cur).is(until))) {
                        if (cur.nodeType === 1) {
                            matched.push(cur);
                        }
                        cur = cur[dir];
                    }
                return matched;
            },
            sibling: function (n, elem) {
                var r = [];
                for (; n; n = n.nextSibling) {
                    if (n.nodeType === 1 && n !== elem) {
                        r.push(n);
                    }
                }
                return r;
            }
        });
    jQuery.fn.extend({
            has: function (target) {
                var i, targets = jQuery(target, this),
                    len = targets.length;
                return this.filter(function () {
                        for (i = 0; i < len; i++) {
                            if (jQuery.contains(this, targets[i])) {
                                return true;
                            }
                        }
                    });
            },
            closest: function (selectors, context) {
                var cur, i = 0,
                    l = this.length,
                    matched = [],
                    pos = rneedsContext.test(selectors) || typeof selectors !== "string" ? jQuery(selectors, context || this.context) : 0;
                for (; i < l; i++) {
                        for (cur = this[i]; cur && cur !== context; cur = cur.parentNode) {
                            if (cur.nodeType < 11 && (pos ? pos.index(cur) > -1 : cur.nodeType === 1 && jQuery.find.matchesSelector(cur, selectors))) {
                                matched.push(cur);
                                break;
                            }
                        }
                    }
                return this.pushStack(matched.length > 1 ? jQuery.unique(matched) : matched);
            },
            index: function (elem) {
                if (!elem) {
                    return (this[0] && this[0].parentNode) ? this.first().prevAll().length : -1;
                }
                if (typeof elem === "string") {
                    return jQuery.inArray(this[0], jQuery(elem));
                }
                return jQuery.inArray(elem.jquery ? elem[0] : elem, this);
            },
            add: function (selector, context) {
                return this.pushStack(jQuery.unique(jQuery.merge(this.get(), jQuery(selector, context))));
            },
            addBack: function (selector) {
                return this.add(selector == null ? this.prevObject : this.prevObject.filter(selector));
            }
        });

    function sibling(cur, dir) {
            do {
                cur = cur[dir];
            } while (cur && cur.nodeType !== 1);
            return cur;
        }
    jQuery.each({
            parent: function (elem) {
                var parent = elem.parentNode;
                return parent && parent.nodeType !== 11 ? parent : null;
            },
            parents: function (elem) {
                return jQuery.dir(elem, "parentNode");
            },
            parentsUntil: function (elem, i, until) {
                return jQuery.dir(elem, "parentNode", until);
            },
            next: function (elem) {
                return sibling(elem, "nextSibling");
            },
            prev: function (elem) {
                return sibling(elem, "previousSibling");
            },
            nextAll: function (elem) {
                return jQuery.dir(elem, "nextSibling");
            },
            prevAll: function (elem) {
                return jQuery.dir(elem, "previousSibling");
            },
            nextUntil: function (elem, i, until) {
                return jQuery.dir(elem, "nextSibling", until);
            },
            prevUntil: function (elem, i, until) {
                return jQuery.dir(elem, "previousSibling", until);
            },
            siblings: function (elem) {
                return jQuery.sibling((elem.parentNode || {}).firstChild, elem);
            },
            children: function (elem) {
                return jQuery.sibling(elem.firstChild);
            },
            contents: function (elem) {
                return jQuery.nodeName(elem, "iframe") ? elem.contentDocument || elem.contentWindow.document : jQuery.merge([], elem.childNodes);
            }
        }, function (name, fn) {
            jQuery.fn[name] = function (until, selector) {
                var ret = jQuery.map(this, fn, until);
                if (name.slice(-5) !== "Until") {
                    selector = until;
                }
                if (selector && typeof selector === "string") {
                    ret = jQuery.filter(selector, ret);
                }
                if (this.length > 1) {
                    if (!guaranteedUnique[name]) {
                        ret = jQuery.unique(ret);
                    }
                    if (rparentsprev.test(name)) {
                        ret = ret.reverse();
                    }
                }
                return this.pushStack(ret);
            };
        });
    var rnotwhite = (/\S+/g);
    var optionsCache = {};

    function createOptions(options) {
            var object = optionsCache[options] = {};
            jQuery.each(options.match(rnotwhite) || [], function (_, flag) {
                object[flag] = true;
            });
            return object;
        }
    jQuery.Callbacks = function (options) {
            options = typeof options === "string" ? (optionsCache[options] || createOptions(options)) : jQuery.extend({}, options);
            var
            firing, memory, fired, firingLength, firingIndex, firingStart, list = [],
                stack = !options.once && [],
                fire = function (data) {
                    memory = options.memory && data;
                    fired = true;
                    firingIndex = firingStart || 0;
                    firingStart = 0;
                    firingLength = list.length;
                    firing = true;
                    for (; list && firingIndex < firingLength; firingIndex++) {
                        if (list[firingIndex].apply(data[0], data[1]) === false && options.stopOnFalse) {
                            memory = false;
                            break;
                        }
                    }
                    firing = false;
                    if (list) {
                        if (stack) {
                            if (stack.length) {
                                fire(stack.shift());
                            }
                        } else if (memory) {
                            list = [];
                        } else {
                            self.disable();
                        }
                    }
                },
                self = {
                    add: function () {
                        if (list) {
                            var start = list.length;
                            (function add(args) {
                                jQuery.each(args, function (_, arg) {
                                    var type = jQuery.type(arg);
                                    if (type === "function") {
                                        if (!options.unique || !self.has(arg)) {
                                            list.push(arg);
                                        }
                                    } else if (arg && arg.length && type !== "string") {
                                        add(arg);
                                    }
                                });
                            })(arguments);
                            if (firing) {
                                firingLength = list.length;
                            } else if (memory) {
                                firingStart = start;
                                fire(memory);
                            }
                        }
                        return this;
                    },
                    remove: function () {
                        if (list) {
                            jQuery.each(arguments, function (_, arg) {
                                var index;
                                while ((index = jQuery.inArray(arg, list, index)) > -1) {
                                    list.splice(index, 1);
                                    if (firing) {
                                        if (index <= firingLength) {
                                            firingLength--;
                                        }
                                        if (index <= firingIndex) {
                                            firingIndex--;
                                        }
                                    }
                                }
                            });
                        }
                        return this;
                    },
                    has: function (fn) {
                        return fn ? jQuery.inArray(fn, list) > -1 : !! (list && list.length);
                    },
                    empty: function () {
                        list = [];
                        firingLength = 0;
                        return this;
                    },
                    disable: function () {
                        list = stack = memory = undefined;
                        return this;
                    },
                    disabled: function () {
                        return !list;
                    },
                    lock: function () {
                        stack = undefined;
                        if (!memory) {
                            self.disable();
                        }
                        return this;
                    },
                    locked: function () {
                        return !stack;
                    },
                    fireWith: function (context, args) {
                        if (list && (!fired || stack)) {
                            args = args || [];
                            args = [context, args.slice ? args.slice() : args];
                            if (firing) {
                                stack.push(args);
                            } else {
                                fire(args);
                            }
                        }
                        return this;
                    },
                    fire: function () {
                        self.fireWith(this, arguments);
                        return this;
                    },
                    fired: function () {
                        return !!fired;
                    }
                };
            return self;
        };
    jQuery.extend({
            Deferred: function (func) {
                var tuples = [
                    ["resolve", "done", jQuery.Callbacks("once memory"), "resolved"],
                    ["reject", "fail", jQuery.Callbacks("once memory"), "rejected"],
                    ["notify", "progress", jQuery.Callbacks("memory")]
                ],
                    state = "pending",
                    promise = {
                        state: function () {
                            return state;
                        },
                        always: function () {
                            deferred.done(arguments).fail(arguments);
                            return this;
                        },
                        then: function () {
                            var fns = arguments;
                            return jQuery.Deferred(function (newDefer) {
                                jQuery.each(tuples, function (i, tuple) {
                                    var fn = jQuery.isFunction(fns[i]) && fns[i];
                                    deferred[tuple[1]](function () {
                                        var returned = fn && fn.apply(this, arguments);
                                        if (returned && jQuery.isFunction(returned.promise)) {
                                            returned.promise().done(newDefer.resolve).fail(newDefer.reject).progress(newDefer.notify);
                                        } else {
                                            newDefer[tuple[0] + "With"](this === promise ? newDefer.promise() : this, fn ? [returned] : arguments);
                                        }
                                    });
                                });
                                fns = null;
                            }).promise();
                        },
                        promise: function (obj) {
                            return obj != null ? jQuery.extend(obj, promise) : promise;
                        }
                    },
                    deferred = {};
                promise.pipe = promise.then;
                jQuery.each(tuples, function (i, tuple) {
                        var list = tuple[2],
                            stateString = tuple[3];
                        promise[tuple[1]] = list.add;
                        if (stateString) {
                                list.add(function () {
                                    state = stateString;
                                }, tuples[i ^ 1][2].disable, tuples[2][2].lock);
                            }
                        deferred[tuple[0]] = function () {
                                deferred[tuple[0] + "With"](this === deferred ? promise : this, arguments);
                                return this;
                            };
                        deferred[tuple[0] + "With"] = list.fireWith;
                    });
                promise.promise(deferred);
                if (func) {
                        func.call(deferred, deferred);
                    }
                return deferred;
            },
            when: function (subordinate) {
                var i = 0,
                    resolveValues = slice.call(arguments),
                    length = resolveValues.length,
                    remaining = length !== 1 || (subordinate && jQuery.isFunction(subordinate.promise)) ? length : 0,
                    deferred = remaining === 1 ? subordinate : jQuery.Deferred(),
                    updateFunc = function (i, contexts, values) {
                        return function (value) {
                            contexts[i] = this;
                            values[i] = arguments.length > 1 ? slice.call(arguments) : value;
                            if (values === progressValues) {
                                deferred.notifyWith(contexts, values);
                            } else if (!(--remaining)) {
                                deferred.resolveWith(contexts, values);
                            }
                        };
                    },
                    progressValues, progressContexts, resolveContexts;
                if (length > 1) {
                        progressValues = new Array(length);
                        progressContexts = new Array(length);
                        resolveContexts = new Array(length);
                        for (; i < length; i++) {
                            if (resolveValues[i] && jQuery.isFunction(resolveValues[i].promise)) {
                                resolveValues[i].promise().done(updateFunc(i, resolveContexts, resolveValues)).fail(deferred.reject).progress(updateFunc(i, progressContexts, progressValues));
                            } else {
                                --remaining;
                            }
                        }
                    }
                if (!remaining) {
                        deferred.resolveWith(resolveContexts, resolveValues);
                    }
                return deferred.promise();
            }
        });
    var readyList;
    jQuery.fn.ready = function (fn) {
            jQuery.ready.promise().done(fn);
            return this;
        };
    jQuery.extend({
            isReady: false,
            readyWait: 1,
            holdReady: function (hold) {
                if (hold) {
                    jQuery.readyWait++;
                } else {
                    jQuery.ready(true);
                }
            },
            ready: function (wait) {
                if (wait === true ? --jQuery.readyWait : jQuery.isReady) {
                    return;
                }
                if (!document.body) {
                    return setTimeout(jQuery.ready);
                }
                jQuery.isReady = true;
                if (wait !== true && --jQuery.readyWait > 0) {
                    return;
                }
                readyList.resolveWith(document, [jQuery]);
                if (jQuery.fn.trigger) {
                    jQuery(document).trigger("ready").off("ready");
                }
            }
        });

    function detach() {
            if (document.addEventListener) {
                document.removeEventListener("DOMContentLoaded", completed, false);
                window.removeEventListener("load", completed, false);
            } else {
                document.detachEvent("onreadystatechange", completed);
                window.detachEvent("onload", completed);
            }
        }

    function completed() {
            if (document.addEventListener || event.type === "load" || document.readyState === "complete") {
                detach();
                jQuery.ready();
            }
        }
    jQuery.ready.promise = function (obj) {
            if (!readyList) {
                readyList = jQuery.Deferred();
                if (document.readyState === "complete") {
                    setTimeout(jQuery.ready);
                } else if (document.addEventListener) {
                    document.addEventListener("DOMContentLoaded", completed, false);
                    window.addEventListener("load", completed, false);
                } else {
                    document.attachEvent("onreadystatechange", completed);
                    window.attachEvent("onload", completed);
                    var top = false;
                    try {
                        top = window.frameElement == null && document.documentElement;
                    } catch (e) {}
                    if (top && top.doScroll) {
                        (function doScrollCheck() {
                            if (!jQuery.isReady) {
                                try {
                                    top.doScroll("left");
                                } catch (e) {
                                    return setTimeout(doScrollCheck, 50);
                                }
                                detach();
                                jQuery.ready();
                            }
                        })();
                    }
                }
            }
            return readyList.promise(obj);
        };
    var strundefined = typeof undefined;
    var i;
    for (i in jQuery(support)) {
            break;
        }
    support.ownLast = i !== "0";
    support.inlineBlockNeedsLayout = false;
    jQuery(function () {
            var container, div, body = document.getElementsByTagName("body")[0];
            if (!body) {
                return;
            }
            container = document.createElement("div");
            container.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px";
            div = document.createElement("div");
            body.appendChild(container).appendChild(div);
            if (typeof div.style.zoom !== strundefined) {
                div.style.cssText = "border:0;margin:0;width:1px;padding:1px;display:inline;zoom:1";
                if ((support.inlineBlockNeedsLayout = (div.offsetWidth === 3))) {
                    body.style.zoom = 1;
                }
            }
            body.removeChild(container);
            container = div = null;
        });
        (function () {
            var div = document.createElement("div");
            if (support.deleteExpando == null) {
                support.deleteExpando = true;
                try {
                    delete div.test;
                } catch (e) {
                    support.deleteExpando = false;
                }
            }
            div = null;
        })();
    jQuery.acceptData = function (elem) {
            var noData = jQuery.noData[(elem.nodeName + " ").toLowerCase()],
                nodeType = +elem.nodeType || 1;
            return nodeType !== 1 && nodeType !== 9 ? false : !noData || noData !== true && elem.getAttribute("classid") === noData;
        };
    var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
        rmultiDash = /([A-Z])/g;

    function dataAttr(elem, key, data) {
            if (data === undefined && elem.nodeType === 1) {
                var name = "data-" + key.replace(rmultiDash, "-$1").toLowerCase();
                data = elem.getAttribute(name);
                if (typeof data === "string") {
                    try {
                        data = data === "true" ? true : data === "false" ? false : data === "null" ? null : +data + "" === data ? +data : rbrace.test(data) ? jQuery.parseJSON(data) : data;
                    } catch (e) {}
                    jQuery.data(elem, key, data);
                } else {
                    data = undefined;
                }
            }
            return data;
        }

    function isEmptyDataObject(obj) {
            var name;
            for (name in obj) {
                if (name === "data" && jQuery.isEmptyObject(obj[name])) {
                    continue;
                }
                if (name !== "toJSON") {
                    return false;
                }
            }
            return true;
        }

    function internalData(elem, name, data, pvt) {
            if (!jQuery.acceptData(elem)) {
                return;
            }
            var ret, thisCache, internalKey = jQuery.expando,
                isNode = elem.nodeType,
                cache = isNode ? jQuery.cache : elem,
                id = isNode ? elem[internalKey] : elem[internalKey] && internalKey;
            if ((!id || !cache[id] || (!pvt && !cache[id].data)) && data === undefined && typeof name === "string") {
                    return;
                }
            if (!id) {
                    if (isNode) {
                        id = elem[internalKey] = deletedIds.pop() || jQuery.guid++;
                    } else {
                        id = internalKey;
                    }
                }
            if (!cache[id]) {
                    cache[id] = isNode ? {} : {
                        toJSON: jQuery.noop
                    };
                }
            if (typeof name === "object" || typeof name === "function") {
                    if (pvt) {
                        cache[id] = jQuery.extend(cache[id], name);
                    } else {
                        cache[id].data = jQuery.extend(cache[id].data, name);
                    }
                }
            thisCache = cache[id];
            if (!pvt) {
                    if (!thisCache.data) {
                        thisCache.data = {};
                    }
                    thisCache = thisCache.data;
                }
            if (data !== undefined) {
                    thisCache[jQuery.camelCase(name)] = data;
                }
            if (typeof name === "string") {
                    ret = thisCache[name];
                    if (ret == null) {
                        ret = thisCache[jQuery.camelCase(name)];
                    }
                } else {
                    ret = thisCache;
                }
            return ret;
        }

    function internalRemoveData(elem, name, pvt) {
            if (!jQuery.acceptData(elem)) {
                return;
            }
            var thisCache, i, isNode = elem.nodeType,
                cache = isNode ? jQuery.cache : elem,
                id = isNode ? elem[jQuery.expando] : jQuery.expando;
            if (!cache[id]) {
                    return;
                }
            if (name) {
                    thisCache = pvt ? cache[id] : cache[id].data;
                    if (thisCache) {
                        if (!jQuery.isArray(name)) {
                            if (name in thisCache) {
                                name = [name];
                            } else {
                                name = jQuery.camelCase(name);
                                if (name in thisCache) {
                                    name = [name];
                                } else {
                                    name = name.split(" ");
                                }
                            }
                        } else {
                            name = name.concat(jQuery.map(name, jQuery.camelCase));
                        }
                        i = name.length;
                        while (i--) {
                            delete thisCache[name[i]];
                        }
                        if (pvt ? !isEmptyDataObject(thisCache) : !jQuery.isEmptyObject(thisCache)) {
                            return;
                        }
                    }
                }
            if (!pvt) {
                    delete cache[id].data;
                    if (!isEmptyDataObject(cache[id])) {
                        return;
                    }
                }
            if (isNode) {
                    jQuery.cleanData([elem], true);
                } else if (support.deleteExpando || cache != cache.window) {
                    delete cache[id];
                } else {
                    cache[id] = null;
                }
        }
    jQuery.extend({
            cache: {},
            noData: {
                "applet ": true,
                "embed ": true,
                "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
            },
            hasData: function (elem) {
                elem = elem.nodeType ? jQuery.cache[elem[jQuery.expando]] : elem[jQuery.expando];
                return !!elem && !isEmptyDataObject(elem);
            },
            data: function (elem, name, data) {
                return internalData(elem, name, data);
            },
            removeData: function (elem, name) {
                return internalRemoveData(elem, name);
            },
            _data: function (elem, name, data) {
                return internalData(elem, name, data, true);
            },
            _removeData: function (elem, name) {
                return internalRemoveData(elem, name, true);
            }
        });
    jQuery.fn.extend({
            data: function (key, value) {
                var i, name, data, elem = this[0],
                    attrs = elem && elem.attributes;
                if (key === undefined) {
                        if (this.length) {
                            data = jQuery.data(elem);
                            if (elem.nodeType === 1 && !jQuery._data(elem, "parsedAttrs")) {
                                i = attrs.length;
                                while (i--) {
                                    name = attrs[i].name;
                                    if (name.indexOf("data-") === 0) {
                                        name = jQuery.camelCase(name.slice(5));
                                        dataAttr(elem, name, data[name]);
                                    }
                                }
                                jQuery._data(elem, "parsedAttrs", true);
                            }
                        }
                        return data;
                    }
                if (typeof key === "object") {
                        return this.each(function () {
                            jQuery.data(this, key);
                        });
                    }
                return arguments.length > 1 ? this.each(function () {
                        jQuery.data(this, key, value);
                    }) : elem ? dataAttr(elem, key, jQuery.data(elem, key)) : undefined;
            },
            removeData: function (key) {
                return this.each(function () {
                    jQuery.removeData(this, key);
                });
            }
        });
    jQuery.extend({
            queue: function (elem, type, data) {
                var queue;
                if (elem) {
                    type = (type || "fx") + "queue";
                    queue = jQuery._data(elem, type);
                    if (data) {
                        if (!queue || jQuery.isArray(data)) {
                            queue = jQuery._data(elem, type, jQuery.makeArray(data));
                        } else {
                            queue.push(data);
                        }
                    }
                    return queue || [];
                }
            },
            dequeue: function (elem, type) {
                type = type || "fx";
                var queue = jQuery.queue(elem, type),
                    startLength = queue.length,
                    fn = queue.shift(),
                    hooks = jQuery._queueHooks(elem, type),
                    next = function () {
                        jQuery.dequeue(elem, type);
                    };
                if (fn === "inprogress") {
                        fn = queue.shift();
                        startLength--;
                    }
                if (fn) {
                        if (type === "fx") {
                            queue.unshift("inprogress");
                        }
                        delete hooks.stop;
                        fn.call(elem, next, hooks);
                    }
                if (!startLength && hooks) {
                        hooks.empty.fire();
                    }
            },
            _queueHooks: function (elem, type) {
                var key = type + "queueHooks";
                return jQuery._data(elem, key) || jQuery._data(elem, key, {
                    empty: jQuery.Callbacks("once memory").add(function () {
                        jQuery._removeData(elem, type + "queue");
                        jQuery._removeData(elem, key);
                    })
                });
            }
        });
    jQuery.fn.extend({
            queue: function (type, data) {
                var setter = 2;
                if (typeof type !== "string") {
                    data = type;
                    type = "fx";
                    setter--;
                }
                if (arguments.length < setter) {
                    return jQuery.queue(this[0], type);
                }
                return data === undefined ? this : this.each(function () {
                    var queue = jQuery.queue(this, type, data);
                    jQuery._queueHooks(this, type);
                    if (type === "fx" && queue[0] !== "inprogress") {
                        jQuery.dequeue(this, type);
                    }
                });
            },
            dequeue: function (type) {
                return this.each(function () {
                    jQuery.dequeue(this, type);
                });
            },
            clearQueue: function (type) {
                return this.queue(type || "fx", []);
            },
            promise: function (type, obj) {
                var tmp, count = 1,
                    defer = jQuery.Deferred(),
                    elements = this,
                    i = this.length,
                    resolve = function () {
                        if (!(--count)) {
                            defer.resolveWith(elements, [elements]);
                        }
                    };
                if (typeof type !== "string") {
                        obj = type;
                        type = undefined;
                    }
                type = type || "fx";
                while (i--) {
                        tmp = jQuery._data(elements[i], type + "queueHooks");
                        if (tmp && tmp.empty) {
                            count++;
                            tmp.empty.add(resolve);
                        }
                    }
                resolve();
                return defer.promise(obj);
            }
        });
    var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;
    var cssExpand = ["Top", "Right", "Bottom", "Left"];
    var isHidden = function (elem, el) {
            elem = el || elem;
            return jQuery.css(elem, "display") === "none" || !jQuery.contains(elem.ownerDocument, elem);
        };
    var access = jQuery.access = function (elems, fn, key, value, chainable, emptyGet, raw) {
            var i = 0,
                length = elems.length,
                bulk = key == null;
            if (jQuery.type(key) === "object") {
                    chainable = true;
                    for (i in key) {
                        jQuery.access(elems, fn, i, key[i], true, emptyGet, raw);
                    }
                } else if (value !== undefined) {
                    chainable = true;
                    if (!jQuery.isFunction(value)) {
                        raw = true;
                    }
                    if (bulk) {
                        if (raw) {
                            fn.call(elems, value);
                            fn = null;
                        } else {
                            bulk = fn;
                            fn = function (elem, key, value) {
                                return bulk.call(jQuery(elem), value);
                            };
                        }
                    }
                    if (fn) {
                        for (; i < length; i++) {
                            fn(elems[i], key, raw ? value : value.call(elems[i], i, fn(elems[i], key)));
                        }
                    }
                }
            return chainable ? elems : bulk ? fn.call(elems) : length ? fn(elems[0], key) : emptyGet;
        };
    var rcheckableType = (/^(?:checkbox|radio)$/i);
        (function () {
            var fragment = document.createDocumentFragment(),
                div = document.createElement("div"),
                input = document.createElement("input");
            div.setAttribute("className", "t");
            div.innerHTML = "  <link/><table></table><a href='/a'>a</a>";
            support.leadingWhitespace = div.firstChild.nodeType === 3;
            support.tbody = !div.getElementsByTagName("tbody").length;
            support.htmlSerialize = !! div.getElementsByTagName("link").length;
            support.html5Clone = document.createElement("nav").cloneNode(true).outerHTML !== "<:nav></:nav>";
            input.type = "checkbox";
            input.checked = true;
            fragment.appendChild(input);
            support.appendChecked = input.checked;
            div.innerHTML = "<textarea>x</textarea>";
            support.noCloneChecked = !! div.cloneNode(true).lastChild.defaultValue;
            fragment.appendChild(div);
            div.innerHTML = "<input type='radio' checked='checked' name='t'/>";
            support.checkClone = div.cloneNode(true).cloneNode(true).lastChild.checked;
            support.noCloneEvent = true;
            if (div.attachEvent) {
                    div.attachEvent("onclick", function () {
                        support.noCloneEvent = false;
                    });
                    div.cloneNode(true).click();
                }
            if (support.deleteExpando == null) {
                    support.deleteExpando = true;
                    try {
                        delete div.test;
                    } catch (e) {
                        support.deleteExpando = false;
                    }
                }
            fragment = div = input = null;
        })();
        (function () {
            var i, eventName, div = document.createElement("div");
            for (i in {
                submit: true,
                change: true,
                focusin: true
            }) {
                eventName = "on" + i;
                if (!(support[i + "Bubbles"] = eventName in window)) {
                    div.setAttribute(eventName, "t");
                    support[i + "Bubbles"] = div.attributes[eventName].expando === false;
                }
            }
            div = null;
        })();
    var rformElems = /^(?:input|select|textarea)$/i,
        rkeyEvent = /^key/,
        rmouseEvent = /^(?:mouse|contextmenu)|click/,
        rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
        rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

    function returnTrue() {
            return true;
        }

    function returnFalse() {
            return false;
        }

    function safeActiveElement() {
            try {
                return document.activeElement;
            } catch (err) {}
        }
    jQuery.event = {
            global: {},
            add: function (elem, types, handler, data, selector) {
                var tmp, events, t, handleObjIn, special, eventHandle, handleObj, handlers, type, namespaces, origType, elemData = jQuery._data(elem);
                if (!elemData) {
                    return;
                }
                if (handler.handler) {
                    handleObjIn = handler;
                    handler = handleObjIn.handler;
                    selector = handleObjIn.selector;
                }
                if (!handler.guid) {
                    handler.guid = jQuery.guid++;
                }
                if (!(events = elemData.events)) {
                    events = elemData.events = {};
                }
                if (!(eventHandle = elemData.handle)) {
                    eventHandle = elemData.handle = function (e) {
                        return typeof jQuery !== strundefined && (!e || jQuery.event.triggered !== e.type) ? jQuery.event.dispatch.apply(eventHandle.elem, arguments) : undefined;
                    };
                    eventHandle.elem = elem;
                }
                types = (types || "").match(rnotwhite) || [""];
                t = types.length;
                while (t--) {
                    tmp = rtypenamespace.exec(types[t]) || [];
                    type = origType = tmp[1];
                    namespaces = (tmp[2] || "").split(".").sort();
                    if (!type) {
                        continue;
                    }
                    special = jQuery.event.special[type] || {};
                    type = (selector ? special.delegateType : special.bindType) || type;
                    special = jQuery.event.special[type] || {};
                    handleObj = jQuery.extend({
                        type: type,
                        origType: origType,
                        data: data,
                        handler: handler,
                        guid: handler.guid,
                        selector: selector,
                        needsContext: selector && jQuery.expr.match.needsContext.test(selector),
                        namespace: namespaces.join(".")
                    }, handleObjIn);
                    if (!(handlers = events[type])) {
                        handlers = events[type] = [];
                        handlers.delegateCount = 0;
                        if (!special.setup || special.setup.call(elem, data, namespaces, eventHandle) === false) {
                            if (elem.addEventListener) {
                                elem.addEventListener(type, eventHandle, false);
                            } else if (elem.attachEvent) {
                                elem.attachEvent("on" + type, eventHandle);
                            }
                        }
                    }
                    if (special.add) {
                        special.add.call(elem, handleObj);
                        if (!handleObj.handler.guid) {
                            handleObj.handler.guid = handler.guid;
                        }
                    }
                    if (selector) {
                        handlers.splice(handlers.delegateCount++, 0, handleObj);
                    } else {
                        handlers.push(handleObj);
                    }
                    jQuery.event.global[type] = true;
                }
                elem = null;
            },
            remove: function (elem, types, handler, selector, mappedTypes) {
                var j, handleObj, tmp, origCount, t, events, special, handlers, type, namespaces, origType, elemData = jQuery.hasData(elem) && jQuery._data(elem);
                if (!elemData || !(events = elemData.events)) {
                    return;
                }
                types = (types || "").match(rnotwhite) || [""];
                t = types.length;
                while (t--) {
                    tmp = rtypenamespace.exec(types[t]) || [];
                    type = origType = tmp[1];
                    namespaces = (tmp[2] || "").split(".").sort();
                    if (!type) {
                        for (type in events) {
                            jQuery.event.remove(elem, type + types[t], handler, selector, true);
                        }
                        continue;
                    }
                    special = jQuery.event.special[type] || {};
                    type = (selector ? special.delegateType : special.bindType) || type;
                    handlers = events[type] || [];
                    tmp = tmp[2] && new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)");
                    origCount = j = handlers.length;
                    while (j--) {
                        handleObj = handlers[j];
                        if ((mappedTypes || origType === handleObj.origType) && (!handler || handler.guid === handleObj.guid) && (!tmp || tmp.test(handleObj.namespace)) && (!selector || selector === handleObj.selector || selector === "**" && handleObj.selector)) {
                            handlers.splice(j, 1);
                            if (handleObj.selector) {
                                handlers.delegateCount--;
                            }
                            if (special.remove) {
                                special.remove.call(elem, handleObj);
                            }
                        }
                    }
                    if (origCount && !handlers.length) {
                        if (!special.teardown || special.teardown.call(elem, namespaces, elemData.handle) === false) {
                            jQuery.removeEvent(elem, type, elemData.handle);
                        }
                        delete events[type];
                    }
                }
                if (jQuery.isEmptyObject(events)) {
                    delete elemData.handle;
                    jQuery._removeData(elem, "events");
                }
            },
            trigger: function (event, data, elem, onlyHandlers) {
                var handle, ontype, cur, bubbleType, special, tmp, i, eventPath = [elem || document],
                    type = hasOwn.call(event, "type") ? event.type : event,
                    namespaces = hasOwn.call(event, "namespace") ? event.namespace.split(".") : [];
                cur = tmp = elem = elem || document;
                if (elem.nodeType === 3 || elem.nodeType === 8) {
                        return;
                    }
                if (rfocusMorph.test(type + jQuery.event.triggered)) {
                        return;
                    }
                if (type.indexOf(".") >= 0) {
                        namespaces = type.split(".");
                        type = namespaces.shift();
                        namespaces.sort();
                    }
                ontype = type.indexOf(":") < 0 && "on" + type;
                event = event[jQuery.expando] ? event : new jQuery.Event(type, typeof event === "object" && event);
                event.isTrigger = onlyHandlers ? 2 : 3;
                event.namespace = namespaces.join(".");
                event.namespace_re = event.namespace ? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") : null;
                event.result = undefined;
                if (!event.target) {
                        event.target = elem;
                    }
                data = data == null ? [event] : jQuery.makeArray(data, [event]);
                special = jQuery.event.special[type] || {};
                if (!onlyHandlers && special.trigger && special.trigger.apply(elem, data) === false) {
                        return;
                    }
                if (!onlyHandlers && !special.noBubble && !jQuery.isWindow(elem)) {
                        bubbleType = special.delegateType || type;
                        if (!rfocusMorph.test(bubbleType + type)) {
                            cur = cur.parentNode;
                        }
                        for (; cur; cur = cur.parentNode) {
                            eventPath.push(cur);
                            tmp = cur;
                        }
                        if (tmp === (elem.ownerDocument || document)) {
                            eventPath.push(tmp.defaultView || tmp.parentWindow || window);
                        }
                    }
                i = 0;
                while ((cur = eventPath[i++]) && !event.isPropagationStopped()) {
                        event.type = i > 1 ? bubbleType : special.bindType || type;
                        handle = (jQuery._data(cur, "events") || {})[event.type] && jQuery._data(cur, "handle");
                        if (handle) {
                            handle.apply(cur, data);
                        }
                        handle = ontype && cur[ontype];
                        if (handle && handle.apply && jQuery.acceptData(cur)) {
                            event.result = handle.apply(cur, data);
                            if (event.result === false) {
                                event.preventDefault();
                            }
                        }
                    }
                event.type = type;
                if (!onlyHandlers && !event.isDefaultPrevented()) {
                        if ((!special._default || special._default.apply(eventPath.pop(), data) === false) && jQuery.acceptData(elem)) {
                            if (ontype && elem[type] && !jQuery.isWindow(elem)) {
                                tmp = elem[ontype];
                                if (tmp) {
                                    elem[ontype] = null;
                                }
                                jQuery.event.triggered = type;
                                try {
                                    elem[type]();
                                } catch (e) {}
                                jQuery.event.triggered = undefined;
                                if (tmp) {
                                    elem[ontype] = tmp;
                                }
                            }
                        }
                    }
                return event.result;
            },
            dispatch: function (event) {
                event = jQuery.event.fix(event);
                var i, ret, handleObj, matched, j, handlerQueue = [],
                    args = slice.call(arguments),
                    handlers = (jQuery._data(this, "events") || {})[event.type] || [],
                    special = jQuery.event.special[event.type] || {};
                args[0] = event;
                event.delegateTarget = this;
                if (special.preDispatch && special.preDispatch.call(this, event) === false) {
                        return;
                    }
                handlerQueue = jQuery.event.handlers.call(this, event, handlers);
                i = 0;
                while ((matched = handlerQueue[i++]) && !event.isPropagationStopped()) {
                        event.currentTarget = matched.elem;
                        j = 0;
                        while ((handleObj = matched.handlers[j++]) && !event.isImmediatePropagationStopped()) {
                            if (!event.namespace_re || event.namespace_re.test(handleObj.namespace)) {
                                event.handleObj = handleObj;
                                event.data = handleObj.data;
                                ret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem, args);
                                if (ret !== undefined) {
                                    if ((event.result = ret) === false) {
                                        event.preventDefault();
                                        event.stopPropagation();
                                    }
                                }
                            }
                        }
                    }
                if (special.postDispatch) {
                        special.postDispatch.call(this, event);
                    }
                return event.result;
            },
            handlers: function (event, handlers) {
                var sel, handleObj, matches, i, handlerQueue = [],
                    delegateCount = handlers.delegateCount,
                    cur = event.target;
                if (delegateCount && cur.nodeType && (!event.button || event.type !== "click")) {
                        for (; cur != this; cur = cur.parentNode || this) {
                            if (cur.nodeType === 1 && (cur.disabled !== true || event.type !== "click")) {
                                matches = [];
                                for (i = 0; i < delegateCount; i++) {
                                    handleObj = handlers[i];
                                    sel = handleObj.selector + " ";
                                    if (matches[sel] === undefined) {
                                        matches[sel] = handleObj.needsContext ? jQuery(sel, this).index(cur) >= 0 : jQuery.find(sel, this, null, [cur]).length;
                                    }
                                    if (matches[sel]) {
                                        matches.push(handleObj);
                                    }
                                }
                                if (matches.length) {
                                    handlerQueue.push({
                                        elem: cur,
                                        handlers: matches
                                    });
                                }
                            }
                        }
                    }
                if (delegateCount < handlers.length) {
                        handlerQueue.push({
                            elem: this,
                            handlers: handlers.slice(delegateCount)
                        });
                    }
                return handlerQueue;
            },
            fix: function (event) {
                if (event[jQuery.expando]) {
                    return event;
                }
                var i, prop, copy, type = event.type,
                    originalEvent = event,
                    fixHook = this.fixHooks[type];
                if (!fixHook) {
                        this.fixHooks[type] = fixHook = rmouseEvent.test(type) ? this.mouseHooks : rkeyEvent.test(type) ? this.keyHooks : {};
                    }
                copy = fixHook.props ? this.props.concat(fixHook.props) : this.props;
                event = new jQuery.Event(originalEvent);
                i = copy.length;
                while (i--) {
                        prop = copy[i];
                        event[prop] = originalEvent[prop];
                    }
                if (!event.target) {
                        event.target = originalEvent.srcElement || document;
                    }
                if (event.target.nodeType === 3) {
                        event.target = event.target.parentNode;
                    }
                event.metaKey = !! event.metaKey;
                return fixHook.filter ? fixHook.filter(event, originalEvent) : event;
            },
            props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
            fixHooks: {},
            keyHooks: {
                props: "char charCode key keyCode".split(" "),
                filter: function (event, original) {
                    if (event.which == null) {
                        event.which = original.charCode != null ? original.charCode : original.keyCode;
                    }
                    return event;
                }
            },
            mouseHooks: {
                props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
                filter: function (event, original) {
                    var body, eventDoc, doc, button = original.button,
                        fromElement = original.fromElement;
                    if (event.pageX == null && original.clientX != null) {
                            eventDoc = event.target.ownerDocument || document;
                            doc = eventDoc.documentElement;
                            body = eventDoc.body;
                            event.pageX = original.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
                            event.pageY = original.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0);
                        }
                    if (!event.relatedTarget && fromElement) {
                            event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
                        }
                    if (!event.which && button !== undefined) {
                            event.which = (button & 1 ? 1 : (button & 2 ? 3 : (button & 4 ? 2 : 0)));
                        }
                    return event;
                }
            },
            special: {
                load: {
                    noBubble: true
                },
                focus: {
                    trigger: function () {
                        if (this !== safeActiveElement() && this.focus) {
                            try {
                                this.focus();
                                return false;
                            } catch (e) {}
                        }
                    },
                    delegateType: "focusin"
                },
                blur: {
                    trigger: function () {
                        if (this === safeActiveElement() && this.blur) {
                            this.blur();
                            return false;
                        }
                    },
                    delegateType: "focusout"
                },
                click: {
                    trigger: function () {
                        if (jQuery.nodeName(this, "input") && this.type === "checkbox" && this.click) {
                            this.click();
                            return false;
                        }
                    },
                    _default: function (event) {
                        return jQuery.nodeName(event.target, "a");
                    }
                },
                beforeunload: {
                    postDispatch: function (event) {
                        if (event.result !== undefined) {
                            event.originalEvent.returnValue = event.result;
                        }
                    }
                }
            },
            simulate: function (type, elem, event, bubble) {
                var e = jQuery.extend(new jQuery.Event(), event, {
                    type: type,
                    isSimulated: true,
                    originalEvent: {}
                });
                if (bubble) {
                    jQuery.event.trigger(e, null, elem);
                } else {
                    jQuery.event.dispatch.call(elem, e);
                }
                if (e.isDefaultPrevented()) {
                    event.preventDefault();
                }
            }
        };
    jQuery.removeEvent = document.removeEventListener ?
    function (elem, type, handle) {
            if (elem.removeEventListener) {
                elem.removeEventListener(type, handle, false);
            }
        } : function (elem, type, handle) {
            var name = "on" + type;
            if (elem.detachEvent) {
                if (typeof elem[name] === strundefined) {
                    elem[name] = null;
                }
                elem.detachEvent(name, handle);
            }
        };
    jQuery.Event = function (src, props) {
            if (!(this instanceof jQuery.Event)) {
                return new jQuery.Event(src, props);
            }
            if (src && src.type) {
                this.originalEvent = src;
                this.type = src.type;
                this.isDefaultPrevented = src.defaultPrevented || src.defaultPrevented === undefined && (src.returnValue === false || src.getPreventDefault && src.getPreventDefault()) ? returnTrue : returnFalse;
            } else {
                this.type = src;
            }
            if (props) {
                jQuery.extend(this, props);
            }
            this.timeStamp = src && src.timeStamp || jQuery.now();
            this[jQuery.expando] = true;
        };
    jQuery.Event.prototype = {
            isDefaultPrevented: returnFalse,
            isPropagationStopped: returnFalse,
            isImmediatePropagationStopped: returnFalse,
            preventDefault: function () {
                var e = this.originalEvent;
                this.isDefaultPrevented = returnTrue;
                if (!e) {
                    return;
                }
                if (e.preventDefault) {
                    e.preventDefault();
                } else {
                    e.returnValue = false;
                }
            },
            stopPropagation: function () {
                var e = this.originalEvent;
                this.isPropagationStopped = returnTrue;
                if (!e) {
                    return;
                }
                if (e.stopPropagation) {
                    e.stopPropagation();
                }
                e.cancelBubble = true;
            },
            stopImmediatePropagation: function () {
                this.isImmediatePropagationStopped = returnTrue;
                this.stopPropagation();
            }
        };
    jQuery.each({
            mouseenter: "mouseover",
            mouseleave: "mouseout"
        }, function (orig, fix) {
            jQuery.event.special[orig] = {
                delegateType: fix,
                bindType: fix,
                handle: function (event) {
                    var ret, target = this,
                        related = event.relatedTarget,
                        handleObj = event.handleObj;
                    if (!related || (related !== target && !jQuery.contains(target, related))) {
                            event.type = handleObj.origType;
                            ret = handleObj.handler.apply(this, arguments);
                            event.type = fix;
                        }
                    return ret;
                }
            };
        });
    if (!support.submitBubbles) {
            jQuery.event.special.submit = {
                setup: function () {
                    if (jQuery.nodeName(this, "form")) {
                        return false;
                    }
                    jQuery.event.add(this, "click._submit keypress._submit", function (e) {
                        var elem = e.target,
                            form = jQuery.nodeName(elem, "input") || jQuery.nodeName(elem, "button") ? elem.form : undefined;
                        if (form && !jQuery._data(form, "submitBubbles")) {
                                jQuery.event.add(form, "submit._submit", function (event) {
                                    event._submit_bubble = true;
                                });
                                jQuery._data(form, "submitBubbles", true);
                            }
                    });
                },
                postDispatch: function (event) {
                    if (event._submit_bubble) {
                        delete event._submit_bubble;
                        if (this.parentNode && !event.isTrigger) {
                            jQuery.event.simulate("submit", this.parentNode, event, true);
                        }
                    }
                },
                teardown: function () {
                    if (jQuery.nodeName(this, "form")) {
                        return false;
                    }
                    jQuery.event.remove(this, "._submit");
                }
            };
        }
    if (!support.changeBubbles) {
            jQuery.event.special.change = {
                setup: function () {
                    if (rformElems.test(this.nodeName)) {
                        if (this.type === "checkbox" || this.type === "radio") {
                            jQuery.event.add(this, "propertychange._change", function (event) {
                                if (event.originalEvent.propertyName === "checked") {
                                    this._just_changed = true;
                                }
                            });
                            jQuery.event.add(this, "click._change", function (event) {
                                if (this._just_changed && !event.isTrigger) {
                                    this._just_changed = false;
                                }
                                jQuery.event.simulate("change", this, event, true);
                            });
                        }
                        return false;
                    }
                    jQuery.event.add(this, "beforeactivate._change", function (e) {
                        var elem = e.target;
                        if (rformElems.test(elem.nodeName) && !jQuery._data(elem, "changeBubbles")) {
                            jQuery.event.add(elem, "change._change", function (event) {
                                if (this.parentNode && !event.isSimulated && !event.isTrigger) {
                                    jQuery.event.simulate("change", this.parentNode, event, true);
                                }
                            });
                            jQuery._data(elem, "changeBubbles", true);
                        }
                    });
                },
                handle: function (event) {
                    var elem = event.target;
                    if (this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox")) {
                        return event.handleObj.handler.apply(this, arguments);
                    }
                },
                teardown: function () {
                    jQuery.event.remove(this, "._change");
                    return !rformElems.test(this.nodeName);
                }
            };
        }
    if (!support.focusinBubbles) {
            jQuery.each({
                focus: "focusin",
                blur: "focusout"
            }, function (orig, fix) {
                var handler = function (event) {
                    jQuery.event.simulate(fix, event.target, jQuery.event.fix(event), true);
                };
                jQuery.event.special[fix] = {
                    setup: function () {
                        var doc = this.ownerDocument || this,
                            attaches = jQuery._data(doc, fix);
                        if (!attaches) {
                                doc.addEventListener(orig, handler, true);
                            }
                        jQuery._data(doc, fix, (attaches || 0) + 1);
                    },
                    teardown: function () {
                        var doc = this.ownerDocument || this,
                            attaches = jQuery._data(doc, fix) - 1;
                        if (!attaches) {
                                doc.removeEventListener(orig, handler, true);
                                jQuery._removeData(doc, fix);
                            } else {
                                jQuery._data(doc, fix, attaches);
                            }
                    }
                };
            });
        }
    jQuery.fn.extend({
            on: function (types, selector, data, fn, one) {
                var type, origFn;
                if (typeof types === "object") {
                    if (typeof selector !== "string") {
                        data = data || selector;
                        selector = undefined;
                    }
                    for (type in types) {
                        this.on(type, selector, data, types[type], one);
                    }
                    return this;
                }
                if (data == null && fn == null) {
                    fn = selector;
                    data = selector = undefined;
                } else if (fn == null) {
                    if (typeof selector === "string") {
                        fn = data;
                        data = undefined;
                    } else {
                        fn = data;
                        data = selector;
                        selector = undefined;
                    }
                }
                if (fn === false) {
                    fn = returnFalse;
                } else if (!fn) {
                    return this;
                }
                if (one === 1) {
                    origFn = fn;
                    fn = function (event) {
                        jQuery().off(event);
                        return origFn.apply(this, arguments);
                    };
                    fn.guid = origFn.guid || (origFn.guid = jQuery.guid++);
                }
                return this.each(function () {
                    jQuery.event.add(this, types, fn, data, selector);
                });
            },
            one: function (types, selector, data, fn) {
                return this.on(types, selector, data, fn, 1);
            },
            off: function (types, selector, fn) {
                var handleObj, type;
                if (types && types.preventDefault && types.handleObj) {
                    handleObj = types.handleObj;
                    jQuery(types.delegateTarget).off(handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType, handleObj.selector, handleObj.handler);
                    return this;
                }
                if (typeof types === "object") {
                    for (type in types) {
                        this.off(type, selector, types[type]);
                    }
                    return this;
                }
                if (selector === false || typeof selector === "function") {
                    fn = selector;
                    selector = undefined;
                }
                if (fn === false) {
                    fn = returnFalse;
                }
                return this.each(function () {
                    jQuery.event.remove(this, types, fn, selector);
                });
            },
            trigger: function (type, data) {
                return this.each(function () {
                    jQuery.event.trigger(type, data, this);
                });
            },
            triggerHandler: function (type, data) {
                var elem = this[0];
                if (elem) {
                    return jQuery.event.trigger(type, data, elem, true);
                }
            }
        });

    function createSafeFragment(document) {
            var list = nodeNames.split("|"),
                safeFrag = document.createDocumentFragment();
            if (safeFrag.createElement) {
                    while (list.length) {
                        safeFrag.createElement(list.pop());
                    }
                }
            return safeFrag;
        }
    var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" + "header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
        rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
        rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
        rleadingWhitespace = /^\s+/,
        rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
        rtagName = /<([\w:]+)/,
        rtbody = /<tbody/i,
        rhtml = /<|&#?\w+;/,
        rnoInnerhtml = /<(?:script|style|link)/i,
        rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
        rscriptType = /^$|\/(?:java|ecma)script/i,
        rscriptTypeMasked = /^true\/(.*)/,
        rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
        wrapMap = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            legend: [1, "<fieldset>", "</fieldset>"],
            area: [1, "<map>", "</map>"],
            param: [1, "<object>", "</object>"],
            thead: [1, "<table>", "</table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: support.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
        },
        safeFragment = createSafeFragment(document),
        fragmentDiv = safeFragment.appendChild(document.createElement("div"));
    wrapMap.optgroup = wrapMap.option;
    wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
    wrapMap.th = wrapMap.td;

    function getAll(context, tag) {
            var elems, elem, i = 0,
                found = typeof context.getElementsByTagName !== strundefined ? context.getElementsByTagName(tag || "*") : typeof context.querySelectorAll !== strundefined ? context.querySelectorAll(tag || "*") : undefined;
            if (!found) {
                    for (found = [], elems = context.childNodes || context;
                    (elem = elems[i]) != null; i++) {
                        if (!tag || jQuery.nodeName(elem, tag)) {
                            found.push(elem);
                        } else {
                            jQuery.merge(found, getAll(elem, tag));
                        }
                    }
                }
            return tag === undefined || tag && jQuery.nodeName(context, tag) ? jQuery.merge([context], found) : found;
        }

    function fixDefaultChecked(elem) {
            if (rcheckableType.test(elem.type)) {
                elem.defaultChecked = elem.checked;
            }
        }

    function manipulationTarget(elem, content) {
            return jQuery.nodeName(elem, "table") && jQuery.nodeName(content.nodeType !== 11 ? content : content.firstChild, "tr") ? elem.getElementsByTagName("tbody")[0] || elem.appendChild(elem.ownerDocument.createElement("tbody")) : elem;
        }

    function disableScript(elem) {
            elem.type = (jQuery.find.attr(elem, "type") !== null) + "/" + elem.type;
            return elem;
        }

    function restoreScript(elem) {
            var match = rscriptTypeMasked.exec(elem.type);
            if (match) {
                elem.type = match[1];
            } else {
                elem.removeAttribute("type");
            }
            return elem;
        }

    function setGlobalEval(elems, refElements) {
            var elem, i = 0;
            for (;
            (elem = elems[i]) != null; i++) {
                jQuery._data(elem, "globalEval", !refElements || jQuery._data(refElements[i], "globalEval"));
            }
        }

    function cloneCopyEvent(src, dest) {
            if (dest.nodeType !== 1 || !jQuery.hasData(src)) {
                return;
            }
            var type, i, l, oldData = jQuery._data(src),
                curData = jQuery._data(dest, oldData),
                events = oldData.events;
            if (events) {
                    delete curData.handle;
                    curData.events = {};
                    for (type in events) {
                        for (i = 0, l = events[type].length; i < l; i++) {
                            jQuery.event.add(dest, type, events[type][i]);
                        }
                    }
                }
            if (curData.data) {
                    curData.data = jQuery.extend({}, curData.data);
                }
        }

    function fixCloneNodeIssues(src, dest) {
            var nodeName, e, data;
            if (dest.nodeType !== 1) {
                return;
            }
            nodeName = dest.nodeName.toLowerCase();
            if (!support.noCloneEvent && dest[jQuery.expando]) {
                data = jQuery._data(dest);
                for (e in data.events) {
                    jQuery.removeEvent(dest, e, data.handle);
                }
                dest.removeAttribute(jQuery.expando);
            }
            if (nodeName === "script" && dest.text !== src.text) {
                disableScript(dest).text = src.text;
                restoreScript(dest);
            } else if (nodeName === "object") {
                if (dest.parentNode) {
                    dest.outerHTML = src.outerHTML;
                }
                if (support.html5Clone && (src.innerHTML && !jQuery.trim(dest.innerHTML))) {
                    dest.innerHTML = src.innerHTML;
                }
            } else if (nodeName === "input" && rcheckableType.test(src.type)) {
                dest.defaultChecked = dest.checked = src.checked;
                if (dest.value !== src.value) {
                    dest.value = src.value;
                }
            } else if (nodeName === "option") {
                dest.defaultSelected = dest.selected = src.defaultSelected;
            } else if (nodeName === "input" || nodeName === "textarea") {
                dest.defaultValue = src.defaultValue;
            }
        }
    jQuery.extend({
            clone: function (elem, dataAndEvents, deepDataAndEvents) {
                var destElements, node, clone, i, srcElements, inPage = jQuery.contains(elem.ownerDocument, elem);
                if (support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test("<" + elem.nodeName + ">")) {
                    clone = elem.cloneNode(true);
                } else {
                    fragmentDiv.innerHTML = elem.outerHTML;
                    fragmentDiv.removeChild(clone = fragmentDiv.firstChild);
                }
                if ((!support.noCloneEvent || !support.noCloneChecked) && (elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem)) {
                    destElements = getAll(clone);
                    srcElements = getAll(elem);
                    for (i = 0;
                    (node = srcElements[i]) != null; ++i) {
                        if (destElements[i]) {
                            fixCloneNodeIssues(node, destElements[i]);
                        }
                    }
                }
                if (dataAndEvents) {
                    if (deepDataAndEvents) {
                        srcElements = srcElements || getAll(elem);
                        destElements = destElements || getAll(clone);
                        for (i = 0;
                        (node = srcElements[i]) != null; i++) {
                            cloneCopyEvent(node, destElements[i]);
                        }
                    } else {
                        cloneCopyEvent(elem, clone);
                    }
                }
                destElements = getAll(clone, "script");
                if (destElements.length > 0) {
                    setGlobalEval(destElements, !inPage && getAll(elem, "script"));
                }
                destElements = srcElements = node = null;
                return clone;
            },
            buildFragment: function (elems, context, scripts, selection) {
                var j, elem, contains, tmp, tag, tbody, wrap, l = elems.length,
                    safe = createSafeFragment(context),
                    nodes = [],
                    i = 0;
                for (; i < l; i++) {
                        elem = elems[i];
                        if (elem || elem === 0) {
                            if (jQuery.type(elem) === "object") {
                                jQuery.merge(nodes, elem.nodeType ? [elem] : elem);
                            } else if (!rhtml.test(elem)) {
                                nodes.push(context.createTextNode(elem));
                            } else {
                                tmp = tmp || safe.appendChild(context.createElement("div"));
                                tag = (rtagName.exec(elem) || ["", ""])[1].toLowerCase();
                                wrap = wrapMap[tag] || wrapMap._default;
                                tmp.innerHTML = wrap[1] + elem.replace(rxhtmlTag, "<$1></$2>") + wrap[2];
                                j = wrap[0];
                                while (j--) {
                                    tmp = tmp.lastChild;
                                }
                                if (!support.leadingWhitespace && rleadingWhitespace.test(elem)) {
                                    nodes.push(context.createTextNode(rleadingWhitespace.exec(elem)[0]));
                                }
                                if (!support.tbody) {
                                    elem = tag === "table" && !rtbody.test(elem) ? tmp.firstChild : wrap[1] === "<table>" && !rtbody.test(elem) ? tmp : 0;
                                    j = elem && elem.childNodes.length;
                                    while (j--) {
                                        if (jQuery.nodeName((tbody = elem.childNodes[j]), "tbody") && !tbody.childNodes.length) {
                                            elem.removeChild(tbody);
                                        }
                                    }
                                }
                                jQuery.merge(nodes, tmp.childNodes);
                                tmp.textContent = "";
                                while (tmp.firstChild) {
                                    tmp.removeChild(tmp.firstChild);
                                }
                                tmp = safe.lastChild;
                            }
                        }
                    }
                if (tmp) {
                        safe.removeChild(tmp);
                    }
                if (!support.appendChecked) {
                        jQuery.grep(getAll(nodes, "input"), fixDefaultChecked);
                    }
                i = 0;
                while ((elem = nodes[i++])) {
                        if (selection && jQuery.inArray(elem, selection) !== -1) {
                            continue;
                        }
                        contains = jQuery.contains(elem.ownerDocument, elem);
                        tmp = getAll(safe.appendChild(elem), "script");
                        if (contains) {
                            setGlobalEval(tmp);
                        }
                        if (scripts) {
                            j = 0;
                            while ((elem = tmp[j++])) {
                                if (rscriptType.test(elem.type || "")) {
                                    scripts.push(elem);
                                }
                            }
                        }
                    }
                tmp = null;
                return safe;
            },
            cleanData: function (elems, acceptData) {
                var elem, type, id, data, i = 0,
                    internalKey = jQuery.expando,
                    cache = jQuery.cache,
                    deleteExpando = support.deleteExpando,
                    special = jQuery.event.special;
                for (;
                    (elem = elems[i]) != null; i++) {
                        if (acceptData || jQuery.acceptData(elem)) {
                            id = elem[internalKey];
                            data = id && cache[id];
                            if (data) {
                                if (data.events) {
                                    for (type in data.events) {
                                        if (special[type]) {
                                            jQuery.event.remove(elem, type);
                                        } else {
                                            jQuery.removeEvent(elem, type, data.handle);
                                        }
                                    }
                                }
                                if (cache[id]) {
                                    delete cache[id];
                                    if (deleteExpando) {
                                        delete elem[internalKey];
                                    } else if (typeof elem.removeAttribute !== strundefined) {
                                        elem.removeAttribute(internalKey);
                                    } else {
                                        elem[internalKey] = null;
                                    }
                                    deletedIds.push(id);
                                }
                            }
                        }
                    }
            }
        });
    jQuery.fn.extend({
            text: function (value) {
                return access(this, function (value) {
                    return value === undefined ? jQuery.text(this) : this.empty().append((this[0] && this[0].ownerDocument || document).createTextNode(value));
                }, null, value, arguments.length);
            },
            append: function () {
                return this.domManip(arguments, function (elem) {
                    if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                        var target = manipulationTarget(this, elem);
                        target.appendChild(elem);
                    }
                });
            },
            prepend: function () {
                return this.domManip(arguments, function (elem) {
                    if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                        var target = manipulationTarget(this, elem);
                        target.insertBefore(elem, target.firstChild);
                    }
                });
            },
            before: function () {
                return this.domManip(arguments, function (elem) {
                    if (this.parentNode) {
                        this.parentNode.insertBefore(elem, this);
                    }
                });
            },
            after: function () {
                return this.domManip(arguments, function (elem) {
                    if (this.parentNode) {
                        this.parentNode.insertBefore(elem, this.nextSibling);
                    }
                });
            },
            remove: function (selector, keepData) {
                var elem, elems = selector ? jQuery.filter(selector, this) : this,
                    i = 0;
                for (;
                    (elem = elems[i]) != null; i++) {
                        if (!keepData && elem.nodeType === 1) {
                            jQuery.cleanData(getAll(elem));
                        }
                        if (elem.parentNode) {
                            if (keepData && jQuery.contains(elem.ownerDocument, elem)) {
                                setGlobalEval(getAll(elem, "script"));
                            }
                            elem.parentNode.removeChild(elem);
                        }
                    }
                return this;
            },
            empty: function () {
                var elem, i = 0;
                for (;
                (elem = this[i]) != null; i++) {
                    if (elem.nodeType === 1) {
                        jQuery.cleanData(getAll(elem, false));
                    }
                    while (elem.firstChild) {
                        elem.removeChild(elem.firstChild);
                    }
                    if (elem.options && jQuery.nodeName(elem, "select")) {
                        elem.options.length = 0;
                    }
                }
                return this;
            },
            clone: function (dataAndEvents, deepDataAndEvents) {
                dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
                deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;
                return this.map(function () {
                    return jQuery.clone(this, dataAndEvents, deepDataAndEvents);
                });
            },
            html: function (value) {
                return access(this, function (value) {
                    var elem = this[0] || {},
                        i = 0,
                        l = this.length;
                    if (value === undefined) {
                            return elem.nodeType === 1 ? elem.innerHTML.replace(rinlinejQuery, "") : undefined;
                        }
                    if (typeof value === "string" && !rnoInnerhtml.test(value) && (support.htmlSerialize || !rnoshimcache.test(value)) && (support.leadingWhitespace || !rleadingWhitespace.test(value)) && !wrapMap[(rtagName.exec(value) || ["", ""])[1].toLowerCase()]) {
                            value = value.replace(rxhtmlTag, "<$1></$2>");
                            try {
                                for (; i < l; i++) {
                                    elem = this[i] || {};
                                    if (elem.nodeType === 1) {
                                        jQuery.cleanData(getAll(elem, false));
                                        elem.innerHTML = value;
                                    }
                                }
                                elem = 0;
                            } catch (e) {}
                        }
                    if (elem) {
                            this.empty().append(value);
                        }
                }, null, value, arguments.length);
            },
            replaceWith: function () {
                var arg = arguments[0];
                this.domManip(arguments, function (elem) {
                    arg = this.parentNode;
                    jQuery.cleanData(getAll(this));
                    if (arg) {
                        arg.replaceChild(elem, this);
                    }
                });
                return arg && (arg.length || arg.nodeType) ? this : this.remove();
            },
            detach: function (selector) {
                return this.remove(selector, true);
            },
            domManip: function (args, callback) {
                args = concat.apply([], args);
                var first, node, hasScripts, scripts, doc, fragment, i = 0,
                    l = this.length,
                    set = this,
                    iNoClone = l - 1,
                    value = args[0],
                    isFunction = jQuery.isFunction(value);
                if (isFunction || (l > 1 && typeof value === "string" && !support.checkClone && rchecked.test(value))) {
                        return this.each(function (index) {
                            var self = set.eq(index);
                            if (isFunction) {
                                args[0] = value.call(this, index, self.html());
                            }
                            self.domManip(args, callback);
                        });
                    }
                if (l) {
                        fragment = jQuery.buildFragment(args, this[0].ownerDocument, false, this);
                        first = fragment.firstChild;
                        if (fragment.childNodes.length === 1) {
                            fragment = first;
                        }
                        if (first) {
                            scripts = jQuery.map(getAll(fragment, "script"), disableScript);
                            hasScripts = scripts.length;
                            for (; i < l; i++) {
                                node = fragment;
                                if (i !== iNoClone) {
                                    node = jQuery.clone(node, true, true);
                                    if (hasScripts) {
                                        jQuery.merge(scripts, getAll(node, "script"));
                                    }
                                }
                                callback.call(this[i], node, i);
                            }
                            if (hasScripts) {
                                doc = scripts[scripts.length - 1].ownerDocument;
                                jQuery.map(scripts, restoreScript);
                                for (i = 0; i < hasScripts; i++) {
                                    node = scripts[i];
                                    if (rscriptType.test(node.type || "") && !jQuery._data(node, "globalEval") && jQuery.contains(doc, node)) {
                                        if (node.src) {
                                            if (jQuery._evalUrl) {
                                                jQuery._evalUrl(node.src);
                                            }
                                        } else {
                                            jQuery.globalEval((node.text || node.textContent || node.innerHTML || "").replace(rcleanScript, ""));
                                        }
                                    }
                                }
                            }
                            fragment = first = null;
                        }
                    }
                return this;
            }
        });
    jQuery.each({
            appendTo: "append",
            prependTo: "prepend",
            insertBefore: "before",
            insertAfter: "after",
            replaceAll: "replaceWith"
        }, function (name, original) {
            jQuery.fn[name] = function (selector) {
                var elems, i = 0,
                    ret = [],
                    insert = jQuery(selector),
                    last = insert.length - 1;
                for (; i <= last; i++) {
                        elems = i === last ? this : this.clone(true);
                        jQuery(insert[i])[original](elems);
                        push.apply(ret, elems.get());
                    }
                return this.pushStack(ret);
            };
        });
    var iframe, elemdisplay = {};

    function actualDisplay(name, doc) {
            var elem = jQuery(doc.createElement(name)).appendTo(doc.body),
                display = window.getDefaultComputedStyle ? window.getDefaultComputedStyle(elem[0]).display : jQuery.css(elem[0], "display");
            elem.detach();
            return display;
        }

    function defaultDisplay(nodeName) {
            var doc = document,
                display = elemdisplay[nodeName];
            if (!display) {
                    display = actualDisplay(nodeName, doc);
                    if (display === "none" || !display) {
                        iframe = (iframe || jQuery("<iframe frameborder='0' width='0' height='0'/>")).appendTo(doc.documentElement);
                        doc = (iframe[0].contentWindow || iframe[0].contentDocument).document;
                        doc.write();
                        doc.close();
                        display = actualDisplay(nodeName, doc);
                        iframe.detach();
                    }
                    elemdisplay[nodeName] = display;
                }
            return display;
        }(function () {
            var a, shrinkWrapBlocksVal, div = document.createElement("div"),
                divReset = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;" + "display:block;padding:0;margin:0;border:0";
            div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
            a = div.getElementsByTagName("a")[0];
            a.style.cssText = "float:left;opacity:.5";
            support.opacity = /^0.5/.test(a.style.opacity);
            support.cssFloat = !! a.style.cssFloat;
            div.style.backgroundClip = "content-box";
            div.cloneNode(true).style.backgroundClip = "";
            support.clearCloneStyle = div.style.backgroundClip === "content-box";
            a = div = null;
            support.shrinkWrapBlocks = function () {
                    var body, container, div, containerStyles;
                    if (shrinkWrapBlocksVal == null) {
                        body = document.getElementsByTagName("body")[0];
                        if (!body) {
                            return;
                        }
                        containerStyles = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px";
                        container = document.createElement("div");
                        div = document.createElement("div");
                        body.appendChild(container).appendChild(div);
                        shrinkWrapBlocksVal = false;
                        if (typeof div.style.zoom !== strundefined) {
                            div.style.cssText = divReset + ";width:1px;padding:1px;zoom:1";
                            div.innerHTML = "<div></div>";
                            div.firstChild.style.width = "5px";
                            shrinkWrapBlocksVal = div.offsetWidth !== 3;
                        }
                        body.removeChild(container);
                        body = container = div = null;
                    }
                    return shrinkWrapBlocksVal;
                };
        })();
    var rmargin = (/^margin/);
    var rnumnonpx = new RegExp("^(" + pnum + ")(?!px)[a-z%]+$", "i");
    var getStyles, curCSS, rposition = /^(top|right|bottom|left)$/;
    if (window.getComputedStyle) {
            getStyles = function (elem) {
                return elem.ownerDocument.defaultView.getComputedStyle(elem, null);
            };
            curCSS = function (elem, name, computed) {
                var width, minWidth, maxWidth, ret, style = elem.style;
                computed = computed || getStyles(elem);
                ret = computed ? computed.getPropertyValue(name) || computed[name] : undefined;
                if (computed) {
                    if (ret === "" && !jQuery.contains(elem.ownerDocument, elem)) {
                        ret = jQuery.style(elem, name);
                    }
                    if (rnumnonpx.test(ret) && rmargin.test(name)) {
                        width = style.width;
                        minWidth = style.minWidth;
                        maxWidth = style.maxWidth;
                        style.minWidth = style.maxWidth = style.width = ret;
                        ret = computed.width;
                        style.width = width;
                        style.minWidth = minWidth;
                        style.maxWidth = maxWidth;
                    }
                }
                return ret === undefined ? ret : ret + "";
            };
        } else if (document.documentElement.currentStyle) {
            getStyles = function (elem) {
                return elem.currentStyle;
            };
            curCSS = function (elem, name, computed) {
                var left, rs, rsLeft, ret, style = elem.style;
                computed = computed || getStyles(elem);
                ret = computed ? computed[name] : undefined;
                if (ret == null && style && style[name]) {
                    ret = style[name];
                }
                if (rnumnonpx.test(ret) && !rposition.test(name)) {
                    left = style.left;
                    rs = elem.runtimeStyle;
                    rsLeft = rs && rs.left;
                    if (rsLeft) {
                        rs.left = elem.currentStyle.left;
                    }
                    style.left = name === "fontSize" ? "1em" : ret;
                    ret = style.pixelLeft + "px";
                    style.left = left;
                    if (rsLeft) {
                        rs.left = rsLeft;
                    }
                }
                return ret === undefined ? ret : ret + "" || "auto";
            };
        }

    function addGetHookIf(conditionFn, hookFn) {
            return {
                get: function () {
                    var condition = conditionFn();
                    if (condition == null) {
                        return;
                    }
                    if (condition) {
                        delete this.get;
                        return;
                    }
                    return (this.get = hookFn).apply(this, arguments);
                }
            };
        }(function () {
            var a, reliableHiddenOffsetsVal, boxSizingVal, boxSizingReliableVal, pixelPositionVal, reliableMarginRightVal, div = document.createElement("div"),
                containerStyles = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px",
                divReset = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;" + "display:block;padding:0;margin:0;border:0";
            div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
            a = div.getElementsByTagName("a")[0];
            a.style.cssText = "float:left;opacity:.5";
            support.opacity = /^0.5/.test(a.style.opacity);
            support.cssFloat = !! a.style.cssFloat;
            div.style.backgroundClip = "content-box";
            div.cloneNode(true).style.backgroundClip = "";
            support.clearCloneStyle = div.style.backgroundClip === "content-box";
            a = div = null;
            jQuery.extend(support, {
                    reliableHiddenOffsets: function () {
                        if (reliableHiddenOffsetsVal != null) {
                            return reliableHiddenOffsetsVal;
                        }
                        var container, tds, isSupported, div = document.createElement("div"),
                            body = document.getElementsByTagName("body")[0];
                        if (!body) {
                                return;
                            }
                        div.setAttribute("className", "t");
                        div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
                        container = document.createElement("div");
                        container.style.cssText = containerStyles;
                        body.appendChild(container).appendChild(div);
                        div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
                        tds = div.getElementsByTagName("td");
                        tds[0].style.cssText = "padding:0;margin:0;border:0;display:none";
                        isSupported = (tds[0].offsetHeight === 0);
                        tds[0].style.display = "";
                        tds[1].style.display = "none";
                        reliableHiddenOffsetsVal = isSupported && (tds[0].offsetHeight === 0);
                        body.removeChild(container);
                        div = body = null;
                        return reliableHiddenOffsetsVal;
                    },
                    boxSizing: function () {
                        if (boxSizingVal == null) {
                            computeStyleTests();
                        }
                        return boxSizingVal;
                    },
                    boxSizingReliable: function () {
                        if (boxSizingReliableVal == null) {
                            computeStyleTests();
                        }
                        return boxSizingReliableVal;
                    },
                    pixelPosition: function () {
                        if (pixelPositionVal == null) {
                            computeStyleTests();
                        }
                        return pixelPositionVal;
                    },
                    reliableMarginRight: function () {
                        var body, container, div, marginDiv;
                        if (reliableMarginRightVal == null && window.getComputedStyle) {
                            body = document.getElementsByTagName("body")[0];
                            if (!body) {
                                return;
                            }
                            container = document.createElement("div");
                            div = document.createElement("div");
                            container.style.cssText = containerStyles;
                            body.appendChild(container).appendChild(div);
                            marginDiv = div.appendChild(document.createElement("div"));
                            marginDiv.style.cssText = div.style.cssText = divReset;
                            marginDiv.style.marginRight = marginDiv.style.width = "0";
                            div.style.width = "1px";
                            reliableMarginRightVal = !parseFloat((window.getComputedStyle(marginDiv, null) || {}).marginRight);
                            body.removeChild(container);
                        }
                        return reliableMarginRightVal;
                    }
                });

            function computeStyleTests() {
                    var container, div, body = document.getElementsByTagName("body")[0];
                    if (!body) {
                        return;
                    }
                    container = document.createElement("div");
                    div = document.createElement("div");
                    container.style.cssText = containerStyles;
                    body.appendChild(container).appendChild(div);
                    div.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;" + "position:absolute;display:block;padding:1px;border:1px;width:4px;" + "margin-top:1%;top:1%";
                    jQuery.swap(body, body.style.zoom != null ? {
                        zoom: 1
                    } : {}, function () {
                        boxSizingVal = div.offsetWidth === 4;
                    });
                    boxSizingReliableVal = true;
                    pixelPositionVal = false;
                    reliableMarginRightVal = true;
                    if (window.getComputedStyle) {
                        pixelPositionVal = (window.getComputedStyle(div, null) || {}).top !== "1%";
                        boxSizingReliableVal = (window.getComputedStyle(div, null) || {
                            width: "4px"
                        }).width === "4px";
                    }
                    body.removeChild(container);
                    div = body = null;
                }
        })();
    jQuery.swap = function (elem, options, callback, args) {
            var ret, name, old = {};
            for (name in options) {
                old[name] = elem.style[name];
                elem.style[name] = options[name];
            }
            ret = callback.apply(elem, args || []);
            for (name in options) {
                elem.style[name] = old[name];
            }
            return ret;
        };
    var
    ralpha = /alpha\([^)]*\)/i,
        ropacity = /opacity\s*=\s*([^)]*)/,
        rdisplayswap = /^(none|table(?!-c[ea]).+)/,
        rnumsplit = new RegExp("^(" + pnum + ")(.*)$", "i"),
        rrelNum = new RegExp("^([+-])=(" + pnum + ")", "i"),
        cssShow = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        },
        cssNormalTransform = {
            letterSpacing: 0,
            fontWeight: 400
        },
        cssPrefixes = ["Webkit", "O", "Moz", "ms"];

    function vendorPropName(style, name) {
            if (name in style) {
                return name;
            }
            var capName = name.charAt(0).toUpperCase() + name.slice(1),
                origName = name,
                i = cssPrefixes.length;
            while (i--) {
                    name = cssPrefixes[i] + capName;
                    if (name in style) {
                        return name;
                    }
                }
            return origName;
        }

    function showHide(elements, show) {
            var display, elem, hidden, values = [],
                index = 0,
                length = elements.length;
            for (; index < length; index++) {
                    elem = elements[index];
                    if (!elem.style) {
                        continue;
                    }
                    values[index] = jQuery._data(elem, "olddisplay");
                    display = elem.style.display;
                    if (show) {
                        if (!values[index] && display === "none") {
                            elem.style.display = "";
                        }
                        if (elem.style.display === "" && isHidden(elem)) {
                            values[index] = jQuery._data(elem, "olddisplay", defaultDisplay(elem.nodeName));
                        }
                    } else {
                        if (!values[index]) {
                            hidden = isHidden(elem);
                            if (display && display !== "none" || !hidden) {
                                jQuery._data(elem, "olddisplay", hidden ? display : jQuery.css(elem, "display"));
                            }
                        }
                    }
                }
            for (index = 0; index < length; index++) {
                    elem = elements[index];
                    if (!elem.style) {
                        continue;
                    }
                    if (!show || elem.style.display === "none" || elem.style.display === "") {
                        elem.style.display = show ? values[index] || "" : "none";
                    }
                }
            return elements;
        }

    function setPositiveNumber(elem, value, subtract) {
            var matches = rnumsplit.exec(value);
            return matches ? Math.max(0, matches[1] - (subtract || 0)) + (matches[2] || "px") : value;
        }

    function augmentWidthOrHeight(elem, name, extra, isBorderBox, styles) {
            var i = extra === (isBorderBox ? "border" : "content") ? 4 : name === "width" ? 1 : 0,
                val = 0;
            for (; i < 4; i += 2) {
                    if (extra === "margin") {
                        val += jQuery.css(elem, extra + cssExpand[i], true, styles);
                    }
                    if (isBorderBox) {
                        if (extra === "content") {
                            val -= jQuery.css(elem, "padding" + cssExpand[i], true, styles);
                        }
                        if (extra !== "margin") {
                            val -= jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
                        }
                    } else {
                        val += jQuery.css(elem, "padding" + cssExpand[i], true, styles);
                        if (extra !== "padding") {
                            val += jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
                        }
                    }
                }
            return val;
        }

    function getWidthOrHeight(elem, name, extra) {
            var valueIsBorderBox = true,
                val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
                styles = getStyles(elem),
                isBorderBox = support.boxSizing() && jQuery.css(elem, "boxSizing", false, styles) === "border-box";
            if (val <= 0 || val == null) {
                    val = curCSS(elem, name, styles);
                    if (val < 0 || val == null) {
                        val = elem.style[name];
                    }
                    if (rnumnonpx.test(val)) {
                        return val;
                    }
                    valueIsBorderBox = isBorderBox && (support.boxSizingReliable() || val === elem.style[name]);
                    val = parseFloat(val) || 0;
                }
            return (val + augmentWidthOrHeight(elem, name, extra || (isBorderBox ? "border" : "content"), valueIsBorderBox, styles)) + "px";
        }
    jQuery.extend({
            cssHooks: {
                opacity: {
                    get: function (elem, computed) {
                        if (computed) {
                            var ret = curCSS(elem, "opacity");
                            return ret === "" ? "1" : ret;
                        }
                    }
                }
            },
            cssNumber: {
                "columnCount": true,
                "fillOpacity": true,
                "fontWeight": true,
                "lineHeight": true,
                "opacity": true,
                "order": true,
                "orphans": true,
                "widows": true,
                "zIndex": true,
                "zoom": true
            },
            cssProps: {
                "float": support.cssFloat ? "cssFloat" : "styleFloat"
            },
            style: function (elem, name, value, extra) {
                if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
                    return;
                }
                var ret, type, hooks, origName = jQuery.camelCase(name),
                    style = elem.style;
                name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(style, origName));
                hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];
                if (value !== undefined) {
                        type = typeof value;
                        if (type === "string" && (ret = rrelNum.exec(value))) {
                            value = (ret[1] + 1) * ret[2] + parseFloat(jQuery.css(elem, name));
                            type = "number";
                        }
                        if (value == null || value !== value) {
                            return;
                        }
                        if (type === "number" && !jQuery.cssNumber[origName]) {
                            value += "px";
                        }
                        if (!support.clearCloneStyle && value === "" && name.indexOf("background") === 0) {
                            style[name] = "inherit";
                        }
                        if (!hooks || !("set" in hooks) || (value = hooks.set(elem, value, extra)) !== undefined) {
                            try {
                                style[name] = "";
                                style[name] = value;
                            } catch (e) {}
                        }
                    } else {
                        if (hooks && "get" in hooks && (ret = hooks.get(elem, false, extra)) !== undefined) {
                            return ret;
                        }
                        return style[name];
                    }
            },
            css: function (elem, name, extra, styles) {
                var num, val, hooks, origName = jQuery.camelCase(name);
                name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(elem.style, origName));
                hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];
                if (hooks && "get" in hooks) {
                    val = hooks.get(elem, true, extra);
                }
                if (val === undefined) {
                    val = curCSS(elem, name, styles);
                }
                if (val === "normal" && name in cssNormalTransform) {
                    val = cssNormalTransform[name];
                }
                if (extra === "" || extra) {
                    num = parseFloat(val);
                    return extra === true || jQuery.isNumeric(num) ? num || 0 : val;
                }
                return val;
            }
        });
    jQuery.each(["height", "width"], function (i, name) {
            jQuery.cssHooks[name] = {
                get: function (elem, computed, extra) {
                    if (computed) {
                        return elem.offsetWidth === 0 && rdisplayswap.test(jQuery.css(elem, "display")) ? jQuery.swap(elem, cssShow, function () {
                            return getWidthOrHeight(elem, name, extra);
                        }) : getWidthOrHeight(elem, name, extra);
                    }
                },
                set: function (elem, value, extra) {
                    var styles = extra && getStyles(elem);
                    return setPositiveNumber(elem, value, extra ? augmentWidthOrHeight(elem, name, extra, support.boxSizing() && jQuery.css(elem, "boxSizing", false, styles) === "border-box", styles) : 0);
                }
            };
        });
    if (!support.opacity) {
            jQuery.cssHooks.opacity = {
                get: function (elem, computed) {
                    return ropacity.test((computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "") ? (0.01 * parseFloat(RegExp.$1)) + "" : computed ? "1" : "";
                },
                set: function (elem, value) {
                    var style = elem.style,
                        currentStyle = elem.currentStyle,
                        opacity = jQuery.isNumeric(value) ? "alpha(opacity=" + value * 100 + ")" : "",
                        filter = currentStyle && currentStyle.filter || style.filter || "";
                    style.zoom = 1;
                    if ((value >= 1 || value === "") && jQuery.trim(filter.replace(ralpha, "")) === "" && style.removeAttribute) {
                            style.removeAttribute("filter");
                            if (value === "" || currentStyle && !currentStyle.filter) {
                                return;
                            }
                        }
                    style.filter = ralpha.test(filter) ? filter.replace(ralpha, opacity) : filter + " " + opacity;
                }
            };
        }
    jQuery.cssHooks.marginRight = addGetHookIf(support.reliableMarginRight, function (elem, computed) {
            if (computed) {
                return jQuery.swap(elem, {
                    "display": "inline-block"
                }, curCSS, [elem, "marginRight"]);
            }
        });
    jQuery.each({
            margin: "",
            padding: "",
            border: "Width"
        }, function (prefix, suffix) {
            jQuery.cssHooks[prefix + suffix] = {
                expand: function (value) {
                    var i = 0,
                        expanded = {},
                        parts = typeof value === "string" ? value.split(" ") : [value];
                    for (; i < 4; i++) {
                            expanded[prefix + cssExpand[i] + suffix] = parts[i] || parts[i - 2] || parts[0];
                        }
                    return expanded;
                }
            };
            if (!rmargin.test(prefix)) {
                jQuery.cssHooks[prefix + suffix].set = setPositiveNumber;
            }
        });
    jQuery.fn.extend({
            css: function (name, value) {
                return access(this, function (elem, name, value) {
                    var styles, len, map = {},
                        i = 0;
                    if (jQuery.isArray(name)) {
                            styles = getStyles(elem);
                            len = name.length;
                            for (; i < len; i++) {
                                map[name[i]] = jQuery.css(elem, name[i], false, styles);
                            }
                            return map;
                        }
                    return value !== undefined ? jQuery.style(elem, name, value) : jQuery.css(elem, name);
                }, name, value, arguments.length > 1);
            },
            show: function () {
                return showHide(this, true);
            },
            hide: function () {
                return showHide(this);
            },
            toggle: function (state) {
                if (typeof state === "boolean") {
                    return state ? this.show() : this.hide();
                }
                return this.each(function () {
                    if (isHidden(this)) {
                        jQuery(this).show();
                    } else {
                        jQuery(this).hide();
                    }
                });
            }
        });

    function Tween(elem, options, prop, end, easing) {
            return new Tween.prototype.init(elem, options, prop, end, easing);
        }
    jQuery.Tween = Tween;
    Tween.prototype = {
            constructor: Tween,
            init: function (elem, options, prop, end, easing, unit) {
                this.elem = elem;
                this.prop = prop;
                this.easing = easing || "swing";
                this.options = options;
                this.start = this.now = this.cur();
                this.end = end;
                this.unit = unit || (jQuery.cssNumber[prop] ? "" : "px");
            },
            cur: function () {
                var hooks = Tween.propHooks[this.prop];
                return hooks && hooks.get ? hooks.get(this) : Tween.propHooks._default.get(this);
            },
            run: function (percent) {
                var eased, hooks = Tween.propHooks[this.prop];
                if (this.options.duration) {
                    this.pos = eased = jQuery.easing[this.easing](percent, this.options.duration * percent, 0, 1, this.options.duration);
                } else {
                    this.pos = eased = percent;
                }
                this.now = (this.end - this.start) * eased + this.start;
                if (this.options.step) {
                    this.options.step.call(this.elem, this.now, this);
                }
                if (hooks && hooks.set) {
                    hooks.set(this);
                } else {
                    Tween.propHooks._default.set(this);
                }
                return this;
            }
        };
    Tween.prototype.init.prototype = Tween.prototype;
    Tween.propHooks = {
            _default: {
                get: function (tween) {
                    var result;
                    if (tween.elem[tween.prop] != null && (!tween.elem.style || tween.elem.style[tween.prop] == null)) {
                        return tween.elem[tween.prop];
                    }
                    result = jQuery.css(tween.elem, tween.prop, "");
                    return !result || result === "auto" ? 0 : result;
                },
                set: function (tween) {
                    if (jQuery.fx.step[tween.prop]) {
                        jQuery.fx.step[tween.prop](tween);
                    } else if (tween.elem.style && (tween.elem.style[jQuery.cssProps[tween.prop]] != null || jQuery.cssHooks[tween.prop])) {
                        jQuery.style(tween.elem, tween.prop, tween.now + tween.unit);
                    } else {
                        tween.elem[tween.prop] = tween.now;
                    }
                }
            }
        };
    Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
            set: function (tween) {
                if (tween.elem.nodeType && tween.elem.parentNode) {
                    tween.elem[tween.prop] = tween.now;
                }
            }
        };
    jQuery.easing = {
            linear: function (p) {
                return p;
            },
            swing: function (p) {
                return 0.5 - Math.cos(p * Math.PI) / 2;
            }
        };
    jQuery.fx = Tween.prototype.init;
    jQuery.fx.step = {};
    var
    fxNow, timerId, rfxtypes = /^(?:toggle|show|hide)$/,
        rfxnum = new RegExp("^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i"),
        rrun = /queueHooks$/,
        animationPrefilters = [defaultPrefilter],
        tweeners = {
            "*": [function (prop, value) {
                var tween = this.createTween(prop, value),
                    target = tween.cur(),
                    parts = rfxnum.exec(value),
                    unit = parts && parts[3] || (jQuery.cssNumber[prop] ? "" : "px"),
                    start = (jQuery.cssNumber[prop] || unit !== "px" && +target) && rfxnum.exec(jQuery.css(tween.elem, prop)),
                    scale = 1,
                    maxIterations = 20;
                if (start && start[3] !== unit) {
                        unit = unit || start[3];
                        parts = parts || [];
                        start = +target || 1;
                        do {
                            scale = scale || ".5";
                            start = start / scale;
                            jQuery.style(tween.elem, prop, start + unit);
                        } while (scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations);
                    }
                if (parts) {
                        start = tween.start = +start || +target || 0;
                        tween.unit = unit;
                        tween.end = parts[1] ? start + (parts[1] + 1) * parts[2] : +parts[2];
                    }
                return tween;
            }]
        };

    function createFxNow() {
            setTimeout(function () {
                fxNow = undefined;
            });
            return (fxNow = jQuery.now());
        }

    function genFx(type, includeWidth) {
            var which, attrs = {
                height: type
            },
                i = 0;
            includeWidth = includeWidth ? 1 : 0;
            for (; i < 4; i += 2 - includeWidth) {
                    which = cssExpand[i];
                    attrs["margin" + which] = attrs["padding" + which] = type;
                }
            if (includeWidth) {
                    attrs.opacity = attrs.width = type;
                }
            return attrs;
        }

    function createTween(value, prop, animation) {
            var tween, collection = (tweeners[prop] || []).concat(tweeners["*"]),
                index = 0,
                length = collection.length;
            for (; index < length; index++) {
                    if ((tween = collection[index].call(animation, prop, value))) {
                        return tween;
                    }
                }
        }

    function defaultPrefilter(elem, props, opts) {
            var prop, value, toggle, tween, hooks, oldfire, display, dDisplay, anim = this,
                orig = {},
                style = elem.style,
                hidden = elem.nodeType && isHidden(elem),
                dataShow = jQuery._data(elem, "fxshow");
            if (!opts.queue) {
                    hooks = jQuery._queueHooks(elem, "fx");
                    if (hooks.unqueued == null) {
                        hooks.unqueued = 0;
                        oldfire = hooks.empty.fire;
                        hooks.empty.fire = function () {
                            if (!hooks.unqueued) {
                                oldfire();
                            }
                        };
                    }
                    hooks.unqueued++;
                    anim.always(function () {
                        anim.always(function () {
                            hooks.unqueued--;
                            if (!jQuery.queue(elem, "fx").length) {
                                hooks.empty.fire();
                            }
                        });
                    });
                }
            if (elem.nodeType === 1 && ("height" in props || "width" in props)) {
                    opts.overflow = [style.overflow, style.overflowX, style.overflowY];
                    display = jQuery.css(elem, "display");
                    dDisplay = defaultDisplay(elem.nodeName);
                    if (display === "none") {
                        display = dDisplay;
                    }
                    if (display === "inline" && jQuery.css(elem, "float") === "none") {
                        if (!support.inlineBlockNeedsLayout || dDisplay === "inline") {
                            style.display = "inline-block";
                        } else {
                            style.zoom = 1;
                        }
                    }
                }
            if (opts.overflow) {
                    style.overflow = "hidden";
                    if (!support.shrinkWrapBlocks()) {
                        anim.always(function () {
                            style.overflow = opts.overflow[0];
                            style.overflowX = opts.overflow[1];
                            style.overflowY = opts.overflow[2];
                        });
                    }
                }
            for (prop in props) {
                    value = props[prop];
                    if (rfxtypes.exec(value)) {
                        delete props[prop];
                        toggle = toggle || value === "toggle";
                        if (value === (hidden ? "hide" : "show")) {
                            if (value === "show" && dataShow && dataShow[prop] !== undefined) {
                                hidden = true;
                            } else {
                                continue;
                            }
                        }
                        orig[prop] = dataShow && dataShow[prop] || jQuery.style(elem, prop);
                    }
                }
            if (!jQuery.isEmptyObject(orig)) {
                    if (dataShow) {
                        if ("hidden" in dataShow) {
                            hidden = dataShow.hidden;
                        }
                    } else {
                        dataShow = jQuery._data(elem, "fxshow", {});
                    }
                    if (toggle) {
                        dataShow.hidden = !hidden;
                    }
                    if (hidden) {
                        jQuery(elem).show();
                    } else {
                        anim.done(function () {
                            jQuery(elem).hide();
                        });
                    }
                    anim.done(function () {
                        var prop;
                        jQuery._removeData(elem, "fxshow");
                        for (prop in orig) {
                            jQuery.style(elem, prop, orig[prop]);
                        }
                    });
                    for (prop in orig) {
                        tween = createTween(hidden ? dataShow[prop] : 0, prop, anim);
                        if (!(prop in dataShow)) {
                            dataShow[prop] = tween.start;
                            if (hidden) {
                                tween.end = tween.start;
                                tween.start = prop === "width" || prop === "height" ? 1 : 0;
                            }
                        }
                    }
                }
        }

    function propFilter(props, specialEasing) {
            var index, name, easing, value, hooks;
            for (index in props) {
                name = jQuery.camelCase(index);
                easing = specialEasing[name];
                value = props[index];
                if (jQuery.isArray(value)) {
                    easing = value[1];
                    value = props[index] = value[0];
                }
                if (index !== name) {
                    props[name] = value;
                    delete props[index];
                }
                hooks = jQuery.cssHooks[name];
                if (hooks && "expand" in hooks) {
                    value = hooks.expand(value);
                    delete props[name];
                    for (index in value) {
                        if (!(index in props)) {
                            props[index] = value[index];
                            specialEasing[index] = easing;
                        }
                    }
                } else {
                    specialEasing[name] = easing;
                }
            }
        }

    function Animation(elem, properties, options) {
            var result, stopped, index = 0,
                length = animationPrefilters.length,
                deferred = jQuery.Deferred().always(function () {
                    delete tick.elem;
                }),
                tick = function () {
                    if (stopped) {
                        return false;
                    }
                    var currentTime = fxNow || createFxNow(),
                        remaining = Math.max(0, animation.startTime + animation.duration - currentTime),
                        temp = remaining / animation.duration || 0,
                        percent = 1 - temp,
                        index = 0,
                        length = animation.tweens.length;
                    for (; index < length; index++) {
                            animation.tweens[index].run(percent);
                        }
                    deferred.notifyWith(elem, [animation, percent, remaining]);
                    if (percent < 1 && length) {
                            return remaining;
                        } else {
                            deferred.resolveWith(elem, [animation]);
                            return false;
                        }
                },
                animation = deferred.promise({
                    elem: elem,
                    props: jQuery.extend({}, properties),
                    opts: jQuery.extend(true, {
                        specialEasing: {}
                    }, options),
                    originalProperties: properties,
                    originalOptions: options,
                    startTime: fxNow || createFxNow(),
                    duration: options.duration,
                    tweens: [],
                    createTween: function (prop, end) {
                        var tween = jQuery.Tween(elem, animation.opts, prop, end, animation.opts.specialEasing[prop] || animation.opts.easing);
                        animation.tweens.push(tween);
                        return tween;
                    },
                    stop: function (gotoEnd) {
                        var index = 0,
                            length = gotoEnd ? animation.tweens.length : 0;
                        if (stopped) {
                                return this;
                            }
                        stopped = true;
                        for (; index < length; index++) {
                                animation.tweens[index].run(1);
                            }
                        if (gotoEnd) {
                                deferred.resolveWith(elem, [animation, gotoEnd]);
                            } else {
                                deferred.rejectWith(elem, [animation, gotoEnd]);
                            }
                        return this;
                    }
                }),
                props = animation.props;
            propFilter(props, animation.opts.specialEasing);
            for (; index < length; index++) {
                    result = animationPrefilters[index].call(animation, elem, props, animation.opts);
                    if (result) {
                        return result;
                    }
                }
            jQuery.map(props, createTween, animation);
            if (jQuery.isFunction(animation.opts.start)) {
                    animation.opts.start.call(elem, animation);
                }
            jQuery.fx.timer(jQuery.extend(tick, {
                    elem: elem,
                    anim: animation,
                    queue: animation.opts.queue
                }));
            return animation.progress(animation.opts.progress).done(animation.opts.done, animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always);
        }
    jQuery.Animation = jQuery.extend(Animation, {
            tweener: function (props, callback) {
                if (jQuery.isFunction(props)) {
                    callback = props;
                    props = ["*"];
                } else {
                    props = props.split(" ");
                }
                var prop, index = 0,
                    length = props.length;
                for (; index < length; index++) {
                        prop = props[index];
                        tweeners[prop] = tweeners[prop] || [];
                        tweeners[prop].unshift(callback);
                    }
            },
            prefilter: function (callback, prepend) {
                if (prepend) {
                    animationPrefilters.unshift(callback);
                } else {
                    animationPrefilters.push(callback);
                }
            }
        });
    jQuery.speed = function (speed, easing, fn) {
            var opt = speed && typeof speed === "object" ? jQuery.extend({}, speed) : {
                complete: fn || !fn && easing || jQuery.isFunction(speed) && speed,
                duration: speed,
                easing: fn && easing || easing && !jQuery.isFunction(easing) && easing
            };
            opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration : opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[opt.duration] : jQuery.fx.speeds._default;
            if (opt.queue == null || opt.queue === true) {
                opt.queue = "fx";
            }
            opt.old = opt.complete;
            opt.complete = function () {
                if (jQuery.isFunction(opt.old)) {
                    opt.old.call(this);
                }
                if (opt.queue) {
                    jQuery.dequeue(this, opt.queue);
                }
            };
            return opt;
        };
    jQuery.fn.extend({
            fadeTo: function (speed, to, easing, callback) {
                return this.filter(isHidden).css("opacity", 0).show().end().animate({
                    opacity: to
                }, speed, easing, callback);
            },
            animate: function (prop, speed, easing, callback) {
                var empty = jQuery.isEmptyObject(prop),
                    optall = jQuery.speed(speed, easing, callback),
                    doAnimation = function () {
                        var anim = Animation(this, jQuery.extend({}, prop), optall);
                        if (empty || jQuery._data(this, "finish")) {
                            anim.stop(true);
                        }
                    };
                doAnimation.finish = doAnimation;
                return empty || optall.queue === false ? this.each(doAnimation) : this.queue(optall.queue, doAnimation);
            },
            stop: function (type, clearQueue, gotoEnd) {
                var stopQueue = function (hooks) {
                    var stop = hooks.stop;
                    delete hooks.stop;
                    stop(gotoEnd);
                };
                if (typeof type !== "string") {
                    gotoEnd = clearQueue;
                    clearQueue = type;
                    type = undefined;
                }
                if (clearQueue && type !== false) {
                    this.queue(type || "fx", []);
                }
                return this.each(function () {
                    var dequeue = true,
                        index = type != null && type + "queueHooks",
                        timers = jQuery.timers,
                        data = jQuery._data(this);
                    if (index) {
                            if (data[index] && data[index].stop) {
                                stopQueue(data[index]);
                            }
                        } else {
                            for (index in data) {
                                if (data[index] && data[index].stop && rrun.test(index)) {
                                    stopQueue(data[index]);
                                }
                            }
                        }
                    for (index = timers.length; index--;) {
                            if (timers[index].elem === this && (type == null || timers[index].queue === type)) {
                                timers[index].anim.stop(gotoEnd);
                                dequeue = false;
                                timers.splice(index, 1);
                            }
                        }
                    if (dequeue || !gotoEnd) {
                            jQuery.dequeue(this, type);
                        }
                });
            },
            finish: function (type) {
                if (type !== false) {
                    type = type || "fx";
                }
                return this.each(function () {
                    var index, data = jQuery._data(this),
                        queue = data[type + "queue"],
                        hooks = data[type + "queueHooks"],
                        timers = jQuery.timers,
                        length = queue ? queue.length : 0;
                    data.finish = true;
                    jQuery.queue(this, type, []);
                    if (hooks && hooks.stop) {
                            hooks.stop.call(this, true);
                        }
                    for (index = timers.length; index--;) {
                            if (timers[index].elem === this && timers[index].queue === type) {
                                timers[index].anim.stop(true);
                                timers.splice(index, 1);
                            }
                        }
                    for (index = 0; index < length; index++) {
                            if (queue[index] && queue[index].finish) {
                                queue[index].finish.call(this);
                            }
                        }
                    delete data.finish;
                });
            }
        });
    jQuery.each(["toggle", "show", "hide"], function (i, name) {
            var cssFn = jQuery.fn[name];
            jQuery.fn[name] = function (speed, easing, callback) {
                return speed == null || typeof speed === "boolean" ? cssFn.apply(this, arguments) : this.animate(genFx(name, true), speed, easing, callback);
            };
        });
    jQuery.each({
            slideDown: genFx("show"),
            slideUp: genFx("hide"),
            slideToggle: genFx("toggle"),
            fadeIn: {
                opacity: "show"
            },
            fadeOut: {
                opacity: "hide"
            },
            fadeToggle: {
                opacity: "toggle"
            }
        }, function (name, props) {
            jQuery.fn[name] = function (speed, easing, callback) {
                return this.animate(props, speed, easing, callback);
            };
        });
    jQuery.timers = [];
    jQuery.fx.tick = function () {
            var timer, timers = jQuery.timers,
                i = 0;
            fxNow = jQuery.now();
            for (; i < timers.length; i++) {
                    timer = timers[i];
                    if (!timer() && timers[i] === timer) {
                        timers.splice(i--, 1);
                    }
                }
            if (!timers.length) {
                    jQuery.fx.stop();
                }
            fxNow = undefined;
        };
    jQuery.fx.timer = function (timer) {
            jQuery.timers.push(timer);
            if (timer()) {
                jQuery.fx.start();
            } else {
                jQuery.timers.pop();
            }
        };
    jQuery.fx.interval = 13;
    jQuery.fx.start = function () {
            if (!timerId) {
                timerId = setInterval(jQuery.fx.tick, jQuery.fx.interval);
            }
        };
    jQuery.fx.stop = function () {
            clearInterval(timerId);
            timerId = null;
        };
    jQuery.fx.speeds = {
            slow: 600,
            fast: 200,
            _default: 400
        };
    jQuery.fn.delay = function (time, type) {
            time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
            type = type || "fx";
            return this.queue(type, function (next, hooks) {
                var timeout = setTimeout(next, time);
                hooks.stop = function () {
                    clearTimeout(timeout);
                };
            });
        };
        (function () {
            var a, input, select, opt, div = document.createElement("div");
            div.setAttribute("className", "t");
            div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
            a = div.getElementsByTagName("a")[0];
            select = document.createElement("select");
            opt = select.appendChild(document.createElement("option"));
            input = div.getElementsByTagName("input")[0];
            a.style.cssText = "top:1px";
            support.getSetAttribute = div.className !== "t";
            support.style = /top/.test(a.getAttribute("style"));
            support.hrefNormalized = a.getAttribute("href") === "/a";
            support.checkOn = !! input.value;
            support.optSelected = opt.selected;
            support.enctype = !! document.createElement("form").enctype;
            select.disabled = true;
            support.optDisabled = !opt.disabled;
            input = document.createElement("input");
            input.setAttribute("value", "");
            support.input = input.getAttribute("value") === "";
            input.value = "t";
            input.setAttribute("type", "radio");
            support.radioValue = input.value === "t";
            a = input = select = opt = div = null;
        })();
    var rreturn = /\r/g;
    jQuery.fn.extend({
            val: function (value) {
                var hooks, ret, isFunction, elem = this[0];
                if (!arguments.length) {
                    if (elem) {
                        hooks = jQuery.valHooks[elem.type] || jQuery.valHooks[elem.nodeName.toLowerCase()];
                        if (hooks && "get" in hooks && (ret = hooks.get(elem, "value")) !== undefined) {
                            return ret;
                        }
                        ret = elem.value;
                        return typeof ret === "string" ? ret.replace(rreturn, "") : ret == null ? "" : ret;
                    }
                    return;
                }
                isFunction = jQuery.isFunction(value);
                return this.each(function (i) {
                    var val;
                    if (this.nodeType !== 1) {
                        return;
                    }
                    if (isFunction) {
                        val = value.call(this, i, jQuery(this).val());
                    } else {
                        val = value;
                    }
                    if (val == null) {
                        val = "";
                    } else if (typeof val === "number") {
                        val += "";
                    } else if (jQuery.isArray(val)) {
                        val = jQuery.map(val, function (value) {
                            return value == null ? "" : value + "";
                        });
                    }
                    hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()];
                    if (!hooks || !("set" in hooks) || hooks.set(this, val, "value") === undefined) {
                        this.value = val;
                    }
                });
            }
        });
    jQuery.extend({
            valHooks: {
                option: {
                    get: function (elem) {
                        var val = jQuery.find.attr(elem, "value");
                        return val != null ? val : jQuery.text(elem);
                    }
                },
                select: {
                    get: function (elem) {
                        var value, option, options = elem.options,
                            index = elem.selectedIndex,
                            one = elem.type === "select-one" || index < 0,
                            values = one ? null : [],
                            max = one ? index + 1 : options.length,
                            i = index < 0 ? max : one ? index : 0;
                        for (; i < max; i++) {
                                option = options[i];
                                if ((option.selected || i === index) && (support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null) && (!option.parentNode.disabled || !jQuery.nodeName(option.parentNode, "optgroup"))) {
                                    value = jQuery(option).val();
                                    if (one) {
                                        return value;
                                    }
                                    values.push(value);
                                }
                            }
                        return values;
                    },
                    set: function (elem, value) {
                        var optionSet, option, options = elem.options,
                            values = jQuery.makeArray(value),
                            i = options.length;
                        while (i--) {
                                option = options[i];
                                if (jQuery.inArray(jQuery.valHooks.option.get(option), values) >= 0) {
                                    try {
                                        option.selected = optionSet = true;
                                    } catch (_) {
                                        option.scrollHeight;
                                    }
                                } else {
                                    option.selected = false;
                                }
                            }
                        if (!optionSet) {
                                elem.selectedIndex = -1;
                            }
                        return options;
                    }
                }
            }
        });
    jQuery.each(["radio", "checkbox"], function () {
            jQuery.valHooks[this] = {
                set: function (elem, value) {
                    if (jQuery.isArray(value)) {
                        return (elem.checked = jQuery.inArray(jQuery(elem).val(), value) >= 0);
                    }
                }
            };
            if (!support.checkOn) {
                jQuery.valHooks[this].get = function (elem) {
                    return elem.getAttribute("value") === null ? "on" : elem.value;
                };
            }
        });
    var nodeHook, boolHook, attrHandle = jQuery.expr.attrHandle,
        ruseDefault = /^(?:checked|selected)$/i,
        getSetAttribute = support.getSetAttribute,
        getSetInput = support.input;
    jQuery.fn.extend({
            attr: function (name, value) {
                return access(this, jQuery.attr, name, value, arguments.length > 1);
            },
            removeAttr: function (name) {
                return this.each(function () {
                    jQuery.removeAttr(this, name);
                });
            }
        });
    jQuery.extend({
            attr: function (elem, name, value) {
                var hooks, ret, nType = elem.nodeType;
                if (!elem || nType === 3 || nType === 8 || nType === 2) {
                    return;
                }
                if (typeof elem.getAttribute === strundefined) {
                    return jQuery.prop(elem, name, value);
                }
                if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
                    name = name.toLowerCase();
                    hooks = jQuery.attrHooks[name] || (jQuery.expr.match.bool.test(name) ? boolHook : nodeHook);
                }
                if (value !== undefined) {
                    if (value === null) {
                        jQuery.removeAttr(elem, name);
                    } else if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
                        return ret;
                    } else {
                        elem.setAttribute(name, value + "");
                        return value;
                    }
                } else if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
                    return ret;
                } else {
                    ret = jQuery.find.attr(elem, name);
                    return ret == null ? undefined : ret;
                }
            },
            removeAttr: function (elem, value) {
                var name, propName, i = 0,
                    attrNames = value && value.match(rnotwhite);
                if (attrNames && elem.nodeType === 1) {
                        while ((name = attrNames[i++])) {
                            propName = jQuery.propFix[name] || name;
                            if (jQuery.expr.match.bool.test(name)) {
                                if (getSetInput && getSetAttribute || !ruseDefault.test(name)) {
                                    elem[propName] = false;
                                } else {
                                    elem[jQuery.camelCase("default-" + name)] = elem[propName] = false;
                                }
                            } else {
                                jQuery.attr(elem, name, "");
                            }
                            elem.removeAttribute(getSetAttribute ? name : propName);
                        }
                    }
            },
            attrHooks: {
                type: {
                    set: function (elem, value) {
                        if (!support.radioValue && value === "radio" && jQuery.nodeName(elem, "input")) {
                            var val = elem.value;
                            elem.setAttribute("type", value);
                            if (val) {
                                elem.value = val;
                            }
                            return value;
                        }
                    }
                }
            }
        });
    boolHook = {
            set: function (elem, value, name) {
                if (value === false) {
                    jQuery.removeAttr(elem, name);
                } else if (getSetInput && getSetAttribute || !ruseDefault.test(name)) {
                    elem.setAttribute(!getSetAttribute && jQuery.propFix[name] || name, name);
                } else {
                    elem[jQuery.camelCase("default-" + name)] = elem[name] = true;
                }
                return name;
            }
        };
    jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function (i, name) {
            var getter = attrHandle[name] || jQuery.find.attr;
            attrHandle[name] = getSetInput && getSetAttribute || !ruseDefault.test(name) ?
            function (elem, name, isXML) {
                var ret, handle;
                if (!isXML) {
                    handle = attrHandle[name];
                    attrHandle[name] = ret;
                    ret = getter(elem, name, isXML) != null ? name.toLowerCase() : null;
                    attrHandle[name] = handle;
                }
                return ret;
            } : function (elem, name, isXML) {
                if (!isXML) {
                    return elem[jQuery.camelCase("default-" + name)] ? name.toLowerCase() : null;
                }
            };
        });
    if (!getSetInput || !getSetAttribute) {
            jQuery.attrHooks.value = {
                set: function (elem, value, name) {
                    if (jQuery.nodeName(elem, "input")) {
                        elem.defaultValue = value;
                    } else {
                        return nodeHook && nodeHook.set(elem, value, name);
                    }
                }
            };
        }
    if (!getSetAttribute) {
            nodeHook = {
                set: function (elem, value, name) {
                    var ret = elem.getAttributeNode(name);
                    if (!ret) {
                        elem.setAttributeNode((ret = elem.ownerDocument.createAttribute(name)));
                    }
                    ret.value = value += "";
                    if (name === "value" || value === elem.getAttribute(name)) {
                        return value;
                    }
                }
            };
            attrHandle.id = attrHandle.name = attrHandle.coords = function (elem, name, isXML) {
                var ret;
                if (!isXML) {
                    return (ret = elem.getAttributeNode(name)) && ret.value !== "" ? ret.value : null;
                }
            };
            jQuery.valHooks.button = {
                get: function (elem, name) {
                    var ret = elem.getAttributeNode(name);
                    if (ret && ret.specified) {
                        return ret.value;
                    }
                },
                set: nodeHook.set
            };
            jQuery.attrHooks.contenteditable = {
                set: function (elem, value, name) {
                    nodeHook.set(elem, value === "" ? false : value, name);
                }
            };
            jQuery.each(["width", "height"], function (i, name) {
                jQuery.attrHooks[name] = {
                    set: function (elem, value) {
                        if (value === "") {
                            elem.setAttribute(name, "auto");
                            return value;
                        }
                    }
                };
            });
        }
    if (!support.style) {
            jQuery.attrHooks.style = {
                get: function (elem) {
                    return elem.style.cssText || undefined;
                },
                set: function (elem, value) {
                    return (elem.style.cssText = value + "");
                }
            };
        }
    var rfocusable = /^(?:input|select|textarea|button|object)$/i,
        rclickable = /^(?:a|area)$/i;
    jQuery.fn.extend({
            prop: function (name, value) {
                return access(this, jQuery.prop, name, value, arguments.length > 1);
            },
            removeProp: function (name) {
                name = jQuery.propFix[name] || name;
                return this.each(function () {
                    try {
                        this[name] = undefined;
                        delete this[name];
                    } catch (e) {}
                });
            }
        });
    jQuery.extend({
            propFix: {
                "for": "htmlFor",
                "class": "className"
            },
            prop: function (elem, name, value) {
                var ret, hooks, notxml, nType = elem.nodeType;
                if (!elem || nType === 3 || nType === 8 || nType === 2) {
                    return;
                }
                notxml = nType !== 1 || !jQuery.isXMLDoc(elem);
                if (notxml) {
                    name = jQuery.propFix[name] || name;
                    hooks = jQuery.propHooks[name];
                }
                if (value !== undefined) {
                    return hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined ? ret : (elem[name] = value);
                } else {
                    return hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null ? ret : elem[name];
                }
            },
            propHooks: {
                tabIndex: {
                    get: function (elem) {
                        var tabindex = jQuery.find.attr(elem, "tabindex");
                        return tabindex ? parseInt(tabindex, 10) : rfocusable.test(elem.nodeName) || rclickable.test(elem.nodeName) && elem.href ? 0 : -1;
                    }
                }
            }
        });
    if (!support.hrefNormalized) {
            jQuery.each(["href", "src"], function (i, name) {
                jQuery.propHooks[name] = {
                    get: function (elem) {
                        return elem.getAttribute(name, 4);
                    }
                };
            });
        }
    if (!support.optSelected) {
            jQuery.propHooks.selected = {
                get: function (elem) {
                    var parent = elem.parentNode;
                    if (parent) {
                        parent.selectedIndex;
                        if (parent.parentNode) {
                            parent.parentNode.selectedIndex;
                        }
                    }
                    return null;
                }
            };
        }
    jQuery.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
            jQuery.propFix[this.toLowerCase()] = this;
        });
    if (!support.enctype) {
            jQuery.propFix.enctype = "encoding";
        }
    var rclass = /[\t\r\n\f]/g;
    jQuery.fn.extend({
            addClass: function (value) {
                var classes, elem, cur, clazz, j, finalValue, i = 0,
                    len = this.length,
                    proceed = typeof value === "string" && value;
                if (jQuery.isFunction(value)) {
                        return this.each(function (j) {
                            jQuery(this).addClass(value.call(this, j, this.className));
                        });
                    }
                if (proceed) {
                        classes = (value || "").match(rnotwhite) || [];
                        for (; i < len; i++) {
                            elem = this[i];
                            cur = elem.nodeType === 1 && (elem.className ? (" " + elem.className + " ").replace(rclass, " ") : " ");
                            if (cur) {
                                j = 0;
                                while ((clazz = classes[j++])) {
                                    if (cur.indexOf(" " + clazz + " ") < 0) {
                                        cur += clazz + " ";
                                    }
                                }
                                finalValue = jQuery.trim(cur);
                                if (elem.className !== finalValue) {
                                    elem.className = finalValue;
                                }
                            }
                        }
                    }
                return this;
            },
            removeClass: function (value) {
                var classes, elem, cur, clazz, j, finalValue, i = 0,
                    len = this.length,
                    proceed = arguments.length === 0 || typeof value === "string" && value;
                if (jQuery.isFunction(value)) {
                        return this.each(function (j) {
                            jQuery(this).removeClass(value.call(this, j, this.className));
                        });
                    }
                if (proceed) {
                        classes = (value || "").match(rnotwhite) || [];
                        for (; i < len; i++) {
                            elem = this[i];
                            cur = elem.nodeType === 1 && (elem.className ? (" " + elem.className + " ").replace(rclass, " ") : "");
                            if (cur) {
                                j = 0;
                                while ((clazz = classes[j++])) {
                                    while (cur.indexOf(" " + clazz + " ") >= 0) {
                                        cur = cur.replace(" " + clazz + " ", " ");
                                    }
                                }
                                finalValue = value ? jQuery.trim(cur) : "";
                                if (elem.className !== finalValue) {
                                    elem.className = finalValue;
                                }
                            }
                        }
                    }
                return this;
            },
            toggleClass: function (value, stateVal) {
                var type = typeof value;
                if (typeof stateVal === "boolean" && type === "string") {
                    return stateVal ? this.addClass(value) : this.removeClass(value);
                }
                if (jQuery.isFunction(value)) {
                    return this.each(function (i) {
                        jQuery(this).toggleClass(value.call(this, i, this.className, stateVal), stateVal);
                    });
                }
                return this.each(function () {
                    if (type === "string") {
                        var className, i = 0,
                            self = jQuery(this),
                            classNames = value.match(rnotwhite) || [];
                        while ((className = classNames[i++])) {
                                if (self.hasClass(className)) {
                                    self.removeClass(className);
                                } else {
                                    self.addClass(className);
                                }
                            }
                    } else if (type === strundefined || type === "boolean") {
                        if (this.className) {
                            jQuery._data(this, "__className__", this.className);
                        }
                        this.className = this.className || value === false ? "" : jQuery._data(this, "__className__") || "";
                    }
                });
            },
            hasClass: function (selector) {
                var className = " " + selector + " ",
                    i = 0,
                    l = this.length;
                for (; i < l; i++) {
                        if (this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf(className) >= 0) {
                            return true;
                        }
                    }
                return false;
            }
        });
    jQuery.each(("blur focus focusin focusout load resize scroll unload click dblclick " + "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " + "change select submit keydown keypress keyup error contextmenu").split(" "), function (i, name) {
            jQuery.fn[name] = function (data, fn) {
                return arguments.length > 0 ? this.on(name, null, data, fn) : this.trigger(name);
            };
        });
    jQuery.fn.extend({
            hover: function (fnOver, fnOut) {
                return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
            },
            bind: function (types, data, fn) {
                return this.on(types, null, data, fn);
            },
            unbind: function (types, fn) {
                return this.off(types, null, fn);
            },
            delegate: function (selector, types, data, fn) {
                return this.on(types, selector, data, fn);
            },
            undelegate: function (selector, types, fn) {
                return arguments.length === 1 ? this.off(selector, "**") : this.off(types, selector || "**", fn);
            }
        });
    var nonce = jQuery.now();
    var rquery = (/\?/);
    var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
    jQuery.parseJSON = function (data) {
            if (window.JSON && window.JSON.parse) {
                return window.JSON.parse(data + "");
            }
            var requireNonComma, depth = null,
                str = jQuery.trim(data + "");
            return str && !jQuery.trim(str.replace(rvalidtokens, function (token, comma, open, close) {
                    if (requireNonComma && comma) {
                        depth = 0;
                    }
                    if (depth === 0) {
                        return token;
                    }
                    requireNonComma = open || comma;
                    depth += !close - !open;
                    return "";
                })) ? (Function("return " + str))() : jQuery.error("Invalid JSON: " + data);
        };
    jQuery.parseXML = function (data) {
            var xml, tmp;
            if (!data || typeof data !== "string") {
                return null;
            }
            try {
                if (window.DOMParser) {
                    tmp = new DOMParser();
                    xml = tmp.parseFromString(data, "text/xml");
                } else {
                    xml = new ActiveXObject("Microsoft.XMLDOM");
                    xml.async = "false";
                    xml.loadXML(data);
                }
            } catch (e) {
                xml = undefined;
            }
            if (!xml || !xml.documentElement || xml.getElementsByTagName("parsererror").length) {
                jQuery.error("Invalid XML: " + data);
            }
            return xml;
        };
    var
    ajaxLocParts, ajaxLocation, rhash = /#.*$/,
        rts = /([?&])_=[^&]*/,
        rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,
        rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
        rnoContent = /^(?:GET|HEAD)$/,
        rprotocol = /^\/\//,
        rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
        prefilters = {},
        transports = {},
        allTypes = "*/".concat("*");
    try {
            ajaxLocation = location.href;
        } catch (e) {
            ajaxLocation = document.createElement("a");
            ajaxLocation.href = "";
            ajaxLocation = ajaxLocation.href;
        }
    ajaxLocParts = rurl.exec(ajaxLocation.toLowerCase()) || [];

    function addToPrefiltersOrTransports(structure) {
            return function (dataTypeExpression, func) {
                if (typeof dataTypeExpression !== "string") {
                    func = dataTypeExpression;
                    dataTypeExpression = "*";
                }
                var dataType, i = 0,
                    dataTypes = dataTypeExpression.toLowerCase().match(rnotwhite) || [];
                if (jQuery.isFunction(func)) {
                        while ((dataType = dataTypes[i++])) {
                            if (dataType.charAt(0) === "+") {
                                dataType = dataType.slice(1) || "*";
                                (structure[dataType] = structure[dataType] || []).unshift(func);
                            } else {
                                (structure[dataType] = structure[dataType] || []).push(func);
                            }
                        }
                    }
            };
        }

    function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {
            var inspected = {},
                seekingTransport = (structure === transports);

            function inspect(dataType) {
                    var selected;
                    inspected[dataType] = true;
                    jQuery.each(structure[dataType] || [], function (_, prefilterOrFactory) {
                        var dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);
                        if (typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[dataTypeOrTransport]) {
                            options.dataTypes.unshift(dataTypeOrTransport);
                            inspect(dataTypeOrTransport);
                            return false;
                        } else if (seekingTransport) {
                            return !(selected = dataTypeOrTransport);
                        }
                    });
                    return selected;
                }
            return inspect(options.dataTypes[0]) || !inspected["*"] && inspect("*");
        }

    function ajaxExtend(target, src) {
            var deep, key, flatOptions = jQuery.ajaxSettings.flatOptions || {};
            for (key in src) {
                if (src[key] !== undefined) {
                    (flatOptions[key] ? target : (deep || (deep = {})))[key] = src[key];
                }
            }
            if (deep) {
                jQuery.extend(true, target, deep);
            }
            return target;
        }

    function ajaxHandleResponses(s, jqXHR, responses) {
            var firstDataType, ct, finalDataType, type, contents = s.contents,
                dataTypes = s.dataTypes;
            while (dataTypes[0] === "*") {
                    dataTypes.shift();
                    if (ct === undefined) {
                        ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
                    }
                }
            if (ct) {
                    for (type in contents) {
                        if (contents[type] && contents[type].test(ct)) {
                            dataTypes.unshift(type);
                            break;
                        }
                    }
                }
            if (dataTypes[0] in responses) {
                    finalDataType = dataTypes[0];
                } else {
                    for (type in responses) {
                        if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
                            finalDataType = type;
                            break;
                        }
                        if (!firstDataType) {
                            firstDataType = type;
                        }
                    }
                    finalDataType = finalDataType || firstDataType;
                }
            if (finalDataType) {
                    if (finalDataType !== dataTypes[0]) {
                        dataTypes.unshift(finalDataType);
                    }
                    return responses[finalDataType];
                }
        }

    function ajaxConvert(s, response, jqXHR, isSuccess) {
            var conv2, current, conv, tmp, prev, converters = {},
                dataTypes = s.dataTypes.slice();
            if (dataTypes[1]) {
                    for (conv in s.converters) {
                        converters[conv.toLowerCase()] = s.converters[conv];
                    }
                }
            current = dataTypes.shift();
            while (current) {
                    if (s.responseFields[current]) {
                        jqXHR[s.responseFields[current]] = response;
                    }
                    if (!prev && isSuccess && s.dataFilter) {
                        response = s.dataFilter(response, s.dataType);
                    }
                    prev = current;
                    current = dataTypes.shift();
                    if (current) {
                        if (current === "*") {
                            current = prev;
                        } else if (prev !== "*" && prev !== current) {
                            conv = converters[prev + " " + current] || converters["* " + current];
                            if (!conv) {
                                for (conv2 in converters) {
                                    tmp = conv2.split(" ");
                                    if (tmp[1] === current) {
                                        conv = converters[prev + " " + tmp[0]] || converters["* " + tmp[0]];
                                        if (conv) {
                                            if (conv === true) {
                                                conv = converters[conv2];
                                            } else if (converters[conv2] !== true) {
                                                current = tmp[0];
                                                dataTypes.unshift(tmp[1]);
                                            }
                                            break;
                                        }
                                    }
                                }
                            }
                            if (conv !== true) {
                                if (conv && s["throws"]) {
                                    response = conv(response);
                                } else {
                                    try {
                                        response = conv(response);
                                    } catch (e) {
                                        return {
                                            state: "parsererror",
                                            error: conv ? e : "No conversion from " + prev + " to " + current
                                        };
                                    }
                                }
                            }
                        }
                    }
                }
            return {
                    state: "success",
                    data: response
                };
        }
    jQuery.extend({
            active: 0,
            lastModified: {},
            etag: {},
            ajaxSettings: {
                url: ajaxLocation,
                type: "GET",
                isLocal: rlocalProtocol.test(ajaxLocParts[1]),
                global: true,
                processData: true,
                async: true,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                accepts: {
                    "*": allTypes,
                    text: "text/plain",
                    html: "text/html",
                    xml: "application/xml, text/xml",
                    json: "application/json, text/javascript"
                },
                contents: {
                    xml: /xml/,
                    html: /html/,
                    json: /json/
                },
                responseFields: {
                    xml: "responseXML",
                    text: "responseText",
                    json: "responseJSON"
                },
                converters: {
                    "* text": String,
                    "text html": true,
                    "text json": jQuery.parseJSON,
                    "text xml": jQuery.parseXML
                },
                flatOptions: {
                    url: true,
                    context: true
                }
            },
            ajaxSetup: function (target, settings) {
                return settings ? ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings) : ajaxExtend(jQuery.ajaxSettings, target);
            },
            ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
            ajaxTransport: addToPrefiltersOrTransports(transports),
            ajax: function (url, options) {
                if (typeof url === "object") {
                    options = url;
                    url = undefined;
                }
                options = options || {};
                var
                parts, i, cacheURL, responseHeadersString, timeoutTimer, fireGlobals, transport, responseHeaders, s = jQuery.ajaxSetup({}, options),
                    callbackContext = s.context || s,
                    globalEventContext = s.context && (callbackContext.nodeType || callbackContext.jquery) ? jQuery(callbackContext) : jQuery.event,
                    deferred = jQuery.Deferred(),
                    completeDeferred = jQuery.Callbacks("once memory"),
                    statusCode = s.statusCode || {},
                    requestHeaders = {},
                    requestHeadersNames = {},
                    state = 0,
                    strAbort = "canceled",
                    jqXHR = {
                        readyState: 0,
                        getResponseHeader: function (key) {
                            var match;
                            if (state === 2) {
                                if (!responseHeaders) {
                                    responseHeaders = {};
                                    while ((match = rheaders.exec(responseHeadersString))) {
                                        responseHeaders[match[1].toLowerCase()] = match[2];
                                    }
                                }
                                match = responseHeaders[key.toLowerCase()];
                            }
                            return match == null ? null : match;
                        },
                        getAllResponseHeaders: function () {
                            return state === 2 ? responseHeadersString : null;
                        },
                        setRequestHeader: function (name, value) {
                            var lname = name.toLowerCase();
                            if (!state) {
                                name = requestHeadersNames[lname] = requestHeadersNames[lname] || name;
                                requestHeaders[name] = value;
                            }
                            return this;
                        },
                        overrideMimeType: function (type) {
                            if (!state) {
                                s.mimeType = type;
                            }
                            return this;
                        },
                        statusCode: function (map) {
                            var code;
                            if (map) {
                                if (state < 2) {
                                    for (code in map) {
                                        statusCode[code] = [statusCode[code], map[code]];
                                    }
                                } else {
                                    jqXHR.always(map[jqXHR.status]);
                                }
                            }
                            return this;
                        },
                        abort: function (statusText) {
                            var finalText = statusText || strAbort;
                            if (transport) {
                                transport.abort(finalText);
                            }
                            done(0, finalText);
                            return this;
                        }
                    };
                deferred.promise(jqXHR).complete = completeDeferred.add;
                jqXHR.success = jqXHR.done;
                jqXHR.error = jqXHR.fail;
                s.url = ((url || s.url || ajaxLocation) + "").replace(rhash, "").replace(rprotocol, ajaxLocParts[1] + "//");
                s.type = options.method || options.type || s.method || s.type;
                s.dataTypes = jQuery.trim(s.dataType || "*").toLowerCase().match(rnotwhite) || [""];
                if (s.crossDomain == null) {
                        parts = rurl.exec(s.url.toLowerCase());
                        s.crossDomain = !! (parts && (parts[1] !== ajaxLocParts[1] || parts[2] !== ajaxLocParts[2] || (parts[3] || (parts[1] === "http:" ? "80" : "443")) !== (ajaxLocParts[3] || (ajaxLocParts[1] === "http:" ? "80" : "443"))));
                    }
                if (s.data && s.processData && typeof s.data !== "string") {
                        s.data = jQuery.param(s.data, s.traditional);
                    }
                inspectPrefiltersOrTransports(prefilters, s, options, jqXHR);
                if (state === 2) {
                        return jqXHR;
                    }
                fireGlobals = s.global;
                if (fireGlobals && jQuery.active++ === 0) {
                        jQuery.event.trigger("ajaxStart");
                    }
                s.type = s.type.toUpperCase();
                s.hasContent = !rnoContent.test(s.type);
                cacheURL = s.url;
                if (!s.hasContent) {
                        if (s.data) {
                            cacheURL = (s.url += (rquery.test(cacheURL) ? "&" : "?") + s.data);
                            delete s.data;
                        }
                        if (s.cache === false) {
                            s.url = rts.test(cacheURL) ? cacheURL.replace(rts, "$1_=" + nonce++) : cacheURL + (rquery.test(cacheURL) ? "&" : "?") + "_=" + nonce++;
                        }
                    }
                if (s.ifModified) {
                        if (jQuery.lastModified[cacheURL]) {
                            jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[cacheURL]);
                        }
                        if (jQuery.etag[cacheURL]) {
                            jqXHR.setRequestHeader("If-None-Match", jQuery.etag[cacheURL]);
                        }
                    }
                if (s.data && s.hasContent && s.contentType !== false || options.contentType) {
                        jqXHR.setRequestHeader("Content-Type", s.contentType);
                    }
                jqXHR.setRequestHeader("Accept", s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + (s.dataTypes[0] !== "*" ? ", " + allTypes + "; q=0.01" : "") : s.accepts["*"]);
                for (i in s.headers) {
                        jqXHR.setRequestHeader(i, s.headers[i]);
                    }
                if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === false || state === 2)) {
                        return jqXHR.abort();
                    }
                strAbort = "abort";
                for (i in {
                        success: 1,
                        error: 1,
                        complete: 1
                    }) {
                        jqXHR[i](s[i]);
                    }
                transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR);
                if (!transport) {
                        done(-1, "No Transport");
                    } else {
                        jqXHR.readyState = 1;
                        if (fireGlobals) {
                            globalEventContext.trigger("ajaxSend", [jqXHR, s]);
                        }
                        if (s.async && s.timeout > 0) {
                            timeoutTimer = setTimeout(function () {
                                jqXHR.abort("timeout");
                            }, s.timeout);
                        }
                        try {
                            state = 1;
                            transport.send(requestHeaders, done);
                        } catch (e) {
                            if (state < 2) {
                                done(-1, e);
                            } else {
                                throw e;
                            }
                        }
                    }

                function done(status, nativeStatusText, responses, headers) {
                        var isSuccess, success, error, response, modified, statusText = nativeStatusText;
                        if (state === 2) {
                            return;
                        }
                        state = 2;
                        if (timeoutTimer) {
                            clearTimeout(timeoutTimer);
                        }
                        transport = undefined;
                        responseHeadersString = headers || "";
                        jqXHR.readyState = status > 0 ? 4 : 0;
                        isSuccess = status >= 200 && status < 300 || status === 304;
                        if (responses) {
                            response = ajaxHandleResponses(s, jqXHR, responses);
                        }
                        response = ajaxConvert(s, response, jqXHR, isSuccess);
                        if (isSuccess) {
                            if (s.ifModified) {
                                modified = jqXHR.getResponseHeader("Last-Modified");
                                if (modified) {
                                    jQuery.lastModified[cacheURL] = modified;
                                }
                                modified = jqXHR.getResponseHeader("etag");
                                if (modified) {
                                    jQuery.etag[cacheURL] = modified;
                                }
                            }
                            if (status === 204 || s.type === "HEAD") {
                                statusText = "nocontent";
                            } else if (status === 304) {
                                statusText = "notmodified";
                            } else {
                                statusText = response.state;
                                success = response.data;
                                error = response.error;
                                isSuccess = !error;
                            }
                        } else {
                            error = statusText;
                            if (status || !statusText) {
                                statusText = "error";
                                if (status < 0) {
                                    status = 0;
                                }
                            }
                        }
                        jqXHR.status = status;
                        jqXHR.statusText = (nativeStatusText || statusText) + "";
                        if (isSuccess) {
                            deferred.resolveWith(callbackContext, [success, statusText, jqXHR]);
                        } else {
                            deferred.rejectWith(callbackContext, [jqXHR, statusText, error]);
                        }
                        jqXHR.statusCode(statusCode);
                        statusCode = undefined;
                        if (fireGlobals) {
                            globalEventContext.trigger(isSuccess ? "ajaxSuccess" : "ajaxError", [jqXHR, s, isSuccess ? success : error]);
                        }
                        completeDeferred.fireWith(callbackContext, [jqXHR, statusText]);
                        if (fireGlobals) {
                            globalEventContext.trigger("ajaxComplete", [jqXHR, s]);
                            if (!(--jQuery.active)) {
                                jQuery.event.trigger("ajaxStop");
                            }
                        }
                    }
                return jqXHR;
            },
            getJSON: function (url, data, callback) {
                return jQuery.get(url, data, callback, "json");
            },
            getScript: function (url, callback) {
                return jQuery.get(url, undefined, callback, "script");
            }
        });
    jQuery.each(["get", "post"], function (i, method) {
            jQuery[method] = function (url, data, callback, type) {
                if (jQuery.isFunction(data)) {
                    type = type || callback;
                    callback = data;
                    data = undefined;
                }
                return jQuery.ajax({
                    url: url,
                    type: method,
                    dataType: type,
                    data: data,
                    success: callback
                });
            };
        });
    jQuery.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (i, type) {
            jQuery.fn[type] = function (fn) {
                return this.on(type, fn);
            };
        });
    jQuery._evalUrl = function (url) {
            return jQuery.ajax({
                url: url,
                type: "GET",
                dataType: "script",
                async: false,
                global: false,
                "throws": true
            });
        };
    jQuery.fn.extend({
            wrapAll: function (html) {
                if (jQuery.isFunction(html)) {
                    return this.each(function (i) {
                        jQuery(this).wrapAll(html.call(this, i));
                    });
                }
                if (this[0]) {
                    var wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(true);
                    if (this[0].parentNode) {
                        wrap.insertBefore(this[0]);
                    }
                    wrap.map(function () {
                        var elem = this;
                        while (elem.firstChild && elem.firstChild.nodeType === 1) {
                            elem = elem.firstChild;
                        }
                        return elem;
                    }).append(this);
                }
                return this;
            },
            wrapInner: function (html) {
                if (jQuery.isFunction(html)) {
                    return this.each(function (i) {
                        jQuery(this).wrapInner(html.call(this, i));
                    });
                }
                return this.each(function () {
                    var self = jQuery(this),
                        contents = self.contents();
                    if (contents.length) {
                            contents.wrapAll(html);
                        } else {
                            self.append(html);
                        }
                });
            },
            wrap: function (html) {
                var isFunction = jQuery.isFunction(html);
                return this.each(function (i) {
                    jQuery(this).wrapAll(isFunction ? html.call(this, i) : html);
                });
            },
            unwrap: function () {
                return this.parent().each(function () {
                    if (!jQuery.nodeName(this, "body")) {
                        jQuery(this).replaceWith(this.childNodes);
                    }
                }).end();
            }
        });
    jQuery.expr.filters.hidden = function (elem) {
            return elem.offsetWidth <= 0 && elem.offsetHeight <= 0 || (!support.reliableHiddenOffsets() && ((elem.style && elem.style.display) || jQuery.css(elem, "display")) === "none");
        };
    jQuery.expr.filters.visible = function (elem) {
            return !jQuery.expr.filters.hidden(elem);
        };
    var r20 = /%20/g,
        rbracket = /\[\]$/,
        rCRLF = /\r?\n/g,
        rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
        rsubmittable = /^(?:input|select|textarea|keygen)/i;

    function buildParams(prefix, obj, traditional, add) {
            var name;
            if (jQuery.isArray(obj)) {
                jQuery.each(obj, function (i, v) {
                    if (traditional || rbracket.test(prefix)) {
                        add(prefix, v);
                    } else {
                        buildParams(prefix + "[" + (typeof v === "object" ? i : "") + "]", v, traditional, add);
                    }
                });
            } else if (!traditional && jQuery.type(obj) === "object") {
                for (name in obj) {
                    buildParams(prefix + "[" + name + "]", obj[name], traditional, add);
                }
            } else {
                add(prefix, obj);
            }
        }
    jQuery.param = function (a, traditional) {
            var prefix, s = [],
                add = function (key, value) {
                    value = jQuery.isFunction(value) ? value() : (value == null ? "" : value);
                    s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
                };
            if (traditional === undefined) {
                    traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
                }
            if (jQuery.isArray(a) || (a.jquery && !jQuery.isPlainObject(a))) {
                    jQuery.each(a, function () {
                        add(this.name, this.value);
                    });
                } else {
                    for (prefix in a) {
                        buildParams(prefix, a[prefix], traditional, add);
                    }
                }
            return s.join("&").replace(r20, "+");
        };
    jQuery.fn.extend({
            serialize: function () {
                return jQuery.param(this.serializeArray());
            },
            serializeArray: function () {
                return this.map(function () {
                    var elements = jQuery.prop(this, "elements");
                    return elements ? jQuery.makeArray(elements) : this;
                }).filter(function () {
                    var type = this.type;
                    return this.name && !jQuery(this).is(":disabled") && rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) && (this.checked || !rcheckableType.test(type));
                }).map(function (i, elem) {
                    var val = jQuery(this).val();
                    return val == null ? null : jQuery.isArray(val) ? jQuery.map(val, function (val) {
                        return {
                            name: elem.name,
                            value: val.replace(rCRLF, "\r\n")
                        };
                    }) : {
                        name: elem.name,
                        value: val.replace(rCRLF, "\r\n")
                    };
                }).get();
            }
        });
    jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?
    function () {
            return !this.isLocal && /^(get|post|head|put|delete|options)$/i.test(this.type) && createStandardXHR() || createActiveXHR();
        } : createStandardXHR;
    var xhrId = 0,
        xhrCallbacks = {},
        xhrSupported = jQuery.ajaxSettings.xhr();
    if (window.ActiveXObject) {
            jQuery(window).on("unload", function () {
                for (var key in xhrCallbacks) {
                    xhrCallbacks[key](undefined, true);
                }
            });
        }
    support.cors = !! xhrSupported && ("withCredentials" in xhrSupported);
    xhrSupported = support.ajax = !! xhrSupported;
    if (xhrSupported) {
            jQuery.ajaxTransport(function (options) {
                if (!options.crossDomain || support.cors) {
                    var callback;
                    return {
                        send: function (headers, complete) {
                            var i, xhr = options.xhr(),
                                id = ++xhrId;
                            xhr.open(options.type, options.url, options.async, options.username, options.password);
                            if (options.xhrFields) {
                                    for (i in options.xhrFields) {
                                        xhr[i] = options.xhrFields[i];
                                    }
                                }
                            if (options.mimeType && xhr.overrideMimeType) {
                                    xhr.overrideMimeType(options.mimeType);
                                }
                            if (!options.crossDomain && !headers["X-Requested-With"]) {
                                    headers["X-Requested-With"] = "XMLHttpRequest";
                                }
                            for (i in headers) {
                                    if (headers[i] !== undefined) {
                                        xhr.setRequestHeader(i, headers[i] + "");
                                    }
                                }
                            xhr.send((options.hasContent && options.data) || null);
                            callback = function (_, isAbort) {
                                    var status, statusText, responses;
                                    if (callback && (isAbort || xhr.readyState === 4)) {
                                        delete xhrCallbacks[id];
                                        callback = undefined;
                                        xhr.onreadystatechange = jQuery.noop;
                                        if (isAbort) {
                                            if (xhr.readyState !== 4) {
                                                xhr.abort();
                                            }
                                        } else {
                                            responses = {};
                                            status = xhr.status;
                                            if (typeof xhr.responseText === "string") {
                                                responses.text = xhr.responseText;
                                            }
                                            try {
                                                statusText = xhr.statusText;
                                            } catch (e) {
                                                statusText = "";
                                            }
                                            if (!status && options.isLocal && !options.crossDomain) {
                                                status = responses.text ? 200 : 404;
                                            } else if (status === 1223) {
                                                status = 204;
                                            }
                                        }
                                    }
                                    if (responses) {
                                        complete(status, statusText, responses, xhr.getAllResponseHeaders());
                                    }
                                };
                            if (!options.async) {
                                    callback();
                                } else if (xhr.readyState === 4) {
                                    setTimeout(callback);
                                } else {
                                    xhr.onreadystatechange = xhrCallbacks[id] = callback;
                                }
                        },
                        abort: function () {
                            if (callback) {
                                callback(undefined, true);
                            }
                        }
                    };
                }
            });
        }

    function createStandardXHR() {
            try {
                return new window.XMLHttpRequest();
            } catch (e) {}
        }

    function createActiveXHR() {
            try {
                return new window.ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {}
        }
    jQuery.ajaxSetup({
            accepts: {
                script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
            },
            contents: {
                script: /(?:java|ecma)script/
            },
            converters: {
                "text script": function (text) {
                    jQuery.globalEval(text);
                    return text;
                }
            }
        });
    jQuery.ajaxPrefilter("script", function (s) {
            if (s.cache === undefined) {
                s.cache = false;
            }
            if (s.crossDomain) {
                s.type = "GET";
                s.global = false;
            }
        });
    jQuery.ajaxTransport("script", function (s) {
            if (s.crossDomain) {
                var script, head = document.head || jQuery("head")[0] || document.documentElement;
                return {
                    send: function (_, callback) {
                        script = document.createElement("script");
                        script.async = true;
                        if (s.scriptCharset) {
                            script.charset = s.scriptCharset;
                        }
                        script.src = s.url;
                        script.onload = script.onreadystatechange = function (_, isAbort) {
                            if (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) {
                                script.onload = script.onreadystatechange = null;
                                if (script.parentNode) {
                                    script.parentNode.removeChild(script);
                                }
                                script = null;
                                if (!isAbort) {
                                    callback(200, "success");
                                }
                            }
                        };
                        head.insertBefore(script, head.firstChild);
                    },
                    abort: function () {
                        if (script) {
                            script.onload(undefined, true);
                        }
                    }
                };
            }
        });
    var oldCallbacks = [],
        rjsonp = /(=)\?(?=&|$)|\?\?/;
    jQuery.ajaxSetup({
            jsonp: "callback",
            jsonpCallback: function () {
                var callback = oldCallbacks.pop() || (jQuery.expando + "_" + (nonce++));
                this[callback] = true;
                return callback;
            }
        });
    jQuery.ajaxPrefilter("json jsonp", function (s, originalSettings, jqXHR) {
            var callbackName, overwritten, responseContainer, jsonProp = s.jsonp !== false && (rjsonp.test(s.url) ? "url" : typeof s.data === "string" && !(s.contentType || "").indexOf("application/x-www-form-urlencoded") && rjsonp.test(s.data) && "data");
            if (jsonProp || s.dataTypes[0] === "jsonp") {
                callbackName = s.jsonpCallback = jQuery.isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback;
                if (jsonProp) {
                    s[jsonProp] = s[jsonProp].replace(rjsonp, "$1" + callbackName);
                } else if (s.jsonp !== false) {
                    s.url += (rquery.test(s.url) ? "&" : "?") + s.jsonp + "=" + callbackName;
                }
                s.converters["script json"] = function () {
                    if (!responseContainer) {
                        jQuery.error(callbackName + " was not called");
                    }
                    return responseContainer[0];
                };
                s.dataTypes[0] = "json";
                overwritten = window[callbackName];
                window[callbackName] = function () {
                    responseContainer = arguments;
                };
                jqXHR.always(function () {
                    window[callbackName] = overwritten;
                    if (s[callbackName]) {
                        s.jsonpCallback = originalSettings.jsonpCallback;
                        oldCallbacks.push(callbackName);
                    }
                    if (responseContainer && jQuery.isFunction(overwritten)) {
                        overwritten(responseContainer[0]);
                    }
                    responseContainer = overwritten = undefined;
                });
                return "script";
            }
        });
    jQuery.parseHTML = function (data, context, keepScripts) {
            if (!data || typeof data !== "string") {
                return null;
            }
            if (typeof context === "boolean") {
                keepScripts = context;
                context = false;
            }
            context = context || document;
            var parsed = rsingleTag.exec(data),
                scripts = !keepScripts && [];
            if (parsed) {
                    return [context.createElement(parsed[1])];
                }
            parsed = jQuery.buildFragment([data], context, scripts);
            if (scripts && scripts.length) {
                    jQuery(scripts).remove();
                }
            return jQuery.merge([], parsed.childNodes);
        };
    var _load = jQuery.fn.load;
    jQuery.fn.load = function (url, params, callback) {
            if (typeof url !== "string" && _load) {
                return _load.apply(this, arguments);
            }
            var selector, response, type, self = this,
                off = url.indexOf(" ");
            if (off >= 0) {
                    selector = url.slice(off, url.length);
                    url = url.slice(0, off);
                }
            if (jQuery.isFunction(params)) {
                    callback = params;
                    params = undefined;
                } else if (params && typeof params === "object") {
                    type = "POST";
                }
            if (self.length > 0) {
                    jQuery.ajax({
                        url: url,
                        type: type,
                        dataType: "html",
                        data: params
                    }).done(function (responseText) {
                        response = arguments;
                        self.html(selector ? jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector) : responseText);
                    }).complete(callback &&
                    function (jqXHR, status) {
                        self.each(callback, response || [jqXHR.responseText, status, jqXHR]);
                    });
                }
            return this;
        };
    jQuery.expr.filters.animated = function (elem) {
            return jQuery.grep(jQuery.timers, function (fn) {
                return elem === fn.elem;
            }).length;
        };
    var docElem = window.document.documentElement;

    function getWindow(elem) {
            return jQuery.isWindow(elem) ? elem : elem.nodeType === 9 ? elem.defaultView || elem.parentWindow : false;
        }
    jQuery.offset = {
            setOffset: function (elem, options, i) {
                var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition, position = jQuery.css(elem, "position"),
                    curElem = jQuery(elem),
                    props = {};
                if (position === "static") {
                        elem.style.position = "relative";
                    }
                curOffset = curElem.offset();
                curCSSTop = jQuery.css(elem, "top");
                curCSSLeft = jQuery.css(elem, "left");
                calculatePosition = (position === "absolute" || position === "fixed") && jQuery.inArray("auto", [curCSSTop, curCSSLeft]) > -1;
                if (calculatePosition) {
                        curPosition = curElem.position();
                        curTop = curPosition.top;
                        curLeft = curPosition.left;
                    } else {
                        curTop = parseFloat(curCSSTop) || 0;
                        curLeft = parseFloat(curCSSLeft) || 0;
                    }
                if (jQuery.isFunction(options)) {
                        options = options.call(elem, i, curOffset);
                    }
                if (options.top != null) {
                        props.top = (options.top - curOffset.top) + curTop;
                    }
                if (options.left != null) {
                        props.left = (options.left - curOffset.left) + curLeft;
                    }
                if ("using" in options) {
                        options.using.call(elem, props);
                    } else {
                        curElem.css(props);
                    }
            }
        };
    jQuery.fn.extend({
            offset: function (options) {
                if (arguments.length) {
                    return options === undefined ? this : this.each(function (i) {
                        jQuery.offset.setOffset(this, options, i);
                    });
                }
                var docElem, win, box = {
                    top: 0,
                    left: 0
                },
                    elem = this[0],
                    doc = elem && elem.ownerDocument;
                if (!doc) {
                        return;
                    }
                docElem = doc.documentElement;
                if (!jQuery.contains(docElem, elem)) {
                        return box;
                    }
                if (typeof elem.getBoundingClientRect !== strundefined) {
                        box = elem.getBoundingClientRect();
                    }
                win = getWindow(doc);
                return {
                        top: box.top + (win.pageYOffset || docElem.scrollTop) - (docElem.clientTop || 0),
                        left: box.left + (win.pageXOffset || docElem.scrollLeft) - (docElem.clientLeft || 0)
                    };
            },
            position: function () {
                if (!this[0]) {
                    return;
                }
                var offsetParent, offset, parentOffset = {
                    top: 0,
                    left: 0
                },
                    elem = this[0];
                if (jQuery.css(elem, "position") === "fixed") {
                        offset = elem.getBoundingClientRect();
                    } else {
                        offsetParent = this.offsetParent();
                        offset = this.offset();
                        if (!jQuery.nodeName(offsetParent[0], "html")) {
                            parentOffset = offsetParent.offset();
                        }
                        parentOffset.top += jQuery.css(offsetParent[0], "borderTopWidth", true);
                        parentOffset.left += jQuery.css(offsetParent[0], "borderLeftWidth", true);
                    }
                return {
                        top: offset.top - parentOffset.top - jQuery.css(elem, "marginTop", true),
                        left: offset.left - parentOffset.left - jQuery.css(elem, "marginLeft", true)
                    };
            },
            offsetParent: function () {
                return this.map(function () {
                    var offsetParent = this.offsetParent || docElem;
                    while (offsetParent && (!jQuery.nodeName(offsetParent, "html") && jQuery.css(offsetParent, "position") === "static")) {
                        offsetParent = offsetParent.offsetParent;
                    }
                    return offsetParent || docElem;
                });
            }
        });
    jQuery.each({
            scrollLeft: "pageXOffset",
            scrollTop: "pageYOffset"
        }, function (method, prop) {
            var top = /Y/.test(prop);
            jQuery.fn[method] = function (val) {
                return access(this, function (elem, method, val) {
                    var win = getWindow(elem);
                    if (val === undefined) {
                        return win ? (prop in win) ? win[prop] : win.document.documentElement[method] : elem[method];
                    }
                    if (win) {
                        win.scrollTo(!top ? val : jQuery(win).scrollLeft(), top ? val : jQuery(win).scrollTop());
                    } else {
                        elem[method] = val;
                    }
                }, method, val, arguments.length, null);
            };
        });
    jQuery.each(["top", "left"], function (i, prop) {
            jQuery.cssHooks[prop] = addGetHookIf(support.pixelPosition, function (elem, computed) {
                if (computed) {
                    computed = curCSS(elem, prop);
                    return rnumnonpx.test(computed) ? jQuery(elem).position()[prop] + "px" : computed;
                }
            });
        });
    jQuery.each({
            Height: "height",
            Width: "width"
        }, function (name, type) {
            jQuery.each({
                padding: "inner" + name,
                content: type,
                "": "outer" + name
            }, function (defaultExtra, funcName) {
                jQuery.fn[funcName] = function (margin, value) {
                    var chainable = arguments.length && (defaultExtra || typeof margin !== "boolean"),
                        extra = defaultExtra || (margin === true || value === true ? "margin" : "border");
                    return access(this, function (elem, type, value) {
                            var doc;
                            if (jQuery.isWindow(elem)) {
                                return elem.document.documentElement["client" + name];
                            }
                            if (elem.nodeType === 9) {
                                doc = elem.documentElement;
                                return Math.max(elem.body["scroll" + name], doc["scroll" + name], elem.body["offset" + name], doc["offset" + name], doc["client" + name]);
                            }
                            return value === undefined ? jQuery.css(elem, type, extra) : jQuery.style(elem, type, value, extra);
                        }, type, chainable ? margin : undefined, chainable, null);
                };
            });
        });
    jQuery.fn.size = function () {
            return this.length;
        };
    jQuery.fn.andSelf = jQuery.fn.addBack;
    if (typeof define === "function" && define.amd) {
            define("jquery", [], function () {
                return jQuery;
            });
        }
    var
    _jQuery = window.jQuery,
        _$ = window.$;
    jQuery.noConflict = function (deep) {
            if (window.$ === jQuery) {
                window.$ = _$;
            }
            if (deep && window.jQuery === jQuery) {
                window.jQuery = _jQuery;
            }
            return jQuery;
        };
    if (typeof noGlobal === strundefined) {
            window.jQuery = window.$ = jQuery;
        }
    return jQuery;
}));;
(function () {
    var c = function () {
        var e = [].slice.call(arguments);
        e.push(c.options);
        if (e[0].match(/^\s*#([\w:\-\.]+)\s*$/igm)) {
            e[0].replace(/^\s*#([\w:\-\.]+)\s*$/igm, function (h, i) {
                var f = document;
                var g = f && f.getElementById(i);
                e[0] = g ? (g.value || g.innerHTML) : h;
            });
        }
        if (arguments.length == 1) {
            return c.compile.apply(c, e);
        }
        if (arguments.length >= 2) {
            return c.to_html.apply(c, e);
        }
    };
    var d = {
        escapehash: {
            "<": "&lt;",
            ">": "&gt;",
            "&": "&amp;",
            '"': "&quot;",
            "'": "&#x27;",
            "/": "&#x2f;"
        },
        escapereplace: function (e) {
            return d.escapehash[e];
        },
        escaping: function (e) {
            return typeof(e) !== "string" ? e : e.replace(/[&<>"]/igm, this.escapereplace);
        },
        detection: function (e) {
            return typeof(e) === "undefined" ? "" : e;
        }
    };
    var b = function (e) {
        if (typeof(console) !== "undefined") {
            if (console.warn) {
                console.warn(e);
                return;
            }
            if (console.log) {
                console.log(e);
                return;
            }
        }
        throw (e);
    };
    var a = function (h, f) {
        h = h !== Object(h) ? {} : h;
        if (h.__proto__) {
            h.__proto__ = f;
            return h;
        }
        var g = function () {};
        var j = Object.create ? Object.create(f) : new(g.prototype = f, g);
        for (var e in h) {
            if (h.hasOwnProperty(e)) {
                j[e] = h[e];
            }
        }
        return j;
    };
    c.__cache = {};
    c.version = "0.6.5-stable";
    c.settings = {};
    c.tags = {
        operationOpen: "{@",
        operationClose: "}",
        interpolateOpen: "\\${",
        interpolateClose: "}",
        noneencodeOpen: "\\$\\${",
        noneencodeClose: "}",
        commentOpen: "\\{#",
        commentClose: "\\}"
    };
    c.options = {
        cache: true,
        strip: true,
        errorhandling: true,
        detection: true,
        _method: a({
            __escapehtml: d,
            __throw: b,
            __juicer: c
        }, {})
    };
    c.tagInit = function () {
        var f = c.tags.operationOpen + "each\\s*([^}]*?)\\s*as\\s*(\\w*?)\\s*(,\\s*\\w*?)?" + c.tags.operationClose;
        var h = c.tags.operationOpen + "\\/each" + c.tags.operationClose;
        var i = c.tags.operationOpen + "if\\s*([^}]*?)" + c.tags.operationClose;
        var j = c.tags.operationOpen + "\\/if" + c.tags.operationClose;
        var n = c.tags.operationOpen + "else" + c.tags.operationClose;
        var o = c.tags.operationOpen + "else if\\s*([^}]*?)" + c.tags.operationClose;
        var k = c.tags.interpolateOpen + "([\\s\\S]+?)" + c.tags.interpolateClose;
        var l = c.tags.noneencodeOpen + "([\\s\\S]+?)" + c.tags.noneencodeClose;
        var m = c.tags.commentOpen + "[^}]*?" + c.tags.commentClose;
        var g = c.tags.operationOpen + "each\\s*(\\w*?)\\s*in\\s*range\\(([^}]+?)\\s*,\\s*([^}]+?)\\)" + c.tags.operationClose;
        var e = c.tags.operationOpen + "include\\s*([^}]*?)\\s*,\\s*([^}]*?)" + c.tags.operationClose;
        c.settings.forstart = new RegExp(f, "igm");
        c.settings.forend = new RegExp(h, "igm");
        c.settings.ifstart = new RegExp(i, "igm");
        c.settings.ifend = new RegExp(j, "igm");
        c.settings.elsestart = new RegExp(n, "igm");
        c.settings.elseifstart = new RegExp(o, "igm");
        c.settings.interpolate = new RegExp(k, "igm");
        c.settings.noneencode = new RegExp(l, "igm");
        c.settings.inlinecomment = new RegExp(m, "igm");
        c.settings.rangestart = new RegExp(g, "igm");
        c.settings.include = new RegExp(e, "igm");
    };
    c.tagInit();
    c.set = function (f, j) {
        var h = this;
        var e = function (i) {
            return i.replace(/[\$\(\)\[\]\+\^\{\}\?\*\|\.]/igm, function (l) {
                return "\\" + l;
            });
        };
        var k = function (l, m) {
            var i = l.match(/^tag::(.*)$/i);
            if (i) {
                h.tags[i[1]] = e(m);
                h.tagInit();
                return;
            }
            h.options[l] = m;
        };
        if (arguments.length === 2) {
            k(f, j);
            return;
        }
        if (f === Object(f)) {
            for (var g in f) {
                if (f.hasOwnProperty(g)) {
                    k(g, f[g]);
                }
            }
        }
    };
    c.register = function (g, f) {
        var e = this.options._method;
        if (e.hasOwnProperty(g)) {
            return false;
        }
        return e[g] = f;
    };
    c.unregister = function (f) {
        var e = this.options._method;
        if (e.hasOwnProperty(f)) {
            return delete e[f];
        }
    };
    c.template = function (e) {
        var f = this;
        this.options = e;
        this.__interpolate = function (g, l, i) {
            var h = g.split("|"),
                k = h[0] || "",
                j;
            if (h.length > 1) {
                    g = h.shift();
                    j = h.shift().split(",");
                    k = "_method." + j.shift() + ".call({}, " + [g].concat(j) + ")";
                }
            return "<%= " + (l ? "_method.__escapehtml.escaping" : "") + "(" + (!i || i.detection !== false ? "_method.__escapehtml.detection" : "") + "(" + k + ")) %>";
        };
        this.__removeShell = function (h, g) {
            var i = 0;
            h = h.replace(c.settings.forstart, function (n, k, m, l) {
                var m = m || "value",
                    l = l && l.substr(1);
                var j = "i" + i++;
                return "<% ~function() {for(var " + j + " in " + k + ") {if(" + k + ".hasOwnProperty(" + j + ")) {var " + m + "=" + k + "[" + j + "];" + (l ? ("var " + l + "=" + j + ";") : "") + " %>";
            }).replace(c.settings.forend, "<% }}}(); %>").replace(c.settings.ifstart, function (j, k) {
                return "<% if(" + k + ") { %>";
            }).replace(c.settings.ifend, "<% } %>").replace(c.settings.elsestart, function (j) {
                return "<% } else { %>";
            }).replace(c.settings.elseifstart, function (j, k) {
                return "<% } else if(" + k + ") { %>";
            }).replace(c.settings.noneencode, function (k, j) {
                return f.__interpolate(j, false, g);
            }).replace(c.settings.interpolate, function (k, j) {
                return f.__interpolate(j, true, g);
            }).replace(c.settings.inlinecomment, "").replace(c.settings.rangestart, function (m, l, n, k) {
                var j = "j" + i++;
                return "<% ~function() {for(var " + j + "=" + n + ";" + j + "<" + k + ";" + j + "++) {{var " + l + "=" + j + "; %>";
            }).replace(c.settings.include, function (l, j, k) {
                return "<%= _method.__juicer(" + j + ", " + k + "); %>";
            });
            if (!g || g.errorhandling !== false) {
                h = "<% try { %>" + h;
                h += '<% } catch(e) {_method.__throw("Juicer Render Exception: "+e.message);} %>';
            }
            return h;
        };
        this.__toNative = function (h, g) {
            return this.__convert(h, !g || g.strip);
        };
        this.__lexicalAnalyze = function (k) {
            var j = [];
            var o = [];
            var n = "";
            var g = ["if", "each", "_", "_method", "console", "break", "case", "catch", "continue", "debugger", "default", "delete", "do", "finally", "for", "function", "in", "instanceof", "new", "return", "switch", "this", "throw", "try", "typeof", "var", "void", "while", "with", "null", "typeof", "class", "enum", "export", "extends", "import", "super", "implements", "interface", "let", "package", "private", "protected", "public", "static", "yield", "const", "arguments", "true", "false", "undefined", "NaN"];
            var m = function (r, q) {
                if (Array.prototype.indexOf && r.indexOf === Array.prototype.indexOf) {
                    return r.indexOf(q);
                }
                for (var p = 0; p < r.length; p++) {
                    if (r[p] === q) {
                        return p;
                    }
                }
                return -1;
            };
            var h = function (p, i) {
                i = i.match(/\w+/igm)[0];
                if (m(j, i) === -1 && m(g, i) === -1 && m(o, i) === -1) {
                    if (typeof(window) !== "undefined" && typeof(window[i]) === "function" && window[i].toString().match(/^\s*?function \w+\(\) \{\s*?\[native code\]\s*?\}\s*?$/i)) {
                        return p;
                    }
                    if (typeof(global) !== "undefined" && typeof(global[i]) === "function" && global[i].toString().match(/^\s*?function \w+\(\) \{\s*?\[native code\]\s*?\}\s*?$/i)) {
                        return p;
                    }
                    if (typeof(c.options._method[i]) === "function" || c.options._method.hasOwnProperty(i)) {
                        o.push(i);
                        return p;
                    }
                    j.push(i);
                }
                return p;
            };
            k.replace(c.settings.forstart, h).replace(c.settings.interpolate, h).replace(c.settings.ifstart, h).replace(c.settings.elseifstart, h).replace(c.settings.include, h).replace(/[\+\-\*\/%!\?\|\^&~<>=,\(\)\[\]]\s*([A-Za-z_]+)/igm, h);
            for (var l = 0; l < j.length; l++) {
                n += "var " + j[l] + "=_." + j[l] + ";";
            }
            for (var l = 0; l < o.length; l++) {
                n += "var " + o[l] + "=_method." + o[l] + ";";
            }
            return "<% " + n + " %>";
        };
        this.__convert = function (h, i) {
            var g = [].join("");
            g += "'use strict';";
            g += "var _=_||{};";
            g += "var _out='';_out+='";
            if (i !== false) {
                g += h.replace(/\\/g, "\\\\").replace(/[\r\t\n]/g, " ").replace(/'(?=[^%]*%>)/g, "\t").split("'").join("\\'").split("\t").join("'").replace(/<%=(.+?)%>/g, "';_out+=$1;_out+='").split("<%").join("';").split("%>").join("_out+='") + "';return _out;";
                return g;
            }
            g += h.replace(/\\/g, "\\\\").replace(/[\r]/g, "\\r").replace(/[\t]/g, "\\t").replace(/[\n]/g, "\\n").replace(/'(?=[^%]*%>)/g, "\t").split("'").join("\\'").split("\t").join("'").replace(/<%=(.+?)%>/g, "';_out+=$1;_out+='").split("<%").join("';").split("%>").join("_out+='") + "';return _out.replace(/[\\r\\n]\\s+[\\r\\n]/g, '\\r\\n');";
            return g;
        };
        this.parse = function (h, g) {
            var i = this;
            if (!g || g.loose !== false) {
                h = this.__lexicalAnalyze(h) + h;
            }
            h = this.__removeShell(h, g);
            h = this.__toNative(h, g);
            this._render = new Function("_, _method", h);
            this.render = function (k, j) {
                if (!j || j !== f.options._method) {
                    j = a(j, f.options._method);
                }
                return i._render.call(this, k, j);
            };
            return this;
        };
    };
    c.compile = function (g, f) {
        if (!f || f !== this.options) {
            f = a(f, this.options);
        }
        try {
            var h = this.__cache[g] ? this.__cache[g] : new this.template(this.options).parse(g, f);
            if (!f || f.cache !== false) {
                this.__cache[g] = h;
            }
            return h;
        } catch (i) {
            b("Juicer Compile Exception: " + i.message);
            return {
                render: function () {}
            };
        }
    };
    c.to_html = function (f, g, e) {
        if (!e || e !== this.options) {
            e = a(e, this.options);
        }
        return this.compile(f, e).render(g, e._method);
    };
    typeof(module) !== "undefined" && module.exports ? module.exports = c : this.juicer = c;
})();;;
(function () {
    var userAgent = navigator.userAgent.toLowerCase();
    $.browser = {
        version: (userAgent.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [])[1],
        msie: /msie/.test(userAgent) && !/opera/.test(userAgent),
        mozilla: /mozilla/.test(userAgent) && !/(compatible|webkit)/.test(userAgent),
        weixin: (/micromessenger/.test(userAgent)) ? true : false
    };
})();
if (!window.$CONF) {
    window.$CONF = {};
};
(function (win) {
    var store = {},
        doc = win.document,
        localStorageName = 'localStorage',
        scriptTag = 'script',
        storage
    store.disabled = false
    store.set = function (key, value) {}
    store.get = function (key) {}
    store.remove = function (key) {}
    store.clear = function () {}
    store.transact = function (key, defaultVal, transactionFn) {
            var val = store.get(key)
            if (transactionFn == null) {
                transactionFn = defaultVal
                defaultVal = null
            }
            if (typeof val == 'undefined') {
                val = defaultVal || {}
            }
            transactionFn(val)
            store.set(key, val)
        }
    store.getAll = function () {}
    store.forEach = function () {}
    store.serialize = function (value) {
            return JSON.stringify(value)
        }
    store.deserialize = function (value) {
            if (typeof value != 'string') {
                return undefined
            }
            try {
                return JSON.parse(value)
            }
            catch (e) {
                return value || undefined
            }
        }

    function isLocalStorageNameSupported() {
            try {
                return (localStorageName in win && win[localStorageName])
            }
            catch (err) {
                return false
            }
        }
    if (isLocalStorageNameSupported()) {
            storage = win[localStorageName]
            store.set = function (key, val) {
                if (val === undefined) {
                    return store.remove(key)
                }
                storage.setItem(key, store.serialize(val))
                return val
            }
            store.get = function (key) {
                return store.deserialize(storage.getItem(key))
            }
            store.remove = function (key) {
                storage.removeItem(key)
            }
            store.clear = function () {
                storage.clear()
            }
            store.getAll = function () {
                var ret = {}
                store.forEach(function (key, val) {
                    ret[key] = val
                })
                return ret
            }
            store.forEach = function (callback) {
                for (var i = 0; i < storage.length; i++) {
                    var key = storage.key(i)
                    callback(key, store.get(key))
                }
            }
        } else if (doc.documentElement.addBehavior) {
            var storageOwner, storageContainer
            try {
                storageContainer = new ActiveXObject('htmlfile')
                storageContainer.open()
                storageContainer.write('<' + scriptTag + '>document.w=window</' + scriptTag + '><iframe src="/favicon.ico"></iframe>')
                storageContainer.close()
                storageOwner = storageContainer.w.frames[0].document
                storage = storageOwner.createElement('div')
            } catch (e) {
                storage = doc.createElement('div')
                storageOwner = doc.body
            }

            function withIEStorage(storeFunction) {
                return function () {
                    var args = Array.prototype.slice.call(arguments, 0)
                    args.unshift(storage)
                    storageOwner.appendChild(storage)
                    storage.addBehavior('#default#userData')
                    storage.load(localStorageName)
                    var result = storeFunction.apply(store, args)
                    storageOwner.removeChild(storage)
                    return result
                }
            }
            var forbiddenCharsRegex = new RegExp("[!\"#$%&'()*+,/\\\\:;<=>?@[\\]^`{|}~]", "g")

            function ieKeyFix(key) {
                return key.replace(forbiddenCharsRegex, '___')
            }
            store.set = withIEStorage(function (storage, key, val) {
                key = ieKeyFix(key)
                if (val === undefined) {
                    return store.remove(key)
                }
                storage.setAttribute(key, store.serialize(val))
                storage.save(localStorageName)
                return val
            })
            store.get = withIEStorage(function (storage, key) {
                key = ieKeyFix(key)
                return store.deserialize(storage.getAttribute(key))
            })
            store.remove = withIEStorage(function (storage, key) {
                key = ieKeyFix(key)
                storage.removeAttribute(key)
                storage.save(localStorageName)
            })
            store.clear = withIEStorage(function (storage) {
                var attributes = storage.XMLDocument.documentElement.attributes
                storage.load(localStorageName)
                for (var i = 0, attr; attr = attributes[i]; i++) {
                    storage.removeAttribute(attr.name)
                }
                storage.save(localStorageName)
            })
            store.getAll = function (storage) {
                var ret = {}
                store.forEach(function (key, val) {
                    ret[key] = val
                })
                return ret
            }
            store.forEach = withIEStorage(function (storage, callback) {
                var attributes = storage.XMLDocument.documentElement.attributes
                for (var i = 0, attr; attr = attributes[i]; ++i) {
                    callback(attr.name, store.deserialize(storage.getAttribute(attr.name)))
                }
            })
        }
    try {
            var testKey = '__storejs__'
            store.set(testKey, testKey)
            if (store.get(testKey) != testKey) {
                store.disabled = true
            }
            store.remove(testKey)
        } catch (e) {
            store.disabled = true
        }
    store.enabled = !store.disabled
    if (typeof module != 'undefined' && module.exports) {
            module.exports = store
        }
    else if (typeof define === 'function' && define.amd) {
            define(store)
        }
    else {
            win.store = store
        }
})(this.window || global); /*! http://mths.be/visibility v1.0.7 by @mathias | MIT license */
;
(function (window, document, $, undefined) {
    var prefix;
    var property;
    var eventName = 'onfocusin' in document && 'hasFocus' in document ? 'focusin focusout' : 'focus blur';
    var prefixes = ['webkit', 'o', 'ms', 'moz', ''];
    var $support = $.support;
    var $event = $.event;
    while ((prefix = prefixes.pop()) != undefined) {
        property = (prefix ? prefix + 'H' : 'h') + 'idden';
        if ($support.pageVisibility = typeof document[property] == 'boolean') {
            eventName = prefix + 'visibilitychange';
            break;
        }
    }
    $(/blur$/.test(eventName) ? window : document).on(eventName, function (event) {
        var type = event.type;
        var originalEvent = event.originalEvent;
        if (!originalEvent) {
            return;
        }
        var toElement = originalEvent.toElement;
        if (!/^focus./.test(type) || (toElement == undefined && originalEvent.fromElement == undefined && originalEvent.relatedTarget == undefined)) {
            $event.trigger((property && document[property] || /^(?:blur|focusout)$/.test(type) ? 'hide' : 'show') + '.visibility');
        }
    });
}(this, document, jQuery));;
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    }
    else if (typeof exports === 'object') {
        factory(require('jquery'));
    }
    else {
        factory(jQuery);
    }
}(function ($) {
    var pluses = /\+/g;

    function encode(s) {
        return config.raw ? s : encodeURIComponent(s);
    }

    function decode(s) {
        return config.raw ? s : decodeURIComponent(s);
    }

    function stringifyCookieValue(value) {
        return encode(config.json ? JSON.stringify(value) : String(value));
    }

    function parseCookieValue(s) {
        if (s.indexOf('"') === 0) {
            s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
        }
        try {
            s = decodeURIComponent(s.replace(pluses, ' '));
            return config.json ? JSON.parse(s) : s;
        }
        catch (e) {}
    }

    function read(s, converter) {
        var value = config.raw ? s : parseCookieValue(s);
        return $.isFunction(converter) ? converter(value) : value;
    }
    var config = $.cookie = function (key, value, options) {
        if (value !== undefined && !$.isFunction(value)) {
            options = $.extend({}, config.defaults, options);
            if (typeof options.expires === 'number') {
                var days = options.expires,
                    t = options.expires = new Date();
                t.setTime(+t + days * 864e+5);
            }
            return (document.cookie = [encode(key), '=', stringifyCookieValue(value), options.expires ? '; expires=' + options.expires.toUTCString() : '', options.path ? '; path=' + options.path : '', options.domain ? '; domain=' + options.domain : '', options.secure ? '; secure' : ''].join(''));
        }
        var result = key ? undefined : {};
        var cookies = document.cookie ? document.cookie.split('; ') : [];
        for (var i = 0, l = cookies.length; i < l; i++) {
            var parts = cookies[i].split('=');
            var name = decode(parts.shift());
            var cookie = parts.join('=');
            if (key && key === name) {
                result = read(cookie, value);
                break;
            }
            if (!key && (cookie = read(cookie)) !== undefined) {
                result[name] = cookie;
            }
        }
        return result;
    };
    config.defaults = {};
    $.removeCookie = function (key, options) {
        if ($.cookie(key) === undefined) {
            return false;
        }
        $.cookie(key, '', $.extend({}, options, {
            expires: -1
        }));
        return !$.cookie(key);
    };
}));
$.ajaxSetup({
    beforeSend: function (xhr, settings) {
        if (settings.type == 'POST' || settings.type == 'PUT' || settings.type == 'DELETE') {
            xhr.setRequestHeader("X-CSRFToken", $.cookie('XCSRFToken'));
        }
    }
});
(function (exports, $) {
    var cls = 'app-loading',
        $body = $(document.body),
        $document = $(document)
    $.extend(exports, {
            $L: function (key, obj) {
                obj = obj || {},
                i18n = exports.i18n || {};
                return obj[key] !== undefined ? obj[key] : (i18n[key] !== undefined ? i18n[key] : key);
            },
            $lang: function (str) {
                return str.replace(/\$L\((.+?)\)/ig, function ($0, $1) {
                    return $L($1);
                });
            },
            loadScript: function (files, callback) {
                if (!$.isArray(files)) {
                    files = [files];
                }
                $.when($.map(files, function (src) {
                    var dtd = $.Deferred();
                    var s = document.createElement('script');
                    $(s).on('load error', function () {
                        dtd.resolve();
                    })
                    s.type = 'text/javascript';
                    s.async = true;
                    s.src = src;
                    var x = document.getElementsByTagName('script')[0];
                    x.parentNode.insertBefore(s, x);
                    return dtd;
                })).then(callback);
            },
            loadStyle: function (files, callback) {
                if (!$.isArray(files)) {
                    files = [files];
                }
                $.when($.map(files, function (src) {
                    var dtd = $.Deferred();
                    var s = document.createElement('link');
                    $(s).on('load error', function () {
                        dtd.resolve();
                    })
                    s.rel = 'stylesheet';
                    s.async = true;
                    s.href = src;
                    var x = document.getElementsByTagName('link')[0];
                    x.parentNode.insertBefore(s, x);
                    return dtd;
                })).then(callback);
            }
        });
    $.each(["get", "post"], function (i, method) {
            $[method] = function (url, data, callback, type) {
                if ($.isFunction(data)) {
                    type = type || callback;
                    callback = data;
                    data = undefined;
                }
                callback = callback || $.noop;
                return $.ajax({
                    url: url,
                    type: method,
                    dataType: type,
                    data: data,
                    success: function (result) {
                        if (result && result.code == 1020) {
                            $.login();
                        } else {
                            callback.apply(this, arguments);
                        }
                    }
                });
            };
        });
    $.extend($.fn, {
            shake: function () {
                var p = [4, 8, 4, 0, -4, -8, -4, 0],
                    p = p.concat(p.concat(p))
                var shake = $.map(p, function (val) {
                        return function () {
                            var $this = $(this).css({
                                left: val
                            });
                            setTimeout(function () {
                                $this.dequeue('shake');
                            }, 13);
                        }
                    });
                $(this).queue('shake', shake).dequeue('shake');
            },
            shine: function (fn) {
                var $this = $(this),
                    start = 'rgb(255, 187, 187)',
                    end = 'rgb(255,255,255)',
                    i = 0,
                    shine = function () {
                        if (i++ < 5) {
                            $this.css('backgroundColor', i % 2 ? end : start);
                            setTimeout(shine, 150);
                        } else {
                            fn && fn.call(this);
                        }
                    };
                shine(fn);
            },
            template: function (obj, $is_html) {
                var html = $(this).html(),
                    html = $.trim(html);
                if ($is_html) {
                        return juicer(html, obj || {});
                    } else {
                        return $(juicer(html, obj || {}));
                    }
            }
        });
    $.extend({
            getScript: function (urls, callback) {
                if (!$.isArray(urls)) {
                    urls = [urls];
                }
                var $deffer = $.map(urls, function (url) {
                    var xhr = $.ajax({
                        url: url,
                        dataType: "script",
                        cache: true
                    });
                    return xhr;
                })
                $.when.apply($, $deffer).done(callback || $.noop);
            },
            scrollbarwidth: function () {
                if ($('body').hasClass('st-menu-open')) {
                    return 0;
                }
                if (typeof scrollbarwidth === 'undefined') {
                    var parent = $('<div style="width:50px;height:50px;overflow:auto"><div></div></div>').appendTo('body'),
                        child = parent.children(),
                        scrollbarwidth = child.innerWidth() - child.height(99).innerWidth();
                    parent.remove();
                }
                return scrollbarwidth;
            },
            byteLength: function (b) {
                if (!b) {
                    return 0
                }
                var a = b.match(/[^\x00-\x80]/g);
                return (b.length + (!a ? 0 : a.length))
            },
            tinyConfirm: function (el, opts) {
                var $el = $(el),
                    opts = $.extend({
                        title: $L('提示'),
                        'YES': $L('确认'),
                        'NO': $L('取消'),
                        'callback': $.noop
                    }, opts);
                var HTML = '<div  class="msg_out_box">\
               <p>${title}</p>\
               <div class="text_forms margin_bottom_10">\
                    <a title="${NO}" class="btn btn_small_56 btn_ash reset" href="javascript:;">${NO}</a><a title="${YES}" class="btn btn_small_56 btn_gray margin_left_10 submit" href="javascript:;">${YES}</a>\
               </div>\
      </div>';
                var elem = $(juicer(HTML, opts)).on('close', function (ev, fn) {
                        var height = elem.outerHeight();
                        elem.animate({
                            top: '+=' + height,
                            height: 0
                        }, 'fast', 'swing', function () {
                            $(this).remove();
                            fn && fn.call(this);
                        });
                        return false;
                    }).on('click', '.reset', function () {
                        elem.trigger('close');
                        return false;
                    }).on('click', '.submit', function () {
                        $(this).trigger('close', opts.callback);
                        return false;
                    }).on('open', function (ev) {
                        elem.appendTo(document.body);
                        var height = elem.height(),
                            offset = $el.offset(),
                            h = $el.outerHeight(true),
                            scrollTop = $(window).scrollTop(),
                            style, animate;
                        if (scrollTop + height >= offset.top) {
                                elem.css({
                                    top: offset.top + h + height,
                                    left: offset.left - elem.outerWidth(true) / 2 + $el.outerWidth(true) / 2,
                                    height: 0
                                }).animate({
                                    top: offset.top + h,
                                    height: height
                                }, 'fast', 'swing')
                            } else {
                                elem.css({
                                    top: offset.top,
                                    left: offset.left - elem.outerWidth(true) / 2 + $el.outerWidth(true) / 2,
                                    height: 0
                                }).animate({
                                    top: offset.top - height,
                                    height: height
                                }, 'fast', 'swing')
                            }
                        return false;
                    });
                elem.trigger('open');
                return elem;
            },
            notify: function (msg, opts) {
                var notify = $('#notify'),
                    itv = notify.data('itv');
                if (!notify.length) {
                        notify = $('<div id="notify" class="prompt_Warp"><div class="prompt_box"><div class="tmsg"></div></div></div>').appendTo(document.body);
                    }
                if (typeof(opts) == 'string') {
                        opts = {
                            cls: opts
                        }
                    }
                var prompt = $('.prompt_box', notify),
                    opts = $.extend({
                        cls: 'success',
                        'msg': msg || $L('操作成功'),
                        timeout: 1000,
                        callback: $.noop
                    }, opts || {}),
                    msg = $('.tmsg', notify);
                prompt.attr('class', 'prompt_box ' + opts.cls)
                msg.text(opts.msg);
                notify.css({
                        marginLeft: 0,
                        left: 0
                    })
                var w = notify.outerWidth() / 2;
                notify.css({
                        left: '50%',
                        marginLeft: -w
                    });
                clearTimeout(itv);
                itv = null;
                prompt.stop(true, true).animate({
                        marginTop: 0
                    }, 'normal', 'swing', function () {
                        itv = setTimeout(function () {
                            prompt.animate({
                                marginTop: -40
                            }, 'normal', function () {
                                opts.callback();
                            });
                        }, opts.timeout);
                        notify.data('itv', itv);
                    })
                return prompt;
            },
            alert: function (title, opts) {
                opts = $.extend({
                    OK: '确定',
                    title: title,
                    desc: '',
                    callback: $.noop,
                    open: $.noop,
                    close: $.noop
                }, opts || {});
                var html = opts.html || '<div class="msg_box">\
         <div class="msg_top_black"></div>\
         <div class="msg_close">\
             <a title="关闭" class="close btn" href="javascript:;"></a>\
         </div>\
         <div class="msg_content">\
             <h2 class="msg_h2 padding26">${title}\
        {@if desc}\
                 <p class="max-width300 text">\
                     ${desc}\
                 </p>\
        {@/if}\
             </h2>\
             <div class="max-width300">\
                 <div class="text_forms margin_bottom_10">\
                     <a title="${OK}" class="btn btn_big btn_gray btn_sumit" href="javascript:;">${OK}</a>\
                 </div>\
             </div>\
         </div>\
     </div>';
                var dialog = $(juicer($lang(html), opts)).appendTo(document.body).easyModal({
                    autoOpen: true,
                    onClose: function () {
                        opts.close.call(this)
                        $(this).parent().remove();
                    },
                    updateZIndexOnOpen: false,
                    zIndex: opts.zIndex,
                    onOpen: function () {
                        var $this = $(this);
                        opts.open.call($this);
                        $this.on('click', '.btn_sumit', function () {
                            $this.trigger('closeModal');
                            opts.callback($this, $this);
                        })
                    },
                    closeOnEscape: false
                });
                return dialog;
            },
            confirm: function (title, options) {
                options = $.extend({
                    YES: $L('确定'),
                    NO: $L('取消'),
                    title: title,
                    cancel: $.noop,
                    success: $.noop,
                    open: $.noop,
                    close: $.noop,
                    overlayClose: false
                }, options);
                var html = options.tmpl || '<div class="msg_box">\
          <div class="msg_top_black"></div>\
          <div class="msg_close">\
              <a title="$L(关闭)" class="close btn" href="javascript:;"></a>\
          </div>\
          <div class="msg_content">\
              <h2 class="msg_h2 padding26 padding_bottom_50">$${title}</h2>\
              <div class="max-width300">\
                  <div class="text_forms margin_bottom_10">\
                      <a href="javascript:;" class="btn btn_small btn_ash x-cancel" title="${NO}">${NO}</a><a href="javascript:;" class="btn btn_small btn_gray margin_left_10 x-submit ${cls}" title="${YES}">${YES}</a>\
                  </div>\
              </div>\
          </div>\
      </div>';
                var dialog = $(juicer($lang(html), options)).appendTo(document.body).easyModal({
                    autoOpen: true,
                    onClose: function () {
                        options.close.call(this)
                        $(this).parent().remove();
                    },
                    updateZIndexOnOpen: false,
                    zIndex: options.zIndex,
                    onOpen: function () {
                        var $this = $(this);
                        options.open.call($this);
                        $this.on('click', '.x-cancel', function () {
                            $this.trigger('closeModal');
                            options.cancel($this, $this);
                            return false;
                        }).on('click', '.x-submit', function () {
                            $this.trigger('closeModal');
                            options.success($this, $this);
                        })
                    },
                    closeOnEscape: false
                });
                return dialog;
            }
        });
    $.extend({
            showLoad: function () {
                $body.addClass(cls);
            },
            hideLoad: function () {
                $body.removeClass(cls);
            },
            placeholder: function (elem) {
                $('input.placeholder,textarea.placeholder', elem || document.body).trigger('blur');
            }
        });
})(window, jQuery);
$(function () {
    var title = document.title,
        msgItv, i = 0,
        html = $('html'),
        title_shine = true;
    var cls = 'app-loading',
        $body = $(document.body),
        $document = $(document)
    var $message = $('#message'),
        messageNotify, messageReceived = function (result, id, channel) {
            var html, last_message = store.get('message'),
                result = $.parseJSON(result),
                title_shine = !$.browser.weixin,
                num = result.num;
            if (num) {
                    if (window.$CONF && window.$CONF['page_id'] == 'message_all') {
                        store.set('message', result);
                        return false;
                    }
                    if (last_message && last_message.version) {
                        if (result.version > last_message.version && result.step == 'inc') {
                            num = result.num;
                        } else {
                            num = 0;
                        }
                    }
                    if ($('html').hasClass('dialog')) {
                        num = 0;
                    }
                    if (num >= 99) {
                        html = 99 + '<i>+</i>'
                    } else {
                        html = num;
                    }
                    if (!messageNotify) {
                        messageNotify = $('<div  class="prompt_Warp prompt_Warp_260 yellow_label"><div class="prompt_box msg" style="margin-top:0;"><div class="tmsg"><a href="/message/all" ></a></div></div></div>').hide().appendTo(document.body);
                    }
                    if (html <= 0) {
                        clearInterval(msgItv);
                        msgItv = null;
                        $message.empty();
                        messageNotify.hide();
                        document.title = title
                    } else {
                        messageNotify.show();
                        $('a', messageNotify).html(html + $L('条新消息'));
                        messageNotify.css('marginLeft', function () {
                            return -$(this).css('marginLeft', 0).outerWidth(true) / 2;
                        });
                        clearInterval(msgItv);
                        if (title_shine) {
                            msgItv = setInterval(function () {
                                if (++i % 2) {
                                    document.title = "【新消息】" + title;
                                } else {
                                    document.title = "【　　　】" + title;
                                }
                                if (i > 10000) {
                                    i = 0;
                                }
                            }, 1500);
                        } else {
                            document.title = title;
                        }
                        $message.text(num);
                    }
                }
        }
    if (typeof PushStream != 'undefined' && $CONF['is_login'] && !$CONF['disMsg']) {
            var pushstream = new PushStream({
                host: location.hostname,
                port: location.port,
                messagesPublishedAfter: 86400000,
                messagesControlByArgument: true
            });
            pushstream.onmessage = messageReceived;
            pushstream.addChannel($CONF['ch']);
            pushstream.onerror = $.noop;
            $(window).on('beforeunload', function () {
                pushstream.disconnect();
            })
            var connect_itv, connect = function () {
                connect_itv && clearTimeout(connect_itv);
                connect_itv = setTimeout(function () {
                    pushstream.connect();
                }, 100);
            },
                disConnect = function () {
                    connect_itv && clearTimeout(connect_itv);
                    pushstream.disconnect();
                }
            $.support.pageVisibility && $(document).on({
                    'show.visibility': function () {
                        connect();
                    },
                    'hide.visibility': function () {
                        disConnect();
                    }
                });
            setTimeout(function () {
                    connect();
                }, 1000);
        }
    var $body = $(document.body),
        nav = $('.site-nav', $body);
    $body.on('input blur focus paste drop placeholder keyup', 'input.placeholder,textarea.placeholder', function (ev) {
            var $this = $(this),
                isLock = $this.hasClass('lock'),
                label = $this.siblings('.create-option,.create-option_tex'),
                val = $.trim($this.val());
            !isLock && label.toggleClass('hide', val.length > 0);
        }).on('checked', 'label input', function () {
            var $this = $(this),
                checked = $this.prop('checked'),
                label = $this.closest('label'),
                type = $this.attr('type'),
                closest = $this.closest('.closest');
            switch (type) {
                case 'radio':
                    if (!checked) {
                        $this.prop('checked', true).trigger('change');
                        $('label', closest).removeClass('Radio');
                        label.addClass('Radio')
                    }
                    break;
                case 'checkbox':
                    $this.prop('checked', function (i, checked) {
                        checked = !checked;
                        label.toggleClass('Checkbox', checked);
                        return checked;
                    }).trigger('change');
                    break;
                }
            return;
        }).on('click', 'label.checkbox', function (ev) {
            var $this = $(this),
                input = $('input', $this);
            input.trigger('checked');
            return false;
        }).on('click', '.dropdown .dropdown-toggle', function (ev) {
            var $this = $(this),
                drop = $this.closest('.dropdown'),
                hs = drop.hasClass('open');
            $(document.body).trigger('click');
            drop.toggleClass('open', !hs).trigger('dropdown', $this.hasClass('open'));
            return false;
        }).on('click', '.dropdown .dropdown-menu .selecter-item', function (ev) {
            var $this = $(this),
                val = $this.attr('data-value'),
                txt = $this.attr('data-text') || $this.text(),
                drop = $this.closest('.dropdown'),
                text = $('.text', drop),
                select = $('select', drop),
                toggle = $('.dropdown-toggle', drop);
            drop.removeClass('open').trigger('dropdown');
            text.addClass('create-text-on').text(txt);
            select.val(val).trigger('change');
            return false;
        }).on('click', '.dropdown', false).on('click', function () {
            $('.dropdown').filter('.open').removeClass('open');
        }).on('click', '.create-option', function (ev) {
            var $this = $(this),
                input = $this.siblings('input.placeholder');
            input.focus();
            return;
        });
    $document.ajaxStart($.showLoad).ajaxComplete($.hideLoad);
    $(window).on('load beforeunload', function (ev) {
            switch (ev.type) {
            case 'load':
                $body.removeClass(cls);
                break;
            case 'beforeunload':
                $body.addClass(cls);
                break;
            }
        })
    $.placeholder();
});
$(function () {
    if ($.browser.msie && $.browser.version <= 8) {
        var isClose = $.cookie('ieClose');
        if (!isClose) {
            $.get('/public/ie', function (result) {
                if (result.code == 1000) {
                    $(result.html).prependTo(document.body).on('click', '.shut_out', function (ev) {
                        $(this).closest('.ie_warp').remove();
                        $.cookie('ieClose', '1', {
                            expires: 70,
                            path: '/'
                        });
                    });
                }
            }, 'json');
        }
    }
    var $body = $('body'),
        container = $('#st_container'),
        $doc = $('html'),
        st_push = $('.st-pusher:first'),
        clickBtn = $('#site_logo'),
        overlay = $('.site-nav-overlay'),
        openCls = 'st-menu-open',
        menu = $('.st-menu'),
        closeNav = function () {
            st_push.one('webkitTransitionEnd transitionend msTransitionEnd oTransitionEnd', function (ev) {
                menu.css({
                    visibility: 'hidden'
                });
                container.removeAttr('style');
            });
            $body.removeClass(openCls);
        },
        openNav = function () {
            st_push.off('webkitTransitionEnd transitionend msTransitionEnd oTransitionEnd');
            menu.css({
                visibility: 'visible'
            });
            $body.addClass(openCls);
        },
        toggleHandle = function () {
            if ($body.hasClass(openCls)) {
                $body.css({
                    overflowY: 'auto'
                })
                if ($.browser.mozilla) {
                    itv = setTimeout(closeNav, 20);
                } else {
                    closeNav();
                }
            } else {
                if ($doc.prop('scrollHeight') <= $doc.outerHeight()) {
                    container.css({
                        height: $doc.prop('scrollHeight')
                    });
                }
                $body.css({
                    overflowY: 'hidden'
                })
                if ($.browser.mozilla) {
                    setTimeout(openNav, 20);
                } else {
                    openNav();
                }
            }
            return false;
        }
    clickBtn.on('click', toggleHandle)
    overlay.on('click', toggleHandle).on('touchmove', false);
    if (/\biPhone.*Mobile|iPad/i.test(navigator.userAgent) && !$CONF['isWeixin'] && !$CONF['is_app'] && $CONF['module_name'] != 'login' && $CONF['module_name'] != 'register') {
            var html = '<div class="appBox weixin_fixed">\
               <div class="appBox_warp openApp" >\
                   <a href="javascript:;" class="btn close_btn"></a>\
                   <div class="appLogo d">\
                       <a href="javascript:;" class="appLogobtn"   title="打开APP"></a>\
                   </div>\
                   <a href="javascript:;" class="btn Download_btn d"  title="打开APP">打开APP</a>\
               </div>\
           </div>';
            var openApp = function () {
                var loadDateTime = new Date();
                window.setTimeout(function () {
                    var timeOutDateTime = new Date();
                    if (timeOutDateTime - loadDateTime < 2000) {
                        window.open("https://itunes.apple.com/cn/app/artand/id929477177");
                    } else {
                        window.close();
                    }
                }, 25);
                window.location = "artand://";
                return false;
            };
            var exp = store.get('fire_ios');
            if (!exp || exp < $.now()) {
                var pop = $(html).prependTo(document.body).on('click', '.close_btn', function (ev) {
                    $(this).closest('div.appBox').fadeOut('fast', function () {
                        $(this).remove();
                    });
                    store.set('fire_ios', $.now() + 86400000);
                    ev.stopPropagation();
                    return false;
                }).on('click', '.openApp', openApp);
                if (navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == "micromessenger") {
                    var dhtml = $('<div><div style="position: fixed; top: 0px; left: 0px; opacity: 0.8; z-index:1234; height: 2873px; width: 100%; background-color: rgb(0, 0, 0); display: block;" class="appBox"></div><div class="Guide"></div></div>').on('click touchstart', function (ev) {
                        $(this).detach();
                        return false;
                    });
                    pop.on('click', '.d', function (ev) {
                        var dialog = dhtml.appendTo(document.body);
                        $('.Guide', dialog).css({
                            top: $(window).scrollTop()
                        });
                        return false;
                    });
                }
            }
        }
});
(function () {
    var TMPL = {
        confirm: '<div class="enforce_tip">\
        <p>\
             账号尚未验证，可能存在安全隐患；点击<a class="btn enforce_btn sendmail" onclick="return false;" href="javascrpt:;">${_}</a>立刻完成验证\
        </p>\
        <a class="btn enforce_close" href="javascript:;"></a>\
        <p></p>\
    </div>',
        dia: '<div class="msg_box">\
         <div class="msg_top_black"></div>\
         <div class="msg_close">\
             <a href="javascript:;" class="close btn" title="关闭"></a>\
         </div>\
         <div class="msg_content">\
             <h2 class="msg_h2 padding26">验证邮箱确认</h2>\
             <div class="max-width300 email">\
                 <p>\
                     验证邮件已发送到您的邮箱，请<a href="http://${_.host}" class="btn">进入邮箱</a>完成验证\
                 </p>\
             </div>\
         </div>\
    </div>'
    }
    if (($CONF['is_login'] && !$CONF['status'] && $CONF['email'] && window.sessionStorage && !sessionStorage.getItem('is_verfiy'))) {
        var $body = $('body'),
            $el = $(juicer(TMPL.confirm, $CONF['email'])).prependTo(document.body).on('click', '.enforce_close', function (ev) {
                $el.fadeOut('fast', function () {
                    $(this).remove();
                })
                sessionStorage.setItem('is_verfiy', 1);
            }).on('click', '.sendmail', function () {
                $.post('/register/send_mail', function (result) {
                    if (result.code == 1000) {
                        var dialog = $(juicer(TMPL.dia, result)).appendTo($body).easyModal({
                            autoOpen: true,
                            onClose: function () {
                                $(this).parent().remove();
                            },
                            updateZIndexOnOpen: false,
                            onOpen: function () {
                                var $this = $(this);
                                $this.on('click', '.close', function () {
                                    $this.trigger('closeModal');
                                })
                            },
                            closeOnEscape: false
                        });
                    } else {
                        $.notify(result.msg, 'error');
                    }
                }, 'json');
                return false;
            })
    }
})();;
/*!
 * jQuery Validation Plugin 1.11.1
 *
 * http://bassistance.de/jquery-plugins/jquery-plugin-validation/
 * http://docs.jquery.com/Plugins/Validation
 *
 * Copyright 2013 Jörn Zaefferer
 * Released under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 */
(function ($) {
    $.extend($.fn, {
        validate: function (options) {
            if (!this.length) {
                if (options && options.debug && window.console) {
                    console.warn("Nothing selected, can't validate, returning nothing.");
                }
                return;
            }
            var validator = $.data(this[0], "validator");
            if (validator) {
                return validator;
            }
            this.attr("novalidate", "novalidate");
            validator = new $.validator(options, this[0]);
            $.data(this[0], "validator", validator);
            if (validator.settings.onsubmit) {
                this.validateDelegate(":submit", "click", function (event) {
                    if (validator.settings.submitHandler) {
                        validator.submitButton = event.target;
                    }
                    if ($(event.target).hasClass("cancel")) {
                        validator.cancelSubmit = true;
                    }
                    if ($(event.target).attr("formnovalidate") !== undefined) {
                        validator.cancelSubmit = true;
                    }
                });
                this.submit(function (event) {
                    if (validator.settings.debug) {
                        event.preventDefault();
                    }

                    function handle() {
                        var hidden;
                        if (validator.settings.submitHandler) {
                            if (validator.submitButton) {
                                hidden = $("<input type='hidden'/>").attr("name", validator.submitButton.name).val($(validator.submitButton).val()).appendTo(validator.currentForm);
                            }
                            validator.settings.submitHandler.call(validator, validator.currentForm, event);
                            if (validator.submitButton) {
                                hidden.remove();
                            }
                            return false;
                        }
                        return true;
                    }
                    if (validator.cancelSubmit) {
                        validator.cancelSubmit = false;
                        return handle();
                    }
                    if (validator.form()) {
                        if (validator.pendingRequest) {
                            validator.formSubmitted = true;
                            return false;
                        }
                        return handle();
                    } else {
                        validator.focusInvalid();
                        return false;
                    }
                });
            }
            return validator;
        },
        valid: function () {
            if ($(this[0]).is("form")) {
                return this.validate().form();
            } else {
                var valid = true;
                var validator = $(this[0].form).validate();
                this.each(function () {
                    valid = valid && validator.element(this);
                });
                return valid;
            }
        },
        removeAttrs: function (attributes) {
            var result = {},
                $element = this;
            $.each(attributes.split(/\s/), function (index, value) {
                    result[value] = $element.attr(value);
                    $element.removeAttr(value);
                });
            return result;
        },
        rules: function (command, argument) {
            var element = this[0];
            if (command) {
                var settings = $.data(element.form, "validator").settings;
                var staticRules = settings.rules;
                var existingRules = $.validator.staticRules(element);
                switch (command) {
                case "add":
                    $.extend(existingRules, $.validator.normalizeRule(argument));
                    delete existingRules.messages;
                    staticRules[element.name] = existingRules;
                    if (argument.messages) {
                        settings.messages[element.name] = $.extend(settings.messages[element.name], argument.messages);
                    }
                    break;
                case "remove":
                    if (!argument) {
                        delete staticRules[element.name];
                        return existingRules;
                    }
                    var filtered = {};
                    $.each(argument.split(/\s/), function (index, method) {
                        filtered[method] = existingRules[method];
                        delete existingRules[method];
                    });
                    return filtered;
                }
            }
            var data = $.validator.normalizeRules($.extend({}, $.validator.classRules(element), $.validator.attributeRules(element), $.validator.dataRules(element), $.validator.staticRules(element)), element);
            if (data.required) {
                var param = data.required;
                delete data.required;
                data = $.extend({
                    required: param
                }, data);
            }
            return data;
        }
    });
    $.extend($.expr[":"], {
        blank: function (a) {
            return !$.trim("" + $(a).val());
        },
        filled: function (a) {
            return !!$.trim("" + $(a).val());
        },
        unchecked: function (a) {
            return !$(a).prop("checked");
        }
    });
    $.validator = function (options, form) {
        this.settings = $.extend(true, {}, $.validator.defaults, options);
        this.currentForm = form;
        this.init();
    };
    $.validator.format = function (source, params) {
        if (arguments.length === 1) {
            return function () {
                var args = $.makeArray(arguments);
                args.unshift(source);
                return $.validator.format.apply(this, args);
            };
        }
        if (arguments.length > 2 && params.constructor !== Array) {
            params = $.makeArray(arguments).slice(1);
        }
        if (params.constructor !== Array) {
            params = [params];
        }
        $.each(params, function (i, n) {
            source = source.replace(new RegExp("\\{" + i + "\\}", "g"), function () {
                return n;
            });
        });
        return source;
    };
    $.extend($.validator, {
        defaults: {
            messages: {},
            groups: {},
            rules: {},
            errorClass: "error",
            validClass: "valid",
            errorElement: "label",
            focusInvalid: true,
            errorContainer: $([]),
            errorLabelContainer: $([]),
            onsubmit: true,
            ignore: ":hidden",
            ignoreTitle: false,
            onfocusin: function (element, event) {
                this.lastActive = element;
                if (this.settings.focusCleanup && !this.blockFocusCleanup) {
                    if (this.settings.unhighlight) {
                        this.settings.unhighlight.call(this, element, this.settings.errorClass, this.settings.validClass);
                    }
                    this.addWrapper(this.errorsFor(element)).hide();
                }
            },
            onfocusout: function (element, event) {
                if (!this.checkable(element) && (element.name in this.submitted || !this.optional(element))) {
                    this.element(element);
                }
            },
            onkeyup: function (element, event) {
                if (event.which === 9 && this.elementValue(element) === "") {
                    return;
                } else if (element.name in this.submitted || element === this.lastElement) {
                    this.element(element);
                }
            },
            onclick: function (element, event) {
                if (element.name in this.submitted) {
                    this.element(element);
                }
                else if (element.parentNode.name in this.submitted) {
                    this.element(element.parentNode);
                }
            },
            highlight: function (element, errorClass, validClass) {
                if (element.type === "radio") {
                    this.findByName(element.name).addClass(errorClass).removeClass(validClass);
                } else {
                    $(element).addClass(errorClass).removeClass(validClass);
                }
            },
            unhighlight: function (element, errorClass, validClass) {
                if (element.type === "radio") {
                    this.findByName(element.name).removeClass(errorClass).addClass(validClass);
                } else {
                    $(element).removeClass(errorClass).addClass(validClass);
                }
            }
        },
        setDefaults: function (settings) {
            $.extend($.validator.defaults, settings);
        },
        messages: {
            required: "This field is required.",
            remote: "Please fix this field.",
            email: "Please enter a valid email address.",
            url: "Please enter a valid URL.",
            date: "Please enter a valid date.",
            dateISO: "Please enter a valid date (ISO).",
            number: "Please enter a valid number.",
            digits: "Please enter only digits.",
            creditcard: "Please enter a valid credit card number.",
            equalTo: "Please enter the same value again.",
            maxlength: $.validator.format("Please enter no more than {0} characters."),
            minlength: $.validator.format("Please enter at least {0} characters."),
            rangelength: $.validator.format("Please enter a value between {0} and {1} characters long."),
            range: $.validator.format("Please enter a value between {0} and {1}."),
            max: $.validator.format("Please enter a value less than or equal to {0}."),
            min: $.validator.format("Please enter a value greater than or equal to {0}.")
        },
        autoCreateRanges: false,
        prototype: {
            init: function () {
                this.labelContainer = $(this.settings.errorLabelContainer);
                this.errorContext = this.labelContainer.length && this.labelContainer || $(this.currentForm);
                this.containers = $(this.settings.errorContainer).add(this.settings.errorLabelContainer);
                this.submitted = {};
                this.valueCache = {};
                this.pendingRequest = 0;
                this.pending = {};
                this.invalid = {};
                this.reset();
                var groups = (this.groups = {});
                $.each(this.settings.groups, function (key, value) {
                    if (typeof value === "string") {
                        value = value.split(/\s/);
                    }
                    $.each(value, function (index, name) {
                        groups[name] = key;
                    });
                });
                var rules = this.settings.rules;
                $.each(rules, function (key, value) {
                    rules[key] = $.validator.normalizeRule(value);
                });

                function delegate(event) {
                    var validator = $.data(this[0].form, "validator"),
                        eventType = "on" + event.type.replace(/^validate/, "");
                    if (validator.settings[eventType]) {
                            validator.settings[eventType].call(validator, this[0], event);
                        }
                }
                $(this.currentForm).validateDelegate(":text, [type='password'], [type='file'], select, textarea, " + "[type='number'], [type='search'] ,[type='tel'], [type='url'], " + "[type='email'], [type='datetime'], [type='date'], [type='month'], " + "[type='week'], [type='time'], [type='datetime-local'], " + "[type='range'], [type='color'] ", "focusin focusout keyup", delegate).validateDelegate("[type='radio'], [type='checkbox'], select, option", "click", delegate);
                if (this.settings.invalidHandler) {
                    $(this.currentForm).bind("invalid-form.validate", this.settings.invalidHandler);
                }
            },
            form: function () {
                this.checkForm();
                $.extend(this.submitted, this.errorMap);
                this.invalid = $.extend({}, this.errorMap);
                if (!this.valid()) {
                    $(this.currentForm).triggerHandler("invalid-form", [this]);
                }
                this.showErrors();
                return this.valid();
            },
            checkForm: function () {
                this.prepareForm();
                for (var i = 0, elements = (this.currentElements = this.elements()); elements[i]; i++) {
                    this.check(elements[i]);
                }
                return this.valid();
            },
            element: function (element) {
                element = this.validationTargetFor(this.clean(element));
                this.lastElement = element;
                this.prepareElement(element);
                this.currentElements = $(element);
                var result = this.check(element) !== false;
                if (result) {
                    delete this.invalid[element.name];
                } else {
                    this.invalid[element.name] = true;
                }
                if (!this.numberOfInvalids()) {
                    this.toHide = this.toHide.add(this.containers);
                }
                this.showErrors();
                return result;
            },
            showErrors: function (errors) {
                if (errors) {
                    $.extend(this.errorMap, errors);
                    this.errorList = [];
                    for (var name in errors) {
                        this.errorList.push({
                            message: errors[name],
                            element: this.findByName(name)[0]
                        });
                    }
                    this.successList = $.grep(this.successList, function (element) {
                        return !(element.name in errors);
                    });
                }
                if (this.settings.showErrors) {
                    this.settings.showErrors.call(this, this.errorMap, this.errorList);
                } else {
                    this.defaultShowErrors();
                }
            },
            resetForm: function () {
                if ($.fn.resetForm) {
                    $(this.currentForm).resetForm();
                }
                this.submitted = {};
                this.lastElement = null;
                this.prepareForm();
                this.hideErrors();
                this.elements().removeClass(this.settings.errorClass).removeData("previousValue");
            },
            numberOfInvalids: function () {
                return this.objectLength(this.invalid);
            },
            objectLength: function (obj) {
                var count = 0;
                for (var i in obj) {
                    count++;
                }
                return count;
            },
            hideErrors: function () {
                this.addWrapper(this.toHide).hide();
            },
            valid: function () {
                return this.size() === 0;
            },
            size: function () {
                return this.errorList.length;
            },
            focusInvalid: function () {
                if (this.settings.focusInvalid) {
                    try {
                        $(this.findLastActive() || this.errorList.length && this.errorList[0].element || []).filter(":visible").focus().trigger("focusin");
                    } catch (e) {}
                }
            },
            findLastActive: function () {
                var lastActive = this.lastActive;
                return lastActive && $.grep(this.errorList, function (n) {
                    return n.element.name === lastActive.name;
                }).length === 1 && lastActive;
            },
            elements: function () {
                var validator = this,
                    rulesCache = {};
                return $(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, [disabled]").not(this.settings.ignore).filter(function () {
                        if (!this.name && validator.settings.debug && window.console) {
                            console.error("%o has no name assigned", this);
                        }
                        if (this.name in rulesCache || !validator.objectLength($(this).rules())) {
                            return false;
                        }
                        rulesCache[this.name] = true;
                        return true;
                    });
            },
            clean: function (selector) {
                return $(selector)[0];
            },
            errors: function () {
                var errorClass = this.settings.errorClass.replace(" ", ".");
                return $(this.settings.errorElement + "." + errorClass, this.errorContext);
            },
            reset: function () {
                this.successList = [];
                this.errorList = [];
                this.errorMap = {};
                this.toShow = $([]);
                this.toHide = $([]);
                this.currentElements = $([]);
            },
            prepareForm: function () {
                this.reset();
                this.toHide = this.errors().add(this.containers);
            },
            prepareElement: function (element) {
                this.reset();
                this.toHide = this.errorsFor(element);
            },
            elementValue: function (element) {
                var type = $(element).attr("type"),
                    val = $(element).val();
                if (type === "radio" || type === "checkbox") {
                        return $("input[name='" + $(element).attr("name") + "']:checked").val();
                    }
                if (typeof val === "string") {
                        return val.replace(/\r/g, "");
                    }
                return val;
            },
            check: function (element) {
                element = this.validationTargetFor(this.clean(element));
                var rules = $(element).rules();
                var dependencyMismatch = false;
                var val = this.elementValue(element);
                var result;
                for (var method in rules) {
                    var rule = {
                        method: method,
                        parameters: rules[method]
                    };
                    try {
                        result = $.validator.methods[method].call(this, val, element, rule.parameters);
                        if (result === "dependency-mismatch") {
                            dependencyMismatch = true;
                            continue;
                        }
                        dependencyMismatch = false;
                        if (result === "pending") {
                            this.toHide = this.toHide.not(this.errorsFor(element));
                            return;
                        }
                        if (!result) {
                            this.formatAndAdd(element, rule);
                            return false;
                        }
                    } catch (e) {
                        if (this.settings.debug && window.console) {
                            console.log("Exception occurred when checking element " + element.id + ", check the '" + rule.method + "' method.", e);
                        }
                        throw e;
                    }
                }
                if (dependencyMismatch) {
                    return;
                }
                if (this.objectLength(rules)) {
                    this.successList.push(element);
                }
                return true;
            },
            customDataMessage: function (element, method) {
                return $(element).data("msg-" + method.toLowerCase()) || (element.attributes && $(element).attr("data-msg-" + method.toLowerCase()));
            },
            customMessage: function (name, method) {
                var m = this.settings.messages[name];
                return m && (m.constructor === String ? m : m[method]);
            },
            findDefined: function () {
                for (var i = 0; i < arguments.length; i++) {
                    if (arguments[i] !== undefined) {
                        return arguments[i];
                    }
                }
                return undefined;
            },
            defaultMessage: function (element, method) {
                return this.findDefined(this.customMessage(element.name, method), this.customDataMessage(element, method), !this.settings.ignoreTitle && element.title || undefined, $.validator.messages[method], "<strong>Warning: No message defined for " + element.name + "</strong>");
            },
            formatAndAdd: function (element, rule) {
                var message = this.defaultMessage(element, rule.method),
                    theregex = /\$?\{(\d+)\}/g;
                if (typeof message === "function") {
                        message = message.call(this, rule.parameters, element);
                    } else if (theregex.test(message)) {
                        message = $.validator.format(message.replace(theregex, "{$1}"), rule.parameters);
                    }
                this.errorList.push({
                        message: message,
                        element: element
                    });
                this.errorMap[element.name] = message;
                this.submitted[element.name] = message;
            },
            addWrapper: function (toToggle) {
                if (this.settings.wrapper) {
                    toToggle = toToggle.add(toToggle.parent(this.settings.wrapper));
                }
                return toToggle;
            },
            defaultShowErrors: function () {
                var i, elements;
                for (i = 0; this.errorList[i]; i++) {
                    var error = this.errorList[i];
                    if (this.settings.highlight) {
                        this.settings.highlight.call(this, error.element, this.settings.errorClass, this.settings.validClass);
                    }
                    this.showLabel(error.element, error.message);
                }
                if (this.errorList.length) {
                    this.toShow = this.toShow.add(this.containers);
                }
                if (this.settings.success) {
                    for (i = 0; this.successList[i]; i++) {
                        this.showLabel(this.successList[i]);
                    }
                }
                if (this.settings.unhighlight) {
                    for (i = 0, elements = this.validElements(); elements[i]; i++) {
                        this.settings.unhighlight.call(this, elements[i], this.settings.errorClass, this.settings.validClass);
                    }
                }
                this.toHide = this.toHide.not(this.toShow);
                this.hideErrors();
                this.addWrapper(this.toShow).show();
            },
            validElements: function () {
                return this.currentElements.not(this.invalidElements());
            },
            invalidElements: function () {
                return $(this.errorList).map(function () {
                    return this.element;
                });
            },
            showLabel: function (element, message) {
                var label = this.errorsFor(element);
                if (label.length) {
                    label.removeClass(this.settings.validClass).addClass(this.settings.errorClass);
                    label.html(message);
                } else {
                    label = $("<" + this.settings.errorElement + ">").attr("for", this.idOrName(element)).addClass(this.settings.errorClass).html(message || "");
                    if (this.settings.wrapper) {
                        label = label.hide().show().wrap("<" + this.settings.wrapper + "/>").parent();
                    }
                    if (!this.labelContainer.append(label).length) {
                        if (this.settings.errorPlacement) {
                            this.settings.errorPlacement(label, $(element));
                        } else {
                            label.insertAfter(element);
                        }
                    }
                }
                if (!message && this.settings.success) {
                    label.text("");
                    if (typeof this.settings.success === "string") {
                        label.addClass(this.settings.success);
                    } else {
                        this.settings.success(label, element);
                    }
                }
                this.toShow = this.toShow.add(label);
            },
            errorsFor: function (element) {
                var name = this.idOrName(element);
                return this.errors().filter(function () {
                    return $(this).attr("for") === name;
                });
            },
            idOrName: function (element) {
                return this.groups[element.name] || (this.checkable(element) ? element.name : element.id || element.name);
            },
            validationTargetFor: function (element) {
                if (this.checkable(element)) {
                    element = this.findByName(element.name).not(this.settings.ignore)[0];
                }
                return element;
            },
            checkable: function (element) {
                return (/radio|checkbox/i).test(element.type);
            },
            findByName: function (name) {
                return $(this.currentForm).find("[name='" + name + "']");
            },
            getLength: function (value, element) {
                switch (element.nodeName.toLowerCase()) {
                case "select":
                    return $("option:selected", element).length;
                case "input":
                    if (this.checkable(element)) {
                        return this.findByName(element.name).filter(":checked").length;
                    }
                }
                return value.length;
            },
            depend: function (param, element) {
                return this.dependTypes[typeof param] ? this.dependTypes[typeof param](param, element) : true;
            },
            dependTypes: {
                "boolean": function (param, element) {
                    return param;
                },
                "string": function (param, element) {
                    return !!$(param, element.form).length;
                },
                "function": function (param, element) {
                    return param(element);
                }
            },
            optional: function (element) {
                var val = this.elementValue(element);
                return !$.validator.methods.required.call(this, val, element) && "dependency-mismatch";
            },
            startRequest: function (element) {
                if (!this.pending[element.name]) {
                    this.pendingRequest++;
                    this.pending[element.name] = true;
                }
            },
            stopRequest: function (element, valid) {
                this.pendingRequest--;
                if (this.pendingRequest < 0) {
                    this.pendingRequest = 0;
                }
                delete this.pending[element.name];
                if (valid && this.pendingRequest === 0 && this.formSubmitted && this.form()) {
                    $(this.currentForm).submit();
                    this.formSubmitted = false;
                } else if (!valid && this.pendingRequest === 0 && this.formSubmitted) {
                    $(this.currentForm).triggerHandler("invalid-form", [this]);
                    this.formSubmitted = false;
                }
            },
            previousValue: function (element) {
                return $.data(element, "previousValue") || $.data(element, "previousValue", {
                    old: null,
                    valid: true,
                    message: this.defaultMessage(element, "remote")
                });
            }
        },
        classRuleSettings: {
            required: {
                required: true
            },
            email: {
                email: true
            },
            url: {
                url: true
            },
            date: {
                date: true
            },
            dateISO: {
                dateISO: true
            },
            number: {
                number: true
            },
            digits: {
                digits: true
            },
            creditcard: {
                creditcard: true
            }
        },
        addClassRules: function (className, rules) {
            if (className.constructor === String) {
                this.classRuleSettings[className] = rules;
            } else {
                $.extend(this.classRuleSettings, className);
            }
        },
        classRules: function (element) {
            var rules = {};
            var classes = $(element).attr("class");
            if (classes) {
                $.each(classes.split(" "), function () {
                    if (this in $.validator.classRuleSettings) {
                        $.extend(rules, $.validator.classRuleSettings[this]);
                    }
                });
            }
            return rules;
        },
        attributeRules: function (element) {
            var rules = {};
            var $element = $(element);
            var type = $element[0].getAttribute("type");
            for (var method in $.validator.methods) {
                var value;
                if (method === "required") {
                    value = $element.get(0).getAttribute(method);
                    if (value === "") {
                        value = true;
                    }
                    value = !! value;
                } else {
                    value = $element.attr(method);
                }
                if (/min|max/.test(method) && (type === null || /number|range|text/.test(type))) {
                    value = Number(value);
                }
                if (value) {
                    rules[method] = value;
                } else if (type === method && type !== 'range') {
                    rules[method] = true;
                }
            }
            if (rules.maxlength && /-1|2147483647|524288/.test(rules.maxlength)) {
                delete rules.maxlength;
            }
            return rules;
        },
        dataRules: function (element) {
            var method, value, rules = {},
                $element = $(element);
            for (method in $.validator.methods) {
                    value = $element.data("rule-" + method.toLowerCase());
                    if (value !== undefined) {
                        rules[method] = value;
                    }
                }
            return rules;
        },
        staticRules: function (element) {
            var rules = {};
            var validator = $.data(element.form, "validator");
            if (validator.settings.rules) {
                rules = $.validator.normalizeRule(validator.settings.rules[element.name]) || {};
            }
            return rules;
        },
        normalizeRules: function (rules, element) {
            $.each(rules, function (prop, val) {
                if (val === false) {
                    delete rules[prop];
                    return;
                }
                if (val.param || val.depends) {
                    var keepRule = true;
                    switch (typeof val.depends) {
                    case "string":
                        keepRule = !! $(val.depends, element.form).length;
                        break;
                    case "function":
                        keepRule = val.depends.call(element, element);
                        break;
                    }
                    if (keepRule) {
                        rules[prop] = val.param !== undefined ? val.param : true;
                    } else {
                        delete rules[prop];
                    }
                }
            });
            $.each(rules, function (rule, parameter) {
                rules[rule] = $.isFunction(parameter) ? parameter(element) : parameter;
            });
            $.each(['minlength', 'maxlength'], function () {
                if (rules[this]) {
                    rules[this] = Number(rules[this]);
                }
            });
            $.each(['rangelength', 'range'], function () {
                var parts;
                if (rules[this]) {
                    if ($.isArray(rules[this])) {
                        rules[this] = [Number(rules[this][0]), Number(rules[this][1])];
                    } else if (typeof rules[this] === "string") {
                        parts = rules[this].split(/[\s,]+/);
                        rules[this] = [Number(parts[0]), Number(parts[1])];
                    }
                }
            });
            if ($.validator.autoCreateRanges) {
                if (rules.min && rules.max) {
                    rules.range = [rules.min, rules.max];
                    delete rules.min;
                    delete rules.max;
                }
                if (rules.minlength && rules.maxlength) {
                    rules.rangelength = [rules.minlength, rules.maxlength];
                    delete rules.minlength;
                    delete rules.maxlength;
                }
            }
            return rules;
        },
        normalizeRule: function (data) {
            if (typeof data === "string") {
                var transformed = {};
                $.each(data.split(/\s/), function () {
                    transformed[this] = true;
                });
                data = transformed;
            }
            return data;
        },
        addMethod: function (name, method, message) {
            $.validator.methods[name] = method;
            $.validator.messages[name] = message !== undefined ? message : $.validator.messages[name];
            if (method.length < 3) {
                $.validator.addClassRules(name, $.validator.normalizeRule(name));
            }
        },
        methods: {
            required: function (value, element, param) {
                if (!this.depend(param, element)) {
                    return "dependency-mismatch";
                }
                if (element.nodeName.toLowerCase() === "select") {
                    var val = $(element).val();
                    return val && val.length > 0;
                }
                if (this.checkable(element)) {
                    return this.getLength(value, element) > 0;
                }
                return $.trim(value).length > 0;
            },
            email: function (value, element) {
                return this.optional(element) || /^((([a-z\.]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(value);
            },
            url: function (value, element) {
                return this.optional(element) || /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value);
            },
            date: function (value, element) {
                return this.optional(element) || !/Invalid|NaN/.test(new Date(value).toString());
            },
            dateISO: function (value, element) {
                return this.optional(element) || /^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/.test(value);
            },
            number: function (value, element) {
                return this.optional(element) || /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value);
            },
            digits: function (value, element) {
                return this.optional(element) || /^\d+$/.test(value);
            },
            creditcard: function (value, element) {
                if (this.optional(element)) {
                    return "dependency-mismatch";
                }
                if (/[^0-9 \-]+/.test(value)) {
                    return false;
                }
                var nCheck = 0,
                    nDigit = 0,
                    bEven = false;
                value = value.replace(/\D/g, "");
                for (var n = value.length - 1; n >= 0; n--) {
                        var cDigit = value.charAt(n);
                        nDigit = parseInt(cDigit, 10);
                        if (bEven) {
                            if ((nDigit *= 2) > 9) {
                                nDigit -= 9;
                            }
                        }
                        nCheck += nDigit;
                        bEven = !bEven;
                    }
                return (nCheck % 10) === 0;
            },
            minlength: function (value, element, param) {
                var length = $.isArray(value) ? value.length : this.getLength($.trim(value), element);
                return this.optional(element) || length >= param;
            },
            maxlength: function (value, element, param) {
                var length = $.isArray(value) ? value.length : this.getLength($.trim(value), element);
                return this.optional(element) || length <= param;
            },
            rangelength: function (value, element, param) {
                var length = $.isArray(value) ? value.length : this.getLength($.trim(value), element);
                return this.optional(element) || (length >= param[0] && length <= param[1]);
            },
            min: function (value, element, param) {
                return this.optional(element) || value >= param;
            },
            max: function (value, element, param) {
                return this.optional(element) || value <= param;
            },
            range: function (value, element, param) {
                return this.optional(element) || (value >= param[0] && value <= param[1]);
            },
            equalTo: function (value, element, param) {
                var target = $(param);
                if (this.settings.onfocusout) {
                    target.unbind(".validate-equalTo").bind("blur.validate-equalTo", function () {
                        $(element).valid();
                    });
                }
                return value === target.val();
            },
            remote: function (value, element, param) {
                if (this.optional(element)) {
                    return "dependency-mismatch";
                }
                var previous = this.previousValue(element);
                if (!this.settings.messages[element.name]) {
                    this.settings.messages[element.name] = {};
                }
                previous.originalMessage = this.settings.messages[element.name].remote;
                this.settings.messages[element.name].remote = previous.message;
                param = typeof param === "string" && {
                    url: param
                } || param;
                if (previous.old === value) {
                    return previous.valid;
                }
                previous.old = value;
                var validator = this;
                this.startRequest(element);
                var data = {};
                data[element.name] = value;
                $.ajax($.extend(true, {
                    url: param,
                    mode: "abort",
                    port: "validate" + element.name,
                    dataType: "json",
                    data: data,
                    success: function (response) {
                        validator.settings.messages[element.name].remote = previous.originalMessage;
                        var valid = response.code == 1000;
                        if (valid) {
                            var submitted = validator.formSubmitted;
                            validator.prepareElement(element);
                            validator.formSubmitted = submitted;
                            validator.successList.push(element);
                            delete validator.invalid[element.name];
                            validator.showErrors();
                        } else {
                            var errors = {};
                            var message = response.msg || validator.defaultMessage(element, "remote");
                            errors[element.name] = previous.message = $.isFunction(message) ? message(value) : message;
                            validator.invalid[element.name] = true;
                            validator.showErrors(errors);
                        }
                        previous.valid = valid;
                        validator.stopRequest(element, valid);
                    }
                }, param));
                return "pending";
            }
        }
    });
    $.format = $.validator.format;
}(jQuery));
(function ($) {
    var pendingRequests = {};
    if ($.ajaxPrefilter) {
        $.ajaxPrefilter(function (settings, _, xhr) {
            var port = settings.port;
            if (settings.mode === "abort") {
                if (pendingRequests[port]) {
                    pendingRequests[port].abort();
                }
                pendingRequests[port] = xhr;
            }
        });
    } else {
        var ajax = $.ajax;
        $.ajax = function (settings) {
            var mode = ("mode" in settings ? settings : $.ajaxSettings).mode,
                port = ("port" in settings ? settings : $.ajaxSettings).port;
            if (mode === "abort") {
                    if (pendingRequests[port]) {
                        pendingRequests[port].abort();
                    }
                    pendingRequests[port] = ajax.apply(this, arguments);
                    return pendingRequests[port];
                }
            return ajax.apply(this, arguments);
        };
    }
}(jQuery));
(function ($) {
    $.extend($.fn, {
        validateDelegate: function (delegate, type, handler) {
            return this.bind(type, function (event) {
                var target = $(event.target);
                if (target.is(delegate)) {
                    return handler.apply(target, arguments);
                }
            });
        }
    });
}(jQuery));;
(function ($) {
    "use strict";
    var zIndex = 100;
    var methods = {
        init: function (options) {
            var defaults = {
                top: 'auto',
                autoOpen: false,
                overlayOpacity: 0,
                overlayColor: '#000',
                overlayClose: true,
                overlayParent: 'body',
                closeOnEscape: true,
                closeButtonClass: '.close',
                transitionIn: '',
                transitionOut: '',
                onOpen: false,
                onClose: false,
                zIndex: function () {
                    return ++zIndex;
                },
                updateZIndexOnOpen: false
            };
            options = $.extend(defaults, options);
            return this.each(function () {
                var o = options,
                    $overlay = $('<div class="lean-overlay"></div>'),
                    $modal = $(this),
                    $wrap = $('<div style="overflow-y:auto;width:100%;height:100%;left:0;top:0;position:fixed;display:none"></div>'),
                    zIndex = o.updateZIndexOnOpen ? 0 : o.zIndex() + 1,
                    parent, child, $body = $('body'),
                    $window = $(window),
                    scrollbarwidth = $.scrollbarwidth();
                $overlay.css({
                        'display': 'none',
                        'position': 'fixed',
                        'z-index': (o.updateZIndexOnOpen ? 0 : o.zIndex()),
                        'top': 0,
                        'left': 0,
                        'height': '100%',
                        'width': '100%',
                        'background': o.overlayColor,
                        'overflow': 'auto',
                        'transition': 'all 0.3s ease 0s'
                    }).appendTo(o.overlayParent);
                $modal.css({
                        'display': 'none',
                        'position': 'absolute',
                        'z-index': zIndex,
                        'left': 50 + '%'
                    });
                $wrap.css({
                        zIndex: zIndex + 1
                    });
                var reposition = function () {
                        if (o.transitionIn !== '' && o.transitionOut !== '') {
                            $modal.removeClass(o.transitionOut).addClass(o.transitionIn);
                        };
                        var $style = {
                            'margin-left': -($modal.outerWidth() / 2) + 'px',
                            'top': 0,
                            'margin-top': 0
                        };
                        if ($modal.outerHeight() < $window.height()) {
                            $style.top = parseInt(o.top, 10) > -1 ? o.top + 'px' : 50 + '%';
                            $style.marginTop = (parseInt(o.top, 10) > -1 ? 0 : -($modal.outerHeight() / 2)) + 'px'
                        }
                        $modal.css($style);
                        if ($(document).height() > $window.height()) {
                            $body.css('margin-right', scrollbarwidth).css('overflow', 'hidden');;
                        }
                    }
                $modal.wrap($wrap).bind('openModal', reposition).on('openModal', function () {
                        $overlay.show();
                        $modal.show().parent().show();
                        reposition();
                        $(window).one('resize.modal', reposition);
                        if (o.onOpen && typeof o.onOpen === 'function') {
                            o.onOpen.call($modal, $modal[0]);
                        }
                        $body.addClass('popup_visible');
                        $(document.body).attr('data-dialog', function (i, num) {
                            return (parseInt(num) || 0) + 1
                        });
                    }).on('reposition', reposition);
                $modal.bind('closeModal', function () {
                        $(document.body).attr('data-dialog', function (i, num) {
                            var val = Math.max((parseInt(num) || 0) - 1, 0);
                            if (val == 0) {
                                $body.css({
                                    'margin-right': 0,
                                    overflow: 'none'
                                }).removeClass('popup_visible')
                            }
                            return val;
                        });
                        if (o.transitionIn !== '' && o.transitionOut !== '') {
                            $modal.removeClass(o.transitionIn).addClass(o.transitionOut);
                            $modal.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                                $modal.css('display', 'none');
                                $overlay.css('display', 'none');
                            });
                        }
                        else {
                            $modal.css('display', 'none');
                            $overlay.css('display', 'none');
                            $wrap.css('display', 'none');
                        }
                        $(window).off('resize.modal', reposition);
                        if (o.onClose && typeof o.onClose === 'function') {
                            o.onClose.call($modal, $modal[0]);
                        }
                    });
                $modal.parent().on('click.modal', function (ev) {
                        if (o.overlayClose && !$.contains($modal[0], ev.target) && $modal[0] != ev.target) {
                            $modal.trigger('closeModal');
                        }
                    });
                $overlay.click(function () {
                        if (o.overlayClose) {
                            $modal.trigger('closeModal');
                        }
                    });
                $(document).keydown(function (e) {
                        if (o.closeOnEscape && e.keyCode === 27 && !$modal.hasClass('escape-lock')) {
                            $modal.trigger('closeModal');
                        }
                    });
                $modal.on('click', o.closeButtonClass, function (e) {
                        $modal.trigger('closeModal');
                        e.preventDefault();
                    });
                if (o.autoOpen) {
                        $modal.trigger('openModal');
                    }
            });
        }
    };
    $.fn.easyModal = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        }
        if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        }
        $.error('Method ' + method + ' does not exist on jQuery.easyModal');
    };
}(jQuery));;
$(function ($) {
    var showDial = function (tmpl, opts) {
        var thidDia = $(tmpl).appendTo(document.body).on('click', '.submit', function () {
            $(this).closest('form').trigger('submit');
            return false;
        }).on('click', '.submit-retry', function (ev) {
            var content = $(this).closest('.msg_content'),
                siblings = content.siblings('.msg_content');
            content.fadeOut('normal', function () {
                    siblings.fadeIn('fast').closest('.msg_box').trigger('reposition');
                });
        }).on('click', false).easyModal({
            autoOpen: true,
            onClose: function () {
                $(this).parent().remove();
            },
            onOpen: function () {
                var form = $('form', this);
                form.validate({
                    rules: {
                        uname: {
                            required: true
                        },
                        email: {
                            required: true,
                            email: true
                        },
                        content: {
                            required: true
                        }
                    },
                    messages: {
                        uname: {
                            required: $L('名称为必填')
                        },
                        email: {
                            required: $L('电子邮箱为必填'),
                            email: $L('电子邮箱格式有误，请重新输入')
                        },
                        content: {
                            required: $L('请填写反馈内容')
                        }
                    },
                    errorPlacement: function (error, element) {
                        element.after(error.addClass('msg_error typeface_1 KAITI'));
                    },
                    errorElement: 'div',
                    focusInvalid: true,
                    submitHandler: function () {
                        $.post('/proxy/doFeedback', form.serialize(), function (result) {
                            if (result.code == 1000) {
                                $.notify($L('提交成功！'));
                                thidDia.trigger('closeModal');
                            } else {
                                $.notify(result.msg, 'error');
                            }
                        }, 'json');
                        return false;
                    }
                });
            }
        });
    }
    var html;
    var feedback = function (opts) {
        if (html) {
            showDial(html);
        } else {
            $.get('/public/feedback', function (result) {
                showDial(result.html);
            }, 'json');
        }
    };
    $.feedback = feedback;
    $(document.body).on('click', '.feedback', feedback);
});;
$(function ($) {
    var url = '/public/lang',
        isLock, style = '/style/common/language.css',
        $body = $(document.body),
        $style;
    style = $CONF['css_host'] + '/style/common/language.css?version=' + $CONF['css_version']
    loadStyle(style);
});;
(function ($) {
    var TMPL = '',
        lockCls = 'lock';
    var modal, openwindow = function (url, name, iWidth, iHeight) {
            var url, name, iWidth, iHeight, iTop = (window.screen.availHeight - 30 - iHeight) / 2,
                iLeft = (window.screen.availWidth - 10 - iWidth) / 2;
            return window.open(url, name, 'height=' + iHeight + ',,innerHeight=' + iHeight + ',width=' + iWidth + ',innerWidth=' + iWidth + ',top=' + iTop + ',left=' + iLeft + ',toolbar=no,menubar=no,scrollbars=auto,resizeable=no,location=no,status=no');
        };
    $.success = function (result) {
            $CONF['is_login'] = true;
            $.isFunction($.loginCallback) && $.loginCallback.call(this, result);
            if (typeof(result['role']) != 'undefined' && (!result['role'] || result['role'] <= 0)) {
                return window.top.location.href = '/register/guide/role';
            }
            if ($CONF['callback']) {
                window.top.location.href = $CONF['callback'];
            } else {
                window.top.location.href = '/';
            }
        }
    $.register = function () {
            window.top.location.href = '/register/check';
            return false;
        }
    var refresh = function (el) {
            $(el).attr('src', function () {
                return $(this).attr('data-src') + '?v=' + Math.random();
            });
            return false;
        }
    var dialog = {
            login: function (form) {
                var verify = $('img.verify', form),
                    uname = $('input[name=email]', form),
                    password = $('input:password', form),
                    row = verify.closest('.text_forms'),
                    validate = form.on('click', '.submit', function () {
                        form.trigger('submit');
                        return false;
                    }).on('click', '.verify-refresh', function () {
                        refresh(verify);
                    }).on('keydown', 'input', function (ev) {
                        var $this = $(this);
                        if (ev.keyCode == 13) {
                            if ($this.is(uname)) {
                                if (/^((([a-z\.]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test($this.val())) {
                                    if (!password.val().length) {
                                        password.focus();
                                    } else {
                                        form.trigger('submit');
                                    }
                                }
                            } else {
                                form.trigger('submit');
                            }
                        }
                    }).validate({
                        rules: {
                            email: {
                                required: true
                            },
                            password: {
                                required: true
                            },
                            verfiy: {
                                required: function (element) {
                                    return row.is(':visible');
                                }
                            }
                        },
                        messages: {
                            email: {
                                required: $L('账号不能为空')
                            },
                            password: {
                                required: $L('密码为6~20个字符')
                            },
                            verfiy: {
                                required: $L('验证码错误')
                            }
                        },
                        errorPlacement: function (error, element) {
                            element.after(error.addClass('msg_error typeface_1 KAITI'));
                        },
                        errorElement: 'div',
                        focusInvalid: true,
                        submitHandler: function () {
                            $.post('/login/doLogin', form.serialize(), function (result) {
                                if (result.code != 1000) {
                                    if (result.verfiy) {
                                        row.show();
                                        refresh(verify);
                                    }
                                    switch (result.place) {
                                    case 0:
                                        validate.showErrors({
                                            email: result.msg
                                        });
                                        break;
                                    case -1:
                                        validate.showErrors({
                                            password: result.msg
                                        });
                                        break;
                                    case -2:
                                    case -3:
                                        validate.showErrors({
                                            verfiy: result.msg
                                        });
                                        break;
                                    }
                                } else {
                                    $.success(result);
                                }
                            }, 'json');
                            return false;
                        }
                    });
            },
            regist: function (form) {
                var MSG = {
                    EMAIL_ERROR: $L('邮箱格式有误'),
                    EMAIL_EXIST: $L('邮箱已被注册  <a class="login t_links_blue form_toggle" href="/login">直接登录</a>'),
                    PASSWOD_LENGTH: $L('密码为6~20个字符'),
                    VERFIY_ERROR: $L('验证码错误'),
                    MOBILE_ERROR: $L('手机号码有误'),
                    MOBILE_EXIST: $L('手机号码已被注册  <a class="login t_links_blue" href="/login">直接登录</a>')
                }
                jQuery.validator.addMethod("isMobile", function (value, element) {
                    var tel = /^[0-9]{11}$/;
                    return this.optional(element) || (tel.test(value));
                }, MSG.MOBILE_ERROR);
                var form_mobile = $('.reg_mobile', form),
                    form_email = $('.reg_email', form),
                    mobile = $('[name=email]', form_mobile);
                form.on('click', '.send_sms_btn', function (ev) {
                        var $this = $(this),
                            val = mobile.val(),
                            validator = form_mobile.data('validator');
                        if (!/\d{11}/.test(val)) {
                                validator.showErrors({
                                    email: MSG.MOBILE_ERROR
                                });
                                mobile.focus();
                                return false;
                            }
                        if ($this.hasClass(lockCls)) {
                                return false;
                            }
                        $.post('/register/send_sms', {
                                mobile: val,
                                hash: $CONF['hash']
                            }, function (result) {
                                if (result.code == 1000) {
                                    var num = 60;
                                    $this.text(num).addClass(lockCls).attr('title', $L('一分钟后重新发送'));
                                    itv = setInterval(function () {
                                        $this.text(function (i, num) {
                                            if (--num <= 0) {
                                                num = $this.attr('data-msg');
                                                $this.attr('title', num).removeClass(lockCls);
                                                clearInterval(itv);
                                                itv = null;
                                            }
                                            return num;
                                        });
                                    }, 1000);
                                }
                            }, 'json');
                    }).on('click', '.btn_submit', function () {
                        $('form:visible', form).trigger('submit');
                        return false;
                    })
                form_mobile.validate({
                        rules: {
                            email: {
                                required: true,
                                isMobile: true,
                                remote: '/register/isValidEmail'
                            },
                            password: {
                                required: true,
                                minlength: 6
                            },
                            verfiy: {
                                required: true,
                                minlength: 6,
                                maxlength: 6
                            }
                        },
                        messages: {
                            email: {
                                required: MSG.MOBILE_ERROR,
                                mobile: MSG.MOBILE_ERROR,
                                remote: MSG.MOBILE_EXIST
                            },
                            password: {
                                required: MSG.PASSWOD_LENGTH,
                                minlength: MSG.PASSWOD_LENGTH
                            },
                            verfiy: {
                                required: MSG.VERFIY_ERROR,
                                minlength: MSG.VERFIY_ERROR,
                                maxlength: MSG.VERFIY_ERROR
                            }
                        },
                        errorPlacement: function (error, element) {
                            element.closest('div').append(error.addClass('msg_error typeface_1'));
                        },
                        errorElement: 'div',
                        focusInvalid: true,
                        submitHandler: function (el, ev) {
                            var form = $(el),
                                serialize = form.serialize();
                            if (form.hasClass('lock')) {
                                    return false;
                                }
                            form.addClass('lock'),
                            validate = form.data('validator');
                            $.post('/register/doRegister', serialize, function (result) {
                                    if (result.code == 1000) {
                                        $.notify($L('注册成功'), {
                                            cls: 'success',
                                            callback: function () {
                                                location.href = '/register/guide/role'
                                            }
                                        });
                                        return;
                                    }
                                    form.removeClass('lock');
                                    if (result.code == 1201) {
                                        var validate = form.data('validator');
                                        validate.showErrors({
                                            verfiy: result.msg
                                        });
                                    } else {
                                        $.notify(result.msg, {
                                            cls: 'error'
                                        });
                                    }
                                }, 'json');
                        }
                    })
                form_email.on('verfiy', function () {
                        var $this = $(this),
                            verify = $('.verify', $this);
                        verify.attr('src', function () {
                                return "/public/verify?" + $.now();
                            });
                        return false;
                    }).on('click', '.verify-refresh', function () {
                        $(this).trigger('verfiy');
                        return false;
                    }).validate({
                        rules: {
                            email: {
                                required: true,
                                email: true,
                                remote: '/register/isValidEmail'
                            },
                            password: {
                                required: true,
                                minlength: 6
                            },
                            verfiy: {
                                required: true
                            }
                        },
                        messages: {
                            email: {
                                required: MSG.EMAIL_ERROR,
                                email: MSG.EMAIL_ERROR,
                                remote: MSG.EMAIL_EXIST
                            },
                            password: {
                                required: MSG.PASSWOD_LENGTH,
                                minlength: MSG.PASSWOD_LENGTH
                            },
                            verfiy: {
                                required: MSG.VERFIY_ERROR
                            }
                        },
                        errorPlacement: function (error, element) {
                            element.closest('div').append(error.addClass('msg_error typeface_1'));
                        },
                        errorElement: 'div',
                        focusInvalid: true,
                        submitHandler: function (el, ev) {
                            var form = $(el),
                                serialize = form.serialize();
                            if (form.hasClass('lock')) {
                                    return false;
                                }
                            form.addClass('lock');
                            $.post('/register/doRegister', serialize, function (result) {
                                    if (result.code == 1000) {
                                        $.notify($L('注册成功'), {
                                            cls: 'success',
                                            callback: function () {
                                                location.href = '/register/guide/role'
                                            }
                                        });
                                        return;
                                    }
                                    form.removeClass('lock');
                                    if (result.code == 1201) {
                                        var validate = form.data('validator');
                                        validate.showErrors({
                                            verfiy: result.msg
                                        });
                                    } else {
                                        $.notify(result.msg, {
                                            cls: 'error'
                                        });
                                    }
                                }, 'json');
                        }
                    });
            },
            show: function (opts) {
                if (!TMPL) {
                    var _this = this;
                    $.get('/login/index', function (result) {
                        if (result.code == 1000) {
                            TMPL = result.html;
                            _this.show(opts);
                        } else {
                            $.notify($L('网络错误'), 'error');
                        }
                    }, 'json')
                    return false;
                }
                modal = $($lang(juicer(TMPL, $.extend({
                    is_login: true,
                    'country': $CONF['country']
                }, opts || {})))),
                login = $('.forms_login', modal),
                regist = $('.forms_regist', modal);
                modal.on('click', '[data-sns]', function (ev) {
                    var url = $(this).attr('data-sns'),
                        cb = location.href;
                    $.success = function (result) {
                            if (result.code == 1000) {
                                $.notify(result.msg, {
                                    cls: 'success',
                                    callback: function () {
                                        $.isFunction($.loginCallback) && $.loginCallback.call(this, result);
                                        if (result.role <= 0) {
                                            location.href = "/register/guide/role"
                                        } else {
                                            location.reload();
                                        }
                                    }
                                })
                            } else {
                                $.notify(result.msg, {
                                    cls: 'error',
                                    callback: function () {}
                                })
                            }
                        }
                    var op = openwindow(url + '?from=open&calback=' + encodeURI(cb), null, 752, window.screen.height);
                    op && op.focus();
                    return false;
                }).appendTo(document.body).on('click', '.swith-login,.swith-regist', function () {
                    var $this = $(this),
                        row = $this.closest('form'),
                        siblings = row.siblings('form');
                    row.fadeOut('normal', function () {
                            siblings.show();
                            $(window).trigger('resize.modal');
                        });
                    return false;
                }).on('click', '.weixin_toggle', function () {
                    $(this).closest('.flipper').toggleClass('weixin_block');
                    return false;
                }).on('click', '.reg_type_btn', function (ev) {
                    var $this = $(this),
                        form = $this.closest('form');
                    form.hide().siblings('form').show();
                    return false;
                }).on('click', 'a.form_toggle', function (ev) {
                    var $this = $(this),
                        form = $this.closest('.forms');
                    form.fadeOut('fast', function () {
                            form.siblings('.forms').show();
                        })
                    return false;
                }).easyModal({
                    autoOpen: true,
                    onClose: function () {
                        $(this).parent().remove();
                        $.loginCallback = $.noop;
                        $.cookie('isDialogClose', '1');
                    },
                    updateZIndexOnOpen: false,
                    onOpen: function () {
                        dialog.login(login);
                        dialog.regist(regist);
                        setTimeout(function () {
                            $('.placeholder').trigger('placeholder');
                        }, 10);
                    }
                });
                $.getScript('http://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js', function () {
                    $('.qr_code', modal).each(function () {
                        var type = $(this).attr('data-type'),
                            id = $(this).attr('id'),
                            query = '';
                        if (type == 'register') {
                                query = 'regist';
                            }
                        var obj = new WxLogin({
                                id: id,
                                appid: "wxd2ea93b2429b30bd",
                                scope: "snsapi_login,snsapi_userinfo",
                                redirect_uri: encodeURIComponent("http://" + location.host + "/login2/wechat/token/" + query + "?callback=" + encodeURIComponent(location.href)),
                                state: $CONF['state'],
                                style: "black"
                            });
                    });
                });
            }
        }
    $(document.body).on('click', '.site-login', function () {
            if (!$CONF['isMobile'] && !$CONF['isIpad']) {
                dialog.show();
            } else {
                location.href = "/login";
            }
            return false;
        }).on('click', '.site-reg', function () {
            if (!$CONF['isMobile'] && !$CONF['isIpad']) {
                dialog.show({
                    is_login: false
                });
            } else {
                location.href = "/register";
            }
            return false;
        })
    $.login = function (callback) {
            if (!$CONF['isMobile'] && !$CONF['isIpad']) {
                callback && ($.loginCallback = callback);
                dialog.show();
            } else {
                location.href = "/login?callback=" + location.href;
            }
            return false;
        }
    $.regist = function () {
            if (!$CONF['isMobile'] && !$CONF['isIpad']) {
                dialog.show({
                    is_login: false
                });
            } else {
                location.href = "/register?callback=" + location.href;
            }
            return false;
        }
    if (!$.cookie('isDialogClose') && !$CONF['isMobile'] && !$CONF['isIpad'] && !$CONF['is_login'] && $CONF['show_regist']) {
            $.login();
        }
})(jQuery);;
$(function ($) {
    if (!$CONF['isMobile']) {
        var scrolltop, $window = $(window),
            $elem = $('<div class="return_top"><a class="btn" href="javascript:;"></a></div>').hide().appendTo(document.body).on('click', function () {
                $('html,body').animate({
                    scrollTop: $('.scroll').prop('offsetTop') || 0
                }, 'fast', 'swing', function () {
                    $(window).trigger('gotop');
                });
                return false;
            }),
            is_visable = false;
        $window.on('scroll', function (ev) {
                if ($window.scrollTop() > $window.height() / 2) {
                    if (!is_visable) {
                        is_visable = true;
                        $elem.stop(true).fadeIn();
                    }
                } else {
                    if (is_visable) {
                        is_visable = false;
                        $elem.stop(true).fadeOut();
                    }
                }
            });
    }
});;
$(function ($) {
    var cache = {};
    $.fn.autocomplete = function (opts) {
        opts = $.extend({
            onSelect: $.noop
        }, opts);
        var TMPL = '<ul>\
      {@each _ as it,index}\
       <li class="clearfix {@if index <= 0}selected{@/if}" data-domain="${it.domain}" data-id="${it.uid}" data-name="${it.uname}">\
                                <div class="head clearfix">\
                                    <a href="/${it.domain}" class="btn imgbtn">\
         <img src="${it.head}"></a>\
                                </div>\
                                <div class="writing">\
                                    <h3><a class="btn" href="javascript:;">${it.uname}</a>\
          {@if it.is_verfiy > 0}\
           {@if (it.role ==1)}\
            <span class="approve-btn-a btn approve" href="/verify"></span> \
           {@/if}\
           {@if (it.role ==4)}\
           <span class="approve-btn-c btn approve" href="/verify"></span> \
           {@/if}\
           {@if (it.role ==6)}\
            <span class="critic  btn"></span>\
           {@/if}\
          \{@/if}\
          {@if it.rank >0}\
           <a href="/about/collector"  class="btn cGrade grade${it.rank}"></a>\
          {@/if}\
         </h3>\
                                </div>\
                            </li>\
      {@/each}\
      </ul>'
        $.each(this, function () {
            var $this = $(this),
                curretVal, xhr, itv, selected, selectedCls = 'selected',
                hideCls = 'hide',
                drop, append = $('<div class="sign_spread_out hide"></div>').on('select', 'li', function (ev) {
                    var elem = $(this),
                        name = elem.attr('data-name'),
                        id = elem.attr('data-id');
                    elem.addClass(selectedCls).siblings().removeClass('selected');
                    selected = elem;
                    $this.val('').trigger('blur').trigger('close');
                    opts.onSelect.call(this, id, name);
                    return false;
                }).on('click', 'li', function (ev) {
                    $(this).trigger('select');
                    return false;
                }).insertAfter($this);
            var hanlde = function (list) {
                    if (list && list.length) {
                        append.html(drop = $(juicer(TMPL, list)))
                        $this.trigger('open');
                        selected = $('li.selected', drop);
                    } else {
                        var val = $.trim($this.val());
                        if (val.length) {
                            append.html(drop = '<p class="not_way">无法找到"' + val + '"</p>');
                            $this.trigger('open');
                        } else {
                            append.html(drop = '');
                            $this.trigger('close');
                        }
                    }
                },
                search = function (val) {
                    var key = val.length ? val : '_suggest';
                    if (!cache[key]) {
                        clearTimeout(itv)
                        itv = setTimeout(function () {
                            xhr && xhr.abort && xhr.abort();
                            xhr = $.get('/u/search', {
                                term: val
                            }, function (result) {
                                if (result.code == 1000) {
                                    hanlde(cache[key] = result.list)
                                }
                            }, 'json');
                        }, 100);
                    } else {
                        hanlde(cache[key])
                    }
                }
            $this.on('focus', function () {
                    var val = $(this).val(),
                        list = cache[val];
                    if (drop && drop.length) {
                            $this.trigger('open');
                        } else {
                            search(val);
                        }
                }).on('click', false).on('open', function (ev) {
                    $(document.body).on('click.autocomplete', function (ev) {
                        if (!$.contains(append[0], ev.target)) {
                            $this.trigger('close');
                        }
                    })
                    append.removeClass(hideCls);
                }).on('close', function (ev) {
                    $(document.body).off('click.autocomplete');
                    append.addClass(hideCls);
                }).on('input', function (ev) {
                    var val = $.trim($(this).val());
                    search(val);
                }).on('keydown', function (ev) {
                    if (drop && drop.is && drop.is(':visible')) {
                        switch (ev.keyCode) {
                        case 37:
                        case 38:
                            var prev = selected.prev('li');
                            if (!prev.length) {
                                prev = $('li', drop).last();
                            }
                            selected.removeClass('selected');
                            selected = prev.addClass('selected');
                            return false;
                        case 39:
                        case 40:
                            var prev = selected.next('li');
                            if (!prev.length) {
                                prev = $('li', drop).first();
                            }
                            selected.removeClass('selected');
                            selected = prev.addClass('selected');
                            return false;
                        case 13:
                            selected.trigger('select');
                            return false;
                        }
                    }
                })
        })
    }
});;;
(function () {
    (function (factory) {
        if (typeof define === 'function' && define.amd) {
            return define(['jquery'], factory);
        } else {
            return factory(window.jQuery);
        }
    })(function ($) {
        "use strict";
        var EditableCaret, InputCaret, Mirror, Utils, discoveryIframeOf, methods, oDocument, oFrame, oWindow, pluginName, setContextBy;
        pluginName = 'caret';
        EditableCaret = (function () {
            function EditableCaret($inputor) {
                this.$inputor = $inputor;
                this.domInputor = this.$inputor[0];
            }
            EditableCaret.prototype.setPos = function (pos) {
                return this.domInputor;
            };
            EditableCaret.prototype.getIEPosition = function () {
                return $.noop();
            };
            EditableCaret.prototype.getPosition = function () {
                return $.noop();
            };
            EditableCaret.prototype.getOldIEPos = function () {
                var preCaretTextRange, textRange;
                textRange = oDocument.selection.createRange();
                preCaretTextRange = oDocument.body.createTextRange();
                preCaretTextRange.moveToElementText(this.domInputor);
                preCaretTextRange.setEndPoint("EndToEnd", textRange);
                return preCaretTextRange.text.length;
            };
            EditableCaret.prototype.getPos = function () {
                var clonedRange, pos, range;
                if (range = this.range()) {
                    clonedRange = range.cloneRange();
                    clonedRange.selectNodeContents(this.domInputor);
                    clonedRange.setEnd(range.endContainer, range.endOffset);
                    pos = clonedRange.toString().length;
                    clonedRange.detach();
                    return pos;
                } else if (oDocument.selection) {
                    return this.getOldIEPos();
                }
            };
            EditableCaret.prototype.getOldIEOffset = function () {
                var range, rect;
                range = oDocument.selection.createRange().duplicate();
                range.moveStart("character", -1);
                rect = range.getBoundingClientRect();
                return {
                    height: rect.bottom - rect.top,
                    left: rect.left,
                    top: rect.top
                };
            };
            EditableCaret.prototype.getOffset = function (pos) {
                var clonedRange, offset, range, rect;
                if (oWindow.getSelection && (range = this.range())) {
                    if (range.endOffset - 1 < 0) {
                        return null;
                    }
                    clonedRange = range.cloneRange();
                    clonedRange.setStart(range.endContainer, range.endOffset - 1);
                    clonedRange.setEnd(range.endContainer, range.endOffset);
                    rect = clonedRange.getBoundingClientRect();
                    offset = {
                        height: rect.height,
                        left: rect.left + rect.width,
                        top: rect.top
                    };
                    clonedRange.detach();
                } else if (oDocument.selection) {
                    offset = this.getOldIEOffset();
                }
                if (offset && !oFrame) {
                    offset.top += $(oWindow).scrollTop();
                    offset.left += $(oWindow).scrollLeft();
                }
                return offset;
            };
            EditableCaret.prototype.range = function () {
                var sel;
                if (!oWindow.getSelection) {
                    return;
                }
                sel = oWindow.getSelection();
                if (sel.rangeCount > 0) {
                    return sel.getRangeAt(0);
                } else {
                    return null;
                }
            };
            return EditableCaret;
        })();
        InputCaret = (function () {
            function InputCaret($inputor) {
                this.$inputor = $inputor;
                this.domInputor = this.$inputor[0];
            }
            InputCaret.prototype.getIEPos = function () {
                var endRange, inputor, len, normalizedValue, pos, range, textInputRange;
                inputor = this.domInputor;
                range = oDocument.selection.createRange();
                pos = 0;
                if (range && range.parentElement() === inputor) {
                    normalizedValue = inputor.value.replace(/\r\n/g, "\n");
                    len = normalizedValue.length;
                    textInputRange = inputor.createTextRange();
                    textInputRange.moveToBookmark(range.getBookmark());
                    endRange = inputor.createTextRange();
                    endRange.collapse(false);
                    if (textInputRange.compareEndPoints("StartToEnd", endRange) > -1) {
                        pos = len;
                    } else {
                        pos = -textInputRange.moveStart("character", -len);
                    }
                }
                return pos;
            };
            InputCaret.prototype.getPos = function () {
                if (oDocument.selection) {
                    return this.getIEPos();
                } else {
                    return this.domInputor.selectionStart;
                }
            };
            InputCaret.prototype.setPos = function (pos) {
                var inputor, range;
                inputor = this.domInputor;
                if (oDocument.selection) {
                    range = inputor.createTextRange();
                    range.move("character", pos);
                    range.select();
                } else if (inputor.setSelectionRange) {
                    inputor.setSelectionRange(pos, pos);
                }
                return inputor;
            };
            InputCaret.prototype.getIEOffset = function (pos) {
                var h, textRange, x, y;
                textRange = this.domInputor.createTextRange();
                pos || (pos = this.getPos());
                textRange.move('character', pos);
                x = textRange.boundingLeft;
                y = textRange.boundingTop;
                h = textRange.boundingHeight;
                return {
                    left: x,
                    top: y,
                    height: h
                };
            };
            InputCaret.prototype.getOffset = function (pos) {
                var $inputor, offset, position;
                $inputor = this.$inputor;
                if (oDocument.selection) {
                    offset = this.getIEOffset(pos);
                    offset.top += $(oWindow).scrollTop() + $inputor.scrollTop();
                    offset.left += $(oWindow).scrollLeft() + $inputor.scrollLeft();
                    return offset;
                } else {
                    offset = $inputor.offset();
                    position = this.getPosition(pos);
                    return offset = {
                        left: offset.left + position.left - $inputor.scrollLeft(),
                        top: offset.top + position.top - $inputor.scrollTop(),
                        height: position.height
                    };
                }
            };
            InputCaret.prototype.getPosition = function (pos) {
                var $inputor, at_rect, end_range, format, html, mirror, start_range;
                $inputor = this.$inputor;
                format = function (value) {
                    return value.replace(/</g, '&lt').replace(/>/g, '&gt').replace(/`/g, '&#96').replace(/"/g, '&quot').replace(/\r\n|\r|\n/g, "<br />");
                };
                if (pos === void 0) {
                    pos = this.getPos();
                }
                start_range = $inputor.val().slice(0, pos);
                end_range = $inputor.val().slice(pos);
                html = "<span style='position: relative; display: inline;'>" + format(start_range) + "</span>";
                html += "<span id='caret' style='position: relative; display: inline;'>|</span>";
                html += "<span style='position: relative; display: inline;'>" + format(end_range) + "</span>";
                mirror = new Mirror($inputor);
                return at_rect = mirror.create(html).rect();
            };
            InputCaret.prototype.getIEPosition = function (pos) {
                var h, inputorOffset, offset, x, y;
                offset = this.getIEOffset(pos);
                inputorOffset = this.$inputor.offset();
                x = offset.left - inputorOffset.left;
                y = offset.top - inputorOffset.top;
                h = offset.height;
                return {
                    left: x,
                    top: y,
                    height: h
                };
            };
            return InputCaret;
        })();
        Mirror = (function () {
            Mirror.prototype.css_attr = ["borderBottomWidth", "borderLeftWidth", "borderRightWidth", "borderTopStyle", "borderRightStyle", "borderBottomStyle", "borderLeftStyle", "borderTopWidth", "boxSizing", "fontFamily", "fontSize", "fontWeight", "height", "letterSpacing", "lineHeight", "marginBottom", "marginLeft", "marginRight", "marginTop", "outlineWidth", "overflow", "overflowX", "overflowY", "paddingBottom", "paddingLeft", "paddingRight", "paddingTop", "textAlign", "textOverflow", "textTransform", "whiteSpace", "wordBreak", "wordWrap"];

            function Mirror($inputor) {
                this.$inputor = $inputor;
            }
            Mirror.prototype.mirrorCss = function () {
                var css, _this = this;
                css = {
                    position: 'absolute',
                    left: -9999,
                    top: 0,
                    zIndex: -20000
                };
                if (this.$inputor.prop('tagName') === 'TEXTAREA') {
                    this.css_attr.push('width');
                }
                $.each(this.css_attr, function (i, p) {
                    return css[p] = _this.$inputor.css(p);
                });
                return css;
            };
            Mirror.prototype.create = function (html) {
                this.$mirror = $('<div></div>');
                this.$mirror.css(this.mirrorCss());
                this.$mirror.html(html);
                this.$inputor.after(this.$mirror);
                return this;
            };
            Mirror.prototype.rect = function () {
                var $flag, pos, rect;
                $flag = this.$mirror.find("#caret");
                pos = $flag.position();
                rect = {
                    left: pos.left,
                    top: pos.top,
                    height: $flag.height()
                };
                this.$mirror.remove();
                return rect;
            };
            return Mirror;
        })();
        Utils = {
            contentEditable: function ($inputor) {
                return !!($inputor[0].contentEditable && $inputor[0].contentEditable === 'true');
            }
        };
        methods = {
            pos: function (pos) {
                if (pos || pos === 0) {
                    return this.setPos(pos);
                } else {
                    return this.getPos();
                }
            },
            position: function (pos) {
                if (oDocument.selection) {
                    return this.getIEPosition(pos);
                } else {
                    return this.getPosition(pos);
                }
            },
            offset: function (pos) {
                var iOffset, offset;
                offset = this.getOffset(pos);
                if (oFrame) {
                    iOffset = $(oFrame).offset();
                    offset.top += iOffset.top;
                    offset.left += iOffset.left;
                }
                return offset;
            }
        };
        oDocument = null;
        oWindow = null;
        oFrame = null;
        setContextBy = function (settings) {
            var iframe;
            if (iframe = settings != null ? settings.iframe : void 0) {
                oFrame = iframe;
                oWindow = iframe.contentWindow;
                return oDocument = iframe.contentDocument || oWindow.document;
            } else {
                oFrame = void 0;
                oWindow = window;
                return oDocument = document;
            }
        };
        discoveryIframeOf = function ($dom) {
            var error;
            oDocument = $dom[0].ownerDocument;
            oWindow = oDocument.defaultView || oDocument.parentWindow;
            try {
                return oFrame = oWindow.frameElement;
            } catch (_error) {
                error = _error;
            }
        };
        $.fn.caret = function (method, value, settings) {
            var caret;
            if (methods[method]) {
                if ($.isPlainObject(value)) {
                    setContextBy(value);
                    value = void 0;
                } else {
                    setContextBy(settings);
                }
                caret = Utils.contentEditable(this) ? new EditableCaret(this) : new InputCaret(this);
                return methods[method].apply(caret, [value]);
            } else {
                return $.error("Method " + method + " does not exist on jQuery.caret");
            }
        };
        $.fn.caret.EditableCaret = EditableCaret;
        $.fn.caret.InputCaret = InputCaret;
        $.fn.caret.Utils = Utils;
        return $.fn.caret.apis = methods;
    });
}).call(this);;
/*! jquery.atwho - v0.5.0 - 2014-08-16
 * Copyright (c) 2014 chord.luo <chord.luo@gmail.com>;
 * homepage: http://ichord.github.com/At.js
 * Licensed MIT
 */
(function () {
    (function (factory) {
        if (typeof define === 'function' && define.amd) {
            return define(['jquery'], factory);
        } else {
            return factory(window.jQuery);
        }
    })(function ($) {
        var $CONTAINER, Api, App, Controller, DEFAULT_CALLBACKS, KEY_CODE, Model, View, __slice = [].slice;
        App = (function () {
            function App(inputor) {
                this.current_flag = null;
                this.controllers = {};
                this.alias_maps = {};
                this.$inputor = $(inputor);
                this.iframe = null;
                this.setIframe();
                this.listen();
            }
            App.prototype.setIframe = function (iframe) {
                if (iframe) {
                    this.window = iframe.contentWindow;
                    this.document = iframe.contentDocument || this.window.document;
                    return this.iframe = iframe;
                } else {
                    this.document = document;
                    this.window = window;
                    return this.iframe = null;
                }
            };
            App.prototype.controller = function (at) {
                var c, current, current_flag, _ref;
                if (this.alias_maps[at]) {
                    current = this.controllers[this.alias_maps[at]];
                } else {
                    _ref = this.controllers;
                    for (current_flag in _ref) {
                        c = _ref[current_flag];
                        if (current_flag === at) {
                            current = c;
                            break;
                        }
                    }
                }
                if (current) {
                    return current;
                } else {
                    return this.controllers[this.current_flag];
                }
            };
            App.prototype.set_context_for = function (at) {
                this.current_flag = at;
                return this;
            };
            App.prototype.reg = function (flag, setting) {
                var controller, _base;
                controller = (_base = this.controllers)[flag] || (_base[flag] = new Controller(this, flag));
                if (setting.alias) {
                    this.alias_maps[setting.alias] = flag;
                }
                controller.init(setting);
                return this;
            };
            App.prototype.listen = function () {
                return this.$inputor.on('keyup.atwhoInner', (function (_this) {
                    return function (e) {
                        return _this.on_keyup(e);
                    };
                })(this)).on('keydown.atwhoInner', (function (_this) {
                    return function (e) {
                        return _this.on_keydown(e);
                    };
                })(this)).on('scroll.atwhoInner', (function (_this) {
                    return function (e) {
                        var _ref;
                        return (_ref = _this.controller()) != null ? _ref.view.hide(e) : void 0;
                    };
                })(this)).on('blur.atwhoInner', (function (_this) {
                    return function (e) {
                        var c;
                        if (c = _this.controller()) {
                            return c.view.hide(e, c.get_opt("display_timeout"));
                        }
                    };
                })(this)).on('click.atwhoInner', (function (_this) {
                    return function (e) {
                        var _ref;
                        return (_ref = _this.controller()) != null ? _ref.view.hide(e) : void 0;
                    };
                })(this));
            };
            App.prototype.shutdown = function () {
                var c, _, _ref;
                _ref = this.controllers;
                for (_ in _ref) {
                    c = _ref[_];
                    c.destroy();
                    delete this.controllers[_];
                }
                return this.$inputor.off('.atwhoInner');
            };
            App.prototype.dispatch = function () {
                return $.map(this.controllers, (function (_this) {
                    return function (c) {
                        var delay;
                        if (delay = c.get_opt('delay')) {
                            clearTimeout(_this.delayedCallback);
                            return _this.delayedCallback = setTimeout(function () {
                                if (c.look_up()) {
                                    return _this.set_context_for(c.at);
                                }
                            }, delay);
                        } else {
                            if (c.look_up()) {
                                return _this.set_context_for(c.at);
                            }
                        }
                    };
                })(this));
            };
            App.prototype.on_keyup = function (e) {
                var _ref;
                switch (e.keyCode) {
                case KEY_CODE.ESC:
                    e.preventDefault();
                    if ((_ref = this.controller()) != null) {
                        _ref.view.hide();
                    }
                    break;
                case KEY_CODE.DOWN:
                case KEY_CODE.UP:
                case KEY_CODE.CTRL:
                    $.noop();
                    break;
                case KEY_CODE.P:
                case KEY_CODE.N:
                    if (!e.ctrlKey) {
                        this.dispatch();
                    }
                    break;
                default:
                    this.dispatch();
                }
            };
            App.prototype.on_keydown = function (e) {
                var view, _ref;
                view = (_ref = this.controller()) != null ? _ref.view : void 0;
                if (!(view && view.visible())) {
                    return;
                }
                switch (e.keyCode) {
                case KEY_CODE.ESC:
                    e.preventDefault();
                    view.hide(e);
                    break;
                case KEY_CODE.UP:
                    e.preventDefault();
                    view.prev();
                    break;
                case KEY_CODE.DOWN:
                    e.preventDefault();
                    view.next();
                    break;
                case KEY_CODE.P:
                    if (!e.ctrlKey) {
                        return;
                    }
                    e.preventDefault();
                    view.prev();
                    break;
                case KEY_CODE.N:
                    if (!e.ctrlKey) {
                        return;
                    }
                    e.preventDefault();
                    view.next();
                    break;
                case KEY_CODE.TAB:
                case KEY_CODE.ENTER:
                    if (!view.visible()) {
                        return;
                    }
                    e.preventDefault();
                    view.choose(e);
                    break;
                default:
                    $.noop();
                }
            };
            return App;
        })();
        Controller = (function () {
            Controller.prototype.uid = function () {
                return (Math.random().toString(16) + "000000000").substr(2, 8) + (new Date().getTime());
            };

            function Controller(app, at) {
                this.app = app;
                this.at = at;
                this.$inputor = this.app.$inputor;
                this.id = this.$inputor[0].id || this.uid();
                this.setting = null;
                this.query = null;
                this.pos = 0;
                this.cur_rect = null;
                this.range = null;
                if ((this.$el = $("#atwho-ground-" + this.id, $CONTAINER)).length === 0) {
                    $CONTAINER.append(this.$el = $("<div id='atwho-ground-" + this.id + "'></div>"));
                }
                this.model = new Model(this);
                this.view = new View(this);
            }
            Controller.prototype.init = function (setting) {
                this.setting = $.extend({}, this.setting || $.fn.atwho["default"], setting);
                this.view.init();
                return this.model.reload(this.setting.data);
            };
            Controller.prototype.destroy = function () {
                this.trigger('beforeDestroy');
                this.model.destroy();
                this.view.destroy();
                return this.$el.remove();
            };
            Controller.prototype.call_default = function () {
                var args, error, func_name;
                func_name = arguments[0],
                args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
                try {
                    return DEFAULT_CALLBACKS[func_name].apply(this, args);
                } catch (_error) {
                    error = _error;
                    return $.error("" + error + " Or maybe At.js doesn't have function " + func_name);
                }
            };
            Controller.prototype.trigger = function (name, data) {
                var alias, event_name;
                if (data == null) {
                    data = [];
                }
                data.push(this);
                alias = this.get_opt('alias');
                event_name = alias ? "" + name + "-" + alias + ".atwho" : "" + name + ".atwho";
                return this.$inputor.trigger(event_name, data);
            };
            Controller.prototype.callbacks = function (func_name) {
                return this.get_opt("callbacks")[func_name] || DEFAULT_CALLBACKS[func_name];
            };
            Controller.prototype.get_opt = function (at, default_value) {
                var e;
                try {
                    return this.setting[at];
                } catch (_error) {
                    e = _error;
                    return null;
                }
            };
            Controller.prototype.content = function () {
                if (this.$inputor.is('textarea, input')) {
                    return this.$inputor.val();
                } else {
                    return this.$inputor.text();
                }
            };
            Controller.prototype.catch_query = function () {
                var caret_pos, content, end, query, start, subtext;
                content = this.content();
                caret_pos = this.$inputor.caret('pos', {
                    iframe: this.app.iframe
                });
                subtext = content.slice(0, caret_pos);
                query = this.callbacks("matcher").call(this, this.at, subtext, this.get_opt('start_with_space'));
                if (typeof query === "string" && query.length <= this.get_opt('max_len', 20)) {
                    start = caret_pos - query.length;
                    end = start + query.length;
                    this.pos = start;
                    query = {
                        'text': query,
                        'head_pos': start,
                        'end_pos': end
                    };
                    this.trigger("matched", [this.at, query.text]);
                } else {
                    query = null;
                    this.view.hide();
                }
                return this.query = query;
            };
            Controller.prototype.rect = function () {
                var c, scale_bottom;
                if (!(c = this.$inputor.caret('offset', this.pos - 1, {
                    iframe: this.app.iframe
                }))) {
                    return;
                }
                if (this.$inputor.attr('contentEditable') === 'true') {
                    c = (this.cur_rect || (this.cur_rect = c)) || c;
                }
                scale_bottom = this.app.document.selection ? 0 : 2;
                return {
                    left: c.left,
                    top: c.top,
                    bottom: c.top + c.height + scale_bottom
                };
            };
            Controller.prototype.reset_rect = function () {
                if (this.$inputor.attr('contentEditable') === 'true') {
                    return this.cur_rect = null;
                }
            };
            Controller.prototype.mark_range = function () {
                if (this.$inputor.attr('contentEditable') === 'true') {
                    if (this.app.window.getSelection) {
                        this.range = this.app.window.getSelection().getRangeAt(0);
                    }
                    if (this.app.document.selection) {
                        return this.ie8_range = this.app.document.selection.createRange();
                    }
                }
            };
            Controller.prototype.insert_content_for = function ($li) {
                var data, data_value, tpl;
                data_value = $li.data('value');
                tpl = this.get_opt('insert_tpl');
                if (this.$inputor.is('textarea, input') || !tpl) {
                    return data_value;
                }
                data = $.extend({}, $li.data('item-data'), {
                    'atwho-data-value': data_value,
                    'atwho-at': this.at
                });
                return this.callbacks("tpl_eval").call(this, tpl, data);
            };
            Controller.prototype.insert = function (content, $li) {
                var $inputor, content_node, pos, range, sel, source, start_str, text, wrapped_content;
                $inputor = this.$inputor;
                wrapped_content = this.callbacks('inserting_wrapper').call(this, $inputor, content, this.get_opt("suffix"));
                if ($inputor.is('textarea, input')) {
                    source = $inputor.val();
                    start_str = source.slice(0, Math.max(this.query.head_pos - this.at.length, 0));
                    text = "" + start_str + wrapped_content + (source.slice(this.query['end_pos'] || 0));
                    $inputor.val(text);
                    $inputor.caret('pos', start_str.length + wrapped_content.length, {
                        iframe: this.app.iframe
                    });
                } else if (range = this.range) {
                    pos = range.startOffset - (this.query.end_pos - this.query.head_pos) - this.at.length;
                    range.setStart(range.endContainer, Math.max(pos, 0));
                    range.setEnd(range.endContainer, range.endOffset);
                    range.deleteContents();
                    content_node = $(wrapped_content, this.app.document)[0];
                    range.insertNode(content_node);
                    range.setEndAfter(content_node);
                    range.collapse(false);
                    sel = this.app.window.getSelection();
                    sel.removeAllRanges();
                    sel.addRange(range);
                } else if (range = this.ie8_range) {
                    range.moveStart('character', this.query.end_pos - this.query.head_pos - this.at.length);
                    range.pasteHTML(wrapped_content);
                    range.collapse(false);
                    range.select();
                }
                if (!$inputor.is(':focus')) {
                    $inputor.focus();
                }
                return $inputor.change();
            };
            Controller.prototype.render_view = function (data) {
                var search_key;
                search_key = this.get_opt("search_key");
                data = this.callbacks("sorter").call(this, this.query.text, data.slice(0, 1001), search_key);
                return this.view.render(data.slice(0, this.get_opt('limit')));
            };
            Controller.prototype.look_up = function () {
                var query, _callback;
                if (!(query = this.catch_query())) {
                    return;
                }
                _callback = function (data) {
                    if (data && data.length > 0) {
                        return this.render_view(data);
                    } else {
                        return this.view.hide();
                    }
                };
                this.model.query(query.text, $.proxy(_callback, this));
                return query;
            };
            return Controller;
        })();
        Model = (function () {
            function Model(context) {
                this.context = context;
                this.at = this.context.at;
                this.storage = this.context.$inputor;
            }
            Model.prototype.destroy = function () {
                return this.storage.data(this.at, null);
            };
            Model.prototype.saved = function () {
                return this.fetch() > 0;
            };
            Model.prototype.query = function (query, callback) {
                var data, search_key, _remote_filter;
                data = this.fetch();
                search_key = this.context.get_opt("search_key");
                data = this.context.callbacks('filter').call(this.context, query, data, search_key) || [];
                _remote_filter = this.context.callbacks('remote_filter');
                if (data.length > 0 || (!_remote_filter && data.length === 0)) {
                    return callback(data);
                } else {
                    return _remote_filter.call(this.context, query, callback);
                }
            };
            Model.prototype.fetch = function () {
                return this.storage.data(this.at) || [];
            };
            Model.prototype.save = function (data) {
                return this.storage.data(this.at, this.context.callbacks("before_save").call(this.context, data || []));
            };
            Model.prototype.load = function (data) {
                if (!(this.saved() || !data)) {
                    return this._load(data);
                }
            };
            Model.prototype.reload = function (data) {
                return this._load(data);
            };
            Model.prototype._load = function (data) {
                if (typeof data === "string") {
                    return $.ajax(data, {
                        dataType: "json"
                    }).done((function (_this) {
                        return function (data) {
                            return _this.save(data);
                        };
                    })(this));
                } else {
                    return this.save(data);
                }
            };
            return Model;
        })();
        View = (function () {
            function View(context) {
                this.context = context;
                this.$el = $("<div class='atwho-view'><ul class='atwho-view-ul'></ul></div>");
                this.timeout_id = null;
                this.context.$el.append(this.$el);
                this.bind_event();
            }
            View.prototype.init = function () {
                var id;
                id = this.context.get_opt("alias") || this.context.at.charCodeAt(0);
                return this.$el.attr({
                    'id': "at-view-" + id
                });
            };
            View.prototype.destroy = function () {
                return this.$el.remove();
            };
            View.prototype.bind_event = function () {
                var $menu;
                $menu = this.$el.find('ul');
                return $menu.on('mouseenter.atwho-view', 'li', function (e) {
                    $menu.find('.cur').removeClass('cur');
                    return $(e.currentTarget).addClass('cur');
                }).on('click', (function (_this) {
                    return function (e) {
                        _this.choose(e);
                        return e.preventDefault();
                    };
                })(this));
            };
            View.prototype.visible = function () {
                return this.$el.is(":visible");
            };
            View.prototype.choose = function (e) {
                var $li, content;
                if (($li = this.$el.find(".cur")).length) {
                    content = this.context.insert_content_for($li);
                    this.context.insert(this.context.callbacks("before_insert").call(this.context, content, $li), $li);
                    this.context.trigger("inserted", [$li, e]);
                    this.hide(e);
                }
                if (this.context.get_opt("hide_without_suffix")) {
                    return this.stop_showing = true;
                }
            };
            View.prototype.reposition = function (rect) {
                var offset, _ref;
                if (rect.bottom + this.$el.height() - $(window).scrollTop() > $(window).height()) {
                    rect.bottom = rect.top - this.$el.height();
                }
                offset = {
                    left: rect.left,
                    top: rect.bottom
                };
                if ((_ref = this.context.callbacks("before_reposition")) != null) {
                    _ref.call(this.context, offset);
                }
                this.$el.offset(offset);
                return this.context.trigger("reposition", [offset]);
            };
            View.prototype.next = function () {
                var cur, next;
                cur = this.$el.find('.cur').removeClass('cur');
                next = cur.next();
                if (!next.length) {
                    next = this.$el.find('li:first');
                }
                return next.addClass('cur');
            };
            View.prototype.prev = function () {
                var cur, prev;
                cur = this.$el.find('.cur').removeClass('cur');
                prev = cur.prev();
                if (!prev.length) {
                    prev = this.$el.find('li:last');
                }
                return prev.addClass('cur');
            };
            View.prototype.show = function () {
                var rect;
                if (this.stop_showing) {
                    this.stop_showing = false;
                    return;
                }
                this.context.mark_range();
                if (!this.visible()) {
                    this.$el.show();
                    this.context.trigger('shown');
                }
                if (rect = this.context.rect()) {
                    return this.reposition(rect);
                }
            };
            View.prototype.hide = function (e, time) {
                var callback;
                if (!this.visible()) {
                    return;
                }
                if (isNaN(time)) {
                    this.context.reset_rect();
                    this.$el.hide();
                    return this.context.trigger('hidden', [e]);
                } else {
                    callback = (function (_this) {
                        return function () {
                            return _this.hide();
                        };
                    })(this);
                    clearTimeout(this.timeout_id);
                    return this.timeout_id = setTimeout(callback, time);
                }
            };
            View.prototype.render = function (list) {
                var $li, $ul, item, li, tpl, _i, _len;
                if (!($.isArray(list) && list.length > 0)) {
                    this.hide();
                    return;
                }
                this.$el.find('ul').empty();
                $ul = this.$el.find('ul');
                tpl = this.context.get_opt('tpl');
                for (_i = 0, _len = list.length; _i < _len; _i++) {
                    item = list[_i];
                    item = $.extend({}, item, {
                        'atwho-at': this.context.at
                    });
                    li = this.context.callbacks("tpl_eval").call(this.context, tpl, item);
                    $li = $(this.context.callbacks("highlighter").call(this.context, li, this.context.query.text));
                    $li.data("item-data", item);
                    $ul.append($li);
                }
                this.show();
                if (this.context.get_opt('highlight_first')) {
                    return $ul.find("li:first").addClass("cur");
                }
            };
            return View;
        })();
        KEY_CODE = {
            DOWN: 40,
            UP: 38,
            ESC: 27,
            TAB: 9,
            ENTER: 13,
            CTRL: 17,
            P: 80,
            N: 78
        };
        DEFAULT_CALLBACKS = {
            before_save: function (data) {
                var item, _i, _len, _results;
                if (!$.isArray(data)) {
                    return data;
                }
                _results = [];
                for (_i = 0, _len = data.length; _i < _len; _i++) {
                    item = data[_i];
                    if ($.isPlainObject(item)) {
                        _results.push(item);
                    } else {
                        _results.push({
                            name: item
                        });
                    }
                }
                return _results;
            },
            matcher: function (flag, subtext, should_start_with_space) {
                var match, regexp;
                flag = flag.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
                if (should_start_with_space) {
                    flag = '(?:^|\\s)' + flag;
                }
                regexp = new RegExp(flag + '([A-Za-z0-9_\+\-]*)$|' + flag + '([^\\x00-\\xff]*)$', 'gi');
                match = regexp.exec(subtext);
                if (match) {
                    return match[2] || match[1];
                } else {
                    return null;
                }
            },
            filter: function (query, data, search_key) {
                var item, _i, _len, _results;
                _results = [];
                for (_i = 0, _len = data.length; _i < _len; _i++) {
                    item = data[_i];
                    if (~item[search_key].toLowerCase().indexOf(query.toLowerCase())) {
                        _results.push(item);
                    }
                }
                return _results;
            },
            remote_filter: null,
            sorter: function (query, items, search_key) {
                var item, _i, _len, _results;
                if (!query) {
                    return items;
                }
                _results = [];
                for (_i = 0, _len = items.length; _i < _len; _i++) {
                    item = items[_i];
                    item.atwho_order = item[search_key].toLowerCase().indexOf(query.toLowerCase());
                    if (item.atwho_order > -1) {
                        _results.push(item);
                    }
                }
                return _results.sort(function (a, b) {
                    return a.atwho_order - b.atwho_order;
                });
            },
            tpl_eval: function (tpl, map) {
                var error;
                try {
                    return tpl.replace(/\$\{([^\}]*)\}/g, function (tag, key, pos) {
                        return map[key];
                    });
                } catch (_error) {
                    error = _error;
                    return "";
                }
            },
            highlighter: function (li, query) {
                var regexp;
                if (!query) {
                    return li;
                }
                regexp = new RegExp(">\\s*(\\w*?)(" + query.replace("+", "\\+") + ")(\\w*)\\s*<", 'ig');
                return li.replace(regexp, function (str, $1, $2, $3) {
                    return '> ' + $1 + '<strong>' + $2 + '</strong>' + $3 + ' <';
                });
            },
            before_insert: function (value, $li) {
                return value;
            },
            inserting_wrapper: function ($inputor, content, suffix) {
                var new_suffix, wrapped_content;
                new_suffix = suffix === "" ? suffix : suffix || " ";
                if ($inputor.is('textarea, input')) {
                    return '' + content + new_suffix;
                } else if ($inputor.attr('contentEditable') === 'true') {
                    new_suffix = suffix === "" ? suffix : suffix || "&nbsp;";
                    if (/firefox/i.test(navigator.userAgent)) {
                        wrapped_content = "<span>" + content + new_suffix + "</span>";
                    } else {
                        suffix = "<span contenteditable='false'>" + new_suffix + "<span>";
                        wrapped_content = "<span contenteditable='false'>" + content + suffix + "</span>";
                    }
                    if (this.app.document.selection) {
                        wrapped_content = "<span contenteditable='true'>" + content + "</span>";
                    }
                    return wrapped_content;
                }
            }
        };
        Api = {
            load: function (at, data) {
                var c;
                if (c = this.controller(at)) {
                    return c.model.load(data);
                }
            },
            setIframe: function (iframe) {
                this.setIframe(iframe);
                return null;
            },
            run: function () {
                return this.dispatch();
            },
            destroy: function () {
                this.shutdown();
                return this.$inputor.data('atwho', null);
            }
        };
        $CONTAINER = $("<div id='atwho-container'></div>");
        $.fn.atwho = function (method) {
            var result, _args;
            _args = arguments;
            $('body').append($CONTAINER);
            result = null;
            this.filter('textarea, input, [contenteditable=""], [contenteditable=true]').each(function () {
                var $this, app;
                if (!(app = ($this = $(this)).data("atwho"))) {
                    $this.data('atwho', (app = new App(this)));
                }
                if (typeof method === 'object' || !method) {
                    return app.reg(method.at, method);
                } else if (Api[method] && app) {
                    return result = Api[method].apply(app, Array.prototype.slice.call(_args, 1));
                } else {
                    return $.error("Method " + method + " does not exist on jQuery.caret");
                }
            });
            return result || this;
        };
        $.fn.atwho["default"] = {
            at: void 0,
            alias: void 0,
            data: null,
            tpl: "<li data-value='${atwho-at}${name}'>${name}</li>",
            insert_tpl: "<span id='${id}'>${atwho-data-value}</span>",
            callbacks: DEFAULT_CALLBACKS,
            search_key: "name",
            suffix: void 0,
            hide_without_suffix: false,
            start_with_space: true,
            highlight_first: true,
            limit: 5,
            max_len: 20,
            display_timeout: 300,
            delay: null
        };
    });
}).call(this);;;
(function ($, window) {
    var cachequeryMentions = [],
        itemsMentions, at_config = {
            at: "@",
            tpl: '<li class="clearfix" data-value="@${uname}(${domain})">\
          <div class="head clearfix"><a href="/${url}" class="btn imgbtn"> <img src="${head}" /></a> </div>\
          <div class="writing">\
            <h3><a class="btn" href="javascript:;">${uname}</a> </h3>\
          </div>\
        </li>',
            show_the_at: true,
            highlight_first: true,
            suffix: ' ',
            display_timeout: 300,
            limit: 10,
            max_len: 20,
            search_key: "uname",
            data: '/aj/attention',
            start_with_space: false,
            callbacks: {
                highlighter: function (li, query) {
                    var regexp;
                    if (!query) {
                        return li;
                    }
                    return li;
                },
                sorter: function (query, items, search_key) {
                    if (query.length) {
                        return cachequeryMentions[query] ? cachequeryMentions[query] : [];
                    }
                    return items;
                },
                filter: function (query, data, search_key) {
                    var item, _i, _len, _results;
                    if (query.length >= 1) {
                        return [];
                    }
                    return data;
                },
                remote_filter: function (query, render_view) {
                    var thisVal = query,
                        self = $(this);
                    if (!self.data('active') && thisVal.length >= 1) {
                            self.data('active', true);
                            itemsMentions = cachequeryMentions[thisVal]
                            if (typeof itemsMentions == "object") {
                                render_view(itemsMentions);
                            }
                            else {
                                self.xhr && self.xhr.abort();
                                self.xhr = $.get("/aj/attention", {
                                    uname: thisVal
                                }, function (data) {
                                    cachequeryMentions[thisVal] = data
                                    render_view(data);
                                }, 'json');
                            }
                            self.data('active', false);
                        }
                }
            }
        }
    $.get('/aj/attention', function (result) {
            at_config.data = result;
            $(window).trigger('atwho_load');
        }, 'json')
    window.at_config = at_config;
})($, window);;
$(function ($) {
    var emotions = Spine.Controller.sub({
        elements: {
            '.faces_list_hot': 'list'
        },
        events: {
            'click li': 'fnSelectFace'
        },
        className: 'phiz_layer hide',
        release: function () {
            this.container.off('click.emotions');
            this.$el.hide();
            return false;
        },
        init: function () {
            var _this = this;
            _this.container = $('#st_container');
            _this.html('<div class="phiz_content"><ul class="faces_list_hot clearfix"></ul></div><span class="triangle"></span>');
            _this.$el.on('click', false);
            this.$btn.on('click', function () {
                if (!_this.items) {
                    $.get('/emotions/index', function (result) {
                        if (result.code == 1000) {
                            _this.items = result.face;
                            var html = juicer('{@each _ as it}<li><img src="http://static.artandus.com/images/1x/${it.icon}.png" data-value="[${it.value}]" alt="${it.value}" title="${it.value}"/></li>{@/each}', _this.items);
                            _this.list.html(html);
                            _this.$el.show();
                            _this.$text.focus();
                        } else {
                            $.notify(result.msg || $L('参数错误'));
                        }
                    }, 'json');
                } else {
                    _this.$el.show();
                    _this.$text.focus();
                }
                return false;
            })
            _this.container.on('click.emotions', function () {
                _this.$el.hide();
            })
        },
        fnSelectFace: function (ev) {
            var $this = $('img', ev.currentTarget),
                val = $this.data('value'),
                text = this.$text.val(),
                ctrl = this.$text[0];
            cursor = this.getCursortPosition(ctrl),
            start = text.substr(0, cursor),
            end = text.substr(cursor),
            text = start + val,
            pos = text.length;
            this.$text.val(text + end);
            this.setCursor(ctrl, pos);
            !ev.ctrlKey && this.$el.hide();
            return false;
        },
        setCursor: function (ctrl, pos) {
            if (ctrl.setSelectionRange) {
                ctrl.focus();
                ctrl.setSelectionRange(pos, pos);
            }
            else if (ctrl.createTextRange) {
                var range = ctrl.createTextRange();
                range.collapse(true);
                range.moveEnd('character', pos);
                range.moveStart('character', pos);
                range.select();
            }
        },
        getCursortPosition: function (ctrl) {
            var CaretPos = 0;
            if (document.selection) {
                ctrl.focus();
                var Sel = document.selection.createRange();
                Sel.moveStart('character', -ctrl.value.length);
                CaretPos = Sel.text.length;
            }
            else if (ctrl.selectionStart || ctrl.selectionStart == '0') CaretPos = ctrl.selectionStart;
            return (CaretPos);
        }
    });
    $.emotions = emotions;
});;
/*! jQuery UI - v1.10.4 - 2014-04-20
 * http://jqueryui.com
 * Copyright 2014 jQuery Foundation and other contributors; Licensed MIT */

(function (e, t) {
    function i(t, i) {
        var s, a, o, r = t.nodeName.toLowerCase();
        return "area" === r ? (s = t.parentNode, a = s.name, t.href && a && "map" === s.nodeName.toLowerCase() ? (o = e("img[usemap=#" + a + "]")[0], !! o && n(o)) : !1) : (/input|select|textarea|button|object/.test(r) ? !t.disabled : "a" === r ? t.href || i : i) && n(t)
    }
    function n(t) {
        return e.expr.filters.visible(t) && !e(t).parents().addBack().filter(function () {
            return "hidden" === e.css(this, "visibility")
        }).length
    }
    var s = 0,
        a = /^ui-id-\d+$/;
    e.ui = e.ui || {},
    e.extend(e.ui, {
            version: "1.10.4",
            keyCode: {
                BACKSPACE: 8,
                COMMA: 188,
                DELETE: 46,
                DOWN: 40,
                END: 35,
                ENTER: 13,
                ESCAPE: 27,
                HOME: 36,
                LEFT: 37,
                NUMPAD_ADD: 107,
                NUMPAD_DECIMAL: 110,
                NUMPAD_DIVIDE: 111,
                NUMPAD_ENTER: 108,
                NUMPAD_MULTIPLY: 106,
                NUMPAD_SUBTRACT: 109,
                PAGE_DOWN: 34,
                PAGE_UP: 33,
                PERIOD: 190,
                RIGHT: 39,
                SPACE: 32,
                TAB: 9,
                UP: 38
            }
        }),
    e.fn.extend({
            focus: function (t) {
                return function (i, n) {
                    return "number" == typeof i ? this.each(function () {
                        var t = this;
                        setTimeout(function () {
                            e(t).focus(),
                            n && n.call(t)
                        }, i)
                    }) : t.apply(this, arguments)
                }
            }(e.fn.focus),
            scrollParent: function () {
                var t;
                return t = e.ui.ie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? this.parents().filter(function () {
                    return /(relative|absolute|fixed)/.test(e.css(this, "position")) && /(auto|scroll)/.test(e.css(this, "overflow") + e.css(this, "overflow-y") + e.css(this, "overflow-x"))
                }).eq(0) : this.parents().filter(function () {
                    return /(auto|scroll)/.test(e.css(this, "overflow") + e.css(this, "overflow-y") + e.css(this, "overflow-x"))
                }).eq(0),
                /fixed/.test(this.css("position")) || !t.length ? e(document) : t
            },
            zIndex: function (i) {
                if (i !== t) return this.css("zIndex", i);
                if (this.length) for (var n, s, a = e(this[0]); a.length && a[0] !== document;) {
                    if (n = a.css("position"), ("absolute" === n || "relative" === n || "fixed" === n) && (s = parseInt(a.css("zIndex"), 10), !isNaN(s) && 0 !== s)) return s;
                    a = a.parent()
                }
                return 0
            },
            uniqueId: function () {
                return this.each(function () {
                    this.id || (this.id = "ui-id-" + ++s)
                })
            },
            removeUniqueId: function () {
                return this.each(function () {
                    a.test(this.id) && e(this).removeAttr("id")
                })
            }
        }),
    e.extend(e.expr[":"], {
            data: e.expr.createPseudo ? e.expr.createPseudo(function (t) {
                return function (i) {
                    return !!e.data(i, t)
                }
            }) : function (t, i, n) {
                return !!e.data(t, n[3])
            },
            focusable: function (t) {
                return i(t, !isNaN(e.attr(t, "tabindex")))
            },
            tabbable: function (t) {
                var n = e.attr(t, "tabindex"),
                    s = isNaN(n);
                return (s || n >= 0) && i(t, !s)
            }
        }),
    e("<a>").outerWidth(1).jquery || e.each(["Width", "Height"], function (i, n) {
            function s(t, i, n, s) {
                return e.each(a, function () {
                    i -= parseFloat(e.css(t, "padding" + this)) || 0,
                    n && (i -= parseFloat(e.css(t, "border" + this + "Width")) || 0),
                    s && (i -= parseFloat(e.css(t, "margin" + this)) || 0)
                }),
                i
            }
            var a = "Width" === n ? ["Left", "Right"] : ["Top", "Bottom"],
                o = n.toLowerCase(),
                r = {
                    innerWidth: e.fn.innerWidth,
                    innerHeight: e.fn.innerHeight,
                    outerWidth: e.fn.outerWidth,
                    outerHeight: e.fn.outerHeight
                };
            e.fn["inner" + n] = function (i) {
                    return i === t ? r["inner" + n].call(this) : this.each(function () {
                        e(this).css(o, s(this, i) + "px")
                    })
                },
            e.fn["outer" + n] = function (t, i) {
                    return "number" != typeof t ? r["outer" + n].call(this, t) : this.each(function () {
                        e(this).css(o, s(this, t, !0, i) + "px")
                    })
                }
        }),
    e.fn.addBack || (e.fn.addBack = function (e) {
            return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
        }),
    e("<a>").data("a-b", "a").removeData("a-b").data("a-b") && (e.fn.removeData = function (t) {
            return function (i) {
                return arguments.length ? t.call(this, e.camelCase(i)) : t.call(this)
            }
        }(e.fn.removeData)),
    e.ui.ie = !! /msie [\w.]+/.exec(navigator.userAgent.toLowerCase()),
    e.support.selectstart = "onselectstart" in document.createElement("div"),
    e.fn.extend({
            disableSelection: function () {
                return this.bind((e.support.selectstart ? "selectstart" : "mousedown") + ".ui-disableSelection", function (e) {
                    e.preventDefault()
                })
            },
            enableSelection: function () {
                return this.unbind(".ui-disableSelection")
            }
        }),
    e.extend(e.ui, {
            plugin: {
                add: function (t, i, n) {
                    var s, a = e.ui[t].prototype;
                    for (s in n) a.plugins[s] = a.plugins[s] || [],
                    a.plugins[s].push([i, n[s]])
                },
                call: function (e, t, i) {
                    var n, s = e.plugins[t];
                    if (s && e.element[0].parentNode && 11 !== e.element[0].parentNode.nodeType) for (n = 0; s.length > n; n++) e.options[s[n][0]] && s[n][1].apply(e.element, i)
                }
            },
            hasScroll: function (t, i) {
                if ("hidden" === e(t).css("overflow")) return !1;
                var n = i && "left" === i ? "scrollLeft" : "scrollTop",
                    s = !1;
                return t[n] > 0 ? !0 : (t[n] = 1, s = t[n] > 0, t[n] = 0, s)
            }
        })
})(jQuery);;
/*! jQuery UI - v1.10.4 - 2014-04-20
 * http://jqueryui.com
 * Copyright 2014 jQuery Foundation and other contributors; Licensed MIT */

(function (t, e) {
    var i = 0,
        s = Array.prototype.slice,
        n = t.cleanData;
    t.cleanData = function (e) {
            for (var i, s = 0; null != (i = e[s]); s++) try {
                t(i).triggerHandler("remove")
            } catch (o) {}
            n(e)
        },
    t.widget = function (i, s, n) {
            var o, a, r, h, l = {},
                c = i.split(".")[0];
            i = i.split(".")[1],
            o = c + "-" + i,
            n || (n = s, s = t.Widget),
            t.expr[":"][o.toLowerCase()] = function (e) {
                    return !!t.data(e, o)
                },
            t[c] = t[c] || {},
            a = t[c][i],
            r = t[c][i] = function (t, i) {
                    return this._createWidget ? (arguments.length && this._createWidget(t, i), e) : new r(t, i)
                },
            t.extend(r, a, {
                    version: n.version,
                    _proto: t.extend({}, n),
                    _childConstructors: []
                }),
            h = new s,
            h.options = t.widget.extend({}, h.options),
            t.each(n, function (i, n) {
                    return t.isFunction(n) ? (l[i] = function () {
                        var t = function () {
                            return s.prototype[i].apply(this, arguments)
                        },
                            e = function (t) {
                                return s.prototype[i].apply(this, t)
                            };
                        return function () {
                                var i, s = this._super,
                                    o = this._superApply;
                                return this._super = t,
                                this._superApply = e,
                                i = n.apply(this, arguments),
                                this._super = s,
                                this._superApply = o,
                                i
                            }
                    }(), e) : (l[i] = n, e)
                }),
            r.prototype = t.widget.extend(h, {
                    widgetEventPrefix: a ? h.widgetEventPrefix || i : i
                }, l, {
                    constructor: r,
                    namespace: c,
                    widgetName: i,
                    widgetFullName: o
                }),
            a ? (t.each(a._childConstructors, function (e, i) {
                    var s = i.prototype;
                    t.widget(s.namespace + "." + s.widgetName, r, i._proto)
                }), delete a._childConstructors) : s._childConstructors.push(r),
            t.widget.bridge(i, r)
        },
    t.widget.extend = function (i) {
            for (var n, o, a = s.call(arguments, 1), r = 0, h = a.length; h > r; r++) for (n in a[r]) o = a[r][n],
            a[r].hasOwnProperty(n) && o !== e && (i[n] = t.isPlainObject(o) ? t.isPlainObject(i[n]) ? t.widget.extend({}, i[n], o) : t.widget.extend({}, o) : o);
            return i
        },
    t.widget.bridge = function (i, n) {
            var o = n.prototype.widgetFullName || i;
            t.fn[i] = function (a) {
                var r = "string" == typeof a,
                    h = s.call(arguments, 1),
                    l = this;
                return a = !r && h.length ? t.widget.extend.apply(null, [a].concat(h)) : a,
                r ? this.each(function () {
                        var s, n = t.data(this, o);
                        return n ? t.isFunction(n[a]) && "_" !== a.charAt(0) ? (s = n[a].apply(n, h), s !== n && s !== e ? (l = s && s.jquery ? l.pushStack(s.get()) : s, !1) : e) : t.error("no such method '" + a + "' for " + i + " widget instance") : t.error("cannot call methods on " + i + " prior to initialization; " + "attempted to call method '" + a + "'")
                    }) : this.each(function () {
                        var e = t.data(this, o);
                        e ? e.option(a || {})._init() : t.data(this, o, new n(a, this))
                    }),
                l
            }
        },
    t.Widget = function () {},
    t.Widget._childConstructors = [],
    t.Widget.prototype = {
            widgetName: "widget",
            widgetEventPrefix: "",
            defaultElement: "<div>",
            options: {
                disabled: !1,
                create: null
            },
            _createWidget: function (e, s) {
                s = t(s || this.defaultElement || this)[0],
                this.element = t(s),
                this.uuid = i++,
                this.eventNamespace = "." + this.widgetName + this.uuid,
                this.options = t.widget.extend({}, this.options, this._getCreateOptions(), e),
                this.bindings = t(),
                this.hoverable = t(),
                this.focusable = t(),
                s !== this && (t.data(s, this.widgetFullName, this), this._on(!0, this.element, {
                    remove: function (t) {
                        t.target === s && this.destroy()
                    }
                }), this.document = t(s.style ? s.ownerDocument : s.document || s), this.window = t(this.document[0].defaultView || this.document[0].parentWindow)),
                this._create(),
                this._trigger("create", null, this._getCreateEventData()),
                this._init()
            },
            _getCreateOptions: t.noop,
            _getCreateEventData: t.noop,
            _create: t.noop,
            _init: t.noop,
            destroy: function () {
                this._destroy(),
                this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(t.camelCase(this.widgetFullName)),
                this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled " + "ui-state-disabled"),
                this.bindings.unbind(this.eventNamespace),
                this.hoverable.removeClass("ui-state-hover"),
                this.focusable.removeClass("ui-state-focus")
            },
            _destroy: t.noop,
            widget: function () {
                return this.element
            },
            option: function (i, s) {
                var n, o, a, r = i;
                if (0 === arguments.length) return t.widget.extend({}, this.options);
                if ("string" == typeof i) if (r = {}, n = i.split("."), i = n.shift(), n.length) {
                    for (o = r[i] = t.widget.extend({}, this.options[i]), a = 0; n.length - 1 > a; a++) o[n[a]] = o[n[a]] || {},
                    o = o[n[a]];
                    if (i = n.pop(), 1 === arguments.length) return o[i] === e ? null : o[i];
                    o[i] = s
                } else {
                    if (1 === arguments.length) return this.options[i] === e ? null : this.options[i];
                    r[i] = s
                }
                return this._setOptions(r),
                this
            },
            _setOptions: function (t) {
                var e;
                for (e in t) this._setOption(e, t[e]);
                return this
            },
            _setOption: function (t, e) {
                return this.options[t] = e,
                "disabled" === t && (this.widget().toggleClass(this.widgetFullName + "-disabled ui-state-disabled", !! e).attr("aria-disabled", e), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")),
                this
            },
            enable: function () {
                return this._setOption("disabled", !1)
            },
            disable: function () {
                return this._setOption("disabled", !0)
            },
            _on: function (i, s, n) {
                var o, a = this;
                "boolean" != typeof i && (n = s, s = i, i = !1),
                n ? (s = o = t(s), this.bindings = this.bindings.add(s)) : (n = s, s = this.element, o = this.widget()),
                t.each(n, function (n, r) {
                    function h() {
                        return i || a.options.disabled !== !0 && !t(this).hasClass("ui-state-disabled") ? ("string" == typeof r ? a[r] : r).apply(a, arguments) : e
                    }
                    "string" != typeof r && (h.guid = r.guid = r.guid || h.guid || t.guid++);
                    var l = n.match(/^(\w+)\s*(.*)$/),
                        c = l[1] + a.eventNamespace,
                        u = l[2];
                    u ? o.delegate(u, c, h) : s.bind(c, h)
                })
            },
            _off: function (t, e) {
                e = (e || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace,
                t.unbind(e).undelegate(e)
            },
            _delay: function (t, e) {
                function i() {
                    return ("string" == typeof t ? s[t] : t).apply(s, arguments)
                }
                var s = this;
                return setTimeout(i, e || 0)
            },
            _hoverable: function (e) {
                this.hoverable = this.hoverable.add(e),
                this._on(e, {
                    mouseenter: function (e) {
                        t(e.currentTarget).addClass("ui-state-hover")
                    },
                    mouseleave: function (e) {
                        t(e.currentTarget).removeClass("ui-state-hover")
                    }
                })
            },
            _focusable: function (e) {
                this.focusable = this.focusable.add(e),
                this._on(e, {
                    focusin: function (e) {
                        t(e.currentTarget).addClass("ui-state-focus")
                    },
                    focusout: function (e) {
                        t(e.currentTarget).removeClass("ui-state-focus")
                    }
                })
            },
            _trigger: function (e, i, s) {
                var n, o, a = this.options[e];
                if (s = s || {}, i = t.Event(i), i.type = (e === this.widgetEventPrefix ? e : this.widgetEventPrefix + e).toLowerCase(), i.target = this.element[0], o = i.originalEvent) for (n in o) n in i || (i[n] = o[n]);
                return this.element.trigger(i, s),
                !(t.isFunction(a) && a.apply(this.element[0], [i].concat(s)) === !1 || i.isDefaultPrevented())
            }
        },
    t.each({
            show: "fadeIn",
            hide: "fadeOut"
        }, function (e, i) {
            t.Widget.prototype["_" + e] = function (s, n, o) {
                "string" == typeof n && (n = {
                    effect: n
                });
                var a, r = n ? n === !0 || "number" == typeof n ? i : n.effect || i : e;
                n = n || {},
                "number" == typeof n && (n = {
                    duration: n
                }),
                a = !t.isEmptyObject(n),
                n.complete = o,
                n.delay && s.delay(n.delay),
                a && t.effects && t.effects.effect[r] ? s[e](n) : r !== e && s[r] ? s[r](n.duration, n.easing, o) : s.queue(function (i) {
                    t(this)[e](),
                    o && o.call(s[0]),
                    i()
                })
            }
        })
})(jQuery);;
(function (factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else {
        factory(window.jQuery);
    }
}(function ($) {
    'use strict';
    var counter = 0;
    $.ajaxTransport('iframe', function (options) {
        if (options.async) {
            var form, iframe, addParamChar;
            return {
                send: function (_, completeCallback) {
                    form = $('<form style="display:none;"></form>');
                    form.attr('accept-charset', options.formAcceptCharset);
                    addParamChar = /\?/.test(options.url) ? '&' : '?';
                    if (options.type === 'DELETE') {
                        options.url = options.url + addParamChar + '_method=DELETE';
                        options.type = 'POST';
                    } else if (options.type === 'PUT') {
                        options.url = options.url + addParamChar + '_method=PUT';
                        options.type = 'POST';
                    } else if (options.type === 'PATCH') {
                        options.url = options.url + addParamChar + '_method=PATCH';
                        options.type = 'POST';
                    }
                    counter += 1;
                    iframe = $('<iframe src="javascript:false;" name="iframe-transport-' + counter + '"></iframe>').bind('load', function () {
                        var fileInputClones, paramNames = $.isArray(options.paramName) ? options.paramName : [options.paramName];
                        iframe.unbind('load').bind('load', function () {
                            var response;
                            try {
                                response = iframe.contents();
                                if (!response.length || !response[0].firstChild) {
                                    throw new Error();
                                }
                            } catch (e) {
                                response = undefined;
                            }
                            completeCallback(200, 'success', {
                                'iframe': response
                            });
                            $('<iframe src="javascript:false;"></iframe>').appendTo(form);
                            window.setTimeout(function () {
                                form.remove();
                            }, 0);
                        });
                        form.prop('target', iframe.prop('name')).prop('action', options.url).prop('method', options.type);
                        if (options.formData) {
                            $.each(options.formData, function (index, field) {
                                $('<input type="hidden"/>').prop('name', field.name).val(field.value).appendTo(form);
                            });
                        }
                        if (options.fileInput && options.fileInput.length && options.type === 'POST') {
                            fileInputClones = options.fileInput.clone();
                            options.fileInput.after(function (index) {
                                return fileInputClones[index];
                            });
                            if (options.paramName) {
                                options.fileInput.each(function (index) {
                                    $(this).prop('name', paramNames[index] || options.paramName);
                                });
                            }
                            form.append(options.fileInput).prop('enctype', 'multipart/form-data').prop('encoding', 'multipart/form-data');
                        }
                        form.submit();
                        if (fileInputClones && fileInputClones.length) {
                            options.fileInput.each(function (index, input) {
                                var clone = $(fileInputClones[index]);
                                $(input).prop('name', clone.prop('name'));
                                clone.replaceWith(input);
                            });
                        }
                    });
                    form.append(iframe).appendTo(document.body);
                },
                abort: function () {
                    if (iframe) {
                        iframe.unbind('load').prop('src', 'javascript'.concat(':false;'));
                    }
                    if (form) {
                        form.remove();
                    }
                }
            };
        }
    });
    $.ajaxSetup({
        converters: {
            'iframe text': function (iframe) {
                return iframe && $(iframe[0].body).text();
            },
            'iframe json': function (iframe) {
                return iframe && $.parseJSON($(iframe[0].body).text());
            },
            'iframe html': function (iframe) {
                return iframe && $(iframe[0].body).html();
            },
            'iframe xml': function (iframe) {
                var xmlDoc = iframe && iframe[0];
                return xmlDoc && $.isXMLDoc(xmlDoc) ? xmlDoc : $.parseXML((xmlDoc.XMLDocument && xmlDoc.XMLDocument.xml) || $(xmlDoc.body).html());
            },
            'iframe script': function (iframe) {
                return iframe && $.globalEval($(iframe[0].body).text());
            }
        }
    });
}));;
(function (factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define(['jquery', 'jquery.ui.widget'], factory);
    } else {
        factory(window.jQuery);
    }
}(function ($) {
    'use strict';
    $.support.xhrFileUpload = !! (window.XMLHttpRequestUpload && window.FileReader);
    $.support.xhrFormDataFileUpload = !! window.FormData;
    $.widget('blueimp.fileupload', {
        options: {
            dropZone: $(document),
            pasteZone: $(document),
            fileInput: undefined,
            replaceFileInput: true,
            paramName: undefined,
            singleFileUploads: true,
            limitMultiFileUploads: undefined,
            sequentialUploads: false,
            limitConcurrentUploads: undefined,
            forceIframeTransport: false,
            redirect: undefined,
            redirectParamName: undefined,
            postMessage: undefined,
            multipart: true,
            maxChunkSize: undefined,
            uploadedBytes: undefined,
            recalculateProgress: true,
            progressInterval: 100,
            bitrateInterval: 500,
            autoUpload: true,
            messages: {
                uploadedBytes: 'Uploaded bytes exceed file size'
            },
            i18n: function (message, context) {
                message = this.messages[message] || message.toString();
                if (context) {
                    $.each(context, function (key, value) {
                        message = message.replace('{' + key + '}', value);
                    });
                }
                return message;
            },
            formData: function (form) {
                return form.serializeArray();
            },
            add: function (e, data) {
                if (data.autoUpload || (data.autoUpload !== false && $(this).fileupload('option', 'autoUpload'))) {
                    data.process().done(function () {
                        data.submit();
                    });
                }
            },
            processData: false,
            contentType: false,
            cache: false
        },
        _specialOptions: ['fileInput', 'dropZone', 'pasteZone', 'multipart', 'forceIframeTransport'],
        _BitrateTimer: function () {
            this.timestamp = ((Date.now) ? Date.now() : (new Date()).getTime());
            this.loaded = 0;
            this.bitrate = 0;
            this.getBitrate = function (now, loaded, interval) {
                var timeDiff = now - this.timestamp;
                if (!this.bitrate || !interval || timeDiff > interval) {
                    this.bitrate = (loaded - this.loaded) * (1000 / timeDiff) * 8;
                    this.loaded = loaded;
                    this.timestamp = now;
                }
                return this.bitrate;
            };
        },
        _isXHRUpload: function (options) {
            return !options.forceIframeTransport && ((!options.multipart && $.support.xhrFileUpload) || $.support.xhrFormDataFileUpload);
        },
        _getFormData: function (options) {
            var formData;
            if (typeof options.formData === 'function') {
                return options.formData(options.form);
            }
            if ($.isArray(options.formData)) {
                return options.formData;
            }
            if ($.type(options.formData) === 'object') {
                formData = [];
                $.each(options.formData, function (name, value) {
                    formData.push({
                        name: name,
                        value: value
                    });
                });
                return formData;
            }
            return [];
        },
        _getTotal: function (files) {
            var total = 0;
            $.each(files, function (index, file) {
                total += file.size || 1;
            });
            return total;
        },
        _initProgressObject: function (obj) {
            var progress = {
                loaded: 0,
                total: 0,
                bitrate: 0
            };
            if (obj._progress) {
                $.extend(obj._progress, progress);
            } else {
                obj._progress = progress;
            }
        },
        _initResponseObject: function (obj) {
            var prop;
            if (obj._response) {
                for (prop in obj._response) {
                    if (obj._response.hasOwnProperty(prop)) {
                        delete obj._response[prop];
                    }
                }
            } else {
                obj._response = {};
            }
        },
        _onProgress: function (e, data) {
            if (e.lengthComputable) {
                var now = ((Date.now) ? Date.now() : (new Date()).getTime()),
                    loaded;
                if (data._time && data.progressInterval && (now - data._time < data.progressInterval) && e.loaded !== e.total) {
                        return;
                    }
                data._time = now;
                loaded = Math.floor(e.loaded / e.total * (data.chunkSize || data._progress.total)) + (data.uploadedBytes || 0);
                this._progress.loaded += (loaded - data._progress.loaded);
                this._progress.bitrate = this._bitrateTimer.getBitrate(now, this._progress.loaded, data.bitrateInterval);
                data._progress.loaded = data.loaded = loaded;
                data._progress.bitrate = data.bitrate = data._bitrateTimer.getBitrate(now, loaded, data.bitrateInterval);
                this._trigger('progress', e, data);
                this._trigger('progressall', e, this._progress);
            }
        },
        _initProgressListener: function (options) {
            var that = this,
                xhr = options.xhr ? options.xhr() : $.ajaxSettings.xhr();
            if (xhr.upload) {
                    $(xhr.upload).bind('progress', function (e) {
                        var oe = e.originalEvent;
                        e.lengthComputable = oe.lengthComputable;
                        e.loaded = oe.loaded;
                        e.total = oe.total;
                        that._onProgress(e, options);
                    });
                    options.xhr = function () {
                        return xhr;
                    };
                }
        },
        _isInstanceOf: function (type, obj) {
            return Object.prototype.toString.call(obj) === '[object ' + type + ']';
        },
        _initXHRData: function (options) {
            var that = this,
                formData, file = options.files[0],
                multipart = options.multipart || !$.support.xhrFileUpload,
                paramName = options.paramName[0];
            options.headers = options.headers || {};
            if (options.contentRange) {
                    options.headers['Content-Range'] = options.contentRange;
                }
            if (!multipart) {
                    options.headers['Content-Disposition'] = 'attachment; filename="' + encodeURI(file.name) + '"';
                    options.contentType = file.type;
                    options.data = options.blob || file;
                } else if ($.support.xhrFormDataFileUpload) {
                    if (options.postMessage) {
                        formData = this._getFormData(options);
                        if (options.blob) {
                            formData.push({
                                name: paramName,
                                value: options.blob
                            });
                        } else {
                            $.each(options.files, function (index, file) {
                                formData.push({
                                    name: options.paramName[index] || paramName,
                                    value: file
                                });
                            });
                        }
                    } else {
                        if (that._isInstanceOf('FormData', options.formData)) {
                            formData = options.formData;
                        } else {
                            formData = new FormData();
                            $.each(this._getFormData(options), function (index, field) {
                                formData.append(field.name, field.value);
                            });
                        }
                        if (options.blob) {
                            options.headers['Content-Disposition'] = 'attachment; filename="' + encodeURI(file.name) + '"';
                            formData.append(paramName, options.blob, file.name);
                        } else {
                            $.each(options.files, function (index, file) {
                                if (that._isInstanceOf('File', file) || that._isInstanceOf('Blob', file)) {
                                    formData.append(options.paramName[index] || paramName, file, file.name);
                                }
                            });
                        }
                    }
                    options.data = formData;
                }
            options.blob = null;
        },
        _initIframeSettings: function (options) {
            var targetHost = $('<a></a>').prop('href', options.url).prop('host');
            options.dataType = 'iframe ' + (options.dataType || '');
            options.formData = this._getFormData(options);
            if (options.redirect && targetHost && targetHost !== location.host) {
                options.formData.push({
                    name: options.redirectParamName || 'redirect',
                    value: options.redirect
                });
            }
        },
        _initDataSettings: function (options) {
            if (this._isXHRUpload(options)) {
                if (!this._chunkedUpload(options, true)) {
                    if (!options.data) {
                        this._initXHRData(options);
                    }
                    this._initProgressListener(options);
                }
                if (options.postMessage) {
                    options.dataType = 'postmessage ' + (options.dataType || '');
                }
            } else {
                this._initIframeSettings(options);
            }
        },
        _getParamName: function (options) {
            var fileInput = $(options.fileInput),
                paramName = options.paramName;
            if (!paramName) {
                    paramName = [];
                    fileInput.each(function () {
                        var input = $(this),
                            name = input.prop('name') || 'files[]',
                            i = (input.prop('files') || [1]).length;
                        while (i) {
                                paramName.push(name);
                                i -= 1;
                            }
                    });
                    if (!paramName.length) {
                        paramName = [fileInput.prop('name') || 'files[]'];
                    }
                } else if (!$.isArray(paramName)) {
                    paramName = [paramName];
                }
            return paramName;
        },
        _initFormSettings: function (options) {
            if (!options.form || !options.form.length) {
                options.form = $(options.fileInput.prop('form'));
                if (!options.form.length) {
                    options.form = $(this.options.fileInput.prop('form'));
                }
            }
            options.paramName = this._getParamName(options);
            if (!options.url) {
                options.url = options.form.prop('action') || location.href;
            }
            options.type = (options.type || options.form.prop('method') || '').toUpperCase();
            if (options.type !== 'POST' && options.type !== 'PUT' && options.type !== 'PATCH') {
                options.type = 'POST';
            }
            if (!options.formAcceptCharset) {
                options.formAcceptCharset = options.form.attr('accept-charset');
            }
        },
        _getAJAXSettings: function (data) {
            var options = $.extend({}, this.options, data);
            this._initFormSettings(options);
            this._initDataSettings(options);
            return options;
        },
        _getDeferredState: function (deferred) {
            if (deferred.state) {
                return deferred.state();
            }
            if (deferred.isResolved()) {
                return 'resolved';
            }
            if (deferred.isRejected()) {
                return 'rejected';
            }
            return 'pending';
        },
        _enhancePromise: function (promise) {
            promise.success = promise.done;
            promise.error = promise.fail;
            promise.complete = promise.always;
            return promise;
        },
        _getXHRPromise: function (resolveOrReject, context, args) {
            var dfd = $.Deferred(),
                promise = dfd.promise();
            context = context || this.options.context || promise;
            if (resolveOrReject === true) {
                    dfd.resolveWith(context, args);
                } else if (resolveOrReject === false) {
                    dfd.rejectWith(context, args);
                }
            promise.abort = dfd.promise;
            return this._enhancePromise(promise);
        },
        _addConvenienceMethods: function (e, data) {
            var that = this,
                getPromise = function (data) {
                    return $.Deferred().resolveWith(that, [data]).promise();
                };
            data.process = function (resolveFunc, rejectFunc) {
                    if (resolveFunc || rejectFunc) {
                        data._processQueue = this._processQueue = (this._processQueue || getPromise(this)).pipe(resolveFunc, rejectFunc);
                    }
                    return this._processQueue || getPromise(this);
                };
            data.submit = function () {
                    if (this.state() !== 'pending') {
                        data.jqXHR = this.jqXHR = (that._trigger('submit', e, this) !== false) && that._onSend(e, this);
                    }
                    return this.jqXHR || that._getXHRPromise();
                };
            data.abort = function () {
                    if (this.jqXHR) {
                        return this.jqXHR.abort();
                    }
                    return that._getXHRPromise();
                };
            data.state = function () {
                    if (this.jqXHR) {
                        return that._getDeferredState(this.jqXHR);
                    }
                    if (this._processQueue) {
                        return that._getDeferredState(this._processQueue);
                    }
                };
            data.progress = function () {
                    return this._progress;
                };
            data.response = function () {
                    return this._response;
                };
        },
        _getUploadedBytes: function (jqXHR) {
            var range = jqXHR.getResponseHeader('Range'),
                parts = range && range.split('-'),
                upperBytesPos = parts && parts.length > 1 && parseInt(parts[1], 10);
            return upperBytesPos && upperBytesPos + 1;
        },
        _chunkedUpload: function (options, testOnly) {
            var that = this,
                file = options.files[0],
                fs = file.size,
                ub = options.uploadedBytes = options.uploadedBytes || 0,
                mcs = options.maxChunkSize || fs,
                slice = file.slice || file.webkitSlice || file.mozSlice,
                dfd = $.Deferred(),
                promise = dfd.promise(),
                jqXHR, upload;
            if (!(this._isXHRUpload(options) && slice && (ub || mcs < fs)) || options.data) {
                    return false;
                }
            if (testOnly) {
                    return true;
                }
            if (ub >= fs) {
                    file.error = options.i18n('uploadedBytes');
                    return this._getXHRPromise(false, options.context, [null, 'error', file.error]);
                }
            upload = function () {
                    var o = $.extend({}, options),
                        currentLoaded = o._progress.loaded;
                    o.blob = slice.call(file, ub, ub + mcs, file.type);
                    o.chunkSize = o.blob.size;
                    o.contentRange = 'bytes ' + ub + '-' + (ub + o.chunkSize - 1) + '/' + fs;
                    that._initXHRData(o);
                    that._initProgressListener(o);
                    jqXHR = ((that._trigger('chunksend', null, o) !== false && $.ajax(o)) || that._getXHRPromise(false, o.context)).done(function (result, textStatus, jqXHR) {
                            ub = that._getUploadedBytes(jqXHR) || (ub + o.chunkSize);
                            if (currentLoaded + o.chunkSize - o._progress.loaded) {
                                that._onProgress($.Event('progress', {
                                    lengthComputable: true,
                                    loaded: ub - o.uploadedBytes,
                                    total: ub - o.uploadedBytes
                                }), o);
                            }
                            options.uploadedBytes = o.uploadedBytes = ub;
                            o.result = result;
                            o.textStatus = textStatus;
                            o.jqXHR = jqXHR;
                            that._trigger('chunkdone', null, o);
                            that._trigger('chunkalways', null, o);
                            if (ub < fs) {
                                upload();
                            } else {
                                dfd.resolveWith(o.context, [result, textStatus, jqXHR]);
                            }
                        }).fail(function (jqXHR, textStatus, errorThrown) {
                            o.jqXHR = jqXHR;
                            o.textStatus = textStatus;
                            o.errorThrown = errorThrown;
                            that._trigger('chunkfail', null, o);
                            that._trigger('chunkalways', null, o);
                            dfd.rejectWith(o.context, [jqXHR, textStatus, errorThrown]);
                        });
                };
            this._enhancePromise(promise);
            promise.abort = function () {
                    return jqXHR.abort();
                };
            upload();
            return promise;
        },
        _beforeSend: function (e, data) {
            if (this._active === 0) {
                this._trigger('start');
                this._bitrateTimer = new this._BitrateTimer();
                this._progress.loaded = this._progress.total = 0;
                this._progress.bitrate = 0;
            }
            this._initResponseObject(data);
            this._initProgressObject(data);
            data._progress.loaded = data.loaded = data.uploadedBytes || 0;
            data._progress.total = data.total = this._getTotal(data.files) || 1;
            data._progress.bitrate = data.bitrate = 0;
            this._active += 1;
            this._progress.loaded += data.loaded;
            this._progress.total += data.total;
        },
        _onDone: function (result, textStatus, jqXHR, options) {
            var total = options._progress.total,
                response = options._response;
            if (options._progress.loaded < total) {
                    this._onProgress($.Event('progress', {
                        lengthComputable: true,
                        loaded: total,
                        total: total
                    }), options);
                }
            response.result = options.result = result;
            response.textStatus = options.textStatus = textStatus;
            response.jqXHR = options.jqXHR = jqXHR;
            this._trigger('done', null, options);
        },
        _onFail: function (jqXHR, textStatus, errorThrown, options) {
            var response = options._response;
            if (options.recalculateProgress) {
                this._progress.loaded -= options._progress.loaded;
                this._progress.total -= options._progress.total;
            }
            response.jqXHR = options.jqXHR = jqXHR;
            response.textStatus = options.textStatus = textStatus;
            response.errorThrown = options.errorThrown = errorThrown;
            this._trigger('fail', null, options);
        },
        _onAlways: function (jqXHRorResult, textStatus, jqXHRorError, options) {
            this._trigger('always', null, options);
        },
        _onSend: function (e, data) {
            if (!data.submit) {
                this._addConvenienceMethods(e, data);
            }
            var that = this,
                jqXHR, aborted, slot, pipe, options = that._getAJAXSettings(data),
                send = function () {
                    that._sending += 1;
                    options._bitrateTimer = new that._BitrateTimer();
                    jqXHR = jqXHR || (((aborted || that._trigger('send', e, options) === false) && that._getXHRPromise(false, options.context, aborted)) || that._chunkedUpload(options) || $.ajax(options)).done(function (result, textStatus, jqXHR) {
                        that._onDone(result, textStatus, jqXHR, options);
                    }).fail(function (jqXHR, textStatus, errorThrown) {
                        that._onFail(jqXHR, textStatus, errorThrown, options);
                    }).always(function (jqXHRorResult, textStatus, jqXHRorError) {
                        that._onAlways(jqXHRorResult, textStatus, jqXHRorError, options);
                        that._sending -= 1;
                        that._active -= 1;
                        if (options.limitConcurrentUploads && options.limitConcurrentUploads > that._sending) {
                            var nextSlot = that._slots.shift();
                            while (nextSlot) {
                                if (that._getDeferredState(nextSlot) === 'pending') {
                                    nextSlot.resolve();
                                    break;
                                }
                                nextSlot = that._slots.shift();
                            }
                        }
                        if (that._active === 0) {
                            that._trigger('stop');
                        }
                    });
                    return jqXHR;
                };
            this._beforeSend(e, options);
            if (this.options.sequentialUploads || (this.options.limitConcurrentUploads && this.options.limitConcurrentUploads <= this._sending)) {
                    if (this.options.limitConcurrentUploads > 1) {
                        slot = $.Deferred();
                        this._slots.push(slot);
                        pipe = slot.pipe(send);
                    } else {
                        pipe = (this._sequence = this._sequence.pipe(send, send));
                    }
                    pipe.abort = function () {
                        aborted = [undefined, 'abort', 'abort'];
                        if (!jqXHR) {
                            if (slot) {
                                slot.rejectWith(options.context, aborted);
                            }
                            return send();
                        }
                        return jqXHR.abort();
                    };
                    return this._enhancePromise(pipe);
                }
            return send();
        },
        _onAdd: function (e, data) {
            var that = this,
                result = true,
                options = $.extend({}, this.options, data),
                limit = options.limitMultiFileUploads,
                paramName = this._getParamName(options),
                paramNameSet, paramNameSlice, fileSet, i;
            if (!(options.singleFileUploads || limit) || !this._isXHRUpload(options)) {
                    fileSet = [data.files];
                    paramNameSet = [paramName];
                } else if (!options.singleFileUploads && limit) {
                    fileSet = [];
                    paramNameSet = [];
                    for (i = 0; i < data.files.length; i += limit) {
                        fileSet.push(data.files.slice(i, i + limit));
                        paramNameSlice = paramName.slice(i, i + limit);
                        if (!paramNameSlice.length) {
                            paramNameSlice = paramName;
                        }
                        paramNameSet.push(paramNameSlice);
                    }
                } else {
                    paramNameSet = paramName;
                }
            data.originalFiles = data.files;
            $.each(fileSet || data.files, function (index, element) {
                    var newData = $.extend({}, data);
                    newData.files = fileSet ? element : [element];
                    newData.paramName = paramNameSet[index];
                    that._initResponseObject(newData);
                    that._initProgressObject(newData);
                    that._addConvenienceMethods(e, newData);
                    result = that._trigger('add', e, newData);
                    return result;
                });
            return result;
        },
        _replaceFileInput: function (input) {
            var inputClone = input.clone(true);
            $('<form></form>').append(inputClone)[0].reset();
            input.after(inputClone).detach();
            $.cleanData(input.unbind('remove'));
            this.options.fileInput = this.options.fileInput.map(function (i, el) {
                if (el === input[0]) {
                    return inputClone[0];
                }
                return el;
            });
            if (input[0] === this.element[0]) {
                this.element = inputClone;
            }
        },
        _handleFileTreeEntry: function (entry, path) {
            var that = this,
                dfd = $.Deferred(),
                errorHandler = function (e) {
                    if (e && !e.entry) {
                        e.entry = entry;
                    }
                    dfd.resolve([e]);
                },
                dirReader;
            path = path || '';
            if (entry.isFile) {
                    if (entry._file) {
                        entry._file.relativePath = path;
                        dfd.resolve(entry._file);
                    } else {
                        entry.file(function (file) {
                            file.relativePath = path;
                            dfd.resolve(file);
                        }, errorHandler);
                    }
                } else if (entry.isDirectory) {
                    dirReader = entry.createReader();
                    dirReader.readEntries(function (entries) {
                        that._handleFileTreeEntries(entries, path + entry.name + '/').done(function (files) {
                            dfd.resolve(files);
                        }).fail(errorHandler);
                    }, errorHandler);
                } else {
                    dfd.resolve([]);
                }
            return dfd.promise();
        },
        _handleFileTreeEntries: function (entries, path) {
            var that = this;
            return $.when.apply($, $.map(entries, function (entry) {
                return that._handleFileTreeEntry(entry, path);
            })).pipe(function () {
                return Array.prototype.concat.apply([], arguments);
            });
        },
        _getDroppedFiles: function (dataTransfer) {
            dataTransfer = dataTransfer || {};
            var items = dataTransfer.items;
            if (items && items.length && (items[0].webkitGetAsEntry || items[0].getAsEntry)) {
                return this._handleFileTreeEntries($.map(items, function (item) {
                    var entry;
                    if (item.webkitGetAsEntry) {
                        entry = item.webkitGetAsEntry();
                        if (entry) {
                            entry._file = item.getAsFile();
                        }
                        return entry;
                    }
                    return item.getAsEntry();
                }));
            }
            return $.Deferred().resolve($.makeArray(dataTransfer.files)).promise();
        },
        _getSingleFileInputFiles: function (fileInput) {
            fileInput = $(fileInput);
            var entries = fileInput.prop('webkitEntries') || fileInput.prop('entries'),
                files, value;
            if (entries && entries.length) {
                    return this._handleFileTreeEntries(entries);
                }
            files = $.makeArray(fileInput.prop('files'));
            if (!files.length) {
                    value = fileInput.prop('value');
                    if (!value) {
                        return $.Deferred().resolve([]).promise();
                    }
                    files = [{
                        name: value.replace(/^.*\\/, '')
                    }];
                } else if (files[0].name === undefined && files[0].fileName) {
                    $.each(files, function (index, file) {
                        file.name = file.fileName;
                        file.size = file.fileSize;
                    });
                }
            return $.Deferred().resolve(files).promise();
        },
        _getFileInputFiles: function (fileInput) {
            if (!(fileInput instanceof $) || fileInput.length === 1) {
                return this._getSingleFileInputFiles(fileInput);
            }
            return $.when.apply($, $.map(fileInput, this._getSingleFileInputFiles)).pipe(function () {
                return Array.prototype.concat.apply([], arguments);
            });
        },
        _onChange: function (e) {
            var that = this,
                data = {
                    fileInput: $(e.target),
                    form: $(e.target.form)
                };
            this._getFileInputFiles(data.fileInput).always(function (files) {
                    data.files = files;
                    if (that.options.replaceFileInput) {
                        that._replaceFileInput(data.fileInput);
                    }
                    if (that._trigger('change', e, data) !== false) {
                        that._onAdd(e, data);
                    }
                });
        },
        _onPaste: function (e) {
            var items = e.originalEvent && e.originalEvent.clipboardData && e.originalEvent.clipboardData.items,
                data = {
                    files: []
                };
            if (items && items.length) {
                    $.each(items, function (index, item) {
                        var file = item.getAsFile && item.getAsFile();
                        if (file) {
                            data.files.push(file);
                        }
                    });
                    if (this._trigger('paste', e, data) === false || this._onAdd(e, data) === false) {
                        return false;
                    }
                }
        },
        _onDrop: function (e) {
            var that = this,
                dataTransfer = e.dataTransfer = e.originalEvent && e.originalEvent.dataTransfer,
                data = {};
            if (dataTransfer && dataTransfer.files && dataTransfer.files.length) {
                    e.preventDefault();
                    this._getDroppedFiles(dataTransfer).always(function (files) {
                        data.files = files;
                        if (that._trigger('drop', e, data) !== false) {
                            that._onAdd(e, data);
                        }
                    });
                }
        },
        _onDragOver: function (e) {
            var dataTransfer = e.dataTransfer = e.originalEvent && e.originalEvent.dataTransfer;
            if (dataTransfer) {
                if (this._trigger('dragover', e) === false) {
                    return false;
                }
                if ($.inArray('Files', dataTransfer.types) !== -1) {
                    dataTransfer.dropEffect = 'copy';
                    e.preventDefault();
                }
            }
        },
        _initEventHandlers: function () {
            if (this._isXHRUpload(this.options)) {
                this._on(this.options.dropZone, {
                    dragover: this._onDragOver,
                    drop: this._onDrop
                });
                this._on(this.options.pasteZone, {
                    paste: this._onPaste
                });
            }
            this._on(this.options.fileInput, {
                change: this._onChange
            });
        },
        _destroyEventHandlers: function () {
            this._off(this.options.dropZone, 'dragover drop');
            this._off(this.options.pasteZone, 'paste');
            this._off(this.options.fileInput, 'change');
        },
        _setOption: function (key, value) {
            var reinit = $.inArray(key, this._specialOptions) !== -1;
            if (reinit) {
                this._destroyEventHandlers();
            }
            this._super(key, value);
            if (reinit) {
                this._initSpecialOptions();
                this._initEventHandlers();
            }
        },
        _initSpecialOptions: function () {
            var options = this.options;
            if (options.fileInput === undefined) {
                options.fileInput = this.element.is('input[type="file"]') ? this.element : this.element.find('input[type="file"]');
            } else if (!(options.fileInput instanceof $)) {
                options.fileInput = $(options.fileInput);
            }
            if (!(options.dropZone instanceof $)) {
                options.dropZone = $(options.dropZone);
            }
            if (!(options.pasteZone instanceof $)) {
                options.pasteZone = $(options.pasteZone);
            }
        },
        _getRegExp: function (str) {
            var parts = str.split('/'),
                modifiers = parts.pop();
            parts.shift();
            return new RegExp(parts.join('/'), modifiers);
        },
        _isRegExpOption: function (key, value) {
            return key !== 'url' && $.type(value) === 'string' && /^\/.*\/[igm]{0,3}$/.test(value);
        },
        _initDataAttributes: function () {
            var that = this,
                options = this.options;
            $.each($(this.element[0].cloneNode(false)).data(), function (key, value) {
                    if (that._isRegExpOption(key, value)) {
                        value = that._getRegExp(value);
                    }
                    options[key] = value;
                });
        },
        _create: function () {
            this._initDataAttributes();
            this._initSpecialOptions();
            this._slots = [];
            this._sequence = this._getXHRPromise(true);
            this._sending = this._active = 0;
            this._initProgressObject(this);
            this._initEventHandlers();
        },
        active: function () {
            return this._active;
        },
        progress: function () {
            return this._progress;
        },
        add: function (data) {
            var that = this;
            if (!data || this.options.disabled) {
                return;
            }
            if (data.fileInput && !data.files) {
                this._getFileInputFiles(data.fileInput).always(function (files) {
                    data.files = files;
                    that._onAdd(null, data);
                });
            } else {
                data.files = $.makeArray(data.files);
                this._onAdd(null, data);
            }
        },
        send: function (data) {
            if (data && !this.options.disabled) {
                if (data.fileInput && !data.files) {
                    var that = this,
                        dfd = $.Deferred(),
                        promise = dfd.promise(),
                        jqXHR, aborted;
                    promise.abort = function () {
                            aborted = true;
                            if (jqXHR) {
                                return jqXHR.abort();
                            }
                            dfd.reject(null, 'abort', 'abort');
                            return promise;
                        };
                    this._getFileInputFiles(data.fileInput).always(function (files) {
                            if (aborted) {
                                return;
                            }
                            data.files = files;
                            jqXHR = that._onSend(null, data).then(function (result, textStatus, jqXHR) {
                                dfd.resolve(result, textStatus, jqXHR);
                            }, function (jqXHR, textStatus, errorThrown) {
                                dfd.reject(jqXHR, textStatus, errorThrown);
                            });
                        });
                    return this._enhancePromise(promise);
                }
                data.files = $.makeArray(data.files);
                if (data.files.length) {
                    return this._onSend(null, data);
                }
            }
            return this._getXHRPromise(false, data && data.context);
        }
    });
}));;
$(function ($) {
    var showError = function (el, message) {
        var el = $(el),
            id = el.attr('id') || el.attr('id', function () {
                return 'cls' + Math.round(Math.random() * 1000);
            }).attr('id'),
            siblings = el.siblings('.' + id);
        if (!siblings.length) {
                siblings = $('<div class="KAITI msg_error typeface_1 ' + id + '"></div>').insertAfter(el)
            }
        if (message) {
                siblings.show().text(message);
            } else {
                siblings.hide();
            }
    }
    var sendMessage = function (opts) {
        opts = $.extend({
            onClose: $.noop,
            onSuccess: $.noop
        }, opts);
        var emotions;
        var chatHistoryMsg = function (list_id) {
            $('.chat_history', thisDia).hide();
            $.post('/message/check_list', {
                list_id: list_id
            }, function (result) {
                if (result.message > 0) {
                    $('.chat_history', thisDia).attr('href', "/message/conversation/" + list_id).show();
                }
            }, 'json');
        }
        var thisDia = $(juicer(document.getElementById('message_tmpl').innerHTML, opts)).appendTo(document.body).easyModal({
            autoOpen: true,
            overlayClose: false,
            onClose: function () {
                emotions && emotions.release();
                $('textarea', this).atwho && $('textarea', this).atwho('destroy');
                $(this).parent().remove();
                $(window).off('resize.atwho');
            },
            closeButtonClass: '.a',
            onOpen: function () {
                var $this = $(this),
                    span = $('.img_name_span', $this),
                    title = $('.uname', $this),
                    text = $('textarea', $this),
                    lock = false,
                    emotions_btn = $('.phiz_btn', this);
                text.on('keydown', function (ev) {
                        if (ev.keyCode == 13 && (ev.ctrlKey || ev.metaKey)) {
                            $(this).closest('form').trigger('submit');
                        }
                    })
                if (!$CONF['isMobile'] && window.at_config) {
                        var atwho = text.atwho(at_config).data('atwho')
                        $(window).on('resize.atwho', function () {
                            atwho.controllers['@'].view.hide();
                        })
                    }
                emotions = new $.emotions({
                        $body: $('body'),
                        $btn: emotions_btn,
                        $text: text
                    });
                emotions_btn.after(emotions.$el);
                $(this).parent().on('click', function () {
                        emotions.$el.hide();
                    })
                var file = $('input[type=file]', $this).bind('fileuploadadd', function (e, data) {
                        var $this = $(this),
                            acceptFileTypes = $(this).fileupload('option', 'acceptFileTypes'),
                            maxFileSize = $(this).fileupload('option', 'maxFileSize');
                        $.map(data.files, function (file) {
                                if (file.name && !acceptFileTypes.test(file.name)) {
                                    $.notify('只能上传JPG，JPEG，PNG格式', 'error')
                                    return;
                                }
                                if (file.size && file.size > maxFileSize) {
                                    $.notify('图片太大啦，不能超过10M哦', 'error');
                                    return;
                                }
                                data.submit();
                            });
                    }).bind('fileuploaddone', function (e, data) {
                        var result = data.result;
                        if (result.code == 1000) {
                            var html = "<input type='hidden'class=\"pics\" name='pics[]' value='" + result.key + "' />" + data['files'][0]['name'];
                            span.find('em.name').html(html).closest('.phiz').removeClass('on');
                        }
                    }).prop('disabled', true);
                var fileupload = function (token) {
                        file.removeProp('disabled').fileupload({
                            url: 'http://upload.qiniu.com',
                            dataType: 'json',
                            autoUpload: false,
                            maxFileSize: 30485760,
                            limitConcurrentUploads: 1,
                            sequentialUploads: true,
                            acceptFileTypes: /(\.|\/)(jpe?g|png|gif)$/i,
                            formData: {
                                token: token
                            }
                        })
                    }
                opts.uid && chatHistoryMsg(opts.uid);
                var token = store.get('message_token');
                if (!token || token.expire < $.now()) {
                        $.post('/message/messageToken', function (result) {
                            if (result.code == 1000) {
                                token = {
                                    'token': result.token,
                                    'expire': $.now() + 86400000
                                };
                                store.set('message_token', token);
                                fileupload(token.token);
                            }
                        }, 'json');
                    } else {
                        fileupload(token.token);
                    }
                $this.on('click', '.pic_delete', function (ev) {
                        var $btn = $(this),
                            span = $btn.closest('.img_name_span'),
                            box = span.closest('.phiz');
                        box.addClass('on');
                        span.find('em.name').empty();
                        return false;
                    }).on('click', '.submit', function (ev) {
                        $(this).closest('form').trigger('submit');
                        return false;
                    }).on('submit', function (ev) {
                        var input = $('input[name=to_uid]', $this),
                            text = $('textarea', $this),
                            pics = $('input.pics', $this);
                        if (!input.length) {
                                showError(title, $L('请选择收信人'));
                                return false;
                            } else {
                                showError(input);
                            }
                        if (!text.val().length && !pics.length) {
                                showError(text.focus(), $L('还没输入内容'));
                                return false;
                            } else {
                                showError(input);
                            }
                        if (lock) {
                                return false;
                            } else {
                                lock = true;
                            }
                        $.post('/message/doMessage', $this.serialize(), function (result) {
                                if (result.code == 1000) {
                                    opts.onSuccess();
                                    thisDia.trigger('closeModal');
                                    $(window).trigger('message', result);
                                    $.notify($L('已经发送'));
                                } else {
                                    $.notify(result.msg, 'error');
                                }
                                lock = false;
                            }, 'json');
                        return false;
                    }).on('click', '.token-close', function (ev) {
                        $(this).closest('.create_alternative').remove();
                        $this.removeClass('select');
                        return false;
                    }).on('click', '.reset,.close', function () {
                        if ($.trim(text.val()).length >= 5) {
                            $.confirm('私信尚未发送，确定取消吗？', {
                                success: function (elem) {
                                    elem.trigger('closeModal');
                                    thisDia.trigger('closeModal');
                                },
                                YES: $L('是'),
                                NO: $L('否')
                            });
                        } else {
                            thisDia.trigger('closeModal');
                        }
                        return false;
                    });
                title.autocomplete({
                        onSelect: function (id, val) {
                            $('<span class="create_alternative">\
       <input type="hidden" value="' + id + '" name="to_uid" autocomplete="off">\
       <span class="token">' + val + '\
       <a href="javascript:;" class="token-close">×</a></span></span>').insertBefore(title);
                            showError(title);
                            $this.addClass('select');
                            chatHistoryMsg(id);
                        }
                    });
            }
        });
        return thisDia;
    }
    $.sendMessage = sendMessage;
});;
$(function ($) {
    var $body = $('body');
    $body.on('click', '.row-like', function () {
        var $this = $(this),
            msg = $this.attr('data-msg'),
            row_id = $this.attr('data-row-id'),
            row_type = $this.attr('data-row-type'),
            like = $this.attr('data-is-like') < 1 ? 1 : 0;
        if (!$CONF['is_login']) {
                $.login(function () {
                    location.reload();
                });
                return false;
            }
        if ($this.hasClass('lock')) {
                return false;
            } else {
                $this.addClass('lock');
            }
        var post = {
                id: row_id,
                like: like
            };
        if (row_type) {
                post['type'] = row_type
            }
        var doLike = function () {
                $.post('/proxy/doLike', post, function (result) {
                    if (result.code != 1000) {
                        $.notify(result.msg || $L('网络错误'), 'error');
                    }
                    $this.removeClass('lock');
                }, 'json');
                var num_liked = $this.attr('data-num-liked');
                if (!like) {
                    --num_liked;
                    $this.attr('data-num-liked', num_liked).html('<span></span><i>' + $L('赞一下') + '</i>').attr('data-is-like', 0).removeClass('heart_a_on').addClass('heart_a');
                } else {
                    ++num_liked;
                    $this.attr('data-num-liked', num_liked).html('<span></span><i>' + num_liked + '</i>').attr('data-is-like', 1).addClass('heart_a_on');
                }
                $this.trigger('like', [like, $CONF['head']]);
            }
        if (like < 1) {
                $.tinyConfirm($this, {
                    title: msg || '不喜欢这件作品了',
                    callback: doLike
                }).on('close', function () {
                    $this.removeClass('lock');
                });
            } else {
                doLike();
            }
        return false;
    })
});
$(function ($) {
    $('body').on('click', '.do-follow', function (ev) {
        var $this = $(this),
            status = Math.abs($this.attr('data-status') - 1),
            follow_id = $this.attr('data-follow');
        if (!$CONF['is_login']) {
                $.login(function () {
                    location.reload();
                });
                return false;
            }
        var hanldeEvent = function () {
                $.post('/u/doFollow', {
                    follow_id: follow_id,
                    status: status
                }, function (result) {
                    if (result.code != 1000) {
                        $.notify(result.msg, 'error');
                    } else {
                        switch (result.status) {
                        case 0:
                            $this.attr('class', 'attract btn do-follow').html('<i>+</i>' + $L('关注'));
                            break;
                        case 1:
                            var html = '{@if mutual}<span class="hover"><i>-</i>取消关注</span><span class="label">互相关注</span>{@else}<i>-</i>取消{@/if}'
                            $this.attr('class', 'btn attract do-follow').html(juicer(html, result));
                            break;
                        }
                        $this.attr('data-status', result.status).trigger('follow', status);
                    }
                }, 'json');
            }
        if (status == 0) {
                $.tinyConfirm($this, {
                    callback: hanldeEvent,
                    title: '不想再关注了？'
                });
            } else {
                hanldeEvent();
            }
        return false;
    })
});;
(function ($) {
    'use strict';

    function getScrollTop() {
        return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    }

    function getViewportHeight() {
        var height = window.innerHeight;
        if (height) {
            return height;
        }
        var mode = document.compatMode;
        if ((mode || !$.support.boxModel)) {
            height = (mode === 'CSS1Compat') ? document.documentElement.clientHeight : document.body.clientHeight;
        }
        return height;
    }

    function offsetTop(debug) {
        var curtop = 0;
        for (var obj = debug; obj; obj = obj.offsetParent) {
            curtop += obj.offsetTop;
        }
        return curtop;
    }

    function checkInView() {
        var viewportTop = getScrollTop(),
            viewportBottom = viewportTop + getViewportHeight(),
            elems = [];
        $.each($.cache, function () {
                if (this.events && this.events.inview) {
                    elems.push(this.handle.elem);
                }
            });
        $(elems).each(function () {
                var $el = $(this),
                    elTop = offsetTop(this),
                    elHeight = $el.height(),
                    elBottom = elTop + elHeight,
                    wasInView = $el.data('inview') || false,
                    offset = $el.data('offset') || 300,
                    inView = elTop > viewportTop && elBottom < viewportBottom,
                    isBottomVisible = elBottom + offset > viewportTop && elTop < viewportTop,
                    isTopVisible = elTop - offset < viewportBottom && elBottom > viewportBottom,
                    inViewWithOffset = inView || isBottomVisible || isTopVisible || (elTop < viewportTop && elBottom > viewportBottom);
                if (inViewWithOffset) {
                        var visPart = (isTopVisible) ? 'top' : (isBottomVisible) ? 'bottom' : 'both';
                        if (!wasInView || wasInView !== visPart) {
                            $el.data('inview', visPart);
                            $el.trigger('inview', [true, visPart]);
                        }
                    } else if (!inView && wasInView) {
                        $el.data('inview', false);
                        $el.trigger('inview', [false]);
                    }
            });
    }

    function createFunctionLimitedToOneExecutionPerDelay(fn, delay) {
        var shouldRun = false;
        var timer = null;

        function runOncePerDelay() {
            if (timer !== null) {
                shouldRun = true;
                return;
            }
            shouldRun = false;
            fn();
            timer = setTimeout(function () {
                timer = null;
                if (shouldRun) {
                    runOncePerDelay();
                }
            }, delay);
        }
        return runOncePerDelay;
    }
    var runner = createFunctionLimitedToOneExecutionPerDelay(checkInView, 100);
    $(window).on('checkInView.inview click.inview ready.inview scroll.inview resize.inview', checkInView);
})(jQuery);;
(function (window, undefined) {
    "use strict";
    var
    History = window.History = window.History || {},
        jQuery = window.jQuery;
    if (typeof History.Adapter !== 'undefined') {
            return false;
        }
    History.Adapter = {
            bind: function (el, event, callback) {
                jQuery(el).bind(event, callback);
            },
            trigger: function (el, event, extra) {
                jQuery(el).trigger(event, extra);
            },
            extractEventData: function (key, event, extra) {
                var result = (event && event.originalEvent && event.originalEvent[key]) || (extra && extra[key]) || undefined;
                return result;
            },
            onDomLoad: function (callback) {
                jQuery(callback);
            }
        };
    if (typeof History.init !== 'undefined') {
            History.init();
        }
})(window);
(function (window, undefined) {
    "use strict";
    var
    document = window.document,
        setTimeout = window.setTimeout || setTimeout,
        clearTimeout = window.clearTimeout || clearTimeout,
        setInterval = window.setInterval || setInterval,
        History = window.History = window.History || {};
    if (typeof History.initHtml4 !== 'undefined') {
            return false;
        }
    History.initHtml4 = function () {
            if (typeof History.initHtml4.initialized !== 'undefined') {
                return false;
            }
            else {
                History.initHtml4.initialized = true;
            }
            History.enabled = true;
            History.savedHashes = [];
            History.isLastHash = function (newHash) {
                var oldHash = History.getHashByIndex(),
                    isLast;
                isLast = newHash === oldHash;
                return isLast;
            };
            History.isHashEqual = function (newHash, oldHash) {
                newHash = encodeURIComponent(newHash).replace(/%25/g, "%");
                oldHash = encodeURIComponent(oldHash).replace(/%25/g, "%");
                return newHash === oldHash;
            };
            History.saveHash = function (newHash) {
                if (History.isLastHash(newHash)) {
                    return false;
                }
                History.savedHashes.push(newHash);
                return true;
            };
            History.getHashByIndex = function (index) {
                var hash = null;
                if (typeof index === 'undefined') {
                    hash = History.savedHashes[History.savedHashes.length - 1];
                }
                else if (index < 0) {
                    hash = History.savedHashes[History.savedHashes.length + index];
                }
                else {
                    hash = History.savedHashes[index];
                }
                return hash;
            };
            History.discardedHashes = {};
            History.discardedStates = {};
            History.discardState = function (discardedState, forwardState, backState) {
                var discardedStateHash = History.getHashByState(discardedState),
                    discardObject;
                discardObject = {
                        'discardedState': discardedState,
                        'backState': backState,
                        'forwardState': forwardState
                    };
                History.discardedStates[discardedStateHash] = discardObject;
                return true;
            };
            History.discardHash = function (discardedHash, forwardState, backState) {
                var discardObject = {
                    'discardedHash': discardedHash,
                    'backState': backState,
                    'forwardState': forwardState
                };
                History.discardedHashes[discardedHash] = discardObject;
                return true;
            };
            History.discardedState = function (State) {
                var StateHash = History.getHashByState(State),
                    discarded;
                discarded = History.discardedStates[StateHash] || false;
                return discarded;
            };
            History.discardedHash = function (hash) {
                var discarded = History.discardedHashes[hash] || false;
                return discarded;
            };
            History.recycleState = function (State) {
                var StateHash = History.getHashByState(State);
                if (History.discardedState(State)) {
                    delete History.discardedStates[StateHash];
                }
                return true;
            };
            if (History.emulated.hashChange) {
                History.hashChangeInit = function () {
                    History.checkerFunction = null;
                    var lastDocumentHash = '',
                        iframeId, iframe, lastIframeHash, checkerRunning, startedWithHash = Boolean(History.getHash());
                    if (History.isInternetExplorer()) {
                            iframeId = 'historyjs-iframe';
                            iframe = document.createElement('iframe');
                            iframe.setAttribute('id', iframeId);
                            iframe.setAttribute('src', '#');
                            iframe.style.display = 'none';
                            document.body.appendChild(iframe);
                            iframe.contentWindow.document.open();
                            iframe.contentWindow.document.close();
                            lastIframeHash = '';
                            checkerRunning = false;
                            History.checkerFunction = function () {
                                if (checkerRunning) {
                                    return false;
                                }
                                checkerRunning = true;
                                var
                                documentHash = History.getHash(),
                                    iframeHash = History.getHash(iframe.contentWindow.document);
                                if (documentHash !== lastDocumentHash) {
                                        lastDocumentHash = documentHash;
                                        if (iframeHash !== documentHash) {
                                            lastIframeHash = iframeHash = documentHash;
                                            iframe.contentWindow.document.open();
                                            iframe.contentWindow.document.close();
                                            iframe.contentWindow.document.location.hash = History.escapeHash(documentHash);
                                        }
                                        History.Adapter.trigger(window, 'hashchange');
                                    }
                                else if (iframeHash !== lastIframeHash) {
                                        lastIframeHash = iframeHash;
                                        if (startedWithHash && iframeHash === '') {
                                            History.back();
                                        }
                                        else {
                                            History.setHash(iframeHash, false);
                                        }
                                    }
                                checkerRunning = false;
                                return true;
                            };
                        }
                    else {
                            History.checkerFunction = function () {
                                var documentHash = History.getHash() || '';
                                if (documentHash !== lastDocumentHash) {
                                    lastDocumentHash = documentHash;
                                    History.Adapter.trigger(window, 'hashchange');
                                }
                                return true;
                            };
                        }
                    History.intervalList.push(setInterval(History.checkerFunction, History.options.hashChangeInterval));
                    return true;
                };
                History.Adapter.onDomLoad(History.hashChangeInit);
            }
            if (History.emulated.pushState) {
                History.onHashChange = function (event) {
                    var currentUrl = ((event && event.newURL) || History.getLocationHref()),
                        currentHash = History.getHashByUrl(currentUrl),
                        currentState = null,
                        currentStateHash = null,
                        currentStateHashExits = null,
                        discardObject;
                    if (History.isLastHash(currentHash)) {
                            History.busy(false);
                            return false;
                        }
                    History.doubleCheckComplete();
                    History.saveHash(currentHash);
                    if (currentHash && History.isTraditionalAnchor(currentHash)) {
                            History.Adapter.trigger(window, 'anchorchange');
                            History.busy(false);
                            return false;
                        }
                    currentState = History.extractState(History.getFullUrl(currentHash || History.getLocationHref()), true);
                    if (History.isLastSavedState(currentState)) {
                            History.busy(false);
                            return false;
                        }
                    currentStateHash = History.getHashByState(currentState);
                    discardObject = History.discardedState(currentState);
                    if (discardObject) {
                            if (History.getHashByIndex(-2) === History.getHashByState(discardObject.forwardState)) {
                                History.back(false);
                            } else {
                                History.forward(false);
                            }
                            return false;
                        }
                    History.pushState(currentState.data, currentState.title, encodeURI(currentState.url), false);
                    return true;
                };
                History.Adapter.bind(window, 'hashchange', History.onHashChange);
                History.pushState = function (data, title, url, queue) {
                    url = encodeURI(url).replace(/%25/g, "%");
                    if (History.getHashByUrl(url)) {
                        throw new Error('History.js does not support states with fragment-identifiers (hashes/anchors).');
                    }
                    if (queue !== false && History.busy()) {
                        History.pushQueue({
                            scope: History,
                            callback: History.pushState,
                            args: arguments,
                            queue: queue
                        });
                        return false;
                    }
                    History.busy(true);
                    var newState = History.createStateObject(data, title, url),
                        newStateHash = History.getHashByState(newState),
                        oldState = History.getState(false),
                        oldStateHash = History.getHashByState(oldState),
                        html4Hash = History.getHash(),
                        wasExpected = History.expectedStateId == newState.id;
                    History.storeState(newState);
                    History.expectedStateId = newState.id;
                    History.recycleState(newState);
                    History.setTitle(newState);
                    if (newStateHash === oldStateHash) {
                            History.busy(false);
                            return false;
                        }
                    History.saveState(newState);
                    if (!wasExpected) History.Adapter.trigger(window, 'statechange');
                    if (!History.isHashEqual(newStateHash, html4Hash) && !History.isHashEqual(newStateHash, History.getShortUrl(History.getLocationHref()))) {
                            History.setHash(newStateHash, false);
                        }
                    History.busy(false);
                    return true;
                };
                History.replaceState = function (data, title, url, queue) {
                    url = encodeURI(url).replace(/%25/g, "%");
                    if (History.getHashByUrl(url)) {
                        throw new Error('History.js does not support states with fragment-identifiers (hashes/anchors).');
                    }
                    if (queue !== false && History.busy()) {
                        History.pushQueue({
                            scope: History,
                            callback: History.replaceState,
                            args: arguments,
                            queue: queue
                        });
                        return false;
                    }
                    History.busy(true);
                    var newState = History.createStateObject(data, title, url),
                        newStateHash = History.getHashByState(newState),
                        oldState = History.getState(false),
                        oldStateHash = History.getHashByState(oldState),
                        previousState = History.getStateByIndex(-2);
                    History.discardState(oldState, newState, previousState);
                    if (newStateHash === oldStateHash) {
                            History.storeState(newState);
                            History.expectedStateId = newState.id;
                            History.recycleState(newState);
                            History.setTitle(newState);
                            History.saveState(newState);
                            History.Adapter.trigger(window, 'statechange');
                            History.busy(false);
                        }
                    else {
                            History.pushState(newState.data, newState.title, newState.url, false);
                        }
                    return true;
                };
            }
            if (History.emulated.pushState) {
                if (History.getHash() && !History.emulated.hashChange) {
                    History.Adapter.onDomLoad(function () {
                        History.Adapter.trigger(window, 'hashchange');
                    });
                }
            }
        };
    if (typeof History.init !== 'undefined') {
            History.init();
        }
})(window);
(function (window, undefined) {
    "use strict";
    var
    console = window.console || undefined,
        document = window.document,
        navigator = window.navigator,
        sessionStorage = false,
        setTimeout = window.setTimeout,
        clearTimeout = window.clearTimeout,
        setInterval = window.setInterval,
        clearInterval = window.clearInterval,
        JSON = window.JSON,
        alert = window.alert,
        History = window.History = window.History || {},
        history = window.history;
    try {
            sessionStorage = window.sessionStorage;
            sessionStorage.setItem('TEST', '1');
            sessionStorage.removeItem('TEST');
        } catch (e) {
            sessionStorage = false;
        }
    JSON.stringify = JSON.stringify || JSON.encode;
    JSON.parse = JSON.parse || JSON.decode;
    if (typeof History.init !== 'undefined') {
            return;
        }
    History.init = function (options) {
            if (typeof History.Adapter === 'undefined') {
                return false;
            }
            if (typeof History.initCore !== 'undefined') {
                History.initCore();
            }
            if (typeof History.initHtml4 !== 'undefined') {
                History.initHtml4();
            }
            return true;
        };
    History.initCore = function (options) {
            if (typeof History.initCore.initialized !== 'undefined') {
                return false;
            }
            else {
                History.initCore.initialized = true;
            }
            History.options = History.options || {};
            History.options.hashChangeInterval = History.options.hashChangeInterval || 100;
            History.options.safariPollInterval = History.options.safariPollInterval || 500;
            History.options.doubleCheckInterval = History.options.doubleCheckInterval || 500;
            History.options.disableSuid = true;
            History.options.storeInterval = History.options.storeInterval || 1000;
            History.options.busyDelay = History.options.busyDelay || 250;
            History.options.debug = History.options.debug || false;
            History.options.initialTitle = History.options.initialTitle || document.title;
            History.options.html4Mode = History.options.html4Mode || false;
            History.options.delayInit = History.options.delayInit || false;
            History.intervalList = [];
            History.clearAllIntervals = function () {
                var i, il = History.intervalList;
                if (typeof il !== "undefined" && il !== null) {
                    for (i = 0; i < il.length; i++) {
                        clearInterval(il[i]);
                    }
                    History.intervalList = null;
                }
            };
            History.debug = function () {
                if ((History.options.debug || false)) {
                    History.log.apply(History, arguments);
                }
            };
            History.log = function () {
                var
                consoleExists = !(typeof console === 'undefined' || typeof console.log === 'undefined' || typeof console.log.apply === 'undefined'),
                    textarea = document.getElementById('log'),
                    message, i, n, args, arg;
                if (consoleExists) {
                        args = Array.prototype.slice.call(arguments);
                        message = args.shift();
                        if (typeof console.debug !== 'undefined') {
                            console.debug.apply(console, [message, args]);
                        }
                        else {
                            console.log.apply(console, [message, args]);
                        }
                    }
                else {
                        message = ("\n" + arguments[0] + "\n");
                    }
                for (i = 1, n = arguments.length; i < n; ++i) {
                        arg = arguments[i];
                        if (typeof arg === 'object' && typeof JSON !== 'undefined') {
                            try {
                                arg = JSON.stringify(arg);
                            }
                            catch (Exception) {}
                        }
                        message += "\n" + arg + "\n";
                    }
                if (textarea) {
                        textarea.value += message + "\n-----\n";
                        textarea.scrollTop = textarea.scrollHeight - textarea.clientHeight;
                    }
                else if (!consoleExists) {
                        alert(message);
                    }
                return true;
            };
            History.getInternetExplorerMajorVersion = function () {
                var result = History.getInternetExplorerMajorVersion.cached = (typeof History.getInternetExplorerMajorVersion.cached !== 'undefined') ? History.getInternetExplorerMajorVersion.cached : (function () {
                    var v = 3,
                        div = document.createElement('div'),
                        all = div.getElementsByTagName('i');
                    while ((div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->') && all[0]) {}
                    return (v > 4) ? v : false;
                })();
                return result;
            };
            History.isInternetExplorer = function () {
                var result = History.isInternetExplorer.cached = (typeof History.isInternetExplorer.cached !== 'undefined') ? History.isInternetExplorer.cached : Boolean(History.getInternetExplorerMajorVersion());
                return result;
            };
            if (History.options.html4Mode) {
                History.emulated = {
                    pushState: true,
                    hashChange: true
                };
            }
            else {
                History.emulated = {
                    pushState: !Boolean(window.history && window.history.pushState && window.history.replaceState && !((/ Mobile\/([1-7][a-z]|(8([abcde]|f(1[0-8]))))/i).test(navigator.userAgent) || (/AppleWebKit\/5([0-2]|3[0-2])/i).test(navigator.userAgent))),
                    hashChange: Boolean(!(('onhashchange' in window) || ('onhashchange' in document)) || (History.isInternetExplorer() && History.getInternetExplorerMajorVersion() < 8))
                };
            }
            History.enabled = !History.emulated.pushState;
            History.bugs = {
                setHash: Boolean(!History.emulated.pushState && navigator.vendor === 'Apple Computer, Inc.' && /AppleWebKit\/5([0-2]|3[0-3])/.test(navigator.userAgent)),
                safariPoll: Boolean(!History.emulated.pushState && navigator.vendor === 'Apple Computer, Inc.' && /AppleWebKit\/5([0-2]|3[0-3])/.test(navigator.userAgent)),
                ieDoubleCheck: Boolean(History.isInternetExplorer() && History.getInternetExplorerMajorVersion() < 8),
                hashEscape: Boolean(History.isInternetExplorer() && History.getInternetExplorerMajorVersion() < 7)
            };
            History.isEmptyObject = function (obj) {
                for (var name in obj) {
                    if (obj.hasOwnProperty(name)) {
                        return false;
                    }
                }
                return true;
            };
            History.cloneObject = function (obj) {
                var hash, newObj;
                if (obj) {
                    hash = JSON.stringify(obj);
                    newObj = JSON.parse(hash);
                }
                else {
                    newObj = {};
                }
                return newObj;
            };
            History.getRootUrl = function () {
                var rootUrl = document.location.protocol + '//' + (document.location.hostname || document.location.host);
                if (document.location.port || false) {
                    rootUrl += ':' + document.location.port;
                }
                rootUrl += '/';
                return rootUrl;
            };
            History.getBaseHref = function () {
                var
                baseElements = document.getElementsByTagName('base'),
                    baseElement = null,
                    baseHref = '';
                if (baseElements.length === 1) {
                        baseElement = baseElements[0];
                        baseHref = baseElement.href.replace(/[^\/]+$/, '');
                    }
                baseHref = baseHref.replace(/\/+$/, '');
                if (baseHref) baseHref += '/';
                return baseHref;
            };
            History.getBaseUrl = function () {
                var baseUrl = History.getBaseHref() || History.getBasePageUrl() || History.getRootUrl();
                return baseUrl;
            };
            History.getPageUrl = function () {
                var
                State = History.getState(false, false),
                    stateUrl = (State || {}).url || History.getLocationHref(),
                    pageUrl;
                pageUrl = stateUrl.replace(/\/+$/, '').replace(/[^\/]+$/, function (part, index, string) {
                        return (/\./).test(part) ? part : part + '/';
                    });
                return pageUrl;
            };
            History.getBasePageUrl = function () {
                var basePageUrl = (History.getLocationHref()).replace(/[#\?].*/, '').replace(/[^\/]+$/, function (part, index, string) {
                    return (/[^\/]$/).test(part) ? '' : part;
                }).replace(/\/+$/, '') + '/';
                return basePageUrl;
            };
            History.getFullUrl = function (url, allowBaseHref) {
                var fullUrl = url,
                    firstChar = url.substring(0, 1);
                allowBaseHref = (typeof allowBaseHref === 'undefined') ? true : allowBaseHref;
                if (/[a-z]+\:\/\//.test(url)) {} else if (firstChar === '/') {
                        fullUrl = History.getRootUrl() + url.replace(/^\/+/, '');
                    }
                else if (firstChar === '#') {
                        fullUrl = History.getPageUrl().replace(/#.*/, '') + url;
                    }
                else if (firstChar === '?') {
                        fullUrl = History.getPageUrl().replace(/[\?#].*/, '') + url;
                    }
                else {
                        if (allowBaseHref) {
                            fullUrl = History.getBaseUrl() + url.replace(/^(\.\/)+/, '');
                        } else {
                            fullUrl = History.getBasePageUrl() + url.replace(/^(\.\/)+/, '');
                        }
                    }
                return fullUrl.replace(/\#$/, '');
            };
            History.getShortUrl = function (url) {
                var shortUrl = url,
                    baseUrl = History.getBaseUrl(),
                    rootUrl = History.getRootUrl();
                if (History.emulated.pushState) {
                        shortUrl = shortUrl.replace(baseUrl, '');
                    }
                shortUrl = shortUrl.replace(rootUrl, '/');
                if (History.isTraditionalAnchor(shortUrl)) {
                        shortUrl = './' + shortUrl;
                    }
                shortUrl = shortUrl.replace(/^(\.\/)+/g, './').replace(/\#$/, '');
                return shortUrl;
            };
            History.getLocationHref = function (doc) {
                doc = doc || document;
                if (doc.URL === doc.location.href) return doc.location.href;
                if (doc.location.href === decodeURIComponent(doc.URL)) return doc.URL;
                if (doc.location.hash && decodeURIComponent(doc.location.href.replace(/^[^#]+/, "")) === doc.location.hash) return doc.location.href;
                if (doc.URL.indexOf('#') == -1 && doc.location.href.indexOf('#') != -1) return doc.location.href;
                return doc.URL || doc.location.href;
            };
            History.store = {};
            History.idToState = History.idToState || {};
            History.stateToId = History.stateToId || {};
            History.urlToId = History.urlToId || {};
            History.storedStates = History.storedStates || [];
            History.savedStates = History.savedStates || [];
            History.normalizeStore = function () {
                History.store.idToState = History.store.idToState || {};
                History.store.urlToId = History.store.urlToId || {};
                History.store.stateToId = History.store.stateToId || {};
            };
            History.getState = function (friendly, create) {
                if (typeof friendly === 'undefined') {
                    friendly = true;
                }
                if (typeof create === 'undefined') {
                    create = true;
                }
                var State = History.getLastSavedState();
                if (!State && create) {
                    State = History.createStateObject();
                }
                if (friendly) {
                    State = History.cloneObject(State);
                    State.url = State.cleanUrl || State.url;
                }
                return State;
            };
            History.getIdByState = function (newState) {
                var id = History.extractId(newState.url),
                    str;
                if (!id) {
                        str = History.getStateString(newState);
                        if (typeof History.stateToId[str] !== 'undefined') {
                            id = History.stateToId[str];
                        }
                        else if (typeof History.store.stateToId[str] !== 'undefined') {
                            id = History.store.stateToId[str];
                        }
                        else {
                            while (true) {
                                id = (new Date()).getTime() + String(Math.random()).replace(/\D/g, '');
                                if (typeof History.idToState[id] === 'undefined' && typeof History.store.idToState[id] === 'undefined') {
                                    break;
                                }
                            }
                            History.stateToId[str] = id;
                            History.idToState[id] = newState;
                        }
                    }
                return id;
            };
            History.normalizeState = function (oldState) {
                var newState, dataNotEmpty;
                if (!oldState || (typeof oldState !== 'object')) {
                    oldState = {};
                }
                if (typeof oldState.normalized !== 'undefined') {
                    return oldState;
                }
                if (!oldState.data || (typeof oldState.data !== 'object')) {
                    oldState.data = {};
                }
                newState = {};
                newState.normalized = true;
                newState.title = oldState.title || '';
                newState.url = History.getFullUrl(oldState.url ? oldState.url : (History.getLocationHref()));
                newState.hash = History.getShortUrl(newState.url);
                newState.data = History.cloneObject(oldState.data);
                newState.id = History.getIdByState(newState);
                newState.cleanUrl = newState.url.replace(/\??\&_suid.*/, '');
                newState.url = newState.cleanUrl;
                dataNotEmpty = !History.isEmptyObject(newState.data);
                if ((newState.title || dataNotEmpty) && History.options.disableSuid !== true) {
                    newState.hash = History.getShortUrl(newState.url).replace(/\??\&_suid.*/, '');
                    if (!/\?/.test(newState.hash)) {
                        newState.hash += '?';
                    }
                    newState.hash += '&_suid=' + newState.id;
                }
                newState.hashedUrl = History.getFullUrl(newState.hash);
                if ((History.emulated.pushState || History.bugs.safariPoll) && History.hasUrlDuplicate(newState)) {
                    newState.url = newState.hashedUrl;
                }
                return newState;
            };
            History.createStateObject = function (data, title, url) {
                var State = {
                    'data': data,
                    'title': title,
                    'url': url
                };
                State = History.normalizeState(State);
                return State;
            };
            History.getStateById = function (id) {
                id = String(id);
                var State = History.idToState[id] || History.store.idToState[id] || undefined;
                return State;
            };
            History.getStateString = function (passedState) {
                var State, cleanedState, str;
                State = History.normalizeState(passedState);
                cleanedState = {
                    data: State.data,
                    title: passedState.title,
                    url: passedState.url
                };
                str = JSON.stringify(cleanedState);
                return str;
            };
            History.getStateId = function (passedState) {
                var State, id;
                State = History.normalizeState(passedState);
                id = State.id;
                return id;
            };
            History.getHashByState = function (passedState) {
                var State, hash;
                State = History.normalizeState(passedState);
                hash = State.hash;
                return hash;
            };
            History.extractId = function (url_or_hash) {
                var id, parts, url, tmp;
                if (url_or_hash.indexOf('#') != -1) {
                    tmp = url_or_hash.split("#")[0];
                }
                else {
                    tmp = url_or_hash;
                }
                parts = /(.*)\&_suid=([0-9]+)$/.exec(tmp);
                url = parts ? (parts[1] || url_or_hash) : url_or_hash;
                id = parts ? String(parts[2] || '') : '';
                return id || false;
            };
            History.isTraditionalAnchor = function (url_or_hash) {
                var isTraditional = !(/[\/\?\.]/.test(url_or_hash));
                return isTraditional;
            };
            History.extractState = function (url_or_hash, create) {
                var State = null,
                    id, url;
                create = create || false;
                id = History.extractId(url_or_hash);
                if (id) {
                        State = History.getStateById(id);
                    }
                if (!State) {
                        url = History.getFullUrl(url_or_hash);
                        id = History.getIdByUrl(url) || false;
                        if (id) {
                            State = History.getStateById(id);
                        }
                        if (!State && create && !History.isTraditionalAnchor(url_or_hash)) {
                            State = History.createStateObject(null, null, url);
                        }
                    }
                return State;
            };
            History.getIdByUrl = function (url) {
                var id = History.urlToId[url] || History.store.urlToId[url] || undefined;
                return id;
            };
            History.getLastSavedState = function () {
                return History.savedStates[History.savedStates.length - 1] || undefined;
            };
            History.getLastStoredState = function () {
                return History.storedStates[History.storedStates.length - 1] || undefined;
            };
            History.hasUrlDuplicate = function (newState) {
                var hasDuplicate = false,
                    oldState;
                oldState = History.extractState(newState.url);
                hasDuplicate = oldState && oldState.id !== newState.id;
                return hasDuplicate;
            };
            History.storeState = function (newState) {
                History.urlToId[newState.url] = newState.id;
                History.storedStates.push(History.cloneObject(newState));
                return newState;
            };
            History.isLastSavedState = function (newState) {
                var isLast = false,
                    newId, oldState, oldId;
                if (History.savedStates.length) {
                        newId = newState.id;
                        oldState = History.getLastSavedState();
                        oldId = oldState.id;
                        isLast = (newId === oldId);
                    }
                return isLast;
            };
            History.saveState = function (newState) {
                if (History.isLastSavedState(newState)) {
                    return false;
                }
                History.savedStates.push(History.cloneObject(newState));
                return true;
            };
            History.getStateByIndex = function (index) {
                var State = null;
                if (typeof index === 'undefined') {
                    State = History.savedStates[History.savedStates.length - 1];
                }
                else if (index < 0) {
                    State = History.savedStates[History.savedStates.length + index];
                }
                else {
                    State = History.savedStates[index];
                }
                return State;
            };
            History.getCurrentIndex = function () {
                var index = null;
                if (History.savedStates.length < 1) {
                    index = 0;
                }
                else {
                    index = History.savedStates.length - 1;
                }
                return index;
            };
            History.getHash = function (doc) {
                var url = History.getLocationHref(doc),
                    hash;
                hash = History.getHashByUrl(url);
                return hash;
            };
            History.unescapeHash = function (hash) {
                var result = History.normalizeHash(hash);
                result = decodeURIComponent(result);
                return result;
            };
            History.normalizeHash = function (hash) {
                var result = hash.replace(/[^#]*#/, '').replace(/#.*/, '');
                return result;
            };
            History.setHash = function (hash, queue) {
                var State, pageUrl;
                if (queue !== false && History.busy()) {
                    History.pushQueue({
                        scope: History,
                        callback: History.setHash,
                        args: arguments,
                        queue: queue
                    });
                    return false;
                }
                History.busy(true);
                State = History.extractState(hash, true);
                if (State && !History.emulated.pushState) {
                    History.pushState(State.data, State.title, State.url, false);
                }
                else if (History.getHash() !== hash) {
                    if (History.bugs.setHash) {
                        pageUrl = History.getPageUrl();
                        History.pushState(null, null, pageUrl + '#' + hash, false);
                    }
                    else {
                        document.location.hash = hash;
                    }
                }
                return History;
            };
            History.escapeHash = function (hash) {
                var result = History.normalizeHash(hash);
                result = window.encodeURIComponent(result);
                if (!History.bugs.hashEscape) {
                    result = result.replace(/\%21/g, '!').replace(/\%26/g, '&').replace(/\%3D/g, '=').replace(/\%3F/g, '?');
                }
                return result;
            };
            History.getHashByUrl = function (url) {
                var hash = String(url).replace(/([^#]*)#?([^#]*)#?(.*)/, '$2');
                hash = History.unescapeHash(hash);
                return hash;
            };
            History.setTitle = function (newState) {
                var title = newState.title,
                    firstState;
                if (!title) {
                        firstState = History.getStateByIndex(0);
                        if (firstState && firstState.url === newState.url) {
                            title = firstState.title || History.options.initialTitle;
                        }
                    }
                try {
                        document.getElementsByTagName('title')[0].innerHTML = title.replace('<', '&lt;').replace('>', '&gt;').replace(' & ', ' &amp; ');
                    }
                catch (Exception) {}
                document.title = title;
                return History;
            };
            History.queues = [];
            History.busy = function (value) {
                if (typeof value !== 'undefined') {
                    History.busy.flag = value;
                }
                else if (typeof History.busy.flag === 'undefined') {
                    History.busy.flag = false;
                }
                if (!History.busy.flag) {
                    clearTimeout(History.busy.timeout);
                    var fireNext = function () {
                        var i, queue, item;
                        if (History.busy.flag) return;
                        for (i = History.queues.length - 1; i >= 0; --i) {
                            queue = History.queues[i];
                            if (queue.length === 0) continue;
                            item = queue.shift();
                            History.fireQueueItem(item);
                            History.busy.timeout = setTimeout(fireNext, History.options.busyDelay);
                        }
                    };
                    History.busy.timeout = setTimeout(fireNext, History.options.busyDelay);
                }
                return History.busy.flag;
            };
            History.busy.flag = false;
            History.fireQueueItem = function (item) {
                return item.callback.apply(item.scope || History, item.args || []);
            };
            History.pushQueue = function (item) {
                History.queues[item.queue || 0] = History.queues[item.queue || 0] || [];
                History.queues[item.queue || 0].push(item);
                return History;
            };
            History.queue = function (item, queue) {
                if (typeof item === 'function') {
                    item = {
                        callback: item
                    };
                }
                if (typeof queue !== 'undefined') {
                    item.queue = queue;
                }
                if (History.busy()) {
                    History.pushQueue(item);
                } else {
                    History.fireQueueItem(item);
                }
                return History;
            };
            History.clearQueue = function () {
                History.busy.flag = false;
                History.queues = [];
                return History;
            };
            History.stateChanged = false;
            History.doubleChecker = false;
            History.doubleCheckComplete = function () {
                History.stateChanged = true;
                History.doubleCheckClear();
                return History;
            };
            History.doubleCheckClear = function () {
                if (History.doubleChecker) {
                    clearTimeout(History.doubleChecker);
                    History.doubleChecker = false;
                }
                return History;
            };
            History.doubleCheck = function (tryAgain) {
                History.stateChanged = false;
                History.doubleCheckClear();
                if (History.bugs.ieDoubleCheck) {
                    History.doubleChecker = setTimeout(function () {
                        History.doubleCheckClear();
                        if (!History.stateChanged) {
                            tryAgain();
                        }
                        return true;
                    }, History.options.doubleCheckInterval);
                }
                return History;
            };
            History.safariStatePoll = function () {
                var
                urlState = History.extractState(History.getLocationHref()),
                    newState;
                if (!History.isLastSavedState(urlState)) {
                        newState = urlState;
                    }
                else {
                        return;
                    }
                if (!newState) {
                        newState = History.createStateObject();
                    }
                History.Adapter.trigger(window, 'popstate');
                return History;
            };
            History.back = function (queue) {
                if (queue !== false && History.busy()) {
                    History.pushQueue({
                        scope: History,
                        callback: History.back,
                        args: arguments,
                        queue: queue
                    });
                    return false;
                }
                History.busy(true);
                History.doubleCheck(function () {
                    History.back(false);
                });
                history.go(-1);
                return true;
            };
            History.forward = function (queue) {
                if (queue !== false && History.busy()) {
                    History.pushQueue({
                        scope: History,
                        callback: History.forward,
                        args: arguments,
                        queue: queue
                    });
                    return false;
                }
                History.busy(true);
                History.doubleCheck(function () {
                    History.forward(false);
                });
                history.go(1);
                return true;
            };
            History.go = function (index, queue) {
                var i;
                if (index > 0) {
                    for (i = 1; i <= index; ++i) {
                        History.forward(queue);
                    }
                }
                else if (index < 0) {
                    for (i = -1; i >= index; --i) {
                        History.back(queue);
                    }
                }
                else {
                    throw new Error('History.go: History.go requires a positive or negative integer passed.');
                }
                return History;
            };
            if (History.emulated.pushState) {
                var emptyFunction = function () {};
                History.pushState = History.pushState || emptyFunction;
                History.replaceState = History.replaceState || emptyFunction;
            }
            else {
                History.onPopState = function (event, extra) {
                    var stateId = false,
                        newState = false,
                        currentHash, currentState;
                    History.doubleCheckComplete();
                    currentHash = History.getHash();
                    if (currentHash) {
                            currentState = History.extractState(currentHash || History.getLocationHref(), true);
                            if (currentState) {
                                History.replaceState(currentState.data, currentState.title, currentState.url, false);
                            }
                            else {
                                History.Adapter.trigger(window, 'anchorchange');
                                History.busy(false);
                            }
                            History.expectedStateId = false;
                            return false;
                        }
                    stateId = History.Adapter.extractEventData('state', event, extra) || false;
                    if (stateId) {
                            newState = History.getStateById(stateId);
                        }
                    else if (History.expectedStateId) {
                            newState = History.getStateById(History.expectedStateId);
                        }
                    else {
                            newState = History.extractState(History.getLocationHref());
                        }
                    if (!newState) {
                            newState = History.createStateObject(null, null, History.getLocationHref());
                        }
                    History.expectedStateId = false;
                    if (History.isLastSavedState(newState)) {
                            History.busy(false);
                            return false;
                        }
                    History.storeState(newState);
                    History.saveState(newState);
                    History.setTitle(newState);
                    History.Adapter.trigger(window, 'statechange');
                    History.busy(false);
                    return true;
                };
                History.Adapter.bind(window, 'popstate', History.onPopState);
                History.pushState = function (data, title, url, queue) {
                    if (History.getHashByUrl(url) && History.emulated.pushState) {
                        throw new Error('History.js does not support states with fragement-identifiers (hashes/anchors).');
                    }
                    if (queue !== false && History.busy()) {
                        History.pushQueue({
                            scope: History,
                            callback: History.pushState,
                            args: arguments,
                            queue: queue
                        });
                        return false;
                    }
                    History.busy(true);
                    var newState = History.createStateObject(data, title, url);
                    if (History.isLastSavedState(newState)) {
                        History.busy(false);
                    }
                    else {
                        History.storeState(newState);
                        History.expectedStateId = newState.id;
                        history.pushState(newState.id, newState.title, newState.url);
                        History.Adapter.trigger(window, 'popstate');
                    }
                    return true;
                };
                History.replaceState = function (data, title, url, queue) {
                    if (History.getHashByUrl(url) && History.emulated.pushState) {
                        throw new Error('History.js does not support states with fragement-identifiers (hashes/anchors).');
                    }
                    if (queue !== false && History.busy()) {
                        History.pushQueue({
                            scope: History,
                            callback: History.replaceState,
                            args: arguments,
                            queue: queue
                        });
                        return false;
                    }
                    History.busy(true);
                    var newState = History.createStateObject(data, title, url);
                    if (History.isLastSavedState(newState)) {
                        History.busy(false);
                    }
                    else {
                        History.storeState(newState);
                        History.expectedStateId = newState.id;
                        history.replaceState(newState.id, newState.title, newState.url);
                        History.Adapter.trigger(window, 'popstate');
                    }
                    return true;
                };
            }
            if (sessionStorage) {
                try {
                    History.store = JSON.parse(sessionStorage.getItem('History.store')) || {};
                }
                catch (err) {
                    History.store = {};
                }
                History.normalizeStore();
            }
            else {
                History.store = {};
                History.normalizeStore();
            }
            History.Adapter.bind(window, "unload", History.clearAllIntervals);
            History.saveState(History.storeState(History.extractState(History.getLocationHref(), true)));
            if (sessionStorage) {
                History.onUnload = function () {
                    var currentStore, item, currentStoreString;
                    try {
                        currentStore = JSON.parse(sessionStorage.getItem('History.store')) || {};
                    }
                    catch (err) {
                        currentStore = {};
                    }
                    currentStore.idToState = currentStore.idToState || {};
                    currentStore.urlToId = currentStore.urlToId || {};
                    currentStore.stateToId = currentStore.stateToId || {};
                    for (item in History.idToState) {
                        if (!History.idToState.hasOwnProperty(item)) {
                            continue;
                        }
                        currentStore.idToState[item] = History.idToState[item];
                    }
                    for (item in History.urlToId) {
                        if (!History.urlToId.hasOwnProperty(item)) {
                            continue;
                        }
                        currentStore.urlToId[item] = History.urlToId[item];
                    }
                    for (item in History.stateToId) {
                        if (!History.stateToId.hasOwnProperty(item)) {
                            continue;
                        }
                        currentStore.stateToId[item] = History.stateToId[item];
                    }
                    History.store = currentStore;
                    History.normalizeStore();
                    currentStoreString = JSON.stringify(currentStore);
                    try {
                        sessionStorage.setItem('History.store', currentStoreString);
                    }
                    catch (e) {
                        if (e.code === DOMException.QUOTA_EXCEEDED_ERR) {
                            if (sessionStorage.length) {
                                sessionStorage.removeItem('History.store');
                                sessionStorage.setItem('History.store', currentStoreString);
                            } else {}
                        } else {
                            throw e;
                        }
                    }
                };
                History.intervalList.push(setInterval(History.onUnload, History.options.storeInterval));
                History.Adapter.bind(window, 'beforeunload', History.onUnload);
                History.Adapter.bind(window, 'unload', History.onUnload);
            }
            if (!History.emulated.pushState) {
                if (History.bugs.safariPoll) {
                    History.intervalList.push(setInterval(History.safariStatePoll, History.options.safariPollInterval));
                }
                if (navigator.vendor === 'Apple Computer, Inc.' || (navigator.appCodeName || '') === 'Mozilla') {
                    History.Adapter.bind(window, 'hashchange', function () {
                        History.Adapter.trigger(window, 'popstate');
                    });
                    if (History.getHash()) {
                        History.Adapter.onDomLoad(function () {
                            History.Adapter.trigger(window, 'hashchange');
                        });
                    }
                }
            }
        };
    if (!History.options || !History.options.delayInit) {
            History.init();
        }
})(window);;
$(function () {
    $.extend({
        webchat: function (params) {
            var params = params || {},
                dialog = $(juicer(document.getElementById('qrcode_tmpl').innerHTML, params)).appendTo(document.body).easyModal({
                    autoOpen: true,
                    onClose: function () {
                        $(this).parent().remove();
                    },
                    onOpen: function () {}
                });
        }
    });
    $(document.body).on('click', '.wx_btn,.share-weixin', function () {
        $.webchat();
        return false;
    })
});; // Fluidbox
// Description: Replicating the seamless lightbox transition effect seen on Medium.com, with some improvements
// Version: 1.3.1a
// Author: Terry Mun
// Author URI: http://terrymun.com
// --------------------------------------------------------
//  Dependency: Paul Irish's jQuery debounced resize event
// --------------------------------------------------------
!
function (a, b) {
    var c = function (a, b, c) {
        var d;
        return function () {
            function g() {
                c || a.apply(e, f),
                d = null
            }
            var e = this,
                f = arguments;
            d ? clearTimeout(d) : c && a.apply(e, f),
            d = setTimeout(g, b || 100)
        }
    };
    jQuery.fn[b] = function (a) {
        return a ? this.bind("resize", c(a)) : this.trigger(b)
    }
}(jQuery, "smartresize");

// -----------------------------
//  Fluidbox plugin starts here
// -----------------------------
!
function (a) {
    a.fn.fluidbox = function (b) {
        var c = a.extend(!0, {
            viewportFill: .95,
            overlayColor: "rgba(255,255,255,.85)",
            debounceResize: !0,
            stackIndex: 1e3,
            stackIndexDelta: 10,
            closeTrigger: [{
                selector: ".fluidbox-overlay",
                event: "click"
            },
            {
                selector: "document",
                event: "keyup",
                keyCode: 27
            }]
        }, b);
        c.stackIndex < c.stackIndexDelta && (c.stackIndexDelta = c.stackIndex),
        $fbOverlay = a("<div />", {
            "class": "fluidbox-overlay",
            css: {
                "background-color": c.overlayColor,
                "z-index": c.stackIndex
            }
        });
        var f, d = this,
            e = a(window),
            g = function () {
                a(".fluidbox-opened").trigger("click")
            },
            h = function (a) {
                var b = a.find("img"),
                    c = a.find(".fluidbox-ghost"),
                    d = e.scrollTop() - b.offset().top + .5 * b.data("imgHeight") * (b.data("imgScale") - 1) + .5 * (e.height() - b.data("imgHeight") * b.data("imgScale")),
                    f = .5 * b.data("imgWidth") * (b.data("imgScale") - 1) + .5 * (e.width() - b.data("imgWidth") * b.data("imgScale")) - b.offset().left,
                    g = b.data("imgScale");
                c.css({
                        transform: "translate(" + parseInt(10 * f) / 10 + "px," + parseInt(10 * d) / 10 + "px) scale(" + parseInt(1e3 * g) / 1e3 + ")"
                    })
            },
            i = function () {
                d.each(function () {
                    j(a(this))
                })
            },
            j = function (a) {
                function i() {
                    h.imgWidth = b.width(),
                    h.imgHeight = b.height(),
                    h.imgRatio = b.width() / b.height(),
                    d.css({
                        width: b.width(),
                        height: b.height(),
                        top: b.offset().top - g.offset().top,
                        left: b.offset().left - g.offset().left
                    }),
                    h.imgScale = f > h.imgRatio ? e.height() * c.viewportFill / b.height() : e.width() * c.viewportFill / b.width()
                }
                if (f = e.width() / e.height(), a.hasClass("fluidbox")) {
                    var b = a.find("img"),
                        d = a.find(".fluidbox-ghost"),
                        g = a.find(".fluidbox-wrap"),
                        h = b.data();
                    i(),
                    b.load(i)
                }
            },
            k = function (b) {
                if (a(this).hasClass("fluidbox")) {
                    var d = a(this),
                        e = a(this).find("img"),
                        f = a(this).find(".fluidbox-ghost"),
                        g = a(this).find(".fluidbox-wrap"),
                        i = {};
                    0 !== a(this).data("fluidbox-state") && a(this).data("fluidbox-state") ? (d.data("fluidbox-state", 0).removeClass("fluidbox-opened").addClass("fluidbox-closed"), i.open && window.clearTimeout(i.open), i.close = window.setTimeout(function () {
                            a(".fluidbox-overlay").remove(),
                            g.css({
                                "z-index": c.stackIndex - c.stackIndexDelta
                            })
                        }, 10), a(".fluidbox-overlay").css({
                            opacity: 0
                        }), f.css({
                            transform: "translate(0,0) scale(1)"
                        }).one("webkitTransitionEnd transitionend oTransitionEnd MSTransitionEnd transitionEnd", function () {
                            e.css({
                                opacity: 1
                            }),
                            i.hideGhost = window.setTimeout(function () {
                                f.css({
                                    opacity: 0
                                })
                            }, 100)
                        })) : a("<img />", {
                            src: e.attr("src")
                        }).load(function () {
                            d.append($fbOverlay).data("fluidbox-state", 1).removeClass("fluidbox-closed").addClass("fluidbox-opened"),
                            i.close && window.clearTimeout(i.close),
                            i.hideGhost && window.clearTimeout(i.hideGhost),
                            i.open = window.setTimeout(function () {
                                a(".fluidbox-overlay").css({
                                    opacity: 1
                                })
                            }, 10),
                            g.css({
                                "z-index": c.stackIndex + c.stackIndexDelta
                            }),
                            f.off("webkitTransitionEnd transitionend oTransitionEnd MSTransitionEnd transitionEnd").css({
                                "background-image": "url(" + e.attr("src") + ")",
                                opacity: 1
                            }),
                            e.css({
                                opacity: 0
                            }),
                            a("<img />", {
                                src: d.attr("href")
                            }).load(function () {
                                f.css({
                                    "background-image": "url(" + d.attr("href") + ")"
                                })
                            }),
                            h(d)
                        }),
                    b.preventDefault()
                }
            };
        c.closeTrigger && a.each(c.closeTrigger, function (b) {
                var d = c.closeTrigger[b];
                "window" != d.selector ? "document" == d.selector ? d.keyCode ? a(document).on(d.event, function (a) {
                    a.keyCode == d.keyCode && g()
                }) : a(document).on(d.event, g) : a(document).on(d.event, c.closeTrigger[b].selector, g) : e.on(d.event, g)
            }),
        d.each(function () {
                if (a(this).is("a") && 1 === a(this).children().length && a(this).children().is("img")) {
                    var d = a("<div />", {
                        "class": "fluidbox-wrap",
                        css: {
                            "z-index": c.stackIndex - c.stackIndexDelta
                        }
                    }),
                        e = a(this);
                    e.addClass("fluidbox").wrapInner(d).find("img").css({
                            opacity: 1
                        }).after('<div class="fluidbox-ghost" />').each(function () {
                            var b = a(this);
                            b.width() > 0 && b.height() > 0 ? (j(e), e.click(k)) : b.load(function () {
                                j(e),
                                e.click(k)
                            })
                        })
                }
            });
        var l = function () {
                i();
                var b = a("a.fluidbox.fluidbox-opened");
                b.length > 0 && h(b)
            };
        return c.debounceResize ? a(window).smartresize(l) : a(window).resize(l),
        d
    }
}(jQuery);;
(function () {
    var $, Controller, Events, Log, Model, Module, Spine, createObject, isArray, isBlank, makeArray, moduleKeywords, __slice = [].slice,
        __indexOf = [].indexOf ||
    function (item) {
            for (var i = 0, l = this.length; i < l; i++) {
                if (i in this && this[i] === item) return i;
            }
            return -1;
        },
        __hasProp = {}.hasOwnProperty,
        __extends = function (child, parent) {
            for (var key in parent) {
                if (__hasProp.call(parent, key)) child[key] = parent[key];
            }

            function ctor() {
                this.constructor = child;
            }
            ctor.prototype = parent.prototype;
            child.prototype = new ctor();
            child.__super__ = parent.prototype;
            return child;
        },
        __bind = function (fn, me) {
            return function () {
                return fn.apply(me, arguments);
            };
        };
    Events = {
            bind: function (ev, callback) {
                var evs, name, _base, _i, _len;
                evs = ev.split(' ');
                if (!(this.hasOwnProperty('_callbacks') && this._callbacks)) {
                    this._callbacks = {};
                }
                for (_i = 0, _len = evs.length; _i < _len; _i++) {
                    name = evs[_i];
                    (_base = this._callbacks)[name] || (_base[name] = []);
                    this._callbacks[name].push(callback);
                }
                return this;
            },
            one: function (ev, callback) {
                var handler;
                return this.bind(ev, handler = function () {
                    this.unbind(ev, handler);
                    return callback.apply(this, arguments);
                });
            },
            trigger: function () {
                var args, callback, ev, list, _i, _len, _ref;
                args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
                ev = args.shift();
                list = this.hasOwnProperty('_callbacks') && ((_ref = this._callbacks) != null ? _ref[ev] : void 0);
                if (!list) {
                    return;
                }
                for (_i = 0, _len = list.length; _i < _len; _i++) {
                    callback = list[_i];
                    if (callback.apply(this, args) === false) {
                        break;
                    }
                }
                return true;
            },
            listenTo: function (obj, ev, callback) {
                obj.bind(ev, callback);
                this.listeningTo || (this.listeningTo = []);
                this.listeningTo.push({
                    obj: obj,
                    ev: ev,
                    callback: callback
                });
                return this;
            },
            listenToOnce: function (obj, ev, callback) {
                var handler, listeningToOnce;
                listeningToOnce = this.listeningToOnce || (this.listeningToOnce = []);
                obj.bind(ev, handler = function () {
                    var i, idx, lt, _i, _len;
                    idx = -1;
                    for (i = _i = 0, _len = listeningToOnce.length; _i < _len; i = ++_i) {
                        lt = listeningToOnce[i];
                        if (lt.obj === obj) {
                            if (lt.ev === ev && lt.callback === callback) {
                                idx = i;
                            }
                        }
                    }
                    obj.unbind(ev, handler);
                    if (idx !== -1) {
                        listeningToOnce.splice(idx, 1);
                    }
                    return callback.apply(this, arguments);
                });
                listeningToOnce.push({
                    obj: obj,
                    ev: ev,
                    callback: callback,
                    handler: handler
                });
                return this;
            },
            stopListening: function (obj, events, callback) {
                var e, ev, evts, idx, listeningTo, lt, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _results;
                if (arguments.length === 0) {
                    _ref = [this.listeningTo, this.listeningToOnce];
                    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                        listeningTo = _ref[_i];
                        if (!listeningTo) {
                            continue;
                        }
                        for (_j = 0, _len1 = listeningTo.length; _j < _len1; _j++) {
                            lt = listeningTo[_j];
                            lt.obj.unbind(lt.ev, lt.handler || lt.callback);
                        }
                    }
                    this.listeningTo = void 0;
                    return this.listeningToOnce = void 0;
                }
                else if (obj) {
                    _ref1 = [this.listeningTo, this.listeningToOnce];
                    _results = [];
                    for (_k = 0, _len2 = _ref1.length; _k < _len2; _k++) {
                        listeningTo = _ref1[_k];
                        if (!listeningTo) {
                            continue;
                        }
                        events = events ? events.split(' ') : [void 0];
                        _results.push((function () {
                            var _l, _len3, _results1;
                            _results1 = [];
                            for (_l = 0, _len3 = events.length; _l < _len3; _l++) {
                                ev = events[_l];
                                _results1.push((function () {
                                    var _m, _ref2, _results2;
                                    _results2 = [];
                                    for (idx = _m = _ref2 = listeningTo.length - 1; _ref2 <= 0 ? _m <= 0 : _m >= 0; idx = _ref2 <= 0 ? ++_m : --_m) {
                                        lt = listeningTo[idx];
                                        if (callback && (lt.handler || lt.callback) !== callback) {
                                            continue;
                                        }
                                        if ((!ev) || (ev === lt.ev)) {
                                            lt.obj.unbind(lt.ev, lt.handler || lt.callback);
                                            if (idx !== -1) {
                                                _results2.push(listeningTo.splice(idx, 1));
                                            }
                                            else {
                                                _results2.push(void 0);
                                            }
                                        }
                                        else if (ev) {
                                            evts = lt.ev.split(' ');
                                            if (__indexOf.call(evts, ev) >= 0) {
                                                evts = (function () {
                                                    var _len4, _n, _results3;
                                                    _results3 = [];
                                                    for (_n = 0, _len4 = evts.length; _n < _len4; _n++) {
                                                        e = evts[_n];
                                                        if (e !== ev) {
                                                            _results3.push(e);
                                                        }
                                                    }
                                                    return _results3;
                                                })();
                                                lt.ev = $.trim(evts.join(' '));
                                                _results2.push(lt.obj.unbind(ev, lt.handler || lt.callback));
                                            }
                                            else {
                                                _results2.push(void 0);
                                            }
                                        }
                                        else {
                                            _results2.push(void 0);
                                        }
                                    }
                                    return _results2;
                                })());
                            }
                            return _results1;
                        })());
                    }
                    return _results;
                }
            },
            unbind: function (ev, callback) {
                var cb, evs, i, list, name, _i, _j, _len, _len1, _ref;
                if (arguments.length === 0) {
                    this._callbacks = {};
                    return this;
                }
                if (!ev) {
                    return this;
                }
                evs = ev.split(' ');
                for (_i = 0, _len = evs.length; _i < _len; _i++) {
                    name = evs[_i];
                    list = (_ref = this._callbacks) != null ? _ref[name] : void 0;
                    if (!list) {
                        continue;
                    }
                    if (!callback) {
                        delete this._callbacks[name];
                        continue;
                    }
                    for (i = _j = 0, _len1 = list.length; _j < _len1; i = ++_j) {
                        cb = list[i];
                        if (!(cb === callback)) {
                            continue;
                        }
                        list = list.slice();
                        list.splice(i, 1);
                        this._callbacks[name] = list;
                        break;
                    }
                }
                return this;
            }
        };
    Events.on = Events.bind;
    Events.off = Events.unbind;
    Log = {
            trace: true,
            logPrefix: '(App)',
            log: function () {
                var args;
                args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
                if (!this.trace) {
                    return;
                }
                if (this.logPrefix) {
                    args.unshift(this.logPrefix);
                }
                if (typeof console !== "undefined" && console !== null) {
                    if (typeof console.log === "function") {
                        console.log.apply(console, args);
                    }
                }
                return this;
            }
        };
    moduleKeywords = ['included', 'extended'];
    Module = (function () {
            Module.include = function (obj) {
                var key, value, _ref;
                if (!obj) {
                    throw new Error('include(obj) requires obj');
                }
                for (key in obj) {
                    value = obj[key];
                    if (__indexOf.call(moduleKeywords, key) < 0) {
                        this.prototype[key] = value;
                    }
                }
                if ((_ref = obj.included) != null) {
                    _ref.apply(this);
                }
                return this;
            };
            Module.extend = function (obj) {
                var key, value, _ref;
                if (!obj) {
                    throw new Error('extend(obj) requires obj');
                }
                for (key in obj) {
                    value = obj[key];
                    if (__indexOf.call(moduleKeywords, key) < 0) {
                        this[key] = value;
                    }
                }
                if ((_ref = obj.extended) != null) {
                    _ref.apply(this);
                }
                return this;
            };
            Module.proxy = function (func) {
                return (function (_this) {
                    return function () {
                        return func.apply(_this, arguments);
                    };
                })(this);
            };
            Module.prototype.proxy = function (func) {
                return (function (_this) {
                    return function () {
                        return func.apply(_this, arguments);
                    };
                })(this);
            };

            function Module() {
                if (typeof this.init === "function") {
                    this.init.apply(this, arguments);
                }
            }
            return Module;
        })();
    Model = (function (_super) {
            __extends(Model, _super);
            Model.extend(Events);
            Model.records = [];
            Model.irecords = {};
            Model.attributes = [];
            Model.configure = function () {
                var attributes, name;
                name = arguments[0],
                attributes = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
                this.className = name;
                this.deleteAll();
                if (attributes.length) {
                    this.attributes = attributes;
                }
                this.attributes && (this.attributes = makeArray(this.attributes));
                this.attributes || (this.attributes = []);
                this.unbind();
                return this;
            };
            Model.toString = function () {
                return "" + this.className + "(" + (this.attributes.join(", ")) + ")";
            };
            Model.find = function (id, notFound) {
                var _ref;
                if (notFound == null) {
                    notFound = this.notFound;
                }
                return ((_ref = this.irecords[id]) != null ? _ref.clone() : void 0) || (typeof notFound === "function" ? notFound(id) : void 0);
            };
            Model.findAll = function (ids, notFound) {
                var id, _i, _len, _results;
                _results = [];
                for (_i = 0, _len = ids.length; _i < _len; _i++) {
                    id = ids[_i];
                    if (this.find(id, notFound)) {
                        _results.push(this.find(id));
                    }
                }
                return _results;
            };
            Model.notFound = function (id) {
                return null;
            };
            Model.exists = function (id) {
                return Boolean(this.irecords[id]);
            };
            Model.addRecord = function (record, options) {
                var _base, _base1, _name, _name1;
                if (options == null) {
                    options = {};
                }
                if (record.id && this.irecords[record.id]) {
                    this.irecords[record.id].remove(options);
                    if (!options.clear) {
                        record = this.irecords[record.id].load(record);
                    }
                }
                record.id || (record.id = record.cid);
                if ((_base = this.irecords)[_name = record.id] == null) {
                    _base[_name] = record;
                }
                if ((_base1 = this.irecords)[_name1 = record.cid] == null) {
                    _base1[_name1] = record;
                }
                return this.records.push(record);
            };
            Model.refresh = function (values, options) {
                var record, records, result, _i, _len;
                if (options == null) {
                    options = {};
                }
                if (options.clear) {
                    this.deleteAll();
                }
                records = this.fromJSON(values);
                if (!isArray(records)) {
                    records = [records];
                }
                for (_i = 0, _len = records.length; _i < _len; _i++) {
                    record = records[_i];
                    this.addRecord(record, options);
                }
                this.sort();
                result = this.cloneArray(records);
                this.trigger('refresh', result, options);
                return result;
            };
            Model.select = function (callback) {
                var record, _i, _len, _ref, _results;
                _ref = this.records;
                _results = [];
                for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                    record = _ref[_i];
                    if (callback(record)) {
                        _results.push(record.clone());
                    }
                }
                return _results;
            };
            Model.findByAttribute = function (name, value) {
                var record, _i, _len, _ref;
                _ref = this.records;
                for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                    record = _ref[_i];
                    if (record[name] === value) {
                        return record.clone();
                    }
                }
                return null;
            };
            Model.findAllByAttribute = function (name, value) {
                return this.select(function (item) {
                    return item[name] === value;
                });
            };
            Model.each = function (callback) {
                var record, _i, _len, _ref, _results;
                _ref = this.records;
                _results = [];
                for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                    record = _ref[_i];
                    _results.push(callback(record.clone()));
                }
                return _results;
            };
            Model.all = function () {
                return this.cloneArray(this.records);
            };
            Model.slice = function (begin, end) {
                if (begin == null) {
                    begin = 0;
                }
                return this.cloneArray(this.records.slice(begin, end));
            };
            Model.first = function (end) {
                var _ref;
                if (end == null) {
                    end = 1;
                }
                if (end > 1) {
                    return this.cloneArray(this.records.slice(0, end));
                }
                else {
                    return (_ref = this.records[0]) != null ? _ref.clone() : void 0;
                }
            };
            Model.last = function (begin) {
                var _ref;
                if (typeof begin === 'number') {
                    return this.cloneArray(this.records.slice(-begin));
                }
                else {
                    return (_ref = this.records[this.records.length - 1]) != null ? _ref.clone() : void 0;
                }
            };
            Model.count = function () {
                return this.records.length;
            };
            Model.deleteAll = function () {
                this.records = [];
                return this.irecords = {};
            };
            Model.destroyAll = function (options) {
                var record, _i, _len, _ref, _results;
                _ref = this.records;
                _results = [];
                for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                    record = _ref[_i];
                    _results.push(record.destroy(options));
                }
                return _results;
            };
            Model.update = function (id, atts, options) {
                return this.find(id).updateAttributes(atts, options);
            };
            Model.create = function (atts, options) {
                var record;
                record = new this(atts);
                return record.save(options);
            };
            Model.destroy = function (id, options) {
                return this.find(id).destroy(options);
            };
            Model.change = function (callbackOrParams) {
                if (typeof callbackOrParams === 'function') {
                    return this.bind('change', callbackOrParams);
                }
                else {
                    return this.trigger.apply(this, ['change'].concat(__slice.call(arguments)));
                }
            };
            Model.fetch = function (callbackOrParams) {
                if (typeof callbackOrParams === 'function') {
                    return this.bind('fetch', callbackOrParams);
                }
                else {
                    return this.trigger.apply(this, ['fetch'].concat(__slice.call(arguments)));
                }
            };
            Model.toJSON = function () {
                return this.records;
            };
            Model.fromJSON = function (objects) {
                var value, _i, _len, _results;
                if (!objects) {
                    return;
                }
                if (typeof objects === 'string') {
                    objects = JSON.parse(objects);
                }
                if (isArray(objects)) {
                    _results = [];
                    for (_i = 0, _len = objects.length; _i < _len; _i++) {
                        value = objects[_i];
                        if (value instanceof this) {
                            _results.push(value);
                        }
                        else {
                            _results.push(new this(value));
                        }
                    }
                    return _results;
                }
                else {
                    if (objects instanceof this) {
                        return objects;
                    }
                    return new this(objects);
                }
            };
            Model.fromForm = function () {
                var _ref;
                return (_ref = new this).fromForm.apply(_ref, arguments);
            };
            Model.sort = function () {
                if (this.comparator) {
                    this.records.sort(this.comparator);
                }
                return this;
            };
            Model.cloneArray = function (array) {
                var value, _i, _len, _results;
                _results = [];
                for (_i = 0, _len = array.length; _i < _len; _i++) {
                    value = array[_i];
                    _results.push(value.clone());
                }
                return _results;
            };
            Model.idCounter = 0;
            Model.uid = function (prefix) {
                var uid;
                if (prefix == null) {
                    prefix = '';
                }
                uid = prefix + this.idCounter++;
                if (this.exists(uid)) {
                    uid = this.uid(prefix);
                }
                return uid;
            };

            function Model(atts) {
                Model.__super__.constructor.apply(this, arguments);
                if ((this.constructor.uuid != null) && typeof this.constructor.uuid === 'function') {
                    this.cid = this.constructor.uuid();
                    if (!this.id) {
                        this.id = this.cid;
                    }
                }
                else {
                    this.cid = (atts != null ? atts.cid : void 0) || this.constructor.uid('c-');
                }
                if (atts) {
                    this.load(atts);
                }
            }
            Model.prototype.isNew = function () {
                return !this.exists();
            };
            Model.prototype.isValid = function () {
                return !this.validate();
            };
            Model.prototype.validate = function () {};
            Model.prototype.load = function (atts) {
                var key, value;
                if (atts.id) {
                    this.id = atts.id;
                }
                for (key in atts) {
                    value = atts[key];
                    if (typeof this[key] === 'function') {
                        if (typeof value === 'function') {
                            continue;
                        }
                        this[key](value);
                    }
                    else {
                        this[key] = value;
                    }
                }
                return this;
            };
            Model.prototype.attributes = function () {
                var key, result, _i, _len, _ref;
                result = {};
                _ref = this.constructor.attributes;
                for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                    key = _ref[_i];
                    if (key in this) {
                        if (typeof this[key] === 'function') {
                            result[key] = this[key]();
                        }
                        else {
                            result[key] = this[key];
                        }
                    }
                }
                if (this.id) {
                    result.id = this.id;
                }
                return result;
            };
            Model.prototype.eql = function (rec) {
                return rec && rec.constructor === this.constructor && ((rec.cid === this.cid) || (rec.id && rec.id === this.id));
            };
            Model.prototype.save = function (options) {
                var error, record;
                if (options == null) {
                    options = {};
                }
                if (options.validate !== false) {
                    error = this.validate();
                    if (error) {
                        this.trigger('error', error);
                        return false;
                    }
                }
                this.trigger('beforeSave', options);
                record = this.isNew() ? this.create(options) : this.update(options);
                this.stripCloneAttrs();
                this.trigger('save', options);
                return record;
            };
            Model.prototype.stripCloneAttrs = function () {
                var key, value;
                if (this.hasOwnProperty('cid')) {
                    return;
                }
                for (key in this) {
                    if (!__hasProp.call(this, key)) continue;
                    value = this[key];
                    if (__indexOf.call(this.constructor.attributes, key) >= 0) {
                        delete this[key];
                    }
                }
                return this;
            };
            Model.prototype.updateAttribute = function (name, value, options) {
                var atts;
                atts = {};
                atts[name] = value;
                return this.updateAttributes(atts, options);
            };
            Model.prototype.updateAttributes = function (atts, options) {
                this.load(atts);
                return this.save(options);
            };
            Model.prototype.changeID = function (id) {
                var records;
                if (id === this.id) {
                    return;
                }
                records = this.constructor.irecords;
                records[id] = records[this.id];
                if (this.cid !== this.id) {
                    delete records[this.id];
                }
                this.id = id;
                return this.save();
            };
            Model.prototype.remove = function (options) {
                var i, record, records, _i, _len;
                if (options == null) {
                    options = {};
                }
                records = this.constructor.records.slice(0);
                for (i = _i = 0, _len = records.length; _i < _len; i = ++_i) {
                    record = records[i];
                    if (!(this.eql(record))) {
                        continue;
                    }
                    records.splice(i, 1);
                    break;
                }
                this.constructor.records = records;
                if (options.clear) {
                    delete this.constructor.irecords[this.id];
                    return delete this.constructor.irecords[this.cid];
                }
            };
            Model.prototype.destroy = function (options) {
                if (options == null) {
                    options = {};
                }
                if (options.clear == null) {
                    options.clear = true;
                }
                this.trigger('beforeDestroy', options);
                this.remove(options);
                this.destroyed = true;
                this.trigger('destroy', options);
                this.trigger('change', 'destroy', options);
                if (this.listeningTo) {
                    this.stopListening();
                }
                this.unbind();
                return this;
            };
            Model.prototype.dup = function (newRecord) {
                var atts;
                if (newRecord == null) {
                    newRecord = true;
                }
                atts = this.attributes();
                if (newRecord) {
                    delete atts.id;
                }
                else {
                    atts.cid = this.cid;
                }
                return new this.constructor(atts);
            };
            Model.prototype.clone = function () {
                return createObject(this);
            };
            Model.prototype.reload = function () {
                var original;
                if (this.isNew()) {
                    return this;
                }
                original = this.constructor.find(this.id);
                this.load(original.attributes());
                return original;
            };
            Model.prototype.refresh = function (data) {
                var root;
                root = this.constructor.irecords[this.id];
                root.load(data);
                this.trigger('refresh');
                return this;
            };
            Model.prototype.toJSON = function () {
                return this.attributes();
            };
            Model.prototype.toString = function () {
                return "<" + this.constructor.className + " (" + (JSON.stringify(this)) + ")>";
            };
            Model.prototype.fromForm = function (form) {
                var checkbox, key, name, result, _i, _j, _k, _len, _len1, _len2, _name, _ref, _ref1, _ref2;
                result = {};
                _ref = $(form).find('[type=checkbox]:not([value])');
                for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                    checkbox = _ref[_i];
                    result[checkbox.name] = $(checkbox).prop('checked');
                }
                _ref1 = $(form).find('[type=checkbox][name$="[]"]');
                for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
                    checkbox = _ref1[_j];
                    name = checkbox.name.replace(/\[\]$/, '');
                    result[name] || (result[name] = []);
                    if ($(checkbox).prop('checked')) {
                        result[name].push(checkbox.value);
                    }
                }
                _ref2 = $(form).serializeArray();
                for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
                    key = _ref2[_k];
                    result[_name = key.name] || (result[_name] = key.value);
                }
                return this.load(result);
            };
            Model.prototype.exists = function () {
                return this.constructor.exists(this.id);
            };
            Model.prototype.update = function (options) {
                var clone, records;
                this.trigger('beforeUpdate', options);
                records = this.constructor.irecords;
                records[this.id].load(this.attributes());
                this.constructor.sort();
                clone = records[this.id].clone();
                clone.trigger('update', options);
                clone.trigger('change', 'update', options);
                return clone;
            };
            Model.prototype.create = function (options) {
                var clone, record;
                this.trigger('beforeCreate', options);
                this.id || (this.id = this.cid);
                record = this.dup(false);
                this.constructor.addRecord(record);
                this.constructor.sort();
                clone = record.clone();
                clone.trigger('create', options);
                clone.trigger('change', 'create', options);
                return clone;
            };
            Model.prototype.bind = function (events, callback) {
                var binder, singleEvent, _fn, _i, _len, _ref;
                this.constructor.bind(events, binder = (function (_this) {
                    return function (record) {
                        if (record && _this.eql(record)) {
                            return callback.apply(_this, arguments);
                        }
                    };
                })(this));
                _ref = events.split(' ');
                _fn = (function (_this) {
                    return function (singleEvent) {
                        var unbinder;
                        return _this.constructor.bind("unbind", unbinder = function (record, event, cb) {
                            if (record && _this.eql(record)) {
                                if (event && event !== singleEvent) {
                                    return;
                                }
                                if (cb && cb !== callback) {
                                    return;
                                }
                                _this.constructor.unbind(singleEvent, binder);
                                return _this.constructor.unbind("unbind", unbinder);
                            }
                        });
                    };
                })(this);
                for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                    singleEvent = _ref[_i];
                    _fn(singleEvent);
                }
                return this;
            };
            Model.prototype.one = function (events, callback) {
                var handler;
                return this.bind(events, handler = (function (_this) {
                    return function () {
                        _this.unbind(events, handler);
                        return callback.apply(_this, arguments);
                    };
                })(this));
            };
            Model.prototype.trigger = function () {
                var args, _ref;
                args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
                args.splice(1, 0, this);
                return (_ref = this.constructor).trigger.apply(_ref, args);
            };
            Model.prototype.listenTo = function () {
                return Events.listenTo.apply(this, arguments);
            };
            Model.prototype.listenToOnce = function () {
                return Events.listenToOnce.apply(this, arguments);
            };
            Model.prototype.stopListening = function () {
                return Events.stopListening.apply(this, arguments);
            };
            Model.prototype.unbind = function (events, callback) {
                var event, _i, _len, _ref, _results;
                if (arguments.length === 0) {
                    return this.trigger('unbind');
                }
                else if (events) {
                    _ref = events.split(' ');
                    _results = [];
                    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                        event = _ref[_i];
                        _results.push(this.trigger('unbind', event, callback));
                    }
                    return _results;
                }
            };
            return Model;
        })(Module);
    Model.prototype.on = Model.prototype.bind;
    Model.prototype.off = Model.prototype.unbind;
    Controller = (function (_super) {
            __extends(Controller, _super);
            Controller.include(Events);
            Controller.include(Log);
            Controller.prototype.eventSplitter = /^(\S+)\s*(.*)$/;
            Controller.prototype.tag = 'div';

            function Controller(options) {
                this.release = __bind(this.release, this);
                var context, key, parent_prototype, value, _ref;
                this.options = options;
                _ref = this.options;
                for (key in _ref) {
                    value = _ref[key];
                    this[key] = value;
                }
                if (!this.el) {
                    this.el = document.createElement(this.tag);
                }
                this.el = $(this.el);
                this.$el = this.el;
                if (this.className) {
                    this.el.addClass(this.className);
                }
                if (this.attributes) {
                    this.el.attr(this.attributes);
                }
                if (!this.events) {
                    this.events = this.constructor.events;
                }
                if (!this.elements) {
                    this.elements = this.constructor.elements;
                }
                context = this;
                while (parent_prototype = context.constructor.__super__) {
                    if (parent_prototype.events) {
                        this.events = $.extend({}, parent_prototype.events, this.events);
                    }
                    if (parent_prototype.elements) {
                        this.elements = $.extend({}, parent_prototype.elements, this.elements);
                    }
                    context = parent_prototype;
                }
                if (this.events) {
                    this.delegateEvents(this.events);
                }
                if (this.elements) {
                    this.refreshElements();
                }
                Controller.__super__.constructor.apply(this, arguments);
            }
            Controller.prototype.release = function () {
                this.trigger('release', this);
                this.el.remove();
                this.unbind();
                return this.stopListening();
            };
            Controller.prototype.$ = function (selector) {
                return $(selector, this.el);
            };
            Controller.prototype.delegateEvents = function (events) {
                var eventName, key, match, method, selector, _results;
                _results = [];
                for (key in events) {
                    method = events[key];
                    if (typeof method === 'function') {
                        method = (function (_this) {
                            return function (method) {
                                return function () {
                                    method.apply(_this, arguments);
                                    return true;
                                };
                            };
                        })(this)(method);
                    }
                    else {
                        if (!this[method]) {
                            throw new Error("" + method + " doesn't exist");
                        }
                        method = (function (_this) {
                            return function (method) {
                                return function () {
                                    _this[method].apply(_this, arguments);
                                    return true;
                                };
                            };
                        })(this)(method);
                    }
                    match = key.match(this.eventSplitter);
                    eventName = match[1];
                    selector = match[2];
                    if (selector === '') {
                        _results.push(this.el.bind(eventName, method));
                    }
                    else {
                        _results.push(this.el.on(eventName, selector, method));
                    }
                }
                return _results;
            };
            Controller.prototype.refreshElements = function () {
                var key, value, _ref, _results;
                _ref = this.elements;
                _results = [];
                for (key in _ref) {
                    value = _ref[key];
                    _results.push(this[value] = this.$(key));
                }
                return _results;
            };
            Controller.prototype.delay = function (func, timeout) {
                return setTimeout(this.proxy(func), timeout || 0);
            };
            Controller.prototype.html = function (element) {
                this.el.html(element.el || element);
                this.refreshElements();
                return this.el;
            };
            Controller.prototype.append = function () {
                var e, elements, _ref;
                elements = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
                elements = (function () {
                    var _i, _len, _results;
                    _results = [];
                    for (_i = 0, _len = elements.length; _i < _len; _i++) {
                        e = elements[_i];
                        _results.push(e.el || e);
                    }
                    return _results;
                })();
                (_ref = this.el).append.apply(_ref, elements);
                this.refreshElements();
                return this.el;
            };
            Controller.prototype.appendTo = function (element) {
                this.el.appendTo(element.el || element);
                this.refreshElements();
                return this.el;
            };
            Controller.prototype.prepend = function () {
                var e, elements, _ref;
                elements = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
                elements = (function () {
                    var _i, _len, _results;
                    _results = [];
                    for (_i = 0, _len = elements.length; _i < _len; _i++) {
                        e = elements[_i];
                        _results.push(e.el || e);
                    }
                    return _results;
                })();
                (_ref = this.el).prepend.apply(_ref, elements);
                this.refreshElements();
                return this.el;
            };
            Controller.prototype.replace = function (element) {
                var previous, _ref, _ref1;
                element = element.el || element;
                if (typeof element === "string") {
                    element = $.trim(element);
                }
                _ref1 = [this.el, $(((_ref = $.parseHTML(element)) != null ? _ref[0] : void 0) || element)],
                previous = _ref1[0],
                this.el = _ref1[1];
                previous.replaceWith(this.el);
                this.delegateEvents(this.events);
                this.refreshElements();
                return this.el;
            };
            return Controller;
        })(Module);
    $ = (typeof window !== "undefined" && window !== null ? window.jQuery : void 0) || (typeof window !== "undefined" && window !== null ? window.Zepto : void 0) ||
    function (element) {
            return element;
        };
    createObject = Object.create ||
    function (o) {
            var Func;
            Func = function () {};
            Func.prototype = o;
            return new Func();
        };
    isArray = function (value) {
            return Object.prototype.toString.call(value) === '[object Array]';
        };
    isBlank = function (value) {
            var key;
            if (!value) {
                return true;
            }
            for (key in value) {
                return false;
            }
            return true;
        };
    makeArray = function (args) {
            return Array.prototype.slice.call(args, 0);
        };
    Spine = this.Spine = {};
    if (typeof module !== "undefined" && module !== null) {
            module.exports = Spine;
        }
    Spine.version = '1.3.2';
    Spine.isArray = isArray;
    Spine.isBlank = isBlank;
    Spine.$ = $;
    Spine.Events = Events;
    Spine.Log = Log;
    Spine.Module = Module;
    Spine.Controller = Controller;
    Spine.Model = Model;
    Module.extend.call(Spine, Events);
    Module.create = Module.sub = Controller.create = Controller.sub = Model.sub = function (instances, statics) {
            var Result;
            Result = (function (_super) {
                __extends(Result, _super);

                function Result() {
                    return Result.__super__.constructor.apply(this, arguments);
                }
                return Result;
            })(this);
            if (instances) {
                Result.include(instances);
            }
            if (statics) {
                Result.extend(statics);
            }
            if (typeof Result.unbind === "function") {
                Result.unbind();
            }
            return Result;
        };
    Model.setup = function (name, attributes) {
            var Instance;
            if (attributes == null) {
                attributes = [];
            }
            Instance = (function (_super) {
                __extends(Instance, _super);

                function Instance() {
                    return Instance.__super__.constructor.apply(this, arguments);
                }
                return Instance;
            })(this);
            Instance.configure.apply(Instance, [name].concat(__slice.call(attributes)));
            return Instance;
        };
    Spine.Class = Module;
}).call(this);;
(function () {
    var $, Path, Route, Spine, escapeRegExp, hashStrip, namedParam, splatParam, __hasProp = {}.hasOwnProperty,
        __extends = function (child, parent) {
            for (var key in parent) {
                if (__hasProp.call(parent, key)) child[key] = parent[key];
            }

            function ctor() {
                this.constructor = child;
            }
            ctor.prototype = parent.prototype;
            child.prototype = new ctor();
            child.__super__ = parent.prototype;
            return child;
        },
        __slice = [].slice;
    Spine = this.Spine || require('spine');
    $ = Spine.$;
    hashStrip = /^#*/;
    namedParam = /:([\w\d]+)/g;
    splatParam = /\*([\w\d]+)/g;
    escapeRegExp = /[-[\]{}()+?.,\\^$|#\s]/g;
    Path = (function (_super) {
            __extends(Path, _super);

            function Path(path, callback) {
                var match;
                this.path = path;
                this.callback = callback;
                this.names = [];
                if (typeof path === 'string') {
                    namedParam.lastIndex = 0;
                    while ((match = namedParam.exec(path)) !== null) {
                        this.names.push(match[1]);
                    }
                    splatParam.lastIndex = 0;
                    while ((match = splatParam.exec(path)) !== null) {
                        this.names.push(match[1]);
                    }
                    path = path.replace(escapeRegExp, '\\$&').replace(namedParam, '([^\/]*)').replace(splatParam, '(.*?)');
                    this.route = new RegExp("^" + path + "$");
                }
                else {
                    this.route = path;
                }
            }
            Path.prototype.match = function (path, options) {
                var i, match, param, params, _i, _len;
                if (options == null) {
                    options = {};
                }
                if (!(match = this.route.exec(path))) {
                    return false;
                }
                options.match = match;
                params = match.slice(1);
                if (this.names.length) {
                    for (i = _i = 0, _len = params.length; _i < _len; i = ++_i) {
                        param = params[i];
                        options[this.names[i]] = param;
                    }
                }
                Route.trigger('before', this);
                return this.callback.call(null, options) !== false;
            };
            return Path;
        })(Spine.Module);
    Route = (function (_super) {
            var _ref;
            __extends(Route, _super);
            Route.extend(Spine.Events);
            Route.historySupport = ((_ref = window.history) != null ? _ref.pushState : void 0) != null;
            Route.options = {
                trigger: true,
                history: false,
                shim: false,
                replace: false,
                redirect: false
            };
            Route.routers = [];
            Route.setup = function (options) {
                if (options == null) {
                    options = {};
                }
                this.options = $.extend({}, this.options, options);
                if (this.options.history) {
                    this.history = this.historySupport && this.options.history;
                }
                if (this.options.shim) {
                    return;
                }
                if (this.history) {
                    $(window).bind('popstate', this.change);
                }
                else {
                    $(window).bind('hashchange', this.change);
                }
                return this.change();
            };
            Route.unbind = function () {
                var unbindResult;
                unbindResult = Spine.Events.unbind.apply(this, arguments);
                if (arguments.length > 0) {
                    return unbindResult;
                }
                if (this.options.shim) {
                    return;
                }
                if (this.history) {
                    return $(window).unbind('popstate', this.change);
                }
                else {
                    return $(window).unbind('hashchange', this.change);
                }
            };
            Route.navigate = function () {
                var args, lastArg, options, path, routes;
                args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
                options = {};
                lastArg = args[args.length - 1];
                if (typeof lastArg === 'object') {
                    options = args.pop();
                }
                else if (typeof lastArg === 'boolean') {
                    options.trigger = args.pop();
                }
                options = $.extend({}, this.options, options);
                path = args.join('/');
                if (this.path === path) {
                    return;
                }
                this.path = path;
                if (options.trigger) {
                    this.trigger('navigate', this.path);
                    routes = this.matchRoutes(this.path, options);
                    if (!routes.length) {
                        if (typeof options.redirect === 'function') {
                            return options.redirect.apply(this, [this.path, options]);
                        }
                        else {
                            if (options.redirect === true) {
                                this.redirect(this.path);
                            }
                        }
                    }
                }
                if (options.shim) {
                    return true;
                }
                else if (this.history && options.replace) {
                    return history.replaceState({}, document.title, this.path);
                }
                else if (this.history) {
                    return history.pushState({}, document.title, this.path);
                }
                else {
                    return window.location.hash = this.path;
                }
            };
            Route.create = function () {
                var router;
                router = new this;
                this.routers.push(router);
                return router;
            };
            Route.add = function (path, callback) {
                return this.router.add(path, callback);
            };
            Route.prototype.add = function (path, callback) {
                var key, value, _results;
                if (typeof path === 'object' && !(path instanceof RegExp)) {
                    _results = [];
                    for (key in path) {
                        value = path[key];
                        _results.push(this.add(key, value));
                    }
                    return _results;
                }
                else {
                    return this.routes.push(new Path(path, callback));
                }
            };
            Route.prototype.destroy = function () {
                var r;
                this.routes.length = 0;
                return this.constructor.routers = (function () {
                    var _i, _len, _ref1, _results;
                    _ref1 = this.constructor.routers;
                    _results = [];
                    for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
                        r = _ref1[_i];
                        if (r !== this) {
                            _results.push(r);
                        }
                    }
                    return _results;
                }).call(this);
            };
            Route.getPath = function () {
                var path;
                if (this.history) {
                    path = window.location.pathname;
                    if (path.substr(0, 1) !== '/') {
                        path = '/' + path;
                    }
                }
                else {
                    path = window.location.hash;
                    path = path.replace(hashStrip, '');
                }
                return path;
            };
            Route.getHost = function () {
                return "" + window.location.protocol + "//" + window.location.host;
            };
            Route.change = function () {
                var path;
                path = Route.getPath();
                if (path === Route.path) {
                    return;
                }
                Route.path = path;
                return Route.matchRoutes(Route.path);
            };
            Route.matchRoutes = function (path, options) {
                var match, matches, router, _i, _len, _ref1;
                matches = [];
                _ref1 = this.routers.concat([this.router]);
                for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
                    router = _ref1[_i];
                    match = router.matchRoute(path, options);
                    if (match) {
                        matches.push(match);
                    }
                }
                if (matches.length) {
                    this.trigger('change', matches, path);
                }
                return matches;
            };
            Route.redirect = function (path) {
                return window.location = path;
            };

            function Route() {
                this.routes = [];
            }
            Route.prototype.matchRoute = function (path, options) {
                var route, _i, _len, _ref1;
                _ref1 = this.routes;
                for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
                    route = _ref1[_i];
                    if (route.match(path, options)) {
                        return route;
                    }
                }
            };
            Route.prototype.trigger = function () {
                var args, _ref1;
                args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
                args.splice(1, 0, this);
                return (_ref1 = this.constructor).trigger.apply(_ref1, args);
            };
            return Route;
        })(Spine.Module);
    Route.router = new Route;
    Spine.Controller.include({
            route: function (path, callback) {
                if (this.router instanceof Spine.Route) {
                    return this.router.add(path, this.proxy(callback));
                }
                else {
                    return Spine.Route.add(path, this.proxy(callback));
                }
            },
            routes: function (routes) {
                var key, value, _results;
                _results = [];
                for (key in routes) {
                    value = routes[key];
                    _results.push(this.route(key, value));
                }
                return _results;
            },
            navigate: function () {
                return Spine.Route.navigate.apply(Spine.Route, arguments);
            }
        });
    Route.Path = Path;
    Spine.Route = Route;
    if (typeof module !== "undefined" && module !== null) {
            module.exports = Route;
        }
}).call(this);;
$(function ($) {
    var itv, $card = $('<div  class="carte_box" style="z-index:50"><div class="spinner_loading"></div></div>'),
        $body = $(document.body),
        xhr;
    $.hash = {};
    $card.on('mouseenter mouseleave', function (ev) {
            switch (ev.type) {
            case 'mouseenter':
                if (itv) {
                    clearTimeout(itv);
                    itv = null;
                }
                break;
            case 'mouseleave':
                clearTimeout(itv);
                itv = setTimeout(function () {
                    $card.hide();
                }, 50);
                break;
            }
        }).on('click', '.do-follow', function (ev) {
            var $this = $(this),
                status = $this.attr('data-status'),
                follow = (status == "11" || status == "10") ? 0 : 1,
                follow_uid = $this.attr('data-follow-uid') || $this.attr('data-follow');
            if (!$CONF['is_login']) {
                    $.login(function () {
                        location.reload();
                    });
                    return false;
                }
            if ($this.hasClass('lock')) {
                    return false;
                } else {
                    $this.addClass('lock');
                }
            var do_follow = function () {
                    $.post('/proxy/doFollow', {
                        follow: follow,
                        follow_uid: follow_uid
                    }, function (result) {
                        if (result.is_follow == "11") {
                            $this.html('<span class="hover"><i>-</i>' + $L('取消关注') + '</span><span class="label">' + $L('互相关注') + '</span>')
                        } else {
                            if (result.is_follow == "10") {
                                $this.html('<i>-</i>' + $L('取消'))
                            } else {
                                $this.html('<i>+</i>' + $L('关注'));
                            }
                        }
                        $this.removeClass('lock').attr('data-status', result.is_follow).trigger('do_follow');
                        $body.trigger('follow', [follow_uid, result.is_follow]);
                    }, 'json');
                }
            if (!follow) {
                    $.tinyConfirm($this, {
                        callback: do_follow,
                        title: $L('不想再关注了') + $L('？')
                    }).on('close', function () {
                        $this.removeClass('lock');
                    });
                } else {
                    do_follow();
                }
            ev.stopPropagation();
            return false;
        }).on('click', '.do-message', function (ev) {
            var $this = $(this),
                uid = $this.attr('data-uid'),
                uname = $this.attr('data-uname');
            $.sendMessage({
                    uid: uid,
                    uname: uname
                });
            return false;
        })
    $.extend({
            card: function (node) {
                $body.on('follow', function (ev, uid) {
                    delete($.hash[uid]);
                    return false;
                })
                $(node).on('mouseenter mouseleave', '[data-card-id]', function (ev) {
                    var target = $(ev.currentTarget),
                        offset = target.offset(),
                        uid = target.attr('data-card-id');
                    if (window.$CONF && !$CONF['is_login']) {
                            return;
                        }
                    switch (ev.type) {
                        case 'mouseenter':
                            if (itv) {
                                clearTimeout(itv);
                            }
                            itv = null;
                            $card.html('<div class="spinner_loading"></div>').appendTo($body).show();
                            var setStyle = function () {
                                var $style = {},
                                    card_width = $card.outerWidth(true),
                                    card_height = $card.outerHeight(true),
                                    scroll_top = $(window).scrollTop(),
                                    scroll_left = $(window).scrollLeft();
                                if (offset.top + card_height + target.outerHeight(true) < scroll_top + $(window).outerHeight()) {
                                        $style.top = offset.top + target.outerHeight(true) + 5;
                                    } else {
                                        $style.top = offset.top - card_height - 5;
                                    }
                                if (offset.left + card_width < scroll_left + $(window).outerWidth()) {
                                        $style.left = offset.left;
                                    } else {
                                        $style.left = offset.left - card_width + target.outerWidth(true);
                                    }
                                $card.css($style)
                            }
                            setStyle();
                            if (xhr) {
                                xhr.abort();
                            }
                            var object = $.hash[uid];
                            if (object) {
                                var $html = $('#card_teml').template(object);
                                $card.html($html);
                                setStyle();
                            } else {
                                xhr = $.get('/aj/user?ac=uid', {
                                    uid: uid
                                }, function (result) {
                                    if (result.code == 1000) {
                                        if (result) {
                                            result['isSafari'] = navigator.userAgent.indexOf("Chrome") == -1 && navigator.userAgent.indexOf("Safari") > -1;
                                        }
                                        $.hash[uid] = result;
                                        var $html = $('#card_teml').template($.hash[uid]);
                                        $card.html($html);
                                        setStyle();
                                    }
                                }, 'json')
                            }
                            break;
                        case 'mouseleave':
                            if (itv) {
                                clearTimeout(itv);
                            }
                            itv = setTimeout(function () {
                                $card.hide();
                            }, 50);
                            break;
                        }
                })
            }
        });
});;
(function ($, window, document, undefined) {
    var $window = $(window);
    $.fn.lazyload = function (options) {
        var elements = this;
        var $container;
        var settings = {
            threshold: $window.outerHeight() * 2 / 3,
            failure_limit: 0,
            event: "scroll",
            effect: "show",
            container: window,
            data_attribute: "original",
            skip_invisible: true,
            appear: null,
            load: null,
            effect_speed: 'fast',
            placeholder: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"
        };

        function update() {
            var counter = 0;
            elements.each(function () {
                var $this = $(this);
                if ($this.attr('src') && settings.skip_invisible && !$this.is(":visible")) {
                    return;
                }
                if ($.abovethetop(this, settings) || $.leftofbegin(this, settings)) {} else if (!$.belowthefold(this, settings) && !$.rightoffold(this, settings)) {
                    $this.trigger("appear");
                    counter = 0;
                } else {
                    if (++counter > settings.failure_limit) {
                        return false;
                    }
                }
            });
        }
        if (options) {
            if (undefined !== options.failurelimit) {
                options.failure_limit = options.failurelimit;
                delete options.failurelimit;
            }
            if (undefined !== options.effectspeed) {
                options.effect_speed = options.effectspeed;
                delete options.effectspeed;
            }
            $.extend(settings, options);
        }
        $container = (settings.container === undefined || settings.container === window) ? $window : $(settings.container);
        if (0 === settings.event.indexOf("scroll")) {
            $container.bind(settings.event, function () {
                return update();
            });
        }
        this.each(function () {
            var self = this;
            var $self = $(self);
            self.loaded = false;
            if (settings.placeholder && ($self.attr("src") === undefined || $self.attr("src") === false)) {
                if ($self.is("img")) {
                    $self.attr("src", settings.placeholder);
                }
            }
            $self.one("appear", function () {
                if (!this.loaded) {
                    if (settings.appear) {
                        var elements_left = elements.length;
                        settings.appear.call(self, elements_left, settings);
                    }
                    $("<img />").bind("load", function () {
                        var original = $self.attr("data-" + settings.data_attribute);
                        $self.hide();
                        if ($self.is("img")) {
                            $self.attr("src", original);
                        } else {
                            $self.css("background-image", "url('" + original + "')");
                        }
                        $self[settings.effect](settings.effect_speed);
                        self.loaded = true;
                        var temp = $.grep(elements, function (element) {
                            return !element.loaded;
                        });
                        elements = $(temp);
                        if (settings.load) {
                            var elements_left = elements.length;
                            settings.load.call(self, elements_left, settings);
                        }
                    }).attr("src", $self.attr("data-" + settings.data_attribute));
                }
            });
            if (0 !== settings.event.indexOf("scroll")) {
                $self.bind(settings.event, function () {
                    if (!self.loaded) {
                        $self.trigger("appear");
                    }
                });
            }
        });
        $window.bind("resize", function () {
            update();
        });
        if ((/(?:iphone|ipod|ipad).*os 5/gi).test(navigator.appVersion)) {
            $window.bind("pageshow", function (event) {
                if (event.originalEvent && event.originalEvent.persisted) {
                    elements.each(function () {
                        $(this).trigger("appear");
                    });
                }
            });
        }
        $(document).ready(function () {
            update();
        });
        return this;
    };
    $.belowthefold = function (element, settings) {
        var fold;
        if (settings.container === undefined || settings.container === window) {
            fold = (window.innerHeight ? window.innerHeight : $window.height()) + $window.scrollTop();
        } else {
            fold = $(settings.container).offset().top + $(settings.container).height();
        }
        return fold <= $(element).offset().top - settings.threshold;
    };
    $.rightoffold = function (element, settings) {
        var fold;
        if (settings.container === undefined || settings.container === window) {
            fold = $window.width() + $window.scrollLeft();
        } else {
            fold = $(settings.container).offset().left + $(settings.container).width();
        }
        return fold <= $(element).offset().left - settings.threshold;
    };
    $.abovethetop = function (element, settings) {
        var fold;
        if (settings.container === undefined || settings.container === window) {
            fold = $window.scrollTop();
        } else {
            fold = $(settings.container).offset().top;
        }
        return fold >= $(element).offset().top + settings.threshold + $(element).height();
    };
    $.leftofbegin = function (element, settings) {
        var fold;
        if (settings.container === undefined || settings.container === window) {
            fold = $window.scrollLeft();
        } else {
            fold = $(settings.container).offset().left;
        }
        return fold >= $(element).offset().left + settings.threshold + $(element).width();
    };
    $.inviewport = function (element, settings) {
        return !$.rightoffold(element, settings) && !$.leftofbegin(element, settings) && !$.belowthefold(element, settings) && !$.abovethetop(element, settings);
    };
    $.extend($.expr[":"], {
        "below-the-fold": function (a) {
            return $.belowthefold(a, {
                threshold: 0
            });
        },
        "above-the-top": function (a) {
            return !$.belowthefold(a, {
                threshold: 0
            });
        },
        "right-of-screen": function (a) {
            return $.rightoffold(a, {
                threshold: 0
            });
        },
        "left-of-screen": function (a) {
            return !$.rightoffold(a, {
                threshold: 0
            });
        },
        "in-viewport": function (a) {
            return $.inviewport(a, {
                threshold: 0
            });
        },
        "above-the-fold": function (a) {
            return !$.belowthefold(a, {
                threshold: 0
            });
        },
        "right-of-fold": function (a) {
            return $.rightoffold(a, {
                threshold: 0
            });
        },
        "left-of-fold": function (a) {
            return !$.rightoffold(a, {
                threshold: 0
            });
        }
    });
})(jQuery, window, document);;
/*!
 Autosize v1.18.6 - 2014-03-13
 Automatically adjust textarea height based on user input.
 (c) 2014 Jack Moore - http://www.jacklmoore.com/autosize
 license: http://www.opensource.org/licenses/mit-license.php
 */
(function ($) {
    var
    defaults = {
        className: 'autosizejs',
        id: 'autosizejs',
        append: '',
        callback: false,
        resizeDelay: 10,
        placeholder: true
    },
        copy = '<textarea tabindex="-1" style="position:absolute; top:-999px; left:0; right:auto; bottom:auto; border:0; padding: 0; -moz-box-sizing:content-box; -webkit-box-sizing:content-box; box-sizing:content-box; word-wrap:break-word; height:0 !important; min-height:0 !important; overflow:hidden; transition:none; -webkit-transition:none; -moz-transition:none;"/>',
        typographyStyles = ['fontFamily', 'fontSize', 'fontWeight', 'fontStyle', 'letterSpacing', 'textTransform', 'wordSpacing', 'textIndent'],
        mirrored, mirror = $(copy).data('autosize', true)[0];
    mirror.style.lineHeight = '99px';
    if ($(mirror).css('lineHeight') === '99px') {
            typographyStyles.push('lineHeight');
        }
    mirror.style.lineHeight = '';
    $.fn.autosize = function (options) {
            if (!this.length) {
                return this;
            }
            options = $.extend({}, defaults, options || {});
            if (mirror.parentNode !== document.body) {
                $(document.body).append(mirror);
            }
            return this.each(function () {
                var
                ta = this,
                    $ta = $(ta),
                    maxHeight, minHeight, boxOffset = 0,
                    callback = $.isFunction(options.callback),
                    originalStyles = {
                        height: ta.style.height,
                        overflow: ta.style.overflow,
                        overflowY: ta.style.overflowY,
                        wordWrap: ta.style.wordWrap,
                        resize: ta.style.resize
                    },
                    timeout, width = $ta.width();
                if ($ta.data('autosize')) {
                        return;
                    }
                $ta.data('autosize', true);
                if ($ta.css('box-sizing') === 'border-box' || $ta.css('-moz-box-sizing') === 'border-box' || $ta.css('-webkit-box-sizing') === 'border-box') {
                        boxOffset = $ta.outerHeight() - $ta.height();
                    }
                minHeight = Math.max(parseInt($ta.css('minHeight'), 10) - boxOffset || 0, $ta.height());
                $ta.css({
                        overflow: 'hidden',
                        overflowY: 'hidden',
                        wordWrap: 'break-word',
                        resize: ($ta.css('resize') === 'none' || $ta.css('resize') === 'vertical') ? 'none' : 'horizontal'
                    });

                function setWidth() {
                        var width;
                        var style = window.getComputedStyle ? window.getComputedStyle(ta, null) : false;
                        if (style) {
                            width = ta.getBoundingClientRect().width;
                            if (width === 0) {
                                width = parseInt(style.width, 10);
                            }
                            $.each(['paddingLeft', 'paddingRight', 'borderLeftWidth', 'borderRightWidth'], function (i, val) {
                                width -= parseInt(style[val], 10);
                            });
                        } else {
                            width = Math.max($ta.width(), 0);
                        }
                        mirror.style.width = width + 'px';
                    }

                function initMirror() {
                        var styles = {};
                        mirrored = ta;
                        mirror.className = options.className;
                        mirror.id = options.id;
                        maxHeight = parseInt($ta.css('maxHeight'), 10);
                        $.each(typographyStyles, function (i, val) {
                            styles[val] = $ta.css(val);
                        });
                        $(mirror).css(styles).attr('wrap', $ta.attr('wrap'));
                        setWidth();
                        if (window.chrome) {
                            var width = ta.style.width;
                            ta.style.width = '0px';
                            var ignore = ta.offsetWidth;
                            ta.style.width = width;
                        }
                    }

                function adjust() {
                        var height, original;
                        if (mirrored !== ta) {
                            initMirror();
                        } else {
                            setWidth();
                        }
                        if (!ta.value && options.placeholder) {
                            mirror.value = ($ta.attr("placeholder") || '') + options.append;
                        } else {
                            mirror.value = ta.value + options.append;
                        }
                        mirror.style.overflowY = ta.style.overflowY;
                        original = parseInt(ta.style.height, 10);
                        mirror.scrollTop = 0;
                        mirror.scrollTop = 9e4;
                        height = mirror.scrollTop;
                        if (maxHeight && height > maxHeight) {
                            ta.style.overflowY = 'scroll';
                            height = maxHeight;
                        } else {
                            ta.style.overflowY = 'hidden';
                            if (height < minHeight) {
                                height = minHeight;
                            }
                        }
                        height += boxOffset;
                        if (original !== height) {
                            ta.style.height = height + 'px';
                            if (callback) {
                                options.callback.call(ta, ta);
                            }
                        }
                    }

                function resize() {
                        clearTimeout(timeout);
                        timeout = setTimeout(function () {
                            var newWidth = $ta.width();
                            if (newWidth !== width) {
                                width = newWidth;
                                adjust();
                            }
                        }, parseInt(options.resizeDelay, 10));
                    }
                if ('onpropertychange' in ta) {
                        if ('oninput' in ta) {
                            $ta.on('input.autosize keyup.autosize', adjust);
                        } else {
                            $ta.on('propertychange.autosize', function () {
                                if (event.propertyName === 'value') {
                                    adjust();
                                }
                            });
                        }
                    } else {
                        $ta.on('input.autosize', adjust);
                    }
                if (options.resizeDelay !== false) {
                        $(window).on('resize.autosize', resize);
                    }
                $ta.on('autosize.resize', adjust);
                $ta.on('autosize.resizeIncludeStyle', function () {
                        mirrored = null;
                        adjust();
                    });
                $ta.on('autosize.destroy', function () {
                        mirrored = null;
                        clearTimeout(timeout);
                        $(window).off('resize', resize);
                        $ta.off('autosize').off('.autosize').css(originalStyles).removeData('autosize');
                    });
                adjust();
            });
        };
}(window.jQuery || window.$));;
$(function ($) {
    var $body = $(document.body),
        $window = $(window),
        xhr, pageId = $CONF['page_id'],
        isMobile = $CONF['isMobile'],
        content = $('.profile_content');
    var more, times, url, itv;
    var layzLoad = function () {
            $('img[data-src]').lazyload({
                data_attribute: 'src',
                effect_speed: 0,
                load: function () {
                    var $this = $(this).removeAttr('data-src');
                }
            });
        }
    layzLoad();
    var handleLoad = function () {
            var offset = more.offset();
            if ($window.scrollTop() + $window.outerHeight() + 100 > offset.top) {
                times++;
                $(window).off('scroll.lazy');
                more.text($L('加载中...'));
                $.get(url, {
                    last_id: $CONF['last_id']
                }, function (result) {
                    if (result.code == 1000) {
                        $(window).trigger('loadMore', result.html);
                        if ($CONF['last_id'] = result.last_id) {
                            if (times >= 5) {
                                more.text($L('查看更多')).attr('title', $L('查看更多'))
                            } else {
                                $window.on('scroll.lazy', handleLoad);
                            }
                        } else {
                            more.parent().remove();
                        }
                    } else {
                        $.notify(result.msg, 'error');
                    }
                }, 'json');
            }
        }
    var showWX = function () {
            var src = $('#cover').attr('data-src');
            if ($.browser.weixin) {
                $('#weixin').remove();
                $('<div id="weixin" class="hide"><img src="' + src + '"/></div>').prependTo($('body'));
            }
        }
    var hideWx = function () {
            $.browser.weixin && $('#weixin').remove();
        }

    function autoLoad() {
            more = $('.discover_load .load-more');
            times = 0;
            url = more.attr('data-url');
            $window.off('scroll.lazy');
            if (more.length) {
                $window.on('scroll.lazy', handleLoad);
                handleLoad();
            } else {
                $window.off('scroll.lazy');
            }
        }
    autoLoad();
    $window.on('layzLoad', layzLoad)
    var eventHome = {
            setup: function () {
                var main = $('.main-body'),
                    isLock;
                this.container = container = $("#container");
                this.surface = $('.surface');
                if (!isMobile) {
                        var doScroll = function () {
                            var top = $(this).scrollTop();
                            if (Math.abs(top - lastScrollTop) > delta) {
                                rate = top / height;
                                blur.css('opacity', rate / 4 * 3);
                                affect.css({
                                    'transform': 'translate3d(0px, ' + (height / 8 * rate) + 'px, 0px)',
                                    'opacity': 1 - rate
                                });
                                lastScrollTop = top;
                            }
                        },
                            lastScrollTop = 0,
                            delta = 5,
                            didScroll = false;
                        clearInterval(itv);
                        itv = setInterval(function () {
                                if (didScroll && !isLock) {
                                    doScroll();
                                    didScroll = false;
                                }
                            }, 50);
                        var blur = $('.blur', this.surface),
                            affect = $('.person_box', this.surface),
                            height = $(window).height();
                        this.surface.on('inview.home', function (ev, visible) {
                                $window.on('scroll.home', function () {
                                    if (visible) {
                                        didScroll = true;
                                    }
                                })
                            })
                        $window.on('gotop.home', $.proxy(function () {
                                this.surface.trigger('inview');
                            }, this));
                    }
                this.surface.on('click.home', '.downwards', function () {
                        var offset = main.offset();
                        isLock = true;
                        $('html,body').animate({
                            scrollTop: offset.top
                        }, 'normal', function () {
                            isLock = false;
                            doScroll && doScroll();
                        });
                        return false;
                    });
                var publish_new = $('#publish_new')
                $window.on('publish.success', $.proxy(function (ev, html) {
                        $(html).insertAfter(publish_new).find('img[data-src]').attr('src', function () {
                            return $(this).attr('data-src');
                        }).removeAttr('data-src');
                    }, this)).on('loadMore.home', function (ev, html) {
                        var elem = $(html);
                        container.append(elem);
                        $window.trigger('layzLoad').trigger('scroll');
                    }).trigger('autoLoad');
                showWX();
            },
            destroy: function () {
                $window.off('publish.success').off('.home');
                this.surface && this.surface.off('.home');
                clearInterval(itv);
                itv = null;
                hideWx();
            }
        }
    var eventCollections = {
            setup: function () {
                this.container = container = $('#container');
                $CONF['is_owner'] && this.container.sortable({
                    items: 'li.item',
                    update: function (ev, ui) {
                        var item = ui.item,
                            prev = item.prev('li');
                        $.post('/u/sortCollection', {
                                collection_id: item.attr('data-collection'),
                                prev_id: prev.attr('data-collection') || 0
                            });
                    },
                    cursor: "move",
                    tolerance: 'pointer',
                    opacity: .5,
                    scroll: true
                }).disableSelection();
                $window.on('loadMore.collections', function (ev, html) {
                    var elem = $(html);
                    container.append(elem);
                    $window.trigger('layzLoad').trigger('scroll');
                })
            },
            destroy: function () {
                $CONF['is_owner'] && this.container && this.container.data('uiSortable') && this.container.sortable('disable');
                $window.off('.collections');
            }
        }
    var eventCollection = {
            setup: function () {
                this.container = container = $('#container');
                var min_id;
                $window.on('loadMore.collection', function (ev, html) {
                    var elem = $(html);
                    container.append(elem);
                    $window.trigger('layzLoad').trigger('scroll');
                }).on('publish.success', function (ev, xhtml) {
                    var first = $('li:first', container);
                    $(xhtml).filter(function () {
                        return $(this).attr('data-collection') == $CONF['collection_id']
                    }).insertAfter(first);
                    $window.trigger('layzLoad').trigger('scroll');
                })
            },
            destroy: function () {
                $CONF['is_owner'] && this.container && this.container.data('uiSortable') && this.container.sortable('disable');
                $window.off('.collection').off('publish.success');
            }
        }
    var eventResume = {
            setup: function () {
                if (!$CONF['isMobile']) {
                    var resume = $('.resume');
                    $('img', resume).one('load.fluidbox', function () {
                        var $this = $(this);
                        if (this.width >= 200) {
                            if (!$this.parent().is('a')) {
                                var a = $('<a></a>').attr('href', $this.attr('src'));
                                $this.wrap(a);
                            }
                            $this.parent().fluidbox();
                        }
                    }).each(function () {
                        var $this = $(this)
                        if ($this.outerWidth(true) >= 200) {
                            if (!$this.parent().is('a')) {
                                var a = $('<a></a>').attr('href', $this.attr('src'));
                                $this.off('load.fluidbox').wrap(a);
                            }
                            $this.parent().fluidbox();
                        }
                    })
                }
            }
        }
    var eventDefault = {
            setup: function () {
                var container = $('#container');
                $window.on('loadMore.default', function (ev, html) {
                    var elem = $(html);
                    container.append(elem);
                    $window.trigger('layzLoad').trigger('scroll');
                })
            },
            destroy: function () {
                $window.off('.default');
            }
        };
    var $Events = {
            home: eventHome,
            collections: eventCollections,
            about: eventResume,
            collection: eventCollection,
            like: eventDefault,
            sale: eventDefault,
            article: eventDefault
        };
    var updateState = function () {
            var pageId = $CONF['page_id'],
                obj;
            $.each($Events, function (key, fun) {
                    if (key == pageId) {
                        obj = fun;
                    } else {
                        fun && fun.destroy && fun.destroy();
                    }
                });
            obj && obj.setup && obj.setup();
        }
    updateState();
    if (!$CONF['isMobile'] && !$CONF['isIpad'] && !$.browser.msie) {
            History.Adapter.bind(window, 'statechange', function () {
                var state = History.getState(),
                    url = state.url,
                    tab = state.data.tab,
                    elem = $('.tabs [data-tab=' + tab + ']').addClass('on');
                elem.siblings().removeClass('on');
                xhr && xhr.abort && xhr.abort();
                $window.off('scroll.lazy');
                xhr = $.get(url, function (result) {
                        if (result.code == 1000) {
                            if (result.last_id) {
                                $CONF['last_id'] = result.last_id;
                            }
                            var wrap = $('.surface_warp');
                            switch (result.page_id) {
                            case 'home':
                                wrap.html(result.surface).closest('.st-container').removeClass('hide');
                                $window.scrollTop($window.scrollTop() + wrap.outerHeight());
                                break;
                            default:
                                $CONF['page_id'] == 'home' && $window.scrollTop($window.scrollTop() - wrap.outerHeight());
                                wrap.empty().closest('.st-container').addClass('hide');
                                break;
                            }
                            $CONF['page_id'] = result.page_id;
                            if (result.page_id == 'home' && ($CONF['about_tip'] = result.about_tip)) {
                                $body.trigger('accept.tip');
                            } else {
                                $('.um_tip_tab').remove();
                            }
                            content.html(result.html);
                            updateState();
                            autoLoad();
                            setTimeout(function () {
                                $window.trigger('layzLoad').trigger('scroll')
                            }, 100);
                        } else {
                            $.notify(result.msg, 'error');
                        }
                    }, 'json')
            });
            $body.on('click', '.tabs a', function (ev) {
                var $this = $(this),
                    url = $this.attr('href'),
                    tab = $this.attr('data-tab'),
                    title = $this.attr('data-title');
                $(window).trigger('pageDialog');
                History.pushState({
                        url: url,
                        tab: tab
                    }, title, url);
                return false;
            })
        }
});
$(function ($) {
    var $body = $(document.body),
        dialog, itv;
    var getDia = function () {
            if (dialog) {
                return dialog;
            } else {
                return dialog = $(juicer(document.getElementById('move_collection_tmpl').innerHTML, $CONF['collections'])).on('close', function (ev) {
                    var $this = $(this),
                        li = $this.data('li');
                    li && li.removeClass('lock').removeClass('hover').find('.gn_onmouse').removeClass('gn_onmouse');;
                    $this.trigger('reset').detach();
                    $body.off('click.change');
                }).on('reset', function (ev) {
                    $('input', this).prop('checked', false);
                    $('label', this).removeClass('Radio');
                }).on('click', '.create-collection-btn', function (ev) {
                    var $this = $(this),
                        name = $('[name=name]', dialog),
                        val = $.trim(name.val());
                    if (!val.length) {
                            name.shine();
                            return false;
                        }
                    if ($this.hasClass('lock')) {
                            return false;
                        } else {
                            $this.addClass('lock');
                        }
                    $.post('/u/doCollection', {
                            name: val
                        }, function (result) {
                            if (result.code == 1000) {
                                var ul = $('ul', dialog);
                                $(juicer('<li><span class="checkbox_warp "><label class="checkbox"><span class="icons"><span class="first-icon"></span></span><input type="radio" value="${collection_id}" name="collection" class="hide">${name}</label></span></li>', result.data)).prependTo(ul).find('label.checkbox');
                                name.val('');
                                if (!$CONF['collections']) {
                                    $CONF['collections'] = [];
                                }
                                $CONF['collections'].unshift(result.data);
                            } else {
                                $.notify(result.msg, 'error');
                            }
                            $this.removeClass('lock');
                        }, 'json');
                    return false;
                }).on('change', 'input:radio', function (ev) {
                    var $this = $(this),
                        collection_id = $this.val(),
                        row_id = dialog.attr('row_id'),
                        li = dialog.data('li');
                    handleEvent(collection_id, row_id, li);
                })
            }
        }
    var handleEvent = function (collection_id, row_id, li) {
            var object = {
                collection_id: collection_id,
                row_id: row_id
            }
            $.post('/u/moveCollection', object, function (result) {
                if (result.code == 1000) {
                    $('.num_works').text(function (i, num) {
                        return --num;
                    });
                    $('.num_liked').text(function (i, num) {
                        return num - result.num_liked
                    });
                    li && li.fadeOut('fast', function () {
                        li.remove();
                    });
                    dialog.trigger('close');
                    $.notify($L('作品集更改成功'), 'success');
                } else {
                    $.notify(result.msg, 'error');
                }
            }, 'json');
            return false;
        }
    $body.on('click', '.collection li a.move-collection', function (ev) {
            var $this = $(this),
                dialog = getDia(),
                offset = $this.offset(),
                row_id = $this.attr('row_id'),
                li = $this.closest('li').addClass('lock'),
                last = dialog.data('li'),
                row_id = li.attr('data-id');
            if (last && last[0] != li[0]) {
                    dialog.trigger('close');
                }
            $this.parent().addClass('gn_onmouse');
            dialog.trigger('reset').appendTo(document.body);
            offset.top += $this.outerHeight();
            offset.left -= (dialog.outerWidth() - $this.outerWidth())
            dialog.css(offset).attr('row_id', row_id).data('li', li);
            $body.on('click.change', function (ev) {
                    var target = ev.target;
                    if (!$.contains(dialog[0], target) && !$(target).is(dialog)) {
                        dialog.trigger('close');
                    }
                })
            return false;
        }).on('click', '.collection li a.reset_show', function (ev) {
            var $this = $(this),
                row_id = $this.attr('data-row-id');
            var $str = "确定在您的个人主页恢复展示这件作品吗？";
            $.confirm($str, {
                    success: function () {
                        $.post('/u/showAtHome', {
                            row_id: row_id,
                            show: 1
                        }, function (result) {
                            if (result.code == 1000) {
                                $.notify('已经成功回复在你个人主页显示', 'success');
                                $this.remove();
                            } else {
                                $.notify(result.msg || $L('操作失败，稍后重试'), 'error');
                            }
                        }, 'json');
                    }
                });
            return false;
        })
    $(window).on('pageDialog', function (ev) {
            dialog && dialog.trigger('close');
        })
});;
$(function ($) {
    var $window = $(window),
        $body = $(document.body),
        $CACHE = {};
    var domain_url = function () {
            if ($CONF['domain']) {
                return '/' + $CONF['domain'];
            } else {
                return '/uid/' + (100000 + parseInt($CONF['uid']));
            }
        };
    $body.on('click', '.edite-desc', function () {
            var $this = $(this),
                desc = $this.attr('data-val'),
                elem = $this.siblings('form');
            if (!elem.length) {
                    var handleBlur = function () {
                        $.post('/u/doDesc', elem.serialize());
                        var val = $('input', elem).val(),
                            span = $('span', $this);
                        $this.show().attr('data-val', val);
                        if (val.length) {
                                span.html(val).removeAttr('class');
                            } else {
                                span.html($L('“点击这里，编写个人签名”')).attr('class', function () {
                                    return $(this).attr('data-cls');
                                });
                            }
                        elem.hide();
                        return false;
                    };
                    elem = $(juicer(document.getElementById('desc_tmpl').innerHTML, {
                        desc: desc
                    })).insertBefore($this).on('submit', handleBlur).on('click', '.update', handleBlur).on('focusout', 'input:text', handleBlur);
                }
            elem.show().find('input').val(desc).focus();
            $this.hide();
            return false;
        }).on('click', '.edite-head', function () {
            $.headDialog();
            return false;
        }).on('click', '.do-message', function (ev) {
            var $this = $(this),
                uid = $this.attr('data-uid'),
                uname = $this.attr('data-uname');
            if (!$CONF['is_login']) {
                    $.login();
                    return false;
                }
            $.sendMessage({
                    uid: uid,
                    uname: uname
                });
            return false;
        }).on('click', '#collection_create_btn', function (ev) {
            $.createCollection();
            return false;
        }).on('mouseenter mouseleave', '#container li', function (ev) {
            var $this = $(this),
                isLock = $this.hasClass('lock');
            switch (ev.type) {
                case 'mouseenter':
                    $this.addClass('hover');
                    break;
                case 'mouseleave':
                    !isLock && $this.removeClass('hover');
                    break;
                }
            return false;
        }).on('click', '.change-cover', function (ev) {
            var $this = $(this),
                collection_id = $this.attr('data-collection-id');
            $.changeCover(collection_id);
            return false;
        }).on('click', '.sns_box a[data-url]', function () {
            var $this = $(this),
                url = $this.attr('data-url'),
                box = $this.closest('.sns_box');
            var op = $.openwindow(url, null, 752, window.screen.height - 200);
            op && op.focus();
            return false;
        }).on('click', '.load-more', function (ev) {
            var $this = $(this),
                url = $this.attr('data-url'),
                loadCls = 'loading',
                isLoad = $this.hasClass(loadCls),
                succssHTML = $L('查看更多'),
                loadHTML = $L('加载中...');
            if (isLoad) {
                    return false;
                } else {
                    $this.addClass(loadCls).text(loadHTML);
                }
            $.get(url, {
                    last_id: $CONF['last_id']
                }, function (result) {
                    if (result.code == 1000) {
                        if ($CONF['last_id'] = result.last_id) {
                            $this.text(succssHTML);
                        } else {
                            $this.parent().remove();
                        }
                        $this.closest('.loadmore').toggle(result.last_id > 0);
                        $(window).trigger('loadMore', result.html);
                    } else {
                        $.notify(result.msg, 'error');
                    }
                    $this.removeClass(loadCls);
                }, 'json')
        }).on('click', '.draft', function (ev) {
            $.get('/aj/getDraftList', function (result) {
                if (result.code == 1000) {
                    var dialog = $('#draft_list_tmpl').template(result.rows).appendTo(document.body).easyModal({
                        autoOpen: true,
                        onClose: function () {
                            $(this).parent().remove();
                        },
                        updateZIndexOnOpen: false,
                        onOpen: function () {
                            var $this = $(this);
                            $this.on('click', '.close1', function () {
                                $this.trigger('closeModal');
                                return false;
                            })
                        },
                        closeOnEscape: true,
                        closeButtonClass: 'close1'
                    }).on('click', '.remove', function (ev) {
                        var $this = $(ev.currentTarget),
                            draft_id = $this.attr('data-id'),
                            draft_num = $('.draft_num', dialog);
                        $this.closest('li').fadeOut('fast', function () {
                                $this.remove();
                                draft_num.text(function (i, num) {
                                    if (--num <= 0) {
                                        dialog.trigger('closeModal');
                                        $('#draft_tip').hide();
                                    }
                                    return num;
                                });
                            })
                        $.post('/aj/doDraftDel', {
                                draft_id: draft_id
                            }, function () {}, 'json');
                        return false;
                    }).on('click', '.restore', function (ev) {
                        var $this = $(this),
                            draft_id = $this.attr('data-id');
                        dialog.trigger('closeModal');
                        new $.umeditor({
                                $body: $('body'),
                                $html: $('html'),
                                isMobile: $CONF['isMobile'],
                                $sync: $CONF['sync'],
                                $window: $(window),
                                draft_id: draft_id
                            })
                        return false;
                    });
                } else {
                    $.notify(result.msg, 'error');
                }
            }, 'json');
            return false;
        })
    $body.on('accept.tip', function () {
            if ($CONF['about_tip']) {
                var $el = $('<span class="um_tip_tab" style="top:-20px;left:-90px">\
          <p>\
               请录入简介，让更多朋友了解您~\
          </p>\
          <i class="triangle-character tc-background">◆</i>\
      </span>'),
                    about = $('.about_nav'),
                    offset = about.offset();
                $el.appendTo(about);
            }
        });
    if ($CONF['page_id'] == 'home') {
            $body.trigger('accept.tip');
        }
    var syncDialog;
    $.extend({
            syncDialog: function () {
                if (!syncDialog) {
                    var shtml = document.getElementById('sns_tmpl').innerHTML;
                    syncDialog = $(juicer(shtml, $CONF['sync'])).css({
                        zIndex: 100
                    });
                }
                syncDialog.appendTo(document.body).easyModal({
                    autoOpen: true,
                    onClose: function () {
                        if ($.oldCacllback) {
                            $.callback = $.oldCacllback;
                            delete $.oldCacllback;
                        }
                        $(this).parent().remove();
                    },
                    zIndex: function () {
                        return 1000;
                    },
                    closeOnEscape: false,
                    onOpen: function () {
                        syncDialog.on('click', '.cancel', function (ev) {
                            var $this = $(this),
                                li = $this.closest('li'),
                                type = li.attr('data-sync');
                            $.confirm($L('确定要解除绑定吗？'), {
                                    YES: $L('提交'),
                                    NO: $L('取消'),
                                    zIndex: function () {
                                        return 1010;
                                    },
                                    success: function (dialog) {
                                        $.post('/u/doUnbind', {
                                            open_type: type
                                        }, function (result) {
                                            $this.closest('li').removeClass('on').find('i').empty();
                                            $this.replaceWith($('<a class="attract" href="javascript:;"><span>绑定</span></a>'));
                                            dialog.trigger('closeModal');
                                            var $sync = $CONF['sync'];
                                            if ($sync) {
                                                delete $sync[type];
                                            }
                                            $window.trigger('sns_bind_callback', [type, 0]);
                                        }, 'json')
                                    },
                                    open: function () {
                                        syncDialog.addClass('escape-lock');
                                    },
                                    close: function () {
                                        syncDialog.removeClass('escape-lock');
                                    }
                                });
                        }).on('click', '.attract', function (ev) {
                            var $this = $(this),
                                li = $this.closest('li'),
                                sns = li.attr('data-sync'),
                                url = "/login/connect/step/sync/type/" + sns,
                                op = $.openwindow(url, null, 752, window.screen.height);
                            op && op.focus();
                            return false;
                        }).on('click', '.x-close', function () {
                            syncDialog.trigger('closeModal');
                        })
                        if ($.callback) {
                            $.oldCacllback = $.callback;
                        }
                        $.callback = function (result) {
                            var open_type = result.open_type,
                                $elem = $('[data-sync=' + open_type + ']', syncDialog),
                                $a = $('a.attract', $elem),
                                li = $a.closest('li'),
                                $sync = $CONF['sync'];
                            $sync[open_type] = result;
                            $('i', li).text('(' + result.uname + ')');
                            $window.trigger('sns_bind_callback', [open_type, 1]);
                            $elem.addClass('on');
                            $a.replaceWith('<a class="cancel" href="javascript:;"><span><em>-</em>' + $L('解绑') + '</span></a>');
                            return false;
                        }
                    }
                });
            },
            openwindow: function (url, name, iWidth, iHeight) {
                var url, name, iWidth, iHeight, iTop = (window.screen.availHeight - 30 - iHeight) / 2,
                    iLeft = (window.screen.availWidth - 10 - iWidth) / 2;
                return window.open(url, name, 'height=' + iHeight + ',,innerHeight=' + iHeight + ',width=' + iWidth + ',innerWidth=' + iWidth + ',top=' + iTop + ',left=' + iLeft + ',toolbar=no,menubar=no,scrollbars=auto,resizeable=no,location=no,status=no');
            },
            editeCover: function (opts) {
                var opts = $.extend({
                    name: '',
                    is_secret: 1
                }, opts || {}),
                    $body = $(document.body),
                    thisDia = $(juicer(document.getElementById('collection_tmpl_edite').innerHTML, opts)).on('open', function () {
                        var style = $body.attr('style') || '',
                            scrollbarwidth = $.scrollbarwidth();
                        $body.data('style', style).css({
                                'overflow-y': 'hidden',
                                'marginRight': scrollbarwidth
                            }).on('keydown.create', function (ev) {
                                if (ev.keyCode == 27) {
                                    thisDia.trigger('close')
                                }
                            }).append(this);
                        $('.placeholder', this).trigger('placeholder');
                    }).on('close', function () {
                        $body.off('keydown.create').attr('style', function () {
                            return $(this).data('style') || '';
                        });
                        thisDia.remove();
                    }).on('click', '.reset', function () {
                        thisDia.trigger('close');
                        return false;
                    }).on('click', '.submit', function (ev) {
                        $(this).closest('form').trigger('submit');
                        return false;
                    }).trigger('open');
                $('form', thisDia).validate({
                        rules: {
                            name: {
                                required: true,
                                maxlength: 40
                            }
                        },
                        messages: {
                            name: {
                                required: $L('作品名称必须填写'),
                                maxlength: $L('作品名称不能超过40个字')
                            }
                        },
                        errorPlacement: function (error, element) {
                            element.closest('.text_forms').after(error.addClass('msg_error typeface_1 text_align_l'));
                        },
                        errorElement: 'div',
                        focusInvalid: true,
                        submitHandler: function (form) {
                            $.post('/u/doCollection', $(form).serialize(), function (result) {
                                if (result.code == 1000) {
                                    $.notify($L('操作成功'), {
                                        callback: function () {
                                            location.reload();
                                        }
                                    });
                                } else {
                                    $.notify(result.msg, 'error');
                                }
                            }, 'json');
                            return false;
                        }
                    })
            },
            changeCover: function (collection_id) {
                var $body = $(document.body),
                    spinner, $style, box, $cover, scrollbarwidth = $.scrollbarwidth(),
                    list, $style, empty = 'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==';
                var left, right, top, bottom;
                var handeDrag = function (src) {
                        spinner.show();
                        wrap.hide();
                        $cover.removeAttr('src').one('load', function () {
                            spinner.hide();
                            var width = this.width,
                                height = this.height,
                                num_left = (width - 300) / 2;
                            var offset = box.offset();
                            var opts = {
                                    axis: 'x',
                                    drag: function (event, ui) {
                                        var uileft = ui.position.left,
                                            uitop = ui.position.top,
                                            uileft = uileft <= 0 ? Math.abs(uileft) : 0;
                                        left.css({
                                                width: uileft
                                            })
                                        right.css({
                                                width: width - uileft - 300
                                            })
                                    },
                                    containment: [offset.left - width + 300, offset.top, offset.left, offset.top]
                                };
                            left.css({
                                    width: Math.abs(num_left)
                                })
                            right.css({
                                    width: width - 300 - Math.abs(num_left)
                                })
                            wrap.css({
                                    left: -num_left,
                                    width: width,
                                    height: height
                                }).show().draggable(opts);
                        }).attr('src', src)
                    }
                var handleCover = function (TMPL) {
                        var current, thisDia = $(TMPL).on('open', function () {
                            $cover = $(this).appendTo($body).find('.cover');
                            spinner = $('.spinner', this);
                            list = $('.image-list img', this);
                            current = list.first();
                            wrap = $('.wrap', box)
                            maxWidth = 300,
                            maxHeight = 400;
                            box = $('.box', this),
                            left = $('.left', box),
                            right = $('.right', box),
                            top = $('.top', box),
                            bottom = $('.bottom', box),
                            handeDrag(current.attr('data-src'));
                            $style = $body.attr('style') || '';
                            $body.css({
                                overflow: 'hidden',
                                marginLeft: scrollbarwidth
                            }).on('keydown.esc', function (ev) {
                                if (ev.keyCode == 27) {
                                    thisDia.trigger('close');
                                }
                            });
                        }).on('click', '.right-btn', function () {
                            current = current.next();
                            if (!current.length) {
                                current = list.first();
                            }
                            handeDrag(current.attr('data-src'));
                        }).on('click', '.left-btn', function () {
                            current = current.next();
                            if (!current.length) {
                                current = list.first();
                            }
                            handeDrag(current.attr('data-src'));
                        }).on('close', function () {
                            thisDia.remove();
                            $body.attr('style', $style).off('keydown.esc')
                            return false;
                        }).on('click', '.reset', function () {
                            thisDia.trigger('close');
                            return false;
                        }).on('click', '.submit', function (ev) {
                            var position = position = $cover.parent().position(),
                                pid = current.attr('data-pid'),
                                row_id = current.attr('data-row-id'),
                                collection_id = $cover.attr('data-collection-id')
                            $data = $.extend({
                                    fid: pid,
                                    row_id: row_id,
                                    collection_id: collection_id
                                }, position);
                            $.post('/upload/crop_collection', $data, function (result) {
                                    if (result.code == 1000) {
                                        $('.bj-' + collection_id).css({
                                            'background-image': 'url(' + result.url + ')'
                                        });
                                        thisDia.trigger('close');
                                        $.notify($L('设置成功'));
                                    } else {
                                        $.notify(result.msg, 'error');
                                    }
                                }, 'json');
                            return false;
                        }).trigger('open');
                    }
                if (!$CACHE[collection_id]) {
                        $.post('/u/setCover', {
                            collection_id: collection_id
                        }, function (result) {
                            if (result.code == 1000) {
                                handleCover($CACHE[collection_id] = result.html);
                            } else {
                                $.notify(result.msg, 'error');
                            }
                        }, 'json');
                    } else {
                        handleCover($CACHE[collection_id]);
                    }
            }
        });
});
$(function ($) {
    var RESUME;
    var showResume = function () {
        var $el = $(RESUME).appendTo(document.body);
        $el.easyModal({
            autoOpen: true,
            onClose: function () {
                $(this).parent().remove();
            },
            updateZIndexOnOpen: false,
            zIndex: function () {
                return 1000
            },
            onOpen: function () {
                $el.on('click', '.close-btn', function () {
                    $el.trigger('closeModal');
                    return false;
                })
            }
        });
        return false;
    }
    $(document.body).on('click', '.view-resume', function () {
        if (!RESUME) {
            $.get('/u/resume', {
                collection_id: $CONF['collection_id']
            }, function (result) {
                if (result.code == 1000) {
                    showResume(RESUME = result.html)
                } else {
                    $.notify(result.msg, 'error');
                }
            }, 'json');
        } else {
            showResume();
        }
        return false;
    })
});
$(function ($) {
    var thisDia;
    var createDialog = function (opts) {
        if (!thisDia) {
            thisDia = $(juicer(document.getElementById('collection_tmpl_create').innerHTML, opts || {})).on('open', function () {
                $(document.body).on('keydown.create', function (ev) {
                    if (ev.keyCode == 27) {
                        thisDia.trigger('close')
                    }
                })
                $('html').addClass('dialog')
            }).on('close', function () {
                $('.checkbox', thisDia).first().trigger('click');
                thisDia.detach();
                $(document.body).off('keydown.create');
                $('html').removeClass('dialog')
                return false;
            }).on('click', '.reset', function () {
                thisDia.trigger('close');
                return false;
            }).on('click', '.submit', function (ev) {
                $(this).closest('form').trigger('submit');
                return false;
            });
            var form = $('form', thisDia),
                $name = $('input[name=name]', form);
            form.validate({
                    rules: {
                        name: {
                            required: true,
                            maxlength: 40
                        }
                    },
                    messages: {
                        name: {
                            required: $name.attr('data-required'),
                            maxlength: $name.attr('data-maxlength')
                        }
                    },
                    errorPlacement: function (error, element) {
                        element.parent().after(error.addClass('msg_error typeface_1 text_align_l KAITI'));
                    },
                    errorElement: 'div',
                    focusInvalid: true,
                    submitHandler: function () {
                        $.post('/u/doCollection', form.serialize(), function (result) {
                            if (result.code == 1000) {
                                $.notify('操作成功');
                                if (result.data && result.data.collection_id) {
                                    location.href = "/works/collection/" + result.data.collection_id;
                                } else {
                                    location.reload();
                                }
                                thisDia.trigger('reset').trigger('close');
                            } else {
                                $.notify(result.msg, 'error');
                            }
                        }, 'json');
                        return false;
                    }
                });
        }
        thisDia.appendTo(document.body).trigger('open');
    }
    $.createCollection = createDialog;
});
$(function ($) {
    var $body = $(document.body),
        thisDia, $style;
    $body.on('click', '.like-privacy', function (ev) {
            if (!thisDia) {
                thisDia = $(document.getElementById('like_privacy_tmpl').innerHTML).on('open', function () {
                    $style = $body.attr('style') || '';
                    $body.css({
                        overflow: 'hidden',
                        marginLeft: $.scrollbarwidth()
                    });
                    thisDia.appendTo($body);
                    $body.on('keydown.esc', function (ev) {
                        if (ev.keyCode == 27) {
                            thisDia.trigger('close');
                        }
                    })
                }).on('close', function () {
                    $body.off('keydown.esc').attr('style', $style);
                    thisDia.detach();
                }).on('click', '.reset', function () {
                    thisDia.trigger('close');
                }).on('click', '.submit', function () {
                    $(this).closest('form').trigger('submit');
                    return false;
                }).on('submit', 'form', function (ev) {
                    var data = $(this).serialize();
                    $.post('/u/doLikePrivacy', data, function (result) {
                        if (result.code == 1000) {
                            $.notify('操作成功', {
                                callback: function () {
                                    location.reload();
                                }
                            });
                            thisDia.trigger('close');
                        } else {
                            $.notify(result.msg, 'error');
                        }
                    }, 'json')
                    return false;
                })
            }
            thisDia.trigger('open');
        })
});
$(function ($) {
    $(document.body).on('click', '#create-article-btn', function () {
        new $.umeditor({
            $body: $('body'),
            $html: $('html'),
            isMobile: $CONF['isMobile'],
            $sync: $CONF['sync'],
            $window: $(window),
            html: ''
        })
        return false;
    });
    $(window).on('article', function (ev, html) {
        $(html).insertAfter($('#create-article-btn'));
        $(window).trigger('layzLoad').trigger('scroll');
    });
});
$(function ($) {
    var $body = $(document.body);
    if ($CONF['is_owner']) {
        $('.title_page').on('mouseenter mouseleave', function (ev) {
            $('.cover-change', this).toggleClass('hide', ev.type == 'mouseleave');
        })
    }
    $body.on('click', '.cover-change', function () {
        var $this = $(this),
            collection_id = $this.attr('data-collection-id');
        $.changeCover(collection_id);
        return false;
    }).on('click', '.collection-edite', function () {
        var $this = $(this),
            param = $this.attr('data-param');
        $.editeCover($.parseJSON(param || false));
        return false;
    }).on('click', '.collection-delete', function () {
        $.delCollection();
        return false;
    })
    $.extend({
        delCollection: function () {
            var thisDia = $(document.getElementById('collection_del').innerHTML).appendTo(document.body).on('click', '.reset', function () {
                thisDia.trigger('closeModal');
                return false;
            }).on('click', '.submit', function () {
                $(this).closest('form').trigger('submit');
                return false;
            }).easyModal({
                autoOpen: true,
                onClose: function () {
                    $(this).parent().remove();
                },
                onOpen: function () {
                    var validate = $(this).validate({
                        rules: {
                            password: {
                                required: true
                            }
                        },
                        messages: {
                            password: {
                                required: $L('密码不能为空')
                            }
                        },
                        errorPlacement: function (error, element) {
                            element.after(error.addClass('msg_error typeface_1 KAITI'));
                        },
                        errorElement: 'div',
                        focusInvalid: true,
                        submitHandler: function (form) {
                            $.post('/u/deleteCollection', $(form).serialize(), function (result) {
                                if (result.code == 1000) {
                                    $.notify('删除成功', {
                                        callback: function () {
                                            if ($CONF['domain']) {
                                                var $domain = '/' + $CONF['domain'];
                                            } else {
                                                var $domain = '/uid/' + (100000 + parseInt($CONF['uid']));
                                            }
                                            location.href = $domain + '/collections';
                                        }
                                    });
                                    thisDia.trigger('closeModal');
                                } else {
                                    validate.showErrors({
                                        password: result.msg
                                    });
                                }
                            }, 'json');
                            return false;
                        }
                    });
                }
            });
        }
    });
});
$(function () {
    if ($CONF['is_owner']) {
        $(document.body).on('click', 'li .show-profile', function (ev) {
            var text, tip, $this = $(this),
                type = $this.attr('data-type'),
                li = $this.closest('li'),
                row_id = $this.attr('data-row-id'),
                show = $this.attr('data-show') || 0,
                container = $('#container'),
                is_owner = $CONF['uid'] == $CONF['oid'],
                is_org = is_owner && $CONF['role'] == 4;
            if (type == 2) {
                    if (is_org) {
                        tip = $L('隐藏后该作品将永久不在此处显示，但是可以在您的新闻列表内找到')
                    } else {
                        tip = $L('隐藏后该作品将永久不在此处显示，但是可以在您的文章列表内找到')
                    }
                    text = $L('确定不在个人主页展示这篇文章吗') + $L('？') + '<span class="span_tip red text_align_l">' + tip + $L('。') + '</span>';;
                } else {
                    if (is_org) {
                        tip = $L('隐藏后该作品将不在此处展示，您可以在相应的艺术家目录内恢复展示')
                    } else {
                        tip = $L('隐藏后该作品将不在此处展示，您可以在相应的作品集中恢复展示')
                    }
                    text = $L('确定不在个人主页展示这件作品吗') + $L('？') + '<span class="span_tip red text_align_l">' + tip + $L('。') + '</span>';
                }
            $.confirm(text, {
                    open: function () {
                        $(this).find('h2').attr('class', 'msg_h2 padding40 padding50');
                    },
                    success: function () {
                        $.post('/u/showAtHome', {
                            row_id: row_id
                        }, function (result) {
                            if (result.code == 1000) {
                                li.fadeOut('fast', function () {
                                    $(this).remove();
                                });
                                $.notify(result.msg, 'success');
                            } else {
                                $.notify(result.msg, 'error');
                            }
                        }, 'json');
                    },
                    YES: '确认隐藏'
                })
            return false;
        })
    }
});
$(function () {
    $(window).on('sns_bind_callback', function (ev, type, isBind) {
        var $this = $('.account_sns a[data-sns=' + type + ']'),
            input = $('input', $this),
            sync = $CONF['sync'];
        if (isBind) {
                input.prop('checked', true);
                $this.attr('data-sync', 1).addClass('on');
            } else {
                input.prop('checked', false);
                $this.removeAttr('data-sync').removeClass('on');
            }
        if (isBind) {
                $.notify($L('绑定成功'), 'success');
            } else {
                $.notify($L('解除绑定成功'), 'success');
            }
        return false;
    });
    var itv, exp = $('.Explanation');
    $('.verify_collect,.Explanation').on('mouseenter mouseleave', function (ev) {
        var $this = $(ev.currentTarget);
        switch (ev.type) {
        case 'mouseenter':
            clearTimeout(itv);
            itv = null;
            exp.show();
            if ($this.hasClass('verify_collect')) {
                var position = $(this).position();
                exp.css({
                    left: position.left - exp.outerWidth() / 2 + $this.outerWidth() / 2 + 3,
                    top: position.top + $this.outerHeight() + 20
                });
            }
            break;
        case 'mouseleave':
            clearTimeout(itv);
            itv = setTimeout(function () {
                exp.hide();
            }, 100);
            break;
        }
    })
});;
$.extend({
    reward: function (params) {
        if ($CONF['row_id'] == '228137') {
            $.notify('名额已满', 'error');
            return false;
        }
        if (!$CONF['is_login']) {
            $.login(function () {
                location.reload();
            });
            return false;
        }
        var html = $.trim($('#tmpl_reward').html()),
            ju = juicer(html, params || {}),
            pushstream, surplus, $el = $(ju).appendTo(document.body);
        $.getScript('http://static.artandus.com/script/plugin/jquery.qrcode.min.js');
        var tmpl = '<div class="modal-header clearfix">\
         <a class="close" href="javascript:;"></a>\
     </div>\
     <div class="modal-body">\
         <div class="headWarp">\
             <div class="head"></div>\
             <h3>打赏成功</h3>\
             <a class="btn t_links_blue" href="http://artand.cn/setting/wallet">查看打赏记录</a>\
         </div>\
     </div>';
        var showsurplus = function () {
                $.post('/payment/surplus', function (result) {
                    if (result.code == 1000) {
                        var $surplus = $('.surplus', $el),
                            label = $surplus.closest('label');
                        surplus = result.surplus;
                        if (surplus > 0) {
                                label.removeClass('radio-checked');
                                $surplus.html('（余额<i class="icon iconfont fa">&#xf00ae;</i>' + surplus + '）');
                            } else {
                                label.addClass('radio-checked');
                                $surplus.html('（余额不足）');
                            }
                    }
                }, 'json');
            }
        var callback = $.noop;
        $el.easyModal({
                autoOpen: true,
                onClose: function () {
                    $(this).parent().remove();
                    pushstream && pushstream.disconnect && pushstream.disconnect();
                    callback();
                },
                updateZIndexOnOpen: false,
                onOpen: function () {
                    var $this = $(this),
                        groups = $('div.radio-group', $el),
                        $money = $('.money', $el),
                        $button = $('button[type=submit]', $this);
                    $el.parent().on('click', '.close', function () {
                            $this.trigger('closeModal');
                            return false;
                        });
                    setTimeout(showsurplus, 100);
                    $el.on('submit', function (ev) {
                            var money = $money.val(),
                                $checked = $('input.payment_type:checked', $el),
                                type = $checked.val();
                            if (!money || money < 0.01) {
                                    $.notify('打赏金额不能小于0.01元哦~', 'error');
                                    return false;
                                }
                            if ($CONF['uid'] && $CONF['uid'] == $CONF['oid']) {
                                    $.notify('自己不能给自己打赏哦', 'error');
                                    return false;
                                }
                            switch (type) {
                                case 'wallet':
                                    if (parseFloat(money) > parseFloat(surplus)) {
                                        $.notify('钱包余额不足~~', 'error');
                                        return false;
                                    }
                                    if ($button.hasClass('lock')) {
                                        return false;
                                    } else {
                                        $button.addClass('lock').text('加载中...');
                                    }
                                    var serialize = $el.serialize();
                                    $.post('/proxy/surplus', serialize, function (result) {
                                        $button.removeClass('lock').text('立即支付');
                                        if (result.code == 1000) {
                                            $el.addClass('modal-cg').html(tmpl).css({
                                                width: 360,
                                                height: 280,
                                                top: '50%',
                                                left: '50%',
                                                position: 'absolute'
                                            });
                                            setTimeout(function () {
                                                $el.trigger('reposition');
                                            }, 1);
                                            callback = function () {
                                                location.reload();
                                            }
                                        } else {
                                            $.notify(result.msg, 'error');
                                        }
                                    }, 'json');
                                    break;
                                case 'alipay':
                                case 'alipay_wap':
                                    $button.addClass('lock').text('加载中...');
                                    setTimeout(function () {
                                        $this && $this.trigger && $this.trigger('closeModal');
                                    }, 3000);
                                    return;
                                case 'wxpay':
                                    if ($button.hasClass('lock')) {
                                        return false;
                                    } else {
                                        $button.addClass('lock').text('加载中...');
                                    }
                                    var serialize = $el.serialize();
                                    $.post('/payment/wxpay/reward', serialize, function (result) {
                                        $button.removeClass('lock').text('立即支付');
                                        if (result.code == 1000) {
                                            var sn = result.sn;
                                            $el.html(result.html).addClass('wx-pay-modal').css({
                                                width: 360
                                            });
                                            $('.Qrcode', $el).qrcode({
                                                width: 170,
                                                height: 170,
                                                text: result.url
                                            });
                                            setTimeout(function () {
                                                $el.trigger('reposition');
                                            }, 1);
                                            if (window.PushStream && $CONF['is_login']) {
                                                pushstream = new PushStream({
                                                    host: location.hostname,
                                                    port: location.port,
                                                    messagesPublishedAfter: 86400000,
                                                    messagesControlByArgument: true
                                                });
                                                pushstream.onmessage = function (result, id, channel) {
                                                    if (channel == sn) {
                                                        callback = function () {
                                                            location.reload();
                                                        }
                                                        $this && $this.trigger && $this.trigger('closeModal');
                                                    }
                                                };
                                                pushstream.addChannel(sn);
                                                pushstream.onerror = $.noop;
                                                $(window).on('beforeunload', function () {
                                                    pushstream.disconnect();
                                                });
                                                setTimeout(function () {
                                                    pushstream.connect();
                                                }, 100);
                                            }
                                        } else {
                                            $.notify('参数错误', 'error');
                                        }
                                    }, 'json');
                                    break;
                                }
                            ev.preventDefault();
                            return false;
                        });
                    groups.on('change', 'input', function () {
                            var $this = $(this),
                                check = $this.prop('checked'),
                                label = $this.closest('label');
                            if (label.hasClass('radio-checked')) {
                                    return false;
                                }
                            if (check) {
                                    label.addClass('ant-radio-checked').siblings('.ant-radio-checked').removeClass('ant-radio-checked');
                                }
                        })
                },
                closeOnEscape: false
            });
    }
});
$(function ($) {
    var reward = function (id, type, $el) {
        $.post('/payment/reward', {
            artid: id,
            type: type
        }, function (result) {
            if (result.code == 1000) {
                $el.siblings('.reward-list').append($($.trim(result.html)));
                $el.hide();
            } else {
                $.notify(result.msg, 'error');
            }
        }, 'json');
    }
    $(document.body).on('click', '.reward-more', function (ev) {
        var $this = $(this),
            id = $this.attr('data-id'),
            type = $this.attr('data-type')
        reward(id, type, $this.closest('div'));
        return false;
    })
});;
$(function ($) {
    var $body = $(document.body),
        limit = 3,
        xhr;
    $body.on('click', '.like-row', function (ev) {
            var $this = $(this),
                parent = $this.parent(),
                uid = $CONF['oid'],
                row_id = $this.attr('data-row-id'),
                like = $this.attr('data-is-like') < 1 ? 1 : 0,
                box = $this.closest('.supportBox'),
                personBox = $('.headbox', box);
            if (!$CONF['is_login']) {
                    $.login(function () {
                        location.reload();
                    });
                    return false;
                }
            if ($this.hasClass('lock')) {
                    return false;
                } else {
                    $this.addClass('lock');
                }
            var doLike = function () {
                    $.post('/proxy/doLike', {
                        id: row_id,
                        like: like,
                        type: 13
                    }, function (result) {
                        if (result.code != 1000) {
                            $.notify($L('网络错误'), 'error');
                        } else {
                            $elem = $('<div class="post_animated_heart post_poof"><span class="heart_left"></span><span class="heart_right"></span></div>');
                            if (!like) {
                                $this.html('<i class="heart"></i><span>' + $L('赞') + '</span>').attr('data-is-like', 0);;
                                parent.removeClass('on');
                                $this.append($elem.addClass('unliked'));
                                $('.head_' + $CONF['uid'], personBox).remove();
                            } else {
                                $this.html('<i class="heart"></i><span>' + result.num_liked + '</span>').attr('data-is-like', 1);
                                parent.addClass('on');
                                $this.append($elem);
                                $CONF['time'] = Math.random();
                                $(juicer('<a href="/${domain}" title="${uname}" class="btn head_p_btn head_${uid}"><img src="${head}" alter="${uname}"></a>', $.extend($CONF, result))).prependTo(personBox);
                            }
                            $this.trigger('like', [like, result.head]);
                            setTimeout(function () {
                                $elem.removeClass('unliked').remove();
                            }, 600);
                        }
                        $this.removeClass('lock');
                        person.trigger('adjust');
                    }, 'json');
                }
            if (like < 1) {
                    $.tinyConfirm($this, {
                        title: '不喜欢该简介了？',
                        callback: doLike
                    });
                } else {
                    doLike();
                }
            return false;
        }).on('click', '.like-comment', function (ev) {
            var $this = $(this),
                row_id = $this.attr('data-row-id'),
                is_liked = $this.attr('data-is-liked'),
                action = is_liked < 1 ? 1 : 0;
            if (!$CONF['is_login']) {
                    $.login(function () {
                        $this.trigger('click');
                        location.reload();
                    });
                    return false;
                }
            $.post('/comment/doLike', {
                    row_id: row_id,
                    action: action
                }, function (result) {
                    if (result.code != 1000) {
                        $.notify(result.msg || $L('网络错误'));
                    }
                }, 'json');
            if (action == 1) {
                    $this.addClass('heart_a_on').removeClass('heart_a').attr('data-is-liked', 1).find('em').text(function (i, text) {
                        return (parseInt(text) || 0) + 1;
                    });
                } else {
                    $this.removeClass('heart_a_on').addClass('heart_a').attr('data-is-liked', 0).find('em').text(function (i, text) {
                        var num = (parseInt(text) || 0) - 1;
                        return num <= 0 ? $L('赞') : num;
                    });
                }
            return false;
        }).on('click', '.delete-comment', function (ev) {
            var $this = $(this),
                comment_id = $this.attr('data-comment-id');
            $.tinyConfirm($this, {
                    title: $L('确定要删除这条评论吗？'),
                    callback: function () {
                        $(this).trigger('close');
                        $.post('/comment/doDelete', {
                            comment_id: comment_id
                        }, function (result) {
                            if (result.code == 1000) {
                                $this.closest('li').fadeOut(function () {
                                    $(this).remove();
                                });
                                $('.num_comment').text(function (i, num) {
                                    return (parseInt(num) || 0) - 1;
                                });
                            } else {
                                $.notify(result.msg, 'error');
                            }
                        }, 'json');
                    }
                });
            return false;
        }).on('click', '#comment_form .submit', function () {
            $(this).closest('form').trigger('submit');
            return false;
        }).on('keydown', 'textarea', function (ev) {
            if (ev.keyCode == 13 && (ev.ctrlKey || ev.metaKey)) {
                $(this).closest('form').trigger('submit');
                return false;
            }
        }).on('submit', '.comment_form', function (ev) {
            var $this = $(this),
                textarea = $('textarea', $this),
                val = $.trim(textarea.val()),
                comment_list = $('#comment_list');
            if (!$CONF['is_login']) {
                    $.login(function () {
                        location.reload();
                    });
                    return false;
                }
            if (!val.length) {
                    textarea.shine(function () {
                        $(this).css({
                            background: 'none'
                        })
                    });
                    return false;
                }
            if ($this.hasClass('lock')) {
                    return false;
                } else {
                    $this.addClass('lock');
                }
            $.post('/comment/doComment', $this.serialize(), function (result) {
                    if (result.code == 1000) {
                        $('.reply_uid', $this).val(0);
                        $('.reply_comment_id', $this).val(0);
                        $this.trigger('reset');
                        var li = $(result.html).prependTo($('ul', comment_list)),
                            height = li.outerHeight();
                        if (!$CONF['isMobile']) {
                                li.css({
                                    height: 0
                                }).animate({
                                    height: height
                                }, 'normal', 'swing', function () {
                                    li.css('height', 'auto');
                                });
                            }
                        $('html,body').animate({
                                scrollTop: li.offset().top
                            }, 'fast', 'swing');
                        $('.num_comment').text(function (i, num) {
                                return (parseInt(num) || 0) + 1;
                            });
                    } else {
                        $.notify(result.msg, 'error');
                    }
                    $this.removeClass('lock');
                }, 'json');
            return false;
        }).on('click', '.report', function () {
            var $this = $(this),
                report = $this.attr('data-report');
            $.report($.parseJSON(report));
            return false;
        }).on('mouseenter mouseleave', '#comment_list li', function (ev) {
            $(this).toggleClass('hover', ev.type == 'mouseenter');
        }).on('click', '.reply', function (ev) {
            var $this = $(this),
                dash = '：',
                comment_id = $this.attr('data-comment-id'),
                uname = $this.attr('data-reply-uname'),
                uid = $this.attr('data-reply-uid'),
                length = 0;
            $('input.reply_uid', $('#comment_form')).val(uid);
            $('input.reply_comment_id', $('#comment_form')).val(comment_id);
            var textarea = $('textarea', $('#comment_form')).val(function (i, text) {
                    text = text.replace(/回复@[^\s]+?(：)/, '');
                    text = '回复@' + uname + dash + text;
                    length = text.length
                    return text;
                });
            $.setCursor(textarea[0], length);
        }).on('focusin', '#comment_form textarea', function () {
            checkLogin();
            lazyForm(false);
        }).on('click', '.phiz_btn', function () {
            checkLogin();
            lazyForm(true);
        }).on('click', '.unfold_btn', function (ev) {
            person.closest('.supportBox').toggleClass('on');
            person.trigger('adjust');
            return false;
        });
    var person = $('.headbox'),
        outerWidth = person.outerWidth(),
        children = $('> a', person),
        w = children.outerWidth(true),
        mx = Math.floor(outerWidth / w),
        unfold = $('<a href="javascript:;" class="btn unfold_btn head_p_btn"><span><img src=""></span></a>');
    person.on('adjust', function () {
            var support = $(this).closest('.supportBox'),
                children = $('> a', person).not(unfold);
            if (support.hasClass('on')) {
                    children.show().find('img[data-src]').trigger('appear');
                } else if (children.length > mx) {
                    children.each(function (i) {
                        $(this).toggle(i <= mx - 2 ? true : false);
                    })
                }
            if (children.length > mx) {
                    person.append(unfold);
                } else {
                    unfold.detach();
                }
        }).trigger('adjust');
    var checkLogin = function () {
            if (!$CONF['is_login']) {
                if ($CONF['isMobile'] || $CONF['isIpad']) {
                    location.href = "/login?callback=" + location.href;
                } else {
                    $.login(function () {
                        location.reload();
                    });
                }
                return false;
            }
        }
    var lazyForm = function (trigger_click) {
            var textarea = $('textarea', $('#comment_form'));
            var emotions_btn = $('.phiz_btn');
            if ($CONF['is_login'] && !emotions_btn.data('emotions')) {
                var emotions = new $.emotions({
                    $body: $('body'),
                    $btn: emotions_btn,
                    $text: textarea
                });
                emotions_btn.after(emotions.$el)
                textarea.closest('form').on('submit', function () {
                    emotions.$el.hide();
                })
                if (!$CONF['isMobile']) {
                    $('#comment_text').atwho(at_config)
                }
                trigger_click && emotions_btn.trigger('click');
                emotions_btn.data('emotions', 1);
            }
        }
    if ($.card) {
            $.card(document.body);
        }
    if ($.reward) {
            $(document.body).on('click', '.btn_reward', function () {
                $.reward({
                    type: 13
                });
            })
        }
    $.extend({
            report: function (params) {
                var params = params || {},
                    dialog = $(juicer(document.getElementById('report_tmpl').innerHTML, params)).appendTo(document.body).easyModal({
                        autoOpen: true,
                        onClose: function () {
                            $(this).parent().remove();
                        },
                        updateZIndexOnOpen: false,
                        onOpen: function () {
                            var $this = $(this);
                            $this.on('click', '.x-close', function () {
                                $this.trigger('closeModal');
                                return false;
                            }).on('checked', 'input', function (ev) {
                                var val = this.value,
                                    form = $('.report-other', dialog);
                                form.toggleClass('hide', val != 4 && val != 3);
                                $this.trigger('reposition');
                            }).on('click', '.submit', function (ev) {
                                $('form', $this).trigger('submit');
                                return false;
                            }).on('submit', 'form', function () {
                                var input = $('input:checked', $this),
                                    textarea = $('textarea', $this),
                                    val = $.trim(textarea.val());
                                if (input.val() == 4 && !val.length) {
                                        textarea.shine();
                                        return false;
                                    }
                                $.post('/proxy/doReport', $(this).serialize(), function (result) {
                                        if (result.code == 1000) {
                                            $.notify($L('举报成功'));
                                            $this.trigger('closeModal');
                                        } else {
                                            $.notify(result.msg, 'error');
                                        }
                                    }, 'json');
                                return false;
                            }).find('textarea').trigger('blur');
                        }
                    });
                return false;
            },
            setCursor: function (ctrl, pos) {
                if (ctrl.setSelectionRange) {
                    ctrl.focus();
                    ctrl.setSelectionRange(pos, pos);
                }
                else if (ctrl.createTextRange) {
                    var range = ctrl.createTextRange();
                    range.collapse(true);
                    range.moveEnd('character', pos);
                    range.moveStart('character', pos);
                    range.select();
                }
            }
        });
});