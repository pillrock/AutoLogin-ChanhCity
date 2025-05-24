# Tài liệu API

Tài liệu này mô tả các API RESTful để quản lý **Người dùng (Users)**, **Hồ sơ (Profiles)**, **Bài đăng (Posts)**, và **Hướng dẫn (Tutorials)** trong ứng dụng.  
Tất cả các endpoint sử dụng JSON cho request body và response.  
Xác thực được xử lý qua các header:

- `x-admin` cho quyền admin
- `x-user-id` cho các thao tác liên quan đến người dùng cụ thể

---

## URL Cơ sở

```
/api
```

---

## Xác thực

- **Quyền Admin:** Gửi header `x-admin: true`. Chỉ admin mới có thể truy cập một số endpoint (ví dụ: tạo/xóa người dùng).
- **Quyền Người dùng:** Gửi header `x-user-id` để xác định người dùng thực hiện thao tác, dùng cho các hành động như cập nhật/xóa bài đăng, hướng dẫn hoặc hồ sơ của chính họ.

---

## 1. API Người dùng (Users)

### 1.1. Tạo người dùng

- **Phương thức:** `POST`
- **Đường dẫn:** `/api/users`
- **Quyền:** Admin (`x-admin: true`)
- **Body:**
  ```json
  {
    "name": "string",
    "email": "string",
    "IDDevice": "string",
    "isAdmin": "boolean"
  }
  ```
- **Response thành công (200):**
  ```json
  {
    "id": 1,
    "name": "Nguyen Van A",
    "email": "user@example.com",
    "IDDevice": "device123",
    "isAdmin": false,
    "createdAt": "...",
    "updatedAt": "..."
  }
  ```
- **Response lỗi (400):**
  ```json
  { "error": "Email already exists" }
  ```

### 1.2. Cập nhật người dùng

- **Phương thức:** `PUT`
- **Đường dẫn:** `/api/users/:id`
- **Quyền:** Admin (`x-admin: true`)
- **Body:** như trên

### 1.3. Xóa người dùng

- **Phương thức:** `DELETE`
- **Đường dẫn:** `/api/users/:id`
- **Quyền:** Admin (`x-admin: true`)

### 1.4. Lấy tất cả người dùng

- **Phương thức:** `GET`
- **Đường dẫn:** `/api/users`
- **Quyền:** Admin (`x-admin: true`)

### 1.5. Lấy người dùng theo ID

- **Phương thức:** `GET`
- **Đường dẫn:** `/api/users/:id`
- **Quyền:** Admin (`x-admin: true`)

### 1.6. Kiểm tra người dùng

- **Phương thức:** `GET`
- **Đường dẫn:** `/api/users/check`
- **Quyền:** Công khai
- **Query:** `email` hoặc `IDDevice`

---

## 2. API Hồ sơ (Profiles)

### 2.1. Tạo hồ sơ

- **Phương thức:** `POST`
- **Đường dẫn:** `/api/profiles`
- **Quyền:** Người dùng đã xác thực (`x-user-id`)
- **Body:**
  ```json
  {
    "fullName": "string",
    "CCCD": "string",
    "phone": "string",
    "userId": "number"
  }
  ```
- **Lưu ý:** Không truyền `roleTag` khi tạo hồ sơ. Gán vai trò dùng API riêng.

---

### 2.2. Cập nhật hồ sơ

- **Phương thức:** `PUT`
- **Đường dẫn:** `/api/profiles/:userId`
- **Quyền:** Chủ sở hữu (`x-user-id` trùng `userId`) hoặc Admin (`x-admin: true`)
- **Body:**
  ```json
  {
    "fullName": "string",
    "CCCD": "string",
    "phone": "string"
  }
  ```
- **Lưu ý:** Không truyền `roleTag` khi cập nhật hồ sơ.

---

### 2.3. Lấy hồ sơ theo userId

- **Phương thức:** `GET`
- **Đường dẫn:** `/api/profiles/:userId`
- **Quyền:** Công khai

---

### 2.4. Xóa hồ sơ

- **Phương thức:** `DELETE`
- **Đường dẫn:** `/api/profiles/:userId`
- **Quyền:** Admin (`x-admin: true`)

---

## 3. API Bài đăng (Posts)

### 3.1. Tạo bài đăng

- **Phương thức:** `POST`
- **Đường dẫn:** `/api/posts`
- **Quyền:** Người dùng đã xác thực (`x-user-id`)

### 3.2. Cập nhật bài đăng

- **Phương thức:** `PUT`
- **Đường dẫn:** `/api/posts/:id`
- **Quyền:** Chủ sở hữu (`x-user-id` trùng `userId` của bài đăng) hoặc Admin (`x-admin: true`)

### 3.3. Xóa bài đăng

- **Phương thức:** `DELETE`
- **Đường dẫn:** `/api/posts/:id`
- **Quyền:** Chủ sở hữu hoặc Admin

### 3.4. Lấy tất cả bài đăng

- **Phương thức:** `GET`
- **Đường dẫn:** `/api/posts`
- **Quyền:** Công khai

### 3.5. Lấy bài đăng theo ID

- **Phương thức:** `GET`
- **Đường dẫn:** `/api/posts/:id`
- **Quyền:** Công khai

---

## 4. API Hướng dẫn (Tutorials)

### 4.1. Tạo hướng dẫn

- **Phương thức:** `POST`
- **Đường dẫn:** `/api/tutorials`
- **Quyền:** Người dùng đã xác thực (`x-user-id`)

### 4.2. Cập nhật hướng dẫn

- **Phương thức:** `PUT`
- **Đường dẫn:** `/api/tutorials/:id`
- **Quyền:** Tác giả (`x-user-id` trùng `authorId`) hoặc Admin (`x-admin: true`)

### 4.3. Xóa hướng dẫn

- **Phương thức:** `DELETE`
- **Đường dẫn:** `/api/tutorials/:id`
- **Quyền:** Tác giả hoặc Admin

### 4.4. Lấy tất cả hướng dẫn

- **Phương thức:** `GET`
- **Đường dẫn:** `/api/tutorials`
- **Quyền:** Công khai

### 4.5. Lấy hướng dẫn theo ID

- **Phương thức:** `GET`
- **Đường dẫn:** `/api/tutorials/:id`
- **Quyền:** Công khai

---

## 5. API Vai trò (Roles) & Gán/Xóa vai trò cho Profile

### 5.1. Tạo vai trò

- **Phương thức:** `POST`
- **Đường dẫn:** `/api/roles`
- **Quyền:** Admin (`x-admin: true`)
- **Body:**
  ```json
  {
    "name": "string"
  }
  ```

### 5.2. Lấy tất cả vai trò

- **Phương thức:** `GET`
- **Đường dẫn:** `/api/roles`
- **Quyền:** Công khai

### 5.3. Xóa vai trò

- **Phương thức:** `DELETE`
- **Đường dẫn:** `/api/roles/:id`
- **Quyền:** Admin (`x-admin: true`)

### 5.4. Gán vai trò cho profile

- **Phương thức:** `POST`
- **Đường dẫn:** `/api/roles/assign`
- **Quyền:** Chủ sở hữu hoặc Admin
- **Body:**
  ```json
  {
    "email": "user@example.com",
    "roleId": 1
  }
  ```

### 5.5. Xóa vai trò khỏi profile

- **Phương thức:** `POST`
- **Đường dẫn:** `/api/roles/remove`
- **Quyền:** Chủ sở hữu hoặc Admin
- **Body:**
  ```json
  {
    "email": "user@example.com",
    "roleId": 1
  }
  ```

### 5.6. Lấy tất cả vai trò của một profile

- **Phương thức:** `GET`
- **Đường dẫn:** `/api/roles/:userId`
- **Quyền:** Công khai
- **Response:**
  ```json
  [
    { "id": 1, "name": "chu_tich_nuoc" },
    { "id": 2, "name": "dev" }
  ]
  ```

---

## Lưu ý

- **Định dạng ngày giờ:** Các trường `createdAt` và `updatedAt` sử dụng định dạng ISO 8601.
- **Enum:**

  - `PostType`: `cap_nhat`, `su_kien`, `bao_tri`, `huong_dan`

- **Xử lý lỗi:** Các lỗi thường trả về mã trạng thái 400 (dữ liệu không hợp lệ) hoặc 404 (không tìm thấy tài nguyên).
- **Xác thực:** Các API yêu cầu quyền admin hoặc chủ sở hữu cần gửi đúng header `x-admin` hoặc `x-user-id`. Trong môi trường thực tế, nên sử dụng JWT hoặc cơ chế xác thực an toàn hơn.
