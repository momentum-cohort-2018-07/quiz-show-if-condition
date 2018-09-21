class API::SessionsController < ApplicationController
  skip_before_action :verify_authentication

  def create
    user = User.find_by_username(params[:username])

    if user && user.authenticate(params[:password])
      render json: {token: user.token}
    else
      render json: {error: "Invalid"}, status: :unauthorized
    end
  end

end
