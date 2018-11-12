create database BanHang


Create table admin(username varchar(30) primary key,
password varchar(32), status bit default 1)

create table HangSanXuat(hid int primary key identity(1,1),
hname nvarchar(30),website varchar(100), status bit default 1)

Create table SanPham(sid varchar(30) primary key,
sname nvarchar(50) not null,
quantity int, price money,picture varchar(200), description nvarchar(max), status int default 1,
hid int foreign key references Hangsanxuat(hid))

Create table KhachHang(cid int primary key identity(1,1),
cname nvarchar(50), address nvarchar(50), phone varchar(20),username varchar(30) unique, password varchar(32),status bit default 1)

insert into KhachHang(cname,address,phone,username,password,status) 
values('Hai','Hanoi','0988312832','haihn','hai123',1)

create table HoaDon(hid varchar(30) primary key, date datetime default getdate(),
cid int foreign key references Khachhang(cid),Rcname nvarchar(50), Raddress nvarchar(50), Rphone varchar(20),
total money, status int default 1)

Create table HoaDonChiTiet(
hid varchar(30) foreign key references HoaDon(hid),
sid varchar(30) foreign key references SanPham(sid),
quantity int, price money, primary key(hid,sid))

insert into admin values('admin','admin',1)
select * from admin
insert into HangSanXuat VALUES('Apple','apple.com',1)
insert into HangSanXuat VALUES('Sam sung','samsung.com',1)
select * from KhachHang
select Max(total) as MaxTotal from HoaDon