
import { Button, Container, FormControl, FormLabel, Heading, HStack,  InputGroup, InputLeftAddon, NumberInput, Text, NumberInputField,useToast, VStack } from '@chakra-ui/react'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Nav from '../components/Nav'
import Plans from '../components/Plans';
import { ADDUSER } from '../context/Constants';
import { GlobalContext } from '../context/ContextUser';

function Home() {
    const [otplisten, setOtplisten] = useState(false);
    const [userg, setUserg] = useState({});
    const toast = useToast()
    const history = useNavigate();
    const {state, dispatch} = GlobalContext(); 
    useEffect(()=>{
        if(state.user != undefined)
        {
            history("/dashboard");
        }
    }, [history, state.user])
    const getotp = ()=>{
        // console.log(userg.mobile.length)
        if((userg && userg.mobile && userg.mobile != "" ) && (userg.mobile.length > 9 && userg.mobile.length<12)){
            const config = {
                headers:{
                    'accept': 'application/json',
                    'content-type': 'application/json',
                    'client': 'web'
                }
            }
            axios.post("https://niobooks.in/api/web/request_otp", {
                mobile_number:userg.mobile
            }, config).then(res=>{
                // console.log(res);
                setOtplisten(prev=>prev?true:true);
            }).catch(err=>{
                toast({
                    title: err.response.data.error,
                    status: 'error',
                    duration: 4000,
                    isClosable: true,
                    variant:"left-accent",
                })
                console.log(err.response.data.error);
            })
        }else{
            toast({
                title: 'Enter valid Mobile Number!',
                status: 'warning',
                duration: 4000,
                isClosable: true,
                variant:"left-accent",
            })
        }
    }

    const submit=()=>{
        if(!userg.mobile || !userg.otp){
            toast({
                title: 'Please Enter valid OTP!',
                status: 'warning',
                duration: 4000,
                isClosable: true,
                variant:"left-accent",
            })
        }else{
            const config = {
                headers:{
                    'accept': 'application/json',
                    'content-type': 'application/json',
                    'client': 'web'
                }
            }
            axios.post("https://niobooks.in/api/web/authenticate", {
                mobile_number:userg.mobile,
                otp_code:userg.otp
            }, config).then(res=>{
                localStorage.setItem("user", JSON.stringify(res.data));
                dispatch({type:ADDUSER, payload:res.data})
                history("/dashboard")
            }).catch(err=>{
                toast({
                    title: err.response.data.error,
                    status: 'error',
                    duration: 4000,
                    isClosable: true,
                    variant:"left-accent",
                })
            })
        }
    }
    
  return (
    <Container my={"2"} mx={"0"}>
        <VStack w={"94vw"}>
            <Nav/>
            <HStack bg={"#fbf7f4"} w="100%" minH={"50vh"} px={"3"}>
                <VStack w={"60%"} flexBasis="80%" experimental_spaceY={"16"}>
                    <VStack w="70%" mx={"auto"} textAlign="center">
                        <Heading>
                            Simple GST Billing and Stock Managment Software for your business
                        </Heading>

                        <Text fontSize='xl'>
                            Atma Nirbhar Vyapaari Bane
                        </Text>
                    </VStack>
                    <HStack experimental_spaceX={"5"}>
                        <Text fontSize='lg'>
                            Made with ❤️ in India
                        </Text>
                        <Text>
                            <img src='https://mybillbook.in/static-assets/images/landing-page/iso-black.webp' alt='landing'/>
                        </Text>
                    </HStack>

                </VStack>
                <VStack w={"40%"}>
                    <VStack w={"85%"} bg={"#fff"} p={"5"} border="2px" rounded={"md"} borderColor={"gray.300"}>
                        <Text fontSize='3xl' fontWeight={"bold"}>
                            Login to my BillBook
                        </Text>
                        <FormControl>
                            <FormLabel>Enter Mobile Number </FormLabel>
                            <InputGroup>
                                <InputLeftAddon>+91</InputLeftAddon>
                                <NumberInput>
                                    <NumberInputField  name='mobile' value={userg.mobile || ""} onChange={e=>setUserg(prev=>({...prev, [e.target.name]:e.target.value}))}></NumberInputField >
                                </NumberInput>
                            </InputGroup>
                        </FormControl>
                        {otplisten === false &&
                            <Button onClick={e=>getotp(e)} colorScheme={"red"}>Get OTP</Button>
                        }
                        {otplisten &&
                            <>
                                <FormControl>
                                    <FormLabel>Enter otp: </FormLabel>
                                    <NumberInput>
                                        <NumberInputField name='otp' value={userg.otp || ""} onChange={e=>setUserg(prev=>({...prev, [e.target.name]:e.target.value}))}></NumberInputField>
                                    </NumberInput>
                                </FormControl>
                                <Text
                                    onClick={e=>getotp(e)} cursor={"pointer"}
                                    textColor={"red"}
                                    w={"100%"}
                                 >Resend OTP</Text>
                                <HStack  w="100%">
                                    <Button colorScheme={"orange"} mx={"auto"} w="50%" onClick={submit} fontSize={"lg"}>Login</Button>
                                </HStack>
                            </>
                        }
                    </VStack>
                </VStack>
            </HStack>
            <HStack py={"5"} justify={"space-evenly"} w="100%">
                <VStack>
                    <Heading color={"orange.400"}>
                        1,00,000+
                    </Heading>
                    <Text>
                        Businesses Trusted us
                    </Text>
                </VStack>
                <VStack>
                    <Heading color={"orange.400"}>
                        30,00,000+
                    </Heading>
                    <Text>
                        Invoice Created!
                    </Text>
                </VStack>
                <VStack>
                    <Heading color={"orange.400"}>
                        5,000+
                    </Heading>
                    <Text>
                        Cities & towns in India
                    </Text>
                </VStack>
                <VStack>
                    <HStack>
                        <Heading color={"orange.400"}>
                            4.5 
                        </Heading>
                        <img alt ="billbook app star"
                         src='https://mybillbook.in/static-assets/images/landing-page/star.webp'/>
                    </HStack>
                    <Text>
                        Rating on Google
                    </Text>
                </VStack>
            </HStack>
            <VStack w={"90%"}>
                <HStack w={"100%"} justify={"space-between"} my="10"> 
                    <VStack justify={"start"}>
                        <Heading>Now try all benefits of My BillBook app</Heading>
                         <Text fontSize={"3xl"} color="orange" fontWeight={"bold"} w="100%">Free for 14 days!</Text>
                    </VStack>
                    <div>
                        <img 
                            src="https://www.pngfind.com/pngs/m/150-1501244_30-day-money-back-guarantee-png-label-transparent.png"
                            alt='money back'
                            height={'250px'}
                            width={'250px'}
                        />
                        
                    </div>
                </HStack>
                <HStack w="100%" display={"flex"} flexDir={"row"} justify={"space-evenly"}>
                    {[
                        {
                            plan_no:"1",
                            img:"https://mybillbook.in/static-assets/images/pricing%20page/bluecrown.svg",
                            plan_name:"Silver Plan",
                            actual_cost:1200,
                            cut_price:799,
                            color:"blue.600",
                            features:[
                                "Unlimited Stock adjustments",
                                "GST reports, Profit and Loss Report",
                                "Remove myBillBook logo from invoice",
                                "Only Mobile device supported",
                                "+5 more features",
                            ]
                        },
                        {
                            plan_no:"2",
                            img:"https://mybillbook.in/static-assets/images/pricing%20page/goldencrown.svg",
                            plan_name:"Gold Plan",
                            actual_cost:4599,
                            cut_price:3500,
                            color:"orange.400",
                            features:[
                                "All Silver Features",
                                "Add upto 5 Staff on my Billbook",
                                "Unlimited Mobile + desktop Logins",
                            ]
                        },
                        {
                            plan_no:"3",
                            img:"https://mybillbook.in/static-assets/images/pricing%20page/greencrown.svg",
                            plan_name:"Platinum Plan",
                            actual_cost:2599,
                            cut_price:1799,
                            color:"green.600",
                            features:[
                                "All Silver & Gold Features!",
                                "Add unlimited staff to my Billbook"
                            ]
                        },
                    ].map((obj, i)=>(
                        <Plans key={i} plan={obj}/>

                    ))}
                </HStack>
            </VStack>
            {/* Footer */}
            <HStack w={"100%"} justify="space-around" py={"5"} align="flex-start">
                <VStack experimental_spaceY={"2"}>
                    <Heading color={"orange.300"}> Get in Touch</Heading>
                    <Text> help@flobiz.in</Text>
                    <Text> +91 7400417400   </Text>
                    <HStack>
                        <Button bg={"#e7f4f2"} color={"green.500"}>
                            <img src={"https://mybillbook.in/static-assets/images/whatsapp-1.webp"} alt="whatsapp"/> &nbsp;
                        WhatsApp us</Button>
                        <Button bg={"blue.100"} color={"blue.500"}> Chat with us</Button>
                    </HStack>
                </VStack>
                <VStack experimental_spaceY={"5"}>
                    <Heading color={"orange.300"}> Information</Heading>
                    <HStack align={"flex-start"} experimental_spaceX={"5"}>
                        <VStack>
                            <Text> Refund Policy</Text>
                            <Text> Privacy Policy</Text>
                            <Text>Terms and Conditions</Text>
                        
                        </VStack>
                        <VStack>
                            <Text> FAQ's</Text>
                            <Text> pricing </Text>
                            <Text> FloBiz Business Group</Text>
                            <Text> Blogs</Text>
                        
                        </VStack>
                    </HStack>
                </VStack>
                <VStack experimental_spaceY={"5"}>
                    <Heading color={"orange.300"}>  Follow us</Heading>
                    <HStack>
                        <Button rounded={"full"} w="50px" height={"50px"}> <img src={"https://mybillbook.in/static-assets/images/landing-page/youtube.webp"} alt="youtube"/> </Button>
                        <Button rounded={"full"} w="50px" height={"50px"}> <img src={"https://mybillbook.in/static-assets/images/landing-page/facebook_Icon.webp"} alt="facebook"/> </Button>
                        <Button rounded={"full"} w="50px" height={"50px"}> <img src={"https://mybillbook.in/static-assets/images/landing-page/instagram.webp"} alt="youtube"/> </Button>
                        <Button rounded={"full"} w="50px" height={"50px"}> <img src={"https://mybillbook.in/static-assets/images/landing-page/twitter-icon.webp"} alt="youtube"/> </Button>
                        <Button rounded={"full"} w="50px" height={"50px"}> <img src={"https://mybillbook.in/static-assets/images/landing-page/linkedin-icon.webp"} alt="youtube"/> </Button>
                    </HStack>
                    <Text> FloBook is a product of FloBiz</Text>
                </VStack>
            </HStack>
        </VStack>
    </Container>
  )
}

export default Home;