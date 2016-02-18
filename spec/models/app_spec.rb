require 'rails_helper'

describe App do
  it { should validate_presence_of(:name) }
  it { should validate_presence_of(:url) }
  it { should allow_value("http://www.fun.com").for(:url) }
  it { should_not allow_value("invalidurl").for(:url) }
end
