json.links do
  json.self api_quiz_url(quiz)
end
json.data do
  json.id quiz.id
  json.attributes do
    json.title quiz.title
    json.published quiz.published
  end
  json.relationships do
    json.questions do
      json.array! quiz.questions do |question|
        json.data question, :id, :text
        json.links do
          json.self api_quiz_question_path(quiz, question)
        end
      end
    end
  end
end