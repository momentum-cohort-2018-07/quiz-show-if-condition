json.array! @questions do |question|
  json.extract! question, :id, :text, :number
end