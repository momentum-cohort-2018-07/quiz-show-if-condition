json.links do
  json.self api_quiz_path(quiz)
  if quiz.published? && !question
    json.score api_quiz_score_path(quiz)
  end
end
json.data do
  json.id quiz.id
  json.attributes do
    json.title quiz.title
    json.published quiz.published
  end
  if !quiz.published?
    json.relationships do
      json.questions do
        json.array! quiz.questions.sort_by(&:id) do |question|
          json.data question, :id, :text
          json.links do
            json.self api_quiz_question_path(quiz, question)
          end
        end
      end
    end
  elsif question
    json.relationships do
      json.questions do
        json.partial! 'api/questions/question', question: question
      end
    end
  end
end