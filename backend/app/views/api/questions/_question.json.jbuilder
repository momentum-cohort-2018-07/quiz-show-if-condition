json.links do
  if !question.number.nil?
    json.self api_quiz_question_url(question.quiz, question.number)
    if question.number < question.quiz.questions.count
      json.next api_quiz_question_url(question.quiz, question.number + 1)
    end
  else
    json.self api_quiz_question_url(question.quiz, question.id)
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