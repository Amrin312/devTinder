const validateEditProfile = (data) => {
    const allowed_field = ['firstName', 'lastName', 'age', 'email', 'gender'];

    const check_allowed_fields = Object.keys(data).every(k => {
        return allowed_field.includes(k);
    });

    if(!check_allowed_fields) throw new Error("You cannot add extra fields!");

    return true
}



module.exports = {
    validateEditProfile
}