var mainTL = gsap.timeline();
var cardTL = gsap.timeline();
var vidPoster, video1;
var isExpanded = false;
var swaySpeed = 3;
var _f1 = 0.25;

function init(){
  myFT.on('expand', expand);
  myFT.on('contract', contract);
  video1 = myFT.$("#video1");
  var expandClick = myFT.$(".clickthrough");
  var ctaClick = myFT.$(".cta");
  myFT.applyClickTag(expandClick, 1);
  myFT.applyClickTag(video1, 1);
  myFT.applyClickTag(ctaClick, 1);

  vidPoster = document.getElementById('vidPoster');
  banner = document.getElementById('banner');
  vidPoster.addEventListener('click', vidPosterClick);
  banner.addEventListener('mouseenter', onMouseEnter);
  banner.addEventListener('mouseleave', onMouseLeave);

  document.getElementById('cover').style.display = "none";
  
  video1.on("ended", function() {
    gsap.to(vidPoster, 0.4,{autoAlpha:1, ease:Power2.easeOut});
    
  });

  mainTL.from(".ctaCont", 0.5, {alpha:0, x:"-=10", ease:'power1.inOut', overwrite:0}, _f1+1)
        .call(onMouseEnter, null, '>+0.75')
        .call(onMouseLeave, null, '>+0.75');
}

function vidPosterClick(){
  gsap.to(vidPoster, 0.2,{autoAlpha:0, ease:Power2.easeOut, onComplete:function(){
                                                                          video1[0].play();
                                                                          video1[0].muted = false;}
                                                                        });
}

function expand(){
  isExpanded = true;

  cardTL.timeScale(1.5);
  cardTL.from('.card-inner', 1,{rotationY:"-180", rotationX:"90", ease:'power2.inOut'}, _f1)
        .from('.shadow-inner', 0.875,{transformOrigin:"top center", scaleX:0.7, rotationZ:'+=180', rotationX:"90", rotationY:"+=50", y:"-=30", ease:'power3.inOut'}, '<')
        .from('.quicksilverCardContainer', 2,{scale:1.2, y:"+=40", transformOrigin:"top center", ease:'power3.out'}, '<')
        .fromTo('.cardGlimmer',{x:"+=150", duration:1}, {x:"-=350", opacity:0, duration:1}, '<+0.65')
        .set('.card-inner',{opacity:0}, '>')
        .set('.card-inner-sway',{opacity:1}, '>')
        .fromTo('.card-inner-sway', {rotationY:"-=15", duration:swaySpeed, yoyo:true, repeat:4, ease:'power1.inOut'}, {rotationY:"+=30", duration:swaySpeed, yoyo:true, repeat:4, ease:'power1.inOut'}, '<')
        .fromTo('.card-shadow', {rotationY:"-=15", y:"+=3", duration:swaySpeed, yoyo:true, repeat:4, ease:'power1.inOut'}, {rotationY:"+=30", y:"-=5", duration:swaySpeed, yoyo:true, repeat:4, ease:'power1.inOut'}, '<')
        .fromTo('.cardGlimmer-sway',{x:"+=200", duration:swaySpeed, yoyo:true, repeat:4, ease:'power1.inOut'}, {x:"-=400", duration:swaySpeed, yoyo: true, repeat: 4, ease:'power1.inOut'}, '<')
        .to('.card-inner-sway', 2, {rotationY:"-=15", ease:'power1.inOut'},'>')
        .to('.card-shadow', 2, {rotationY:"-=15", y:"+=4", ease:'power1.inOut'},'<')
        .to('.cardGlimmer-sway', 2, {x:"+=200", opacity:0.1, ease:'power1.inOut'},'<');

  gsap.delayedCall(3, onMouseEnter);
  gsap.delayedCall(3.5, onMouseLeave);
  cardTL.restart();
}
function contract(){
  isExpanded = false;
  gsap.set('.txt2a', {alpha:1});
  gsap.set(vidPoster, {autoAlpha:1});
  mainTL.restart();
}

function onMouseEnter(){
  gsap.to(rArrow, 0.2,{x:"5", ease:'power1.inOut'});
  gsap.to(rArrowExp, 0.2,{x:"5", ease:'power1.inOut'});
}
function onMouseLeave(){
  gsap.to(rArrow, 0.2,{x:"0", ease:'power1.inOut'});
  gsap.to(rArrowExp, 0.2,{x:"0", ease:'power1.inOut'});
}

window.onload=init;