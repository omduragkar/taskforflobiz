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
            <HStack me="auto">
                <img src={"https://mybillbook.in/static-assets/images/mybillbook-logo.webp"} alt={"logo"} width="200px" height={"200px"}/>
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
                <Text>Why use BillBook?</Text>
                <Text>Who is it for?</Text>
                <Text>Online Store</Text>
                <Text>Pricing</Text>
                <Text>Faqs</Text>
                <Button colorScheme={"red"} px={"5"}>Login</Button>
              </>
              }
            </HStack>
        </HStack>
  )
}

export default Nav