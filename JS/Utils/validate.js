export const nameRegex= /^[A-Z][a-z]{2,}$/;
export const emailRegex=/^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/;
export const passwordRegex = /^\S{6,}$/;
export const titleRegex = /^[A-Za-z\s]{3,}$/;
export const descriptionRegex = /^.{5,}$/;

export function validation(element, regex, options = { hideClass: "d-none" }) {
    const { hideClass } = options;

    // إزالة أي حالة قديمة
    element.classList.remove("is-valid", "is-invalid");
    if (element.nextElementSibling) {
        element.nextElementSibling.classList.add(hideClass);
    }

    // التحقق من القيمة
    if (regex.test(element.value)) {
        element.classList.add("is-valid");
        return true;
    } else {
        element.classList.add("is-invalid");
        if (element.nextElementSibling) {
            element.nextElementSibling.classList.remove(hideClass);
        }
        return false;
    }
}
