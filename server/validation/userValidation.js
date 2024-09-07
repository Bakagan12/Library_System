class UserValidation {
    static validateRegistration(data) {
        const errors = [];

        // First Name validation
        if (!data.first_name || data.first_name.trim() === '' || data.middle_name.trim() === '') {
            errors.push({ field: 'first_name', message: 'First name is required' });
        }

        // Last Name validation
        if (!data.last_name || data.last_name.trim() === '') {
            errors.push({ field: 'last_name', message: 'Last name is required' });
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!data.email || !emailRegex.test(data.email)) {
            errors.push({ field: 'email', message: 'Invalid email address' });
        }

        // Password validation
        if (!data.password || data.password.length < 4) {
            errors.push({ field: 'password', message: 'Password must be at least 4 characters long' });
        }

        // Confirm Password validation
        if (data.password !== data.confirm_password) {
            errors.push({ field: 'confirm_password', message: 'Passwords do not match' });
        }

        return errors;
    }

    static validateLogin(data) {
        const errors = [];

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!data.email || !emailRegex.test(data.email)) {
            errors.push({ field: 'email', message: 'Invalid email address' });
        }

        // Password validation
        if (!data.password || data.password.trim() === '') {
            errors.push({ field: 'password', message: 'Password is required' });
        }

        return errors;
    }
}

module.exports = UserValidation;
