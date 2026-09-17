function fd(e, t) {
  for (var n = 0; n < t.length; n++) {
    const r = t[n];
    if (typeof r != "string" && !Array.isArray(r)) {
      for (const l in r)
        if (l !== "default" && !(l in e)) {
          const i = Object.getOwnPropertyDescriptor(r, l);
          i &&
            Object.defineProperty(
              e,
              l,
              i.get ? i : { enumerable: !0, get: () => r[l] },
            );
        }
    }
  }
  return Object.freeze(
    Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
  );
}
(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const l of document.querySelectorAll('link[rel="modulepreload"]')) r(l);
  new MutationObserver((l) => {
    for (const i of l)
      if (i.type === "childList")
        for (const o of i.addedNodes)
          o.tagName === "LINK" && o.rel === "modulepreload" && r(o);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(l) {
    const i = {};
    return (
      l.integrity && (i.integrity = l.integrity),
      l.referrerPolicy && (i.referrerPolicy = l.referrerPolicy),
      l.crossOrigin === "use-credentials"
        ? (i.credentials = "include")
        : l.crossOrigin === "anonymous"
          ? (i.credentials = "omit")
          : (i.credentials = "same-origin"),
      i
    );
  }
  function r(l) {
    if (l.ep) return;
    l.ep = !0;
    const i = n(l);
    fetch(l.href, i);
  }
})();
function pd(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default")
    ? e.default
    : e;
}
var Fs = { exports: {} },
  Nl = {},
  Us = { exports: {} },
  z = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var vr = Symbol.for("react.element"),
  hd = Symbol.for("react.portal"),
  md = Symbol.for("react.fragment"),
  vd = Symbol.for("react.strict_mode"),
  gd = Symbol.for("react.profiler"),
  yd = Symbol.for("react.provider"),
  xd = Symbol.for("react.context"),
  wd = Symbol.for("react.forward_ref"),
  Sd = Symbol.for("react.suspense"),
  kd = Symbol.for("react.memo"),
  Ed = Symbol.for("react.lazy"),
  yu = Symbol.iterator;
function Cd(e) {
  return e === null || typeof e != "object"
    ? null
    : ((e = (yu && e[yu]) || e["@@iterator"]),
      typeof e == "function" ? e : null);
}
var $s = {
    isMounted: function () {
      return !1;
    },
    enqueueForceUpdate: function () {},
    enqueueReplaceState: function () {},
    enqueueSetState: function () {},
  },
  As = Object.assign,
  Bs = {};
function wn(e, t, n) {
  ((this.props = e),
    (this.context = t),
    (this.refs = Bs),
    (this.updater = n || $s));
}
wn.prototype.isReactComponent = {};
wn.prototype.setState = function (e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null)
    throw Error(
      "setState(...): takes an object of state variables to update or a function which returns an object of state variables.",
    );
  this.updater.enqueueSetState(this, e, t, "setState");
};
wn.prototype.forceUpdate = function (e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function Vs() {}
Vs.prototype = wn.prototype;
function wo(e, t, n) {
  ((this.props = e),
    (this.context = t),
    (this.refs = Bs),
    (this.updater = n || $s));
}
var So = (wo.prototype = new Vs());
So.constructor = wo;
As(So, wn.prototype);
So.isPureReactComponent = !0;
var xu = Array.isArray,
  Ws = Object.prototype.hasOwnProperty,
  ko = { current: null },
  Qs = { key: !0, ref: !0, __self: !0, __source: !0 };
function Hs(e, t, n) {
  var r,
    l = {},
    i = null,
    o = null;
  if (t != null)
    for (r in (t.ref !== void 0 && (o = t.ref),
    t.key !== void 0 && (i = "" + t.key),
    t))
      Ws.call(t, r) && !Qs.hasOwnProperty(r) && (l[r] = t[r]);
  var u = arguments.length - 2;
  if (u === 1) l.children = n;
  else if (1 < u) {
    for (var a = Array(u), d = 0; d < u; d++) a[d] = arguments[d + 2];
    l.children = a;
  }
  if (e && e.defaultProps)
    for (r in ((u = e.defaultProps), u)) l[r] === void 0 && (l[r] = u[r]);
  return {
    $$typeof: vr,
    type: e,
    key: i,
    ref: o,
    props: l,
    _owner: ko.current,
  };
}
function jd(e, t) {
  return {
    $$typeof: vr,
    type: e.type,
    key: t,
    ref: e.ref,
    props: e.props,
    _owner: e._owner,
  };
}
function Eo(e) {
  return typeof e == "object" && e !== null && e.$$typeof === vr;
}
function Nd(e) {
  var t = { "=": "=0", ":": "=2" };
  return (
    "$" +
    e.replace(/[=:]/g, function (n) {
      return t[n];
    })
  );
}
var wu = /\/+/g;
function Xl(e, t) {
  return typeof e == "object" && e !== null && e.key != null
    ? Nd("" + e.key)
    : t.toString(36);
}
function Br(e, t, n, r, l) {
  var i = typeof e;
  (i === "undefined" || i === "boolean") && (e = null);
  var o = !1;
  if (e === null) o = !0;
  else
    switch (i) {
      case "string":
      case "number":
        o = !0;
        break;
      case "object":
        switch (e.$$typeof) {
          case vr:
          case hd:
            o = !0;
        }
    }
  if (o)
    return (
      (o = e),
      (l = l(o)),
      (e = r === "" ? "." + Xl(o, 0) : r),
      xu(l)
        ? ((n = ""),
          e != null && (n = e.replace(wu, "$&/") + "/"),
          Br(l, t, n, "", function (d) {
            return d;
          }))
        : l != null &&
          (Eo(l) &&
            (l = jd(
              l,
              n +
                (!l.key || (o && o.key === l.key)
                  ? ""
                  : ("" + l.key).replace(wu, "$&/") + "/") +
                e,
            )),
          t.push(l)),
      1
    );
  if (((o = 0), (r = r === "" ? "." : r + ":"), xu(e)))
    for (var u = 0; u < e.length; u++) {
      i = e[u];
      var a = r + Xl(i, u);
      o += Br(i, t, n, a, l);
    }
  else if (((a = Cd(e)), typeof a == "function"))
    for (e = a.call(e), u = 0; !(i = e.next()).done; )
      ((i = i.value), (a = r + Xl(i, u++)), (o += Br(i, t, n, a, l)));
  else if (i === "object")
    throw (
      (t = String(e)),
      Error(
        "Objects are not valid as a React child (found: " +
          (t === "[object Object]"
            ? "object with keys {" + Object.keys(e).join(", ") + "}"
            : t) +
          "). If you meant to render a collection of children, use an array instead.",
      )
    );
  return o;
}
function Cr(e, t, n) {
  if (e == null) return e;
  var r = [],
    l = 0;
  return (
    Br(e, r, "", "", function (i) {
      return t.call(n, i, l++);
    }),
    r
  );
}
function Pd(e) {
  if (e._status === -1) {
    var t = e._result;
    ((t = t()),
      t.then(
        function (n) {
          (e._status === 0 || e._status === -1) &&
            ((e._status = 1), (e._result = n));
        },
        function (n) {
          (e._status === 0 || e._status === -1) &&
            ((e._status = 2), (e._result = n));
        },
      ),
      e._status === -1 && ((e._status = 0), (e._result = t)));
  }
  if (e._status === 1) return e._result.default;
  throw e._result;
}
var de = { current: null },
  Vr = { transition: null },
  _d = {
    ReactCurrentDispatcher: de,
    ReactCurrentBatchConfig: Vr,
    ReactCurrentOwner: ko,
  };
function Ks() {
  throw Error("act(...) is not supported in production builds of React.");
}
z.Children = {
  map: Cr,
  forEach: function (e, t, n) {
    Cr(
      e,
      function () {
        t.apply(this, arguments);
      },
      n,
    );
  },
  count: function (e) {
    var t = 0;
    return (
      Cr(e, function () {
        t++;
      }),
      t
    );
  },
  toArray: function (e) {
    return (
      Cr(e, function (t) {
        return t;
      }) || []
    );
  },
  only: function (e) {
    if (!Eo(e))
      throw Error(
        "React.Children.only expected to receive a single React element child.",
      );
    return e;
  },
};
z.Component = wn;
z.Fragment = md;
z.Profiler = gd;
z.PureComponent = wo;
z.StrictMode = vd;
z.Suspense = Sd;
z.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = _d;
z.act = Ks;
z.cloneElement = function (e, t, n) {
  if (e == null)
    throw Error(
      "React.cloneElement(...): The argument must be a React element, but you passed " +
        e +
        ".",
    );
  var r = As({}, e.props),
    l = e.key,
    i = e.ref,
    o = e._owner;
  if (t != null) {
    if (
      (t.ref !== void 0 && ((i = t.ref), (o = ko.current)),
      t.key !== void 0 && (l = "" + t.key),
      e.type && e.type.defaultProps)
    )
      var u = e.type.defaultProps;
    for (a in t)
      Ws.call(t, a) &&
        !Qs.hasOwnProperty(a) &&
        (r[a] = t[a] === void 0 && u !== void 0 ? u[a] : t[a]);
  }
  var a = arguments.length - 2;
  if (a === 1) r.children = n;
  else if (1 < a) {
    u = Array(a);
    for (var d = 0; d < a; d++) u[d] = arguments[d + 2];
    r.children = u;
  }
  return { $$typeof: vr, type: e.type, key: l, ref: i, props: r, _owner: o };
};
z.createContext = function (e) {
  return (
    (e = {
      $$typeof: xd,
      _currentValue: e,
      _currentValue2: e,
      _threadCount: 0,
      Provider: null,
      Consumer: null,
      _defaultValue: null,
      _globalName: null,
    }),
    (e.Provider = { $$typeof: yd, _context: e }),
    (e.Consumer = e)
  );
};
z.createElement = Hs;
z.createFactory = function (e) {
  var t = Hs.bind(null, e);
  return ((t.type = e), t);
};
z.createRef = function () {
  return { current: null };
};
z.forwardRef = function (e) {
  return { $$typeof: wd, render: e };
};
z.isValidElement = Eo;
z.lazy = function (e) {
  return { $$typeof: Ed, _payload: { _status: -1, _result: e }, _init: Pd };
};
z.memo = function (e, t) {
  return { $$typeof: kd, type: e, compare: t === void 0 ? null : t };
};
z.startTransition = function (e) {
  var t = Vr.transition;
  Vr.transition = {};
  try {
    e();
  } finally {
    Vr.transition = t;
  }
};
z.unstable_act = Ks;
z.useCallback = function (e, t) {
  return de.current.useCallback(e, t);
};
z.useContext = function (e) {
  return de.current.useContext(e);
};
z.useDebugValue = function () {};
z.useDeferredValue = function (e) {
  return de.current.useDeferredValue(e);
};
z.useEffect = function (e, t) {
  return de.current.useEffect(e, t);
};
z.useId = function () {
  return de.current.useId();
};
z.useImperativeHandle = function (e, t, n) {
  return de.current.useImperativeHandle(e, t, n);
};
z.useInsertionEffect = function (e, t) {
  return de.current.useInsertionEffect(e, t);
};
z.useLayoutEffect = function (e, t) {
  return de.current.useLayoutEffect(e, t);
};
z.useMemo = function (e, t) {
  return de.current.useMemo(e, t);
};
z.useReducer = function (e, t, n) {
  return de.current.useReducer(e, t, n);
};
z.useRef = function (e) {
  return de.current.useRef(e);
};
z.useState = function (e) {
  return de.current.useState(e);
};
z.useSyncExternalStore = function (e, t, n) {
  return de.current.useSyncExternalStore(e, t, n);
};
z.useTransition = function () {
  return de.current.useTransition();
};
z.version = "18.3.1";
Us.exports = z;
var x = Us.exports;
const Ld = pd(x),
  Rd = fd({ __proto__: null, default: Ld }, [x]);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Td = x,
  Od = Symbol.for("react.element"),
  zd = Symbol.for("react.fragment"),
  Id = Object.prototype.hasOwnProperty,
  Dd = Td.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
  Md = { key: !0, ref: !0, __self: !0, __source: !0 };
function Ys(e, t, n) {
  var r,
    l = {},
    i = null,
    o = null;
  (n !== void 0 && (i = "" + n),
    t.key !== void 0 && (i = "" + t.key),
    t.ref !== void 0 && (o = t.ref));
  for (r in t) Id.call(t, r) && !Md.hasOwnProperty(r) && (l[r] = t[r]);
  if (e && e.defaultProps)
    for (r in ((t = e.defaultProps), t)) l[r] === void 0 && (l[r] = t[r]);
  return {
    $$typeof: Od,
    type: e,
    key: i,
    ref: o,
    props: l,
    _owner: Dd.current,
  };
}
Nl.Fragment = zd;
Nl.jsx = Ys;
Nl.jsxs = Ys;
Fs.exports = Nl;
var s = Fs.exports,
  Xs = { exports: {} },
  je = {},
  Gs = { exports: {} },
  Js = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ (function (e) {
  function t(N, R) {
    var O = N.length;
    N.push(R);
    e: for (; 0 < O; ) {
      var K = (O - 1) >>> 1,
        q = N[K];
      if (0 < l(q, R)) ((N[K] = R), (N[O] = q), (O = K));
      else break e;
    }
  }
  function n(N) {
    return N.length === 0 ? null : N[0];
  }
  function r(N) {
    if (N.length === 0) return null;
    var R = N[0],
      O = N.pop();
    if (O !== R) {
      N[0] = O;
      e: for (var K = 0, q = N.length, kr = q >>> 1; K < kr; ) {
        var Lt = 2 * (K + 1) - 1,
          Yl = N[Lt],
          Rt = Lt + 1,
          Er = N[Rt];
        if (0 > l(Yl, O))
          Rt < q && 0 > l(Er, Yl)
            ? ((N[K] = Er), (N[Rt] = O), (K = Rt))
            : ((N[K] = Yl), (N[Lt] = O), (K = Lt));
        else if (Rt < q && 0 > l(Er, O)) ((N[K] = Er), (N[Rt] = O), (K = Rt));
        else break e;
      }
    }
    return R;
  }
  function l(N, R) {
    var O = N.sortIndex - R.sortIndex;
    return O !== 0 ? O : N.id - R.id;
  }
  if (typeof performance == "object" && typeof performance.now == "function") {
    var i = performance;
    e.unstable_now = function () {
      return i.now();
    };
  } else {
    var o = Date,
      u = o.now();
    e.unstable_now = function () {
      return o.now() - u;
    };
  }
  var a = [],
    d = [],
    h = 1,
    m = null,
    v = 3,
    w = !1,
    S = !1,
    g = !1,
    E = typeof setTimeout == "function" ? setTimeout : null,
    c = typeof clearTimeout == "function" ? clearTimeout : null,
    f = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" &&
    navigator.scheduling !== void 0 &&
    navigator.scheduling.isInputPending !== void 0 &&
    navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function p(N) {
    for (var R = n(d); R !== null; ) {
      if (R.callback === null) r(d);
      else if (R.startTime <= N)
        (r(d), (R.sortIndex = R.expirationTime), t(a, R));
      else break;
      R = n(d);
    }
  }
  function y(N) {
    if (((g = !1), p(N), !S))
      if (n(a) !== null) ((S = !0), Hl(C));
      else {
        var R = n(d);
        R !== null && Kl(y, R.startTime - N);
      }
  }
  function C(N, R) {
    ((S = !1), g && ((g = !1), c(L), (L = -1)), (w = !0));
    var O = v;
    try {
      for (
        p(R), m = n(a);
        m !== null && (!(m.expirationTime > R) || (N && !we()));
      ) {
        var K = m.callback;
        if (typeof K == "function") {
          ((m.callback = null), (v = m.priorityLevel));
          var q = K(m.expirationTime <= R);
          ((R = e.unstable_now()),
            typeof q == "function" ? (m.callback = q) : m === n(a) && r(a),
            p(R));
        } else r(a);
        m = n(a);
      }
      if (m !== null) var kr = !0;
      else {
        var Lt = n(d);
        (Lt !== null && Kl(y, Lt.startTime - R), (kr = !1));
      }
      return kr;
    } finally {
      ((m = null), (v = O), (w = !1));
    }
  }
  var P = !1,
    _ = null,
    L = -1,
    A = 5,
    T = -1;
  function we() {
    return !(e.unstable_now() - T < A);
  }
  function Nn() {
    if (_ !== null) {
      var N = e.unstable_now();
      T = N;
      var R = !0;
      try {
        R = _(!0, N);
      } finally {
        R ? Pn() : ((P = !1), (_ = null));
      }
    } else P = !1;
  }
  var Pn;
  if (typeof f == "function")
    Pn = function () {
      f(Nn);
    };
  else if (typeof MessageChannel < "u") {
    var gu = new MessageChannel(),
      dd = gu.port2;
    ((gu.port1.onmessage = Nn),
      (Pn = function () {
        dd.postMessage(null);
      }));
  } else
    Pn = function () {
      E(Nn, 0);
    };
  function Hl(N) {
    ((_ = N), P || ((P = !0), Pn()));
  }
  function Kl(N, R) {
    L = E(function () {
      N(e.unstable_now());
    }, R);
  }
  ((e.unstable_IdlePriority = 5),
    (e.unstable_ImmediatePriority = 1),
    (e.unstable_LowPriority = 4),
    (e.unstable_NormalPriority = 3),
    (e.unstable_Profiling = null),
    (e.unstable_UserBlockingPriority = 2),
    (e.unstable_cancelCallback = function (N) {
      N.callback = null;
    }),
    (e.unstable_continueExecution = function () {
      S || w || ((S = !0), Hl(C));
    }),
    (e.unstable_forceFrameRate = function (N) {
      0 > N || 125 < N
        ? console.error(
            "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported",
          )
        : (A = 0 < N ? Math.floor(1e3 / N) : 5);
    }),
    (e.unstable_getCurrentPriorityLevel = function () {
      return v;
    }),
    (e.unstable_getFirstCallbackNode = function () {
      return n(a);
    }),
    (e.unstable_next = function (N) {
      switch (v) {
        case 1:
        case 2:
        case 3:
          var R = 3;
          break;
        default:
          R = v;
      }
      var O = v;
      v = R;
      try {
        return N();
      } finally {
        v = O;
      }
    }),
    (e.unstable_pauseExecution = function () {}),
    (e.unstable_requestPaint = function () {}),
    (e.unstable_runWithPriority = function (N, R) {
      switch (N) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          N = 3;
      }
      var O = v;
      v = N;
      try {
        return R();
      } finally {
        v = O;
      }
    }),
    (e.unstable_scheduleCallback = function (N, R, O) {
      var K = e.unstable_now();
      switch (
        (typeof O == "object" && O !== null
          ? ((O = O.delay), (O = typeof O == "number" && 0 < O ? K + O : K))
          : (O = K),
        N)
      ) {
        case 1:
          var q = -1;
          break;
        case 2:
          q = 250;
          break;
        case 5:
          q = 1073741823;
          break;
        case 4:
          q = 1e4;
          break;
        default:
          q = 5e3;
      }
      return (
        (q = O + q),
        (N = {
          id: h++,
          callback: R,
          priorityLevel: N,
          startTime: O,
          expirationTime: q,
          sortIndex: -1,
        }),
        O > K
          ? ((N.sortIndex = O),
            t(d, N),
            n(a) === null &&
              N === n(d) &&
              (g ? (c(L), (L = -1)) : (g = !0), Kl(y, O - K)))
          : ((N.sortIndex = q), t(a, N), S || w || ((S = !0), Hl(C))),
        N
      );
    }),
    (e.unstable_shouldYield = we),
    (e.unstable_wrapCallback = function (N) {
      var R = v;
      return function () {
        var O = v;
        v = R;
        try {
          return N.apply(this, arguments);
        } finally {
          v = O;
        }
      };
    }));
})(Js);
Gs.exports = Js;
var Fd = Gs.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Ud = x,
  Ce = Fd;
function k(e) {
  for (
    var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1;
    n < arguments.length;
    n++
  )
    t += "&args[]=" + encodeURIComponent(arguments[n]);
  return (
    "Minified React error #" +
    e +
    "; visit " +
    t +
    " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
  );
}
var Zs = new Set(),
  Zn = {};
function Wt(e, t) {
  (fn(e, t), fn(e + "Capture", t));
}
function fn(e, t) {
  for (Zn[e] = t, e = 0; e < t.length; e++) Zs.add(t[e]);
}
var be = !(
    typeof window > "u" ||
    typeof window.document > "u" ||
    typeof window.document.createElement > "u"
  ),
  Ei = Object.prototype.hasOwnProperty,
  $d =
    /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
  Su = {},
  ku = {};
function Ad(e) {
  return Ei.call(ku, e)
    ? !0
    : Ei.call(Su, e)
      ? !1
      : $d.test(e)
        ? (ku[e] = !0)
        : ((Su[e] = !0), !1);
}
function Bd(e, t, n, r) {
  if (n !== null && n.type === 0) return !1;
  switch (typeof t) {
    case "function":
    case "symbol":
      return !0;
    case "boolean":
      return r
        ? !1
        : n !== null
          ? !n.acceptsBooleans
          : ((e = e.toLowerCase().slice(0, 5)), e !== "data-" && e !== "aria-");
    default:
      return !1;
  }
}
function Vd(e, t, n, r) {
  if (t === null || typeof t > "u" || Bd(e, t, n, r)) return !0;
  if (r) return !1;
  if (n !== null)
    switch (n.type) {
      case 3:
        return !t;
      case 4:
        return t === !1;
      case 5:
        return isNaN(t);
      case 6:
        return isNaN(t) || 1 > t;
    }
  return !1;
}
function fe(e, t, n, r, l, i, o) {
  ((this.acceptsBooleans = t === 2 || t === 3 || t === 4),
    (this.attributeName = r),
    (this.attributeNamespace = l),
    (this.mustUseProperty = n),
    (this.propertyName = e),
    (this.type = t),
    (this.sanitizeURL = i),
    (this.removeEmptyString = o));
}
var re = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style"
  .split(" ")
  .forEach(function (e) {
    re[e] = new fe(e, 0, !1, e, null, !1, !1);
  });
[
  ["acceptCharset", "accept-charset"],
  ["className", "class"],
  ["htmlFor", "for"],
  ["httpEquiv", "http-equiv"],
].forEach(function (e) {
  var t = e[0];
  re[t] = new fe(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function (e) {
  re[e] = new fe(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
[
  "autoReverse",
  "externalResourcesRequired",
  "focusable",
  "preserveAlpha",
].forEach(function (e) {
  re[e] = new fe(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope"
  .split(" ")
  .forEach(function (e) {
    re[e] = new fe(e, 3, !1, e.toLowerCase(), null, !1, !1);
  });
["checked", "multiple", "muted", "selected"].forEach(function (e) {
  re[e] = new fe(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function (e) {
  re[e] = new fe(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function (e) {
  re[e] = new fe(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function (e) {
  re[e] = new fe(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var Co = /[\-:]([a-z])/g;
function jo(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height"
  .split(" ")
  .forEach(function (e) {
    var t = e.replace(Co, jo);
    re[t] = new fe(t, 1, !1, e, null, !1, !1);
  });
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type"
  .split(" ")
  .forEach(function (e) {
    var t = e.replace(Co, jo);
    re[t] = new fe(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
  });
["xml:base", "xml:lang", "xml:space"].forEach(function (e) {
  var t = e.replace(Co, jo);
  re[t] = new fe(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function (e) {
  re[e] = new fe(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
re.xlinkHref = new fe(
  "xlinkHref",
  1,
  !1,
  "xlink:href",
  "http://www.w3.org/1999/xlink",
  !0,
  !1,
);
["src", "href", "action", "formAction"].forEach(function (e) {
  re[e] = new fe(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function No(e, t, n, r) {
  var l = re.hasOwnProperty(t) ? re[t] : null;
  (l !== null
    ? l.type !== 0
    : r ||
      !(2 < t.length) ||
      (t[0] !== "o" && t[0] !== "O") ||
      (t[1] !== "n" && t[1] !== "N")) &&
    (Vd(t, n, l, r) && (n = null),
    r || l === null
      ? Ad(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n))
      : l.mustUseProperty
        ? (e[l.propertyName] = n === null ? (l.type === 3 ? !1 : "") : n)
        : ((t = l.attributeName),
          (r = l.attributeNamespace),
          n === null
            ? e.removeAttribute(t)
            : ((l = l.type),
              (n = l === 3 || (l === 4 && n === !0) ? "" : "" + n),
              r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var rt = Ud.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
  jr = Symbol.for("react.element"),
  Yt = Symbol.for("react.portal"),
  Xt = Symbol.for("react.fragment"),
  Po = Symbol.for("react.strict_mode"),
  Ci = Symbol.for("react.profiler"),
  qs = Symbol.for("react.provider"),
  bs = Symbol.for("react.context"),
  _o = Symbol.for("react.forward_ref"),
  ji = Symbol.for("react.suspense"),
  Ni = Symbol.for("react.suspense_list"),
  Lo = Symbol.for("react.memo"),
  ot = Symbol.for("react.lazy"),
  ea = Symbol.for("react.offscreen"),
  Eu = Symbol.iterator;
function _n(e) {
  return e === null || typeof e != "object"
    ? null
    : ((e = (Eu && e[Eu]) || e["@@iterator"]),
      typeof e == "function" ? e : null);
}
var Q = Object.assign,
  Gl;
function Un(e) {
  if (Gl === void 0)
    try {
      throw Error();
    } catch (n) {
      var t = n.stack.trim().match(/\n( *(at )?)/);
      Gl = (t && t[1]) || "";
    }
  return (
    `
` +
    Gl +
    e
  );
}
var Jl = !1;
function Zl(e, t) {
  if (!e || Jl) return "";
  Jl = !0;
  var n = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (t)
      if (
        ((t = function () {
          throw Error();
        }),
        Object.defineProperty(t.prototype, "props", {
          set: function () {
            throw Error();
          },
        }),
        typeof Reflect == "object" && Reflect.construct)
      ) {
        try {
          Reflect.construct(t, []);
        } catch (d) {
          var r = d;
        }
        Reflect.construct(e, [], t);
      } else {
        try {
          t.call();
        } catch (d) {
          r = d;
        }
        e.call(t.prototype);
      }
    else {
      try {
        throw Error();
      } catch (d) {
        r = d;
      }
      e();
    }
  } catch (d) {
    if (d && r && typeof d.stack == "string") {
      for (
        var l = d.stack.split(`
`),
          i = r.stack.split(`
`),
          o = l.length - 1,
          u = i.length - 1;
        1 <= o && 0 <= u && l[o] !== i[u];
      )
        u--;
      for (; 1 <= o && 0 <= u; o--, u--)
        if (l[o] !== i[u]) {
          if (o !== 1 || u !== 1)
            do
              if ((o--, u--, 0 > u || l[o] !== i[u])) {
                var a =
                  `
` + l[o].replace(" at new ", " at ");
                return (
                  e.displayName &&
                    a.includes("<anonymous>") &&
                    (a = a.replace("<anonymous>", e.displayName)),
                  a
                );
              }
            while (1 <= o && 0 <= u);
          break;
        }
    }
  } finally {
    ((Jl = !1), (Error.prepareStackTrace = n));
  }
  return (e = e ? e.displayName || e.name : "") ? Un(e) : "";
}
function Wd(e) {
  switch (e.tag) {
    case 5:
      return Un(e.type);
    case 16:
      return Un("Lazy");
    case 13:
      return Un("Suspense");
    case 19:
      return Un("SuspenseList");
    case 0:
    case 2:
    case 15:
      return ((e = Zl(e.type, !1)), e);
    case 11:
      return ((e = Zl(e.type.render, !1)), e);
    case 1:
      return ((e = Zl(e.type, !0)), e);
    default:
      return "";
  }
}
function Pi(e) {
  if (e == null) return null;
  if (typeof e == "function") return e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case Xt:
      return "Fragment";
    case Yt:
      return "Portal";
    case Ci:
      return "Profiler";
    case Po:
      return "StrictMode";
    case ji:
      return "Suspense";
    case Ni:
      return "SuspenseList";
  }
  if (typeof e == "object")
    switch (e.$$typeof) {
      case bs:
        return (e.displayName || "Context") + ".Consumer";
      case qs:
        return (e._context.displayName || "Context") + ".Provider";
      case _o:
        var t = e.render;
        return (
          (e = e.displayName),
          e ||
            ((e = t.displayName || t.name || ""),
            (e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")),
          e
        );
      case Lo:
        return (
          (t = e.displayName || null),
          t !== null ? t : Pi(e.type) || "Memo"
        );
      case ot:
        ((t = e._payload), (e = e._init));
        try {
          return Pi(e(t));
        } catch {}
    }
  return null;
}
function Qd(e) {
  var t = e.type;
  switch (e.tag) {
    case 24:
      return "Cache";
    case 9:
      return (t.displayName || "Context") + ".Consumer";
    case 10:
      return (t._context.displayName || "Context") + ".Provider";
    case 18:
      return "DehydratedFragment";
    case 11:
      return (
        (e = t.render),
        (e = e.displayName || e.name || ""),
        t.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")
      );
    case 7:
      return "Fragment";
    case 5:
      return t;
    case 4:
      return "Portal";
    case 3:
      return "Root";
    case 6:
      return "Text";
    case 16:
      return Pi(t);
    case 8:
      return t === Po ? "StrictMode" : "Mode";
    case 22:
      return "Offscreen";
    case 12:
      return "Profiler";
    case 21:
      return "Scope";
    case 13:
      return "Suspense";
    case 19:
      return "SuspenseList";
    case 25:
      return "TracingMarker";
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
      if (typeof t == "function") return t.displayName || t.name || null;
      if (typeof t == "string") return t;
  }
  return null;
}
function Et(e) {
  switch (typeof e) {
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return e;
    case "object":
      return e;
    default:
      return "";
  }
}
function ta(e) {
  var t = e.type;
  return (
    (e = e.nodeName) &&
    e.toLowerCase() === "input" &&
    (t === "checkbox" || t === "radio")
  );
}
function Hd(e) {
  var t = ta(e) ? "checked" : "value",
    n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
    r = "" + e[t];
  if (
    !e.hasOwnProperty(t) &&
    typeof n < "u" &&
    typeof n.get == "function" &&
    typeof n.set == "function"
  ) {
    var l = n.get,
      i = n.set;
    return (
      Object.defineProperty(e, t, {
        configurable: !0,
        get: function () {
          return l.call(this);
        },
        set: function (o) {
          ((r = "" + o), i.call(this, o));
        },
      }),
      Object.defineProperty(e, t, { enumerable: n.enumerable }),
      {
        getValue: function () {
          return r;
        },
        setValue: function (o) {
          r = "" + o;
        },
        stopTracking: function () {
          ((e._valueTracker = null), delete e[t]);
        },
      }
    );
  }
}
function Nr(e) {
  e._valueTracker || (e._valueTracker = Hd(e));
}
function na(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(),
    r = "";
  return (
    e && (r = ta(e) ? (e.checked ? "true" : "false") : e.value),
    (e = r),
    e !== n ? (t.setValue(e), !0) : !1
  );
}
function br(e) {
  if (((e = e || (typeof document < "u" ? document : void 0)), typeof e > "u"))
    return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function _i(e, t) {
  var n = t.checked;
  return Q({}, t, {
    defaultChecked: void 0,
    defaultValue: void 0,
    value: void 0,
    checked: n ?? e._wrapperState.initialChecked,
  });
}
function Cu(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue,
    r = t.checked != null ? t.checked : t.defaultChecked;
  ((n = Et(t.value != null ? t.value : n)),
    (e._wrapperState = {
      initialChecked: r,
      initialValue: n,
      controlled:
        t.type === "checkbox" || t.type === "radio"
          ? t.checked != null
          : t.value != null,
    }));
}
function ra(e, t) {
  ((t = t.checked), t != null && No(e, "checked", t, !1));
}
function Li(e, t) {
  ra(e, t);
  var n = Et(t.value),
    r = t.type;
  if (n != null)
    r === "number"
      ? ((n === 0 && e.value === "") || e.value != n) && (e.value = "" + n)
      : e.value !== "" + n && (e.value = "" + n);
  else if (r === "submit" || r === "reset") {
    e.removeAttribute("value");
    return;
  }
  (t.hasOwnProperty("value")
    ? Ri(e, t.type, n)
    : t.hasOwnProperty("defaultValue") && Ri(e, t.type, Et(t.defaultValue)),
    t.checked == null &&
      t.defaultChecked != null &&
      (e.defaultChecked = !!t.defaultChecked));
}
function ju(e, t, n) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var r = t.type;
    if (
      !(
        (r !== "submit" && r !== "reset") ||
        (t.value !== void 0 && t.value !== null)
      )
    )
      return;
    ((t = "" + e._wrapperState.initialValue),
      n || t === e.value || (e.value = t),
      (e.defaultValue = t));
  }
  ((n = e.name),
    n !== "" && (e.name = ""),
    (e.defaultChecked = !!e._wrapperState.initialChecked),
    n !== "" && (e.name = n));
}
function Ri(e, t, n) {
  (t !== "number" || br(e.ownerDocument) !== e) &&
    (n == null
      ? (e.defaultValue = "" + e._wrapperState.initialValue)
      : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var $n = Array.isArray;
function on(e, t, n, r) {
  if (((e = e.options), t)) {
    t = {};
    for (var l = 0; l < n.length; l++) t["$" + n[l]] = !0;
    for (n = 0; n < e.length; n++)
      ((l = t.hasOwnProperty("$" + e[n].value)),
        e[n].selected !== l && (e[n].selected = l),
        l && r && (e[n].defaultSelected = !0));
  } else {
    for (n = "" + Et(n), t = null, l = 0; l < e.length; l++) {
      if (e[l].value === n) {
        ((e[l].selected = !0), r && (e[l].defaultSelected = !0));
        return;
      }
      t !== null || e[l].disabled || (t = e[l]);
    }
    t !== null && (t.selected = !0);
  }
}
function Ti(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(k(91));
  return Q({}, t, {
    value: void 0,
    defaultValue: void 0,
    children: "" + e._wrapperState.initialValue,
  });
}
function Nu(e, t) {
  var n = t.value;
  if (n == null) {
    if (((n = t.children), (t = t.defaultValue), n != null)) {
      if (t != null) throw Error(k(92));
      if ($n(n)) {
        if (1 < n.length) throw Error(k(93));
        n = n[0];
      }
      t = n;
    }
    (t == null && (t = ""), (n = t));
  }
  e._wrapperState = { initialValue: Et(n) };
}
function la(e, t) {
  var n = Et(t.value),
    r = Et(t.defaultValue);
  (n != null &&
    ((n = "" + n),
    n !== e.value && (e.value = n),
    t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)),
    r != null && (e.defaultValue = "" + r));
}
function Pu(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function ia(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function Oi(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml"
    ? ia(t)
    : e === "http://www.w3.org/2000/svg" && t === "foreignObject"
      ? "http://www.w3.org/1999/xhtml"
      : e;
}
var Pr,
  oa = (function (e) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction
      ? function (t, n, r, l) {
          MSApp.execUnsafeLocalFunction(function () {
            return e(t, n, r, l);
          });
        }
      : e;
  })(function (e, t) {
    if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e)
      e.innerHTML = t;
    else {
      for (
        Pr = Pr || document.createElement("div"),
          Pr.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>",
          t = Pr.firstChild;
        e.firstChild;
      )
        e.removeChild(e.firstChild);
      for (; t.firstChild; ) e.appendChild(t.firstChild);
    }
  });
function qn(e, t) {
  if (t) {
    var n = e.firstChild;
    if (n && n === e.lastChild && n.nodeType === 3) {
      n.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var Vn = {
    animationIterationCount: !0,
    aspectRatio: !0,
    borderImageOutset: !0,
    borderImageSlice: !0,
    borderImageWidth: !0,
    boxFlex: !0,
    boxFlexGroup: !0,
    boxOrdinalGroup: !0,
    columnCount: !0,
    columns: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    flexOrder: !0,
    gridArea: !0,
    gridRow: !0,
    gridRowEnd: !0,
    gridRowSpan: !0,
    gridRowStart: !0,
    gridColumn: !0,
    gridColumnEnd: !0,
    gridColumnSpan: !0,
    gridColumnStart: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    tabSize: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    fillOpacity: !0,
    floodOpacity: !0,
    stopOpacity: !0,
    strokeDasharray: !0,
    strokeDashoffset: !0,
    strokeMiterlimit: !0,
    strokeOpacity: !0,
    strokeWidth: !0,
  },
  Kd = ["Webkit", "ms", "Moz", "O"];
Object.keys(Vn).forEach(function (e) {
  Kd.forEach(function (t) {
    ((t = t + e.charAt(0).toUpperCase() + e.substring(1)), (Vn[t] = Vn[e]));
  });
});
function ua(e, t, n) {
  return t == null || typeof t == "boolean" || t === ""
    ? ""
    : n || typeof t != "number" || t === 0 || (Vn.hasOwnProperty(e) && Vn[e])
      ? ("" + t).trim()
      : t + "px";
}
function sa(e, t) {
  e = e.style;
  for (var n in t)
    if (t.hasOwnProperty(n)) {
      var r = n.indexOf("--") === 0,
        l = ua(n, t[n], r);
      (n === "float" && (n = "cssFloat"), r ? e.setProperty(n, l) : (e[n] = l));
    }
}
var Yd = Q(
  { menuitem: !0 },
  {
    area: !0,
    base: !0,
    br: !0,
    col: !0,
    embed: !0,
    hr: !0,
    img: !0,
    input: !0,
    keygen: !0,
    link: !0,
    meta: !0,
    param: !0,
    source: !0,
    track: !0,
    wbr: !0,
  },
);
function zi(e, t) {
  if (t) {
    if (Yd[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
      throw Error(k(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(k(60));
      if (
        typeof t.dangerouslySetInnerHTML != "object" ||
        !("__html" in t.dangerouslySetInnerHTML)
      )
        throw Error(k(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(k(62));
  }
}
function Ii(e, t) {
  if (e.indexOf("-") === -1) return typeof t.is == "string";
  switch (e) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return !1;
    default:
      return !0;
  }
}
var Di = null;
function Ro(e) {
  return (
    (e = e.target || e.srcElement || window),
    e.correspondingUseElement && (e = e.correspondingUseElement),
    e.nodeType === 3 ? e.parentNode : e
  );
}
var Mi = null,
  un = null,
  sn = null;
function _u(e) {
  if ((e = xr(e))) {
    if (typeof Mi != "function") throw Error(k(280));
    var t = e.stateNode;
    t && ((t = Tl(t)), Mi(e.stateNode, e.type, t));
  }
}
function aa(e) {
  un ? (sn ? sn.push(e) : (sn = [e])) : (un = e);
}
function ca() {
  if (un) {
    var e = un,
      t = sn;
    if (((sn = un = null), _u(e), t)) for (e = 0; e < t.length; e++) _u(t[e]);
  }
}
function da(e, t) {
  return e(t);
}
function fa() {}
var ql = !1;
function pa(e, t, n) {
  if (ql) return e(t, n);
  ql = !0;
  try {
    return da(e, t, n);
  } finally {
    ((ql = !1), (un !== null || sn !== null) && (fa(), ca()));
  }
}
function bn(e, t) {
  var n = e.stateNode;
  if (n === null) return null;
  var r = Tl(n);
  if (r === null) return null;
  n = r[t];
  e: switch (t) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
    case "onMouseEnter":
      ((r = !r.disabled) ||
        ((e = e.type),
        (r = !(
          e === "button" ||
          e === "input" ||
          e === "select" ||
          e === "textarea"
        ))),
        (e = !r));
      break e;
    default:
      e = !1;
  }
  if (e) return null;
  if (n && typeof n != "function") throw Error(k(231, t, typeof n));
  return n;
}
var Fi = !1;
if (be)
  try {
    var Ln = {};
    (Object.defineProperty(Ln, "passive", {
      get: function () {
        Fi = !0;
      },
    }),
      window.addEventListener("test", Ln, Ln),
      window.removeEventListener("test", Ln, Ln));
  } catch {
    Fi = !1;
  }
function Xd(e, t, n, r, l, i, o, u, a) {
  var d = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, d);
  } catch (h) {
    this.onError(h);
  }
}
var Wn = !1,
  el = null,
  tl = !1,
  Ui = null,
  Gd = {
    onError: function (e) {
      ((Wn = !0), (el = e));
    },
  };
function Jd(e, t, n, r, l, i, o, u, a) {
  ((Wn = !1), (el = null), Xd.apply(Gd, arguments));
}
function Zd(e, t, n, r, l, i, o, u, a) {
  if ((Jd.apply(this, arguments), Wn)) {
    if (Wn) {
      var d = el;
      ((Wn = !1), (el = null));
    } else throw Error(k(198));
    tl || ((tl = !0), (Ui = d));
  }
}
function Qt(e) {
  var t = e,
    n = e;
  if (e.alternate) for (; t.return; ) t = t.return;
  else {
    e = t;
    do ((t = e), t.flags & 4098 && (n = t.return), (e = t.return));
    while (e);
  }
  return t.tag === 3 ? n : null;
}
function ha(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (
      (t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)),
      t !== null)
    )
      return t.dehydrated;
  }
  return null;
}
function Lu(e) {
  if (Qt(e) !== e) throw Error(k(188));
}
function qd(e) {
  var t = e.alternate;
  if (!t) {
    if (((t = Qt(e)), t === null)) throw Error(k(188));
    return t !== e ? null : e;
  }
  for (var n = e, r = t; ; ) {
    var l = n.return;
    if (l === null) break;
    var i = l.alternate;
    if (i === null) {
      if (((r = l.return), r !== null)) {
        n = r;
        continue;
      }
      break;
    }
    if (l.child === i.child) {
      for (i = l.child; i; ) {
        if (i === n) return (Lu(l), e);
        if (i === r) return (Lu(l), t);
        i = i.sibling;
      }
      throw Error(k(188));
    }
    if (n.return !== r.return) ((n = l), (r = i));
    else {
      for (var o = !1, u = l.child; u; ) {
        if (u === n) {
          ((o = !0), (n = l), (r = i));
          break;
        }
        if (u === r) {
          ((o = !0), (r = l), (n = i));
          break;
        }
        u = u.sibling;
      }
      if (!o) {
        for (u = i.child; u; ) {
          if (u === n) {
            ((o = !0), (n = i), (r = l));
            break;
          }
          if (u === r) {
            ((o = !0), (r = i), (n = l));
            break;
          }
          u = u.sibling;
        }
        if (!o) throw Error(k(189));
      }
    }
    if (n.alternate !== r) throw Error(k(190));
  }
  if (n.tag !== 3) throw Error(k(188));
  return n.stateNode.current === n ? e : t;
}
function ma(e) {
  return ((e = qd(e)), e !== null ? va(e) : null);
}
function va(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = va(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var ga = Ce.unstable_scheduleCallback,
  Ru = Ce.unstable_cancelCallback,
  bd = Ce.unstable_shouldYield,
  ef = Ce.unstable_requestPaint,
  X = Ce.unstable_now,
  tf = Ce.unstable_getCurrentPriorityLevel,
  To = Ce.unstable_ImmediatePriority,
  ya = Ce.unstable_UserBlockingPriority,
  nl = Ce.unstable_NormalPriority,
  nf = Ce.unstable_LowPriority,
  xa = Ce.unstable_IdlePriority,
  Pl = null,
  He = null;
function rf(e) {
  if (He && typeof He.onCommitFiberRoot == "function")
    try {
      He.onCommitFiberRoot(Pl, e, void 0, (e.current.flags & 128) === 128);
    } catch {}
}
var $e = Math.clz32 ? Math.clz32 : uf,
  lf = Math.log,
  of = Math.LN2;
function uf(e) {
  return ((e >>>= 0), e === 0 ? 32 : (31 - ((lf(e) / of) | 0)) | 0);
}
var _r = 64,
  Lr = 4194304;
function An(e) {
  switch (e & -e) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return e & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return e & 130023424;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 1073741824;
    default:
      return e;
  }
}
function rl(e, t) {
  var n = e.pendingLanes;
  if (n === 0) return 0;
  var r = 0,
    l = e.suspendedLanes,
    i = e.pingedLanes,
    o = n & 268435455;
  if (o !== 0) {
    var u = o & ~l;
    u !== 0 ? (r = An(u)) : ((i &= o), i !== 0 && (r = An(i)));
  } else ((o = n & ~l), o !== 0 ? (r = An(o)) : i !== 0 && (r = An(i)));
  if (r === 0) return 0;
  if (
    t !== 0 &&
    t !== r &&
    !(t & l) &&
    ((l = r & -r), (i = t & -t), l >= i || (l === 16 && (i & 4194240) !== 0))
  )
    return t;
  if ((r & 4 && (r |= n & 16), (t = e.entangledLanes), t !== 0))
    for (e = e.entanglements, t &= r; 0 < t; )
      ((n = 31 - $e(t)), (l = 1 << n), (r |= e[n]), (t &= ~l));
  return r;
}
function sf(e, t) {
  switch (e) {
    case 1:
    case 2:
    case 4:
      return t + 250;
    case 8:
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return t + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return -1;
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function af(e, t) {
  for (
    var n = e.suspendedLanes,
      r = e.pingedLanes,
      l = e.expirationTimes,
      i = e.pendingLanes;
    0 < i;
  ) {
    var o = 31 - $e(i),
      u = 1 << o,
      a = l[o];
    (a === -1
      ? (!(u & n) || u & r) && (l[o] = sf(u, t))
      : a <= t && (e.expiredLanes |= u),
      (i &= ~u));
  }
}
function $i(e) {
  return (
    (e = e.pendingLanes & -1073741825),
    e !== 0 ? e : e & 1073741824 ? 1073741824 : 0
  );
}
function wa() {
  var e = _r;
  return ((_r <<= 1), !(_r & 4194240) && (_r = 64), e);
}
function bl(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function gr(e, t, n) {
  ((e.pendingLanes |= t),
    t !== 536870912 && ((e.suspendedLanes = 0), (e.pingedLanes = 0)),
    (e = e.eventTimes),
    (t = 31 - $e(t)),
    (e[t] = n));
}
function cf(e, t) {
  var n = e.pendingLanes & ~t;
  ((e.pendingLanes = t),
    (e.suspendedLanes = 0),
    (e.pingedLanes = 0),
    (e.expiredLanes &= t),
    (e.mutableReadLanes &= t),
    (e.entangledLanes &= t),
    (t = e.entanglements));
  var r = e.eventTimes;
  for (e = e.expirationTimes; 0 < n; ) {
    var l = 31 - $e(n),
      i = 1 << l;
    ((t[l] = 0), (r[l] = -1), (e[l] = -1), (n &= ~i));
  }
}
function Oo(e, t) {
  var n = (e.entangledLanes |= t);
  for (e = e.entanglements; n; ) {
    var r = 31 - $e(n),
      l = 1 << r;
    ((l & t) | (e[r] & t) && (e[r] |= t), (n &= ~l));
  }
}
var D = 0;
function Sa(e) {
  return (
    (e &= -e),
    1 < e ? (4 < e ? (e & 268435455 ? 16 : 536870912) : 4) : 1
  );
}
var ka,
  zo,
  Ea,
  Ca,
  ja,
  Ai = !1,
  Rr = [],
  ht = null,
  mt = null,
  vt = null,
  er = new Map(),
  tr = new Map(),
  st = [],
  df =
    "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(
      " ",
    );
function Tu(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      ht = null;
      break;
    case "dragenter":
    case "dragleave":
      mt = null;
      break;
    case "mouseover":
    case "mouseout":
      vt = null;
      break;
    case "pointerover":
    case "pointerout":
      er.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      tr.delete(t.pointerId);
  }
}
function Rn(e, t, n, r, l, i) {
  return e === null || e.nativeEvent !== i
    ? ((e = {
        blockedOn: t,
        domEventName: n,
        eventSystemFlags: r,
        nativeEvent: i,
        targetContainers: [l],
      }),
      t !== null && ((t = xr(t)), t !== null && zo(t)),
      e)
    : ((e.eventSystemFlags |= r),
      (t = e.targetContainers),
      l !== null && t.indexOf(l) === -1 && t.push(l),
      e);
}
function ff(e, t, n, r, l) {
  switch (t) {
    case "focusin":
      return ((ht = Rn(ht, e, t, n, r, l)), !0);
    case "dragenter":
      return ((mt = Rn(mt, e, t, n, r, l)), !0);
    case "mouseover":
      return ((vt = Rn(vt, e, t, n, r, l)), !0);
    case "pointerover":
      var i = l.pointerId;
      return (er.set(i, Rn(er.get(i) || null, e, t, n, r, l)), !0);
    case "gotpointercapture":
      return (
        (i = l.pointerId),
        tr.set(i, Rn(tr.get(i) || null, e, t, n, r, l)),
        !0
      );
  }
  return !1;
}
function Na(e) {
  var t = zt(e.target);
  if (t !== null) {
    var n = Qt(t);
    if (n !== null) {
      if (((t = n.tag), t === 13)) {
        if (((t = ha(n)), t !== null)) {
          ((e.blockedOn = t),
            ja(e.priority, function () {
              Ea(n);
            }));
          return;
        }
      } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
        e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
        return;
      }
    }
  }
  e.blockedOn = null;
}
function Wr(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var n = Bi(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var r = new n.constructor(n.type, n);
      ((Di = r), n.target.dispatchEvent(r), (Di = null));
    } else return ((t = xr(n)), t !== null && zo(t), (e.blockedOn = n), !1);
    t.shift();
  }
  return !0;
}
function Ou(e, t, n) {
  Wr(e) && n.delete(t);
}
function pf() {
  ((Ai = !1),
    ht !== null && Wr(ht) && (ht = null),
    mt !== null && Wr(mt) && (mt = null),
    vt !== null && Wr(vt) && (vt = null),
    er.forEach(Ou),
    tr.forEach(Ou));
}
function Tn(e, t) {
  e.blockedOn === t &&
    ((e.blockedOn = null),
    Ai ||
      ((Ai = !0),
      Ce.unstable_scheduleCallback(Ce.unstable_NormalPriority, pf)));
}
function nr(e) {
  function t(l) {
    return Tn(l, e);
  }
  if (0 < Rr.length) {
    Tn(Rr[0], e);
    for (var n = 1; n < Rr.length; n++) {
      var r = Rr[n];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  for (
    ht !== null && Tn(ht, e),
      mt !== null && Tn(mt, e),
      vt !== null && Tn(vt, e),
      er.forEach(t),
      tr.forEach(t),
      n = 0;
    n < st.length;
    n++
  )
    ((r = st[n]), r.blockedOn === e && (r.blockedOn = null));
  for (; 0 < st.length && ((n = st[0]), n.blockedOn === null); )
    (Na(n), n.blockedOn === null && st.shift());
}
var an = rt.ReactCurrentBatchConfig,
  ll = !0;
function hf(e, t, n, r) {
  var l = D,
    i = an.transition;
  an.transition = null;
  try {
    ((D = 1), Io(e, t, n, r));
  } finally {
    ((D = l), (an.transition = i));
  }
}
function mf(e, t, n, r) {
  var l = D,
    i = an.transition;
  an.transition = null;
  try {
    ((D = 4), Io(e, t, n, r));
  } finally {
    ((D = l), (an.transition = i));
  }
}
function Io(e, t, n, r) {
  if (ll) {
    var l = Bi(e, t, n, r);
    if (l === null) (ai(e, t, r, il, n), Tu(e, r));
    else if (ff(l, e, t, n, r)) r.stopPropagation();
    else if ((Tu(e, r), t & 4 && -1 < df.indexOf(e))) {
      for (; l !== null; ) {
        var i = xr(l);
        if (
          (i !== null && ka(i),
          (i = Bi(e, t, n, r)),
          i === null && ai(e, t, r, il, n),
          i === l)
        )
          break;
        l = i;
      }
      l !== null && r.stopPropagation();
    } else ai(e, t, r, null, n);
  }
}
var il = null;
function Bi(e, t, n, r) {
  if (((il = null), (e = Ro(r)), (e = zt(e)), e !== null))
    if (((t = Qt(e)), t === null)) e = null;
    else if (((n = t.tag), n === 13)) {
      if (((e = ha(t)), e !== null)) return e;
      e = null;
    } else if (n === 3) {
      if (t.stateNode.current.memoizedState.isDehydrated)
        return t.tag === 3 ? t.stateNode.containerInfo : null;
      e = null;
    } else t !== e && (e = null);
  return ((il = e), null);
}
function Pa(e) {
  switch (e) {
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
      return 1;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "toggle":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
      return 4;
    case "message":
      switch (tf()) {
        case To:
          return 1;
        case ya:
          return 4;
        case nl:
        case nf:
          return 16;
        case xa:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var ct = null,
  Do = null,
  Qr = null;
function _a() {
  if (Qr) return Qr;
  var e,
    t = Do,
    n = t.length,
    r,
    l = "value" in ct ? ct.value : ct.textContent,
    i = l.length;
  for (e = 0; e < n && t[e] === l[e]; e++);
  var o = n - e;
  for (r = 1; r <= o && t[n - r] === l[i - r]; r++);
  return (Qr = l.slice(e, 1 < r ? 1 - r : void 0));
}
function Hr(e) {
  var t = e.keyCode;
  return (
    "charCode" in e
      ? ((e = e.charCode), e === 0 && t === 13 && (e = 13))
      : (e = t),
    e === 10 && (e = 13),
    32 <= e || e === 13 ? e : 0
  );
}
function Tr() {
  return !0;
}
function zu() {
  return !1;
}
function Ne(e) {
  function t(n, r, l, i, o) {
    ((this._reactName = n),
      (this._targetInst = l),
      (this.type = r),
      (this.nativeEvent = i),
      (this.target = o),
      (this.currentTarget = null));
    for (var u in e)
      e.hasOwnProperty(u) && ((n = e[u]), (this[u] = n ? n(i) : i[u]));
    return (
      (this.isDefaultPrevented = (
        i.defaultPrevented != null ? i.defaultPrevented : i.returnValue === !1
      )
        ? Tr
        : zu),
      (this.isPropagationStopped = zu),
      this
    );
  }
  return (
    Q(t.prototype, {
      preventDefault: function () {
        this.defaultPrevented = !0;
        var n = this.nativeEvent;
        n &&
          (n.preventDefault
            ? n.preventDefault()
            : typeof n.returnValue != "unknown" && (n.returnValue = !1),
          (this.isDefaultPrevented = Tr));
      },
      stopPropagation: function () {
        var n = this.nativeEvent;
        n &&
          (n.stopPropagation
            ? n.stopPropagation()
            : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0),
          (this.isPropagationStopped = Tr));
      },
      persist: function () {},
      isPersistent: Tr,
    }),
    t
  );
}
var Sn = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function (e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0,
  },
  Mo = Ne(Sn),
  yr = Q({}, Sn, { view: 0, detail: 0 }),
  vf = Ne(yr),
  ei,
  ti,
  On,
  _l = Q({}, yr, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: Fo,
    button: 0,
    buttons: 0,
    relatedTarget: function (e) {
      return e.relatedTarget === void 0
        ? e.fromElement === e.srcElement
          ? e.toElement
          : e.fromElement
        : e.relatedTarget;
    },
    movementX: function (e) {
      return "movementX" in e
        ? e.movementX
        : (e !== On &&
            (On && e.type === "mousemove"
              ? ((ei = e.screenX - On.screenX), (ti = e.screenY - On.screenY))
              : (ti = ei = 0),
            (On = e)),
          ei);
    },
    movementY: function (e) {
      return "movementY" in e ? e.movementY : ti;
    },
  }),
  Iu = Ne(_l),
  gf = Q({}, _l, { dataTransfer: 0 }),
  yf = Ne(gf),
  xf = Q({}, yr, { relatedTarget: 0 }),
  ni = Ne(xf),
  wf = Q({}, Sn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
  Sf = Ne(wf),
  kf = Q({}, Sn, {
    clipboardData: function (e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    },
  }),
  Ef = Ne(kf),
  Cf = Q({}, Sn, { data: 0 }),
  Du = Ne(Cf),
  jf = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified",
  },
  Nf = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta",
  },
  Pf = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey",
  };
function _f(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = Pf[e]) ? !!t[e] : !1;
}
function Fo() {
  return _f;
}
var Lf = Q({}, yr, {
    key: function (e) {
      if (e.key) {
        var t = jf[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress"
        ? ((e = Hr(e)), e === 13 ? "Enter" : String.fromCharCode(e))
        : e.type === "keydown" || e.type === "keyup"
          ? Nf[e.keyCode] || "Unidentified"
          : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Fo,
    charCode: function (e) {
      return e.type === "keypress" ? Hr(e) : 0;
    },
    keyCode: function (e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function (e) {
      return e.type === "keypress"
        ? Hr(e)
        : e.type === "keydown" || e.type === "keyup"
          ? e.keyCode
          : 0;
    },
  }),
  Rf = Ne(Lf),
  Tf = Q({}, _l, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0,
  }),
  Mu = Ne(Tf),
  Of = Q({}, yr, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Fo,
  }),
  zf = Ne(Of),
  If = Q({}, Sn, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
  Df = Ne(If),
  Mf = Q({}, _l, {
    deltaX: function (e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function (e) {
      return "deltaY" in e
        ? e.deltaY
        : "wheelDeltaY" in e
          ? -e.wheelDeltaY
          : "wheelDelta" in e
            ? -e.wheelDelta
            : 0;
    },
    deltaZ: 0,
    deltaMode: 0,
  }),
  Ff = Ne(Mf),
  Uf = [9, 13, 27, 32],
  Uo = be && "CompositionEvent" in window,
  Qn = null;
be && "documentMode" in document && (Qn = document.documentMode);
var $f = be && "TextEvent" in window && !Qn,
  La = be && (!Uo || (Qn && 8 < Qn && 11 >= Qn)),
  Fu = " ",
  Uu = !1;
function Ra(e, t) {
  switch (e) {
    case "keyup":
      return Uf.indexOf(t.keyCode) !== -1;
    case "keydown":
      return t.keyCode !== 229;
    case "keypress":
    case "mousedown":
    case "focusout":
      return !0;
    default:
      return !1;
  }
}
function Ta(e) {
  return ((e = e.detail), typeof e == "object" && "data" in e ? e.data : null);
}
var Gt = !1;
function Af(e, t) {
  switch (e) {
    case "compositionend":
      return Ta(t);
    case "keypress":
      return t.which !== 32 ? null : ((Uu = !0), Fu);
    case "textInput":
      return ((e = t.data), e === Fu && Uu ? null : e);
    default:
      return null;
  }
}
function Bf(e, t) {
  if (Gt)
    return e === "compositionend" || (!Uo && Ra(e, t))
      ? ((e = _a()), (Qr = Do = ct = null), (Gt = !1), e)
      : null;
  switch (e) {
    case "paste":
      return null;
    case "keypress":
      if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
        if (t.char && 1 < t.char.length) return t.char;
        if (t.which) return String.fromCharCode(t.which);
      }
      return null;
    case "compositionend":
      return La && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var Vf = {
  color: !0,
  date: !0,
  datetime: !0,
  "datetime-local": !0,
  email: !0,
  month: !0,
  number: !0,
  password: !0,
  range: !0,
  search: !0,
  tel: !0,
  text: !0,
  time: !0,
  url: !0,
  week: !0,
};
function $u(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!Vf[e.type] : t === "textarea";
}
function Oa(e, t, n, r) {
  (aa(r),
    (t = ol(t, "onChange")),
    0 < t.length &&
      ((n = new Mo("onChange", "change", null, n, r)),
      e.push({ event: n, listeners: t })));
}
var Hn = null,
  rr = null;
function Wf(e) {
  Wa(e, 0);
}
function Ll(e) {
  var t = qt(e);
  if (na(t)) return e;
}
function Qf(e, t) {
  if (e === "change") return t;
}
var za = !1;
if (be) {
  var ri;
  if (be) {
    var li = "oninput" in document;
    if (!li) {
      var Au = document.createElement("div");
      (Au.setAttribute("oninput", "return;"),
        (li = typeof Au.oninput == "function"));
    }
    ri = li;
  } else ri = !1;
  za = ri && (!document.documentMode || 9 < document.documentMode);
}
function Bu() {
  Hn && (Hn.detachEvent("onpropertychange", Ia), (rr = Hn = null));
}
function Ia(e) {
  if (e.propertyName === "value" && Ll(rr)) {
    var t = [];
    (Oa(t, rr, e, Ro(e)), pa(Wf, t));
  }
}
function Hf(e, t, n) {
  e === "focusin"
    ? (Bu(), (Hn = t), (rr = n), Hn.attachEvent("onpropertychange", Ia))
    : e === "focusout" && Bu();
}
function Kf(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown")
    return Ll(rr);
}
function Yf(e, t) {
  if (e === "click") return Ll(t);
}
function Xf(e, t) {
  if (e === "input" || e === "change") return Ll(t);
}
function Gf(e, t) {
  return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
}
var Be = typeof Object.is == "function" ? Object.is : Gf;
function lr(e, t) {
  if (Be(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null)
    return !1;
  var n = Object.keys(e),
    r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (r = 0; r < n.length; r++) {
    var l = n[r];
    if (!Ei.call(t, l) || !Be(e[l], t[l])) return !1;
  }
  return !0;
}
function Vu(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function Wu(e, t) {
  var n = Vu(e);
  e = 0;
  for (var r; n; ) {
    if (n.nodeType === 3) {
      if (((r = e + n.textContent.length), e <= t && r >= t))
        return { node: n, offset: t - e };
      e = r;
    }
    e: {
      for (; n; ) {
        if (n.nextSibling) {
          n = n.nextSibling;
          break e;
        }
        n = n.parentNode;
      }
      n = void 0;
    }
    n = Vu(n);
  }
}
function Da(e, t) {
  return e && t
    ? e === t
      ? !0
      : e && e.nodeType === 3
        ? !1
        : t && t.nodeType === 3
          ? Da(e, t.parentNode)
          : "contains" in e
            ? e.contains(t)
            : e.compareDocumentPosition
              ? !!(e.compareDocumentPosition(t) & 16)
              : !1
    : !1;
}
function Ma() {
  for (var e = window, t = br(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = typeof t.contentWindow.location.href == "string";
    } catch {
      n = !1;
    }
    if (n) e = t.contentWindow;
    else break;
    t = br(e.document);
  }
  return t;
}
function $o(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return (
    t &&
    ((t === "input" &&
      (e.type === "text" ||
        e.type === "search" ||
        e.type === "tel" ||
        e.type === "url" ||
        e.type === "password")) ||
      t === "textarea" ||
      e.contentEditable === "true")
  );
}
function Jf(e) {
  var t = Ma(),
    n = e.focusedElem,
    r = e.selectionRange;
  if (
    t !== n &&
    n &&
    n.ownerDocument &&
    Da(n.ownerDocument.documentElement, n)
  ) {
    if (r !== null && $o(n)) {
      if (
        ((t = r.start),
        (e = r.end),
        e === void 0 && (e = t),
        "selectionStart" in n)
      )
        ((n.selectionStart = t),
          (n.selectionEnd = Math.min(e, n.value.length)));
      else if (
        ((e = ((t = n.ownerDocument || document) && t.defaultView) || window),
        e.getSelection)
      ) {
        e = e.getSelection();
        var l = n.textContent.length,
          i = Math.min(r.start, l);
        ((r = r.end === void 0 ? i : Math.min(r.end, l)),
          !e.extend && i > r && ((l = r), (r = i), (i = l)),
          (l = Wu(n, i)));
        var o = Wu(n, r);
        l &&
          o &&
          (e.rangeCount !== 1 ||
            e.anchorNode !== l.node ||
            e.anchorOffset !== l.offset ||
            e.focusNode !== o.node ||
            e.focusOffset !== o.offset) &&
          ((t = t.createRange()),
          t.setStart(l.node, l.offset),
          e.removeAllRanges(),
          i > r
            ? (e.addRange(t), e.extend(o.node, o.offset))
            : (t.setEnd(o.node, o.offset), e.addRange(t)));
      }
    }
    for (t = [], e = n; (e = e.parentNode); )
      e.nodeType === 1 &&
        t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
    for (typeof n.focus == "function" && n.focus(), n = 0; n < t.length; n++)
      ((e = t[n]),
        (e.element.scrollLeft = e.left),
        (e.element.scrollTop = e.top));
  }
}
var Zf = be && "documentMode" in document && 11 >= document.documentMode,
  Jt = null,
  Vi = null,
  Kn = null,
  Wi = !1;
function Qu(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  Wi ||
    Jt == null ||
    Jt !== br(r) ||
    ((r = Jt),
    "selectionStart" in r && $o(r)
      ? (r = { start: r.selectionStart, end: r.selectionEnd })
      : ((r = (
          (r.ownerDocument && r.ownerDocument.defaultView) ||
          window
        ).getSelection()),
        (r = {
          anchorNode: r.anchorNode,
          anchorOffset: r.anchorOffset,
          focusNode: r.focusNode,
          focusOffset: r.focusOffset,
        })),
    (Kn && lr(Kn, r)) ||
      ((Kn = r),
      (r = ol(Vi, "onSelect")),
      0 < r.length &&
        ((t = new Mo("onSelect", "select", null, t, n)),
        e.push({ event: t, listeners: r }),
        (t.target = Jt))));
}
function Or(e, t) {
  var n = {};
  return (
    (n[e.toLowerCase()] = t.toLowerCase()),
    (n["Webkit" + e] = "webkit" + t),
    (n["Moz" + e] = "moz" + t),
    n
  );
}
var Zt = {
    animationend: Or("Animation", "AnimationEnd"),
    animationiteration: Or("Animation", "AnimationIteration"),
    animationstart: Or("Animation", "AnimationStart"),
    transitionend: Or("Transition", "TransitionEnd"),
  },
  ii = {},
  Fa = {};
be &&
  ((Fa = document.createElement("div").style),
  "AnimationEvent" in window ||
    (delete Zt.animationend.animation,
    delete Zt.animationiteration.animation,
    delete Zt.animationstart.animation),
  "TransitionEvent" in window || delete Zt.transitionend.transition);
function Rl(e) {
  if (ii[e]) return ii[e];
  if (!Zt[e]) return e;
  var t = Zt[e],
    n;
  for (n in t) if (t.hasOwnProperty(n) && n in Fa) return (ii[e] = t[n]);
  return e;
}
var Ua = Rl("animationend"),
  $a = Rl("animationiteration"),
  Aa = Rl("animationstart"),
  Ba = Rl("transitionend"),
  Va = new Map(),
  Hu =
    "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
      " ",
    );
function jt(e, t) {
  (Va.set(e, t), Wt(t, [e]));
}
for (var oi = 0; oi < Hu.length; oi++) {
  var ui = Hu[oi],
    qf = ui.toLowerCase(),
    bf = ui[0].toUpperCase() + ui.slice(1);
  jt(qf, "on" + bf);
}
jt(Ua, "onAnimationEnd");
jt($a, "onAnimationIteration");
jt(Aa, "onAnimationStart");
jt("dblclick", "onDoubleClick");
jt("focusin", "onFocus");
jt("focusout", "onBlur");
jt(Ba, "onTransitionEnd");
fn("onMouseEnter", ["mouseout", "mouseover"]);
fn("onMouseLeave", ["mouseout", "mouseover"]);
fn("onPointerEnter", ["pointerout", "pointerover"]);
fn("onPointerLeave", ["pointerout", "pointerover"]);
Wt(
  "onChange",
  "change click focusin focusout input keydown keyup selectionchange".split(
    " ",
  ),
);
Wt(
  "onSelect",
  "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
    " ",
  ),
);
Wt("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
Wt(
  "onCompositionEnd",
  "compositionend focusout keydown keypress keyup mousedown".split(" "),
);
Wt(
  "onCompositionStart",
  "compositionstart focusout keydown keypress keyup mousedown".split(" "),
);
Wt(
  "onCompositionUpdate",
  "compositionupdate focusout keydown keypress keyup mousedown".split(" "),
);
var Bn =
    "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
      " ",
    ),
  ep = new Set("cancel close invalid load scroll toggle".split(" ").concat(Bn));
function Ku(e, t, n) {
  var r = e.type || "unknown-event";
  ((e.currentTarget = n), Zd(r, t, void 0, e), (e.currentTarget = null));
}
function Wa(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var r = e[n],
      l = r.event;
    r = r.listeners;
    e: {
      var i = void 0;
      if (t)
        for (var o = r.length - 1; 0 <= o; o--) {
          var u = r[o],
            a = u.instance,
            d = u.currentTarget;
          if (((u = u.listener), a !== i && l.isPropagationStopped())) break e;
          (Ku(l, u, d), (i = a));
        }
      else
        for (o = 0; o < r.length; o++) {
          if (
            ((u = r[o]),
            (a = u.instance),
            (d = u.currentTarget),
            (u = u.listener),
            a !== i && l.isPropagationStopped())
          )
            break e;
          (Ku(l, u, d), (i = a));
        }
    }
  }
  if (tl) throw ((e = Ui), (tl = !1), (Ui = null), e);
}
function F(e, t) {
  var n = t[Xi];
  n === void 0 && (n = t[Xi] = new Set());
  var r = e + "__bubble";
  n.has(r) || (Qa(t, e, 2, !1), n.add(r));
}
function si(e, t, n) {
  var r = 0;
  (t && (r |= 4), Qa(n, e, r, t));
}
var zr = "_reactListening" + Math.random().toString(36).slice(2);
function ir(e) {
  if (!e[zr]) {
    ((e[zr] = !0),
      Zs.forEach(function (n) {
        n !== "selectionchange" && (ep.has(n) || si(n, !1, e), si(n, !0, e));
      }));
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[zr] || ((t[zr] = !0), si("selectionchange", !1, t));
  }
}
function Qa(e, t, n, r) {
  switch (Pa(t)) {
    case 1:
      var l = hf;
      break;
    case 4:
      l = mf;
      break;
    default:
      l = Io;
  }
  ((n = l.bind(null, t, n, e)),
    (l = void 0),
    !Fi ||
      (t !== "touchstart" && t !== "touchmove" && t !== "wheel") ||
      (l = !0),
    r
      ? l !== void 0
        ? e.addEventListener(t, n, { capture: !0, passive: l })
        : e.addEventListener(t, n, !0)
      : l !== void 0
        ? e.addEventListener(t, n, { passive: l })
        : e.addEventListener(t, n, !1));
}
function ai(e, t, n, r, l) {
  var i = r;
  if (!(t & 1) && !(t & 2) && r !== null)
    e: for (;;) {
      if (r === null) return;
      var o = r.tag;
      if (o === 3 || o === 4) {
        var u = r.stateNode.containerInfo;
        if (u === l || (u.nodeType === 8 && u.parentNode === l)) break;
        if (o === 4)
          for (o = r.return; o !== null; ) {
            var a = o.tag;
            if (
              (a === 3 || a === 4) &&
              ((a = o.stateNode.containerInfo),
              a === l || (a.nodeType === 8 && a.parentNode === l))
            )
              return;
            o = o.return;
          }
        for (; u !== null; ) {
          if (((o = zt(u)), o === null)) return;
          if (((a = o.tag), a === 5 || a === 6)) {
            r = i = o;
            continue e;
          }
          u = u.parentNode;
        }
      }
      r = r.return;
    }
  pa(function () {
    var d = i,
      h = Ro(n),
      m = [];
    e: {
      var v = Va.get(e);
      if (v !== void 0) {
        var w = Mo,
          S = e;
        switch (e) {
          case "keypress":
            if (Hr(n) === 0) break e;
          case "keydown":
          case "keyup":
            w = Rf;
            break;
          case "focusin":
            ((S = "focus"), (w = ni));
            break;
          case "focusout":
            ((S = "blur"), (w = ni));
            break;
          case "beforeblur":
          case "afterblur":
            w = ni;
            break;
          case "click":
            if (n.button === 2) break e;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            w = Iu;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            w = yf;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            w = zf;
            break;
          case Ua:
          case $a:
          case Aa:
            w = Sf;
            break;
          case Ba:
            w = Df;
            break;
          case "scroll":
            w = vf;
            break;
          case "wheel":
            w = Ff;
            break;
          case "copy":
          case "cut":
          case "paste":
            w = Ef;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            w = Mu;
        }
        var g = (t & 4) !== 0,
          E = !g && e === "scroll",
          c = g ? (v !== null ? v + "Capture" : null) : v;
        g = [];
        for (var f = d, p; f !== null; ) {
          p = f;
          var y = p.stateNode;
          if (
            (p.tag === 5 &&
              y !== null &&
              ((p = y),
              c !== null && ((y = bn(f, c)), y != null && g.push(or(f, y, p)))),
            E)
          )
            break;
          f = f.return;
        }
        0 < g.length &&
          ((v = new w(v, S, null, n, h)), m.push({ event: v, listeners: g }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (
          ((v = e === "mouseover" || e === "pointerover"),
          (w = e === "mouseout" || e === "pointerout"),
          v &&
            n !== Di &&
            (S = n.relatedTarget || n.fromElement) &&
            (zt(S) || S[et]))
        )
          break e;
        if (
          (w || v) &&
          ((v =
            h.window === h
              ? h
              : (v = h.ownerDocument)
                ? v.defaultView || v.parentWindow
                : window),
          w
            ? ((S = n.relatedTarget || n.toElement),
              (w = d),
              (S = S ? zt(S) : null),
              S !== null &&
                ((E = Qt(S)), S !== E || (S.tag !== 5 && S.tag !== 6)) &&
                (S = null))
            : ((w = null), (S = d)),
          w !== S)
        ) {
          if (
            ((g = Iu),
            (y = "onMouseLeave"),
            (c = "onMouseEnter"),
            (f = "mouse"),
            (e === "pointerout" || e === "pointerover") &&
              ((g = Mu),
              (y = "onPointerLeave"),
              (c = "onPointerEnter"),
              (f = "pointer")),
            (E = w == null ? v : qt(w)),
            (p = S == null ? v : qt(S)),
            (v = new g(y, f + "leave", w, n, h)),
            (v.target = E),
            (v.relatedTarget = p),
            (y = null),
            zt(h) === d &&
              ((g = new g(c, f + "enter", S, n, h)),
              (g.target = p),
              (g.relatedTarget = E),
              (y = g)),
            (E = y),
            w && S)
          )
            t: {
              for (g = w, c = S, f = 0, p = g; p; p = Kt(p)) f++;
              for (p = 0, y = c; y; y = Kt(y)) p++;
              for (; 0 < f - p; ) ((g = Kt(g)), f--);
              for (; 0 < p - f; ) ((c = Kt(c)), p--);
              for (; f--; ) {
                if (g === c || (c !== null && g === c.alternate)) break t;
                ((g = Kt(g)), (c = Kt(c)));
              }
              g = null;
            }
          else g = null;
          (w !== null && Yu(m, v, w, g, !1),
            S !== null && E !== null && Yu(m, E, S, g, !0));
        }
      }
      e: {
        if (
          ((v = d ? qt(d) : window),
          (w = v.nodeName && v.nodeName.toLowerCase()),
          w === "select" || (w === "input" && v.type === "file"))
        )
          var C = Qf;
        else if ($u(v))
          if (za) C = Xf;
          else {
            C = Kf;
            var P = Hf;
          }
        else
          (w = v.nodeName) &&
            w.toLowerCase() === "input" &&
            (v.type === "checkbox" || v.type === "radio") &&
            (C = Yf);
        if (C && (C = C(e, d))) {
          Oa(m, C, n, h);
          break e;
        }
        (P && P(e, v, d),
          e === "focusout" &&
            (P = v._wrapperState) &&
            P.controlled &&
            v.type === "number" &&
            Ri(v, "number", v.value));
      }
      switch (((P = d ? qt(d) : window), e)) {
        case "focusin":
          ($u(P) || P.contentEditable === "true") &&
            ((Jt = P), (Vi = d), (Kn = null));
          break;
        case "focusout":
          Kn = Vi = Jt = null;
          break;
        case "mousedown":
          Wi = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          ((Wi = !1), Qu(m, n, h));
          break;
        case "selectionchange":
          if (Zf) break;
        case "keydown":
        case "keyup":
          Qu(m, n, h);
      }
      var _;
      if (Uo)
        e: {
          switch (e) {
            case "compositionstart":
              var L = "onCompositionStart";
              break e;
            case "compositionend":
              L = "onCompositionEnd";
              break e;
            case "compositionupdate":
              L = "onCompositionUpdate";
              break e;
          }
          L = void 0;
        }
      else
        Gt
          ? Ra(e, n) && (L = "onCompositionEnd")
          : e === "keydown" && n.keyCode === 229 && (L = "onCompositionStart");
      (L &&
        (La &&
          n.locale !== "ko" &&
          (Gt || L !== "onCompositionStart"
            ? L === "onCompositionEnd" && Gt && (_ = _a())
            : ((ct = h),
              (Do = "value" in ct ? ct.value : ct.textContent),
              (Gt = !0))),
        (P = ol(d, L)),
        0 < P.length &&
          ((L = new Du(L, e, null, n, h)),
          m.push({ event: L, listeners: P }),
          _ ? (L.data = _) : ((_ = Ta(n)), _ !== null && (L.data = _)))),
        (_ = $f ? Af(e, n) : Bf(e, n)) &&
          ((d = ol(d, "onBeforeInput")),
          0 < d.length &&
            ((h = new Du("onBeforeInput", "beforeinput", null, n, h)),
            m.push({ event: h, listeners: d }),
            (h.data = _))));
    }
    Wa(m, t);
  });
}
function or(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function ol(e, t) {
  for (var n = t + "Capture", r = []; e !== null; ) {
    var l = e,
      i = l.stateNode;
    (l.tag === 5 &&
      i !== null &&
      ((l = i),
      (i = bn(e, n)),
      i != null && r.unshift(or(e, i, l)),
      (i = bn(e, t)),
      i != null && r.push(or(e, i, l))),
      (e = e.return));
  }
  return r;
}
function Kt(e) {
  if (e === null) return null;
  do e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function Yu(e, t, n, r, l) {
  for (var i = t._reactName, o = []; n !== null && n !== r; ) {
    var u = n,
      a = u.alternate,
      d = u.stateNode;
    if (a !== null && a === r) break;
    (u.tag === 5 &&
      d !== null &&
      ((u = d),
      l
        ? ((a = bn(n, i)), a != null && o.unshift(or(n, a, u)))
        : l || ((a = bn(n, i)), a != null && o.push(or(n, a, u)))),
      (n = n.return));
  }
  o.length !== 0 && e.push({ event: t, listeners: o });
}
var tp = /\r\n?/g,
  np = /\u0000|\uFFFD/g;
function Xu(e) {
  return (typeof e == "string" ? e : "" + e)
    .replace(
      tp,
      `
`,
    )
    .replace(np, "");
}
function Ir(e, t, n) {
  if (((t = Xu(t)), Xu(e) !== t && n)) throw Error(k(425));
}
function ul() {}
var Qi = null,
  Hi = null;
function Ki(e, t) {
  return (
    e === "textarea" ||
    e === "noscript" ||
    typeof t.children == "string" ||
    typeof t.children == "number" ||
    (typeof t.dangerouslySetInnerHTML == "object" &&
      t.dangerouslySetInnerHTML !== null &&
      t.dangerouslySetInnerHTML.__html != null)
  );
}
var Yi = typeof setTimeout == "function" ? setTimeout : void 0,
  rp = typeof clearTimeout == "function" ? clearTimeout : void 0,
  Gu = typeof Promise == "function" ? Promise : void 0,
  lp =
    typeof queueMicrotask == "function"
      ? queueMicrotask
      : typeof Gu < "u"
        ? function (e) {
            return Gu.resolve(null).then(e).catch(ip);
          }
        : Yi;
function ip(e) {
  setTimeout(function () {
    throw e;
  });
}
function ci(e, t) {
  var n = t,
    r = 0;
  do {
    var l = n.nextSibling;
    if ((e.removeChild(n), l && l.nodeType === 8))
      if (((n = l.data), n === "/$")) {
        if (r === 0) {
          (e.removeChild(l), nr(t));
          return;
        }
        r--;
      } else (n !== "$" && n !== "$?" && n !== "$!") || r++;
    n = l;
  } while (n);
  nr(t);
}
function gt(e) {
  for (; e != null; e = e.nextSibling) {
    var t = e.nodeType;
    if (t === 1 || t === 3) break;
    if (t === 8) {
      if (((t = e.data), t === "$" || t === "$!" || t === "$?")) break;
      if (t === "/$") return null;
    }
  }
  return e;
}
function Ju(e) {
  e = e.previousSibling;
  for (var t = 0; e; ) {
    if (e.nodeType === 8) {
      var n = e.data;
      if (n === "$" || n === "$!" || n === "$?") {
        if (t === 0) return e;
        t--;
      } else n === "/$" && t++;
    }
    e = e.previousSibling;
  }
  return null;
}
var kn = Math.random().toString(36).slice(2),
  Qe = "__reactFiber$" + kn,
  ur = "__reactProps$" + kn,
  et = "__reactContainer$" + kn,
  Xi = "__reactEvents$" + kn,
  op = "__reactListeners$" + kn,
  up = "__reactHandles$" + kn;
function zt(e) {
  var t = e[Qe];
  if (t) return t;
  for (var n = e.parentNode; n; ) {
    if ((t = n[et] || n[Qe])) {
      if (
        ((n = t.alternate),
        t.child !== null || (n !== null && n.child !== null))
      )
        for (e = Ju(e); e !== null; ) {
          if ((n = e[Qe])) return n;
          e = Ju(e);
        }
      return t;
    }
    ((e = n), (n = e.parentNode));
  }
  return null;
}
function xr(e) {
  return (
    (e = e[Qe] || e[et]),
    !e || (e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3) ? null : e
  );
}
function qt(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(k(33));
}
function Tl(e) {
  return e[ur] || null;
}
var Gi = [],
  bt = -1;
function Nt(e) {
  return { current: e };
}
function U(e) {
  0 > bt || ((e.current = Gi[bt]), (Gi[bt] = null), bt--);
}
function M(e, t) {
  (bt++, (Gi[bt] = e.current), (e.current = t));
}
var Ct = {},
  se = Nt(Ct),
  ge = Nt(!1),
  Ut = Ct;
function pn(e, t) {
  var n = e.type.contextTypes;
  if (!n) return Ct;
  var r = e.stateNode;
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
    return r.__reactInternalMemoizedMaskedChildContext;
  var l = {},
    i;
  for (i in n) l[i] = t[i];
  return (
    r &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = t),
      (e.__reactInternalMemoizedMaskedChildContext = l)),
    l
  );
}
function ye(e) {
  return ((e = e.childContextTypes), e != null);
}
function sl() {
  (U(ge), U(se));
}
function Zu(e, t, n) {
  if (se.current !== Ct) throw Error(k(168));
  (M(se, t), M(ge, n));
}
function Ha(e, t, n) {
  var r = e.stateNode;
  if (((t = t.childContextTypes), typeof r.getChildContext != "function"))
    return n;
  r = r.getChildContext();
  for (var l in r) if (!(l in t)) throw Error(k(108, Qd(e) || "Unknown", l));
  return Q({}, n, r);
}
function al(e) {
  return (
    (e =
      ((e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext) || Ct),
    (Ut = se.current),
    M(se, e),
    M(ge, ge.current),
    !0
  );
}
function qu(e, t, n) {
  var r = e.stateNode;
  if (!r) throw Error(k(169));
  (n
    ? ((e = Ha(e, t, Ut)),
      (r.__reactInternalMemoizedMergedChildContext = e),
      U(ge),
      U(se),
      M(se, e))
    : U(ge),
    M(ge, n));
}
var Ge = null,
  Ol = !1,
  di = !1;
function Ka(e) {
  Ge === null ? (Ge = [e]) : Ge.push(e);
}
function sp(e) {
  ((Ol = !0), Ka(e));
}
function Pt() {
  if (!di && Ge !== null) {
    di = !0;
    var e = 0,
      t = D;
    try {
      var n = Ge;
      for (D = 1; e < n.length; e++) {
        var r = n[e];
        do r = r(!0);
        while (r !== null);
      }
      ((Ge = null), (Ol = !1));
    } catch (l) {
      throw (Ge !== null && (Ge = Ge.slice(e + 1)), ga(To, Pt), l);
    } finally {
      ((D = t), (di = !1));
    }
  }
  return null;
}
var en = [],
  tn = 0,
  cl = null,
  dl = 0,
  Pe = [],
  _e = 0,
  $t = null,
  Je = 1,
  Ze = "";
function Tt(e, t) {
  ((en[tn++] = dl), (en[tn++] = cl), (cl = e), (dl = t));
}
function Ya(e, t, n) {
  ((Pe[_e++] = Je), (Pe[_e++] = Ze), (Pe[_e++] = $t), ($t = e));
  var r = Je;
  e = Ze;
  var l = 32 - $e(r) - 1;
  ((r &= ~(1 << l)), (n += 1));
  var i = 32 - $e(t) + l;
  if (30 < i) {
    var o = l - (l % 5);
    ((i = (r & ((1 << o) - 1)).toString(32)),
      (r >>= o),
      (l -= o),
      (Je = (1 << (32 - $e(t) + l)) | (n << l) | r),
      (Ze = i + e));
  } else ((Je = (1 << i) | (n << l) | r), (Ze = e));
}
function Ao(e) {
  e.return !== null && (Tt(e, 1), Ya(e, 1, 0));
}
function Bo(e) {
  for (; e === cl; )
    ((cl = en[--tn]), (en[tn] = null), (dl = en[--tn]), (en[tn] = null));
  for (; e === $t; )
    (($t = Pe[--_e]),
      (Pe[_e] = null),
      (Ze = Pe[--_e]),
      (Pe[_e] = null),
      (Je = Pe[--_e]),
      (Pe[_e] = null));
}
var Ee = null,
  ke = null,
  $ = !1,
  Fe = null;
function Xa(e, t) {
  var n = Le(5, null, null, 0);
  ((n.elementType = "DELETED"),
    (n.stateNode = t),
    (n.return = e),
    (t = e.deletions),
    t === null ? ((e.deletions = [n]), (e.flags |= 16)) : t.push(n));
}
function bu(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return (
        (t =
          t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase()
            ? null
            : t),
        t !== null
          ? ((e.stateNode = t), (Ee = e), (ke = gt(t.firstChild)), !0)
          : !1
      );
    case 6:
      return (
        (t = e.pendingProps === "" || t.nodeType !== 3 ? null : t),
        t !== null ? ((e.stateNode = t), (Ee = e), (ke = null), !0) : !1
      );
    case 13:
      return (
        (t = t.nodeType !== 8 ? null : t),
        t !== null
          ? ((n = $t !== null ? { id: Je, overflow: Ze } : null),
            (e.memoizedState = {
              dehydrated: t,
              treeContext: n,
              retryLane: 1073741824,
            }),
            (n = Le(18, null, null, 0)),
            (n.stateNode = t),
            (n.return = e),
            (e.child = n),
            (Ee = e),
            (ke = null),
            !0)
          : !1
      );
    default:
      return !1;
  }
}
function Ji(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function Zi(e) {
  if ($) {
    var t = ke;
    if (t) {
      var n = t;
      if (!bu(e, t)) {
        if (Ji(e)) throw Error(k(418));
        t = gt(n.nextSibling);
        var r = Ee;
        t && bu(e, t)
          ? Xa(r, n)
          : ((e.flags = (e.flags & -4097) | 2), ($ = !1), (Ee = e));
      }
    } else {
      if (Ji(e)) throw Error(k(418));
      ((e.flags = (e.flags & -4097) | 2), ($ = !1), (Ee = e));
    }
  }
}
function es(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; )
    e = e.return;
  Ee = e;
}
function Dr(e) {
  if (e !== Ee) return !1;
  if (!$) return (es(e), ($ = !0), !1);
  var t;
  if (
    ((t = e.tag !== 3) &&
      !(t = e.tag !== 5) &&
      ((t = e.type),
      (t = t !== "head" && t !== "body" && !Ki(e.type, e.memoizedProps))),
    t && (t = ke))
  ) {
    if (Ji(e)) throw (Ga(), Error(k(418)));
    for (; t; ) (Xa(e, t), (t = gt(t.nextSibling)));
  }
  if ((es(e), e.tag === 13)) {
    if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
      throw Error(k(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === "/$") {
            if (t === 0) {
              ke = gt(e.nextSibling);
              break e;
            }
            t--;
          } else (n !== "$" && n !== "$!" && n !== "$?") || t++;
        }
        e = e.nextSibling;
      }
      ke = null;
    }
  } else ke = Ee ? gt(e.stateNode.nextSibling) : null;
  return !0;
}
function Ga() {
  for (var e = ke; e; ) e = gt(e.nextSibling);
}
function hn() {
  ((ke = Ee = null), ($ = !1));
}
function Vo(e) {
  Fe === null ? (Fe = [e]) : Fe.push(e);
}
var ap = rt.ReactCurrentBatchConfig;
function zn(e, t, n) {
  if (
    ((e = n.ref), e !== null && typeof e != "function" && typeof e != "object")
  ) {
    if (n._owner) {
      if (((n = n._owner), n)) {
        if (n.tag !== 1) throw Error(k(309));
        var r = n.stateNode;
      }
      if (!r) throw Error(k(147, e));
      var l = r,
        i = "" + e;
      return t !== null &&
        t.ref !== null &&
        typeof t.ref == "function" &&
        t.ref._stringRef === i
        ? t.ref
        : ((t = function (o) {
            var u = l.refs;
            o === null ? delete u[i] : (u[i] = o);
          }),
          (t._stringRef = i),
          t);
    }
    if (typeof e != "string") throw Error(k(284));
    if (!n._owner) throw Error(k(290, e));
  }
  return e;
}
function Mr(e, t) {
  throw (
    (e = Object.prototype.toString.call(t)),
    Error(
      k(
        31,
        e === "[object Object]"
          ? "object with keys {" + Object.keys(t).join(", ") + "}"
          : e,
      ),
    )
  );
}
function ts(e) {
  var t = e._init;
  return t(e._payload);
}
function Ja(e) {
  function t(c, f) {
    if (e) {
      var p = c.deletions;
      p === null ? ((c.deletions = [f]), (c.flags |= 16)) : p.push(f);
    }
  }
  function n(c, f) {
    if (!e) return null;
    for (; f !== null; ) (t(c, f), (f = f.sibling));
    return null;
  }
  function r(c, f) {
    for (c = new Map(); f !== null; )
      (f.key !== null ? c.set(f.key, f) : c.set(f.index, f), (f = f.sibling));
    return c;
  }
  function l(c, f) {
    return ((c = St(c, f)), (c.index = 0), (c.sibling = null), c);
  }
  function i(c, f, p) {
    return (
      (c.index = p),
      e
        ? ((p = c.alternate),
          p !== null
            ? ((p = p.index), p < f ? ((c.flags |= 2), f) : p)
            : ((c.flags |= 2), f))
        : ((c.flags |= 1048576), f)
    );
  }
  function o(c) {
    return (e && c.alternate === null && (c.flags |= 2), c);
  }
  function u(c, f, p, y) {
    return f === null || f.tag !== 6
      ? ((f = yi(p, c.mode, y)), (f.return = c), f)
      : ((f = l(f, p)), (f.return = c), f);
  }
  function a(c, f, p, y) {
    var C = p.type;
    return C === Xt
      ? h(c, f, p.props.children, y, p.key)
      : f !== null &&
          (f.elementType === C ||
            (typeof C == "object" &&
              C !== null &&
              C.$$typeof === ot &&
              ts(C) === f.type))
        ? ((y = l(f, p.props)), (y.ref = zn(c, f, p)), (y.return = c), y)
        : ((y = qr(p.type, p.key, p.props, null, c.mode, y)),
          (y.ref = zn(c, f, p)),
          (y.return = c),
          y);
  }
  function d(c, f, p, y) {
    return f === null ||
      f.tag !== 4 ||
      f.stateNode.containerInfo !== p.containerInfo ||
      f.stateNode.implementation !== p.implementation
      ? ((f = xi(p, c.mode, y)), (f.return = c), f)
      : ((f = l(f, p.children || [])), (f.return = c), f);
  }
  function h(c, f, p, y, C) {
    return f === null || f.tag !== 7
      ? ((f = Ft(p, c.mode, y, C)), (f.return = c), f)
      : ((f = l(f, p)), (f.return = c), f);
  }
  function m(c, f, p) {
    if ((typeof f == "string" && f !== "") || typeof f == "number")
      return ((f = yi("" + f, c.mode, p)), (f.return = c), f);
    if (typeof f == "object" && f !== null) {
      switch (f.$$typeof) {
        case jr:
          return (
            (p = qr(f.type, f.key, f.props, null, c.mode, p)),
            (p.ref = zn(c, null, f)),
            (p.return = c),
            p
          );
        case Yt:
          return ((f = xi(f, c.mode, p)), (f.return = c), f);
        case ot:
          var y = f._init;
          return m(c, y(f._payload), p);
      }
      if ($n(f) || _n(f))
        return ((f = Ft(f, c.mode, p, null)), (f.return = c), f);
      Mr(c, f);
    }
    return null;
  }
  function v(c, f, p, y) {
    var C = f !== null ? f.key : null;
    if ((typeof p == "string" && p !== "") || typeof p == "number")
      return C !== null ? null : u(c, f, "" + p, y);
    if (typeof p == "object" && p !== null) {
      switch (p.$$typeof) {
        case jr:
          return p.key === C ? a(c, f, p, y) : null;
        case Yt:
          return p.key === C ? d(c, f, p, y) : null;
        case ot:
          return ((C = p._init), v(c, f, C(p._payload), y));
      }
      if ($n(p) || _n(p)) return C !== null ? null : h(c, f, p, y, null);
      Mr(c, p);
    }
    return null;
  }
  function w(c, f, p, y, C) {
    if ((typeof y == "string" && y !== "") || typeof y == "number")
      return ((c = c.get(p) || null), u(f, c, "" + y, C));
    if (typeof y == "object" && y !== null) {
      switch (y.$$typeof) {
        case jr:
          return (
            (c = c.get(y.key === null ? p : y.key) || null),
            a(f, c, y, C)
          );
        case Yt:
          return (
            (c = c.get(y.key === null ? p : y.key) || null),
            d(f, c, y, C)
          );
        case ot:
          var P = y._init;
          return w(c, f, p, P(y._payload), C);
      }
      if ($n(y) || _n(y)) return ((c = c.get(p) || null), h(f, c, y, C, null));
      Mr(f, y);
    }
    return null;
  }
  function S(c, f, p, y) {
    for (
      var C = null, P = null, _ = f, L = (f = 0), A = null;
      _ !== null && L < p.length;
      L++
    ) {
      _.index > L ? ((A = _), (_ = null)) : (A = _.sibling);
      var T = v(c, _, p[L], y);
      if (T === null) {
        _ === null && (_ = A);
        break;
      }
      (e && _ && T.alternate === null && t(c, _),
        (f = i(T, f, L)),
        P === null ? (C = T) : (P.sibling = T),
        (P = T),
        (_ = A));
    }
    if (L === p.length) return (n(c, _), $ && Tt(c, L), C);
    if (_ === null) {
      for (; L < p.length; L++)
        ((_ = m(c, p[L], y)),
          _ !== null &&
            ((f = i(_, f, L)),
            P === null ? (C = _) : (P.sibling = _),
            (P = _)));
      return ($ && Tt(c, L), C);
    }
    for (_ = r(c, _); L < p.length; L++)
      ((A = w(_, c, L, p[L], y)),
        A !== null &&
          (e && A.alternate !== null && _.delete(A.key === null ? L : A.key),
          (f = i(A, f, L)),
          P === null ? (C = A) : (P.sibling = A),
          (P = A)));
    return (
      e &&
        _.forEach(function (we) {
          return t(c, we);
        }),
      $ && Tt(c, L),
      C
    );
  }
  function g(c, f, p, y) {
    var C = _n(p);
    if (typeof C != "function") throw Error(k(150));
    if (((p = C.call(p)), p == null)) throw Error(k(151));
    for (
      var P = (C = null), _ = f, L = (f = 0), A = null, T = p.next();
      _ !== null && !T.done;
      L++, T = p.next()
    ) {
      _.index > L ? ((A = _), (_ = null)) : (A = _.sibling);
      var we = v(c, _, T.value, y);
      if (we === null) {
        _ === null && (_ = A);
        break;
      }
      (e && _ && we.alternate === null && t(c, _),
        (f = i(we, f, L)),
        P === null ? (C = we) : (P.sibling = we),
        (P = we),
        (_ = A));
    }
    if (T.done) return (n(c, _), $ && Tt(c, L), C);
    if (_ === null) {
      for (; !T.done; L++, T = p.next())
        ((T = m(c, T.value, y)),
          T !== null &&
            ((f = i(T, f, L)),
            P === null ? (C = T) : (P.sibling = T),
            (P = T)));
      return ($ && Tt(c, L), C);
    }
    for (_ = r(c, _); !T.done; L++, T = p.next())
      ((T = w(_, c, L, T.value, y)),
        T !== null &&
          (e && T.alternate !== null && _.delete(T.key === null ? L : T.key),
          (f = i(T, f, L)),
          P === null ? (C = T) : (P.sibling = T),
          (P = T)));
    return (
      e &&
        _.forEach(function (Nn) {
          return t(c, Nn);
        }),
      $ && Tt(c, L),
      C
    );
  }
  function E(c, f, p, y) {
    if (
      (typeof p == "object" &&
        p !== null &&
        p.type === Xt &&
        p.key === null &&
        (p = p.props.children),
      typeof p == "object" && p !== null)
    ) {
      switch (p.$$typeof) {
        case jr:
          e: {
            for (var C = p.key, P = f; P !== null; ) {
              if (P.key === C) {
                if (((C = p.type), C === Xt)) {
                  if (P.tag === 7) {
                    (n(c, P.sibling),
                      (f = l(P, p.props.children)),
                      (f.return = c),
                      (c = f));
                    break e;
                  }
                } else if (
                  P.elementType === C ||
                  (typeof C == "object" &&
                    C !== null &&
                    C.$$typeof === ot &&
                    ts(C) === P.type)
                ) {
                  (n(c, P.sibling),
                    (f = l(P, p.props)),
                    (f.ref = zn(c, P, p)),
                    (f.return = c),
                    (c = f));
                  break e;
                }
                n(c, P);
                break;
              } else t(c, P);
              P = P.sibling;
            }
            p.type === Xt
              ? ((f = Ft(p.props.children, c.mode, y, p.key)),
                (f.return = c),
                (c = f))
              : ((y = qr(p.type, p.key, p.props, null, c.mode, y)),
                (y.ref = zn(c, f, p)),
                (y.return = c),
                (c = y));
          }
          return o(c);
        case Yt:
          e: {
            for (P = p.key; f !== null; ) {
              if (f.key === P)
                if (
                  f.tag === 4 &&
                  f.stateNode.containerInfo === p.containerInfo &&
                  f.stateNode.implementation === p.implementation
                ) {
                  (n(c, f.sibling),
                    (f = l(f, p.children || [])),
                    (f.return = c),
                    (c = f));
                  break e;
                } else {
                  n(c, f);
                  break;
                }
              else t(c, f);
              f = f.sibling;
            }
            ((f = xi(p, c.mode, y)), (f.return = c), (c = f));
          }
          return o(c);
        case ot:
          return ((P = p._init), E(c, f, P(p._payload), y));
      }
      if ($n(p)) return S(c, f, p, y);
      if (_n(p)) return g(c, f, p, y);
      Mr(c, p);
    }
    return (typeof p == "string" && p !== "") || typeof p == "number"
      ? ((p = "" + p),
        f !== null && f.tag === 6
          ? (n(c, f.sibling), (f = l(f, p)), (f.return = c), (c = f))
          : (n(c, f), (f = yi(p, c.mode, y)), (f.return = c), (c = f)),
        o(c))
      : n(c, f);
  }
  return E;
}
var mn = Ja(!0),
  Za = Ja(!1),
  fl = Nt(null),
  pl = null,
  nn = null,
  Wo = null;
function Qo() {
  Wo = nn = pl = null;
}
function Ho(e) {
  var t = fl.current;
  (U(fl), (e._currentValue = t));
}
function qi(e, t, n) {
  for (; e !== null; ) {
    var r = e.alternate;
    if (
      ((e.childLanes & t) !== t
        ? ((e.childLanes |= t), r !== null && (r.childLanes |= t))
        : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t),
      e === n)
    )
      break;
    e = e.return;
  }
}
function cn(e, t) {
  ((pl = e),
    (Wo = nn = null),
    (e = e.dependencies),
    e !== null &&
      e.firstContext !== null &&
      (e.lanes & t && (ve = !0), (e.firstContext = null)));
}
function Te(e) {
  var t = e._currentValue;
  if (Wo !== e)
    if (((e = { context: e, memoizedValue: t, next: null }), nn === null)) {
      if (pl === null) throw Error(k(308));
      ((nn = e), (pl.dependencies = { lanes: 0, firstContext: e }));
    } else nn = nn.next = e;
  return t;
}
var It = null;
function Ko(e) {
  It === null ? (It = [e]) : It.push(e);
}
function qa(e, t, n, r) {
  var l = t.interleaved;
  return (
    l === null ? ((n.next = n), Ko(t)) : ((n.next = l.next), (l.next = n)),
    (t.interleaved = n),
    tt(e, r)
  );
}
function tt(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; )
    ((e.childLanes |= t),
      (n = e.alternate),
      n !== null && (n.childLanes |= t),
      (n = e),
      (e = e.return));
  return n.tag === 3 ? n.stateNode : null;
}
var ut = !1;
function Yo(e) {
  e.updateQueue = {
    baseState: e.memoizedState,
    firstBaseUpdate: null,
    lastBaseUpdate: null,
    shared: { pending: null, interleaved: null, lanes: 0 },
    effects: null,
  };
}
function ba(e, t) {
  ((e = e.updateQueue),
    t.updateQueue === e &&
      (t.updateQueue = {
        baseState: e.baseState,
        firstBaseUpdate: e.firstBaseUpdate,
        lastBaseUpdate: e.lastBaseUpdate,
        shared: e.shared,
        effects: e.effects,
      }));
}
function qe(e, t) {
  return {
    eventTime: e,
    lane: t,
    tag: 0,
    payload: null,
    callback: null,
    next: null,
  };
}
function yt(e, t, n) {
  var r = e.updateQueue;
  if (r === null) return null;
  if (((r = r.shared), I & 2)) {
    var l = r.pending;
    return (
      l === null ? (t.next = t) : ((t.next = l.next), (l.next = t)),
      (r.pending = t),
      tt(e, n)
    );
  }
  return (
    (l = r.interleaved),
    l === null ? ((t.next = t), Ko(r)) : ((t.next = l.next), (l.next = t)),
    (r.interleaved = t),
    tt(e, n)
  );
}
function Kr(e, t, n) {
  if (
    ((t = t.updateQueue), t !== null && ((t = t.shared), (n & 4194240) !== 0))
  ) {
    var r = t.lanes;
    ((r &= e.pendingLanes), (n |= r), (t.lanes = n), Oo(e, n));
  }
}
function ns(e, t) {
  var n = e.updateQueue,
    r = e.alternate;
  if (r !== null && ((r = r.updateQueue), n === r)) {
    var l = null,
      i = null;
    if (((n = n.firstBaseUpdate), n !== null)) {
      do {
        var o = {
          eventTime: n.eventTime,
          lane: n.lane,
          tag: n.tag,
          payload: n.payload,
          callback: n.callback,
          next: null,
        };
        (i === null ? (l = i = o) : (i = i.next = o), (n = n.next));
      } while (n !== null);
      i === null ? (l = i = t) : (i = i.next = t);
    } else l = i = t;
    ((n = {
      baseState: r.baseState,
      firstBaseUpdate: l,
      lastBaseUpdate: i,
      shared: r.shared,
      effects: r.effects,
    }),
      (e.updateQueue = n));
    return;
  }
  ((e = n.lastBaseUpdate),
    e === null ? (n.firstBaseUpdate = t) : (e.next = t),
    (n.lastBaseUpdate = t));
}
function hl(e, t, n, r) {
  var l = e.updateQueue;
  ut = !1;
  var i = l.firstBaseUpdate,
    o = l.lastBaseUpdate,
    u = l.shared.pending;
  if (u !== null) {
    l.shared.pending = null;
    var a = u,
      d = a.next;
    ((a.next = null), o === null ? (i = d) : (o.next = d), (o = a));
    var h = e.alternate;
    h !== null &&
      ((h = h.updateQueue),
      (u = h.lastBaseUpdate),
      u !== o &&
        (u === null ? (h.firstBaseUpdate = d) : (u.next = d),
        (h.lastBaseUpdate = a)));
  }
  if (i !== null) {
    var m = l.baseState;
    ((o = 0), (h = d = a = null), (u = i));
    do {
      var v = u.lane,
        w = u.eventTime;
      if ((r & v) === v) {
        h !== null &&
          (h = h.next =
            {
              eventTime: w,
              lane: 0,
              tag: u.tag,
              payload: u.payload,
              callback: u.callback,
              next: null,
            });
        e: {
          var S = e,
            g = u;
          switch (((v = t), (w = n), g.tag)) {
            case 1:
              if (((S = g.payload), typeof S == "function")) {
                m = S.call(w, m, v);
                break e;
              }
              m = S;
              break e;
            case 3:
              S.flags = (S.flags & -65537) | 128;
            case 0:
              if (
                ((S = g.payload),
                (v = typeof S == "function" ? S.call(w, m, v) : S),
                v == null)
              )
                break e;
              m = Q({}, m, v);
              break e;
            case 2:
              ut = !0;
          }
        }
        u.callback !== null &&
          u.lane !== 0 &&
          ((e.flags |= 64),
          (v = l.effects),
          v === null ? (l.effects = [u]) : v.push(u));
      } else
        ((w = {
          eventTime: w,
          lane: v,
          tag: u.tag,
          payload: u.payload,
          callback: u.callback,
          next: null,
        }),
          h === null ? ((d = h = w), (a = m)) : (h = h.next = w),
          (o |= v));
      if (((u = u.next), u === null)) {
        if (((u = l.shared.pending), u === null)) break;
        ((v = u),
          (u = v.next),
          (v.next = null),
          (l.lastBaseUpdate = v),
          (l.shared.pending = null));
      }
    } while (!0);
    if (
      (h === null && (a = m),
      (l.baseState = a),
      (l.firstBaseUpdate = d),
      (l.lastBaseUpdate = h),
      (t = l.shared.interleaved),
      t !== null)
    ) {
      l = t;
      do ((o |= l.lane), (l = l.next));
      while (l !== t);
    } else i === null && (l.shared.lanes = 0);
    ((Bt |= o), (e.lanes = o), (e.memoizedState = m));
  }
}
function rs(e, t, n) {
  if (((e = t.effects), (t.effects = null), e !== null))
    for (t = 0; t < e.length; t++) {
      var r = e[t],
        l = r.callback;
      if (l !== null) {
        if (((r.callback = null), (r = n), typeof l != "function"))
          throw Error(k(191, l));
        l.call(r);
      }
    }
}
var wr = {},
  Ke = Nt(wr),
  sr = Nt(wr),
  ar = Nt(wr);
function Dt(e) {
  if (e === wr) throw Error(k(174));
  return e;
}
function Xo(e, t) {
  switch ((M(ar, t), M(sr, e), M(Ke, wr), (e = t.nodeType), e)) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : Oi(null, "");
      break;
    default:
      ((e = e === 8 ? t.parentNode : t),
        (t = e.namespaceURI || null),
        (e = e.tagName),
        (t = Oi(t, e)));
  }
  (U(Ke), M(Ke, t));
}
function vn() {
  (U(Ke), U(sr), U(ar));
}
function ec(e) {
  Dt(ar.current);
  var t = Dt(Ke.current),
    n = Oi(t, e.type);
  t !== n && (M(sr, e), M(Ke, n));
}
function Go(e) {
  sr.current === e && (U(Ke), U(sr));
}
var B = Nt(0);
function ml(e) {
  for (var t = e; t !== null; ) {
    if (t.tag === 13) {
      var n = t.memoizedState;
      if (
        n !== null &&
        ((n = n.dehydrated), n === null || n.data === "$?" || n.data === "$!")
      )
        return t;
    } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
      if (t.flags & 128) return t;
    } else if (t.child !== null) {
      ((t.child.return = t), (t = t.child));
      continue;
    }
    if (t === e) break;
    for (; t.sibling === null; ) {
      if (t.return === null || t.return === e) return null;
      t = t.return;
    }
    ((t.sibling.return = t.return), (t = t.sibling));
  }
  return null;
}
var fi = [];
function Jo() {
  for (var e = 0; e < fi.length; e++)
    fi[e]._workInProgressVersionPrimary = null;
  fi.length = 0;
}
var Yr = rt.ReactCurrentDispatcher,
  pi = rt.ReactCurrentBatchConfig,
  At = 0,
  V = null,
  J = null,
  b = null,
  vl = !1,
  Yn = !1,
  cr = 0,
  cp = 0;
function le() {
  throw Error(k(321));
}
function Zo(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++)
    if (!Be(e[n], t[n])) return !1;
  return !0;
}
function qo(e, t, n, r, l, i) {
  if (
    ((At = i),
    (V = t),
    (t.memoizedState = null),
    (t.updateQueue = null),
    (t.lanes = 0),
    (Yr.current = e === null || e.memoizedState === null ? hp : mp),
    (e = n(r, l)),
    Yn)
  ) {
    i = 0;
    do {
      if (((Yn = !1), (cr = 0), 25 <= i)) throw Error(k(301));
      ((i += 1),
        (b = J = null),
        (t.updateQueue = null),
        (Yr.current = vp),
        (e = n(r, l)));
    } while (Yn);
  }
  if (
    ((Yr.current = gl),
    (t = J !== null && J.next !== null),
    (At = 0),
    (b = J = V = null),
    (vl = !1),
    t)
  )
    throw Error(k(300));
  return e;
}
function bo() {
  var e = cr !== 0;
  return ((cr = 0), e);
}
function We() {
  var e = {
    memoizedState: null,
    baseState: null,
    baseQueue: null,
    queue: null,
    next: null,
  };
  return (b === null ? (V.memoizedState = b = e) : (b = b.next = e), b);
}
function Oe() {
  if (J === null) {
    var e = V.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = J.next;
  var t = b === null ? V.memoizedState : b.next;
  if (t !== null) ((b = t), (J = e));
  else {
    if (e === null) throw Error(k(310));
    ((J = e),
      (e = {
        memoizedState: J.memoizedState,
        baseState: J.baseState,
        baseQueue: J.baseQueue,
        queue: J.queue,
        next: null,
      }),
      b === null ? (V.memoizedState = b = e) : (b = b.next = e));
  }
  return b;
}
function dr(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function hi(e) {
  var t = Oe(),
    n = t.queue;
  if (n === null) throw Error(k(311));
  n.lastRenderedReducer = e;
  var r = J,
    l = r.baseQueue,
    i = n.pending;
  if (i !== null) {
    if (l !== null) {
      var o = l.next;
      ((l.next = i.next), (i.next = o));
    }
    ((r.baseQueue = l = i), (n.pending = null));
  }
  if (l !== null) {
    ((i = l.next), (r = r.baseState));
    var u = (o = null),
      a = null,
      d = i;
    do {
      var h = d.lane;
      if ((At & h) === h)
        (a !== null &&
          (a = a.next =
            {
              lane: 0,
              action: d.action,
              hasEagerState: d.hasEagerState,
              eagerState: d.eagerState,
              next: null,
            }),
          (r = d.hasEagerState ? d.eagerState : e(r, d.action)));
      else {
        var m = {
          lane: h,
          action: d.action,
          hasEagerState: d.hasEagerState,
          eagerState: d.eagerState,
          next: null,
        };
        (a === null ? ((u = a = m), (o = r)) : (a = a.next = m),
          (V.lanes |= h),
          (Bt |= h));
      }
      d = d.next;
    } while (d !== null && d !== i);
    (a === null ? (o = r) : (a.next = u),
      Be(r, t.memoizedState) || (ve = !0),
      (t.memoizedState = r),
      (t.baseState = o),
      (t.baseQueue = a),
      (n.lastRenderedState = r));
  }
  if (((e = n.interleaved), e !== null)) {
    l = e;
    do ((i = l.lane), (V.lanes |= i), (Bt |= i), (l = l.next));
    while (l !== e);
  } else l === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function mi(e) {
  var t = Oe(),
    n = t.queue;
  if (n === null) throw Error(k(311));
  n.lastRenderedReducer = e;
  var r = n.dispatch,
    l = n.pending,
    i = t.memoizedState;
  if (l !== null) {
    n.pending = null;
    var o = (l = l.next);
    do ((i = e(i, o.action)), (o = o.next));
    while (o !== l);
    (Be(i, t.memoizedState) || (ve = !0),
      (t.memoizedState = i),
      t.baseQueue === null && (t.baseState = i),
      (n.lastRenderedState = i));
  }
  return [i, r];
}
function tc() {}
function nc(e, t) {
  var n = V,
    r = Oe(),
    l = t(),
    i = !Be(r.memoizedState, l);
  if (
    (i && ((r.memoizedState = l), (ve = !0)),
    (r = r.queue),
    eu(ic.bind(null, n, r, e), [e]),
    r.getSnapshot !== t || i || (b !== null && b.memoizedState.tag & 1))
  ) {
    if (
      ((n.flags |= 2048),
      fr(9, lc.bind(null, n, r, l, t), void 0, null),
      ee === null)
    )
      throw Error(k(349));
    At & 30 || rc(n, t, l);
  }
  return l;
}
function rc(e, t, n) {
  ((e.flags |= 16384),
    (e = { getSnapshot: t, value: n }),
    (t = V.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }),
        (V.updateQueue = t),
        (t.stores = [e]))
      : ((n = t.stores), n === null ? (t.stores = [e]) : n.push(e)));
}
function lc(e, t, n, r) {
  ((t.value = n), (t.getSnapshot = r), oc(t) && uc(e));
}
function ic(e, t, n) {
  return n(function () {
    oc(t) && uc(e);
  });
}
function oc(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !Be(e, n);
  } catch {
    return !0;
  }
}
function uc(e) {
  var t = tt(e, 1);
  t !== null && Ae(t, e, 1, -1);
}
function ls(e) {
  var t = We();
  return (
    typeof e == "function" && (e = e()),
    (t.memoizedState = t.baseState = e),
    (e = {
      pending: null,
      interleaved: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: dr,
      lastRenderedState: e,
    }),
    (t.queue = e),
    (e = e.dispatch = pp.bind(null, V, e)),
    [t.memoizedState, e]
  );
}
function fr(e, t, n, r) {
  return (
    (e = { tag: e, create: t, destroy: n, deps: r, next: null }),
    (t = V.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }),
        (V.updateQueue = t),
        (t.lastEffect = e.next = e))
      : ((n = t.lastEffect),
        n === null
          ? (t.lastEffect = e.next = e)
          : ((r = n.next), (n.next = e), (e.next = r), (t.lastEffect = e))),
    e
  );
}
function sc() {
  return Oe().memoizedState;
}
function Xr(e, t, n, r) {
  var l = We();
  ((V.flags |= e),
    (l.memoizedState = fr(1 | t, n, void 0, r === void 0 ? null : r)));
}
function zl(e, t, n, r) {
  var l = Oe();
  r = r === void 0 ? null : r;
  var i = void 0;
  if (J !== null) {
    var o = J.memoizedState;
    if (((i = o.destroy), r !== null && Zo(r, o.deps))) {
      l.memoizedState = fr(t, n, i, r);
      return;
    }
  }
  ((V.flags |= e), (l.memoizedState = fr(1 | t, n, i, r)));
}
function is(e, t) {
  return Xr(8390656, 8, e, t);
}
function eu(e, t) {
  return zl(2048, 8, e, t);
}
function ac(e, t) {
  return zl(4, 2, e, t);
}
function cc(e, t) {
  return zl(4, 4, e, t);
}
function dc(e, t) {
  if (typeof t == "function")
    return (
      (e = e()),
      t(e),
      function () {
        t(null);
      }
    );
  if (t != null)
    return (
      (e = e()),
      (t.current = e),
      function () {
        t.current = null;
      }
    );
}
function fc(e, t, n) {
  return (
    (n = n != null ? n.concat([e]) : null),
    zl(4, 4, dc.bind(null, t, e), n)
  );
}
function tu() {}
function pc(e, t) {
  var n = Oe();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Zo(t, r[1])
    ? r[0]
    : ((n.memoizedState = [e, t]), e);
}
function hc(e, t) {
  var n = Oe();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Zo(t, r[1])
    ? r[0]
    : ((e = e()), (n.memoizedState = [e, t]), e);
}
function mc(e, t, n) {
  return At & 21
    ? (Be(n, t) || ((n = wa()), (V.lanes |= n), (Bt |= n), (e.baseState = !0)),
      t)
    : (e.baseState && ((e.baseState = !1), (ve = !0)), (e.memoizedState = n));
}
function dp(e, t) {
  var n = D;
  ((D = n !== 0 && 4 > n ? n : 4), e(!0));
  var r = pi.transition;
  pi.transition = {};
  try {
    (e(!1), t());
  } finally {
    ((D = n), (pi.transition = r));
  }
}
function vc() {
  return Oe().memoizedState;
}
function fp(e, t, n) {
  var r = wt(e);
  if (
    ((n = {
      lane: r,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
    gc(e))
  )
    yc(t, n);
  else if (((n = qa(e, t, n, r)), n !== null)) {
    var l = ce();
    (Ae(n, e, r, l), xc(n, t, r));
  }
}
function pp(e, t, n) {
  var r = wt(e),
    l = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (gc(e)) yc(t, l);
  else {
    var i = e.alternate;
    if (
      e.lanes === 0 &&
      (i === null || i.lanes === 0) &&
      ((i = t.lastRenderedReducer), i !== null)
    )
      try {
        var o = t.lastRenderedState,
          u = i(o, n);
        if (((l.hasEagerState = !0), (l.eagerState = u), Be(u, o))) {
          var a = t.interleaved;
          (a === null
            ? ((l.next = l), Ko(t))
            : ((l.next = a.next), (a.next = l)),
            (t.interleaved = l));
          return;
        }
      } catch {
      } finally {
      }
    ((n = qa(e, t, l, r)),
      n !== null && ((l = ce()), Ae(n, e, r, l), xc(n, t, r)));
  }
}
function gc(e) {
  var t = e.alternate;
  return e === V || (t !== null && t === V);
}
function yc(e, t) {
  Yn = vl = !0;
  var n = e.pending;
  (n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)),
    (e.pending = t));
}
function xc(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes;
    ((r &= e.pendingLanes), (n |= r), (t.lanes = n), Oo(e, n));
  }
}
var gl = {
    readContext: Te,
    useCallback: le,
    useContext: le,
    useEffect: le,
    useImperativeHandle: le,
    useInsertionEffect: le,
    useLayoutEffect: le,
    useMemo: le,
    useReducer: le,
    useRef: le,
    useState: le,
    useDebugValue: le,
    useDeferredValue: le,
    useTransition: le,
    useMutableSource: le,
    useSyncExternalStore: le,
    useId: le,
    unstable_isNewReconciler: !1,
  },
  hp = {
    readContext: Te,
    useCallback: function (e, t) {
      return ((We().memoizedState = [e, t === void 0 ? null : t]), e);
    },
    useContext: Te,
    useEffect: is,
    useImperativeHandle: function (e, t, n) {
      return (
        (n = n != null ? n.concat([e]) : null),
        Xr(4194308, 4, dc.bind(null, t, e), n)
      );
    },
    useLayoutEffect: function (e, t) {
      return Xr(4194308, 4, e, t);
    },
    useInsertionEffect: function (e, t) {
      return Xr(4, 2, e, t);
    },
    useMemo: function (e, t) {
      var n = We();
      return (
        (t = t === void 0 ? null : t),
        (e = e()),
        (n.memoizedState = [e, t]),
        e
      );
    },
    useReducer: function (e, t, n) {
      var r = We();
      return (
        (t = n !== void 0 ? n(t) : t),
        (r.memoizedState = r.baseState = t),
        (e = {
          pending: null,
          interleaved: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: e,
          lastRenderedState: t,
        }),
        (r.queue = e),
        (e = e.dispatch = fp.bind(null, V, e)),
        [r.memoizedState, e]
      );
    },
    useRef: function (e) {
      var t = We();
      return ((e = { current: e }), (t.memoizedState = e));
    },
    useState: ls,
    useDebugValue: tu,
    useDeferredValue: function (e) {
      return (We().memoizedState = e);
    },
    useTransition: function () {
      var e = ls(!1),
        t = e[0];
      return ((e = dp.bind(null, e[1])), (We().memoizedState = e), [t, e]);
    },
    useMutableSource: function () {},
    useSyncExternalStore: function (e, t, n) {
      var r = V,
        l = We();
      if ($) {
        if (n === void 0) throw Error(k(407));
        n = n();
      } else {
        if (((n = t()), ee === null)) throw Error(k(349));
        At & 30 || rc(r, t, n);
      }
      l.memoizedState = n;
      var i = { value: n, getSnapshot: t };
      return (
        (l.queue = i),
        is(ic.bind(null, r, i, e), [e]),
        (r.flags |= 2048),
        fr(9, lc.bind(null, r, i, n, t), void 0, null),
        n
      );
    },
    useId: function () {
      var e = We(),
        t = ee.identifierPrefix;
      if ($) {
        var n = Ze,
          r = Je;
        ((n = (r & ~(1 << (32 - $e(r) - 1))).toString(32) + n),
          (t = ":" + t + "R" + n),
          (n = cr++),
          0 < n && (t += "H" + n.toString(32)),
          (t += ":"));
      } else ((n = cp++), (t = ":" + t + "r" + n.toString(32) + ":"));
      return (e.memoizedState = t);
    },
    unstable_isNewReconciler: !1,
  },
  mp = {
    readContext: Te,
    useCallback: pc,
    useContext: Te,
    useEffect: eu,
    useImperativeHandle: fc,
    useInsertionEffect: ac,
    useLayoutEffect: cc,
    useMemo: hc,
    useReducer: hi,
    useRef: sc,
    useState: function () {
      return hi(dr);
    },
    useDebugValue: tu,
    useDeferredValue: function (e) {
      var t = Oe();
      return mc(t, J.memoizedState, e);
    },
    useTransition: function () {
      var e = hi(dr)[0],
        t = Oe().memoizedState;
      return [e, t];
    },
    useMutableSource: tc,
    useSyncExternalStore: nc,
    useId: vc,
    unstable_isNewReconciler: !1,
  },
  vp = {
    readContext: Te,
    useCallback: pc,
    useContext: Te,
    useEffect: eu,
    useImperativeHandle: fc,
    useInsertionEffect: ac,
    useLayoutEffect: cc,
    useMemo: hc,
    useReducer: mi,
    useRef: sc,
    useState: function () {
      return mi(dr);
    },
    useDebugValue: tu,
    useDeferredValue: function (e) {
      var t = Oe();
      return J === null ? (t.memoizedState = e) : mc(t, J.memoizedState, e);
    },
    useTransition: function () {
      var e = mi(dr)[0],
        t = Oe().memoizedState;
      return [e, t];
    },
    useMutableSource: tc,
    useSyncExternalStore: nc,
    useId: vc,
    unstable_isNewReconciler: !1,
  };
function De(e, t) {
  if (e && e.defaultProps) {
    ((t = Q({}, t)), (e = e.defaultProps));
    for (var n in e) t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
function bi(e, t, n, r) {
  ((t = e.memoizedState),
    (n = n(r, t)),
    (n = n == null ? t : Q({}, t, n)),
    (e.memoizedState = n),
    e.lanes === 0 && (e.updateQueue.baseState = n));
}
var Il = {
  isMounted: function (e) {
    return (e = e._reactInternals) ? Qt(e) === e : !1;
  },
  enqueueSetState: function (e, t, n) {
    e = e._reactInternals;
    var r = ce(),
      l = wt(e),
      i = qe(r, l);
    ((i.payload = t),
      n != null && (i.callback = n),
      (t = yt(e, i, l)),
      t !== null && (Ae(t, e, l, r), Kr(t, e, l)));
  },
  enqueueReplaceState: function (e, t, n) {
    e = e._reactInternals;
    var r = ce(),
      l = wt(e),
      i = qe(r, l);
    ((i.tag = 1),
      (i.payload = t),
      n != null && (i.callback = n),
      (t = yt(e, i, l)),
      t !== null && (Ae(t, e, l, r), Kr(t, e, l)));
  },
  enqueueForceUpdate: function (e, t) {
    e = e._reactInternals;
    var n = ce(),
      r = wt(e),
      l = qe(n, r);
    ((l.tag = 2),
      t != null && (l.callback = t),
      (t = yt(e, l, r)),
      t !== null && (Ae(t, e, r, n), Kr(t, e, r)));
  },
};
function os(e, t, n, r, l, i, o) {
  return (
    (e = e.stateNode),
    typeof e.shouldComponentUpdate == "function"
      ? e.shouldComponentUpdate(r, i, o)
      : t.prototype && t.prototype.isPureReactComponent
        ? !lr(n, r) || !lr(l, i)
        : !0
  );
}
function wc(e, t, n) {
  var r = !1,
    l = Ct,
    i = t.contextType;
  return (
    typeof i == "object" && i !== null
      ? (i = Te(i))
      : ((l = ye(t) ? Ut : se.current),
        (r = t.contextTypes),
        (i = (r = r != null) ? pn(e, l) : Ct)),
    (t = new t(n, i)),
    (e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null),
    (t.updater = Il),
    (e.stateNode = t),
    (t._reactInternals = e),
    r &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = l),
      (e.__reactInternalMemoizedMaskedChildContext = i)),
    t
  );
}
function us(e, t, n, r) {
  ((e = t.state),
    typeof t.componentWillReceiveProps == "function" &&
      t.componentWillReceiveProps(n, r),
    typeof t.UNSAFE_componentWillReceiveProps == "function" &&
      t.UNSAFE_componentWillReceiveProps(n, r),
    t.state !== e && Il.enqueueReplaceState(t, t.state, null));
}
function eo(e, t, n, r) {
  var l = e.stateNode;
  ((l.props = n), (l.state = e.memoizedState), (l.refs = {}), Yo(e));
  var i = t.contextType;
  (typeof i == "object" && i !== null
    ? (l.context = Te(i))
    : ((i = ye(t) ? Ut : se.current), (l.context = pn(e, i))),
    (l.state = e.memoizedState),
    (i = t.getDerivedStateFromProps),
    typeof i == "function" && (bi(e, t, i, n), (l.state = e.memoizedState)),
    typeof t.getDerivedStateFromProps == "function" ||
      typeof l.getSnapshotBeforeUpdate == "function" ||
      (typeof l.UNSAFE_componentWillMount != "function" &&
        typeof l.componentWillMount != "function") ||
      ((t = l.state),
      typeof l.componentWillMount == "function" && l.componentWillMount(),
      typeof l.UNSAFE_componentWillMount == "function" &&
        l.UNSAFE_componentWillMount(),
      t !== l.state && Il.enqueueReplaceState(l, l.state, null),
      hl(e, n, l, r),
      (l.state = e.memoizedState)),
    typeof l.componentDidMount == "function" && (e.flags |= 4194308));
}
function gn(e, t) {
  try {
    var n = "",
      r = t;
    do ((n += Wd(r)), (r = r.return));
    while (r);
    var l = n;
  } catch (i) {
    l =
      `
Error generating stack: ` +
      i.message +
      `
` +
      i.stack;
  }
  return { value: e, source: t, stack: l, digest: null };
}
function vi(e, t, n) {
  return { value: e, source: null, stack: n ?? null, digest: t ?? null };
}
function to(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function () {
      throw n;
    });
  }
}
var gp = typeof WeakMap == "function" ? WeakMap : Map;
function Sc(e, t, n) {
  ((n = qe(-1, n)), (n.tag = 3), (n.payload = { element: null }));
  var r = t.value;
  return (
    (n.callback = function () {
      (xl || ((xl = !0), (fo = r)), to(e, t));
    }),
    n
  );
}
function kc(e, t, n) {
  ((n = qe(-1, n)), (n.tag = 3));
  var r = e.type.getDerivedStateFromError;
  if (typeof r == "function") {
    var l = t.value;
    ((n.payload = function () {
      return r(l);
    }),
      (n.callback = function () {
        to(e, t);
      }));
  }
  var i = e.stateNode;
  return (
    i !== null &&
      typeof i.componentDidCatch == "function" &&
      (n.callback = function () {
        (to(e, t),
          typeof r != "function" &&
            (xt === null ? (xt = new Set([this])) : xt.add(this)));
        var o = t.stack;
        this.componentDidCatch(t.value, {
          componentStack: o !== null ? o : "",
        });
      }),
    n
  );
}
function ss(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new gp();
    var l = new Set();
    r.set(t, l);
  } else ((l = r.get(t)), l === void 0 && ((l = new Set()), r.set(t, l)));
  l.has(n) || (l.add(n), (e = Tp.bind(null, e, t, n)), t.then(e, e));
}
function as(e) {
  do {
    var t;
    if (
      ((t = e.tag === 13) &&
        ((t = e.memoizedState), (t = t !== null ? t.dehydrated !== null : !0)),
      t)
    )
      return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function cs(e, t, n, r, l) {
  return e.mode & 1
    ? ((e.flags |= 65536), (e.lanes = l), e)
    : (e === t
        ? (e.flags |= 65536)
        : ((e.flags |= 128),
          (n.flags |= 131072),
          (n.flags &= -52805),
          n.tag === 1 &&
            (n.alternate === null
              ? (n.tag = 17)
              : ((t = qe(-1, 1)), (t.tag = 2), yt(n, t, 1))),
          (n.lanes |= 1)),
      e);
}
var yp = rt.ReactCurrentOwner,
  ve = !1;
function ae(e, t, n, r) {
  t.child = e === null ? Za(t, null, n, r) : mn(t, e.child, n, r);
}
function ds(e, t, n, r, l) {
  n = n.render;
  var i = t.ref;
  return (
    cn(t, l),
    (r = qo(e, t, n, r, i, l)),
    (n = bo()),
    e !== null && !ve
      ? ((t.updateQueue = e.updateQueue),
        (t.flags &= -2053),
        (e.lanes &= ~l),
        nt(e, t, l))
      : ($ && n && Ao(t), (t.flags |= 1), ae(e, t, r, l), t.child)
  );
}
function fs(e, t, n, r, l) {
  if (e === null) {
    var i = n.type;
    return typeof i == "function" &&
      !au(i) &&
      i.defaultProps === void 0 &&
      n.compare === null &&
      n.defaultProps === void 0
      ? ((t.tag = 15), (t.type = i), Ec(e, t, i, r, l))
      : ((e = qr(n.type, null, r, t, t.mode, l)),
        (e.ref = t.ref),
        (e.return = t),
        (t.child = e));
  }
  if (((i = e.child), !(e.lanes & l))) {
    var o = i.memoizedProps;
    if (
      ((n = n.compare), (n = n !== null ? n : lr), n(o, r) && e.ref === t.ref)
    )
      return nt(e, t, l);
  }
  return (
    (t.flags |= 1),
    (e = St(i, r)),
    (e.ref = t.ref),
    (e.return = t),
    (t.child = e)
  );
}
function Ec(e, t, n, r, l) {
  if (e !== null) {
    var i = e.memoizedProps;
    if (lr(i, r) && e.ref === t.ref)
      if (((ve = !1), (t.pendingProps = r = i), (e.lanes & l) !== 0))
        e.flags & 131072 && (ve = !0);
      else return ((t.lanes = e.lanes), nt(e, t, l));
  }
  return no(e, t, n, r, l);
}
function Cc(e, t, n) {
  var r = t.pendingProps,
    l = r.children,
    i = e !== null ? e.memoizedState : null;
  if (r.mode === "hidden")
    if (!(t.mode & 1))
      ((t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        M(ln, Se),
        (Se |= n));
    else {
      if (!(n & 1073741824))
        return (
          (e = i !== null ? i.baseLanes | n : n),
          (t.lanes = t.childLanes = 1073741824),
          (t.memoizedState = {
            baseLanes: e,
            cachePool: null,
            transitions: null,
          }),
          (t.updateQueue = null),
          M(ln, Se),
          (Se |= e),
          null
        );
      ((t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        (r = i !== null ? i.baseLanes : n),
        M(ln, Se),
        (Se |= r));
    }
  else
    (i !== null ? ((r = i.baseLanes | n), (t.memoizedState = null)) : (r = n),
      M(ln, Se),
      (Se |= r));
  return (ae(e, t, l, n), t.child);
}
function jc(e, t) {
  var n = t.ref;
  ((e === null && n !== null) || (e !== null && e.ref !== n)) &&
    ((t.flags |= 512), (t.flags |= 2097152));
}
function no(e, t, n, r, l) {
  var i = ye(n) ? Ut : se.current;
  return (
    (i = pn(t, i)),
    cn(t, l),
    (n = qo(e, t, n, r, i, l)),
    (r = bo()),
    e !== null && !ve
      ? ((t.updateQueue = e.updateQueue),
        (t.flags &= -2053),
        (e.lanes &= ~l),
        nt(e, t, l))
      : ($ && r && Ao(t), (t.flags |= 1), ae(e, t, n, l), t.child)
  );
}
function ps(e, t, n, r, l) {
  if (ye(n)) {
    var i = !0;
    al(t);
  } else i = !1;
  if ((cn(t, l), t.stateNode === null))
    (Gr(e, t), wc(t, n, r), eo(t, n, r, l), (r = !0));
  else if (e === null) {
    var o = t.stateNode,
      u = t.memoizedProps;
    o.props = u;
    var a = o.context,
      d = n.contextType;
    typeof d == "object" && d !== null
      ? (d = Te(d))
      : ((d = ye(n) ? Ut : se.current), (d = pn(t, d)));
    var h = n.getDerivedStateFromProps,
      m =
        typeof h == "function" ||
        typeof o.getSnapshotBeforeUpdate == "function";
    (m ||
      (typeof o.UNSAFE_componentWillReceiveProps != "function" &&
        typeof o.componentWillReceiveProps != "function") ||
      ((u !== r || a !== d) && us(t, o, r, d)),
      (ut = !1));
    var v = t.memoizedState;
    ((o.state = v),
      hl(t, r, o, l),
      (a = t.memoizedState),
      u !== r || v !== a || ge.current || ut
        ? (typeof h == "function" && (bi(t, n, h, r), (a = t.memoizedState)),
          (u = ut || os(t, n, u, r, v, a, d))
            ? (m ||
                (typeof o.UNSAFE_componentWillMount != "function" &&
                  typeof o.componentWillMount != "function") ||
                (typeof o.componentWillMount == "function" &&
                  o.componentWillMount(),
                typeof o.UNSAFE_componentWillMount == "function" &&
                  o.UNSAFE_componentWillMount()),
              typeof o.componentDidMount == "function" && (t.flags |= 4194308))
            : (typeof o.componentDidMount == "function" && (t.flags |= 4194308),
              (t.memoizedProps = r),
              (t.memoizedState = a)),
          (o.props = r),
          (o.state = a),
          (o.context = d),
          (r = u))
        : (typeof o.componentDidMount == "function" && (t.flags |= 4194308),
          (r = !1)));
  } else {
    ((o = t.stateNode),
      ba(e, t),
      (u = t.memoizedProps),
      (d = t.type === t.elementType ? u : De(t.type, u)),
      (o.props = d),
      (m = t.pendingProps),
      (v = o.context),
      (a = n.contextType),
      typeof a == "object" && a !== null
        ? (a = Te(a))
        : ((a = ye(n) ? Ut : se.current), (a = pn(t, a))));
    var w = n.getDerivedStateFromProps;
    ((h =
      typeof w == "function" ||
      typeof o.getSnapshotBeforeUpdate == "function") ||
      (typeof o.UNSAFE_componentWillReceiveProps != "function" &&
        typeof o.componentWillReceiveProps != "function") ||
      ((u !== m || v !== a) && us(t, o, r, a)),
      (ut = !1),
      (v = t.memoizedState),
      (o.state = v),
      hl(t, r, o, l));
    var S = t.memoizedState;
    u !== m || v !== S || ge.current || ut
      ? (typeof w == "function" && (bi(t, n, w, r), (S = t.memoizedState)),
        (d = ut || os(t, n, d, r, v, S, a) || !1)
          ? (h ||
              (typeof o.UNSAFE_componentWillUpdate != "function" &&
                typeof o.componentWillUpdate != "function") ||
              (typeof o.componentWillUpdate == "function" &&
                o.componentWillUpdate(r, S, a),
              typeof o.UNSAFE_componentWillUpdate == "function" &&
                o.UNSAFE_componentWillUpdate(r, S, a)),
            typeof o.componentDidUpdate == "function" && (t.flags |= 4),
            typeof o.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024))
          : (typeof o.componentDidUpdate != "function" ||
              (u === e.memoizedProps && v === e.memoizedState) ||
              (t.flags |= 4),
            typeof o.getSnapshotBeforeUpdate != "function" ||
              (u === e.memoizedProps && v === e.memoizedState) ||
              (t.flags |= 1024),
            (t.memoizedProps = r),
            (t.memoizedState = S)),
        (o.props = r),
        (o.state = S),
        (o.context = a),
        (r = d))
      : (typeof o.componentDidUpdate != "function" ||
          (u === e.memoizedProps && v === e.memoizedState) ||
          (t.flags |= 4),
        typeof o.getSnapshotBeforeUpdate != "function" ||
          (u === e.memoizedProps && v === e.memoizedState) ||
          (t.flags |= 1024),
        (r = !1));
  }
  return ro(e, t, n, r, i, l);
}
function ro(e, t, n, r, l, i) {
  jc(e, t);
  var o = (t.flags & 128) !== 0;
  if (!r && !o) return (l && qu(t, n, !1), nt(e, t, i));
  ((r = t.stateNode), (yp.current = t));
  var u =
    o && typeof n.getDerivedStateFromError != "function" ? null : r.render();
  return (
    (t.flags |= 1),
    e !== null && o
      ? ((t.child = mn(t, e.child, null, i)), (t.child = mn(t, null, u, i)))
      : ae(e, t, u, i),
    (t.memoizedState = r.state),
    l && qu(t, n, !0),
    t.child
  );
}
function Nc(e) {
  var t = e.stateNode;
  (t.pendingContext
    ? Zu(e, t.pendingContext, t.pendingContext !== t.context)
    : t.context && Zu(e, t.context, !1),
    Xo(e, t.containerInfo));
}
function hs(e, t, n, r, l) {
  return (hn(), Vo(l), (t.flags |= 256), ae(e, t, n, r), t.child);
}
var lo = { dehydrated: null, treeContext: null, retryLane: 0 };
function io(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function Pc(e, t, n) {
  var r = t.pendingProps,
    l = B.current,
    i = !1,
    o = (t.flags & 128) !== 0,
    u;
  if (
    ((u = o) ||
      (u = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0),
    u
      ? ((i = !0), (t.flags &= -129))
      : (e === null || e.memoizedState !== null) && (l |= 1),
    M(B, l & 1),
    e === null)
  )
    return (
      Zi(t),
      (e = t.memoizedState),
      e !== null && ((e = e.dehydrated), e !== null)
        ? (t.mode & 1
            ? e.data === "$!"
              ? (t.lanes = 8)
              : (t.lanes = 1073741824)
            : (t.lanes = 1),
          null)
        : ((o = r.children),
          (e = r.fallback),
          i
            ? ((r = t.mode),
              (i = t.child),
              (o = { mode: "hidden", children: o }),
              !(r & 1) && i !== null
                ? ((i.childLanes = 0), (i.pendingProps = o))
                : (i = Fl(o, r, 0, null)),
              (e = Ft(e, r, n, null)),
              (i.return = t),
              (e.return = t),
              (i.sibling = e),
              (t.child = i),
              (t.child.memoizedState = io(n)),
              (t.memoizedState = lo),
              e)
            : nu(t, o))
    );
  if (((l = e.memoizedState), l !== null && ((u = l.dehydrated), u !== null)))
    return xp(e, t, o, r, u, l, n);
  if (i) {
    ((i = r.fallback), (o = t.mode), (l = e.child), (u = l.sibling));
    var a = { mode: "hidden", children: r.children };
    return (
      !(o & 1) && t.child !== l
        ? ((r = t.child),
          (r.childLanes = 0),
          (r.pendingProps = a),
          (t.deletions = null))
        : ((r = St(l, a)), (r.subtreeFlags = l.subtreeFlags & 14680064)),
      u !== null ? (i = St(u, i)) : ((i = Ft(i, o, n, null)), (i.flags |= 2)),
      (i.return = t),
      (r.return = t),
      (r.sibling = i),
      (t.child = r),
      (r = i),
      (i = t.child),
      (o = e.child.memoizedState),
      (o =
        o === null
          ? io(n)
          : {
              baseLanes: o.baseLanes | n,
              cachePool: null,
              transitions: o.transitions,
            }),
      (i.memoizedState = o),
      (i.childLanes = e.childLanes & ~n),
      (t.memoizedState = lo),
      r
    );
  }
  return (
    (i = e.child),
    (e = i.sibling),
    (r = St(i, { mode: "visible", children: r.children })),
    !(t.mode & 1) && (r.lanes = n),
    (r.return = t),
    (r.sibling = null),
    e !== null &&
      ((n = t.deletions),
      n === null ? ((t.deletions = [e]), (t.flags |= 16)) : n.push(e)),
    (t.child = r),
    (t.memoizedState = null),
    r
  );
}
function nu(e, t) {
  return (
    (t = Fl({ mode: "visible", children: t }, e.mode, 0, null)),
    (t.return = e),
    (e.child = t)
  );
}
function Fr(e, t, n, r) {
  return (
    r !== null && Vo(r),
    mn(t, e.child, null, n),
    (e = nu(t, t.pendingProps.children)),
    (e.flags |= 2),
    (t.memoizedState = null),
    e
  );
}
function xp(e, t, n, r, l, i, o) {
  if (n)
    return t.flags & 256
      ? ((t.flags &= -257), (r = vi(Error(k(422)))), Fr(e, t, o, r))
      : t.memoizedState !== null
        ? ((t.child = e.child), (t.flags |= 128), null)
        : ((i = r.fallback),
          (l = t.mode),
          (r = Fl({ mode: "visible", children: r.children }, l, 0, null)),
          (i = Ft(i, l, o, null)),
          (i.flags |= 2),
          (r.return = t),
          (i.return = t),
          (r.sibling = i),
          (t.child = r),
          t.mode & 1 && mn(t, e.child, null, o),
          (t.child.memoizedState = io(o)),
          (t.memoizedState = lo),
          i);
  if (!(t.mode & 1)) return Fr(e, t, o, null);
  if (l.data === "$!") {
    if (((r = l.nextSibling && l.nextSibling.dataset), r)) var u = r.dgst;
    return (
      (r = u),
      (i = Error(k(419))),
      (r = vi(i, r, void 0)),
      Fr(e, t, o, r)
    );
  }
  if (((u = (o & e.childLanes) !== 0), ve || u)) {
    if (((r = ee), r !== null)) {
      switch (o & -o) {
        case 4:
          l = 2;
          break;
        case 16:
          l = 8;
          break;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          l = 32;
          break;
        case 536870912:
          l = 268435456;
          break;
        default:
          l = 0;
      }
      ((l = l & (r.suspendedLanes | o) ? 0 : l),
        l !== 0 &&
          l !== i.retryLane &&
          ((i.retryLane = l), tt(e, l), Ae(r, e, l, -1)));
    }
    return (su(), (r = vi(Error(k(421)))), Fr(e, t, o, r));
  }
  return l.data === "$?"
    ? ((t.flags |= 128),
      (t.child = e.child),
      (t = Op.bind(null, e)),
      (l._reactRetry = t),
      null)
    : ((e = i.treeContext),
      (ke = gt(l.nextSibling)),
      (Ee = t),
      ($ = !0),
      (Fe = null),
      e !== null &&
        ((Pe[_e++] = Je),
        (Pe[_e++] = Ze),
        (Pe[_e++] = $t),
        (Je = e.id),
        (Ze = e.overflow),
        ($t = t)),
      (t = nu(t, r.children)),
      (t.flags |= 4096),
      t);
}
function ms(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  (r !== null && (r.lanes |= t), qi(e.return, t, n));
}
function gi(e, t, n, r, l) {
  var i = e.memoizedState;
  i === null
    ? (e.memoizedState = {
        isBackwards: t,
        rendering: null,
        renderingStartTime: 0,
        last: r,
        tail: n,
        tailMode: l,
      })
    : ((i.isBackwards = t),
      (i.rendering = null),
      (i.renderingStartTime = 0),
      (i.last = r),
      (i.tail = n),
      (i.tailMode = l));
}
function _c(e, t, n) {
  var r = t.pendingProps,
    l = r.revealOrder,
    i = r.tail;
  if ((ae(e, t, r.children, n), (r = B.current), r & 2))
    ((r = (r & 1) | 2), (t.flags |= 128));
  else {
    if (e !== null && e.flags & 128)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && ms(e, n, t);
        else if (e.tag === 19) ms(e, n, t);
        else if (e.child !== null) {
          ((e.child.return = e), (e = e.child));
          continue;
        }
        if (e === t) break e;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t) break e;
          e = e.return;
        }
        ((e.sibling.return = e.return), (e = e.sibling));
      }
    r &= 1;
  }
  if ((M(B, r), !(t.mode & 1))) t.memoizedState = null;
  else
    switch (l) {
      case "forwards":
        for (n = t.child, l = null; n !== null; )
          ((e = n.alternate),
            e !== null && ml(e) === null && (l = n),
            (n = n.sibling));
        ((n = l),
          n === null
            ? ((l = t.child), (t.child = null))
            : ((l = n.sibling), (n.sibling = null)),
          gi(t, !1, l, n, i));
        break;
      case "backwards":
        for (n = null, l = t.child, t.child = null; l !== null; ) {
          if (((e = l.alternate), e !== null && ml(e) === null)) {
            t.child = l;
            break;
          }
          ((e = l.sibling), (l.sibling = n), (n = l), (l = e));
        }
        gi(t, !0, n, null, i);
        break;
      case "together":
        gi(t, !1, null, null, void 0);
        break;
      default:
        t.memoizedState = null;
    }
  return t.child;
}
function Gr(e, t) {
  !(t.mode & 1) &&
    e !== null &&
    ((e.alternate = null), (t.alternate = null), (t.flags |= 2));
}
function nt(e, t, n) {
  if (
    (e !== null && (t.dependencies = e.dependencies),
    (Bt |= t.lanes),
    !(n & t.childLanes))
  )
    return null;
  if (e !== null && t.child !== e.child) throw Error(k(153));
  if (t.child !== null) {
    for (
      e = t.child, n = St(e, e.pendingProps), t.child = n, n.return = t;
      e.sibling !== null;
    )
      ((e = e.sibling),
        (n = n.sibling = St(e, e.pendingProps)),
        (n.return = t));
    n.sibling = null;
  }
  return t.child;
}
function wp(e, t, n) {
  switch (t.tag) {
    case 3:
      (Nc(t), hn());
      break;
    case 5:
      ec(t);
      break;
    case 1:
      ye(t.type) && al(t);
      break;
    case 4:
      Xo(t, t.stateNode.containerInfo);
      break;
    case 10:
      var r = t.type._context,
        l = t.memoizedProps.value;
      (M(fl, r._currentValue), (r._currentValue = l));
      break;
    case 13:
      if (((r = t.memoizedState), r !== null))
        return r.dehydrated !== null
          ? (M(B, B.current & 1), (t.flags |= 128), null)
          : n & t.child.childLanes
            ? Pc(e, t, n)
            : (M(B, B.current & 1),
              (e = nt(e, t, n)),
              e !== null ? e.sibling : null);
      M(B, B.current & 1);
      break;
    case 19:
      if (((r = (n & t.childLanes) !== 0), e.flags & 128)) {
        if (r) return _c(e, t, n);
        t.flags |= 128;
      }
      if (
        ((l = t.memoizedState),
        l !== null &&
          ((l.rendering = null), (l.tail = null), (l.lastEffect = null)),
        M(B, B.current),
        r)
      )
        break;
      return null;
    case 22:
    case 23:
      return ((t.lanes = 0), Cc(e, t, n));
  }
  return nt(e, t, n);
}
var Lc, oo, Rc, Tc;
Lc = function (e, t) {
  for (var n = t.child; n !== null; ) {
    if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode);
    else if (n.tag !== 4 && n.child !== null) {
      ((n.child.return = n), (n = n.child));
      continue;
    }
    if (n === t) break;
    for (; n.sibling === null; ) {
      if (n.return === null || n.return === t) return;
      n = n.return;
    }
    ((n.sibling.return = n.return), (n = n.sibling));
  }
};
oo = function () {};
Rc = function (e, t, n, r) {
  var l = e.memoizedProps;
  if (l !== r) {
    ((e = t.stateNode), Dt(Ke.current));
    var i = null;
    switch (n) {
      case "input":
        ((l = _i(e, l)), (r = _i(e, r)), (i = []));
        break;
      case "select":
        ((l = Q({}, l, { value: void 0 })),
          (r = Q({}, r, { value: void 0 })),
          (i = []));
        break;
      case "textarea":
        ((l = Ti(e, l)), (r = Ti(e, r)), (i = []));
        break;
      default:
        typeof l.onClick != "function" &&
          typeof r.onClick == "function" &&
          (e.onclick = ul);
    }
    zi(n, r);
    var o;
    n = null;
    for (d in l)
      if (!r.hasOwnProperty(d) && l.hasOwnProperty(d) && l[d] != null)
        if (d === "style") {
          var u = l[d];
          for (o in u) u.hasOwnProperty(o) && (n || (n = {}), (n[o] = ""));
        } else
          d !== "dangerouslySetInnerHTML" &&
            d !== "children" &&
            d !== "suppressContentEditableWarning" &&
            d !== "suppressHydrationWarning" &&
            d !== "autoFocus" &&
            (Zn.hasOwnProperty(d)
              ? i || (i = [])
              : (i = i || []).push(d, null));
    for (d in r) {
      var a = r[d];
      if (
        ((u = l != null ? l[d] : void 0),
        r.hasOwnProperty(d) && a !== u && (a != null || u != null))
      )
        if (d === "style")
          if (u) {
            for (o in u)
              !u.hasOwnProperty(o) ||
                (a && a.hasOwnProperty(o)) ||
                (n || (n = {}), (n[o] = ""));
            for (o in a)
              a.hasOwnProperty(o) &&
                u[o] !== a[o] &&
                (n || (n = {}), (n[o] = a[o]));
          } else (n || (i || (i = []), i.push(d, n)), (n = a));
        else
          d === "dangerouslySetInnerHTML"
            ? ((a = a ? a.__html : void 0),
              (u = u ? u.__html : void 0),
              a != null && u !== a && (i = i || []).push(d, a))
            : d === "children"
              ? (typeof a != "string" && typeof a != "number") ||
                (i = i || []).push(d, "" + a)
              : d !== "suppressContentEditableWarning" &&
                d !== "suppressHydrationWarning" &&
                (Zn.hasOwnProperty(d)
                  ? (a != null && d === "onScroll" && F("scroll", e),
                    i || u === a || (i = []))
                  : (i = i || []).push(d, a));
    }
    n && (i = i || []).push("style", n);
    var d = i;
    (t.updateQueue = d) && (t.flags |= 4);
  }
};
Tc = function (e, t, n, r) {
  n !== r && (t.flags |= 4);
};
function In(e, t) {
  if (!$)
    switch (e.tailMode) {
      case "hidden":
        t = e.tail;
        for (var n = null; t !== null; )
          (t.alternate !== null && (n = t), (t = t.sibling));
        n === null ? (e.tail = null) : (n.sibling = null);
        break;
      case "collapsed":
        n = e.tail;
        for (var r = null; n !== null; )
          (n.alternate !== null && (r = n), (n = n.sibling));
        r === null
          ? t || e.tail === null
            ? (e.tail = null)
            : (e.tail.sibling = null)
          : (r.sibling = null);
    }
}
function ie(e) {
  var t = e.alternate !== null && e.alternate.child === e.child,
    n = 0,
    r = 0;
  if (t)
    for (var l = e.child; l !== null; )
      ((n |= l.lanes | l.childLanes),
        (r |= l.subtreeFlags & 14680064),
        (r |= l.flags & 14680064),
        (l.return = e),
        (l = l.sibling));
  else
    for (l = e.child; l !== null; )
      ((n |= l.lanes | l.childLanes),
        (r |= l.subtreeFlags),
        (r |= l.flags),
        (l.return = e),
        (l = l.sibling));
  return ((e.subtreeFlags |= r), (e.childLanes = n), t);
}
function Sp(e, t, n) {
  var r = t.pendingProps;
  switch ((Bo(t), t.tag)) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return (ie(t), null);
    case 1:
      return (ye(t.type) && sl(), ie(t), null);
    case 3:
      return (
        (r = t.stateNode),
        vn(),
        U(ge),
        U(se),
        Jo(),
        r.pendingContext &&
          ((r.context = r.pendingContext), (r.pendingContext = null)),
        (e === null || e.child === null) &&
          (Dr(t)
            ? (t.flags |= 4)
            : e === null ||
              (e.memoizedState.isDehydrated && !(t.flags & 256)) ||
              ((t.flags |= 1024), Fe !== null && (mo(Fe), (Fe = null)))),
        oo(e, t),
        ie(t),
        null
      );
    case 5:
      Go(t);
      var l = Dt(ar.current);
      if (((n = t.type), e !== null && t.stateNode != null))
        (Rc(e, t, n, r, l),
          e.ref !== t.ref && ((t.flags |= 512), (t.flags |= 2097152)));
      else {
        if (!r) {
          if (t.stateNode === null) throw Error(k(166));
          return (ie(t), null);
        }
        if (((e = Dt(Ke.current)), Dr(t))) {
          ((r = t.stateNode), (n = t.type));
          var i = t.memoizedProps;
          switch (((r[Qe] = t), (r[ur] = i), (e = (t.mode & 1) !== 0), n)) {
            case "dialog":
              (F("cancel", r), F("close", r));
              break;
            case "iframe":
            case "object":
            case "embed":
              F("load", r);
              break;
            case "video":
            case "audio":
              for (l = 0; l < Bn.length; l++) F(Bn[l], r);
              break;
            case "source":
              F("error", r);
              break;
            case "img":
            case "image":
            case "link":
              (F("error", r), F("load", r));
              break;
            case "details":
              F("toggle", r);
              break;
            case "input":
              (Cu(r, i), F("invalid", r));
              break;
            case "select":
              ((r._wrapperState = { wasMultiple: !!i.multiple }),
                F("invalid", r));
              break;
            case "textarea":
              (Nu(r, i), F("invalid", r));
          }
          (zi(n, i), (l = null));
          for (var o in i)
            if (i.hasOwnProperty(o)) {
              var u = i[o];
              o === "children"
                ? typeof u == "string"
                  ? r.textContent !== u &&
                    (i.suppressHydrationWarning !== !0 &&
                      Ir(r.textContent, u, e),
                    (l = ["children", u]))
                  : typeof u == "number" &&
                    r.textContent !== "" + u &&
                    (i.suppressHydrationWarning !== !0 &&
                      Ir(r.textContent, u, e),
                    (l = ["children", "" + u]))
                : Zn.hasOwnProperty(o) &&
                  u != null &&
                  o === "onScroll" &&
                  F("scroll", r);
            }
          switch (n) {
            case "input":
              (Nr(r), ju(r, i, !0));
              break;
            case "textarea":
              (Nr(r), Pu(r));
              break;
            case "select":
            case "option":
              break;
            default:
              typeof i.onClick == "function" && (r.onclick = ul);
          }
          ((r = l), (t.updateQueue = r), r !== null && (t.flags |= 4));
        } else {
          ((o = l.nodeType === 9 ? l : l.ownerDocument),
            e === "http://www.w3.org/1999/xhtml" && (e = ia(n)),
            e === "http://www.w3.org/1999/xhtml"
              ? n === "script"
                ? ((e = o.createElement("div")),
                  (e.innerHTML = "<script><\/script>"),
                  (e = e.removeChild(e.firstChild)))
                : typeof r.is == "string"
                  ? (e = o.createElement(n, { is: r.is }))
                  : ((e = o.createElement(n)),
                    n === "select" &&
                      ((o = e),
                      r.multiple
                        ? (o.multiple = !0)
                        : r.size && (o.size = r.size)))
              : (e = o.createElementNS(e, n)),
            (e[Qe] = t),
            (e[ur] = r),
            Lc(e, t, !1, !1),
            (t.stateNode = e));
          e: {
            switch (((o = Ii(n, r)), n)) {
              case "dialog":
                (F("cancel", e), F("close", e), (l = r));
                break;
              case "iframe":
              case "object":
              case "embed":
                (F("load", e), (l = r));
                break;
              case "video":
              case "audio":
                for (l = 0; l < Bn.length; l++) F(Bn[l], e);
                l = r;
                break;
              case "source":
                (F("error", e), (l = r));
                break;
              case "img":
              case "image":
              case "link":
                (F("error", e), F("load", e), (l = r));
                break;
              case "details":
                (F("toggle", e), (l = r));
                break;
              case "input":
                (Cu(e, r), (l = _i(e, r)), F("invalid", e));
                break;
              case "option":
                l = r;
                break;
              case "select":
                ((e._wrapperState = { wasMultiple: !!r.multiple }),
                  (l = Q({}, r, { value: void 0 })),
                  F("invalid", e));
                break;
              case "textarea":
                (Nu(e, r), (l = Ti(e, r)), F("invalid", e));
                break;
              default:
                l = r;
            }
            (zi(n, l), (u = l));
            for (i in u)
              if (u.hasOwnProperty(i)) {
                var a = u[i];
                i === "style"
                  ? sa(e, a)
                  : i === "dangerouslySetInnerHTML"
                    ? ((a = a ? a.__html : void 0), a != null && oa(e, a))
                    : i === "children"
                      ? typeof a == "string"
                        ? (n !== "textarea" || a !== "") && qn(e, a)
                        : typeof a == "number" && qn(e, "" + a)
                      : i !== "suppressContentEditableWarning" &&
                        i !== "suppressHydrationWarning" &&
                        i !== "autoFocus" &&
                        (Zn.hasOwnProperty(i)
                          ? a != null && i === "onScroll" && F("scroll", e)
                          : a != null && No(e, i, a, o));
              }
            switch (n) {
              case "input":
                (Nr(e), ju(e, r, !1));
                break;
              case "textarea":
                (Nr(e), Pu(e));
                break;
              case "option":
                r.value != null && e.setAttribute("value", "" + Et(r.value));
                break;
              case "select":
                ((e.multiple = !!r.multiple),
                  (i = r.value),
                  i != null
                    ? on(e, !!r.multiple, i, !1)
                    : r.defaultValue != null &&
                      on(e, !!r.multiple, r.defaultValue, !0));
                break;
              default:
                typeof l.onClick == "function" && (e.onclick = ul);
            }
            switch (n) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                r = !!r.autoFocus;
                break e;
              case "img":
                r = !0;
                break e;
              default:
                r = !1;
            }
          }
          r && (t.flags |= 4);
        }
        t.ref !== null && ((t.flags |= 512), (t.flags |= 2097152));
      }
      return (ie(t), null);
    case 6:
      if (e && t.stateNode != null) Tc(e, t, e.memoizedProps, r);
      else {
        if (typeof r != "string" && t.stateNode === null) throw Error(k(166));
        if (((n = Dt(ar.current)), Dt(Ke.current), Dr(t))) {
          if (
            ((r = t.stateNode),
            (n = t.memoizedProps),
            (r[Qe] = t),
            (i = r.nodeValue !== n) && ((e = Ee), e !== null))
          )
            switch (e.tag) {
              case 3:
                Ir(r.nodeValue, n, (e.mode & 1) !== 0);
                break;
              case 5:
                e.memoizedProps.suppressHydrationWarning !== !0 &&
                  Ir(r.nodeValue, n, (e.mode & 1) !== 0);
            }
          i && (t.flags |= 4);
        } else
          ((r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r)),
            (r[Qe] = t),
            (t.stateNode = r));
      }
      return (ie(t), null);
    case 13:
      if (
        (U(B),
        (r = t.memoizedState),
        e === null ||
          (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
      ) {
        if ($ && ke !== null && t.mode & 1 && !(t.flags & 128))
          (Ga(), hn(), (t.flags |= 98560), (i = !1));
        else if (((i = Dr(t)), r !== null && r.dehydrated !== null)) {
          if (e === null) {
            if (!i) throw Error(k(318));
            if (
              ((i = t.memoizedState),
              (i = i !== null ? i.dehydrated : null),
              !i)
            )
              throw Error(k(317));
            i[Qe] = t;
          } else
            (hn(),
              !(t.flags & 128) && (t.memoizedState = null),
              (t.flags |= 4));
          (ie(t), (i = !1));
        } else (Fe !== null && (mo(Fe), (Fe = null)), (i = !0));
        if (!i) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128
        ? ((t.lanes = n), t)
        : ((r = r !== null),
          r !== (e !== null && e.memoizedState !== null) &&
            r &&
            ((t.child.flags |= 8192),
            t.mode & 1 &&
              (e === null || B.current & 1 ? Z === 0 && (Z = 3) : su())),
          t.updateQueue !== null && (t.flags |= 4),
          ie(t),
          null);
    case 4:
      return (
        vn(),
        oo(e, t),
        e === null && ir(t.stateNode.containerInfo),
        ie(t),
        null
      );
    case 10:
      return (Ho(t.type._context), ie(t), null);
    case 17:
      return (ye(t.type) && sl(), ie(t), null);
    case 19:
      if ((U(B), (i = t.memoizedState), i === null)) return (ie(t), null);
      if (((r = (t.flags & 128) !== 0), (o = i.rendering), o === null))
        if (r) In(i, !1);
        else {
          if (Z !== 0 || (e !== null && e.flags & 128))
            for (e = t.child; e !== null; ) {
              if (((o = ml(e)), o !== null)) {
                for (
                  t.flags |= 128,
                    In(i, !1),
                    r = o.updateQueue,
                    r !== null && ((t.updateQueue = r), (t.flags |= 4)),
                    t.subtreeFlags = 0,
                    r = n,
                    n = t.child;
                  n !== null;
                )
                  ((i = n),
                    (e = r),
                    (i.flags &= 14680066),
                    (o = i.alternate),
                    o === null
                      ? ((i.childLanes = 0),
                        (i.lanes = e),
                        (i.child = null),
                        (i.subtreeFlags = 0),
                        (i.memoizedProps = null),
                        (i.memoizedState = null),
                        (i.updateQueue = null),
                        (i.dependencies = null),
                        (i.stateNode = null))
                      : ((i.childLanes = o.childLanes),
                        (i.lanes = o.lanes),
                        (i.child = o.child),
                        (i.subtreeFlags = 0),
                        (i.deletions = null),
                        (i.memoizedProps = o.memoizedProps),
                        (i.memoizedState = o.memoizedState),
                        (i.updateQueue = o.updateQueue),
                        (i.type = o.type),
                        (e = o.dependencies),
                        (i.dependencies =
                          e === null
                            ? null
                            : {
                                lanes: e.lanes,
                                firstContext: e.firstContext,
                              })),
                    (n = n.sibling));
                return (M(B, (B.current & 1) | 2), t.child);
              }
              e = e.sibling;
            }
          i.tail !== null &&
            X() > yn &&
            ((t.flags |= 128), (r = !0), In(i, !1), (t.lanes = 4194304));
        }
      else {
        if (!r)
          if (((e = ml(o)), e !== null)) {
            if (
              ((t.flags |= 128),
              (r = !0),
              (n = e.updateQueue),
              n !== null && ((t.updateQueue = n), (t.flags |= 4)),
              In(i, !0),
              i.tail === null && i.tailMode === "hidden" && !o.alternate && !$)
            )
              return (ie(t), null);
          } else
            2 * X() - i.renderingStartTime > yn &&
              n !== 1073741824 &&
              ((t.flags |= 128), (r = !0), In(i, !1), (t.lanes = 4194304));
        i.isBackwards
          ? ((o.sibling = t.child), (t.child = o))
          : ((n = i.last),
            n !== null ? (n.sibling = o) : (t.child = o),
            (i.last = o));
      }
      return i.tail !== null
        ? ((t = i.tail),
          (i.rendering = t),
          (i.tail = t.sibling),
          (i.renderingStartTime = X()),
          (t.sibling = null),
          (n = B.current),
          M(B, r ? (n & 1) | 2 : n & 1),
          t)
        : (ie(t), null);
    case 22:
    case 23:
      return (
        uu(),
        (r = t.memoizedState !== null),
        e !== null && (e.memoizedState !== null) !== r && (t.flags |= 8192),
        r && t.mode & 1
          ? Se & 1073741824 && (ie(t), t.subtreeFlags & 6 && (t.flags |= 8192))
          : ie(t),
        null
      );
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(k(156, t.tag));
}
function kp(e, t) {
  switch ((Bo(t), t.tag)) {
    case 1:
      return (
        ye(t.type) && sl(),
        (e = t.flags),
        e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 3:
      return (
        vn(),
        U(ge),
        U(se),
        Jo(),
        (e = t.flags),
        e & 65536 && !(e & 128) ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 5:
      return (Go(t), null);
    case 13:
      if ((U(B), (e = t.memoizedState), e !== null && e.dehydrated !== null)) {
        if (t.alternate === null) throw Error(k(340));
        hn();
      }
      return (
        (e = t.flags),
        e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 19:
      return (U(B), null);
    case 4:
      return (vn(), null);
    case 10:
      return (Ho(t.type._context), null);
    case 22:
    case 23:
      return (uu(), null);
    case 24:
      return null;
    default:
      return null;
  }
}
var Ur = !1,
  oe = !1,
  Ep = typeof WeakSet == "function" ? WeakSet : Set,
  j = null;
function rn(e, t) {
  var n = e.ref;
  if (n !== null)
    if (typeof n == "function")
      try {
        n(null);
      } catch (r) {
        H(e, t, r);
      }
    else n.current = null;
}
function uo(e, t, n) {
  try {
    n();
  } catch (r) {
    H(e, t, r);
  }
}
var vs = !1;
function Cp(e, t) {
  if (((Qi = ll), (e = Ma()), $o(e))) {
    if ("selectionStart" in e)
      var n = { start: e.selectionStart, end: e.selectionEnd };
    else
      e: {
        n = ((n = e.ownerDocument) && n.defaultView) || window;
        var r = n.getSelection && n.getSelection();
        if (r && r.rangeCount !== 0) {
          n = r.anchorNode;
          var l = r.anchorOffset,
            i = r.focusNode;
          r = r.focusOffset;
          try {
            (n.nodeType, i.nodeType);
          } catch {
            n = null;
            break e;
          }
          var o = 0,
            u = -1,
            a = -1,
            d = 0,
            h = 0,
            m = e,
            v = null;
          t: for (;;) {
            for (
              var w;
              m !== n || (l !== 0 && m.nodeType !== 3) || (u = o + l),
                m !== i || (r !== 0 && m.nodeType !== 3) || (a = o + r),
                m.nodeType === 3 && (o += m.nodeValue.length),
                (w = m.firstChild) !== null;
            )
              ((v = m), (m = w));
            for (;;) {
              if (m === e) break t;
              if (
                (v === n && ++d === l && (u = o),
                v === i && ++h === r && (a = o),
                (w = m.nextSibling) !== null)
              )
                break;
              ((m = v), (v = m.parentNode));
            }
            m = w;
          }
          n = u === -1 || a === -1 ? null : { start: u, end: a };
        } else n = null;
      }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for (Hi = { focusedElem: e, selectionRange: n }, ll = !1, j = t; j !== null; )
    if (((t = j), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null))
      ((e.return = t), (j = e));
    else
      for (; j !== null; ) {
        t = j;
        try {
          var S = t.alternate;
          if (t.flags & 1024)
            switch (t.tag) {
              case 0:
              case 11:
              case 15:
                break;
              case 1:
                if (S !== null) {
                  var g = S.memoizedProps,
                    E = S.memoizedState,
                    c = t.stateNode,
                    f = c.getSnapshotBeforeUpdate(
                      t.elementType === t.type ? g : De(t.type, g),
                      E,
                    );
                  c.__reactInternalSnapshotBeforeUpdate = f;
                }
                break;
              case 3:
                var p = t.stateNode.containerInfo;
                p.nodeType === 1
                  ? (p.textContent = "")
                  : p.nodeType === 9 &&
                    p.documentElement &&
                    p.removeChild(p.documentElement);
                break;
              case 5:
              case 6:
              case 4:
              case 17:
                break;
              default:
                throw Error(k(163));
            }
        } catch (y) {
          H(t, t.return, y);
        }
        if (((e = t.sibling), e !== null)) {
          ((e.return = t.return), (j = e));
          break;
        }
        j = t.return;
      }
  return ((S = vs), (vs = !1), S);
}
function Xn(e, t, n) {
  var r = t.updateQueue;
  if (((r = r !== null ? r.lastEffect : null), r !== null)) {
    var l = (r = r.next);
    do {
      if ((l.tag & e) === e) {
        var i = l.destroy;
        ((l.destroy = void 0), i !== void 0 && uo(t, n, i));
      }
      l = l.next;
    } while (l !== r);
  }
}
function Dl(e, t) {
  if (
    ((t = t.updateQueue), (t = t !== null ? t.lastEffect : null), t !== null)
  ) {
    var n = (t = t.next);
    do {
      if ((n.tag & e) === e) {
        var r = n.create;
        n.destroy = r();
      }
      n = n.next;
    } while (n !== t);
  }
}
function so(e) {
  var t = e.ref;
  if (t !== null) {
    var n = e.stateNode;
    switch (e.tag) {
      case 5:
        e = n;
        break;
      default:
        e = n;
    }
    typeof t == "function" ? t(e) : (t.current = e);
  }
}
function Oc(e) {
  var t = e.alternate;
  (t !== null && ((e.alternate = null), Oc(t)),
    (e.child = null),
    (e.deletions = null),
    (e.sibling = null),
    e.tag === 5 &&
      ((t = e.stateNode),
      t !== null &&
        (delete t[Qe], delete t[ur], delete t[Xi], delete t[op], delete t[up])),
    (e.stateNode = null),
    (e.return = null),
    (e.dependencies = null),
    (e.memoizedProps = null),
    (e.memoizedState = null),
    (e.pendingProps = null),
    (e.stateNode = null),
    (e.updateQueue = null));
}
function zc(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function gs(e) {
  e: for (;;) {
    for (; e.sibling === null; ) {
      if (e.return === null || zc(e.return)) return null;
      e = e.return;
    }
    for (
      e.sibling.return = e.return, e = e.sibling;
      e.tag !== 5 && e.tag !== 6 && e.tag !== 18;
    ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
      ((e.child.return = e), (e = e.child));
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function ao(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6)
    ((e = e.stateNode),
      t
        ? n.nodeType === 8
          ? n.parentNode.insertBefore(e, t)
          : n.insertBefore(e, t)
        : (n.nodeType === 8
            ? ((t = n.parentNode), t.insertBefore(e, n))
            : ((t = n), t.appendChild(e)),
          (n = n._reactRootContainer),
          n != null || t.onclick !== null || (t.onclick = ul)));
  else if (r !== 4 && ((e = e.child), e !== null))
    for (ao(e, t, n), e = e.sibling; e !== null; )
      (ao(e, t, n), (e = e.sibling));
}
function co(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6)
    ((e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e));
  else if (r !== 4 && ((e = e.child), e !== null))
    for (co(e, t, n), e = e.sibling; e !== null; )
      (co(e, t, n), (e = e.sibling));
}
var te = null,
  Me = !1;
function it(e, t, n) {
  for (n = n.child; n !== null; ) (Ic(e, t, n), (n = n.sibling));
}
function Ic(e, t, n) {
  if (He && typeof He.onCommitFiberUnmount == "function")
    try {
      He.onCommitFiberUnmount(Pl, n);
    } catch {}
  switch (n.tag) {
    case 5:
      oe || rn(n, t);
    case 6:
      var r = te,
        l = Me;
      ((te = null),
        it(e, t, n),
        (te = r),
        (Me = l),
        te !== null &&
          (Me
            ? ((e = te),
              (n = n.stateNode),
              e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n))
            : te.removeChild(n.stateNode)));
      break;
    case 18:
      te !== null &&
        (Me
          ? ((e = te),
            (n = n.stateNode),
            e.nodeType === 8
              ? ci(e.parentNode, n)
              : e.nodeType === 1 && ci(e, n),
            nr(e))
          : ci(te, n.stateNode));
      break;
    case 4:
      ((r = te),
        (l = Me),
        (te = n.stateNode.containerInfo),
        (Me = !0),
        it(e, t, n),
        (te = r),
        (Me = l));
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (
        !oe &&
        ((r = n.updateQueue), r !== null && ((r = r.lastEffect), r !== null))
      ) {
        l = r = r.next;
        do {
          var i = l,
            o = i.destroy;
          ((i = i.tag),
            o !== void 0 && (i & 2 || i & 4) && uo(n, t, o),
            (l = l.next));
        } while (l !== r);
      }
      it(e, t, n);
      break;
    case 1:
      if (
        !oe &&
        (rn(n, t),
        (r = n.stateNode),
        typeof r.componentWillUnmount == "function")
      )
        try {
          ((r.props = n.memoizedProps),
            (r.state = n.memoizedState),
            r.componentWillUnmount());
        } catch (u) {
          H(n, t, u);
        }
      it(e, t, n);
      break;
    case 21:
      it(e, t, n);
      break;
    case 22:
      n.mode & 1
        ? ((oe = (r = oe) || n.memoizedState !== null), it(e, t, n), (oe = r))
        : it(e, t, n);
      break;
    default:
      it(e, t, n);
  }
}
function ys(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    (n === null && (n = e.stateNode = new Ep()),
      t.forEach(function (r) {
        var l = zp.bind(null, e, r);
        n.has(r) || (n.add(r), r.then(l, l));
      }));
  }
}
function Ie(e, t) {
  var n = t.deletions;
  if (n !== null)
    for (var r = 0; r < n.length; r++) {
      var l = n[r];
      try {
        var i = e,
          o = t,
          u = o;
        e: for (; u !== null; ) {
          switch (u.tag) {
            case 5:
              ((te = u.stateNode), (Me = !1));
              break e;
            case 3:
              ((te = u.stateNode.containerInfo), (Me = !0));
              break e;
            case 4:
              ((te = u.stateNode.containerInfo), (Me = !0));
              break e;
          }
          u = u.return;
        }
        if (te === null) throw Error(k(160));
        (Ic(i, o, l), (te = null), (Me = !1));
        var a = l.alternate;
        (a !== null && (a.return = null), (l.return = null));
      } catch (d) {
        H(l, t, d);
      }
    }
  if (t.subtreeFlags & 12854)
    for (t = t.child; t !== null; ) (Dc(t, e), (t = t.sibling));
}
function Dc(e, t) {
  var n = e.alternate,
    r = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if ((Ie(t, e), Ve(e), r & 4)) {
        try {
          (Xn(3, e, e.return), Dl(3, e));
        } catch (g) {
          H(e, e.return, g);
        }
        try {
          Xn(5, e, e.return);
        } catch (g) {
          H(e, e.return, g);
        }
      }
      break;
    case 1:
      (Ie(t, e), Ve(e), r & 512 && n !== null && rn(n, n.return));
      break;
    case 5:
      if (
        (Ie(t, e),
        Ve(e),
        r & 512 && n !== null && rn(n, n.return),
        e.flags & 32)
      ) {
        var l = e.stateNode;
        try {
          qn(l, "");
        } catch (g) {
          H(e, e.return, g);
        }
      }
      if (r & 4 && ((l = e.stateNode), l != null)) {
        var i = e.memoizedProps,
          o = n !== null ? n.memoizedProps : i,
          u = e.type,
          a = e.updateQueue;
        if (((e.updateQueue = null), a !== null))
          try {
            (u === "input" && i.type === "radio" && i.name != null && ra(l, i),
              Ii(u, o));
            var d = Ii(u, i);
            for (o = 0; o < a.length; o += 2) {
              var h = a[o],
                m = a[o + 1];
              h === "style"
                ? sa(l, m)
                : h === "dangerouslySetInnerHTML"
                  ? oa(l, m)
                  : h === "children"
                    ? qn(l, m)
                    : No(l, h, m, d);
            }
            switch (u) {
              case "input":
                Li(l, i);
                break;
              case "textarea":
                la(l, i);
                break;
              case "select":
                var v = l._wrapperState.wasMultiple;
                l._wrapperState.wasMultiple = !!i.multiple;
                var w = i.value;
                w != null
                  ? on(l, !!i.multiple, w, !1)
                  : v !== !!i.multiple &&
                    (i.defaultValue != null
                      ? on(l, !!i.multiple, i.defaultValue, !0)
                      : on(l, !!i.multiple, i.multiple ? [] : "", !1));
            }
            l[ur] = i;
          } catch (g) {
            H(e, e.return, g);
          }
      }
      break;
    case 6:
      if ((Ie(t, e), Ve(e), r & 4)) {
        if (e.stateNode === null) throw Error(k(162));
        ((l = e.stateNode), (i = e.memoizedProps));
        try {
          l.nodeValue = i;
        } catch (g) {
          H(e, e.return, g);
        }
      }
      break;
    case 3:
      if (
        (Ie(t, e), Ve(e), r & 4 && n !== null && n.memoizedState.isDehydrated)
      )
        try {
          nr(t.containerInfo);
        } catch (g) {
          H(e, e.return, g);
        }
      break;
    case 4:
      (Ie(t, e), Ve(e));
      break;
    case 13:
      (Ie(t, e),
        Ve(e),
        (l = e.child),
        l.flags & 8192 &&
          ((i = l.memoizedState !== null),
          (l.stateNode.isHidden = i),
          !i ||
            (l.alternate !== null && l.alternate.memoizedState !== null) ||
            (iu = X())),
        r & 4 && ys(e));
      break;
    case 22:
      if (
        ((h = n !== null && n.memoizedState !== null),
        e.mode & 1 ? ((oe = (d = oe) || h), Ie(t, e), (oe = d)) : Ie(t, e),
        Ve(e),
        r & 8192)
      ) {
        if (
          ((d = e.memoizedState !== null),
          (e.stateNode.isHidden = d) && !h && e.mode & 1)
        )
          for (j = e, h = e.child; h !== null; ) {
            for (m = j = h; j !== null; ) {
              switch (((v = j), (w = v.child), v.tag)) {
                case 0:
                case 11:
                case 14:
                case 15:
                  Xn(4, v, v.return);
                  break;
                case 1:
                  rn(v, v.return);
                  var S = v.stateNode;
                  if (typeof S.componentWillUnmount == "function") {
                    ((r = v), (n = v.return));
                    try {
                      ((t = r),
                        (S.props = t.memoizedProps),
                        (S.state = t.memoizedState),
                        S.componentWillUnmount());
                    } catch (g) {
                      H(r, n, g);
                    }
                  }
                  break;
                case 5:
                  rn(v, v.return);
                  break;
                case 22:
                  if (v.memoizedState !== null) {
                    ws(m);
                    continue;
                  }
              }
              w !== null ? ((w.return = v), (j = w)) : ws(m);
            }
            h = h.sibling;
          }
        e: for (h = null, m = e; ; ) {
          if (m.tag === 5) {
            if (h === null) {
              h = m;
              try {
                ((l = m.stateNode),
                  d
                    ? ((i = l.style),
                      typeof i.setProperty == "function"
                        ? i.setProperty("display", "none", "important")
                        : (i.display = "none"))
                    : ((u = m.stateNode),
                      (a = m.memoizedProps.style),
                      (o =
                        a != null && a.hasOwnProperty("display")
                          ? a.display
                          : null),
                      (u.style.display = ua("display", o))));
              } catch (g) {
                H(e, e.return, g);
              }
            }
          } else if (m.tag === 6) {
            if (h === null)
              try {
                m.stateNode.nodeValue = d ? "" : m.memoizedProps;
              } catch (g) {
                H(e, e.return, g);
              }
          } else if (
            ((m.tag !== 22 && m.tag !== 23) ||
              m.memoizedState === null ||
              m === e) &&
            m.child !== null
          ) {
            ((m.child.return = m), (m = m.child));
            continue;
          }
          if (m === e) break e;
          for (; m.sibling === null; ) {
            if (m.return === null || m.return === e) break e;
            (h === m && (h = null), (m = m.return));
          }
          (h === m && (h = null),
            (m.sibling.return = m.return),
            (m = m.sibling));
        }
      }
      break;
    case 19:
      (Ie(t, e), Ve(e), r & 4 && ys(e));
      break;
    case 21:
      break;
    default:
      (Ie(t, e), Ve(e));
  }
}
function Ve(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      e: {
        for (var n = e.return; n !== null; ) {
          if (zc(n)) {
            var r = n;
            break e;
          }
          n = n.return;
        }
        throw Error(k(160));
      }
      switch (r.tag) {
        case 5:
          var l = r.stateNode;
          r.flags & 32 && (qn(l, ""), (r.flags &= -33));
          var i = gs(e);
          co(e, i, l);
          break;
        case 3:
        case 4:
          var o = r.stateNode.containerInfo,
            u = gs(e);
          ao(e, u, o);
          break;
        default:
          throw Error(k(161));
      }
    } catch (a) {
      H(e, e.return, a);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function jp(e, t, n) {
  ((j = e), Mc(e));
}
function Mc(e, t, n) {
  for (var r = (e.mode & 1) !== 0; j !== null; ) {
    var l = j,
      i = l.child;
    if (l.tag === 22 && r) {
      var o = l.memoizedState !== null || Ur;
      if (!o) {
        var u = l.alternate,
          a = (u !== null && u.memoizedState !== null) || oe;
        u = Ur;
        var d = oe;
        if (((Ur = o), (oe = a) && !d))
          for (j = l; j !== null; )
            ((o = j),
              (a = o.child),
              o.tag === 22 && o.memoizedState !== null
                ? Ss(l)
                : a !== null
                  ? ((a.return = o), (j = a))
                  : Ss(l));
        for (; i !== null; ) ((j = i), Mc(i), (i = i.sibling));
        ((j = l), (Ur = u), (oe = d));
      }
      xs(e);
    } else
      l.subtreeFlags & 8772 && i !== null ? ((i.return = l), (j = i)) : xs(e);
  }
}
function xs(e) {
  for (; j !== null; ) {
    var t = j;
    if (t.flags & 8772) {
      var n = t.alternate;
      try {
        if (t.flags & 8772)
          switch (t.tag) {
            case 0:
            case 11:
            case 15:
              oe || Dl(5, t);
              break;
            case 1:
              var r = t.stateNode;
              if (t.flags & 4 && !oe)
                if (n === null) r.componentDidMount();
                else {
                  var l =
                    t.elementType === t.type
                      ? n.memoizedProps
                      : De(t.type, n.memoizedProps);
                  r.componentDidUpdate(
                    l,
                    n.memoizedState,
                    r.__reactInternalSnapshotBeforeUpdate,
                  );
                }
              var i = t.updateQueue;
              i !== null && rs(t, i, r);
              break;
            case 3:
              var o = t.updateQueue;
              if (o !== null) {
                if (((n = null), t.child !== null))
                  switch (t.child.tag) {
                    case 5:
                      n = t.child.stateNode;
                      break;
                    case 1:
                      n = t.child.stateNode;
                  }
                rs(t, o, n);
              }
              break;
            case 5:
              var u = t.stateNode;
              if (n === null && t.flags & 4) {
                n = u;
                var a = t.memoizedProps;
                switch (t.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    a.autoFocus && n.focus();
                    break;
                  case "img":
                    a.src && (n.src = a.src);
                }
              }
              break;
            case 6:
              break;
            case 4:
              break;
            case 12:
              break;
            case 13:
              if (t.memoizedState === null) {
                var d = t.alternate;
                if (d !== null) {
                  var h = d.memoizedState;
                  if (h !== null) {
                    var m = h.dehydrated;
                    m !== null && nr(m);
                  }
                }
              }
              break;
            case 19:
            case 17:
            case 21:
            case 22:
            case 23:
            case 25:
              break;
            default:
              throw Error(k(163));
          }
        oe || (t.flags & 512 && so(t));
      } catch (v) {
        H(t, t.return, v);
      }
    }
    if (t === e) {
      j = null;
      break;
    }
    if (((n = t.sibling), n !== null)) {
      ((n.return = t.return), (j = n));
      break;
    }
    j = t.return;
  }
}
function ws(e) {
  for (; j !== null; ) {
    var t = j;
    if (t === e) {
      j = null;
      break;
    }
    var n = t.sibling;
    if (n !== null) {
      ((n.return = t.return), (j = n));
      break;
    }
    j = t.return;
  }
}
function Ss(e) {
  for (; j !== null; ) {
    var t = j;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            Dl(4, t);
          } catch (a) {
            H(t, n, a);
          }
          break;
        case 1:
          var r = t.stateNode;
          if (typeof r.componentDidMount == "function") {
            var l = t.return;
            try {
              r.componentDidMount();
            } catch (a) {
              H(t, l, a);
            }
          }
          var i = t.return;
          try {
            so(t);
          } catch (a) {
            H(t, i, a);
          }
          break;
        case 5:
          var o = t.return;
          try {
            so(t);
          } catch (a) {
            H(t, o, a);
          }
      }
    } catch (a) {
      H(t, t.return, a);
    }
    if (t === e) {
      j = null;
      break;
    }
    var u = t.sibling;
    if (u !== null) {
      ((u.return = t.return), (j = u));
      break;
    }
    j = t.return;
  }
}
var Np = Math.ceil,
  yl = rt.ReactCurrentDispatcher,
  ru = rt.ReactCurrentOwner,
  Re = rt.ReactCurrentBatchConfig,
  I = 0,
  ee = null,
  G = null,
  ne = 0,
  Se = 0,
  ln = Nt(0),
  Z = 0,
  pr = null,
  Bt = 0,
  Ml = 0,
  lu = 0,
  Gn = null,
  he = null,
  iu = 0,
  yn = 1 / 0,
  Xe = null,
  xl = !1,
  fo = null,
  xt = null,
  $r = !1,
  dt = null,
  wl = 0,
  Jn = 0,
  po = null,
  Jr = -1,
  Zr = 0;
function ce() {
  return I & 6 ? X() : Jr !== -1 ? Jr : (Jr = X());
}
function wt(e) {
  return e.mode & 1
    ? I & 2 && ne !== 0
      ? ne & -ne
      : ap.transition !== null
        ? (Zr === 0 && (Zr = wa()), Zr)
        : ((e = D),
          e !== 0 || ((e = window.event), (e = e === void 0 ? 16 : Pa(e.type))),
          e)
    : 1;
}
function Ae(e, t, n, r) {
  if (50 < Jn) throw ((Jn = 0), (po = null), Error(k(185)));
  (gr(e, n, r),
    (!(I & 2) || e !== ee) &&
      (e === ee && (!(I & 2) && (Ml |= n), Z === 4 && at(e, ne)),
      xe(e, r),
      n === 1 && I === 0 && !(t.mode & 1) && ((yn = X() + 500), Ol && Pt())));
}
function xe(e, t) {
  var n = e.callbackNode;
  af(e, t);
  var r = rl(e, e === ee ? ne : 0);
  if (r === 0)
    (n !== null && Ru(n), (e.callbackNode = null), (e.callbackPriority = 0));
  else if (((t = r & -r), e.callbackPriority !== t)) {
    if ((n != null && Ru(n), t === 1))
      (e.tag === 0 ? sp(ks.bind(null, e)) : Ka(ks.bind(null, e)),
        lp(function () {
          !(I & 6) && Pt();
        }),
        (n = null));
    else {
      switch (Sa(r)) {
        case 1:
          n = To;
          break;
        case 4:
          n = ya;
          break;
        case 16:
          n = nl;
          break;
        case 536870912:
          n = xa;
          break;
        default:
          n = nl;
      }
      n = Qc(n, Fc.bind(null, e));
    }
    ((e.callbackPriority = t), (e.callbackNode = n));
  }
}
function Fc(e, t) {
  if (((Jr = -1), (Zr = 0), I & 6)) throw Error(k(327));
  var n = e.callbackNode;
  if (dn() && e.callbackNode !== n) return null;
  var r = rl(e, e === ee ? ne : 0);
  if (r === 0) return null;
  if (r & 30 || r & e.expiredLanes || t) t = Sl(e, r);
  else {
    t = r;
    var l = I;
    I |= 2;
    var i = $c();
    (ee !== e || ne !== t) && ((Xe = null), (yn = X() + 500), Mt(e, t));
    do
      try {
        Lp();
        break;
      } catch (u) {
        Uc(e, u);
      }
    while (!0);
    (Qo(),
      (yl.current = i),
      (I = l),
      G !== null ? (t = 0) : ((ee = null), (ne = 0), (t = Z)));
  }
  if (t !== 0) {
    if (
      (t === 2 && ((l = $i(e)), l !== 0 && ((r = l), (t = ho(e, l)))), t === 1)
    )
      throw ((n = pr), Mt(e, 0), at(e, r), xe(e, X()), n);
    if (t === 6) at(e, r);
    else {
      if (
        ((l = e.current.alternate),
        !(r & 30) &&
          !Pp(l) &&
          ((t = Sl(e, r)),
          t === 2 && ((i = $i(e)), i !== 0 && ((r = i), (t = ho(e, i)))),
          t === 1))
      )
        throw ((n = pr), Mt(e, 0), at(e, r), xe(e, X()), n);
      switch (((e.finishedWork = l), (e.finishedLanes = r), t)) {
        case 0:
        case 1:
          throw Error(k(345));
        case 2:
          Ot(e, he, Xe);
          break;
        case 3:
          if (
            (at(e, r), (r & 130023424) === r && ((t = iu + 500 - X()), 10 < t))
          ) {
            if (rl(e, 0) !== 0) break;
            if (((l = e.suspendedLanes), (l & r) !== r)) {
              (ce(), (e.pingedLanes |= e.suspendedLanes & l));
              break;
            }
            e.timeoutHandle = Yi(Ot.bind(null, e, he, Xe), t);
            break;
          }
          Ot(e, he, Xe);
          break;
        case 4:
          if ((at(e, r), (r & 4194240) === r)) break;
          for (t = e.eventTimes, l = -1; 0 < r; ) {
            var o = 31 - $e(r);
            ((i = 1 << o), (o = t[o]), o > l && (l = o), (r &= ~i));
          }
          if (
            ((r = l),
            (r = X() - r),
            (r =
              (120 > r
                ? 120
                : 480 > r
                  ? 480
                  : 1080 > r
                    ? 1080
                    : 1920 > r
                      ? 1920
                      : 3e3 > r
                        ? 3e3
                        : 4320 > r
                          ? 4320
                          : 1960 * Np(r / 1960)) - r),
            10 < r)
          ) {
            e.timeoutHandle = Yi(Ot.bind(null, e, he, Xe), r);
            break;
          }
          Ot(e, he, Xe);
          break;
        case 5:
          Ot(e, he, Xe);
          break;
        default:
          throw Error(k(329));
      }
    }
  }
  return (xe(e, X()), e.callbackNode === n ? Fc.bind(null, e) : null);
}
function ho(e, t) {
  var n = Gn;
  return (
    e.current.memoizedState.isDehydrated && (Mt(e, t).flags |= 256),
    (e = Sl(e, t)),
    e !== 2 && ((t = he), (he = n), t !== null && mo(t)),
    e
  );
}
function mo(e) {
  he === null ? (he = e) : he.push.apply(he, e);
}
function Pp(e) {
  for (var t = e; ; ) {
    if (t.flags & 16384) {
      var n = t.updateQueue;
      if (n !== null && ((n = n.stores), n !== null))
        for (var r = 0; r < n.length; r++) {
          var l = n[r],
            i = l.getSnapshot;
          l = l.value;
          try {
            if (!Be(i(), l)) return !1;
          } catch {
            return !1;
          }
        }
    }
    if (((n = t.child), t.subtreeFlags & 16384 && n !== null))
      ((n.return = t), (t = n));
    else {
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return !0;
        t = t.return;
      }
      ((t.sibling.return = t.return), (t = t.sibling));
    }
  }
  return !0;
}
function at(e, t) {
  for (
    t &= ~lu,
      t &= ~Ml,
      e.suspendedLanes |= t,
      e.pingedLanes &= ~t,
      e = e.expirationTimes;
    0 < t;
  ) {
    var n = 31 - $e(t),
      r = 1 << n;
    ((e[n] = -1), (t &= ~r));
  }
}
function ks(e) {
  if (I & 6) throw Error(k(327));
  dn();
  var t = rl(e, 0);
  if (!(t & 1)) return (xe(e, X()), null);
  var n = Sl(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = $i(e);
    r !== 0 && ((t = r), (n = ho(e, r)));
  }
  if (n === 1) throw ((n = pr), Mt(e, 0), at(e, t), xe(e, X()), n);
  if (n === 6) throw Error(k(345));
  return (
    (e.finishedWork = e.current.alternate),
    (e.finishedLanes = t),
    Ot(e, he, Xe),
    xe(e, X()),
    null
  );
}
function ou(e, t) {
  var n = I;
  I |= 1;
  try {
    return e(t);
  } finally {
    ((I = n), I === 0 && ((yn = X() + 500), Ol && Pt()));
  }
}
function Vt(e) {
  dt !== null && dt.tag === 0 && !(I & 6) && dn();
  var t = I;
  I |= 1;
  var n = Re.transition,
    r = D;
  try {
    if (((Re.transition = null), (D = 1), e)) return e();
  } finally {
    ((D = r), (Re.transition = n), (I = t), !(I & 6) && Pt());
  }
}
function uu() {
  ((Se = ln.current), U(ln));
}
function Mt(e, t) {
  ((e.finishedWork = null), (e.finishedLanes = 0));
  var n = e.timeoutHandle;
  if ((n !== -1 && ((e.timeoutHandle = -1), rp(n)), G !== null))
    for (n = G.return; n !== null; ) {
      var r = n;
      switch ((Bo(r), r.tag)) {
        case 1:
          ((r = r.type.childContextTypes), r != null && sl());
          break;
        case 3:
          (vn(), U(ge), U(se), Jo());
          break;
        case 5:
          Go(r);
          break;
        case 4:
          vn();
          break;
        case 13:
          U(B);
          break;
        case 19:
          U(B);
          break;
        case 10:
          Ho(r.type._context);
          break;
        case 22:
        case 23:
          uu();
      }
      n = n.return;
    }
  if (
    ((ee = e),
    (G = e = St(e.current, null)),
    (ne = Se = t),
    (Z = 0),
    (pr = null),
    (lu = Ml = Bt = 0),
    (he = Gn = null),
    It !== null)
  ) {
    for (t = 0; t < It.length; t++)
      if (((n = It[t]), (r = n.interleaved), r !== null)) {
        n.interleaved = null;
        var l = r.next,
          i = n.pending;
        if (i !== null) {
          var o = i.next;
          ((i.next = l), (r.next = o));
        }
        n.pending = r;
      }
    It = null;
  }
  return e;
}
function Uc(e, t) {
  do {
    var n = G;
    try {
      if ((Qo(), (Yr.current = gl), vl)) {
        for (var r = V.memoizedState; r !== null; ) {
          var l = r.queue;
          (l !== null && (l.pending = null), (r = r.next));
        }
        vl = !1;
      }
      if (
        ((At = 0),
        (b = J = V = null),
        (Yn = !1),
        (cr = 0),
        (ru.current = null),
        n === null || n.return === null)
      ) {
        ((Z = 1), (pr = t), (G = null));
        break;
      }
      e: {
        var i = e,
          o = n.return,
          u = n,
          a = t;
        if (
          ((t = ne),
          (u.flags |= 32768),
          a !== null && typeof a == "object" && typeof a.then == "function")
        ) {
          var d = a,
            h = u,
            m = h.tag;
          if (!(h.mode & 1) && (m === 0 || m === 11 || m === 15)) {
            var v = h.alternate;
            v
              ? ((h.updateQueue = v.updateQueue),
                (h.memoizedState = v.memoizedState),
                (h.lanes = v.lanes))
              : ((h.updateQueue = null), (h.memoizedState = null));
          }
          var w = as(o);
          if (w !== null) {
            ((w.flags &= -257),
              cs(w, o, u, i, t),
              w.mode & 1 && ss(i, d, t),
              (t = w),
              (a = d));
            var S = t.updateQueue;
            if (S === null) {
              var g = new Set();
              (g.add(a), (t.updateQueue = g));
            } else S.add(a);
            break e;
          } else {
            if (!(t & 1)) {
              (ss(i, d, t), su());
              break e;
            }
            a = Error(k(426));
          }
        } else if ($ && u.mode & 1) {
          var E = as(o);
          if (E !== null) {
            (!(E.flags & 65536) && (E.flags |= 256),
              cs(E, o, u, i, t),
              Vo(gn(a, u)));
            break e;
          }
        }
        ((i = a = gn(a, u)),
          Z !== 4 && (Z = 2),
          Gn === null ? (Gn = [i]) : Gn.push(i),
          (i = o));
        do {
          switch (i.tag) {
            case 3:
              ((i.flags |= 65536), (t &= -t), (i.lanes |= t));
              var c = Sc(i, a, t);
              ns(i, c);
              break e;
            case 1:
              u = a;
              var f = i.type,
                p = i.stateNode;
              if (
                !(i.flags & 128) &&
                (typeof f.getDerivedStateFromError == "function" ||
                  (p !== null &&
                    typeof p.componentDidCatch == "function" &&
                    (xt === null || !xt.has(p))))
              ) {
                ((i.flags |= 65536), (t &= -t), (i.lanes |= t));
                var y = kc(i, u, t);
                ns(i, y);
                break e;
              }
          }
          i = i.return;
        } while (i !== null);
      }
      Bc(n);
    } catch (C) {
      ((t = C), G === n && n !== null && (G = n = n.return));
      continue;
    }
    break;
  } while (!0);
}
function $c() {
  var e = yl.current;
  return ((yl.current = gl), e === null ? gl : e);
}
function su() {
  ((Z === 0 || Z === 3 || Z === 2) && (Z = 4),
    ee === null || (!(Bt & 268435455) && !(Ml & 268435455)) || at(ee, ne));
}
function Sl(e, t) {
  var n = I;
  I |= 2;
  var r = $c();
  (ee !== e || ne !== t) && ((Xe = null), Mt(e, t));
  do
    try {
      _p();
      break;
    } catch (l) {
      Uc(e, l);
    }
  while (!0);
  if ((Qo(), (I = n), (yl.current = r), G !== null)) throw Error(k(261));
  return ((ee = null), (ne = 0), Z);
}
function _p() {
  for (; G !== null; ) Ac(G);
}
function Lp() {
  for (; G !== null && !bd(); ) Ac(G);
}
function Ac(e) {
  var t = Wc(e.alternate, e, Se);
  ((e.memoizedProps = e.pendingProps),
    t === null ? Bc(e) : (G = t),
    (ru.current = null));
}
function Bc(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (((e = t.return), t.flags & 32768)) {
      if (((n = kp(n, t)), n !== null)) {
        ((n.flags &= 32767), (G = n));
        return;
      }
      if (e !== null)
        ((e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null));
      else {
        ((Z = 6), (G = null));
        return;
      }
    } else if (((n = Sp(n, t, Se)), n !== null)) {
      G = n;
      return;
    }
    if (((t = t.sibling), t !== null)) {
      G = t;
      return;
    }
    G = t = e;
  } while (t !== null);
  Z === 0 && (Z = 5);
}
function Ot(e, t, n) {
  var r = D,
    l = Re.transition;
  try {
    ((Re.transition = null), (D = 1), Rp(e, t, n, r));
  } finally {
    ((Re.transition = l), (D = r));
  }
  return null;
}
function Rp(e, t, n, r) {
  do dn();
  while (dt !== null);
  if (I & 6) throw Error(k(327));
  n = e.finishedWork;
  var l = e.finishedLanes;
  if (n === null) return null;
  if (((e.finishedWork = null), (e.finishedLanes = 0), n === e.current))
    throw Error(k(177));
  ((e.callbackNode = null), (e.callbackPriority = 0));
  var i = n.lanes | n.childLanes;
  if (
    (cf(e, i),
    e === ee && ((G = ee = null), (ne = 0)),
    (!(n.subtreeFlags & 2064) && !(n.flags & 2064)) ||
      $r ||
      (($r = !0),
      Qc(nl, function () {
        return (dn(), null);
      })),
    (i = (n.flags & 15990) !== 0),
    n.subtreeFlags & 15990 || i)
  ) {
    ((i = Re.transition), (Re.transition = null));
    var o = D;
    D = 1;
    var u = I;
    ((I |= 4),
      (ru.current = null),
      Cp(e, n),
      Dc(n, e),
      Jf(Hi),
      (ll = !!Qi),
      (Hi = Qi = null),
      (e.current = n),
      jp(n),
      ef(),
      (I = u),
      (D = o),
      (Re.transition = i));
  } else e.current = n;
  if (
    ($r && (($r = !1), (dt = e), (wl = l)),
    (i = e.pendingLanes),
    i === 0 && (xt = null),
    rf(n.stateNode),
    xe(e, X()),
    t !== null)
  )
    for (r = e.onRecoverableError, n = 0; n < t.length; n++)
      ((l = t[n]), r(l.value, { componentStack: l.stack, digest: l.digest }));
  if (xl) throw ((xl = !1), (e = fo), (fo = null), e);
  return (
    wl & 1 && e.tag !== 0 && dn(),
    (i = e.pendingLanes),
    i & 1 ? (e === po ? Jn++ : ((Jn = 0), (po = e))) : (Jn = 0),
    Pt(),
    null
  );
}
function dn() {
  if (dt !== null) {
    var e = Sa(wl),
      t = Re.transition,
      n = D;
    try {
      if (((Re.transition = null), (D = 16 > e ? 16 : e), dt === null))
        var r = !1;
      else {
        if (((e = dt), (dt = null), (wl = 0), I & 6)) throw Error(k(331));
        var l = I;
        for (I |= 4, j = e.current; j !== null; ) {
          var i = j,
            o = i.child;
          if (j.flags & 16) {
            var u = i.deletions;
            if (u !== null) {
              for (var a = 0; a < u.length; a++) {
                var d = u[a];
                for (j = d; j !== null; ) {
                  var h = j;
                  switch (h.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Xn(8, h, i);
                  }
                  var m = h.child;
                  if (m !== null) ((m.return = h), (j = m));
                  else
                    for (; j !== null; ) {
                      h = j;
                      var v = h.sibling,
                        w = h.return;
                      if ((Oc(h), h === d)) {
                        j = null;
                        break;
                      }
                      if (v !== null) {
                        ((v.return = w), (j = v));
                        break;
                      }
                      j = w;
                    }
                }
              }
              var S = i.alternate;
              if (S !== null) {
                var g = S.child;
                if (g !== null) {
                  S.child = null;
                  do {
                    var E = g.sibling;
                    ((g.sibling = null), (g = E));
                  } while (g !== null);
                }
              }
              j = i;
            }
          }
          if (i.subtreeFlags & 2064 && o !== null) ((o.return = i), (j = o));
          else
            e: for (; j !== null; ) {
              if (((i = j), i.flags & 2048))
                switch (i.tag) {
                  case 0:
                  case 11:
                  case 15:
                    Xn(9, i, i.return);
                }
              var c = i.sibling;
              if (c !== null) {
                ((c.return = i.return), (j = c));
                break e;
              }
              j = i.return;
            }
        }
        var f = e.current;
        for (j = f; j !== null; ) {
          o = j;
          var p = o.child;
          if (o.subtreeFlags & 2064 && p !== null) ((p.return = o), (j = p));
          else
            e: for (o = f; j !== null; ) {
              if (((u = j), u.flags & 2048))
                try {
                  switch (u.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Dl(9, u);
                  }
                } catch (C) {
                  H(u, u.return, C);
                }
              if (u === o) {
                j = null;
                break e;
              }
              var y = u.sibling;
              if (y !== null) {
                ((y.return = u.return), (j = y));
                break e;
              }
              j = u.return;
            }
        }
        if (
          ((I = l), Pt(), He && typeof He.onPostCommitFiberRoot == "function")
        )
          try {
            He.onPostCommitFiberRoot(Pl, e);
          } catch {}
        r = !0;
      }
      return r;
    } finally {
      ((D = n), (Re.transition = t));
    }
  }
  return !1;
}
function Es(e, t, n) {
  ((t = gn(n, t)),
    (t = Sc(e, t, 1)),
    (e = yt(e, t, 1)),
    (t = ce()),
    e !== null && (gr(e, 1, t), xe(e, t)));
}
function H(e, t, n) {
  if (e.tag === 3) Es(e, e, n);
  else
    for (; t !== null; ) {
      if (t.tag === 3) {
        Es(t, e, n);
        break;
      } else if (t.tag === 1) {
        var r = t.stateNode;
        if (
          typeof t.type.getDerivedStateFromError == "function" ||
          (typeof r.componentDidCatch == "function" &&
            (xt === null || !xt.has(r)))
        ) {
          ((e = gn(n, e)),
            (e = kc(t, e, 1)),
            (t = yt(t, e, 1)),
            (e = ce()),
            t !== null && (gr(t, 1, e), xe(t, e)));
          break;
        }
      }
      t = t.return;
    }
}
function Tp(e, t, n) {
  var r = e.pingCache;
  (r !== null && r.delete(t),
    (t = ce()),
    (e.pingedLanes |= e.suspendedLanes & n),
    ee === e &&
      (ne & n) === n &&
      (Z === 4 || (Z === 3 && (ne & 130023424) === ne && 500 > X() - iu)
        ? Mt(e, 0)
        : (lu |= n)),
    xe(e, t));
}
function Vc(e, t) {
  t === 0 &&
    (e.mode & 1
      ? ((t = Lr), (Lr <<= 1), !(Lr & 130023424) && (Lr = 4194304))
      : (t = 1));
  var n = ce();
  ((e = tt(e, t)), e !== null && (gr(e, t, n), xe(e, n)));
}
function Op(e) {
  var t = e.memoizedState,
    n = 0;
  (t !== null && (n = t.retryLane), Vc(e, n));
}
function zp(e, t) {
  var n = 0;
  switch (e.tag) {
    case 13:
      var r = e.stateNode,
        l = e.memoizedState;
      l !== null && (n = l.retryLane);
      break;
    case 19:
      r = e.stateNode;
      break;
    default:
      throw Error(k(314));
  }
  (r !== null && r.delete(t), Vc(e, n));
}
var Wc;
Wc = function (e, t, n) {
  if (e !== null)
    if (e.memoizedProps !== t.pendingProps || ge.current) ve = !0;
    else {
      if (!(e.lanes & n) && !(t.flags & 128)) return ((ve = !1), wp(e, t, n));
      ve = !!(e.flags & 131072);
    }
  else ((ve = !1), $ && t.flags & 1048576 && Ya(t, dl, t.index));
  switch (((t.lanes = 0), t.tag)) {
    case 2:
      var r = t.type;
      (Gr(e, t), (e = t.pendingProps));
      var l = pn(t, se.current);
      (cn(t, n), (l = qo(null, t, r, e, l, n)));
      var i = bo();
      return (
        (t.flags |= 1),
        typeof l == "object" &&
        l !== null &&
        typeof l.render == "function" &&
        l.$$typeof === void 0
          ? ((t.tag = 1),
            (t.memoizedState = null),
            (t.updateQueue = null),
            ye(r) ? ((i = !0), al(t)) : (i = !1),
            (t.memoizedState =
              l.state !== null && l.state !== void 0 ? l.state : null),
            Yo(t),
            (l.updater = Il),
            (t.stateNode = l),
            (l._reactInternals = t),
            eo(t, r, e, n),
            (t = ro(null, t, r, !0, i, n)))
          : ((t.tag = 0), $ && i && Ao(t), ae(null, t, l, n), (t = t.child)),
        t
      );
    case 16:
      r = t.elementType;
      e: {
        switch (
          (Gr(e, t),
          (e = t.pendingProps),
          (l = r._init),
          (r = l(r._payload)),
          (t.type = r),
          (l = t.tag = Dp(r)),
          (e = De(r, e)),
          l)
        ) {
          case 0:
            t = no(null, t, r, e, n);
            break e;
          case 1:
            t = ps(null, t, r, e, n);
            break e;
          case 11:
            t = ds(null, t, r, e, n);
            break e;
          case 14:
            t = fs(null, t, r, De(r.type, e), n);
            break e;
        }
        throw Error(k(306, r, ""));
      }
      return t;
    case 0:
      return (
        (r = t.type),
        (l = t.pendingProps),
        (l = t.elementType === r ? l : De(r, l)),
        no(e, t, r, l, n)
      );
    case 1:
      return (
        (r = t.type),
        (l = t.pendingProps),
        (l = t.elementType === r ? l : De(r, l)),
        ps(e, t, r, l, n)
      );
    case 3:
      e: {
        if ((Nc(t), e === null)) throw Error(k(387));
        ((r = t.pendingProps),
          (i = t.memoizedState),
          (l = i.element),
          ba(e, t),
          hl(t, r, null, n));
        var o = t.memoizedState;
        if (((r = o.element), i.isDehydrated))
          if (
            ((i = {
              element: r,
              isDehydrated: !1,
              cache: o.cache,
              pendingSuspenseBoundaries: o.pendingSuspenseBoundaries,
              transitions: o.transitions,
            }),
            (t.updateQueue.baseState = i),
            (t.memoizedState = i),
            t.flags & 256)
          ) {
            ((l = gn(Error(k(423)), t)), (t = hs(e, t, r, n, l)));
            break e;
          } else if (r !== l) {
            ((l = gn(Error(k(424)), t)), (t = hs(e, t, r, n, l)));
            break e;
          } else
            for (
              ke = gt(t.stateNode.containerInfo.firstChild),
                Ee = t,
                $ = !0,
                Fe = null,
                n = Za(t, null, r, n),
                t.child = n;
              n;
            )
              ((n.flags = (n.flags & -3) | 4096), (n = n.sibling));
        else {
          if ((hn(), r === l)) {
            t = nt(e, t, n);
            break e;
          }
          ae(e, t, r, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return (
        ec(t),
        e === null && Zi(t),
        (r = t.type),
        (l = t.pendingProps),
        (i = e !== null ? e.memoizedProps : null),
        (o = l.children),
        Ki(r, l) ? (o = null) : i !== null && Ki(r, i) && (t.flags |= 32),
        jc(e, t),
        ae(e, t, o, n),
        t.child
      );
    case 6:
      return (e === null && Zi(t), null);
    case 13:
      return Pc(e, t, n);
    case 4:
      return (
        Xo(t, t.stateNode.containerInfo),
        (r = t.pendingProps),
        e === null ? (t.child = mn(t, null, r, n)) : ae(e, t, r, n),
        t.child
      );
    case 11:
      return (
        (r = t.type),
        (l = t.pendingProps),
        (l = t.elementType === r ? l : De(r, l)),
        ds(e, t, r, l, n)
      );
    case 7:
      return (ae(e, t, t.pendingProps, n), t.child);
    case 8:
      return (ae(e, t, t.pendingProps.children, n), t.child);
    case 12:
      return (ae(e, t, t.pendingProps.children, n), t.child);
    case 10:
      e: {
        if (
          ((r = t.type._context),
          (l = t.pendingProps),
          (i = t.memoizedProps),
          (o = l.value),
          M(fl, r._currentValue),
          (r._currentValue = o),
          i !== null)
        )
          if (Be(i.value, o)) {
            if (i.children === l.children && !ge.current) {
              t = nt(e, t, n);
              break e;
            }
          } else
            for (i = t.child, i !== null && (i.return = t); i !== null; ) {
              var u = i.dependencies;
              if (u !== null) {
                o = i.child;
                for (var a = u.firstContext; a !== null; ) {
                  if (a.context === r) {
                    if (i.tag === 1) {
                      ((a = qe(-1, n & -n)), (a.tag = 2));
                      var d = i.updateQueue;
                      if (d !== null) {
                        d = d.shared;
                        var h = d.pending;
                        (h === null
                          ? (a.next = a)
                          : ((a.next = h.next), (h.next = a)),
                          (d.pending = a));
                      }
                    }
                    ((i.lanes |= n),
                      (a = i.alternate),
                      a !== null && (a.lanes |= n),
                      qi(i.return, n, t),
                      (u.lanes |= n));
                    break;
                  }
                  a = a.next;
                }
              } else if (i.tag === 10) o = i.type === t.type ? null : i.child;
              else if (i.tag === 18) {
                if (((o = i.return), o === null)) throw Error(k(341));
                ((o.lanes |= n),
                  (u = o.alternate),
                  u !== null && (u.lanes |= n),
                  qi(o, n, t),
                  (o = i.sibling));
              } else o = i.child;
              if (o !== null) o.return = i;
              else
                for (o = i; o !== null; ) {
                  if (o === t) {
                    o = null;
                    break;
                  }
                  if (((i = o.sibling), i !== null)) {
                    ((i.return = o.return), (o = i));
                    break;
                  }
                  o = o.return;
                }
              i = o;
            }
        (ae(e, t, l.children, n), (t = t.child));
      }
      return t;
    case 9:
      return (
        (l = t.type),
        (r = t.pendingProps.children),
        cn(t, n),
        (l = Te(l)),
        (r = r(l)),
        (t.flags |= 1),
        ae(e, t, r, n),
        t.child
      );
    case 14:
      return (
        (r = t.type),
        (l = De(r, t.pendingProps)),
        (l = De(r.type, l)),
        fs(e, t, r, l, n)
      );
    case 15:
      return Ec(e, t, t.type, t.pendingProps, n);
    case 17:
      return (
        (r = t.type),
        (l = t.pendingProps),
        (l = t.elementType === r ? l : De(r, l)),
        Gr(e, t),
        (t.tag = 1),
        ye(r) ? ((e = !0), al(t)) : (e = !1),
        cn(t, n),
        wc(t, r, l),
        eo(t, r, l, n),
        ro(null, t, r, !0, e, n)
      );
    case 19:
      return _c(e, t, n);
    case 22:
      return Cc(e, t, n);
  }
  throw Error(k(156, t.tag));
};
function Qc(e, t) {
  return ga(e, t);
}
function Ip(e, t, n, r) {
  ((this.tag = e),
    (this.key = n),
    (this.sibling =
      this.child =
      this.return =
      this.stateNode =
      this.type =
      this.elementType =
        null),
    (this.index = 0),
    (this.ref = null),
    (this.pendingProps = t),
    (this.dependencies =
      this.memoizedState =
      this.updateQueue =
      this.memoizedProps =
        null),
    (this.mode = r),
    (this.subtreeFlags = this.flags = 0),
    (this.deletions = null),
    (this.childLanes = this.lanes = 0),
    (this.alternate = null));
}
function Le(e, t, n, r) {
  return new Ip(e, t, n, r);
}
function au(e) {
  return ((e = e.prototype), !(!e || !e.isReactComponent));
}
function Dp(e) {
  if (typeof e == "function") return au(e) ? 1 : 0;
  if (e != null) {
    if (((e = e.$$typeof), e === _o)) return 11;
    if (e === Lo) return 14;
  }
  return 2;
}
function St(e, t) {
  var n = e.alternate;
  return (
    n === null
      ? ((n = Le(e.tag, t, e.key, e.mode)),
        (n.elementType = e.elementType),
        (n.type = e.type),
        (n.stateNode = e.stateNode),
        (n.alternate = e),
        (e.alternate = n))
      : ((n.pendingProps = t),
        (n.type = e.type),
        (n.flags = 0),
        (n.subtreeFlags = 0),
        (n.deletions = null)),
    (n.flags = e.flags & 14680064),
    (n.childLanes = e.childLanes),
    (n.lanes = e.lanes),
    (n.child = e.child),
    (n.memoizedProps = e.memoizedProps),
    (n.memoizedState = e.memoizedState),
    (n.updateQueue = e.updateQueue),
    (t = e.dependencies),
    (n.dependencies =
      t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
    (n.sibling = e.sibling),
    (n.index = e.index),
    (n.ref = e.ref),
    n
  );
}
function qr(e, t, n, r, l, i) {
  var o = 2;
  if (((r = e), typeof e == "function")) au(e) && (o = 1);
  else if (typeof e == "string") o = 5;
  else
    e: switch (e) {
      case Xt:
        return Ft(n.children, l, i, t);
      case Po:
        ((o = 8), (l |= 8));
        break;
      case Ci:
        return (
          (e = Le(12, n, t, l | 2)),
          (e.elementType = Ci),
          (e.lanes = i),
          e
        );
      case ji:
        return ((e = Le(13, n, t, l)), (e.elementType = ji), (e.lanes = i), e);
      case Ni:
        return ((e = Le(19, n, t, l)), (e.elementType = Ni), (e.lanes = i), e);
      case ea:
        return Fl(n, l, i, t);
      default:
        if (typeof e == "object" && e !== null)
          switch (e.$$typeof) {
            case qs:
              o = 10;
              break e;
            case bs:
              o = 9;
              break e;
            case _o:
              o = 11;
              break e;
            case Lo:
              o = 14;
              break e;
            case ot:
              ((o = 16), (r = null));
              break e;
          }
        throw Error(k(130, e == null ? e : typeof e, ""));
    }
  return (
    (t = Le(o, n, t, l)),
    (t.elementType = e),
    (t.type = r),
    (t.lanes = i),
    t
  );
}
function Ft(e, t, n, r) {
  return ((e = Le(7, e, r, t)), (e.lanes = n), e);
}
function Fl(e, t, n, r) {
  return (
    (e = Le(22, e, r, t)),
    (e.elementType = ea),
    (e.lanes = n),
    (e.stateNode = { isHidden: !1 }),
    e
  );
}
function yi(e, t, n) {
  return ((e = Le(6, e, null, t)), (e.lanes = n), e);
}
function xi(e, t, n) {
  return (
    (t = Le(4, e.children !== null ? e.children : [], e.key, t)),
    (t.lanes = n),
    (t.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      implementation: e.implementation,
    }),
    t
  );
}
function Mp(e, t, n, r, l) {
  ((this.tag = t),
    (this.containerInfo = e),
    (this.finishedWork =
      this.pingCache =
      this.current =
      this.pendingChildren =
        null),
    (this.timeoutHandle = -1),
    (this.callbackNode = this.pendingContext = this.context = null),
    (this.callbackPriority = 0),
    (this.eventTimes = bl(0)),
    (this.expirationTimes = bl(-1)),
    (this.entangledLanes =
      this.finishedLanes =
      this.mutableReadLanes =
      this.expiredLanes =
      this.pingedLanes =
      this.suspendedLanes =
      this.pendingLanes =
        0),
    (this.entanglements = bl(0)),
    (this.identifierPrefix = r),
    (this.onRecoverableError = l),
    (this.mutableSourceEagerHydrationData = null));
}
function cu(e, t, n, r, l, i, o, u, a) {
  return (
    (e = new Mp(e, t, n, u, a)),
    t === 1 ? ((t = 1), i === !0 && (t |= 8)) : (t = 0),
    (i = Le(3, null, null, t)),
    (e.current = i),
    (i.stateNode = e),
    (i.memoizedState = {
      element: r,
      isDehydrated: n,
      cache: null,
      transitions: null,
      pendingSuspenseBoundaries: null,
    }),
    Yo(i),
    e
  );
}
function Fp(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return {
    $$typeof: Yt,
    key: r == null ? null : "" + r,
    children: e,
    containerInfo: t,
    implementation: n,
  };
}
function Hc(e) {
  if (!e) return Ct;
  e = e._reactInternals;
  e: {
    if (Qt(e) !== e || e.tag !== 1) throw Error(k(170));
    var t = e;
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context;
          break e;
        case 1:
          if (ye(t.type)) {
            t = t.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
      }
      t = t.return;
    } while (t !== null);
    throw Error(k(171));
  }
  if (e.tag === 1) {
    var n = e.type;
    if (ye(n)) return Ha(e, n, t);
  }
  return t;
}
function Kc(e, t, n, r, l, i, o, u, a) {
  return (
    (e = cu(n, r, !0, e, l, i, o, u, a)),
    (e.context = Hc(null)),
    (n = e.current),
    (r = ce()),
    (l = wt(n)),
    (i = qe(r, l)),
    (i.callback = t ?? null),
    yt(n, i, l),
    (e.current.lanes = l),
    gr(e, l, r),
    xe(e, r),
    e
  );
}
function Ul(e, t, n, r) {
  var l = t.current,
    i = ce(),
    o = wt(l);
  return (
    (n = Hc(n)),
    t.context === null ? (t.context = n) : (t.pendingContext = n),
    (t = qe(i, o)),
    (t.payload = { element: e }),
    (r = r === void 0 ? null : r),
    r !== null && (t.callback = r),
    (e = yt(l, t, o)),
    e !== null && (Ae(e, l, o, i), Kr(e, l, o)),
    o
  );
}
function kl(e) {
  if (((e = e.current), !e.child)) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function Cs(e, t) {
  if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function du(e, t) {
  (Cs(e, t), (e = e.alternate) && Cs(e, t));
}
function Up() {
  return null;
}
var Yc =
  typeof reportError == "function"
    ? reportError
    : function (e) {
        console.error(e);
      };
function fu(e) {
  this._internalRoot = e;
}
$l.prototype.render = fu.prototype.render = function (e) {
  var t = this._internalRoot;
  if (t === null) throw Error(k(409));
  Ul(e, t, null, null);
};
$l.prototype.unmount = fu.prototype.unmount = function () {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    (Vt(function () {
      Ul(null, e, null, null);
    }),
      (t[et] = null));
  }
};
function $l(e) {
  this._internalRoot = e;
}
$l.prototype.unstable_scheduleHydration = function (e) {
  if (e) {
    var t = Ca();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < st.length && t !== 0 && t < st[n].priority; n++);
    (st.splice(n, 0, e), n === 0 && Na(e));
  }
};
function pu(e) {
  return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
}
function Al(e) {
  return !(
    !e ||
    (e.nodeType !== 1 &&
      e.nodeType !== 9 &&
      e.nodeType !== 11 &&
      (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "))
  );
}
function js() {}
function $p(e, t, n, r, l) {
  if (l) {
    if (typeof r == "function") {
      var i = r;
      r = function () {
        var d = kl(o);
        i.call(d);
      };
    }
    var o = Kc(t, r, e, 0, null, !1, !1, "", js);
    return (
      (e._reactRootContainer = o),
      (e[et] = o.current),
      ir(e.nodeType === 8 ? e.parentNode : e),
      Vt(),
      o
    );
  }
  for (; (l = e.lastChild); ) e.removeChild(l);
  if (typeof r == "function") {
    var u = r;
    r = function () {
      var d = kl(a);
      u.call(d);
    };
  }
  var a = cu(e, 0, !1, null, null, !1, !1, "", js);
  return (
    (e._reactRootContainer = a),
    (e[et] = a.current),
    ir(e.nodeType === 8 ? e.parentNode : e),
    Vt(function () {
      Ul(t, a, n, r);
    }),
    a
  );
}
function Bl(e, t, n, r, l) {
  var i = n._reactRootContainer;
  if (i) {
    var o = i;
    if (typeof l == "function") {
      var u = l;
      l = function () {
        var a = kl(o);
        u.call(a);
      };
    }
    Ul(t, o, e, l);
  } else o = $p(n, t, e, l, r);
  return kl(o);
}
ka = function (e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = An(t.pendingLanes);
        n !== 0 &&
          (Oo(t, n | 1), xe(t, X()), !(I & 6) && ((yn = X() + 500), Pt()));
      }
      break;
    case 13:
      (Vt(function () {
        var r = tt(e, 1);
        if (r !== null) {
          var l = ce();
          Ae(r, e, 1, l);
        }
      }),
        du(e, 1));
  }
};
zo = function (e) {
  if (e.tag === 13) {
    var t = tt(e, 134217728);
    if (t !== null) {
      var n = ce();
      Ae(t, e, 134217728, n);
    }
    du(e, 134217728);
  }
};
Ea = function (e) {
  if (e.tag === 13) {
    var t = wt(e),
      n = tt(e, t);
    if (n !== null) {
      var r = ce();
      Ae(n, e, t, r);
    }
    du(e, t);
  }
};
Ca = function () {
  return D;
};
ja = function (e, t) {
  var n = D;
  try {
    return ((D = e), t());
  } finally {
    D = n;
  }
};
Mi = function (e, t, n) {
  switch (t) {
    case "input":
      if ((Li(e, n), (t = n.name), n.type === "radio" && t != null)) {
        for (n = e; n.parentNode; ) n = n.parentNode;
        for (
          n = n.querySelectorAll(
            "input[name=" + JSON.stringify("" + t) + '][type="radio"]',
          ),
            t = 0;
          t < n.length;
          t++
        ) {
          var r = n[t];
          if (r !== e && r.form === e.form) {
            var l = Tl(r);
            if (!l) throw Error(k(90));
            (na(r), Li(r, l));
          }
        }
      }
      break;
    case "textarea":
      la(e, n);
      break;
    case "select":
      ((t = n.value), t != null && on(e, !!n.multiple, t, !1));
  }
};
da = ou;
fa = Vt;
var Ap = { usingClientEntryPoint: !1, Events: [xr, qt, Tl, aa, ca, ou] },
  Dn = {
    findFiberByHostInstance: zt,
    bundleType: 0,
    version: "18.3.1",
    rendererPackageName: "react-dom",
  },
  Bp = {
    bundleType: Dn.bundleType,
    version: Dn.version,
    rendererPackageName: Dn.rendererPackageName,
    rendererConfig: Dn.rendererConfig,
    overrideHookState: null,
    overrideHookStateDeletePath: null,
    overrideHookStateRenamePath: null,
    overrideProps: null,
    overridePropsDeletePath: null,
    overridePropsRenamePath: null,
    setErrorHandler: null,
    setSuspenseHandler: null,
    scheduleUpdate: null,
    currentDispatcherRef: rt.ReactCurrentDispatcher,
    findHostInstanceByFiber: function (e) {
      return ((e = ma(e)), e === null ? null : e.stateNode);
    },
    findFiberByHostInstance: Dn.findFiberByHostInstance || Up,
    findHostInstancesForRefresh: null,
    scheduleRefresh: null,
    scheduleRoot: null,
    setRefreshHandler: null,
    getCurrentFiber: null,
    reconcilerVersion: "18.3.1-next-f1338f8080-20240426",
  };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var Ar = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!Ar.isDisabled && Ar.supportsFiber)
    try {
      ((Pl = Ar.inject(Bp)), (He = Ar));
    } catch {}
}
je.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Ap;
je.createPortal = function (e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!pu(t)) throw Error(k(200));
  return Fp(e, t, null, n);
};
je.createRoot = function (e, t) {
  if (!pu(e)) throw Error(k(299));
  var n = !1,
    r = "",
    l = Yc;
  return (
    t != null &&
      (t.unstable_strictMode === !0 && (n = !0),
      t.identifierPrefix !== void 0 && (r = t.identifierPrefix),
      t.onRecoverableError !== void 0 && (l = t.onRecoverableError)),
    (t = cu(e, 1, !1, null, null, n, !1, r, l)),
    (e[et] = t.current),
    ir(e.nodeType === 8 ? e.parentNode : e),
    new fu(t)
  );
};
je.findDOMNode = function (e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function"
      ? Error(k(188))
      : ((e = Object.keys(e).join(",")), Error(k(268, e)));
  return ((e = ma(t)), (e = e === null ? null : e.stateNode), e);
};
je.flushSync = function (e) {
  return Vt(e);
};
je.hydrate = function (e, t, n) {
  if (!Al(t)) throw Error(k(200));
  return Bl(null, e, t, !0, n);
};
je.hydrateRoot = function (e, t, n) {
  if (!pu(e)) throw Error(k(405));
  var r = (n != null && n.hydratedSources) || null,
    l = !1,
    i = "",
    o = Yc;
  if (
    (n != null &&
      (n.unstable_strictMode === !0 && (l = !0),
      n.identifierPrefix !== void 0 && (i = n.identifierPrefix),
      n.onRecoverableError !== void 0 && (o = n.onRecoverableError)),
    (t = Kc(t, null, e, 1, n ?? null, l, !1, i, o)),
    (e[et] = t.current),
    ir(e),
    r)
  )
    for (e = 0; e < r.length; e++)
      ((n = r[e]),
        (l = n._getVersion),
        (l = l(n._source)),
        t.mutableSourceEagerHydrationData == null
          ? (t.mutableSourceEagerHydrationData = [n, l])
          : t.mutableSourceEagerHydrationData.push(n, l));
  return new $l(t);
};
je.render = function (e, t, n) {
  if (!Al(t)) throw Error(k(200));
  return Bl(null, e, t, !1, n);
};
je.unmountComponentAtNode = function (e) {
  if (!Al(e)) throw Error(k(40));
  return e._reactRootContainer
    ? (Vt(function () {
        Bl(null, null, e, !1, function () {
          ((e._reactRootContainer = null), (e[et] = null));
        });
      }),
      !0)
    : !1;
};
je.unstable_batchedUpdates = ou;
je.unstable_renderSubtreeIntoContainer = function (e, t, n, r) {
  if (!Al(n)) throw Error(k(200));
  if (e == null || e._reactInternals === void 0) throw Error(k(38));
  return Bl(e, t, n, !1, r);
};
je.version = "18.3.1-next-f1338f8080-20240426";
function Xc() {
  if (
    !(
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
    )
  )
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Xc);
    } catch (e) {
      console.error(e);
    }
}
(Xc(), (Xs.exports = je));
var Vp = Xs.exports;
/**
 * @remix-run/router v1.21.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function hr() {
  return (
    (hr = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
              Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    hr.apply(this, arguments)
  );
}
var ft;
(function (e) {
  ((e.Pop = "POP"), (e.Push = "PUSH"), (e.Replace = "REPLACE"));
})(ft || (ft = {}));
const Ns = "popstate";
function Wp(e) {
  e === void 0 && (e = {});
  function t(r, l) {
    let { pathname: i, search: o, hash: u } = r.location;
    return vo(
      "",
      { pathname: i, search: o, hash: u },
      (l.state && l.state.usr) || null,
      (l.state && l.state.key) || "default",
    );
  }
  function n(r, l) {
    return typeof l == "string" ? l : El(l);
  }
  return Hp(t, n, null, e);
}
function W(e, t) {
  if (e === !1 || e === null || typeof e > "u") throw new Error(t);
}
function Gc(e, t) {
  if (!e) {
    typeof console < "u" && console.warn(t);
    try {
      throw new Error(t);
    } catch {}
  }
}
function Qp() {
  return Math.random().toString(36).substr(2, 8);
}
function Ps(e, t) {
  return { usr: e.state, key: e.key, idx: t };
}
function vo(e, t, n, r) {
  return (
    n === void 0 && (n = null),
    hr(
      { pathname: typeof e == "string" ? e : e.pathname, search: "", hash: "" },
      typeof t == "string" ? En(t) : t,
      { state: n, key: (t && t.key) || r || Qp() },
    )
  );
}
function El(e) {
  let { pathname: t = "/", search: n = "", hash: r = "" } = e;
  return (
    n && n !== "?" && (t += n.charAt(0) === "?" ? n : "?" + n),
    r && r !== "#" && (t += r.charAt(0) === "#" ? r : "#" + r),
    t
  );
}
function En(e) {
  let t = {};
  if (e) {
    let n = e.indexOf("#");
    n >= 0 && ((t.hash = e.substr(n)), (e = e.substr(0, n)));
    let r = e.indexOf("?");
    (r >= 0 && ((t.search = e.substr(r)), (e = e.substr(0, r))),
      e && (t.pathname = e));
  }
  return t;
}
function Hp(e, t, n, r) {
  r === void 0 && (r = {});
  let { window: l = document.defaultView, v5Compat: i = !1 } = r,
    o = l.history,
    u = ft.Pop,
    a = null,
    d = h();
  d == null && ((d = 0), o.replaceState(hr({}, o.state, { idx: d }), ""));
  function h() {
    return (o.state || { idx: null }).idx;
  }
  function m() {
    u = ft.Pop;
    let E = h(),
      c = E == null ? null : E - d;
    ((d = E), a && a({ action: u, location: g.location, delta: c }));
  }
  function v(E, c) {
    u = ft.Push;
    let f = vo(g.location, E, c);
    d = h() + 1;
    let p = Ps(f, d),
      y = g.createHref(f);
    try {
      o.pushState(p, "", y);
    } catch (C) {
      if (C instanceof DOMException && C.name === "DataCloneError") throw C;
      l.location.assign(y);
    }
    i && a && a({ action: u, location: g.location, delta: 1 });
  }
  function w(E, c) {
    u = ft.Replace;
    let f = vo(g.location, E, c);
    d = h();
    let p = Ps(f, d),
      y = g.createHref(f);
    (o.replaceState(p, "", y),
      i && a && a({ action: u, location: g.location, delta: 0 }));
  }
  function S(E) {
    let c = l.location.origin !== "null" ? l.location.origin : l.location.href,
      f = typeof E == "string" ? E : El(E);
    return (
      (f = f.replace(/ $/, "%20")),
      W(
        c,
        "No window.location.(origin|href) available to create URL for href: " +
          f,
      ),
      new URL(f, c)
    );
  }
  let g = {
    get action() {
      return u;
    },
    get location() {
      return e(l, o);
    },
    listen(E) {
      if (a) throw new Error("A history only accepts one active listener");
      return (
        l.addEventListener(Ns, m),
        (a = E),
        () => {
          (l.removeEventListener(Ns, m), (a = null));
        }
      );
    },
    createHref(E) {
      return t(l, E);
    },
    createURL: S,
    encodeLocation(E) {
      let c = S(E);
      return { pathname: c.pathname, search: c.search, hash: c.hash };
    },
    push: v,
    replace: w,
    go(E) {
      return o.go(E);
    },
  };
  return g;
}
var _s;
(function (e) {
  ((e.data = "data"),
    (e.deferred = "deferred"),
    (e.redirect = "redirect"),
    (e.error = "error"));
})(_s || (_s = {}));
function Kp(e, t, n) {
  return (n === void 0 && (n = "/"), Yp(e, t, n));
}
function Yp(e, t, n, r) {
  let l = typeof t == "string" ? En(t) : t,
    i = xn(l.pathname || "/", n);
  if (i == null) return null;
  let o = Jc(e);
  Xp(o);
  let u = null;
  for (let a = 0; u == null && a < o.length; ++a) {
    let d = ih(i);
    u = rh(o[a], d);
  }
  return u;
}
function Jc(e, t, n, r) {
  (t === void 0 && (t = []),
    n === void 0 && (n = []),
    r === void 0 && (r = ""));
  let l = (i, o, u) => {
    let a = {
      relativePath: u === void 0 ? i.path || "" : u,
      caseSensitive: i.caseSensitive === !0,
      childrenIndex: o,
      route: i,
    };
    a.relativePath.startsWith("/") &&
      (W(
        a.relativePath.startsWith(r),
        'Absolute route path "' +
          a.relativePath +
          '" nested under path ' +
          ('"' + r + '" is not valid. An absolute child route path ') +
          "must start with the combined path of all its parent routes.",
      ),
      (a.relativePath = a.relativePath.slice(r.length)));
    let d = kt([r, a.relativePath]),
      h = n.concat(a);
    (i.children &&
      i.children.length > 0 &&
      (W(
        i.index !== !0,
        "Index routes must not have child routes. Please remove " +
          ('all child routes from route path "' + d + '".'),
      ),
      Jc(i.children, t, h, d)),
      !(i.path == null && !i.index) &&
        t.push({ path: d, score: th(d, i.index), routesMeta: h }));
  };
  return (
    e.forEach((i, o) => {
      var u;
      if (i.path === "" || !((u = i.path) != null && u.includes("?"))) l(i, o);
      else for (let a of Zc(i.path)) l(i, o, a);
    }),
    t
  );
}
function Zc(e) {
  let t = e.split("/");
  if (t.length === 0) return [];
  let [n, ...r] = t,
    l = n.endsWith("?"),
    i = n.replace(/\?$/, "");
  if (r.length === 0) return l ? [i, ""] : [i];
  let o = Zc(r.join("/")),
    u = [];
  return (
    u.push(...o.map((a) => (a === "" ? i : [i, a].join("/")))),
    l && u.push(...o),
    u.map((a) => (e.startsWith("/") && a === "" ? "/" : a))
  );
}
function Xp(e) {
  e.sort((t, n) =>
    t.score !== n.score
      ? n.score - t.score
      : nh(
          t.routesMeta.map((r) => r.childrenIndex),
          n.routesMeta.map((r) => r.childrenIndex),
        ),
  );
}
const Gp = /^:[\w-]+$/,
  Jp = 3,
  Zp = 2,
  qp = 1,
  bp = 10,
  eh = -2,
  Ls = (e) => e === "*";
function th(e, t) {
  let n = e.split("/"),
    r = n.length;
  return (
    n.some(Ls) && (r += eh),
    t && (r += Zp),
    n
      .filter((l) => !Ls(l))
      .reduce((l, i) => l + (Gp.test(i) ? Jp : i === "" ? qp : bp), r)
  );
}
function nh(e, t) {
  return e.length === t.length && e.slice(0, -1).every((r, l) => r === t[l])
    ? e[e.length - 1] - t[t.length - 1]
    : 0;
}
function rh(e, t, n) {
  let { routesMeta: r } = e,
    l = {},
    i = "/",
    o = [];
  for (let u = 0; u < r.length; ++u) {
    let a = r[u],
      d = u === r.length - 1,
      h = i === "/" ? t : t.slice(i.length) || "/",
      m = go(
        { path: a.relativePath, caseSensitive: a.caseSensitive, end: d },
        h,
      ),
      v = a.route;
    if (!m) return null;
    (Object.assign(l, m.params),
      o.push({
        params: l,
        pathname: kt([i, m.pathname]),
        pathnameBase: ah(kt([i, m.pathnameBase])),
        route: v,
      }),
      m.pathnameBase !== "/" && (i = kt([i, m.pathnameBase])));
  }
  return o;
}
function go(e, t) {
  typeof e == "string" && (e = { path: e, caseSensitive: !1, end: !0 });
  let [n, r] = lh(e.path, e.caseSensitive, e.end),
    l = t.match(n);
  if (!l) return null;
  let i = l[0],
    o = i.replace(/(.)\/+$/, "$1"),
    u = l.slice(1);
  return {
    params: r.reduce((d, h, m) => {
      let { paramName: v, isOptional: w } = h;
      if (v === "*") {
        let g = u[m] || "";
        o = i.slice(0, i.length - g.length).replace(/(.)\/+$/, "$1");
      }
      const S = u[m];
      return (
        w && !S ? (d[v] = void 0) : (d[v] = (S || "").replace(/%2F/g, "/")),
        d
      );
    }, {}),
    pathname: i,
    pathnameBase: o,
    pattern: e,
  };
}
function lh(e, t, n) {
  (t === void 0 && (t = !1),
    n === void 0 && (n = !0),
    Gc(
      e === "*" || !e.endsWith("*") || e.endsWith("/*"),
      'Route path "' +
        e +
        '" will be treated as if it were ' +
        ('"' + e.replace(/\*$/, "/*") + '" because the `*` character must ') +
        "always follow a `/` in the pattern. To get rid of this warning, " +
        ('please change the route path to "' + e.replace(/\*$/, "/*") + '".'),
    ));
  let r = [],
    l =
      "^" +
      e
        .replace(/\/*\*?$/, "")
        .replace(/^\/*/, "/")
        .replace(/[\\.*+^${}|()[\]]/g, "\\$&")
        .replace(
          /\/:([\w-]+)(\?)?/g,
          (o, u, a) => (
            r.push({ paramName: u, isOptional: a != null }),
            a ? "/?([^\\/]+)?" : "/([^\\/]+)"
          ),
        );
  return (
    e.endsWith("*")
      ? (r.push({ paramName: "*" }),
        (l += e === "*" || e === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$"))
      : n
        ? (l += "\\/*$")
        : e !== "" && e !== "/" && (l += "(?:(?=\\/|$))"),
    [new RegExp(l, t ? void 0 : "i"), r]
  );
}
function ih(e) {
  try {
    return e
      .split("/")
      .map((t) => decodeURIComponent(t).replace(/\//g, "%2F"))
      .join("/");
  } catch (t) {
    return (
      Gc(
        !1,
        'The URL path "' +
          e +
          '" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent ' +
          ("encoding (" + t + ")."),
      ),
      e
    );
  }
}
function xn(e, t) {
  if (t === "/") return e;
  if (!e.toLowerCase().startsWith(t.toLowerCase())) return null;
  let n = t.endsWith("/") ? t.length - 1 : t.length,
    r = e.charAt(n);
  return r && r !== "/" ? null : e.slice(n) || "/";
}
function oh(e, t) {
  t === void 0 && (t = "/");
  let {
    pathname: n,
    search: r = "",
    hash: l = "",
  } = typeof e == "string" ? En(e) : e;
  return {
    pathname: n ? (n.startsWith("/") ? n : uh(n, t)) : t,
    search: ch(r),
    hash: dh(l),
  };
}
function uh(e, t) {
  let n = t.replace(/\/+$/, "").split("/");
  return (
    e.split("/").forEach((l) => {
      l === ".." ? n.length > 1 && n.pop() : l !== "." && n.push(l);
    }),
    n.length > 1 ? n.join("/") : "/"
  );
}
function wi(e, t, n, r) {
  return (
    "Cannot include a '" +
    e +
    "' character in a manually specified " +
    ("`to." +
      t +
      "` field [" +
      JSON.stringify(r) +
      "].  Please separate it out to the ") +
    ("`to." + n + "` field. Alternatively you may provide the full path as ") +
    'a string in <Link to="..."> and the router will parse it for you.'
  );
}
function sh(e) {
  return e.filter(
    (t, n) => n === 0 || (t.route.path && t.route.path.length > 0),
  );
}
function hu(e, t) {
  let n = sh(e);
  return t
    ? n.map((r, l) => (l === n.length - 1 ? r.pathname : r.pathnameBase))
    : n.map((r) => r.pathnameBase);
}
function mu(e, t, n, r) {
  r === void 0 && (r = !1);
  let l;
  typeof e == "string"
    ? (l = En(e))
    : ((l = hr({}, e)),
      W(
        !l.pathname || !l.pathname.includes("?"),
        wi("?", "pathname", "search", l),
      ),
      W(
        !l.pathname || !l.pathname.includes("#"),
        wi("#", "pathname", "hash", l),
      ),
      W(!l.search || !l.search.includes("#"), wi("#", "search", "hash", l)));
  let i = e === "" || l.pathname === "",
    o = i ? "/" : l.pathname,
    u;
  if (o == null) u = n;
  else {
    let m = t.length - 1;
    if (!r && o.startsWith("..")) {
      let v = o.split("/");
      for (; v[0] === ".."; ) (v.shift(), (m -= 1));
      l.pathname = v.join("/");
    }
    u = m >= 0 ? t[m] : "/";
  }
  let a = oh(l, u),
    d = o && o !== "/" && o.endsWith("/"),
    h = (i || o === ".") && n.endsWith("/");
  return (!a.pathname.endsWith("/") && (d || h) && (a.pathname += "/"), a);
}
const kt = (e) => e.join("/").replace(/\/\/+/g, "/"),
  ah = (e) => e.replace(/\/+$/, "").replace(/^\/*/, "/"),
  ch = (e) => (!e || e === "?" ? "" : e.startsWith("?") ? e : "?" + e),
  dh = (e) => (!e || e === "#" ? "" : e.startsWith("#") ? e : "#" + e);
function fh(e) {
  return (
    e != null &&
    typeof e.status == "number" &&
    typeof e.statusText == "string" &&
    typeof e.internal == "boolean" &&
    "data" in e
  );
}
const qc = ["post", "put", "patch", "delete"];
new Set(qc);
const ph = ["get", ...qc];
new Set(ph);
/**
 * React Router v6.28.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function mr() {
  return (
    (mr = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
              Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    mr.apply(this, arguments)
  );
}
const Vl = x.createContext(null),
  bc = x.createContext(null),
  lt = x.createContext(null),
  Wl = x.createContext(null),
  Ye = x.createContext({ outlet: null, matches: [], isDataRoute: !1 }),
  ed = x.createContext(null);
function hh(e, t) {
  let { relative: n } = t === void 0 ? {} : t;
  Cn() || W(!1);
  let { basename: r, navigator: l } = x.useContext(lt),
    { hash: i, pathname: o, search: u } = Ql(e, { relative: n }),
    a = o;
  return (
    r !== "/" && (a = o === "/" ? r : kt([r, o])),
    l.createHref({ pathname: a, search: u, hash: i })
  );
}
function Cn() {
  return x.useContext(Wl) != null;
}
function _t() {
  return (Cn() || W(!1), x.useContext(Wl).location);
}
function td(e) {
  x.useContext(lt).static || x.useLayoutEffect(e);
}
function Sr() {
  let { isDataRoute: e } = x.useContext(Ye);
  return e ? Lh() : mh();
}
function mh() {
  Cn() || W(!1);
  let e = x.useContext(Vl),
    { basename: t, future: n, navigator: r } = x.useContext(lt),
    { matches: l } = x.useContext(Ye),
    { pathname: i } = _t(),
    o = JSON.stringify(hu(l, n.v7_relativeSplatPath)),
    u = x.useRef(!1);
  return (
    td(() => {
      u.current = !0;
    }),
    x.useCallback(
      function (d, h) {
        if ((h === void 0 && (h = {}), !u.current)) return;
        if (typeof d == "number") {
          r.go(d);
          return;
        }
        let m = mu(d, JSON.parse(o), i, h.relative === "path");
        (e == null &&
          t !== "/" &&
          (m.pathname = m.pathname === "/" ? t : kt([t, m.pathname])),
          (h.replace ? r.replace : r.push)(m, h.state, h));
      },
      [t, r, o, i, e],
    )
  );
}
const vh = x.createContext(null);
function gh(e) {
  let t = x.useContext(Ye).outlet;
  return t && x.createElement(vh.Provider, { value: e }, t);
}
function nd() {
  let { matches: e } = x.useContext(Ye),
    t = e[e.length - 1];
  return t ? t.params : {};
}
function Ql(e, t) {
  let { relative: n } = t === void 0 ? {} : t,
    { future: r } = x.useContext(lt),
    { matches: l } = x.useContext(Ye),
    { pathname: i } = _t(),
    o = JSON.stringify(hu(l, r.v7_relativeSplatPath));
  return x.useMemo(() => mu(e, JSON.parse(o), i, n === "path"), [e, o, i, n]);
}
function yh(e, t) {
  return xh(e, t);
}
function xh(e, t, n, r) {
  Cn() || W(!1);
  let { navigator: l } = x.useContext(lt),
    { matches: i } = x.useContext(Ye),
    o = i[i.length - 1],
    u = o ? o.params : {};
  o && o.pathname;
  let a = o ? o.pathnameBase : "/";
  o && o.route;
  let d = _t(),
    h;
  if (t) {
    var m;
    let E = typeof t == "string" ? En(t) : t;
    (a === "/" || ((m = E.pathname) != null && m.startsWith(a)) || W(!1),
      (h = E));
  } else h = d;
  let v = h.pathname || "/",
    w = v;
  if (a !== "/") {
    let E = a.replace(/^\//, "").split("/");
    w = "/" + v.replace(/^\//, "").split("/").slice(E.length).join("/");
  }
  let S = Kp(e, { pathname: w }),
    g = Ch(
      S &&
        S.map((E) =>
          Object.assign({}, E, {
            params: Object.assign({}, u, E.params),
            pathname: kt([
              a,
              l.encodeLocation
                ? l.encodeLocation(E.pathname).pathname
                : E.pathname,
            ]),
            pathnameBase:
              E.pathnameBase === "/"
                ? a
                : kt([
                    a,
                    l.encodeLocation
                      ? l.encodeLocation(E.pathnameBase).pathname
                      : E.pathnameBase,
                  ]),
          }),
        ),
      i,
      n,
      r,
    );
  return t && g
    ? x.createElement(
        Wl.Provider,
        {
          value: {
            location: mr(
              {
                pathname: "/",
                search: "",
                hash: "",
                state: null,
                key: "default",
              },
              h,
            ),
            navigationType: ft.Pop,
          },
        },
        g,
      )
    : g;
}
function wh() {
  let e = _h(),
    t = fh(e)
      ? e.status + " " + e.statusText
      : e instanceof Error
        ? e.message
        : JSON.stringify(e),
    n = e instanceof Error ? e.stack : null,
    l = { padding: "0.5rem", backgroundColor: "rgba(200,200,200, 0.5)" };
  return x.createElement(
    x.Fragment,
    null,
    x.createElement("h2", null, "Unexpected Application Error!"),
    x.createElement("h3", { style: { fontStyle: "italic" } }, t),
    n ? x.createElement("pre", { style: l }, n) : null,
    null,
  );
}
const Sh = x.createElement(wh, null);
class kh extends x.Component {
  constructor(t) {
    (super(t),
      (this.state = {
        location: t.location,
        revalidation: t.revalidation,
        error: t.error,
      }));
  }
  static getDerivedStateFromError(t) {
    return { error: t };
  }
  static getDerivedStateFromProps(t, n) {
    return n.location !== t.location ||
      (n.revalidation !== "idle" && t.revalidation === "idle")
      ? { error: t.error, location: t.location, revalidation: t.revalidation }
      : {
          error: t.error !== void 0 ? t.error : n.error,
          location: n.location,
          revalidation: t.revalidation || n.revalidation,
        };
  }
  componentDidCatch(t, n) {
    console.error(
      "React Router caught the following error during render",
      t,
      n,
    );
  }
  render() {
    return this.state.error !== void 0
      ? x.createElement(
          Ye.Provider,
          { value: this.props.routeContext },
          x.createElement(ed.Provider, {
            value: this.state.error,
            children: this.props.component,
          }),
        )
      : this.props.children;
  }
}
function Eh(e) {
  let { routeContext: t, match: n, children: r } = e,
    l = x.useContext(Vl);
  return (
    l &&
      l.static &&
      l.staticContext &&
      (n.route.errorElement || n.route.ErrorBoundary) &&
      (l.staticContext._deepestRenderedBoundaryId = n.route.id),
    x.createElement(Ye.Provider, { value: t }, r)
  );
}
function Ch(e, t, n, r) {
  var l;
  if (
    (t === void 0 && (t = []),
    n === void 0 && (n = null),
    r === void 0 && (r = null),
    e == null)
  ) {
    var i;
    if (!n) return null;
    if (n.errors) e = n.matches;
    else if (
      (i = r) != null &&
      i.v7_partialHydration &&
      t.length === 0 &&
      !n.initialized &&
      n.matches.length > 0
    )
      e = n.matches;
    else return null;
  }
  let o = e,
    u = (l = n) == null ? void 0 : l.errors;
  if (u != null) {
    let h = o.findIndex(
      (m) => m.route.id && (u == null ? void 0 : u[m.route.id]) !== void 0,
    );
    (h >= 0 || W(!1), (o = o.slice(0, Math.min(o.length, h + 1))));
  }
  let a = !1,
    d = -1;
  if (n && r && r.v7_partialHydration)
    for (let h = 0; h < o.length; h++) {
      let m = o[h];
      if (
        ((m.route.HydrateFallback || m.route.hydrateFallbackElement) && (d = h),
        m.route.id)
      ) {
        let { loaderData: v, errors: w } = n,
          S =
            m.route.loader &&
            v[m.route.id] === void 0 &&
            (!w || w[m.route.id] === void 0);
        if (m.route.lazy || S) {
          ((a = !0), d >= 0 ? (o = o.slice(0, d + 1)) : (o = [o[0]]));
          break;
        }
      }
    }
  return o.reduceRight((h, m, v) => {
    let w,
      S = !1,
      g = null,
      E = null;
    n &&
      ((w = u && m.route.id ? u[m.route.id] : void 0),
      (g = m.route.errorElement || Sh),
      a &&
        (d < 0 && v === 0
          ? (Rh("route-fallback"), (S = !0), (E = null))
          : d === v &&
            ((S = !0), (E = m.route.hydrateFallbackElement || null))));
    let c = t.concat(o.slice(0, v + 1)),
      f = () => {
        let p;
        return (
          w
            ? (p = g)
            : S
              ? (p = E)
              : m.route.Component
                ? (p = x.createElement(m.route.Component, null))
                : m.route.element
                  ? (p = m.route.element)
                  : (p = h),
          x.createElement(Eh, {
            match: m,
            routeContext: { outlet: h, matches: c, isDataRoute: n != null },
            children: p,
          })
        );
      };
    return n && (m.route.ErrorBoundary || m.route.errorElement || v === 0)
      ? x.createElement(kh, {
          location: n.location,
          revalidation: n.revalidation,
          component: g,
          error: w,
          children: f(),
          routeContext: { outlet: null, matches: c, isDataRoute: !0 },
        })
      : f();
  }, null);
}
var rd = (function (e) {
    return (
      (e.UseBlocker = "useBlocker"),
      (e.UseRevalidator = "useRevalidator"),
      (e.UseNavigateStable = "useNavigate"),
      e
    );
  })(rd || {}),
  ld = (function (e) {
    return (
      (e.UseBlocker = "useBlocker"),
      (e.UseLoaderData = "useLoaderData"),
      (e.UseActionData = "useActionData"),
      (e.UseRouteError = "useRouteError"),
      (e.UseNavigation = "useNavigation"),
      (e.UseRouteLoaderData = "useRouteLoaderData"),
      (e.UseMatches = "useMatches"),
      (e.UseRevalidator = "useRevalidator"),
      (e.UseNavigateStable = "useNavigate"),
      (e.UseRouteId = "useRouteId"),
      e
    );
  })(ld || {});
function jh(e) {
  let t = x.useContext(Vl);
  return (t || W(!1), t);
}
function Nh(e) {
  let t = x.useContext(bc);
  return (t || W(!1), t);
}
function Ph(e) {
  let t = x.useContext(Ye);
  return (t || W(!1), t);
}
function id(e) {
  let t = Ph(),
    n = t.matches[t.matches.length - 1];
  return (n.route.id || W(!1), n.route.id);
}
function _h() {
  var e;
  let t = x.useContext(ed),
    n = Nh(),
    r = id();
  return t !== void 0 ? t : (e = n.errors) == null ? void 0 : e[r];
}
function Lh() {
  let { router: e } = jh(rd.UseNavigateStable),
    t = id(ld.UseNavigateStable),
    n = x.useRef(!1);
  return (
    td(() => {
      n.current = !0;
    }),
    x.useCallback(
      function (l, i) {
        (i === void 0 && (i = {}),
          n.current &&
            (typeof l == "number"
              ? e.navigate(l)
              : e.navigate(l, mr({ fromRouteId: t }, i))));
      },
      [e, t],
    )
  );
}
const Rs = {};
function Rh(e, t, n) {
  Rs[e] || (Rs[e] = !0);
}
const Ts = {};
function Th(e, t) {
  Ts[t] || ((Ts[t] = !0), console.warn(t));
}
const Os = (e, t, n) =>
  Th(
    e,
    "⚠️ React Router Future Flag Warning: " +
      t +
      ". " +
      ("You can use the `" + e + "` future flag to opt-in early. ") +
      ("For more information, see " + n + "."),
  );
function Oh(e, t) {
  ((e != null && e.v7_startTransition) ||
    Os(
      "v7_startTransition",
      "React Router will begin wrapping state updates in `React.startTransition` in v7",
      "https://reactrouter.com/v6/upgrading/future#v7_starttransition",
    ),
    (e != null && e.v7_relativeSplatPath) ||
      Os(
        "v7_relativeSplatPath",
        "Relative route resolution within Splat routes is changing in v7",
        "https://reactrouter.com/v6/upgrading/future#v7_relativesplatpath",
      ));
}
function Cl(e) {
  let { to: t, replace: n, state: r, relative: l } = e;
  Cn() || W(!1);
  let { future: i, static: o } = x.useContext(lt),
    { matches: u } = x.useContext(Ye),
    { pathname: a } = _t(),
    d = Sr(),
    h = mu(t, hu(u, i.v7_relativeSplatPath), a, l === "path"),
    m = JSON.stringify(h);
  return (
    x.useEffect(
      () => d(JSON.parse(m), { replace: n, state: r, relative: l }),
      [d, m, l, n, r],
    ),
    null
  );
}
function zh(e) {
  return gh(e.context);
}
function pe(e) {
  W(!1);
}
function Ih(e) {
  let {
    basename: t = "/",
    children: n = null,
    location: r,
    navigationType: l = ft.Pop,
    navigator: i,
    static: o = !1,
    future: u,
  } = e;
  Cn() && W(!1);
  let a = t.replace(/^\/*/, "/"),
    d = x.useMemo(
      () => ({
        basename: a,
        navigator: i,
        static: o,
        future: mr({ v7_relativeSplatPath: !1 }, u),
      }),
      [a, u, i, o],
    );
  typeof r == "string" && (r = En(r));
  let {
      pathname: h = "/",
      search: m = "",
      hash: v = "",
      state: w = null,
      key: S = "default",
    } = r,
    g = x.useMemo(() => {
      let E = xn(h, a);
      return E == null
        ? null
        : {
            location: { pathname: E, search: m, hash: v, state: w, key: S },
            navigationType: l,
          };
    }, [a, h, m, v, w, S, l]);
  return g == null
    ? null
    : x.createElement(
        lt.Provider,
        { value: d },
        x.createElement(Wl.Provider, { children: n, value: g }),
      );
}
function Dh(e) {
  let { children: t, location: n } = e;
  return yh(yo(t), n);
}
new Promise(() => {});
function yo(e, t) {
  t === void 0 && (t = []);
  let n = [];
  return (
    x.Children.forEach(e, (r, l) => {
      if (!x.isValidElement(r)) return;
      let i = [...t, l];
      if (r.type === x.Fragment) {
        n.push.apply(n, yo(r.props.children, i));
        return;
      }
      (r.type !== pe && W(!1), !r.props.index || !r.props.children || W(!1));
      let o = {
        id: r.props.id || i.join("-"),
        caseSensitive: r.props.caseSensitive,
        element: r.props.element,
        Component: r.props.Component,
        index: r.props.index,
        path: r.props.path,
        loader: r.props.loader,
        action: r.props.action,
        errorElement: r.props.errorElement,
        ErrorBoundary: r.props.ErrorBoundary,
        hasErrorBoundary:
          r.props.ErrorBoundary != null || r.props.errorElement != null,
        shouldRevalidate: r.props.shouldRevalidate,
        handle: r.props.handle,
        lazy: r.props.lazy,
      };
      (r.props.children && (o.children = yo(r.props.children, i)), n.push(o));
    }),
    n
  );
}
/**
 * React Router DOM v6.28.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function jl() {
  return (
    (jl = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
              Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    jl.apply(this, arguments)
  );
}
function od(e, t) {
  if (e == null) return {};
  var n = {},
    r = Object.keys(e),
    l,
    i;
  for (i = 0; i < r.length; i++)
    ((l = r[i]), !(t.indexOf(l) >= 0) && (n[l] = e[l]));
  return n;
}
function Mh(e) {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}
function Fh(e, t) {
  return e.button === 0 && (!t || t === "_self") && !Mh(e);
}
const Uh = [
    "onClick",
    "relative",
    "reloadDocument",
    "replace",
    "state",
    "target",
    "to",
    "preventScrollReset",
    "viewTransition",
  ],
  $h = [
    "aria-current",
    "caseSensitive",
    "className",
    "end",
    "style",
    "to",
    "viewTransition",
    "children",
  ],
  Ah = "6";
try {
  window.__reactRouterVersion = Ah;
} catch {}
const Bh = x.createContext({ isTransitioning: !1 }),
  Vh = "startTransition",
  zs = Rd[Vh];
function Wh(e) {
  let { basename: t, children: n, future: r, window: l } = e,
    i = x.useRef();
  i.current == null && (i.current = Wp({ window: l, v5Compat: !0 }));
  let o = i.current,
    [u, a] = x.useState({ action: o.action, location: o.location }),
    { v7_startTransition: d } = r || {},
    h = x.useCallback(
      (m) => {
        d && zs ? zs(() => a(m)) : a(m);
      },
      [a, d],
    );
  return (
    x.useLayoutEffect(() => o.listen(h), [o, h]),
    x.useEffect(() => Oh(r), [r]),
    x.createElement(Ih, {
      basename: t,
      children: n,
      location: u.location,
      navigationType: u.action,
      navigator: o,
      future: r,
    })
  );
}
const Qh =
    typeof window < "u" &&
    typeof window.document < "u" &&
    typeof window.document.createElement < "u",
  Hh = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  ue = x.forwardRef(function (t, n) {
    let {
        onClick: r,
        relative: l,
        reloadDocument: i,
        replace: o,
        state: u,
        target: a,
        to: d,
        preventScrollReset: h,
        viewTransition: m,
      } = t,
      v = od(t, Uh),
      { basename: w } = x.useContext(lt),
      S,
      g = !1;
    if (typeof d == "string" && Hh.test(d) && ((S = d), Qh))
      try {
        let p = new URL(window.location.href),
          y = d.startsWith("//") ? new URL(p.protocol + d) : new URL(d),
          C = xn(y.pathname, w);
        y.origin === p.origin && C != null
          ? (d = C + y.search + y.hash)
          : (g = !0);
      } catch {}
    let E = hh(d, { relative: l }),
      c = Yh(d, {
        replace: o,
        state: u,
        target: a,
        preventScrollReset: h,
        relative: l,
        viewTransition: m,
      });
    function f(p) {
      (r && r(p), p.defaultPrevented || c(p));
    }
    return x.createElement(
      "a",
      jl({}, v, { href: S || E, onClick: g || i ? r : f, ref: n, target: a }),
    );
  }),
  Mn = x.forwardRef(function (t, n) {
    let {
        "aria-current": r = "page",
        caseSensitive: l = !1,
        className: i = "",
        end: o = !1,
        style: u,
        to: a,
        viewTransition: d,
        children: h,
      } = t,
      m = od(t, $h),
      v = Ql(a, { relative: m.relative }),
      w = _t(),
      S = x.useContext(bc),
      { navigator: g, basename: E } = x.useContext(lt),
      c = S != null && Xh(v) && d === !0,
      f = g.encodeLocation ? g.encodeLocation(v).pathname : v.pathname,
      p = w.pathname,
      y =
        S && S.navigation && S.navigation.location
          ? S.navigation.location.pathname
          : null;
    (l ||
      ((p = p.toLowerCase()),
      (y = y ? y.toLowerCase() : null),
      (f = f.toLowerCase())),
      y && E && (y = xn(y, E) || y));
    const C = f !== "/" && f.endsWith("/") ? f.length - 1 : f.length;
    let P = p === f || (!o && p.startsWith(f) && p.charAt(C) === "/"),
      _ =
        y != null &&
        (y === f || (!o && y.startsWith(f) && y.charAt(f.length) === "/")),
      L = { isActive: P, isPending: _, isTransitioning: c },
      A = P ? r : void 0,
      T;
    typeof i == "function"
      ? (T = i(L))
      : (T = [
          i,
          P ? "active" : null,
          _ ? "pending" : null,
          c ? "transitioning" : null,
        ]
          .filter(Boolean)
          .join(" "));
    let we = typeof u == "function" ? u(L) : u;
    return x.createElement(
      ue,
      jl({}, m, {
        "aria-current": A,
        className: T,
        ref: n,
        style: we,
        to: a,
        viewTransition: d,
      }),
      typeof h == "function" ? h(L) : h,
    );
  });
var xo;
(function (e) {
  ((e.UseScrollRestoration = "useScrollRestoration"),
    (e.UseSubmit = "useSubmit"),
    (e.UseSubmitFetcher = "useSubmitFetcher"),
    (e.UseFetcher = "useFetcher"),
    (e.useViewTransitionState = "useViewTransitionState"));
})(xo || (xo = {}));
var Is;
(function (e) {
  ((e.UseFetcher = "useFetcher"),
    (e.UseFetchers = "useFetchers"),
    (e.UseScrollRestoration = "useScrollRestoration"));
})(Is || (Is = {}));
function Kh(e) {
  let t = x.useContext(Vl);
  return (t || W(!1), t);
}
function Yh(e, t) {
  let {
      target: n,
      replace: r,
      state: l,
      preventScrollReset: i,
      relative: o,
      viewTransition: u,
    } = t === void 0 ? {} : t,
    a = Sr(),
    d = _t(),
    h = Ql(e, { relative: o });
  return x.useCallback(
    (m) => {
      if (Fh(m, n)) {
        m.preventDefault();
        let v = r !== void 0 ? r : El(d) === El(h);
        a(e, {
          replace: v,
          state: l,
          preventScrollReset: i,
          relative: o,
          viewTransition: u,
        });
      }
    },
    [d, a, h, r, l, n, e, i, o, u],
  );
}
function Xh(e, t) {
  t === void 0 && (t = {});
  let n = x.useContext(Bh);
  n == null && W(!1);
  let { basename: r } = Kh(xo.useViewTransitionState),
    l = Ql(e, { relative: t.relative });
  if (!n.isTransitioning) return !1;
  let i = xn(n.currentLocation.pathname, r) || n.currentLocation.pathname,
    o = xn(n.nextLocation.pathname, r) || n.nextLocation.pathname;
  return go(l.pathname, o) != null || go(l.pathname, i) != null;
}
var ud,
  Ds = Vp;
((ud = Ds.createRoot), Ds.hydrateRoot);
const Gh = "/api/v1";
async function Y(e, t = {}) {
  const n = localStorage.getItem("ecom-token"),
    r = await fetch(`${Gh}${e}`, {
      ...t,
      headers: {
        Accept: "application/json",
        ...(t.body ? { "Content-Type": "application/json" } : {}),
        ...(n ? { Authorization: `Bearer ${n}` } : {}),
        ...t.headers,
      },
    });
  if (r.status === 204) return null;
  const l = await r.json().catch(() => ({}));
  if (!r.ok) {
    const i = new Error(l.message || "Unable to complete that request.");
    throw ((i.status = r.status), i);
  }
  return l;
}
const Ms = {
    login: (e) => Y("/auth/login", { method: "POST", body: JSON.stringify(e) }),
    register: (e) =>
      Y("/auth/register", { method: "POST", body: JSON.stringify(e) }),
  },
  sd = x.createContext(null),
  jn = () => x.useContext(sd);
function Jh({ children: e }) {
  const [t, n] = x.useState(() =>
      JSON.parse(localStorage.getItem("ecom-user") || "null"),
    ),
    r = (l) => (
      localStorage.setItem("ecom-token", l.token),
      localStorage.setItem("ecom-user", JSON.stringify(l)),
      n(l),
      l
    );
  return s.jsx(sd.Provider, {
    value: {
      user: t,
      login: async (l) => r(await Ms.login(l)),
      register: async (l) => r(await Ms.register(l)),
      logout: () => {
        (localStorage.removeItem("ecom-token"),
          localStorage.removeItem("ecom-user"),
          n(null));
      },
    },
    children: e,
  });
}
function Zh() {
  const { user: e, logout: t } = jn(),
    n = Sr();
  return s.jsxs(s.Fragment, {
    children: [
      s.jsxs("header", {
        className: "topbar",
        children: [
          s.jsxs(ue, {
            to: "/",
            className: "logo",
            children: ["NOVA", s.jsx("span", { children: "store" })],
          }),
          s.jsxs("nav", {
            children: [
              s.jsx(Mn, { to: "/products", children: "Shop" }),
              e && s.jsx(Mn, { to: "/cart", children: "Cart" }),
              e && s.jsx(Mn, { to: "/orders", children: "My orders" }),
              (e == null ? void 0 : e.role) === "SELLER" &&
                s.jsx(Mn, {
                  to: "/seller/catalog",
                  children: "Seller workspace",
                }),
              (e == null ? void 0 : e.role) === "ADMIN" &&
                s.jsx(Mn, {
                  to: "/admin/catalog",
                  children: "Admin catalogue",
                }),
            ],
          }),
          s.jsx("div", {
            children: e
              ? s.jsxs(s.Fragment, {
                  children: [
                    s.jsx("span", { className: "role", children: e.role }),
                    s.jsx("button", {
                      className: "text-button",
                      onClick: () => {
                        (t(), n("/"));
                      },
                      children: "Sign out",
                    }),
                  ],
                })
              : s.jsxs(s.Fragment, {
                  children: [
                    s.jsx(ue, {
                      className: "text-button",
                      to: "/login",
                      children: "Sign in",
                    }),
                    s.jsx(ue, {
                      className: "button small",
                      to: "/register",
                      children: "Create account",
                    }),
                  ],
                }),
          }),
        ],
      }),
      s.jsx("main", { className: "shell", children: s.jsx(zh, {}) }),
    ],
  });
}
function Fn({ children: e, role: t }) {
  const { user: n } = jn(),
    r = _t();
  return n
    ? t && n.role !== t
      ? s.jsx(Cl, { to: "/access-denied", replace: !0 })
      : e
    : s.jsx(Cl, { to: "/login", replace: !0, state: { from: r.pathname } });
}
const Ht = () => s.jsx("div", { className: "state", children: "Loading…" }),
  vu = ({ children: e }) => s.jsx("div", { className: "state", children: e }),
  ze = ({ error: e }) =>
    e ? s.jsx("p", { className: "error", role: "alert", children: e }) : null;
function ad({ eyebrow: e, title: t, children: n, footer: r }) {
  return s.jsxs("section", {
    className: "auth-layout",
    children: [
      s.jsxs("aside", {
        className: "auth-visual",
        children: [
          s.jsxs(ue, {
            to: "/products",
            className: "auth-logo",
            children: ["NOVA", s.jsx("span", { children: "store" })],
          }),
          s.jsxs("div", {
            children: [
              s.jsx("p", {
                className: "eyebrow",
                children: "DESIGNED FOR EVERYDAY",
              }),
              s.jsxs("h2", {
                children: [
                  "Good things,",
                  s.jsx("br", {}),
                  s.jsx("em", { children: "simply chosen." }),
                ],
              }),
              s.jsx("p", {
                children:
                  "A thoughtful collection, a seamless checkout, and a little more room for what matters.",
              }),
            ],
          }),
          s.jsx("small", { children: "EST. 2026 · EVERYDAY GOODS" }),
        ],
      }),
      s.jsx("div", {
        className: "auth-stage",
        children: s.jsxs("div", {
          className: "auth-card",
          children: [
            s.jsx("p", { className: "eyebrow", children: e }),
            s.jsx("h1", { children: t }),
            s.jsx("p", {
              className: "form-intro",
              children:
                "Use your Nova Store account to save your cart and follow your orders.",
            }),
            n,
            r && s.jsx("footer", { children: r }),
          ],
        }),
      }),
    ],
  });
}
function qh() {
  const { login: e } = jn(),
    t = Sr(),
    n = _t(),
    [r, l] = x.useState({ email: "", password: "" }),
    [i, o] = x.useState(""),
    [u, a] = x.useState(!1),
    d = async (h) => {
      var m;
      (h.preventDefault(), a(!0), o(""));
      try {
        const v = await e(r);
        t(
          ((m = n.state) == null ? void 0 : m.from) ||
            (v.role === "ADMIN"
              ? "/admin/catalog"
              : v.role === "SELLER"
                ? "/seller/catalog"
                : "/products"),
        );
      } catch (v) {
        o(v.message);
      } finally {
        a(!1);
      }
    };
  return s.jsx(ad, {
    eyebrow: "WELCOME BACK",
    title: "Sign in",
    footer: s.jsxs(s.Fragment, {
      children: [
        "New to Nova? ",
        s.jsx(ue, { to: "/register", children: "Create an account" }),
      ],
    }),
    children: s.jsxs("form", {
      onSubmit: d,
      children: [
        s.jsxs("label", {
          children: [
            "Email address",
            s.jsx("input", {
              type: "email",
              autoComplete: "email",
              placeholder: "you@example.com",
              required: !0,
              value: r.email,
              onChange: (h) => l({ ...r, email: h.target.value }),
            }),
          ],
        }),
        s.jsxs("label", {
          children: [
            "Password",
            s.jsx("input", {
              type: "password",
              autoComplete: "current-password",
              placeholder: "At least 8 characters",
              minLength: "8",
              required: !0,
              value: r.password,
              onChange: (h) => l({ ...r, password: h.target.value }),
            }),
          ],
        }),
        s.jsx(ze, { error: i }),
        s.jsxs("button", {
          className: "button auth-submit",
          disabled: u,
          children: [
            u ? "Signing you in…" : "Sign in to your account",
            " ",
            s.jsx("span", { children: "→" }),
          ],
        }),
      ],
    }),
  });
}
function bh() {
  const { register: e } = jn(),
    t = Sr(),
    [n, r] = x.useState({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirm: "",
      mobileNumber: "",
      role: "CUSTOMER",
    }),
    [l, i] = x.useState(""),
    [o, u] = x.useState(!1),
    a = (h, m) => r({ ...n, [h]: m }),
    d = async (h) => {
      if ((h.preventDefault(), n.password !== n.confirm))
        return i("Passwords do not match.");
      (u(!0), i(""));
      try {
        (await e({
          firstName: n.firstName,
          lastName: n.lastName,
          email: n.email,
          password: n.password,
          mobileNumber: n.mobileNumber,
          role: n.role,
        }),
          t("/products"));
      } catch (m) {
        i(m.message);
      } finally {
        u(!1);
      }
    };
  return s.jsx(ad, {
    eyebrow: "WELCOME TO NOVA",
    title: "Create your account",
    footer: s.jsxs(s.Fragment, {
      children: [
        "Already have an account? ",
        s.jsx(ue, { to: "/login", children: "Sign in" }),
      ],
    }),
    children: s.jsxs("form", {
      onSubmit: d,
      children: [
        s.jsxs("div", {
          className: "form-grid",
          children: [
            s.jsxs("label", {
              children: [
                "First name",
                s.jsx("input", {
                  autoComplete: "given-name",
                  placeholder: "Avery",
                  required: !0,
                  value: n.firstName,
                  onChange: (h) => a("firstName", h.target.value),
                }),
              ],
            }),
            s.jsxs("label", {
              children: [
                "Last name",
                s.jsx("input", {
                  autoComplete: "family-name",
                  placeholder: "Smith",
                  required: !0,
                  value: n.lastName,
                  onChange: (h) => a("lastName", h.target.value),
                }),
              ],
            }),
          ],
        }),
        s.jsxs("label", {
          children: [
            "Email address",
            s.jsx("input", {
              type: "email",
              autoComplete: "email",
              placeholder: "you@example.com",
              required: !0,
              value: n.email,
              onChange: (h) => a("email", h.target.value),
            }),
          ],
        }),
        s.jsxs("label", {
          children: [
            "Mobile number ",
            s.jsx("small", { children: "(optional)" }),
            s.jsx("input", {
              autoComplete: "tel",
              placeholder: "+91 98765 43210",
              value: n.mobileNumber,
              onChange: (h) => a("mobileNumber", h.target.value),
            }),
          ],
        }),
        s.jsxs("label", {
          children: [
            "Password",
            s.jsx("input", {
              type: "password",
              autoComplete: "new-password",
              placeholder: "At least 8 characters",
              minLength: "8",
              required: !0,
              value: n.password,
              onChange: (h) => a("password", h.target.value),
            }),
          ],
        }),
        s.jsxs("label", {
          children: [
            "Confirm password",
            s.jsx("input", {
              type: "password",
              autoComplete: "new-password",
              placeholder: "Repeat your password",
              required: !0,
              value: n.confirm,
              onChange: (h) => a("confirm", h.target.value),
            }),
          ],
        }),
        s.jsxs("label", {
          children: [
            "Account type",
            s.jsxs("select", {
              value: n.role,
              onChange: (h) => a("role", h.target.value),
              children: [
                s.jsx("option", {
                  value: "CUSTOMER",
                  children: "Customer - shop and place orders",
                }),
                s.jsx("option", {
                  value: "SELLER",
                  children: "Seller - list and manage your products",
                }),
              ],
            }),
          ],
        }),
        s.jsx(ze, { error: l }),
        s.jsxs("button", {
          className: "button auth-submit",
          disabled: o,
          children: [
            o ? "Creating your account…" : "Create your account",
            " ",
            s.jsx("span", { children: "→" }),
          ],
        }),
      ],
    }),
  });
}
const me = {
    products: (e) => Y(`/products?${new URLSearchParams(e)}`),
    product: (e) => Y(`/products/${e}`),
    categories: () => Y("/categories"),
    createCategory: (e) =>
      Y("/admin/categories", { method: "POST", body: JSON.stringify(e) }),
    createProduct: (e) =>
      Y("/admin/products", { method: "POST", body: JSON.stringify(e) }),
    updateProduct: (e, t) =>
      Y(`/admin/products/${e}`, { method: "PUT", body: JSON.stringify(t) }),
    deleteProduct: (e) => Y(`/admin/products/${e}`, { method: "DELETE" }),
    sellerProducts: () => Y("/seller/products?size=50"),
    createSellerProduct: (e) =>
      Y("/seller/products", { method: "POST", body: JSON.stringify(e) }),
    updateSellerProduct: (e, t) =>
      Y(`/seller/products/${e}`, { method: "PUT", body: JSON.stringify(t) }),
    deleteSellerProduct: (e) =>
      Y(`/seller/products/${e}`, { method: "DELETE" }),
  },
  pt = {
    cart: () => Y("/cart"),
    addItem: (e) =>
      Y("/cart/items", { method: "POST", body: JSON.stringify(e) }),
    updateItem: (e, t) =>
      Y(`/cart/items/${e}`, { method: "PUT", body: JSON.stringify(t) }),
    removeItem: (e) => Y(`/cart/items/${e}`, { method: "DELETE" }),
    clearCart: () => Y("/cart", { method: "DELETE" }),
    orders: () => Y("/orders"),
    order: (e) => Y(`/orders/${e}`),
    checkout: (e, t) =>
      Y("/orders", {
        method: "POST",
        headers: { "Idempotency-Key": t },
        body: JSON.stringify(e),
      }),
  },
  cd = (e) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(e);
function em() {
  const { user: e } = jn(),
    [t, n] = x.useState(null),
    [r, l] = x.useState(""),
    [i, o] = x.useState(""),
    [u, a] = x.useState([]),
    [d, h] = x.useState(""),
    [m, v] = x.useState(""),
    w = async (g = 0) => {
      try {
        (h(""),
          n(
            await me.products({
              page: g,
              size: 12,
              sort: "createdAt,desc",
              ...(r && { q: r }),
              ...(i && { category: i }),
            }),
          ));
      } catch (E) {
        h(E.message);
      }
    };
  x.useEffect(() => {
    (w(),
      me
        .categories()
        .then(a)
        .catch(() => {}));
  }, []);
  const S = async (g) => {
    if (!e) return v("Sign in to add products to your cart.");
    if (g.availableQuantity <= 0)
      return v(`${g.name} is currently out of stock.`);
    try {
      (await pt.addItem({ productId: g.id, quantity: 1 }), v("Added to cart."));
    } catch (E) {
      h(E.message);
    }
  };
  return s.jsxs(s.Fragment, {
    children: [
      s.jsxs("section", {
        className: "catalog-hero",
        children: [
          s.jsxs("div", {
            children: [
              s.jsx("p", {
                className: "eyebrow",
                children: "THE MODERN ESSENTIALS",
              }),
              s.jsxs("h1", {
                children: [
                  "Quietly excellent",
                  s.jsx("br", {}),
                  s.jsx("em", { children: "things." }),
                ],
              }),
              s.jsx("p", {
                children:
                  "Useful, lasting pieces for the rhythm of your everyday.",
              }),
            ],
          }),
          s.jsxs("div", {
            className: "catalog-mark",
            children: [
              "N",
              s.jsxs("span", {
                children: ["NEW", s.jsx("br", {}), "ARRIVALS"],
              }),
            ],
          }),
        ],
      }),
      s.jsxs("section", {
        className: "page-heading",
        children: [
          s.jsx("p", { className: "eyebrow", children: "SHOP THE COLLECTION" }),
          s.jsx("h2", { children: "Find your everyday." }),
          s.jsxs("form", {
            className: "filters",
            onSubmit: (g) => {
              (g.preventDefault(), w());
            },
            children: [
              s.jsx("input", {
                placeholder: "Search name or SKU",
                value: r,
                onChange: (g) => l(g.target.value),
              }),
              s.jsxs("select", {
                value: i,
                onChange: (g) => o(g.target.value),
                children: [
                  s.jsx("option", { value: "", children: "All categories" }),
                  u.map((g) =>
                    s.jsx("option", { value: g.name, children: g.name }, g.id),
                  ),
                ],
              }),
              s.jsx("button", { children: "Search" }),
            ],
          }),
        ],
      }),
      s.jsx(ze, { error: d }),
      m && s.jsx("p", { className: "notice", children: m }),
      t
        ? t.content.length === 0
          ? s.jsx(vu, { children: "No products found." })
          : s.jsxs(s.Fragment, {
              children: [
                s.jsx("div", {
                  className: "grid",
                  children: t.content.map((g) =>
                    s.jsxs(
                      "article",
                      {
                        className: "product",
                        children: [
                          s.jsxs(ue, {
                            to: `/products/${g.id}`,
                            className: "tile",
                            children: [
                              s.jsx("span", { children: g.category }),
                              s.jsx("b", { children: g.name[0] }),
                            ],
                          }),
                          s.jsx("small", { children: g.category }),
                          s.jsx("h3", { children: g.name }),
                          s.jsx("p", {
                            children:
                              g.description || "A considered essential.",
                          }),
                          s.jsx("small", {
                            className:
                              g.availableQuantity > 0
                                ? "stock-label"
                                : "stock-label out-of-stock",
                            children:
                              g.availableQuantity > 0
                                ? `${g.availableQuantity} available`
                                : "Out of stock",
                          }),
                          s.jsxs("div", {
                            className: "product-bottom",
                            children: [
                              s.jsx("b", { children: cd(g.price) }),
                              s.jsx("button", {
                                type: "button",
                                disabled: g.availableQuantity <= 0,
                                onClick: () => S(g),
                                children:
                                  g.availableQuantity > 0
                                    ? "Add +"
                                    : "Unavailable",
                              }),
                            ],
                          }),
                        ],
                      },
                      g.id,
                    ),
                  ),
                }),
                s.jsxs("div", {
                  className: "pagination",
                  children: [
                    s.jsx("button", {
                      disabled: t.first,
                      onClick: () => w(t.number - 1),
                      children: "Previous",
                    }),
                    s.jsxs("span", {
                      children: [
                        "Page ",
                        t.number + 1,
                        " of ",
                        t.totalPages || 1,
                      ],
                    }),
                    s.jsx("button", {
                      disabled: t.last,
                      onClick: () => w(t.number + 1),
                      children: "Next",
                    }),
                  ],
                }),
              ],
            })
        : s.jsx(Ht, {}),
    ],
  });
}
function tm() {
  const { id: e } = nd(),
    { user: t } = jn(),
    [n, r] = x.useState(null),
    [l, i] = x.useState(""),
    [o, u] = x.useState("");
  return (
    x.useEffect(() => {
      me.product(e)
        .then(r)
        .catch((a) => i(a.message));
    }, [e]),
    l
      ? s.jsxs("section", {
          className: "state",
          children: [
            s.jsx(ze, { error: l }),
            s.jsx(ue, { to: "/products", children: "Back to shop" }),
          ],
        })
      : n
        ? s.jsxs("section", {
            className: "detail",
            children: [
              s.jsx("div", { className: "detail-art", children: n.name[0] }),
              s.jsxs("div", {
                children: [
                  s.jsx("p", { className: "eyebrow", children: n.category }),
                  s.jsx("h1", { children: n.name }),
                  s.jsx("h2", { children: cd(n.price) }),
                  s.jsx("p", {
                    children:
                      n.description || "A considered essential for daily life.",
                  }),
                  s.jsxs("p", {
                    className: "muted",
                    children: ["SKU: ", n.sku],
                  }),
                  s.jsx("p", {
                    className:
                      n.availableQuantity > 0
                        ? "stock-label"
                        : "stock-label out-of-stock",
                    children:
                      n.availableQuantity > 0
                        ? `${n.availableQuantity} available`
                        : "Out of stock",
                  }),
                  s.jsx("button", {
                    className: "button",
                    disabled: n.availableQuantity <= 0,
                    onClick: async () => {
                      if (!t) return u("Sign in to add this product.");
                      try {
                        (await pt.addItem({ productId: n.id, quantity: 1 }),
                          u("Added to cart."));
                      } catch (a) {
                        i(a.message);
                      }
                    },
                    children:
                      n.availableQuantity > 0 ? "Add to cart" : "Out of stock",
                  }),
                  o && s.jsx("p", { className: "notice", children: o }),
                ],
              }),
            ],
          })
        : s.jsx(Ht, {})
  );
}
const Ue = (e) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(
    e,
  );
function nm() {
  const [e, t] = x.useState(null),
    [n, r] = x.useState(""),
    [l, i] = x.useState(""),
    [o, u] = x.useState(!1),
    [a, d] = x.useState(!0),
    [h, m] = x.useState(!1),
    [v, w] = x.useState(null),
    S = () => {
      (d(!0),
        r(""),
        pt
          .cart()
          .then(t)
          .catch((c) => r(c.message))
          .finally(() => d(!1)));
    };
  x.useEffect(S, []);
  const g = async (c, f) => {
      try {
        (f < 1
          ? await pt.removeItem(c.productId)
          : await pt.updateItem(c.productId, {
              productId: c.productId,
              quantity: f,
            }),
          S());
      } catch (p) {
        r(p.message);
      }
    },
    E = async () => {
      (m(!1), u(!0));
      try {
        const c = await pt.checkout(
          { paymentMethod: "UPI", shippingAddress: "Customer address" },
          crypto.randomUUID(),
        );
        (i(`Order ${c.orderNumber} has been confirmed.`), w(c), S());
      } catch (c) {
        r(c.message);
      } finally {
        u(!1);
      }
    };
  return a && !e
    ? s.jsx(Ht, {})
    : e
      ? s.jsxs(s.Fragment, {
          children: [
            s.jsxs("section", {
              className: "narrow",
              children: [
                s.jsx("p", { className: "eyebrow", children: "YOUR BAG" }),
                s.jsx("h1", { children: "Cart" }),
                s.jsx(ze, { error: n }),
                l && s.jsx("p", { className: "notice", children: l }),
                e.items.length
                  ? s.jsxs(s.Fragment, {
                      children: [
                        s.jsx("div", {
                          className: "cart-list",
                          children: e.items.map((c) =>
                            s.jsxs(
                              "div",
                              {
                                className: "cart-row",
                                children: [
                                  s.jsx("div", {
                                    className: "thumb",
                                    children: c.name[0],
                                  }),
                                  s.jsxs("div", {
                                    children: [
                                      s.jsx("h3", { children: c.name }),
                                      s.jsx("p", { children: Ue(c.unitPrice) }),
                                      s.jsxs("div", {
                                        className: "stepper",
                                        children: [
                                          s.jsx("button", {
                                            onClick: () => g(c, c.quantity - 1),
                                            children: "−",
                                          }),
                                          s.jsx("span", {
                                            children: c.quantity,
                                          }),
                                          s.jsx("button", {
                                            onClick: () => g(c, c.quantity + 1),
                                            children: "+",
                                          }),
                                        ],
                                      }),
                                    ],
                                  }),
                                  s.jsx("b", {
                                    children: Ue(c.unitPrice * c.quantity),
                                  }),
                                ],
                              },
                              c.productId,
                            ),
                          ),
                        }),
                        s.jsxs("div", {
                          className: "total",
                          children: [
                            s.jsx("span", { children: "Subtotal" }),
                            s.jsx("b", { children: Ue(e.subtotal) }),
                          ],
                        }),
                        s.jsx("button", {
                          className: "button",
                          disabled: o,
                          onClick: () => m(!0),
                          children: o
                            ? "Processing payment…"
                            : "Checkout with UPI",
                        }),
                      ],
                    })
                  : s.jsxs(vu, {
                      children: [
                        "Your cart is empty. ",
                        s.jsx(ue, {
                          to: "/products",
                          children: "Browse products",
                        }),
                        ".",
                      ],
                    }),
              ],
            }),
            h &&
              s.jsx("div", {
                className: "modal-backdrop",
                role: "presentation",
                children: s.jsxs("div", {
                  className: "checkout-modal",
                  role: "dialog",
                  "aria-modal": "true",
                  "aria-labelledby": "checkout-title",
                  children: [
                    s.jsx("p", {
                      className: "eyebrow",
                      children: "READY TO CHECK OUT?",
                    }),
                    s.jsx("h2", {
                      id: "checkout-title",
                      children: "Confirm your order",
                    }),
                    s.jsxs("p", {
                      children: [
                        "You are about to place ",
                        e.items.length,
                        " ",
                        e.items.length === 1 ? "item" : "items",
                        " for ",
                        s.jsx("b", { children: Ue(e.subtotal) }),
                        " using UPI.",
                      ],
                    }),
                    s.jsxs("div", {
                      className: "modal-actions",
                      children: [
                        s.jsx("button", {
                          className: "text-button",
                          onClick: () => m(!1),
                          children: "Review cart",
                        }),
                        s.jsx("button", {
                          className: "button",
                          onClick: E,
                          children: "Confirm and pay",
                        }),
                      ],
                    }),
                  ],
                }),
              }),
            v &&
              s.jsx("div", {
                className: "modal-backdrop",
                role: "presentation",
                children: s.jsxs("div", {
                  className: "checkout-modal success-modal",
                  role: "dialog",
                  "aria-modal": "true",
                  "aria-labelledby": "success-title",
                  children: [
                    s.jsx("p", {
                      className: "eyebrow",
                      children: "PAYMENT COMPLETE",
                    }),
                    s.jsx("h2", {
                      id: "success-title",
                      children: "Order confirmed",
                    }),
                    s.jsx("p", {
                      children: "Your order has been placed successfully.",
                    }),
                    s.jsx("strong", { children: Ue(v.total) }),
                    s.jsxs("div", {
                      className: "modal-actions",
                      children: [
                        s.jsx("button", {
                          className: "button",
                          onClick: () => w(null),
                          children: "Continue shopping",
                        }),
                        s.jsx(ue, {
                          className: "text-button",
                          to: "/orders",
                          onClick: () => w(null),
                          children: "View my orders",
                        }),
                      ],
                    }),
                  ],
                }),
              }),
          ],
        })
      : s.jsxs("section", {
          className: "state",
          children: [
            s.jsx(ze, { error: n || "Unable to load your cart." }),
            s.jsx(ue, { to: "/products", children: "Back to shop" }),
          ],
        });
}
function rm() {
  var o;
  const [e, t] = x.useState(null),
    [n, r] = x.useState(""),
    [l, i] = x.useState(!0);
  return (
    x.useEffect(() => {
      pt.orders()
        .then(t)
        .catch((u) => r(u.message))
        .finally(() => i(!1));
    }, []),
    l && !e
      ? s.jsx(Ht, {})
      : e
        ? s.jsxs("section", {
            children: [
              s.jsx("p", { className: "eyebrow", children: "ORDER HISTORY" }),
              s.jsx("h1", { children: "My orders" }),
              s.jsx(ze, { error: n }),
              (o = e.content) != null && o.length
                ? s.jsx("div", {
                    className: "order-list",
                    children: e.content.map((u) => {
                      var a, d;
                      return s.jsxs(
                        "article",
                        {
                          className: "order-card",
                          children: [
                            s.jsxs("div", {
                              className: "order-card-header",
                              children: [
                                s.jsxs("div", {
                                  children: [
                                    s.jsx("p", {
                                      className: "eyebrow",
                                      children: "ORDER SUMMARY",
                                    }),
                                    s.jsx("h2", {
                                      children:
                                        ((a = u.items) == null
                                          ? void 0
                                          : a
                                              .map((h) => h.productName)
                                              .join(", ")) ||
                                        "Your Nova Store order",
                                    }),
                                    s.jsxs("small", {
                                      children: ["Reference ", u.orderNumber],
                                    }),
                                  ],
                                }),
                                s.jsx(ue, {
                                  className: "text-button",
                                  to: `/orders/${u.id}`,
                                  children: "View details",
                                }),
                              ],
                            }),
                            s.jsx("div", {
                              className: "order-items",
                              children:
                                (d = u.items) == null
                                  ? void 0
                                  : d.map((h) =>
                                      s.jsxs(
                                        "div",
                                        {
                                          className: "order-item",
                                          children: [
                                            s.jsxs("span", {
                                              children: [
                                                s.jsx("b", {
                                                  children: h.productName,
                                                }),
                                                s.jsxs("small", {
                                                  children: [
                                                    h.quantity,
                                                    " × ",
                                                    Ue(h.unitPrice),
                                                  ],
                                                }),
                                              ],
                                            }),
                                            s.jsx("b", {
                                              children: Ue(h.totalPrice),
                                            }),
                                          ],
                                        },
                                        `${u.id}-${h.productName}`,
                                      ),
                                    ),
                            }),
                            s.jsxs("div", {
                              className: "order-card-footer",
                              children: [
                                s.jsx("span", {
                                  className: "badge",
                                  children: u.status,
                                }),
                                s.jsxs("span", {
                                  children: ["Payment: ", u.paymentStatus],
                                }),
                                s.jsxs("strong", {
                                  children: ["Total ", Ue(u.total)],
                                }),
                              ],
                            }),
                          ],
                        },
                        u.id,
                      );
                    }),
                  })
                : s.jsx(vu, { children: "You have not placed an order yet." }),
            ],
          })
        : s.jsxs("section", {
            className: "state",
            children: [
              s.jsx(ze, { error: n || "Unable to load your orders." }),
              s.jsx(ue, { to: "/products", children: "Back to shop" }),
            ],
          })
  );
}
function lm() {
  var i;
  const { id: e } = nd(),
    [t, n] = x.useState(null),
    [r, l] = x.useState("");
  return (
    x.useEffect(() => {
      pt.order(e)
        .then(n)
        .catch((o) => l(o.message));
    }, [e]),
    r
      ? s.jsxs("section", {
          className: "state",
          children: [
            s.jsx(ze, { error: r }),
            s.jsx(ue, { to: "/orders", children: "Back to orders" }),
          ],
        })
      : t
        ? s.jsxs("section", {
            className: "narrow",
            children: [
              s.jsx("p", { className: "eyebrow", children: "ORDER DETAILS" }),
              s.jsx(ze, { error: r }),
              s.jsx("div", {
                className: "order-items",
                children:
                  (i = t.items) == null
                    ? void 0
                    : i.map((o) =>
                        s.jsxs(
                          "div",
                          {
                            className: "order-item",
                            children: [
                              s.jsxs("span", {
                                children: [
                                  s.jsx("b", { children: o.productName }),
                                  s.jsxs("small", {
                                    children: [
                                      o.quantity,
                                      " × ",
                                      Ue(o.unitPrice),
                                    ],
                                  }),
                                ],
                              }),
                              s.jsx("b", { children: Ue(o.totalPrice) }),
                            ],
                          },
                          `${t.id}-${o.productName}`,
                        ),
                      ),
              }),
              s.jsxs("div", {
                className: "state",
                children: [
                  s.jsxs("p", {
                    children: ["Status: ", s.jsx("b", { children: t.status })],
                  }),
                  s.jsxs("p", {
                    children: [
                      "Payment: ",
                      s.jsx("b", { children: t.paymentStatus }),
                    ],
                  }),
                  s.jsxs("p", {
                    children: [
                      "Total: ",
                      s.jsx("b", { children: Ue(t.total) }),
                    ],
                  }),
                ],
              }),
              s.jsx(ue, { to: "/orders", children: "Back to orders" }),
            ],
          })
        : s.jsx(Ht, {})
  );
}
const Si = {
  sku: "",
  name: "",
  description: "",
  price: "",
  categoryId: "",
  availableQuantity: 0,
};
function im() {
  const [e, t] = x.useState(null),
    [n, r] = x.useState([]),
    [l, i] = x.useState(Si),
    [o, u] = x.useState({ name: "", description: "" }),
    [a, d] = x.useState(null),
    [h, m] = x.useState(""),
    [v, w] = x.useState(""),
    S = () => {
      (me
        .products({ page: 0, size: 50, sort: "createdAt,desc" })
        .then(t)
        .catch((p) => m(p.message)),
        me
          .categories()
          .then(r)
          .catch((p) => m(p.message)));
    };
  x.useEffect(S, []);
  const g = async (p) => {
      p.preventDefault();
      try {
        const y = {
          ...l,
          price: Number(l.price),
          categoryId: Number(l.categoryId),
          availableQuantity: Number(l.availableQuantity),
        };
        (a ? await me.updateProduct(a, y) : await me.createProduct(y),
          i(Si),
          d(null),
          w("Catalogue saved."),
          S());
      } catch (y) {
        m(y.message);
      }
    },
    E = async (p) => {
      p.preventDefault();
      try {
        (await me.createCategory({ ...o, status: "ACTIVE" }),
          u({ name: "", description: "" }),
          w("Category created."),
          S());
      } catch (y) {
        m(y.message);
      }
    },
    c = (p) => {
      var y;
      (d(p.id),
        i({
          sku: p.sku,
          name: p.name,
          description: p.description || "",
          price: p.price,
          categoryId:
            ((y = n.find((C) => C.name === p.category)) == null
              ? void 0
              : y.id) || "",
          availableQuantity: p.availableQuantity,
        }));
    },
    f = () => {
      (d(null), i(Si), m(""));
    };
  return e
    ? s.jsxs("section", {
        className: "admin",
        children: [
          s.jsx("p", { className: "eyebrow", children: "ADMIN" }),
          s.jsx("h1", { children: "Catalogue management" }),
          s.jsx(ze, { error: h }),
          v && s.jsx("p", { className: "notice", children: v }),
          s.jsxs("div", {
            className: "admin-grid",
            children: [
              s.jsxs("form", {
                className: "panel",
                onSubmit: g,
                children: [
                  s.jsx("h2", {
                    children: a ? "Edit product" : "Create product",
                  }),
                  s.jsxs("label", {
                    children: [
                      "SKU",
                      s.jsx("input", {
                        required: !0,
                        value: l.sku,
                        onChange: (p) => i({ ...l, sku: p.target.value }),
                      }),
                    ],
                  }),
                  s.jsxs("label", {
                    children: [
                      "Name",
                      s.jsx("input", {
                        required: !0,
                        value: l.name,
                        onChange: (p) => i({ ...l, name: p.target.value }),
                      }),
                    ],
                  }),
                  s.jsxs("label", {
                    children: [
                      "Description",
                      s.jsx("textarea", {
                        value: l.description,
                        onChange: (p) =>
                          i({ ...l, description: p.target.value }),
                      }),
                    ],
                  }),
                  s.jsxs("label", {
                    children: [
                      "Price",
                      s.jsx("input", {
                        type: "number",
                        min: "0.01",
                        step: "0.01",
                        required: !0,
                        value: l.price,
                        onChange: (p) => i({ ...l, price: p.target.value }),
                      }),
                    ],
                  }),
                  s.jsxs("label", {
                    children: [
                      "Category",
                      s.jsxs("select", {
                        required: !0,
                        value: l.categoryId,
                        onChange: (p) =>
                          i({ ...l, categoryId: p.target.value }),
                        children: [
                          s.jsx("option", {
                            value: "",
                            children: "Select category",
                          }),
                          n.map((p) =>
                            s.jsx(
                              "option",
                              { value: p.id, children: p.name },
                              p.id,
                            ),
                          ),
                        ],
                      }),
                    ],
                  }),
                  s.jsxs("label", {
                    children: [
                      "Available stock",
                      s.jsx("input", {
                        type: "number",
                        min: "0",
                        step: "1",
                        required: !0,
                        value: l.availableQuantity,
                        onChange: (p) =>
                          i({ ...l, availableQuantity: p.target.value }),
                      }),
                    ],
                  }),
                  s.jsxs("div", {
                    className: "form-actions",
                    children: [
                      s.jsx("button", {
                        className: "button",
                        children: a ? "Update product" : "Create product",
                      }),
                      a &&
                        s.jsx("button", {
                          type: "button",
                          className: "text-button",
                          onClick: f,
                          children: "Cancel edit",
                        }),
                    ],
                  }),
                ],
              }),
              s.jsxs("form", {
                className: "panel",
                onSubmit: E,
                children: [
                  s.jsx("h2", { children: "Create category" }),
                  s.jsxs("label", {
                    children: [
                      "Name",
                      s.jsx("input", {
                        required: !0,
                        value: o.name,
                        onChange: (p) => u({ ...o, name: p.target.value }),
                      }),
                    ],
                  }),
                  s.jsxs("label", {
                    children: [
                      "Description",
                      s.jsx("textarea", {
                        value: o.description,
                        onChange: (p) =>
                          u({ ...o, description: p.target.value }),
                      }),
                    ],
                  }),
                  s.jsx("div", {
                    className: "form-actions",
                    children: s.jsx("button", {
                      className: "button",
                      children: "Create category",
                    }),
                  }),
                ],
              }),
            ],
          }),
          s.jsx("div", {
            className: "table",
            children: e.content.map((p) =>
              s.jsxs(
                "div",
                {
                  children: [
                    s.jsx("b", { children: p.name }),
                    s.jsx("span", { children: p.sku }),
                    s.jsx("span", { children: p.status }),
                    s.jsx("button", { onClick: () => c(p), children: "Edit" }),
                    s.jsx("button", {
                      className: "danger",
                      onClick: async () => {
                        if (confirm(`Delete ${p.name}?`))
                          try {
                            (await me.deleteProduct(p.id),
                              t(
                                (y) =>
                                  y && {
                                    ...y,
                                    content: y.content.filter(
                                      (C) => C.id !== p.id,
                                    ),
                                    totalElements: Math.max(
                                      0,
                                      y.totalElements - 1,
                                    ),
                                  },
                              ),
                              w("Product deleted."),
                              S());
                          } catch (y) {
                            m(y.message);
                          }
                      },
                      children: "Delete",
                    }),
                  ],
                },
                p.id,
              ),
            ),
          }),
        ],
      })
    : s.jsx(Ht, {});
}
const ki = {
  sku: "",
  name: "",
  description: "",
  price: "",
  categoryId: "",
  availableQuantity: 0,
};
function om() {
  const [e, t] = x.useState(null),
    [n, r] = x.useState([]),
    [l, i] = x.useState(ki),
    [o, u] = x.useState(null),
    [a, d] = x.useState(""),
    [h, m] = x.useState(""),
    v = () => {
      (d(""),
        me
          .sellerProducts()
          .then(t)
          .catch((c) => d(c.message)),
        me
          .categories()
          .then(r)
          .catch((c) => d(c.message)));
    };
  x.useEffect(v, []);
  const w = (c, f) => i({ ...l, [c]: f }),
    S = async (c) => {
      c.preventDefault();
      try {
        const f = {
          ...l,
          price: Number(l.price),
          categoryId: Number(l.categoryId),
          availableQuantity: Number(l.availableQuantity),
        };
        (o
          ? await me.updateSellerProduct(o, f)
          : await me.createSellerProduct(f),
          i(ki),
          u(null),
          m("Product saved and published to the shop."),
          v());
      } catch (f) {
        d(f.message);
      }
    },
    g = (c) => {
      var f;
      (u(c.id),
        i({
          sku: c.sku,
          name: c.name,
          description: c.description || "",
          price: c.price,
          categoryId:
            ((f = n.find((p) => p.name === c.category)) == null
              ? void 0
              : f.id) || "",
          availableQuantity: c.availableQuantity,
        }),
        m(""));
    },
    E = async (c) => {
      if (confirm(`Delete ${c.name}?`))
        try {
          (await me.deleteSellerProduct(c.id),
            t(
              (f) =>
                f && {
                  ...f,
                  content: f.content.filter((p) => p.id !== c.id),
                  totalElements: Math.max(0, f.totalElements - 1),
                },
            ),
            m("Product deleted."),
            v());
        } catch (f) {
          d(f.message);
        }
    };
  return e
    ? s.jsxs("section", {
        className: "admin",
        children: [
          s.jsx("p", { className: "eyebrow", children: "SELLER" }),
          s.jsx("h1", { children: "Your product catalogue" }),
          s.jsx("p", {
            className: "form-intro",
            children:
              "Create listings, set prices, and keep your available stock current.",
          }),
          s.jsx(ze, { error: a }),
          h && s.jsx("p", { className: "notice", children: h }),
          s.jsx("div", {
            className: "admin-grid",
            children: s.jsxs("form", {
              className: "panel",
              onSubmit: S,
              children: [
                s.jsx("h2", {
                  children: o ? "Edit product" : "List a product",
                }),
                s.jsxs("label", {
                  children: [
                    "SKU",
                    s.jsx("input", {
                      required: !0,
                      value: l.sku,
                      onChange: (c) => w("sku", c.target.value),
                    }),
                  ],
                }),
                s.jsxs("label", {
                  children: [
                    "Name",
                    s.jsx("input", {
                      required: !0,
                      value: l.name,
                      onChange: (c) => w("name", c.target.value),
                    }),
                  ],
                }),
                s.jsxs("label", {
                  children: [
                    "Description",
                    s.jsx("textarea", {
                      value: l.description,
                      onChange: (c) => w("description", c.target.value),
                    }),
                  ],
                }),
                s.jsxs("label", {
                  children: [
                    "Price",
                    s.jsx("input", {
                      type: "number",
                      min: "0.01",
                      step: "0.01",
                      required: !0,
                      value: l.price,
                      onChange: (c) => w("price", c.target.value),
                    }),
                  ],
                }),
                s.jsxs("label", {
                  children: [
                    "Available stock",
                    s.jsx("input", {
                      type: "number",
                      min: "0",
                      step: "1",
                      required: !0,
                      value: l.availableQuantity,
                      onChange: (c) => w("availableQuantity", c.target.value),
                    }),
                  ],
                }),
                s.jsxs("label", {
                  children: [
                    "Category",
                    s.jsxs("select", {
                      required: !0,
                      value: l.categoryId,
                      onChange: (c) => w("categoryId", c.target.value),
                      children: [
                        s.jsx("option", {
                          value: "",
                          children: "Select category",
                        }),
                        n.map((c) =>
                          s.jsx(
                            "option",
                            { value: c.id, children: c.name },
                            c.id,
                          ),
                        ),
                      ],
                    }),
                  ],
                }),
                s.jsxs("div", {
                  className: "form-actions",
                  children: [
                    s.jsx("button", {
                      className: "button",
                      children: o ? "Update product" : "Publish product",
                    }),
                    o &&
                      s.jsx("button", {
                        type: "button",
                        className: "text-button",
                        onClick: () => {
                          (u(null), i(ki), m(""));
                        },
                        children: "Cancel edit",
                      }),
                  ],
                }),
              ],
            }),
          }),
          s.jsxs("div", {
            className: "table",
            children: [
              e.content.length === 0 &&
                s.jsx("p", {
                  className: "muted",
                  children: "You have not listed any products yet.",
                }),
              e.content.map((c) =>
                s.jsxs(
                  "div",
                  {
                    children: [
                      s.jsx("b", { children: c.name }),
                      s.jsx("span", { children: c.sku }),
                      s.jsxs("span", {
                        children: [c.availableQuantity, " in stock"],
                      }),
                      s.jsx("button", {
                        onClick: () => g(c),
                        children: "Edit",
                      }),
                      s.jsx("button", {
                        className: "danger",
                        onClick: () => E(c),
                        children: "Delete",
                      }),
                    ],
                  },
                  c.id,
                ),
              ),
            ],
          }),
        ],
      })
    : s.jsx(Ht, {});
}
const um = () =>
  s.jsxs("section", {
    className: "state",
    children: [
      s.jsx("h1", { children: "Access denied" }),
      s.jsx("p", {
        children: "Your account does not have permission for that screen.",
      }),
    ],
  });
ud(document.getElementById("root")).render(
  s.jsx(Wh, {
    children: s.jsx(Jh, {
      children: s.jsx(Dh, {
        children: s.jsxs(pe, {
          element: s.jsx(Zh, {}),
          children: [
            s.jsx(pe, {
              index: !0,
              element: s.jsx(Cl, { to: "/products", replace: !0 }),
            }),
            s.jsx(pe, { path: "products", element: s.jsx(em, {}) }),
            s.jsx(pe, { path: "products/:id", element: s.jsx(tm, {}) }),
            s.jsx(pe, { path: "login", element: s.jsx(qh, {}) }),
            s.jsx(pe, { path: "register", element: s.jsx(bh, {}) }),
            s.jsx(pe, {
              path: "cart",
              element: s.jsx(Fn, { children: s.jsx(nm, {}) }),
            }),
            s.jsx(pe, {
              path: "orders",
              element: s.jsx(Fn, { children: s.jsx(rm, {}) }),
            }),
            s.jsx(pe, {
              path: "orders/:id",
              element: s.jsx(Fn, { children: s.jsx(lm, {}) }),
            }),
            s.jsx(pe, {
              path: "admin/catalog",
              element: s.jsx(Fn, { role: "ADMIN", children: s.jsx(im, {}) }),
            }),
            s.jsx(pe, {
              path: "seller/catalog",
              element: s.jsx(Fn, { role: "SELLER", children: s.jsx(om, {}) }),
            }),
            s.jsx(pe, { path: "access-denied", element: s.jsx(um, {}) }),
            s.jsx(pe, {
              path: "*",
              element: s.jsx(Cl, { to: "/products", replace: !0 }),
            }),
          ],
        }),
      }),
    }),
  }),
);
