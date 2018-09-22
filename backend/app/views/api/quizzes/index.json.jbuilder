json.array! @quizzes do |quiz|
  json.extract! quiz, :id, :title
end