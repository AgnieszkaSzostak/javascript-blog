'use strict';
const optArticleSelector = '.post';
const optTitleSelector = '.post-title';
const optTitleListSelector = '.titles';
const optArticleTagsSelector = '.post-tags .list';

const titleClickHandler = function(event){
  event.preventDefault();
  const clickedElement = this;
  const activeLinks = document.querySelectorAll('.titles a.active');
  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }
  clickedElement.classList.add('active');
  const activeArticles = document.querySelectorAll('.posts .post.active');
  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }
  const hrefAttribute = clickedElement.getAttribute('href');
  const article = document.querySelector(hrefAttribute);
  article.classList.add('active');
};

const clearLinks = function(){
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
};

const generateTitleLinks = function(){
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
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
};

function generateTags(){
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  /* START LOOP: for every article: */
  for(let article of articles){

    /* find tags wrapper */
    const tagsWrapper = article.querySelectorAll(optArticleTagsSelector);
    console.log('tagsWrapper:', tagsWrapper);
    /* make html variable with empty string */
    let html = '';
    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    console.log('articleTags:', articleTags);
    /* split tags into array */
    const tagsArray = articleTags.split(' ');
    console.log('tagsArray:', tagsArray);
    /* START LOOP: for each tag */
    for(let tag of tagsArray) {
      /* generate HTML of the link */
      const tagLinkHTML = '<li><a href=#' + tag +'"><span>' + tagsArray + '</span></a></li>';
      console.log('tagLinkHTML:', tagLinkHTML);
      /* add generated code to html variable */
      html = html + tagLinkHTML;
      console.log('html:', html);
    /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */

  /* END LOOP: for every article: */
  }
}

generateTags();
clearLinks();
generateTitleLinks();
