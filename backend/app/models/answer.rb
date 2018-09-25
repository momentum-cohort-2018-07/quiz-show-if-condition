class Answer < ApplicationRecord
  belongs_to :question
  validates :text, presence: true
  after_initialize :init

  def init
    self.correct ||= false 
  end  

  def correct?
    correct
  end
end
