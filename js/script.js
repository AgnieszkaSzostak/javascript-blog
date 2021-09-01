'use strict';

/*Function Handler event click */

function titleClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');
  const activeLinks = document.querySelectorAll('.titles a.active');
  for(let activeLink of activeLinks){
      activeLink.classList.remove('active');
  }
  console.log('clickedElement:', clickedElement);
  clickedElement.classList.add('active');
  const activeArticles = document.querySelectorAll('.posts .post.active');
  console.log('aktywny artykuł to: ', activeArticles);
  for(let activeArticle of activeArticles){
      activeArticle.classList.remove('active');
  }

  const hrefAttribute = clickedElement.getAttribute('href');
  console.log('hrefAttribute:', hrefAttribute);
  let article = document.querySelector(hrefAttribute);
  console.log('article:', article);
  article.classList.add('active');
}
/* Function clearLinks */

function clearLinks(){
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';
}

/* Function generate list of titles */

function generateTitleLinks(){
  const articles = document.querySelectorAll(optArticleSelector);
  const titleList = document.querySelector(optTitleListSelector);
  let html = '';
  for(let article of articles) {
    const articleId = article.getAttribute('id');
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    html = html + linkHTML;
  }
  titleList.innerHTML = html;
  const links = document.querySelectorAll('.titles a');
  console.log('links:', links);
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}
const optArticleSelector = '.post',
      optTitleSelector = '.post-title',
      optTitleListSelector = '.titles';
clearLinks();
generateTitleLinks();
