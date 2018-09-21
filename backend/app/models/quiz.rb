class Quiz < ApplicationRecord
  belongs_to :user
  has_many :questions, dependent: :destroy
  has_many :scores, dependent: :destroy
  validates :title, presence: true
  after_initialize :init

  def init
    self.published ||= false 
  end    
end
