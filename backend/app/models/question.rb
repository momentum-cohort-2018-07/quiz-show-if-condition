class Question < ApplicationRecord
  belongs_to :quiz
  has_many :answers
  validates :text, presence: true

end
