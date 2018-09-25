class API::ResponsesController < ApplicationController
  def create
    @quiz = Quiz.find(params[:quiz_id])
    @question = Question.find_by(quiz_id: @quiz.id, number: params[:question_id]) || Question.find_by(quiz_id: @quiz.id, id: params[:question_id])
    @submitted_answer = Answer.find_by(question_id: @question.id, id: answer_params[:answer_id])
    @previous_response = Response.find_by(user_id: current_user.id, quiz_id: @quiz.id, question_id: @question.id)

    if @quiz.not_published?
      render json: {error: "Cannot take an unpublished quiz"}, status: :unauthorized
    elsif @previous_response
      render json: {error: "Cannot answer the same question twice"}, status: :unauthorized
    elsif !@submitted_answer
      render json: {error: "Must submit a valid answer the question"}, status: :unprocessable_entity
    else
      @response = Response.new(user_id: current_user.id,
                               question_id: @question.id,
                               quiz_id: @quiz.id,
                               correct: @submitted_answer.correct?,
                               answer_id: @submitted_answer.id)
      if @response.save
        render json: @response, status: :created
      else
        render json: @response.errors, status: :unprocessable_entity
      end
    end
  end

  private

  def answer_params
    params.permit(:answer_id)
  end
end
