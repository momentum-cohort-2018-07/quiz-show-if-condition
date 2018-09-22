class User < ApplicationRecord
  has_secure_token
  has_secure_password
  has_many :scores, dependent: :destroy
  has_many :quizzes, dependent: :destroy
  has_many :responses, dependent: :destroy
  validates :username, presence: true, uniqueness: true
  after_initialize :init

  def init
    self.admin ||= false 
  end

end
