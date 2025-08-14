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