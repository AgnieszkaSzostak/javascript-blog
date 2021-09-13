// 'use strict';
const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
  authorCloudLink: Handlebars.compile(document.querySelector('#template-author-cloud-link').innerHTML)
};

const opts = {
  ArticleSelector : '.post',
  ArticleTagsSelector : '.post-tags .list',
  ArticleAuthorSelector : '.post-author a',
  TitleSelector : '.post-title',
  TitleListSelector : '.titles',
  TagsListSelector : '.tags.list',
  AuthorsListSelector : '.list.authors',
  CloudClassCount : 4,
  CloudClassPrefix : 'tag-size-',

};


const markArticleTitleActive = function(){
  const activeArticle = document.querySelector(opts.ArticleSelector +'.active');
  const activeArticleId = activeArticle.getAttribute('id');
  const titleList = document.querySelector(opts.TitleListSelector);
  const selectedArticleTitle = titleList.querySelector('a[href="#' + activeArticleId + '"]');

  selectedArticleTitle.classList.add('active');
};
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
  const titleList = document.querySelector(opts.TitleListSelector);
  titleList.innerHTML = '';
  generateTitleLinks();
};

const generateTitleLinks = function(customSelector = ''){
  const articles = document.querySelectorAll(opts.ArticleSelector + customSelector);
  const titleList = document.querySelector(opts.TitleListSelector);
  let html = '';
  for(let article of articles) {
    const articleId = article.getAttribute('id');
    const articleTitle = article.querySelector(opts.TitleSelector).innerHTML;
    const linkHTMLData = {
      id: articleId, 
      title: articleTitle
    };
    const linkHTML = templates.articleLink(linkHTMLData);
    html = html + linkHTML;
  }
  titleList.innerHTML = html;
  const links = document.querySelectorAll('.titles a');
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
};

const calculateTagsParams = function(tags){
  const params = 
  { 
    max : 0,
    min : 999999
  };
  for(let tag in tags){
    params.max = Math.max(tags[tag], params.max);
    params.min = Math.min(tags[tag], params.min);
  }
  return params;
};


const calculateTagsClass = function(count, params){
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor ( percentage * (opts.CloudClassCount - 1) + 1);
  return opts.CloudClassPrefix + classNumber;
};

const generateTags = function(){
  const allTags = {};
  const articles = document.querySelectorAll(opts.ArticleSelector);
  for(let article of articles){
    const tagsWrapper = article.querySelector(opts.ArticleTagsSelector);
    let html = '';
    const articleTags = article.getAttribute('data-tags');
    const articleTagsArray = articleTags.split(' ');
    for(let tag of articleTagsArray) {
      const linkHTMLData = 
        {
          id: 'tag-' + tag,
          title: tag
        };
      const linkHTML = templates.articleLink(linkHTMLData);
      html = html + ' ' + linkHTML;
      // eslint-disable-next-line no-prototype-builtins
      if(!allTags.hasOwnProperty(tag)){
        allTags[tag] = 1; 
      }
      else {
        allTags[tag]++;      
      }
      tagsWrapper.innerHTML = html;
    }
  }
  console.log('allTags', allTags);
  const tagList = document.querySelector(opts.TagsListSelector);
  const tagsParams = calculateTagsParams(allTags);
  const allTagsData = 
    {
      tags: []
    }; 
  for (let tag in allTags) {
    allTagsData.tags.push(
      {
        tag: tag,
        className: calculateTagsClass(allTags[tag], tagsParams)
      });
  }
  tagList.innerHTML = templates.tagCloudLink(allTagsData);
  console.log('allTagsData', allTagsData);
  console.log('tagList.innerHTML',tagList.innerHTML);
};

const tagClickHandler = function(event){
  event.preventDefault();
  const clickedElement = this;
  const href = clickedElement.getAttribute('href');
  const tag = href.replace('#tag-', '');
  const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  for(let activeTagLink of activeTagLinks){
    activeTagLink.classList.remove('active');
  }
  const allTagLinksSameHref = document.querySelectorAll('a[href="' + href + '"]');
  for (let tagLink of allTagLinksSameHref) {
    tagLink.classList.add('active');
  }
  generateTitleLinks('[data-tags~="' + tag + '"]');
  markArticleTitleActive();
};

const addClickListenersToTags = function(){
  const tagsLinks = document.querySelectorAll('.list-horizontal a, .list.tags a');
  for(let tagLink of tagsLinks){
    tagLink.addEventListener('click', tagClickHandler);
  }
};

const calculateAuthorsParams = function(authors){
  const params = 
  {
    max : 0,
    min : 999999
  };
  for(let author in authors){
    if(params.max < authors[author]){
      params.max = authors[author];
    }
    else if (params.min > authors[author]){
      params.min = authors[author];
    }
  }
  return params;
};

const calculateAuthorsClass = function(count, params){
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor ( percentage * (opts.CloudClassCount - 1) + 1);
  return opts.CloudClassPrefix + classNumber;
};

const generateAuthors = function(){
  const allAuthors = {};
  const articles = document.querySelectorAll(opts.ArticleSelector);
  for(let article of articles){
    const authorWrapper = article.querySelector('.post-author');
    const articleAuthor = article.getAttribute('data-author');
    const linkHTMLData = 
    {
      id: 'author-' + articleAuthor, 
      title: articleAuthor
    };
    const linkHTML = templates.articleLink(linkHTMLData);
    // eslint-disable-next-line no-prototype-builtins
    if (!allAuthors.hasOwnProperty(articleAuthor)){
      allAuthors[articleAuthor] = 1;
    }
    else {
      allAuthors[articleAuthor]++;
    }
    authorWrapper.innerHTML = linkHTML;  
  }
  console.log('allAuthors', allAuthors);
  const authorsList = document.querySelector(opts.AuthorsListSelector);
  const authorsParams = calculateAuthorsParams(allAuthors);
  const allAuthorsData = 
    {
      authors: []
    }; 
  for(let articleAuthor in allAuthors){
    allAuthorsData.authors.push(
      {
        author: articleAuthor,
        className: calculateAuthorsClass(allAuthors[articleAuthor], authorsParams)
      });
  }
  authorsList.innerHTML = templates.authorCloudLink(allAuthorsData);
  console.log('allAuthorsData:', allAuthorsData);
  console.log('authorsList.innerHTML:', authorsList.innerHTML);
};

const authorClickHandler = function(event) {
  event.preventDefault();
  const clickedElement = this;
  const href = clickedElement.getAttribute('href');
  const tag = href.replace('#author-', '');
  
  generateTitleLinks('[data-author="' + tag + '"]');
  markArticleTitleActive();
};

const addClickListenersToAuthors = function() {
  const authorsLinks = document.querySelectorAll(opts.ArticleAuthorSelector, '.list.authors a');
  for(let authorLink of authorsLinks)
    authorLink.addEventListener('click', authorClickHandler); 
};

clearLinks();
generateTags();
addClickListenersToTags();
generateAuthors();
addClickListenersToAuthors();