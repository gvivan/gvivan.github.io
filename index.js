$(document).ready(function(){
  // Navigation functionality
  const navbar = $('.navbar');
  const navLinks = $('.nav-link');
  const hamburger = $('.hamburger');
  const navMenu = $('.nav-menu');

  // Typing animation for hero description
  const textArray = [
    "Passionate about creating innovative solutions and beautiful user experiences",
    "When I am not coding I like to play racket sports, hit the gym and experience new things"
  ];
  
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 50;
  const deletingSpeed = 25;
  const pauseBetweenTexts = 1500;
  const pauseAfterComplete = 2500;

  function typeWriter() {
    const typingElement = document.getElementById('typing-text');
    const currentText = textArray[textIndex];
    
    // Always add cursor class for persistent typing effect
    typingElement.classList.add('typing-cursor');
    
    if (!isDeleting) {
      // Typing
      typingElement.innerHTML = currentText.substring(0, charIndex + 1);
      charIndex++;
      
      if (charIndex === currentText.length) {
        // Finished typing current text
        isDeleting = true;
        setTimeout(typeWriter, pauseAfterComplete);
        return;
      }
    } else {
      // Deleting
      typingElement.innerHTML = currentText.substring(0, charIndex - 1);
      charIndex--;
      
      if (charIndex === 0) {
        // Finished deleting
        isDeleting = false;
        textIndex = (textIndex + 1) % textArray.length;
        setTimeout(typeWriter, pauseBetweenTexts);
        return;
      }
    }
    
    const speed = isDeleting ? deletingSpeed : typingSpeed;
    setTimeout(typeWriter, speed);
  }

  // Start the typing animation immediately and ensure cursor is always present
  setTimeout(() => {
    document.getElementById('typing-text').classList.add('typing-cursor');
    typeWriter();
  }, 500); // Start after 0.5 seconds (was 1 second)

  // Smooth scrolling for navigation links
  navLinks.click(function(e) {
    e.preventDefault();
    const targetId = $(this).attr('href');
    const targetSection = $(targetId);
    
    if (targetSection.length) {
      $('html, body').animate({
        scrollTop: targetSection.offset().top - 80
      }, 200);
    }
    
    // Close mobile menu if open
    navMenu.removeClass('active');
    hamburger.removeClass('active');
  });

  // Scroll indicators functionality
  $('.scroll-indicator').click(function(e) {
    e.preventDefault();
    const nextSection = $(this).data('next');
    const targetSection = $('#' + nextSection);
    
    if (targetSection.length) {
      $('html, body').animate({
        scrollTop: targetSection.offset().top - 80
      }, 200);
    }
  });

  // Mobile menu toggle
  hamburger.click(function() {
    $(this).toggleClass('active');
    navMenu.toggleClass('active');
  });

  // Navbar scroll effect
  $(window).scroll(function() {
    if ($(window).scrollTop() > 50) {
      navbar.addClass('scrolled');
    } else {
      navbar.removeClass('scrolled');
    }
  });

  // Contact form submission
  $('.contact-form').submit(function(e) {
    e.preventDefault();
    
    // Get form data
    const name = $('#name').val();
    const email = $('#email').val();
    const subject = $('#subject').val();
    const message = $('#message').val();
    
    // Here you would typically send the form data to a server
    // For now, we'll just show an alert
    alert(`Thank you ${name}! Your message has been sent. I'll get back to you soon.`);
    
    // Reset form
    this.reset();
  });

  // Scroll animations for sections
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
      }
    });
  }, observerOptions);

  // Observe all sections
  $('.section').each(function() {
    observer.observe(this);
  });

  var intro = $("#intro");

  function fadeAndSlide (eName,dTime,SlideSpeed){
    $(eName)
    .delay(dTime)
    .fadeIn(SlideSpeed)
    .animate(
      {opacity: 1}
    );
  }
  
  const heroContent = $('.hero-content');
  if (heroContent.length) {
    setTimeout(() => {
      $('.scroll-indicator').fadeIn(1000);
    }, 2000);
  }

  intro.animate( {width: '400px'},1200);
  intro.animate( {height: '120px'},1200, function(){
    $("#intro").addClass("p-6");
    fadeAndSlide("#fade1",0,2000);
    fadeAndSlide("#fade2",0,2000);
  });
});

// Utilities
var Vector3 = {};
var Matrix44 = {};
Vector3.create = function(x, y, z) {
  return {'x':x, 'y':y, 'z':z};
};
Vector3.dot = function (v0, v1) {
  return v0.x * v1.x + v0.y * v1.y + v0.z * v1.z;
};
Vector3.cross = function (v, v0, v1) {
  v.x = v0.y * v1.z - v0.z * v1.y;
  v.y = v0.z * v1.x - v0.x * v1.z;
  v.z = v0.x * v1.y - v0.y * v1.x;
};
Vector3.normalize = function (v) {
  var l = v.x * v.x + v.y * v.y + v.z * v.z;
  if(l > 0.00001) {
    l = 1.0 / Math.sqrt(l);
    v.x *= l;
    v.y *= l;
    v.z *= l;
  }
};
Vector3.arrayForm = function(v) {
  if(v.array) {
    v.array[0] = v.x;
    v.array[1] = v.y;
    v.array[2] = v.z;
  }
  else {
    v.array = new Float32Array([v.x, v.y, v.z]);
  }
  return v.array;
};
Matrix44.createIdentity = function () {
  return new Float32Array([1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0]);
};
Matrix44.loadProjection = function (m, aspect, vdeg, near, far) {
  var h = near * Math.tan(vdeg * Math.PI / 180.0 * 0.5) * 2.0;
  var w = h * aspect;

  m[0] = 2.0 * near / w;
  m[1] = 0.0;
  m[2] = 0.0;
  m[3] = 0.0;

  m[4] = 0.0;
  m[5] = 2.0 * near / h;
  m[6] = 0.0;
  m[7] = 0.0;

  m[8] = 0.0;
  m[9] = 0.0;
  m[10] = -(far + near) / (far - near);
  m[11] = -1.0;

  m[12] = 0.0;
  m[13] = 0.0;
  m[14] = -2.0 * far * near / (far - near);
  m[15] = 0.0;
};
Matrix44.loadLookAt = function (m, vpos, vlook, vup) {
  var frontv = Vector3.create(vpos.x - vlook.x, vpos.y - vlook.y, vpos.z - vlook.z);
  Vector3.normalize(frontv);
  var sidev = Vector3.create(1.0, 0.0, 0.0);
  Vector3.cross(sidev, vup, frontv);
  Vector3.normalize(sidev);
  var topv = Vector3.create(1.0, 0.0, 0.0);
  Vector3.cross(topv, frontv, sidev);
  Vector3.normalize(topv);

  m[0] = sidev.x;
  m[1] = topv.x;
  m[2] = frontv.x;
  m[3] = 0.0;

  m[4] = sidev.y;
  m[5] = topv.y;
  m[6] = frontv.y;
  m[7] = 0.0;

  m[8] = sidev.z;
  m[9] = topv.z;
  m[10] = frontv.z;
  m[11] = 0.0;

  m[12] = -(vpos.x * m[0] + vpos.y * m[4] + vpos.z * m[8]);
  m[13] = -(vpos.x * m[1] + vpos.y * m[5] + vpos.z * m[9]);
  m[14] = -(vpos.x * m[2] + vpos.y * m[6] + vpos.z * m[10]);
  m[15] = 1.0;
};

//
var timeInfo = {
  'start':0, 'prev':0, // Date
  'delta':0, 'elapsed':0 // Number(sec)
};

//
var gl;
var renderSpec = {
  'width':0,
  'height':0,
  'aspect':1,
  'array':new Float32Array(3),
  'halfWidth':0,
  'halfHeight':0,
  'halfArray':new Float32Array(3)
  // and some render targets. see setViewport()
};
renderSpec.setSize = function(w, h) {
  renderSpec.width = w;
  renderSpec.height = h;
  renderSpec.aspect = renderSpec.width / renderSpec.height;
  renderSpec.array[0] = renderSpec.width;
  renderSpec.array[1] = renderSpec.height;
  renderSpec.array[2] = renderSpec.aspect;

  renderSpec.halfWidth = Math.floor(w / 2);
  renderSpec.halfHeight = Math.floor(h / 2);
  renderSpec.halfArray[0] = renderSpec.halfWidth;
  renderSpec.halfArray[1] = renderSpec.halfHeight;
  renderSpec.halfArray[2] = renderSpec.halfWidth / renderSpec.halfHeight;
};

function deleteRenderTarget(rt) {
  gl.deleteFramebuffer(rt.frameBuffer);
  gl.deleteRenderbuffer(rt.renderBuffer);
  gl.deleteTexture(rt.texture);
}

function createRenderTarget(w, h) {
  var ret = {
    'width':w,
    'height':h,
    'sizeArray':new Float32Array([w, h, w / h]),
    'dtxArray':new Float32Array([1.0 / w, 1.0 / h])
  };
  ret.frameBuffer = gl.createFramebuffer();
  ret.renderBuffer = gl.createRenderbuffer();
  ret.texture = gl.createTexture();

  gl.bindTexture(gl.TEXTURE_2D, ret.texture);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, w, h, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

  gl.bindFramebuffer(gl.FRAMEBUFFER, ret.frameBuffer);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, ret.texture, 0);

  gl.bindRenderbuffer(gl.RENDERBUFFER, ret.renderBuffer);
  gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, w, h);
  gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, ret.renderBuffer);

  gl.bindTexture(gl.TEXTURE_2D, null);
  gl.bindRenderbuffer(gl.RENDERBUFFER, null);
  gl.bindFramebuffer(gl.FRAMEBUFFER, null);

  return ret;
}

function compileShader(shtype, shsrc) {
  var retsh = gl.createShader(shtype);

  gl.shaderSource(retsh, shsrc);
  gl.compileShader(retsh);

  if(!gl.getShaderParameter(retsh, gl.COMPILE_STATUS)) {
    var errlog = gl.getShaderInfoLog(retsh);
    gl.deleteShader(retsh);
    console.error(errlog);
    return null;
  }
  return retsh;
}

function createShader(vtxsrc, frgsrc, uniformlist, attrlist) {
  var vsh = compileShader(gl.VERTEX_SHADER, vtxsrc);
  var fsh = compileShader(gl.FRAGMENT_SHADER, frgsrc);

  if(vsh == null || fsh == null) {
    return null;
  }

  var prog = gl.createProgram();
  gl.attachShader(prog, vsh);
  gl.attachShader(prog, fsh);

  gl.deleteShader(vsh);
  gl.deleteShader(fsh);

  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    var errlog = gl.getProgramInfoLog(prog);
    console.error(errlog);
    return null;
  }

  if(uniformlist) {
    prog.uniforms = {};
    for(var i = 0; i < uniformlist.length; i++) {
      prog.uniforms[uniformlist[i]] = gl.getUniformLocation(prog, uniformlist[i]);
    }
  }

  if(attrlist) {
    prog.attributes = {};
    for(var i = 0; i < attrlist.length; i++) {
      var attr = attrlist[i];
      prog.attributes[attr] = gl.getAttribLocation(prog, attr);
    }
  }

  return prog;
}

function useShader(prog) {
  gl.useProgram(prog);
  for(var attr in prog.attributes) {
    gl.enableVertexAttribArray(prog.attributes[attr]);;
  }
}

function unuseShader(prog) {
  for(var attr in prog.attributes) {
    gl.disableVertexAttribArray(prog.attributes[attr]);;
  }
  gl.useProgram(null);
}

/////
var projection = {
  'angle':60,
  'nearfar':new Float32Array([0.1, 100.0]),
  'matrix':Matrix44.createIdentity()
};
var camera = {
  'position':Vector3.create(0, 0, 100),
  'lookat':Vector3.create(0, 0, 0),
  'up':Vector3.create(0, 1, 0),
  'dof':Vector3.create(10.0, 4.0, 8.0),
  'matrix':Matrix44.createIdentity()
};

var pointFlower = {};
var meshFlower = {};
var sceneStandBy = false;

var BlossomParticle = function () {
  this.velocity = new Array(3);
  this.rotation = new Array(3);
  this.position = new Array(3);
  this.euler = new Array(3);
  this.size = 1.0;
  this.alpha = 1.0;
  this.zkey = 0.0;
};

BlossomParticle.prototype.setVelocity = function (vx, vy, vz) {
  this.velocity[0] = vx;
  this.velocity[1] = vy;
  this.velocity[2] = vz;
};

BlossomParticle.prototype.setRotation = function (rx, ry, rz) {
  this.rotation[0] = rx;
  this.rotation[1] = ry;
  this.rotation[2] = rz;
};

BlossomParticle.prototype.setPosition = function (nx, ny, nz) {
  this.position[0] = nx;
  this.position[1] = ny;
  this.position[2] = nz;
};

BlossomParticle.prototype.setEulerAngles = function (rx, ry, rz) {
  this.euler[0] = rx;
  this.euler[1] = ry;
  this.euler[2] = rz;
};

BlossomParticle.prototype.setSize = function (s) {
  this.size = s;
};

BlossomParticle.prototype.update = function (dt, et) {
  this.position[0] += this.velocity[0] * dt;
  this.position[1] += this.velocity[1] * dt;
  this.position[2] += this.velocity[2] * dt;

  this.euler[0] += this.rotation[0] * dt;
  this.euler[1] += this.rotation[1] * dt;
  this.euler[2] += this.rotation[2] * dt;
};

function createPointFlowers() {
  // get point sizes
  var prm = gl.getParameter(gl.ALIASED_POINT_SIZE_RANGE);
  renderSpec.pointSize = {'min':prm[0], 'max':prm[1]};

  var vtxsrc = document.getElementById("sakura_point_vsh").textContent;
  var frgsrc = document.getElementById("sakura_point_fsh").textContent;

  pointFlower.program = createShader(
    vtxsrc, frgsrc,
    ['uProjection', 'uModelview', 'uResolution', 'uOffset', 'uDOF', 'uFade'],
    ['aPosition', 'aEuler', 'aMisc']
  );

  useShader(pointFlower.program);
  pointFlower.offset = new Float32Array([0.0, 0.0, 0.0]);
  pointFlower.fader = Vector3.create(0.0, 10.0, 0.0);

  // paramerters: velocity[3], rotate[3]
  // Reduce flowers on mobile devices
  var isMobile = window.innerWidth <= 768;
  pointFlower.numFlowers = isMobile ? 200 : 600;
  pointFlower.particles = new Array(pointFlower.numFlowers);
  // vertex attributes {position[3], euler_xyz[3], size[1]}
  pointFlower.dataArray = new Float32Array(pointFlower.numFlowers * (3 + 3 + 2));
  pointFlower.positionArrayOffset = 0;
  pointFlower.eulerArrayOffset = pointFlower.numFlowers * 3;
  pointFlower.miscArrayOffset = pointFlower.numFlowers * 6;

  pointFlower.buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, pointFlower.buffer);
  gl.bufferData(gl.ARRAY_BUFFER, pointFlower.dataArray, gl.DYNAMIC_DRAW);
  gl.bindBuffer(gl.ARRAY_BUFFER, null);

  unuseShader(pointFlower.program);

  for(var i = 0; i < pointFlower.numFlowers; i++) {
    pointFlower.particles[i] = new BlossomParticle();
  }
}

function initPointFlowers() {
  //area
  pointFlower.area = Vector3.create(20.0, 20.0, 20.0);
  pointFlower.area.x = pointFlower.area.y * renderSpec.aspect;

  pointFlower.fader.x = 10.0; //env fade start
  pointFlower.fader.y = pointFlower.area.z; //env fade half
  pointFlower.fader.z = 0.1;  //near fade start

  //particles
  var PI2 = Math.PI * 2.0;
  var tmpv3 = Vector3.create(0, 0, 0);
  var tmpv = 0;
  var symmetryrand = function() {return (Math.random() * 2.0 - 1.0);};
  for(var i = 0; i < pointFlower.numFlowers; i++) {
    var tmpprtcl = pointFlower.particles[i];

    //velocity
    tmpv3.x = symmetryrand() * 0.2 + 0.4;
    tmpv3.y = symmetryrand() * 0.1 - 0.6;
    tmpv3.z = symmetryrand() * 0.2 + 0.3;
    Vector3.normalize(tmpv3);
    tmpv = 0.7 + Math.random() * 0.6;
    tmpprtcl.setVelocity(tmpv3.x * tmpv, tmpv3.y * tmpv, tmpv3.z * tmpv);

    //rotation
    tmpprtcl.setRotation(
      symmetryrand() * PI2 * 0.5,
      symmetryrand() * PI2 * 0.5,
      symmetryrand() * PI2 * 0.5
    );

    //position
    tmpprtcl.setPosition(
      symmetryrand() * pointFlower.area.x,
      symmetryrand() * pointFlower.area.y,
      symmetryrand() * pointFlower.area.z
    );

    //euler
    tmpprtcl.setEulerAngles(
      Math.random() * Math.PI * 2.0,
      Math.random() * Math.PI * 2.0,
      Math.random() * Math.PI * 2.0
    );

    //size
    tmpprtcl.setSize(0.4 + Math.random() * 0.3);
  }
}

function renderPointFlowers() {
  //update
  var PI2 = Math.PI * 2.0;
  var limit = [pointFlower.area.x, pointFlower.area.y, pointFlower.area.z];
  var repeatPos = function (prt, cmp, limit) {
    if(Math.abs(prt.position[cmp]) - prt.size * 0.5 > limit) {
      //out of area
      if(prt.position[cmp] > 0) {
        prt.position[cmp] -= limit * 2.0;
      }
      else {
        prt.position[cmp] += limit * 2.0;
      }
    }
  };
  var repeatEuler = function (prt, cmp) {
    prt.euler[cmp] = prt.euler[cmp] % PI2;
    if(prt.euler[cmp] < 0.0) {
      prt.euler[cmp] += PI2;
    }
  };

  for(var i = 0; i < pointFlower.numFlowers; i++) {
    var prtcl = pointFlower.particles[i];
    prtcl.update(timeInfo.delta, timeInfo.elapsed);
    repeatPos(prtcl, 0, pointFlower.area.x);
    repeatPos(prtcl, 1, pointFlower.area.y);
    repeatPos(prtcl, 2, pointFlower.area.z);
    repeatEuler(prtcl, 0);
    repeatEuler(prtcl, 1);
    repeatEuler(prtcl, 2);

    prtcl.alpha = 1.0;//(pointFlower.area.z - prtcl.position[2]) * 0.5;

    prtcl.zkey = (camera.matrix[2] * prtcl.position[0]
      + camera.matrix[6] * prtcl.position[1]
      + camera.matrix[10] * prtcl.position[2]
      + camera.matrix[14]);
    }

    // sort
    pointFlower.particles.sort(function(p0, p1){return p0.zkey - p1.zkey;});

    // update data
    var ipos = pointFlower.positionArrayOffset;
    var ieuler = pointFlower.eulerArrayOffset;
    var imisc = pointFlower.miscArrayOffset;
    for(var i = 0; i < pointFlower.numFlowers; i++) {
      var prtcl = pointFlower.particles[i];
      pointFlower.dataArray[ipos] = prtcl.position[0];
      pointFlower.dataArray[ipos + 1] = prtcl.position[1];
      pointFlower.dataArray[ipos + 2] = prtcl.position[2];
      ipos += 3;
      pointFlower.dataArray[ieuler] = prtcl.euler[0];
      pointFlower.dataArray[ieuler + 1] = prtcl.euler[1];
      pointFlower.dataArray[ieuler + 2] = prtcl.euler[2];
      ieuler += 3;
      pointFlower.dataArray[imisc] = prtcl.size;
      pointFlower.dataArray[imisc + 1] = prtcl.alpha;
      imisc += 2;
    }

    //draw
    gl.enable(gl.BLEND);
    //gl.disable(gl.DEPTH_TEST);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    var prog = pointFlower.program;
    useShader(prog);

    gl.uniformMatrix4fv(prog.uniforms.uProjection, false, projection.matrix);
    gl.uniformMatrix4fv(prog.uniforms.uModelview, false, camera.matrix);
    gl.uniform3fv(prog.uniforms.uResolution, renderSpec.array);
    gl.uniform3fv(prog.uniforms.uDOF, Vector3.arrayForm(camera.dof));
    gl.uniform3fv(prog.uniforms.uFade, Vector3.arrayForm(pointFlower.fader));

    gl.bindBuffer(gl.ARRAY_BUFFER, pointFlower.buffer);
    gl.bufferData(gl.ARRAY_BUFFER, pointFlower.dataArray, gl.DYNAMIC_DRAW);

    gl.vertexAttribPointer(prog.attributes.aPosition, 3, gl.FLOAT, false, 0, pointFlower.positionArrayOffset * Float32Array.BYTES_PER_ELEMENT);
    gl.vertexAttribPointer(prog.attributes.aEuler, 3, gl.FLOAT, false, 0, pointFlower.eulerArrayOffset * Float32Array.BYTES_PER_ELEMENT);
    gl.vertexAttribPointer(prog.attributes.aMisc, 2, gl.FLOAT, false, 0, pointFlower.miscArrayOffset * Float32Array.BYTES_PER_ELEMENT);

    // doubler
    for(var i = 1; i < 2; i++) {
      var zpos = i * -2.0;
      pointFlower.offset[0] = pointFlower.area.x * -1.0;
      pointFlower.offset[1] = pointFlower.area.y * -1.0;
      pointFlower.offset[2] = pointFlower.area.z * zpos;
      gl.uniform3fv(prog.uniforms.uOffset, pointFlower.offset);
      gl.drawArrays(gl.POINT, 0, pointFlower.numFlowers);

      pointFlower.offset[0] = pointFlower.area.x * -1.0;
      pointFlower.offset[1] = pointFlower.area.y *  1.0;
      pointFlower.offset[2] = pointFlower.area.z * zpos;
      gl.uniform3fv(prog.uniforms.uOffset, pointFlower.offset);
      gl.drawArrays(gl.POINT, 0, pointFlower.numFlowers);

      pointFlower.offset[0] = pointFlower.area.x *  1.0;
      pointFlower.offset[1] = pointFlower.area.y * -1.0;
      pointFlower.offset[2] = pointFlower.area.z * zpos;
      gl.uniform3fv(prog.uniforms.uOffset, pointFlower.offset);
      gl.drawArrays(gl.POINT, 0, pointFlower.numFlowers);

      pointFlower.offset[0] = pointFlower.area.x *  1.0;
      pointFlower.offset[1] = pointFlower.area.y *  1.0;
      pointFlower.offset[2] = pointFlower.area.z * zpos;
      gl.uniform3fv(prog.uniforms.uOffset, pointFlower.offset);
      gl.drawArrays(gl.POINT, 0, pointFlower.numFlowers);
    }

    //main
    pointFlower.offset[0] = 0.0;
    pointFlower.offset[1] = 0.0;
    pointFlower.offset[2] = 0.0;
    gl.uniform3fv(prog.uniforms.uOffset, pointFlower.offset);
    gl.drawArrays(gl.POINT, 0, pointFlower.numFlowers);

    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    unuseShader(prog);

    gl.enable(gl.DEPTH_TEST);
    gl.disable(gl.BLEND);
  }

  // effects
  //common util
  function createEffectProgram(vtxsrc, frgsrc, exunifs, exattrs) {
    var ret = {};
    var unifs = ['uResolution', 'uSrc', 'uDelta'];
    if(exunifs) {
      unifs = unifs.concat(exunifs);
    }
    var attrs = ['aPosition'];
    if(exattrs) {
      attrs = attrs.concat(exattrs);
    }

    ret.program = createShader(vtxsrc, frgsrc, unifs, attrs);
    useShader(ret.program);

    ret.dataArray = new Float32Array([
      -1.0, -1.0,
      1.0, -1.0,
      -1.0,  1.0,
      1.0,  1.0
    ]);
    ret.buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, ret.buffer);
    gl.bufferData(gl.ARRAY_BUFFER, ret.dataArray, gl.STATIC_DRAW);

    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    unuseShader(ret.program);

    return ret;
  }

  // basic usage
  // useEffect(prog, srctex({'texture':texid, 'dtxArray':(f32)[dtx, dty]})); //basic initialize
  // gl.uniform**(...); //additional uniforms
  // drawEffect()
  // unuseEffect(prog)
  // TEXTURE0 makes src
  function useEffect(fxobj, srctex) {
    var prog = fxobj.program;
    useShader(prog);
    gl.uniform3fv(prog.uniforms.uResolution, renderSpec.array);

    if(srctex != null) {
      gl.uniform2fv(prog.uniforms.uDelta, srctex.dtxArray);
      gl.uniform1i(prog.uniforms.uSrc, 0);

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, srctex.texture);
    }
  }
  function drawEffect(fxobj) {
    gl.bindBuffer(gl.ARRAY_BUFFER, fxobj.buffer);
    gl.vertexAttribPointer(fxobj.program.attributes.aPosition, 2, gl.FLOAT, false, 0, 0);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }
  function unuseEffect(fxobj) {
    unuseShader(fxobj.program);
  }

  var effectLib = {};
  function createEffectLib() {

    var vtxsrc, frgsrc;
    //common
    var cmnvtxsrc = document.getElementById("fx_common_vsh").textContent;

    //background
    frgsrc = document.getElementById("bg_fsh").textContent;
    effectLib.sceneBg = createEffectProgram(cmnvtxsrc, frgsrc, ['uTimes'], null);

    // make brightpixels buffer
    frgsrc = document.getElementById("fx_brightbuf_fsh").textContent;
    effectLib.mkBrightBuf = createEffectProgram(cmnvtxsrc, frgsrc, null, null);

    // direction blur
    frgsrc = document.getElementById("fx_dirblur_r4_fsh").textContent;
    effectLib.dirBlur = createEffectProgram(cmnvtxsrc, frgsrc, ['uBlurDir'], null);

    //final composite
    vtxsrc = document.getElementById("pp_final_vsh").textContent;
    frgsrc = document.getElementById("pp_final_fsh").textContent;
    effectLib.finalComp = createEffectProgram(vtxsrc, frgsrc, ['uBloom'], null);
  }

  // background
  function createBackground() {
    //console.log("create background");
  }
  function initBackground() {
    //console.log("init background");
  }
  function renderBackground() {
    gl.disable(gl.DEPTH_TEST);

    useEffect(effectLib.sceneBg, null);
    gl.uniform2f(effectLib.sceneBg.program.uniforms.uTimes, timeInfo.elapsed, timeInfo.delta);
    drawEffect(effectLib.sceneBg);
    unuseEffect(effectLib.sceneBg);

    gl.enable(gl.DEPTH_TEST);
  }

  // post process
  var postProcess = {};
  function createPostProcess() {
    //console.log("create post process");
  }
  function initPostProcess() {
    //console.log("init post process");
  }

  function renderPostProcess() {
    gl.enable(gl.TEXTURE_2D);
    gl.disable(gl.DEPTH_TEST);
    var bindRT = function (rt, isclear) {
      gl.bindFramebuffer(gl.FRAMEBUFFER, rt.frameBuffer);
      gl.viewport(0, 0, rt.width, rt.height);
      if(isclear) {
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      }
    };

    //make bright buff
    bindRT(renderSpec.wHalfRT0, true);
    useEffect(effectLib.mkBrightBuf, renderSpec.mainRT);
    drawEffect(effectLib.mkBrightBuf);
    unuseEffect(effectLib.mkBrightBuf);

    // make bloom
    for(var i = 0; i < 2; i++) {
      var p = 1.5 + 1 * i;
      var s = 2.0 + 1 * i;
      bindRT(renderSpec.wHalfRT1, true);
      useEffect(effectLib.dirBlur, renderSpec.wHalfRT0);
      gl.uniform4f(effectLib.dirBlur.program.uniforms.uBlurDir, p, 0.0, s, 0.0);
      drawEffect(effectLib.dirBlur);
      unuseEffect(effectLib.dirBlur);

      bindRT(renderSpec.wHalfRT0, true);
      useEffect(effectLib.dirBlur, renderSpec.wHalfRT1);
      gl.uniform4f(effectLib.dirBlur.program.uniforms.uBlurDir, 0.0, p, 0.0, s);
      drawEffect(effectLib.dirBlur);
      unuseEffect(effectLib.dirBlur);
    }

    //display
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.viewport(0, 0, renderSpec.width, renderSpec.height);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    useEffect(effectLib.finalComp, renderSpec.mainRT);
    gl.uniform1i(effectLib.finalComp.program.uniforms.uBloom, 1);
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, renderSpec.wHalfRT0.texture);
    drawEffect(effectLib.finalComp);
    unuseEffect(effectLib.finalComp);

    gl.enable(gl.DEPTH_TEST);
  }

  /////
  var SceneEnv = {};
  function createScene() {
    createEffectLib();
    createBackground();
    createPointFlowers();
    createPostProcess();
    sceneStandBy = true;
  }

  function initScene() {
    initBackground();
    initPointFlowers();
    initPostProcess();

    //camera.position.z = 17.320508;
    camera.position.z = pointFlower.area.z + projection.nearfar[0];
    projection.angle = Math.atan2(pointFlower.area.y, camera.position.z + pointFlower.area.z) * 180.0 / Math.PI * 2.0;
    Matrix44.loadProjection(projection.matrix, renderSpec.aspect, projection.angle, projection.nearfar[0], projection.nearfar[1]);
  }

  function renderScene() {
    //draw
    Matrix44.loadLookAt(camera.matrix, camera.position, camera.lookat, camera.up);

    gl.enable(gl.DEPTH_TEST);

    //gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.bindFramebuffer(gl.FRAMEBUFFER, renderSpec.mainRT.frameBuffer);
    gl.viewport(0, 0, renderSpec.mainRT.width, renderSpec.mainRT.height);
    gl.clearColor(0.005, 0, 0.05, 0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    renderBackground();
    renderPointFlowers();
    renderPostProcess();
  }

  /////
  function onResize(e) {
    makeCanvasFullScreen(document.getElementById("sakura"));
    setViewports();
    if(sceneStandBy) {
      initScene();
    }
  }

  function setViewports() {
    renderSpec.setSize(gl.canvas.width, gl.canvas.height);

    gl.clearColor(0.2, 0.2, 0.5, 1.0);
    gl.viewport(0, 0, renderSpec.width, renderSpec.height);

    var rtfunc = function (rtname, rtw, rth) {
      var rt = renderSpec[rtname];
      if(rt) deleteRenderTarget(rt);
      renderSpec[rtname] = createRenderTarget(rtw, rth);
    };
    rtfunc('mainRT', renderSpec.width, renderSpec.height);
    rtfunc('wFullRT0', renderSpec.width, renderSpec.height);
    rtfunc('wFullRT1', renderSpec.width, renderSpec.height);
    rtfunc('wHalfRT0', renderSpec.halfWidth, renderSpec.halfHeight);
    rtfunc('wHalfRT1', renderSpec.halfWidth, renderSpec.halfHeight);
  }

  function render() {
    renderScene();
  }

  var animating = true;
  function toggleAnimation(elm) {
    animating ^= true;
    if(animating) animate();
    if(elm) {
      elm.innerHTML = animating? "Stop":"Start";
    }
  }

  function stepAnimation() {
    if(!animating) animate();
  }

  function animate() {
    var curdate = new Date();
    timeInfo.elapsed = (curdate - timeInfo.start) / 1000.0;
    timeInfo.delta = (curdate - timeInfo.prev) / 1000.0;
    timeInfo.prev = curdate;

    if(animating) requestAnimationFrame(animate);
    render();
  }

  function makeCanvasFullScreen(canvas) {
    var b = document.body;
    var d = document.documentElement;
    fullw = Math.max(b.clientWidth , b.scrollWidth, d.scrollWidth, d.clientWidth);
    fullh = Math.max(b.clientHeight , b.scrollHeight, d.scrollHeight, d.clientHeight);
    canvas.width = fullw;
    canvas.height = fullh;
  }

  window.addEventListener('load', function(e) {
    var canvas = document.getElementById("sakura");
    try {
      makeCanvasFullScreen(canvas);
      gl = canvas.getContext('experimental-webgl');
    } catch(e) {
      alert("WebGL not supported." + e);
      console.error(e);
      return;
    }

    window.addEventListener('resize', onResize);

    setViewports();
    createScene();
    initScene();

    timeInfo.start = new Date();
    timeInfo.prev = timeInfo.start;
    animate();
  });

  //set window.requestAnimationFrame
  (function (w, r) {
    w['r'+r] = w['r'+r] || w['webkitR'+r] || w['mozR'+r] || w['msR'+r] || w['oR'+r] || function(c){ w.setTimeout(c, 1000 / 60); };
  })(window, 'requestAnimationFrame');
