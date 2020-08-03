"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersDTOtoUsersConvertor = void 0;
function UsersDTOtoUsersConvertor(udto) {
    return {
        user_id: udto.user_id,
        username: udto.username,
        password: udto.password,
        first_name: udto.first_name,
        last_name: udto.last_name,
        email: udto.email,
        role: udto.role,
        image: udto.image
    };
}
exports.UsersDTOtoUsersConvertor = UsersDTOtoUsersConvertor;
//# sourceMappingURL=UsersDTOConvertors.js.map