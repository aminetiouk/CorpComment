// GLOBAL
const MAX_CHARS = 150;
const BASE_API_URL = 'https://bytegrad.com/course-assets/js/1/api';

const textareaEl = document.querySelector('.form_textarea');
const counterEl = document.querySelector('.counter');
const formEl = document.querySelector('.form');
const feedbackListEl = document.querySelector('.feedbacks');
const submitBtnEl = document.querySelector('.submit-btn');
const hashtagListEl = document.querySelector('.hashtags');


const renderFeedbackItem = feedbackItem => {
  // new feedback item HTML
  const feedbackItemHTML = `
      <li class="feedback">
          <button class="upvote">
              <i class="fa-solid fa-caret-up upvote__icon"></i>
              <span class="upvote__count">${feedbackItem.upvoteCount}</span>
          </button>
          <section class="feedback__badge">
              <p class="feedback__letter">${feedbackItem.badgeLetter}</p>
          </section>
          <div class="feedback__content">
              <p class="feedback__company">${feedbackItem.company}</p>
              <p class="feedback__text">${feedbackItem.text}</p>
          </div>
          <p class="feedback__date">${feedbackItem.daysAgo === 0 ? 'NEW' : `${feedbackItem.daysAgo}d`}</p>
      </li>
  `;

  // insert new feedback item in list
  feedbackListEl.insertAdjacentHTML('beforeend', feedbackItemHTML);
};

// COUNTER COMPONENT
(() => {
  const inputHandler = () => {
    // determine maximum number of characters
    const maxNrChars = MAX_CHARS;

    // determine number of characters currently typed
    const nrCharsTyped = textareaEl.value.length;

    // calculate number of characters left (maximum minus currently typed)
    const charsLeft = maxNrChars - nrCharsTyped;

    // show number of characters left
    counterEl.textContent = charsLeft;
  };

  textareaEl.addEventListener('input', inputHandler);
})();