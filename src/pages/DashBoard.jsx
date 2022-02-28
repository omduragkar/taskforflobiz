import {  HStack, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Edit from '../components/Edit'
import Items from '../components/Items'
import Nav from '../components/Nav'
import { GlobalContext } from '../context/ContextUser'

function Dashboard() {
  
  const history = useNavigate();
  const {state} = GlobalContext(); 
  const [data, setData] = useState(localStorage.getItem("datarr")?JSON.parse(localStorage.getItem("datarr")):[]);
  const [find, setFind] = useState("");
  useEffect(()=>{
    if(state.user == undefined)
    {
      history("/");
    }
  },[history, state.user])
  return (
    <VStack m={"5"}>
      <Nav/>
      <HStack w={"100%"}>
        <Items data={data} setFind={setFind} />
        <Edit data={data} setData={setData} find={find} setFind={setFind}/>
      </HStack>

    </VStack>

  )
}

export default Dashboard