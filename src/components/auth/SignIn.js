import React, {useState,useEffect} from 'react';
import {useDispatch} from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {loginAction} from '../../actions/AuthAction';
// import {addressInfoAction} from '../../actions/WalletAction';
// import {connect} from 'react-redux';

function Copyright() {
    return   (
        <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://material-ui.com/">
            Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const SignIn = (props) => {
    const classes = useStyles();

    const [id, setId] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();

    // const jwt = () =>
    // {
    //     if(props.isLoggedIn){
    //         dispatch(jwtCheck(localStorage.authorization))
    //         .then(() =>{
    //             props.history.push("/employee")
    //         })
    //         .catch(()=>{
    //             localStorage.clear();
    //         })        
    //     }
    // }

    // useEffect(()=>{
    //     jwt();
    // })

    const onChangeId = (e) => {
      const id = e.target.value;
      setId(id);
    };
  
    const onChangePassword = (e) => {
      const password = e.target.value;
      setPassword(password);
    };

    const onSubmit = (e) => {
        e.preventDefault();

        console.log(id, password);
        // // alert(password);
        dispatch(loginAction(id, password))
        .then((data) => {
            console.log('login ok');
            
            props.history.push('/wallet');
            
            // dispatch(addressInfoAction(token))
            // .then( () => {
            //     props.history.push('/wallet');
            // });
            // .catch( () => {
            //     console.log('get address failed')
            //     alert('get address failed');
            // })
        })
        .catch((error) => {
            console.log('login failed')
            alert('login failed');
            alert(error);
        })
    }

    return (
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
            <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
            Sign in
            </Typography>
            <form className={classes.form} noValidate>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={id}
                onChange={onChangeId}
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={onChangePassword}
            />
            <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={onSubmit}
            >
                Sign In
            </Button>
            <Grid container>
                {/* <Grid item xs>
                <Link href="#" variant="body2">
                    Forgot password?
                </Link>
                </Grid> */}
                <Grid item>
                <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                </Link>
                </Grid>
            </Grid>
            </form>
        </div>
        <Box mt={8}>
            <Copyright />
        </Box>
        </Container>
    );
}
// const mapStateToProps = (state) => ({
//     isLoggedIn:state.auth.isLoggedIn,
//     user:state,
// })
// export default connect(
//     mapStateToProps,
// )(SignIn);
export default SignIn;