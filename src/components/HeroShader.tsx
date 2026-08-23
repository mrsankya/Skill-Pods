import React, { useEffect, useRef } from 'react';

export const HeroShader: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) return;

    let animationFrameId: number;

    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        const w = parent.clientWidth || 1280;
        const h = parent.clientHeight || 720;
        if (canvas.width !== w || canvas.height !== h) {
          canvas.width = w;
          canvas.height = h;
          gl.viewport(0, 0, w, h);
        }
      }
    };

    window.addEventListener('resize', resize);
    resize();

    const vsSource = `
      attribute vec2 a_position;
      varying vec2 v_texCoord;
      void main() {
        v_texCoord = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    const fsSource = `
      precision highp float;
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;
      varying vec2 v_texCoord;

      void main() {
        vec2 uv = v_texCoord;
        vec2 center = vec2(0.5, 0.5);
        
        // Background deep tone
        float dist = distance(uv, center);
        vec3 color = vec3(0.043, 0.043, 0.059);
        
        // Animated flowing purple nebula/glow matching screenshot
        float noise = sin(uv.x * 8.0 + u_time * 0.4) * cos(uv.y * 8.0 + u_time * 0.4) * 0.25;
        float glow = smoothstep(0.7, 0.1, dist + noise);
        vec3 purple = vec3(0.545, 0.361, 0.965); // #8B5CF6
        color += purple * glow * 0.28;
        
        // Subtle technical grid
        vec2 grid = fract(uv * 32.0);
        float line = smoothstep(0.02, 0.0, grid.x) + smoothstep(0.02, 0.0, grid.y);
        color += vec3(0.3, 0.2, 0.5) * line * 0.04;

        // Interactive mouse pulse
        vec2 mouseNorm = u_mouse / u_resolution;
        float mDist = distance(uv, mouseNorm);
        float mouseGlow = smoothstep(0.25, 0.0, mDist);
        color += vec3(0.8, 0.7, 1.0) * mouseGlow * 0.15;

        // Moving node particles representing the skill pod pipeline
        for(int i = 0; i < 7; i++) {
            float fi = float(i);
            vec2 pos = vec2(
                fract(sin(fi * 123.456) + u_time * 0.07),
                0.5 + sin(u_time * 0.4 + fi * 1.5) * 0.22
            );
            float pGlow = smoothstep(0.02, 0.0, distance(uv, pos));
            color += purple * pGlow * 0.9;
        }

        gl_FragColor = vec4(color, 1.0);
      }
    `;

    const createShader = (glCtx: WebGLRenderingContext, type: number, src: string) => {
      const shader = glCtx.createShader(type);
      if (!shader) return null;
      glCtx.shaderSource(shader, src);
      glCtx.compileShader(shader);
      if (!glCtx.getShaderParameter(shader, glCtx.COMPILE_STATUS)) {
        glCtx.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = createShader(gl as WebGLRenderingContext, gl.VERTEX_SHADER, vsSource);
    const fs = createShader(gl as WebGLRenderingContext, gl.FRAGMENT_SHADER, fsSource);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );

    const posAttr = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(posAttr);
    gl.vertexAttribPointer(posAttr, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(program, 'u_time');
    const uRes = gl.getUniformLocation(program, 'u_resolution');
    const uMouse = gl.getUniformLocation(program, 'u_mouse');

    let mouse = { x: canvas.width / 2, y: canvas.height / 2 };
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width && rect.height) {
        const nx = (e.clientX - rect.left) / rect.width;
        const ny = 1.0 - (e.clientY - rect.top) / rect.height;
        mouse.x = nx * canvas.width;
        mouse.y = ny * canvas.height;
      }
    };
    window.addEventListener('mousemove', handleMouseMove);

    const render = (timeMs: number) => {
      resize();
      gl.useProgram(program);
      if (uTime) gl.uniform1f(uTime, timeMs * 0.001);
      if (uRes) gl.uniform2f(uRes, canvas.width, canvas.height);
      if (uMouse) gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none opacity-45 mix-blend-screen overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};
