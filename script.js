// Heart party for Aygül ♥
const canvas = document.getElementById('canvas');
const megaBtn = document.getElementById('mega');

// Auto background hearts
let bgTimer = null;
function startBackground(){
  if(bgTimer) return;
  bgTimer = setInterval(()=>{
    const x = Math.random() * canvas.clientWidth;
    const y = canvas.clientHeight + 20;
    spawnBurst(x, y, 8, true); // gentle background
  }, 1200);
}
startBackground();

function rand(min, max){ return Math.random()*(max-min)+min }
function pick(arr){ return arr[Math.floor(Math.random()*arr.length)] }

function spawnHeart(x, y, opts={}){
  const h = document.createElement('div');
  h.className = 'heart';
  const size = opts.size ?? rand(18, 48);
  const hue = opts.hue ?? (Math.random()<0.2 ? rand(330, 360) : rand(340, 355));
  const dur = opts.dur ?? rand(1800, 3200);
  h.style.setProperty('--size', size+'px');
  h.style.setProperty('--hue', hue.toFixed(1));
  h.style.setProperty('--dur', dur+'ms');
  h.style.left = x + 'px';
  h.style.top = y + 'px';

  const shape = document.createElement('div');
  shape.className = 'shape';
  h.appendChild(shape);

  const letter = document.createElement('div');
  letter.className = 'letter';
  letter.textContent = (Math.random() < 0.8) ? 'A' : '♥'; // çoğu kalpte 'A'
  h.appendChild(letter);

  // tiny sparkles
  for(let i=0;i<2;i++){
    const s = document.createElement('div');
    s.className = 'spark';
    s.style.left = (x + rand(-20, 20)) + 'px';
    s.style.top = (y + rand(-6, 6)) + 'px';
    s.style.setProperty('--dur', (dur*0.9)+'ms');
    canvas.appendChild(s);
    setTimeout(()=>s.remove(), dur);
  }

  canvas.appendChild(h);
  setTimeout(()=>h.remove(), dur);
}

function spawnBurst(x, y, count=30, soft=false){
  for(let i=0;i<count;i++){
    const angle = rand(-Math.PI/2 - 0.8, -Math.PI/2 + 0.8);
    const dist = soft ? rand(10, 80) : rand(20, 140);
    const hx = x + Math.cos(angle)*dist;
    const hy = y + Math.sin(angle)*dist;
    spawnHeart(hx, hy, {
      size: soft ? rand(14, 36) : rand(18, 52),
      dur: soft ? rand(1500, 2600) : rand(1800, 3600)
    });
  }
}

canvas.addEventListener('pointerdown', (e)=>{
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  spawnBurst(x, y, 40);
});

megaBtn.addEventListener('click', ()=>{
  const rect = canvas.getBoundingClientRect();
  const waves = 8;
  for(let w=0; w<waves; w++){
    setTimeout(()=>{
      for(let i=0;i<8;i++){
        const x = rand(0, rect.width);
        const y = rand(rect.height*0.65, rect.height*0.95);
        spawnBurst(x, y, 35);
      }
    }, w*220);
  }
});

// Fit canvas on resize
const ro = new ResizeObserver(()=>{});
ro.observe(canvas);

// Intro burst
setTimeout(()=>{
  const rect = canvas.getBoundingClientRect();
  spawnBurst(rect.width*0.5, rect.height*0.8, 50);
}, 500);
