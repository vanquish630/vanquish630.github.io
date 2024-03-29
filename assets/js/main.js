function toast(text) {
  var x = document.querySelector("#snackbar");
  var snackText = document.querySelector("#snackbar h4");
  snackText.innerHTML = text;
  x.classList.toggle("show");
  setTimeout(function () { x.classList.toggle("show"); }, 2000);
}


$('.profile .gmail').click(function (e) {
  e.preventDefault();
  var copyText = $(this).attr('href');

  document.addEventListener('copy', function (e) {
    e.clipboardData.setData('text/plain', copyText);
    e.preventDefault();
  }, true);

  document.execCommand('copy');
  console.log('copied email : ', copyText);
  toast('copied email: ' + copyText);
});


(function () {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  let getInfoHeight = () => {

    var frameWidth = window.innerWidth;
    if (frameWidth >= 991) {
      let projectDetailsImgHeight = select(".swiper-wrapper").clientHeight;
      projectDetailsImgHeight = projectDetailsImgHeight + "px";
      select(".portfolio-info").style.height = projectDetailsImgHeight;

    }


  };


  window.addEventListener('resize', getInfoHeight)


  window.addEventListener('load', getInfoHeight)


  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    let noItems = navbarlinks.length
    // console.log(position)
    // console.log(noItems)

    for (let indx = 0; indx < noItems; indx++) {

      let navbarlink = navbarlinks[indx];
      // console.log(navbarlink);

      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      // console.log(section.offsetTop)

      if (!section) return

      if (indx == noItems - 1) {



        if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
          navbarlink.classList.add('active')
        } else {
          navbarlink.classList.remove('active')
        }

      }
      else {
        let Nextsection = select(navbarlinks[indx + 1].hash)
        // console.log(Nextsection.offsetTop)

        if (position >= section.offsetTop && position <= (Nextsection.offsetTop)) {
          navbarlink.classList.add('active')
        } else {
          navbarlink.classList.remove('active')
        }
      }





    }

    // navbarlinks.forEach(navbarlink => {
    //   if (!navbarlink.hash) return
    //   let section = select(navbarlink.hash)
    //   console.log(navbarlink.hash)
    //   console.log(position)
    //   console.log(section.offsetTop)

    //   if (!section) return
    //   if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
    //     navbarlink.classList.add('active')
    //   } else {
    //     navbarlink.classList.remove('active')
    //   }
    // })
  }



  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    })
  }

  // /**
  //  * Back to top button
  //  */
  // let backtotop = select('.back-to-top')
  // if (backtotop) {
  //   const toggleBacktotop = () => {
  //     if (window.scrollY > 100) {
  //       backtotop.classList.add('active')
  //     } else {
  //       backtotop.classList.remove('active')
  //     }
  //   }
  //   window.addEventListener('load', toggleBacktotop)
  //   onscroll(document, toggleBacktotop)
  // }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function (e) {
    select('body').classList.toggle('mobile-nav-active')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function (e) {
    if (select(this.hash)) {
      e.preventDefault()

      let body = select('body')
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {

    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Hero type effect
   */
  // const typed = select('.typed')
  // if (typed) {
  //   let typed_strings = typed.getAttribute('data-typed-items')
  //   typed_strings = typed_strings.split(',')
  //   new Typed('.typed', {
  //     strings: typed_strings,
  //     loop: true,
  //     typeSpeed: 100,
  //     backSpeed: 50,
  //     backDelay: 2000
  //   });
  // }

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function (direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }



  /**
   * Skill filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.skills-content');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.skills-item'
      });

      let portfolioFilters = select('#skills-filters li', true);

      on('click', '#skills-filters li', function (e) {
        e.preventDefault();
        portfolioFilters.forEach(function (el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function () {
          AOS.refresh()
        });
      }, true);
    }

  });



  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-filters li', true);

      on('click', '#portfolio-filters li', function (e) {
        e.preventDefault();
        portfolioFilters.forEach(function (el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function () {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  // const portfolioLightbox = GLightbox({
  //   selector: '.portfolio-lightbox'
  // });

  // /**
  //  * Portfolio details slider
  //  */
  // new Swiper('.portfolio-details-slider', {
  //   speed: 400,
  //   loop: true,
  //   autoplay: {
  //     delay: 5000,
  //     disableOnInteraction: false
  //   },
  //   pagination: {
  //     el: '.swiper-pagination',
  //     type: 'bullets',
  //     clickable: true
  //   }
  // });



  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

})()



