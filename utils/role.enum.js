const ROLE = {
	ADMIN: "ADMIN",
	CUSTOMER: "CUSTOMER",
	MANAGER: "MANAGER",
	SENSOR: "SENSOR",
};

const PERMISSIONS = { ADMIN: 4, MANAGER: 2, SENSOR: 1, CUSTOMER: 1 };

const MENU_BY_ROLE = {
	ADMIN: [
		{ name: "Tổng Quan", link: "/admin" },
		{ name: "Chi Nhánh", link: "/admin/branches" },
		{ name: "Người Dùng", link: "/admin/users" },
		{ name: "Thực đơn", link: "/admin/menu" },
		{ name: "Đơn Hàng", link: "/admin/orders" },
	],
	CUSTOMER: [
		{
			name: "Hoạt Động",
			link: "/user/orders",
		},
		{
			name: "Ưu Đãi",
			link: "/vouchers",
		},
	],
	MANAGER: [
		{ name: "Tổng quan", link: "/admin" },
		{ name: "Đơn Hàng", link: "/admin/orders" },
	],
};

module.exports = { ROLE, PERMISSIONS, MENU_BY_ROLE };