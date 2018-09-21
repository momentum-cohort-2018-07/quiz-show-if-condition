class API::QuizzesController < ApplicationController
  skip_before_action :verify_authentication, only: [:index]
  before_action :set_quiz, only: [:show, :update, :destroy]

  def index
    @quizzes = Quiz.where('published = ?', true)
  end

  def show
  end

  def create
    if !logged_in?
      render json: {error: "Must be logged in to create a quiz"}, status: :unauthorized
    elsif !current_user.admin
      render json: {error: "Must be an admin to create a quiz"}, status: :unauthorized
    else
      @quiz = Quiz.new(title: quiz_params[:title], user_id: current_user.id)
      if @quiz.save
        render :show, status: :created, location: api_question_url(@quiz)
      else
        render json: @quiz.errors, status: :unprocessable_entity
      end
    end
  end

  def update
    if current_user.id != @user.id
      render json: {error: "Must be the owner to update this quiz"}, status: :unauthorized
    else
      if @quiz.update(quiz_params)
        render :show, status: :updated, location: api_quiz_url(@quiz)
      else
        render json: @quiz.errors, status: :unprocessable_entity
      end
    end
  end

  def publish
    @quiz = Quiz.find(params[:quiz_id])
    @user = @quiz.user
    if current_user.id != @user.id
      render json: {error: "Must be the owner to publish this quiz"}, status: :unauthorized
    else
      if @quiz.update(published: true)
        render :show, status: :updated, location: api_quiz_url(@quiz)
      else
        render json: @quiz.errors, status: :unprocessable_entity
      end
    end
  end


  def destroy
    if current_user.id != @user.id
      render json: {error: "Must be the owner to delete this quiz"}, status: :unauthorized
    elsif @quiz.published
      render json: {error: "Cannot delete a published quiz"}, status: :unauthorized
    else
      @quiz.destroy
    end
  end

  private

  def quiz_params
    params.permit(:title)
  end

  def set_quiz
    @quiz = Quiz.find(params[:id])
    @user = @quiz.user
  end

end
