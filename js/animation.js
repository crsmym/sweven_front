try {
  // IntersectionObserver Polyfill https://github.com/w3c/IntersectionObserver/tree/gh-pages
  (function (h, g) {
    function m(a) { this.time = a.time; this.target = a.target; this.rootBounds = a.rootBounds; this.boundingClientRect = a.boundingClientRect; this.intersectionRect = a.intersectionRect || l(); this.isIntersecting = !!a.intersectionRect; a = this.boundingClientRect; a = a.width * a.height; var b = this.intersectionRect; b = b.width * b.height; this.intersectionRatio = a ? b / a : this.isIntersecting ? 1 : 0 } function d(a, b) {
      var c = b || {}; if ("function" != typeof a) throw Error("callback must be a function"); if (c.root && 1 != c.root.nodeType) throw Error("root must be an Element");
      this._checkForIntersections = u(this._checkForIntersections.bind(this), this.THROTTLE_TIMEOUT); this._callback = a; this._observationTargets = []; this._queuedEntries = []; this._rootMarginValues = this._parseRootMargin(c.rootMargin); this.thresholds = this._initThresholds(c.threshold); this.root = c.root || null; this.rootMargin = this._rootMarginValues.map(function (a) { return a.value + a.unit }).join(" ")
    } function u(a, b) { var c = null; return function () { c || (c = setTimeout(function () { a(); c = null }, b)) } } function n(a, b, c, e) {
      "function" ==
      typeof a.addEventListener ? a.addEventListener(b, c, e || !1) : "function" == typeof a.attachEvent && a.attachEvent("on" + b, c)
    } function r(a, b, c, e) { "function" == typeof a.removeEventListener ? a.removeEventListener(b, c, e || !1) : "function" == typeof a.detatchEvent && a.detatchEvent("on" + b, c) } function p(a) { try { var b = a.getBoundingClientRect() } catch (c) { } if (!b) return l(); b.width && b.height || (b = { top: b.top, right: b.right, bottom: b.bottom, left: b.left, width: b.right - b.left, height: b.bottom - b.top }); return b } function l() {
      return {
        top: 0, bottom: 0,
        left: 0, right: 0, width: 0, height: 0
      }
    } function t(a, b) { for (var c = b; c;) { if (c == a) return !0; c = q(c) } return !1 } function q(a) { return (a = a.parentNode) && 11 == a.nodeType && a.host ? a.host : a } if ("IntersectionObserver" in h && "IntersectionObserverEntry" in h && "intersectionRatio" in h.IntersectionObserverEntry.prototype) "isIntersecting" in h.IntersectionObserverEntry.prototype || Object.defineProperty(h.IntersectionObserverEntry.prototype, "isIntersecting", { get: function () { return 0 < this.intersectionRatio } }); else {
      var k = []; d.prototype.THROTTLE_TIMEOUT =
        16; d.prototype.POLL_INTERVAL = null; d.prototype.observe = function (a) { if (!this._observationTargets.some(function (b) { return b.element == a })) { if (!a || 1 != a.nodeType) throw Error("target must be an Element"); this._registerInstance(); this._observationTargets.push({ element: a, entry: null }); this._monitorIntersections(); this._checkForIntersections() } }; d.prototype.unobserve = function (a) {
        this._observationTargets = this._observationTargets.filter(function (b) { return b.element != a }); this._observationTargets.length || (this._unmonitorIntersections(),
          this._unregisterInstance())
        }; d.prototype.disconnect = function () { this._observationTargets = []; this._unmonitorIntersections(); this._unregisterInstance() }; d.prototype.takeRecords = function () { var a = this._queuedEntries.slice(); this._queuedEntries = []; return a }; d.prototype._initThresholds = function (a) { a = a || [0]; Array.isArray(a) || (a = [a]); return a.sort().filter(function (a, c, e) { if ("number" != typeof a || isNaN(a) || 0 > a || 1 < a) throw Error("threshold must be a number between 0 and 1 inclusively"); return a !== e[c - 1] }) }; d.prototype._parseRootMargin =
          function (a) { a = (a || "0px").split(/\s+/).map(function (a) { a = /^(-?\d*\.?\d+)(px|%)$/.exec(a); if (!a) throw Error("rootMargin must be specified in pixels or percent"); return { value: parseFloat(a[1]), unit: a[2] } }); a[1] = a[1] || a[0]; a[2] = a[2] || a[0]; a[3] = a[3] || a[1]; return a }; d.prototype._monitorIntersections = function () {
          this._monitoringIntersections || (this._monitoringIntersections = !0, this.POLL_INTERVAL ? this._monitoringInterval = setInterval(this._checkForIntersections, this.POLL_INTERVAL) : (n(h, "resize", this._checkForIntersections,
            !0), n(g, "scroll", this._checkForIntersections, !0), "MutationObserver" in h && (this._domObserver = new MutationObserver(this._checkForIntersections), this._domObserver.observe(g, { attributes: !0, childList: !0, characterData: !0, subtree: !0 }))))
          }; d.prototype._unmonitorIntersections = function () {
          this._monitoringIntersections && (this._monitoringIntersections = !1, clearInterval(this._monitoringInterval), this._monitoringInterval = null, r(h, "resize", this._checkForIntersections, !0), r(g, "scroll", this._checkForIntersections, !0),
            this._domObserver && (this._domObserver.disconnect(), this._domObserver = null))
          }; d.prototype._checkForIntersections = function () {
            var a = this._rootIsInDom(), b = a ? this._getRootRect() : l(); this._observationTargets.forEach(function (c) {
              var e = c.element, d = p(e), f = this._rootContainsTarget(e), g = c.entry, k = a && f && this._computeTargetAndRootIntersection(e, b); c = c.entry = new m({ time: h.performance && performance.now && performance.now(), target: e, boundingClientRect: d, rootBounds: b, intersectionRect: k }); g ? a && f ? this._hasCrossedThreshold(g,
                c) && this._queuedEntries.push(c) : g && g.isIntersecting && this._queuedEntries.push(c) : this._queuedEntries.push(c)
            }, this); this._queuedEntries.length && this._callback(this.takeRecords(), this)
          }; d.prototype._computeTargetAndRootIntersection = function (a, b) {
            if ("none" != h.getComputedStyle(a).display) {
              for (var c = p(a), e = q(a), d = !1; !d;) {
                var f = null, k = 1 == e.nodeType ? h.getComputedStyle(e) : {}; if ("none" == k.display) return; e == this.root || e == g ? (d = !0, f = b) : e != g.body && e != g.documentElement && "visible" != k.overflow && (f = p(e)); if (f) {
                  k =
                  Math.max(f.top, c.top); var l = Math.min(f.bottom, c.bottom), m = Math.max(f.left, c.left); c = Math.min(f.right, c.right); f = c - m; var n = l - k; c = 0 <= f && 0 <= n && { top: k, bottom: l, left: m, right: c, width: f, height: n }; if (!c) break
                } e = q(e)
              } return c
            }
          }; d.prototype._getRootRect = function () { if (this.root) var a = p(this.root); else { a = g.documentElement; var b = g.body; a = { top: 0, left: 0, right: a.clientWidth || b.clientWidth, width: a.clientWidth || b.clientWidth, bottom: a.clientHeight || b.clientHeight, height: a.clientHeight || b.clientHeight } } return this._expandRectByRootMargin(a) };
      d.prototype._expandRectByRootMargin = function (a) { var b = this._rootMarginValues.map(function (b, e) { return "px" == b.unit ? b.value : b.value * (e % 2 ? a.width : a.height) / 100 }); b = { top: a.top - b[0], right: a.right + b[1], bottom: a.bottom + b[2], left: a.left - b[3] }; b.width = b.right - b.left; b.height = b.bottom - b.top; return b }; d.prototype._hasCrossedThreshold = function (a, b) {
        var c = a && a.isIntersecting ? a.intersectionRatio || 0 : -1, e = b.isIntersecting ? b.intersectionRatio || 0 : -1; if (c !== e) for (var d = 0; d < this.thresholds.length; d++) {
          var f = this.thresholds[d];
          if (f == c || f == e || f < c !== f < e) return !0
        }
      }; d.prototype._rootIsInDom = function () { return !this.root || t(g, this.root) }; d.prototype._rootContainsTarget = function (a) { return t(this.root || g, a) }; d.prototype._registerInstance = function () { 0 > k.indexOf(this) && k.push(this) }; d.prototype._unregisterInstance = function () { var a = k.indexOf(this); -1 != a && k.splice(a, 1) }; h.IntersectionObserver = d; h.IntersectionObserverEntry = m
    }
  })(window, document);
} catch (e) {
  console.log('Could not polyfill IntersectionObserver', e);
}

(function () {

  var hasWebAnimations = (typeof HTMLElement.prototype.animate === 'function');
  var hasIntersectionObserver = (typeof window.IntersectionObserver === 'function');
  var hasTransforms = (typeof document.body.style['transform'] === 'string');

  var boxElement = document.getElementById('IntersectionTrigger');

  if (!boxElement) {
    return; 
  }

  if (!hasIntersectionObserver || !hasTransforms) {
    return;
  } else {
    IntersectionObserver.prototype.USE_MUTATION_OBSERVER = false;
  }

  //Animations used for WebAnimations
  if (hasWebAnimations) {

    var options = {
      duration: 1000,
      iterations: 1,
      fill: 'both',
      easing: 'ease',
    }

    var anim = document.getElementById("layer-bottom-solid").animate(
      [
        { transform: 'translate3d(0,-56.8%,0) ' },
        { transform: 'translate3d(0,0,0) scaleY(1)' }
      ], options
    );

    anim.pause();

    var grey = document.getElementById("layer-grey").animate(
      [
        { transform: 'translate3d(0,-5%,0)' },
        { transform: 'translate3d(0,0,0)' }

      ], options
    )

    grey.pause();

    var springs = document.getElementById("layer-springs").animate(
      [
        { transform: 'translate3d(0,-13%,0) ' },
        { transform: 'translate3d(0,0,0)' }
      ], options
    )

    springs.pause();

    var blue = document.getElementById("layer-blue").animate(
      [
        { transform: 'translate3d(0,-20%,0)' },
        { transform: 'translate3d(0,0,0)' }
      ], options
    )

    blue.pause();

    var panel = document.getElementById("layer-panel1").animate(
      [
        { transform: 'translate3d(0,-20%,0)' },
        { transform: 'translate3d(0,0,0)' }
      ], options
    )

    panel.pause();

    var bottomfabric = document.getElementById("layer-bottom-fabric").animate(
      [
        { transform: 'translate3d(0,-56.8%,0) ' },
        { transform: 'translate3d(0,0,0)' }
      ], options
    )

    bottomfabric.pause();

    var bottomtransparent = document.getElementById("layer-bottom-transparent").animate(
      [
        { transform: 'translate3d(0,-56.8%,0) ' },
        { transform: 'translate3d(0,0,0)' }
      ], options
    )

    bottomtransparent.pause();

  } else {

    //Animations used for direct interpolation
    var data = [{
      element: document.getElementById("layer-grey"),
      animation: {
        translateY: -5
      }
    },
    {
      element: document.getElementById("layer-bottom-solid"),
      animation: {
        translateY: -56.8
      }
    },
    {
      element: document.getElementById("layer-bottom-transparent"),
      animation: {
        translateY: -56.8
      }
    },
    {
      element: document.getElementById("layer-bottom-fabric"),
      animation: {
        translateY: -56.8
      }
    },
    {
      element: document.getElementById("layer-springs"),
      animation: {
        translateY: -13
      }
    },
    {
      element: document.getElementById("layer-blue"),
      animation: {
        translateY: -20
      }
    },
    {
      element: document.getElementById("layer-panel1"),
      animation: {
        translateY: -20
      }
    }
    ];

    //Used for value interpolation
    var tMin = 0,
      duration = 1000,
      translateMin = 0,
      scaleYMin = 1,
      scaleMin = 1;

    //Used for value interpolation
    var p1x = 0.25,
      p1y = 0.1,
      p2x = 0.25,
      p2y = 1.0;

  }

  // Used for value interpolation, taken from Webkit source
  function doEasing(easing) {
    if (easing === "ease") {
      return p1x = 0.25, p1y = 0.1, p2x = 0.25, p2y = 1.0;
    } else if (easing === "linear") {
      return p1x = 0.0, p1y = 0.0, p2x = 1.0, p2y = 1.0;
    } else if (easing === "ease-in") {
      return p1x = 0.42, p1y = 0, p2x = 1.0, p2y = 1.0;
    } else if (easing === "ease-out") {
      return p1x = 0, p1y = 0, p2x = 0.58, p2y = 1.0;
    } else if (easing === "ease-in-out") {
      return p1x = 0.42, p1y = 0, p2x = 0.58, p2y = 1.0;
    }
  }

  // Used for solveBezier(), taken from Webkit source
  function solveBezierForT(ax, ay, bx, by, cx, cy, x, duration) {
    var epsilon = 1.0 / (200.0 * duration);

    var t0, t1, t2, x2, d2, i;
    for (t2 = x, i = 0; i < 8; i++) {
      x2 = ((ax * t2 + bx) * t2 + cx) * t2 - x; // sample curve x for t2, - x
      if (Math.abs(x2) < epsilon) // obviously, this is determining the accuracy
        return t2;
      d2 = (3.0 * ax * t2 + 2.0 * bx) * t2 + cx;
      if (Math.abs(d2) < Math.pow(10, -6)) break;
      t2 = t2 - x2 / d2;
    }

    // fall back to bisection
    t0 = 0.0;
    t1 = 1.0;
    t2 = x;
    if (t2 < t0) return t0;
    if (t2 > t1) return t1;
    while (t0 < t1) {
      x2 = ((ax * t2 + bx) * t2 + cx) * t2;
      if (Math.abs(x2 - x) < epsilon) return t2;

      if (x > x2) t0 = t2;
      else t1 = t2;

      t2 = (t1 - t0) * .5 + t0;
    }

    return t2; // on failure
  };

  // Used for value interpolation, taken from Webkit source
  function solveBezier(p1x, p1y, p2x, p2y, x, duration) {
    // calculate coefficients
    var cx = 3.0 * p1x;
    var bx = 3.0 * (p2x - p1x) - cx;
    var ax = 1.0 - cx - bx;

    var cy = 3.0 * p1y;
    var by = 3.0 * (p2y - p1y) - cy;
    var ay = 1.0 - cy - by;

    var t = solveBezierForT(ax, ay, bx, by, cx, cy, x, duration);

    // now calculate Y
    return ((ay * t + by) * t + cy) * t;
  }

  //Creates an Array of steps for IntersectionObserver
  function buildThresholdList() {

    var numSteps = 1000;
    var thresholds = [];

    for (var i = 0.0; i <= numSteps; i++) {
      var ratio = i / numSteps;
      thresholds.push(ratio);
    }

    thresholds.push(0);
    return thresholds;
  }

  //Initiate the IntersectionObserver
  var observer;

  var options = {
    root: null,
    rootMargin: '0px',
    threshold: buildThresholdList()
  };

  observer = new IntersectionObserver(handleIntersect, options);
  observer.observe(boxElement);

  var t = 1;
  var animation = function () {

    if (t < 1000) {

      if (hasWebAnimations) {

        anim.currentTime = t;
        grey.currentTime = t;
        springs.currentTime = t;
        blue.currentTime = t;
        panel.currentTime = t;
        bottomfabric.currentTime = t;
        bottomtransparent.currentTime = t;

      } else {

        var i = 0,
          il = data.length;

        for (; i < il; i += 1) {

          var str = '',
            d = data[i]

          var translateMax = d.animation.translateY,
            scaleYMax = d.animation.scaleY,
            scaleMax = d.animation.scale;

          var time = (t - tMin) / duration,
            time2 = solveBezier(p1x, p1y, p2x, p2y, time, duration),
            translateY = (translateMax + (translateMin - translateMax) * time2);

          str += 'translate(0,' + translateY + '%)'

          if (scaleYMax) {

            var scaleY = (scaleYMax + (scaleYMin - scaleYMax) * time2);
            str += 'scaleY(' + scaleY + ')';
          }

          if (scaleMax) {
            var scale = (scaleMax + (scaleMin - scaleMax) * time2);
            str += 'scale(' + scale + ')';
          }

          d.element.style.transform = str;
        }
      }
    }
  }

  function handleIntersect(evt) {

    var intersection = evt[0];

    if (intersection.boundingClientRect.top > intersection.rootBounds.top) {
      t = intersection.intersectionRatio * 1000;
      animation();
      //window.requestAnimationFrame(animation);
    }
  }

})();