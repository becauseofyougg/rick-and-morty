module.exports = class UserDto{
    id;
    email;
    bio;  

    constructor(model) {
        this.id = model._id;
        this.email = model.email;
        this.bio = model.bio;        
    }
}