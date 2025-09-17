$(document).ready(function () {
    $(".home-car").owlCarousel({
      items: 1,
      loop: true,
      autoplay: true,
      autoplayTimeout: 5000,
      autoplayHoverPause: true,
      nav: false,
      dots: true
    });
});

$(document).ready(function () {
    $('.owl-carousel.word-carousel').owlCarousel({

      loop: true,
      margin: 30,
      nav: true,
      dots: true,
      autoplay: true,
      autoplayTimeout: 5000,
      autoplayHoverPause: true,
      smartSpeed: 600,
      navText: ['<span class="owl-prev-arrow"><i class="fa-solid fa-arrow-left"></i></span>', '<span class="owl-next-arrow"><i class="fa-solid fa-arrow-right"></i></span>'],
      responsive: {
        0: {
          items: 1
        }

        ,
        768: {
          items: 1
        }

        ,
        1024: {
          items: 1.2
        }
      }
    });
});

$(document).ready(function () {
    $('.art_meet_slider').owlCarousel({

      loop: true,
      margin: 30,
      nav: true,
      dots: true,
      autoplay: true,
      autoplayTimeout: 5000,
      smartSpeed: 600,
      navText: ['<span class="owl-prev-arrow"><i class="fa-solid fa-arrow-left"></i></span>', '<span class="owl-next-arrow"><i class="fa-solid fa-arrow-right"></i></span>'],
      responsive: {
        0: {
          items: 1
        }

        ,
        768: {
          items: 2
        }

        ,
        1024: {
          items: 2.5
        }
      }
    });
});

$(document).ready(function() {
    $(".image_slider").owlCarousel({
      items: 1,
      loop: true,
      margin: 10,
      nav: true,
    });

  $(".video_slider").owlCarousel({
    items: 1,
    loop: true,
    margin: 10,
    nav: true,
  });

$('#imageTab').click(function(e) {
    e.preventDefault();
    $('.image_slider').show();
    $('.video_slider').hide();
    $('#imageTab').addClass('active');
    $('#videoTab').removeClass('active');
  });

$('#videoTab').click(function(e) {
    e.preventDefault();
    $('.video_slider').show();
    $('.image_slider').hide();
    $('#videoTab').addClass('active');
    $('#imageTab').removeClass('active');
  });
});
/* ===== DESKTOP ===== */
let visibleGridsDesktop=4; // initially visible desktop grids
const gridsToShowPerClickDesktop=1;

function initializeDesktopGrids() {
  const allGrids=document.querySelectorAll('[class^="main_grid_new_"]');

  allGrids.forEach((grid, index)=> {
      grid.dataset.originalDisplay=getComputedStyle(grid).display;

      if (index >=visibleGridsDesktop) {
        grid.style.display='none';
      }
    });
  updateDesktopLoadMoreButton();
}

function loadMoreDesktop() {
  const allGrids=document.querySelectorAll('[class^="main_grid_new_"]');
  const button=document.querySelector('.load-more-btn-desktop');

  button.textContent='Loading...';
  button.disabled=true;

  setTimeout(()=> {
      const gridsToShow=[];

      for (let i=visibleGridsDesktop; i < visibleGridsDesktop + gridsToShowPerClickDesktop && i < allGrids.length; i++) {
        gridsToShow.push(allGrids[i]);
      }

      gridsToShow.forEach((grid, index)=> {
          grid.style.display=grid.dataset.originalDisplay || 'grid';
          grid.style.opacity='0';
          grid.style.transform='translateY(20px)';
          grid.style.transition='all 0.6s ease';

          setTimeout(()=> {
              grid.style.opacity='1';
              grid.style.transform='translateY(0)';
            }

            , index * 100);
        });

      visibleGridsDesktop +=gridsToShow.length;
      button.textContent='Load More';
      button.disabled=false;
      updateDesktopLoadMoreButton();
    }

    , 800);
}

function updateDesktopLoadMoreButton() {
  const allGrids=document.querySelectorAll('[class^="main_grid_new_"]');
  const loadMoreContainer=document.querySelector('.load-more-desktop');
  loadMoreContainer.style.display=visibleGridsDesktop>=allGrids.length ? 'none': 'block';
}

/* ===== MOBILE ===== */
let visibleImagesMobile=6; // initially visible mobile images
const imagesToShowPerClickMobile=2;

function initializeMobileImages() {
  const allImages=document.querySelectorAll('.grid-item_new-mob');

  allImages.forEach((item, index)=> {
      item.dataset.originalDisplay=getComputedStyle(item).display || 'block';

      if (index >=visibleImagesMobile) {
        item.style.display='none';
      }
    });
  updateMobileLoadMoreButton();
}

function loadMoreMobile() {
  const allImages=document.querySelectorAll('.grid-item_new-mob');
  const button=document.querySelector('.load-more-btn-mobile');

  button.textContent='Loading...';
  button.disabled=true;

  setTimeout(()=> {
      const imagesToShow=[];

      for (let i=visibleImagesMobile; i < visibleImagesMobile + imagesToShowPerClickMobile && i < allImages.length; i++) {
        imagesToShow.push(allImages[i]);
      }

      imagesToShow.forEach((item, index)=> {
          item.style.display=item.dataset.originalDisplay || 'block';
          item.style.opacity='0';
          item.style.transform='translateY(20px)';
          item.style.transition='all 0.6s ease';

          setTimeout(()=> {
              item.style.opacity='1';
              item.style.transform='translateY(0)';
            }

            , index * 100);
        });

      visibleImagesMobile +=imagesToShow.length;
      button.textContent='Load More';
      button.disabled=false;
      updateMobileLoadMoreButton();
    }

    , 600);
}

function updateMobileLoadMoreButton() {
  const allImages=document.querySelectorAll('.grid-item_new-mob');
  const loadMoreContainer=document.querySelector('.load-more-mobile');
  loadMoreContainer.style.display=visibleImagesMobile>=allImages.length ? 'none': 'block';
}

document.addEventListener("DOMContentLoaded", ()=> {
    const tabBtns=document.querySelectorAll('.tab-btn');
    const products=document.querySelectorAll('.product_shop');
    const loadMoreBtn=document.getElementById("loadMoreBtn");

    let itemsToShow=16;
    let currentItems=0;
    let activeCategory="all";

    // Show products based on category & pagination
    function showItems(count) {
      let visibleProducts=[...products].filter(p=> activeCategory==="all" || p.getAttribute("data-category")===activeCategory);

      visibleProducts.forEach((p, i)=> {
          if (i < currentItems + count) {
            p.classList.add("show");
          }
        });

      currentItems +=count;

      if (currentItems >=visibleProducts.length) {
        loadMoreBtn.style.display="none";
      }

      else {
        loadMoreBtn.style.display="inline-block";
      }
    }

    // Filter Tabs
    tabBtns.forEach(btn=> {
        btn.addEventListener('click', ()=> {
            tabBtns.forEach(b=> b.classList.remove('active'));
            btn.classList.add('active');
            activeCategory=btn.getAttribute('data-category');

            products.forEach(p=> p.classList.remove("show"));
            currentItems=0;
            showItems(itemsToShow);
          });
      });

    // Heart Toggle + Show Cart
    document.querySelectorAll('.heart').forEach(heart=> {
        heart.addEventListener('click', ()=> {
            heart.classList.toggle('active');
            let cartBtn=heart.nextElementSibling; // Add-to-cart is right after heart

            if (heart.classList.contains('active')) {
              cartBtn.style.display='inline-block';
            }

            else {
              cartBtn.style.display='none';
            }
          });
      });

    // Load more
    loadMoreBtn.addEventListener("click", ()=> {
        showItems(itemsToShow);
      });

    // Initial load
    showItems(itemsToShow);
  });

document.addEventListener("DOMContentLoaded", function () {
    const desktopItems=document.querySelectorAll(".fashion_grid img");
    const mobileItems=document.querySelectorAll(".fashion_grid_mobile img");
    const loadMoreBtn=document.getElementById("loadMorework");
    const tabBtns=document.querySelectorAll(".tab-new");

    let itemsToShow=21;
    let currentItems=0;
    let activeCategory="all";

    function showItems(list) {
      let count=0;

      for (let i=currentItems; i < list.length; i++) {
        if (activeCategory==="all" || list[i].dataset.category===activeCategory) {
          list[i].classList.add("show");
          count++;
          if (count===itemsToShow) break;
        }
      }

      currentItems +=count;

      let remaining=[...list].filter(img=> (activeCategory==="all" || img.dataset.category===activeCategory) && !img.classList.contains("show"));
      loadMoreBtn.style.display=remaining.length===0 ? "none" : "block";
    }

    function refreshItems() {
      const isMobile=window.innerWidth < 768;
      const list=isMobile ? mobileItems : desktopItems;
      list.forEach(img=> img.classList.remove("show"));
      currentItems=0;
      showItems(list);
    }

    tabBtns.forEach(btn=> {
        btn.addEventListener("click", ()=> {
            tabBtns.forEach(b=> b.classList.remove("active"));
            btn.classList.add("active");
            activeCategory=btn.dataset.category;
            refreshItems();
          });
      });

    loadMoreBtn.addEventListener("click", ()=> {
        const isMobile=window.innerWidth < 768;
        const list=isMobile ? mobileItems : desktopItems;
        showItems(list);
      });

    refreshItems();
  });
  
  $(document).ready(function(){
    $(".customer_main_div").owlCarousel({
      loop:true,
      margin:20,
      nav:true,
      dots:true,
      autoplay:true,
      autoplayTimeout:4000,
      responsive:{
        0:{ items:1 },
        768:{ items:2 },
        1024:{ items:3 }
      }
    });
  });

  // Function to handle active class toggle
  function setActiveButtons(groupSelector) {
    const group = document.querySelectorAll(groupSelector + " button");

    group.forEach(button => {
      button.addEventListener("click", () => {
        // Remove active class from all buttons in this group
        group.forEach(btn => btn.classList.remove("active"));
        // Add active class to clicked button
        button.classList.add("active");
      });
    });
  }

  // Apply for sizes and materials
  document.addEventListener("DOMContentLoaded", () => {
    setActiveButtons(".sizes");
    setActiveButtons(".materials");
  });

 document.addEventListener("DOMContentLoaded", () => {
    const qtyInput = document.querySelector(".qty-input");
    const minusBtn = document.querySelector(".qty-btn.minus");
    const plusBtn = document.querySelector(".qty-btn.plus");

    // Increase quantity
    plusBtn.addEventListener("click", () => {
      let currentValue = parseInt(qtyInput.value) || 1;
      qtyInput.value = currentValue + 1;
    });

    // Decrease quantity (minimum 1)
    minusBtn.addEventListener("click", () => {
      let currentValue = parseInt(qtyInput.value) || 1;
      if (currentValue > 1) {
        qtyInput.value = currentValue - 1;
      }
    });
  });

  
$(document).ready(function() {
  // Configuration - set this to control when the script should run
  const ENABLE_HEIGHT_SYNC = true; // Set to false to disable the script
  const MIN_SCREEN_WIDTH = 996; // Minimum screen width to run the script
  
  // Early exit if script is disabled
  if (!ENABLE_HEIGHT_SYNC) {
    console.log('Height sync script is disabled');
    return;
  }

  // Function to check if script should run based on conditions
  function shouldRunScript() {
    const screenWidth = $(window).innerWidth();
    const isLargeScreen = screenWidth > MIN_SCREEN_WIDTH;
    
    // Check if ANY service sections exist (more flexible)
    const hasRequiredElements = $('.service-text-1, .service-text-2, .service-text-3').length > 0 ||
                               $('.service-image-1, .service-image-2, .service-image-3').length > 0;
    
    return isLargeScreen && hasRequiredElements;
  }

  // Function to sync heights for a specific section
  function syncHeights(contentSelector, imgSelector) {
    // Get the content div and image container
    var $contentDiv = $(contentSelector);
    var $imgContainer = $(imgSelector);
        
    // Only proceed if both elements exist
    if ($contentDiv.length && $imgContainer.length) {
      // Get the image element
      var $img = $imgContainer.find('img');
            
      // Only proceed if the image exists
      if ($img.length) {
        // Get the content height
        var contentHeight = $contentDiv.outerHeight();
                
        // Set the image container height to match content height
        $imgContainer.height(contentHeight);
                
        // Make the image fill the container while maintaining aspect ratio
        $img.css({
          'height': '100%',
          'object-fit': 'cover'
        });
                
        // Log success for debugging
        console.log('Synced heights for ' + contentSelector + ' and ' + imgSelector);
      }
    }
    // Removed warning logs to prevent console spam when elements don't exist
  }

  // Function to reset heights (useful when hiding/disabling)
  function resetHeights() {
    $('.service-image-1, .service-image-2, .service-image-3').css('height', '');
    $('.service-image-1 img, .service-image-2 img, .service-image-3 img').css({
      'height': '',
      'object-fit': ''
    });
    console.log('Heights reset to default');
  }

  // Function to sync heights for all sections
  function syncAllHeights() {
    // Check if script should run
    if (!shouldRunScript()) {
      console.log('Height sync conditions not met - skipping');
      resetHeights(); // Reset any previous height adjustments
      return;
    }

    // Check if any required elements exist before attempting sync
    const sections = [
      { content: '.service-text-1', image: '.service-image-1', name: 'Section 1' },
      { content: '.service-text-2', image: '.service-image-2', name: 'Section 2' },
      { content: '.service-text-3', image: '.service-image-3', name: 'Section 3' }
    ];

    let foundSections = 0;
    
    sections.forEach(section => {
      const hasContent = $(section.content).length > 0;
      const hasImage = $(section.image).length > 0;
      
      if (hasContent && hasImage) {
        foundSections++;
        try {
          syncHeights(section.content, section.image);
        } catch (e) {
          console.error(`Error syncing ${section.name}:`, e);
        }
      }
    });

    // Only log if no sections were found (to avoid console spam)
    if (foundSections === 0) {
      console.log('No service sections found on this page - height sync not needed');
    } else {
      console.log(`Height sync applied to ${foundSections} section(s)`);
    }
  }

  // Function to handle visibility toggle
  function toggleHeightSync(enable) {
    if (enable && shouldRunScript()) {
      syncAllHeights();
    } else {
      resetHeights();
    }
  }

  // Initial run
  syncAllHeights();
  
  // Run when images are loaded (for more accuracy)
  $(window).on('load', syncAllHeights);
  
  // Additional attempt after a slight delay to handle any delayed rendering
  setTimeout(syncAllHeights, 500);
  
  // Run on window resize
  $(window).on('resize', function() {
    // Add a small debounce to prevent excessive calls
    clearTimeout(window.resizeTimeout);
    window.resizeTimeout = setTimeout(syncAllHeights, 100);
  });

  // Optional: Expose control functions globally for manual control
  window.heightSyncControls = {
    enable: function() { toggleHeightSync(true); },
    disable: function() { toggleHeightSync(false); },
    toggle: function() { 
      ENABLE_HEIGHT_SYNC = !ENABLE_HEIGHT_SYNC;
      toggleHeightSync(ENABLE_HEIGHT_SYNC);
    },
    reset: resetHeights,
    sync: syncAllHeights
  };

  // Optional: Add CSS class to body to indicate script status
  $('body').addClass(shouldRunScript() ? 'height-sync-active' : 'height-sync-inactive');
});

  document.addEventListener("DOMContentLoaded", function () {
            const wrapper = document.querySelector(".quantity-wrapper");
            const input = wrapper.querySelector(".quantity-input");
            const btnIncrease = wrapper.querySelector(".increase");
            const btnDecrease = wrapper.querySelector(".decrease");

            btnIncrease.addEventListener("click", function () {
                let currentValue = parseInt(input.value) || 0;
                input.value = currentValue + 1;
            });

            btnDecrease.addEventListener("click", function () {
                let currentValue = parseInt(input.value) || 0;
                let minValue = parseInt(input.min) || 1;
                if (currentValue > minValue) {
                    input.value = currentValue - 1;
                }
            });
        });