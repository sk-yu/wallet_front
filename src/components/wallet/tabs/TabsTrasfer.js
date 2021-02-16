import React, {useState} from 'react';
import { useSelector, useDispatch } from "react-redux";
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';

import WalletService from '../../../services/WalletService';
import {walletInfoAction} from '../../../actions/WalletAction';

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
	// const stateToken = useSelector((state) => state.auth.token);
	const stateAssets = useSelector((state) => state.wallet.assets);
	const stateSelected = useSelector((state) => state.wallet.selectAddress);

	const [address, setAddress] = useState('');
	const [amount, setAmount] = useState('');
	const [passphase, setPassphase] = useState('');
	const [asset, setAsset] = useState('ETH');

	const dispatch = useDispatch();
	
	const onChangeAddress = (e) => {
		const address = e.target.value;
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

	const onChangeAsset = (e) => {
		const tmp = e.target.value;
		setAsset(tmp);
	}

	const onSendTransfer = (e) => {
		e.preventDefault();
		console.log('onSendTransfer');
		// dispatch(walletInfoAction(stateSelected));
		// return;

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
			if(asset === 'ETH') {
				WalletService.transfer( {
					'from':stateSelected,
					'to':address,
					'amount':amount,
					'passphase':passphase
				})
				.then( res => {
					console.log(res);
					if(res.result === true) {
						dispatch(walletInfoAction(stateSelected));
						alert('전송완료');
						//todo : txhistory 다시 가져오기
						
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
			else {
				const tokenAsset = stateAssets.find(stateasset=> stateasset.symbol===asset );
				if(tokenAsset === undefined) {
					alert('not found asset');
					return;
				}

				WalletService.transferToken( {
					'from':stateSelected,
					'to':address,
					'tokenaddress':tokenAsset.token,
					'amount':amount,
					'passphase':passphase
				})
				.then( res => {
					console.log(res);
					if(res.result === true) {
						dispatch(walletInfoAction(stateSelected));
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
			<TextField className={classes.text} fullWidth variant="outlined" label="자산" name="asset" select value={asset} onChange={onChangeAsset} >
				{stateAssets!==null&&stateAssets.map(asset => {
					return (
						<MenuItem key={asset.symbol} value={asset.symbol}>{asset.symbol}</MenuItem>
					)
				})}
			</TextField>
			<TextField className={classes.text} fullWidth variant="outlined" label="주소" type="text" name="address" value={address} onChange={onChangeAddress}/>
			<TextField className={classes.text} fullWidth variant="outlined" label="수량" type="text" name="amount" value={amount} onChange={onChangeAmount} />
			<TextField className={classes.text} fullWidth variant="outlined" label="2차비밀번호" type="password" name="passphase" value={passphase} onChange={onChangePassPhase} />
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