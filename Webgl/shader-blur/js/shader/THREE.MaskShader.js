/**
 * @author felixturner / http://airtight.cc/
 *
 * Kaleidoscope Shader
 * Radial reflection around center point
 * Ported from: http://pixelshaders.com/editor/
 * by Toby Schachman / http://tobyschachman.com/
 *
 * sides: number of reflections
 * angle: initial angle in radians
 */

THREE.MaskShader = {

  uniforms: {

    "tDiffuse" : { type: "t", value: null },
    "sides"    : { type: "f", value: 6.0 },
    "angle"    : { type: "f", value: 0.0 },
    "progress" : { type: "f", value: 0.0 }

  },

  vertexShader: [

    "varying vec2 vUv;",

    "void main() {",

      "vUv = uv;",
      "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

    "}"

  ].join("\n"),

  fragmentShader: [

    "uniform sampler2D tDiffuse;",
    "uniform float sides;",
    "uniform float angle;",
    "uniform float progress;",
    
    "varying vec2 vUv;",

    "void main() {",

      "vec2 p = vUv;",
      
      "if (p.x < 0.25) p.x = p.x - 0. * progress;",
      "else if (p.x < 0.5) p.x = p.x - 0.25 * progress * progress;",
      "else if (p.x < 0.75) p.x = p.x - 0.35 * progress;",
      "else p.x = p.x - 0.65 * progress * progress;",

      // "if (p.x < 0.25) p.x = p.x + 0.5 * progress;",
      // "else if (p.x < 0.5) p.x = p.x + 0.25 * progress;",
      // "else if (p.x < 0.75) p.x = p.x + 0. * progress;",
      // "else p.x = p.x - 0.75 * progress;",

      "vec4 color = texture2D(tDiffuse, p );",
      "gl_FragColor = color;",

    "}"

  ].join("\n")

};