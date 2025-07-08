export enum ResponseError {
  // Auth
  INVALID_CREDENTIALS = 'Tài khoản hoặc mật khẩu không đúng',
  TOKEN_EXPIRED = 'Token đã hết hạn',
  TOKEN_INVALID = 'Token không hợp lệ',
  REFRESH_TOKEN_INVALID = 'Refresh Token hết hạn hoặc không hợp lệ',

  // User
  EMAIL_ALREADY_EXISTS = 'Email đã tồn tại',
  USER_NOT_FOUND = 'Không tìm thấy người dùng',

  // General
  INTERNAL_SERVER_ERROR = 'Lỗi máy chủ nội bộ',
  BAD_REQUEST = 'Yêu cầu không hợp lệ',
  FORBIDDEN = 'Không có quyền truy cập',
}
