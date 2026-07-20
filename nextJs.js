// ================================
// concept.js — search functionality for "react concepts" page
// ================================

// Search function called from button: onclick="searching()"
function searching() {
  const input = document.getElementById('searchInput');
  const query = input.value.trim().toLowerCase();

  const topicsCard   = document.querySelector('.topics-card');
  const questionCards = document.querySelectorAll('.question-card');
  const answerCards   = document.querySelectorAll('.answer-card');
  const exampleCards  = document.querySelectorAll('.example1-card');

  let matchCount = 0;

  for (let i = 0; i < questionCards.length; i++) {
    const qPara = questionCards[i].querySelector('p');
    const qText = qPara ? qPara.textContent.toLowerCase() : '';

    // empty search box -> show everything
    const isMatch = (query === '') || qText.includes(query);

    // question, answer, example teeno saath saath show/hide honge
    questionCards[i].style.display = isMatch ? 'block' : 'none';
    if (answerCards[i])  answerCards[i].style.display  = isMatch ? 'block' : 'none';
    if (exampleCards[i]) exampleCards[i].style.display = isMatch ? 'block' : 'none';

    // sirf un questions ko count karo jinme actual text hai (khaali "Q:" wale skip)
    if (isMatch && qText.replace('q:', '').trim() !== '') {
      matchCount++;
    }
  }

  // topics list sirf tab dikhao jab search box khaali ho
  if (topicsCard) {
    topicsCard.style.display = (query === '') ? 'block' : 'none';
  }

  showNoResultMessage(matchCount, query);

  // search ke baad input clear kar do
  input.value = '';
}

// "no results" message ko dynamically handle karta hai
function showNoResultMessage(matchCount, query) {
  let msg = document.getElementById('noResultMsg');

  if (matchCount === 0 && query !== '') {
    if (!msg) {
      msg = document.createElement('h2');
      msg.id = 'noResultMsg';
      msg.textContent = '❌ No matching topic found';
      msg.style.textAlign = 'center';
      msg.style.margin = '30px 0';

      const container = document.querySelector('.container');
      const topicsCard = document.querySelector('.topics-card');
      container.insertBefore(msg, topicsCard.nextSibling);
    }
    msg.style.display = 'block';
  } else if (msg) {
    msg.style.display = 'none';
  }
}

// Enter key se bhi search ho jaye
document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('searchInput');
  if (input) {
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        searching();
      }
    });
  }

  // Bonus: Topics list ke kisi bhi li pe click karne se uska matching question search ho jaye
  const topicItems = document.querySelectorAll('.topics-card ul li');
  topicItems.forEach((li) => {
    li.style.cursor = 'pointer';
    li.addEventListener('click', () => {
      const text = li.textContent.replace(/^\d+\.\s*/, '').trim();
      const input = document.getElementById('searchInput');
      input.value = text;
      searching();
    });
  });
});