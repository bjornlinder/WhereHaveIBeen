class App < ActiveRecord::Base
  validates :name, presence: true
  validates :url, presence: true
  validates :url, format: { with: URI.regexp }
end
