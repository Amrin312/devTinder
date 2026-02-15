const validateEditProfile = (data) => {
    const allowed_field = ['firstName', 'lastName', 'age', 'gender', 'skills', 'bio', 'about', 'photoUrl'];

    const check_allowed_fields = Object.keys(data).every(k => {
        console.log(k);
        
        return allowed_field.includes(k);
    });

    if(!check_allowed_fields) throw new Error("You cannot add extra fields!");

    return true
}



module.exports = {
    validateEditProfile
}