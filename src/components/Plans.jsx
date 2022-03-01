import { CheckIcon, Icon } from '@chakra-ui/icons'
import { Badge, Box, HStack, Table, Tbody, Td, Text, Tr, VStack } from '@chakra-ui/react'
import React from 'react'

function Plans(prop) {
  return (
      prop.plan &&  
        <Box w={"33%"} border="1px" h={"35rem"} p={"3"} rounded={"md"} borderColor={prop.plan.plan_no === "2" ? "orange.500":"gray.400"} bg={prop.plan.plan_no === "2" ? "orange.50":"transparent"}>
            
                <VStack>
                    {prop.plan.plan_no ==="2" && <Badge textAlign={"end"} position={"absolute"} colorScheme={"red"} p={1} m={1}>Most Popular</Badge>}
                    <VStack w="100%" align={"flex-start"}>
                        <img 
                        alt={prop.plan.plan_no}
                        src={prop.plan.img}
                        />
                        <Text fontWeight={"bold"} >
                            {prop.plan.plan_name}
                        </Text>
                        <HStack>
                            <Text>
                            ₹
                            </Text>
                            <Text textDecorationLine={"line-through"}>{prop.plan.actual_cost}</Text>
                            <Text fontSize={"3xl"} color={`${prop.plan.color}`} fontWeight={"bold"}>
                                {prop.plan.cut_price} 
                            </Text>
                            <Text fontSize={"3xl"}>
                            /year
                            </Text>
                        </HStack>
                    </VStack>
                    {/* <Box w="100%" bg={"gray.200"}> */}
                        {/* <Text textAlign={"center"} m={"2"} rounded="sm" fontWeight={"semibold"} color={"blackAlpha.800"}>
                            Mobile + Desktop
                        </Text> */}
                        <Badge w="100%" py="3" bg={"gray.200"}  textAlign={"center"} m={"2"} rounded="sm" fontWeight={"semibold"} fontSize="medium">
                            Mobile + Desktop
                        </Badge>
                    {/* </Box> */}
                    <Table>
                        <Tbody>
                            {prop.plan.features.map(v=>(

                                <Tr>
                                    <Td><Icon as={CheckIcon} color={"green.500"}/></Td>
                                    <Td w="100%" color={"blackAlpha.800"} fontWeight={"medium"}>{v}</Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>

                </VStack>
            </Box>
        
  )
}

export default Plans

// Comment:
{/*
                <HStack w={"100%"}>
                    <Box w={"30%"} border="2px" minH={"20rem"} p={"2"}>
                        <VStack>
                            <VStack w="100%" align={"flex-start"}> 
                                <img 
                                alt='plan1'
                                src='https://mybillbook.in/static-assets/images/pricing%20page/bluecrown.svg'
                                />
                                <Text>
                                    Silver Plan
                                </Text>
                                <HStack>
                                    <Text>
                                    ₹
                                    </Text>
                                    <Text textDecorationLine={"line-through"}>1200</Text>
                                    <Text>
                                        799 /year
                                    </Text>
                                </HStack>
                                <Text>
                                    Mobile + Desktop
                                </Text>
                            </VStack>
                        </VStack>
                    </Box>
                        <VStack w={"30%"} border="2px" minH={"20rem"}>
                            <VStack>
                                <img 
                                alt='plan2'
                                src='https://mybillbook.in/static-assets/images/pricing%20page/goldencrown.svg'
                                />
                                <Text>
                                    Gold Plan
                                </Text>
                                <HStack>
                                    <Text>
                                    ₹
                                    </Text>
                                    <Text textDecorationLine={"line-through"}>2599</Text>
                                    <Text>
                                        1799 /year
                                    </Text>
                                </HStack>
                            </VStack>
                            <Box w="100%" bg={"gray.200"}>
                                    <Text textAlign={"center"} m={"2"} rounded="sm" fontWeight={"semibold"} color={"blackAlpha.800"}>
                                        Mobile + Desktop
                                    </Text>
                                </Box>
                                <Table>
                                    <Tbody>
                                        <Tr>
                                            <Td><Icon as={CheckIcon} color={"green.500"}/></Td>
                                            <Td w="100%">All Silver & Gold Features!</Td>
                                        </Tr>
                                        <Tr>
                                            <Td><Icon as={CheckIcon} color={"green.500"}/></Td>
                                            <Td w="100%">Add <b>Unlimited</b> Staff!</Td>                                        
                                        </Tr>
                                    </Tbody>
                                </Table>

                        </VStack>
                    </VStack>
                </Box>
                

                </HStack>
            </VStack> */}