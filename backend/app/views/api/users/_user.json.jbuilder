json.links do
  json.self api_user_url(user)
end
json.data do
  json.id user.id
  json.attributes do
    json.username user.username
    json.quizzes user.quizzes.count
  end
  json.relationships do
    json.quizzes do
      json.array! user.quizzes do |quiz|
        json.data quiz, :id, :title
        json.links do
          json.self api_quiz_path(quiz)
        end
      end
    end
  end
end