class Particle {
    constructor() {
        this.position = createVector(width / 2, height / 2);
        this.rays = [];
        for (let a = 0; a < 360; a += 2) { //how many rays by degrees
            this.rays.push(new Ray(this.position, radians(a)));
        }
    }

    update(x, y) {
        this.position.set(x, y);
    }

    look(walls) {
        for (let i = 0; i < this.rays.length; i++) {
            const ray = this.rays[i];
            let closest = null;
            let record = Infinity;
            for (let wall of walls) {
                const pt = ray.cast(wall);
                if (pt) {
                    const d = p5.Vector.dist(this.position, pt);
                    if (d < record) {
                        record = d;
                        closest = pt;
                    }
                }
            }
            if (closest) {
                // colorMode(HSB);
                // stroke((i + frameCount * 2) % 360, 255, 255, 50);
                stroke(255, 100);
                line(this.position.x, this.position.y, closest.x, closest.y);
            }
        }
    }

    show() {
        fill(255);
        ellipse(this.position.x, this.position.y, 4);
        for (let ray of this.rays) {
            ray.show();
        }
    }
}
