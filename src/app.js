/**
 * Entry application.
 * Serves app routes and login-related functions.
 */

import './css/main.scss'
import {route} from './router.js'
import home from './templates/home.html'
import success from './templates/success.html'
import e404 from './templates/404.html'

/**
 * Tries to obtain access token from API (tries to login user).
 * @param username          User name / login.
 * @param password          User password.
 * @returns {Promise<any>}  JSON object with login information.
 */
const loginUser = async (username, password) => {
    // Post data using the Fetch API
    const apiLoginUrl = 'https://mszan-zadanie-zzt.netlify.app/api/login'
    const result = await fetch(apiLoginUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
            'username': username,
            'password': password
        })
    })
    return result.json()
}

/**
 * Removes token from localStorage (logouts user).
 */
const logoutUser = () => {return localStorage.removeItem('token')}

/**
 * Checks whether token is set in localStorage (is logged or not).
 * @returns {boolean}
 */
const isUserLogged = () => {
    return !!localStorage.getItem('token');
}

// Entry page where user can log in.
route('/', 'home', home, function() {
    const route = this
    this.formHeader = 'Login form' // Form header.
    this.formMsg = '&nbsp'         // Form login status message.
    this.formMsgClass = ''          // Form login status message class.

    // Add listener on form submit button.
    this.$on('#loginForm', 'submit', e =>{
        // Prevent default submit.
        e.preventDefault()

        // Disable button until data is fetched.
        e.submitter.disabled = true

        // Get form fields data.
        const username = document.getElementById('username').value
        const password = document.getElementById('password').value

        // Check if input fields are filled.
        if ((username !== '' && username) && (password !== '' && password)) {
            // Check if user login is succeeded.
            loginUser(username, password)
                .then(res => {
                    // If login succeeded: display message, set token in localStorage and redirect to success page.
                    if(res.message === 'Login success!'){
                        route.formMsgClass = 'formMsg--Success'
                        route.formMsg = 'Success!'
                        route.$refresh()
                        localStorage.setItem('token', res.token)
                        window.location.href = '#/success'
                        // If login failed, display message.
                    } else {
                        route.formMsgClass = 'formMsg--Error'
                        route.formMsg = 'Login failed.'
                        route.$refresh()
                    }
                })
            // If input fields are empty, display message.
        } else {
            route.formMsgClass = 'formMsg--Warning'
            route.formMsg = 'Missing required fields.'
            route.$refresh()
        }

        // Enable button back.
        setTimeout(() => e.submitter.disabled = false, 2000)
    })
})

// Success page where user gets redirected upon login.
// In order to view this page, user need to be logged in.
route('/success', 'success', success, function () {
    // Redirect to home if user is not logged in.
    if (!isUserLogged()) {
        window.location.href = ''
    } else {
        this.title = 'Hi there!'
        this.subTitle = 'You are logged in.'

        // Add listener to logout button.
        this.$on('.logoutBtn', 'click', () => {
            logoutUser() // Logout user.
            window.location.href = '' // Redirect to home page.
        })
    }
})

// Every other page that didn't match.
route('*', '404', e404, function () {
    this.title = '404 Not Found'
    this.subTitle = 'Page not found.'
})
