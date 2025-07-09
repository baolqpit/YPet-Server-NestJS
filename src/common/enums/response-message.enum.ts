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


  // General
  SUCCESS = 'Thành công',
  FAILED = 'Thất bại',
}
