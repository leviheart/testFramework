let specialText = "";
function checkSpecialKey(str) {
    if (str === null || str === undefined || str === "") return true;
    const specialKey = `1`;
    for (let i = 0; i < str.length; i++) {
        if (specialKey.indexOf(str.substr(i, 1)) !== -1) {
            specialText = str.substr(i, 1);
            return false;
        }
    }
    specialText = "";
    return true;
}

// 特殊字符交验
export function validateSpecialKey(rule, value, callback) {
    if (!checkSpecialKey(value)) {
        callback(new Error(`不能输入特殊字符 ${specialText}`));
    } else {
        callback();
    }
}