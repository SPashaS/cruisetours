// Подключение функционала "Чертогов Фрилансера"
// import { log } from 'gulp-util';
// import { lightGalleryCoreSettings } from 'lightgallery/lg-settings.js';
import { isMobile, menuClose, menuOpen } from './functions.js';
// Подключение списка активных модулей
import { flsModules } from './modules.js';
// import { log } from 'gulp-util';



const menuItemHasChildrenArr = document.querySelectorAll('.menu-item-has-children .sub-menu');
menuItemHasChildrenArr.forEach(el => {
  const element =  el.parentElement.firstElementChild;
  
  element.classList.add('_icon-arrow');
  element.setAttribute("data-spoller", "");
});



const menuItemHasChildrenListArr = document.querySelectorAll('.menu__list > .menu-item-has-children');
function addNestedClass(menu, level) {
  if (menu) {
    menu.forEach( el => {
      // console.dir(el.lastElementChild);
      if (el.lastElementChild.classList.contains('sub-menu')) {
        el.lastElementChild.classList.add(`level-${level}`);
        addNestedClass(el.querySelectorAll('.menu-item-has-children'), level + 1);
      }
    });
  }
}

addNestedClass(menuItemHasChildrenListArr, 1);






function menu() {
  const menu = document.querySelector('.menu');
  const breakpointMenu = '(min-width: 1024px)';

  if (window.matchMedia(breakpointMenu).matches ) {

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
      menus.forEach(menu => {

        menu.onmouseover = function(event) {
          //клик
          // if (event.target.nodeName === 'A' && event.target.closest('.menu-item-has-children')) {
          //   console.log('da');
          // }
        
          if (event.target.hasAttribute('data-spoller')) {
  
            closeAllSubMenu(event.target.nextElementSibling);
            event.target.nextElementSibling.classList.toggle('sub-menu_open');
            event.target.parentNode.classList.toggle('menu-item_active');
  
            event.target.addEventListener("click", preventClick);
  
            function preventClick(event) {
              event.preventDefault();
            }
  
          }
        }
        
        
        function closeAllSubMenu(currentMenu = null) {
          const parents = [];
        
          if (currentMenu) {
            let currentParent = currentMenu.parentNode;
        
            while (currentParent) {
              if (currentParent.classList.contains('menu__list')) break;
              if (currentParent.nodeName === "UL") parents.push(currentParent);
              currentParent = currentParent.parentNode;
            }
          }
        
          const subMenuArr = document.querySelectorAll('.sub-menu');
          subMenuArr.forEach(subMenu => {
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
window.addEventListener( 'resize', menu );




// showmore

const showMoreArr = document.querySelectorAll("[data-show-more]");
showMoreArr.forEach(showMore => {
  const showMoreBtn = showMore.querySelector("[data-show-more-btn]");
  const showMoreWrapper = showMore.querySelector("[data-show-more-content]");
  const quantityHideElements = showMoreWrapper.dataset.showMoreContent;
  const showMoreWrapperChildren = showMoreWrapper.children;
  
  let status = 0;

  const hide = () => {
    for (let i = 0; i < showMoreWrapperChildren.length; i++) {
      const showMoreWrapperChild = showMoreWrapperChildren[i];
      if ( i >= quantityHideElements) {
        showMoreWrapperChild.style.display = 'none';
      }
    }
  }

  const show = () => {
    for (let i = 0; i < showMoreWrapperChildren.length; i++) {
      const showMoreWrapperChild = showMoreWrapperChildren[i];
      if ( i >= quantityHideElements) {
        showMoreWrapperChild.style.display = 'block';
      }
    }
  }

  hide();

  showMoreBtn.addEventListener("click", function (e) {
    if ( !status) {
      status = 1;
      showMore.classList.add("_showmore-active");
      show();
    } else {
      hide();
      showMore.classList.remove("_showmore-active"); 
      status = 0;
    }
  });

});



