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
      json.array! quiz.questions.sort_by(&:number) do |question|
        # json.partial! 'api/questions/question', question: question
        json.data question, :id, :text, :number
        json.links do
          if question.number.nil?
            json.self api_quiz_question_path(quiz, question)
          else
            json.self api_quiz_question_path(quiz, question.number)
          end
        end
      end
    end
  end
end