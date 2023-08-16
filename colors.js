let particles = [];

function setup() {
  createCanvas(1690, 800); // Set the canvas size to a desktop resolution
  noStroke();
  textFont('MuseoModerno', 20);
  textAlign(CENTER, CENTER);
}

function draw() {
  background(255, 10);

  if (particles.length === 0) {
    fill(0);
    textSize(36);
    text('Tap Anywhere', width / 2, height / 2);
  }

  for (let particle of particles) {
    particle.update();
    particle.display();
  }
}

function mouseClicked() {
  particles.push(new Particle(mouseX, mouseY));
}

function keyPressed() {
  if (key === ' ') {
    particles = [];
    background(255);
  }
}

class Particle {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.velocity = p5.Vector.random2D().mult(random(2, 5));
    this.size = random(10, 30);
    this.color = color(random(255), random(255), random(255), 150);
    this.trail = [];
  }

  update() {
    this.position.add(this.velocity);

    if (this.position.x < 0 || this.position.x > width) {
      this.velocity.x *= -1;
    }

    if (this.position.y < 0 || this.position.y > height) {
      this.velocity.y *= -1;
    }

    this.trail.push(this.position.copy());
    if (this.trail.length > 20) {
      this.trail.shift();
    }
  }

  display() {
    fill(this.color);
    ellipse(this.position.x, this.position.y, this.size);

    for (let i = 0; i < this.trail.length; i++) {
      let trailColor = color(this.color.levels[0], this.color.levels[1], this.color.levels[2], map(i, 0, this.trail.length, 0, 150));
      fill(trailColor);
      ellipse(this.trail[i].x, this.trail[i].y, this.size * (1 - i / this.trail.length));
    }
  }
}
