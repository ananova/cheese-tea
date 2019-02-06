class UploadController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    signer = Aws::S3::Presigner.new
    render json: {
      presigned_url: signer.presigned_url(
        :put_object,
        bucket: ENV['S3_BUCKET'],
        key: params[:name],
      )
    }
  end
end
