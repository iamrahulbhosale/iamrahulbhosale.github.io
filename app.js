var scaleFun

// shim layer with setTimeout fallback
window.reqAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60)
          }
})()


var leftBarElem, fixedLeftBarElem, rightBarElem
setTimeout(function(){
  var elem2 = document.querySelector('.iv-2')
  var elem3 = document.querySelector('.iv-3')
  var elem4 = document.querySelector('.iv-4')
  var elem5 = document.querySelector('.iv-5')
  var elem6 = document.querySelector('.iv-6')
  var elem7 = document.querySelector('.iv-7')

  fixedLeftBarElem = document.querySelector('.left-bar')
  leftBarElem = document.querySelector('.left-bar.abs')
  rightBarElem = document.querySelector('.right-bar-since')
  leftBarElem.style.height = `${window.innerHeight}px`
  fixedLeftBarElem.style.height = `${window.innerHeight}px`

  elem4.style.height = `${window.innerHeight}px`
  elem5.style.height = `${window.innerHeight}px`
  elem6.style.height = `${window.innerHeight}px`

  elem2.style.top = `${window.innerHeight}px`
  elem3.style.top = `${window.innerHeight+elem2.offsetHeight}px`
  elem3.style.height = `${window.innerHeight}px`
  elem7.style.height = `${window.innerHeight}px`

  elem7.style.top = `${window.innerHeight+elem2.offsetHeight+elem3.offsetHeight}px`
  elem4.style.top = `${window.innerHeight+elem2.offsetHeight+elem3.offsetHeight+elem7.offsetHeight}px`
  elem5.style.top = `${window.innerHeight+elem2.offsetHeight+elem3.offsetHeight+elem4.offsetHeight+elem7.offsetHeight}px`
  elem6.style.top = `${window.innerHeight+elem2.offsetHeight+elem3.offsetHeight+elem4.offsetHeight+elem7.offsetHeight+elem5.offsetHeight}px`

  document.querySelector('.experties .recog-content').style.top = `${window.innerHeight/9}px`
  document.querySelector('.recog .recog-content').style.top = `${window.innerHeight/6}px`
  
  registerListeners()
}, 500 )

setTimeout(function(){
  document.querySelector('.main-h1-1-dumb').style.background = 'transparent'
  document.querySelector('.main-h1-2-dumb').style.background = 'transparent'
  document.querySelector('.main-h1-3-dumb').style.background = 'transparent'
  document.querySelector('.main-h1-1').style.background = 'transparent'
  document.querySelector('.main-h1-2').style.background = 'transparent'
  document.querySelector('.main-h1-3').style.background = 'transparent'
  document.querySelector('.prfl-img').classList.add('active')
},1000)


function fixSec(sec) {
  var elem = document.querySelector(sec)
  elem.style.position = 'fixed'
  return elem
}

function absSec(sec) {
  var elem = document.querySelector(sec)
  elem.style.position = 'absolute'
  return elem
}


function initSec1(){
  var sec1InView = new Waypoint.Inview({
    element: document.querySelector(".iv-1"),
    enter: function(direction) {
      console.log('sec-1 Enter triggered with direction ' + direction)
    },
    entered: function(direction) {
      console.log('sec-1 Entered triggered with direction ' + direction)
    },
    exit: function(direction) {
      console.log('sec-1 Exit triggered with direction ' + direction)
      
    },
    exited: function(direction) {
      console.log('sec-1 exited...')
    }
  })
}


function initSec2(){
  var sec2InView = new Waypoint.Inview({
    element: document.querySelector(".iv-2"),
    enter: function(direction) {
      console.log('sec-2 Enter triggered with direction ' + direction)
      if (direction === 'down') {
        fixSec('.iv-1')
      }
    },
    entered: function(direction) {
      console.log('sec-2 Entered triggered with direction ' + direction)
      if(direction === 'up') {
        leftBarElem.style.position = 'absolute'
        rightBarElem.style.position = 'absolute'
        fixedLeftBarElem.classList.remove('black')
        fixedLeftBarElem.style.position = 'fixed'
      }
    },
    exit: function(direction) {
      console.log('sec-2 Exit triggered with direction ' + direction)
      leftBarElem.style.position = 'fixed'
      rightBarElem.style.position = 'fixed'
      fixedLeftBarElem.classList.add('black')
      fixedLeftBarElem.style.position = 'sticky'
    },
    exited: function(direction) {
      console.log('sec-2 exited...')
      if(direction === 'up') {
        absSec('.iv-1').style.top = `0px`
      }
    }
  })
}


function initSec3(){
  document.querySelector('.case-study-btn.herman').addEventListener('click', function() { 
    openHermanCaseStudy('.herm-right-panel')
   }, false);
   document.querySelector('.right-panel-back').addEventListener('click', function(){
    closeHermanCaseStudy('.herm-right-panel')
   })
  var sec3InView = new Waypoint.Inview({
    element: document.querySelector(".iv-3"),
    enter: function(direction) {
      if(direction === 'down') {
        fixSec('.iv-2').style.top = `${((document.querySelector('.iv-2').offsetHeight) * -1) + window.innerHeight}px`
        scaleImage()
      }
    },
    exited: function(direction) {
      if(direction === 'up') {
        absSec('.iv-2').style.top = `${document.querySelector('.iv-1').offsetHeight}px`
      }
    }
  })
}

function initSec7() {
  var sec7InView = new Waypoint.Inview({
    element: document.querySelector(".iv-7"),
    enter: function(direction) {
      if (direction === 'down') {
        fixSec('.iv-3').style.top = `${((document.querySelector('.iv-3').offsetHeight) * -1) + window.innerHeight}px`
        document.querySelector('.sec-3-head-content').classList.add('active')
        scaleImage('.herm-chair.compass-img', '.sec-3-head-content.comp')
      }
    },
    entered: function(direction) {
      console.log('sec-7 Entered triggered with direction ' + direction)
      if(direction === 'up') {
        leftBarElem.style.position = 'absolute'
        rightBarElem.style.position = 'absolute'
        fixedLeftBarElem.classList.remove('black')
        fixedLeftBarElem.style.position = 'fixed'
      }
    },
    exit: function(direction) {
      console.log('sec-7 Exit triggered with direction ' + direction)
      leftBarElem.style.position = 'fixed'
      rightBarElem.style.position = 'fixed'
      fixedLeftBarElem.classList.add('black')
      fixedLeftBarElem.style.position = 'sticky'
    },
    exited: function(direction) {
      if(direction === 'up') {
        var elem1 = document.querySelector('.iv-1')
        var elem2 = document.querySelector('.iv-2')
        absSec('.iv-3').style.top = `${elem2.offsetHeight+(elem1.offsetHeight)}px`
      }
    }
  })
}

function initSec4(){
  var sec4InView = new Waypoint.Inview({
    element: document.querySelector(".iv-4"),
    enter: function(direction) {
      if(direction === 'down') {
        fixSec('.iv-7').style.top = `${((document.querySelector('.iv-7').offsetHeight) * -1) + window.innerHeight}px`
      }
    },
    exited: function(direction) {
      console.log('sec-4 exited...')
      if(direction === 'up') {
        var elem1 = document.querySelector('.iv-1')
        var elem2 = document.querySelector('.iv-2')
        var elem3 = document.querySelector('.iv-3')
        absSec('.iv-7').style.top = `${elem3.offsetHeight+elem2.offsetHeight+(elem1.offsetHeight)}px`
      }
    }
  })
}

function initSec5(){
  var sec5InView = new Waypoint.Inview({
    element: document.querySelector(".iv-5"),
    enter: function(direction) {
      if(direction === 'down') {
        fixSec('.iv-4').style.top = `${((document.querySelector('.iv-4').offsetHeight) * -1) + window.innerHeight}px`
      }
    },
    exited: function(direction) {
      console.log('sec-5 exited...')
      if(direction === 'up') {
        var elem1 = document.querySelector('.iv-1')
        var elem2 = document.querySelector('.iv-2')
        var elem3 = document.querySelector('.iv-3')
        var elem7 = document.querySelector('.iv-7')
        absSec('.iv-4').style.top = `${elem7.offsetHeight+elem3.offsetHeight+elem2.offsetHeight+(elem1.offsetHeight)}px`
      }
    }
  })
}

function initSec6() {
  var sec6InView = new Waypoint.Inview({
    element: document.querySelector(".iv-6"),
    enter: function(direction) {
      console.log('sec-6 Enter triggered with direction ' + direction)
      if(direction === 'down') {
        fixSec('.iv-5').style.top = `${((document.querySelector('.iv-5').offsetHeight) * -1) + window.innerHeight}px`
      }
    },
    entered: function(direction) {
      console.log('sec-6 Entered triggered with direction ' + direction)
    },
    exit: function(direction) {
      console.log('sec-6 Exit triggered with direction ' + direction)
    },
    exited: function(direction) {
      console.log('sec-6 exited...')
      if(direction === 'up') {
        var elem1 = document.querySelector('.iv-1')
        var elem2 = document.querySelector('.iv-2')
        var elem3 = document.querySelector('.iv-3')
        var elem7 = document.querySelector('.iv-7')
        var elem4 = document.querySelector('.iv-4')
        absSec('.iv-5').style.top = `${elem4.offsetHeight+elem7.offsetHeight+elem3.offsetHeight+elem2.offsetHeight+(elem1.offsetHeight)}px`
      }
    }
  })
}

  function registerListeners() {
    initSec1()
    initSec2()
    initSec3()
    initSec7()
    initSec4()
    initSec5()
    initSec6()
  }
  var caseBody
   function openHermanCaseStudy(selector) {
     document.querySelector(selector).classList.add('active')
     setTimeout(function(){
      // document.querySelectorAll('.b-logo').forEach(function(elem){
      //   elem.classList.add('hide')
      //  })
      //  document.querySelector('.b-down').classList.add('hide')
       document.querySelector('body').classList.add('stuck')

       if (!caseBody) {
        caseBody = new Waypoint.Inview({
          element: document.querySelector(".dummy-case-trigger"),
          enter: function(direction) {
            console.log('case-body Enter triggered with direction ' + direction)
          },
          entered: function(direction) {
            console.log('case-body Entered triggered with direction ' + direction)
          },
          exit: function(direction) {
            console.log('case-body Exit triggered with direction ' + direction)
          },
          exited: function(direction) {
            console.log('case-body exited...')
          }
        })
       }

     }, 500)
   }

   function closeHermanCaseStudy(selector) {
    document.querySelector(selector).classList.remove('active')
    setTimeout(function(){
     document.querySelectorAll('.b-logo').forEach(function(elem){
       elem.classList.remove('hide')
      })
      // document.querySelector('.b-down').classList.remove('hide')
      document.querySelector('body').classList.remove('stuck')
    }, 500)
  }

  function runOnScroll (elem, startScrollPos, height, activeClass) {
    return function(){
        reqAnimFrame(()=>{
            var scrollPos = window.pageYOffset
            var endScroll = startScrollPos + height
            if (scrollPos <= endScroll) {
                var perPixelVal = (1.5 / height)
                var pixelsScrolled = endScroll - scrollPos
                var scaleVal = 1 + (pixelsScrolled * perPixelVal)
                elem.style.transform = 'scale('+scaleVal+')'
            } else {
              window.removeEventListener('scroll', scaleFun)
              var actClass = activeClass || '.sec-3-head-content'
              document.querySelector(actClass).classList.add('active')
            }
        })
    }
  }

  function scaleImage (selector, activeClass) {
    window.removeEventListener('scroll', scaleFun)

    var startScrollPos = window.pageYOffset
    var height = window.innerHeight
    var selec = selector || '.herm-chair'
    var elem = document.querySelector(selec)
    scaleFun = runOnScroll(elem, startScrollPos, height, activeClass)
    window.addEventListener("scroll", scaleFun, false)
    
  }
