class ApplicationController < ActionController::API
  include ActionController::HttpAuthentication::Token::ControllerMethods
  helper_method :current_user
  before_action :verify_authentication

  def verify_authentication
    unless current_user
      render json: {error: "You don't have permission to access these resources"}, status: :unauthorized
    end
  end


  protected

  def current_user
    @current_user ||= authenticate_with_http_token do |token, options|
      User.find_by_api_token(token)
    end
  end
end