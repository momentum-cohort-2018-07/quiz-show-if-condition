# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'csv'

user = User.new
user.username = 'admin'
user.email = 'admin@condition.com'
user.password = 'admin'
user.admin = true
user.save


user = User.new
user.username = 'user'
user.email = 'user@other.com'
user.password = 'user'
user.save


CSV.foreach('sample/quizzes.csv', headers: true) do |row|
  Quiz.create(row.to_h)
end

CSV.foreach('sample/questions.csv', headers: true) do |row|
  Question.create(row.to_h)
end

CSV.foreach('sample/answers.csv', headers: true) do |row|
  Answer.create(row.to_h)
end