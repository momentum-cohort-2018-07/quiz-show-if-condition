json.data do
  json.id answer.id
  json.attributes do
    json.text answer.text
    json.correct answer.correct
  end
end