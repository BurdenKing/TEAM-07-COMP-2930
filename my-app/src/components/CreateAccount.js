import React, {Component} from 'react';
import FormEntry from './FormEntry';



class CreateAccount extends Component {

    formbutton = {
        fontSize:'24px',
        padding: '10px 20px'
    }    

    render() {
        return (
            <form>
                <h1>Create your ParkAway Account!</h1>
                <p>
                    <FormEntry description="Username" name="username" placeholder="Username"/>
                    <FormEntry description="Password" name="password" placeholder="Password"/>
                    <FormEntry description="Confirm Password" name="confirmpassword" placeholder="Confirm Password"/>
                    <FormEntry description="First name" name="firstname" placeholder="Mickey"/>
                    <FormEntry description="Last name" name="lastname" placeholder="Mouse"/>
                    <input style={this.formbutton} type="submit" value="Submit"/>
                </p>
            </form>
        );
    }
}

export default CreateAccount;