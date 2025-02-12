import React, { useState, useEffect } from "react";
import t from "axios";
var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a2, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a2, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a2, prop, b[prop]);
    }
  return a2;
};
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var __defProp2 = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols2 = Object.getOwnPropertySymbols;
var __hasOwnProp2 = Object.prototype.hasOwnProperty;
var __propIsEnum2 = Object.prototype.propertyIsEnumerable;
var __defNormalProp2 = (obj, key, value) => key in obj ? __defProp2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues2 = (a2, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp2.call(b, prop))
      __defNormalProp2(a2, prop, b[prop]);
  if (__getOwnPropSymbols2)
    for (var prop of __getOwnPropSymbols2(b)) {
      if (__propIsEnum2.call(b, prop))
        __defNormalProp2(a2, prop, b[prop]);
    }
  return a2;
};
var __spreadProps = (a2, b) => __defProps(a2, __getOwnPropDescs(b));
let loaded = false;
const callbacks = [];
const loadBridge = (src) => {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined")
      return;
    window.storyblokRegisterEvent = (cb) => {
      if (window.location === window.parent.location) {
        console.warn("You are not in Draft Mode or in the Visual Editor.");
        return;
      }
      if (!loaded)
        callbacks.push(cb);
      else
        cb();
    };
    if (document.getElementById("storyblok-javascript-bridge"))
      return;
    const script = document.createElement("script");
    script.async = true;
    script.src = src;
    script.id = "storyblok-javascript-bridge";
    script.onerror = (error) => reject(error);
    script.onload = (ev) => {
      callbacks.forEach((cb) => cb());
      loaded = true;
      resolve(ev);
    };
    document.getElementsByTagName("head")[0].appendChild(script);
  });
};
/*!
 * storyblok-js-client v0.0.0-development
 * Universal JavaScript SDK for Storyblok's API
 * (c) 2020-2022 Stobylok Team
 */
function e(t2) {
  return typeof t2 == "number" && (t2 == t2 && t2 !== 1 / 0 && t2 !== -1 / 0);
}
function r(t2, r2, s2) {
  if (!e(r2))
    throw new TypeError("Expected `limit` to be a finite number");
  if (!e(s2))
    throw new TypeError("Expected `interval` to be a finite number");
  var n2 = [], i2 = [], o2 = 0, a2 = function() {
    o2++;
    var e2 = setTimeout(function() {
      o2--, n2.length > 0 && a2(), i2 = i2.filter(function(t3) {
        return t3 !== e2;
      });
    }, s2);
    i2.indexOf(e2) < 0 && i2.push(e2);
    var r3 = n2.shift();
    r3.resolve(t2.apply(r3.self, r3.args));
  }, l2 = function() {
    var t3 = arguments, e2 = this;
    return new Promise(function(s3, i3) {
      n2.push({ resolve: s3, reject: i3, args: t3, self: e2 }), o2 < r2 && a2();
    });
  };
  return l2.abort = function() {
    i2.forEach(clearTimeout), i2 = [], n2.forEach(function(t3) {
      t3.reject(new throttle.AbortError());
    }), n2.length = 0;
  }, l2;
}
r.AbortError = function() {
  Error.call(this, "Throttled function aborted"), this.name = "AbortError";
};
const s = function(t2, e2) {
  if (!t2)
    return null;
  let r2 = {};
  for (let s2 in t2) {
    let n2 = t2[s2];
    e2.indexOf(s2) > -1 && n2 !== null && (r2[s2] = n2);
  }
  return r2;
};
var n = { nodes: { horizontal_rule: (t2) => ({ singleTag: "hr" }), blockquote: (t2) => ({ tag: "blockquote" }), bullet_list: (t2) => ({ tag: "ul" }), code_block: (t2) => ({ tag: ["pre", { tag: "code", attrs: t2.attrs }] }), hard_break: (t2) => ({ singleTag: "br" }), heading: (t2) => ({ tag: "h" + t2.attrs.level }), image: (t2) => ({ singleTag: [{ tag: "img", attrs: s(t2.attrs, ["src", "alt", "title"]) }] }), list_item: (t2) => ({ tag: "li" }), ordered_list: (t2) => ({ tag: "ol" }), paragraph: (t2) => ({ tag: "p" }) }, marks: { bold: () => ({ tag: "b" }), strike: () => ({ tag: "strike" }), underline: () => ({ tag: "u" }), strong: () => ({ tag: "strong" }), code: () => ({ tag: "code" }), italic: () => ({ tag: "i" }), link(t2) {
  const e2 = __spreadValues2({}, t2.attrs), { linktype: r2 = "url" } = t2.attrs;
  return r2 === "email" && (e2.href = "mailto:" + e2.href), e2.anchor && (e2.href = `${e2.href}#${e2.anchor}`, delete e2.anchor), { tag: [{ tag: "a", attrs: e2 }] };
}, styled: (t2) => ({ tag: [{ tag: "span", attrs: t2.attrs }] }) } };
class i {
  constructor(t2) {
    t2 || (t2 = n), this.marks = t2.marks || [], this.nodes = t2.nodes || [];
  }
  addNode(t2, e2) {
    this.nodes[t2] = e2;
  }
  addMark(t2, e2) {
    this.marks[t2] = e2;
  }
  render(t2 = {}) {
    if (t2.content && Array.isArray(t2.content)) {
      let e2 = "";
      return t2.content.forEach((t3) => {
        e2 += this.renderNode(t3);
      }), e2;
    }
    return console.warn("The render method must receive an object with a content field, which is an array"), "";
  }
  renderNode(t2) {
    let e2 = [];
    t2.marks && t2.marks.forEach((t3) => {
      const r3 = this.getMatchingMark(t3);
      r3 && e2.push(this.renderOpeningTag(r3.tag));
    });
    const r2 = this.getMatchingNode(t2);
    return r2 && r2.tag && e2.push(this.renderOpeningTag(r2.tag)), t2.content ? t2.content.forEach((t3) => {
      e2.push(this.renderNode(t3));
    }) : t2.text ? e2.push(function(t3) {
      const e3 = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }, r3 = /[&<>"']/g, s2 = RegExp(r3.source);
      return t3 && s2.test(t3) ? t3.replace(r3, (t4) => e3[t4]) : t3;
    }(t2.text)) : r2 && r2.singleTag ? e2.push(this.renderTag(r2.singleTag, " /")) : r2 && r2.html && e2.push(r2.html), r2 && r2.tag && e2.push(this.renderClosingTag(r2.tag)), t2.marks && t2.marks.slice(0).reverse().forEach((t3) => {
      const r3 = this.getMatchingMark(t3);
      r3 && e2.push(this.renderClosingTag(r3.tag));
    }), e2.join("");
  }
  renderTag(t2, e2) {
    if (t2.constructor === String)
      return `<${t2}${e2}>`;
    return t2.map((t3) => {
      if (t3.constructor === String)
        return `<${t3}${e2}>`;
      {
        let r2 = "<" + t3.tag;
        if (t3.attrs)
          for (let e3 in t3.attrs) {
            let s2 = t3.attrs[e3];
            s2 !== null && (r2 += ` ${e3}="${s2}"`);
          }
        return `${r2}${e2}>`;
      }
    }).join("");
  }
  renderOpeningTag(t2) {
    return this.renderTag(t2, "");
  }
  renderClosingTag(t2) {
    if (t2.constructor === String)
      return `</${t2}>`;
    return t2.slice(0).reverse().map((t3) => t3.constructor === String ? `</${t3}>` : `</${t3.tag}>`).join("");
  }
  getMatchingNode(t2) {
    if (typeof this.nodes[t2.type] == "function")
      return this.nodes[t2.type](t2);
  }
  getMatchingMark(t2) {
    if (typeof this.marks[t2.type] == "function")
      return this.marks[t2.type](t2);
  }
}
const o = (t2 = 0, e2 = t2) => {
  const r2 = Math.abs(e2 - t2) || 0, s2 = t2 < e2 ? 1 : -1;
  return ((t3 = 0, e3) => [...Array(t3)].map(e3))(r2, (e3, r3) => r3 * s2 + t2);
}, a = (t2, e2, r2) => {
  const s2 = [];
  for (const n2 in t2) {
    if (!Object.prototype.hasOwnProperty.call(t2, n2))
      continue;
    const i2 = t2[n2], o2 = r2 ? "" : encodeURIComponent(n2);
    let l2;
    l2 = typeof i2 == "object" ? a(i2, e2 ? e2 + encodeURIComponent("[" + o2 + "]") : o2, Array.isArray(i2)) : (e2 ? e2 + encodeURIComponent("[" + o2 + "]") : o2) + "=" + encodeURIComponent(i2), s2.push(l2);
  }
  return s2.join("&");
};
let l = {}, c = {};
class StoryblokClient {
  constructor(e2, s2) {
    if (!s2) {
      let t2 = e2.region ? "-" + e2.region : "", r2 = e2.https === false ? "http" : "https";
      s2 = e2.oauthToken === void 0 ? `${r2}://api${t2}.storyblok.com/v2` : `${r2}://api${t2}.storyblok.com/v1`;
    }
    let n2 = Object.assign({}, e2.headers), o2 = 5;
    e2.oauthToken !== void 0 && (n2.Authorization = e2.oauthToken, o2 = 3), e2.rateLimit !== void 0 && (o2 = e2.rateLimit), this.richTextResolver = new i(e2.richTextSchema), typeof e2.componentResolver == "function" && this.setComponentResolver(e2.componentResolver), this.maxRetries = e2.maxRetries || 5, this.throttle = r(this.throttledRequest, o2, 1e3), this.accessToken = e2.accessToken, this.relations = {}, this.links = {}, this.cache = e2.cache || { clear: "manual" }, this.client = t.create({ baseURL: s2, timeout: e2.timeout || 0, headers: n2, proxy: e2.proxy || false }), e2.responseInterceptor && this.client.interceptors.response.use((t2) => e2.responseInterceptor(t2));
  }
  setComponentResolver(t2) {
    this.richTextResolver.addNode("blok", (e2) => {
      let r2 = "";
      return e2.attrs.body.forEach((e3) => {
        r2 += t2(e3.component, e3);
      }), { html: r2 };
    });
  }
  parseParams(t2 = {}) {
    return t2.version || (t2.version = "published"), t2.token || (t2.token = this.getToken()), t2.cv || (t2.cv = c[t2.token]), Array.isArray(t2.resolve_relations) && (t2.resolve_relations = t2.resolve_relations.join(",")), t2;
  }
  factoryParamOptions(t2, e2 = {}) {
    return ((t3 = "") => t3.indexOf("/cdn/") > -1)(t2) ? this.parseParams(e2) : e2;
  }
  makeRequest(t2, e2, r2, s2) {
    const n2 = this.factoryParamOptions(t2, ((t3 = {}, e3 = 25, r3 = 1) => __spreadProps(__spreadValues2({}, t3), { per_page: e3, page: r3 }))(e2, r2, s2));
    return this.cacheResponse(t2, n2);
  }
  get(t2, e2) {
    let r2 = "/" + t2;
    const s2 = this.factoryParamOptions(r2, e2);
    return this.cacheResponse(r2, s2);
  }
  async getAll(t2, e2 = {}, r2) {
    const s2 = e2.per_page || 25, n2 = "/" + t2, i2 = n2.split("/");
    r2 = r2 || i2[i2.length - 1];
    const a2 = await this.makeRequest(n2, e2, s2, 1), l2 = Math.ceil(a2.total / s2);
    return ((t3 = [], e3) => t3.map(e3).reduce((t4, e4) => [...t4, ...e4], []))([a2, ...await (async (t3 = [], e3) => Promise.all(t3.map(e3)))(o(1, l2), async (t3) => this.makeRequest(n2, e2, s2, t3 + 1))], (t3) => Object.values(t3.data[r2]));
  }
  post(t2, e2) {
    let r2 = "/" + t2;
    return this.throttle("post", r2, e2);
  }
  put(t2, e2) {
    let r2 = "/" + t2;
    return this.throttle("put", r2, e2);
  }
  delete(t2, e2) {
    let r2 = "/" + t2;
    return this.throttle("delete", r2, e2);
  }
  getStories(t2) {
    return this.get("cdn/stories", t2);
  }
  getStory(t2, e2) {
    return this.get("cdn/stories/" + t2, e2);
  }
  setToken(t2) {
    this.accessToken = t2;
  }
  getToken() {
    return this.accessToken;
  }
  _cleanCopy(t2) {
    return JSON.parse(JSON.stringify(t2));
  }
  _insertLinks(t2, e2) {
    const r2 = t2[e2];
    r2 && r2.fieldtype == "multilink" && r2.linktype == "story" && typeof r2.id == "string" && this.links[r2.id] ? r2.story = this._cleanCopy(this.links[r2.id]) : r2 && r2.linktype === "story" && typeof r2.uuid == "string" && this.links[r2.uuid] && (r2.story = this._cleanCopy(this.links[r2.uuid]));
  }
  _insertRelations(t2, e2, r2) {
    if (r2.indexOf(t2.component + "." + e2) > -1) {
      if (typeof t2[e2] == "string")
        this.relations[t2[e2]] && (t2[e2] = this._cleanCopy(this.relations[t2[e2]]));
      else if (t2[e2].constructor === Array) {
        let r3 = [];
        t2[e2].forEach((t3) => {
          this.relations[t3] && r3.push(this._cleanCopy(this.relations[t3]));
        }), t2[e2] = r3;
      }
    }
  }
  iterateTree(t2, e2) {
    let r2 = (t3) => {
      if (t3 != null) {
        if (t3.constructor === Array)
          for (let e3 = 0; e3 < t3.length; e3++)
            r2(t3[e3]);
        else if (t3.constructor === Object) {
          if (t3._stopResolving)
            return;
          for (let s2 in t3)
            (t3.component && t3._uid || t3.type === "link") && (this._insertRelations(t3, s2, e2), this._insertLinks(t3, s2)), r2(t3[s2]);
        }
      }
    };
    r2(t2.content);
  }
  async resolveLinks(t2, e2) {
    let r2 = [];
    if (t2.link_uuids) {
      const s2 = t2.link_uuids.length;
      let n2 = [];
      const i2 = 50;
      for (let e3 = 0; e3 < s2; e3 += i2) {
        const r3 = Math.min(s2, e3 + i2);
        n2.push(t2.link_uuids.slice(e3, r3));
      }
      for (let t3 = 0; t3 < n2.length; t3++) {
        (await this.getStories({ per_page: i2, language: e2.language, version: e2.version, by_uuids: n2[t3].join(",") })).data.stories.forEach((t4) => {
          r2.push(t4);
        });
      }
    } else
      r2 = t2.links;
    r2.forEach((t3) => {
      this.links[t3.uuid] = __spreadProps(__spreadValues2({}, t3), { _stopResolving: true });
    });
  }
  async resolveRelations(t2, e2) {
    let r2 = [];
    if (t2.rel_uuids) {
      const s2 = t2.rel_uuids.length;
      let n2 = [];
      const i2 = 50;
      for (let e3 = 0; e3 < s2; e3 += i2) {
        const r3 = Math.min(s2, e3 + i2);
        n2.push(t2.rel_uuids.slice(e3, r3));
      }
      for (let t3 = 0; t3 < n2.length; t3++) {
        (await this.getStories({ per_page: i2, language: e2.language, version: e2.version, by_uuids: n2[t3].join(",") })).data.stories.forEach((t4) => {
          r2.push(t4);
        });
      }
    } else
      r2 = t2.rels;
    r2.forEach((t3) => {
      this.relations[t3.uuid] = __spreadProps(__spreadValues2({}, t3), { _stopResolving: true });
    });
  }
  async resolveStories(t2, e2) {
    let r2 = [];
    e2.resolve_relations !== void 0 && e2.resolve_relations.length > 0 && (r2 = e2.resolve_relations.split(","), await this.resolveRelations(t2, e2)), ["1", "story", "url"].indexOf(e2.resolve_links) > -1 && await this.resolveLinks(t2, e2);
    for (const t3 in this.relations)
      this.iterateTree(this.relations[t3], r2);
    t2.story ? this.iterateTree(t2.story, r2) : t2.stories.forEach((t3) => {
      this.iterateTree(t3, r2);
    });
  }
  cacheResponse(t2, e2, r2) {
    return r2 === void 0 && (r2 = 0), new Promise(async (s2, n2) => {
      let i2 = a({ url: t2, params: e2 }), o2 = this.cacheProvider();
      if (this.cache.clear === "auto" && e2.version === "draft" && await this.flushCache(), e2.version === "published" && t2 != "/cdn/spaces/me") {
        const t3 = await o2.get(i2);
        if (t3)
          return s2(t3);
      }
      try {
        let r3 = await this.throttle("get", t2, { params: e2, paramsSerializer: (t3) => a(t3) }), l3 = { data: r3.data, headers: r3.headers };
        if (r3.headers["per-page"] && (l3 = Object.assign({}, l3, { perPage: parseInt(r3.headers["per-page"]), total: parseInt(r3.headers.total) })), r3.status != 200)
          return n2(r3);
        (l3.data.story || l3.data.stories) && await this.resolveStories(l3.data, e2), e2.version === "published" && t2 != "/cdn/spaces/me" && o2.set(i2, l3), l3.data.cv && (e2.version == "draft" && c[e2.token] != l3.data.cv && this.flushCache(), c[e2.token] = l3.data.cv), s2(l3);
      } catch (i3) {
        if (i3.response && i3.response.status === 429 && (r2 += 1) < this.maxRetries)
          return console.log(`Hit rate limit. Retrying in ${r2} seconds.`), await (l2 = 1e3 * r2, new Promise((t3) => setTimeout(t3, l2))), this.cacheResponse(t2, e2, r2).then(s2).catch(n2);
        n2(i3);
      }
      var l2;
    });
  }
  throttledRequest(t2, e2, r2) {
    return this.client[t2](e2, r2);
  }
  cacheVersions() {
    return c;
  }
  cacheVersion() {
    return c[this.accessToken];
  }
  setCacheVersion(t2) {
    this.accessToken && (c[this.accessToken] = t2);
  }
  cacheProvider() {
    switch (this.cache.type) {
      case "memory":
        return { get: (t2) => l[t2], getAll: () => l, set(t2, e2) {
          l[t2] = e2;
        }, flush() {
          l = {};
        } };
      default:
        return { get() {
        }, getAll() {
        }, set() {
        }, flush() {
        } };
    }
  }
  async flushCache() {
    return await this.cacheProvider().flush(), this;
  }
}
var api = (options = {}) => {
  const { apiOptions } = options;
  if (!apiOptions.accessToken) {
    console.error("You need to provide an access token to interact with Storyblok API. Read https://www.storyblok.com/docs/api/content-delivery#topics/authentication");
    return;
  }
  const storyblokApi = new StoryblokClient(apiOptions);
  return { storyblokApi };
};
var editable = (blok) => {
  if (typeof blok !== "object" || typeof blok._editable === "undefined") {
    return {};
  }
  const options = JSON.parse(blok._editable.replace(/^<!--#storyblok#/, "").replace(/-->$/, ""));
  return {
    "data-blok-c": JSON.stringify(options),
    "data-blok-uid": options.id + "-" + options.uid
  };
};
const bridgeLatest = "https://app.storyblok.com/f/storyblok-v2-latest.js";
const useStoryblokBridge = (id, cb, options = {}) => {
  if (typeof window === "undefined") {
    return;
  }
  if (typeof window.storyblokRegisterEvent === "undefined") {
    console.error("Storyblok Bridge is disabled. Please enable it to use it. Read https://github.com/storyblok/storyblok-js");
    return;
  }
  if (!id) {
    console.warn("Story ID is not defined. Please provide a valid ID.");
    return;
  }
  window.storyblokRegisterEvent(() => {
    const sbBridge = new window.StoryblokBridge(options);
    sbBridge.on(["input", "published", "change"], (event) => {
      if (event.action == "input" && event.story.id === id) {
        cb(event.story);
      } else {
        window.location.reload();
      }
    });
  });
};
const storyblokInit$1 = (pluginOptions = {}) => {
  const { bridge, accessToken, use = [], apiOptions = {} } = pluginOptions;
  apiOptions.accessToken = apiOptions.accessToken || accessToken;
  const options = { bridge, apiOptions };
  let result = {};
  use.forEach((pluginFactory) => {
    result = __spreadValues2(__spreadValues2({}, result), pluginFactory(options));
  });
  if (bridge !== false) {
    loadBridge(bridgeLatest);
  }
  return result;
};
const StoryblokComponent = (_a) => {
  var _b = _a, { blok } = _b, restProps = __objRest(_b, ["blok"]);
  if (!blok) {
    console.error("Please provide a 'blok' property to the StoryblokComponent");
    return /* @__PURE__ */ React.createElement("div", null, "Please provide a blok property to the StoryblokComponent");
  }
  const Component = getComponent(blok.component);
  if (!Component) {
    return "";
  }
  return /* @__PURE__ */ React.createElement(Component, __spreadValues({
    blok
  }, restProps));
};
let componentsMap = {};
const getComponent = (componentKey) => {
  if (!componentsMap[componentKey]) {
    console.error(`Component ${componentKey} doesn't exist.`);
    return false;
  }
  return componentsMap[componentKey];
};
const storyblokInit = (pluginOptions = {}) => {
  storyblokInit$1(pluginOptions);
  componentsMap = pluginOptions.components;
};
function useStoryblokState(originalStory, bridgeOptions) {
  if (typeof originalStory.content === "string")
    originalStory.content = JSON.parse(originalStory.content);
  let [story, setStory] = useState(originalStory);
  useEffect(() => {
    useStoryblokBridge(story.internalId, (newStory) => setStory(newStory), bridgeOptions);
  }, []);
  return story;
}
export { StoryblokComponent, api as apiPlugin, editable as storyblokEditable, storyblokInit, useStoryblokBridge, useStoryblokState };
