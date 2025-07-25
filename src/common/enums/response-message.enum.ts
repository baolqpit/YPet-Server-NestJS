export enum ResponseMessage {
  // Auth
  REGISTER_SUCCESS = 'Đăng ký thành công',
  LOGIN_SUCCESS = 'Đăng nhập thành công',
  TOKEN_VALID = 'Token hợp lệ',
  NEW_ACCESS_TOKEN = 'Token mới được cập nhật',

  // User
  USER_CREATED = 'Người dùng đã được tạo',
  USER_FOUND = 'Tìm thấy người dùng',
  USER_NOT_FOUND = 'Không tìm thấy người dùng',

  //Newsfeed
  NEWSFEED_CREATED = 'Tạo bài viết thành công',
  GET_NEWSFEED_SUCCESS = 'Lấy danh sách bài viết thành công',
  UPDATED_NEWSFEED_SUCCESS = 'Cập nhật bài viết thành công',
  ALREADY_LIKED = 'Đã thích bài viết',
  LIKED = 'Thích bài viết thành công',
  UNLIKED = 'Bỏ thích bài viết thành công',
  POST_STATUS = 'Trạng thái bài viết',

  //Pet
  PET_CREATED = 'Tạo thú cưng thành công',
  GET_PETS_SUCCESS = 'Lấy danh sách thú cưng thành công',

  // General
  SUCCESS = 'Thành công',
  FAILED = 'Thất bại',
}
