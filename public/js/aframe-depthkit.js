(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//Depthkit.js minified
!function r(s, a, l) {
  function h(i, e) {
    if (!a[i]) {
      if (!s[i]) {
        var t = "function" == typeof require && require;if (!e && t) return t(i, !0);if (p) return p(i, !0);var n = new Error("Cannot find module '" + i + "'");throw n.code = "MODULE_NOT_FOUND", n;
      }var o = a[i] = { exports: {} };s[i][0].call(o.exports, function (e) {
        var t = s[i][1][e];return h(t || e);
      }, o, o.exports, r, s, a, l);
    }return a[i].exports;
  }for (var p = "function" == typeof require && require, e = 0; e < l.length; e++) {
    h(l[e]);
  }return h;
}({ 1: [function (e, t, i) {
    t.exports = function (e) {
      "string" == typeof e && (e = [e]);for (var t = [].slice.call(arguments, 1), i = [], n = 0; n < e.length - 1; n++) {
        i.push(e[n], t[n] || "");
      }return i.push(e[n]), i.join("");
    };
  }, {}], 2: [function (e, t, i) {
    "use strict";
    Object.defineProperty(i, "__esModule", { value: !0 });var n = function () {
      function n(e, t) {
        for (var i = 0; i < t.length; i++) {
          var n = t[i];n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
        }
      }return function (e, t, i) {
        return t && n(e.prototype, t), i && n(e, i), e;
      };
    }();var a = e("glslify"),
        l = 256,
        h = 256,
        o = function () {
      function s() {
        var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "mesh",
            t = arguments[1],
            o = this,
            i = arguments[2];arguments[3];!function (e, t) {
          if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
        }(this, s);var n = a(["#define GLSLIFY 1\nuniform sampler2D map;\nuniform float opacity;\n\nuniform float uvdy;\nuniform float uvdx;\n\nvarying float visibility;\nvarying vec2 vUv;\nvarying vec3 vNormal;\nvarying vec3 vPos;\n\nvoid main() {\n\n    if ( visibility < 0.9 ) discard;\n\n    vec4 color = texture2D(map, vUv);\n    color.w = opacity;\n\n    gl_FragColor = color;\n    \n}"]),
            r = a(["#define GLSLIFY 1\nuniform float mindepth;\nuniform float maxdepth;\n\nuniform float width;\nuniform float height;\n\nuniform bool isPoints;\nuniform float pointSize;\n\nuniform float time;\n\nuniform vec2 focalLength;\nuniform vec2 principalPoint;\nuniform vec2 imageDimensions;\nuniform vec4 crop;\nuniform vec2 meshDensity;\nuniform mat4 extrinsics;\n\nvarying vec3 vNormal;\nvarying vec3 vPos;\n\nuniform sampler2D map;\n\nvarying float visibility;\nvarying vec2 vUv;\n\nconst float _DepthSaturationThreshhold = 0.5; //a given pixel whose saturation is less than half will be culled (old default was .5)\nconst float _DepthBrightnessThreshold = 0.5; //a given pixel whose brightness is less than half will be culled (old default was .9)\nconst float  _Epsilon = .03;\n\nvec3 rgb2hsv(vec3 c)\n{\n    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);\n    vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));\n    vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));\n\n    float d = q.x - min(q.w, q.y);\n    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + _Epsilon)), d / (q.x + _Epsilon), q.x);\n}\n\nfloat depthForPoint(vec2 texturePoint)\n{\n    vec4 depthsample = texture2D(map, texturePoint);\n    vec3 depthsamplehsv = rgb2hsv(depthsample.rgb);\n    return depthsamplehsv.g > _DepthSaturationThreshhold && depthsamplehsv.b > _DepthBrightnessThreshold ? depthsamplehsv.r : 0.0;\n}\n\nvoid main() {\n    vec4 texSize = vec4(1.0 / width, 1.0 / height, width, height);\n\n    vec2 centerpix = texSize.xy * .5;\n    vec2 textureStep = 1.0 / meshDensity;\n    vec2 basetex = floor(position.xy * textureStep * texSize.zw) * texSize.xy;\n    vec2 imageCoordinates = crop.xy + (basetex * crop.zw);\n    basetex.y = 1.0 - basetex.y;\n\n    vec2 depthTexCoord = basetex * vec2(1.0, 0.5) + centerpix;\n    vec2 colorTexCoord = basetex * vec2(1.0, 0.5) + vec2(0.0, 0.5) + centerpix;\n\n    vUv = colorTexCoord;\n    vPos = (modelMatrix * vec4(position, 1.0 )).xyz;\n    vNormal = normalMatrix * normal;\n\n    //check neighbors\n    //texture coords come in as [0.0 - 1.0] for this whole plane\n    float depth = depthForPoint(depthTexCoord);\n\n    float neighborDepths[8];\n    neighborDepths[0] = depthForPoint(depthTexCoord + vec2(0.0,  textureStep.y));\n    neighborDepths[1] = depthForPoint(depthTexCoord + vec2(textureStep.x, 0.0));\n    neighborDepths[2] = depthForPoint(depthTexCoord + vec2(0.0, -textureStep.y));\n    neighborDepths[3] = depthForPoint(depthTexCoord + vec2(-textureStep.x, 0.0));\n    neighborDepths[4] = depthForPoint(depthTexCoord + vec2(-textureStep.x, -textureStep.y));\n    neighborDepths[5] = depthForPoint(depthTexCoord + vec2(textureStep.x,  textureStep.y));\n    neighborDepths[6] = depthForPoint(depthTexCoord + vec2(textureStep.x, -textureStep.y));\n    neighborDepths[7] = depthForPoint(depthTexCoord + vec2(-textureStep.x,  textureStep.y));\n\n    visibility = 1.0;\n    int numDudNeighbors = 0;\n    //search neighbor verts in order to see if we are near an edge\n    //if so, clamp to the surface closest to us\n    if (depth < _Epsilon || (1.0 - depth) < _Epsilon)\n    {\n        // float depthDif = 1.0;\n        float nearestDepth = 1.0;\n        for (int i = 0; i < 8; i++)\n        {\n            float depthNeighbor = neighborDepths[i];\n            if (depthNeighbor >= _Epsilon && (1.0 - depthNeighbor) > _Epsilon)\n            {\n                // float thisDif = abs(nearestDepth - depthNeighbor);\n                if (depthNeighbor < nearestDepth)\n                {\n                    // depthDif = thisDif;\n                    nearestDepth = depthNeighbor;\n                }\n            }\n            else\n            {\n                numDudNeighbors++;\n            }\n        }\n\n        depth = nearestDepth;\n        visibility = 0.8;\n\n        // blob filter\n        if (numDudNeighbors > 6)\n        {\n            visibility = 0.0;\n        }\n    }\n\n    // internal edge filter\n    float maxDisparity = 0.0;\n    for (int i = 0; i < 8; i++)\n    {\n        float depthNeighbor = neighborDepths[i];\n        if (depthNeighbor >= _Epsilon && (1.0 - depthNeighbor) > _Epsilon)\n        {\n            maxDisparity = max(maxDisparity, abs(depth - depthNeighbor));\n        }\n    }\n    visibility *= 1.0 - maxDisparity;\n\n    float z = depth * (maxdepth - mindepth) + mindepth;\n    vec4 worldPos = extrinsics * vec4((imageCoordinates * imageDimensions - principalPoint) * z / focalLength, z, 1.0);\n    worldPos.w = 1.0;\n\n    gl_Position = projectionMatrix * modelViewMatrix * worldPos;\n}"]);switch (this.video = document.createElement("video"), this.video.id = "depthkit-video", this.video.crossOrigin = "anonymous", this.video.setAttribute("crossorigin", "anonymous"), this.video.setAttribute("webkit-playsinline", "webkit-playsinline"), this.video.setAttribute("playsinline", "playsinline"), this.video.src = i, this.video.autoplay = !1, this.video.loop = !1, this.video.load(), this.videoTexture = new THREE.VideoTexture(this.video), this.videoTexture.minFilter = THREE.NearestFilter, this.videoTexture.magFilter = THREE.LinearFilter, this.videoTexture.format = THREE.RGBFormat, this.videoTexture.generateMipmaps = !1, this.manager = new THREE.LoadingManager(), this.props, s.geo || s.buildGeomtery(), this.material = new THREE.ShaderMaterial({ uniforms: { map: { type: "t", value: this.videoTexture }, time: { type: "f", value: 0 }, mindepth: { type: "f", value: 0 }, maxdepth: { type: "f", value: 0 }, meshDensity: { value: new THREE.Vector2(l, h) }, focalLength: { value: new THREE.Vector2(1, 1) }, principalPoint: { value: new THREE.Vector2(1, 1) }, imageDimensions: { value: new THREE.Vector2(512, 828) }, extrinsics: { value: new THREE.Matrix4() }, crop: { value: new THREE.Vector4(0, 0, 1, 1) }, width: { type: "f", value: 0 }, height: { type: "f", value: 0 }, opacity: { type: "f", value: 1 }, isPoints: { type: "b", value: !1 }, pointSize: { type: "f", value: 3 } }, vertexShader: r, fragmentShader: n, transparent: !0 }), this.material.side = THREE.DoubleSide, e) {case "wire":
            this.material.wireframe = !0, this.mesh = new THREE.Mesh(s.geo, this.material);break;case "points":
            this.material.uniforms.isPoints.value = !0, this.mesh = new THREE.Points(s.geo, this.material);break;default:
            this.mesh = new THREE.Mesh(s.geo, this.material);}return this.jsonLoader = new THREE.FileLoader(this.manager), this.jsonLoader.setResponseType("json"), this.jsonLoader.load(t, function (e) {
          o.props = e, o.material.uniforms.width.value = o.props.textureWidth, o.material.uniforms.height.value = o.props.textureHeight, o.material.uniforms.mindepth.value = o.props.nearClip, o.material.uniforms.maxdepth.value = o.props.farClip, o.material.uniforms.focalLength.value = o.props.depthFocalLength, o.material.uniforms.principalPoint.value = o.props.depthPrincipalPoint, o.material.uniforms.imageDimensions.value = o.props.depthImageSize, o.material.uniforms.crop.value = o.props.crop;var t = o.props.extrinsics;o.material.uniforms.extrinsics.value.set(t.e00, t.e10, t.e20, t.e30, t.e01, t.e11, t.e21, t.e31, t.e02, t.e12, t.e22, t.e32, t.e03, t.e13, t.e23, t.e33);var i = new THREE.BoxGeometry(o.props.boundsSize.x, o.props.boundsSize.y, o.props.boundsSize.z),
              n = new THREE.MeshBasicMaterial({ color: 16776960, wireframe: !0 });
        }), this.mesh.frustumCulled = !1, (this.mesh.depthkit = this).mesh.name = "depthkit", this.mesh;
      }return n(s, [{ key: "setPointSize", value: function value(e) {
          this.material.uniforms.isPoints.value ? this.material.uniforms.pointSize.value = e : console.warn("Can not set point size because the current character is not set to render points");
        } }, { key: "setOpacity", value: function value(e) {
          this.material.uniforms.opacity.value = e;
        } }, { key: "setLineWidth", value: function value(e) {
          this.material.wireframe ? this.material.wireframeLinewidth = e : console.warn("Can not set the line width because the current character is not set to render wireframe");
        } }, { key: "play", value: function value() {
          this.video.isPlaying ? console.warn("Can not play because the character is already playing") : this.video.play();
        } }, { key: "stop", value: function value() {
          this.video.currentTime = 0, this.video.pause();
        } }, { key: "pause", value: function value() {
          this.video.pause();
        } }, { key: "setLoop", value: function value(e) {
          this.video.loop = e;
        } }, { key: "setVolume", value: function value(e) {
          this.video.volume = e;
        } }, { key: "update", value: function value(e) {
          this.material.uniforms.time.value = e;
        } }, { key: "dispose", value: function value() {
          try {
            this.mesh.parent.remove(this.mesh);
          } catch (e) {
            console.warn(e);
          } finally {
            this.mesh.traverse(function (e) {
              void 0 !== e.geometry && (e.geometry.dispose(), e.material.dispose());
            });
          }
        } }], [{ key: "buildGeomtery", value: function value() {
          s.geo = new THREE.Geometry();for (var e = 0; e < h; e++) {
            for (var t = 0; t < l; t++) {
              s.geo.vertices.push(new THREE.Vector3(t, e, 0));
            }
          }for (var i = 0; i < h - 1; i++) {
            for (var n = 0; n < l - 1; n++) {
              s.geo.faces.push(new THREE.Face3(n + i * l, n + (i + 1) * l, n + 1 + i * l)), s.geo.faces.push(new THREE.Face3(n + 1 + i * l, n + (i + 1) * l, n + 1 + (i + 1) * l));
            }
          }
        } }]), s;
    }();i.default = o;
  }, { glslify: 1 }], 3: [function (e, t, i) {
    "use strict";
    Object.defineProperty(i, "__esModule", { value: !0 }), i.DepthKit = void 0;var n,
        o = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (e) {
      return typeof e === "undefined" ? "undefined" : _typeof(e);
    } : function (e) {
      return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e === "undefined" ? "undefined" : _typeof(e);
    },
        r = e("./depthkit"),
        s = (n = r) && n.__esModule ? n : { default: n };"undefined" != typeof window && "object" === o(window.THREE) ? window.DepthKit = s.default : console.warn("[DepthKit.js] It seems like THREE is not included in your code, try including it before DepthKit.js"), i.DepthKit = s.default;
  }, { "./depthkit": 2 }] }, {}, [3]);

//Make sure AFrame is available
if (typeof AFRAME === 'undefined') {
  throw new Error('Component attempted to register before AFRAME was available.');
}

//AFrame DepthKit.js wrapper entity
AFRAME.registerComponent('depthkit', {

  schema: {
    type: { type: 'string', default: 'mesh' },
    videoPath: { type: 'string' },
    metaPath: { type: 'string' },
    loop: { type: 'boolean', default: true },
    autoplay: { type: 'boolean', default: true }
  },

  /**
   * Set if component needs multiple instancing.
   */
  multiple: true,

  /**
   * Called once when component is attached. Generally for initial setup.
   */
  init: function init() {

    //Create a depthkit instance
    var character = new DepthKit(this.data.type, this.data.metaPath, this.data.videoPath);
    //Will it loop?
    character.depthkit.setLoop(this.data.loop);

    //Rotate it back to position
    character.rotation.z = THREE.Math.degToRad(90);

    //If autoplay is on play the take
    if (this.data.autoplay) character.depthkit.play();

    //Set the Object3D
    this.el.setObject3D('mesh', character);

    //Translate it so it is in front of you at eye level
    this.el.object3D.scale.multiplyScalar(0.001);
    this.el.object3D.position.z = -2;
    this.el.object3D.position.y = 1;
  },

  /**
   * Called when component is attached and when component data changes.
   * Generally modifies the entity based on the data.
   */
  update: function update(oldData) {},

  /**
   * Called when a component is removed (e.g., via removeAttribute).
   * Generally undoes all modifications to the entity.
   */
  remove: function remove() {},

  /**
   * Called on each scene tick.
   */
  // tick: function (t) { },

  /**
   * Called when entity pauses.
   * Use to stop or remove any dynamic or background behavior such as events.
   */
  pause: function pause() {},

  /**
   * Called when entity resumes.
   * Use to continue or add any dynamic or background behavior such as events.
   */
  play: function play() {}
});

},{}]},{},[1]);