class API::ScoresController < ApplicationController
  def create
    @quiz = Quiz.find(params[:quiz_id])
    @responses = Response.where({user_id: current_user.id, quiz_id: @quiz.id})
    @number_correct = @responses.sum('CASE WHEN "responses"."correct" THEN 1 ELSE 0 END')
    if @responses.count != @quiz.questions.count
      render json: {error: "Cannot score an unfinished quiz"}, status: :unauthorized
    elsif !@quiz.published
      render json: {error: "Cannot score an unpublished quiz"}, status: :unauthorized
    else
      @score = Score.new(user_id: current_user.id, quiz_id: @quiz.id, number_correct: @number_correct, number_asked: @responses.count)
      if @score.save
        @responses.destroy_all
        render json: @score, status: :created
      else
        render json: @score.errors, status: :unprocessable_entity
      end
    end
  end
end
