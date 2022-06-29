class ApplicationController < ActionController::API
  include ActionController::Cookies

  rescue_from ActionController::RecordNotFound, with: :render_not_found
  rescue_from ActionController::RecordInvalid, with: :render_invalid_message

  def current_user
    current_user = User.find_by(id: session[:user_id])
    if current_user
      render json: current_user
    else
      render json: { error: "Not logged in"}, status: :not_found
    end
  end

  def is_authorized
    render json: { error: "Not Authorized" }, status: :unauthorized unless current_user
  end

  def is_admin
    render json: { error: "Administrative permissions required. Contact company admin for assistance." }, status: :unauthorized unless current_user.admin
  end
  

  private

  def render_not_found(error)
    render json: { error: error }, status: :not_found
  end

  def render_invalid(invalid)
    render json: { error: invalid.record.errors.full_messages }, status: :unprocessable_entity
  end

end
