class ApplicationController < ActionController::API
  include ActionController::Cookies

  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found
  rescue_from ActiveRecord::RecordInvalid, with: :render_invalid_message
  rescue_from ActiveRecord::RecordNotUnique, with: :render_not_unique

  def current_user
    User.find_by(id: session[:current_user])
  end

  def is_authenticated
    render json: { error: "User Not Authenticated" }, status: :unauthorized unless current_user
  end

  def is_admin
    render json: { error: "Administrative permissions required. Contact company admin for assistance." }, status: :unauthorized unless current_user && current_user.admin
  end

  def sign_in_error
    render json: { error: "Not Signed In" }, status: 401
  end

  private

  def render_not_found(error)
    render json: { error: error }, status: 404
  end

  def render_invalid_message(invalid)
    render json: { error: invalid.record.errors.full_messages }, status: 422
  end

  def render_not_unique(error)
    render json: { error: 'Bid already exists for this subcontractor' }, status: 406
  end

end
