class App < ActiveRecord::Base
  validates :name, presence: true
  validates :url, presence: true
  validates :url, format: { with: URI.regexp }

  has_many :apps_user
  has_many :users, through: :apps_user
end
