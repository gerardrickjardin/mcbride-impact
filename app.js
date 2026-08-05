// GLOBAL YOUTUBE VIDEO LAUNCHER
function loadYouTubeVideo(containerId, videoId) {
  const container = document.getElementById(containerId);
  if (container) {
    container.innerHTML = `<iframe class="embed-iframe" src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&enablejsapi=1" title="Watch Video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
  }
}

document.addEventListener('DOMContentLoaded', () => {

  // Ensure page always starts at top on refresh/load so looping hero is visible directly
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  if (!window.location.hash) {
    window.scrollTo(0, 0);
  }

  // Seamless Hero Video Loader (Prevents flash/stutter on initial load & loop)
  const heroVideo = document.getElementById('hero-bg-video');
  if (heroVideo) {
    const handleVideoReady = () => {
      heroVideo.classList.add('is-loaded');
    };
    if (heroVideo.readyState >= 2) {
      handleVideoReady();
    } else {
      heroVideo.addEventListener('canplay', handleVideoReady, { once: true });
      heroVideo.addEventListener('playing', handleVideoReady, { once: true });
      setTimeout(handleVideoReady, 300);
    }
  }

  // ==========================================
  // MOBILE NAVIGATION MENU
  // ==========================================
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      navToggle.classList.toggle('active');
    });

    // Close menu when clicking on a link
    const linkItems = navLinks.querySelectorAll('a');
    linkItems.forEach(link => {
      link.addEventListener('click', (e) => {
        if (link.classList.contains('dropdown-toggle')) {
          if (window.innerWidth <= 768) {
            e.preventDefault();
            const dropdownMenu = link.nextElementSibling;
            if (dropdownMenu) {
              dropdownMenu.classList.toggle('show');
            }
            return;
          }
        }
        navLinks.classList.remove('active');
        navToggle.classList.remove('active');
      });
    });
  }

  // ==========================================
  // GALLERY SLIDER CAROUSEL
  // ==========================================
  const track = document.getElementById('gallery-track');
  const trackWrapper = document.querySelector('.gallery-slider-track-wrapper');
  const prevBtn = document.getElementById('gallery-prev');
  const nextBtn = document.getElementById('gallery-next');

  if (track && trackWrapper && prevBtn && nextBtn) {
    const slides = Array.from(track.children);
    let currentIndex = 0;

    function updateSlider() {
      const wrapperWidth = trackWrapper.offsetWidth;
      const slideWidth = slides[0].offsetWidth;
      const gap = parseInt(window.getComputedStyle(track).gap) || 0;
      
      const maxTranslate = Math.max(0, (slides.length * (slideWidth + gap) - gap) - wrapperWidth);
      let targetTranslate = -1 * currentIndex * (slideWidth + gap);
      if (-targetTranslate > maxTranslate && maxTranslate > 0) {
        targetTranslate = -maxTranslate;
      }
      track.style.transform = `translateX(${targetTranslate}px)`;

      // Set active classes
      slides.forEach((slide, index) => {
        if (index === currentIndex) {
          slide.classList.add('active');
        } else {
          slide.classList.remove('active');
        }
      });
    }

    prevBtn.addEventListener('click', () => {
      currentIndex--;
      if (currentIndex < 0) {
        currentIndex = slides.length - 1;
      }
      updateSlider();
    });

    nextBtn.addEventListener('click', () => {
      currentIndex++;
      if (currentIndex >= slides.length) {
        currentIndex = 0;
      }
      updateSlider();
    });

    // Handle window resize to keep slide centered
    window.addEventListener('resize', updateSlider);

    // Touch swipe support for mobile
    let touchstartX = 0;
    let touchendX = 0;

    track.addEventListener('touchstart', e => {
      touchstartX = e.changedTouches[0].screenX;
    }, { passive: true });

    track.addEventListener('touchend', e => {
      touchendX = e.changedTouches[0].screenX;
      handleGesture();
    }, { passive: true });

    function handleGesture() {
      if (touchendX < touchstartX - 50) {
        // Swiped left -> next slide
        currentIndex++;
        if (currentIndex >= slides.length) currentIndex = 0;
        updateSlider();
      }
      if (touchendX > touchstartX + 50) {
        // Swiped right -> prev slide
        currentIndex--;
        if (currentIndex < 0) currentIndex = slides.length - 1;
        updateSlider();
      }
    }

    // Initial slider setup
    setTimeout(updateSlider, 100);
  }

  // ==========================================
  // AWARDS & RECOGNITION GALLERY CAROUSEL
  // ==========================================
  const awardsTrack = document.getElementById('awards-track');
  const awardsTrackWrapper = document.querySelector('.awards-slider-track-wrapper');
  const awardsPrevBtn = document.getElementById('awards-prev');
  const awardsNextBtn = document.getElementById('awards-next');

  if (awardsTrack && awardsTrackWrapper && awardsPrevBtn && awardsNextBtn) {
    const awardsSlides = Array.from(awardsTrack.children);
    let awardsCurrentIndex = 0;

    function updateAwardsSlider() {
      const wrapperWidth = awardsTrackWrapper.offsetWidth;
      const slideWidth = awardsSlides[0].offsetWidth;
      const gap = parseInt(window.getComputedStyle(awardsTrack).gap) || 0;
      
      const maxTranslate = Math.max(0, (awardsSlides.length * (slideWidth + gap) - gap) - wrapperWidth);
      let targetTranslate = -1 * awardsCurrentIndex * (slideWidth + gap);
      if (-targetTranslate > maxTranslate && maxTranslate > 0) {
        targetTranslate = -maxTranslate;
      }
      awardsTrack.style.transform = `translateX(${targetTranslate}px)`;

      // Set active classes
      awardsSlides.forEach((slide, index) => {
        if (index === awardsCurrentIndex) {
          slide.classList.add('active');
        } else {
          slide.classList.remove('active');
        }
      });
    }

    awardsPrevBtn.addEventListener('click', () => {
      awardsCurrentIndex--;
      if (awardsCurrentIndex < 0) {
        awardsCurrentIndex = awardsSlides.length - 1;
      }
      updateAwardsSlider();
    });

    awardsNextBtn.addEventListener('click', () => {
      awardsCurrentIndex++;
      if (awardsCurrentIndex >= awardsSlides.length) {
        awardsCurrentIndex = 0;
      }
      updateAwardsSlider();
    });

    // Handle window resize to keep slide centered
    window.addEventListener('resize', updateAwardsSlider);

    // Touch swipe support for mobile
    let touchstartX = 0;
    let touchendX = 0;

    awardsTrack.addEventListener('touchstart', e => {
      touchstartX = e.changedTouches[0].screenX;
    }, { passive: true });

    awardsTrack.addEventListener('touchend', e => {
      touchendX = e.changedTouches[0].screenX;
      handleAwardsGesture();
    }, { passive: true });

    function handleAwardsGesture() {
      if (touchendX < touchstartX - 50) {
        // Swiped left -> next slide
        awardsCurrentIndex++;
        if (awardsCurrentIndex >= awardsSlides.length) awardsCurrentIndex = 0;
        updateAwardsSlider();
      }
      if (touchendX > touchstartX + 50) {
        // Swiped right -> prev slide
        awardsCurrentIndex--;
        if (awardsCurrentIndex < 0) awardsCurrentIndex = awardsSlides.length - 1;
        updateAwardsSlider();
      }
    }

    // Initial slider setup
    setTimeout(updateAwardsSlider, 100);
  }

  // ==========================================
  // EVENTS PAGE SLIDERS
  // ==========================================
  function initEventSlider(trackId, prevId, nextId) {
    const track = document.getElementById(trackId);
    const prevBtn = document.getElementById(prevId);
    const nextBtn = document.getElementById(nextId);

    if (track && prevBtn && nextBtn) {
      const slides = Array.from(track.children);
      let currentIndex = 0;

      function updateSlider() {
        if (slides.length === 0) return;
        const slideWidth = slides[0].offsetWidth;
        const gap = parseInt(window.getComputedStyle(track).gap) || 0;
        
        // Determine how many slides are visible at once based on window width
        let visibleSlides = 3;
        if (window.innerWidth <= 600) {
          visibleSlides = 1;
        } else if (window.innerWidth <= 900) {
          visibleSlides = 2;
        }

        // Limit index
        const maxIndex = Math.max(0, slides.length - visibleSlides);
        if (currentIndex > maxIndex) {
          currentIndex = maxIndex;
        }

        const translateVal = currentIndex * (slideWidth + gap);
        track.style.transform = `translateX(-${translateVal}px)`;
        
        // Fade out arrows if at start/end of slider track
        prevBtn.style.opacity = currentIndex === 0 ? "0.3" : "1";
        prevBtn.style.pointerEvents = currentIndex === 0 ? "none" : "auto";
        
        nextBtn.style.opacity = currentIndex === maxIndex ? "0.3" : "1";
        nextBtn.style.pointerEvents = currentIndex === maxIndex ? "none" : "auto";
      }

      prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
          currentIndex--;
          updateSlider();
        }
      });

      nextBtn.addEventListener('click', () => {
        let visibleSlides = 3;
        if (window.innerWidth <= 600) {
          visibleSlides = 1;
        } else if (window.innerWidth <= 900) {
          visibleSlides = 2;
        }
        const maxIndex = Math.max(0, slides.length - visibleSlides);
        if (currentIndex < maxIndex) {
          currentIndex++;
          updateSlider();
        }
      });

      window.addEventListener('resize', updateSlider);
      // Initial setup
      setTimeout(updateSlider, 100);
    }
  }

  initEventSlider('beverage-track', 'beverage-prev', 'beverage-next');
  initEventSlider('sock-track', 'sock-prev', 'sock-next');
  initEventSlider('kidskreation-track', 'kidskreation-prev', 'kidskreation-next');
  initEventSlider('gallery-photos-track', 'gallery-photos-prev', 'gallery-photos-next');

  // SIGN UP FORM SUBMISSION HANDLER
  const signupForm = document.getElementById('mcbride-signup-form');
  if (signupForm) {
    signupForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const submitBtn = document.getElementById('signup-submit-btn');
      const successMsg = document.getElementById('signup-success-msg');

      const firstName = document.getElementById('first-name')?.value || '';
      const lastName = document.getElementById('last-name')?.value || '';
      const email = document.getElementById('signup-email')?.value || '';
      const phone = document.getElementById('signup-phone')?.value || '';
      const org = document.getElementById('signup-org')?.value || '';
      const position = document.getElementById('signup-position')?.value || '';

      const mailSubject = encodeURIComponent("Website Sign Up Submission");
      const mailBody = encodeURIComponent(
        `Hello McBride Impact Team,\n\nHere is a new sign up request from the McBride Impact website:\n\nName: ${firstName} ${lastName}\nEmail: ${email}\nPhone: ${phone}\nOrganization: ${org}\nPosition: ${position}\n\nThank you!`
      );
      window.location.href = `mailto:admin@mcbrideimpact.org?subject=${mailSubject}&body=${mailBody}`;

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerText = 'Submitting...';
      }
      setTimeout(() => {
        if (submitBtn) submitBtn.style.display = 'none';
        if (successMsg) successMsg.style.display = 'flex';
      }, 500);
    });
  }

  // HERO BLUEPRINT FORM SUBMISSION HANDLER
  const heroForm = document.getElementById('hero-blueprint-form');
  if (heroForm) {
    heroForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const submitBtn = document.getElementById('hero-blueprint-btn');
      const successMsg = document.getElementById('hero-form-success');

      const name = document.getElementById('hero-name')?.value || '';
      const org = document.getElementById('hero-org')?.value || '';
      const email = document.getElementById('hero-email')?.value || '';
      const phone = document.getElementById('hero-phone')?.value || '';

      const mailSubject = encodeURIComponent("Impact for Change Blueprint Request");
      const mailBody = encodeURIComponent(
        `Hello McBride Impact Team,\n\nI would like to receive the "Impact for Change" blueprint.\n\nName: ${name}\nOrganization: ${org}\nEmail: ${email}\nPhone: ${phone}\n\nThank you!`
      );
      window.location.href = `mailto:admin@mcbrideimpact.org?subject=${mailSubject}&body=${mailBody}`;

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerText = 'Sending...';
      }
      setTimeout(() => {
        if (submitBtn) submitBtn.style.display = 'none';
        if (successMsg) successMsg.style.display = 'flex';
      }, 500);
    });
  }

  // ==========================================
  // SCROLL ENTRANCE ANIMATIONS (REVEAL ON SCROLL)
  // ==========================================
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if (revealElements.length > 0 && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('is-visible'));
  }

  // ==========================================
  // LIGHTBOX MODAL FOR GALLERY IMAGES
  // ==========================================
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');

  if (lightboxModal && lightboxImg) {
    document.querySelectorAll('.gallery-masonry-item img, .gallery-slide img').forEach(img => {
      img.addEventListener('click', (e) => {
        e.stopPropagation();
        lightboxImg.src = img.src;
        lightboxModal.classList.add('active');
      });
    });

    const closeLightbox = () => {
      lightboxModal.classList.remove('active');
    };

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    lightboxModal.addEventListener('click', closeLightbox);
  }

  // ==========================================
  // LOUREASE AUDIO & VIDEO PLAYBACK SYSTEM
  // ==========================================
  let currentAudio = null;
  let currentActiveBtn = null;

  const audioButtons = document.querySelectorAll('.board-icon-btn.audio-btn');
  audioButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const audioSrc = btn.getAttribute('data-audio');
      if (!audioSrc) return;

      // If clicking the currently playing audio button, toggle pause
      if (currentAudio && currentActiveBtn === btn) {
        if (!currentAudio.paused) {
          currentAudio.pause();
          btn.classList.remove('is-playing');
        } else {
          currentAudio.play();
          btn.classList.add('is-playing');
        }
        return;
      }

      // Stop any existing playing audio
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
      }
      if (currentActiveBtn) {
        currentActiveBtn.classList.remove('is-playing');
      }

      // Create & play new audio
      const audio = new Audio(audioSrc);
      currentAudio = audio;
      currentActiveBtn = btn;
      btn.classList.add('is-playing');

      audio.play().catch(err => console.log('Audio playback error:', err));

      audio.onended = () => {
        btn.classList.remove('is-playing');
        currentAudio = null;
        currentActiveBtn = null;
      };
    });
  });

  // Lourease Video Modal Handling
  const videoBtn = document.querySelector('.board-icon-btn.video-btn');
  const videoModal = document.getElementById('lourease-video-modal');
  const videoPlayer = document.getElementById('lourease-video-player');
  const modalClose = document.getElementById('lourease-modal-close');

  if (videoBtn && videoModal && videoPlayer) {
    videoBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      // Stop audio if playing
      if (currentAudio) {
        currentAudio.pause();
        if (currentActiveBtn) currentActiveBtn.classList.remove('is-playing');
      }
      const videoSrc = videoBtn.getAttribute('data-video');
      if (videoSrc) {
        videoPlayer.src = videoSrc;
        videoModal.classList.add('active');
        videoPlayer.play().catch(err => console.log('Video play error:', err));
      }
    });

    const closeVideo = () => {
      videoPlayer.pause();
      videoPlayer.currentTime = 0;
      videoPlayer.src = '';
      videoModal.classList.remove('active');
    };

    if (modalClose) modalClose.addEventListener('click', closeVideo);
    videoModal.addEventListener('click', (e) => {
      if (e.target === videoModal) closeVideo();
    });
  }

});


