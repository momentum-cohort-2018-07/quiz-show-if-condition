json.links do
  if !question.number.nil?
    json.self api_quiz_question_path(question.quiz, question.number)
    if question.number < question.quiz.questions.count
      json.next api_quiz_question_path(question.quiz, question.number + 1)
    else
      json.score api_quiz_score_path(question.quiz)
    end
    json.response api_quiz_question_responses_path(question.quiz, question.number)
  else
    json.self api_quiz_question_path(question.quiz, question.id)
  end
end
json.data do
  json.id question.id
  json.attributes do
    json.text question.text
    if !question.number.nil?
      json.number question.number
      json.total question.quiz.questions.count
    end
  end
  json.relationships do
    json.answers do
      json.array! question.answers.shuffle do |answer|
        # json.partial! 'api/answers/answer', answer: answer
        json.data answer, :id, :text
      end     
    end
  end
end