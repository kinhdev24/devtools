export type RegexPreset = {
	id: string;
	nameEn: string;
	nameVi: string;
	pattern: string;
	testCases: string[];
};

export const REGEX_PRESETS: RegexPreset[] = [
	{
		id: "email",
		nameEn: "Email Address",
		nameVi: "Địa chỉ Email",
		pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
		testCases: ["user@example.com", "first.last@domain.co.uk", "invalid.email@.com"],
	},
	{
		id: "url",
		nameEn: "URL / Website",
		nameVi: "Đường dẫn URL",
		pattern: "^(https?:\\/\\/)?([\\da-z\\.-]+)\\.([a-z\\.]{2,6})([\\/\\w \\.-]*)*\\/?$",
		testCases: ["https://example.com/path", "http://sub.domain.co", "invalid-url"],
	},
	{
		id: "ipv4",
		nameEn: "IPv4 Address",
		nameVi: "Địa chỉ IPv4",
		pattern: "^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$",
		testCases: ["192.168.1.1", "255.255.255.0", "256.0.0.1", "1.2.3.4"],
	},
	{
		id: "ipv6",
		nameEn: "IPv6 Address",
		nameVi: "Địa chỉ IPv6",
		pattern: "^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$",
		testCases: ["2001:0db8:85a3:0000:0000:8a2e:0370:7334", "::1", "127.0.0.1"],
	},
	{
		id: "mac_address",
		nameEn: "MAC Address",
		nameVi: "Địa chỉ MAC",
		pattern: "^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$",
		testCases: ["00:1B:44:11:3A:B7", "00-1B-44-11-3A-B7", "001B44113AB7"],
	},
	{
		id: "hex_color",
		nameEn: "Hex Color",
		nameVi: "Mã màu Hex",
		pattern: "^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$",
		testCases: ["#FF5733", "fff", "#1234", "blue"],
	},
	{
		id: "username",
		nameEn: "Username (3-16 chars)",
		nameVi: "Tên đăng nhập (3-16 ký tự)",
		pattern: "^[a-z0-9_-]{3,16}$",
		testCases: ["johndoe", "user_123", "a", "too_long_username_here"],
	},
	{
		id: "password_strong",
		nameEn: "Strong Password",
		nameVi: "Mật khẩu mạnh",
		pattern: "^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$",
		testCases: ["StrongP@ssw0rd", "weakpass", "NoSpecialChar123"],
	},
	{
		id: "phone_intl",
		nameEn: "Intl. Phone Number",
		nameVi: "Số điện thoại quốc tế",
		pattern: "^\\+(?:[0-9] ?){6,14}[0-9]$",
		testCases: ["+1 123 456 7890", "+84987654321", "0987654321"],
	},
	{
		id: "phone_vn",
		nameEn: "Vietnam Phone Number",
		nameVi: "Số điện thoại Việt Nam",
		pattern: "^(0|\\+84)(3|5|7|8|9)[0-9]{8}$",
		testCases: ["0912345678", "+84312345678", "0241234567"],
	},
	{
		id: "date_yyyy_mm_dd",
		nameEn: "Date (YYYY-MM-DD)",
		nameVi: "Ngày (YYYY-MM-DD)",
		pattern: "^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$",
		testCases: ["2024-01-31", "2024-13-01", "24-01-01"],
	},
	{
		id: "date_dd_mm_yyyy",
		nameEn: "Date (DD/MM/YYYY)",
		nameVi: "Ngày (DD/MM/YYYY)",
		pattern: "^(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[0-2])/\\d{4}$",
		testCases: ["31/12/2024", "12-31-2024", "32/01/2024"],
	},
	{
		id: "time_24h",
		nameEn: "Time (24 Hour)",
		nameVi: "Thời gian (24 giờ)",
		pattern: "^([01]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$",
		testCases: ["14:30", "23:59:59", "25:00", "8:5"],
	},
	{
		id: "html_tag",
		nameEn: "HTML Tag",
		nameVi: "Thẻ HTML",
		pattern: "^<([a-z]+)([^<]+)*(?:>(.*)<\\/\\1>|\\s+\\/>)$",
		testCases: ["<div class=\"test\">content</div>", "<img src=\"test.jpg\" />", "<invalid>"],
	},
	{
		id: "uuid",
		nameEn: "UUID / GUID",
		nameVi: "UUID / GUID",
		pattern: "^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$",
		testCases: ["123e4567-e89b-12d3-a456-426614174000", "invalid-uuid-string"],
	},
	{
		id: "slug",
		nameEn: "URL Slug",
		nameVi: "URL Slug",
		pattern: "^[a-z0-9]+(?:-[a-z0-9]+)*$",
		testCases: ["my-awesome-post-123", "Invalid_Slug", "another--invalid"],
	},
	{
		id: "jwt",
		nameEn: "JWT Token",
		nameVi: "Token JWT",
		pattern: "^[A-Za-z0-9-_]+\\.[A-Za-z0-9-_]+\\.[A-Za-z0-9-_]*$",
		testCases: ["eyJhbGciOiJIUzI1NiIsInR5cCI.eyJzdWIiOiIxMjM0NTY3ODkw.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c", "invalid.jwt.token.format"],
	},
	{
		id: "base64",
		nameEn: "Base64 String",
		nameVi: "Chuỗi Base64",
		pattern: "^(?:[A-Za-z0-9+\\/]{4})*(?:[A-Za-z0-9+\\/]{2}==|[A-Za-z0-9+\\/]{3}=)?$",
		testCases: ["SGVsbG8gV29ybGQ=", "aW52YWxpZA==", "invalid_base64!"],
	},
	{
		id: "credit_card",
		nameEn: "Credit Card (Basic)",
		nameVi: "Thẻ Tín dụng (Cơ bản)",
		pattern: "^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\\d{3})\\d{11})$",
		testCases: ["4123456789012345", "invalid-card-number"],
	},
	{
		id: "ssn",
		nameEn: "Social Security Number (US)",
		nameVi: "Số SSN (Mỹ)",
		pattern: "^(?!000|666)[0-8][0-9]{2}-(?!00)[0-9]{2}-(?!0000)[0-9]{4}$",
		testCases: ["123-45-6789", "000-12-3456", "999-99-9999"],
	},
];
