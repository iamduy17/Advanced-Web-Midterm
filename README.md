# **Advanced Web Midterm**

<p align="left">
<img src="https://img.shields.io/badge/version-1.0.0-blue">
<img src="https://img.shields.io/badge/node.js-v16.13.2-orange.svg">
<img src="https://img.shields.io/badge/react-v18.2.0-gree.svg">
<img src="https://img.shields.io/badge/postgresql-v4-yellow.svg">
</p>

## **Mục lục**
### [Thông tin nhóm](#team)
### [Yêu cầu chương trình](#require)
### [Cách chạy chương trình](#run)  
### [Chức năng đã thực hiện](#done)  
### [Chức năng chưa thực hiện](#notdone)  
### [Các đường dẫn liên quan](#link)
### [Điểm số mong muốn](#score)
### [Video demo](#video)

## **Thông tin nhóm** <a name="team"></a>
|       Họ và tên      |   MSSV   | Email                           | Công việc | 
|----------------------|:--------:|---------------------------------|------- | 
| Thới Hải Đức         | 19120483 | 19120483@student.hcmus.edu.vn   |+ Tạo group.</br> + Hiển thị danh sách các group do user tạo hoặc tham gia. </br> + Hiển thị danh   sách thành viên và người tạo trong group. </br> + Phân quyền owner, co-owner, member cho group đó.
| Đỗ Thái Duy          | 19120492 | 19120492@student.hcmus.edu.vn   |+ Xử lý authentication: Register, Login, Logout. </br> + Kích hoạt tài khoản vừa tạo qua email. </br> + Tích hợp đăng nhập bằng Google. </br> + Deploy ứng dụng. </br> + Viết tài liệu đánh giá và các chức năng đã thực hiện.
| Dương Nam            | 19120593 | 19120593@student.hcmus.edu.vn   | + Tạo link tham gia group và xử lý việc tham gia thông qua nhấn link. </br> + Gửi lời mời vào group bằng email. </br> + Quản lý hồ sơ người dùng. </br> + Quay video demo.

## **Yêu cầu chương trình** <a name="require"></a>
- Cài đặt Node.js.
- Cài đặt Visual Studio Code (hoặc các IDE khác).
- Cài đặt ứng dụng Postgresql.
## **Cách chạy chương trình** <a name="run"></a>
### Cách chạy chương trình FE:
```bash
  1. cd Source\FE

  2. npm config set legacy-peer-deps true

  3. npm install

  4. npm start
```
### Cách chạy chương trình BE:
```bash
  1. cd Source\BE

  2. npm install

  3. Tạo database trong Postgresql với file midterm.sql

  4. Điền tên database vừa tạo cùng password vào object cn trong file db.js 

  5. npm start
``` 
## **Chức năng đã thực hiện** <a name="done"></a>
- Xử lý authentication: Register, Login, Logout.  _(+1 điểm)_
- Kích hoạt tài khoản vừa tạo qua email. _(+1 điểm)_
- Tích hợp đăng nhập bằng Google. _(+1 điểm)_
- Tạo group. _(+0.5 điểm)_
- Hiển thị danh sách các group do user tạo hoặc tham gia. _(+1 điểm)_
- Hiển thị danh sách thành viên và người tạo trong group. _(+1 điểm)_
- Phân quyền owner, co-owner, member cho group đó. _(+1 điểm)_
- Tạo link tham gia group và xử lý việc tham gia thông qua nhấn link. _(+1 điểm)_
- Gửi lời mời vào group bằng email. _(+1 điểm)_
- Quản lý hồ sơ người dùng. _(+0.5 điểm)_
- Upload to public host. _(+1 điểm)_
- UI/UX: phù hợp các tiêu chuẩn cơ bản. _(-0 điểm)_
- Làm việc nhóm, chia việc và commit các công việc được phân chia trên git. _(-0 điểm)_

## **Chức năng chưa thực hiện** <a name="notdone"></a>
- Không có.

## **Các đường dẫn liên quan** <a name="link"></a>
### Link github: <https://github.com/iamduy17/Advanced-Web-Midterm>
### Link deploy:
- Deploy FE: <https://advanced-web-midterm-fe.netlify.app/>
- Deploy BE: <https://advanced-web-midterm-be.onrender.com/> 

## **Điểm số mong muốn** <a name="score"></a>
- Thới Hải Đức - 19120483: **10 điểm**.
- Đỗ Thái Duy - 19120492: **10 điểm**.
- Dương Nam - 19120593: **10 điểm**.

## **Video demo** <a name="video"></a>
* [Youtube Demo Advanced Web Midterm](https://youtu.be/eiN43c1CJ40)