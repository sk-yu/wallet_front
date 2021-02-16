import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
// import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Divider from '@material-ui/core/Divider';

import Asset from './tabs/TabsAsset';
import Transfer from './tabs/TabsTrasfer';
import History from './tabs/TabsHistory';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	tabs:{
		// backgroundColor: theme.palette.background.paper,
		// background: "blue"
		// backgroundColor: "#8888ff"
		// backgroundColor: "primary.main",
	}
}));

export default function WalletTabs() {
	const classes = useStyles();
	const [tablValue, setTabValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		// console.log(`tabs value:${tablValue} newValue:${newValue}`);
		setTabValue(newValue);
	};

	// <Paper className={classes.root}></Paper>
	// <AppBar position="static">
	return (
		<Paper className={classes.root} elevation={4}>
			<Tabs className={classes.tabs}
				value={tablValue}
				onChange={handleChange}
				indicatorColor="primary"
				// textColor="text.primary"
				centered
				variant="fullWidth"
			>
				<Tab variant="h1" label="자산보기" />
				<Tab label="전송하기" />
				<Tab label="기록보기" />

			</Tabs>
			<Divider />

			<Asset tablValue={tablValue} index={0}>
			</Asset>
			<Transfer tablValue={tablValue} index={1}>
			</Transfer>
			<History tablValue={tablValue} index={2}>
			</History>


		</Paper>
		
	);
}