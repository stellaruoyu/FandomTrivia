import React, { useRef, useEffect, useCallback } from 'react';

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    opacity: number;
    color: string;
    life: number;
    maxLife: number;
    rotation: number;
    rotationSpeed: number;
}

interface ParticleCanvasProps {
    mode: 'ambient' | 'celebration';
    colors?: string[];
    particleCount?: number;
    className?: string;
}

const DEFAULT_AMBIENT_COLORS = [
    'rgba(255,255,255,', 'rgba(168,140,255,', 'rgba(255,200,100,',
    'rgba(140,180,255,', 'rgba(200,160,255,',
];

const DEFAULT_CELEBRATION_COLORS = [
    'rgba(255,215,0,',   // gold
    'rgba(168,140,255,', // purple
    'rgba(255,100,150,', // pink
    'rgba(100,200,255,', // blue
    'rgba(255,255,255,', // white
];

function randomInRange(min: number, max: number) {
    return Math.random() * (max - min) + min;
}

const ParticleCanvas: React.FC<ParticleCanvasProps> = ({
    mode,
    colors,
    particleCount,
    className = '',
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const animFrameRef = useRef<number>(0);

    const palette = colors || (mode === 'ambient' ? DEFAULT_AMBIENT_COLORS : DEFAULT_CELEBRATION_COLORS);
    const count = particleCount || (mode === 'ambient' ? 35 : 100);

    const createAmbientParticle = useCallback((w: number, h: number): Particle => {
        const maxLife = randomInRange(120, 300);
        return {
            x: randomInRange(0, w),
            y: randomInRange(0, h),
            vx: randomInRange(-0.15, 0.15),
            vy: randomInRange(-0.4, -0.1),
            size: randomInRange(1, 3),
            opacity: 0,
            color: palette[Math.floor(Math.random() * palette.length)],
            life: Math.random() * maxLife, // stagger start
            maxLife,
            rotation: 0,
            rotationSpeed: 0,
        };
    }, [palette]);

    const createCelebrationParticle = useCallback((cx: number, cy: number): Particle => {
        const angle = randomInRange(0, Math.PI * 2);
        const speed = randomInRange(2, 8);
        const maxLife = randomInRange(60, 120);
        return {
            x: cx + randomInRange(-20, 20),
            y: cy + randomInRange(-20, 20),
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed - randomInRange(1, 3),
            size: randomInRange(2, 6),
            opacity: 1,
            color: palette[Math.floor(Math.random() * palette.length)],
            life: 0,
            maxLife,
            rotation: randomInRange(0, Math.PI * 2),
            rotationSpeed: randomInRange(-0.1, 0.1),
        };
    }, [palette]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resize = () => {
            const rect = canvas.parentElement?.getBoundingClientRect();
            if (rect) {
                canvas.width = rect.width;
                canvas.height = rect.height;
            }
        };
        resize();
        window.addEventListener('resize', resize);

        // Initialize particles
        const w = canvas.width;
        const h = canvas.height;

        if (mode === 'ambient') {
            particlesRef.current = Array.from({ length: count }, () => createAmbientParticle(w, h));
        } else {
            const cx = w / 2;
            const cy = h * 0.35;
            particlesRef.current = Array.from({ length: count }, () => createCelebrationParticle(cx, cy));
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const particles = particlesRef.current;

            for (let i = particles.length - 1; i >= 0; i--) {
                const p = particles[i];
                p.life++;

                if (mode === 'ambient') {
                    // Fade in/out cycle
                    const halfLife = p.maxLife / 2;
                    p.opacity = p.life < halfLife
                        ? Math.min(p.life / 30, 0.6)
                        : Math.max(0, 0.6 * (1 - (p.life - halfLife) / halfLife));

                    // Subtle twinkle
                    const twinkle = 0.3 + 0.7 * (0.5 + 0.5 * Math.sin(p.life * 0.08 + p.x));
                    p.opacity *= twinkle;

                    p.x += p.vx;
                    p.y += p.vy;

                    // Respawn when dead
                    if (p.life >= p.maxLife || p.y < -10) {
                        particles[i] = createAmbientParticle(canvas.width, canvas.height);
                        particles[i].y = canvas.height + 10;
                        particles[i].life = 0;
                    }
                } else {
                    // Celebration: gravity + fade
                    p.vy += 0.08; // gravity
                    p.vx *= 0.99; // drag
                    p.x += p.vx;
                    p.y += p.vy;
                    p.rotation += p.rotationSpeed;

                    const progress = p.life / p.maxLife;
                    p.opacity = progress < 0.1 ? progress * 10 : Math.max(0, 1 - (progress - 0.3) / 0.7);

                    if (p.life >= p.maxLife) {
                        particles.splice(i, 1);
                        continue;
                    }
                }

                // Draw
                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate(p.rotation);
                ctx.globalAlpha = p.opacity;

                if (mode === 'celebration' && p.size > 3) {
                    // Draw as a small rectangle (confetti)
                    ctx.fillStyle = `${p.color}${p.opacity})`;
                    ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
                } else {
                    // Draw as a glowing circle
                    ctx.beginPath();
                    ctx.arc(0, 0, p.size, 0, Math.PI * 2);
                    ctx.fillStyle = `${p.color}${p.opacity})`;
                    ctx.fill();

                    // Glow effect for ambient
                    if (mode === 'ambient' && p.size > 1.5) {
                        ctx.beginPath();
                        ctx.arc(0, 0, p.size * 2.5, 0, Math.PI * 2);
                        ctx.fillStyle = `${p.color}${p.opacity * 0.15})`;
                        ctx.fill();
                    }
                }

                ctx.restore();
            }

            animFrameRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animFrameRef.current);
        };
    }, [mode, count, createAmbientParticle, createCelebrationParticle]);

    return (
        <canvas
            ref={canvasRef}
            className={`absolute inset-0 pointer-events-none ${className}`}
            style={{ zIndex: 1 }}
        />
    );
};

export default ParticleCanvas;
