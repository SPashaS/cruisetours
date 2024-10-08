(() => {
  var e = {
      144: function (e) {
        e.exports = (function () {
          "use strict";
          function e() {
            return (
              (e =
                Object.assign ||
                function (e) {
                  for (var t = 1; t < arguments.length; t++) {
                    var s = arguments[t];
                    for (var i in s)
                      Object.prototype.hasOwnProperty.call(s, i) &&
                        (e[i] = s[i]);
                  }
                  return e;
                }),
              e.apply(this, arguments)
            );
          }
          var t = "undefined" != typeof window,
            s =
              (t && !("onscroll" in window)) ||
              ("undefined" != typeof navigator &&
                /(gle|ing|ro)bot|crawl|spider/i.test(navigator.userAgent)),
            i = t && "IntersectionObserver" in window,
            n = t && "classList" in document.createElement("p"),
            r = t && window.devicePixelRatio > 1,
            a = {
              elements_selector: ".lazy",
              container: s || t ? document : null,
              threshold: 300,
              thresholds: null,
              data_src: "src",
              data_srcset: "srcset",
              data_sizes: "sizes",
              data_bg: "bg",
              data_bg_hidpi: "bg-hidpi",
              data_bg_multi: "bg-multi",
              data_bg_multi_hidpi: "bg-multi-hidpi",
              data_bg_set: "bg-set",
              data_poster: "poster",
              class_applied: "applied",
              class_loading: "loading",
              class_loaded: "loaded",
              class_error: "error",
              class_entered: "entered",
              class_exited: "exited",
              unobserve_completed: !0,
              unobserve_entered: !1,
              cancel_on_exit: !0,
              callback_enter: null,
              callback_exit: null,
              callback_applied: null,
              callback_loading: null,
              callback_loaded: null,
              callback_error: null,
              callback_finish: null,
              callback_cancel: null,
              use_native: !1,
              restore_on_error: !1,
            },
            o = function (t) {
              return e({}, a, t);
            },
            l = function (e, t) {
              var s,
                i = "LazyLoad::Initialized",
                n = new e(t);
              try {
                s = new CustomEvent(i, { detail: { instance: n } });
              } catch (e) {
                (s = document.createEvent("CustomEvent")).initCustomEvent(
                  i,
                  !1,
                  !1,
                  { instance: n },
                );
              }
              window.dispatchEvent(s);
            },
            d = "src",
            c = "srcset",
            u = "sizes",
            p = "poster",
            m = "llOriginalAttrs",
            h = "data",
            f = "loading",
            v = "loaded",
            g = "applied",
            b = "error",
            y = "native",
            w = "data-",
            E = "ll-status",
            S = function (e, t) {
              return e.getAttribute(w + t);
            },
            _ = function (e) {
              return S(e, E);
            },
            T = function (e, t) {
              return (function (e, t, s) {
                var i = "data-ll-status";
                null !== s ? e.setAttribute(i, s) : e.removeAttribute(i);
              })(e, 0, t);
            },
            x = function (e) {
              return T(e, null);
            },
            L = function (e) {
              return null === _(e);
            },
            C = function (e) {
              return _(e) === y;
            },
            A = [f, v, g, b],
            M = function (e, t, s, i) {
              e &&
                "function" == typeof e &&
                (void 0 === i ? (void 0 === s ? e(t) : e(t, s)) : e(t, s, i));
            },
            P = function (e, t) {
              n
                ? e.classList.add(t)
                : (e.className += (e.className ? " " : "") + t);
            },
            k = function (e, t) {
              n
                ? e.classList.remove(t)
                : (e.className = e.className
                    .replace(new RegExp("(^|\\s+)" + t + "(\\s+|$)"), " ")
                    .replace(/^\s+/, "")
                    .replace(/\s+$/, ""));
            },
            O = function (e) {
              return e.llTempImage;
            },
            I = function (e, t) {
              if (t) {
                var s = t._observer;
                s && s.unobserve(e);
              }
            },
            q = function (e, t) {
              e && (e.loadingCount += t);
            },
            z = function (e, t) {
              e && (e.toLoadCount = t);
            },
            D = function (e) {
              for (var t, s = [], i = 0; (t = e.children[i]); i += 1)
                "SOURCE" === t.tagName && s.push(t);
              return s;
            },
            $ = function (e, t) {
              var s = e.parentNode;
              s && "PICTURE" === s.tagName && D(s).forEach(t);
            },
            B = function (e, t) {
              D(e).forEach(t);
            },
            G = [d],
            N = [d, p],
            V = [d, c, u],
            F = [h],
            H = function (e) {
              return !!e[m];
            },
            R = function (e) {
              return e[m];
            },
            j = function (e) {
              return delete e[m];
            },
            W = function (e, t) {
              if (!H(e)) {
                var s = {};
                t.forEach(function (t) {
                  s[t] = e.getAttribute(t);
                }),
                  (e[m] = s);
              }
            },
            Y = function (e, t) {
              if (H(e)) {
                var s = R(e);
                t.forEach(function (t) {
                  !(function (e, t, s) {
                    s ? e.setAttribute(t, s) : e.removeAttribute(t);
                  })(e, t, s[t]);
                });
              }
            },
            X = function (e, t, s) {
              P(e, t.class_applied),
                T(e, g),
                s &&
                  (t.unobserve_completed && I(e, t),
                  M(t.callback_applied, e, s));
            },
            U = function (e, t, s) {
              P(e, t.class_loading),
                T(e, f),
                s && (q(s, 1), M(t.callback_loading, e, s));
            },
            K = function (e, t, s) {
              s && e.setAttribute(t, s);
            },
            Q = function (e, t) {
              K(e, u, S(e, t.data_sizes)),
                K(e, c, S(e, t.data_srcset)),
                K(e, d, S(e, t.data_src));
            },
            J = {
              IMG: function (e, t) {
                $(e, function (e) {
                  W(e, V), Q(e, t);
                }),
                  W(e, V),
                  Q(e, t);
              },
              IFRAME: function (e, t) {
                W(e, G), K(e, d, S(e, t.data_src));
              },
              VIDEO: function (e, t) {
                B(e, function (e) {
                  W(e, G), K(e, d, S(e, t.data_src));
                }),
                  W(e, N),
                  K(e, p, S(e, t.data_poster)),
                  K(e, d, S(e, t.data_src)),
                  e.load();
              },
              OBJECT: function (e, t) {
                W(e, F), K(e, h, S(e, t.data_src));
              },
            },
            Z = ["IMG", "IFRAME", "VIDEO", "OBJECT"],
            ee = function (e, t) {
              !t ||
                (function (e) {
                  return e.loadingCount > 0;
                })(t) ||
                (function (e) {
                  return e.toLoadCount > 0;
                })(t) ||
                M(e.callback_finish, t);
            },
            te = function (e, t, s) {
              e.addEventListener(t, s), (e.llEvLisnrs[t] = s);
            },
            se = function (e, t, s) {
              e.removeEventListener(t, s);
            },
            ie = function (e) {
              return !!e.llEvLisnrs;
            },
            ne = function (e) {
              if (ie(e)) {
                var t = e.llEvLisnrs;
                for (var s in t) {
                  var i = t[s];
                  se(e, s, i);
                }
                delete e.llEvLisnrs;
              }
            },
            re = function (e, t, s) {
              !(function (e) {
                delete e.llTempImage;
              })(e),
                q(s, -1),
                (function (e) {
                  e && (e.toLoadCount -= 1);
                })(s),
                k(e, t.class_loading),
                t.unobserve_completed && I(e, s);
            },
            ae = function (e, t, s) {
              var i = O(e) || e;
              ie(i) ||
                (function (e, t, s) {
                  ie(e) || (e.llEvLisnrs = {});
                  var i = "VIDEO" === e.tagName ? "loadeddata" : "load";
                  te(e, i, t), te(e, "error", s);
                })(
                  i,
                  function (n) {
                    !(function (e, t, s, i) {
                      var n = C(t);
                      re(t, s, i),
                        P(t, s.class_loaded),
                        T(t, v),
                        M(s.callback_loaded, t, i),
                        n || ee(s, i);
                    })(0, e, t, s),
                      ne(i);
                  },
                  function (n) {
                    !(function (e, t, s, i) {
                      var n = C(t);
                      re(t, s, i),
                        P(t, s.class_error),
                        T(t, b),
                        M(s.callback_error, t, i),
                        s.restore_on_error && Y(t, V),
                        n || ee(s, i);
                    })(0, e, t, s),
                      ne(i);
                  },
                );
            },
            oe = function (e, t, s) {
              !(function (e) {
                return Z.indexOf(e.tagName) > -1;
              })(e)
                ? (function (e, t, s) {
                    !(function (e) {
                      e.llTempImage = document.createElement("IMG");
                    })(e),
                      ae(e, t, s),
                      (function (e) {
                        H(e) ||
                          (e[m] = { backgroundImage: e.style.backgroundImage });
                      })(e),
                      (function (e, t, s) {
                        var i = S(e, t.data_bg),
                          n = S(e, t.data_bg_hidpi),
                          a = r && n ? n : i;
                        a &&
                          ((e.style.backgroundImage = 'url("'.concat(a, '")')),
                          O(e).setAttribute(d, a),
                          U(e, t, s));
                      })(e, t, s),
                      (function (e, t, s) {
                        var i = S(e, t.data_bg_multi),
                          n = S(e, t.data_bg_multi_hidpi),
                          a = r && n ? n : i;
                        a && ((e.style.backgroundImage = a), X(e, t, s));
                      })(e, t, s),
                      (function (e, t, s) {
                        var i = S(e, t.data_bg_set);
                        if (i) {
                          var n = i.split("|"),
                            r = n.map(function (e) {
                              return "image-set(".concat(e, ")");
                            });
                          (e.style.backgroundImage = r.join()),
                            "" === e.style.backgroundImage &&
                              ((r = n.map(function (e) {
                                return "-webkit-image-set(".concat(e, ")");
                              })),
                              (e.style.backgroundImage = r.join())),
                            X(e, t, s);
                        }
                      })(e, t, s);
                  })(e, t, s)
                : (function (e, t, s) {
                    ae(e, t, s),
                      (function (e, t, s) {
                        var i = J[e.tagName];
                        i && (i(e, t), U(e, t, s));
                      })(e, t, s);
                  })(e, t, s);
            },
            le = function (e) {
              e.removeAttribute(d), e.removeAttribute(c), e.removeAttribute(u);
            },
            de = function (e) {
              $(e, function (e) {
                Y(e, V);
              }),
                Y(e, V);
            },
            ce = {
              IMG: de,
              IFRAME: function (e) {
                Y(e, G);
              },
              VIDEO: function (e) {
                B(e, function (e) {
                  Y(e, G);
                }),
                  Y(e, N),
                  e.load();
              },
              OBJECT: function (e) {
                Y(e, F);
              },
            },
            ue = function (e, t) {
              (function (e) {
                var t = ce[e.tagName];
                t
                  ? t(e)
                  : (function (e) {
                      if (H(e)) {
                        var t = R(e);
                        e.style.backgroundImage = t.backgroundImage;
                      }
                    })(e);
              })(e),
                (function (e, t) {
                  L(e) ||
                    C(e) ||
                    (k(e, t.class_entered),
                    k(e, t.class_exited),
                    k(e, t.class_applied),
                    k(e, t.class_loading),
                    k(e, t.class_loaded),
                    k(e, t.class_error));
                })(e, t),
                x(e),
                j(e);
            },
            pe = ["IMG", "IFRAME", "VIDEO"],
            me = function (e) {
              return e.use_native && "loading" in HTMLImageElement.prototype;
            },
            he = function (e, t, s) {
              e.forEach(function (e) {
                return (function (e) {
                  return e.isIntersecting || e.intersectionRatio > 0;
                })(e)
                  ? (function (e, t, s, i) {
                      var n = (function (e) {
                        return A.indexOf(_(e)) >= 0;
                      })(e);
                      T(e, "entered"),
                        P(e, s.class_entered),
                        k(e, s.class_exited),
                        (function (e, t, s) {
                          t.unobserve_entered && I(e, s);
                        })(e, s, i),
                        M(s.callback_enter, e, t, i),
                        n || oe(e, s, i);
                    })(e.target, e, t, s)
                  : (function (e, t, s, i) {
                      L(e) ||
                        (P(e, s.class_exited),
                        (function (e, t, s, i) {
                          s.cancel_on_exit &&
                            (function (e) {
                              return _(e) === f;
                            })(e) &&
                            "IMG" === e.tagName &&
                            (ne(e),
                            (function (e) {
                              $(e, function (e) {
                                le(e);
                              }),
                                le(e);
                            })(e),
                            de(e),
                            k(e, s.class_loading),
                            q(i, -1),
                            x(e),
                            M(s.callback_cancel, e, t, i));
                        })(e, t, s, i),
                        M(s.callback_exit, e, t, i));
                    })(e.target, e, t, s);
              });
            },
            fe = function (e) {
              return Array.prototype.slice.call(e);
            },
            ve = function (e) {
              return e.container.querySelectorAll(e.elements_selector);
            },
            ge = function (e) {
              return (function (e) {
                return _(e) === b;
              })(e);
            },
            be = function (e, t) {
              return (function (e) {
                return fe(e).filter(L);
              })(e || ve(t));
            },
            ye = function (e, s) {
              var n = o(e);
              (this._settings = n),
                (this.loadingCount = 0),
                (function (e, t) {
                  i &&
                    !me(e) &&
                    (t._observer = new IntersectionObserver(
                      function (s) {
                        he(s, e, t);
                      },
                      (function (e) {
                        return {
                          root: e.container === document ? null : e.container,
                          rootMargin: e.thresholds || e.threshold + "px",
                        };
                      })(e),
                    ));
                })(n, this),
                (function (e, s) {
                  t &&
                    ((s._onlineHandler = function () {
                      !(function (e, t) {
                        var s;
                        ((s = ve(e)), fe(s).filter(ge)).forEach(function (t) {
                          k(t, e.class_error), x(t);
                        }),
                          t.update();
                      })(e, s);
                    }),
                    window.addEventListener("online", s._onlineHandler));
                })(n, this),
                this.update(s);
            };
          return (
            (ye.prototype = {
              update: function (e) {
                var t,
                  n,
                  r = this._settings,
                  a = be(e, r);
                z(this, a.length),
                  !s && i
                    ? me(r)
                      ? (function (e, t, s) {
                          e.forEach(function (e) {
                            -1 !== pe.indexOf(e.tagName) &&
                              (function (e, t, s) {
                                e.setAttribute("loading", "lazy"),
                                  ae(e, t, s),
                                  (function (e, t) {
                                    var s = J[e.tagName];
                                    s && s(e, t);
                                  })(e, t),
                                  T(e, y);
                              })(e, t, s);
                          }),
                            z(s, 0);
                        })(a, r, this)
                      : ((n = a),
                        (function (e) {
                          e.disconnect();
                        })((t = this._observer)),
                        (function (e, t) {
                          t.forEach(function (t) {
                            e.observe(t);
                          });
                        })(t, n))
                    : this.loadAll(a);
              },
              destroy: function () {
                this._observer && this._observer.disconnect(),
                  t &&
                    window.removeEventListener("online", this._onlineHandler),
                  ve(this._settings).forEach(function (e) {
                    j(e);
                  }),
                  delete this._observer,
                  delete this._settings,
                  delete this._onlineHandler,
                  delete this.loadingCount,
                  delete this.toLoadCount;
              },
              loadAll: function (e) {
                var t = this,
                  s = this._settings;
                be(e, s).forEach(function (e) {
                  I(e, t), oe(e, s, t);
                });
              },
              restoreAll: function () {
                var e = this._settings;
                ve(e).forEach(function (t) {
                  ue(t, e);
                });
              },
            }),
            (ye.load = function (e, t) {
              var s = o(t);
              oe(e, s);
            }),
            (ye.resetStatus = function (e) {
              x(e);
            }),
            t &&
              (function (e, t) {
                if (t)
                  if (t.length) for (var s, i = 0; (s = t[i]); i += 1) l(e, s);
                  else l(e, t);
              })(ye, window.lazyLoadOptions),
            ye
          );
        })();
      },
    },
    t = {};
  function s(i) {
    var n = t[i];
    if (void 0 !== n) return n.exports;
    var r = (t[i] = { exports: {} });
    return e[i].call(r.exports, r, r.exports, s), r.exports;
  }
  (() => {
    "use strict";
    const e = {};
    function t(e) {
      (e = e ? `#${e}` : window.location.href.split("#")[0]),
        history.pushState("", "", e);
    }
    let i = (e, t = 500, s = 0) => {
        e.classList.contains("_slide") ||
          (e.classList.add("_slide"),
          (e.style.transitionProperty = "height, margin, padding"),
          (e.style.transitionDuration = t + "ms"),
          (e.style.height = `${e.offsetHeight}px`),
          e.offsetHeight,
          (e.style.overflow = "hidden"),
          (e.style.height = s ? `${s}px` : "0px"),
          (e.style.paddingTop = 0),
          (e.style.paddingBottom = 0),
          (e.style.marginTop = 0),
          (e.style.marginBottom = 0),
          window.setTimeout(() => {
            (e.hidden = !s),
              !s && e.style.removeProperty("height"),
              e.style.removeProperty("padding-top"),
              e.style.removeProperty("padding-bottom"),
              e.style.removeProperty("margin-top"),
              e.style.removeProperty("margin-bottom"),
              !s && e.style.removeProperty("overflow"),
              e.style.removeProperty("transition-duration"),
              e.style.removeProperty("transition-property"),
              e.classList.remove("_slide"),
              document.dispatchEvent(
                new CustomEvent("slideUpDone", { detail: { target: e } }),
              );
          }, t));
      },
      n = (e, t = 500, s = 0) => {
        if (!e.classList.contains("_slide")) {
          e.classList.add("_slide"),
            (e.hidden = !e.hidden && null),
            s && e.style.removeProperty("height");
          let i = e.offsetHeight;
          (e.style.overflow = "hidden"),
            (e.style.height = s ? `${s}px` : "0px"),
            (e.style.paddingTop = 0),
            (e.style.paddingBottom = 0),
            (e.style.marginTop = 0),
            (e.style.marginBottom = 0),
            e.offsetHeight,
            (e.style.transitionProperty = "height, margin, padding"),
            (e.style.transitionDuration = t + "ms"),
            (e.style.height = i + "px"),
            e.style.removeProperty("padding-top"),
            e.style.removeProperty("padding-bottom"),
            e.style.removeProperty("margin-top"),
            e.style.removeProperty("margin-bottom"),
            window.setTimeout(() => {
              e.style.removeProperty("height"),
                e.style.removeProperty("overflow"),
                e.style.removeProperty("transition-duration"),
                e.style.removeProperty("transition-property"),
                e.classList.remove("_slide"),
                document.dispatchEvent(
                  new CustomEvent("slideDownDone", { detail: { target: e } }),
                );
            }, t);
        }
      },
      r = !0,
      a = (e = 0) => {
        document.documentElement.classList.contains("lock") ? o(e) : l(e);
      },
      o = (e = 0) => {
        let t = document.querySelector("body");
        if (r) {
          let s = document.querySelectorAll("[data-lp]");
          setTimeout(() => {
            for (let e = 0; e < s.length; e++) {
              s[e].style.paddingRight = "0px";
            }
            (t.style.paddingRight = "0px"),
              document.documentElement.classList.remove("lock");
          }, e),
            (r = !1),
            setTimeout(function () {
              r = !0;
            }, e);
        }
      },
      l = (e = 0) => {
        let t = document.querySelector("body");
        if (r) {
          let s = document.querySelectorAll("[data-lp]");
          for (let e = 0; e < s.length; e++) {
            s[e].style.paddingRight =
              window.innerWidth -
              document.querySelector(".wrapper").offsetWidth +
              "px";
          }
          (t.style.paddingRight =
            window.innerWidth -
            document.querySelector(".wrapper").offsetWidth +
            "px"),
            document.documentElement.classList.add("lock"),
            (r = !1),
            setTimeout(function () {
              r = !0;
            }, e);
        }
      };
    function d() {
      o(), c(), document.documentElement.classList.remove("menu-open");
    }
    function c() {
      document
        .querySelectorAll(".menu-item-has-children.sub-menu_open")
        .forEach((e) => {
          e.classList.remove("sub-menu_open");
        });
    }
    function u(e) {
      setTimeout(() => {
        window.FLS && console.log(e);
      }, 0);
    }
    function p(e, t) {
      const s = Array.from(e).filter(function (e, s, i) {
        if (e.dataset[t]) return e.dataset[t].split(",")[0];
      });
      if (s.length) {
        const e = [];
        s.forEach((s) => {
          const i = {},
            n = s.dataset[t].split(",");
          (i.value = n[0]),
            (i.type = n[1] ? n[1].trim() : "max"),
            (i.item = s),
            e.push(i);
        });
        let i = e.map(function (e) {
          return (
            "(" +
            e.type +
            "-width: " +
            e.value +
            "px)," +
            e.value +
            "," +
            e.type
          );
        });
        i = (function (e) {
          return e.filter(function (e, t, s) {
            return s.indexOf(e) === t;
          });
        })(i);
        const n = [];
        if (i.length)
          return (
            i.forEach((t) => {
              const s = t.split(","),
                i = s[1],
                r = s[2],
                a = window.matchMedia(s[0]),
                o = e.filter(function (e) {
                  if (e.value === i && e.type === r) return !0;
                });
              n.push({ itemsArray: o, matchMedia: a });
            }),
            n
          );
      }
    }
    e.popup = new (class {
      constructor(e) {
        let t = {
          logging: !0,
          init: !0,
          attributeOpenButton: "data-popup",
          attributeCloseButton: "data-close",
          fixElementSelector: "[data-lp]",
          youtubeAttribute: "data-youtube",
          youtubePlaceAttribute: "data-youtube-place",
          setAutoplayYoutube: !0,
          classes: {
            popup: "popup",
            popupContent: "popup__content",
            popupActive: "popup_show",
            bodyActive: "popup-show",
          },
          focusCatch: !0,
          closeEsc: !0,
          bodyLock: !0,
          bodyLockDelay: 0,
          hashSettings: { location: !1, goHash: !1 },
          on: {
            beforeOpen: function () {},
            afterOpen: function () {},
            beforeClose: function () {},
            afterClose: function () {},
          },
        };
        (this.isOpen = !1),
          (this.targetOpen = { selector: !1, element: !1 }),
          (this.previousOpen = { selector: !1, element: !1 }),
          (this.lastClosed = { selector: !1, element: !1 }),
          (this._dataValue = !1),
          (this.hash = !1),
          (this._reopen = !1),
          (this._selectorOpen = !1),
          (this.lastFocusEl = !1),
          (this._focusEl = [
            "a[href]",
            'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
            "button:not([disabled]):not([aria-hidden])",
            "select:not([disabled]):not([aria-hidden])",
            "textarea:not([disabled]):not([aria-hidden])",
            "area[href]",
            "iframe",
            "object",
            "embed",
            "[contenteditable]",
            '[tabindex]:not([tabindex^="-"])',
          ]),
          (this.options = {
            ...t,
            ...e,
            classes: { ...t.classes, ...e?.classes },
            hashSettings: { ...t.hashSettings, ...e?.hashSettings },
            on: { ...t.on, ...e?.on },
          }),
          this.options.init && this.initPopups();
      }
      initPopups() {
        this.popupLogging("Проснулся"), this.eventsPopup();
      }
      eventsPopup() {
        document.addEventListener(
          "click",
          function (e) {
            const t = e.target.closest(`[${this.options.attributeOpenButton}]`);
            if (t)
              return (
                e.preventDefault(),
                (this._dataValue = t.getAttribute(
                  this.options.attributeOpenButton,
                )
                  ? t.getAttribute(this.options.attributeOpenButton)
                  : "error"),
                "error" !== this._dataValue
                  ? (this.isOpen || (this.lastFocusEl = t),
                    (this.targetOpen.selector = `${this._dataValue}`),
                    (this._selectorOpen = !0),
                    void this.open())
                  : void this.popupLogging(
                      `Ой ой, не заполнен атрибут у ${t.classList}`,
                    )
              );
            return e.target.closest(`[${this.options.attributeCloseButton}]`) ||
              (!e.target.closest(`.${this.options.classes.popupContent}`) &&
                this.isOpen)
              ? (e.preventDefault(), void this.close())
              : void 0;
          }.bind(this),
        ),
          document.addEventListener(
            "keydown",
            function (e) {
              if (
                this.options.closeEsc &&
                27 == e.which &&
                "Escape" === e.code &&
                this.isOpen
              )
                return e.preventDefault(), void this.close();
              this.options.focusCatch &&
                9 == e.which &&
                this.isOpen &&
                this._focusCatch(e);
            }.bind(this),
          ),
          this.options.hashSettings.goHash &&
            (window.addEventListener(
              "hashchange",
              function () {
                window.location.hash
                  ? this._openToHash()
                  : this.close(this.targetOpen.selector);
              }.bind(this),
            ),
            window.addEventListener(
              "load",
              function () {
                window.location.hash && this._openToHash();
              }.bind(this),
            ));
      }
      open(e) {
        if (
          (e &&
            "string" == typeof e &&
            "" !== e.trim() &&
            ((this.targetOpen.selector = e), (this._selectorOpen = !0)),
          this.isOpen && ((this._reopen = !0), this.close()),
          this._selectorOpen ||
            (this.targetOpen.selector = this.lastClosed.selector),
          this._reopen || (this.previousActiveElement = document.activeElement),
          (this.targetOpen.element = document.querySelector(
            this.targetOpen.selector,
          )),
          this.targetOpen.element)
        ) {
          if (
            this.targetOpen.element.hasAttribute(this.options.youtubeAttribute)
          ) {
            const e = `https://www.youtube.com/embed/${this.targetOpen.element.getAttribute(this.options.youtubeAttribute)}?rel=0&showinfo=0&autoplay=1`,
              t = document.createElement("iframe");
            t.setAttribute("allowfullscreen", "");
            const s = this.options.setAutoplayYoutube ? "autoplay;" : "";
            t.setAttribute("allow", `${s}; encrypted-media`),
              t.setAttribute("src", e),
              this.targetOpen.element.querySelector(
                `[${this.options.youtubePlaceAttribute}]`,
              ) &&
                this.targetOpen.element
                  .querySelector(`[${this.options.youtubePlaceAttribute}]`)
                  .appendChild(t);
          }
          this.options.hashSettings.location &&
            (this._getHash(), this._setHash()),
            this.options.on.beforeOpen(this),
            this.targetOpen.element.classList.add(
              this.options.classes.popupActive,
            ),
            document.body.classList.add(this.options.classes.bodyActive),
            this._reopen ? (this._reopen = !1) : a(),
            this.targetOpen.element.setAttribute("aria-hidden", "false"),
            (this.previousOpen.selector = this.targetOpen.selector),
            (this.previousOpen.element = this.targetOpen.element),
            (this._selectorOpen = !1),
            (this.isOpen = !0),
            setTimeout(() => {
              this._focusTrap();
            }, 50),
            this.options.on.afterOpen(this),
            document.dispatchEvent(
              new CustomEvent("afterPopupOpen", { detail: { popup: this } }),
            ),
            this.popupLogging("Открыл попап");
        } else
          this.popupLogging(
            "Ой ой, такого попапа нет. Проверьте корректность ввода. ",
          );
      }
      close(e) {
        e &&
          "string" == typeof e &&
          "" !== e.trim() &&
          (this.previousOpen.selector = e),
          this.isOpen &&
            r &&
            (this.options.on.beforeClose(this),
            this.targetOpen.element.hasAttribute(
              this.options.youtubeAttribute,
            ) &&
              this.targetOpen.element.querySelector(
                `[${this.options.youtubePlaceAttribute}]`,
              ) &&
              (this.targetOpen.element.querySelector(
                `[${this.options.youtubePlaceAttribute}]`,
              ).innerHTML = ""),
            this.previousOpen.element.classList.remove(
              this.options.classes.popupActive,
            ),
            this.previousOpen.element.setAttribute("aria-hidden", "true"),
            this._reopen ||
              (document.body.classList.remove(this.options.classes.bodyActive),
              a(),
              (this.isOpen = !1)),
            this._removeHash(),
            this._selectorOpen &&
              ((this.lastClosed.selector = this.previousOpen.selector),
              (this.lastClosed.element = this.previousOpen.element)),
            this.options.on.afterClose(this),
            setTimeout(() => {
              this._focusTrap();
            }, 50),
            this.popupLogging("Закрыл попап"));
      }
      _getHash() {
        this.options.hashSettings.location &&
          (this.hash = this.targetOpen.selector.includes("#")
            ? this.targetOpen.selector
            : this.targetOpen.selector.replace(".", "#"));
      }
      _openToHash() {
        let e = document.querySelector(
          `.${window.location.hash.replace("#", "")}`,
        )
          ? `.${window.location.hash.replace("#", "")}`
          : document.querySelector(`${window.location.hash}`)
            ? `${window.location.hash}`
            : null;
        document.querySelector(
          `[${this.options.attributeOpenButton}="${e}"]`,
        ) &&
          e &&
          this.open(e);
      }
      _setHash() {
        history.replaceState("", "", this.hash);
      }
      _removeHash() {
        history.replaceState("", "", window.location.href.split("#")[0]);
      }
      _focusCatch(e) {
        const t = this.targetOpen.element.querySelectorAll(this._focusEl),
          s = Array.prototype.slice.call(t),
          i = s.indexOf(document.activeElement);
        e.shiftKey && 0 === i && (s[s.length - 1].focus(), e.preventDefault()),
          e.shiftKey ||
            i !== s.length - 1 ||
            (s[0].focus(), e.preventDefault());
      }
      _focusTrap() {
        const e = this.previousOpen.element.querySelectorAll(this._focusEl);
        !this.isOpen && this.lastFocusEl
          ? this.lastFocusEl.focus()
          : (e[0].focus(), console.dir(e[0]));
      }
      popupLogging(e) {
        this.options.logging && u(`[Попапос]: ${e}`);
      }
    })({});
    let m = {
      getErrors(e) {
        let t = 0,
          s = e.querySelectorAll("*[data-required]");
        return (
          s.length &&
            s.forEach((e) => {
              (null === e.offsetParent && "SELECT" !== e.tagName) ||
                e.disabled ||
                (t += this.validateInput(e));
            }),
          t
        );
      },
      validateInput(e) {
        let t = 0;
        return (
          "email" === e.dataset.required
            ? ((e.value = e.value.replace(" ", "")),
              this.emailTest(e) ? (this.addError(e), t++) : this.removeError(e))
            : ("checkbox" !== e.type || e.checked) && e.value
              ? this.removeError(e)
              : (this.addError(e), t++),
          t
        );
      },
      addError(e) {
        e.classList.add("_form-error"),
          e.closest(".form-order__row").classList.add("_form-error");
        let t = e.parentElement.querySelector(".form__error");
        t && e.parentElement.removeChild(t),
          e.dataset.error &&
            e.parentElement.insertAdjacentHTML(
              "beforeend",
              `<div class="form__error">${e.dataset.error}</div>`,
            );
      },
      removeError(e) {
        e.classList.remove("_form-error"),
          e.parentElement.classList.remove("_form-error"),
          e.parentElement.querySelector(".form__error") &&
            e.parentElement.removeChild(
              e.parentElement.querySelector(".form__error"),
            );
      },
      formClean(t) {
        t.reset(),
          setTimeout(() => {
            let s = t.querySelectorAll("input,textarea");
            for (let e = 0; e < s.length; e++) {
              const t = s[e];
              t.parentElement.classList.remove("_form-focus"),
                t.classList.remove("_form-focus"),
                m.removeError(t);
            }
            let i = t.querySelectorAll(".checkbox__input");
            if (i.length > 0)
              for (let e = 0; e < i.length; e++) {
                i[e].checked = !1;
              }
            if (e.select) {
              let s = t.querySelectorAll(".select");
              if (s.length)
                for (let t = 0; t < s.length; t++) {
                  const i = s[t].querySelector("select");
                  e.select.selectBuild(i);
                }
            }
          }, 0);
      },
      emailTest: (e) =>
        !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(e.value),
    };
    function h(e) {
      return (
        null !== e &&
        "object" == typeof e &&
        "constructor" in e &&
        e.constructor === Object
      );
    }
    function f(e, t) {
      void 0 === e && (e = {}),
        void 0 === t && (t = {}),
        Object.keys(t).forEach((s) => {
          void 0 === e[s]
            ? (e[s] = t[s])
            : h(t[s]) &&
              h(e[s]) &&
              Object.keys(t[s]).length > 0 &&
              f(e[s], t[s]);
        });
    }
    const v = {
      body: {},
      addEventListener() {},
      removeEventListener() {},
      activeElement: { blur() {}, nodeName: "" },
      querySelector: () => null,
      querySelectorAll: () => [],
      getElementById: () => null,
      createEvent: () => ({ initEvent() {} }),
      createElement: () => ({
        children: [],
        childNodes: [],
        style: {},
        setAttribute() {},
        getElementsByTagName: () => [],
      }),
      createElementNS: () => ({}),
      importNode: () => null,
      location: {
        hash: "",
        host: "",
        hostname: "",
        href: "",
        origin: "",
        pathname: "",
        protocol: "",
        search: "",
      },
    };
    function g() {
      const e = "undefined" != typeof document ? document : {};
      return f(e, v), e;
    }
    const b = {
      document: v,
      navigator: { userAgent: "" },
      location: {
        hash: "",
        host: "",
        hostname: "",
        href: "",
        origin: "",
        pathname: "",
        protocol: "",
        search: "",
      },
      history: { replaceState() {}, pushState() {}, go() {}, back() {} },
      CustomEvent: function () {
        return this;
      },
      addEventListener() {},
      removeEventListener() {},
      getComputedStyle: () => ({ getPropertyValue: () => "" }),
      Image() {},
      Date() {},
      screen: {},
      setTimeout() {},
      clearTimeout() {},
      matchMedia: () => ({}),
      requestAnimationFrame: (e) =>
        "undefined" == typeof setTimeout ? (e(), null) : setTimeout(e, 0),
      cancelAnimationFrame(e) {
        "undefined" != typeof setTimeout && clearTimeout(e);
      },
    };
    function y() {
      const e = "undefined" != typeof window ? window : {};
      return f(e, b), e;
    }
    function w(e, t) {
      return void 0 === t && (t = 0), setTimeout(e, t);
    }
    function E() {
      return Date.now();
    }
    function S(e, t) {
      void 0 === t && (t = "x");
      const s = y();
      let i, n, r;
      const a = (function (e) {
        const t = y();
        let s;
        return (
          t.getComputedStyle && (s = t.getComputedStyle(e, null)),
          !s && e.currentStyle && (s = e.currentStyle),
          s || (s = e.style),
          s
        );
      })(e);
      return (
        s.WebKitCSSMatrix
          ? ((n = a.transform || a.webkitTransform),
            n.split(",").length > 6 &&
              (n = n
                .split(", ")
                .map((e) => e.replace(",", "."))
                .join(", ")),
            (r = new s.WebKitCSSMatrix("none" === n ? "" : n)))
          : ((r =
              a.MozTransform ||
              a.OTransform ||
              a.MsTransform ||
              a.msTransform ||
              a.transform ||
              a
                .getPropertyValue("transform")
                .replace("translate(", "matrix(1, 0, 0, 1,")),
            (i = r.toString().split(","))),
        "x" === t &&
          (n = s.WebKitCSSMatrix
            ? r.m41
            : 16 === i.length
              ? parseFloat(i[12])
              : parseFloat(i[4])),
        "y" === t &&
          (n = s.WebKitCSSMatrix
            ? r.m42
            : 16 === i.length
              ? parseFloat(i[13])
              : parseFloat(i[5])),
        n || 0
      );
    }
    function _(e) {
      return (
        "object" == typeof e &&
        null !== e &&
        e.constructor &&
        "Object" === Object.prototype.toString.call(e).slice(8, -1)
      );
    }
    function T() {
      const e = Object(arguments.length <= 0 ? void 0 : arguments[0]),
        t = ["__proto__", "constructor", "prototype"];
      for (let i = 1; i < arguments.length; i += 1) {
        const n = i < 0 || arguments.length <= i ? void 0 : arguments[i];
        if (
          null != n &&
          ((s = n),
          !("undefined" != typeof window && void 0 !== window.HTMLElement
            ? s instanceof HTMLElement
            : s && (1 === s.nodeType || 11 === s.nodeType)))
        ) {
          const s = Object.keys(Object(n)).filter((e) => t.indexOf(e) < 0);
          for (let t = 0, i = s.length; t < i; t += 1) {
            const i = s[t],
              r = Object.getOwnPropertyDescriptor(n, i);
            void 0 !== r &&
              r.enumerable &&
              (_(e[i]) && _(n[i])
                ? n[i].__swiper__
                  ? (e[i] = n[i])
                  : T(e[i], n[i])
                : !_(e[i]) && _(n[i])
                  ? ((e[i] = {}),
                    n[i].__swiper__ ? (e[i] = n[i]) : T(e[i], n[i]))
                  : (e[i] = n[i]));
          }
        }
      }
      var s;
      return e;
    }
    function x(e, t, s) {
      e.style.setProperty(t, s);
    }
    function L(e) {
      let { swiper: t, targetPosition: s, side: i } = e;
      const n = y(),
        r = -t.translate;
      let a,
        o = null;
      const l = t.params.speed;
      (t.wrapperEl.style.scrollSnapType = "none"),
        n.cancelAnimationFrame(t.cssModeFrameID);
      const d = s > r ? "next" : "prev",
        c = (e, t) => ("next" === d && e >= t) || ("prev" === d && e <= t),
        u = () => {
          (a = new Date().getTime()), null === o && (o = a);
          const e = Math.max(Math.min((a - o) / l, 1), 0),
            d = 0.5 - Math.cos(e * Math.PI) / 2;
          let p = r + d * (s - r);
          if ((c(p, s) && (p = s), t.wrapperEl.scrollTo({ [i]: p }), c(p, s)))
            return (
              (t.wrapperEl.style.overflow = "hidden"),
              (t.wrapperEl.style.scrollSnapType = ""),
              setTimeout(() => {
                (t.wrapperEl.style.overflow = ""),
                  t.wrapperEl.scrollTo({ [i]: p });
              }),
              void n.cancelAnimationFrame(t.cssModeFrameID)
            );
          t.cssModeFrameID = n.requestAnimationFrame(u);
        };
      u();
    }
    function C(e, t) {
      return (
        void 0 === t && (t = ""), [...e.children].filter((e) => e.matches(t))
      );
    }
    function A(e) {
      try {
        return void console.warn(e);
      } catch (e) {}
    }
    function M(e, t) {
      void 0 === t && (t = []);
      const s = document.createElement(e);
      return (
        s.classList.add(
          ...(Array.isArray(t)
            ? t
            : (function (e) {
                return (
                  void 0 === e && (e = ""),
                  e
                    .trim()
                    .split(" ")
                    .filter((e) => !!e.trim())
                );
              })(t)),
        ),
        s
      );
    }
    function P(e, t) {
      return y().getComputedStyle(e, null).getPropertyValue(t);
    }
    function k(e) {
      let t,
        s = e;
      if (s) {
        for (t = 0; null !== (s = s.previousSibling); )
          1 === s.nodeType && (t += 1);
        return t;
      }
    }
    function O(e, t) {
      const s = [];
      let i = e.parentElement;
      for (; i; )
        t ? i.matches(t) && s.push(i) : s.push(i), (i = i.parentElement);
      return s;
    }
    function I(e, t, s) {
      const i = y();
      return s
        ? e["width" === t ? "offsetWidth" : "offsetHeight"] +
            parseFloat(
              i
                .getComputedStyle(e, null)
                .getPropertyValue(
                  "width" === t ? "margin-right" : "margin-top",
                ),
            ) +
            parseFloat(
              i
                .getComputedStyle(e, null)
                .getPropertyValue(
                  "width" === t ? "margin-left" : "margin-bottom",
                ),
            )
        : e.offsetWidth;
    }
    function q(e) {
      return (Array.isArray(e) ? e : [e]).filter((e) => !!e);
    }
    let z, D, $;
    function B() {
      return (
        z ||
          (z = (function () {
            const e = y(),
              t = g();
            return {
              smoothScroll:
                t.documentElement &&
                t.documentElement.style &&
                "scrollBehavior" in t.documentElement.style,
              touch: !!(
                "ontouchstart" in e ||
                (e.DocumentTouch && t instanceof e.DocumentTouch)
              ),
            };
          })()),
        z
      );
    }
    function G(e) {
      return (
        void 0 === e && (e = {}),
        D ||
          (D = (function (e) {
            let { userAgent: t } = void 0 === e ? {} : e;
            const s = B(),
              i = y(),
              n = i.navigator.platform,
              r = t || i.navigator.userAgent,
              a = { ios: !1, android: !1 },
              o = i.screen.width,
              l = i.screen.height,
              d = r.match(/(Android);?[\s\/]+([\d.]+)?/);
            let c = r.match(/(iPad).*OS\s([\d_]+)/);
            const u = r.match(/(iPod)(.*OS\s([\d_]+))?/),
              p = !c && r.match(/(iPhone\sOS|iOS)\s([\d_]+)/),
              m = "Win32" === n;
            let h = "MacIntel" === n;
            return (
              !c &&
                h &&
                s.touch &&
                [
                  "1024x1366",
                  "1366x1024",
                  "834x1194",
                  "1194x834",
                  "834x1112",
                  "1112x834",
                  "768x1024",
                  "1024x768",
                  "820x1180",
                  "1180x820",
                  "810x1080",
                  "1080x810",
                ].indexOf(`${o}x${l}`) >= 0 &&
                ((c = r.match(/(Version)\/([\d.]+)/)),
                c || (c = [0, 1, "13_0_0"]),
                (h = !1)),
              d && !m && ((a.os = "android"), (a.android = !0)),
              (c || p || u) && ((a.os = "ios"), (a.ios = !0)),
              a
            );
          })(e)),
        D
      );
    }
    function N() {
      return (
        $ ||
          ($ = (function () {
            const e = y(),
              t = G();
            let s = !1;
            function i() {
              const t = e.navigator.userAgent.toLowerCase();
              return (
                t.indexOf("safari") >= 0 &&
                t.indexOf("chrome") < 0 &&
                t.indexOf("android") < 0
              );
            }
            if (i()) {
              const t = String(e.navigator.userAgent);
              if (t.includes("Version/")) {
                const [e, i] = t
                  .split("Version/")[1]
                  .split(" ")[0]
                  .split(".")
                  .map((e) => Number(e));
                s = e < 16 || (16 === e && i < 2);
              }
            }
            const n = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(
                e.navigator.userAgent,
              ),
              r = i();
            return {
              isSafari: s || r,
              needPerspectiveFix: s,
              need3dFix: r || (n && t.ios),
              isWebView: n,
            };
          })()),
        $
      );
    }
    var V = {
      on(e, t, s) {
        const i = this;
        if (!i.eventsListeners || i.destroyed) return i;
        if ("function" != typeof t) return i;
        const n = s ? "unshift" : "push";
        return (
          e.split(" ").forEach((e) => {
            i.eventsListeners[e] || (i.eventsListeners[e] = []),
              i.eventsListeners[e][n](t);
          }),
          i
        );
      },
      once(e, t, s) {
        const i = this;
        if (!i.eventsListeners || i.destroyed) return i;
        if ("function" != typeof t) return i;
        function n() {
          i.off(e, n), n.__emitterProxy && delete n.__emitterProxy;
          for (var s = arguments.length, r = new Array(s), a = 0; a < s; a++)
            r[a] = arguments[a];
          t.apply(i, r);
        }
        return (n.__emitterProxy = t), i.on(e, n, s);
      },
      onAny(e, t) {
        const s = this;
        if (!s.eventsListeners || s.destroyed) return s;
        if ("function" != typeof e) return s;
        const i = t ? "unshift" : "push";
        return (
          s.eventsAnyListeners.indexOf(e) < 0 && s.eventsAnyListeners[i](e), s
        );
      },
      offAny(e) {
        const t = this;
        if (!t.eventsListeners || t.destroyed) return t;
        if (!t.eventsAnyListeners) return t;
        const s = t.eventsAnyListeners.indexOf(e);
        return s >= 0 && t.eventsAnyListeners.splice(s, 1), t;
      },
      off(e, t) {
        const s = this;
        return !s.eventsListeners || s.destroyed
          ? s
          : s.eventsListeners
            ? (e.split(" ").forEach((e) => {
                void 0 === t
                  ? (s.eventsListeners[e] = [])
                  : s.eventsListeners[e] &&
                    s.eventsListeners[e].forEach((i, n) => {
                      (i === t ||
                        (i.__emitterProxy && i.__emitterProxy === t)) &&
                        s.eventsListeners[e].splice(n, 1);
                    });
              }),
              s)
            : s;
      },
      emit() {
        const e = this;
        if (!e.eventsListeners || e.destroyed) return e;
        if (!e.eventsListeners) return e;
        let t, s, i;
        for (var n = arguments.length, r = new Array(n), a = 0; a < n; a++)
          r[a] = arguments[a];
        "string" == typeof r[0] || Array.isArray(r[0])
          ? ((t = r[0]), (s = r.slice(1, r.length)), (i = e))
          : ((t = r[0].events), (s = r[0].data), (i = r[0].context || e)),
          s.unshift(i);
        return (
          (Array.isArray(t) ? t : t.split(" ")).forEach((t) => {
            e.eventsAnyListeners &&
              e.eventsAnyListeners.length &&
              e.eventsAnyListeners.forEach((e) => {
                e.apply(i, [t, ...s]);
              }),
              e.eventsListeners &&
                e.eventsListeners[t] &&
                e.eventsListeners[t].forEach((e) => {
                  e.apply(i, s);
                });
          }),
          e
        );
      },
    };
    const F = (e, t) => {
        if (!e || e.destroyed || !e.params) return;
        const s = t.closest(
          e.isElement ? "swiper-slide" : `.${e.params.slideClass}`,
        );
        if (s) {
          let t = s.querySelector(`.${e.params.lazyPreloaderClass}`);
          !t &&
            e.isElement &&
            (s.shadowRoot
              ? (t = s.shadowRoot.querySelector(
                  `.${e.params.lazyPreloaderClass}`,
                ))
              : requestAnimationFrame(() => {
                  s.shadowRoot &&
                    ((t = s.shadowRoot.querySelector(
                      `.${e.params.lazyPreloaderClass}`,
                    )),
                    t && t.remove());
                })),
            t && t.remove();
        }
      },
      H = (e, t) => {
        if (!e.slides[t]) return;
        const s = e.slides[t].querySelector('[loading="lazy"]');
        s && s.removeAttribute("loading");
      },
      R = (e) => {
        if (!e || e.destroyed || !e.params) return;
        let t = e.params.lazyPreloadPrevNext;
        const s = e.slides.length;
        if (!s || !t || t < 0) return;
        t = Math.min(t, s);
        const i =
            "auto" === e.params.slidesPerView
              ? e.slidesPerViewDynamic()
              : Math.ceil(e.params.slidesPerView),
          n = e.activeIndex;
        if (e.params.grid && e.params.grid.rows > 1) {
          const s = n,
            r = [s - t];
          return (
            r.push(...Array.from({ length: t }).map((e, t) => s + i + t)),
            void e.slides.forEach((t, s) => {
              r.includes(t.column) && H(e, s);
            })
          );
        }
        const r = n + i - 1;
        if (e.params.rewind || e.params.loop)
          for (let i = n - t; i <= r + t; i += 1) {
            const t = ((i % s) + s) % s;
            (t < n || t > r) && H(e, t);
          }
        else
          for (let i = Math.max(n - t, 0); i <= Math.min(r + t, s - 1); i += 1)
            i !== n && (i > r || i < n) && H(e, i);
      };
    var j = {
      updateSize: function () {
        const e = this;
        let t, s;
        const i = e.el;
        (t =
          void 0 !== e.params.width && null !== e.params.width
            ? e.params.width
            : i.clientWidth),
          (s =
            void 0 !== e.params.height && null !== e.params.height
              ? e.params.height
              : i.clientHeight),
          (0 === t && e.isHorizontal()) ||
            (0 === s && e.isVertical()) ||
            ((t =
              t -
              parseInt(P(i, "padding-left") || 0, 10) -
              parseInt(P(i, "padding-right") || 0, 10)),
            (s =
              s -
              parseInt(P(i, "padding-top") || 0, 10) -
              parseInt(P(i, "padding-bottom") || 0, 10)),
            Number.isNaN(t) && (t = 0),
            Number.isNaN(s) && (s = 0),
            Object.assign(e, {
              width: t,
              height: s,
              size: e.isHorizontal() ? t : s,
            }));
      },
      updateSlides: function () {
        const e = this;
        function t(t, s) {
          return parseFloat(t.getPropertyValue(e.getDirectionLabel(s)) || 0);
        }
        const s = e.params,
          {
            wrapperEl: i,
            slidesEl: n,
            size: r,
            rtlTranslate: a,
            wrongRTL: o,
          } = e,
          l = e.virtual && s.virtual.enabled,
          d = l ? e.virtual.slides.length : e.slides.length,
          c = C(n, `.${e.params.slideClass}, swiper-slide`),
          u = l ? e.virtual.slides.length : c.length;
        let p = [];
        const m = [],
          h = [];
        let f = s.slidesOffsetBefore;
        "function" == typeof f && (f = s.slidesOffsetBefore.call(e));
        let v = s.slidesOffsetAfter;
        "function" == typeof v && (v = s.slidesOffsetAfter.call(e));
        const g = e.snapGrid.length,
          b = e.slidesGrid.length;
        let y = s.spaceBetween,
          w = -f,
          E = 0,
          S = 0;
        if (void 0 === r) return;
        "string" == typeof y && y.indexOf("%") >= 0
          ? (y = (parseFloat(y.replace("%", "")) / 100) * r)
          : "string" == typeof y && (y = parseFloat(y)),
          (e.virtualSize = -y),
          c.forEach((e) => {
            a ? (e.style.marginLeft = "") : (e.style.marginRight = ""),
              (e.style.marginBottom = ""),
              (e.style.marginTop = "");
          }),
          s.centeredSlides &&
            s.cssMode &&
            (x(i, "--swiper-centered-offset-before", ""),
            x(i, "--swiper-centered-offset-after", ""));
        const _ = s.grid && s.grid.rows > 1 && e.grid;
        let T;
        _ ? e.grid.initSlides(c) : e.grid && e.grid.unsetSlides();
        const L =
          "auto" === s.slidesPerView &&
          s.breakpoints &&
          Object.keys(s.breakpoints).filter(
            (e) => void 0 !== s.breakpoints[e].slidesPerView,
          ).length > 0;
        for (let i = 0; i < u; i += 1) {
          let n;
          if (
            ((T = 0),
            c[i] && (n = c[i]),
            _ && e.grid.updateSlide(i, n, c),
            !c[i] || "none" !== P(n, "display"))
          ) {
            if ("auto" === s.slidesPerView) {
              L && (c[i].style[e.getDirectionLabel("width")] = "");
              const r = getComputedStyle(n),
                a = n.style.transform,
                o = n.style.webkitTransform;
              if (
                (a && (n.style.transform = "none"),
                o && (n.style.webkitTransform = "none"),
                s.roundLengths)
              )
                T = e.isHorizontal() ? I(n, "width", !0) : I(n, "height", !0);
              else {
                const e = t(r, "width"),
                  s = t(r, "padding-left"),
                  i = t(r, "padding-right"),
                  a = t(r, "margin-left"),
                  o = t(r, "margin-right"),
                  l = r.getPropertyValue("box-sizing");
                if (l && "border-box" === l) T = e + a + o;
                else {
                  const { clientWidth: t, offsetWidth: r } = n;
                  T = e + s + i + a + o + (r - t);
                }
              }
              a && (n.style.transform = a),
                o && (n.style.webkitTransform = o),
                s.roundLengths && (T = Math.floor(T));
            } else
              (T = (r - (s.slidesPerView - 1) * y) / s.slidesPerView),
                s.roundLengths && (T = Math.floor(T)),
                c[i] && (c[i].style[e.getDirectionLabel("width")] = `${T}px`);
            c[i] && (c[i].swiperSlideSize = T),
              h.push(T),
              s.centeredSlides
                ? ((w = w + T / 2 + E / 2 + y),
                  0 === E && 0 !== i && (w = w - r / 2 - y),
                  0 === i && (w = w - r / 2 - y),
                  Math.abs(w) < 0.001 && (w = 0),
                  s.roundLengths && (w = Math.floor(w)),
                  S % s.slidesPerGroup == 0 && p.push(w),
                  m.push(w))
                : (s.roundLengths && (w = Math.floor(w)),
                  (S - Math.min(e.params.slidesPerGroupSkip, S)) %
                    e.params.slidesPerGroup ==
                    0 && p.push(w),
                  m.push(w),
                  (w = w + T + y)),
              (e.virtualSize += T + y),
              (E = T),
              (S += 1);
          }
        }
        if (
          ((e.virtualSize = Math.max(e.virtualSize, r) + v),
          a &&
            o &&
            ("slide" === s.effect || "coverflow" === s.effect) &&
            (i.style.width = `${e.virtualSize + y}px`),
          s.setWrapperSize &&
            (i.style[e.getDirectionLabel("width")] = `${e.virtualSize + y}px`),
          _ && e.grid.updateWrapperSize(T, p),
          !s.centeredSlides)
        ) {
          const t = [];
          for (let i = 0; i < p.length; i += 1) {
            let n = p[i];
            s.roundLengths && (n = Math.floor(n)),
              p[i] <= e.virtualSize - r && t.push(n);
          }
          (p = t),
            Math.floor(e.virtualSize - r) - Math.floor(p[p.length - 1]) > 1 &&
              p.push(e.virtualSize - r);
        }
        if (l && s.loop) {
          const t = h[0] + y;
          if (s.slidesPerGroup > 1) {
            const i = Math.ceil(
                (e.virtual.slidesBefore + e.virtual.slidesAfter) /
                  s.slidesPerGroup,
              ),
              n = t * s.slidesPerGroup;
            for (let e = 0; e < i; e += 1) p.push(p[p.length - 1] + n);
          }
          for (
            let i = 0;
            i < e.virtual.slidesBefore + e.virtual.slidesAfter;
            i += 1
          )
            1 === s.slidesPerGroup && p.push(p[p.length - 1] + t),
              m.push(m[m.length - 1] + t),
              (e.virtualSize += t);
        }
        if ((0 === p.length && (p = [0]), 0 !== y)) {
          const t =
            e.isHorizontal() && a
              ? "marginLeft"
              : e.getDirectionLabel("marginRight");
          c.filter(
            (e, t) => !(s.cssMode && !s.loop) || t !== c.length - 1,
          ).forEach((e) => {
            e.style[t] = `${y}px`;
          });
        }
        if (s.centeredSlides && s.centeredSlidesBounds) {
          let e = 0;
          h.forEach((t) => {
            e += t + (y || 0);
          }),
            (e -= y);
          const t = e - r;
          p = p.map((e) => (e <= 0 ? -f : e > t ? t + v : e));
        }
        if (s.centerInsufficientSlides) {
          let e = 0;
          if (
            (h.forEach((t) => {
              e += t + (y || 0);
            }),
            (e -= y),
            e < r)
          ) {
            const t = (r - e) / 2;
            p.forEach((e, s) => {
              p[s] = e - t;
            }),
              m.forEach((e, s) => {
                m[s] = e + t;
              });
          }
        }
        if (
          (Object.assign(e, {
            slides: c,
            snapGrid: p,
            slidesGrid: m,
            slidesSizesGrid: h,
          }),
          s.centeredSlides && s.cssMode && !s.centeredSlidesBounds)
        ) {
          x(i, "--swiper-centered-offset-before", -p[0] + "px"),
            x(
              i,
              "--swiper-centered-offset-after",
              e.size / 2 - h[h.length - 1] / 2 + "px",
            );
          const t = -e.snapGrid[0],
            s = -e.slidesGrid[0];
          (e.snapGrid = e.snapGrid.map((e) => e + t)),
            (e.slidesGrid = e.slidesGrid.map((e) => e + s));
        }
        if (
          (u !== d && e.emit("slidesLengthChange"),
          p.length !== g &&
            (e.params.watchOverflow && e.checkOverflow(),
            e.emit("snapGridLengthChange")),
          m.length !== b && e.emit("slidesGridLengthChange"),
          s.watchSlidesProgress && e.updateSlidesOffset(),
          e.emit("slidesUpdated"),
          !(l || s.cssMode || ("slide" !== s.effect && "fade" !== s.effect)))
        ) {
          const t = `${s.containerModifierClass}backface-hidden`,
            i = e.el.classList.contains(t);
          u <= s.maxBackfaceHiddenSlides
            ? i || e.el.classList.add(t)
            : i && e.el.classList.remove(t);
        }
      },
      updateAutoHeight: function (e) {
        const t = this,
          s = [],
          i = t.virtual && t.params.virtual.enabled;
        let n,
          r = 0;
        "number" == typeof e
          ? t.setTransition(e)
          : !0 === e && t.setTransition(t.params.speed);
        const a = (e) => (i ? t.slides[t.getSlideIndexByData(e)] : t.slides[e]);
        if ("auto" !== t.params.slidesPerView && t.params.slidesPerView > 1)
          if (t.params.centeredSlides)
            (t.visibleSlides || []).forEach((e) => {
              s.push(e);
            });
          else
            for (n = 0; n < Math.ceil(t.params.slidesPerView); n += 1) {
              const e = t.activeIndex + n;
              if (e > t.slides.length && !i) break;
              s.push(a(e));
            }
        else s.push(a(t.activeIndex));
        for (n = 0; n < s.length; n += 1)
          if (void 0 !== s[n]) {
            const e = s[n].offsetHeight;
            r = e > r ? e : r;
          }
        (r || 0 === r) && (t.wrapperEl.style.height = `${r}px`);
      },
      updateSlidesOffset: function () {
        const e = this,
          t = e.slides,
          s = e.isElement
            ? e.isHorizontal()
              ? e.wrapperEl.offsetLeft
              : e.wrapperEl.offsetTop
            : 0;
        for (let i = 0; i < t.length; i += 1)
          t[i].swiperSlideOffset =
            (e.isHorizontal() ? t[i].offsetLeft : t[i].offsetTop) -
            s -
            e.cssOverflowAdjustment();
      },
      updateSlidesProgress: function (e) {
        void 0 === e && (e = (this && this.translate) || 0);
        const t = this,
          s = t.params,
          { slides: i, rtlTranslate: n, snapGrid: r } = t;
        if (0 === i.length) return;
        void 0 === i[0].swiperSlideOffset && t.updateSlidesOffset();
        let a = -e;
        n && (a = e),
          i.forEach((e) => {
            e.classList.remove(s.slideVisibleClass, s.slideFullyVisibleClass);
          }),
          (t.visibleSlidesIndexes = []),
          (t.visibleSlides = []);
        let o = s.spaceBetween;
        "string" == typeof o && o.indexOf("%") >= 0
          ? (o = (parseFloat(o.replace("%", "")) / 100) * t.size)
          : "string" == typeof o && (o = parseFloat(o));
        for (let e = 0; e < i.length; e += 1) {
          const l = i[e];
          let d = l.swiperSlideOffset;
          s.cssMode && s.centeredSlides && (d -= i[0].swiperSlideOffset);
          const c =
              (a + (s.centeredSlides ? t.minTranslate() : 0) - d) /
              (l.swiperSlideSize + o),
            u =
              (a - r[0] + (s.centeredSlides ? t.minTranslate() : 0) - d) /
              (l.swiperSlideSize + o),
            p = -(a - d),
            m = p + t.slidesSizesGrid[e],
            h = p >= 0 && p <= t.size - t.slidesSizesGrid[e];
          ((p >= 0 && p < t.size - 1) ||
            (m > 1 && m <= t.size) ||
            (p <= 0 && m >= t.size)) &&
            (t.visibleSlides.push(l),
            t.visibleSlidesIndexes.push(e),
            i[e].classList.add(s.slideVisibleClass)),
            h && i[e].classList.add(s.slideFullyVisibleClass),
            (l.progress = n ? -c : c),
            (l.originalProgress = n ? -u : u);
        }
      },
      updateProgress: function (e) {
        const t = this;
        if (void 0 === e) {
          const s = t.rtlTranslate ? -1 : 1;
          e = (t && t.translate && t.translate * s) || 0;
        }
        const s = t.params,
          i = t.maxTranslate() - t.minTranslate();
        let { progress: n, isBeginning: r, isEnd: a, progressLoop: o } = t;
        const l = r,
          d = a;
        if (0 === i) (n = 0), (r = !0), (a = !0);
        else {
          n = (e - t.minTranslate()) / i;
          const s = Math.abs(e - t.minTranslate()) < 1,
            o = Math.abs(e - t.maxTranslate()) < 1;
          (r = s || n <= 0), (a = o || n >= 1), s && (n = 0), o && (n = 1);
        }
        if (s.loop) {
          const s = t.getSlideIndexByData(0),
            i = t.getSlideIndexByData(t.slides.length - 1),
            n = t.slidesGrid[s],
            r = t.slidesGrid[i],
            a = t.slidesGrid[t.slidesGrid.length - 1],
            l = Math.abs(e);
          (o = l >= n ? (l - n) / a : (l + a - r) / a), o > 1 && (o -= 1);
        }
        Object.assign(t, {
          progress: n,
          progressLoop: o,
          isBeginning: r,
          isEnd: a,
        }),
          (s.watchSlidesProgress || (s.centeredSlides && s.autoHeight)) &&
            t.updateSlidesProgress(e),
          r && !l && t.emit("reachBeginning toEdge"),
          a && !d && t.emit("reachEnd toEdge"),
          ((l && !r) || (d && !a)) && t.emit("fromEdge"),
          t.emit("progress", n);
      },
      updateSlidesClasses: function () {
        const e = this,
          { slides: t, params: s, slidesEl: i, activeIndex: n } = e,
          r = e.virtual && s.virtual.enabled,
          a = e.grid && s.grid && s.grid.rows > 1,
          o = (e) => C(i, `.${s.slideClass}${e}, swiper-slide${e}`)[0];
        let l, d, c;
        if (
          (t.forEach((e) => {
            e.classList.remove(
              s.slideActiveClass,
              s.slideNextClass,
              s.slidePrevClass,
            );
          }),
          r)
        )
          if (s.loop) {
            let t = n - e.virtual.slidesBefore;
            t < 0 && (t = e.virtual.slides.length + t),
              t >= e.virtual.slides.length && (t -= e.virtual.slides.length),
              (l = o(`[data-swiper-slide-index="${t}"]`));
          } else l = o(`[data-swiper-slide-index="${n}"]`);
        else
          a
            ? ((l = t.filter((e) => e.column === n)[0]),
              (c = t.filter((e) => e.column === n + 1)[0]),
              (d = t.filter((e) => e.column === n - 1)[0]))
            : (l = t[n]);
        l &&
          (l.classList.add(s.slideActiveClass),
          a
            ? (c && c.classList.add(s.slideNextClass),
              d && d.classList.add(s.slidePrevClass))
            : ((c = (function (e, t) {
                const s = [];
                for (; e.nextElementSibling; ) {
                  const i = e.nextElementSibling;
                  t ? i.matches(t) && s.push(i) : s.push(i), (e = i);
                }
                return s;
              })(l, `.${s.slideClass}, swiper-slide`)[0]),
              s.loop && !c && (c = t[0]),
              c && c.classList.add(s.slideNextClass),
              (d = (function (e, t) {
                const s = [];
                for (; e.previousElementSibling; ) {
                  const i = e.previousElementSibling;
                  t ? i.matches(t) && s.push(i) : s.push(i), (e = i);
                }
                return s;
              })(l, `.${s.slideClass}, swiper-slide`)[0]),
              s.loop && 0 === !d && (d = t[t.length - 1]),
              d && d.classList.add(s.slidePrevClass))),
          e.emitSlidesClasses();
      },
      updateActiveIndex: function (e) {
        const t = this,
          s = t.rtlTranslate ? t.translate : -t.translate,
          {
            snapGrid: i,
            params: n,
            activeIndex: r,
            realIndex: a,
            snapIndex: o,
          } = t;
        let l,
          d = e;
        const c = (e) => {
          let s = e - t.virtual.slidesBefore;
          return (
            s < 0 && (s = t.virtual.slides.length + s),
            s >= t.virtual.slides.length && (s -= t.virtual.slides.length),
            s
          );
        };
        if (
          (void 0 === d &&
            (d = (function (e) {
              const { slidesGrid: t, params: s } = e,
                i = e.rtlTranslate ? e.translate : -e.translate;
              let n;
              for (let e = 0; e < t.length; e += 1)
                void 0 !== t[e + 1]
                  ? i >= t[e] && i < t[e + 1] - (t[e + 1] - t[e]) / 2
                    ? (n = e)
                    : i >= t[e] && i < t[e + 1] && (n = e + 1)
                  : i >= t[e] && (n = e);
              return (
                s.normalizeSlideIndex && (n < 0 || void 0 === n) && (n = 0), n
              );
            })(t)),
          i.indexOf(s) >= 0)
        )
          l = i.indexOf(s);
        else {
          const e = Math.min(n.slidesPerGroupSkip, d);
          l = e + Math.floor((d - e) / n.slidesPerGroup);
        }
        if ((l >= i.length && (l = i.length - 1), d === r && !t.params.loop))
          return void (
            l !== o && ((t.snapIndex = l), t.emit("snapIndexChange"))
          );
        if (d === r && t.params.loop && t.virtual && t.params.virtual.enabled)
          return void (t.realIndex = c(d));
        const u = t.grid && n.grid && n.grid.rows > 1;
        let p;
        if (t.virtual && n.virtual.enabled && n.loop) p = c(d);
        else if (u) {
          const e = t.slides.filter((e) => e.column === d)[0];
          let s = parseInt(e.getAttribute("data-swiper-slide-index"), 10);
          Number.isNaN(s) && (s = Math.max(t.slides.indexOf(e), 0)),
            (p = Math.floor(s / n.grid.rows));
        } else if (t.slides[d]) {
          const e = t.slides[d].getAttribute("data-swiper-slide-index");
          p = e ? parseInt(e, 10) : d;
        } else p = d;
        Object.assign(t, {
          previousSnapIndex: o,
          snapIndex: l,
          previousRealIndex: a,
          realIndex: p,
          previousIndex: r,
          activeIndex: d,
        }),
          t.initialized && R(t),
          t.emit("activeIndexChange"),
          t.emit("snapIndexChange"),
          (t.initialized || t.params.runCallbacksOnInit) &&
            (a !== p && t.emit("realIndexChange"), t.emit("slideChange"));
      },
      updateClickedSlide: function (e, t) {
        const s = this,
          i = s.params;
        let n = e.closest(`.${i.slideClass}, swiper-slide`);
        !n &&
          s.isElement &&
          t &&
          t.length > 1 &&
          t.includes(e) &&
          [...t.slice(t.indexOf(e) + 1, t.length)].forEach((e) => {
            !n &&
              e.matches &&
              e.matches(`.${i.slideClass}, swiper-slide`) &&
              (n = e);
          });
        let r,
          a = !1;
        if (n)
          for (let e = 0; e < s.slides.length; e += 1)
            if (s.slides[e] === n) {
              (a = !0), (r = e);
              break;
            }
        if (!n || !a)
          return (s.clickedSlide = void 0), void (s.clickedIndex = void 0);
        (s.clickedSlide = n),
          s.virtual && s.params.virtual.enabled
            ? (s.clickedIndex = parseInt(
                n.getAttribute("data-swiper-slide-index"),
                10,
              ))
            : (s.clickedIndex = r),
          i.slideToClickedSlide &&
            void 0 !== s.clickedIndex &&
            s.clickedIndex !== s.activeIndex &&
            s.slideToClickedSlide();
      },
    };
    var W = {
      getTranslate: function (e) {
        void 0 === e && (e = this.isHorizontal() ? "x" : "y");
        const { params: t, rtlTranslate: s, translate: i, wrapperEl: n } = this;
        if (t.virtualTranslate) return s ? -i : i;
        if (t.cssMode) return i;
        let r = S(n, e);
        return (r += this.cssOverflowAdjustment()), s && (r = -r), r || 0;
      },
      setTranslate: function (e, t) {
        const s = this,
          { rtlTranslate: i, params: n, wrapperEl: r, progress: a } = s;
        let o,
          l = 0,
          d = 0;
        s.isHorizontal() ? (l = i ? -e : e) : (d = e),
          n.roundLengths && ((l = Math.floor(l)), (d = Math.floor(d))),
          (s.previousTranslate = s.translate),
          (s.translate = s.isHorizontal() ? l : d),
          n.cssMode
            ? (r[s.isHorizontal() ? "scrollLeft" : "scrollTop"] =
                s.isHorizontal() ? -l : -d)
            : n.virtualTranslate ||
              (s.isHorizontal()
                ? (l -= s.cssOverflowAdjustment())
                : (d -= s.cssOverflowAdjustment()),
              (r.style.transform = `translate3d(${l}px, ${d}px, 0px)`));
        const c = s.maxTranslate() - s.minTranslate();
        (o = 0 === c ? 0 : (e - s.minTranslate()) / c),
          o !== a && s.updateProgress(e),
          s.emit("setTranslate", s.translate, t);
      },
      minTranslate: function () {
        return -this.snapGrid[0];
      },
      maxTranslate: function () {
        return -this.snapGrid[this.snapGrid.length - 1];
      },
      translateTo: function (e, t, s, i, n) {
        void 0 === e && (e = 0),
          void 0 === t && (t = this.params.speed),
          void 0 === s && (s = !0),
          void 0 === i && (i = !0);
        const r = this,
          { params: a, wrapperEl: o } = r;
        if (r.animating && a.preventInteractionOnTransition) return !1;
        const l = r.minTranslate(),
          d = r.maxTranslate();
        let c;
        if (
          ((c = i && e > l ? l : i && e < d ? d : e),
          r.updateProgress(c),
          a.cssMode)
        ) {
          const e = r.isHorizontal();
          if (0 === t) o[e ? "scrollLeft" : "scrollTop"] = -c;
          else {
            if (!r.support.smoothScroll)
              return (
                L({ swiper: r, targetPosition: -c, side: e ? "left" : "top" }),
                !0
              );
            o.scrollTo({ [e ? "left" : "top"]: -c, behavior: "smooth" });
          }
          return !0;
        }
        return (
          0 === t
            ? (r.setTransition(0),
              r.setTranslate(c),
              s &&
                (r.emit("beforeTransitionStart", t, n),
                r.emit("transitionEnd")))
            : (r.setTransition(t),
              r.setTranslate(c),
              s &&
                (r.emit("beforeTransitionStart", t, n),
                r.emit("transitionStart")),
              r.animating ||
                ((r.animating = !0),
                r.onTranslateToWrapperTransitionEnd ||
                  (r.onTranslateToWrapperTransitionEnd = function (e) {
                    r &&
                      !r.destroyed &&
                      e.target === this &&
                      (r.wrapperEl.removeEventListener(
                        "transitionend",
                        r.onTranslateToWrapperTransitionEnd,
                      ),
                      (r.onTranslateToWrapperTransitionEnd = null),
                      delete r.onTranslateToWrapperTransitionEnd,
                      s && r.emit("transitionEnd"));
                  }),
                r.wrapperEl.addEventListener(
                  "transitionend",
                  r.onTranslateToWrapperTransitionEnd,
                ))),
          !0
        );
      },
    };
    function Y(e) {
      let { swiper: t, runCallbacks: s, direction: i, step: n } = e;
      const { activeIndex: r, previousIndex: a } = t;
      let o = i;
      if (
        (o || (o = r > a ? "next" : r < a ? "prev" : "reset"),
        t.emit(`transition${n}`),
        s && r !== a)
      ) {
        if ("reset" === o) return void t.emit(`slideResetTransition${n}`);
        t.emit(`slideChangeTransition${n}`),
          "next" === o
            ? t.emit(`slideNextTransition${n}`)
            : t.emit(`slidePrevTransition${n}`);
      }
    }
    var X = {
      slideTo: function (e, t, s, i, n) {
        void 0 === e && (e = 0),
          void 0 === t && (t = this.params.speed),
          void 0 === s && (s = !0),
          "string" == typeof e && (e = parseInt(e, 10));
        const r = this;
        let a = e;
        a < 0 && (a = 0);
        const {
          params: o,
          snapGrid: l,
          slidesGrid: d,
          previousIndex: c,
          activeIndex: u,
          rtlTranslate: p,
          wrapperEl: m,
          enabled: h,
        } = r;
        if (
          (r.animating && o.preventInteractionOnTransition) ||
          (!h && !i && !n) ||
          r.destroyed
        )
          return !1;
        const f = Math.min(r.params.slidesPerGroupSkip, a);
        let v = f + Math.floor((a - f) / r.params.slidesPerGroup);
        v >= l.length && (v = l.length - 1);
        const g = -l[v];
        if (o.normalizeSlideIndex)
          for (let e = 0; e < d.length; e += 1) {
            const t = -Math.floor(100 * g),
              s = Math.floor(100 * d[e]),
              i = Math.floor(100 * d[e + 1]);
            void 0 !== d[e + 1]
              ? t >= s && t < i - (i - s) / 2
                ? (a = e)
                : t >= s && t < i && (a = e + 1)
              : t >= s && (a = e);
          }
        if (r.initialized && a !== u) {
          if (
            !r.allowSlideNext &&
            (p
              ? g > r.translate && g > r.minTranslate()
              : g < r.translate && g < r.minTranslate())
          )
            return !1;
          if (
            !r.allowSlidePrev &&
            g > r.translate &&
            g > r.maxTranslate() &&
            (u || 0) !== a
          )
            return !1;
        }
        let b;
        if (
          (a !== (c || 0) && s && r.emit("beforeSlideChangeStart"),
          r.updateProgress(g),
          (b = a > u ? "next" : a < u ? "prev" : "reset"),
          (p && -g === r.translate) || (!p && g === r.translate))
        )
          return (
            r.updateActiveIndex(a),
            o.autoHeight && r.updateAutoHeight(),
            r.updateSlidesClasses(),
            "slide" !== o.effect && r.setTranslate(g),
            "reset" !== b && (r.transitionStart(s, b), r.transitionEnd(s, b)),
            !1
          );
        if (o.cssMode) {
          const e = r.isHorizontal(),
            s = p ? g : -g;
          if (0 === t) {
            const t = r.virtual && r.params.virtual.enabled;
            t &&
              ((r.wrapperEl.style.scrollSnapType = "none"),
              (r._immediateVirtual = !0)),
              t && !r._cssModeVirtualInitialSet && r.params.initialSlide > 0
                ? ((r._cssModeVirtualInitialSet = !0),
                  requestAnimationFrame(() => {
                    m[e ? "scrollLeft" : "scrollTop"] = s;
                  }))
                : (m[e ? "scrollLeft" : "scrollTop"] = s),
              t &&
                requestAnimationFrame(() => {
                  (r.wrapperEl.style.scrollSnapType = ""),
                    (r._immediateVirtual = !1);
                });
          } else {
            if (!r.support.smoothScroll)
              return (
                L({ swiper: r, targetPosition: s, side: e ? "left" : "top" }),
                !0
              );
            m.scrollTo({ [e ? "left" : "top"]: s, behavior: "smooth" });
          }
          return !0;
        }
        return (
          r.setTransition(t),
          r.setTranslate(g),
          r.updateActiveIndex(a),
          r.updateSlidesClasses(),
          r.emit("beforeTransitionStart", t, i),
          r.transitionStart(s, b),
          0 === t
            ? r.transitionEnd(s, b)
            : r.animating ||
              ((r.animating = !0),
              r.onSlideToWrapperTransitionEnd ||
                (r.onSlideToWrapperTransitionEnd = function (e) {
                  r &&
                    !r.destroyed &&
                    e.target === this &&
                    (r.wrapperEl.removeEventListener(
                      "transitionend",
                      r.onSlideToWrapperTransitionEnd,
                    ),
                    (r.onSlideToWrapperTransitionEnd = null),
                    delete r.onSlideToWrapperTransitionEnd,
                    r.transitionEnd(s, b));
                }),
              r.wrapperEl.addEventListener(
                "transitionend",
                r.onSlideToWrapperTransitionEnd,
              )),
          !0
        );
      },
      slideToLoop: function (e, t, s, i) {
        if (
          (void 0 === e && (e = 0),
          void 0 === t && (t = this.params.speed),
          void 0 === s && (s = !0),
          "string" == typeof e)
        ) {
          e = parseInt(e, 10);
        }
        const n = this;
        if (n.destroyed) return;
        const r = n.grid && n.params.grid && n.params.grid.rows > 1;
        let a = e;
        if (n.params.loop)
          if (n.virtual && n.params.virtual.enabled)
            a += n.virtual.slidesBefore;
          else {
            let e;
            if (r) {
              const t = a * n.params.grid.rows;
              e = n.slides.filter(
                (e) => 1 * e.getAttribute("data-swiper-slide-index") === t,
              )[0].column;
            } else e = n.getSlideIndexByData(a);
            const t = r
                ? Math.ceil(n.slides.length / n.params.grid.rows)
                : n.slides.length,
              { centeredSlides: s } = n.params;
            let i = n.params.slidesPerView;
            "auto" === i
              ? (i = n.slidesPerViewDynamic())
              : ((i = Math.ceil(parseFloat(n.params.slidesPerView, 10))),
                s && i % 2 == 0 && (i += 1));
            let o = t - e < i;
            if ((s && (o = o || e < Math.ceil(i / 2)), o)) {
              const i = s
                ? e < n.activeIndex
                  ? "prev"
                  : "next"
                : e - n.activeIndex - 1 < n.params.slidesPerView
                  ? "next"
                  : "prev";
              n.loopFix({
                direction: i,
                slideTo: !0,
                activeSlideIndex: "next" === i ? e + 1 : e - t + 1,
                slideRealIndex: "next" === i ? n.realIndex : void 0,
              });
            }
            if (r) {
              const e = a * n.params.grid.rows;
              a = n.slides.filter(
                (t) => 1 * t.getAttribute("data-swiper-slide-index") === e,
              )[0].column;
            } else a = n.getSlideIndexByData(a);
          }
        return (
          requestAnimationFrame(() => {
            n.slideTo(a, t, s, i);
          }),
          n
        );
      },
      slideNext: function (e, t, s) {
        void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
        const i = this,
          { enabled: n, params: r, animating: a } = i;
        if (!n || i.destroyed) return i;
        let o = r.slidesPerGroup;
        "auto" === r.slidesPerView &&
          1 === r.slidesPerGroup &&
          r.slidesPerGroupAuto &&
          (o = Math.max(i.slidesPerViewDynamic("current", !0), 1));
        const l = i.activeIndex < r.slidesPerGroupSkip ? 1 : o,
          d = i.virtual && r.virtual.enabled;
        if (r.loop) {
          if (a && !d && r.loopPreventsSliding) return !1;
          if (
            (i.loopFix({ direction: "next" }),
            (i._clientLeft = i.wrapperEl.clientLeft),
            i.activeIndex === i.slides.length - 1 && r.cssMode)
          )
            return (
              requestAnimationFrame(() => {
                i.slideTo(i.activeIndex + l, e, t, s);
              }),
              !0
            );
        }
        return r.rewind && i.isEnd
          ? i.slideTo(0, e, t, s)
          : i.slideTo(i.activeIndex + l, e, t, s);
      },
      slidePrev: function (e, t, s) {
        void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
        const i = this,
          {
            params: n,
            snapGrid: r,
            slidesGrid: a,
            rtlTranslate: o,
            enabled: l,
            animating: d,
          } = i;
        if (!l || i.destroyed) return i;
        const c = i.virtual && n.virtual.enabled;
        if (n.loop) {
          if (d && !c && n.loopPreventsSliding) return !1;
          i.loopFix({ direction: "prev" }),
            (i._clientLeft = i.wrapperEl.clientLeft);
        }
        function u(e) {
          return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e);
        }
        const p = u(o ? i.translate : -i.translate),
          m = r.map((e) => u(e));
        let h = r[m.indexOf(p) - 1];
        if (void 0 === h && n.cssMode) {
          let e;
          r.forEach((t, s) => {
            p >= t && (e = s);
          }),
            void 0 !== e && (h = r[e > 0 ? e - 1 : e]);
        }
        let f = 0;
        if (
          (void 0 !== h &&
            ((f = a.indexOf(h)),
            f < 0 && (f = i.activeIndex - 1),
            "auto" === n.slidesPerView &&
              1 === n.slidesPerGroup &&
              n.slidesPerGroupAuto &&
              ((f = f - i.slidesPerViewDynamic("previous", !0) + 1),
              (f = Math.max(f, 0)))),
          n.rewind && i.isBeginning)
        ) {
          const n =
            i.params.virtual && i.params.virtual.enabled && i.virtual
              ? i.virtual.slides.length - 1
              : i.slides.length - 1;
          return i.slideTo(n, e, t, s);
        }
        return n.loop && 0 === i.activeIndex && n.cssMode
          ? (requestAnimationFrame(() => {
              i.slideTo(f, e, t, s);
            }),
            !0)
          : i.slideTo(f, e, t, s);
      },
      slideReset: function (e, t, s) {
        void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
        const i = this;
        if (!i.destroyed) return i.slideTo(i.activeIndex, e, t, s);
      },
      slideToClosest: function (e, t, s, i) {
        void 0 === e && (e = this.params.speed),
          void 0 === t && (t = !0),
          void 0 === i && (i = 0.5);
        const n = this;
        if (n.destroyed) return;
        let r = n.activeIndex;
        const a = Math.min(n.params.slidesPerGroupSkip, r),
          o = a + Math.floor((r - a) / n.params.slidesPerGroup),
          l = n.rtlTranslate ? n.translate : -n.translate;
        if (l >= n.snapGrid[o]) {
          const e = n.snapGrid[o];
          l - e > (n.snapGrid[o + 1] - e) * i && (r += n.params.slidesPerGroup);
        } else {
          const e = n.snapGrid[o - 1];
          l - e <= (n.snapGrid[o] - e) * i && (r -= n.params.slidesPerGroup);
        }
        return (
          (r = Math.max(r, 0)),
          (r = Math.min(r, n.slidesGrid.length - 1)),
          n.slideTo(r, e, t, s)
        );
      },
      slideToClickedSlide: function () {
        const e = this;
        if (e.destroyed) return;
        const { params: t, slidesEl: s } = e,
          i =
            "auto" === t.slidesPerView
              ? e.slidesPerViewDynamic()
              : t.slidesPerView;
        let n,
          r = e.clickedIndex;
        const a = e.isElement ? "swiper-slide" : `.${t.slideClass}`;
        if (t.loop) {
          if (e.animating) return;
          (n = parseInt(
            e.clickedSlide.getAttribute("data-swiper-slide-index"),
            10,
          )),
            t.centeredSlides
              ? r < e.loopedSlides - i / 2 ||
                r > e.slides.length - e.loopedSlides + i / 2
                ? (e.loopFix(),
                  (r = e.getSlideIndex(
                    C(s, `${a}[data-swiper-slide-index="${n}"]`)[0],
                  )),
                  w(() => {
                    e.slideTo(r);
                  }))
                : e.slideTo(r)
              : r > e.slides.length - i
                ? (e.loopFix(),
                  (r = e.getSlideIndex(
                    C(s, `${a}[data-swiper-slide-index="${n}"]`)[0],
                  )),
                  w(() => {
                    e.slideTo(r);
                  }))
                : e.slideTo(r);
        } else e.slideTo(r);
      },
    };
    var U = {
      loopCreate: function (e) {
        const t = this,
          { params: s, slidesEl: i } = t;
        if (!s.loop || (t.virtual && t.params.virtual.enabled)) return;
        const n = () => {
            C(i, `.${s.slideClass}, swiper-slide`).forEach((e, t) => {
              e.setAttribute("data-swiper-slide-index", t);
            });
          },
          r = t.grid && s.grid && s.grid.rows > 1,
          a = s.slidesPerGroup * (r ? s.grid.rows : 1),
          o = t.slides.length % a != 0,
          l = r && t.slides.length % s.grid.rows != 0,
          d = (e) => {
            for (let i = 0; i < e; i += 1) {
              const e = t.isElement
                ? M("swiper-slide", [s.slideBlankClass])
                : M("div", [s.slideClass, s.slideBlankClass]);
              t.slidesEl.append(e);
            }
          };
        if (o) {
          if (s.loopAddBlankSlides) {
            d(a - (t.slides.length % a)), t.recalcSlides(), t.updateSlides();
          } else
            A(
              "Swiper Loop Warning: The number of slides is not even to slidesPerGroup, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)",
            );
          n();
        } else if (l) {
          if (s.loopAddBlankSlides) {
            d(s.grid.rows - (t.slides.length % s.grid.rows)),
              t.recalcSlides(),
              t.updateSlides();
          } else
            A(
              "Swiper Loop Warning: The number of slides is not even to grid.rows, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)",
            );
          n();
        } else n();
        t.loopFix({
          slideRealIndex: e,
          direction: s.centeredSlides ? void 0 : "next",
        });
      },
      loopFix: function (e) {
        let {
          slideRealIndex: t,
          slideTo: s = !0,
          direction: i,
          setTranslate: n,
          activeSlideIndex: r,
          byController: a,
          byMousewheel: o,
        } = void 0 === e ? {} : e;
        const l = this;
        if (!l.params.loop) return;
        l.emit("beforeLoopFix");
        const {
            slides: d,
            allowSlidePrev: c,
            allowSlideNext: u,
            slidesEl: p,
            params: m,
          } = l,
          { centeredSlides: h } = m;
        if (
          ((l.allowSlidePrev = !0),
          (l.allowSlideNext = !0),
          l.virtual && m.virtual.enabled)
        )
          return (
            s &&
              (m.centeredSlides || 0 !== l.snapIndex
                ? m.centeredSlides && l.snapIndex < m.slidesPerView
                  ? l.slideTo(l.virtual.slides.length + l.snapIndex, 0, !1, !0)
                  : l.snapIndex === l.snapGrid.length - 1 &&
                    l.slideTo(l.virtual.slidesBefore, 0, !1, !0)
                : l.slideTo(l.virtual.slides.length, 0, !1, !0)),
            (l.allowSlidePrev = c),
            (l.allowSlideNext = u),
            void l.emit("loopFix")
          );
        let f = m.slidesPerView;
        "auto" === f
          ? (f = l.slidesPerViewDynamic())
          : ((f = Math.ceil(parseFloat(m.slidesPerView, 10))),
            h && f % 2 == 0 && (f += 1));
        const v = m.slidesPerGroupAuto ? f : m.slidesPerGroup;
        let g = v;
        g % v != 0 && (g += v - (g % v)),
          (g += m.loopAdditionalSlides),
          (l.loopedSlides = g);
        const b = l.grid && m.grid && m.grid.rows > 1;
        d.length < f + g
          ? A(
              "Swiper Loop Warning: The number of slides is not enough for loop mode, it will be disabled and not function properly. You need to add more slides (or make duplicates) or lower the values of slidesPerView and slidesPerGroup parameters",
            )
          : b &&
            "row" === m.grid.fill &&
            A(
              "Swiper Loop Warning: Loop mode is not compatible with grid.fill = `row`",
            );
        const y = [],
          w = [];
        let E = l.activeIndex;
        void 0 === r
          ? (r = l.getSlideIndex(
              d.filter((e) => e.classList.contains(m.slideActiveClass))[0],
            ))
          : (E = r);
        const S = "next" === i || !i,
          _ = "prev" === i || !i;
        let T = 0,
          x = 0;
        const L = b ? Math.ceil(d.length / m.grid.rows) : d.length,
          C = (b ? d[r].column : r) + (h && void 0 === n ? -f / 2 + 0.5 : 0);
        if (C < g) {
          T = Math.max(g - C, v);
          for (let e = 0; e < g - C; e += 1) {
            const t = e - Math.floor(e / L) * L;
            if (b) {
              const e = L - t - 1;
              for (let t = d.length - 1; t >= 0; t -= 1)
                d[t].column === e && y.push(t);
            } else y.push(L - t - 1);
          }
        } else if (C + f > L - g) {
          x = Math.max(C - (L - 2 * g), v);
          for (let e = 0; e < x; e += 1) {
            const t = e - Math.floor(e / L) * L;
            b
              ? d.forEach((e, s) => {
                  e.column === t && w.push(s);
                })
              : w.push(t);
          }
        }
        if (
          ((l.__preventObserver__ = !0),
          requestAnimationFrame(() => {
            l.__preventObserver__ = !1;
          }),
          _ &&
            y.forEach((e) => {
              (d[e].swiperLoopMoveDOM = !0),
                p.prepend(d[e]),
                (d[e].swiperLoopMoveDOM = !1);
            }),
          S &&
            w.forEach((e) => {
              (d[e].swiperLoopMoveDOM = !0),
                p.append(d[e]),
                (d[e].swiperLoopMoveDOM = !1);
            }),
          l.recalcSlides(),
          "auto" === m.slidesPerView
            ? l.updateSlides()
            : b &&
              ((y.length > 0 && _) || (w.length > 0 && S)) &&
              l.slides.forEach((e, t) => {
                l.grid.updateSlide(t, e, l.slides);
              }),
          m.watchSlidesProgress && l.updateSlidesOffset(),
          s)
        )
          if (y.length > 0 && _) {
            if (void 0 === t) {
              const e = l.slidesGrid[E],
                t = l.slidesGrid[E + T] - e;
              o
                ? l.setTranslate(l.translate - t)
                : (l.slideTo(E + Math.ceil(T), 0, !1, !0),
                  n &&
                    ((l.touchEventsData.startTranslate =
                      l.touchEventsData.startTranslate - t),
                    (l.touchEventsData.currentTranslate =
                      l.touchEventsData.currentTranslate - t)));
            } else if (n) {
              const e = b ? y.length / m.grid.rows : y.length;
              l.slideTo(l.activeIndex + e, 0, !1, !0),
                (l.touchEventsData.currentTranslate = l.translate);
            }
          } else if (w.length > 0 && S)
            if (void 0 === t) {
              const e = l.slidesGrid[E],
                t = l.slidesGrid[E - x] - e;
              o
                ? l.setTranslate(l.translate - t)
                : (l.slideTo(E - x, 0, !1, !0),
                  n &&
                    ((l.touchEventsData.startTranslate =
                      l.touchEventsData.startTranslate - t),
                    (l.touchEventsData.currentTranslate =
                      l.touchEventsData.currentTranslate - t)));
            } else {
              const e = b ? w.length / m.grid.rows : w.length;
              l.slideTo(l.activeIndex - e, 0, !1, !0);
            }
        if (
          ((l.allowSlidePrev = c),
          (l.allowSlideNext = u),
          l.controller && l.controller.control && !a)
        ) {
          const e = {
            slideRealIndex: t,
            direction: i,
            setTranslate: n,
            activeSlideIndex: r,
            byController: !0,
          };
          Array.isArray(l.controller.control)
            ? l.controller.control.forEach((t) => {
                !t.destroyed &&
                  t.params.loop &&
                  t.loopFix({
                    ...e,
                    slideTo: t.params.slidesPerView === m.slidesPerView && s,
                  });
              })
            : l.controller.control instanceof l.constructor &&
              l.controller.control.params.loop &&
              l.controller.control.loopFix({
                ...e,
                slideTo:
                  l.controller.control.params.slidesPerView ===
                    m.slidesPerView && s,
              });
        }
        l.emit("loopFix");
      },
      loopDestroy: function () {
        const e = this,
          { params: t, slidesEl: s } = e;
        if (!t.loop || (e.virtual && e.params.virtual.enabled)) return;
        e.recalcSlides();
        const i = [];
        e.slides.forEach((e) => {
          const t =
            void 0 === e.swiperSlideIndex
              ? 1 * e.getAttribute("data-swiper-slide-index")
              : e.swiperSlideIndex;
          i[t] = e;
        }),
          e.slides.forEach((e) => {
            e.removeAttribute("data-swiper-slide-index");
          }),
          i.forEach((e) => {
            s.append(e);
          }),
          e.recalcSlides(),
          e.slideTo(e.realIndex, 0);
      },
    };
    function K(e, t, s) {
      const i = y(),
        { params: n } = e,
        r = n.edgeSwipeDetection,
        a = n.edgeSwipeThreshold;
      return (
        !r ||
        !(s <= a || s >= i.innerWidth - a) ||
        ("prevent" === r && (t.preventDefault(), !0))
      );
    }
    function Q(e) {
      const t = this,
        s = g();
      let i = e;
      i.originalEvent && (i = i.originalEvent);
      const n = t.touchEventsData;
      if ("pointerdown" === i.type) {
        if (null !== n.pointerId && n.pointerId !== i.pointerId) return;
        n.pointerId = i.pointerId;
      } else
        "touchstart" === i.type &&
          1 === i.targetTouches.length &&
          (n.touchId = i.targetTouches[0].identifier);
      if ("touchstart" === i.type)
        return void K(t, i, i.targetTouches[0].pageX);
      const { params: r, touches: a, enabled: o } = t;
      if (!o) return;
      if (!r.simulateTouch && "mouse" === i.pointerType) return;
      if (t.animating && r.preventInteractionOnTransition) return;
      !t.animating && r.cssMode && r.loop && t.loopFix();
      let l = i.target;
      if ("wrapper" === r.touchEventsTarget && !t.wrapperEl.contains(l)) return;
      if ("which" in i && 3 === i.which) return;
      if ("button" in i && i.button > 0) return;
      if (n.isTouched && n.isMoved) return;
      const d = !!r.noSwipingClass && "" !== r.noSwipingClass,
        c = i.composedPath ? i.composedPath() : i.path;
      d && i.target && i.target.shadowRoot && c && (l = c[0]);
      const u = r.noSwipingSelector
          ? r.noSwipingSelector
          : `.${r.noSwipingClass}`,
        p = !(!i.target || !i.target.shadowRoot);
      if (
        r.noSwiping &&
        (p
          ? (function (e, t) {
              return (
                void 0 === t && (t = this),
                (function t(s) {
                  if (!s || s === g() || s === y()) return null;
                  s.assignedSlot && (s = s.assignedSlot);
                  const i = s.closest(e);
                  return i || s.getRootNode
                    ? i || t(s.getRootNode().host)
                    : null;
                })(t)
              );
            })(u, l)
          : l.closest(u))
      )
        return void (t.allowClick = !0);
      if (r.swipeHandler && !l.closest(r.swipeHandler)) return;
      (a.currentX = i.pageX), (a.currentY = i.pageY);
      const m = a.currentX,
        h = a.currentY;
      if (!K(t, i, m)) return;
      Object.assign(n, {
        isTouched: !0,
        isMoved: !1,
        allowTouchCallbacks: !0,
        isScrolling: void 0,
        startMoving: void 0,
      }),
        (a.startX = m),
        (a.startY = h),
        (n.touchStartTime = E()),
        (t.allowClick = !0),
        t.updateSize(),
        (t.swipeDirection = void 0),
        r.threshold > 0 && (n.allowThresholdMove = !1);
      let f = !0;
      l.matches(n.focusableElements) &&
        ((f = !1), "SELECT" === l.nodeName && (n.isTouched = !1)),
        s.activeElement &&
          s.activeElement.matches(n.focusableElements) &&
          s.activeElement !== l &&
          s.activeElement.blur();
      const v = f && t.allowTouchMove && r.touchStartPreventDefault;
      (!r.touchStartForcePreventDefault && !v) ||
        l.isContentEditable ||
        i.preventDefault(),
        r.freeMode &&
          r.freeMode.enabled &&
          t.freeMode &&
          t.animating &&
          !r.cssMode &&
          t.freeMode.onTouchStart(),
        t.emit("touchStart", i);
    }
    function J(e) {
      const t = g(),
        s = this,
        i = s.touchEventsData,
        { params: n, touches: r, rtlTranslate: a, enabled: o } = s;
      if (!o) return;
      if (!n.simulateTouch && "mouse" === e.pointerType) return;
      let l,
        d = e;
      if (
        (d.originalEvent && (d = d.originalEvent), "pointermove" === d.type)
      ) {
        if (null !== i.touchId) return;
        if (d.pointerId !== i.pointerId) return;
      }
      if ("touchmove" === d.type) {
        if (
          ((l = [...d.changedTouches].filter(
            (e) => e.identifier === i.touchId,
          )[0]),
          !l || l.identifier !== i.touchId)
        )
          return;
      } else l = d;
      if (!i.isTouched)
        return void (
          i.startMoving &&
          i.isScrolling &&
          s.emit("touchMoveOpposite", d)
        );
      const c = l.pageX,
        u = l.pageY;
      if (d.preventedByNestedSwiper) return (r.startX = c), void (r.startY = u);
      if (!s.allowTouchMove)
        return (
          d.target.matches(i.focusableElements) || (s.allowClick = !1),
          void (
            i.isTouched &&
            (Object.assign(r, {
              startX: c,
              startY: u,
              currentX: c,
              currentY: u,
            }),
            (i.touchStartTime = E()))
          )
        );
      if (n.touchReleaseOnEdges && !n.loop)
        if (s.isVertical()) {
          if (
            (u < r.startY && s.translate <= s.maxTranslate()) ||
            (u > r.startY && s.translate >= s.minTranslate())
          )
            return (i.isTouched = !1), void (i.isMoved = !1);
        } else if (
          (c < r.startX && s.translate <= s.maxTranslate()) ||
          (c > r.startX && s.translate >= s.minTranslate())
        )
          return;
      if (
        t.activeElement &&
        d.target === t.activeElement &&
        d.target.matches(i.focusableElements)
      )
        return (i.isMoved = !0), void (s.allowClick = !1);
      i.allowTouchCallbacks && s.emit("touchMove", d),
        (r.previousX = r.currentX),
        (r.previousY = r.currentY),
        (r.currentX = c),
        (r.currentY = u);
      const p = r.currentX - r.startX,
        m = r.currentY - r.startY;
      if (s.params.threshold && Math.sqrt(p ** 2 + m ** 2) < s.params.threshold)
        return;
      if (void 0 === i.isScrolling) {
        let e;
        (s.isHorizontal() && r.currentY === r.startY) ||
        (s.isVertical() && r.currentX === r.startX)
          ? (i.isScrolling = !1)
          : p * p + m * m >= 25 &&
            ((e = (180 * Math.atan2(Math.abs(m), Math.abs(p))) / Math.PI),
            (i.isScrolling = s.isHorizontal()
              ? e > n.touchAngle
              : 90 - e > n.touchAngle));
      }
      if (
        (i.isScrolling && s.emit("touchMoveOpposite", d),
        void 0 === i.startMoving &&
          ((r.currentX === r.startX && r.currentY === r.startY) ||
            (i.startMoving = !0)),
        i.isScrolling)
      )
        return void (i.isTouched = !1);
      if (!i.startMoving) return;
      (s.allowClick = !1),
        !n.cssMode && d.cancelable && d.preventDefault(),
        n.touchMoveStopPropagation && !n.nested && d.stopPropagation();
      let h = s.isHorizontal() ? p : m,
        f = s.isHorizontal()
          ? r.currentX - r.previousX
          : r.currentY - r.previousY;
      n.oneWayMovement &&
        ((h = Math.abs(h) * (a ? 1 : -1)), (f = Math.abs(f) * (a ? 1 : -1))),
        (r.diff = h),
        (h *= n.touchRatio),
        a && ((h = -h), (f = -f));
      const v = s.touchesDirection;
      (s.swipeDirection = h > 0 ? "prev" : "next"),
        (s.touchesDirection = f > 0 ? "prev" : "next");
      const b = s.params.loop && !n.cssMode,
        y =
          ("next" === s.touchesDirection && s.allowSlideNext) ||
          ("prev" === s.touchesDirection && s.allowSlidePrev);
      if (!i.isMoved) {
        if (
          (b && y && s.loopFix({ direction: s.swipeDirection }),
          (i.startTranslate = s.getTranslate()),
          s.setTransition(0),
          s.animating)
        ) {
          const e = new window.CustomEvent("transitionend", {
            bubbles: !0,
            cancelable: !0,
          });
          s.wrapperEl.dispatchEvent(e);
        }
        (i.allowMomentumBounce = !1),
          !n.grabCursor ||
            (!0 !== s.allowSlideNext && !0 !== s.allowSlidePrev) ||
            s.setGrabCursor(!0),
          s.emit("sliderFirstMove", d);
      }
      if (
        (new Date().getTime(),
        i.isMoved &&
          i.allowThresholdMove &&
          v !== s.touchesDirection &&
          b &&
          y &&
          Math.abs(h) >= 1)
      )
        return (
          Object.assign(r, {
            startX: c,
            startY: u,
            currentX: c,
            currentY: u,
            startTranslate: i.currentTranslate,
          }),
          (i.loopSwapReset = !0),
          void (i.startTranslate = i.currentTranslate)
        );
      s.emit("sliderMove", d),
        (i.isMoved = !0),
        (i.currentTranslate = h + i.startTranslate);
      let w = !0,
        S = n.resistanceRatio;
      if (
        (n.touchReleaseOnEdges && (S = 0),
        h > 0
          ? (b &&
              y &&
              i.allowThresholdMove &&
              i.currentTranslate >
                (n.centeredSlides
                  ? s.minTranslate() - s.slidesSizesGrid[s.activeIndex + 1]
                  : s.minTranslate()) &&
              s.loopFix({
                direction: "prev",
                setTranslate: !0,
                activeSlideIndex: 0,
              }),
            i.currentTranslate > s.minTranslate() &&
              ((w = !1),
              n.resistance &&
                (i.currentTranslate =
                  s.minTranslate() -
                  1 +
                  (-s.minTranslate() + i.startTranslate + h) ** S)))
          : h < 0 &&
            (b &&
              y &&
              i.allowThresholdMove &&
              i.currentTranslate <
                (n.centeredSlides
                  ? s.maxTranslate() +
                    s.slidesSizesGrid[s.slidesSizesGrid.length - 1]
                  : s.maxTranslate()) &&
              s.loopFix({
                direction: "next",
                setTranslate: !0,
                activeSlideIndex:
                  s.slides.length -
                  ("auto" === n.slidesPerView
                    ? s.slidesPerViewDynamic()
                    : Math.ceil(parseFloat(n.slidesPerView, 10))),
              }),
            i.currentTranslate < s.maxTranslate() &&
              ((w = !1),
              n.resistance &&
                (i.currentTranslate =
                  s.maxTranslate() +
                  1 -
                  (s.maxTranslate() - i.startTranslate - h) ** S))),
        w && (d.preventedByNestedSwiper = !0),
        !s.allowSlideNext &&
          "next" === s.swipeDirection &&
          i.currentTranslate < i.startTranslate &&
          (i.currentTranslate = i.startTranslate),
        !s.allowSlidePrev &&
          "prev" === s.swipeDirection &&
          i.currentTranslate > i.startTranslate &&
          (i.currentTranslate = i.startTranslate),
        s.allowSlidePrev ||
          s.allowSlideNext ||
          (i.currentTranslate = i.startTranslate),
        n.threshold > 0)
      ) {
        if (!(Math.abs(h) > n.threshold || i.allowThresholdMove))
          return void (i.currentTranslate = i.startTranslate);
        if (!i.allowThresholdMove)
          return (
            (i.allowThresholdMove = !0),
            (r.startX = r.currentX),
            (r.startY = r.currentY),
            (i.currentTranslate = i.startTranslate),
            void (r.diff = s.isHorizontal()
              ? r.currentX - r.startX
              : r.currentY - r.startY)
          );
      }
      n.followFinger &&
        !n.cssMode &&
        (((n.freeMode && n.freeMode.enabled && s.freeMode) ||
          n.watchSlidesProgress) &&
          (s.updateActiveIndex(), s.updateSlidesClasses()),
        n.freeMode &&
          n.freeMode.enabled &&
          s.freeMode &&
          s.freeMode.onTouchMove(),
        s.updateProgress(i.currentTranslate),
        s.setTranslate(i.currentTranslate));
    }
    function Z(e) {
      const t = this,
        s = t.touchEventsData;
      let i,
        n = e;
      n.originalEvent && (n = n.originalEvent);
      if ("touchend" === n.type || "touchcancel" === n.type) {
        if (
          ((i = [...n.changedTouches].filter(
            (e) => e.identifier === s.touchId,
          )[0]),
          !i || i.identifier !== s.touchId)
        )
          return;
      } else {
        if (null !== s.touchId) return;
        if (n.pointerId !== s.pointerId) return;
        i = n;
      }
      if (
        ["pointercancel", "pointerout", "pointerleave", "contextmenu"].includes(
          n.type,
        )
      ) {
        if (
          !(
            ["pointercancel", "contextmenu"].includes(n.type) &&
            (t.browser.isSafari || t.browser.isWebView)
          )
        )
          return;
      }
      (s.pointerId = null), (s.touchId = null);
      const {
        params: r,
        touches: a,
        rtlTranslate: o,
        slidesGrid: l,
        enabled: d,
      } = t;
      if (!d) return;
      if (!r.simulateTouch && "mouse" === n.pointerType) return;
      if (
        (s.allowTouchCallbacks && t.emit("touchEnd", n),
        (s.allowTouchCallbacks = !1),
        !s.isTouched)
      )
        return (
          s.isMoved && r.grabCursor && t.setGrabCursor(!1),
          (s.isMoved = !1),
          void (s.startMoving = !1)
        );
      r.grabCursor &&
        s.isMoved &&
        s.isTouched &&
        (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) &&
        t.setGrabCursor(!1);
      const c = E(),
        u = c - s.touchStartTime;
      if (t.allowClick) {
        const e = n.path || (n.composedPath && n.composedPath());
        t.updateClickedSlide((e && e[0]) || n.target, e),
          t.emit("tap click", n),
          u < 300 &&
            c - s.lastClickTime < 300 &&
            t.emit("doubleTap doubleClick", n);
      }
      if (
        ((s.lastClickTime = E()),
        w(() => {
          t.destroyed || (t.allowClick = !0);
        }),
        !s.isTouched ||
          !s.isMoved ||
          !t.swipeDirection ||
          (0 === a.diff && !s.loopSwapReset) ||
          (s.currentTranslate === s.startTranslate && !s.loopSwapReset))
      )
        return (s.isTouched = !1), (s.isMoved = !1), void (s.startMoving = !1);
      let p;
      if (
        ((s.isTouched = !1),
        (s.isMoved = !1),
        (s.startMoving = !1),
        (p = r.followFinger
          ? o
            ? t.translate
            : -t.translate
          : -s.currentTranslate),
        r.cssMode)
      )
        return;
      if (r.freeMode && r.freeMode.enabled)
        return void t.freeMode.onTouchEnd({ currentPos: p });
      const m = p >= -t.maxTranslate() && !t.params.loop;
      let h = 0,
        f = t.slidesSizesGrid[0];
      for (
        let e = 0;
        e < l.length;
        e += e < r.slidesPerGroupSkip ? 1 : r.slidesPerGroup
      ) {
        const t = e < r.slidesPerGroupSkip - 1 ? 1 : r.slidesPerGroup;
        void 0 !== l[e + t]
          ? (m || (p >= l[e] && p < l[e + t])) &&
            ((h = e), (f = l[e + t] - l[e]))
          : (m || p >= l[e]) &&
            ((h = e), (f = l[l.length - 1] - l[l.length - 2]));
      }
      let v = null,
        g = null;
      r.rewind &&
        (t.isBeginning
          ? (g =
              r.virtual && r.virtual.enabled && t.virtual
                ? t.virtual.slides.length - 1
                : t.slides.length - 1)
          : t.isEnd && (v = 0));
      const b = (p - l[h]) / f,
        y = h < r.slidesPerGroupSkip - 1 ? 1 : r.slidesPerGroup;
      if (u > r.longSwipesMs) {
        if (!r.longSwipes) return void t.slideTo(t.activeIndex);
        "next" === t.swipeDirection &&
          (b >= r.longSwipesRatio
            ? t.slideTo(r.rewind && t.isEnd ? v : h + y)
            : t.slideTo(h)),
          "prev" === t.swipeDirection &&
            (b > 1 - r.longSwipesRatio
              ? t.slideTo(h + y)
              : null !== g && b < 0 && Math.abs(b) > r.longSwipesRatio
                ? t.slideTo(g)
                : t.slideTo(h));
      } else {
        if (!r.shortSwipes) return void t.slideTo(t.activeIndex);
        t.navigation &&
        (n.target === t.navigation.nextEl || n.target === t.navigation.prevEl)
          ? n.target === t.navigation.nextEl
            ? t.slideTo(h + y)
            : t.slideTo(h)
          : ("next" === t.swipeDirection && t.slideTo(null !== v ? v : h + y),
            "prev" === t.swipeDirection && t.slideTo(null !== g ? g : h));
      }
    }
    function ee() {
      const e = this,
        { params: t, el: s } = e;
      if (s && 0 === s.offsetWidth) return;
      t.breakpoints && e.setBreakpoint();
      const { allowSlideNext: i, allowSlidePrev: n, snapGrid: r } = e,
        a = e.virtual && e.params.virtual.enabled;
      (e.allowSlideNext = !0),
        (e.allowSlidePrev = !0),
        e.updateSize(),
        e.updateSlides(),
        e.updateSlidesClasses();
      const o = a && t.loop;
      !("auto" === t.slidesPerView || t.slidesPerView > 1) ||
      !e.isEnd ||
      e.isBeginning ||
      e.params.centeredSlides ||
      o
        ? e.params.loop && !a
          ? e.slideToLoop(e.realIndex, 0, !1, !0)
          : e.slideTo(e.activeIndex, 0, !1, !0)
        : e.slideTo(e.slides.length - 1, 0, !1, !0),
        e.autoplay &&
          e.autoplay.running &&
          e.autoplay.paused &&
          (clearTimeout(e.autoplay.resizeTimeout),
          (e.autoplay.resizeTimeout = setTimeout(() => {
            e.autoplay &&
              e.autoplay.running &&
              e.autoplay.paused &&
              e.autoplay.resume();
          }, 500))),
        (e.allowSlidePrev = n),
        (e.allowSlideNext = i),
        e.params.watchOverflow && r !== e.snapGrid && e.checkOverflow();
    }
    function te(e) {
      const t = this;
      t.enabled &&
        (t.allowClick ||
          (t.params.preventClicks && e.preventDefault(),
          t.params.preventClicksPropagation &&
            t.animating &&
            (e.stopPropagation(), e.stopImmediatePropagation())));
    }
    function se() {
      const e = this,
        { wrapperEl: t, rtlTranslate: s, enabled: i } = e;
      if (!i) return;
      let n;
      (e.previousTranslate = e.translate),
        e.isHorizontal()
          ? (e.translate = -t.scrollLeft)
          : (e.translate = -t.scrollTop),
        0 === e.translate && (e.translate = 0),
        e.updateActiveIndex(),
        e.updateSlidesClasses();
      const r = e.maxTranslate() - e.minTranslate();
      (n = 0 === r ? 0 : (e.translate - e.minTranslate()) / r),
        n !== e.progress && e.updateProgress(s ? -e.translate : e.translate),
        e.emit("setTranslate", e.translate, !1);
    }
    function ie(e) {
      const t = this;
      F(t, e.target),
        t.params.cssMode ||
          ("auto" !== t.params.slidesPerView && !t.params.autoHeight) ||
          t.update();
    }
    function ne() {
      const e = this;
      e.documentTouchHandlerProceeded ||
        ((e.documentTouchHandlerProceeded = !0),
        e.params.touchReleaseOnEdges && (e.el.style.touchAction = "auto"));
    }
    const re = (e, t) => {
      const s = g(),
        { params: i, el: n, wrapperEl: r, device: a } = e,
        o = !!i.nested,
        l = "on" === t ? "addEventListener" : "removeEventListener",
        d = t;
      s[l]("touchstart", e.onDocumentTouchStart, { passive: !1, capture: o }),
        n[l]("touchstart", e.onTouchStart, { passive: !1 }),
        n[l]("pointerdown", e.onTouchStart, { passive: !1 }),
        s[l]("touchmove", e.onTouchMove, { passive: !1, capture: o }),
        s[l]("pointermove", e.onTouchMove, { passive: !1, capture: o }),
        s[l]("touchend", e.onTouchEnd, { passive: !0 }),
        s[l]("pointerup", e.onTouchEnd, { passive: !0 }),
        s[l]("pointercancel", e.onTouchEnd, { passive: !0 }),
        s[l]("touchcancel", e.onTouchEnd, { passive: !0 }),
        s[l]("pointerout", e.onTouchEnd, { passive: !0 }),
        s[l]("pointerleave", e.onTouchEnd, { passive: !0 }),
        s[l]("contextmenu", e.onTouchEnd, { passive: !0 }),
        (i.preventClicks || i.preventClicksPropagation) &&
          n[l]("click", e.onClick, !0),
        i.cssMode && r[l]("scroll", e.onScroll),
        i.updateOnWindowResize
          ? e[d](
              a.ios || a.android
                ? "resize orientationchange observerUpdate"
                : "resize observerUpdate",
              ee,
              !0,
            )
          : e[d]("observerUpdate", ee, !0),
        n[l]("load", e.onLoad, { capture: !0 });
    };
    const ae = (e, t) => e.grid && t.grid && t.grid.rows > 1;
    var oe = {
      init: !0,
      direction: "horizontal",
      oneWayMovement: !1,
      swiperElementNodeName: "SWIPER-CONTAINER",
      touchEventsTarget: "wrapper",
      initialSlide: 0,
      speed: 300,
      cssMode: !1,
      updateOnWindowResize: !0,
      resizeObserver: !0,
      nested: !1,
      createElements: !1,
      eventsPrefix: "swiper",
      enabled: !0,
      focusableElements:
        "input, select, option, textarea, button, video, label",
      width: null,
      height: null,
      preventInteractionOnTransition: !1,
      userAgent: null,
      url: null,
      edgeSwipeDetection: !1,
      edgeSwipeThreshold: 20,
      autoHeight: !1,
      setWrapperSize: !1,
      virtualTranslate: !1,
      effect: "slide",
      breakpoints: void 0,
      breakpointsBase: "window",
      spaceBetween: 0,
      slidesPerView: 1,
      slidesPerGroup: 1,
      slidesPerGroupSkip: 0,
      slidesPerGroupAuto: !1,
      centeredSlides: !1,
      centeredSlidesBounds: !1,
      slidesOffsetBefore: 0,
      slidesOffsetAfter: 0,
      normalizeSlideIndex: !0,
      centerInsufficientSlides: !1,
      watchOverflow: !0,
      roundLengths: !1,
      touchRatio: 1,
      touchAngle: 45,
      simulateTouch: !0,
      shortSwipes: !0,
      longSwipes: !0,
      longSwipesRatio: 0.5,
      longSwipesMs: 300,
      followFinger: !0,
      allowTouchMove: !0,
      threshold: 5,
      touchMoveStopPropagation: !1,
      touchStartPreventDefault: !0,
      touchStartForcePreventDefault: !1,
      touchReleaseOnEdges: !1,
      uniqueNavElements: !0,
      resistance: !0,
      resistanceRatio: 0.85,
      watchSlidesProgress: !1,
      grabCursor: !1,
      preventClicks: !0,
      preventClicksPropagation: !0,
      slideToClickedSlide: !1,
      loop: !1,
      loopAddBlankSlides: !0,
      loopAdditionalSlides: 0,
      loopPreventsSliding: !0,
      rewind: !1,
      allowSlidePrev: !0,
      allowSlideNext: !0,
      swipeHandler: null,
      noSwiping: !0,
      noSwipingClass: "swiper-no-swiping",
      noSwipingSelector: null,
      passiveListeners: !0,
      maxBackfaceHiddenSlides: 10,
      containerModifierClass: "swiper-",
      slideClass: "swiper-slide",
      slideBlankClass: "swiper-slide-blank",
      slideActiveClass: "swiper-slide-active",
      slideVisibleClass: "swiper-slide-visible",
      slideFullyVisibleClass: "swiper-slide-fully-visible",
      slideNextClass: "swiper-slide-next",
      slidePrevClass: "swiper-slide-prev",
      wrapperClass: "swiper-wrapper",
      lazyPreloaderClass: "swiper-lazy-preloader",
      lazyPreloadPrevNext: 0,
      runCallbacksOnInit: !0,
      _emitClasses: !1,
    };
    function le(e, t) {
      return function (s) {
        void 0 === s && (s = {});
        const i = Object.keys(s)[0],
          n = s[i];
        "object" == typeof n && null !== n
          ? (!0 === e[i] && (e[i] = { enabled: !0 }),
            "navigation" === i &&
              e[i] &&
              e[i].enabled &&
              !e[i].prevEl &&
              !e[i].nextEl &&
              (e[i].auto = !0),
            ["pagination", "scrollbar"].indexOf(i) >= 0 &&
              e[i] &&
              e[i].enabled &&
              !e[i].el &&
              (e[i].auto = !0),
            i in e && "enabled" in n
              ? ("object" != typeof e[i] ||
                  "enabled" in e[i] ||
                  (e[i].enabled = !0),
                e[i] || (e[i] = { enabled: !1 }),
                T(t, s))
              : T(t, s))
          : T(t, s);
      };
    }
    const de = {
        eventsEmitter: V,
        update: j,
        translate: W,
        transition: {
          setTransition: function (e, t) {
            const s = this;
            s.params.cssMode ||
              ((s.wrapperEl.style.transitionDuration = `${e}ms`),
              (s.wrapperEl.style.transitionDelay = 0 === e ? "0ms" : "")),
              s.emit("setTransition", e, t);
          },
          transitionStart: function (e, t) {
            void 0 === e && (e = !0);
            const s = this,
              { params: i } = s;
            i.cssMode ||
              (i.autoHeight && s.updateAutoHeight(),
              Y({ swiper: s, runCallbacks: e, direction: t, step: "Start" }));
          },
          transitionEnd: function (e, t) {
            void 0 === e && (e = !0);
            const s = this,
              { params: i } = s;
            (s.animating = !1),
              i.cssMode ||
                (s.setTransition(0),
                Y({ swiper: s, runCallbacks: e, direction: t, step: "End" }));
          },
        },
        slide: X,
        loop: U,
        grabCursor: {
          setGrabCursor: function (e) {
            const t = this;
            if (
              !t.params.simulateTouch ||
              (t.params.watchOverflow && t.isLocked) ||
              t.params.cssMode
            )
              return;
            const s =
              "container" === t.params.touchEventsTarget ? t.el : t.wrapperEl;
            t.isElement && (t.__preventObserver__ = !0),
              (s.style.cursor = "move"),
              (s.style.cursor = e ? "grabbing" : "grab"),
              t.isElement &&
                requestAnimationFrame(() => {
                  t.__preventObserver__ = !1;
                });
          },
          unsetGrabCursor: function () {
            const e = this;
            (e.params.watchOverflow && e.isLocked) ||
              e.params.cssMode ||
              (e.isElement && (e.__preventObserver__ = !0),
              (e[
                "container" === e.params.touchEventsTarget ? "el" : "wrapperEl"
              ].style.cursor = ""),
              e.isElement &&
                requestAnimationFrame(() => {
                  e.__preventObserver__ = !1;
                }));
          },
        },
        events: {
          attachEvents: function () {
            const e = this,
              { params: t } = e;
            (e.onTouchStart = Q.bind(e)),
              (e.onTouchMove = J.bind(e)),
              (e.onTouchEnd = Z.bind(e)),
              (e.onDocumentTouchStart = ne.bind(e)),
              t.cssMode && (e.onScroll = se.bind(e)),
              (e.onClick = te.bind(e)),
              (e.onLoad = ie.bind(e)),
              re(e, "on");
          },
          detachEvents: function () {
            re(this, "off");
          },
        },
        breakpoints: {
          setBreakpoint: function () {
            const e = this,
              { realIndex: t, initialized: s, params: i, el: n } = e,
              r = i.breakpoints;
            if (!r || (r && 0 === Object.keys(r).length)) return;
            const a = e.getBreakpoint(r, e.params.breakpointsBase, e.el);
            if (!a || e.currentBreakpoint === a) return;
            const o = (a in r ? r[a] : void 0) || e.originalParams,
              l = ae(e, i),
              d = ae(e, o),
              c = i.enabled;
            l && !d
              ? (n.classList.remove(
                  `${i.containerModifierClass}grid`,
                  `${i.containerModifierClass}grid-column`,
                ),
                e.emitContainerClasses())
              : !l &&
                d &&
                (n.classList.add(`${i.containerModifierClass}grid`),
                ((o.grid.fill && "column" === o.grid.fill) ||
                  (!o.grid.fill && "column" === i.grid.fill)) &&
                  n.classList.add(`${i.containerModifierClass}grid-column`),
                e.emitContainerClasses()),
              ["navigation", "pagination", "scrollbar"].forEach((t) => {
                if (void 0 === o[t]) return;
                const s = i[t] && i[t].enabled,
                  n = o[t] && o[t].enabled;
                s && !n && e[t].disable(), !s && n && e[t].enable();
              });
            const u = o.direction && o.direction !== i.direction,
              p = i.loop && (o.slidesPerView !== i.slidesPerView || u),
              m = i.loop;
            u && s && e.changeDirection(), T(e.params, o);
            const h = e.params.enabled,
              f = e.params.loop;
            Object.assign(e, {
              allowTouchMove: e.params.allowTouchMove,
              allowSlideNext: e.params.allowSlideNext,
              allowSlidePrev: e.params.allowSlidePrev,
            }),
              c && !h ? e.disable() : !c && h && e.enable(),
              (e.currentBreakpoint = a),
              e.emit("_beforeBreakpoint", o),
              s &&
                (p
                  ? (e.loopDestroy(), e.loopCreate(t), e.updateSlides())
                  : !m && f
                    ? (e.loopCreate(t), e.updateSlides())
                    : m && !f && e.loopDestroy()),
              e.emit("breakpoint", o);
          },
          getBreakpoint: function (e, t, s) {
            if (
              (void 0 === t && (t = "window"), !e || ("container" === t && !s))
            )
              return;
            let i = !1;
            const n = y(),
              r = "window" === t ? n.innerHeight : s.clientHeight,
              a = Object.keys(e).map((e) => {
                if ("string" == typeof e && 0 === e.indexOf("@")) {
                  const t = parseFloat(e.substr(1));
                  return { value: r * t, point: e };
                }
                return { value: e, point: e };
              });
            a.sort((e, t) => parseInt(e.value, 10) - parseInt(t.value, 10));
            for (let e = 0; e < a.length; e += 1) {
              const { point: r, value: o } = a[e];
              "window" === t
                ? n.matchMedia(`(min-width: ${o}px)`).matches && (i = r)
                : o <= s.clientWidth && (i = r);
            }
            return i || "max";
          },
        },
        checkOverflow: {
          checkOverflow: function () {
            const e = this,
              { isLocked: t, params: s } = e,
              { slidesOffsetBefore: i } = s;
            if (i) {
              const t = e.slides.length - 1,
                s = e.slidesGrid[t] + e.slidesSizesGrid[t] + 2 * i;
              e.isLocked = e.size > s;
            } else e.isLocked = 1 === e.snapGrid.length;
            !0 === s.allowSlideNext && (e.allowSlideNext = !e.isLocked),
              !0 === s.allowSlidePrev && (e.allowSlidePrev = !e.isLocked),
              t && t !== e.isLocked && (e.isEnd = !1),
              t !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock");
          },
        },
        classes: {
          addClasses: function () {
            const e = this,
              { classNames: t, params: s, rtl: i, el: n, device: r } = e,
              a = (function (e, t) {
                const s = [];
                return (
                  e.forEach((e) => {
                    "object" == typeof e
                      ? Object.keys(e).forEach((i) => {
                          e[i] && s.push(t + i);
                        })
                      : "string" == typeof e && s.push(t + e);
                  }),
                  s
                );
              })(
                [
                  "initialized",
                  s.direction,
                  { "free-mode": e.params.freeMode && s.freeMode.enabled },
                  { autoheight: s.autoHeight },
                  { rtl: i },
                  { grid: s.grid && s.grid.rows > 1 },
                  {
                    "grid-column":
                      s.grid && s.grid.rows > 1 && "column" === s.grid.fill,
                  },
                  { android: r.android },
                  { ios: r.ios },
                  { "css-mode": s.cssMode },
                  { centered: s.cssMode && s.centeredSlides },
                  { "watch-progress": s.watchSlidesProgress },
                ],
                s.containerModifierClass,
              );
            t.push(...a), n.classList.add(...t), e.emitContainerClasses();
          },
          removeClasses: function () {
            const { el: e, classNames: t } = this;
            e.classList.remove(...t), this.emitContainerClasses();
          },
        },
      },
      ce = {};
    class ue {
      constructor() {
        let e, t;
        for (var s = arguments.length, i = new Array(s), n = 0; n < s; n++)
          i[n] = arguments[n];
        1 === i.length &&
        i[0].constructor &&
        "Object" === Object.prototype.toString.call(i[0]).slice(8, -1)
          ? (t = i[0])
          : ([e, t] = i),
          t || (t = {}),
          (t = T({}, t)),
          e && !t.el && (t.el = e);
        const r = g();
        if (
          t.el &&
          "string" == typeof t.el &&
          r.querySelectorAll(t.el).length > 1
        ) {
          const e = [];
          return (
            r.querySelectorAll(t.el).forEach((s) => {
              const i = T({}, t, { el: s });
              e.push(new ue(i));
            }),
            e
          );
        }
        const a = this;
        (a.__swiper__ = !0),
          (a.support = B()),
          (a.device = G({ userAgent: t.userAgent })),
          (a.browser = N()),
          (a.eventsListeners = {}),
          (a.eventsAnyListeners = []),
          (a.modules = [...a.__modules__]),
          t.modules && Array.isArray(t.modules) && a.modules.push(...t.modules);
        const o = {};
        a.modules.forEach((e) => {
          e({
            params: t,
            swiper: a,
            extendParams: le(t, o),
            on: a.on.bind(a),
            once: a.once.bind(a),
            off: a.off.bind(a),
            emit: a.emit.bind(a),
          });
        });
        const l = T({}, oe, o);
        return (
          (a.params = T({}, l, ce, t)),
          (a.originalParams = T({}, a.params)),
          (a.passedParams = T({}, t)),
          a.params &&
            a.params.on &&
            Object.keys(a.params.on).forEach((e) => {
              a.on(e, a.params.on[e]);
            }),
          a.params && a.params.onAny && a.onAny(a.params.onAny),
          Object.assign(a, {
            enabled: a.params.enabled,
            el: e,
            classNames: [],
            slides: [],
            slidesGrid: [],
            snapGrid: [],
            slidesSizesGrid: [],
            isHorizontal: () => "horizontal" === a.params.direction,
            isVertical: () => "vertical" === a.params.direction,
            activeIndex: 0,
            realIndex: 0,
            isBeginning: !0,
            isEnd: !1,
            translate: 0,
            previousTranslate: 0,
            progress: 0,
            velocity: 0,
            animating: !1,
            cssOverflowAdjustment() {
              return Math.trunc(this.translate / 2 ** 23) * 2 ** 23;
            },
            allowSlideNext: a.params.allowSlideNext,
            allowSlidePrev: a.params.allowSlidePrev,
            touchEventsData: {
              isTouched: void 0,
              isMoved: void 0,
              allowTouchCallbacks: void 0,
              touchStartTime: void 0,
              isScrolling: void 0,
              currentTranslate: void 0,
              startTranslate: void 0,
              allowThresholdMove: void 0,
              focusableElements: a.params.focusableElements,
              lastClickTime: 0,
              clickTimeout: void 0,
              velocities: [],
              allowMomentumBounce: void 0,
              startMoving: void 0,
              pointerId: null,
              touchId: null,
            },
            allowClick: !0,
            allowTouchMove: a.params.allowTouchMove,
            touches: {
              startX: 0,
              startY: 0,
              currentX: 0,
              currentY: 0,
              diff: 0,
            },
            imagesToLoad: [],
            imagesLoaded: 0,
          }),
          a.emit("_swiper"),
          a.params.init && a.init(),
          a
        );
      }
      getDirectionLabel(e) {
        return this.isHorizontal()
          ? e
          : {
              width: "height",
              "margin-top": "margin-left",
              "margin-bottom ": "margin-right",
              "margin-left": "margin-top",
              "margin-right": "margin-bottom",
              "padding-left": "padding-top",
              "padding-right": "padding-bottom",
              marginRight: "marginBottom",
            }[e];
      }
      getSlideIndex(e) {
        const { slidesEl: t, params: s } = this,
          i = k(C(t, `.${s.slideClass}, swiper-slide`)[0]);
        return k(e) - i;
      }
      getSlideIndexByData(e) {
        return this.getSlideIndex(
          this.slides.filter(
            (t) => 1 * t.getAttribute("data-swiper-slide-index") === e,
          )[0],
        );
      }
      recalcSlides() {
        const { slidesEl: e, params: t } = this;
        this.slides = C(e, `.${t.slideClass}, swiper-slide`);
      }
      enable() {
        const e = this;
        e.enabled ||
          ((e.enabled = !0),
          e.params.grabCursor && e.setGrabCursor(),
          e.emit("enable"));
      }
      disable() {
        const e = this;
        e.enabled &&
          ((e.enabled = !1),
          e.params.grabCursor && e.unsetGrabCursor(),
          e.emit("disable"));
      }
      setProgress(e, t) {
        const s = this;
        e = Math.min(Math.max(e, 0), 1);
        const i = s.minTranslate(),
          n = (s.maxTranslate() - i) * e + i;
        s.translateTo(n, void 0 === t ? 0 : t),
          s.updateActiveIndex(),
          s.updateSlidesClasses();
      }
      emitContainerClasses() {
        const e = this;
        if (!e.params._emitClasses || !e.el) return;
        const t = e.el.className
          .split(" ")
          .filter(
            (t) =>
              0 === t.indexOf("swiper") ||
              0 === t.indexOf(e.params.containerModifierClass),
          );
        e.emit("_containerClasses", t.join(" "));
      }
      getSlideClasses(e) {
        const t = this;
        return t.destroyed
          ? ""
          : e.className
              .split(" ")
              .filter(
                (e) =>
                  0 === e.indexOf("swiper-slide") ||
                  0 === e.indexOf(t.params.slideClass),
              )
              .join(" ");
      }
      emitSlidesClasses() {
        const e = this;
        if (!e.params._emitClasses || !e.el) return;
        const t = [];
        e.slides.forEach((s) => {
          const i = e.getSlideClasses(s);
          t.push({ slideEl: s, classNames: i }), e.emit("_slideClass", s, i);
        }),
          e.emit("_slideClasses", t);
      }
      slidesPerViewDynamic(e, t) {
        void 0 === e && (e = "current"), void 0 === t && (t = !1);
        const {
          params: s,
          slides: i,
          slidesGrid: n,
          slidesSizesGrid: r,
          size: a,
          activeIndex: o,
        } = this;
        let l = 1;
        if ("number" == typeof s.slidesPerView) return s.slidesPerView;
        if (s.centeredSlides) {
          let e,
            t = i[o] ? Math.ceil(i[o].swiperSlideSize) : 0;
          for (let s = o + 1; s < i.length; s += 1)
            i[s] &&
              !e &&
              ((t += Math.ceil(i[s].swiperSlideSize)),
              (l += 1),
              t > a && (e = !0));
          for (let s = o - 1; s >= 0; s -= 1)
            i[s] &&
              !e &&
              ((t += i[s].swiperSlideSize), (l += 1), t > a && (e = !0));
        } else if ("current" === e)
          for (let e = o + 1; e < i.length; e += 1) {
            (t ? n[e] + r[e] - n[o] < a : n[e] - n[o] < a) && (l += 1);
          }
        else
          for (let e = o - 1; e >= 0; e -= 1) {
            n[o] - n[e] < a && (l += 1);
          }
        return l;
      }
      update() {
        const e = this;
        if (!e || e.destroyed) return;
        const { snapGrid: t, params: s } = e;
        function i() {
          const t = e.rtlTranslate ? -1 * e.translate : e.translate,
            s = Math.min(Math.max(t, e.maxTranslate()), e.minTranslate());
          e.setTranslate(s), e.updateActiveIndex(), e.updateSlidesClasses();
        }
        let n;
        if (
          (s.breakpoints && e.setBreakpoint(),
          [...e.el.querySelectorAll('[loading="lazy"]')].forEach((t) => {
            t.complete && F(e, t);
          }),
          e.updateSize(),
          e.updateSlides(),
          e.updateProgress(),
          e.updateSlidesClasses(),
          s.freeMode && s.freeMode.enabled && !s.cssMode)
        )
          i(), s.autoHeight && e.updateAutoHeight();
        else {
          if (
            ("auto" === s.slidesPerView || s.slidesPerView > 1) &&
            e.isEnd &&
            !s.centeredSlides
          ) {
            const t =
              e.virtual && s.virtual.enabled ? e.virtual.slides : e.slides;
            n = e.slideTo(t.length - 1, 0, !1, !0);
          } else n = e.slideTo(e.activeIndex, 0, !1, !0);
          n || i();
        }
        s.watchOverflow && t !== e.snapGrid && e.checkOverflow(),
          e.emit("update");
      }
      changeDirection(e, t) {
        void 0 === t && (t = !0);
        const s = this,
          i = s.params.direction;
        return (
          e || (e = "horizontal" === i ? "vertical" : "horizontal"),
          e === i ||
            ("horizontal" !== e && "vertical" !== e) ||
            (s.el.classList.remove(`${s.params.containerModifierClass}${i}`),
            s.el.classList.add(`${s.params.containerModifierClass}${e}`),
            s.emitContainerClasses(),
            (s.params.direction = e),
            s.slides.forEach((t) => {
              "vertical" === e ? (t.style.width = "") : (t.style.height = "");
            }),
            s.emit("changeDirection"),
            t && s.update()),
          s
        );
      }
      changeLanguageDirection(e) {
        const t = this;
        (t.rtl && "rtl" === e) ||
          (!t.rtl && "ltr" === e) ||
          ((t.rtl = "rtl" === e),
          (t.rtlTranslate = "horizontal" === t.params.direction && t.rtl),
          t.rtl
            ? (t.el.classList.add(`${t.params.containerModifierClass}rtl`),
              (t.el.dir = "rtl"))
            : (t.el.classList.remove(`${t.params.containerModifierClass}rtl`),
              (t.el.dir = "ltr")),
          t.update());
      }
      mount(e) {
        const t = this;
        if (t.mounted) return !0;
        let s = e || t.params.el;
        if (("string" == typeof s && (s = document.querySelector(s)), !s))
          return !1;
        (s.swiper = t),
          s.parentNode &&
            s.parentNode.host &&
            s.parentNode.host.nodeName ===
              t.params.swiperElementNodeName.toUpperCase() &&
            (t.isElement = !0);
        const i = () =>
          `.${(t.params.wrapperClass || "").trim().split(" ").join(".")}`;
        let n = (() => {
          if (s && s.shadowRoot && s.shadowRoot.querySelector) {
            return s.shadowRoot.querySelector(i());
          }
          return C(s, i())[0];
        })();
        return (
          !n &&
            t.params.createElements &&
            ((n = M("div", t.params.wrapperClass)),
            s.append(n),
            C(s, `.${t.params.slideClass}`).forEach((e) => {
              n.append(e);
            })),
          Object.assign(t, {
            el: s,
            wrapperEl: n,
            slidesEl:
              t.isElement && !s.parentNode.host.slideSlots
                ? s.parentNode.host
                : n,
            hostEl: t.isElement ? s.parentNode.host : s,
            mounted: !0,
            rtl: "rtl" === s.dir.toLowerCase() || "rtl" === P(s, "direction"),
            rtlTranslate:
              "horizontal" === t.params.direction &&
              ("rtl" === s.dir.toLowerCase() || "rtl" === P(s, "direction")),
            wrongRTL: "-webkit-box" === P(n, "display"),
          }),
          !0
        );
      }
      init(e) {
        const t = this;
        if (t.initialized) return t;
        if (!1 === t.mount(e)) return t;
        t.emit("beforeInit"),
          t.params.breakpoints && t.setBreakpoint(),
          t.addClasses(),
          t.updateSize(),
          t.updateSlides(),
          t.params.watchOverflow && t.checkOverflow(),
          t.params.grabCursor && t.enabled && t.setGrabCursor(),
          t.params.loop && t.virtual && t.params.virtual.enabled
            ? t.slideTo(
                t.params.initialSlide + t.virtual.slidesBefore,
                0,
                t.params.runCallbacksOnInit,
                !1,
                !0,
              )
            : t.slideTo(
                t.params.initialSlide,
                0,
                t.params.runCallbacksOnInit,
                !1,
                !0,
              ),
          t.params.loop && t.loopCreate(),
          t.attachEvents();
        const s = [...t.el.querySelectorAll('[loading="lazy"]')];
        return (
          t.isElement &&
            s.push(...t.hostEl.querySelectorAll('[loading="lazy"]')),
          s.forEach((e) => {
            e.complete
              ? F(t, e)
              : e.addEventListener("load", (e) => {
                  F(t, e.target);
                });
          }),
          R(t),
          (t.initialized = !0),
          R(t),
          t.emit("init"),
          t.emit("afterInit"),
          t
        );
      }
      destroy(e, t) {
        void 0 === e && (e = !0), void 0 === t && (t = !0);
        const s = this,
          { params: i, el: n, wrapperEl: r, slides: a } = s;
        return (
          void 0 === s.params ||
            s.destroyed ||
            (s.emit("beforeDestroy"),
            (s.initialized = !1),
            s.detachEvents(),
            i.loop && s.loopDestroy(),
            t &&
              (s.removeClasses(),
              n.removeAttribute("style"),
              r.removeAttribute("style"),
              a &&
                a.length &&
                a.forEach((e) => {
                  e.classList.remove(
                    i.slideVisibleClass,
                    i.slideFullyVisibleClass,
                    i.slideActiveClass,
                    i.slideNextClass,
                    i.slidePrevClass,
                  ),
                    e.removeAttribute("style"),
                    e.removeAttribute("data-swiper-slide-index");
                })),
            s.emit("destroy"),
            Object.keys(s.eventsListeners).forEach((e) => {
              s.off(e);
            }),
            !1 !== e &&
              ((s.el.swiper = null),
              (function (e) {
                const t = e;
                Object.keys(t).forEach((e) => {
                  try {
                    t[e] = null;
                  } catch (e) {}
                  try {
                    delete t[e];
                  } catch (e) {}
                });
              })(s)),
            (s.destroyed = !0)),
          null
        );
      }
      static extendDefaults(e) {
        T(ce, e);
      }
      static get extendedDefaults() {
        return ce;
      }
      static get defaults() {
        return oe;
      }
      static installModule(e) {
        ue.prototype.__modules__ || (ue.prototype.__modules__ = []);
        const t = ue.prototype.__modules__;
        "function" == typeof e && t.indexOf(e) < 0 && t.push(e);
      }
      static use(e) {
        return Array.isArray(e)
          ? (e.forEach((e) => ue.installModule(e)), ue)
          : (ue.installModule(e), ue);
      }
    }
    function pe(e, t, s, i) {
      return (
        e.params.createElements &&
          Object.keys(i).forEach((n) => {
            if (!s[n] && !0 === s.auto) {
              let r = C(e.el, `.${i[n]}`)[0];
              r || ((r = M("div", i[n])), (r.className = i[n]), e.el.append(r)),
                (s[n] = r),
                (t[n] = r);
            }
          }),
        s
      );
    }
    function me(e) {
      let { swiper: t, extendParams: s, on: i, emit: n } = e;
      function r(e) {
        let s;
        return e &&
          "string" == typeof e &&
          t.isElement &&
          ((s = t.el.querySelector(e)), s)
          ? s
          : (e &&
              ("string" == typeof e && (s = [...document.querySelectorAll(e)]),
              t.params.uniqueNavElements &&
                "string" == typeof e &&
                s.length > 1 &&
                1 === t.el.querySelectorAll(e).length &&
                (s = t.el.querySelector(e))),
            e && !s ? e : s);
      }
      function a(e, s) {
        const i = t.params.navigation;
        (e = q(e)).forEach((e) => {
          e &&
            (e.classList[s ? "add" : "remove"](...i.disabledClass.split(" ")),
            "BUTTON" === e.tagName && (e.disabled = s),
            t.params.watchOverflow &&
              t.enabled &&
              e.classList[t.isLocked ? "add" : "remove"](i.lockClass));
        });
      }
      function o() {
        const { nextEl: e, prevEl: s } = t.navigation;
        if (t.params.loop) return a(s, !1), void a(e, !1);
        a(s, t.isBeginning && !t.params.rewind),
          a(e, t.isEnd && !t.params.rewind);
      }
      function l(e) {
        e.preventDefault(),
          (!t.isBeginning || t.params.loop || t.params.rewind) &&
            (t.slidePrev(), n("navigationPrev"));
      }
      function d(e) {
        e.preventDefault(),
          (!t.isEnd || t.params.loop || t.params.rewind) &&
            (t.slideNext(), n("navigationNext"));
      }
      function c() {
        const e = t.params.navigation;
        if (
          ((t.params.navigation = pe(
            t,
            t.originalParams.navigation,
            t.params.navigation,
            { nextEl: "swiper-button-next", prevEl: "swiper-button-prev" },
          )),
          !e.nextEl && !e.prevEl)
        )
          return;
        let s = r(e.nextEl),
          i = r(e.prevEl);
        Object.assign(t.navigation, { nextEl: s, prevEl: i }),
          (s = q(s)),
          (i = q(i));
        const n = (s, i) => {
          s && s.addEventListener("click", "next" === i ? d : l),
            !t.enabled && s && s.classList.add(...e.lockClass.split(" "));
        };
        s.forEach((e) => n(e, "next")), i.forEach((e) => n(e, "prev"));
      }
      function u() {
        let { nextEl: e, prevEl: s } = t.navigation;
        (e = q(e)), (s = q(s));
        const i = (e, s) => {
          e.removeEventListener("click", "next" === s ? d : l),
            e.classList.remove(...t.params.navigation.disabledClass.split(" "));
        };
        e.forEach((e) => i(e, "next")), s.forEach((e) => i(e, "prev"));
      }
      s({
        navigation: {
          nextEl: null,
          prevEl: null,
          hideOnClick: !1,
          disabledClass: "swiper-button-disabled",
          hiddenClass: "swiper-button-hidden",
          lockClass: "swiper-button-lock",
          navigationDisabledClass: "swiper-navigation-disabled",
        },
      }),
        (t.navigation = { nextEl: null, prevEl: null }),
        i("init", () => {
          !1 === t.params.navigation.enabled ? p() : (c(), o());
        }),
        i("toEdge fromEdge lock unlock", () => {
          o();
        }),
        i("destroy", () => {
          u();
        }),
        i("enable disable", () => {
          let { nextEl: e, prevEl: s } = t.navigation;
          (e = q(e)),
            (s = q(s)),
            t.enabled
              ? o()
              : [...e, ...s]
                  .filter((e) => !!e)
                  .forEach((e) =>
                    e.classList.add(t.params.navigation.lockClass),
                  );
        }),
        i("click", (e, s) => {
          let { nextEl: i, prevEl: r } = t.navigation;
          (i = q(i)), (r = q(r));
          const a = s.target;
          if (
            t.params.navigation.hideOnClick &&
            !r.includes(a) &&
            !i.includes(a)
          ) {
            if (
              t.pagination &&
              t.params.pagination &&
              t.params.pagination.clickable &&
              (t.pagination.el === a || t.pagination.el.contains(a))
            )
              return;
            let e;
            i.length
              ? (e = i[0].classList.contains(t.params.navigation.hiddenClass))
              : r.length &&
                (e = r[0].classList.contains(t.params.navigation.hiddenClass)),
              n(!0 === e ? "navigationShow" : "navigationHide"),
              [...i, ...r]
                .filter((e) => !!e)
                .forEach((e) =>
                  e.classList.toggle(t.params.navigation.hiddenClass),
                );
          }
        });
      const p = () => {
        t.el.classList.add(
          ...t.params.navigation.navigationDisabledClass.split(" "),
        ),
          u();
      };
      Object.assign(t.navigation, {
        enable: () => {
          t.el.classList.remove(
            ...t.params.navigation.navigationDisabledClass.split(" "),
          ),
            c(),
            o();
        },
        disable: p,
        update: o,
        init: c,
        destroy: u,
      });
    }
    function he(e) {
      return (
        void 0 === e && (e = ""),
        `.${e
          .trim()
          .replace(/([\.:!+\/])/g, "\\$1")
          .replace(/ /g, ".")}`
      );
    }
    function fe(e) {
      let { swiper: t, extendParams: s, on: i, emit: n } = e;
      const r = "swiper-pagination";
      let a;
      s({
        pagination: {
          el: null,
          bulletElement: "span",
          clickable: !1,
          hideOnClick: !1,
          renderBullet: null,
          renderProgressbar: null,
          renderFraction: null,
          renderCustom: null,
          progressbarOpposite: !1,
          type: "bullets",
          dynamicBullets: !1,
          dynamicMainBullets: 1,
          formatFractionCurrent: (e) => e,
          formatFractionTotal: (e) => e,
          bulletClass: `${r}-bullet`,
          bulletActiveClass: `${r}-bullet-active`,
          modifierClass: `${r}-`,
          currentClass: `${r}-current`,
          totalClass: `${r}-total`,
          hiddenClass: `${r}-hidden`,
          progressbarFillClass: `${r}-progressbar-fill`,
          progressbarOppositeClass: `${r}-progressbar-opposite`,
          clickableClass: `${r}-clickable`,
          lockClass: `${r}-lock`,
          horizontalClass: `${r}-horizontal`,
          verticalClass: `${r}-vertical`,
          paginationDisabledClass: `${r}-disabled`,
        },
      }),
        (t.pagination = { el: null, bullets: [] });
      let o = 0;
      function l() {
        return (
          !t.params.pagination.el ||
          !t.pagination.el ||
          (Array.isArray(t.pagination.el) && 0 === t.pagination.el.length)
        );
      }
      function d(e, s) {
        const { bulletActiveClass: i } = t.params.pagination;
        e &&
          (e = e[("prev" === s ? "previous" : "next") + "ElementSibling"]) &&
          (e.classList.add(`${i}-${s}`),
          (e = e[("prev" === s ? "previous" : "next") + "ElementSibling"]) &&
            e.classList.add(`${i}-${s}-${s}`));
      }
      function c(e) {
        const s = e.target.closest(he(t.params.pagination.bulletClass));
        if (!s) return;
        e.preventDefault();
        const i = k(s) * t.params.slidesPerGroup;
        if (t.params.loop) {
          if (t.realIndex === i) return;
          t.slideToLoop(i);
        } else t.slideTo(i);
      }
      function u() {
        const e = t.rtl,
          s = t.params.pagination;
        if (l()) return;
        let i,
          r,
          c = t.pagination.el;
        c = q(c);
        const u =
            t.virtual && t.params.virtual.enabled
              ? t.virtual.slides.length
              : t.slides.length,
          p = t.params.loop
            ? Math.ceil(u / t.params.slidesPerGroup)
            : t.snapGrid.length;
        if (
          (t.params.loop
            ? ((r = t.previousRealIndex || 0),
              (i =
                t.params.slidesPerGroup > 1
                  ? Math.floor(t.realIndex / t.params.slidesPerGroup)
                  : t.realIndex))
            : void 0 !== t.snapIndex
              ? ((i = t.snapIndex), (r = t.previousSnapIndex))
              : ((r = t.previousIndex || 0), (i = t.activeIndex || 0)),
          "bullets" === s.type &&
            t.pagination.bullets &&
            t.pagination.bullets.length > 0)
        ) {
          const n = t.pagination.bullets;
          let l, u, p;
          if (
            (s.dynamicBullets &&
              ((a = I(n[0], t.isHorizontal() ? "width" : "height", !0)),
              c.forEach((e) => {
                e.style[t.isHorizontal() ? "width" : "height"] =
                  a * (s.dynamicMainBullets + 4) + "px";
              }),
              s.dynamicMainBullets > 1 &&
                void 0 !== r &&
                ((o += i - (r || 0)),
                o > s.dynamicMainBullets - 1
                  ? (o = s.dynamicMainBullets - 1)
                  : o < 0 && (o = 0)),
              (l = Math.max(i - o, 0)),
              (u = l + (Math.min(n.length, s.dynamicMainBullets) - 1)),
              (p = (u + l) / 2)),
            n.forEach((e) => {
              const t = [
                ...[
                  "",
                  "-next",
                  "-next-next",
                  "-prev",
                  "-prev-prev",
                  "-main",
                ].map((e) => `${s.bulletActiveClass}${e}`),
              ]
                .map((e) =>
                  "string" == typeof e && e.includes(" ") ? e.split(" ") : e,
                )
                .flat();
              e.classList.remove(...t);
            }),
            c.length > 1)
          )
            n.forEach((e) => {
              const n = k(e);
              n === i
                ? e.classList.add(...s.bulletActiveClass.split(" "))
                : t.isElement && e.setAttribute("part", "bullet"),
                s.dynamicBullets &&
                  (n >= l &&
                    n <= u &&
                    e.classList.add(
                      ...`${s.bulletActiveClass}-main`.split(" "),
                    ),
                  n === l && d(e, "prev"),
                  n === u && d(e, "next"));
            });
          else {
            const e = n[i];
            if (
              (e && e.classList.add(...s.bulletActiveClass.split(" ")),
              t.isElement &&
                n.forEach((e, t) => {
                  e.setAttribute("part", t === i ? "bullet-active" : "bullet");
                }),
              s.dynamicBullets)
            ) {
              const e = n[l],
                t = n[u];
              for (let e = l; e <= u; e += 1)
                n[e] &&
                  n[e].classList.add(
                    ...`${s.bulletActiveClass}-main`.split(" "),
                  );
              d(e, "prev"), d(t, "next");
            }
          }
          if (s.dynamicBullets) {
            const i = Math.min(n.length, s.dynamicMainBullets + 4),
              r = (a * i - a) / 2 - p * a,
              o = e ? "right" : "left";
            n.forEach((e) => {
              e.style[t.isHorizontal() ? o : "top"] = `${r}px`;
            });
          }
        }
        c.forEach((e, r) => {
          if (
            ("fraction" === s.type &&
              (e.querySelectorAll(he(s.currentClass)).forEach((e) => {
                e.textContent = s.formatFractionCurrent(i + 1);
              }),
              e.querySelectorAll(he(s.totalClass)).forEach((e) => {
                e.textContent = s.formatFractionTotal(p);
              })),
            "progressbar" === s.type)
          ) {
            let n;
            n = s.progressbarOpposite
              ? t.isHorizontal()
                ? "vertical"
                : "horizontal"
              : t.isHorizontal()
                ? "horizontal"
                : "vertical";
            const r = (i + 1) / p;
            let a = 1,
              o = 1;
            "horizontal" === n ? (a = r) : (o = r),
              e.querySelectorAll(he(s.progressbarFillClass)).forEach((e) => {
                (e.style.transform = `translate3d(0,0,0) scaleX(${a}) scaleY(${o})`),
                  (e.style.transitionDuration = `${t.params.speed}ms`);
              });
          }
          "custom" === s.type && s.renderCustom
            ? ((e.innerHTML = s.renderCustom(t, i + 1, p)),
              0 === r && n("paginationRender", e))
            : (0 === r && n("paginationRender", e), n("paginationUpdate", e)),
            t.params.watchOverflow &&
              t.enabled &&
              e.classList[t.isLocked ? "add" : "remove"](s.lockClass);
        });
      }
      function p() {
        const e = t.params.pagination;
        if (l()) return;
        const s =
          t.virtual && t.params.virtual.enabled
            ? t.virtual.slides.length
            : t.grid && t.params.grid.rows > 1
              ? t.slides.length / Math.ceil(t.params.grid.rows)
              : t.slides.length;
        let i = t.pagination.el;
        i = q(i);
        let r = "";
        if ("bullets" === e.type) {
          let i = t.params.loop
            ? Math.ceil(s / t.params.slidesPerGroup)
            : t.snapGrid.length;
          t.params.freeMode && t.params.freeMode.enabled && i > s && (i = s);
          for (let s = 0; s < i; s += 1)
            e.renderBullet
              ? (r += e.renderBullet.call(t, s, e.bulletClass))
              : (r += `<${e.bulletElement} ${t.isElement ? 'part="bullet"' : ""} class="${e.bulletClass}"></${e.bulletElement}>`);
        }
        "fraction" === e.type &&
          (r = e.renderFraction
            ? e.renderFraction.call(t, e.currentClass, e.totalClass)
            : `<span class="${e.currentClass}"></span> / <span class="${e.totalClass}"></span>`),
          "progressbar" === e.type &&
            (r = e.renderProgressbar
              ? e.renderProgressbar.call(t, e.progressbarFillClass)
              : `<span class="${e.progressbarFillClass}"></span>`),
          (t.pagination.bullets = []),
          i.forEach((s) => {
            "custom" !== e.type && (s.innerHTML = r || ""),
              "bullets" === e.type &&
                t.pagination.bullets.push(
                  ...s.querySelectorAll(he(e.bulletClass)),
                );
          }),
          "custom" !== e.type && n("paginationRender", i[0]);
      }
      function m() {
        t.params.pagination = pe(
          t,
          t.originalParams.pagination,
          t.params.pagination,
          { el: "swiper-pagination" },
        );
        const e = t.params.pagination;
        if (!e.el) return;
        let s;
        "string" == typeof e.el &&
          t.isElement &&
          (s = t.el.querySelector(e.el)),
          s ||
            "string" != typeof e.el ||
            (s = [...document.querySelectorAll(e.el)]),
          s || (s = e.el),
          s &&
            0 !== s.length &&
            (t.params.uniqueNavElements &&
              "string" == typeof e.el &&
              Array.isArray(s) &&
              s.length > 1 &&
              ((s = [...t.el.querySelectorAll(e.el)]),
              s.length > 1 &&
                (s = s.filter((e) => O(e, ".swiper")[0] === t.el)[0])),
            Array.isArray(s) && 1 === s.length && (s = s[0]),
            Object.assign(t.pagination, { el: s }),
            (s = q(s)),
            s.forEach((s) => {
              "bullets" === e.type &&
                e.clickable &&
                s.classList.add(...(e.clickableClass || "").split(" ")),
                s.classList.add(e.modifierClass + e.type),
                s.classList.add(
                  t.isHorizontal() ? e.horizontalClass : e.verticalClass,
                ),
                "bullets" === e.type &&
                  e.dynamicBullets &&
                  (s.classList.add(`${e.modifierClass}${e.type}-dynamic`),
                  (o = 0),
                  e.dynamicMainBullets < 1 && (e.dynamicMainBullets = 1)),
                "progressbar" === e.type &&
                  e.progressbarOpposite &&
                  s.classList.add(e.progressbarOppositeClass),
                e.clickable && s.addEventListener("click", c),
                t.enabled || s.classList.add(e.lockClass);
            }));
      }
      function h() {
        const e = t.params.pagination;
        if (l()) return;
        let s = t.pagination.el;
        s &&
          ((s = q(s)),
          s.forEach((s) => {
            s.classList.remove(e.hiddenClass),
              s.classList.remove(e.modifierClass + e.type),
              s.classList.remove(
                t.isHorizontal() ? e.horizontalClass : e.verticalClass,
              ),
              e.clickable &&
                (s.classList.remove(...(e.clickableClass || "").split(" ")),
                s.removeEventListener("click", c));
          })),
          t.pagination.bullets &&
            t.pagination.bullets.forEach((t) =>
              t.classList.remove(...e.bulletActiveClass.split(" ")),
            );
      }
      i("changeDirection", () => {
        if (!t.pagination || !t.pagination.el) return;
        const e = t.params.pagination;
        let { el: s } = t.pagination;
        (s = q(s)),
          s.forEach((s) => {
            s.classList.remove(e.horizontalClass, e.verticalClass),
              s.classList.add(
                t.isHorizontal() ? e.horizontalClass : e.verticalClass,
              );
          });
      }),
        i("init", () => {
          !1 === t.params.pagination.enabled ? f() : (m(), p(), u());
        }),
        i("activeIndexChange", () => {
          void 0 === t.snapIndex && u();
        }),
        i("snapIndexChange", () => {
          u();
        }),
        i("snapGridLengthChange", () => {
          p(), u();
        }),
        i("destroy", () => {
          h();
        }),
        i("enable disable", () => {
          let { el: e } = t.pagination;
          e &&
            ((e = q(e)),
            e.forEach((e) =>
              e.classList[t.enabled ? "remove" : "add"](
                t.params.pagination.lockClass,
              ),
            ));
        }),
        i("lock unlock", () => {
          u();
        }),
        i("click", (e, s) => {
          const i = s.target,
            r = q(t.pagination.el);
          if (
            t.params.pagination.el &&
            t.params.pagination.hideOnClick &&
            r &&
            r.length > 0 &&
            !i.classList.contains(t.params.pagination.bulletClass)
          ) {
            if (
              t.navigation &&
              ((t.navigation.nextEl && i === t.navigation.nextEl) ||
                (t.navigation.prevEl && i === t.navigation.prevEl))
            )
              return;
            const e = r[0].classList.contains(t.params.pagination.hiddenClass);
            n(!0 === e ? "paginationShow" : "paginationHide"),
              r.forEach((e) =>
                e.classList.toggle(t.params.pagination.hiddenClass),
              );
          }
        });
      const f = () => {
        t.el.classList.add(t.params.pagination.paginationDisabledClass);
        let { el: e } = t.pagination;
        e &&
          ((e = q(e)),
          e.forEach((e) =>
            e.classList.add(t.params.pagination.paginationDisabledClass),
          )),
          h();
      };
      Object.assign(t.pagination, {
        enable: () => {
          t.el.classList.remove(t.params.pagination.paginationDisabledClass);
          let { el: e } = t.pagination;
          e &&
            ((e = q(e)),
            e.forEach((e) =>
              e.classList.remove(t.params.pagination.paginationDisabledClass),
            )),
            m(),
            p(),
            u();
        },
        disable: f,
        render: p,
        update: u,
        init: m,
        destroy: h,
      });
    }
    function ve(e) {
      let t,
        s,
        { swiper: i, extendParams: n, on: r, emit: a, params: o } = e;
      (i.autoplay = { running: !1, paused: !1, timeLeft: 0 }),
        n({
          autoplay: {
            enabled: !1,
            delay: 3e3,
            waitForTransition: !0,
            disableOnInteraction: !1,
            stopOnLastSlide: !1,
            reverseDirection: !1,
            pauseOnMouseEnter: !1,
          },
        });
      let l,
        d,
        c,
        u,
        p,
        m,
        h,
        f,
        v = o && o.autoplay ? o.autoplay.delay : 3e3,
        b = o && o.autoplay ? o.autoplay.delay : 3e3,
        y = new Date().getTime();
      function w(e) {
        i &&
          !i.destroyed &&
          i.wrapperEl &&
          e.target === i.wrapperEl &&
          (i.wrapperEl.removeEventListener("transitionend", w), f || L());
      }
      const E = () => {
          if (i.destroyed || !i.autoplay.running) return;
          i.autoplay.paused ? (d = !0) : d && ((b = l), (d = !1));
          const e = i.autoplay.paused ? l : y + b - new Date().getTime();
          (i.autoplay.timeLeft = e),
            a("autoplayTimeLeft", e, e / v),
            (s = requestAnimationFrame(() => {
              E();
            }));
        },
        S = (e) => {
          if (i.destroyed || !i.autoplay.running) return;
          cancelAnimationFrame(s), E();
          let n = void 0 === e ? i.params.autoplay.delay : e;
          (v = i.params.autoplay.delay), (b = i.params.autoplay.delay);
          const r = (() => {
            let e;
            if (
              ((e =
                i.virtual && i.params.virtual.enabled
                  ? i.slides.filter((e) =>
                      e.classList.contains("swiper-slide-active"),
                    )[0]
                  : i.slides[i.activeIndex]),
              !e)
            )
              return;
            return parseInt(e.getAttribute("data-swiper-autoplay"), 10);
          })();
          !Number.isNaN(r) &&
            r > 0 &&
            void 0 === e &&
            ((n = r), (v = r), (b = r)),
            (l = n);
          const o = i.params.speed,
            d = () => {
              i &&
                !i.destroyed &&
                (i.params.autoplay.reverseDirection
                  ? !i.isBeginning || i.params.loop || i.params.rewind
                    ? (i.slidePrev(o, !0, !0), a("autoplay"))
                    : i.params.autoplay.stopOnLastSlide ||
                      (i.slideTo(i.slides.length - 1, o, !0, !0), a("autoplay"))
                  : !i.isEnd || i.params.loop || i.params.rewind
                    ? (i.slideNext(o, !0, !0), a("autoplay"))
                    : i.params.autoplay.stopOnLastSlide ||
                      (i.slideTo(0, o, !0, !0), a("autoplay")),
                i.params.cssMode &&
                  ((y = new Date().getTime()),
                  requestAnimationFrame(() => {
                    S();
                  })));
            };
          return (
            n > 0
              ? (clearTimeout(t),
                (t = setTimeout(() => {
                  d();
                }, n)))
              : requestAnimationFrame(() => {
                  d();
                }),
            n
          );
        },
        _ = () => {
          (y = new Date().getTime()),
            (i.autoplay.running = !0),
            S(),
            a("autoplayStart");
        },
        T = () => {
          (i.autoplay.running = !1),
            clearTimeout(t),
            cancelAnimationFrame(s),
            a("autoplayStop");
        },
        x = (e, s) => {
          if (i.destroyed || !i.autoplay.running) return;
          clearTimeout(t), e || (h = !0);
          const n = () => {
            a("autoplayPause"),
              i.params.autoplay.waitForTransition
                ? i.wrapperEl.addEventListener("transitionend", w)
                : L();
          };
          if (((i.autoplay.paused = !0), s))
            return m && (l = i.params.autoplay.delay), (m = !1), void n();
          const r = l || i.params.autoplay.delay;
          (l = r - (new Date().getTime() - y)),
            (i.isEnd && l < 0 && !i.params.loop) || (l < 0 && (l = 0), n());
        },
        L = () => {
          (i.isEnd && l < 0 && !i.params.loop) ||
            i.destroyed ||
            !i.autoplay.running ||
            ((y = new Date().getTime()),
            h ? ((h = !1), S(l)) : S(),
            (i.autoplay.paused = !1),
            a("autoplayResume"));
        },
        C = () => {
          if (i.destroyed || !i.autoplay.running) return;
          const e = g();
          "hidden" === e.visibilityState && ((h = !0), x(!0)),
            "visible" === e.visibilityState && L();
        },
        A = (e) => {
          "mouse" === e.pointerType &&
            ((h = !0), (f = !0), i.animating || i.autoplay.paused || x(!0));
        },
        M = (e) => {
          "mouse" === e.pointerType && ((f = !1), i.autoplay.paused && L());
        };
      r("init", () => {
        i.params.autoplay.enabled &&
          (i.params.autoplay.pauseOnMouseEnter &&
            (i.el.addEventListener("pointerenter", A),
            i.el.addEventListener("pointerleave", M)),
          g().addEventListener("visibilitychange", C),
          _());
      }),
        r("destroy", () => {
          i.el.removeEventListener("pointerenter", A),
            i.el.removeEventListener("pointerleave", M),
            g().removeEventListener("visibilitychange", C),
            i.autoplay.running && T();
        }),
        r("_freeModeStaticRelease", () => {
          (u || h) && L();
        }),
        r("_freeModeNoMomentumRelease", () => {
          i.params.autoplay.disableOnInteraction ? T() : x(!0, !0);
        }),
        r("beforeTransitionStart", (e, t, s) => {
          !i.destroyed &&
            i.autoplay.running &&
            (s || !i.params.autoplay.disableOnInteraction ? x(!0, !0) : T());
        }),
        r("sliderFirstMove", () => {
          !i.destroyed &&
            i.autoplay.running &&
            (i.params.autoplay.disableOnInteraction
              ? T()
              : ((c = !0),
                (u = !1),
                (h = !1),
                (p = setTimeout(() => {
                  (h = !0), (u = !0), x(!0);
                }, 200))));
        }),
        r("touchEnd", () => {
          if (!i.destroyed && i.autoplay.running && c) {
            if (
              (clearTimeout(p),
              clearTimeout(t),
              i.params.autoplay.disableOnInteraction)
            )
              return (u = !1), void (c = !1);
            u && i.params.cssMode && L(), (u = !1), (c = !1);
          }
        }),
        r("slideChange", () => {
          !i.destroyed && i.autoplay.running && (m = !0);
        }),
        Object.assign(i.autoplay, { start: _, stop: T, pause: x, resume: L });
    }
    function ge() {
      let e = document.querySelectorAll(
        '[class*="__swiper"]:not(.swiper-wrapper)',
      );
      e &&
        e.forEach((e) => {
          e.parentElement.classList.add("swiper"),
            e.classList.add("swiper-wrapper");
          for (const t of e.children) t.classList.add("swiper-slide");
        });
    }
    Object.keys(de).forEach((e) => {
      Object.keys(de[e]).forEach((t) => {
        ue.prototype[t] = de[e][t];
      });
    }),
      ue.use([
        function (e) {
          let { swiper: t, on: s, emit: i } = e;
          const n = y();
          let r = null,
            a = null;
          const o = () => {
              t &&
                !t.destroyed &&
                t.initialized &&
                (i("beforeResize"), i("resize"));
            },
            l = () => {
              t && !t.destroyed && t.initialized && i("orientationchange");
            };
          s("init", () => {
            t.params.resizeObserver && void 0 !== n.ResizeObserver
              ? t &&
                !t.destroyed &&
                t.initialized &&
                ((r = new ResizeObserver((e) => {
                  a = n.requestAnimationFrame(() => {
                    const { width: s, height: i } = t;
                    let n = s,
                      r = i;
                    e.forEach((e) => {
                      let { contentBoxSize: s, contentRect: i, target: a } = e;
                      (a && a !== t.el) ||
                        ((n = i ? i.width : (s[0] || s).inlineSize),
                        (r = i ? i.height : (s[0] || s).blockSize));
                    }),
                      (n === s && r === i) || o();
                  });
                })),
                r.observe(t.el))
              : (n.addEventListener("resize", o),
                n.addEventListener("orientationchange", l));
          }),
            s("destroy", () => {
              a && n.cancelAnimationFrame(a),
                r && r.unobserve && t.el && (r.unobserve(t.el), (r = null)),
                n.removeEventListener("resize", o),
                n.removeEventListener("orientationchange", l);
            });
        },
        function (e) {
          let { swiper: t, extendParams: s, on: i, emit: n } = e;
          const r = [],
            a = y(),
            o = function (e, s) {
              void 0 === s && (s = {});
              const i = new (a.MutationObserver || a.WebkitMutationObserver)(
                (e) => {
                  if (t.__preventObserver__) return;
                  if (1 === e.length) return void n("observerUpdate", e[0]);
                  const s = function () {
                    n("observerUpdate", e[0]);
                  };
                  a.requestAnimationFrame
                    ? a.requestAnimationFrame(s)
                    : a.setTimeout(s, 0);
                },
              );
              i.observe(e, {
                attributes: void 0 === s.attributes || s.attributes,
                childList: void 0 === s.childList || s.childList,
                characterData: void 0 === s.characterData || s.characterData,
              }),
                r.push(i);
            };
          s({ observer: !1, observeParents: !1, observeSlideChildren: !1 }),
            i("init", () => {
              if (t.params.observer) {
                if (t.params.observeParents) {
                  const e = O(t.hostEl);
                  for (let t = 0; t < e.length; t += 1) o(e[t]);
                }
                o(t.hostEl, { childList: t.params.observeSlideChildren }),
                  o(t.wrapperEl, { attributes: !1 });
              }
            }),
            i("destroy", () => {
              r.forEach((e) => {
                e.disconnect();
              }),
                r.splice(0, r.length);
            });
        },
      ]);
    const be = (e, t, s, i) => {
      let n;
      e = window.matchMedia(e);
      const r = function () {
        return e.matches
          ? (console.log("da"), (n = new ue(t, s)), void (i && i(n)))
          : void 0 !== n
            ? (console.log("net"), void n.destroy(!0, !0))
            : void 0;
      };
      e.addEventListener("change", r), r();
    };
    window.addEventListener("load", function (e) {
      !(function () {
        if (
          (ge(),
          document.querySelector(".promo__slider") &&
            new ue(".promo__slider", {
              modules: [me],
              slidesPerView: 1,
              spaceBetween: 0,
              speed: 800,
              loop: !0,
              navigation: {
                prevEl: ".promo__slider-nav .slider-nav-n__btn_prev",
                nextEl: ".promo__slider-nav .slider-nav-n__btn_next",
              },
              on: {},
            }),
          document.querySelector(".water-areas__sliders"))
        ) {
          const e = document.querySelectorAll(".water-areas__slider");
          for (let t = 0; t < e.length; t++) {
            let s = `water-areas__slider_${t}`;
            e[t].classList.add(s),
              be("(max-width: 992px)", `.${s}`, {
                modules: [me],
                navigation: {
                  nextEl: `.${s} .slider-nav-n .slider-nav-n__btn_next`,
                  prevEl: `.${s} .slider-nav-n .slider-nav-n__btn_prev`,
                },
                slidesPerView: 2,
                spaceBetween: 20,
                speed: 800,
              });
          }
        }
        if (
          (document.querySelector(".leisure__slider") &&
            be("(max-width: 992px)", ".leisure__slider", {
              slidesPerView: 1,
              spaceBetween: 20,
              speed: 800,
              on: {},
            }),
          document.querySelector(".promotion__slider") &&
            be("(max-width: 992px)", ".promotion__slider", {
              modules: [me],
              slidesPerView: 1,
              spaceBetween: 0,
              speed: 800,
              navigation: {
                nextEl:
                  ".promotion__slider .slider-nav-n .slider-nav-n__btn_next",
                prevEl:
                  ".promotion__slider .slider-nav-n .slider-nav-n__btn_prev",
              },
              on: {},
            }),
          document.querySelector(".reviews__slider") &&
            be("(max-width: 992px)", ".reviews__slider", {
              modules: [me, fe],
              slidesPerView: 1,
              spaceBetween: 20,
              speed: 800,
              pagination: { el: ".reviews__pagination", clickable: !0 },
              on: {},
            }),
          document.querySelector(".slider-ps_1 .slider-ps__slider") &&
            new ue(".slider-ps_1  .slider-ps__slider", {
              modules: [me, ve],
              autoplay: { delay: 2500, disableOnInteraction: !1 },
              slidesPerView: 1,
              spaceBetween: 0,
              speed: 800,
              loop: !0,
              navigation: {
                nextEl: ".slider-ps_1 .slider-nav-n .slider-nav-n__btn_next",
                prevEl: ".slider-ps_1  .slider-nav-n .slider-nav-n__btn_prev",
              },
              on: {},
            }),
          document.querySelector(".slider-ps_2 .slider-ps__slider") &&
            new ue(".slider-ps_2 .slider-ps__slider", {
              modules: [me, ve],
              autoplay: { delay: 2500, disableOnInteraction: !1 },
              slidesPerView: 1,
              spaceBetween: 0,
              speed: 800,
              loop: !0,
              navigation: {
                nextEl: ".slider-ps_2 .slider-nav-n .slider-nav-n__btn_next",
                prevEl: ".slider-ps_2  .slider-nav-n .slider-nav-n__btn_prev",
              },
              on: {},
            }),
          document.querySelector(".premium-company__slider") &&
            new ue(".premium-company__slider", {
              modules: [me, ve],
              autoplay: { delay: 2500, disableOnInteraction: !1 },
              slidesPerView: 1,
              spaceBetween: 6,
              speed: 800,
              loop: !0,
              navigation: {
                nextEl:
                  ".premium-company__slider .slider-nav-n .slider-nav-n__btn_next",
                prevEl:
                  ".premium-company__slider  .slider-nav-n .slider-nav-n__btn_prev",
              },
              on: {},
            }),
          document.querySelector(".liner__swiper") &&
            new ue(".liner__slider", {
              modules: [me],
              slidesPerView: 1,
              spaceBetween: 0,
              speed: 800,
              loop: !0,
              navigation: {
                nextEl: ".slider-nav-n .slider-nav-n__btn_next",
                prevEl: ".slider-nav-n .slider-nav-n__btn_prev",
              },
              on: {},
            }),
          document.querySelector(".creation-liner__slider_1") &&
            new ue(".creation-liner__slider_1", {
              modules: [me],
              slidesPerView: 1,
              spaceBetween: 0,
              speed: 800,
              loop: !0,
              navigation: {
                nextEl:
                  ".creation-liner__slider_1 ~ .slider-nav-n .slider-nav-n__btn_next",
                prevEl:
                  ".creation-liner__slider_1 ~ .slider-nav-n .slider-nav-n__btn_prev",
              },
              on: {},
            }),
          document.querySelector(".creation-liner__slider_2") &&
            new ue(".creation-liner__slider_2", {
              modules: [me],
              slidesPerView: 1,
              spaceBetween: 0,
              speed: 800,
              loop: !0,
              navigation: {
                nextEl:
                  ".creation-liner__slider_2 ~ .slider-nav-n .slider-nav-n__btn_next",
                prevEl:
                  ".creation-liner__slider_2 ~ .slider-nav-n .slider-nav-n__btn_prev",
              },
              on: {},
            }),
          document.querySelector(".interior-cabin__swiper") &&
            new ue(".interior-cabin__slider", {
              modules: [me],
              slidesPerView: 1,
              spaceBetween: 0,
              speed: 800,
              loop: !0,
              navigation: {
                nextEl: ".slider-nav .slider-nav__btn_next",
                prevEl: ".slider-nav .slider-nav__btn_prev",
              },
              on: {},
            }),
          document.querySelector(".suite"))
        ) {
          const e = document.querySelectorAll(".item-suite__slider");
          for (let t = 0; t < e.length; t++) {
            let s = `item-suite__slider_${t}`;
            e[t].classList.add(s),
              new ue(`.${s}`, {
                modules: [me],
                slidesPerView: 1,
                spaceBetween: 0,
                speed: 800,
                loop: !0,
                navigation: {
                  nextEl: `.${s} ~ .slider-nav .slider-nav__btn_next`,
                  prevEl: `.${s} ~ .slider-nav .slider-nav__btn_prev`,
                },
                on: {},
              });
          }
        }
      })();
    });
    new (s(144))({
      elements_selector: "[data-src],[data-srcset]",
      class_loaded: "_lazy-loaded",
      use_native: !0,
    });
    function ye(e) {
      this.type = e;
    }
    (ye.prototype.init = function () {
      const e = this;
      (this.оbjects = []),
        (this.daClassname = "_dynamic_adapt_"),
        (this.nodes = document.querySelectorAll("[data-da]"));
      for (let e = 0; e < this.nodes.length; e++) {
        const t = this.nodes[e],
          s = t.dataset.da.trim().split(","),
          i = {};
        (i.element = t),
          (i.parent = t.parentNode),
          (i.destination = document.querySelector(s[0].trim())),
          (i.breakpoint = s[1] ? s[1].trim() : "767"),
          (i.place = s[2] ? s[2].trim() : "last"),
          (i.index = this.indexInParent(i.parent, i.element)),
          this.оbjects.push(i);
      }
      this.arraySort(this.оbjects),
        (this.mediaQueries = Array.prototype.map.call(
          this.оbjects,
          function (e) {
            return (
              "(" +
              this.type +
              "-width: " +
              e.breakpoint +
              "px)," +
              e.breakpoint
            );
          },
          this,
        )),
        (this.mediaQueries = Array.prototype.filter.call(
          this.mediaQueries,
          function (e, t, s) {
            return Array.prototype.indexOf.call(s, e) === t;
          },
        ));
      for (let t = 0; t < this.mediaQueries.length; t++) {
        const s = this.mediaQueries[t],
          i = String.prototype.split.call(s, ","),
          n = window.matchMedia(i[0]),
          r = i[1],
          a = Array.prototype.filter.call(this.оbjects, function (e) {
            return e.breakpoint === r;
          });
        n.addListener(function () {
          e.mediaHandler(n, a);
        }),
          this.mediaHandler(n, a);
      }
    }),
      (ye.prototype.mediaHandler = function (e, t) {
        if (e.matches)
          for (let e = 0; e < t.length; e++) {
            const s = t[e];
            (s.index = this.indexInParent(s.parent, s.element)),
              this.moveTo(s.place, s.element, s.destination);
          }
        else
          for (let e = t.length - 1; e >= 0; e--) {
            const s = t[e];
            s.element.classList.contains(this.daClassname) &&
              this.moveBack(s.parent, s.element, s.index);
          }
      }),
      (ye.prototype.moveTo = function (e, t, s) {
        t.classList.add(this.daClassname),
          "last" === e || e >= s.children.length
            ? s.insertAdjacentElement("beforeend", t)
            : "first" !== e
              ? s.children[e].insertAdjacentElement("beforebegin", t)
              : s.insertAdjacentElement("afterbegin", t);
      }),
      (ye.prototype.moveBack = function (e, t, s) {
        t.classList.remove(this.daClassname),
          void 0 !== e.children[s]
            ? e.children[s].insertAdjacentElement("beforebegin", t)
            : e.insertAdjacentElement("beforeend", t);
      }),
      (ye.prototype.indexInParent = function (e, t) {
        const s = Array.prototype.slice.call(e.children);
        return Array.prototype.indexOf.call(s, t);
      }),
      (ye.prototype.arraySort = function (e) {
        "min" === this.type
          ? Array.prototype.sort.call(e, function (e, t) {
              return e.breakpoint === t.breakpoint
                ? e.place === t.place
                  ? 0
                  : "first" === e.place || "last" === t.place
                    ? -1
                    : "last" === e.place || "first" === t.place
                      ? 1
                      : e.place - t.place
                : e.breakpoint - t.breakpoint;
            })
          : Array.prototype.sort.call(e, function (e, t) {
              return e.breakpoint === t.breakpoint
                ? e.place === t.place
                  ? 0
                  : "first" === e.place || "last" === t.place
                    ? 1
                    : "last" === e.place || "first" === t.place
                      ? -1
                      : t.place - e.place
                : t.breakpoint - e.breakpoint;
            });
      });
    new ye("min").init();
    document
      .querySelectorAll(".menu-item-has-children .sub-menu")
      .forEach((e) => {
        const t = e.parentElement.firstElementChild;
        t.classList.add("_icon-arrow"), t.setAttribute("data-spoller", "");
      });
    !(function e(t, s) {
      t &&
        t.forEach((t) => {
          t.lastElementChild.classList.contains("sub-menu") &&
            (t.lastElementChild.classList.add(`level-${s}`),
            e(t.querySelectorAll(".menu-item-has-children"), s + 1));
        });
    })(document.querySelectorAll(".menu__list > .menu-item-has-children"), 1),
      (function () {
        document
          .querySelectorAll(".menu-item-has-children > a")
          .forEach((e) => {
            const t = e.parentElement,
              s = document.createElement("div");
            s.classList.add("main-item");
            const i = document.createElement("a");
            (i.href = e.href), (i.innerText = e.innerText);
            const n = document.createElement("div");
            n.classList.add("main-item__btn"),
              n.classList.add("_icon-arrow"),
              s.appendChild(i),
              s.appendChild(n),
              t.insertBefore(s, e),
              t.removeChild(e);
          });
        const e = document.querySelectorAll(".menu-item"),
          t = document.querySelectorAll(".sub-menu");
        e.forEach((e) => {
          e.closest(".header") && e.classList.add("menu-item_h"),
            e.closest(".footer") && e.classList.add("menu-item_f");
        }),
          t.forEach((e) => {
            e.closest(".header") && e.classList.add("sub-menu_h"),
              e.closest(".footer") && e.classList.add("sub-menu_f");
          });
      })(),
      (function () {
        const e = "(max-width: 991.98px)";
        function t() {
          document
            .querySelector(".header .menu__list")
            .querySelectorAll(".main-item__btn")
            .forEach((e) => {
              e.removeEventListener("click", s), e.addEventListener("click", s);
            });
        }
        function s(e) {
          e.preventDefault();
          const t = e.currentTarget.closest(".menu-item-has-children");
          var s, r;
          t.classList.toggle("sub-menu_open"),
            (s = t.querySelector(".sub-menu")),
            (r = 200),
            "none" === window.getComputedStyle(s).display ? i(s, r) : n(s, r);
        }
        window.matchMedia(e).matches && t(),
          window.addEventListener(
            "resize",
            (function (e, t) {
              let s;
              return function () {
                const i = this,
                  n = arguments;
                clearTimeout(s), (s = setTimeout(() => e.apply(i, n), t));
              };
            })(function () {
              window.matchMedia(e).matches && t();
            }, 200),
          ),
          window.addEventListener("popstate", d),
          window.addEventListener("pageshow", d),
          window.addEventListener("load", d);
      })(),
      document.addEventListener("DOMContentLoaded", function () {
        const e = document.querySelectorAll(".tariffs__nav-item"),
          t = document.querySelectorAll(".tariffs__item");
        let s = 0;
        function i(t) {
          if (window.innerWidth <= 992) {
            const i = Array.from(e).indexOf(t.currentTarget);
            (s = i), n(i);
          }
        }
        function n(s) {
          e.forEach((e, t) => {
            e.classList.toggle("active", t === s);
          }),
            t.forEach((e, t) => {
              e.classList.toggle("active", t === s);
            });
        }
        e.forEach((e) => {
          e.addEventListener("click", i);
        }),
          window.addEventListener("resize", function () {
            window.innerWidth > 992
              ? (e.forEach((e) => {
                  e.classList.remove("active");
                }),
                t.forEach((e) => {
                  e.classList.remove("active");
                }))
              : n(s);
          }),
          window.innerWidth <= 992 && n(s);
      });
    document.querySelector(".cruise-route__body") &&
      (function () {
        const e = document.querySelector(".cruise-route__descs-items"),
          t = document.querySelector(".cruise-route__images"),
          s = document.querySelector(".cruise-route__days"),
          i = e.children.length;
        function n(e, t, s) {
          for (let i = 0; i < t; i++) {
            let t = document.createElement("span");
            t.classList.add("day");
            let n = document.createElement("span");
            n.innerHTML = `${s + i + 1}`;
            let r = document.createElement("span");
            (r.innerHTML = " день"), t.append(n), t.append(r), e.append(t);
          }
        }
        const r = Math.ceil(i / 10),
          a = Math.floor(i / r),
          o = i % r;
        let l = [],
          d = 0;
        for (let e = 0; e < r; e++) {
          let t = document.createElement("div");
          t.classList.add("cruise-route__days-row");
          const i = e < o ? a + 1 : a;
          l.push(i),
            t.classList.add(`cruise-route__days-row_${i}`),
            e > 1 && t.classList.add("hidden"),
            n(t, i, d),
            s.append(t),
            (d += i);
        }
        const c = s.querySelectorAll(".day");
        c.length > 0 && c[0].classList.add("active"),
          e.children[0].classList.add("active"),
          t.children[0].classList.add("active");
        const u = document.querySelector(".nav-cruise-route__btn_prev"),
          p = document.querySelector(".nav-cruise-route__btn_next");
        let m = 0;
        function h(s) {
          e.children[m].classList.remove("active"),
            t.children[m].classList.remove("active"),
            c[m].classList.remove("active"),
            (m = s),
            e.children[m].classList.add("active"),
            t.children[m].classList.add("active"),
            c[m].classList.add("active");
          const i = (function (e) {
              let t = 0;
              for (let s = 0; s < l.length; s++)
                if (((t += l[s]), e < t)) return s;
              return -1;
            })(m),
            n = i + 1;
          document
            .querySelectorAll(".cruise-route__days-row")
            .forEach((e, t) => {
              t === i || t === n || (t === i - 1 && n >= r)
                ? e.classList.remove("hidden")
                : e.classList.add("hidden");
            });
        }
        u.addEventListener("click", () => {
          h((m - 1 + e.children.length) % e.children.length);
        }),
          p.addEventListener("click", () => {
            h((m + 1) % e.children.length);
          }),
          c.forEach((e, t) => {
            e.addEventListener("click", () => {
              h(t);
            });
          }),
          document.addEventListener("keydown", function (t) {
            "ArrowLeft" === t.key
              ? h((m - 1 + e.children.length) % e.children.length)
              : "ArrowRight" === t.key && h((m + 1) % e.children.length);
          });
      })();
    document.querySelector(".port-route__body") &&
      (function () {
        const e = document.querySelector(".port-route__descs-items"),
          t = document.querySelector(".port-route__titles"),
          s = document.querySelector(".port-route__routes-row");
        if (!e || !t || !s) return;
        e.children[0].classList.add("active"),
          t.children[0].classList.add("active"),
          s.children[0].classList.add("active");
        const i = document.querySelector(".nav-cruise-route__btn_prev"),
          n = document.querySelector(".nav-cruise-route__btn_next"),
          r = s.querySelectorAll(".port-route__routes-item");
        s.classList.add(`flex_${r.length}`),
          console.log(r.length),
          r.length <= 1 &&
            ((i.style.display = "none"), (n.style.display = "none"));
        let a = 0;
        function o(s) {
          e.children[a].classList.remove("active"),
            t.children[a].classList.remove("active"),
            r[a].classList.remove("active"),
            (a = s),
            e.children[a].classList.add("active"),
            t.children[a].classList.add("active"),
            r[a].classList.add("active");
        }
        i.addEventListener("click", () => {
          o((a - 1 + e.children.length) % e.children.length);
        }),
          n.addEventListener("click", () => {
            o((a + 1) % e.children.length);
          }),
          r.forEach((e, t) => {
            e.addEventListener("click", () => {
              o(t);
            });
          }),
          document.addEventListener("keydown", function (t) {
            r.length <= 1 ||
              ("ArrowLeft" === t.key
                ? o((a - 1 + e.children.length) % e.children.length)
                : "ArrowRight" === t.key && o((a + 1) % e.children.length));
          });
      })();
    document.querySelectorAll("[data-show-more]").forEach((e) => {
      const t = e.querySelector("[data-show-more-content]"),
        s = parseInt(t.dataset.showMoreContent, 10),
        r = t.children;
      let a = 0;
      const o = () => {
        for (let e = 0; e < r.length; e++) {
          const t = r[e];
          e >= s &&
            (setTimeout(() => {
              t.classList.add("hidden");
            }, 200),
            i(t, 200));
        }
      };
      if (r.length > s) {
        const t = document.createElement("button");
        (t.type = "button"),
          (t.className = "btn-more _icon-arrow"),
          t.setAttribute("data-show-more-btn", ""),
          (t.innerHTML = "<span>Показать еще</span><span>Скрыть</span>"),
          e.appendChild(t),
          o(),
          t.addEventListener("click", () => {
            a
              ? (o(), e.classList.remove("_showmore-active"), (a = 0))
              : ((a = 1),
                e.classList.add("_showmore-active"),
                (() => {
                  for (let e = 0; e < r.length; e++) {
                    const t = r[e];
                    e >= s && (t.classList.remove("hidden"), n(t, 200));
                  }
                })());
          });
      }
    }),
      document.addEventListener("DOMContentLoaded", function () {
        document.querySelectorAll(".video-player").forEach(function (e) {
          var t = e.getAttribute("data-video-id"),
            s = e.querySelector("img");
          s.setAttribute(
            "data-src",
            "https://img.youtube.com/vi/" + t + "/maxresdefault.jpg",
          ),
            s.setAttribute("src", s.getAttribute("data-src")),
            e.addEventListener("click", function () {
              !(function (e, t) {
                var s = e.closest(".video__body"),
                  i = document.createElement("iframe");
                i.setAttribute(
                  "src",
                  "https://www.youtube.com/embed/" + t + "?autoplay=1",
                ),
                  i.setAttribute("frameborder", "0"),
                  i.setAttribute("allowfullscreen", "1"),
                  i.setAttribute(
                    "allow",
                    "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture",
                  ),
                  (i.style.width = "100%"),
                  (i.style.height = "100%"),
                  (i.style.position = "relative"),
                  (i.style.zIndex = "2"),
                  (s.innerHTML = ""),
                  s.appendChild(i);
              })(e, t);
            });
        });
      });
    if (document.querySelector(".page__suite [data-tags]")) {
      const we = document.querySelector("[data-tags-header]"),
        Ee = document.querySelectorAll("[data-tags] [data-tag]"),
        Se = new Set();
      let _e = !1;
      function Te() {
        we.innerHTML = "";
        const e = document.createElement("span");
        function t(e) {
          Ee.forEach((t) => {
            t.dataset.tag.split(", ").includes(e) || "все сьюты" === e
              ? (t.style.display = "block")
              : (t.style.display = "none");
          });
        }
        (e.className = "tag active"),
          (e.innerText = "все сьюты"),
          we.appendChild(e),
          Ee.forEach((e) => {
            e.dataset.tag.split(", ").forEach((e) => Se.add(e));
          }),
          Se.forEach((e) => {
            const t = document.createElement("span");
            (t.className = "tag"), (t.innerText = e), we.appendChild(t);
          });
        const s = we.querySelectorAll(".tag");
        s.forEach((e) => {
          e.addEventListener("click", function () {
            t(e.innerText),
              (_e = !0),
              s.forEach((e) => e.classList.remove("active")),
              e.classList.add("active");
          });
        }),
          t("все сьюты");
      }
      function xe() {
        window.innerWidth < 991.98
          ? _e || Te()
          : ((we.innerHTML = ""),
            Ee.forEach((e) => (e.style.display = "block")),
            (_e = !1));
      }
      xe(), window.addEventListener("resize", xe);
    }
    (window.FLS = !0),
      window.addEventListener("load", function () {
        setTimeout(function () {
          document.documentElement.classList.add("loaded");
        }, 0);
      }),
      (function () {
        let e = document.querySelector(".icon-menu");
        e &&
          e.addEventListener("click", function (e) {
            r &&
              (document.documentElement.classList.contains("menu-open")
                ? (document.documentElement.classList.remove("menu-open"),
                  o(),
                  c())
                : (document.documentElement.classList.add("menu-open"), l()));
          });
      })(),
      (function () {
        const e = document.querySelectorAll("[data-spollers]");
        if (e.length > 0) {
          const t = Array.from(e).filter(function (e, t, s) {
            return !e.dataset.spollers.split(",")[0];
          });
          t.length && r(t);
          let s = p(e, "spollers");
          function r(e, t = !1) {
            e.forEach((e) => {
              (e = t ? e.item : e),
                t.matches || !t
                  ? (e.classList.add("_spoller-init"),
                    a(e),
                    e.addEventListener("click", o))
                  : (e.classList.remove("_spoller-init"),
                    a(e, !1),
                    e.removeEventListener("click", o));
            });
          }
          function a(e, t = !0) {
            let s = e.querySelectorAll("[data-spoller]");
            s.length &&
              ((s = Array.from(s).filter(
                (t) => t.closest("[data-spollers]") === e,
              )),
              s.forEach((e) => {
                t
                  ? (e.removeAttribute("tabindex"),
                    e.classList.contains("_spoller-active") ||
                      (e.nextElementSibling.hidden = !0))
                  : (e.setAttribute("tabindex", "-1"),
                    (e.nextElementSibling.hidden = !1));
              }));
          }
          function o(e) {
            const t = e.target;
            if (t.closest("[data-spoller]")) {
              const s = t.closest("[data-spoller]"),
                r = s.closest("[data-spollers]"),
                a = !!r.hasAttribute("data-one-spoller");
              r.querySelectorAll("._slide").length ||
                (a && !s.classList.contains("_spoller-active") && l(r),
                s.classList.toggle("_spoller-active"),
                ((e, t = 500) => {
                  e.hidden ? n(e, t) : i(e, t);
                })(s.nextElementSibling, 500)),
                e.preventDefault();
            }
          }
          function l(e) {
            const t = e.querySelector("[data-spoller]._spoller-active");
            t &&
              (t.classList.remove("_spoller-active"),
              i(t.nextElementSibling, 500));
          }
          s &&
            s.length &&
            s.forEach((e) => {
              e.matchMedia.addEventListener("change", function () {
                r(e.itemsArray, e.matchMedia);
              }),
                r(e.itemsArray, e.matchMedia);
            });
        }
      })(),
      (function () {
        const e = document.querySelectorAll("[data-tabs]");
        let s = [];
        if (e.length > 0) {
          const t = (function () {
            if (location.hash) return location.hash.replace("#", "");
          })();
          t && t.startsWith("tab-") && (s = t.replace("tab-", "").split("-")),
            e.forEach((e, t) => {
              e.classList.add("_tab-init"),
                e.setAttribute("data-tabs-index", t),
                e.addEventListener("click", a),
                (function (e) {
                  let t = e.querySelectorAll("[data-tabs-titles]>*"),
                    i = e.querySelectorAll("[data-tabs-body]>*"),
                    n = e.querySelectorAll("[data-tabs-images]>*");
                  const r = e.dataset.tabsIndex,
                    a = s[0] == r;
                  if (a) {
                    const t = e.querySelector(
                      "[data-tabs-titles]>._tab-active",
                    );
                    t && t.classList.remove("_tab-active");
                  }
                  i.length &&
                    ((n = Array.from(n).filter(
                      (t) => t.closest("[data-tabs]") === e,
                    )),
                    (i = Array.from(i).filter(
                      (t) => t.closest("[data-tabs]") === e,
                    )),
                    (t = Array.from(t).filter(
                      (t) => t.closest("[data-tabs]") === e,
                    )),
                    i.forEach((e, i) => {
                      t[i].setAttribute("data-tabs-title", ""),
                        e.setAttribute("data-tabs-item", ""),
                        a && i == s[1] && t[i].classList.add("_tab-active"),
                        (e.hidden = !t[i].classList.contains("_tab-active"));
                    }),
                    n.forEach((e, i) => {
                      t[i].setAttribute("data-tabs-title", ""),
                        e.setAttribute("data-tabs-image", ""),
                        a && i == s[1] && t[i].classList.add("_tab-active"),
                        (e.hidden = !t[i].classList.contains("_tab-active"));
                    }));
                })(e);
            });
          let i = p(e, "tabs");
          i &&
            i.length &&
            i.forEach((e) => {
              e.matchMedia.addEventListener("change", function () {
                r(e.itemsArray, e.matchMedia);
              }),
                r(e.itemsArray, e.matchMedia);
            });
        }
        function r(e, t) {
          e.forEach((e) => {
            let s = (e = e.item).querySelector("[data-tabs-titles]"),
              i = e.querySelectorAll("[data-tabs-title]"),
              n = e.querySelector("[data-tabs-body]"),
              r = e.querySelectorAll("[data-tabs-item]");
            (i = Array.from(i).filter((t) => t.closest("[data-tabs]") === e)),
              (r = Array.from(r).filter((t) => t.closest("[data-tabs]") === e)),
              r.forEach((r, a) => {
                t.matches
                  ? (n.append(i[a]),
                    n.append(r),
                    e.classList.add("_tab-spoller"))
                  : (s.append(i[a]), e.classList.remove("_tab-spoller"));
              });
          });
        }
        function a(e) {
          const s = e.target;
          if (s.closest("[data-tabs-title]")) {
            const r = s.closest("[data-tabs-title]"),
              a = r.closest("[data-tabs]");
            if (
              !r.classList.contains("_tab-active") &&
              !a.querySelector("._slide")
            ) {
              let e = a.querySelectorAll("[data-tabs-title]._tab-active");
              e.length &&
                (e = Array.from(e).filter(
                  (e) => e.closest("[data-tabs]") === a,
                )),
                e.length && e[0].classList.remove("_tab-active"),
                r.classList.add("_tab-active"),
                (function (e) {
                  let s = e.querySelectorAll("[data-tabs-title]"),
                    r = e.querySelectorAll("[data-tabs-item]"),
                    a = e.querySelectorAll("[data-tabs-image]");
                  const o = e.dataset.tabsIndex,
                    l = (function (e) {
                      if (e.hasAttribute("data-tabs-animate"))
                        return e.dataset.tabsAnimate > 0
                          ? Number(e.dataset.tabsAnimate)
                          : 500;
                    })(e);
                  if (r.length > 0) {
                    const d = e.hasAttribute("data-tabs-hash");
                    (r = Array.from(r).filter(
                      (t) => t.closest("[data-tabs]") === e,
                    )),
                      (s = Array.from(s).filter(
                        (t) => t.closest("[data-tabs]") === e,
                      )),
                      (a = Array.from(a).filter(
                        (t) => t.closest("[data-tabs]") === e,
                      )),
                      r.forEach((e, r) => {
                        s[r].classList.contains("_tab-active")
                          ? (l ? n(e, l) : (e.hidden = !1),
                            d && !e.closest(".popup") && t(`tab-${o}-${r}`))
                          : l
                            ? i(e, l)
                            : (e.hidden = !0);
                      }),
                      a.forEach((e, r) => {
                        s[r].classList.contains("_tab-active")
                          ? (l ? n(e, l) : (e.hidden = !1),
                            d && !e.closest(".popup") && t(`tab-${o}-${r}`))
                          : l
                            ? i(e, l)
                            : (e.hidden = !0);
                      });
                  }
                })(a);
            }
            e.preventDefault();
          }
        }
      })(),
      (function () {
        const e = document.querySelectorAll(
          "input[placeholder],textarea[placeholder]",
        );
        e.length &&
          e.forEach((e) => {
            e.dataset.placeholder = e.placeholder;
          }),
          document.body.addEventListener("focusin", function (e) {
            const t = e.target;
            ("INPUT" !== t.tagName && "TEXTAREA" !== t.tagName) ||
              (t.dataset.placeholder && (t.placeholder = ""),
              t.classList.add("_form-focus"),
              t.parentElement.classList.add("_form-focus"),
              m.removeError(t));
          }),
          document.body.addEventListener("focusout", function (e) {
            const t = e.target;
            ("INPUT" !== t.tagName && "TEXTAREA" !== t.tagName) ||
              (t.dataset.placeholder && (t.placeholder = t.dataset.placeholder),
              t.classList.remove("_form-focus"),
              t.parentElement.classList.remove("_form-focus"),
              t.hasAttribute("data-validate") && m.validateInput(t));
          });
      })(),
      (function (t) {
        e.popup && e.popup.open("some");
        const s = document.forms;
        if (s.length)
          for (const e of s)
            e.addEventListener("submit", function (e) {
              i(e.target, e);
            }),
              e.addEventListener("reset", function (e) {
                const t = e.target;
                m.formClean(t);
              });
        async function i(e, s) {
          if (0 === (t ? m.getErrors(e) : 0)) {
            if (e.hasAttribute("data-ajax")) {
              s.preventDefault();
              const t = e.getAttribute("action")
                  ? e.getAttribute("action").trim()
                  : "#",
                i = e.getAttribute("method")
                  ? e.getAttribute("method").trim()
                  : "GET",
                r = new FormData(e);
              e.classList.add("_sending");
              const a = await fetch(t, { method: i, body: r });
              if (a.ok) {
                await a.json();
                e.classList.remove("_sending"), n(e);
              } else alert("Ошибка"), e.classList.remove("_sending");
            } else e.hasAttribute("data-dev") && (s.preventDefault(), n(e));
          } else {
            s.preventDefault();
            const t = e.querySelector("._form-error");
            t &&
              e.hasAttribute("data-goto-error") &&
              ((e, t = !1, s = 500, i = 0) => {
                const n = "string" == typeof e ? document.querySelector(e) : e;
                if (n) {
                  let r = "",
                    a = 0;
                  t &&
                    ((r = "header.header"),
                    (a = document.querySelector(r).offsetHeight));
                  let o = {
                    speedAsDuration: !0,
                    speed: s,
                    header: r,
                    offset: i,
                    easing: "easeOutQuad",
                  };
                  if (
                    (document.documentElement.classList.contains("menu-open") &&
                      d(),
                    "undefined" != typeof SmoothScroll)
                  )
                    new SmoothScroll().animateScroll(n, "", o);
                  else {
                    let e = n.getBoundingClientRect().top + scrollY;
                    window.scrollTo({ top: a ? e - a : e, behavior: "smooth" });
                  }
                  u(`[gotoBlock]: Юхуу...едем к ${e}`);
                } else
                  u(`[gotoBlock]: Ой ой..Такого блока нет на странице: ${e}`);
              })(t, !0, 1e3);
          }
        }
        function n(t) {
          document.dispatchEvent(
            new CustomEvent("formSent", { detail: { form: t } }),
          ),
            setTimeout(() => {
              if (e.popup) {
                const s = t.dataset.popupMessage;
                s && e.popup.open(s);
              }
            }, 0),
            m.formClean(t),
            u(`[Формы]: ${"Форма отправлена!"}`);
        }
      })(!0);
  })();
})();