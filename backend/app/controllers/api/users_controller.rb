class API::UsersController < ApplicationController
  before_action :set_user, only: [:show, :update, :destroy]
  skip_before_action :verify_authentication, only: [:create]

  def index
    @users = User.all

  end

  def show
  end

  def profile
    @user = current_user
  end

  def admin_profile
    @user = current_user
  end

  def create
    @user = User.new(user_params)

    if @user.save
      render json: @user, status: :created
    else
      render json: @user.errors.map {|field, message| [field, field.to_s.capitalize + ' ' + message]}.to_h, status: :unprocessable_entity
    end
  end

  def update
    if current_user.id != @user.id && !current_user.admin
      render json: {error: "You can't update this user"}, status: :unauthorized
    else
      if @user.update(user_params)
        render :show, status: :updated, location: api_user_url(@user)
      else
        render json: @user.errors.map {|field, message| [field, field + ' ' + message]}.to_h, status: :unprocessable_entity
      end
    end
  end

  def destroy
    if current_user.id != @user.id && !current_user.admin
      render json: {error: "You can't destroy this user"}, status: :unauthorized
    else
      @user.destroy
    end
  end

  private

  def set_user
    @user = User.find(params[:id])
  end

  def user_params
    params.permit(:username, :password)
  end
end


