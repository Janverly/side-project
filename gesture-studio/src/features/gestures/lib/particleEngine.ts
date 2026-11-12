import { MAX_PARTICLES, MIN_PARTICLES } from '@/lib/constants/gesture';

export type Point = { x: number; y: number };

type Dust = {
    kind: 'dust';
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    hue: number;
    alpha: number;
    phase: number;
};

type Spark = {
    kind: 'spark';
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    hue: number;
    alpha: number;
    life: number;
    maxLife: number;
    gravity: number;
};

type Particle = Dust | Spark;

type Ring = {
    x: number;
    y: number;
    radius: number;
    maxRadius: number;
    speed: number;
    alpha: number;
    hue: number;
    width: number;
};

const random = (min: number, max: number) => min + Math.random() * (max - min);

/**
 * Canvas particle field. It is deliberately framework-free: React only creates
 * the canvas, feeds it hand pointers and calls the gesture effects.
 */
export class ParticleEngine {
    private readonly canvas: HTMLCanvasElement;
    private readonly ctx: CanvasRenderingContext2D | null;
    private particles: Particle[] = [];
    private rings: Ring[] = [];
    private pointers: Point[] = [];
    private width = 0;
    private height = 0;
    private dpr = 1;
    private raf = 0;
    private lastFrame = 0;
    private elapsed = 0;
    private rainbow = false;
    private frozen = false;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.resize();
    }

    resize(): void {
        const rect = this.canvas.getBoundingClientRect();
        this.width = Math.max(1, rect.width || this.canvas.clientWidth || 800);
        this.height = Math.max(1, rect.height || this.canvas.clientHeight || 500);
        this.dpr = Math.min(2, window.devicePixelRatio || 1);
        this.canvas.width = Math.floor(this.width * this.dpr);
        this.canvas.height = Math.floor(this.height * this.dpr);
        if (this.ctx) {
            this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
        }
        this.fillParticles();
    }

    start(): void {
        if (this.raf) return;
        this.lastFrame = performance.now();
        const tick = (now: number) => {
            const delta = Math.min(2.5, (now - this.lastFrame) / 16.667);
            this.lastFrame = now;
            this.elapsed += delta / 60;
            this.update(delta);
            this.draw();
            this.raf = requestAnimationFrame(tick);
        };
        this.raf = requestAnimationFrame(tick);
    }

    destroy(): void {
        cancelAnimationFrame(this.raf);
        this.raf = 0;
        this.particles = [];
        this.rings = [];
    }

    setPointers(points: Point[]): void {
        this.pointers = points.slice(0, 2);
    }

    setRainbow(value: boolean): void {
        this.rainbow = value;
    }

    getRainbow(): boolean {
        return this.rainbow;
    }

    setFrozen(value: boolean): void {
        this.frozen = value;
    }

    getFrozen(): boolean {
        return this.frozen;
    }

    private center(): Point {
        return this.pointers[0] ?? { x: this.width / 2, y: this.height / 2 };
    }

    triggerBurst(x?: number, y?: number): void {
        const origin = { x: x ?? this.center().x, y: y ?? this.center().y };
        const amount = 80;
        for (let index = 0; index < amount; index += 1) {
            const angle = random(0, Math.PI * 2);
            const speed = random(1.4, 8.5);
            const life = random(34, 86);
            this.particles.push({
                kind: 'spark',
                x: origin.x + random(-8, 8),
                y: origin.y + random(-8, 8),
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                size: random(1.2, 3.6),
                hue: random(250, 330),
                alpha: 1,
                life,
                maxLife: life,
                gravity: random(0.01, 0.05),
            });
        }
        this.capParticles();
        this.rings.push({
            x: origin.x,
            y: origin.y,
            radius: 6,
            maxRadius: Math.max(90, Math.min(this.width, this.height) * 0.28),
            speed: 5.5,
            alpha: 0.9,
            hue: 285,
            width: 3,
        });
    }

    triggerShockwave(x?: number, y?: number): void {
        const origin = { x: x ?? this.center().x, y: y ?? this.center().y };
        this.rings.push({
            x: origin.x,
            y: origin.y,
            radius: 8,
            maxRadius: Math.hypot(this.width, this.height) * 0.55,
            speed: 8.5,
            alpha: 1,
            hue: 188,
            width: 5,
        });
        for (const particle of this.particles) {
            const dx = particle.x - origin.x;
            const dy = particle.y - origin.y;
            const distance = Math.hypot(dx, dy) + 1;
            const force = Math.max(0, 1 - distance / 460) * random(3, 9);
            particle.vx += (dx / distance) * force;
            particle.vy += (dy / distance) * force;
        }
    }

    triggerVortex(x?: number, y?: number): void {
        const origin = { x: x ?? this.center().x, y: y ?? this.center().y };
        for (const particle of this.particles) {
            const dx = particle.x - origin.x;
            const dy = particle.y - origin.y;
            const distance = Math.hypot(dx, dy) + 1;
            const inward = random(1.5, 5);
            particle.vx += (-dx / distance) * inward - (dy / distance) * random(1, 4);
            particle.vy += (-dy / distance) * inward + (dx / distance) * random(1, 4);
        }
        this.rings.push({
            x: origin.x,
            y: origin.y,
            radius: Math.min(this.width, this.height) * 0.48,
            maxRadius: 20,
            speed: -7,
            alpha: 0.85,
            hue: 262,
            width: 4,
        });
    }

    private targetCount(): number {
        const ideal = Math.floor((this.width * this.height) / 3400);
        return Math.max(MIN_PARTICLES, Math.min(MAX_PARTICLES, ideal));
    }

    private makeDust(): Dust {
        return {
            kind: 'dust',
            x: random(0, this.width),
            y: random(0, this.height),
            vx: random(-0.35, 0.35),
            vy: random(-0.35, 0.35),
            size: random(0.7, 2.5),
            hue: random(248, 315),
            alpha: random(0.25, 0.75),
            phase: random(0, Math.PI * 2),
        };
    }

    private fillParticles(): void {
        const target = this.targetCount();
        const dustCount = this.particles.filter((particle) => particle.kind === 'dust').length;
        if (dustCount < target) {
            for (let index = dustCount; index < target; index += 1) {
                const dust = this.makeDust();
                dust.x = random(0, this.width);
                dust.y = random(0, this.height);
                this.particles.push(dust);
            }
        } else if (dustCount > target) {
            let remaining = dustCount - target;
            this.particles = this.particles.filter((particle) => {
                if (particle.kind === 'dust' && remaining > 0) {
                    remaining -= 1;
                    return false;
                }
                return true;
            });
        }
    }

    private capParticles(): void {
        if (this.particles.length <= MAX_PARTICLES + 120) return;
        const overflow = this.particles.length - (MAX_PARTICLES + 120);
        this.particles.splice(0, overflow);
    }

    private update(delta: number): void {
        if (this.frozen) return;

        for (const particle of this.particles) {
            if (particle.kind === 'dust') {
                particle.vx += Math.sin(this.elapsed * 0.7 + particle.phase) * 0.0035;
                particle.vy += Math.cos(this.elapsed * 0.55 + particle.phase) * 0.0035;
            } else {
                particle.vy += particle.gravity;
                particle.life -= delta;
                particle.alpha = Math.max(0, particle.life / particle.maxLife);
            }

            if (this.pointers.length > 0) {
                let nearest: Point | null = null;
                let nearestDistance = Number.POSITIVE_INFINITY;
                for (const pointer of this.pointers) {
                    const distance = Math.hypot(pointer.x - particle.x, pointer.y - particle.y);
                    if (distance < nearestDistance) {
                        nearestDistance = distance;
                        nearest = pointer;
                    }
                }
                if (nearest && nearestDistance < 360) {
                    const dx = nearest.x - particle.x;
                    const dy = nearest.y - particle.y;
                    const distance = nearestDistance + 0.001;
                    const falloff = 1 - distance / 360;
                    const pull = falloff * (particle.kind === 'dust' ? 0.12 : 0.03);
                    particle.vx += (dx / distance) * pull - (dy / distance) * pull * 0.65;
                    particle.vy += (dy / distance) * pull + (dx / distance) * pull * 0.65;
                    if (distance < 26) {
                        particle.vx -= (dx / distance) * 0.5;
                        particle.vy -= (dy / distance) * 0.5;
                    }
                }
            }

            particle.vx *= 0.985;
            particle.vy *= 0.985;
            particle.x += particle.vx * delta;
            particle.y += particle.vy * delta;

            if (particle.kind === 'dust') {
                particle.hue = this.rainbow ? (particle.hue + 0.9 * delta) % 360 : particle.hue;
                if (particle.x < -20) particle.x = this.width + 20;
                if (particle.x > this.width + 20) particle.x = -20;
                if (particle.y < -20) particle.y = this.height + 20;
                if (particle.y > this.height + 20) particle.y = -20;
            }
        }

        this.particles = this.particles.filter(
            (particle) => particle.kind === 'dust' || particle.life > 0,
        );

        for (const ring of this.rings) {
            ring.radius += ring.speed * delta;
            ring.alpha *= 0.985;
        }
        this.rings = this.rings.filter(
            (ring) =>
                ring.alpha > 0.02 &&
                ((ring.speed >= 0 && ring.radius < ring.maxRadius) ||
                    (ring.speed < 0 && ring.radius > ring.maxRadius)),
        );
    }

    private draw(): void {
        const ctx = this.ctx;
        if (!ctx) return;

        ctx.globalCompositeOperation = 'source-over';
        ctx.fillStyle = 'rgba(5, 7, 17, 0.2)';
        ctx.fillRect(0, 0, this.width, this.height);

        ctx.globalCompositeOperation = 'lighter';

        for (const particle of this.particles) {
            const opacity =
                particle.kind === 'dust'
                    ? particle.alpha * (0.7 + Math.sin(this.elapsed * 2 + particle.phase) * 0.3)
                    : particle.alpha;
            if (opacity <= 0.01) continue;
            ctx.beginPath();
            ctx.fillStyle = `hsla(${particle.hue}, 95%, ${particle.kind === 'spark' ? 68 : 72}%, ${opacity})`;
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fill();
        }

        for (const ring of this.rings) {
            ctx.beginPath();
            ctx.strokeStyle = `hsla(${ring.hue}, 95%, 72%, ${ring.alpha})`;
            ctx.lineWidth = ring.width;
            ctx.shadowBlur = 18;
            ctx.shadowColor = `hsla(${ring.hue}, 95%, 65%, 0.9)`;
            ctx.arc(ring.x, ring.y, Math.abs(ring.radius), 0, Math.PI * 2);
            ctx.stroke();
            ctx.shadowBlur = 0;
        }

        // Fingertip halos.
        for (const pointer of this.pointers) {
            ctx.beginPath();
            ctx.fillStyle = 'rgba(34, 211, 238, 0.85)';
            ctx.shadowBlur = 24;
            ctx.shadowColor = 'rgba(34, 211, 238, 0.9)';
            ctx.arc(pointer.x, pointer.y, 4, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;
        }

        ctx.globalCompositeOperation = 'source-over';
    }
}
