let dv0 = document.getElementById("v0");
let dtheta = document.getElementById("theta");
let dy0 = document.getElementById("y0");
let dg = document.getElementById("g");
let drealR = document.getElementById("realR")
let dresult = document.getElementById("result");
let drresult = document.getElementById("rresult");
let drrresult = document.getElementById("rrresult");
let dtresult = document.getElementById("tresult");
let dmresult = document.getElementById('mresult');
let derrresult = document.getElementById('errresult');

window.addEventListener('keypress', function(e) {
  if (e.code === "Enter") calculate();
})

function round(x) {
  return Math.round(x*100000)/100000;
}

function calculate() {
  let sv0 = dv0.value;
  let stheta = dtheta.value;
  let sy0 = dy0.value;
  let sg = dg.value;
  let smr = drealR.value;
  if (sv0 === '' || stheta === '' || sy0 === '' || sg === '' || smr === '') return;

  let v0 = Number(sv0);
  let theta = Number(stheta);
  let y0 = Number(sy0);
  let g = Number(sg);
  let mr = Number(smr);
  if (v0 === NaN || theta === NaN || y0 === NaN || g === NaN || mr === NaN) return;
  if (v0 <= 0 || theta <= 0 || theta >= 90 || y0 < 0 || g <= 0 || mr < 0) return;

  let rad = theta * Math.PI / 180;

  let r = (v0*v0*Math.sin(2*rad))/g;
  let rr = (r + Math.sqrt(r*r + (4 * r * y0) / Math.tan(rad)))/2;
  let dr = rr-r;
  let dt = dr / (v0 * Math.cos(rad));

  dtresult.innerHTML = '추가 진행시간: ' + round(dt) + 's';
  drrresult.innerHTML = '추가 도달거리: ' + round(dr) + 'm';
  dmresult.innerHTML = '수평도달거리(측정): ' + round(mr-dr) + 'm';
  dresult.innerHTML = '수평도달거리(이론): ' + round(r) + 'm';
  drresult.innerHTML = '실제도달거리(이론): ' + round(rr) + 'm';
  derrresult.innerHTML = '오차(%): ' + round(Math.abs(r-mr+dr) * 100/r);
}
