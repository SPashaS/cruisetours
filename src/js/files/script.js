// Подключение функционала "Чертогов Фрилансера"
// import { log } from 'gulp-util';
// import { lightGalleryCoreSettings } from 'lightgallery/lg-settings.js';
import { isMobile, menuClose, menuOpen, _slideUp, _slideDown } from './functions.js';
// Подключение списка активных модулей
import { flsModules } from './modules.js';
// import { log } from 'gulp-util';

const menuItemHasChildrenArr = document.querySelectorAll(
  '.menu-item-has-children .sub-menu'
);
menuItemHasChildrenArr.forEach((el) => {
  const element = el.parentElement.firstElementChild;

  element.classList.add('_icon-arrow');
  element.setAttribute('data-spoller', '');
});

const menuItemHasChildrenListArr = document.querySelectorAll(
  '.menu__list > .menu-item-has-children'
);
function addNestedClass(menu, level) {
  if (menu) {
    menu.forEach((el) => {
      // console.dir(el.lastElementChild);
      if (el.lastElementChild.classList.contains('sub-menu')) {
        el.lastElementChild.classList.add(`level-${level}`);
        addNestedClass(
          el.querySelectorAll('.menu-item-has-children'),
          level + 1
        );
      }
    });
  }
}

addNestedClass(menuItemHasChildrenListArr, 1);

function menu() {
  const menu = document.querySelector('.menu');
  const breakpointMenu = '(min-width: 1024px)';

  if (window.matchMedia(breakpointMenu).matches) {
    menu.onmouseover = menu.onmouseout = handler;
    function handler(event) {
      let menuItem = event.target.closest('.menu-item-has-children a');
      if (menuItem) {
        // menuItem.parentElement.classList.toggle('_open-sub-menu');
        // if (event.type == 'mouseover') {
        //   menuItem.parentElement.classList.add('_open-sub-menu');
        // } else if (event.type == 'mouseout') {
        //   menuItem.parentElement.classList.remove('_open-sub-menu');
        // }
      }
    }

    const menus = document.querySelectorAll('.menu__list');

    if (menus) {
      menus.forEach((menu) => {
        menu.onmouseover = function (event) {
          //клик
          // if (event.target.nodeName === 'A' && event.target.closest('.menu-item-has-children')) {
          //   console.log('da');
          // }

          if (event.target.hasAttribute('data-spoller')) {
            closeAllSubMenu(event.target.nextElementSibling);
            event.target.nextElementSibling.classList.toggle('sub-menu_open');
            event.target.parentNode.classList.toggle('menu-item_active');

            event.target.addEventListener('click', preventClick);

            function preventClick(event) {
              event.preventDefault();
            }
          }
        };

        function closeAllSubMenu(currentMenu = null) {
          const parents = [];

          if (currentMenu) {
            let currentParent = currentMenu.parentNode;

            while (currentParent) {
              if (currentParent.classList.contains('menu__list')) break;
              if (currentParent.nodeName === 'UL') parents.push(currentParent);
              currentParent = currentParent.parentNode;
            }
          }

          const subMenuArr = document.querySelectorAll('.sub-menu');
          subMenuArr.forEach((subMenu) => {
            if (subMenu !== currentMenu && !parents.includes(subMenu)) {
              subMenu.classList.remove('sub-menu_open');
              subMenu.parentNode.classList.remove('menu-item_active');
            }
          });
        }

        menu.onmouseleave = closeAllSubMenu;
      });
    }
  }
}
menu();
window.addEventListener('resize', menu);

// showmore

const showMoreArr = document.querySelectorAll('[data-show-more]');
showMoreArr.forEach((showMore) => {
  const showMoreBtn = showMore.querySelector('[data-show-more-btn]');
  const showMoreWrapper = showMore.querySelector('[data-show-more-content]');
  const quantityHideElements = showMoreWrapper.dataset.showMoreContent;
  const showMoreWrapperChildren = showMoreWrapper.children;

  let status = 0;

  const hide = () => {
    for (let i = 0; i < showMoreWrapperChildren.length; i++) {
      const showMoreWrapperChild = showMoreWrapperChildren[i];
      if (i >= quantityHideElements) {

        setTimeout(function() {
          showMoreWrapperChild.classList.add('hidden');
        },  200);

        _slideUp(showMoreWrapperChild,200);
      }
    }
  };

  const show = () => {
    for (let i = 0; i < showMoreWrapperChildren.length; i++) {
      const showMoreWrapperChild = showMoreWrapperChildren[i];
      if (i >= quantityHideElements) {
        
        showMoreWrapperChild.classList.remove('hidden');
        _slideDown(showMoreWrapperChild,200);

      }
    }
  };

  hide();

  showMoreBtn.addEventListener('click', function (e) {
    if (!status) {
      status = 1;
      showMore.classList.add('_showmore-active');
      show();
    } else {
      hide();
      showMore.classList.remove('_showmore-active');
      status = 0;
    }
  });
});

// slider

// function slider() {
//   const descs = document.querySelector('.cruise-route__descs-items');
//   const images = document.querySelector('.cruise-route__images');
//   const days = document.querySelector('.cruise-route__days');
//   const daysLength = descs.children.length;


//   function buildDaysSpan (node) {
//     for (let i = 0; i < 10; i++) {
//       let day = document.createElement('span');
//       // day.classList.add('day');
//       // day.innerHTML = `${i} день`;
//       // if ( i == 1) {
//       //   day.classList.add('active')
//       // }
//       node.append(day);
//     }
//   };


//   // console.dir(images);

//   if (daysLength > 1) {
//     let row1 = document.createElement('div');
//     row1.classList.add('cruise-route__days-row');
//     row1.classList.add('cruise-route__days-row_1');
//     buildDaysSpan(row1);
//     days.append(row1);
    
//   } if (daysLength > 10) {

//     let row2 = document.createElement('div');
//     row2.classList.add('cruise-route__days-row');
//     row2.classList.add('cruise-route__days-row_2');
//     buildDaysSpan(row2);
//     days.append(row2)

//   } if (daysLength > 20) {

//     let row3 = document.createElement('div');
//     row3.classList.add('cruise-route__days-row');
//     row3.classList.add('cruise-route__days-row_3');
//     row3.classList.add('hidden');
//     buildDaysSpan(row3);
//     days.append(row3)
//   } 

//   const spans = days.querySelectorAll('span');

//   for (let i = 0; i < daysLength; i++) {
//     spans[i].classList.add('day');


//     let span1 = document.createElement('span');
//     span1.innerHTML = `${i+1}`;
//     let span2 = document.createElement('span');
//     span2.innerHTML = ` день`;


//     spans[i].append(span1);
//     spans[i].append(span2);

//     if ( i == 0 ) {
//       spans[i].classList.add('active')
//     }
//   }

//     // days.children[0].classList.add('active');
//     descs.children[0].classList.add('active');
//     images.children[0].classList.add('active');

//   //====================================


//   const btnPrev = document.querySelector('.nav-cruise-route__btn_prev');
//   const btnNext = document.querySelector('.nav-cruise-route__btn_next');

//   const daysQuantity = days.querySelectorAll('.day');

//   let currentEl = 0;
//   // console.log(descs.children[currentEl]);
//   btnPrev.addEventListener( 'click', (e) => {
//     descs.children[currentEl].classList.remove('active');
//     images.children[currentEl].classList.remove('active');
//     daysQuantity[currentEl].classList.remove('active');
//     currentEl = (currentEl - 1 + descs.children.length) % descs.children.length;
//     // console.log(currentEl);
//     descs.children[currentEl].classList.add('active');
//     images.children[currentEl].classList.add('active');
//     daysQuantity[currentEl].classList.add('active');


//     if( currentEl >= 20) {
//       document.querySelector('.cruise-route__days-row_1').classList.add('hidden');
//       document.querySelector('.cruise-route__days-row_2').classList.add('hidden');
//       document.querySelector('.cruise-route__days-row_3').classList.remove('hidden');
//     } 
//     if ( currentEl < 20 && currentEl > 10) {
//       document.querySelector('.cruise-route__days-row_1').classList.remove('hidden');
//       document.querySelector('.cruise-route__days-row_2').classList.remove('hidden');
//       document.querySelector('.cruise-route__days-row_3').classList.add('hidden');
//     }



//   });

//   btnNext.addEventListener( 'click', (e) => {
//     descs.children[currentEl].classList.remove('active');
//     images.children[currentEl].classList.remove('active');
//     daysQuantity[currentEl].classList.remove('active');
//     currentEl = (currentEl + 1) % descs.children.length;
//     // console.log(currentEl + 1);
//     // console.log(descs.children.length);
//     descs.children[currentEl].classList.add('active');
//     images.children[currentEl].classList.add('active');
//     daysQuantity[currentEl].classList.add('active');

//     if( currentEl >= 20) {
//       document.querySelector('.cruise-route__days-row_1').classList.add('hidden');
//       document.querySelector('.cruise-route__days-row_2').classList.add('hidden');
//       document.querySelector('.cruise-route__days-row_3').classList.remove('hidden');
//     } 
    
//     if ( currentEl + 1 === 1) {
//       document.querySelector('.cruise-route__days-row_1').classList.remove('hidden');
//       document.querySelector('.cruise-route__days-row_2').classList.remove('hidden');
//       document.querySelector('.cruise-route__days-row_3').classList.add('hidden');
//     }


//   });

// }

// const bodySlider = document.querySelector('.cruise-route__body');

// if (bodySlider) {
//   slider();
// }



// function tariffTabs() {
//   const navItems = document.querySelector('.tariffs__nav');
//   const bodyItems = document.querySelectorAll('.tariffs__item');

//   // navItems.forEach(element => {
//   //   element.addEventListener("click", (e) => {
//   //     console.log(e);
//   //   })
//   // });


//   navItems.addEventListener("click", (e) => {
//     console.log(e);
//   })
// }

// tariffTabs();


document.addEventListener('DOMContentLoaded', function() {
  const navItems = document.querySelectorAll('.tariffs__nav-item');
  const tariffItems = document.querySelectorAll('.tariffs__item');
  let activeIndex = 0;  // Переменная для хранения активного индекса

  function handleTabClick(event) {
      if (window.innerWidth <= 992) {
          const clickedIndex = Array.from(navItems).indexOf(event.currentTarget);
          activeIndex = clickedIndex;  // Обновляем активный индекс
          updateActiveClass(clickedIndex);
      }
  }

  function handleResize() {
      if (window.innerWidth > 992) {
          navItems.forEach(item => {
              item.classList.remove('active');
          });
          tariffItems.forEach(item => {
              item.classList.remove('active');
          });
      } else {
          updateActiveClass(activeIndex);  // Восстанавливаем активный класс при уменьшении ширины
      }
  }

  function updateActiveClass(index) {
      navItems.forEach((item, i) => {
          item.classList.toggle('active', i === index);
      });
      tariffItems.forEach((item, i) => {
          item.classList.toggle('active', i === index);
      });
  }

  navItems.forEach(item => {
      item.addEventListener('click', handleTabClick);
  });

  window.addEventListener('resize', handleResize);

  // Initial check on page load
  if (window.innerWidth <= 992) {
      updateActiveClass(activeIndex);
  }
});




//slider 
function slider() {
  const descs = document.querySelector('.cruise-route__descs-items');
  const images = document.querySelector('.cruise-route__images');
  const days = document.querySelector('.cruise-route__days');
  const daysLength = descs.children.length;

  function buildDaysSpan(node) {
    for (let i = 0; i < 10; i++) {
      let day = document.createElement('span');
      node.append(day);
    }
  }

  if (daysLength > 1) {
    let row1 = document.createElement('div');
    row1.classList.add('cruise-route__days-row');
    row1.classList.add('cruise-route__days-row_1');
    buildDaysSpan(row1);
    days.append(row1);
  }
  if (daysLength > 10) {
    let row2 = document.createElement('div');
    row2.classList.add('cruise-route__days-row');
    row2.classList.add('cruise-route__days-row_2');
    buildDaysSpan(row2);
    days.append(row2);
  }
  if (daysLength > 20) {
    let row3 = document.createElement('div');
    row3.classList.add('cruise-route__days-row');
    row3.classList.add('cruise-route__days-row_3');
    row3.classList.add('hidden');
    buildDaysSpan(row3);
    days.append(row3);
  }

  const spans = days.querySelectorAll('span');
  for (let i = 0; i < daysLength; i++) {
    spans[i].classList.add('day');

    let span1 = document.createElement('span');
    span1.innerHTML = `${i + 1}`;
    let span2 = document.createElement('span');
    span2.innerHTML = ` день`;

    spans[i].append(span1);
    spans[i].append(span2);

    if (i == 0) {
      spans[i].classList.add('active');
    }
  }

  descs.children[0].classList.add('active');
  images.children[0].classList.add('active');

  const btnPrev = document.querySelector('.nav-cruise-route__btn_prev');
  const btnNext = document.querySelector('.nav-cruise-route__btn_next');

  const daysQuantity = days.querySelectorAll('.day');

  let currentEl = 0;

  function updateActiveElements(index) {
    descs.children[currentEl].classList.remove('active');
    images.children[currentEl].classList.remove('active');
    daysQuantity[currentEl].classList.remove('active');
    currentEl = index;
    descs.children[currentEl].classList.add('active');
    images.children[currentEl].classList.add('active');
    daysQuantity[currentEl].classList.add('active');

    if (currentEl >= 20) {
      document.querySelector('.cruise-route__days-row_1').classList.add('hidden');
      document.querySelector('.cruise-route__days-row_2').classList.add('hidden');
      document.querySelector('.cruise-route__days-row_3').classList.remove('hidden');
    } else if (currentEl >= 10) {
      document.querySelector('.cruise-route__days-row_1').classList.remove('hidden');
      document.querySelector('.cruise-route__days-row_2').classList.remove('hidden');
      document.querySelector('.cruise-route__days-row_3').classList.add('hidden');
    } else {
      document.querySelector('.cruise-route__days-row_1').classList.remove('hidden');
      if (daysLength > 10) {
        document.querySelector('.cruise-route__days-row_2').classList.remove('hidden');
      }
      if (daysLength > 20) {
        document.querySelector('.cruise-route__days-row_3').classList.add('hidden');
      }
    }
  }

  btnPrev.addEventListener('click', () => {
    let newIndex = (currentEl - 1 + descs.children.length) % descs.children.length;
    updateActiveElements(newIndex);
  });

  btnNext.addEventListener('click', () => {
    let newIndex = (currentEl + 1) % descs.children.length;
    updateActiveElements(newIndex);
  });

  daysQuantity.forEach((day, index) => {
    day.addEventListener('click', () => {
      updateActiveElements(index);
    });
  });
}

const bodySlider = document.querySelector('.cruise-route__body');
if (bodySlider) {
  slider();
}