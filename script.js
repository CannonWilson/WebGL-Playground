const vertexShaderSource = `#version 300 es
precision mediump float;

layout(location = 0) in vec4 aPosition;
layout(location = 1) in float aPointSize;
layout(location = 2) in vec4 aColor;

out vec4 vColor;

void main()
{
	vColor = aColor;
	gl_PointSize = aPointSize;
	gl_Position = aPosition;
}`

const fragmentShaderSource = `#version 300 es
precision mediump float;

out vec4 fragColor;

in vec4 vColor;

void main()
{
	fragColor = vColor;
}`

const canvas = document.querySelector('canvas')
const gl = canvas.getContext('webgl2')
const program = gl.createProgram()

const vertexShader = gl.createShader(gl.VERTEX_SHADER)
gl.shaderSource(vertexShader, vertexShaderSource)
gl.compileShader(vertexShader)
gl.attachShader(program, vertexShader)

const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
gl.shaderSource(fragmentShader, fragmentShaderSource)
gl.compileShader(fragmentShader)
gl.attachShader(program, fragmentShader)

gl.linkProgram(program)

if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
	console.log(gl.getShaderInfoLog(vertexShader))
	console.log(gl.getShaderInfoLog(fragmentShader))
}

gl.useProgram(program)

const aPositionLoc = 0 // gl.getAttribLocation(program, 'aPosition')
const aPointSizeLoc = 1 // gl.getAttribLocation(program, 'aPointSize')
const aColorLoc = 2 // gl.getAttribLocation(program, 'aColor')

gl.vertexAttrib4f(aPositionLoc, 0, 0, 0, 1)
gl.vertexAttrib1f(aPointSizeLoc, 100)
gl.vertexAttrib4f(aColorLoc, 1, 0, 0, 1)

gl.drawArrays(gl.POINTS, 0, 3)