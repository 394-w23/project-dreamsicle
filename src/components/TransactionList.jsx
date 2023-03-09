import { useEffect, useState } from 'react';
import { useParams, Link } from "react-router-dom";
import Restaurant from './Restaurant';
import logo from '../logo.svg';
import Header from './Header';
import Navbar from './Navbar';
import { tags } from '../utils/helper';
import FilterItem from './FilterItem';
import TimeFilter from './TimeFilter';
import SizeFilter from './SizeFilter';
import { FaFilter } from "@react-icons/all-files/Fa/FaFilter"
import { Button, NumberInput, Text, Title, TextInput } from '@mantine/core';
import FilterSelector from './FilterSelector';
import Onboard from './Onboard';
import { useFilterStore } from '../store/filterStore';
import { typeOfDrawer } from './FilterDrawer';
import { DatePicker, TimeInput } from '@mantine/dates';
import moment from 'moment';
import Transaction from './Transaction';


const TransactionList = ({ transactions, restaurants }) => {

    return (
        <div>
            <Header />

            <Title style={{color: "black"}}>Orders</Title>
            <div className='transaction-list'>
                {transactions.length > 0
                    ? transactions.sort((x, y) => (new Date(y.datetime))-new Date(x.datetime)).map((transaction, index) => <Transaction key={transaction.id} recent={index === 0} transaction={transaction} restaurant={restaurants[transaction.restaurant]} />)
                    : <div style={{ marginTop: 100 }}>
                        <Title align='center'>No Order History</Title>
                    </div>
                }
            </div>

            <Navbar />
        </div>
    );

}

export default TransactionList;
