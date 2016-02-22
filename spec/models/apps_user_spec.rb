require 'rails_helper'

describe AppsUser do
  it { should belong_to :app }
  it { should belong_to :user }
end
