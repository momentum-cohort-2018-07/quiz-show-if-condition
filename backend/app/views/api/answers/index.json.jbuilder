json.array! @answers do |answer|
  json.extract! answer, :id, :text, :correct
end