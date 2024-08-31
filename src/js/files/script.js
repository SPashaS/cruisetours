// Подключение функционала "Чертогов Фрилансера"
// import { log } from 'gulp-util';
// import { lightGalleryCoreSettings } from 'lightgallery/lg-settings.js';
import { isMobile, menuClose, menuOpen, _slideUp, _slideDown, closeAllSubMenus } from './functions.js';
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

const menuItemHasChildrenListArr = document.querySelectorAll('.menu__list > .menu-item-has-children');
function addNestedClass(menu, level) {
  if (menu) {
    menu.forEach((el) => {
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

function addMenuBtn() {
  // Замена элементов <a> в родителях с классом menu-item-has-children
  const parentItems = document.querySelectorAll('.menu-item-has-children > a');

  parentItems.forEach(item => {
    const parent = item.parentElement;
    const newHeader = document.createElement('div');
    newHeader.classList.add('main-item');

    const newAnchor = document.createElement('a');
    newAnchor.href = item.href;
    newAnchor.innerText = item.innerText;

    const newButton = document.createElement('div');
    newButton.classList.add('main-item__btn');
    newButton.classList.add('_icon-arrow');

    newHeader.appendChild(newAnchor);
    newHeader.appendChild(newButton);

    parent.insertBefore(newHeader, item);
    parent.removeChild(item);
  });


  // const menu = document.querySelector('.menu');
  const menuItems = document.querySelectorAll('.menu-item');
  const subMenus = document.querySelectorAll('.sub-menu');

  menuItems.forEach(el => {
      if (el.closest('.header')) {
          el.classList.add('menu-item_h');
      }
      if (el.closest('.footer')) {
          el.classList.add('menu-item_f');
      }
  });

  subMenus.forEach(el => {
      if (el.closest('.header')) {
          el.classList.add('sub-menu_h');
      }
      if (el.closest('.footer')) {
          el.classList.add('sub-menu_f');
      }
  });
}

addMenuBtn();

function menu() {
  const breakpointMenuMax = '(max-width: 991.98px)';

  function initializeMenu() {
    const menu = document.querySelector('.header .menu__list');
    const allBtns = menu.querySelectorAll('.main-item__btn');
    
    allBtns.forEach(btn => {
      btn.removeEventListener('click', toggleSubMenu);
      btn.addEventListener('click', toggleSubMenu);
    });
  }

  function toggleSubMenu(e) {
    e.preventDefault();
    const btn = e.currentTarget;
    const parentItem = btn.closest('.menu-item-has-children');
    parentItem.classList.toggle('sub-menu_open');
    _slideToggle(parentItem.querySelector('.sub-menu'), 200);
  }

  function _slideToggle(element, duration) {
    if (window.getComputedStyle(element).display === 'none') {
      _slideUp(element, duration);
    } else {
      _slideDown(element, duration);
    }
  }

  if (window.matchMedia(breakpointMenuMax).matches) {
    initializeMenu();
  }

  window.addEventListener('resize', debounce(function() {
    if (window.matchMedia(breakpointMenuMax).matches) {
      initializeMenu();
    }
  }, 200));

  window.addEventListener('popstate', menuClose);
  window.addEventListener('pageshow', menuClose); // Используем pageshow для мобильных устройств

  // Закрываем меню при загрузке
  window.addEventListener('load', menuClose);
}

function debounce(func, wait) {
  let timeout;
  return function() {
    const context = this, args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
}

menu();



//Тарифы
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

//слайдер
function slider() {
  const descs = document.querySelector('.cruise-route__descs-items');
  const images = document.querySelector('.cruise-route__images');
  const days = document.querySelector('.cruise-route__days');
  const daysLength = descs.children.length;

  function buildDaysSpan(node, count, startIndex) {
    for (let i = 0; i < count; i++) {
      let day = document.createElement('span');
      day.classList.add('day');

      let span1 = document.createElement('span');
      span1.innerHTML = `${startIndex + i + 1}`;
      let span2 = document.createElement('span');
      span2.innerHTML = ` день`;

      day.append(span1);
      day.append(span2);

      node.append(day);
    }
  }

  const rows = Math.ceil(daysLength / 10);
  const minItemsPerRow = Math.floor(daysLength / rows);
  const extraItems = daysLength % rows;

  let rowSizes = [];
  let currentIndex = 0;
  for (let i = 0; i < rows; i++) {
    let row = document.createElement('div');
    row.classList.add('cruise-route__days-row');
    const itemsInRow = i < extraItems ? minItemsPerRow + 1 : minItemsPerRow;
    rowSizes.push(itemsInRow);
    row.classList.add(`cruise-route__days-row_${itemsInRow}`);
    if (i > 1) row.classList.add('hidden'); // Скрываем строки начиная с третьей
    buildDaysSpan(row, itemsInRow, currentIndex);
    days.append(row);
    currentIndex += itemsInRow;
  }

  const spans = days.querySelectorAll('.day');
  if (spans.length > 0) {
    spans[0].classList.add('active');
  }

  descs.children[0].classList.add('active');
  images.children[0].classList.add('active');

  const btnPrev = document.querySelector('.nav-cruise-route__btn_prev');
  const btnNext = document.querySelector('.nav-cruise-route__btn_next');

  let currentEl = 0;

  function getRowIndex(elementIndex) {
    let totalElements = 0;
    for (let i = 0; i < rowSizes.length; i++) {
      totalElements += rowSizes[i];
      if (elementIndex < totalElements) {
        return i;
      }
    }
    return -1; // This should never happen
  }

  function updateActiveElements(index) {
    descs.children[currentEl].classList.remove('active');
    images.children[currentEl].classList.remove('active');
    spans[currentEl].classList.remove('active');
    currentEl = index;
    descs.children[currentEl].classList.add('active');
    images.children[currentEl].classList.add('active');
    spans[currentEl].classList.add('active');

    const currentRowIndex = getRowIndex(currentEl);
    const nextRowIndex = currentRowIndex + 1;

    document.querySelectorAll('.cruise-route__days-row').forEach((row, idx) => {
      if (idx === currentRowIndex || idx === nextRowIndex || (idx === currentRowIndex - 1 && nextRowIndex >= rows)) {
        row.classList.remove('hidden');
      } else {
        row.classList.add('hidden');
      }
    });
  }

  btnPrev.addEventListener('click', () => {
    let newIndex = (currentEl - 1 + descs.children.length) % descs.children.length;
    updateActiveElements(newIndex);
  });

  btnNext.addEventListener('click', () => {
    let newIndex = (currentEl + 1) % descs.children.length;
    updateActiveElements(newIndex);
  });

  spans.forEach((day, index) => {
    day.addEventListener('click', () => {
      updateActiveElements(index);
    });
  });

  document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowLeft') {
      let newIndex = (currentEl - 1 + descs.children.length) % descs.children.length;
      updateActiveElements(newIndex);
    } else if (event.key === 'ArrowRight') {
      let newIndex = (currentEl + 1) % descs.children.length;
      updateActiveElements(newIndex);
    }
  });
}

const bodySlider = document.querySelector('.cruise-route__body');
if (bodySlider) {
  slider();
}

//слайдер2
function slider2() {
  const descs = document.querySelector('.port-route__descs-items');
  const titles = document.querySelector('.port-route__titles');
  const routes = document.querySelector('.port-route__routes-row');

  // Check if the necessary elements exist
  if (!descs || !titles || !routes) return;

  descs.children[0].classList.add('active');
  titles.children[0].classList.add('active');
  routes.children[0].classList.add('active');

  const btnPrev = document.querySelector('.nav-cruise-route__btn_prev');
  const btnNext = document.querySelector('.nav-cruise-route__btn_next');

  const routesQuantity = routes.querySelectorAll('.port-route__routes-item');
  routes.classList.add(`flex_${routesQuantity.length}`);

  console.log(routesQuantity.length);

  // Hide navigation buttons if there is only one element
  if (routesQuantity.length <= 1) {
    btnPrev.style.display = 'none';
    btnNext.style.display = 'none';
  }

  let currentEl = 0;

  function updateActiveElements(index) {
    descs.children[currentEl].classList.remove('active');
    titles.children[currentEl].classList.remove('active');
    routesQuantity[currentEl].classList.remove('active');
    currentEl = index;
    descs.children[currentEl].classList.add('active');
    titles.children[currentEl].classList.add('active');
    routesQuantity[currentEl].classList.add('active');
  }

  btnPrev.addEventListener('click', () => {
    let newIndex = (currentEl - 1 + descs.children.length) % descs.children.length;
    updateActiveElements(newIndex);
  });

  btnNext.addEventListener('click', () => {
    let newIndex = (currentEl + 1) % descs.children.length;
    updateActiveElements(newIndex);
  });

  routesQuantity.forEach((route, index) => {
    route.addEventListener('click', () => {
      updateActiveElements(index);
    });
  });

  document.addEventListener('keydown', function(event) {
    if (routesQuantity.length <= 1) return; // Skip if only one element

    if (event.key === 'ArrowLeft') {
      let newIndex = (currentEl - 1 + descs.children.length) % descs.children.length;
      updateActiveElements(newIndex);
    } else if (event.key === 'ArrowRight') {
      let newIndex = (currentEl + 1) % descs.children.length;
      updateActiveElements(newIndex);
    }
  });
}

const bodyPort = document.querySelector('.port-route__body');
if (bodyPort) {
  slider2();
}

//показать еще
const showMoreArr = document.querySelectorAll('[data-show-more]');
showMoreArr.forEach((showMore) => {
  const showMoreWrapper = showMore.querySelector('[data-show-more-content]');
  const quantityHideElements = parseInt(showMoreWrapper.dataset.showMoreContent, 10);
  const showMoreWrapperChildren = showMoreWrapper.children;

  let status = 0;

  const hide = () => {
    for (let i = 0; i < showMoreWrapperChildren.length; i++) {
      const showMoreWrapperChild = showMoreWrapperChildren[i];
      if (i >= quantityHideElements) {
        setTimeout(() => {
          showMoreWrapperChild.classList.add('hidden');
        }, 200);
        _slideUp(showMoreWrapperChild, 200);
      }
    }
  };

  const show = () => {
    for (let i = 0; i < showMoreWrapperChildren.length; i++) {
      const showMoreWrapperChild = showMoreWrapperChildren[i];
      if (i >= quantityHideElements) {
        showMoreWrapperChild.classList.remove('hidden');
        _slideDown(showMoreWrapperChild, 200);
      }
    }
  };

  // Проверка количества элементов и создание кнопки
  if (showMoreWrapperChildren.length > quantityHideElements) {
    const showMoreBtn = document.createElement('button');
    showMoreBtn.type = 'button';
    showMoreBtn.className = 'btn-more _icon-arrow';
    showMoreBtn.setAttribute('data-show-more-btn', '');
    showMoreBtn.innerHTML = '<span>Показать еще</span><span>Скрыть</span>';
    showMore.appendChild(showMoreBtn);

    hide();

    showMoreBtn.addEventListener('click', () => {
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
  }
});


// видосы
document.addEventListener('DOMContentLoaded', function () {
  var videoPlayers = document.querySelectorAll('.video-player');

  videoPlayers.forEach(function(player) {
    var videoId = player.getAttribute('data-video-id');
    var img = player.querySelector('img');
    img.setAttribute('data-src', 'https://img.youtube.com/vi/' + videoId + '/maxresdefault.jpg');
    img.setAttribute('src', img.getAttribute('data-src'));

    player.addEventListener('click', function() {
      loadVideo(player, videoId);
    });
  });

  function loadVideo(player, videoId) {
    var wrapper = player.closest('.video__body');
    var iframe = document.createElement('iframe');
    iframe.setAttribute('src', 'https://www.youtube.com/embed/' + videoId + '?autoplay=1');
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('allowfullscreen', '1');
    iframe.setAttribute('allow', 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture');
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.position = 'relative';
    iframe.style.zIndex = '2';
    
    wrapper.innerHTML = '';
    wrapper.appendChild(iframe);
  }
});



// теги
const suitePage = document.querySelector('.page__suite [data-tags]');

if (suitePage) {
  const tagsHeader = document.querySelector('[data-tags-header]');
  const items = document.querySelectorAll('[data-tags] [data-tag]');
  const uniqueTags = new Set();
  let isFiltered = false; // Флаг для отслеживания состояния фильтрации

  // Функция для инициализации фильтрации по тегам
  function initTagFiltering() {
    // Очистить tagsHeader
    tagsHeader.innerHTML = '';
  
    // Добавить тег "все сьюты" и сделать его активным по умолчанию
    const allSuitesTag = document.createElement('span');
    allSuitesTag.className = 'tag active'; // Добавляем класс active
    allSuitesTag.innerText = 'все сьюты';
    tagsHeader.appendChild(allSuitesTag);
  
    // Собрать уникальные теги из всех элементов
    items.forEach(item => {
        const tags = item.dataset.tag.split(', ');
        tags.forEach(tag => uniqueTags.add(tag));
    });
  
    // Добавить уникальные теги в data-tags-header
    uniqueTags.forEach(tag => {
        const span = document.createElement('span');
        span.className = 'tag';
        span.innerText = tag;
        tagsHeader.appendChild(span);
    });
  
    // Функция фильтрации элементов
    function filterItems(selectedTag) {
        items.forEach(item => {
            const itemTags = item.dataset.tag.split(', ');
            if (itemTags.includes(selectedTag) || selectedTag === 'все сьюты') {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }
  
    // Добавить обработчики событий для тегов
    const tags = tagsHeader.querySelectorAll('.tag');
    tags.forEach(tag => {
        tag.addEventListener('click', function() {
            const selectedTag = tag.innerText;
            filterItems(selectedTag);
            isFiltered = true; // Устанавливаем флаг фильтрации

            // Удалить класс 'active' у всех тегов и добавить его к выбранному тегу
            tags.forEach(tag => tag.classList.remove('active'));
            tag.classList.add('active');
        });
    });
  
    // Показать все элементы при загрузке
    filterItems('все сьюты');
  }
  
  // Функция для проверки разрешения экрана
  function checkScreenWidth() {
      if (window.innerWidth < 991.98) {
          if (!isFiltered) { // Инициализировать фильтрацию только если она еще не была выполнена
            initTagFiltering();
          }
      } else {
          // Убрать фильтрацию и показать все элементы при большом разрешении
          tagsHeader.innerHTML = '';
          items.forEach(item => item.style.display = 'block');
          isFiltered = false; // Сбрасываем флаг фильтрации
      }
  }
  
  // Инициализация при загрузке
  checkScreenWidth();
  
  // Добавить слушатель событий изменения размера окна
  window.addEventListener('resize', checkScreenWidth);
}

