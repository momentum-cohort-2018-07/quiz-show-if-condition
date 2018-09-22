class API::SessionsController < ApplicationController
  skip_before_action :verify_authentication

  def create
    user = User.find_by_username(params[:username])

    if user && user.authenticate(params[:password])
      render json: {token: user.token, admin: user.admin}, status: :ok
    else
      render json: {error: "Invalid token"}, status: :unauthorized
    end
  end

end
