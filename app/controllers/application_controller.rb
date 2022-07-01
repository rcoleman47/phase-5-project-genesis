class ApplicationController < ActionController::API
  include ActionController::Cookies

  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found
  rescue_from ActiveRecord::RecordInvalid, with: :render_invalid_message

  def current_user
    User.find_by(id: session[:current_user])
  end

  def is_authenticated
    render json: { error: "User Not Authenticated" }, status: :unauthorized unless current_user
  end

  def is_admin
    render json: { error: "Administrative permissions required. Contact company admin for assistance." }, status: :unauthorized unless current_user.admin
  end
  

  private

  def render_not_found(error)
    render json: { error: error }, status: :not_found
  end

  def render_invalid_message(invalid)
    render json: { error: invalid.record.errors.full_messages }, status: :unprocessable_entity
  end

end
