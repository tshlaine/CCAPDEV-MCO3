import User from "../models/User.js";

const forgotPasswordControl = {
    showForgotPassword(req, res){
        //console.log('showing forgot password');
        res.render("forgot-password");
    },

    async submitForgotPassword(req, res) {
        res.render("forgot-password", {
            errorMessage: 'This additional feature has not been implemented'
        });
    }
}

export default forgotPasswordControl;

