exports.seed = function(knex, Promise) {
  return knex.raw('DELETE FROM "question"; ALTER SEQUENCE question_id_seq RESTART WITH 3;')
    .then(function() {
      var questions = [{
        id: 1,
        category: 'JavaScript',
        question_title: 'what are primitive data types?',
        answer: 'boolean, number'
      }, {
        id: 2,
        category: 'CSS',
        question_title: 'what does CSS stand for?',
        answer: 'cascading style sheets'
      }];
      return knex('question').insert(questions);
    });
};
