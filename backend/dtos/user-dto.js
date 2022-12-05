module.exports = class UserDto{
    email;
    id;
    bio;  

    constructor(model) {
        this.email = model.email;
        this.id = model._id;        
        this.bio = model.bio;        
    }
}