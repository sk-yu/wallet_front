import React, {useState} from 'react';
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

import AuthService from '../../services/AuthService';

function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
		{'Copyright © '}
		<Link color="inherit" href="https://github.com/sk-yu/wallet_front">
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
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

export default function SignUp() {
	const classes = useStyles();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [passPhase, setPAssPhase] = useState('');

	const onSubmit = async (e) => {
		e.preventDefault();

		try{
			const res = await AuthService.signup(email, password, passPhase);

			if(res.data.result === true) {
				alert('signup success');
			}
			else {
				alert(res.error);
			}
		}
		catch(error) {
			alert(error.msg);
		}

	}

	const onChangeEmail = (e) => {
		setEmail(e.target.value);
	}

	const onChangePassword = (e) => {
		setPassword(e.target.value);
	}

 	const onChangePassPhase = (e) => {
		 setPAssPhase(e.target.value);
	 }
 
	return (
		<Container component="main" maxWidth="xs">
		<CssBaseline />
		<div className={classes.paper}>
			<Avatar className={classes.avatar}>
			<LockOutlinedIcon />
			</Avatar>
			<Typography component="h1" variant="h5">
			Sign up
			</Typography>
			<form className={classes.form} noValidate>
			<Grid container spacing={2}>
				<Grid item xs={12}>
				<TextField
					variant="outlined"
					required
					fullWidth
					id="email"
					label="Email Address"
					name="email"
					autoComplete="email"
					value={email}
					onChange={onChangeEmail}
				/>
				</Grid>
				<Grid item xs={12}>
				<TextField
					variant="outlined"
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
				</Grid>
				<Grid item xs={12}>
				<TextField
					variant="outlined"
					required
					fullWidth
					name="passphase"
					label="PassPhase"
					type="password"
					id="passphase"
					autoComplete="passphase"
					value={passPhase}
					onChange={onChangePassPhase}
				/>
				</Grid>
				<Grid item xs={12}>
				<FormControlLabel
					control={<Checkbox value="allowExtraEmails" color="primary" />}
					label="I want to receive inspiration, marketing promotions and updates via email."
				/>
				</Grid>
			</Grid>
			<Button
				type="submit"
				fullWidth
				variant="contained"
				color="primary"
				className={classes.submit}
				onClick={onSubmit}
			>
				Sign Up
			</Button>
			<Grid container justify="flex-end">
				<Grid item>
				<Link href="/signin" variant="body2">
					Already have an account? Sign in
				</Link>
				</Grid>
			</Grid>
			</form>
		</div>
		<Box mt={5}>
			<Copyright />
		</Box>
		</Container>
	);
}