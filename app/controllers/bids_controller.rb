class BidsController < ApplicationController
  before_action :is_admin
  
  def index
    bids = Bid.all
    render json: bids
  end

  def show
    render json: bid
  end

  def create
    new_bid = Bid.create!(bid_params)
    render json: new_bid, status: 201
  end

  def update
    bid.update!(bid_params)
    render json: bid, status: 202
  end

  def destroy
    bid.destroy!
    head 204
  end


  private

  def bid_params
    params.permit(:amount, :cost_code, :project_id, :subcontractor_id)
  end

  def bid
    Bid.find(params[:id])
  end

end
