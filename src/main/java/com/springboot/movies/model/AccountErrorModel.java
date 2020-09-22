package com.springboot.movies.model;

public class AccountErrorModel {
    Boolean state = true;
    String emailError;
    String usernameError;

    public String getEmailError() {
        return emailError;
    }

    public void setEmailError(String emailError) {
        this.emailError = emailError;
    }

    public String getUsernameError() {
        return usernameError;
    }

    public void setUsernameError(String usernameError) {
        this.usernameError = usernameError;
    }

    public Boolean getState() {
        return state;
    }

    public void setState(Boolean state) {
        this.state = state;
    }
}
