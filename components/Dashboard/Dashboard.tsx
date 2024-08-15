import React from 'react'
import './Dashboard.css';
import { BsThreeDotsVertical } from 'react-icons/bs'
import { FaClock } from 'react-icons/fa'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { PiLineVerticalLight } from 'react-icons/pi'
import { TfiReload } from 'react-icons/tfi'
import CardList from '../CardList/CardList';

const Dashboard = () => {
  return (
    <div>
    <div className="dashboard">
      <span className="title">CNAPP Dashboard</span>
        <div className='buttons'>
        <button>Add Widget +</button>
        <button><TfiReload /></button>
        <button><BsThreeDotsVertical /></button>
        <button><FaClock /><PiLineVerticalLight />Last 2 days <MdKeyboardArrowDown /></button>
      </div>
    </div>
    <div>
      <h5 className='card-heading'>CSPM Executive Dashboard</h5>
      <CardList />
    </div>
    </div>
  )
}

export default Dashboard