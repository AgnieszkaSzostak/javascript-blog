// 'use strict';
const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
  authorCloudLink: Handlebars.compile(document.querySelector('#template-author-cloud-link').innerHTML)
};

const opts = {
  selector : {
    list : {
      titles : '.titles',
      tags : '.tags.list',
      authors : '.list.authors',
    },
    article :
    { tags : '.post-tags .list',
      author : '.post-author a',
      title : '.post-title',
      content : '.post',
    }
  },
  cloud : {
    class : {
      count : 4,
      prefix : 'tag-size-'
    }
  }
};

const markArticleTitleActive = function(){
  const activeArticle = document.querySelector(opts.selector.article.content +'.active');
  const activeArticleId = activeArticle.getAttribute('id');
  const titleList = document.querySelector(opts.selector.list.titles);
  const selectedArticleTitle = titleList.querySelector('a[href="#' + activeArticleId + '"]');
  if (selectedArticleTitle === null) {
    const firstTitle = document.querySelector('.list.titles a');
    firstTitle.classList.add('active');
    activeArticle.classList.remove('active');
    const firstTitleId = firstTitle.getAttribute('href');
    const activatedArticle = document.querySelector(firstTitleId);
    activatedArticle.classList.add('active');
  } else {
    selectedArticleTitle.classList.add('active');
  }
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
  const titleList = document.querySelector(opts.selector.list.titles);
  titleList.innerHTML = '';
  generateTitleLinks();
};

const generateTitleLinks = function(customSelector = ''){
  const articles = document.querySelectorAll(opts.selector.article.content + customSelector);
  const titleList = document.querySelector(opts.selector.list.titles);
  let html = '';
  for(let article of articles) {
    const articleId = article.getAttribute('id');
    const articleTitle = article.querySelector(opts.selector.article.title).innerHTML;
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
  const classNumber = Math.floor ( percentage * (opts.cloud.class.count - 1) + 1);
  return opts.cloud.class.prefix + classNumber;
};

const generateTags = function(){
  const allTags = {};
  const articles = document.querySelectorAll(opts.selector.article.content);
  for(let article of articles){
    const tagsWrapper = article.querySelector(opts.selector.article.tags);
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
  const tagList = document.querySelector(opts.selector.list.tags);
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
  const classNumber = Math.floor ( percentage * (opts.cloud.class.count - 1) + 1);
  return opts.cloud.class.prefix + classNumber;
};

const generateAuthors = function(){
  const allAuthors = {};
  const articles = document.querySelectorAll(opts.selector.article.content);
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
  const authorsList = document.querySelector(opts.selector.list.authors);
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
  const authorsLinks = document.querySelectorAll('.post-author a, .authors.list a');
  for(let authorLink of authorsLinks)
    authorLink.addEventListener('click', authorClickHandler);
};

clearLinks();
generateTags();
addClickListenersToTags();
generateAuthors();
addClickListenersToAuthors();
