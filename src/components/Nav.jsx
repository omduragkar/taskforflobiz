import { Button, HStack, Text } from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { LOGOUT } from '../context/Constants';
import { GlobalContext } from '../context/ContextUser';

function Nav() {
  const history = useNavigate();
  const {state, dispatch} = GlobalContext(); 
  return (
        <HStack justify={"space-between"} w={"100%"}>
            <HStack  me="auto">
                <img style={{"cursor":"pointer"}} src={"https://mybillbook.in/static-assets/images/mybillbook-logo.webp"} alt={"logo"} width="200px" height={"200px"}/>
            </HStack>
            <HStack experimental_spaceX={"10"}>
              {
                state.user !== undefined?
                  <>
                    <Text>{state.user.mobile_number}</Text>
                    <Button variant={'solid'} colorScheme="red" px={"5"} onClick={e=>{
                      localStorage.clear();
                      history("/")
                      dispatch({type:LOGOUT})
                    }}>Logout</Button>
                  </>
                :
              <>
                <Text cursor={"pointer"} _hover={{"color":"orange", "borderBottom":"2px solid orange"}}>Why use BillBook?</Text>
                <Text cursor={"pointer"} _hover={{"color":"orange", "borderBottom":"2px solid orange"}}>Who is it for?</Text>
                <Text cursor={"pointer"} _hover={{"color":"orange", "borderBottom":"2px solid orange"}}>Online Store</Text>
                <Text cursor={"pointer"} _hover={{"color":"orange", "borderBottom":"2px solid orange"}}>Pricing</Text>
                <Text cursor={"pointer"} _hover={{"color":"orange", "borderBottom":"2px solid orange"}}>Faqs</Text>
                <Button colorScheme={"red"} px={"5"}>Login</Button>
              </>
              }
            </HStack>
        </HStack>
  )
}

export default Nav