'use strict';

const pageResults = require('graph-results-pager');

const { Promise } = require('bluebird')

const { graphAPIEndpoints } = require('./constants')

const sushi = require('./queries/sushi');
const blocks = require('./queries/blocks');
const exchange = require('./queries/exchange');
const masterchef = require('./queries/masterchef');
const bar = require('./queries/bar')
const maker = require('./queries/maker')
const timelock =  require('./queries/timelock');

module.exports = {
	pageResults,
	graphAPIEndpoints,
	sushi,
	blocks,
	exchange,
	masterchef,
	bar,
	maker,
	timelock,
	async timeseries({blocks = undefined, timestamps = undefined, target = undefined} = {}, targetArguments) {
		if(!target) { throw new Error("sushi-data: Target function undefined"); }
		if(!blocks && !timestamps) { throw new Error("sushi-data: Timeframe undefined"); }

		if(blocks) {
			return Promise.map(blocks, async (block) => ({
				block,
				data: await target({block, ...targetArguments})
			}));
		}

		else {
			return Promise.map(timestamps, async (timestamp) => ({
				timestamp,
				data: await target({timestamp, ...targetArguments})
			}));
		}
	},
};
