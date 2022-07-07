class FallbackController < ApplicationController
  def index
    render file: 'public/index.html'
  rescue
    render json: { error: 'Heres the error' }
  end

end