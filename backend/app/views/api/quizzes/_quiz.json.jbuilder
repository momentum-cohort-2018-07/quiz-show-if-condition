json.links do
  json.self api_quiz_path(quiz)
end
json.data do
  json.id quiz.id
  json.attributes do
    json.title quiz.title
    json.published quiz.published
  end
  json.relationships do
    if !quiz.published
      json.questions do
        json.array! quiz.questions.sort_by(&:id) do |question|
          json.data question, :id, :text
          json.links do
            json.self api_quiz_question_path(quiz, question)
          end
        end
      end
    else
      json.partial! 'api/questions/question', question: question
    end
  end
end