#!/usr/bin/env node

const chalk = require('chalk');
const axios = require('axios');
const ora = require('ora');
const Table = require('cli-table3');
const logSymbols = require('log-symbols');

const table = new Table({
    head: [chalk.whiteBright('Confirmed Cases'), chalk.greenBright('Recovered Cases'), chalk.redBright('Death Cases'), chalk.whiteBright('Per million case'), chalk.whiteBright('Per million deceased')],
    colWidths: [20, 20]
});

try {
    var countryCode = process.argv[2];
    countryCode = countryCode.toLowerCase();
    const spinner = ora('Loading covid19 data...').start();
    setTimeout(() => {
        spinner.color = 'yellow';
        spinner.text = 'Done';
    }, 1000);
    axios.get(`https://corona.lmao.ninja/countries/${countryCode}`)
        .then((response) => {
            var countryCovidData = response.data;
            table.push([countryCovidData.cases, countryCovidData.recovered,countryCovidData.deaths, countryCovidData.casesPerOneMillion, countryCovidData.deathsPerOneMillion ]);
            spinner.stop();
            console.log(table.toString());
            console.log(chalk.greenBright(logSymbols.success, 'Please star this repo https://github.com/codeforgeek/covid19'));
        })
        .catch((error) => {
            console.log(error);
        });
}
catch(e) {
    console.log(chalk.red('Invalid country code'));
}