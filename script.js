let dv0 = document.getElementById("v0");
let dtheta = document.getElementById("theta");
let dy0 = document.getElementById("y0");
let dg = document.getElementById("g");
let dresult = document.getElementById("result");
let drresult = document.getElementById("rresult");
let drrresult = document.getElementById("rrresult");
let dtresult = document.getElementById("tresult");

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
  if (sv0 === '' || stheta === '' || sy0 === '' || sg === '') return;

  let v0 = Number(sv0);
  let theta = Number(stheta);
  let y0 = Number(sy0);
  let g = Number(sg);
  if (v0 === NaN || theta === NaN || y0 === NaN || g === NaN) return;
  if (v0 < 0 || theta < 0 || y0 < 0 || g < 0) return;

  let rad = theta * Math.PI / 180;

  let r = (v0*v0*Math.sin(2*rad))/g;
  let rr = (r + Math.sqrt(r*r + (4 * r * y0) / Math.tan(rad)))/2;
  let dr = rr-r;
  let dt = dr / (v0 * Math.cos(rad));

  dresult.innerHTML = '수평 도달 거리: ' + round(r) + 'm';
  drresult.innerHTML = '실제 도달 거리: ' + round(rr) + 'm';
  dtresult.innerHTML = '추가 진행 시간: ' + round(dt) + 's';
  drrresult.innerHTML = '추가 도달 거리: ' + round(dr) + 'm';
}
