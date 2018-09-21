class Quiz < ApplicationRecord
  belongs_to :user
  has_many :questions
  validates :title, presence: true
  after_initialize :init

  def init
    self.published ||= false 
  end    
end
