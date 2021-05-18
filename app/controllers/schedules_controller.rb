class SchedulesController < ApplicationController
  before_action :set_schedule, only: [:new, :create, :show, :edit, :update, :destroy]

  def index
    @food_cart = FoodCart.find(params[:food_cart_id])
    @schedules = policy_scope(@food_cart.schedules)
  end

  def show
    @food_cart = FoodCart.find(params[:id])
    @schedule = @food_cart.schedule
  end

  def new
    @food_cart = FoodCart.find(params[:food_cart_id])
    @schedule = Schedule.new

    authorize @schedule
  end

  def create
    @food_cart = FoodCart.find(params[:food_cart_id])
    @schedule = Schedule.new(schedule_params)
    @schedule.food_cart = @food_cart
    authorize @schedule

    @user = current_user

    if @schedule.save
      redirect_to food_cart_path(@food_cart)
    else
      render 'schedule/new'
    end
  end

  def edit
    @food_cart = FoodCart.find(params[:food_cart_id])
    authorize @schedule
    @user = current_user
  end

  def update
    @schedule = Schedule.find(params[:id])
    @schedule.update(schedule_params)
    authorize @schedule
    @user = current_user
    redirect_to food_cart_schedules(@schedule)
  end

  def destroy
    @schedule = Schedule.find(params[:id])
    @schedule.destroy
    redirect_to schedule_path
  end

  private
  def schedule_params
    params.require(:schedule).permit(:location, :date, :start_time, :end_time)
  end

  def set_schedule
    @food_cart = FoodCart.find(params[:food_cart_id])
    @schedule = @food_cart.schedules
    authorize @schedule
  end
end
