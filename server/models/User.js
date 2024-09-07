class User {
    constructor(id, first_name, last_name, middle_name, email, password) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.middle_name = middle_name;
        this.email = email;
        this.password = password;
    }
}

module.exports = User;
