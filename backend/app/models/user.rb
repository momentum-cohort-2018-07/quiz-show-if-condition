class User < ApplicationRecord
  has_secure_token
  has_secure_password
  has_many :scores
  has_many :quizzes
  validates :username, presence: true, uniqueness: true
  after_initialize :init

  def init
    self.admin ||= false 
  end

end
