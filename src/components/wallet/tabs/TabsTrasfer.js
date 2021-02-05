import React, {useState} from 'react';
import { useSelector } from "react-redux";
import Typography from '@material-ui/core/Typography';
// import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';

import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import WalletService from '../../../services/WalletService';

const useStyles = makeStyles((theme) => ({
	root: {
		textAlign: 'center',
	},
	menu: {
		marginTop: theme.spacing(5),
		maxWidth: 800,
		display: 'inline-block',
		// justifyContent: 'center',
		// flexDirection: 'column',
		// textAlign: 'center',
		// marginLeft: 18,
		// marginRight: 18,
		// paddingRight: theme.spacing(5),
	},
	text: {
		marginBottom: theme.spacing(2)

	},
}));
export default function Transfer(props) {
	const { tablValue, index } = props;
	const classes = useStyles();
	const stateToken = useSelector((state) => state.auth.token);

	const [address, setAddress] = useState("");
	const [amount, setAmount] = useState("");
	const [passphase, setPassphase] = useState("");
	
	
	const onChangeAddress = (e) => {
		const address = e.target.value;
		// console.log(e.target)
		// console.log(e.taget.value);
		// const value = e.taget.value;
		
		
		setAddress(address);
	}

	const onChangeAmount = (e) => {
		const tmp = e.target.value;
		setAmount(tmp);
	}

	const onChangePassPhase = (e) => {
		const tmp = e.target.value;
		setPassphase(tmp);
	}

	const onSendTransfer = (e) => {
		e.preventDefault();

		if(address === '') {
			alert('주소를 입력해주세요');
		}
		else if( amount === '') {
			alert('수량을 입력해주세요');
		}
		else if( passphase === '') {
			alert('2차 비밀번호를 입력해주세요');
		}
		else {
			console.log('call getBalance');
			WalletService.transfer(stateToken, {
				'to':address,
				'amount':amount,
				'passphase':passphase
			})
			.then( res => {
				console.log(res);
				if(res.result === true) {
					alert('전송완료');
				}
				else {
					alert('전송실패');
				}
				
			})
			.catch(err => {
				console.log(err);
				alert('전송오류');
			});
		}
	}


	// <Box p={3}>
	// <Typography>전송하기</Typography>
	// </Box>

    return (
		<div
		role="tabpanel"
		hidden={tablValue !== index}
		className={classes.root}
		>
		{tablValue === index && (
			<div className={classes.menu}>
			<TextField className={classes.text} fullWidth variant="outlined" label="주소" type="text" name="address" value={address} onChange={onChangeAddress}/>
			<TextField className={classes.text} fullWidth variant="outlined" label="수량" type="text" name="amount" value={amount} onChange={onChangeAmount} />
			<TextField className={classes.text} fullWidth variant="outlined" label="2차비밀번호" type="text" name="passphase" value={passphase} onChange={onChangePassPhase} />
			<Button className={classes.text} fullWidth variant="contained" color="primary" onClick={onSendTransfer}>전송하기</Button>
			</div>
		)}
		</div>
    );
}

Transfer.propTypes = {
	index: PropTypes.any.isRequired,
	tablValue: PropTypes.any.isRequired,
};