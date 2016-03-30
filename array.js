function a(x, y, z) {

  if (typeof z === "undefined") {
    z = [];
  }

  if (z.length == 0) {
    z[0] = y;
    return a(x, y, z);
  } else if (z.length < x) {
    y += 1;
    z.push(y);
    return a(x, y, z);
  } else {
    return z;
  }

}

console.log(a(5,0));


